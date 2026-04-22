import { Download, Trash2, Settings, Star } from 'lucide-react';
import { useState } from 'react';

interface Extension {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  rating: number;
  installed: boolean;
  size: string;
}

const EXTENSIONS: Extension[] = [
  {
    id: '1',
    name: 'Dark Mode Pro',
    description: 'Advanced dark mode for all websites',
    version: '2.1.0',
    author: 'ShadowCore Dev',
    rating: 4.8,
    installed: true,
    size: '2.3 MB',
  },
  {
    id: '2',
    name: 'Password Manager',
    description: 'Secure password storage and autofill',
    version: '1.5.2',
    author: 'Security Team',
    rating: 4.9,
    installed: true,
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Grammar Checker',
    description: 'Real-time grammar and spell check',
    version: '3.0.1',
    author: 'Writing Tools',
    rating: 4.7,
    installed: true,
    size: '3.2 MB',
  },
  {
    id: '4',
    name: 'Video Downloader',
    description: 'Download videos from websites',
    version: '2.4.0',
    author: 'Media Tools',
    rating: 4.6,
    installed: true,
    size: '2.1 MB',
  },
  {
    id: '5',
    name: 'AdBlocker Plus',
    description: 'Block ads and trackers with full features enabled',
    version: '4.1.3',
    author: 'Privacy First',
    rating: 4.9,
    installed: true,
    size: '4.5 MB',
  },
  {
    id: '6',
    name: 'Tab Manager',
    description: 'Organize and manage multiple tabs',
    version: '1.2.0',
    author: 'Productivity',
    rating: 4.5,
    installed: true,
    size: '1.5 MB',
  },
  {
    id: '7',
    name: 'Google Drive Integration',
    description: 'Access and sync files with Google Drive',
    version: '2.0.5',
    author: 'Google Sync',
    rating: 4.8,
    installed: true,
    size: '2.8 MB',
  },
  {
    id: '8',
    name: 'Translator Pro',
    description: 'Instant translation for any language',
    version: '1.8.2',
    author: 'Language Tools',
    rating: 4.7,
    installed: true,
    size: '1.9 MB',
  },
];

export default function ExtensionHub() {
  const [extensions, setExtensions] = useState<Extension[]>(EXTENSIONS);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExtension = (id: string) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === id ? { ...ext, installed: !ext.installed } : ext
      )
    );
  };

  const filteredExtensions = extensions.filter((ext) =>
    ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ext.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const installedCount = extensions.filter((ext) => ext.installed).length;

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a12] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Extension Hub</h1>
          <p className="text-gray-400">
            {installedCount} extension{installedCount !== 1 ? 's' : ''} installed •{' '}
            {extensions.length} available
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search extensions..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/40"
          />
        </div>

        {/* Extensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExtensions.map((extension) => (
            <div
              key={extension.id}
              className="bg-[#111118] border border-white/8 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/15 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm">{extension.name}</h3>
                  <p className="text-gray-400 text-xs mt-1">{extension.description}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  <Star size={12} fill="currentColor" />
                  {extension.rating}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>v{extension.version}</span>
                <span>{extension.size}</span>
              </div>

              <div className="flex gap-2">
                {extension.installed ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs py-2 rounded-lg transition-all">
                      <Settings size={12} />
                      Settings
                    </button>
                    <button
                      onClick={() => toggleExtension(extension.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs py-2 rounded-lg transition-all"
                    >
                      <Trash2 size={12} />
                      Uninstall
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => toggleExtension(extension.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 rounded-lg transition-all"
                  >
                    <Download size={12} />
                    Install
                  </button>
                )}
              </div>

              <p className="text-gray-600 text-[10px]">by {extension.author}</p>
            </div>
          ))}
        </div>

        {filteredExtensions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-sm">No extensions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
