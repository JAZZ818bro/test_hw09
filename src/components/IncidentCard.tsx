import React from 'react';
import { Calendar, Building, ShieldAlert, Tag, ArrowRight, Bug } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

export interface IncidentData {
  id: string;
  folderName: string;
  year: string;
  title: string;
  date: string;
  discoveryDate: string;
  target: string;
  industry: string;
  severity: string;
  evidenceStatus: string;
  cve: string[];
  threatActor: string;
  tags: string[];
  summary: string;
  validation?: any;
  sections?: {
    index: string;
    timeline: string;
    technicalAnalysis: string;
    references: string;
  };
}

interface IncidentCardProps {
  incident: IncidentData;
  onSelect: (incidentId: string) => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onSelect }) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'critical':
        return 'text-red-400 bg-red-950/40 border-red-800/60';
      case 'high':
        return 'text-orange-400 bg-orange-950/40 border-orange-800/60';
      case 'medium':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
      default:
        return 'text-blue-400 bg-blue-950/40 border-blue-800/60';
    }
  };

  return (
    <div
      onClick={() => onSelect(incident.id)}
      className="group relative bg-dark-sidebar/70 hover:bg-dark-sidebar border border-dark-border hover:border-cyber-accent/50 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyber-accent/5 flex flex-col justify-between"
    >
      <div>
        {/* Top meta row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${getSeverityBadge(
                incident.severity
              )}`}
            >
              {incident.severity.toUpperCase()}
            </span>
            <EvidenceBadge status={incident.evidenceStatus} size="sm" />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted">
            <Calendar className="w-3.5 h-3.5 text-cyber-accent" />
            <span>{incident.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-cyber-text group-hover:text-cyber-accent transition-colors leading-snug mb-2">
          {incident.title}
        </h3>

        {/* Target and Industry */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyber-muted mb-3">
          <div className="flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-cyber-muted/80" />
            <span className="text-cyber-text/90">{incident.target}</span>
          </div>
          <span className="text-dark-border">•</span>
          <span className="text-cyber-muted">{incident.industry}</span>
        </div>

        {/* Summary */}
        <p className="text-sm text-cyber-muted line-clamp-2 leading-relaxed mb-4">
          {incident.summary || '暫無公開簡要摘要。'}
        </p>
      </div>

      {/* Bottom tags & CVEs */}
      <div className="pt-3 border-t border-dark-border/60 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
          {incident.cve && incident.cve.length > 0 ? (
            incident.cve.map((cve) => (
              <span
                key={cve}
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-dark-card border border-dark-border text-cyber-accent"
              >
                <Bug className="w-3 h-3" />
                {cve}
              </span>
            ))
          ) : (
            <span className="text-[11px] font-mono text-cyber-muted/60">無特定 CVE</span>
          )}

          {incident.tags &&
            incident.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-card/50 text-cyber-muted"
              >
                #{tag}
              </span>
            ))}
        </div>

        <div className="flex items-center text-xs font-mono text-cyber-accent group-hover:translate-x-1 transition-transform">
          <span>詳情</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    </div>
  );
};
