import { useState, useEffect, useCallback } from 'react';
import {
  Search, Plus, X, Check, Timer, Play, Pause, RotateCcw,
  ExternalLink, ChevronRight, Music, Quote,
} from 'lucide-react';
import type { QuickLink, TodoItem, Note } from '../types/browser';

interface Props {
  profileName: string;
  quickLinks: QuickLink[];
  todos: TodoItem[];
  notes: Note[];
  recentHistory: { title: string; url: string; favicon?: string }[];
  onNavigate: (url: string) => void;
  onToggleTodo: (id: string) => void;
  onAddTodo: (text: string) => void;
  onAddQuickLink: (title: string, url: string) => void;
  onRemoveQuickLink: (id: string) => void;
  onAddNote: (content: string) => void;
}

const STORIES = [
  { title: 'The future of AI is closer than you think', source: 'The Verge', time: '2h ago', img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&fit=crop' },
  { title: 'This productivity hack changed how I work', source: 'Medium', time: '4h ago', img: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&fit=crop' },
  { title: 'Why discipline beats motivation every time', source: 'Mindset', time: '6h ago', img: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&fit=crop' },
];

const MUSIC = [
  { title: 'Sweater Weather', artist: 'The Neighbourhood', color: 'bg-emerald-500' },
  { title: 'Sunflower', artist: 'Rex Orange County', color: 'bg-orange-400' },
  { title: '505', artist: 'Arctic Monkeys', color: 'bg-sky-500' },
  { title: 'Lovely', artist: 'Billie Eilish', color: 'bg-rose-500' },
];

const QUOTE = { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' };

function getGreeting(name: string) {
  const h = new Date().getHours();
  if (h < 12) return `Good morning, ${name}`;
  if (h < 17) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}

function useTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function PomodoroTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const reset = () => { setSeconds(25 * 60); setRunning(false); };
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  return (
    <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-white text-sm font-semibold">Focus</span>
        <Timer size={14} className="text-gray-500" />
      </div>
      <div className="text-center">
        <div className="text-4xl font-black text-white tracking-tight">{m}:{s}</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 rounded-xl transition-all"
        >
          {running ? <Pause size={12} /> : <Play size={12} />}
          {running ? 'Pause' : 'Start focus session'}
        </button>
        <button onClick={reset} className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all">
          <RotateCcw size={12} />
        </button>
      </div>
      <p className="text-gray-600 text-xs text-center">Pomodoro — 25 min</p>
    </div>
  );
}

export default function NewTab({
  profileName, quickLinks, todos, notes, recentHistory,
  onNavigate, onToggleTodo, onAddTodo, onAddQuickLink, onRemoveQuickLink, onAddNote,
}: Props) {
  const now = useTime();
  const [search, setSearch] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [showAddLink, setShowAddLink] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [editingNote, setEditingNote] = useState(false);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    onNavigate(search.trim());
    setSearch('');
  }, [search, onNavigate]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    onAddTodo(newTodo.trim());
    setNewTodo('');
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;
    onAddQuickLink(newLinkTitle.trim(), newLinkUrl.trim());
    setNewLinkTitle('');
    setNewLinkUrl('');
    setShowAddLink(false);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    onAddNote(noteInput.trim());
    setNoteInput('');
    setEditingNote(false);
  };

  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const recentSites = recentHistory.slice(0, 5);

  return (
    <div
      className="flex-1 overflow-y-auto relative"
      style={{ background: 'linear-gradient(135deg, #0a0a12 0%, #0d0d1a 50%, #090912 100%)' }}
    >
      {/* Hero banner */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src="https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a12]/60 to-[#0a0a12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12]/80 to-transparent" />

        {/* Logo + name */}
        <div className="absolute top-5 left-6 flex items-center gap-3">
          <div className="w-10 h-10">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              <defs>
                <linearGradient id="nt-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#1a1a2e' }} />
                  <stop offset="100%" style={{ stopColor: '#0d0d1a' }} />
                </linearGradient>
                <linearGradient id="nt-g2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4a9eff' }} />
                  <stop offset="100%" style={{ stopColor: '#00d4ff' }} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#nt-g1)" stroke="#2a2a4a" strokeWidth="2" />
              <path d="M 28 50 A 22 22 0 1 1 72 50 A 22 22 0 0 1 28 50" fill="none" stroke="#3a3a5a" strokeWidth="6" strokeLinecap="round" />
              <text x="50" y="57" textAnchor="middle" fill="url(#nt-g2)" fontSize="30" fontWeight="900" fontFamily="Arial Black, sans-serif">S</text>
              <text x="74" y="43" textAnchor="middle" fill="url(#nt-g2)" fontSize="17" fontWeight="900" fontFamily="Arial Black, sans-serif">1</text>
            </svg>
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-widest leading-none">SHADOWCORE</p>
            <p className="text-blue-400 font-black text-[11px] tracking-[0.25em]">ONE</p>
          </div>
        </div>

        {/* Greeting */}
        <div className="absolute bottom-8 left-6">
          <h1 className="text-white text-3xl font-black">{getGreeting(profileName)}</h1>
          <p className="text-gray-400 text-sm mt-0.5">Stay focused. Make it happen.</p>
        </div>

        {/* Date/time */}
        <div className="absolute top-5 right-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-right">
          <p className="text-gray-400 text-xs">{dateStr}</p>
          <p className="text-white text-3xl font-black leading-none mt-1">{timeStr}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 pb-8 space-y-6">
        {/* Search */}
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the web..."
              className="w-full bg-white/6 border border-white/10 rounded-2xl pl-11 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/40 focus:bg-white/8 transition-all text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all">
              <Search size={13} className="text-white" />
            </button>
          </div>
        </form>

        {/* Quick access */}
        <div>
          <h3 className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">Quick access</h3>
          <div className="flex flex-wrap gap-4">
            {quickLinks.map((link) => (
              <div key={link.id} className="relative group flex flex-col items-center gap-1.5">
                <button
                  onClick={() => onNavigate(link.url)}
                  className="w-14 h-14 bg-white/6 hover:bg-white/10 border border-white/8 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:border-blue-500/30"
                >
                  {link.favicon ? (
                    <img src={link.favicon} alt={link.title} className="w-7 h-7 object-contain" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
                  ) : (
                    <Globe2 url={link.url} />
                  )}
                </button>
                <span className="text-gray-400 text-[11px] text-center leading-tight max-w-[60px] truncate">{link.title}</span>
                <button
                  onClick={() => onRemoveQuickLink(link.id)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full items-center justify-center hidden group-hover:flex"
                >
                  <X size={8} className="text-white" />
                </button>
              </div>
            ))}
            {/* Add shortcut */}
            {!showAddLink && (
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setShowAddLink(true)}
                  className="w-14 h-14 bg-white/4 hover:bg-white/8 border border-dashed border-white/15 rounded-2xl flex items-center justify-center transition-all text-gray-600 hover:text-gray-400"
                >
                  <Plus size={18} />
                </button>
                <span className="text-gray-600 text-[11px]">Add</span>
              </div>
            )}
          </div>
          {showAddLink && (
            <form onSubmit={handleAddLink} className="mt-3 flex gap-2 items-center">
              <input
                autoFocus
                type="text"
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
                placeholder="Title"
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500/40 w-28"
              />
              <input
                type="text"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                placeholder="https://..."
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500/40 flex-1"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-2 rounded-xl transition-all">Add</button>
              <button type="button" onClick={() => setShowAddLink(false)} className="text-gray-500 hover:text-gray-300 text-xs px-2 py-2">Cancel</button>
            </form>
          )}
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* Today / Todos */}
          <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">Today</span>
              <button onClick={() => setNewTodo('')} className="text-gray-500 hover:text-white">
                <Plus size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {todos.map((todo) => (
                <button
                  key={todo.id}
                  onClick={() => onToggleTodo(todo.id)}
                  className="flex items-center gap-2.5 w-full text-left group"
                >
                  <div className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all ${
                    todo.completed ? 'bg-blue-600 border-blue-600' : 'border-white/20 group-hover:border-white/40'
                  }`}>
                    {todo.completed && <Check size={9} className="text-white" />}
                  </div>
                  <span className={`text-xs transition-all ${todo.completed ? 'line-through text-gray-600' : 'text-gray-300 group-hover:text-white'}`}>
                    {todo.text}
                  </span>
                </button>
              ))}
            </div>
            <form onSubmit={handleAddTodo}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add task..."
                className="w-full bg-transparent border-b border-white/10 pb-1 text-xs text-gray-400 placeholder-gray-700 focus:outline-none focus:border-blue-500/40"
              />
            </form>
          </div>

          {/* Pomodoro */}
          <PomodoroTimer />

          {/* Top stories */}
          <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">Top stories</span>
              <button className="text-gray-500 hover:text-white text-xs">View all</button>
            </div>
            <div className="space-y-3">
              {STORIES.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 cursor-pointer group">
                  <img src={s.img} alt="" className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-200 text-xs font-medium leading-tight group-hover:text-white transition-colors line-clamp-2">{s.title}</p>
                    <p className="text-gray-600 text-[10px] mt-1">{s.source} • {s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Good vibes / Music */}
          <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">Good vibes</span>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Music size={11} className="text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              {MUSIC.map((m, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg ${m.color} flex-shrink-0 flex items-center justify-center`}>
                    <Music size={12} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-200 text-xs font-medium truncate">{m.title}</p>
                    <p className="text-gray-600 text-[10px]">{m.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Quote */}
          <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
            <Quote size={18} className="text-gray-600" />
            <p className="text-gray-300 text-sm leading-relaxed italic">"{QUOTE.text}"</p>
            <p className="text-gray-600 text-xs">— {QUOTE.author}</p>
          </div>

          {/* Recently visited */}
          <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">Recently visited</span>
              <button className="text-gray-500 hover:text-white text-xs">View all</button>
            </div>
            {recentSites.length === 0 ? (
              <p className="text-gray-600 text-xs">No recent sites</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {recentSites.map((site, i) => {
                  const domain = (() => { try { return new URL(site.url).hostname; } catch { return site.url; } })();
                  return (
                    <button
                      key={i}
                      onClick={() => onNavigate(site.url)}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div className="w-12 h-12 bg-white/6 hover:bg-white/10 border border-white/8 rounded-xl flex items-center justify-center transition-all">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                          alt=""
                          className="w-6 h-6 object-contain"
                          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                        />
                      </div>
                      <span className="text-gray-500 text-[10px] group-hover:text-gray-300 transition-colors truncate max-w-[52px]">
                        {domain.replace('www.', '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">Notes</span>
              <button onClick={() => setEditingNote(true)} className="text-gray-500 hover:text-white">
                <Plus size={14} />
              </button>
            </div>
            {editingNote ? (
              <form onSubmit={handleSaveNote} className="flex flex-col gap-2">
                <textarea
                  autoFocus
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Write something..."
                  rows={3}
                  className="bg-white/5 border border-white/10 rounded-xl p-2 text-white text-xs placeholder-gray-700 focus:outline-none focus:border-blue-500/40 resize-none"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs py-1.5 rounded-lg transition-all">Save</button>
                  <button type="button" onClick={() => setEditingNote(false)} className="text-gray-500 text-xs px-2">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                {notes.slice(0, 3).map((note) => (
                  <div key={note.id} className="bg-white/5 rounded-xl p-2.5">
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">{note.content}</p>
                  </div>
                ))}
                {notes.length === 0 && (
                  <p className="text-gray-700 text-xs">No notes yet. Click + to add one.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer: recently visited external links */}
        {recentSites.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <ExternalLink size={11} />
            <span>Click any site to navigate • ShadowCore One runs sites in memory — no cache stored on disk</span>
            <ChevronRight size={11} />
          </div>
        )}
      </div>
    </div>
  );
}

// Mini favicon fallback
function Globe2({ url }: { url: string }) {
  const domain = (() => { try { return new URL(url).hostname; } catch { return ''; } })();
  const letter = (domain.replace('www.', '')[0] ?? '?').toUpperCase();
  return (
    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold">
      {letter}
    </div>
  );
}
