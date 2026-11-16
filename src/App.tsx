import React, { useState } from 'react';
import archiveData from './data/archive-data.json';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ArchivePage } from './pages/ArchivePage';
import { IncidentDetailPage } from './pages/IncidentDetailPage';
import { ThreatAnalysisPage } from './pages/ThreatAnalysisPage';
import { VulnerabilitiesPage } from './pages/VulnerabilitiesPage';
import { ResearchNotesPage } from './pages/ResearchNotesPage';
import { SourcesPage } from './pages/SourcesPage';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Incidents data
  const incidents = archiveData.incidents || [];
  const techniques = archiveData.techniques || [];
  const vulnerabilities = archiveData.vulnerabilities || [];
  const researchNotes = archiveData.researchNotes || [];
  const sources = archiveData.sources || [];
  const stats = archiveData.stats || {
    totalIncidents: incidents.length,
    totalTechniques: techniques.length,
    totalVulnerabilities: vulnerabilities.length,
    totalResearchNotes: researchNotes.length,
    totalSources: sources.length,
  };

  const selectedIncident = incidents.find((i: any) => i.id === selectedIncidentId);

  const handleSelectIncident = (id: string) => {
    setSelectedIncidentId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToIncidents = () => {
    setSelectedIncidentId(null);
    setCurrentTab('incidents');
  };

  const handleNavigateTab = (tab: NavTab) => {
    setCurrentTab(tab);
    setSelectedIncidentId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header Title
  const getHeaderInfo = () => {
    if (selectedIncident) {
      return {
        title: selectedIncident.title,
        subtitle: `事件詳細研究報告 • ID: ${selectedIncident.id}`,
      };
    }
    switch (currentTab) {
      case 'home':
        return {
          title: 'Cyber Incident Archive',
          subtitle: '資安事件研究知識庫工作台',
        };
      case 'incidents':
        return {
          title: '事件索引 (Incident Archive)',
          subtitle: `全域事件總目錄 • 共 ${incidents.length} 篇研究資料`,
        };
      case 'threat-analysis':
        return {
          title: '攻擊手法與威脅分析 (Threat Analysis)',
          subtitle: 'MITRE ATT&CK 映射、攻擊鏈可視化與 IOC 指標庫',
        };
      case 'vulnerabilities':
        return {
          title: '漏洞資訊庫 (Vulnerabilities)',
          subtitle: 'CVE 弱點分析、受影響軟體與在野利用清單',
        };
      case 'research-notes':
        return {
          title: '個人研究筆記 (Research Notes)',
          subtitle: '深度技術心得、逆向鑑識與未解議題追蹤',
        };
      case 'sources':
        return {
          title: '資料來源 (Sources & Verification)',
          subtitle: '官方公告、資安機關通報與第一手鑑識依據',
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-dark-bg text-cyber-text flex flex-col lg:flex-row font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleNavigateTab}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        stats={stats}
      />

      {/* Main Content Area (offset by left sidebar on desktop) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sticky Header */}
        <Header
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {selectedIncident ? (
            <IncidentDetailPage
              incident={selectedIncident as any}
              onBack={handleBackToIncidents}
              onNavigateTab={handleNavigateTab}
            />
          ) : (
            <>
              {currentTab === 'home' && (
                <HomePage
                  stats={stats}
                  incidents={incidents as any}
                  onSelectIncident={handleSelectIncident}
                  onNavigateTab={handleNavigateTab}
                />
              )}
              {currentTab === 'incidents' && (
                <ArchivePage
                  incidents={incidents as any}
                  onSelectIncident={handleSelectIncident}
                />
              )}
              {currentTab === 'threat-analysis' && (
                <ThreatAnalysisPage
                  techniques={techniques}
                  onNavigateTab={handleNavigateTab}
                  onSelectIncident={handleSelectIncident}
                />
              )}
              {currentTab === 'vulnerabilities' && (
                <VulnerabilitiesPage
                  vulnerabilities={vulnerabilities}
                  incidents={incidents}
                  onSelectIncident={handleSelectIncident}
                />
              )}
              {currentTab === 'research-notes' && (
                <ResearchNotesPage
                  researchNotes={researchNotes}
                  onSelectIncident={handleSelectIncident}
                />
              )}
              {currentTab === 'sources' && (
                <SourcesPage
                  sources={sources}
                  onSelectIncident={handleSelectIncident}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        incidents={incidents as any}
        techniques={techniques}
        vulnerabilities={vulnerabilities}
        researchNotes={researchNotes}
        onSelectIncident={handleSelectIncident}
        onNavigateTab={handleNavigateTab}
      />
    </div>
  );
}

export default App;
