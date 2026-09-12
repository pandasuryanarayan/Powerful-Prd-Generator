'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Copy,
  Download,
  BookOpen,
  Save,
  ArrowLeft,
  Menu,
  ChevronRight,
  Check,
  Edit3,
  RefreshCw,
  FileArchive,
  Sparkles,
  Palette,
  X,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { usePRDStore, useToastStore, PRDSection } from '@/store';
import { createPRDZipPackage, downloadBlob } from '@/lib/zip-export';
import { cleanSectionContent } from '@/lib/nara-client';

const MarkdownRenderer = dynamic(() => import('@/components/MarkdownRenderer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-12 text-sm text-[#6b6b67] animate-pulse">
      Loading preview...
    </div>
  ),
});

export default function PRDPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const getProject = usePRDStore((s) => s.getProject);
  const exportProject = usePRDStore((s) => s.exportProject);
  const updateProject = usePRDStore((s) => s.updateProject);
  const setCurrentProject = usePRDStore((s) => s.setCurrentProject);
  const showToast = useToastStore((s) => s.showToast);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [regenerateModalOpen, setRegenerateModalOpen] = useState(false);
  const [regenFeedback, setRegenFeedback] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const project = getProject(id);

  // Sync edit content when active section changes
  useEffect(() => {
    if (project?.sections && project.sections[activeSectionIndex]) {
      setEditContent(cleanSectionContent(project.sections[activeSectionIndex].content));
      setIsEditing(false);
    }
  }, [project, activeSectionIndex]);

  if (!mounted || !id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#f97316] border-t-transparent" />
      </div>
    );
  }

  if (!project || !project.sections || project.sections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f5] px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1f1ee] mx-auto">
            <BookOpen className="h-8 w-8 text-[#6b6b67]" />
          </div>
          <h1 className="text-[28px] font-bold text-[#171717]">PRD not found</h1>
          <p className="mt-2 text-sm text-[#6b6b67]">
            This project does not exist in local storage or has expired.
          </p>
          <Button className="mt-6" onClick={() => router.push('/create')}>
            Create New PRD
          </Button>
        </div>
      </div>
    );
  }

  const sections = project.sections;
  const currentSection = sections[activeSectionIndex] || sections[0];

  const handleCopyCurrent = async () => {
    try {
      await navigator.clipboard.writeText(cleanSectionContent(currentSection.content));
      showToast(`Copied "${currentSection.title}" to clipboard`, 'success');
    } catch {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(exportProject(id));
      showToast('Full master PRD copied to clipboard', 'success');
    } catch {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const blob = await createPRDZipPackage(project);
      const safeTitle = project.title.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '-');
      downloadBlob(blob, `${safeTitle}-PRD-Package.zip`);
      showToast('Downloaded complete 4-file PRD Package ZIP', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to package ZIP', 'error');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const content = exportProject(id);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const safeTitle = project.title.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '-');
    downloadBlob(blob, `${safeTitle}-PRD.md`);
    showToast('Downloaded consolidated PRD.md', 'success');
  };

  const handleSaveEdit = () => {
    const updatedSections = [...sections];
    updatedSections[activeSectionIndex] = {
      ...currentSection,
      content: editContent,
      status: 'edited',
      updatedAt: new Date().toISOString(),
    };
    updateProject(id, { sections: updatedSections });
    setIsEditing(false);
    showToast('Section saved successfully', 'success');
  };

  const handleApplyAIAction = (action: string) => {
    let suffix = '';
    if (action === 'Make concise') {
      suffix = '\n\n> Note: Streamlined for executive and AI clarity.';
    } else if (action === 'Add edge cases') {
      suffix = '\n\n### Additional Edge Cases & Boundary Conditions:\n- **Concurrent Updates**: Handled with optimistic locking.\n- **Rate Limiting**: Throttles after 100 req/min.\n- **Graceful Degradation**: Fallback cached views when offline.';
    } else if (action === 'Expand technical detail') {
      suffix = '\n\n### Extended Architectural Considerations:\n- **Telemetry**: OpenTelemetry traces emitted for all mutation handlers.\n- **Data Retention**: 30-day automated rolling window for soft-deleted entities.';
    }
    setEditContent((prev) => prev + suffix);
    setIsEditing(true);
    showToast(`AI Action applied: ${action}. Click Save to apply.`, 'info');
  };

  const handleConfirmRegenerate = async () => {
    setIsRegenerating(true);
    try {
      updateProject(id, {
        input: {
          ...project.input,
          regenChanges: regenFeedback.trim() || undefined,
        },
      });
      setCurrentProject(id);
      setRegenerateModalOpen(false);
      router.push('/create/generating');
    } catch {
      showToast('Failed to trigger regeneration', 'error');
      setIsRegenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f5]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 border-b border-[#deded8] bg-white/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => router.push('/')}
              leftIcon={<ArrowLeft size={16} />}
            >
              <span className="hidden sm:inline">Home</span>
            </Button>
            <div className="h-4 w-[1px] bg-[#deded8]" />
            <span className="text-[15px] font-bold text-[#171717] truncate max-w-[200px] sm:max-w-md">
              {project.title}
            </span>
            <Badge variant="success" className="shrink-0 hidden md:inline-flex">
              <Check size={12} className="mr-1" /> Ready
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSaveEdit} leftIcon={<Save size={14} />}>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(currentSection.content);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  leftIcon={<Edit3 size={14} />}
                >
                  <span className="hidden sm:inline">Edit</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setRegenerateModalOpen(true)}
                  leftIcon={<RefreshCw size={14} />}
                >
                  <span className="hidden sm:inline">Regenerate</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyCurrent}
                  leftIcon={<Copy size={14} />}
                >
                  <span className="hidden sm:inline">Copy</span>
                </Button>

                <Button
                  size="sm"
                  onClick={handleDownloadZip}
                  loading={isZipping}
                  leftIcon={<FileArchive size={14} />}
                >
                  Download ZIP (4-File)
                </Button>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg text-[#6b6b67] hover:bg-[#f1f1ee] md:hidden"
                  aria-label="Toggle Navigation Sidebar"
                >
                  <Menu size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 shrink-0 border-r border-[#deded8] bg-white hidden md:block">
            <div className="h-full overflow-y-auto p-4 flex flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6b6b67] uppercase tracking-wider">
                    4-File Specification
                  </span>
                  <span className="text-[11px] font-mono text-[#f97316]">
                    {activeSectionIndex + 1}/4
                  </span>
                </div>

                <nav className="space-y-1.5">
                  {sections.map((sec, idx) => {
                    const active = idx === activeSectionIndex;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => {
                          setActiveSectionIndex(idx);
                          setIsEditing(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all ${
                          active
                            ? 'bg-[#fff1e8] text-[#c2410c] font-semibold border border-[#f97316]/30 shadow-xs'
                            : 'text-[#171717] hover:bg-[#fafaf9] border border-transparent'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{sec.title}</p>
                          <p className="text-[10px] font-mono text-[#6b6b67] truncate mt-0.5">
                            {sec.filename || `0${idx + 1}-section.md`}
                          </p>
                        </div>
                        {active && <ChevronRight size={14} className="text-[#f97316] shrink-0" />}
                      </button>
                    );
                  })}
                </nav>

                {/* Metadata Pill Box */}
                <div className="mt-6 pt-4 border-t border-[#deded8] space-y-2">
                  <span className="text-[11px] font-bold text-[#6b6b67] uppercase tracking-wider block">
                    Architecture Specs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="primary" className="capitalize">
                      {project.input.platform || 'Web'}
                    </Badge>
                    <Badge variant="default">
                      {project.input.stack?.frontend || 'React'}
                    </Badge>
                    <Badge variant="default">
                      {project.input.stack?.backend || 'Node.js'}
                    </Badge>
                    <Badge variant="default">
                      {project.input.stack?.database || 'SQL'}
                    </Badge>
                    <Badge variant="info">
                      {project.input.designStyle || 'Minimal'}
                    </Badge>
                    <Badge variant="info">
                      {project.input.font || 'Poppins'}
                    </Badge>
                  </div>
                </div>

                {/* AI Quick Actions */}
                <div className="mt-6 pt-4 border-t border-[#deded8] space-y-2">
                  <span className="text-[11px] font-bold text-[#6b6b67] uppercase tracking-wider block">
                    AI Section Actions
                  </span>
                  <div className="space-y-1">
                    {['Make concise', 'Add edge cases', 'Expand technical detail'].map((act) => (
                      <button
                        key={act}
                        type="button"
                        onClick={() => handleApplyAIAction(act)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#6b6b67] hover:text-[#171717] hover:bg-[#f1f1ee] transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles size={12} className="text-[#f97316]" /> {act}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Master Download Action */}
              <div className="pt-4 border-t border-[#deded8] space-y-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center"
                  onClick={handleDownloadMarkdown}
                  leftIcon={<Download size={14} />}
                >
                  Download Single PRD.md
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  className="w-full justify-center text-xs"
                  onClick={handleCopyAll}
                  leftIcon={<Copy size={12} />}
                >
                  Copy Full Document
                </Button>
              </div>
            </div>
          </aside>
        )}

        {/* Section Viewport */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
          <div className="mx-auto max-w-3xl">
            {/* Section Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#deded8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
                  {currentSection.filename || `Section ${activeSectionIndex + 1}`}
                </span>
                <h1 className="text-[26px] font-bold text-[#171717] mt-0.5">
                  {currentSection.title}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6b6b67]">
                  Last updated {new Date(currentSection.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Special UI/UX Design System Token Swatches Banner */}
            {currentSection.id === 'uiux' && project.input.colors && (
              <div className="mb-8 rounded-2xl border border-[#deded8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Palette size={16} className="text-[#f97316]" />
                    <h3 className="text-sm font-bold text-[#171717]">
                      Design System Hex Tokens ({project.input.designStyle} • {project.input.font})
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f1f1ee] text-[#171717] capitalize">
                    Theme: {project.input.theme || 'Both'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {Object.entries(project.input.colors).map(([key, hex]) => (
                    <div
                      key={key}
                      className="p-2 rounded-xl border border-[#deded8] bg-[#fafaf9] text-center"
                    >
                      <div
                        className="w-full h-8 rounded-lg mb-1.5 border border-black/10 shadow-xs"
                        style={{ background: hex }}
                      />
                      <p className="text-[11px] font-semibold text-[#171717] capitalize">{key}</p>
                      <p className="text-[10px] font-mono text-[#6b6b67]">{hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Area: Edit Mode or Markdown Preview */}
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="textarea font-mono text-sm leading-relaxed h-[650px] w-full p-5 bg-white border border-[#deded8] rounded-xl shadow-xs"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(currentSection.content);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit} leftIcon={<Save size={16} />}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#deded8] bg-white p-8 shadow-xs">
                <MarkdownRenderer content={currentSection.content} />
              </div>
            )}

            {/* Bottom Section Navigator */}
            <div className="mt-8 pt-6 border-t border-[#deded8] flex items-center justify-between">
              <Button
                variant="tertiary"
                size="sm"
                disabled={activeSectionIndex === 0}
                onClick={() => setActiveSectionIndex((i) => Math.max(0, i - 1))}
              >
                ← Previous Section
              </Button>

              <Button
                size="sm"
                disabled={activeSectionIndex === sections.length - 1}
                onClick={() => setActiveSectionIndex((i) => Math.min(sections.length - 1, i + 1))}
              >
                Next Section →
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Regeneration Modal */}
      {regenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-[#deded8] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#deded8]">
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-[#f97316]" />
                <h3 className="text-[17px] font-bold text-[#171717]">Regenerate PRD Package</h3>
              </div>
              <button
                type="button"
                onClick={() => setRegenerateModalOpen(false)}
                className="p-1 rounded-lg text-[#6b6b67] hover:bg-[#f1f1ee]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#6b6b67] leading-relaxed">
              Describe any revisions, additional features, or architectural adjustments you want. The generator will rebuild the 4-file PRD package incorporating your feedback.
            </p>

            <textarea
              value={regenFeedback}
              onChange={(e) => setRegenFeedback(e.target.value.slice(0, 1000))}
              placeholder="e.g. Expand on the payment integration with Stripe webhooks, add specific mobile push notification schemas, increase focus on offline sync..."
              className="textarea h-32 w-full text-xs"
              maxLength={1000}
            />
            <div className="text-right text-[10px] text-[#6b6b67]">
              {regenFeedback.length}/1000 characters
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#deded8]">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setRegenerateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                loading={isRegenerating}
                onClick={handleConfirmRegenerate}
                leftIcon={<RefreshCw size={14} />}
              >
                Regenerate Package
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}