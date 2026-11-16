import React, { useState, useEffect } from 'react';
import { Search, X, FolderArchive, Crosshair, Bug, BookOpen, ArrowRight } from 'lucide-react';
import { IncidentData } from './IncidentCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidents: IncidentData[];
  techniques: any[];
  vulnerabilities: any[];
  researchNotes: any[];
  onSelectIncident: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  incidents,
  techniques,
  vulnerabilities,
  researchNotes,
  onSelectIncident,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent, but if open, toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredIncidents = q
    ? incidents.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.target.toLowerCase().includes(q) ||
          i.industry.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          i.cve.some((c) => c.toLowerCase().includes(q)) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const filteredTechniques = q
    ? techniques.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.mitreId.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q)
      )
    : [];

  const filteredVulns = q
    ? vulnerabilities.filter(
        (v) =>
          v.cveId.toLowerCase().includes(q) ||
          v.title.toLowerCase().includes(q) ||
          v.affectedSystems.toLowerCase().includes(q)
      )
    : [];

  const filteredNotes = q
    ? researchNotes.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.tags.some((t: string) => t.toLowerCase().includes(q))
      )
    : [];

  const totalResults =
    filteredIncidents.length +
    filteredTechniques.length +
    filteredVulns.length +
    filteredNotes.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-dark-sidebar border border-dark-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] animate-in fade-in duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-dark-border flex items-center gap-3 bg-dark-bg/60">
          <Search className="w-5 h-5 text-cyber-accent" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋事件名稱、受害實體、CVE 編號、MITRE 手法、IOC 特徵..."
            className="w-full bg-transparent text-sm text-cyber-text placeholder:text-cyber-muted/60 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-cyber-muted hover:text-cyber-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-12 text-center text-cyber-muted text-xs font-mono">
              請輸入關鍵字（例如：「Ivanti」、「Ransomware」、「CVE-2024」或「Citrix」）
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-cyber-muted text-xs font-mono">
              查無相符的研究資料。請嘗試其他技術關鍵字。
            </div>
          ) : (
            <>
              {/* Incidents */}
              {filteredIncidents.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-cyber-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>資安事件 ({filteredIncidents.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredIncidents.map((inc) => (
                      <div
                        key={inc.id}
                        onClick={() => {
                          onSelectIncident(inc.id);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border hover:border-cyber-accent/40 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-cyber-text group-hover:text-cyber-accent">
                            {inc.title}
                          </div>
                          <div className="text-xs text-cyber-muted font-mono mt-0.5">
                            {inc.date} • {inc.target} • {inc.industry}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyber-muted group-hover:text-cyber-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vulnerabilities */}
              {filteredVulns.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Bug className="w-3.5 h-3.5" />
                    <span>漏洞資訊 ({filteredVulns.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredVulns.map((v) => (
                      <div
                        key={v.cveId}
                        onClick={() => {
                          onNavigateTab('vulnerabilities');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-cyber-text group-hover:text-amber-400 font-mono">
                            {v.cveId}: {v.title}
                          </div>
                          <div className="text-xs text-cyber-muted mt-0.5">
                            CVSS: {v.cvss} • {v.affectedSystems}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyber-muted group-hover:text-amber-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Techniques */}
              {filteredTechniques.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-cyber-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5" />
                    <span>攻擊技術 ({filteredTechniques.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredTechniques.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onNavigateTab('threat-analysis');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-cyber-text group-hover:text-cyber-accent">
                            {t.title}
                          </div>
                          <div className="text-xs text-cyber-muted font-mono mt-0.5">
                            MITRE: {t.mitreId} • 戰術: {t.tactic}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyber-muted group-hover:text-cyber-accent" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Notes */}
              {filteredNotes.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>研究筆記 ({filteredNotes.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredNotes.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onNavigateTab('research-notes');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-cyber-text group-hover:text-purple-400">
                            {n.title}
                          </div>
                          <div className="text-xs text-cyber-muted font-mono mt-0.5">
                            {n.date} • {n.author}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyber-muted group-hover:text-purple-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-dark-bg border-t border-dark-border flex items-center justify-between text-[11px] text-cyber-muted font-mono">
          <span>ESC 關閉</span>
          <span>支援全域模糊搜尋</span>
        </div>
      </div>
    </div>
  );
};
