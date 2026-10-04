import React, { useState } from 'react';
import { QuestionData, RoleType, SeniorityType } from '../../types';

interface ReportScreenProps {
  questions: QuestionData[];
  selectedRole: RoleType;
  selectedSeniority: SeniorityType;
  onRetakeInterview: () => void;
  onPracticeAnotherRole: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  questions,
  selectedRole,
  selectedSeniority,
  onRetakeInterview,
  onPracticeAnotherRole
}) => {
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({
    0: false,
    1: true, // Q2 open by default
    2: false,
    3: false,
    4: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showOfflineToast, setShowOfflineToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [greenhouseSubmitted, setGreenhouseSubmitted] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      
      // Generate clean downloadable JSON report
      const reportPayload = {
        sessionId: 'SPK-9041A',
        candidateProfile: 'Anonymous Candidate',
        role: selectedRole === 'frontend' ? 'Frontend Developer' : 'Data Analyst',
        seniority: selectedSeniority,
        weightedScore: 84,
        percentile: 'Top 12%',
        speechPacing: '134 wpm',
        fillerRate: '1.8%',
        recommendation: 'Strong Hire Recommendation',
        vectorRubric: [
          { vector: 'Technical Accuracy', score: '88%', status: 'Excellent' },
          { vector: 'Problem-Solving Structure', score: '82%', status: 'Strong' },
          { vector: 'Communication Clarity', score: '90%', status: 'Distinguished' },
          { vector: 'Depth & Edge Cases', score: '74%', status: 'Growth Opportunity' },
          { vector: 'Role-Specific Delivery', score: '86%', status: 'Strong' }
        ],
        questionDiagnostics: questions.map((q, idx) => ({
          questionNumber: idx + 1,
          topic: q.topic,
          score: q.scores.overall,
          summary: q.diagnostics.summary,
          latency: q.diagnostics.latency,
          duration: q.diagnostics.duration
        }))
      };

      const blob = new Blob([JSON.stringify(reportPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SpeakUp-AI-Executive-Report-SPK-9041A.json`;
      a.click();
      URL.revokeObjectURL(url);

      setTimeout(() => setExportSuccess(false), 2500);
    }, 1200);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSimulateOffline = () => {
    setShowOfflineToast(true);
    setTimeout(() => {
      setShowOfflineToast(false);
    }, 4500);
  };

  const handleGreenhouseSubmit = () => {
    setGreenhouseSubmitted(true);
    setTimeout(() => setGreenhouseSubmitted(false), 3000);
  };

  const roleTitle = selectedRole === 'frontend' ? 'Frontend Developer' : 'Data Analyst';
  const seniorityLabel = selectedSeniority === 'entry' ? 'Entry-Level' : selectedSeniority === 'mid' ? 'Mid-Level' : 'Senior';

  return (
    <div className="relative w-full overflow-hidden px-4 sm:px-6 py-6 md:py-8">
      {/* Background ambient orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8083ff]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#00a6e0]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
        {/* Top Header & Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#00885d]/30 text-[#4edea3] font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider flex items-center gap-1.5 border border-[#4edea3]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
                Assessment Complete
              </span>
              <span className="text-[#908fa0] text-[11px] font-['JetBrains_Mono']">
                SESSION_ID #SPK-9041A
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl text-[#dfe2ef] tracking-tight font-bold">
              Executive Diagnostic Report
            </h1>
            <p className="font-['Inter'] text-[14px] sm:text-[15px] text-[#c7c4d7]">
              Calibrated algorithmic synthesis across 5 core competency vectors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] font-['JetBrains_Mono'] text-[12px] transition-all flex items-center gap-2 shadow-md border border-white/[0.04] cursor-pointer"
              id="btnExport"
            >
              <span className={`material-symbols-outlined text-[18px] ${isExporting ? 'animate-spin' : ''}`}>
                {exportSuccess ? 'check' : isExporting ? 'refresh' : 'download'}
              </span>
              <span>
                {exportSuccess
                  ? 'Downloaded JSON!'
                  : isExporting
                  ? 'Exporting Report...'
                  : 'Export Report (PDF / JSON)'}
              </span>
            </button>

            <button
              type="button"
              onClick={onPracticeAnotherRole}
              className="px-4 py-2.5 rounded-xl bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] font-['JetBrains_Mono'] text-[12px] transition-all flex items-center gap-2 shadow-md border border-white/[0.04] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">shuffle</span>
              <span>Practice Another Role</span>
            </button>

            <button
              type="button"
              onClick={onRetakeInterview}
              className="px-5 py-2.5 rounded-xl bg-[#c0c1ff] text-[#1000a9] font-['JetBrains_Mono'] text-[12px] transition-all hover:bg-[#8083ff] shadow-[0_0_24px_rgba(192,193,255,0.3)] flex items-center gap-2 font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Retake Interview</span>
            </button>
          </div>
        </div>

        {/* 12-Column Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Candidate Profile & Score Dial */}
            <div className="bg-[#181b25] rounded-2xl p-6 border border-white/[0.05] shadow-xl flex flex-col justify-between relative overflow-hidden h-full">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] uppercase tracking-widest">
                    Candidate Profile
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#dfe2ef] font-bold mt-1">
                    Anonymous Candidate
                  </h3>
                  <p className="font-['Inter'] text-[13px] text-[#c7c4d7]">
                    {seniorityLabel} {roleTitle}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#31353f] text-[#c7c4d7] font-['JetBrains_Mono'] text-[11px]">
                  5 of 5 Answered
                </span>
              </div>

              {/* Big Circular SVG Gauge */}
              <div className="my-8 flex flex-col items-center justify-center relative">
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      className="text-[#31353f]"
                      cx="80"
                      cy="80"
                      fill="transparent"
                      r="68"
                      stroke="currentColor"
                      strokeWidth="10"
                    />
                    <circle
                      className="text-[#c0c1ff]"
                      cx="80"
                      cy="80"
                      fill="transparent"
                      r="68"
                      stroke="currentColor"
                      strokeDasharray="427.26"
                      strokeDashoffset="68.36"
                      strokeLinecap="round"
                      strokeWidth="10"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex items-baseline">
                      <span className="font-['Plus_Jakarta_Sans'] text-[54px] font-bold text-[#dfe2ef] leading-none">
                        84
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[14px] text-[#c7c4d7]">
                        /100
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#c0c1ff] tracking-widest uppercase mt-1">
                      Weighted Score
                    </span>
                  </div>
                </div>

                <div className="mt-4 px-4 py-1.5 rounded-full bg-[#00885d]/20 text-[#4edea3] font-['JetBrains_Mono'] text-[12px] flex items-center gap-1.5 shadow-sm border border-[#4edea3]/20">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Strong Hire Recommendation</span>
                </div>
              </div>

              {/* Mini Stats 3-Col Bar */}
              <div className="grid grid-cols-3 gap-2 pt-4 bg-[#1c1f29]/50 p-3 rounded-xl border border-white/[0.03]">
                <div className="flex flex-col items-center text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Percentile</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ef] mt-0.5">
                    Top 12%
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Pacing Avg</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ef] mt-0.5">
                    134 wpm
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">Fillers</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#4edea3] mt-0.5">
                    1.8%
                  </span>
                </div>
              </div>
            </div>

            {/* Voice Synthesis Stream Imagery Card */}
            <div className="bg-[#181b25] rounded-2xl p-5 border border-white/[0.05] shadow-xl relative overflow-hidden">
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 border border-white/[0.04]">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcZMBn61UUqnHVngPFh3Q0jFT30O_YURXvpL5ITuDaEcV7xvh1m1-FTgE5o4dIg_lZb5_0yiZuAzoJi6SQxyQXZHkBUZ8G996UxUxbZ_YXNL5rqZvWn_m7b0s3TCg2ENuBkS24TSZSOkJVJ_L0bvpcqkMjL3jgG3a84DHy_cct38W9xF0hn6-7BIl4RfUOAf0muS_ms5vYepaNZ_rM-4ePNQG_YqEzJwb1AzUPKf0k3kXOdMBoPazc"
                  alt="High-tech studio microphone in acoustic room"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181b25] via-[#181b25]/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="p-1 rounded-md bg-[#31353f] text-[#7bd0ff] flex items-center">
                    <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef] font-semibold tracking-wide uppercase">
                    Voice Synthesis Stream
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[#c7c4d7] font-['JetBrains_Mono'] text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#4edea3]">mic</span>
                  Whisper Core v3
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#c0c1ff]">psychology</span>
                  Gemini 1.5 Pro
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* 5-Vector Evaluation Rubric */}
            <div className="bg-[#181b25] rounded-2xl p-6 border border-white/[0.05] shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#c0c1ff] uppercase tracking-widest font-semibold">
                    Dimension Breakdown
                  </span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-xl text-[#dfe2ef] font-bold">
                    5-Vector Evaluation Rubric
                  </h2>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7]">
                  Min pass benchmark: 70%
                </span>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {/* Vector 1 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">terminal</span>
                      Technical Accuracy
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#00885d]/30 text-[#4edea3] font-['JetBrains_Mono'] text-[11px] font-semibold">
                        Excellent
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-bold">
                        88%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#31353f] overflow-hidden">
                    <div className="h-full bg-[#4edea3] rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                {/* Vector 2 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">account_tree</span>
                      Problem-Solving Structure
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#00a6e0]/20 text-[#7bd0ff] font-['JetBrains_Mono'] text-[11px] font-semibold">
                        Strong
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-bold">
                        82%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#31353f] overflow-hidden">
                    <div className="h-full bg-[#7bd0ff] rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>

                {/* Vector 3 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#4edea3]">record_voice_over</span>
                      Communication Clarity
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#8083ff]/20 text-[#c0c1ff] font-['JetBrains_Mono'] text-[11px] font-semibold">
                        Distinguished
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-bold">
                        90%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#31353f] overflow-hidden">
                    <div className="h-full bg-[#c0c1ff] rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                {/* Vector 4 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#908fa0]">radar</span>
                      Depth &amp; Edge Cases
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#31353f] text-[#c7c4d7] font-['JetBrains_Mono'] text-[11px] font-semibold">
                        Growth Opportunity
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-bold">
                        74%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#31353f] overflow-hidden">
                    <div className="h-full bg-[#8083ff] rounded-full" style={{ width: '74%' }}></div>
                  </div>
                </div>

                {/* Vector 5 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">devices</span>
                      Role-Specific Delivery
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#00a6e0]/20 text-[#7bd0ff] font-['JetBrains_Mono'] text-[11px] font-semibold">
                        Strong
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-bold">
                        86%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#31353f] overflow-hidden">
                    <div className="h-full bg-[#00a6e0] rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Targeted Growth Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Key Strengths */}
              <div className="bg-[#181b25] rounded-2xl p-5 border border-white/[0.05] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#4edea3] mb-2">
                    <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider font-semibold">
                      Key Strengths
                    </span>
                  </div>
                  <p className="font-['Inter'] text-[14px] text-[#dfe2ef] leading-relaxed">
                    Superb verbal clarity and natural explanations of React rendering internals; concise answers without rambling. Exceptional synthesis of CSS Grid paint performance and layout reflow nuances.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center gap-2 text-[#c7c4d7] font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#4edea3]">check_circle</span>
                  <span>High architectural intuition in component isolation</span>
                </div>
              </div>

              {/* Targeted Growth Areas */}
              <div className="bg-[#181b25] rounded-2xl p-5 border border-white/[0.05] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#7bd0ff] mb-2">
                    <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider font-semibold">
                      Targeted Growth Areas
                    </span>
                  </div>
                  <p className="font-['Inter'] text-[14px] text-[#dfe2ef] leading-relaxed">
                    Deep dive further into serverless cold starts, database query caching, and production fallback boundaries. Consider discussing stale-while-revalidate hydration patterns more proactively.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center gap-2 text-[#c7c4d7] font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">trending_up</span>
                  <span>Recommended drill: Next.js Edge Middleware latency</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Granular Audit: Question-by-Question Diagnostics */}
        <div className="bg-[#181b25] rounded-2xl p-6 border border-white/[0.05] shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] uppercase tracking-widest font-semibold">
                Granular Audit
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl text-[#dfe2ef] font-bold">
                Question-by-Question Diagnostics
              </h2>
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7]">
              5 Assessment Questions Analyzed
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1" id="accordionContainer">
            {questions.map((q, idx) => {
              const isOpen = !!openAccordions[idx];
              const scoreNum = q.scores.overall;

              return (
                <div
                  key={q.id}
                  className="rounded-xl bg-[#1c1f29] border border-white/[0.04] overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-[#262a34] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[#c0c1ff] px-2 py-0.5 rounded bg-[#31353f] font-semibold">
                        Q{idx + 1}
                      </span>
                      <span className="font-['Inter'] text-[14px] text-[#dfe2ef] font-medium truncate">
                        {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded font-semibold ${
                          scoreNum >= 4.0
                            ? 'text-[#4edea3] bg-[#00885d]/20 border border-[#4edea3]/20'
                            : 'text-[#7bd0ff] bg-[#00a6e0]/20 border border-[#7bd0ff]/20'
                        }`}
                      >
                        Score: {scoreNum.toFixed(1)} / 5.0
                      </span>
                      <span
                        className={`material-symbols-outlined text-[#c7c4d7] transform transition-transform duration-200 text-[20px] ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-[#c7c4d7] font-['Inter'] text-[13px] flex flex-col gap-2.5 border-t border-white/[0.04] pt-3 animate-in fade-in">
                      <div className="p-3 bg-[#31353f]/60 rounded-lg text-[#dfe2ef] leading-relaxed">
                        <strong className="text-[#dfe2ef] font-semibold">Candidate Response Summary:</strong>{' '}
                        {q.diagnostics.summary}
                      </div>
                      <div className="flex items-center justify-between text-[#c7c4d7] font-['JetBrains_Mono'] text-[11px] px-1 flex-wrap gap-2">
                        <span>Latency: {q.diagnostics.latency}</span>
                        <span>Response duration: {q.diagnostics.duration}</span>
                        <span className="text-[#4edea3]">{q.diagnostics.transcriptSync}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Local History & Offline Fallback (7 cols + 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Local History: Attempt Comparison */}
          <div className="lg:col-span-7 bg-[#181b25] rounded-2xl p-6 border border-white/[0.05] shadow-xl flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#c0c1ff] uppercase tracking-widest font-semibold">
                    Progress Tracker
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#dfe2ef] font-bold">
                    Local History: Attempt Comparison
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Local attempt runs archived in sandboxed IndexedDB storage.')}
                  className="px-2.5 py-1 rounded-lg bg-[#1c1f29] text-[#7bd0ff] hover:text-[#dfe2ef] font-['JetBrains_Mono'] text-[11px] transition-colors flex items-center gap-1 border border-white/[0.04] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">history</span>
                  <span>View All (2 Runs)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-xl bg-[#1c1f29] border border-white/[0.04] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0]">
                      Attempt 1 (Yesterday)
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#c7c4d7]">42m ago</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#dfe2ef]">
                      76
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0]">/ 100</span>
                  </div>
                  <div className="w-full bg-[#31353f] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#908fa0] h-full" style={{ width: '76%' }}></div>
                  </div>
                  <span className="font-['Inter'] text-[12px] text-[#c7c4d7] mt-0.5">
                    Growth: Edge Cases (61%)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#262a34]/60 border border-[#8083ff]/30 flex flex-col gap-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] font-semibold">
                      Attempt 2 (Current)
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#00885d]/30 text-[#4edea3] font-['JetBrains_Mono'] text-[10px] font-bold border border-[#4edea3]/20">
                      +8 pts
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#dfe2ef]">
                      84
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0]">/ 100</span>
                  </div>
                  <div className="w-full bg-[#31353f] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#c0c1ff] h-full" style={{ width: '84%' }}></div>
                  </div>
                  <span className="font-['Inter'] text-[12px] text-[#4edea3] mt-0.5 font-medium">
                    Velocity: +13% Technical Depth
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[#908fa0] font-['JetBrains_Mono'] text-[10px]">
              <span>Stored in browser indexed session store</span>
              <span className="text-[#c7c4d7]">Zero-auth isolated telemetry</span>
            </div>
          </div>

          {/* Resilience Engine: Offline Graceful Fallback */}
          <div className="lg:col-span-5 bg-[#181b25] rounded-2xl p-6 border border-white/[0.05] shadow-xl flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#4edea3]">
                <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
                <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest font-semibold">
                  Resilience Engine
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#dfe2ef] font-bold">
                Offline Graceful Fallback
              </h3>
              <p className="font-['Inter'] text-[13px] text-[#c7c4d7] leading-relaxed">
                Local offline caching active. If FastAPI backend (<code className="text-[#7bd0ff] font-['JetBrains_Mono'] text-[12px]">localhost:8000</code>) or external Gemini endpoints become unreachable, SpeakUp AI automatically switches to deterministic fallback questions and offline heuristic scoring models.
              </p>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#0a0e17]/80 border border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#dfe2ef]">
                  Local Heuristics Engine Ready
                </span>
              </div>
              <button
                type="button"
                onClick={handleSimulateOffline}
                className="px-2.5 py-1 rounded bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] font-['JetBrains_Mono'] text-[11px] transition-colors border border-white/[0.04] cursor-pointer"
                id="btnTestOffline"
              >
                Simulate Offline
              </button>
            </div>
          </div>
        </div>

        {/* Ready for Candidate Submission Banner */}
        <div className="rounded-2xl bg-[#181b25] p-5 border border-white/[0.05] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#262a34] border border-white/[0.04] flex items-center justify-center text-[#c0c1ff] shrink-0">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <div>
              <h4 className="font-['Inter'] text-[15px] font-semibold text-[#dfe2ef]">
                Ready for Candidate Submission
              </h4>
              <p className="font-['Inter'] text-[13px] text-[#c7c4d7]">
                Export to verified badge portfolio or synchronize with recruiter portal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#31353f] hover:bg-[#353943] text-[#dfe2ef] font-['JetBrains_Mono'] text-[12px] transition-colors border border-white/[0.04] cursor-pointer"
            >
              {copiedLink ? 'Link Copied!' : 'Copy Shareable Link'}
            </button>
            <button
              type="button"
              onClick={handleGreenhouseSubmit}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#8083ff] text-[#0d0096] font-['JetBrains_Mono'] text-[12px] font-bold transition-all hover:opacity-95 shadow-[0_0_16px_rgba(128,131,255,0.35)] cursor-pointer"
            >
              {greenhouseSubmitted ? 'Synchronized!' : 'Send to Greenhouse / Lever'}
            </button>
          </div>
        </div>
      </div>

      {/* Offline Toast Notification */}
      {showOfflineToast && (
        <div
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#31353f] text-[#dfe2ef] shadow-2xl flex items-start gap-3 max-w-sm border border-white/[0.08] animate-in fade-in slide-in-from-bottom-4 duration-300"
          id="offlineToast"
        >
          <span className="material-symbols-outlined text-[#7bd0ff] text-[24px] shrink-0 mt-0.5">
            wifi_off
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="font-['Inter'] text-[14px] font-semibold text-[#dfe2ef]">
              Simulation Notice
            </span>
            <p className="font-['Inter'] text-[12px] text-[#c7c4d7] leading-snug">
              Deterministic fallback scoring initialized successfully without server dependency.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowOfflineToast(false)}
            className="text-[#c7c4d7] hover:text-white ml-auto cursor-pointer"
            id="btnCloseToast"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
