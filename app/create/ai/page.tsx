'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Layers,
  Smartphone,
  Globe,
  Monitor,
  Plus,
  X,
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import Button from '@/components/ui/Button';
import { usePRDStore, useToastStore } from '@/store';
import { NARA_MODELS, AIInterviewData } from '@/lib/nara-client';

function AIInterviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createProject = usePRDStore((s) => s.createProject);
  const showToast = useToastStore((s) => s.showToast);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Step 1: App Identity & Pitch
  const [appName, setAppName] = useState('');
  const [oneLinePitch, setOneLinePitch] = useState('');
  const [inspiration, setInspiration] = useState('');

  // Step 2: Target Audience & Personas
  const [targetAudience, setTargetAudience] = useState('');
  const [primaryPersonaNeeds, setPrimaryPersonaNeeds] = useState('');
  const [userRoles, setUserRoles] = useState<string[]>(['End User / Consumer', 'Administrator']);
  const [newRoleInput, setNewRoleInput] = useState('');

  // Step 3: Core User Journeys & Key Features
  const [coreFlows, setCoreFlows] = useState<string[]>([
    'User registers / logs in and completes onboarding',
    'User accesses main dashboard to perform primary task',
    'User receives real-time feedback and exports/shares results',
  ]);
  const [newFlowInput, setNewFlowInput] = useState('');
  const [keyFeatures, setKeyFeatures] = useState<string[]>([
    'User Authentication (OAuth / JWT)',
    'Real-time Dashboard & Activity Feed',
    'Notifications & Alerts',
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Step 4: Platform & Tech Stack Preference
  const [platform, setPlatform] = useState('Website');
  const [customPlatform, setCustomPlatform] = useState('');
  const [techPreference, setTechPreference] = useState<'recommended' | 'custom'>('recommended');
  const [frontendTech, setFrontendTech] = useState('Next.js (React)');
  const [backendTech, setBackendTech] = useState('Node.js (Serverless / Express)');
  const [databaseTech, setDatabaseTech] = useState('PostgreSQL (Supabase / Prisma)');

  // Step 5: Integrations & Monetization
  const [integrations, setIntegrations] = useState<string[]>([
    'Stripe (Payments / Subscriptions)',
    'JWT Authentication',
  ]);
  const [newIntegrationInput, setNewIntegrationInput] = useState('');
  const [monetization, setMonetization] = useState('Subscription (SaaS)');
  const [specialRules, setSpecialRules] = useState('');

  // Step 6: Design & Aesthetic
  const [designAesthetic, setDesignAesthetic] = useState('Minimal');
  const [primaryColor, setPrimaryColor] = useState('#f97316');
  const [fontPreference, setFontPreference] = useState('Poppins');

  // Prefill from URL query
  useEffect(() => {
    const ideaParam = searchParams.get('idea');
    if (ideaParam) {
      setOneLinePitch(ideaParam);
      const words = ideaParam.trim().split(' ');
      if (words.length > 0 && words.length <= 4) {
        setAppName(ideaParam);
      } else {
        setAppName(words.slice(0, 3).join(' '));
      }
    }
  }, [searchParams]);

  // Tag helper functions
  const addTag = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const trimmed = input.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
      setInput('');
    }
  };

  const removeTag = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setList(list.filter((i) => i !== item));
  };

  // Step validation
  const canProceed = () => {
    if (currentStep === 1) {
      return (appName.trim().length > 0 || oneLinePitch.trim().length > 0) && (oneLinePitch.trim().length >= 10);
    }
    if (currentStep === 2) {
      return targetAudience.trim().length > 0;
    }
    if (currentStep === 3) {
      return coreFlows.length > 0 && keyFeatures.length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) {
      if (currentStep === 1) {
        showToast('Please describe your app name and one-line problem (min 10 chars).', 'error');
      } else if (currentStep === 2) {
        showToast('Please specify your target audience or primary user.', 'error');
      } else if (currentStep === 3) {
        showToast('Please add at least 1 core workflow and 1 key feature.', 'error');
      }
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleFinalSubmit = () => {
    const interviewData: AIInterviewData = {
      appName: appName.trim() || 'AI Generated Project',
      oneLinePitch: oneLinePitch.trim(),
      targetAudience: targetAudience.trim() || 'General Users',
      primaryPersonaNeeds: primaryPersonaNeeds.trim() || 'High velocity and intuitive interaction',
      coreUserFlows: coreFlows,
      keyFeatures,
      platform,
      customPlatform: platform === 'Custom' ? customPlatform : undefined,
      frontendPreference: techPreference === 'recommended' ? 'AI Recommended Frontend' : frontendTech,
      backendPreference: techPreference === 'recommended' ? 'AI Recommended Backend' : backendTech,
      databasePreference: techPreference === 'recommended' ? 'AI Recommended Database' : databaseTech,
      thirdPartyIntegrations: integrations,
      monetizationModel: monetization,
      designAesthetic,
      colorMood: primaryColor,
      primaryColor,
      specialRules: specialRules.trim() || undefined,
    };

    const project = createProject({
      idea: `${appName ? appName + ': ' : ''}${oneLinePitch}\n\nTarget Audience: ${targetAudience}\nKey Features: ${keyFeatures.join(', ')}`,
      productType: 'AI Generated Application',
      category: 'ai',
      platform,
      customPlatform: platform === 'Custom' ? customPlatform : undefined,
      stack: {
        frontend: frontendTech,
        backend: backendTech,
        database: databaseTech,
      },
      designStyle: designAesthetic,
      theme: 'both',
      colors: {
        primary: primaryColor,
        secondary: '#64748B',
        accent: '#00D4AA',
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F8FAFC',
      },
      font: fontPreference,
      guidingNotes: specialRules.trim() || undefined,
      generationMode: 'ai',
      aiModelUsed: NARA_MODELS[0],
    });

    // Store the interview payload in sessionStorage for the generating page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`ai_interview_${project.id}`, JSON.stringify(interviewData));
    }

    showToast('Launching Nara AI Generation Pipeline...', 'info');
    router.push('/create/generating');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      {/* Top Banner */}
      <div className="mb-8 rounded-2xl border border-[#f97316]/30 bg-[#fff1e8]/50 p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#f97316] text-white shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#171717]">Nara AI Architect Mode</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#16803c] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
              </span>
            </div>
            <p className="text-xs text-[#6b6b67] mt-0.5">
              Step-by-step interview powering live Nara Router models ({NARA_MODELS[0]}).
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-[#f97316] hidden sm:block">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#deded8] h-1.5 rounded-full mb-8 overflow-hidden">
        <div
          className="bg-[#f97316] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* STEP 1: APP IDENTITY & ELEVATOR PITCH */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">Step 1 of 6</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
              What are you building?
            </h1>
            <p className="text-sm text-[#6b6b67] mt-1">
              Let&apos;s start with the name and the core problem your product solves.
            </p>
          </div>

          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-4 shadow-xs">
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                Product / App Name <span className="text-[#f97316]">*</span>
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. QuizArena, ExpenseFlow, TurboInventory"
                className="input w-full text-sm font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                One-Line Pitch & Problem Solved <span className="text-[#f97316]">*</span>
              </label>
              <textarea
                value={oneLinePitch}
                onChange={(e) => setOneLinePitch(e.target.value)}
                placeholder="What does your app do? Who does it help? (e.g. A fast-paced multiplayer trivia quiz game where players compete in 15-second timed rounds to win streak points and rank on global leaderboards.)"
                className="textarea h-28 w-full text-sm leading-relaxed"
              />
              <span className="text-[11px] text-[#8c8c85]">Minimum 10 characters</span>
            </div>

            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                Product Inspiration / Benchmark (Optional)
              </label>
              <input
                type="text"
                value={inspiration}
                onChange={(e) => setInspiration(e.target.value)}
                placeholder="e.g. Like Kahoot meets Trivia Crack, or Stripe Dashboard meets Linear"
                className="input w-full text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: TARGET AUDIENCE & PERSONAS */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">Step 2 of 6</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
              Who is this product for?
            </h1>
            <p className="text-sm text-[#6b6b67] mt-1">
              Defining user personas allows the AI to craft specific jobs-to-be-done and acceptance criteria.
            </p>
          </div>

          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-4 shadow-xs">
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                Target Audience & Market Demographic <span className="text-[#f97316]">*</span>
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Casual mobile gamers, university students, high-velocity SaaS teams, small business owners"
                className="input w-full text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                Primary User Pain Point & Needs
              </label>
              <textarea
                value={primaryPersonaNeeds}
                onChange={(e) => setPrimaryPersonaNeeds(e.target.value)}
                placeholder="What is their primary frustration with current solutions? What must this product accomplish for them?"
                className="textarea h-24 w-full text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1.5">
                Key User Roles
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {userRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f1f1ee] text-[#171717] flex items-center gap-1.5"
                  >
                    {role}
                    <button
                      type="button"
                      onClick={() => removeTag(userRoles, setUserRoles, role)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRoleInput}
                  onChange={(e) => setNewRoleInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(userRoles, setUserRoles, newRoleInput, setNewRoleInput))}
                  placeholder="+ Add role (e.g. Player, Host, Moderator, Admin)..."
                  className="input text-xs flex-1"
                />
                <Button size="sm" variant="secondary" onClick={() => addTag(userRoles, setUserRoles, newRoleInput, setNewRoleInput)}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: CORE USER FLOWS & KEY FEATURES */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">Step 3 of 6</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
              Core user flows & key features
            </h1>
            <p className="text-sm text-[#6b6b67] mt-1">
              Specify what users actually do inside the app so the AI can generate accurate Gherkin stories.
            </p>
          </div>

          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-5 shadow-xs">
            {/* Core Flows */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                Primary User Flows & Journeys <span className="text-[#f97316]">*</span>
              </label>
              <div className="space-y-2 mb-2">
                {coreFlows.map((flow, i) => (
                  <div
                    key={flow}
                    className="p-2.5 rounded-lg border border-[#deded8] bg-[#fafaf9] flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-[#171717]">
                      {i + 1}. {flow}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTag(coreFlows, setCoreFlows, flow)}
                      className="text-[#8c8c85] hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFlowInput}
                  onChange={(e) => setNewFlowInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(coreFlows, setCoreFlows, newFlowInput, setNewFlowInput))}
                  placeholder="+ Add key journey (e.g. Player joins room via 6-digit pin)..."
                  className="input text-xs flex-1"
                />
                <Button size="sm" variant="secondary" onClick={() => addTag(coreFlows, setCoreFlows, newFlowInput, setNewFlowInput)}>
                  Add
                </Button>
              </div>
            </div>

            {/* Key Features */}
            <div className="pt-3 border-t border-[#deded8]">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1.5">
                Must-Have Features & Mechanics <span className="text-[#f97316]">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {keyFeatures.map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#e6f4ea] text-[#16803c] flex items-center gap-1.5"
                  >
                    <Check size={12} />
                    {feat}
                    <button
                      type="button"
                      onClick={() => removeTag(keyFeatures, setKeyFeatures, feat)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(keyFeatures, setKeyFeatures, newFeatureInput, setNewFeatureInput))}
                  placeholder="+ Add feature (e.g. 15s Countdown Timer, Real-time Leaderboard, Streak Points)..."
                  className="input text-xs flex-1"
                />
                <Button size="sm" variant="secondary" onClick={() => addTag(keyFeatures, setKeyFeatures, newFeatureInput, setNewFeatureInput)}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: PLATFORM & TECH STACK */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">Step 4 of 6</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
              Target platform & technology
            </h1>
            <p className="text-sm text-[#6b6b67] mt-1">
              Choose your deployment platform or let the AI recommend the optimal architecture.
            </p>
          </div>

          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-5 shadow-xs">
            {/* Platform Selection */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Primary Platform
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'Website', label: 'Web App / SaaS', icon: <Globe size={18} /> },
                  { id: 'Mobile', label: 'iOS & Android', icon: <Smartphone size={18} /> },
                  { id: 'Desktop', label: 'Desktop App', icon: <Monitor size={18} /> },
                  { id: 'Custom', label: 'Custom / Other', icon: <Layers size={18} /> },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      platform === p.id
                        ? 'border-[#f97316] bg-[#fff1e8]/50 ring-2 ring-[#f97316]/20'
                        : 'border-[#deded8] bg-white hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 text-[#f97316]">
                      {p.icon}
                      {platform === p.id && <Check size={14} />}
                    </div>
                    <span className="text-xs font-bold text-[#171717]">{p.label}</span>
                  </button>
                ))}
              </div>
              {platform === 'Custom' && (
                <input
                  type="text"
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  placeholder="Specify platform (e.g. Browser Extension, Telegram Mini App)..."
                  className="input text-xs w-full mt-2"
                />
              )}
            </div>

            {/* Tech Stack Preference */}
            <div className="pt-3 border-t border-[#deded8] space-y-3">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block">
                Tech Stack Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTechPreference('recommended')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    techPreference === 'recommended'
                      ? 'border-[#f97316] bg-[#fff1e8]/40 ring-2 ring-[#f97316]/20'
                      : 'border-[#deded8] bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#171717] block">✨ Let AI Recommend</span>
                  <span className="text-[11px] text-[#6b6b67] mt-0.5 block">
                    AI selects optimal stack for scale and velocity
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setTechPreference('custom')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    techPreference === 'custom'
                      ? 'border-[#f97316] bg-[#fff1e8]/40 ring-2 ring-[#f97316]/20'
                      : 'border-[#deded8] bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#171717] block">🛠️ Specify Frameworks</span>
                  <span className="text-[11px] text-[#6b6b67] mt-0.5 block">
                    Customize frontend, backend, and DB
                  </span>
                </button>
              </div>

              {techPreference === 'custom' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6b6b67] block mb-1">
                      Frontend Framework
                    </label>
                    <input
                      type="text"
                      value={frontendTech}
                      onChange={(e) => setFrontendTech(e.target.value)}
                      placeholder="e.g. Next.js, React Native, Flutter, Vue 3"
                      className="input text-xs w-full"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6b6b67] block mb-1">
                      Backend Engine
                    </label>
                    <input
                      type="text"
                      value={backendTech}
                      onChange={(e) => setBackendTech(e.target.value)}
                      placeholder="e.g. Node.js, Python FastAPI, Go, Firebase"
                      className="input text-xs w-full"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6b6b67] block mb-1">
                      Database
                    </label>
                    <input
                      type="text"
                      value={databaseTech}
                      onChange={(e) => setDatabaseTech(e.target.value)}
                      placeholder="e.g. PostgreSQL, MongoDB, Firestore, Redis"
                      className="input text-xs w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: INTEGRATIONS & MONETIZATION */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">Step 5 of 6</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
              Integrations, auth & monetization
            </h1>
            <p className="text-sm text-[#6b6b67] mt-1">
              Identify third-party services and revenue models to incorporate into the architecture.
            </p>
          </div>

          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-4 shadow-xs">
            {/* Third Party Integrations */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1.5">
                Third-Party APIs & Services
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {integrations.map((integ) => (
                  <span
                    key={integ}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f1f1ee] text-[#171717] flex items-center gap-1.5"
                  >
                    {integ}
                    <button
                      type="button"
                      onClick={() => removeTag(integrations, setIntegrations, integ)}
                      className="hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIntegrationInput}
                  onChange={(e) => setNewIntegrationInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(integrations, setIntegrations, newIntegrationInput, setNewIntegrationInput))}
                  placeholder="+ Add service (e.g. Stripe, OpenAI, Resend, Supabase Auth, WebSockets)..."
                  className="input text-xs flex-1"
                />
                <Button size="sm" variant="secondary" onClick={() => addTag(integrations, setIntegrations, newIntegrationInput, setNewIntegrationInput)}>
                  Add
                </Button>
              </div>
            </div>

            {/* Monetization Model */}
            <div className="pt-3 border-t border-[#deded8]">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Monetization & Business Model
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Subscription (SaaS)',
                  'One-Time Purchase',
                  'Freemium / In-App Purchases',
                  'Free & Open Source',
                ].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonetization(m)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      monetization === m
                        ? 'border-[#f97316] bg-[#fff1e8] text-[#c2410c]'
                        : 'border-[#deded8] bg-white text-[#6b6b67]'
                    }`}
                  >
                    {monetization === m && <Check size={12} className="inline mr-1" />}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Rules */}
            <div className="pt-3 border-t border-[#deded8]">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                Special Architectural Constraints / Rules (Optional)
              </label>
              <input
                type="text"
                value={specialRules}
                onChange={(e) => setSpecialRules(e.target.value)}
                placeholder="e.g. GDPR compliant, sub-100ms latency on answer validation, offline sync"
                className="input text-xs w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: VISUAL & UX IDENTITY */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">Step 6 of 6</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
              Visual identity & design system
            </h1>
            <p className="text-sm text-[#6b6b67] mt-1">
              Configure the visual aesthetic and brand colors for the generated design tokens.
            </p>
          </div>

          <div className="rounded-2xl border border-[#deded8] bg-white p-5 space-y-5 shadow-xs">
            {/* Design Style */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Visual Aesthetic
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'Minimal',
                  'Glassmorphism',
                  'Dark-Tech',
                  'Brutalist',
                  'Neumorphism',
                  'Playful',
                  'Corporate',
                  'Gradient',
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setDesignAesthetic(st)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      designAesthetic === st
                        ? 'border-[#f97316] bg-[#fff1e8] text-[#c2410c]'
                        : 'border-[#deded8] bg-white text-[#171717]'
                    }`}
                  >
                    {designAesthetic === st && <Check size={12} className="inline mr-1 text-[#f97316]" />}
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Brand Color & Font */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#deded8]">
              <div>
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                  Primary Brand Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-[#deded8] p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="input text-xs font-mono uppercase w-32"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
                  Typography Font
                </label>
                <select
                  value={fontPreference}
                  onChange={(e) => setFontPreference(e.target.value)}
                  className="select text-xs w-full"
                >
                  {['Poppins', 'Inter', 'Space Grotesk', 'DM Sans', 'Plus Jakarta Sans', 'Outfit', 'Sora', 'Manrope'].map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Review Summary Card */}
            <div className="rounded-xl border border-[#f97316]/30 bg-[#fff1e8]/30 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#171717]">
                <Sparkles size={16} className="text-[#f97316]" /> Ready to Generate with Nara AI Models:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#6b6b67] pt-1">
                <p>• App: <strong className="text-[#171717]">{appName || 'Untitled App'}</strong></p>
                <p>• Platform: <strong className="text-[#171717]">{platform}</strong></p>
                <p>• Primary Persona: <strong className="text-[#171717]">{targetAudience}</strong></p>
                <p>• Aesthetic: <strong className="text-[#171717]">{designAesthetic} ({primaryColor})</strong></p>
                <p className="sm:col-span-2">
                  • Failover Sequence: <span className="font-mono text-[#171717]">{NARA_MODELS.join(' → ')} (4 models)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="mt-8 pt-4 border-t border-[#deded8] flex items-center justify-between">
        <Button variant="tertiary" size="md" leftIcon={<ArrowLeft size={16} />} onClick={handlePrev}>
          {currentStep === 1 ? 'Back to Home' : 'Previous'}
        </Button>

        <Button size="md" rightIcon={<ArrowRight size={16} />} onClick={handleNext} disabled={!canProceed()}>
          {currentStep < totalSteps ? 'Next Step' : 'Generate Premium AI PRD'}
        </Button>
      </div>
    </div>
  );
}

export default function AIInterviewPage() {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#f97316] border-t-transparent" />
          </div>
        }
      >
        <AIInterviewContent />
      </Suspense>
    </AppShell>
  );
}

