import { Mail, Calendar, X, Plus, Trash2, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

interface Props {
  onClose: () => void;
  tab: 'mail' | 'calendar';
  onTabChange: (tab: 'mail' | 'calendar') => void;
}

interface GoogleAuth {
  isAuthenticated: boolean;
  email?: string;
  accessToken?: string;
}

const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    from: 'noreply@github.com',
    subject: 'Your pull request was merged',
    preview: 'Congratulations! Your changes have been merged...',
    date: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    from: 'team@company.com',
    subject: 'Team meeting tomorrow at 10 AM',
    preview: 'Don\'t forget about our weekly sync...',
    date: '5 hours ago',
    read: true,
  },
  {
    id: '3',
    from: 'notifications@stripe.com',
    subject: 'Payment successful',
    preview: 'Your payment of $99 has been processed...',
    date: '1 day ago',
    read: true,
  },
];

const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    date: '2026-04-22',
    time: '10:00 AM',
    description: 'Daily team meeting',
  },
  {
    id: '2',
    title: 'Project Review',
    date: '2026-04-23',
    time: '2:00 PM',
    description: 'Q2 project review session',
  },
  {
    id: '3',
    title: 'Client Call',
    date: '2026-04-24',
    time: '3:30 PM',
    description: 'Discuss new requirements',
  },
];

export default function MailCalendar({ onClose, tab, onTabChange }: Props) {
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [googleAuth, setGoogleAuth] = useState<GoogleAuth>(() => {
    try {
      const stored = localStorage.getItem('sc1_google_auth');
      return stored ? JSON.parse(stored) : { isAuthenticated: false };
    } catch {
      return { isAuthenticated: false };
    }
  });

  useEffect(() => {
    localStorage.setItem('sc1_google_auth', JSON.stringify(googleAuth));
  }, [googleAuth]);

  const handleGoogleLogin = () => {
    // Simulate Google OAuth flow
    setGoogleAuth({
      isAuthenticated: true,
      email: 'user@gmail.com',
      accessToken: 'mock_access_token_' + Math.random().toString(36).slice(2),
    });
  };

  const handleGoogleLogout = () => {
    setGoogleAuth({ isAuthenticated: false });
  };

  const unreadCount = emails.filter((e) => !e.read).length;

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !newEventDate || !newEventTime) return;

    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).slice(2, 10),
      title: newEventTitle,
      date: newEventDate,
      time: newEventTime,
      description: '',
    };

    setEvents((prev) => [...prev, newEvent]);
    setNewEventTitle('');
    setNewEventDate('');
    setNewEventTime('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0e0e16] border border-white/10 rounded-2xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            {tab === 'mail' ? (
              <Mail size={20} className="text-blue-400" />
            ) : (
              <Calendar size={20} className="text-green-400" />
            )}
            <div>
              <h2 className="text-white font-bold text-lg">
                {tab === 'mail' ? 'Mail' : 'Calendar'}
                {tab === 'mail' && unreadCount > 0 && (
                  <span className="ml-2 text-xs bg-red-500/30 text-red-300 px-2 py-1 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </h2>
              {googleAuth.isAuthenticated && (
                <p className="text-gray-400 text-xs">{googleAuth.email}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {googleAuth.isAuthenticated ? (
              <button
                onClick={handleGoogleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors px-3 py-1 text-xs rounded-lg hover:bg-red-500/10"
              >
                <LogOut size={14} />
                Logout
              </button>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-500 transition-colors px-3 py-1 text-xs rounded-lg font-medium"
              >
                <LogIn size={14} />
                Google
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-300 transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pt-3 border-b border-white/5">
          <button
            onClick={() => onTabChange('mail')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
              tab === 'mail'
                ? 'bg-white/10 text-white border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Mail
          </button>
          <button
            onClick={() => onTabChange('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
              tab === 'calendar'
                ? 'bg-white/10 text-white border-b-2 border-green-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Calendar
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === 'mail' ? (
            <div className="space-y-2">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    email.read
                      ? 'bg-white/5 border-white/8 hover:border-white/15'
                      : 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-white font-semibold text-sm">{email.from}</p>
                      <p className={`text-sm font-medium ${email.read ? 'text-gray-400' : 'text-white'}`}>
                        {email.subject}
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap ml-2">{email.date}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{email.preview}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Add Event Form */}
              <form onSubmit={addEvent} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold text-sm mb-3">Add Event</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Event title"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500/40"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500/40"
                    />
                    <input
                      type="time"
                      value={newEventTime}
                      onChange={(e) => setNewEventTime(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500/40"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={14} />
                    Add Event
                  </button>
                </div>
              </form>

              {/* Events List */}
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-sm">Upcoming Events</h3>
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold text-sm">{event.title}</p>
                        <p className="text-gray-400 text-xs">
                          {event.date} at {event.time}
                        </p>
                      </div>
                      <button className="text-gray-600 hover:text-red-400 transition-colors p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {event.description && (
                      <p className="text-gray-400 text-xs">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
