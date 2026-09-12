'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Sliders, Palette } from 'lucide-react';
import {
  PRESET_PALETTES,
  GRADIENT_PALETTES,
  COLOR_KEYS,
  ColorPalette,
  GradientOption,
} from '@/lib/builder-data';
import { ColorTokens } from '@/store/prd-store';

interface ColorPalettePickerProps {
  colors: ColorTokens;
  gradient?: { name?: string; start: string; end: string } | null;
  onColorsChange: (colors: ColorTokens) => void;
  onGradientChange: (gradient: { name?: string; start: string; end: string } | null) => void;
  onConfirm?: () => void;
  confirmed?: boolean;
}

export default function ColorPalettePicker({
  colors,
  gradient,
  onColorsChange,
  onGradientChange,
  onConfirm,
  confirmed = false,
}: ColorPalettePickerProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'gradients' | 'custom'>('presets');
  const [hexInputs, setHexInputs] = useState<Record<string, string>>({
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
  });

  const handleSelectPreset = (preset: ColorPalette) => {
    onGradientChange(null);
    onColorsChange({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent,
      background: preset.background,
      surface: preset.surface,
      text: preset.text,
    });
    setHexInputs({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent,
      background: preset.background,
      surface: preset.surface,
      text: preset.text,
    });
  };

  const handleSelectGradient = (grad: GradientOption) => {
    onGradientChange({ name: grad.name, start: grad.start, end: grad.end });
    onColorsChange({
      primary: grad.start,
      secondary: grad.end,
      accent: grad.end,
      background: grad.background,
      surface: grad.surface,
      text: grad.text,
    });
    setHexInputs({
      primary: grad.start,
      secondary: grad.end,
      accent: grad.end,
      background: grad.background,
      surface: grad.surface,
      text: grad.text,
    });
  };

  const handleHexChange = (key: string, val: string) => {
    const formatted = val.startsWith('#') ? val : `#${val}`;
    setHexInputs((prev) => ({ ...prev, [key]: formatted }));
    if (/^#[0-9A-Fa-f]{6}$/.test(formatted)) {
      onColorsChange({ ...colors, [key]: formatted });
    }
  };

  const isPresetActive = (p: ColorPalette) =>
    !gradient &&
    colors.primary.toLowerCase() === p.primary.toLowerCase() &&
    colors.background.toLowerCase() === p.background.toLowerCase();

  const isGradientActive = (g: GradientOption) =>
    gradient && gradient.start.toLowerCase() === g.start.toLowerCase();

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#deded8] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'presets'
              ? 'bg-[#f97316] text-white shadow-sm'
              : 'text-[#6b6b67] hover:bg-[#f1f1ee] hover:text-[#171717]'
          }`}
        >
          <Palette size={15} />
          Presets ({PRESET_PALETTES.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('gradients')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'gradients'
              ? 'bg-[#f97316] text-white shadow-sm'
              : 'text-[#6b6b67] hover:bg-[#f1f1ee] hover:text-[#171717]'
          }`}
        >
          <Sparkles size={15} />
          Gradients ({GRADIENT_PALETTES.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'custom'
              ? 'bg-[#f97316] text-white shadow-sm'
              : 'text-[#6b6b67] hover:bg-[#f1f1ee] hover:text-[#171717]'
          }`}
        >
          <Sliders size={15} />
          Custom Colors
        </button>
      </div>

      {/* Preset Palettes */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PRESET_PALETTES.map((preset) => {
            const active = isPresetActive(preset);
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  active
                    ? 'border-[#f97316] bg-[#fff1e8] shadow-sm ring-1 ring-[#f97316]'
                    : 'border-[#deded8] bg-white hover:border-[#f97316]/50 hover:bg-[#fafaf9]'
                }`}
              >
                <div className="flex flex-col gap-1 shrink-0">
                  <div className="flex gap-1">
                    <span className="w-4 h-4 rounded-sm border border-black/10" style={{ background: preset.primary }} />
                    <span className="w-4 h-4 rounded-sm border border-black/10" style={{ background: preset.secondary }} />
                    <span className="w-4 h-4 rounded-sm border border-black/10" style={{ background: preset.accent }} />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-4 h-4 rounded-sm border border-black/10" style={{ background: preset.background }} />
                    <span className="w-4 h-4 rounded-sm border border-black/10" style={{ background: preset.surface }} />
                    <span className="w-4 h-4 rounded-sm border border-black/10" style={{ background: preset.text }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#171717] truncate">{preset.name}</p>
                  <p className="text-[10px] font-mono text-[#6b6b67] truncate">{preset.primary}</p>
                </div>
                {active && (
                  <div className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Gradients */}
      {activeTab === 'gradients' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GRADIENT_PALETTES.map((grad) => {
            const active = isGradientActive(grad);
            return (
              <button
                key={grad.name}
                type="button"
                onClick={() => handleSelectGradient(grad)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  active
                    ? 'border-[#f97316] bg-[#fff1e8] shadow-sm ring-1 ring-[#f97316]'
                    : 'border-[#deded8] bg-white hover:border-[#f97316]/50'
                }`}
              >
                <div className="flex flex-col gap-1.5 shrink-0">
                  <div
                    className="w-16 h-6 rounded-md shadow-inner"
                    style={{ background: `linear-gradient(135deg, ${grad.start}, ${grad.end})` }}
                  />
                  <div className="flex gap-1">
                    <span className="w-4 h-3 rounded-xs border border-black/10" style={{ background: grad.background }} />
                    <span className="w-4 h-3 rounded-xs border border-black/10" style={{ background: grad.surface }} />
                    <span className="w-4 h-3 rounded-xs border border-black/10" style={{ background: grad.text }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#171717]">{grad.name}</p>
                  <p className="text-[11px] font-mono text-[#6b6b67]">
                    {grad.start} → {grad.end}
                  </p>
                </div>
                {active && (
                  <div className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Colors */}
      {activeTab === 'custom' && (
        <div className="rounded-xl border border-[#deded8] bg-white p-5 space-y-4">
          <p className="text-xs text-[#6b6b67] font-medium">
            Fine-tune every layer of your palette or pick custom hex codes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {COLOR_KEYS.map(({ key, label, desc }) => {
              const currentVal = (colors as any)[key] || '#000000';
              return (
                <div key={key} className="flex items-center gap-3 p-2.5 rounded-lg border border-[#deded8] bg-[#fafaf9]">
                  <input
                    type="color"
                    value={currentVal}
                    onChange={(e) => {
                      onGradientChange(null);
                      handleHexChange(key, e.target.value);
                    }}
                    className="w-9 h-9 rounded-md border border-[#deded8] cursor-pointer shrink-0"
                    aria-label={`Select ${label} color`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-[#171717]">{label}</span>
                      <span className="text-[10px] text-[#6b6b67] truncate max-w-[100px]">{desc}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <input
                        type="text"
                        value={hexInputs[key] || currentVal}
                        onChange={(e) => handleHexChange(key, e.target.value)}
                        placeholder="#000000"
                        className="h-7 w-20 text-xs font-mono border border-[#deded8] rounded px-1.5 bg-white text-[#171717]"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmation indicator */}
      {onConfirm && (
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6b6b67]">Selected Palette Preview:</span>
            <div className="flex gap-1">
              <span className="w-5 h-5 rounded-md border border-black/10" style={{ background: colors.primary }} title="Primary" />
              <span className="w-5 h-5 rounded-md border border-black/10" style={{ background: colors.secondary }} title="Secondary" />
              <span className="w-5 h-5 rounded-md border border-black/10" style={{ background: colors.accent }} title="Accent" />
              <span className="w-5 h-5 rounded-md border border-black/10" style={{ background: colors.background }} title="Background" />
              <span className="w-5 h-5 rounded-md border border-black/10" style={{ background: colors.surface }} title="Surface" />
              <span className="w-5 h-5 rounded-md border border-black/10" style={{ background: colors.text }} title="Text" />
            </div>
          </div>
          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              confirmed
                ? 'bg-[#16803c] text-white shadow-sm'
                : 'bg-[#171717] text-white hover:bg-[#2e2e2e]'
            }`}
          >
            <Check size={14} />
            {confirmed ? 'Palette Applied' : 'Confirm Colors'}
          </button>
        </div>
      )}
    </div>
  );
}

