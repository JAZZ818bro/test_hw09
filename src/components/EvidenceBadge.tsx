import React from 'react';
import { CheckCircle2, HelpCircle, Lightbulb } from 'lucide-react';

interface EvidenceBadgeProps {
  status: 'confirmed' | 'inference' | 'tbc' | string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  let label = '尚待確認';
  let badgeClasses = 'bg-cyber-warning/15 text-cyber-warning border-cyber-warning/40';
  let Icon = HelpCircle;

  const normalized = (status || '').toLowerCase().trim();

  if (normalized === 'confirmed' || normalized === '已確認事實' || normalized === '已確認') {
    label = '已確認事實';
    badgeClasses = 'bg-cyber-success/15 text-cyber-success border-cyber-success/40';
    Icon = CheckCircle2;
  } else if (normalized === 'inference' || normalized === '研究推論' || normalized === '推論') {
    label = '研究推論';
    badgeClasses = 'bg-cyber-accent/15 text-cyber-accent border-cyber-accent/40';
    Icon = Lightbulb;
  } else {
    label = '尚待確認';
    badgeClasses = 'bg-cyber-warning/15 text-cyber-warning border-cyber-warning/40';
    Icon = HelpCircle;
  }

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded font-mono ${badgeClasses} ${sizeClasses}`}
      title={`證據狀態：${label}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{label}</span>
    </span>
  );
};
