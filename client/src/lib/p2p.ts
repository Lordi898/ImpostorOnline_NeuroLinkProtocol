import Peer, { DataConnection } from 'peerjs';

export type MessageType =
  | 'player-join'
  | 'player-leave'
  | 'start-game'
  | 'role-assignment'
  | 'turn-start'
  | 'turn-end'
  | 'vote-cast'
  | 'game-over'
  | 'noise-bomb'
  | 'sync-state'
  | 'chat-message'
  | 'clue-display'
  | 'voting-results'
  | 'player-eliminated'
  | 'game-ended-admin'
  | 'voting-start'
  | 'player-kicked';

export interface P2PMessage {
  type: MessageType;
  data: any;
  senderId: string;
  timestamp: number;
}

export interface PlayerConnection {
  id: string;
  name: string;
  connection: DataConnection;
  isHost: boolean;
}

export class P2PManager {
  private peer: Peer | null = null;
  private connections: Map<string, PlayerConnection> = new Map();
  private localPlayerId: string = '';
  private localPlayerName: string = '';
  private isHost: boolean = false;
  private roomCode: string = '';

  private onMessageCallback: ((message: P2PMessage) => void) | null = null;
  private onPlayerJoinCallback: ((player: PlayerConnection) => void) | null = null;
  private onPlayerLeaveCallback: ((playerId: string) => void) | null = null;
  private onConnectionErrorCallback: ((error: Error) => void) | null = null;
  private getSyncDataCallback: (() => any) | null = null;

  async createRoom(playerName: string): Promise<string> {
    this.localPlayerName = playerName;
    this.isHost = true;

    try {
      const response = await fetch('/api/rooms/create', { method: 'POST' });
      const data = await response.json();
      
      this.roomCode = data.roomCode;
      this.localPlayerId = data.playerId;
      
      console.log('[P2P] Creating PeerJS instance for host...');
      
      // Create Peer instance with this player's ID as the peer ID
      this.peer = new Peer(this.localPlayerId, {
        host: window.location.hostname,
        port: window.location.protocol === 'https:' ? 443 : 80,
        path: '/peerjs',
        secure: window.location.protocol === 'https:',
        debug: 2
      });
      
      // Host waits for incoming connections
      this.peer.on('connection', (conn: DataConnection) => {
        this.handleIncomingConnection(conn);
      });
      
      this.peer.on('error', (error) => {
        console.error('[P2P] Peer error:', error);
        this.onConnectionErrorCallback?.(new Error(`Peer error: ${error}`));
      });
      
      // Wait for Peer to be ready
      await new Promise((resolve) => {
        this.peer!.on('open', (id) => {
          console.log('[P2P] Peer open, ID:', id);
          resolve(null);
        });
      });
      
      console.log('[P2P] Room created with code:', this.roomCode, 'Peer ID:', this.localPlayerId);
      return this.roomCode;
    } catch (error) {
      console.error('[P2P] Error creating room:', error);
      throw error;
    }
  }

