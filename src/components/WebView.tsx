import { useEffect, useRef, useState } from 'react';
import { Globe, ExternalLink } from 'lucide-react';

interface Props {
  url: string;
  tabId: string;
  onTitleChange: (id: string, title: string) => void;
  onFaviconChange?: (id: string, favicon: string) => void;
  onLoadComplete: (id: string) => void;
}

export default function WebView({ url, tabId, onTitleChange, onLoadComplete }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blocked, setBlocked] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setBlocked(false);
    setLoadError(false);
    const domain = (() => {
      try { return new URL(url).hostname; } catch { return url; }
    })();
    onTitleChange(tabId, domain);
  }, [url, tabId, onTitleChange]);

  const handleLoad = () => {
    onLoadComplete(tabId);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc) {
        const title = doc.title || url;
        if (title) onTitleChange(tabId, title);

        // Try to get favicon
        const favicon = doc.querySelector('link[rel*="icon"]') as HTMLLinkElement;
        if (favicon?.href && onFaviconChange) {
          onFaviconChange(tabId, favicon.href);
        }
      }
    } catch {
      // cross-origin — use domain
      const domain = (() => {
        try { return new URL(url).hostname; } catch { return url; }
      })();
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
      if (onFaviconChange) onFaviconChange(tabId, faviconUrl);
    }
  };

  const handleError = () => {
    setLoadError(true);
    onLoadComplete(tabId);
  };

  const openExternal = () => {
    window.open(url, '_blank', 'noopener');
  };

  // Detect if the iframe will be blocked (common sites that deny embedding)
  const BLOCKED_DOMAINS = [
    'google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'x.com',
    'instagram.com', 'tiktok.com', 'netflix.com', 'linkedin.com', 'reddit.com',
    'github.com', 'stackoverflow.com', 'amazon.com',
  ];

  const isLikelyBlocked = BLOCKED_DOMAINS.some((d) => url.includes(d));

  if (isLikelyBlocked || blocked || loadError) {
    const domain = (() => {
      try { return new URL(url).hostname; } catch { return url; }
    })();

    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-[#0a0a12]">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Globe size={28} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{domain}</h3>
            <p className="text-gray-400 text-sm mt-1">
              This site restricts embedding for security reasons.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              ShadowCore One runs websites virtually in memory — no cache stored on disk.
            </p>
          </div>
          <button
            onClick={openExternal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
          >
            <ExternalLink size={14} />
            Open in system browser
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative bg-white">
      <iframe
        ref={iframeRef}
        src={url}
        onLoad={handleLoad}
        onError={handleError}
        className="absolute inset-0 w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        title="web-content"
        onLoadStart={() => setBlocked(false)}
      />
    </div>
  );
}
