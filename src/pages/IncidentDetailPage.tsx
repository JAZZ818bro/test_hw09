import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Building,
  ShieldAlert,
  Bug,
  Tag,
  Clock,
  Layers,
  FileText,
  Link2,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { IncidentData } from '../components/IncidentCard';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { MarkdownViewer } from '../components/MarkdownViewer';

interface IncidentDetailPageProps {
  incident: IncidentData;
  onBack: () => void;
  onNavigateTab: (tab: any) => void;
}

export const IncidentDetailPage: React.FC<IncidentDetailPageProps> = ({
  incident,
  onBack,
  onNavigateTab,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'overview' | 'timeline' | 'technical' | 'references'>('all');

  const tabs = [
    { id: 'all', label: '完整研究報告 (All-in-One)' },
    { id: 'overview', label: '01/05/06 概述與防禦' },
    { id: 'timeline', label: '02 事件時間軸' },
    { id: 'technical', label: '03/04 攻擊手法與分析' },
    { id: 'references', label: '07/08 心得與參考' },
  ];

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono text-cyber-muted hover:text-cyber-accent transition-colors py-1 px-2.5 rounded-lg bg-dark-sidebar border border-dark-border"
      >
        <ArrowLeft className="w-4 h-4" />
        返回事件索引列表
      </button>

      {/* Incident Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-dark-sidebar border border-dark-border shadow-xl space-y-4">
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-red-950/40 text-red-400 border border-red-800/60 font-bold">
              {incident.severity.toUpperCase()}
            </span>
            <EvidenceBadge status={incident.evidenceStatus} size="md" />
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-dark-card border border-dark-border text-cyber-muted">
              ID: {incident.id}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-cyber-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyber-accent" />
              <span>發生：{incident.date}</span>
            </div>
            {incident.discoveryDate && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyber-accent" />
                <span>發現：{incident.discoveryDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-cyber-text tracking-tight leading-tight">
          {incident.title}
        </h1>

        {/* Target, Industry & Threat Actor */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border/80 text-xs font-mono">
          <div>
            <span className="text-cyber-muted block mb-0.5">受害對象 (Target):</span>
            <span className="font-semibold text-cyber-text font-sans">{incident.target}</span>
          </div>
          <div>
            <span className="text-cyber-muted block mb-0.5">所屬產業 (Industry):</span>
            <span className="font-semibold text-cyber-text">{incident.industry}</span>
          </div>
          <div>
            <span className="text-cyber-muted block mb-0.5">威脅行動者 (Actor):</span>
            <span className="font-semibold text-cyber-accent">{incident.threatActor || '待確認'}</span>
          </div>
        </div>

        {/* Associated CVEs and Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {incident.cve && incident.cve.length > 0 && (
            <div className="flex items-center gap-1.5 mr-2">
              <span className="text-xs font-mono text-cyber-muted">關聯 CVE:</span>
              {incident.cve.map((cve) => (
                <button
                  key={cve}
                  onClick={() => onNavigateTab('vulnerabilities')}
                  className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-dark-card border border-cyber-accent/40 text-cyber-accent hover:bg-cyber-accent/15 transition-colors"
                >
                  <Bug className="w-3 h-3" />
                  {cve}
                </button>
              ))}
            </div>
          )}

          {incident.tags && incident.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {incident.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-dark-card/60 text-cyber-muted border border-dark-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section Filter Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-dark-sidebar border border-dark-border rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeSection === tab.id
                ? 'bg-cyber-accent text-dark-bg font-bold shadow'
                : 'text-cyber-muted hover:text-cyber-text hover:bg-dark-card'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Section 1: Overview & Damage & Remediation (index.md) */}
        {(activeSection === 'all' || activeSection === 'overview') && incident.sections?.index && (
          <div className="p-6 sm:p-8 rounded-xl bg-dark-sidebar/60 border border-dark-border shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-accent uppercase tracking-wider mb-4 pb-2 border-b border-dark-border">
              <FileText className="w-4 h-4" />
              <span>01. 事件概述 ｜ 05. 影響與損害 ｜ 06. 防禦與改善 (index.md)</span>
            </div>
            <MarkdownViewer content={incident.sections.index} />
          </div>
        )}

        {/* Section 2: Timeline (timeline.md) */}
        {(activeSection === 'all' || activeSection === 'timeline') && incident.sections?.timeline && (
          <div className="p-6 sm:p-8 rounded-xl bg-dark-sidebar/60 border border-dark-border shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-accent uppercase tracking-wider mb-4 pb-2 border-b border-dark-border">
              <Clock className="w-4 h-4" />
              <span>02. 事件時間軸 (timeline.md)</span>
            </div>
            <MarkdownViewer content={incident.sections.timeline} />
          </div>
        )}

        {/* Section 3: Technical Analysis & Attack Flow (technical-analysis.md) */}
        {(activeSection === 'all' || activeSection === 'technical') && incident.sections?.technicalAnalysis && (
          <div className="p-6 sm:p-8 rounded-xl bg-dark-sidebar/60 border border-dark-border shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-accent uppercase tracking-wider mb-4 pb-2 border-b border-dark-border">
              <Layers className="w-4 h-4" />
              <span>03. 攻擊手法 ｜ 04. 技術分析 (technical-analysis.md)</span>
            </div>
            <MarkdownViewer content={incident.sections.technicalAnalysis} />
          </div>
        )}

        {/* Section 4: References & Research Notes (references.md) */}
        {(activeSection === 'all' || activeSection === 'references') && incident.sections?.references && (
          <div className="p-6 sm:p-8 rounded-xl bg-dark-sidebar/60 border border-dark-border shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-accent uppercase tracking-wider mb-4 pb-2 border-b border-dark-border">
              <Link2 className="w-4 h-4" />
              <span>07. 研究心得 ｜ 08. 參考資料 (references.md)</span>
            </div>
            <MarkdownViewer content={incident.sections.references} />
          </div>
        )}
      </div>
    </div>
  );
};
