import React from 'react';
import {
  ShieldAlert,
  Home,
  FolderArchive,
  Crosshair,
  Bug,
  BookOpen,
  Link2,
  X,
  FileCheck,
  Terminal,
} from 'lucide-react';

export type NavTab = 'home' | 'incidents' | 'threat-analysis' | 'vulnerabilities' | 'research-notes' | 'sources';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpen: boolean;
  onClose: () => void;
  stats?: {
    totalIncidents: number;
    totalTechniques: number;
    totalVulnerabilities: number;
    totalResearchNotes: number;
    totalSources: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onClose,
  stats,
}) => {
  const navItems = [
    { id: 'home' as NavTab, label: '首頁', sub: 'Home', icon: Home },
    { id: 'incidents' as NavTab, label: '事件索引', sub: 'Incident Archive', icon: FolderArchive, count: stats?.totalIncidents },
    { id: 'threat-analysis' as NavTab, label: '攻擊分析', sub: 'Threat Analysis', icon: Crosshair, count: stats?.totalTechniques },
    { id: 'vulnerabilities' as NavTab, label: '漏洞資訊', sub: 'Vulnerabilities', icon: Bug, count: stats?.totalVulnerabilities },
    { id: 'research-notes' as NavTab, label: '研究筆記', sub: 'Research Notes', icon: BookOpen, count: stats?.totalResearchNotes },
    { id: 'sources' as NavTab, label: '資料來源', sub: 'Sources', icon: Link2, count: stats?.totalSources },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-dark-sidebar border-r border-dark-border flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-dark-border bg-dark-sidebar/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyber-accent/15 border border-cyber-accent/40 flex items-center justify-center text-cyber-accent shadow-sm shadow-cyber-accent/20">
              <ShieldAlert className="w-5 h-5 text-cyber-accent" />
            </div>
            <div>
              <div className="font-bold text-sm text-cyber-text tracking-wide flex items-center gap-1.5">
                Cyber Incident Archive
              </div>
              <div className="text-[10px] text-cyber-muted font-mono tracking-wider">
                資安事件研究知識庫
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-cyber-muted hover:text-cyber-text hover:bg-dark-hover lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-cyber-muted/80">
            Navigation / 主導覽
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30 font-medium'
                    : 'text-cyber-muted hover:text-cyber-text hover:bg-dark-hover/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyber-accent' : 'text-cyber-muted group-hover:text-cyber-text'
                    }`}
                  />
                  <div className="text-left">
                    <span className="block leading-tight">{item.label}</span>
                    <span className="text-[10px] opacity-70 font-mono block leading-none">
                      {item.sub}
                    </span>
                  </div>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-cyber-accent/25 text-cyber-accent'
                        : 'bg-dark-card text-cyber-muted group-hover:text-cyber-text border border-dark-border'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info & AGENTS.md compliance indicator */}
        <div className="p-4 border-t border-dark-border bg-[#0E1624]/60 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-cyber-muted">
            <span className="flex items-center gap-1.5 text-cyber-accent">
              <Terminal className="w-3.5 h-3.5" />
              規範依據
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-emerald-400">
              AGENTS.md
            </span>
          </div>

          <div className="text-[11px] text-cyber-muted leading-relaxed">
            嚴格遵守事實與推論分離，維持 8 大必備研究章節。
          </div>

          <div className="pt-1 flex items-center gap-1.5 text-[11px] text-cyber-muted/70 font-mono">
            <FileCheck className="w-3 h-3 text-cyber-accent/80" />
            <span>DESIGN.md 深色報告風格</span>
          </div>
        </div>
      </aside>
    </>
  );
};
