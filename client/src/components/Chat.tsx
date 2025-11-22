import { useState, useEffect, useRef } from 'react';
import { TerminalCard } from './TerminalCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ChatMessage } from '@/lib/gameState';
import { cn } from '@/lib/utils';

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  localPlayerId: string;
  className?: string;
}

export function Chat({ messages, onSendMessage, localPlayerId, className }: ChatProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollViewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollViewport) {
      scrollViewport.scrollTop = scrollViewport.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <TerminalCard 
      title="COMMUNICATIONS" 
      className={cn("flex flex-col", className)}
      scanline={false}
    >
      <ScrollArea className="flex-1 h-[300px] pr-4" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-8">
              NO MESSAGES YET
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.senderId === localPlayerId;
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col gap-1 p-2 rounded border",
                    isOwnMessage 
                      ? "bg-primary/10 border-primary/30" 
                      : "bg-card/30 border-border/30"
                  )}
                  data-testid={`chat-message-${message.id}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      "text-xs font-bold tracking-wider",
                      isOwnMessage ? "text-primary" : "text-secondary"
                    )}>
                      {message.senderName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm break-words">
                    {message.text}
                  </p>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4 pt-4 border-t border-primary/30">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="TYPE MESSAGE..."
          className="flex-1 uppercase font-mono"
          maxLength={200}
          data-testid="input-chat-message"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!inputText.trim()}
          className="border-2 border-primary shadow-[0_0_10px_rgba(0,255,0,0.5)]"
          data-testid="button-send-message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </TerminalCard>
  );
}
