import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  code: string;
}

let mermaidInitialized = false;

function initMermaid() {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    themeVariables: {
      darkMode: true,
      background: '#111B2B',
      primaryColor: '#18263D',
      primaryTextColor: '#E8EEF7',
      primaryBorderColor: '#2A3A50',
      lineColor: '#5AB7FF',
      secondaryColor: '#1B2940',
      tertiaryColor: '#0B1220',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '14px',
    },
  });
  mermaidInitialized = true;
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initMermaid();
    let isMounted = true;
    const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    async function renderChart() {
      try {
        const cleanCode = code.trim();
        if (!cleanCode) return;
        const { svg: renderedSvg } = await mermaid.render(uniqueId, cleanCode);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('[Mermaid Error]', err);
          setError('圖表渲染失敗，請檢查 Mermaid 語法');
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
      const el = document.getElementById(uniqueId);
      if (el) el.remove();
    };
  }, [code]);

  if (error) {
    return (
      <div className="my-4 p-4 rounded bg-red-950/30 border border-red-800 text-red-300 text-sm font-mono">
        {error}
        <pre className="mt-2 text-xs text-cyber-muted overflow-x-auto">{code}</pre>
      </div>
    );
  }

  return (
    <div className="my-5 p-4 rounded-lg bg-dark-sidebar/60 border border-dark-border overflow-x-auto flex justify-center">
      {svg ? (
        <div
          ref={containerRef}
          className="mermaid-svg-container max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="py-6 text-cyber-muted text-sm flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
          載入攻擊流程可視化圖表中...
        </div>
      )}
    </div>
  );
};
