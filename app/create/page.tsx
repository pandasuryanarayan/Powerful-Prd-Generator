'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Globe,
  Smartphone,
  Monitor,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Type,
  Gamepad2,
  Wallet,
  ShoppingBag,
  Briefcase,
  Users,
  GraduationCap,
  Plus,
  X,
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import Button from '@/components/ui/Button';
import StepIndicator from '@/components/builder/StepIndicator';
import StylePreviewCard from '@/components/builder/StylePreviewCard';
import ColorPalettePicker from '@/components/builder/ColorPalettePicker';
import {
  PLATFORMS,
  RECOMMENDED_STACKS,
  TECH_OPTIONS,
  DESIGN_STYLES,
  DEFAULT_COLORS,
  FONT_OPTIONS,
  PRODUCT_CATEGORIES,
  CategoryBlueprint,
} from '@/lib/builder-data';
import { usePRDStore, useToastStore, ColorTokens, TechStackConfig } from '@/store';

function BuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const createProject = usePRDStore((s) => s.createProject);
  const showToast = useToastStore((s) => s.showToast);

  const [step, setStep] = useState(1);

  // Builder Configuration State
  const [platform, setPlatform] = useState<'website' | 'mobile' | 'desktop' | 'custom'>('website');
  const [customPlatform, setCustomPlatform] = useState('');

  const [stack, setStack] = useState<TechStackConfig>({
    frontend: 'Next.js',
    backend: 'Node.js',
    database: 'PostgreSQL',
    customFrontend: '',
    customBackend: '',
    customDatabase: '',
  });

  const [designStyle, setDesignStyle] = useState('Minimal');
  const [customDesignStyle, setCustomDesignStyle] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'both'>('both');

  const [colors, setColors] = useState<ColorTokens>({ ...DEFAULT_COLORS });
  const [gradient, setGradient] = useState<{ name?: string; start: string; end: string } | null>(null);
  const [paletteConfirmed, setPaletteConfirmed] = useState(false);

  const [font, setFont] = useState('Poppins');
  const [customFont, setCustomFont] = useState('');

  // Structured Domain & Product Blueprint State
  const [selectedCategory, setSelectedCategory] = useState<string>('gaming');
  const [targetEntities, setTargetEntities] = useState<string[]>([
    'Quizzes',
    'Questions',
    'Question Options',
    'Game Sessions',
    'Player Answers',
    'Leaderboards',
  ]);
  const [keyFeatures, setKeyFeatures] = useState<string[]>([
    '15s Countdown Timer',
    'Streak Multipliers',
    'Real-time Leaderboard',
    'Audio & Haptic Effects',
  ]);
  const [userRoles, setUserRoles] = useState<string[]>(['Player', 'Quizmaster / Host']);
  const [newEntityInput, setNewEntityInput] = useState('');
  const [newFeatureInput, setNewFeatureInput] = useState('');

  const [description, setDescription] = useState(
    'A fast-paced trivia quiz game where players answer timed 15-second questions across multiple topics. Players earn streak multipliers for consecutive correct answers and compete on daily global leaderboards.'
  );
  const [projectType, setProjectType] = useState('Game & Quiz');
  const [guidingNotes, setGuidingNotes] = useState('');
  const [generating, setGenerating] = useState(false);

  // Handle URL query parameters if present
  useEffect(() => {
    const ideaParam = searchParams.get('idea');
    if (ideaParam) {
      setDescription(ideaParam);
      // Heuristic auto-select category from ideaParam
      const lower = ideaParam.toLowerCase();
      if (lower.includes('quiz') || lower.includes('game') || lower.includes('trivia')) {
        handleCategorySelect(PRODUCT_CATEGORIES[0]); // gaming
      } else if (lower.includes('expense') || lower.includes('bill') || lower.includes('split')) {
        handleCategorySelect(PRODUCT_CATEGORIES[1]); // fintech
      } else if (lower.includes('shop') || lower.includes('store') || lower.includes('cart')) {
        handleCategorySelect(PRODUCT_CATEGORIES[2]); // ecommerce
      }
    }
  }, [searchParams]);

  const handleCategorySelect = (cat: CategoryBlueprint) => {
    setSelectedCategory(cat.id);
    setProjectType(cat.name);
    setTargetEntities([...cat.defaultEntities]);
    setKeyFeatures([...cat.suggestedFeatures.slice(0, 4)]);
    setUserRoles([...cat.suggestedRoles.slice(0, 2)]);
    if (!description || description.length < 20 || description.startsWith('A fast-paced') || description.startsWith('An expense') || description.startsWith('A modern') || description.startsWith('A lightweight')) {
      setDescription(cat.defaultIdeaTemplate);
    }
    showToast(`Loaded ${cat.name} blueprint & data models`, 'info');
  };

  const handleToggleEntity = (entity: string) => {
    if (targetEntities.includes(entity)) {
      setTargetEntities(targetEntities.filter((e) => e !== entity));
    } else {
      setTargetEntities([...targetEntities, entity]);
    }
  };

  const handleAddCustomEntity = () => {
    const trimmed = newEntityInput.trim();
    if (trimmed && !targetEntities.includes(trimmed)) {
      setTargetEntities([...targetEntities, trimmed]);
      setNewEntityInput('');
    }
  };

  const handleToggleFeature = (feat: string) => {
    if (keyFeatures.includes(feat)) {
      setKeyFeatures(keyFeatures.filter((f) => f !== feat));
    } else {
      setKeyFeatures([...keyFeatures, feat]);
    }
  };

  const handleAddCustomFeature = () => {
    const trimmed = newFeatureInput.trim();
    if (trimmed && !keyFeatures.includes(trimmed)) {
      setKeyFeatures([...keyFeatures, trimmed]);
      setNewFeatureInput('');
    }
  };

  const handleToggleRole = (role: string) => {
    if (userRoles.includes(role)) {
      setUserRoles(userRoles.filter((r) => r !== role));
    } else {
      setUserRoles([...userRoles, role]);
    }
  };

  // Update default recommended stack whenever platform changes
  const applyRecommendedStack = (platKey: string) => {
    const rec = RECOMMENDED_STACKS[platKey];
    if (rec) {
      setStack({
        frontend: rec.frontend,
        backend: rec.backend,
        database: rec.database || '',
        customFrontend: '',
        customBackend: '',
        customDatabase: '',
      });
      showToast(`Applied ${rec.label} stack`, 'info');
    }
  };

  const handlePlatformChange = (pId: 'website' | 'mobile' | 'desktop' | 'custom') => {
    setPlatform(pId);
    applyRecommendedStack(pId);
  };

  // Step Validation logic
  const isStepValid = () => {
    if (step === 1) {
      return platform !== 'custom' || customPlatform.trim().length > 0;
    }
    if (step === 2) {
      const activeFrontend = stack.frontend === 'Other' ? stack.customFrontend : stack.frontend;
      return Boolean(activeFrontend && activeFrontend.trim().length > 0);
    }
    if (step === 3) {
      return designStyle !== 'Custom' || customDesignStyle.trim().length > 0;
    }
    if (step === 4) {
      return true;
    }
    if (step === 5) {
      return font !== 'Other' || customFont.trim().length > 0;
    }
    if (step === 6) {
      return description.trim().length >= 15 && targetEntities.length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepValid()) {
      if (step === 1 && platform === 'custom') {
        showToast('Please specify your custom platform name.', 'error');
      } else if (step === 2) {
        showToast('Please select or specify a frontend framework.', 'error');
      } else if (step === 6) {
        showToast('Please select at least 1 core entity and enter a description.', 'error');
      }
      return;
    }
    if (step < 6) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleFinalSubmit = async () => {
    if (description.trim().length < 15) {
      showToast('Please describe your product idea in at least 15 characters.', 'error');
      return;
    }

    setGenerating(true);

    const project = createProject({
      idea: description.trim(),
      productType: projectType,
      category: selectedCategory,
      targetEntities: targetEntities,
      keyFeatures: keyFeatures,
      userRoles: userRoles,
      platform,
      customPlatform: platform === 'custom' ? customPlatform : undefined,
      stack: {
        frontend: stack.frontend === 'Other' ? stack.customFrontend || 'Custom' : stack.frontend,
        backend: stack.backend === 'Other' ? stack.customBackend || 'Custom' : stack.backend,
        database: stack.database === 'Other' ? stack.customDatabase || 'Custom' : stack.database,
      },
      designStyle: designStyle === 'Custom' ? customDesignStyle || 'Custom' : designStyle,
      theme,
      colors,
      gradient,
      font: font === 'Other' ? customFont || 'Custom' : font,
      guidingNotes: guidingNotes.trim() || undefined,
    });

    await new Promise((r) => setTimeout(r, 150));
    router.push('/create/generating');
  };

  const activeTech = TECH_OPTIONS[platform] || TECH_OPTIONS.website;
  const currentRecommended = RECOMMENDED_STACKS[platform];
  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory) || PRODUCT_CATEGORIES[0];

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 size={20} />;
      case 'Wallet':
        return <Wallet size={20} />;
      case 'ShoppingBag':
        return <ShoppingBag size={20} />;
      case 'Briefcase':
        return <Briefcase size={20} />;
      case 'Sparkles':
        return <Sparkles size={20} />;
      case 'Users':
        return <Users size={20} />;
      case 'GraduationCap':
        return <GraduationCap size={20} />;
      default:
        return <Layers size={20} />;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      {/* Header & Step Indicator */}
      <StepIndicator currentStep={step} onStepClick={(s) => s < step && setStep(s)} />

      {/* STEP 1: PLATFORM */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-[28px] font-bold text-[#171717]">What are you building?</h1>
            <p className="mt-1 text-sm text-[#6b6b67]">
              Select the primary target platform for your product specification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLATFORMS.map((p) => {
              const selected = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePlatformChange(p.id)}
                  className={`p-5 rounded-2xl border text-left transition-all relative ${
                    selected
                      ? 'border-[#f97316] bg-[#fff1e8]/40 ring-2 ring-[#f97316]/20 shadow-sm'
                      : 'border-[#deded8] bg-white hover:border-[#f97316]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-xl ${
                        selected ? 'bg-[#f97316] text-white' : 'bg-[#f1f1ee] text-[#171717]'
                      }`}
                    >
                      {p.id === 'website' && <Globe size={22} />}
                      {p.id === 'mobile' && <Smartphone size={22} />}
                      {p.id === 'desktop' && <Monitor size={22} />}
                      {p.id === 'custom' && <Layers size={22} />}
                    </div>
                    {selected && (
                      <span className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center text-xs">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-[#171717]">{p.label}</h3>
                  <p className="mt-1 text-xs text-[#6b6b67] leading-relaxed">{p.description}</p>
                </button>
              );
            })}
          </div>

          {platform === 'custom' && (
            <div className="rounded-xl border border-[#deded8] bg-white p-4 space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase tracking-wider block">
                Specify Custom Platform
              </label>
              <input
                type="text"
                value={customPlatform}
                onChange={(e) => setCustomPlatform(e.target.value)}
                placeholder="e.g. Chrome Extension, VS Code Extension, Raspberry Pi IoT Hub"
                className="input w-full text-sm"
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 2: TECH STACK */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-[28px] font-bold text-[#171717]">Select your tech stack</h1>
            <p className="mt-1 text-sm text-[#6b6b67]">
              Configure the frontend, backend, and database for your {platform.toUpperCase()} project.
            </p>
          </div>

          {/* Recommended Stack Banner */}
          {currentRecommended && (
            <div className="rounded-2xl border border-[#f97316]/30 bg-[#fff1e8]/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#f97316] text-white px-2 py-0.5 rounded">
                    Recommended
                  </span>
                  <h3 className="text-sm font-bold text-[#171717]">{currentRecommended.label}</h3>
                </div>
                <p className="mt-1 text-xs text-[#6b6b67]">{currentRecommended.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => applyRecommendedStack(platform)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f97316] text-xs font-semibold text-white hover:bg-[#ea580c] transition-colors shrink-0"
              >
                Use this stack →
              </button>
            </div>
          )}

          {/* Frontend Framework */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-[#171717] uppercase tracking-wider block">
              Frontend Framework
            </label>
            <div className="flex flex-wrap gap-2">
              {activeTech.frontend.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setStack((s: TechStackConfig) => ({ ...s, frontend: f }))}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                    stack.frontend === f
                      ? 'border-[#f97316] bg-[#fff1e8] text-[#c2410c] shadow-xs'
                      : 'border-[#deded8] bg-white text-[#171717] hover:border-[#f97316]/50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {stack.frontend === 'Other' && (
              <input
                type="text"
                value={stack.customFrontend}
                onChange={(e) => setStack((s: TechStackConfig) => ({ ...s, customFrontend: e.target.value }))}
                placeholder="Enter custom frontend framework..."
                className="input w-full max-w-sm text-xs mt-2"
              />
            )}
          </div>

          {/* Backend Engine */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-[#171717] uppercase tracking-wider block">
              Backend & Services
            </label>
            <div className="flex flex-wrap gap-2">
              {activeTech.backend.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setStack((s: TechStackConfig) => ({ ...s, backend: b }))}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                    stack.backend === b
                      ? 'border-[#f97316] bg-[#fff1e8] text-[#c2410c] shadow-xs'
                      : 'border-[#deded8] bg-white text-[#171717] hover:border-[#f97316]/50'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
            {stack.backend === 'Other' && (
              <input
                type="text"
                value={stack.customBackend}
                onChange={(e) => setStack((s: TechStackConfig) => ({ ...s, customBackend: e.target.value }))}
                placeholder="Enter custom backend technology..."
                className="input w-full max-w-sm text-xs mt-2"
              />
            )}
          </div>

          {/* Database */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-[#171717] uppercase tracking-wider block">
              Database & Data Storage
            </label>
            <div className="flex flex-wrap gap-2">
              {activeTech.database.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setStack((s: TechStackConfig) => ({ ...s, database: d }))}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                    stack.database === d
                      ? 'border-[#f97316] bg-[#fff1e8] text-[#c2410c] shadow-xs'
                      : 'border-[#deded8] bg-white text-[#171717] hover:border-[#f97316]/50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            {stack.database === 'Other' && (
              <input
                type="text"
                value={stack.customDatabase}
                onChange={(e) => setStack((s: TechStackConfig) => ({ ...s, customDatabase: e.target.value }))}
                placeholder="Enter custom database system..."
                className="input w-full max-w-sm text-xs mt-2"
              />
            )}
          </div>
        </div>
      )}

      {/* STEP 3: VISUAL STYLE */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-[28px] font-bold text-[#171717]">Pick a visual style</h1>
            <p className="mt-1 text-sm text-[#6b6b67]">
              Choose the aesthetic design system for your UI layouts. See live preview below.
            </p>
          </div>

          {/* Live Dynamic Preview Card */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#6b6b67] uppercase tracking-wider block">
              Live Preview of Selected Style
            </span>
            <StylePreviewCard style={designStyle} colors={colors} />
          </div>

          {/* 11 Style Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DESIGN_STYLES.map((st) => {
              const selected = designStyle === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setDesignStyle(st.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selected
                      ? 'border-[#f97316] bg-[#fff1e8]/30 ring-2 ring-[#f97316]/20 shadow-xs'
                      : 'border-[#deded8] bg-white hover:border-[#f97316]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171717]">{st.label}</span>
                    {selected && <Check size={14} className="text-[#f97316]" />}
                  </div>
                  <p className="mt-1 text-[11px] text-[#6b6b67] leading-snug line-clamp-2">
                    {st.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {designStyle === 'Custom' && (
            <div className="rounded-xl border border-[#deded8] bg-white p-4 space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase tracking-wider block">
                Define Custom Design Aesthetic
              </label>
              <input
                type="text"
                value={customDesignStyle}
                onChange={(e) => setCustomDesignStyle(e.target.value)}
                placeholder="e.g. Cyberpunk Neon with glowing terminal monospace fonts"
                className="input w-full text-xs"
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 4: COLORS & THEME */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-[28px] font-bold text-[#171717]">Colors & Theme Mode</h1>
            <p className="mt-1 text-sm text-[#6b6b67]">
              Select brand palettes, gradient tokens, or fine-tune custom hex colors.
            </p>
          </div>

          {/* Theme Mode Selector (Light, Dark, Both) */}
          <div className="rounded-xl border border-[#deded8] bg-white p-4 space-y-2">
            <label className="text-xs font-semibold text-[#171717] uppercase tracking-wider block">
              Supported Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['light', 'dark', 'both'] as const).map((th) => (
                <button
                  key={th}
                  type="button"
                  onClick={() => setTheme(th)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold border capitalize transition-all ${
                    theme === th
                      ? 'border-[#f97316] bg-[#fff1e8] text-[#c2410c] shadow-xs'
                      : 'border-[#deded8] bg-white text-[#171717] hover:border-[#f97316]/50'
                  }`}
                >
                  {th === 'both' ? 'Both (Adaptive)' : th}
                </button>
              ))}
            </div>
          </div>

          {/* Full Color Palette Picker Component */}
          <ColorPalettePicker
            colors={colors}
            gradient={gradient}
            onColorsChange={setColors}
            onGradientChange={setGradient}
            onConfirm={() => setPaletteConfirmed(true)}
            confirmed={paletteConfirmed}
          />
        </div>
      )}

      {/* STEP 5: TYPOGRAPHY */}
      {step === 5 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-[28px] font-bold text-[#171717]">Select typography</h1>
            <p className="mt-1 text-sm text-[#6b6b67]">
              Choose from 10 popular Google Fonts with live font rendering preview.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {FONT_OPTIONS.map((f) => {
              const selected = font === f.name;
              return (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setFont(f.name)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selected
                      ? 'border-[#f97316] bg-[#fff1e8]/30 ring-2 ring-[#f97316]/20 shadow-xs'
                      : 'border-[#deded8] bg-white hover:border-[#f97316]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171717]">{f.name}</span>
                    <span className="text-[10px] text-[#6b6b67] bg-[#f1f1ee] px-2 py-0.5 rounded">
                      {f.category}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-base text-[#171717] truncate"
                    style={{ fontFamily: f.name !== 'Other' ? f.name : 'inherit' }}
                  >
                    {f.description}
                  </p>
                </button>
              );
            })}
          </div>

          {font === 'Other' && (
            <div className="rounded-xl border border-[#deded8] bg-white p-4 space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase tracking-wider block">
                Enter Custom Google Font / System Font
              </label>
              <input
                type="text"
                value={customFont}
                onChange={(e) => setCustomFont(e.target.value)}
                placeholder="e.g. Fira Code, JetBrains Mono, Playfair Display"
                className="input w-full text-xs"
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 6: PRODUCT BLUEPRINT & CORE MECHANICS (UPGRADED) */}
      {step === 6 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-[28px] font-bold text-[#171717]">Project Blueprint & Mechanics</h1>
            <p className="mt-1 text-sm text-[#6b6b67]">
              Specify the domain category, core entities, feature mechanics, and user roles for 100% precision.
            </p>
          </div>

          {/* 1. Category Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block">
              1. Domain Category <span className="text-[#f97316]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRODUCT_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#f97316] bg-[#fff1e8]/50 ring-2 ring-[#f97316]/20 shadow-xs'
                        : 'border-[#deded8] bg-white hover:border-[#f97316]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected ? 'bg-[#f97316] text-white' : 'bg-[#f1f1ee] text-[#171717]'
                        }`}
                      >
                        {renderCategoryIcon(cat.icon)}
                      </div>
                      {isSelected && <Check size={14} className="text-[#f97316]" />}
                    </div>
                    <h4 className="text-xs font-bold text-[#171717]">{cat.name}</h4>
                    <p className="text-[10px] text-[#6b6b67] line-clamp-2 mt-0.5 leading-snug">
                      {cat.tagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Core Entities (Data Models) */}
          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block">
                  2. Core Data Entities & Models <span className="text-[#f97316]">*</span>
                </label>
                <p className="text-[11px] text-[#6b6b67]">
                  These become the SQL database tables, TypeScript types, and REST API resources.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#f97316]">
                {targetEntities.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeCategory.defaultEntities.map((ent) => {
                const active = targetEntities.includes(ent);
                return (
                  <button
                    key={ent}
                    type="button"
                    onClick={() => handleToggleEntity(ent)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      active
                        ? 'border-[#f97316] bg-[#fff1e8] text-[#c2410c] font-semibold'
                        : 'border-[#deded8] bg-[#fafaf9] text-[#6b6b67] hover:border-black/20'
                    }`}
                  >
                    {active ? <Check size={12} /> : <Plus size={12} />}
                    {ent}
                  </button>
                );
              })}
              {/* Custom entities not in default */}
              {targetEntities
                .filter((e) => !activeCategory.defaultEntities.includes(e))
                .map((ent) => (
                  <span
                    key={ent}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#f97316] bg-[#fff1e8] text-[#c2410c] flex items-center gap-1.5"
                  >
                    <Check size={12} />
                    {ent}
                    <button
                      type="button"
                      onClick={() => handleToggleEntity(ent)}
                      className="hover:text-red-600 ml-1"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
            </div>

            {/* Inline Add Custom Entity */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newEntityInput}
                onChange={(e) => setNewEntityInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomEntity())}
                placeholder="+ Add custom entity (e.g. Leaderboard, Matchmaking, Voucher)..."
                className="input text-xs py-2 h-9 flex-1"
              />
              <Button size="sm" variant="secondary" onClick={handleAddCustomEntity}>
                Add
              </Button>
            </div>
          </div>

          {/* 3. Key Features Checklist */}
          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block">
                  3. Key Feature Mechanics & Capabilities
                </label>
                <p className="text-[11px] text-[#6b6b67]">
                  These become the Gherkin Given-When-Then stories and MVP scope boundaries.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#f97316]">
                {keyFeatures.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeCategory.suggestedFeatures.map((feat) => {
                const active = keyFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => handleToggleFeature(feat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      active
                        ? 'border-[#16803c] bg-[#e6f4ea] text-[#16803c] font-semibold'
                        : 'border-[#deded8] bg-[#fafaf9] text-[#6b6b67] hover:border-black/20'
                    }`}
                  >
                    {active ? <Check size={12} /> : <Plus size={12} />}
                    {feat}
                  </button>
                );
              })}
              {keyFeatures
                .filter((f) => !activeCategory.suggestedFeatures.includes(f))
                .map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#16803c] bg-[#e6f4ea] text-[#16803c] flex items-center gap-1.5"
                  >
                    <Check size={12} />
                    {feat}
                    <button
                      type="button"
                      onClick={() => handleToggleFeature(feat)}
                      className="hover:text-red-600 ml-1"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newFeatureInput}
                onChange={(e) => setNewFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomFeature())}
                placeholder="+ Add custom feature (e.g. 15s Timer, Multi-Currency, Barcode Scan)..."
                className="input text-xs py-2 h-9 flex-1"
              />
              <Button size="sm" variant="secondary" onClick={handleAddCustomFeature}>
                Add
              </Button>
            </div>
          </div>

          {/* 4. Target User Roles */}
          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-2.5">
            <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block">
              4. Target User Roles & Personas
            </label>
            <div className="flex flex-wrap gap-2">
              {activeCategory.suggestedRoles.map((role) => {
                const active = userRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleToggleRole(role)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                      active
                        ? 'border-[#2563eb] bg-[#dbeafe] text-[#1e40af] font-semibold'
                        : 'border-[#deded8] bg-white text-[#6b6b67]'
                    }`}
                  >
                    {active && <Check size={12} className="inline mr-1" />}
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Idea Description & Specific Rules */}
          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                5. Product Idea, Game Rules & Special Mechanics <span className="text-[#f97316]">*</span>
              </label>
              <span
                className={`text-xs font-mono ${
                  description.length >= 15 ? 'text-[#16803c]' : 'text-[#6b6b67]'
                }`}
              >
                {description.length} chars (min 15)
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe game mechanics, rules, winning conditions, scoring multipliers, or business logic..."
              className="textarea h-32 w-full text-sm leading-relaxed"
            />
          </div>

          {/* 6. Guiding Notes & Constraints */}
          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-2">
            <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
              6. Technical Constraints & Specific Integrations (Optional)
            </label>
            <input
              type="text"
              value={guidingNotes}
              onChange={(e) => setGuidingNotes(e.target.value)}
              placeholder="e.g. Must support offline sync, Firebase Firestore rules, Haptic feedback on Kotlin"
              className="input w-full text-xs"
            />
          </div>

          {/* Configuration Summary Card */}
          <div className="rounded-2xl border border-[#deded8] bg-[#fafaf9] p-5 text-xs text-[#6b6b67] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#171717]">
              <Sparkles size={16} className="text-[#f97316]" /> Ready to Generate 4-File PRD Package:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <p>
                • Category: <strong className="text-[#171717]">{activeCategory.name}</strong>
              </p>
              <p>
                • Platform: <strong className="text-[#171717] capitalize">{platform}</strong>
              </p>
              <p>
                • Stack: <strong className="text-[#171717]">{stack.frontend} + {stack.backend} + {stack.database}</strong>
              </p>
              <p>
                • Style: <strong className="text-[#171717]">{designStyle}</strong> ({theme})
              </p>
              <p className="sm:col-span-2">
                • Modeled Entities: <strong className="text-[#171717]">{targetEntities.join(', ')}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="mt-8 pt-4 border-t border-[#deded8] flex items-center justify-between">
        <Button
          variant="tertiary"
          size="md"
          leftIcon={<ArrowLeft size={16} />}
          onClick={handlePrev}
        >
          {step === 1 ? 'Back to Home' : 'Previous'}
        </Button>

        <Button
          size="md"
          rightIcon={<ArrowRight size={16} />}
          onClick={handleNext}
          disabled={!isStepValid() || generating}
          loading={generating}
        >
          {step < 6 ? 'Next Step' : 'Generate PRD (4-File Package)'}
        </Button>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#f97316] border-t-transparent" />
          </div>
        }
      >
        <BuilderContent />
      </Suspense>
    </AppShell>
  );
}