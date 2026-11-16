import React from 'react';
import {
  FolderArchive,
  Crosshair,
  Bug,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { IncidentCard, IncidentData } from '../components/IncidentCard';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface HomePageProps {
  stats: {
    totalIncidents: number;
    totalTechniques: number;
    totalVulnerabilities: number;
    totalResearchNotes: number;
    totalSources: number;
  };
  incidents: IncidentData[];
  onSelectIncident: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  stats,
  incidents,
  onSelectIncident,
  onNavigateTab,
}) => {
  const recentIncidents = incidents.slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-dark-sidebar via-dark-card to-dark-sidebar border border-dark-border p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
            個人資安事件研究知識庫 & 技術分析工作台
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-cyber-text tracking-tight mb-3">
            Cyber Incident Archive
          </h2>

          <p className="text-sm sm:text-base text-cyber-muted leading-relaxed mb-6">
            以深色技術報告規格，系統化梳理真實資安事件之入侵途徑、攻擊鏈（Kill Chain）、CVE 漏洞利用、惡意載荷行為、衝擊損害與受害企業應急修補方案。嚴格分離「已確認事實」與「研究推論」，落實知識累積與長期可追溯性。
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('incidents')}
              className="px-4 py-2 rounded-lg bg-cyber-accent hover:bg-cyber-accent/90 text-dark-bg font-semibold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-cyber-accent/15"
            >
              <FolderArchive className="w-4 h-4" />
              瀏覽所有事件索引
            </button>

            <button
              onClick={() => onNavigateTab('threat-analysis')}
              className="px-4 py-2 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border text-cyber-text font-medium text-sm transition-colors flex items-center gap-2"
            >
              <Crosshair className="w-4 h-4 text-cyber-accent" />
              攻擊手法與技術分析
            </button>
          </div>
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#5AB7FF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('incidents')}
          className="p-5 rounded-xl bg-dark-sidebar/60 border border-dark-border hover:border-cyber-accent/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyber-muted uppercase tracking-wider">
              收錄事件總數
            </span>
            <FolderArchive className="w-4 h-4 text-cyber-accent group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyber-text font-mono">
            {stats.totalIncidents}
          </div>
          <div className="text-[11px] text-cyber-muted/80 mt-1 flex items-center gap-1 font-mono">
            <span>依年份與領域歸檔</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('threat-analysis')}
          className="p-5 rounded-xl bg-dark-sidebar/60 border border-dark-border hover:border-cyber-accent/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyber-muted uppercase tracking-wider">
              攻擊技術解析
            </span>
            <Crosshair className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyber-text font-mono">
            {stats.totalTechniques}
          </div>
          <div className="text-[11px] text-cyber-muted/80 mt-1 flex items-center gap-1 font-mono">
            <span>對齊 MITRE ATT&CK</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('vulnerabilities')}
          className="p-5 rounded-xl bg-dark-sidebar/60 border border-dark-border hover:border-cyber-accent/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyber-muted uppercase tracking-wider">
              追蹤 CVE 漏洞
            </span>
            <Bug className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyber-text font-mono">
            {stats.totalVulnerabilities}
          </div>
          <div className="text-[11px] text-cyber-muted/80 mt-1 flex items-center gap-1 font-mono">
            <span>含在野利用 CISA KEV</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('research-notes')}
          className="p-5 rounded-xl bg-dark-sidebar/60 border border-dark-border hover:border-cyber-accent/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyber-muted uppercase tracking-wider">
              個人研究筆記
            </span>
            <BookOpen className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyber-text font-mono">
            {stats.totalResearchNotes}
          </div>
          <div className="text-[11px] text-cyber-muted/80 mt-1 flex items-center gap-1 font-mono">
            <span>逆向分析與網路鑑識</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Incidents */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyber-accent" />
              <h3 className="text-lg font-bold text-cyber-text">近期重點資安事件</h3>
            </div>

            <button
              onClick={() => onNavigateTab('incidents')}
              className="text-xs font-mono text-cyber-accent hover:underline flex items-center gap-1"
            >
              <span>查看全部 ({stats.totalIncidents})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentIncidents.map((inc) => (
              <IncidentCard
                key={inc.id}
                incident={inc}
                onSelect={(id) => onSelectIncident(id)}
              />
            ))}
          </div>
        </div>

        {/* Right 1 Col: Research Insights & Fast Matrix */}
        <div className="space-y-6">
          {/* Research Principles Box */}
          <div className="p-5 rounded-xl bg-dark-sidebar/80 border border-dark-border space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-cyber-text border-b border-dark-border pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>研究規範與事實驗證層級</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                <div className="font-semibold text-emerald-400 flex items-center gap-1 mb-1 font-mono">
                  <span>✓ [已確認事實]</span>
                </div>
                <p className="text-cyber-muted">
                  經受害實體官方通告、CISA 或原廠資安白皮書直接支持之已驗證資訊。
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-800/40">
                <div className="font-semibold text-blue-400 flex items-center gap-1 mb-1 font-mono">
                  <span>💡 [研究推論]</span>
                </div>
                <p className="text-cyber-muted">
                  依已知 IOC 行為、惡意載荷反編譯證據合理推導之研判，註明依據與限制。
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/40">
                <div className="font-semibold text-amber-400 flex items-center gap-1 mb-1 font-mono">
                  <span>⚠ [尚待確認]</span>
                </div>
                <p className="text-cyber-muted">
                  缺乏足夠公開事證、不同來源陳述矛盾或仍在調查中之疑點，嚴禁猜測。
                </p>
              </div>
            </div>
          </div>

          {/* Quick Attack Vector Matrix */}
          <div className="p-5 rounded-xl bg-dark-sidebar/80 border border-dark-border space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-cyber-text border-b border-dark-border pb-3">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyber-accent" />
                高頻初始入侵途徑
              </span>
              <span className="text-[11px] font-mono text-cyber-muted">ATT&CK</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded bg-dark-card border border-dark-border flex items-center justify-between">
                <span className="text-cyber-text">邊界 VPN / 網通設備 0-day</span>
                <span className="text-red-400 font-semibold">Critical</span>
              </div>
              <div className="p-2 rounded bg-dark-card border border-dark-border flex items-center justify-between">
                <span className="text-cyber-text">外洩憑證 ＋ 無 MFA 入口</span>
                <span className="text-orange-400 font-semibold">High</span>
              </div>
              <div className="p-2 rounded bg-dark-card border border-dark-border flex items-center justify-between">
                <span className="text-cyber-text">魚叉釣魚 ＋ 竊密木馬 (Stealer)</span>
                <span className="text-amber-400 font-semibold">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
