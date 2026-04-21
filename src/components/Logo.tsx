interface Props {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'medium', showText = false, className = '' }: Props) {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={sizes[size]}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="logog1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1a1a2e' }} />
              <stop offset="100%" style={{ stopColor: '#0d0d1a' }} />
            </linearGradient>
            <linearGradient id="logog2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4a9eff' }} />
              <stop offset="100%" style={{ stopColor: '#00d4ff' }} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#logog1)" stroke="#2a2a4a" strokeWidth="2" />
          <path d="M 28 50 A 22 22 0 1 1 72 50 A 22 22 0 0 1 28 50" fill="none" stroke="#3a3a5a" strokeWidth="6" strokeLinecap="round" />
          <text x="50" y="57" textAnchor="middle" fill="url(#logog2)" fontSize="30" fontWeight="900" fontFamily="Arial Black, sans-serif">S</text>
          <text x="74" y="43" textAnchor="middle" fill="url(#logog2)" fontSize="17" fontWeight="900" fontFamily="Arial Black, sans-serif">1</text>
        </svg>
      </div>
      {showText && (
        <div>
          <p className={`text-white font-black tracking-widest leading-none ${textSizes[size]}`}>
            SHADOWCORE
          </p>
          <p className={`text-blue-400 font-black tracking-[0.2em] leading-tight ${textSizes[size]}`}>
            ONE
          </p>
        </div>
      )}
    </div>
  );
}
