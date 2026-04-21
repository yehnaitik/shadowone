export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isLoading: boolean;
  isNew: boolean;
  domain?: string;
}

export interface Profile {
  name: string;
  createdAt: string;
  avatar: string;
}

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  visitedAt: string;
}

export interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  size?: string;
  status: 'downloading' | 'complete' | 'error';
  progress: number;
  startedAt: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  color?: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type SidebarSection =
  | 'home'
  | 'bookmarks'
  | 'history'
  | 'downloads'
  | 'extensions'
  | 'notes'
  | 'reading-list'
  | 'settings'
  | 'customize';
