import { useState } from 'react';
import type { Profile } from '../types/browser';

const AVATARS = ['🦊', '🐺', '🐉', '🦅', '🌙', '⚡', '🔥', '🌊', '🎯', '💎'];

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(() => {
    try {
      const raw = localStorage.getItem('sc1_profile');
      return raw ? (JSON.parse(raw) as Profile) : null;
    } catch {
      return null;
    }
  });

  const createProfile = (name: string, avatarIndex: number) => {
    const p: Profile = {
      name: name.trim(),
      avatar: AVATARS[avatarIndex] ?? AVATARS[0],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('sc1_profile', JSON.stringify(p));
    setProfile(p);
  };

  const updateProfile = (updates: Partial<Profile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    localStorage.setItem('sc1_profile', JSON.stringify(updated));
    setProfile(updated);
  };

  const deleteProfile = () => {
    localStorage.removeItem('sc1_profile');
    setProfile(null);
  };

  return { profile, createProfile, updateProfile, deleteProfile, AVATARS };
}
