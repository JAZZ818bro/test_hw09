import React, { useState } from 'react';
import { BookOpen, User, Calendar, Tag, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { MarkdownViewer } from '../components/MarkdownViewer';

interface ResearchNotesPageProps {
  researchNotes: any[];
  onSelectIncident: (id: string) => void;
}

export const ResearchNotesPage: React.FC<ResearchNotesPageProps> = ({
  researchNotes,
  onSelectIncident,
}) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>(
    researchNotes[0]?.id || 'malware-analysis'
  );

  const selectedNote =
    researchNotes.find((n) => n.id === selectedNoteId) || researchNotes[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="border-b border-dark-border pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-cyber-text tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-400" />
          研究筆記 (Research Notes)
        </h2>
        <p className="text-xs sm:text-sm text-cyber-muted font-mono mt-1">
          個人深度技術研究心得、逆向鑑識筆記與事件間跨維度技術關聯分析
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Notes List */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-cyber-muted uppercase tracking-wider px-1">
            研究筆記列表 ({researchNotes.length})
          </div>

          <div className="space-y-2.5">
            {researchNotes.map((note) => {
              const isSelected = note.id === selectedNote?.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-dark-sidebar border-purple-400/60 shadow-lg shadow-purple-400/5'
                      : 'bg-dark-sidebar/40 border-dark-border hover:bg-dark-sidebar hover:border-dark-border/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-cyber-muted mb-1.5">
                    <span>{note.date}</span>
                    <span>{note.author}</span>
                  </div>

                  <h3
                    className={`text-sm font-bold leading-snug transition-colors ${
                      isSelected ? 'text-purple-400' : 'text-cyber-text'
                    }`}
                  >
                    {note.title}
                  </h3>

                  <p className="text-xs text-cyber-muted line-clamp-2 mt-2 leading-relaxed">
                    {note.summary}
                  </p>

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {note.tags.map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-dark-card text-cyber-muted border border-dark-border"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Open Questions Callout */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-cyber-muted space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
              <HelpCircle className="w-4 h-4" />
              <span>待釐清問題追蹤機制</span>
            </div>
            <p className="leading-relaxed">
              依據 `AGENTS.md` 規範，對於尚未完全解開之初期憑證來源或幕後歸因，一律保留為「待確認」，並於筆記中定期回顧。
            </p>
          </div>
        </div>

        {/* Right 2 Cols: Selected Note Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedNote ? (
            <div className="p-6 sm:p-8 rounded-xl bg-dark-sidebar/70 border border-dark-border shadow-xl space-y-6">
              <div className="border-b border-dark-border pb-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyber-muted mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {selectedNote.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    {selectedNote.author}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-cyber-text">
                  {selectedNote.title}
                </h1>
              </div>

              <div className="pt-2">
                <MarkdownViewer content={selectedNote.content} />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-dark-sidebar/40 border border-dark-border text-cyber-muted text-sm font-mono">
              請從左側清單選擇欲閱讀的研究筆記。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
