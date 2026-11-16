import React, { useState } from 'react';
import { Link2, ExternalLink, ShieldCheck, FileText, CheckCircle2, Globe, Search } from 'lucide-react';

interface SourceItem {
  title: string;
  url: string;
  note?: string;
  incidentId: string;
  incidentTitle: string;
}

interface SourcesPageProps {
  sources: SourceItem[];
  onSelectIncident: (id: string) => void;
}

export const SourcesPage: React.FC<SourcesPageProps> = ({ sources, onSelectIncident }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  // Classify source tier based on URL / note
  const classifyTier = (source: SourceItem) => {
    const text = `${source.title} ${source.note} ${source.url}`.toLowerCase();
    if (text.includes('cisa') || text.includes('nvd') || text.includes('gov') || text.includes('senate')) {
      return { tier: 2, label: 'Tier 2: 政府資安機關 / CVE資料庫', color: 'text-amber-400 bg-amber-950/30 border-amber-800/40' };
    }
    if (text.includes('official') || text.includes('ivanti') || text.includes('unitedhealth') || text.includes('原廠') || text.includes('官方')) {
      return { tier: 1, label: 'Tier 1: 受害組織 / 原廠安全公告', color: 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40' };
    }
    if (text.includes('mandiant') || text.includes('volexity') || text.includes('research') || text.includes('google')) {
      return { tier: 3, label: 'Tier 3: 可信技術研究機構報告', color: 'text-cyber-accent bg-cyber-accent/15 border-cyber-accent/30' };
    }
    return { tier: 4, label: 'Tier 4: 可信資安新聞媒體', color: 'text-purple-400 bg-purple-950/30 border-purple-800/40' };
  };

  const filteredSources = sources.filter((s) => {
    if (filterType !== 'all') {
      const { tier } = classifyTier(s);
      if (filterType === 'tier1' && tier !== 1) return false;
      if (filterType === 'tier2' && tier !== 2) return false;
      if (filterType === 'tier3' && tier !== 3) return false;
      if (filterType === 'tier4' && tier !== 4) return false;
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.url.toLowerCase().includes(q) ||
        (s.note && s.note.toLowerCase().includes(q)) ||
        s.incidentTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="border-b border-dark-border pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-cyber-text tracking-tight flex items-center gap-2">
          <Link2 className="w-6 h-6 text-cyber-accent" />
          資料來源與查證依據 (Sources & Verification)
        </h2>
        <p className="text-xs sm:text-sm text-cyber-muted font-mono mt-1">
          遵循 `AGENTS.md` 規範之來源查證優先順序，彙整所有事件之第一手公告、技術鑑識報告與可信調查出處
        </p>
      </div>

      {/* Sources Verification Hierarchy Box */}
      <div className="p-5 rounded-xl bg-dark-sidebar border border-dark-border space-y-3">
        <div className="text-xs font-mono text-cyber-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AGENTS.md 來源優先順序準則 (Source Hierarchy)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-dark-card border border-dark-border space-y-1">
            <span className="font-bold text-emerald-400 block font-mono">1. 原廠 / 官方公告</span>
            <p className="text-cyber-muted text-[11px] leading-relaxed">
              受影響組織之修補通告、事件聲明、原廠 KB
            </p>
          </div>

          <div className="p-3 rounded-lg bg-dark-card border border-dark-border space-y-1">
            <span className="font-bold text-amber-400 block font-mono">2. 政府 / CVE 資料庫</span>
            <p className="text-cyber-muted text-[11px] leading-relaxed">
              CISA ED / KEV、NIST NVD、國家級 CERT
            </p>
          </div>

          <div className="p-3 rounded-lg bg-dark-card border border-dark-border space-y-1">
            <span className="font-bold text-cyber-accent block font-mono">3. 技術研究報告</span>
            <p className="text-cyber-muted text-[11px] leading-relaxed">
              可追溯研究方法之實驗室與反病毒廠商技術分析
            </p>
          </div>

          <div className="p-3 rounded-lg bg-dark-card border border-dark-border space-y-1">
            <span className="font-bold text-purple-400 block font-mono">4. 可信新聞媒體</span>
            <p className="text-cyber-muted text-[11px] leading-relaxed">
              專題資安媒體（Krebs、BleepingComputer），用於交叉驗證
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-xl bg-dark-sidebar/70 border border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Tier filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filterType === 'all'
                ? 'bg-cyber-accent text-dark-bg font-bold'
                : 'bg-dark-card text-cyber-muted hover:text-cyber-text'
            }`}
          >
            全部來源 ({sources.length})
          </button>
          <button
            onClick={() => setFilterType('tier1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filterType === 'tier1'
                ? 'bg-emerald-500 text-dark-bg font-bold'
                : 'bg-dark-card text-cyber-muted hover:text-cyber-text'
            }`}
          >
            Tier 1 官方
          </button>
          <button
            onClick={() => setFilterType('tier2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filterType === 'tier2'
                ? 'bg-amber-500 text-dark-bg font-bold'
                : 'bg-dark-card text-cyber-muted hover:text-cyber-text'
            }`}
          >
            Tier 2 政府/CVE
          </button>
          <button
            onClick={() => setFilterType('tier3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filterType === 'tier3'
                ? 'bg-cyber-accent text-dark-bg font-bold'
                : 'bg-dark-card text-cyber-muted hover:text-cyber-text'
            }`}
          >
            Tier 3 研究報告
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-cyber-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="過濾來源標題 / 網址..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-dark-card border border-dark-border rounded-lg text-cyber-text focus:outline-none focus:border-cyber-accent font-mono"
          />
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-3">
        {filteredSources.map((s, index) => {
          const tierInfo = classifyTier(s);
          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-dark-sidebar/60 border border-dark-border hover:border-cyber-accent/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${tierInfo.color}`}
                  >
                    {tierInfo.label}
                  </span>

                  <button
                    onClick={() => onSelectIncident(s.incidentId)}
                    className="text-xs font-mono text-cyber-muted hover:text-cyber-accent hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3 text-cyber-accent" />
                    <span>關聯事件：{s.incidentTitle}</span>
                  </button>
                </div>

                <div className="text-sm font-semibold text-cyber-text group-hover:text-cyber-accent transition-colors">
                  {s.title}
                </div>

                {s.note && (
                  <p className="text-xs text-cyber-muted font-mono">{s.note}</p>
                )}
              </div>

              {/* External Link Button */}
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border text-cyber-accent text-xs font-mono self-start sm:self-center transition-colors"
              >
                <span>前往原始出處</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
