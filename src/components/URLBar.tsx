import { useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Star, Shield, Search, Globe } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  isLoading: boolean;
  isBookmarked: boolean;
  onBookmark: () => void;
  pageTitle?: string;
  pageFavicon?: string;
}

export default function URLBar({
  value, onChange, onNavigate, onBack, onForward, onReload,
  isLoading, isBookmarked, onBookmark, pageTitle, pageFavicon,
}: Props) {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onNavigate(value);
      (e.target as HTMLInputElement).blur();
    }
  };

  const isHttps = value.startsWith('https://');
  const isNewtab = !value || value === 'newtab';

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#0e0e16] border-b border-white/5">
      {/* Page Info */}
      {pageTitle && pageTitle !== 'New Tab' && (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
          {pageFavicon ? (
            <img src={pageFavicon} alt="" className="w-4 h-4 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <Globe size={14} className="text-gray-500" />
          )}
          <span className="text-gray-300 text-xs truncate max-w-[120px]">{pageTitle.replace('https://', '').replace('http://', '').split('/')[0]}</span>
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onBack}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={15} />
        </button>
        <button
          onClick={onForward}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
        >
          <ArrowRight size={15} />
        </button>
        <button
          onClick={onReload}
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all ${isLoading ? 'text-blue-400' : ''}`}
        >
          <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* URL input */}
      <div className={`flex-1 flex items-center gap-2 bg-white/5 border rounded-xl px-3 h-8 transition-all duration-200 ${
        focused ? 'border-blue-500/40 bg-white/8' : 'border-white/8 hover:border-white/15'
      }`}>
        {!focused && (
          <>
            {isNewtab ? (
              <Search size={12} className="text-gray-500 flex-shrink-0" />
            ) : (
              <Shield size={12} className={`flex-shrink-0 ${isHttps ? 'text-green-400' : 'text-yellow-400'}`} />
            )}
          </>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={(e) => { setFocused(true); e.target.select(); }}
          onBlur={() => setFocused(false)}
          placeholder="Search or enter URL..."
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none min-w-0"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onBookmark}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
            isBookmarked ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          <Star size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}
