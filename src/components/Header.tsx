import React from 'react';
import { Menu, Search, Filter, ShieldCheck, Database } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onOpenMobileMenu,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-dark-bg/85 backdrop-blur-md border-b border-dark-border px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-cyber-muted hover:text-cyber-text hover:bg-dark-hover lg:hidden"
          title="開啟選單"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-cyber-text tracking-tight flex items-center gap-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-cyber-muted font-mono">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-dark-sidebar border border-dark-border text-cyber-muted hover:text-cyber-text hover:border-cyber-accent/40 transition-colors text-xs font-mono"
        >
          <Search className="w-3.5 h-3.5 text-cyber-accent" />
          <span className="hidden sm:inline">搜尋事件 / CVE / 手法...</span>
          <span className="sm:hidden">搜尋</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-[10px] text-cyber-muted">
            Ctrl+K
          </kbd>
        </button>

        {/* Evidence Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-dark-sidebar border border-dark-border text-xs font-mono">
          <span className="text-cyber-muted">證據指標:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="已確認事實" />
            <span className="w-2 h-2 rounded-full bg-blue-400" title="研究推論" />
            <span className="w-2 h-2 rounded-full bg-amber-400" title="尚待確認" />
          </div>
        </div>
      </div>
    </header>
  );
};
