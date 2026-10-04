import React, { useState } from 'react';
import { QuestionData } from '../../types';

interface RubricScreenProps {
  currentQuestion: QuestionData;
  questionIndex: number;
  totalQuestions: number;
  onProceedNext: () => void;
  onGoToFinalReport: () => void;
}

export const RubricScreen: React.FC<RubricScreenProps> = ({
  currentQuestion,
  questionIndex,
  totalQuestions,
  onProceedNext,
  onGoToFinalReport
}) => {
  const [isPlayingFollowUpTts, setIsPlayingFollowUpTts] = useState(false);
  const [answeredBonus, setAnsweredBonus] = useState(false);
  const [bonusText, setBonusText] = useState('');
  const [isRecordingBonus, setIsRecordingBonus] = useState(false);

  const scores = currentQuestion.scores;
  const isLastQuestion = questionIndex >= totalQuestions - 1;

  const handlePlayFollowUp = () => {
    if (currentQuestion.followUpPrompt && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.followUpPrompt);
      utterance.onstart = () => setIsPlayingFollowUpTts(true);
      utterance.onend = () => setIsPlayingFollowUpTts(false);
      utterance.onerror = () => setIsPlayingFollowUpTts(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingFollowUpTts(true);
      setTimeout(() => setIsPlayingFollowUpTts(false), 4000);
    }
  };

  const handleExportRawTelemetry = () => {
    const data = {
      specId: currentQuestion.specId,
      topic: currentQuestion.topic,
      scores: currentQuestion.scores,
      diagnostics: currentQuestion.diagnostics,
      timestamp: new Date().toISOString(),
      evaluator: 'ISO/IEC-25010 Evaluator v3.4'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rubric-telemetry-${currentQuestion.specId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAnswerBonus = () => {
    if (!answeredBonus) {
      setIsRecordingBonus(true);
      setTimeout(() => {
        setIsRecordingBonus(false);
        setAnsweredBonus(true);
        setBonusText('“We leverage `revalidate: 60` on fetch requests or dynamic route segment config, combined with on-demand tag revalidation via revalidateTag() in webhooks to serve cached static pages while refreshing data stale-while-revalidate.”');
      }, 1500);
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-4 sm:px-6 py-6 md:py-8">
      {/* Background glow */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#c0c1ff]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-[#00a6e0]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 relative z-10">
        {/* Top Diagnostic Metric Banner */}
        <section className="w-full rounded-xl bg-[#181b25] p-5 sm:p-6 md:p-8 border border-white/[0.05] shadow-xl flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 rounded-full bg-[#262a34] font-['JetBrains_Mono'] text-[11px] text-[#c0c1ff] flex items-center gap-1.5 shadow-sm border border-white/[0.04]">
                <span className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-pulse"></span>
                QUESTION 0{questionIndex + 1} EVALUATED
              </span>
              <span className="text-[#464554] font-['JetBrains_Mono'] text-[11px]">/</span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] uppercase tracking-wider">
                Topic: {currentQuestion.topic}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] text-[#4edea3] bg-[#1c1f29] px-3.5 py-1.5 rounded-lg shadow-sm border border-[#4edea3]/20">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Real-Time Neural Inference Synthesized (412ms)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Score Summary */}
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl text-[#dfe2ef] tracking-tight font-extrabold">
                  {answeredBonus ? (scores.overall + 0.3).toFixed(1) : scores.overall.toFixed(1)}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-2xl text-[#c7c4d7] font-medium">
                  / 5.0
                </span>
                <span className="px-2.5 py-1 rounded bg-[#4edea3]/15 text-[#4edea3] font-['JetBrains_Mono'] text-[11px] uppercase font-semibold tracking-wider border border-[#4edea3]/20">
                  {scores.performanceBadge}
                  {answeredBonus && ' (+Bonus Applied)'}
                </span>
              </div>
              <p className="font-['Inter'] text-[14px] md:text-[15px] text-[#c7c4d7] max-w-2xl leading-relaxed mt-1">
                {scores.summary}
              </p>
            </div>

            {/* Circular Gauge & Radar Telemetry */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-end gap-5 bg-[#0a0e17]/60 p-4 rounded-xl border border-white/[0.04]">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-[#262a34] fill-transparent"
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-[#c0c1ff] fill-transparent transition-all duration-1000"
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (scores.weightedPct + (answeredBonus ? 6 : 0))) / 100}
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-['JetBrains_Mono'] text-[15px] font-bold text-[#dfe2ef]">
                    {answeredBonus ? (scores.weightedPct + 6.0).toFixed(1) : scores.weightedPct.toFixed(1)}%
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[9px] text-[#c7c4d7]">Weighted</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 w-full sm:w-auto font-['JetBrains_Mono'] text-[11px]">
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <span className="text-[#c7c4d7]">Confidence Index</span>
                  <span className="text-[#4edea3] font-semibold">98.4%</span>
                </div>
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <span className="text-[#c7c4d7]">Latency Delay</span>
                  <span className="text-[#7bd0ff] font-semibold">0.42s</span>
                </div>
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <span className="text-[#c7c4d7]">Percentile Rank</span>
                  <span className="text-[#c0c1ff] font-semibold">Top 12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Illustrative Notification Banner */}
          <div className="w-full bg-[#262a34] rounded-lg p-3.5 sm:p-4 flex items-start gap-3 shadow-sm border border-white/[0.04]">
            <span className="material-symbols-outlined text-[#7bd0ff] shrink-0 text-[20px] mt-0.5">
              info
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
              <span className="font-['Inter'] text-[13px] text-[#dfe2ef]">
                <strong className="font-semibold text-[#7bd0ff]">Illustrative dry-run scoring benchmark:</strong> System calibrates dynamically against 12,000+ technical interviews for Senior & Mid React ecosystem roles.
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] whitespace-nowrap">
                Session Token: #NX-88219-DEV
              </span>
            </div>
          </div>
        </section>

        {/* Section: The 5-Dimension Rubric Scorecard Grid */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#c0c1ff] uppercase tracking-widest font-semibold">
                Diagnostic Breakdown
              </span>
              <span className="text-[#464554] font-['JetBrains_Mono'] text-[11px]">•</span>
              <span className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#dfe2ef] font-semibold">
                5-Dimension Analytical Matrix
              </span>
            </div>
            <button
              type="button"
              onClick={handleExportRawTelemetry}
              className="flex items-center gap-1 font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] hover:text-[#c0c1ff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export Raw Telemetry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scores.dimensions.map((dim, idx) => {
              const isColSpan2 = idx === 4;
              const barColor =
                dim.color === 'tertiary'
                  ? 'bg-[#4edea3]'
                  : dim.color === 'primary'
                  ? 'bg-[#8083ff]'
                  : 'bg-[#7bd0ff]';

              return (
                <div
                  key={idx}
                  className={`rounded-xl bg-[#181b25] p-5 flex flex-col justify-between gap-4 border border-white/[0.05] shadow-md hover:bg-[#1c1f29] transition-all ${
                    isColSpan2 ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#31353f] text-[#7bd0ff] uppercase tracking-wider font-semibold">
                        Weight {dim.weight}%
                      </span>
                      <span
                        className={`font-['Plus_Jakarta_Sans'] text-lg font-bold ${
                          dim.isGrowthOpportunity ? 'text-[#7bd0ff]' : 'text-[#dfe2ef]'
                        }`}
                      >
                        {dim.score.toFixed(1)}
                        <span className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0] font-normal">
                          /5.0
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <h3 className="font-['Inter'] text-[15px] text-[#dfe2ef] font-semibold">
                        {dim.name}
                      </h3>
                      {dim.isGrowthOpportunity && (
                        <span
                          className="material-symbols-outlined text-[#7bd0ff] text-[16px]"
                          title="Improvement recommended"
                        >
                          priority_high
                        </span>
                      )}
                    </div>

                    {/* Progress Rail */}
                    <div className="w-full h-1.5 rounded-full bg-[#31353f] overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full transition-all duration-700`}
                        style={{ width: `${dim.percentage}%` }}
                      ></div>
                    </div>

                    <p className="font-['Inter'] text-[13px] text-[#c7c4d7] mt-1 leading-relaxed">
                      {dim.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        {dim.color === 'primary' ? 'account_tree' : 'check_circle'}
                      </span>
                      {dim.tag}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">
                      {dim.tier}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Adaptive Follow-Up Trigger Module (S09) */}
        {currentQuestion.followUpPrompt && (
          <section className="w-full rounded-xl bg-[#1c1f29] p-5 sm:p-6 md:p-8 border border-white/[0.06] shadow-xl flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[#00a6e0]/10 blur-2xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#262a34] flex items-center justify-center text-[#7bd0ff] border border-white/[0.04]">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] uppercase font-bold tracking-wider">
                    Diagnostic Feedback Trigger
                  </span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#dfe2ef] font-bold">
                    Adaptive Follow-Up Triggered (Deep Dive on Edge Cases)
                  </h2>
                </div>
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] px-2.5 py-1 rounded bg-[#7bd0ff]/10 text-[#7bd0ff] font-medium border border-[#7bd0ff]/20">
                Threshold Trigger: Edge Cases &lt; 3.8
              </span>
            </div>

            <div className="rounded-xl bg-[#0a0e17]/85 p-4 sm:p-5 border border-white/[0.05] flex flex-col gap-3 relative z-10">
              <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">campaign</span>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase font-semibold text-[#c0c1ff]">
                  Interviewer Prompt:
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#dfe2ef] font-medium leading-relaxed">
                {currentQuestion.followUpPrompt}
              </p>

              {/* Audio Simulation Visualization */}
              <div className="w-full bg-[#181b25]/70 rounded-lg p-3 sm:p-4 flex items-center justify-between gap-4 border border-white/[0.03]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePlayFollowUp}
                    className="w-9 h-9 rounded-full bg-[#c0c1ff] flex items-center justify-center text-[#1000a9] hover:bg-[#8083ff] transition-transform active:scale-95 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPlayingFollowUpTts ? 'stop' : 'volume_up'}
                    </span>
                  </button>
                  <div className="flex flex-col">
                    <span className="font-['Inter'] text-[13px] text-[#dfe2ef] font-medium">
                      Interviewer Audio Synthesized
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">
                      {currentQuestion.followUpAudioDuration || '00:04'} / {currentQuestion.followUpAudioDuration || '00:04'} • 24kHz Opus
                    </span>
                  </div>
                </div>

                {/* Animated Wave Bars */}
                <div className="hidden sm:flex items-center gap-1 h-6">
                  {[2, 4, 5, 3, 6, 4, 2, 5, 3, 1].map((h, idx) => (
                    <span
                      key={idx}
                      style={{ height: `${h * 4}px` }}
                      className={`w-1 rounded-full transition-all duration-75 ${
                        isPlayingFollowUpTts ? 'bg-[#c0c1ff]' : 'bg-[#c0c1ff]/50'
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Answered bonus transcript preview */}
              {answeredBonus && (
                <div className="p-3 rounded-lg bg-[#00885d]/20 border border-[#4edea3]/30 text-[#4edea3] text-[13px] font-['Inter'] animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    Bonus Answer Accepted (+0.3 pts applied):
                  </div>
                  {bonusText}
                </div>
              )}
            </div>

            {/* Action Choice Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 relative z-10 pt-1">
              <button
                type="button"
                onClick={isLastQuestion ? onGoToFinalReport : onProceedNext}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] transition-all font-['JetBrains_Mono'] text-[12px] flex items-center justify-center gap-2 shadow-sm border border-white/[0.04] cursor-pointer"
              >
                <span>{isLastQuestion ? 'Proceed to Final Report Card' : `Skip & Proceed to Question ${questionIndex + 2}`}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={handleAnswerBonus}
                disabled={answeredBonus || isRecordingBonus}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-['JetBrains_Mono'] text-[12px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  answeredBonus
                    ? 'bg-[#00885d] text-white opacity-80'
                    : 'bg-[#c0c1ff] hover:bg-[#8083ff] text-[#1000a9] shadow-[0_0_20px_rgba(192,193,255,0.25)] hover:shadow-[0_0_24px_rgba(128,131,255,0.4)]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {answeredBonus ? 'check' : 'mic'}
                </span>
                <span>
                  {isRecordingBonus
                    ? 'Transcribing Verbal Response...'
                    : answeredBonus
                    ? 'Follow-Up Graded (+Bonus Applied)'
                    : 'Answer Follow-Up (+Bonus Scoring)'}
                </span>
              </button>
            </div>
          </section>
        )}

        {/* Section: Mathematical Calibration & Weight Formula */}
        <section className="rounded-xl bg-[#0a0e17] p-4 sm:p-5 border border-white/[0.04] flex flex-col gap-2 text-[#c7c4d7]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#908fa0]">calculate</span>
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase font-semibold text-[#dfe2ef]">
              Mathematical Calibration & Weight Formula
            </span>
          </div>
          <div className="w-full overflow-x-auto p-3 bg-[#181b25] rounded-lg border border-white/[0.03]">
            <code className="font-['JetBrains_Mono'] text-[11px] sm:text-[12px] text-[#c0c1ff] tracking-wide whitespace-nowrap block">
              Weighted Score = (4.5 × 0.25) + (4.0 × 0.25) + (4.5 × 0.20) + (3.5 × 0.15) + (4.5 × 0.15) = 1.125 + 1.000 + 0.900 + 0.525 + 0.675 = 4.225 → 4.2
            </code>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[#908fa0] font-['Inter'] text-[12px] gap-2 mt-1">
            <p>
              <strong className="font-medium text-[#c7c4d7]">Missing Delivery Handling:</strong> If delivery is unrecorded, normalized over remaining 85% weights automatically to preserve statistical parity.
            </p>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#908fa0] shrink-0">
              Algorithm: ISO/IEC-25010 Evaluator v3.4
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
