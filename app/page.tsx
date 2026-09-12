'use client';

import {
  Sparkles,
  ArrowRight,
  FileCode,
  Check,
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { useCreateModalStore } from '@/store';

export default function HomePage() {
  const openCreateModal = useCreateModalStore((s) => s.openCreateModal);
  const EXAMPLE_IDEAS = [
    {
      category: 'SaaS',
      title: 'AI Customer Feedback Engine',
      description: 'Centralize customer reviews, categorize sentiment, and auto-generate engineering tickets with Stripe subscription billing.',
    },
    {
      category: 'Mobile',
      title: 'Expense & Bill Splitter',
      description: 'Mobile-first expense sharing app with camera receipt OCR, group ledgers, real-time push alerts, and instant settlement.',
    },
    {
      category: 'Internal Tools',
      title: 'Inventory & Order Dashboard',
      description: 'Enterprise operations portal with role-based permissions, batch CSV exports, barcode scanning, and audit trails.',
    },
    {
      category: 'AI Product',
      title: 'Meeting Transcript Summarizer',
      description: 'Audio upload and real-time recording tool that extracts action items, assigns owners, and syncs directly to Notion/Slack.',
    },
  ];

  const FOUR_FILES = [
    {
      filename: '01-PRODUCT-OVERVIEW.md',
      title: 'Product Overview',
      desc: 'Executive summary, core problem, target user personas, value proposition, and quantitative 90-day KPIs.',
      badge: 'Context',
    },
    {
      filename: '02-FEATURES-REQUIREMENTS.md',
      title: 'Features & Requirements',
      desc: 'MVP vs Phase 2 scope matrix, user stories with Gherkin Given-When-Then acceptance criteria, and edge cases.',
      badge: 'User Stories',
    },
    {
      filename: '03-UI-UX-REQUIREMENTS.md',
      title: 'UI/UX Requirements',
      desc: 'Complete design system: visual style guidelines, exact hex color tokens, typography scale, and wireframe layouts.',
      badge: 'Design System',
    },
    {
      filename: '04-TECHNICAL-REQUIREMENTS.md',
      title: 'Technical Requirements',
      desc: 'Target tech stack, system architecture diagram, API REST contracts, database entity models, and auth security.',
      badge: 'Architecture',
    },
  ];

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f7f7f5] border-b border-[#deded8]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-xs font-bold tracking-wider text-[#c2410c] w-fit border border-[#f97316]/20">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-[#f97316]" />
                DEVELOPER-READY 4-FILE SPECIFICATION
              </div>

              <h1 className="text-[38px] font-bold leading-[1.08] tracking-tight text-[#171717] sm:text-[54px]">
                Turn your idea into a PRD
                <br />
                <span className="text-[#f97316]">AI agents can actually code.</span>
              </h1>

              <p className="mt-6 text-[18px] leading-relaxed text-[#6b6b67] max-w-2xl">
                Stop pasting messy chat conversations into your editor. Configure your platform, tech stack, design style, and brand colors in 6 guided steps. Export a developer-ready 4-file PRD package in seconds.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => openCreateModal()}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#f97316] px-8 py-4 text-[17px] font-semibold !text-white hover:!text-white transition-all duration-200 hover:bg-[#ea580c] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Create PRD
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-[#6b6b67]">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#16803c]" /> 6-Step Visual Builder
                </span>
                <span className="text-[#deded8]">•</span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#16803c]" /> Modular 4-File PRD Package
                </span>
                <span className="text-[#deded8]">•</span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#16803c]" /> Instant ZIP Export
                </span>
              </div>
            </div>

            {/* Visual Hero Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#deded8] bg-white p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#deded8]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs font-mono text-[#6b6b67] ml-2">prd-package.zip</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#f97316] bg-[#fff1e8] px-2 py-0.5 rounded-full">
                    Claude & Cursor Ready
                  </span>
                </div>

                <div className="space-y-2">
                  {FOUR_FILES.map((file, i) => (
                    <div
                      key={file.filename}
                      className="p-2.5 rounded-xl border border-[#deded8] bg-[#fafaf9] hover:bg-white transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileCode size={16} className="text-[#f97316] shrink-0" />
                        <span className="text-xs font-mono font-semibold text-[#171717] truncate">
                          {file.filename}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-[#6b6b67] shrink-0 bg-white px-2 py-0.5 rounded border border-[#deded8]">
                        {file.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#deded8] flex items-center justify-between text-xs text-[#6b6b67]">
                  <span>Optimized for AI Agents</span>
                  <button
                    type="button"
                    onClick={() => openCreateModal()}
                    className="font-semibold text-[#f97316] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Open Builder →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-File Modular Output Section */}
      <section className="border-b border-[#deded8] bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-[32px] font-bold text-[#171717]">
              Clean 4-File PRD Architecture
            </h2>
            <p className="mt-3 text-sm text-[#6b6b67] leading-relaxed">
              AI agents like Claude Code and Cursor perform significantly better when documentation is split cleanly into context, user stories, visual design tokens, and technical architecture.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FOUR_FILES.map((file, idx) => (
              <div
                key={file.filename}
                className="rounded-2xl border border-[#deded8] bg-white p-6 shadow-xs flex flex-col justify-between hover:border-[#f97316] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-[#fff1e8] text-[#c2410c] flex items-center justify-center font-mono font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-[#6b6b67]">{file.badge}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#171717]">{file.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6b6b67]">{file.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#deded8] font-mono text-[11px] text-[#f97316]">
                  {file.filename}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Visual Pipeline */}
      <section id="how-it-works" className="border-b border-[#deded8] bg-[#f7f7f5] py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
              Sequential Workflow
            </span>
            <h2 className="text-[32px] font-bold text-[#171717] mt-1">
              From Idea to Developer Package in 6 Steps
            </h2>
            <p className="mt-3 text-sm text-[#6b6b67]">
              Every project parameter is collected with purpose-built UI controls.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {[
              { num: '01', title: 'Platform', desc: 'Website, Mobile, Desktop, or Custom' },
              { num: '02', title: 'Tech Stack', desc: 'Frontend, Backend, Database selection' },
              { num: '03', title: 'Visual Style', desc: '11 styles with live interactive preview' },
              { num: '04', title: 'Colors & Theme', desc: 'Presets, gradients, and custom hex tokens' },
              { num: '05', title: 'Typography', desc: '10 Google Fonts with live font rendering' },
              { num: '06', title: 'Description', desc: 'Quick-start templates or custom input' },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-[#deded8] bg-white p-5 text-center flex flex-col items-center justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fff1e8] text-[#c2410c] flex items-center justify-center font-bold text-sm mb-3">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#171717]">{step.title}</h4>
                  <p className="mt-1 text-[11px] text-[#6b6b67] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => openCreateModal()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#f97316] px-8 py-3.5 text-sm font-semibold !text-white hover:!text-white hover:bg-[#ea580c] shadow-md transition-all active:scale-[0.98]"
            >
              Start PRD Builder
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="border-b border-[#deded8] bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-[32px] font-bold text-[#171717]">Example Product Ideas</h2>
            <p className="mt-2 text-sm text-[#6b6b67]">
              Pick a starting point to test the builder and preview generated outputs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {EXAMPLE_IDEAS.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => openCreateModal(item.description)}
                className="group rounded-2xl border border-[#deded8] bg-white p-6 text-left transition-all hover:border-[#f97316] hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="rounded-md bg-[#f1f1ee] px-2.5 py-1 text-xs font-semibold text-[#6b6b67]">
                    {item.category}
                  </span>
                  <h3 className="mt-3 text-[17px] font-bold text-[#171717] group-hover:text-[#f97316] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6b6b67]">{item.description}</p>
                </div>
                <span className="mt-5 inline-flex items-center text-xs font-semibold text-[#f97316] group-hover:translate-x-1 transition-transform">
                  Launch with idea →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}