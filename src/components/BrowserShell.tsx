import { useState, useCallback } from 'react';
import TabBar from './TabBar';
import URLBar from './URLBar';
import Sidebar from './Sidebar';
import SidebarPanel from './SidebarPanel';
import NewTab from './NewTab';
import WebView from './WebView';
import AIChat from './AIChat';
import ExtensionHub from './ExtensionHub';
import MailCalendar from './MailCalendar';
import FloatingAIButton from './FloatingAIButton';
import type { Profile, SidebarSection, Tab } from '../types/browser';
import { useBrowser } from '../hooks/useBrowser';

interface Props {
  profile: Profile;
  restoredTabs?: Tab[];
}

export default function BrowserShell({ profile, restoredTabs = [] }: Props) {
  const browser = useBrowser(restoredTabs);
  const [sidebarSection, setSidebarSection] = useState<SidebarSection>('home');
  const [aiOpen, setAiOpen] = useState(false);
  const [mailCalendarOpen, setMailCalendarOpen] = useState(false);
  const [mailCalendarTab, setMailCalendarTab] = useState<'mail' | 'calendar'>('mail');

  const showPanel = sidebarSection !== 'home';

  const handleBookmark = useCallback(() => {
    if (!browser.activeTab) return;
    if (browser.isBookmarked(browser.activeTab.url)) return;
    browser.addBookmark(browser.activeTab.title, browser.activeTab.url);
  }, [browser]);

  const handleSidebarSelect = (s: SidebarSection) => {
    setSidebarSection((prev) => (prev === s ? 'home' : s));
  };

  const handleScreenshotCapture = (imageData: string, text: string) => {
    setAiOpen(true);
    // Pass screenshot data to AI chat
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0a0a12] text-white select-none">
      {/* Tab bar */}
      <TabBar
        tabs={browser.tabs}
        activeTabId={browser.activeTabId}
        onSelect={browser.setActiveTabId}
        onClose={browser.closeTab}
        onNew={() => browser.newTab()}
      />

      {/* URL bar */}
      <URLBar
        value={browser.urlBarValue}
        onChange={browser.setUrlBarValue}
        onNavigate={browser.navigate}
        onBack={browser.goBack}
        onForward={browser.goForward}
        onReload={browser.reload}
        isLoading={browser.activeTab?.isLoading ?? false}
        isBookmarked={browser.isBookmarked(browser.activeTab?.url ?? '')}
        onBookmark={handleBookmark}
        pageTitle={browser.activeTab?.title}
        pageFavicon={browser.activeTab?.favicon}
      />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <Sidebar
          active={sidebarSection}
          onSelect={handleSidebarSelect}
          profile={profile}
          onAIToggle={() => setAiOpen((o) => !o)}
          aiOpen={aiOpen}
          onMailOpen={() => { setMailCalendarOpen(true); setMailCalendarTab('mail'); }}
          onCalendarOpen={() => { setMailCalendarOpen(true); setMailCalendarTab('calendar'); }}
        />

        {/* Sidebar panel or Extensions Hub */}
        {sidebarSection === 'extensions' ? (
          <ExtensionHub />
        ) : showPanel ? (
          <SidebarPanel
            section={sidebarSection}
            bookmarks={browser.bookmarks}
            history={browser.history}
            downloads={browser.downloads}
            notes={browser.notes}
            onClose={() => setSidebarSection('home')}
            onNavigate={(url) => { browser.navigate(url); setSidebarSection('home'); }}
            onDeleteNote={browser.deleteNote}
            onRemoveBookmark={browser.removeBookmark}
          />
        ) : null}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {browser.activeTab?.url === 'newtab' || !browser.activeTab ? (
            <NewTab
              profileName={profile.name}
              quickLinks={browser.quickLinks}
              todos={browser.todos}
              notes={browser.notes}
              recentHistory={browser.history}
              onNavigate={browser.navigate}
              onToggleTodo={browser.toggleTodo}
              onAddTodo={browser.addTodo}
              onAddQuickLink={browser.addQuickLink}
              onRemoveQuickLink={browser.removeQuickLink}
              onAddNote={browser.addNote}
            />
          ) : (
            <WebView
              url={browser.activeTab.url}
              tabId={browser.activeTab.id}
              onTitleChange={browser.updateTabTitle}
              onFaviconChange={browser.updateTabFavicon}
              onLoadComplete={(id) => browser.updateTabLoading(id, false)}
            />
          )}

          {/* Floating AI Button */}
          {browser.activeTab?.url !== 'newtab' && (
            <FloatingAIButton onScreenshotCapture={handleScreenshotCapture} />
          )}
        </div>

        {/* AI Chat panel */}
        {aiOpen && <AIChat onClose={() => setAiOpen(false)} />}
      </div>

      {/* Mail & Calendar Modal */}
      {mailCalendarOpen && (
        <MailCalendar
          tab={mailCalendarTab}
          onTabChange={setMailCalendarTab}
          onClose={() => setMailCalendarOpen(false)}
        />
      )}
    </div>
  );
}
