import React, { useMemo } from 'react';
import { marked } from 'marked';
import { MermaidChart } from './MermaidChart';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  // Split content by mermaid code blocks so we can render them as interactive React components
  const parsedSegments = useMemo(() => {
    if (!content) return [];

    const segments: Array<{ type: 'markdown' | 'mermaid'; content: string }> = [];
    const regex = /```mermaid([\s\S]*?)```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          type: 'markdown',
          content: content.substring(lastIndex, match.index),
        });
      }
      segments.push({
        type: 'mermaid',
        content: match[1].trim(),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      segments.push({
        type: 'markdown',
        content: content.substring(lastIndex),
      });
    }

    return segments;
  }, [content]);

  const renderHtml = (mdText: string) => {
    // Transform evidence tags in markdown before parsing
    let enhanced = mdText
      .replace(/`?\[已確認事實\]`?/g, '<span class="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-semibold tracking-wide">✓ 已確認事實</span>')
      .replace(/`?\[研究推論\]`?/g, '<span class="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded border border-blue-400/40 bg-blue-500/15 text-blue-300 font-semibold tracking-wide">💡 研究推論</span>')
      .replace(/`?\[尚待確認\]`?/g, '<span class="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded border border-amber-400/40 bg-amber-500/15 text-amber-300 font-semibold tracking-wide">⚠ 尚待確認</span>');

    return marked.parse(enhanced, { gfm: true, breaks: true }) as string;
  };

  return (
    <div className="markdown-body">
      {parsedSegments.map((segment, idx) => {
        if (segment.type === 'mermaid') {
          return <MermaidChart key={idx} code={segment.content} />;
        }
        return (
          <div
            key={idx}
            dangerouslySetInnerHTML={{ __html: renderHtml(segment.content) }}
          />
        );
      })}
    </div>
  );
};