  async joinRoom(playerName: string, roomCode: string): Promise<void> {
    this.localPlayerName = playerName;
    this.isHost = false;
    this.roomCode = roomCode;

    try {
      const response = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode })
      });
      
      if (!response.ok) throw new Error('Failed to join room');
      
      const data = await response.json();
      this.localPlayerId = data.playerId;
      const hostPlayerId = data.hostPlayerId;
      
      console.log('[P2P] Joining room:', roomCode, 'as player:', this.localPlayerId, 'host:', hostPlayerId);
      
      // Create Peer instance
      this.peer = new Peer(this.localPlayerId, {
        host: window.location.hostname,
        port: window.location.protocol === 'https:' ? 443 : 80,
        path: '/peerjs',
        secure: window.location.protocol === 'https:',
        debug: 2
      });
      
      // Wait for Peer to be ready, then connect to host
      await new Promise((resolve, reject) => {
        this.peer!.on('open', (id) => {
          console.log('[P2P] Peer open, ID:', id);
          
          // Connect to host
          const hostConn = this.peer!.connect(hostPlayerId, { reliable: true });
          this.setupConnection(hostConn, playerName, true);
          this.connections.set(hostPlayerId, {
            id: hostPlayerId,
            name: 'Host',
            connection: hostConn,
            isHost: true
          });
          
          console.log('[P2P] Connected to host:', hostPlayerId);
          resolve(null);
        });
        
        this.peer!.on('error', (error) => {
          console.error('[P2P] Peer error:', error);
          reject(error);
        });
        
        // Timeout after 10 seconds
        setTimeout(() => reject(new Error('Peer connection timeout')), 10000);
      });
      
      // Handle incoming connections from other players
      this.peer.on('connection', (conn: DataConnection) => {
        console.log('[P2P] Incoming connection from:', conn.peer);
        this.setupConnection(conn, playerName, false);
        this.connections.set(conn.peer, {
          id: conn.peer,
          name: conn.metadata?.name || 'Unknown',
          connection: conn,
          isHost: false
        });
        this.onPlayerJoinCallback?.(this.connections.get(conn.peer)!);
      });
      
      console.log('[P2P] Joined room:', roomCode);
    } catch (error) {
      console.error('[P2P] Error joining room:', error);
      throw error;
    }
  }

  private handleIncomingConnection(conn: DataConnection): void {
    console.log('[P2P] Incoming connection from:', conn.peer);

    let playerName = '';

    conn.on('open', () => {
      console.log('[P2P] Connection opened with:', conn.peer);
      
      // Send current player list to the new player
      const players = Array.from(this.connections.values()).map(p => ({
        id: p.id,
        name: p.name,
        isHost: p.isHost
      }));
      
      players.push({
        id: this.localPlayerId,
        name: this.localPlayerName,
        isHost: true
      });
      
      conn.send({
        type: 'players-list',
        data: { players },
        senderId: this.localPlayerId,
        timestamp: Date.now()
      } as P2PMessage);
      
      // Notify all other players about the new player
      this.broadcast({
        type: 'player-join',
        data: {
          playerId: conn.peer,
          playerName: playerName || 'Unknown'
        }
      });
    });

    conn.on('data', (data: any) => {
      const message = data as P2PMessage;

      if (message.type === 'player-join') {
        playerName = message.data.playerName;
        const playerConnection: PlayerConnection = {
          id: conn.peer,
          name: playerName,
          connection: conn,
          isHost: false
        };

        this.connections.set(conn.peer, playerConnection);
        this.onPlayerJoinCallback?.(playerConnection);
        
        console.log('[P2P] Player joined:', playerName, '(', conn.peer, ')');
        
        // Broadcast to all players that someone joined
        this.broadcast({
          type: 'player-join',
          data: {
            playerId: conn.peer,
            playerName: playerName
          }
        });
      } else {
        this.onMessageCallback?.(message);
      }
    });

    conn.on('close', () => {
      console.log('[P2P] Connection closed:', conn.peer);
      this.connections.delete(conn.peer);
      this.onPlayerLeaveCallback?.(conn.peer);

      if (this.isHost) {
        this.broadcast({
          type: 'player-leave',
          data: { playerId: conn.peer }
        });
      }
    });

    conn.on('error', (error) => {
      console.error('[P2P] Connection error:', error);
    });
  }

  private setupConnection(conn: DataConnection, playerName: string, sendJoinMessage: boolean): void {
    if (sendJoinMessage) {
      conn.on('open', () => {
        console.log('[P2P] Sending player-join message to:', conn.peer);
        conn.send({
          type: 'player-join',
          data: { playerName: this.localPlayerName },
          senderId: this.localPlayerId,
          timestamp: Date.now()
        } as P2PMessage);
      });
    }

    conn.on('data', (data: any) => {
      const message = data as P2PMessage;
      
      // Handle player list from host
      if (message.type === 'players-list' && !this.isHost) {
        const { players } = message.data;
        this.connections.clear();
        
        players.forEach((p: any) => {
          if (p.id !== this.localPlayerId) {
            if (p.isHost) {
              // Already have host connection, skip
              return;
            }
            // Connect to other players
            const playerConn = this.peer!.connect(p.id, { reliable: true });
            this.setupConnection(playerConn, playerName, false);
            const playerConnection: PlayerConnection = {
              id: p.id,
              name: p.name,
              connection: playerConn,
              isHost: false
            };
            this.connections.set(p.id, playerConnection);
            this.onPlayerJoinCallback?.(playerConnection);
            console.log('[P2P] Connecting to player:', p.name, '(', p.id, ')');
          }
        });
        
        console.log('[P2P] Received players list:', players.length, 'players');
      } else if (message.type === 'player-join') {
        const { playerId, playerName: newPlayerName } = message.data;
        if (playerId !== this.localPlayerId && !this.connections.has(playerId)) {
          console.log('[P2P] New player joined:', newPlayerName, '(', playerId, ')');
          
          // Connect to the new player
          const playerConn = this.peer!.connect(playerId, { reliable: true });
          this.setupConnection(playerConn, playerName, false);
          const playerConnection: PlayerConnection = {
            id: playerId,
            name: newPlayerName,
            connection: playerConn,
            isHost: false
          };
          this.connections.set(playerId, playerConnection);
          this.onPlayerJoinCallback?.(playerConnection);
        }
      } else if (message.type === 'player-leave') {
        const { playerId } = message.data;
        const conn = this.connections.get(playerId);
        if (conn) {
          conn.connection.close();
          this.connections.delete(playerId);
          this.onPlayerLeaveCallback?.(playerId);
          console.log('[P2P] Player left:', playerId);
        }
      } else {
        this.onMessageCallback?.(message);
      }
    });

    conn.on('close', () => {
      console.log('[P2P] Connection closed:', conn.peer);
      this.connections.delete(conn.peer);
      this.onPlayerLeaveCallback?.(conn.peer);
    });

    conn.on('error', (error) => {
      console.error('[P2P] Connection error:', error);
    });
  }

  broadcast(message: Omit<P2PMessage, 'senderId' | 'timestamp'>): void {
    const fullMessage: P2PMessage = {
      ...message,
      senderId: this.localPlayerId,
      timestamp: Date.now()
    };

    this.connections.forEach((player) => {
      try {
        if (player.connection && player.connection.open) {
          player.connection.send(fullMessage);
        }
      } catch (error) {
        console.error('[P2P] Failed to send to', player.id, error);
      }
    });
  }

  private broadcastToOthers(message: P2PMessage, excludeId: string): void {
    this.connections.forEach((player) => {
      if (player.id !== excludeId) {
        try {
          if (player.connection && player.connection.open) {
            player.connection.send(message);
          }
        } catch (error) {
          console.error('[P2P] Failed to send to', player.id, error);
        }
      }
    });
  }

  sendMessage(message: Omit<P2PMessage, 'senderId' | 'timestamp'>, targetId: string): void {
    const player = this.connections.get(targetId);
    if (player && player.connection && player.connection.open) {
      const fullMessage: P2PMessage = {
        ...message,
        senderId: this.localPlayerId,
        timestamp: Date.now()
      };
      player.connection.send(fullMessage);
    }
  }

  private syncStateToPlayer(playerId: string): void {
    const allPlayers = Array.from(this.connections.values()).map(p => ({
      id: p.id,
      name: p.name,
      isHost: p.isHost
    }));

    allPlayers.push({
      id: this.localPlayerId,
      name: this.localPlayerName,
      isHost: this.isHost
    });

    const additionalData = this.getSyncDataCallback?.() || {};

    this.sendMessage({
      type: 'sync-state',
      data: {
        players: allPlayers,
        ...additionalData
      }
    }, playerId);
  }

  onMessage(callback: (message: P2PMessage) => void): void {
    this.onMessageCallback = callback;
  }

  onPlayerJoin(callback: (player: PlayerConnection) => void): void {
    this.onPlayerJoinCallback = callback;
  }

  onPlayerLeave(callback: (playerId: string) => void): void {
    this.onPlayerLeaveCallback = callback;
  }

  onConnectionError(callback: (error: Error) => void): void {
    this.onConnectionErrorCallback = callback;
  }

  onGetSyncData(callback: () => any): void {
    this.getSyncDataCallback = callback;
  }

  getTurnRotationOffset(): number {
    const syncData = this.getSyncDataCallback?.() || {};
    return syncData.turnRotationOffset || 0;
  }

  getLocalPlayerId(): string {
    return this.localPlayerId;
  }

  getLocalPlayerName(): string {
    return this.localPlayerName;
  }

  isRoomHost(): boolean {
    return this.isHost;
  }

  getRoomCode(): string {
    return this.roomCode;
  }

  getConnectedPlayers(): PlayerConnection[] {
    return Array.from(this.connections.values());
  }

  disconnect(): void {
    this.connections.forEach((player) => {
      try {
        if (player.connection) {
          player.connection.close();
        }
      } catch (e) {
        console.error('[P2P] Error closing connection:', e);
      }
    });
    this.connections.clear();
    
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
  }

  private generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
