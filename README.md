# 🎮 NEURO-LINK: Protocol Zero

<div align="center">

### A Cyberpunk P2P Social Deduction Game

![Cyberpunk Badge](https://img.shields.io/badge/CYBERPUNK-HACKER%20EDITION-00ff41?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJMMiAyMmgyMHoiIGZpbGw9IiMwMGZmNDEiIHN0cm9rZT0iIzAwZmY0MSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+)
![Built with React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![WebRTC P2P](https://img.shields.io/badge/P2P-WebRTC-ff00ff?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)

---

## 🚀 **PLAY NOW** 🚀

### ⚡ **[CLICK HERE TO START PLAYING](https://ab4a5654-59f7-444d-b1e9-7e9cad3ae137-00-oqwxi6jaeh6a.riker.replit.dev/)**

**No installation needed • No app required • Play instantly in your browser**

---

</div>

## 📖 About the Game

**NEURO-LINK: Protocol Zero** is a high-energy, real-time multiplayer social deduction game that challenges players to identify an impostor among them. Set in a retro-futuristic cyberpunk world with neon aesthetics and terminal-style interfaces, this game delivers intense gameplay and strategic thinking.

### 🎯 **Perfect for School Classrooms**
- ✅ **No Installation Needed** - Play directly from any web browser
- ✅ **Works on School Computers** - Just visit the link, no downloads
- ✅ **Instant Setup** - No accounts, no logins, just play
- ✅ **LAN & Online** - Play with computers in the same room or across the internet
- ✅ **Educational Value** - Builds critical thinking, communication, and strategy skills

---

## 🎮 **Core Features**

<table>
<tr>
<td width="50%">

### 🌐 **P2P Networking**
Direct player-to-player connections via WebRTC. No central servers, pure peer-to-peer gameplay.

### 🎨 **Immersive Cyberpunk UI**
Retro-futuristic terminal aesthetic with neon effects, CRT scanlines, and glitch animations.

</td>
<td width="50%">

### 🎭 **Role-Based Gameplay**
Hackers vs Impostor mechanics with dynamic word generation and AI integration.

### 📱 **Full Mobile Support**
Touch controls, haptic feedback, responsive design for any device.

</td>
</tr>
</table>

<table>
<tr>
<td width="50%">

### 🤖 **AI-Powered Words**
Google Gemini API for dynamic word generation with offline fallback database.

### 📊 **QR Code Joining**
Scan to join rooms instantly - perfect for classroom use.

</td>
<td width="50%">

### 🔊 **Retro Sound Design**
Web Audio API synthesized effects and cyberpunk soundtrack.

### ⚡ **Real-Time Sync**
Host-authoritative state management for seamless multiplayer experience.

</td>
</tr>
</table>

---

## 🎯 **How to Play**

### **Setup Phase** (2-8 Players)
```
┌─────────────────────────────────────┐
│  1. HOST creates a room             │
│  2. PLAYERS join via code or QR     │
│  3. HOST configures settings        │
│  4. CLICK START GAME                │
└─────────────────────────────────────┘
```

### **Gameplay Flow**
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ROLE REVEAL                       ┃
┃  👨‍💻 Hackers: Know the word         ┃
┃  🕵️ Impostor: Don't know the word  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
           ⬇️
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  DESCRIPTION PHASE (60s each)      ┃
┃  Describe the word without saying  ┃
┃  it. Impostor tries to blend in.   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
           ⬇️
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  VOTING PHASE                      ┃
┃  Everyone votes on who is the      ┃
┃  impostor. Majority decides.       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
           ⬇️
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  VICTORY CONDITIONS               ┃
┃  ✅ Hackers Win: Found impostor   ┃
┃  ✅ Impostor Wins: Avoided vote   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### **Special Abilities**
- 💣 **Noise Bomb** (Impostor) - Disrupt one player's turn once per game

---

## 🛠️ **Technology Stack**

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 • TypeScript • Tailwind CSS • Radix UI |
| **Networking** | PeerJS • WebRTC • WebSocket |
| **Backend** | Express.js • Google Gemini API • Web Audio API |
| **Build Tools** | Vite • ESBuild • TSX • npm |
| **Features** | QRCode.react • Framer Motion • Haptic API |

</div>

---

## 📁 **Project Structure**

```
neuro-link/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/          # Game screens & logic
│   │   │   ├── ui/            # Reusable components
│   │   │   └── ...
│   │   ├── lib/
│   │   │   ├── gameController.ts   # Game orchestrator
│   │   │   ├── gameState.ts        # State management
│   │   │   ├── p2p.ts             # P2P networking
│   │   │   ├── gameMaster.ts      # Word generation
│   │   │   └── progressionContext.tsx # Player progression
│   │   └── pages/
│   │       ├── Profile.tsx         # Avatar & theme system
│   │       └── ...
│   └── index.html
├── server/
│   ├── routes.ts              # API endpoints
│   └── index.ts              # Express server
└── shared/
    └── schema.ts             # Shared types
```

---

## 🚀 **Getting Started**

### **Option 1: Play Online (Recommended for Classrooms)**

Simply visit: **[https://ab4a5654-59f7-444d-b1e9-7e9cad3ae137-00-oqwxi6jaeh6a.riker.replit.dev/](https://ab4a5654-59f7-444d-b1e9-7e9cad3ae137-00-oqwxi6jaeh6a.riker.replit.dev/)**

No installation, no registration, no downloads. **Click and play.**

### **Option 2: Run Locally**

```bash
# Clone the repository
git clone https://github.com/Lordi898/neuro-link.git
cd neuro-link

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000 in your browser
```

### **Option 3: Deploy Your Own Copy**

1. Fork this repository
2. Deploy to Replit, Vercel, or Netlify
3. Share the link with your friends

---

## 🎨 **Visual Customization**

### **Three Visual Styles**
- 🖥️ **Hacker** - Classic terminal black & green
- 🌌 **Futurista** - Modern cyberpunk purple & cyan
- 🎮 **Retro** - Arcade 8-bit style

### **Six Playable Themes**
- Default themes (Hacker, Futurista, Retro)
- 🌀 **Matrix Retro** - Classic CRT scanlines effect
- ✨ **Obsidian Lux** - Elegant golden aesthetic
- 💎 **Quantum Divinity** - Glassmorphism future tech

### **Three Color Themes**
- 🌙 Dark Mode
- ☀️ Normal Mode
- ☀️☀️ Light Mode

---

## 👥 **Progression System**

Players unlock content through gameplay:

```
┌──────────────────────────────────────┐
│  🎯 AVATAR SYSTEM (30 AVATARS)      │
│  ├─ Tier 1: 10 Starting Avatars    │
│  ├─ Tier 2: Unlock at Level 2-5    │
│  └─ Tier 3: Unlock at Level 6-10   │
├──────────────────────────────────────┤
│  🎨 THEME UNLOCKS                   │
│  ├─ Matrix Retro: 3-Win Streak     │
│  ├─ Obsidian Lux: First Impostor   │
│  └─ Quantum: 3-Impostor Streak     │
├──────────────────────────────────────┤
│  📊 LEVEL SYSTEM (1-10)             │
│  └─ Gain XP through wins & gameplay │
└──────────────────────────────────────┘
```

### **Admin Mode** (Code: LORDI)
- Unlock all avatars instantly
- Reach max level (10)
- Enable 1v1 games
- Access all themes

---

## 🌐 **Multiplayer Features**

### **Room Management**
- 🔐 Join via unique room codes
- 📱 Scan QR codes for instant join
- 👥 Support 2-8 players per room
- 🔴 Real-time player presence

### **Social Integration**
- 💬 In-game chat system
- 🎙️ Real-time voice support (bring your own)
- 📊 Win/loss statistics
- 🏆 Achievement tracking

---

## 📱 **Classroom Use**

<div align="center">

### Perfect for Educational Settings

| Feature | Benefit |
|---------|---------|
| **No Installation** | Works on any school computer |
| **Browser-Based** | No admin rights needed |
| **Fast Deployment** | Share one link, everyone plays |
| **LAN Support** | Works without internet (local network) |
| **Educational** | Teaches strategy & critical thinking |
| **Monitored** | Teachers can supervise gameplay |
| **Flexible** | 15-min sessions or full class periods |

</div>

---

## 🔧 **Configuration**

### **Environment Variables** (Optional)

```env
# Google Gemini API (for enhanced word generation)
GEMINI_API_KEY=your_api_key_here

# Express session security
SESSION_SECRET=your_random_secret_here
```

> Game works perfectly with or without Gemini API using fallback database.

---

## 🤝 **Contributing**

Contributions welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

### Development Guidelines
- Maintain cyberpunk aesthetic
- Test on desktop & mobile
- Update documentation
- Follow TypeScript best practices

---

## 🐛 **Known Limitations**

- P2P requires local network or public internet
- Relies on PeerJS cloud signaling
- No game state persistence (reload loses progress)
- Recommended max: 8-10 players per room

---

## 📄 **License**

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

---

## 👨‍💻 **Creator**

<div align="center">

### **Imanol Magaña** 🎮

**Solo Developer & Game Designer**

🔗 **GitHub:** [@Lordi898](https://github.com/Lordi898)

**Inspired by:** Mafia, Spyfall, Among Us, and retro hacker culture.

Built with ❤️ using modern web technologies.

</div>

---

## 🙏 **Acknowledgments**

- PeerJS for accessible WebRTC networking
- Google Gemini API for intelligent word generation
- Radix UI for accessible component primitives
- The retro gaming and cyberpunk communities
- All players who test and provide feedback

---

## 📞 **Support & Contact**

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/Lordi898/neuro-link/issues)
- 💡 **Feature Requests:** [GitHub Issues](https://github.com/Lordi898/neuro-link/issues)
- 💬 **Questions:** Open an issue or check existing ones

---

<div align="center">

### 🎮 **Ready to Play?** 🎮

## **[👉 CLICK HERE TO PLAY NOW 👈](https://ab4a5654-59f7-444d-b1e9-7e9cad3ae137-00-oqwxi6jaeh6a.riker.replit.dev/)**

### No installation • No registration • Play instantly

---

**Made by Imanol Magaña (@Lordi898) with 💚 and ⚡**

[⬆ Back to Top](#-neuro-link-protocol-zero)

</div>
