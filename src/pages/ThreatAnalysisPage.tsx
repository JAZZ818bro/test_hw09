import React, { useState } from 'react';
import { Crosshair, Shield, Terminal, ArrowRight, Layers, FileCode, CheckCircle2 } from 'lucide-react';
import { MarkdownViewer } from '../components/MarkdownViewer';

interface ThreatAnalysisPageProps {
  techniques: any[];
  onNavigateTab: (tab: any) => void;
  onSelectIncident: (id: string) => void;
}

export const ThreatAnalysisPage: React.FC<ThreatAnalysisPageProps> = ({
  techniques,
  onNavigateTab,
  onSelectIncident,
}) => {
  const [selectedTechId, setSelectedTechId] = useState<string>(
    techniques[0]?.id || 'phishing'
  );

  const selectedTech = techniques.find((t) => t.id === selectedTechId) || techniques[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title */}
      <div className="border-b border-dark-border pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-cyber-text tracking-tight flex items-center gap-2">
          <Crosshair className="w-6 h-6 text-cyber-accent" />
          攻擊手法與威脅分析 (Threat Analysis)
        </h2>
        <p className="text-xs sm:text-sm text-cyber-muted font-mono mt-1">
          深入研究威脅行動者所採用之攻擊戰術、技術與程序（TTPs），對齊 MITRE ATT&CK 框架
        </p>
      </div>

      {/* Main Two Columns: Left Techniques Selector, Right Technique Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Technique List */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-cyber-muted uppercase tracking-wider px-1">
            攻擊技術庫 ({techniques.length})
          </div>

          <div className="space-y-2">
            {techniques.map((tech) => {
              const isSelected = tech.id === selectedTech?.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => setSelectedTechId(tech.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-dark-sidebar border-cyber-accent/60 shadow-lg shadow-cyber-accent/5'
                      : 'bg-dark-sidebar/40 border-dark-border hover:bg-dark-sidebar hover:border-dark-border/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-dark-card border border-dark-border text-cyber-accent font-semibold">
                      {tech.mitreId || 'TTP'}
                    </span>
                    <span className="text-[11px] font-mono text-cyber-muted">
                      {tech.tactic}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold transition-colors ${
                      isSelected ? 'text-cyber-accent' : 'text-cyber-text'
                    }`}
                  >
                    {tech.title}
                  </h3>

                  <p className="text-xs text-cyber-muted line-clamp-2 mt-1.5 leading-relaxed">
                    {tech.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick MITRE ATT&CK reference card */}
          <div className="p-4 rounded-xl bg-dark-card/50 border border-dark-border text-xs font-mono text-cyber-muted space-y-2">
            <div className="flex items-center gap-1.5 text-cyber-text font-bold">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>防禦檢驗標準</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              技術分析皆附帶明確之 IOC 特徵雜湊、網路行為特徵與防禦加固對策，供藍隊（Blue Team）落實驗證。
            </p>
          </div>
        </div>

        {/* Right 2 Cols: Selected Technique Detailed Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTech ? (
            <div className="p-6 sm:p-8 rounded-xl bg-dark-sidebar/70 border border-dark-border shadow-xl space-y-6">
              {/* Header */}
              <div className="border-b border-dark-border pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyber-accent/15 border border-cyber-accent/40 text-cyber-accent font-bold">
                    MITRE ID: {selectedTech.mitreId}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-dark-card border border-dark-border text-cyber-muted">
                    戰術階段: {selectedTech.tactic}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-red-950/40 text-red-400 border border-red-800/60 font-semibold">
                    嚴重等級: {selectedTech.severity}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-cyber-text">
                  {selectedTech.title}
                </h1>

                {selectedTech.summary && (
                  <p className="text-sm text-cyber-muted mt-2 leading-relaxed bg-dark-bg/50 p-3 rounded-lg border border-dark-border/60">
                    {selectedTech.summary}
                  </p>
                )}
              </div>

              {/* Markdown Content */}
              <div className="pt-2">
                <MarkdownViewer content={selectedTech.content} />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-dark-sidebar/40 border border-dark-border text-cyber-muted text-sm font-mono">
              請從左側清單選擇欲深入研究的攻擊技術。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
