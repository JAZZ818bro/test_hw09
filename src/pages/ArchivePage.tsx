import React, { useState, useMemo } from 'react';
import {
  FolderArchive,
  Search,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  Calendar,
  Building,
  Bug,
  RotateCcw,
} from 'lucide-react';
import { IncidentCard, IncidentData } from '../components/IncidentCard';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface ArchivePageProps {
  incidents: IncidentData[];
  onSelectIncident: (id: string) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ incidents, onSelectIncident }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Extract unique years and industries
  const years = useMemo(() => {
    const set = new Set<string>();
    incidents.forEach((i) => {
      if (i.year) set.add(i.year);
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [incidents]);

  const industries = useMemo(() => {
    const set = new Set<string>();
    incidents.forEach((i) => {
      if (i.industry) set.add(i.industry);
    });
    return Array.from(set);
  }, [incidents]);

  // Filtered incidents
  const filtered = useMemo(() => {
    return incidents.filter((inc) => {
      if (selectedYear !== 'all' && inc.year !== selectedYear) return false;
      if (selectedIndustry !== 'all' && inc.industry !== selectedIndustry) return false;
      if (selectedStatus !== 'all' && inc.evidenceStatus !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          inc.title.toLowerCase().includes(q) ||
          inc.target.toLowerCase().includes(q) ||
          inc.industry.toLowerCase().includes(q) ||
          inc.summary.toLowerCase().includes(q) ||
          inc.cve.some((c) => c.toLowerCase().includes(q)) ||
          inc.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [incidents, selectedYear, selectedIndustry, selectedStatus, searchQuery]);

  const handleReset = () => {
    setSelectedYear('all');
    setSelectedIndustry('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-cyber-text tracking-tight flex items-center gap-2">
            <FolderArchive className="w-6 h-6 text-cyber-accent" />
            事件索引 (Incident Archive)
          </h2>
          <p className="text-xs sm:text-sm text-cyber-muted font-mono mt-1">
            收錄並持續追蹤全球各領域關鍵資安攻擊事件，遵循嚴謹的 8 大標準研究架構
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-dark-sidebar border border-dark-border rounded-lg self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-cyber-accent/20 text-cyber-accent font-semibold'
                : 'text-cyber-muted hover:text-cyber-text'
            }`}
            title="卡片網格視圖"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">卡片</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
              viewMode === 'table'
                ? 'bg-cyber-accent/20 text-cyber-accent font-semibold'
                : 'text-cyber-muted hover:text-cyber-text'
            }`}
            title="資料表格視圖"
          >
            <TableIcon className="w-4 h-4" />
            <span className="hidden sm:inline">表格</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-dark-sidebar/70 border border-dark-border space-y-4">
        {/* Year Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-dark-border/60 pb-3">
          <span className="text-xs font-mono text-cyber-muted mr-1">歸檔年份:</span>
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              selectedYear === 'all'
                ? 'bg-cyber-accent text-dark-bg font-bold'
                : 'bg-dark-card text-cyber-muted hover:text-cyber-text border border-dark-border'
            }`}
          >
            全部 ({incidents.length})
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                selectedYear === y
                  ? 'bg-cyber-accent text-dark-bg font-bold'
                  : 'bg-dark-card text-cyber-muted hover:text-cyber-text border border-dark-border'
              }`}
            >
              {y} 年 ({incidents.filter((i) => i.year === y).length})
            </button>
          ))}
        </div>

        {/* Dropdowns & Search Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search Query */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-cyber-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋事件/組織/標籤..."
              className="w-full pl-9 pr-3 py-2 bg-dark-card border border-dark-border rounded-lg text-cyber-text placeholder:text-cyber-muted/60 focus:outline-none focus:border-cyber-accent font-mono"
            />
          </div>

          {/* Industry Filter */}
          <div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-cyber-text focus:outline-none focus:border-cyber-accent font-mono"
            >
              <option value="all">所有受害產業 (全部)</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Evidence Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-cyber-text focus:outline-none focus:border-cyber-accent font-mono"
            >
              <option value="all">所有證據狀態 (全部)</option>
              <option value="confirmed">✓ 已確認事實 (Confirmed)</option>
              <option value="inference">💡 研究推論 (Inference)</option>
              <option value="tbc">⚠ 尚待確認 (TBC)</option>
            </select>
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-lg bg-dark-hover hover:bg-dark-border border border-dark-border text-cyber-muted hover:text-cyber-text font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重置所有篩選
          </button>
        </div>
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs font-mono text-cyber-muted px-1">
        <span>
          顯示符合條件之事件：<strong className="text-cyber-accent">{filtered.length}</strong> 筆
        </span>
      </div>

      {/* Content Rendering: Grid or Table */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-dark-sidebar/40 border border-dark-border/60">
          <FolderArchive className="w-10 h-10 text-cyber-muted/50 mx-auto mb-3" />
          <div className="text-sm font-mono text-cyber-text mb-1">查無符合條件的資安事件</div>
          <p className="text-xs text-cyber-muted">請嘗試調整年份、產業領域或關鍵字篩選條件。</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onSelect={onSelectIncident}
            />
          ))}
        </div>
      ) : (
        /* Detailed Table View */
        <div className="rounded-xl border border-dark-border overflow-hidden bg-dark-sidebar/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-dark-sidebar border-b border-dark-border text-cyber-accent">
                <tr>
                  <th className="py-3 px-4">發生日期</th>
                  <th className="py-3 px-4">事件名稱</th>
                  <th className="py-3 px-4">受害主體 / 領域</th>
                  <th className="py-3 px-4">關聯 CVE</th>
                  <th className="py-3 px-4">嚴重性</th>
                  <th className="py-3 px-4">事實驗證</th>
                  <th className="py-3 px-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {filtered.map((inc) => (
                  <tr
                    key={inc.id}
                    onClick={() => onSelectIncident(inc.id)}
                    className="hover:bg-dark-hover/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 text-cyber-muted whitespace-nowrap">
                      {inc.date}
                    </td>
                    <td className="py-3.5 px-4 font-sans font-semibold text-cyber-text group-hover:text-cyber-accent">
                      {inc.title}
                    </td>
                    <td className="py-3.5 px-4 text-cyber-muted">
                      <div className="text-cyber-text font-sans">{inc.target}</div>
                      <div className="text-[10px] text-cyber-muted/80">{inc.industry}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {inc.cve && inc.cve.length > 0 ? (
                          inc.cve.map((c) => (
                            <span
                              key={c}
                              className="px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-cyber-accent text-[11px]"
                            >
                              {c}
                            </span>
                          ))
                        ) : (
                          <span className="text-cyber-muted/60">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-orange-400">{inc.severity}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <EvidenceBadge status={inc.evidenceStatus} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-cyber-accent hover:underline">研究報告 →</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
