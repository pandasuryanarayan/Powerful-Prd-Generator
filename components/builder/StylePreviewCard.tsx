'use client';

import React from 'react';
import { ColorTokens } from '@/store/prd-store';

interface StylePreviewCardProps {
  style: string;
  colors: ColorTokens;
  compact?: boolean;
}

export default function StylePreviewCard({ style, colors, compact = false }: StylePreviewCardProps) {
  const { primary, secondary, accent, background, surface, text } = colors;

  const renderStyleContent = () => {
    switch (style) {
      case 'Gradient':
        return (
          <div
            className="w-full h-full rounded-xl p-4 flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, ${primary}, ${accent})`,
              color: '#FFFFFF',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm">
                Gradient Flow
              </span>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold truncate">Modern App Interface</p>
              <p className="text-[11px] opacity-85 truncate">Vibrant gradient backdrop</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-semibold px-2 py-1 rounded bg-white text-black shadow-sm">
                Explore →
              </span>
            </div>
          </div>
        );

      case 'Glassmorphism':
        return (
          <div
            className="w-full h-full rounded-xl p-4 relative overflow-hidden flex flex-col justify-between"
            style={{ background }}
          >
            {/* Ambient decorative glowing orbs */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl opacity-60 pointer-events-none"
              style={{ background: primary }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full blur-lg opacity-40 pointer-events-none"
              style={{ background: accent }}
            />
            <div
              className="relative z-10 rounded-lg p-3 backdrop-blur-md border flex flex-col justify-between h-full"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: text,
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/20">
                  Frosted Glass
                </span>
                <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold">Translucent Layer</p>
                <p className="text-[10px] opacity-75">Backdrop blur depth</p>
              </div>
              <div
                className="text-[10px] font-medium px-2 py-0.5 rounded text-center"
                style={{ background: primary, color: '#fff' }}
              >
                Action
              </div>
            </div>
          </div>
        );

      case 'Neumorphism':
        return (
          <div
            className="w-full h-full rounded-xl p-4 flex flex-col justify-between"
            style={{ background: '#e0e5ec', color: '#2d3748' }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-bold px-2 py-1 rounded-md"
                style={{
                  boxShadow: 'inset 2px 2px 5px #b8b9be, inset -2px -2px 5px #ffffff',
                }}
              >
                Neumorph
              </span>
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  boxShadow: '2px 2px 4px #b8b9be, -2px -2px 4px #ffffff',
                  background: primary,
                }}
              />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Tactile Surface</p>
              <p className="text-[10px] text-gray-600">Extruded dual shadows</p>
            </div>
            <div
              className="text-[10px] font-bold py-1.5 px-3 rounded-lg text-center"
              style={{
                boxShadow: '4px 4px 8px #b8b9be, -4px -4px 8px #ffffff',
                color: primary,
              }}
            >
              Press Me
            </div>
          </div>
        );

      case 'Brutalist':
        return (
          <div
            className="w-full h-full rounded-none p-3 border-2 border-black flex flex-col justify-between"
            style={{
              background: '#FEF08A',
              color: '#000000',
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest border border-black bg-white px-1.5 py-0.5">
                BRUTAL
              </span>
              <span className="font-mono text-xs font-black">#01</span>
            </div>
            <div>
              <p className="text-xs font-black uppercase leading-tight">RAW AESTHETIC</p>
              <p className="text-[10px] font-mono font-bold">HIGH CONTRAST</p>
            </div>
            <div
              className="text-[10px] font-black uppercase py-1 text-center border-2 border-black"
              style={{ background: primary, color: '#FFFFFF', boxShadow: '2px 2px 0px #000' }}
            >
              EXECUTE
            </div>
          </div>
        );

      case 'Dark-Tech':
        return (
          <div
            className="w-full h-full rounded-xl p-3.5 flex flex-col justify-between border"
            style={{
              background: '#090D16',
              borderColor: '#1E293B',
              color: '#F8FAFC',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded border"
                style={{
                  color: accent,
                  borderColor: `${accent}40`,
                  background: `${accent}15`,
                }}
              >
                SYS.ONLINE
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold" style={{ color: '#F8FAFC' }}>
                &gt; cyber_terminal
              </p>
              <p className="text-[10px] font-mono text-slate-400">neon_grid_ready</p>
            </div>
            <div
              className="text-[10px] font-mono font-semibold py-1 rounded text-center border"
              style={{
                background: `${primary}20`,
                borderColor: primary,
                color: '#60A5FA',
              }}
            >
              deploy_app()
            </div>
          </div>
        );

      case 'Corporate':
        return (
          <div
            className="w-full h-full rounded-lg p-3.5 flex flex-col justify-between border shadow-sm"
            style={{ background: surface, borderColor: `${secondary}40`, color: text }}
          >
            <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: `${secondary}30` }}>
              <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                Enterprise
              </span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                Active
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold">Reliable Platform</p>
              <p className="text-[10px] opacity-75">Structured, formal grid</p>
            </div>
            <div
              className="text-[10px] font-medium py-1 px-2 rounded text-center"
              style={{ background: primary, color: '#fff' }}
            >
              View Report
            </div>
          </div>
        );

      case 'Playful':
        return (
          <div
            className="w-full h-full rounded-2xl p-3.5 flex flex-col justify-between border-2"
            style={{
              background: '#FFFBEB',
              borderColor: '#FDE68A',
              color: '#1F2937',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-200 text-amber-900">
                Friendly ✨
              </span>
              <span className="text-sm">🎈</span>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-950">Playful & Warm</p>
              <p className="text-[10px] text-amber-800">Rounded joyful curves</p>
            </div>
            <div
              className="text-[10px] font-bold py-1 px-3 rounded-full text-center shadow-md"
              style={{ background: primary, color: '#fff' }}
            >
              Get Started!
            </div>
          </div>
        );

      case 'Retro':
        return (
          <div
            className="w-full h-full rounded-md p-3.5 flex flex-col justify-between border-2"
            style={{
              background: '#FDF6E2',
              borderColor: '#B58900',
              color: '#586E75',
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-serif italic text-xs font-bold text-amber-900">
                Vintage No. 84
              </span>
              <span className="text-[10px] font-mono text-amber-800">EST. 1994</span>
            </div>
            <div>
              <p className="font-serif text-xs font-bold text-amber-950">Classic Edition</p>
              <p className="text-[10px] italic text-amber-800">Editorial warmth</p>
            </div>
            <div
              className="text-[10px] font-serif font-bold py-0.5 px-2 rounded border border-amber-900 text-center"
              style={{ background: '#EEE8D5', color: '#657B83' }}
            >
              Inspect Journal
            </div>
          </div>
        );

      case 'Material':
        return (
          <div
            className="w-full h-full rounded-xl p-3.5 flex flex-col justify-between"
            style={{
              background: surface,
              color: text,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: `${primary}15`, color: primary }}
              >
                Material 3
              </span>
              <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            </div>
            <div>
              <p className="text-xs font-semibold">Elevated Paper</p>
              <p className="text-[10px] opacity-70">Tactile ripple & shadows</p>
            </div>
            <div
              className="text-[10px] font-medium py-1 px-3 rounded-full text-center shadow"
              style={{ background: primary, color: '#fff' }}
            >
              Continue
            </div>
          </div>
        );

      case 'Flat':
        return (
          <div
            className="w-full h-full rounded-none p-3.5 flex flex-col justify-between"
            style={{ background: primary, color: '#FFFFFF' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-1.5 py-0.5">
                FLAT 2.0
              </span>
              <span className="w-2 h-2 bg-white" />
            </div>
            <div>
              <p className="text-xs font-bold">Pure Solids</p>
              <p className="text-[10px] opacity-80">Zero gradients, zero shadows</p>
            </div>
            <div className="text-[10px] font-bold py-1 px-2 text-center bg-white text-black">
              SELECT
            </div>
          </div>
        );

      case 'Minimal':
      default:
        return (
          <div
            className="w-full h-full rounded-xl p-3.5 flex flex-col justify-between border"
            style={{
              background: surface,
              borderColor: `${secondary}30`,
              color: text,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                style={{ borderColor: `${secondary}40`, color: text }}
              >
                Minimal
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: primary }} />
            </div>
            <div>
              <p className="text-xs font-semibold">Clean Focus</p>
              <p className="text-[10px] opacity-65">Airy whitespace & typography</p>
            </div>
            <div
              className="text-[10px] font-medium py-1 px-2 rounded-lg text-center border"
              style={{
                background: 'transparent',
                borderColor: primary,
                color: primary,
              }}
            >
              Action →
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full overflow-hidden transition-all duration-300 ${
        compact ? 'h-24' : 'h-48'
      }`}
    >
      {renderStyleContent()}
    </div>
  );
}

