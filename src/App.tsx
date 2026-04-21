import { useState, useEffect } from 'react';
import { useProfile } from './hooks/useProfile';
import ProfileSetup from './components/ProfileSetup';
import SessionRestore from './components/SessionRestore';
import BrowserShell from './components/BrowserShell';
import type { Tab } from './types/browser';

type AppState = 'profile-setup' | 'session-restore' | 'browser';

function loadPreviousSession(): Tab[] {
  try {
    const raw = localStorage.getItem('sc1_prev_session_tabs');
    if (!raw) return [];
    const tabs = JSON.parse(raw) as Tab[];
    return tabs.filter((t) => t.url && t.url !== 'newtab');
  } catch {
    return [];
  }
}

export default function App() {
  const { profile, createProfile } = useProfile();
  const [appState, setAppState] = useState<AppState>(() => {
    if (!localStorage.getItem('sc1_profile')) return 'profile-setup';
    const prev = loadPreviousSession();
    if (prev.length > 0) return 'session-restore';
    return 'browser';
  });
  const [prevSession] = useState<Tab[]>(loadPreviousSession);
  const [restoredTabs, setRestoredTabs] = useState<Tab[]>([]);

  useEffect(() => {
    if (profile && appState === 'profile-setup') {
      const prev = loadPreviousSession();
      if (prev.length > 0) {
        setAppState('session-restore');
      } else {
        setAppState('browser');
      }
    }
  }, [profile, appState]);

  const handleProfileCreated = (name: string, avatarIndex: number) => {
    createProfile(name, avatarIndex);
  };

  const handleSessionRestore = () => {
    setRestoredTabs(prevSession);
    localStorage.removeItem('sc1_prev_session_tabs');
    setAppState('browser');
  };

  const handleSessionDismiss = () => {
    localStorage.removeItem('sc1_prev_session_tabs');
    setAppState('browser');
  };

  if (appState === 'profile-setup' || !profile) {
    return <ProfileSetup onComplete={handleProfileCreated} />;
  }

  if (appState === 'session-restore') {
    return (
      <SessionRestore
        tabs={prevSession}
        onRestore={handleSessionRestore}
        onDismiss={handleSessionDismiss}
      />
    );
  }

  return <BrowserShell profile={profile} restoredTabs={restoredTabs} />;
}
