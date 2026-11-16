import React, { useState } from 'react';
import { Bug, AlertCircle, ShieldCheck, ExternalLink, ArrowRight, FolderArchive } from 'lucide-react';
import { MarkdownViewer } from '../components/MarkdownViewer';

interface VulnerabilitiesPageProps {
  vulnerabilities: any[];
  incidents: any[];
  onSelectIncident: (id: string) => void;
}

export const VulnerabilitiesPage: React.FC<VulnerabilitiesPageProps> = ({
  vulnerabilities,
  incidents,
  onSelectIncident,
}) => {
  const [selectedCveId, setSelectedCveId] = useState<string>(
    vulnerabilities[0]?.cveId || 'CVE-2024-21887'
  );

  const selectedVuln =
    vulnerabilities.find((v) => v.cveId === selectedCveId) || vulnerabilities[0];

  // Find incidents that exploited this CVE
  const relatedIncidents = selectedVuln
    ? incidents.filter((i) => i.cve && i.cve.includes(selectedVuln.cveId))
    : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title */}
      <div className="border-b border-dark-border pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-cyber-text tracking-tight flex items-center gap-2">
          <Bug className="w-6 h-6 text-amber-400" />
          漏洞資訊庫 (Vulnerabilities)
        </h2>
        <p className="text-xs sm:text-sm text-cyber-muted font-mono mt-1">
          追蹤重大在野利用之零時差 (0-day) 及關鍵 CVE 漏洞成因、影響版本與修復措施
        </p>
      </div>

      {/* Main Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: CVE List */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-cyber-muted uppercase tracking-wider px-1">
            重大追蹤漏洞 ({vulnerabilities.length})
          </div>

          <div className="space-y-2.5">
            {vulnerabilities.map((v) => {
              const isSelected = v.cveId === selectedVuln?.cveId;
              const isCritical = parseFloat(v.cvss) >= 9.0;
              return (
                <div
                  key={v.cveId}
                  onClick={() => setSelectedCveId(v.cveId)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-dark-sidebar border-amber-400/60 shadow-lg shadow-amber-400/5'
                      : 'bg-dark-sidebar/40 border-dark-border hover:bg-dark-sidebar hover:border-dark-border/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-cyber-text">
                      {v.cveId}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold border ${
                        isCritical
                          ? 'bg-red-950/40 text-red-400 border-red-800/60'
                          : 'bg-orange-950/40 text-orange-400 border-orange-800/60'
                      }`}
                    >
                      CVSS {v.cvss}
                    </span>
                  </div>

                  <h3
                    className={`text-xs font-bold leading-snug transition-colors line-clamp-1 ${
                      isSelected ? 'text-amber-400' : 'text-cyber-text'
                    }`}
                  >
                    {v.title}
                  </h3>

                  <div className="text-[11px] font-mono text-cyber-muted mt-2 truncate">
                    {v.affectedSystems}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected CVE Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedVuln ? (
            <div className="p-6 sm:p-8 rounded-xl bg-dark-sidebar/70 border border-dark-border shadow-xl space-y-6">
              {/* Header Box */}
              <div className="border-b border-dark-border pb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-base sm:text-lg font-bold text-amber-400">
                      {selectedVuln.cveId}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-dark-card border border-dark-border text-cyber-muted">
                      {selectedVuln.cwe || 'CWE'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-cyber-muted">修補狀態：</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/30 text-emerald-400 border border-emerald-800/40 font-semibold">
                      {selectedVuln.patchStatus}
                    </span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-cyber-text">
                  {selectedVuln.title}
                </h1>

                {/* Meta details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border text-xs font-mono">
                  <div>
                    <span className="text-cyber-muted block mb-0.5">受影響組件及版本：</span>
                    <span className="text-cyber-text">{selectedVuln.affectedSystems}</span>
                  </div>
                  <div>
                    <span className="text-cyber-muted block mb-0.5">首次公開披露日期：</span>
                    <span className="text-cyber-text">{selectedVuln.publishedDate}</span>
                  </div>
                </div>

                {selectedVuln.summary && (
                  <p className="text-xs sm:text-sm text-cyber-muted mt-3 leading-relaxed">
                    {selectedVuln.summary}
                  </p>
                )}
              </div>

              {/* Related Incidents Banner */}
              {relatedIncidents.length > 0 && (
                <div className="p-4 rounded-xl bg-dark-card/60 border border-cyber-accent/30 space-y-3">
                  <div className="text-xs font-mono text-cyber-accent uppercase tracking-wider flex items-center gap-1.5">
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>關聯收錄事件 ({relatedIncidents.length})</span>
                  </div>

                  <div className="space-y-2">
                    {relatedIncidents.map((inc) => (
                      <div
                        key={inc.id}
                        onClick={() => onSelectIncident(inc.id)}
                        className="p-3 rounded-lg bg-dark-sidebar hover:bg-dark-hover border border-dark-border cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-cyber-text group-hover:text-cyber-accent">
                            {inc.title}
                          </div>
                          <div className="text-xs font-mono text-cyber-muted mt-0.5">
                            {inc.date} • {inc.target} • {inc.industry}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyber-muted group-hover:text-cyber-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Markdown Body */}
              <div className="pt-2">
                <MarkdownViewer content={selectedVuln.content} />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-dark-sidebar/40 border border-dark-border text-cyber-muted text-sm font-mono">
              請從左側清單選擇欲研究之 CVE 漏洞。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
