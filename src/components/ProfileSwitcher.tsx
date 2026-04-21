import { useState } from 'react';
import { User, Plus, LogOut, Settings } from 'lucide-react';
import type { Profile } from '../types/browser';

interface Props {
  currentProfile: Profile;
  onSwitchProfile: (profile: Profile) => void;
  onCreateProfile: () => void;
  onLogout: () => void;
}

const AVATARS = ['🦊', '🐺', '🐉', '🦅', '🌙', '⚡', '🔥', '🌊', '🎯', '💎'];

const MOCK_PROFILES: Profile[] = [
  {
    name: 'Developer',
    avatar: '⚡',
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Designer',
    avatar: '🎨',
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Student',
    avatar: '📚',
    createdAt: new Date().toISOString(),
  },
];

export default function ProfileSwitcher({
  currentProfile,
  onSwitchProfile,
  onCreateProfile,
  onLogout,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Current Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-sm flex-shrink-0">
          {currentProfile.avatar}
        </div>
        <div className="hidden lg:block">
          <p className="text-white text-xs font-semibold">{currentProfile.name}</p>
          <p className="text-gray-500 text-[10px]">Profile</p>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 bg-[#111118] border border-white/10 rounded-xl shadow-lg min-w-[200px] overflow-hidden z-50">
          {/* Current Profile */}
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-white text-sm font-semibold">{currentProfile.name}</p>
            <p className="text-gray-500 text-xs">Current profile</p>
          </div>

          {/* Available Profiles */}
          <div className="max-h-48 overflow-y-auto">
            {MOCK_PROFILES.map((profile) => (
              <button
                key={profile.name}
                onClick={() => {
                  onSwitchProfile(profile);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-all text-left"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-xs flex-shrink-0">
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 text-xs font-medium">{profile.name}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-white/5 p-2 space-y-1">
            <button
              onClick={() => {
                onCreateProfile();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white text-xs"
            >
              <Plus size={14} />
              <span>New Profile</span>
            </button>
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all text-gray-400 hover:text-red-400 text-xs"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
