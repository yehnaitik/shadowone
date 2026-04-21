import { X, Trash2, ExternalLink, Download, FileText, BookOpen } from 'lucide-react';
import type { SidebarSection, BookmarkItem, HistoryItem, DownloadItem, Note } from '../types/browser';

interface Props {
  section: SidebarSection;
  bookmarks: BookmarkItem[];
  history: HistoryItem[];
  downloads: DownloadItem[];
  notes: Note[];
  onClose: () => void;
  onNavigate: (url: string) => void;
  onDeleteNote: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
}

export default function SidebarPanel({
  section, bookmarks, history, downloads, notes,
  onClose, onNavigate, onDeleteNote, onRemoveBookmark,
}: Props) {
  if (section === 'home') return null;

  const LABELS: Record<string, string> = {
    bookmarks: 'Bookmarks',
    history: 'History',
    downloads: 'Downloads',
    extensions: 'Extensions',
    notes: 'Notes',
    'reading-list': 'Reading List',
    settings: 'Settings',
    customize: 'Customize',
  };

  return (
    <div className="w-64 bg-[#0e0e16] border-r border-white/5 flex flex-col h-full flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-white text-sm font-semibold">{LABELS[section] ?? section}</span>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors p-1">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {section === 'bookmarks' && (
          bookmarks.length === 0 ? (
            <p className="text-gray-600 text-xs text-center py-8">No bookmarks yet. Star a page to save it.</p>
          ) : bookmarks.map((b) => (
            <div key={b.id} className="flex items-center gap-2 group px-2 py-2 rounded-lg hover:bg-white/5">
              <img src={`https://www.google.com/s2/favicons?domain=${new URL(b.url).hostname}&sz=16`} alt="" className="w-4 h-4 flex-shrink-0" />
              <button onClick={() => onNavigate(b.url)} className="flex-1 text-left text-gray-300 text-xs truncate hover:text-white">{b.title}</button>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <button onClick={() => onNavigate(b.url)} className="text-gray-500 hover:text-blue-400"><ExternalLink size={11} /></button>
                <button onClick={() => onRemoveBookmark(b.id)} className="text-gray-500 hover:text-red-400"><Trash2 size={11} /></button>
              </div>
            </div>
          ))
        )}

        {section === 'history' && (
          history.length === 0 ? (
            <p className="text-gray-600 text-xs text-center py-8">No browsing history.</p>
          ) : history.map((h) => {
            const domain = (() => { try { return new URL(h.url).hostname; } catch { return h.url; } })();
            return (
              <div key={h.id} className="flex items-center gap-2 group px-2 py-2 rounded-lg hover:bg-white/5">
                <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`} alt="" className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <button onClick={() => onNavigate(h.url)} className="text-gray-300 text-xs truncate hover:text-white block w-full text-left">{h.title || domain}</button>
                  <span className="text-gray-600 text-[10px]">{new Date(h.visitedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            );
          })
        )}

        {section === 'downloads' && (
          downloads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <Download size={24} className="text-gray-700" />
              <p className="text-gray-600 text-xs">No downloads yet.</p>
              <p className="text-gray-700 text-[10px]">Files you download will appear here.</p>
            </div>
          ) : downloads.map((d) => (
            <div key={d.id} className="px-2 py-2 rounded-lg hover:bg-white/5">
              <div className="flex items-center gap-2">
                <FileText size={13} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs truncate flex-1">{d.filename}</span>
                <span className={`text-[10px] ${d.status === 'complete' ? 'text-green-400' : d.status === 'error' ? 'text-red-400' : 'text-blue-400'}`}>
                  {d.status}
                </span>
              </div>
              {d.status === 'downloading' && (
                <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${d.progress}%` }} />
                </div>
              )}
            </div>
          ))
        )}

        {section === 'notes' && (
          notes.length === 0 ? (
            <p className="text-gray-600 text-xs text-center py-8">No notes. Add one from the home page.</p>
          ) : notes.map((n) => (
            <div key={n.id} className="group bg-white/4 border border-white/8 rounded-xl p-3 relative">
              <p className="text-gray-300 text-xs leading-relaxed">{n.content}</p>
              <p className="text-gray-700 text-[10px] mt-2">{new Date(n.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => onDeleteNote(n.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))
        )}

        {section === 'reading-list' && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <BookOpen size={24} className="text-gray-700" />
            <p className="text-gray-600 text-xs">Your reading list is empty.</p>
            <p className="text-gray-700 text-[10px]">Save articles to read later.</p>
          </div>
        )}

        {section === 'extensions' && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-xs">Extensions coming soon.</p>
          </div>
        )}

        {section === 'settings' && (
          <div className="space-y-4 py-2">
            {['General', 'Privacy & Security', 'Appearance', 'AI Assistant', 'Downloads', 'Advanced'].map((s) => (
              <button key={s} className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-white/5 group transition-all">
                <span className="text-gray-300 text-xs font-medium group-hover:text-white">{s}</span>
                <span className="text-gray-600 group-hover:text-gray-400 text-xs">›</span>
              </button>
            ))}
          </div>
        )}

        {section === 'customize' && (
          <div className="space-y-4 py-2">
            <div>
              <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest mb-2 px-1">Theme</p>
              <div className="flex gap-2">
                {['Dark', 'Darker', 'OLED'].map((t) => (
                  <button key={t} className={`flex-1 py-1.5 rounded-lg border text-xs transition-all ${t === 'Dark' ? 'border-blue-500/50 bg-blue-500/10 text-blue-300' : 'border-white/10 text-gray-500 hover:border-white/20'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest mb-2 px-1">Accent Color</p>
              <div className="flex gap-2">
                {['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((c) => (
                  <button key={c} className="w-7 h-7 rounded-full border-2 border-white/20 hover:scale-110 transition-all" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
