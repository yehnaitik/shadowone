import {
  Home, Bookmark, History, Download, Puzzle, FileText,
  BookOpen, Settings, Sliders, Mail, Calendar, Clipboard,
  Bot, LogOut, Plus,
} from 'lucide-react';
import type { SidebarSection } from '../types/browser';
import type { Profile } from '../types/browser';
import { useState } from 'react';

interface Props {
  active: SidebarSection;
  onSelect: (s: SidebarSection) => void;
  profile: Profile;
  onAIToggle: () => void;
  aiOpen: boolean;
  onProfileSwitch?: (profile: Profile) => void;
  onMailOpen?: () => void;
  onCalendarOpen?: () => void;
}

const TOP_NAV = [
  { id: 'home' as SidebarSection, label: 'Home', icon: Home },
  { id: 'bookmarks' as SidebarSection, label: 'Bookmarks', icon: Bookmark },
  { id: 'history' as SidebarSection, label: 'History', icon: History },
  { id: 'downloads' as SidebarSection, label: 'Downloads', icon: Download },
  { id: 'extensions' as SidebarSection, label: 'Extensions', icon: Puzzle },
  { id: 'notes' as SidebarSection, label: 'Notes', icon: FileText },
  { id: 'reading-list' as SidebarSection, label: 'Reading List', icon: BookOpen },
];

const EXTERNAL = [
  { id: 'mail', label: 'Mail', icon: Mail },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
];

const BOTTOM_NAV = [
  { id: 'settings' as SidebarSection, label: 'Settings', icon: Settings },
  { id: 'customize' as SidebarSection, label: 'Customize', icon: Sliders },
];

export default function Sidebar({
  active,
  onSelect,
  profile,
  onAIToggle,
  aiOpen,
  onProfileSwitch,
  onMailOpen,
  onCalendarOpen,
}: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <aside className="w-56 bg-[#0e0e16] border-r border-white/5 flex flex-col h-full flex-shrink-0 select-none">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/5">
        <div className="w-8 h-8 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1a1a2e' }} />
                <stop offset="100%" style={{ stopColor: '#0d0d1a' }} />
              </linearGradient>
              <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4a9eff' }} />
                <stop offset="100%" style={{ stopColor: '#00d4ff' }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#sg1)" stroke="#2a2a4a" strokeWidth="2" />
            <path d="M 28 50 A 22 22 0 1 1 72 50 A 22 22 0 0 1 28 50" fill="none" stroke="#3a3a5a" strokeWidth="6" strokeLinecap="round" />
            <text x="50" y="57" textAnchor="middle" fill="url(#sg2)" fontSize="30" fontWeight="900" fontFamily="Arial Black, sans-serif">S</text>
            <text x="74" y="43" textAnchor="middle" fill="url(#sg2)" fontSize="17" fontWeight="900" fontFamily="Arial Black, sans-serif">1</text>
          </svg>
        </div>
        <div>
          <p className="text-white text-xs font-black tracking-widest leading-none">SHADOWCORE</p>
          <p className="text-blue-400 text-[10px] font-black tracking-[0.2em] leading-tight">ONE</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 flex flex-col gap-0.5 px-2">
        {TOP_NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-all duration-150 group ${
              active === id
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <Icon size={16} className={`flex-shrink-0 ${active === id ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}

        <div className="border-t border-white/5 my-2" />

        {EXTERNAL.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              if (id === 'mail') onMailOpen?.();
              else if (id === 'calendar') onCalendarOpen?.();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-all duration-150 text-gray-400 hover:bg-white/5 hover:text-gray-200 group"
          >
            <Icon size={16} className="flex-shrink-0 text-gray-500 group-hover:text-gray-300" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}

        {/* AI Button */}
        <div className="border-t border-white/5 my-2" />
        <button
          onClick={onAIToggle}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-all duration-150 group ${
            aiOpen ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
          }`}
        >
          <Bot size={16} className={`flex-shrink-0 ${aiOpen ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
          <span className="text-sm font-medium">AI Assistant</span>
          {aiOpen && <span className="ml-auto text-[9px] bg-cyan-500/30 text-cyan-300 px-1.5 py-0.5 rounded-full font-semibold">ON</span>}
        </button>
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 px-2 py-2">
        {BOTTOM_NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-all duration-150 group ${
              active === id ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <Icon size={16} className="flex-shrink-0 text-gray-500 group-hover:text-gray-300" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}

        {/* Profile */}
        <div className="relative mt-2">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-sm flex-shrink-0">
              {profile.avatar}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-white text-xs font-semibold truncate">{profile.name}</p>
              <p className="text-gray-500 text-[10px]">Profile</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute bottom-full left-2 right-2 mb-2 bg-[#111118] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
              <button
                onClick={() => {
                  onSelect('customize');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-white/5 text-gray-300 text-xs border-b border-white/5"
              >
                <Settings size={12} />
                Profile Settings
              </button>
              <button
                onClick={() => {
                  onProfileSwitch?.(profile);
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-white/5 text-gray-300 text-xs border-b border-white/5"
              >
                <Plus size={12} />
                New Profile
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-red-500/10 text-red-400 text-xs">
                <LogOut size={12} />
                Switch Account
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
