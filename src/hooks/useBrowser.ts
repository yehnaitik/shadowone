import { useState, useCallback, useEffect } from 'react';
import type {
  Tab,
  BookmarkItem,
  HistoryItem,
  DownloadItem,
  Note,
  QuickLink,
  TodoItem,
} from '../types/browser';

const generateId = () => Math.random().toString(36).slice(2, 10);

const DEFAULT_QUICK_LINKS: QuickLink[] = [
  { id: '1', title: 'Google', url: 'https://google.com', favicon: 'https://www.google.com/favicon.ico' },
  { id: '2', title: 'YouTube', url: 'https://youtube.com', favicon: 'https://youtube.com/favicon.ico' },
  { id: '3', title: 'Gmail', url: 'https://mail.google.com', favicon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico' },
  { id: '4', title: 'Drive', url: 'https://drive.google.com', favicon: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png' },
  { id: '5', title: 'GitHub', url: 'https://github.com', favicon: 'https://github.githubassets.com/favicons/favicon.svg' },
  { id: '6', title: 'Reddit', url: 'https://reddit.com', favicon: 'https://www.reddit.com/favicon.ico' },
];

const DEFAULT_TODOS: TodoItem[] = [
  { id: '1', text: 'Check emails', completed: false },
  { id: '2', text: 'Review project notes', completed: true },
  { id: '3', text: 'Read chapter 4', completed: false },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key) ?? localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function savePersistent<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded – ignore, keep in memory
  }
}

export function useBrowser(initialTabs: Tab[] = []) {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    if (initialTabs.length > 0) return initialTabs;
    return loadFromStorage<Tab[]>('sc1_session_tabs', [
      { id: generateId(), url: 'newtab', title: 'New Tab', isLoading: false, isNew: true },
    ]);
  });
  const [activeTabId, setActiveTabId] = useState<string>(() => tabs[0]?.id ?? '');
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() =>
    loadFromStorage<BookmarkItem[]>('sc1_bookmarks', [])
  );
  const [history, setHistory] = useState<HistoryItem[]>(() =>
    loadFromStorage<HistoryItem[]>('sc1_history', [])
  );
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [notes, setNotes] = useState<Note[]>(() =>
    loadFromStorage<Note[]>('sc1_notes', [
      { id: '1', content: 'Ideas don\'t work unless you do.', createdAt: new Date().toISOString() },
    ])
  );
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>(() =>
    loadFromStorage<QuickLink[]>('sc1_quicklinks', DEFAULT_QUICK_LINKS)
  );
  const [todos, setTodos] = useState<TodoItem[]>(() =>
    loadFromStorage<TodoItem[]>('sc1_todos', DEFAULT_TODOS)
  );
  const [urlBarValue, setUrlBarValue] = useState('');

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  // Persist session tabs (for restore on next open)
  useEffect(() => {
    const handler = () => {
      savePersistent('sc1_prev_session_tabs', JSON.stringify(tabs));
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [tabs]);

  useEffect(() => {
    savePersistent('sc1_bookmarks', bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    savePersistent('sc1_history', history);
  }, [history]);

  useEffect(() => {
    savePersistent('sc1_notes', notes);
  }, [notes]);

  useEffect(() => {
    savePersistent('sc1_quicklinks', quickLinks);
  }, [quickLinks]);

  useEffect(() => {
    savePersistent('sc1_todos', todos);
  }, [todos]);

  useEffect(() => {
    if (activeTab) {
      setUrlBarValue(activeTab.url === 'newtab' ? '' : activeTab.url);
    }
  }, [activeTabId, activeTab]);

  const newTab = useCallback((url = 'newtab') => {
    const id = generateId();
    const tab: Tab = { id, url, title: url === 'newtab' ? 'New Tab' : url, isLoading: url !== 'newtab', isNew: url === 'newtab' };
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(id);
    return id;
  }, []);

  const closeTab = useCallback((id: string) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) {
        const fresh: Tab = { id: generateId(), url: 'newtab', title: 'New Tab', isLoading: false, isNew: true };
        setActiveTabId(fresh.id);
        return [fresh];
      }
      if (id === activeTabId) {
        setActiveTabId(next[next.length - 1].id);
      }
      return next;
    });
  }, [activeTabId]);

  const navigate = useCallback((url: string) => {
    let finalUrl = url.trim();
    if (!finalUrl) return;
    if (finalUrl === 'newtab' || finalUrl === 'about:blank') {
      finalUrl = 'newtab';
    } else if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      if (finalUrl.includes('.') && !finalUrl.includes(' ')) {
        finalUrl = 'https://' + finalUrl;
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
      }
    }
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? { ...t, url: finalUrl, title: finalUrl, isLoading: true, isNew: false }
          : t
      )
    );
    setUrlBarValue(finalUrl === 'newtab' ? '' : finalUrl);
    if (finalUrl !== 'newtab') {
      const item: HistoryItem = {
        id: generateId(),
        title: finalUrl,
        url: finalUrl,
        visitedAt: new Date().toISOString(),
      };
      setHistory((prev) => [item, ...prev.slice(0, 199)]);
    }
  }, [activeTabId]);

  const updateTabTitle = useCallback((id: string, title: string) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, title, isLoading: false } : t)));
  }, []);

  const updateTabFavicon = useCallback((id: string, favicon: string) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, favicon } : t)));
  }, []);

  const updateTabLoading = useCallback((id: string, isLoading: boolean) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, isLoading } : t)));
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const goForward = useCallback(() => {
    window.history.forward();
  }, []);

  const reload = useCallback(() => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: true } : t))
    );
  }, [activeTabId]);

  const addBookmark = useCallback((title: string, url: string) => {
    const item: BookmarkItem = { id: generateId(), title, url, createdAt: new Date().toISOString() };
    setBookmarks((prev) => [item, ...prev]);
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const isBookmarked = useCallback(
    (url: string) => bookmarks.some((b) => b.url === url),
    [bookmarks]
  );

  const addNote = useCallback((content: string) => {
    const item: Note = { id: generateId(), content, createdAt: new Date().toISOString() };
    setNotes((prev) => [item, ...prev]);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    savePersistent('sc1_todos', todos);
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const item: TodoItem = { id: generateId(), text, completed: false };
    setTodos((prev) => [...prev, item]);
  }, []);

  const addQuickLink = useCallback((title: string, url: string) => {
    const item: QuickLink = { id: generateId(), title, url };
    setQuickLinks((prev) => [...prev, item]);
  }, []);

  const removeQuickLink = useCallback((id: string) => {
    setQuickLinks((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const restoreSession = useCallback((savedTabs: Tab[]) => {
    if (savedTabs.length === 0) return;
    setTabs(savedTabs.map((t) => ({ ...t, isLoading: t.url !== 'newtab' })));
    setActiveTabId(savedTabs[0].id);
  }, []);

  return {
    tabs,
    activeTabId,
    setActiveTabId,
    activeTab,
    urlBarValue,
    setUrlBarValue,
    bookmarks,
    history,
    downloads,
    notes,
    quickLinks,
    todos,
    newTab,
    closeTab,
    navigate,
    updateTabTitle,
    updateTabFavicon,
    updateTabLoading,
    goBack,
    goForward,
    reload,
    addBookmark,
    removeBookmark,
    isBookmarked,
    addNote,
    deleteNote,
    toggleTodo,
    addTodo,
    addQuickLink,
    removeQuickLink,
    restoreSession,
    setDownloads,
  };
}
