'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Download, AlertCircle, ArrowRight } from 'lucide-react';
import { GENERATION_STEPS } from '@/lib/builder-data';
import { createPRDZipPackage, downloadBlob } from '@/lib/zip-export';
import { generatePRDSections } from '@/lib/prd-generator';
import { cleanSectionContent } from '@/lib/nara-client';
import { usePRDStore, useToastStore, PRDSection } from '@/store';
import Button from '@/components/ui/Button';

export default function GeneratingPage() {
  const router = useRouter();
  const currentProjectId = usePRDStore((s) => s.currentProjectId);
  const getProject = usePRDStore((s) => s.getProject);
  const setSections = usePRDStore((s) => s.setSections);
  const setStatus = usePRDStore((s) => s.setStatus);
  const updateProject = usePRDStore((s) => s.updateProject);
  const showToast = useToastStore((s) => s.showToast);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const generatedPackageBlob = useRef<Blob | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!currentProjectId) {
      router.push('/create');
      return;
    }

    const project = getProject(currentProjectId);
    if (!project) {
      router.push('/create');
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    setStatus(currentProjectId, 'generating');

    const executePipeline = async () => {
      try {
        // Step 1: Validate
        setCurrentStepIndex(0);
        await new Promise((r) => setTimeout(r, 400));
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[0].id]);

        // Step 2: Requirements
        setCurrentStepIndex(1);
        await new Promise((r) => setTimeout(r, 500));
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[1].id]);

        // Step 3: Connect
        setCurrentStepIndex(2);
        await new Promise((r) => setTimeout(r, 450));
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[2].id]);

        // Step 4: Generate PRD Content (AI Mode or Local Mode with failovers)
        setCurrentStepIndex(3);
        const isAIMode = project.input.generationMode === 'ai';
        let data: { projectName: string; sections: any[]; modelUsed?: string };

        if (isAIMode) {
          // Retrieve interview data from sessionStorage if present
          let interviewData: any = null;
          try {
            const raw = sessionStorage.getItem(`ai_interview_${project.id}`);
            if (raw) interviewData = JSON.parse(raw);
          } catch (e) {
            // Ignore parse error
          }

          if (!interviewData) {
            interviewData = {
              appName: project.title,
              oneLinePitch: project.input.idea,
              targetAudience: project.input.audience || 'General Users',
              primaryPersonaNeeds: 'High performance, intuitive UI',
              coreUserFlows: ['Onboarding', 'Core Activity Dashboard', 'Export Results'],
              keyFeatures: project.input.keyFeatures || ['Authentication', 'Real-time updates'],
              platform: project.input.platform || 'Website',
              customPlatform: project.input.customPlatform,
              frontendPreference: project.input.stack?.frontend,
              backendPreference: project.input.stack?.backend,
              databasePreference: project.input.stack?.database,
              thirdPartyIntegrations: ['JWT Authentication', 'REST APIs'],
              designAesthetic: project.input.designStyle || 'Minimal',
              primaryColor: project.input.colors?.primary || '#f97316',
              specialRules: project.input.guidingNotes,
            };
          }

          try {
            // First attempt server API route
            const res = await fetch('/api/prd/generate-ai', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(interviewData),
            });

            if (!res.ok) {
              throw new Error(`AI API returned ${res.status}`);
            }
            const aiRes = await res.json();
            if (!aiRes.success || !aiRes.sections || aiRes.sections.length === 0) {
              throw new Error('AI API output missing sections');
            }
            data = aiRes;
          } catch (serverErr) {
            console.warn('Server AI route failed, attempting direct Nara Router client failover:', serverErr);
            const { generatePRDWithNara } = await import('@/lib/nara-client');
            const clientRes = await generatePRDWithNara(interviewData);
            if (clientRes.success && clientRes.sections.length > 0) {
              data = clientRes;
            } else {
              console.warn('Nara Router unavailable, using local domain synthesis engine fallback');
              data = generatePRDSections({
                platform: project.input.platform,
                customPlatform: project.input.customPlatform,
                stack: project.input.stack,
                designStyle: project.input.designStyle,
                theme: project.input.theme,
                colors: project.input.colors,
                font: project.input.font,
                category: project.input.category,
                targetEntities: project.input.targetEntities,
                keyFeatures: project.input.keyFeatures,
                userRoles: project.input.userRoles,
                authModel: project.input.authModel,
                idea: project.input.idea,
                guidingNotes: project.input.guidingNotes,
                regenChanges: project.input.regenChanges,
              });
            }
          }
        } else {
          // Standard local/offline pipeline
          try {
            const res = await fetch('/api/prd/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                platform: project.input.platform,
                customPlatform: project.input.customPlatform,
                stack: project.input.stack,
                designStyle: project.input.designStyle,
                theme: project.input.theme,
                colors: project.input.colors,
                font: project.input.font,
                category: project.input.category,
                targetEntities: project.input.targetEntities,
                keyFeatures: project.input.keyFeatures,
                userRoles: project.input.userRoles,
                authModel: project.input.authModel,
                idea: project.input.idea,
                guidingNotes: project.input.guidingNotes,
                regenChanges: project.input.regenChanges,
              }),
            });

            if (!res.ok) {
              throw new Error(`API server returned ${res.status}`);
            }
            data = await res.json();
          } catch (fetchErr) {
            console.warn('API call unavailable, using high-fidelity local generator:', fetchErr);
            data = generatePRDSections({
              platform: project.input.platform,
              customPlatform: project.input.customPlatform,
              stack: project.input.stack,
              designStyle: project.input.designStyle,
              theme: project.input.theme,
              colors: project.input.colors,
              font: project.input.font,
              category: project.input.category,
              targetEntities: project.input.targetEntities,
              keyFeatures: project.input.keyFeatures,
              userRoles: project.input.userRoles,
              authModel: project.input.authModel,
              idea: project.input.idea,
              guidingNotes: project.input.guidingNotes,
              regenChanges: project.input.regenChanges,
            });
          }
        }
        const formattedSections: PRDSection[] = data.sections.map((s: any) => ({
          id: s.id,
          key: s.id,
          title: s.title,
          filename: s.filename,
          content: cleanSectionContent(s.content),
          status: 'generated' as const,
          updatedAt: new Date().toISOString(),
        }));

        setSections(currentProjectId, formattedSections);
        if (data.projectName) {
          updateProject(currentProjectId, { title: data.projectName });
        }
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[3].id]);

        // Step 5: Parsing Feature Matrix
        setCurrentStepIndex(4);
        await new Promise((r) => setTimeout(r, 400));
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[4].id]);

        // Step 6: Formatting Design System Tokens
        setCurrentStepIndex(5);
        await new Promise((r) => setTimeout(r, 400));
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[5].id]);

        // Step 7: Packaging Multi-File ZIP Archive
        setCurrentStepIndex(6);
        const updatedProject = {
          ...project,
          sections: formattedSections,
          title: data.projectName || project.title,
        };
        const zipBlob = await createPRDZipPackage(updatedProject);
        generatedPackageBlob.current = zipBlob;
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[6].id]);

        // Step 8: Persisting to Local Project
        setCurrentStepIndex(7);
        setStatus(currentProjectId, 'ready');
        await new Promise((r) => setTimeout(r, 350));
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[7].id]);

        // Step 9: Preparing Download
        setCurrentStepIndex(8);
        await new Promise((r) => setTimeout(r, 400));
        setCompletedSteps((prev) => [...prev, GENERATION_STEPS[8].id]);
        setDownloadReady(true);

        // Auto-download the ZIP package
        const safeName = (data.projectName || project.title)
          .replace(/[^\w\s-]/gi, '')
          .trim()
          .replace(/\s+/g, '-');
        downloadBlob(zipBlob, `${safeName}-PRD-Package.zip`);
        showToast('Developer-ready PRD package downloaded!', 'success');

        // Redirect to PRD Viewer
        setTimeout(() => {
          router.push(`/prd/${currentProjectId}`);
        }, 1200);
      } catch (err: any) {
        console.error('Generation pipeline error:', err);
        setError(err.message || 'An error occurred while generating the PRD.');
        setStatus(currentProjectId, 'error');
      }
    };

    executePipeline();
  }, [currentProjectId, getProject, router, setSections, setStatus, updateProject, showToast]);

  const progressPercent = Math.round((completedSteps.length / GENERATION_STEPS.length) * 100);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1e8] text-[#f97316] shadow-sm border border-[#f97316]/20">
            {error ? (
              <AlertCircle size={32} className="text-red-500" />
            ) : downloadReady ? (
              <Check size={32} className="text-[#16803c]" />
            ) : (
              <Loader2 size={32} className="animate-spin" />
            )}
          </div>
          <h1 className="text-[26px] font-bold text-[#171717]">
            {error
              ? 'Generation Encountered an Issue'
              : downloadReady
              ? 'PRD Package Complete!'
              : 'Generating Developer-Ready PRD'}
          </h1>
          <p className="mt-1.5 text-sm text-[#6b6b67]">
            {error
              ? 'You can retry generation or return to edit your configuration.'
              : 'Constructing modular 4-file specification and design system tokens...'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[#6b6b67]">
            <span>Pipeline Progress</span>
            <span className="text-[#f97316] font-bold">{progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#deded8] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 9-Stage Step Checklist */}
        <div className="space-y-2 rounded-2xl border border-[#deded8] bg-white p-5 shadow-sm">
          {GENERATION_STEPS.map((s, idx) => {
            const isCompleted = completedSteps.includes(s.id);
            const isCurrent = idx === currentStepIndex && !error && !downloadReady;

            return (
              <div
                key={s.id}
                className={`flex items-center gap-3.5 px-3 py-2 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-[#fff1e8] border border-[#f97316]/30'
                    : isCompleted
                    ? 'bg-[#fafaf9]'
                    : 'opacity-50'
                }`}
              >
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-[#16803c] text-white flex items-center justify-center text-xs shadow-xs">
                      <Check size={12} />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#f97316] border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#deded8] bg-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-semibold truncate ${
                      isCurrent
                        ? 'text-[#c2410c]'
                        : isCompleted
                        ? 'text-[#171717]'
                        : 'text-[#6b6b67]'
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="text-[10px] text-[#6b6b67] truncate">{s.description}</p>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-bold text-[#f97316] animate-pulse shrink-0">
                    Running...
                  </span>
                )}
                {isCompleted && (
                  <span className="text-[10px] font-medium text-[#16803c] shrink-0">Done</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Error / Manual Action */}
        {error && (
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary" onClick={() => router.push('/create')}>
              Back to Builder
            </Button>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        )}

        {downloadReady && (
          <div className="mt-6 text-center space-y-3">
            <p className="text-xs text-[#16803c] font-medium flex items-center justify-center gap-1.5">
              <Check size={14} /> ZIP download initiated automatically.
            </p>
            <Button
              size="md"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => router.push(`/prd/${currentProjectId}`)}
            >
              Open Interactive PRD Viewer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}