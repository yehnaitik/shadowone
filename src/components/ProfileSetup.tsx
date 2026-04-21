import { useState } from 'react';

const AVATARS = ['🦊', '🐺', '🐉', '🦅', '🌙', '⚡', '🔥', '🌊', '🎯', '💎'];

interface Props {
  onComplete: (name: string, avatarIndex: number) => void;
}

export default function ProfileSetup({ onComplete }: Props) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [step, setStep] = useState<'name' | 'avatar'>('name');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    setStep('avatar');
  };

  const handleDone = () => {
    if (name.trim().length < 2) return;
    onComplete(name.trim(), selectedAvatar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#1a1a2e', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0d0d1a', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4a9eff', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#grad1)" stroke="#2a2a4a" strokeWidth="2" />
              <path d="M 28 50 A 22 22 0 1 1 72 50 A 22 22 0 0 1 28 50" fill="none" stroke="#3a3a5a" strokeWidth="6" strokeLinecap="round" />
              <text x="50" y="56" textAnchor="middle" fill="url(#grad2)" fontSize="28" fontWeight="900" fontFamily="Arial Black, sans-serif">S</text>
              <text x="72" y="42" textAnchor="middle" fill="url(#grad2)" fontSize="16" fontWeight="900" fontFamily="Arial Black, sans-serif">1</text>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-widest text-white">SHADOWCORE ONE</h1>
            <p className="text-xs text-gray-500 tracking-[0.3em] mt-1">NEXT-GEN BROWSER</p>
          </div>
        </div>

        {/* Setup card */}
        <div className="w-full bg-[#111118] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {step === 'name' ? (
            <form onSubmit={handleNameSubmit} className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Welcome</h2>
                <p className="text-gray-400 text-sm mt-1">Set up your profile to get started</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Your Name</label>
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  maxLength={32}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all text-sm"
                />
                <p className="text-xs text-gray-600">No account needed — just your name.</p>
              </div>
              <button
                type="submit"
                disabled={name.trim().length < 2}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide"
              >
                Continue
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Pick your avatar</h2>
                <p className="text-gray-400 text-sm mt-1">Hello, {name}!</p>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {AVATARS.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAvatar(i)}
                    className={`text-3xl p-3 rounded-xl border-2 transition-all duration-150 hover:scale-110 ${
                      selectedAvatar === i
                        ? 'border-blue-500 bg-blue-500/20 scale-110'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('name')}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleDone}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  Launch Browser
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-700 text-center">ShadowCore One v1.0 • Built for Zorin OS</p>
      </div>
    </div>
  );
}
