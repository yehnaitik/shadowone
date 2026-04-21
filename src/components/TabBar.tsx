import { X, Plus, RefreshCw } from 'lucide-react';
import type { Tab } from '../types/browser';

interface Props {
  tabs: Tab[];
  activeTabId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onNew: () => void;
}

export default function TabBar({ tabs, activeTabId, onSelect, onClose, onNew }: Props) {
  return (
    <div className="flex items-center bg-[#0a0a12] border-b border-white/5 h-10 px-1 gap-0.5 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`group flex items-center gap-1.5 px-3 h-8 rounded-t-lg min-w-[120px] max-w-[200px] flex-shrink-0 transition-all duration-150 relative ${
            tab.id === activeTabId
              ? 'bg-[#111118] text-white border-t border-l border-r border-white/10'
              : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
          }`}
        >
          {tab.isLoading ? (
            <RefreshCw size={12} className="animate-spin text-blue-400 flex-shrink-0" />
          ) : tab.favicon ? (
            <img src={tab.favicon} alt="" className="w-3 h-3 flex-shrink-0 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 opacity-70" />
          )}
          <span className="text-xs truncate flex-1 text-left">{tab.title || 'New Tab'}</span>
          <span
            onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
            className={`ml-0.5 p-0.5 rounded-md transition-all duration-100 flex-shrink-0 ${
              tab.id === activeTabId
                ? 'opacity-60 hover:opacity-100 hover:bg-white/10'
                : 'opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:bg-white/10'
            }`}
          >
            <X size={10} />
          </span>
        </button>
      ))}
      <button
        onClick={onNew}
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all ml-0.5"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
