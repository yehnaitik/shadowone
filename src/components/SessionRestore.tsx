import { RotateCcw, X, Clock } from 'lucide-react';
import type { Tab } from '../types/browser';

interface Props {
  tabs: Tab[];
  onRestore: () => void;
  onDismiss: () => void;
}

export default function SessionRestore({ tabs, onRestore, onDismiss }: Props) {
  const visibleTabs = tabs.filter((t) => t.url !== 'newtab').slice(0, 6);
  const count = tabs.filter((t) => t.url !== 'newtab').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <RotateCcw size={18} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Restore Previous Session?</h2>
              <p className="text-gray-400 text-xs mt-0.5">
                {count} tab{count !== 1 ? 's' : ''} from your last session
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-600 hover:text-gray-400 transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        {visibleTabs.length > 0 && (
          <div className="mb-5 space-y-1.5">
            {visibleTabs.map((tab) => (
              <div key={tab.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                <Clock size={12} className="text-gray-500 flex-shrink-0" />
                <span className="text-gray-300 text-xs truncate">{tab.title || tab.url}</span>
              </div>
            ))}
            {count > 6 && (
              <p className="text-gray-600 text-xs px-3">+{count - 6} more tabs</p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onDismiss}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-all"
          >
            New Session
          </button>
          <button
            onClick={onRestore}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
          >
            Restore Tabs
          </button>
        </div>
      </div>
    </div>
  );
}
