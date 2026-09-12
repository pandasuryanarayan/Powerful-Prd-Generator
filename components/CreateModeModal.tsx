'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Zap, X, ArrowRight } from 'lucide-react';
import { useCreateModalStore } from '@/store';

export default function CreateModeModal() {
  const router = useRouter();
  const { isOpen, prefillIdea, closeCreateModal } = useCreateModalStore();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCreateModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCreateModal]);

  if (!isOpen) return null;

  const handleSelectMode = (mode: 'local' | 'ai') => {
    closeCreateModal();
    const query = prefillIdea ? `?idea=${encodeURIComponent(prefillIdea)}` : '';
    if (mode === 'ai') {
      router.push(`/create/ai${query}`);
    } else {
      router.push(`/create${query}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-[#deded8] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f97316]">
              Choose Your Generation Pipeline
            </span>
            <h2 className="text-xl font-bold text-[#171717] mt-0.5">
              How would you like to build your PRD?
            </h2>
            <p className="text-xs text-[#6b6b67] mt-1">
              Select between instant local synthesis or deep conversational AI reasoning.
            </p>
          </div>
          <button
            type="button"
            onClick={closeCreateModal}
            className="p-1.5 rounded-lg text-[#8c8c85] hover:text-[#171717] hover:bg-[#f1f1ee] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 2 Options Cards */}
        <div className="grid grid-cols-1 gap-3.5">
          {/* OPTION 1: AI-POWERED */}
          <button
            type="button"
            onClick={() => handleSelectMode('ai')}
            className="group relative p-4 rounded-xl border-2 border-[#f97316] bg-[#fff1e8]/30 hover:bg-[#fff1e8]/60 text-left transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#f97316] text-white">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#171717] group-hover:text-[#ea580c] transition-colors">
                      With AI (Nara Router)
                    </h3>
                    <span className="text-[10px] font-semibold text-[#c2410c] bg-[#fff1e8] px-2 py-0.5 rounded border border-[#f97316]/30">
                      Recommended • Top Premium Quality
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-[#f97316] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-[#6b6b67] leading-relaxed mt-2">
                Step-by-step interactive questionnaire analyzing your unique app concept with live Nara AI Router models (agnes, laguna, ling, stepfun) to construct tailored database schemas, custom user journeys, and bespoke architecture.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#f97316]/20 flex items-center gap-1.5 text-[11px] font-semibold text-[#f97316]">
              <span>Launch Step-by-Step AI Interview →</span>
            </div>
          </button>

          {/* OPTION 2: LOCAL / OFFLINE */}
          <button
            type="button"
            onClick={() => handleSelectMode('local')}
            className="group relative p-4 rounded-xl border border-[#deded8] bg-white hover:border-[#171717]/40 hover:bg-[#fafaf9] text-left transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#f1f1ee] text-[#171717]">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#171717]">
                      Locally (Standard 6-Step Builder)
                    </h3>
                    <span className="text-[10px] font-medium text-[#6b6b67] bg-[#f1f1ee] px-2 py-0.5 rounded">
                      Fast • 100% Offline Rule-Based
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-[#8c8c85] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-[#6b6b67] leading-relaxed mt-2">
                Configure platform, tech stack, visual styles, color tokens, and domain blueprints with instant client-side execution. Zero external API dependency.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#deded8] flex items-center gap-1.5 text-[11px] font-medium text-[#6b6b67]">
              <span>Continue with 6-step builder →</span>
            </div>
          </button>
        </div>

        {/* Footer info note */}
        <p className="text-[11px] text-center text-[#8c8c85]">
          Both modes generate modular, 4-file specifications ready for Claude Code, Cursor, and Copilot.
        </p>
      </div>
    </div>
  );
}

