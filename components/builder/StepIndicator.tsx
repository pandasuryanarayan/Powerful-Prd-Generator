'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  steps?: string[];
  onStepClick?: (step: number) => void;
}

export const BUILDER_STEPS = [
  'Platform',
  'Tech Stack',
  'Style',
  'Colors & Theme',
  'Typography',
  'Description',
];

export default function StepIndicator({
  currentStep,
  totalSteps = 6,
  steps = BUILDER_STEPS,
  onStepClick,
}: StepIndicatorProps) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-8 space-y-3">
      {/* Header with step number and percent */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#fff1e8] text-[#c2410c] flex items-center justify-center text-xs font-bold border border-[#f97316]/20">
            {currentStep}
          </span>
          <div>
            <span className="text-xs text-[#6b6b67] uppercase tracking-wider block">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold text-[#171717]">
              {steps[currentStep - 1]}
            </span>
          </div>
        </div>
        <span className="text-xs font-bold text-[#f97316] bg-[#fff1e8] px-2.5 py-1 rounded-full border border-[#f97316]/20">
          {progressPercent}% completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-[#deded8] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop Step Badges */}
      <div className="hidden sm:grid grid-cols-6 gap-2 pt-1">
        {steps.map((stepName, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <button
              key={stepName}
              type="button"
              disabled={stepNum > currentStep && !onStepClick}
              onClick={() => onStepClick && stepNum <= currentStep && onStepClick(stepNum)}
              className={`flex items-center gap-1.5 p-1.5 rounded-md text-left transition-all ${
                isCurrent
                  ? 'bg-white shadow-xs border border-[#f97316] text-[#f97316]'
                  : isDone
                  ? 'text-[#16803c] hover:bg-white/60 cursor-pointer'
                  : 'text-[#6b6b67] opacity-60'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                  isDone
                    ? 'bg-[#16803c] text-white'
                    : isCurrent
                    ? 'bg-[#f97316] text-white'
                    : 'bg-[#deded8] text-[#6b6b67]'
                }`}
              >
                {isDone ? <Check size={10} /> : stepNum}
              </div>
              <span className="text-[11px] font-medium truncate">{stepName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

