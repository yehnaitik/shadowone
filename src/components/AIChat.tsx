import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, User, Loader2 } from 'lucide-react';
import type { AIMessage } from '../types/browser';

interface Props {
  onClose: () => void;
}

const MOCK_RESPONSES: Record<string, string> = {
  default: "I'm ShadowCore AI, your built-in browser assistant. I can help you search the web, summarize content, answer questions, or help you navigate. What would you like to do?",
  hello: "Hey there! I'm ShadowCore AI. Ready to help you browse smarter. Ask me anything!",
  help: "I can help you:\n• Summarize web pages\n• Answer questions\n• Suggest searches\n• Help with productivity tasks\n• Explain concepts\n\nJust ask!",
  search: "To search the web, type your query in the address bar at the top or use the search box on the new tab page. I can also suggest relevant sites for your topic.",
  time: `The current time is ${new Date().toLocaleTimeString()}. Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}.`,
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return MOCK_RESPONSES.hello;
  if (lower.includes('help') || lower.includes('what can you do')) return MOCK_RESPONSES.help;
  if (lower.includes('search') || lower.includes('find')) return MOCK_RESPONSES.search;
  if (lower.includes('time') || lower.includes('date') || lower.includes('today')) return MOCK_RESPONSES.time;
  if (lower.includes('shadowcore') || lower.includes('browser')) {
    return "ShadowCore One is a next-generation browser designed for Linux (Zorin OS). It runs websites virtually in memory — no cache stored on disk. Only downloads take actual disk space. It features profiles, session restore, and this AI assistant!";
  }
  if (lower.includes('weather')) {
    return "I don't have real-time weather data in this demo. To check the weather, try searching 'weather [your city]' in the address bar!";
  }
  if (lower.includes('tab') || lower.includes('window')) {
    return "You can manage tabs using the tab bar at the top. Click + to open a new tab, or click X on any tab to close it. Your session is saved and can be restored next time you open the browser.";
  }
  return `I received: "${input}"\n\nTo connect this AI to a real model (like GPT-4, Claude, or Gemini), configure an API key in Settings → AI Assistant. In demo mode, I have limited responses.`;
}

const generateId = () => Math.random().toString(36).slice(2, 10);

export default function AIChat({ onClose }: Props) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: "Hi! I'm ShadowCore AI — your built-in browser assistant. Ask me anything, or type 'help' to see what I can do.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: AIMessage = {
      id: generateId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));

    const aiMsg: AIMessage = {
      id: generateId(),
      role: 'assistant',
      content: getMockResponse(userMsg.content),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="w-80 bg-[#0e0e16] border-l border-white/5 flex flex-col h-full flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
            <Bot size={14} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">ShadowCore AI</p>
            <p className="text-gray-500 text-[10px]">Browser Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors p-1">
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === 'assistant'
                ? 'bg-gradient-to-br from-cyan-600 to-blue-600'
                : 'bg-white/10'
            }`}>
              {msg.role === 'assistant' ? (
                <Sparkles size={11} className="text-white" />
              ) : (
                <User size={11} className="text-gray-300" />
              )}
            </div>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-600/30 text-blue-100 rounded-tr-sm'
                : 'bg-white/5 text-gray-200 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex-shrink-0 flex items-center justify-center">
              <Sparkles size={11} className="text-white" />
            </div>
            <div className="bg-white/5 px-3 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              <Loader2 size={12} className="text-gray-400 animate-spin" />
              <span className="text-gray-500 text-xs">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
        {['What can you do?', 'Current time', 'About ShadowCore'].map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 px-2.5 py-1 rounded-full border border-white/8 transition-all"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={send} className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-blue-500/40 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-white text-xs placeholder-gray-600 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-6 h-6 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-gray-600 rounded-lg flex items-center justify-center transition-all"
          >
            <Send size={11} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
