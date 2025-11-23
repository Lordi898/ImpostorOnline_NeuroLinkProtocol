import { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { NeonButton } from '@/components/NeonButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlitchText } from '@/components/GlitchText';
import { useLanguage } from '@/lib/languageContext';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate inputs
    if (!username || !password) {
      setError('MISSING CREDENTIALS');
      return;
    }
    
    if (username.length < 3 || username.length > 50) {
      setError('USERNAME INVALID');
      return;
    }
    
    if (password.length < 8 || password.length > 128) {
      setError('PASSWORD INVALID');
      return;
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError('USERNAME INVALID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await signup(username, password);
      }
      onLoginSuccess();
    } catch (err) {
      setError('AUTH FAILED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center gap-8 scanline">
      <div className="text-center space-y-2 md:space-y-4">
        <GlitchText retro>
          NEURO-LINK
        </GlitchText>
        <p className="text-secondary text-sm md:text-lg font-mono font-semibold tracking-wider">
          {mode === 'login' ? 'AUTHENTICATE' : 'CREATE ACCOUNT'}
        </p>
      </div>

      <div className="w-full max-w-xs space-y-4 border-2 border-primary rounded-lg p-6 bg-background/50">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-mono font-semibold text-primary">USERNAME</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder="ENTER USERNAME"
            className="uppercase font-mono text-sm"
            disabled={loading}
            data-testid="input-username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-mono font-semibold text-primary">PASSWORD</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="ENTER PASSWORD"
            className="uppercase font-mono text-sm"
            disabled={loading}
            data-testid="input-password"
          />
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/20 border border-destructive/40 rounded px-3 py-2 font-mono text-center font-semibold">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <NeonButton
            onClick={handleSubmit}
            disabled={loading || !username || !password}
            className="flex-1 font-bold"
            data-testid="button-auth-submit"
          >
            {mode === 'login' ? 'LOGIN' : 'SIGNUP'}
          </NeonButton>
          <NeonButton
            variant="outline"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            disabled={loading}
            className="flex-1 font-bold"
            data-testid="button-auth-toggle"
          >
            {mode === 'login' ? 'NEW USER' : 'HAVE ACCOUNT'}
          </NeonButton>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-md font-mono leading-relaxed">
        {mode === 'login'
          ? 'SYNCHRONIZE ACROSS DEVICES. YOUR PROGRESS IS SECURE IN THE NETWORK.'
          : 'CREATE NEW IDENTITY TO ENTER THE NETWORK.'}
      </p>
    </div>
  );
}
