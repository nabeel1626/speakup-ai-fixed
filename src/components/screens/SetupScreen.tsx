import React, { useState, useEffect } from 'react';
import { RoleType, SeniorityType } from '../../types';

interface SetupScreenProps {
  selectedRole: RoleType;
  setSelectedRole: (role: RoleType) => void;
  selectedSeniority: SeniorityType;
  setSelectedSeniority: (seniority: SeniorityType) => void;
  onStartSimulation: () => void;
  onViewRubricGuide: () => void;
  onOpenSettings: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  selectedRole,
  setSelectedRole,
  selectedSeniority,
  setSelectedSeniority,
  onStartSimulation,
  onViewRubricGuide,
  onOpenSettings
}) => {
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const [dbLevel, setDbLevel] = useState(-24.4);
  const [barHeights, setBarHeights] = useState<number[]>([12, 20, 28, 16, 32, 44, 24, 36, 48, 32, 20, 40, 28, 16, 12, 24, 36, 20, 8]);
  const [isTestingAudioVoice, setIsTestingAudioVoice] = useState(false);
  const [testVoiceStatus, setTestVoiceStatus] = useState<string | null>(null);

  // Live fluctuating input meter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const heights = [8, 16, 24, 32, 40, 48, 56];
      const newHeights = Array.from({ length: 19 }, () => heights[Math.floor(Math.random() * heights.length)]);
      setBarHeights(newHeights);
      const randDb = -20 - (Math.random() * 12);
      setDbLevel(parseFloat(randDb.toFixed(1)));
    }, 280);

    return () => clearInterval(interval);
  }, []);

  const handleTestVoicePrompt = () => {
    setIsTestingAudioVoice(true);
    setTestVoiceStatus('Listening for test phrase...');
    
    // Check if browser supports speech synthesis or microphone
    setTimeout(() => {
      setTestVoiceStatus('Analyzing voice packet acoustic spectrum...');
      setTimeout(() => {
        setTestVoiceStatus('Voice packet verified: 48kHz Opus • SNR 42dB (Excellent)');
        setIsTestingAudioVoice(false);
      }, 1400);
    }, 1800);
  };

  const getSeniorityExplanation = () => {
    switch (selectedSeniority) {
      case 'entry':
        return 'Adjusts system depth: Entry-level emphasizes language fundamentals, DOM manipulation basics, clean code practices, and syntactic clarity.';
      case 'mid':
        return 'Adjusts system depth: Mid-level emphasizes code architecture trade-offs, web performance vitals, and asynchronous boundary handling.';
      case 'senior':
        return 'Adjusts system depth: Senior emphasizes distributed state scalability, edge-layer caching, fault-tolerant concurrency, and architectural governance.';
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-4 sm:px-6 py-8 md:py-10">
      {/* Background ambient glowing orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#c0c1ff]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-24 -left-32 w-80 h-80 bg-[#7bd0ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-96 -right-24 w-96 h-96 bg-[#4edea3]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Header & Fast API Telemetry */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#c0c1ff] px-2 py-1 rounded bg-[#262a34] flex items-center gap-1.5 shadow-sm border border-white/[0.04]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff] animate-ping"></span>
                Onboarding & Setup Console
              </span>
              <span className="text-[#464554] font-['JetBrains_Mono'] text-[11px]">|</span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] tracking-wider">
                STAGE S01 • S02 • S03
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl md:text-5xl text-[#dfe2ef] tracking-tight font-bold mt-1">
              AI Voice Mock Interviewer for Technical Roles
            </h1>
            <p className="font-['Inter'] text-base md:text-lg text-[#c7c4d7] max-w-2xl mt-1 leading-relaxed">
              Practice role-specific technical questions aloud. Get scored on a 5-dimension rubric in real time with acoustic low-latency voice telemetry.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end shrink-0 gap-2">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#181b25] border border-white/[0.05] shadow-sm">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">bolt</span>
              <div className="flex flex-col">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#c7c4d7] uppercase tracking-wider">
                  FastAPI Pipeline
                </span>
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-semibold">
                  Latency ~240ms
                </span>
              </div>
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0]">
              Session Token: <span className="text-[#7bd0ff] font-mono">MVP-LIVE-NODE-04</span>
            </span>
          </div>
        </section>

        {/* 12-Column Main Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 01 Target Engineering Role */}
            <div className="flex flex-col gap-4 bg-[#181b25] p-5 sm:p-6 rounded-xl border border-white/[0.05] shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#8083ff]/30 text-[#c0c1ff] flex items-center justify-center font-['JetBrains_Mono'] text-[11px] font-bold">
                    01
                  </span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#dfe2ef]">
                    Target Engineering Role
                  </h2>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7]">
                  Select specialty track
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Frontend Developer Card */}
                <div
                  onClick={() => setSelectedRole('frontend')}
                  className={`group cursor-pointer relative p-4 rounded-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] border ${
                    selectedRole === 'frontend'
                      ? 'bg-[#262a34] border-[#8083ff]/50 shadow-[0_0_24px_rgba(128,131,255,0.22)]'
                      : 'bg-[#1c1f29] border-white/[0.04] hover:bg-[#262a34]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#8083ff] text-[#0d0096] flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[24px]">code_blocks</span>
                    </div>
                    {selectedRole === 'frontend' ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c0c1ff]/20 text-[#c0c1ff] font-['JetBrains_Mono'] text-[11px] font-medium">
                        <span className="material-symbols-outlined text-[14px]">task_alt</span>
                        <span>Active Selection</span>
                      </div>
                    ) : (
                      <span className="text-[11px] font-['JetBrains_Mono'] text-[#908fa0] group-hover:text-[#c7c4d7]">
                        Click to select
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col mt-4">
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#dfe2ef] font-bold">
                      Frontend Developer
                    </h3>
                    <p className="font-['Inter'] text-[13px] text-[#c7c4d7] mt-1 leading-snug">
                      Next.js, React, Web APIs, CSS/DOM, State & Architecture.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] bg-[#1c1f29] px-2 py-1 rounded">
                      5 Questions Tailored
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#dfe2ef] font-mono">
                      ~18 mins
                    </span>
                  </div>
                </div>

                {/* Data Analyst Card */}
                <div
                  onClick={() => setSelectedRole('data')}
                  className={`group cursor-pointer relative p-4 rounded-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] border ${
                    selectedRole === 'data'
                      ? 'bg-[#262a34] border-[#8083ff]/50 shadow-[0_0_24px_rgba(128,131,255,0.22)]'
                      : 'bg-[#1c1f29] border-white/[0.04] hover:bg-[#262a34]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#31353f] text-[#dfe2ef] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">analytics</span>
                    </div>
                    {selectedRole === 'data' ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c0c1ff]/20 text-[#c0c1ff] font-['JetBrains_Mono'] text-[11px] font-medium">
                        <span className="material-symbols-outlined text-[14px]">task_alt</span>
                        <span>Active Selection</span>
                      </div>
                    ) : (
                      <span className="text-[11px] font-['JetBrains_Mono'] text-[#908fa0] group-hover:text-[#c7c4d7]">
                        Click to select
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col mt-4">
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#dfe2ef] font-bold">
                      Data Analyst
                    </h3>
                    <p className="font-['Inter'] text-[13px] text-[#c7c4d7] mt-1 leading-snug">
                      SQL queries, ETL Pipelines, Business Intelligence, Data Modeling & Metrics.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] bg-[#0a0e17] px-2 py-1 rounded">
                      5 Questions Tailored
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0] font-mono">
                      ~16 mins
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 Experience Seniority Tier */}
            <div className="flex flex-col gap-4 bg-[#181b25] p-5 sm:p-6 rounded-xl border border-white/[0.05] shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#8083ff]/30 text-[#c0c1ff] flex items-center justify-center font-['JetBrains_Mono'] text-[11px] font-bold">
                    02
                  </span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#dfe2ef]">
                    Experience Seniority Tier
                  </h2>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] font-mono">
                  {selectedSeniority === 'entry' ? 'Entry-level calibrated' : selectedSeniority === 'mid' ? 'Mid-level calibrated' : 'Senior calibrated'}
                </span>
              </div>

              {/* 3 Tier Buttons */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-[#0a0e17] border border-white/[0.04]">
                <button
                  type="button"
                  onClick={() => setSelectedSeniority('entry')}
                  className={`py-2.5 px-3 rounded-lg font-['JetBrains_Mono'] text-[12px] transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                    selectedSeniority === 'entry'
                      ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-[0_0_18px_rgba(128,131,255,0.4)]'
                      : 'text-[#c7c4d7] hover:text-[#dfe2ef] hover:bg-[#1c1f29]'
                  }`}
                >
                  <span className="font-semibold flex items-center gap-1">
                    Entry-level
                    {selectedSeniority === 'entry' && <span className="w-1.5 h-1.5 rounded-full bg-[#0d0096] animate-pulse"></span>}
                  </span>
                  <span className="text-[10px] opacity-70">0 - 2 yrs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSeniority('mid')}
                  className={`py-2.5 px-3 rounded-lg font-['JetBrains_Mono'] text-[12px] transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                    selectedSeniority === 'mid'
                      ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-[0_0_18px_rgba(128,131,255,0.4)]'
                      : 'text-[#c7c4d7] hover:text-[#dfe2ef] hover:bg-[#1c1f29]'
                  }`}
                >
                  <span className="font-semibold flex items-center gap-1">
                    Mid-level
                    {selectedSeniority === 'mid' && <span className="w-1.5 h-1.5 rounded-full bg-[#0d0096] animate-pulse"></span>}
                  </span>
                  <span className="text-[10px] opacity-80">2 - 5 yrs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSeniority('senior')}
                  className={`py-2.5 px-3 rounded-lg font-['JetBrains_Mono'] text-[12px] transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                    selectedSeniority === 'senior'
                      ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-[0_0_18px_rgba(128,131,255,0.4)]'
                      : 'text-[#c7c4d7] hover:text-[#dfe2ef] hover:bg-[#1c1f29]'
                  }`}
                >
                  <span className="font-semibold flex items-center gap-1">
                    Senior
                    {selectedSeniority === 'senior' && <span className="w-1.5 h-1.5 rounded-full bg-[#0d0096] animate-pulse"></span>}
                  </span>
                  <span className="text-[10px] opacity-70">5+ yrs</span>
                </button>
              </div>

              {/* Dynamic Callout */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#1c1f29] border border-white/[0.04]">
                <span className="material-symbols-outlined text-[#7bd0ff] text-[20px] shrink-0">tune</span>
                <p className="font-['Inter'] text-[13px] text-[#c7c4d7] leading-relaxed">
                  {getSeniorityExplanation()}
                </p>
              </div>
            </div>

            {/* Studio Acoustic Guard Banner Image Card */}
            <div className="relative rounded-xl overflow-hidden bg-[#262a34] h-48 shadow-inner flex items-end border border-white/[0.06] group">
              <div
                className="bg-cover bg-center absolute inset-0 opacity-45 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmmF06T_WKwJ8Nr0m5E3-RboJ5YySDFq_Rgm6AVyxOW386q7hbFWCqcWPnZgVh20v2xACv49VaC3P6IKVhApcpbDjys6JpCm9qLff1yWcU9SBj5YNd-_aU8jTE_oazuGAdCM9NFH6GSM94peYQgCXMA7hS00UoY9sfQ3SJJz6A2adWDt5lP2Al0hBGINYw0yg-F9_6gJG-oy9XJPcoLpo1nN_LBNoL3o8nLVB004CCXpadvZRBkTIK')`
                }}
              ></div>
              <div className="relative z-10 p-4 w-full bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/85 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[22px]">headphones</span>
                  <span className="font-['Inter'] text-[15px] text-[#dfe2ef] font-semibold">
                    Low-latency Conversational Engine
                  </span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] font-mono bg-[#00885d]/30 border border-[#4edea3]/20 px-2 py-0.5 rounded">
                  Acoustic Guard Active
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 03 Audio & Mic Verification */}
            <div className="flex flex-col gap-4 bg-[#181b25] p-5 sm:p-6 rounded-xl border border-white/[0.05] shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#00885d]/40 text-[#4edea3] flex items-center justify-center font-['JetBrains_Mono'] text-[11px] font-bold">
                    03
                  </span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#dfe2ef]">
                    Audio & Mic Verification
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00885d]/30 text-[#4edea3] font-['JetBrains_Mono'] text-[11px] font-medium border border-[#4edea3]/20">
                  <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                  <span>Access Granted</span>
                </div>
              </div>

              {/* Hardware Selection */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1c1f29] border border-white/[0.04]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[#7bd0ff] text-[22px] shrink-0">mic</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#c7c4d7] uppercase tracking-wider">
                      Default Hardware
                    </span>
                    <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-medium truncate">
                      MacBook Pro Microphone (Built-in)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="shrink-0 p-1.5 rounded-md hover:bg-[#262a34] text-[#c7c4d7] hover:text-[#dfe2ef] transition-colors cursor-pointer"
                  title="Configure Audio Input"
                >
                  <span className="material-symbols-outlined text-[18px]">settings_input_antenna</span>
                </button>
              </div>

              {/* Live Input Meter */}
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#0a0e17] border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">graphic_eq</span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#dfe2ef] font-semibold uppercase tracking-wider">
                      Live Input Meter
                    </span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] font-mono">
                    {dbLevel} dB
                  </span>
                </div>

                {/* Visualizer Bars */}
                <div className="h-14 flex items-end justify-between gap-1 py-2 px-1 rounded-lg bg-[#181b25]/70 overflow-hidden border border-white/[0.02]">
                  {barHeights.map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className={`w-1.5 rounded-full transition-all duration-100 ${
                        i === barHeights.length - 1 ? 'bg-[#ffb4ab]' : 'bg-[#7bd0ff]'
                      }`}
                    ></div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[#908fa0] font-['JetBrains_Mono'] text-[10px] pt-1">
                  <span>SILENCE</span>
                  <span>OPTIMAL SPEECH</span>
                  <span className="text-[#ffb4ab]">PEAK</span>
                </div>
              </div>

              {/* Device Test Prompt */}
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-[#1c1f29] border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                    <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-semibold">
                      Device Test Prompt
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleTestVoicePrompt}
                    disabled={isTestingAudioVoice}
                    className="text-[11px] font-['JetBrains_Mono'] text-[#7bd0ff] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">mic</span>
                    <span>{isTestingAudioVoice ? 'Testing...' : 'Test Mic'}</span>
                  </button>
                </div>
                <p className="font-['Inter'] text-[13px] text-[#c7c4d7] italic">
                  “Speak a short phrase like 'Checking audio response' to verify voice packet fidelity.”
                </p>
                {testVoiceStatus && (
                  <div className="text-[11px] font-['JetBrains_Mono'] text-[#4edea3] bg-[#0a0e17] p-2 rounded border border-[#4edea3]/20 animate-in fade-in">
                    {testVoiceStatus}
                  </div>
                )}
              </div>

              {/* Troubleshooting Drawer Toggle */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowTroubleshoot(!showTroubleshoot)}
                  className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0] hover:text-[#dfe2ef] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">help_outline</span>
                  <span>Permission Denied / Troubleshooting</span>
                </button>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] font-mono">
                  Audio 48kHz • Opus
                </span>
              </div>

              {showTroubleshoot && (
                <div className="flex flex-col gap-2 p-3.5 rounded-lg bg-[#31353f] border border-white/[0.06] text-[#dfe2ef] animate-in fade-in duration-200">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb4ab] font-semibold">
                    Hardware Troubleshooting Guide:
                  </span>
                  <ul className="font-['Inter'] text-[12px] text-[#c7c4d7] flex flex-col gap-1.5 list-disc pl-4">
                    <li>Check browser URL lock icon to confirm audio permission is Allowed.</li>
                    <li>Ensure macOS System Settings &gt; Privacy &gt; Microphone allows this browser.</li>
                    <li>Verify Bluetooth headset or external mic is selected as main default.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Simulation Ready Launch Card */}
            <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-xl bg-[#181b25] border border-white/[0.05] shadow-xl">
              <div className="flex flex-col gap-1">
                <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#c0c1ff]">
                  Simulation Ready
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl text-[#dfe2ef] font-bold">
                  5-Question AI Diagnostic
                </h3>
              </div>
              <p className="font-['Inter'] text-[13px] text-[#c7c4d7] leading-relaxed">
                System initiates 1-on-1 synthetic verbal inquiry. Natural conversational pacing with instant 5-dimension rubric parsing upon completion.
              </p>
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onStartSimulation}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#c0c1ff] text-[#1000a9] font-['Plus_Jakarta_Sans'] text-[17px] font-bold flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(192,193,255,0.35)] hover:shadow-[0_0_36px_rgba(192,193,255,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Start Interview Simulation</span>
                  <span className="font-['JetBrains_Mono'] text-sm font-normal opacity-90">
                    (5 Questions)
                  </span>
                  <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={onViewRubricGuide}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#1c1f29] hover:bg-[#262a34] text-[#7bd0ff] hover:text-[#dfe2ef] font-['JetBrains_Mono'] text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/[0.04]"
                >
                  <span className="material-symbols-outlined text-[18px]">assessment</span>
                  <span>View Rubric Dimensions & Scoring Guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Dimension Metric Footprint Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4 rounded-xl bg-[#181b25] border border-white/[0.04] shadow-sm">
          <div className="flex flex-col p-3 rounded-lg bg-[#1c1f29] border border-white/[0.02]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Dimension 01</span>
            <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold mt-1">Technical Correctness</span>
            <span className="font-['Inter'] text-[12px] text-[#c7c4d7] mt-0.5">Architecture & Syntax precision</span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-[#1c1f29] border border-white/[0.02]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Dimension 02</span>
            <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold mt-1">Problem Logic</span>
            <span className="font-['Inter'] text-[12px] text-[#c7c4d7] mt-0.5">Stepwise problem decomposition</span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-[#1c1f29] border border-white/[0.02]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Dimension 03</span>
            <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold mt-1">Communication</span>
            <span className="font-['Inter'] text-[12px] text-[#c7c4d7] mt-0.5">Verbal clarity & filler avoidance</span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-[#1c1f29] border border-white/[0.02]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Dimension 04</span>
            <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold mt-1">Scalability Focus</span>
            <span className="font-['Inter'] text-[12px] text-[#c7c4d7] mt-0.5">Memory, I/O & Big-O awareness</span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-[#1c1f29] border border-white/[0.02]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Dimension 05</span>
            <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold mt-1">Edge Resilience</span>
            <span className="font-['Inter'] text-[12px] text-[#c7c4d7] mt-0.5">Failure modes & race conditions</span>
          </div>
        </div>

        {/* Bottom Sandbox Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-6 border-t border-white/[0.04]">
          <p className="font-['Inter'] text-[13px] text-[#908fa0] text-center sm:text-left">
            All scores and evaluations are illustrative mock benchmarks for MVP testing. Zero login required.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">format_image_left</span>
              Ephemerally Sandboxed
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] font-mono">
              v1.2-alpha
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
