import React, { useState, useEffect, useRef } from 'react';
import { QuestionData, RoleType, SeniorityType } from '../../types';

interface SimulationScreenProps {
  currentQuestion: QuestionData;
  questionIndex: number;
  totalQuestions: number;
  selectedRole: RoleType;
  selectedSeniority: SeniorityType;
  onSubmitForRubric: (transcript: string) => void;
  onPreviousQuestion?: () => void;
  onNextQuestion?: () => void;
}

export const SimulationScreen: React.FC<SimulationScreenProps> = ({
  currentQuestion,
  questionIndex,
  totalQuestions,
  selectedRole,
  selectedSeniority,
  onSubmitForRubric
}) => {
  const [isRecording, setIsRecording] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [transcript, setTranscript] = useState(currentQuestion.defaultTranscript);
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(102); // 01:42 in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [sineOffset, setSineOffset] = useState(0);

  // Sync transcript when question changes
  useEffect(() => {
    setTranscript(currentQuestion.defaultTranscript);
  }, [currentQuestion]);

  // Waveform animation loop
  useEffect(() => {
    let animId: number;
    const animateWave = () => {
      setSineOffset((prev) => (prev + 0.05) % (Math.PI * 2));
      animId = requestAnimationFrame(animateWave);
    };
    animId = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Timer loop
  useEffect(() => {
    if (!isRecording || isPaused) return;
    const timer = setInterval(() => {
      setTimeElapsed((prev) => (prev >= 180 ? 180 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play question via TTS (Web Speech API or fallback)
  const handleReplayTts = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.rate = ttsSpeed;
      utterance.onstart = () => setIsTtsPlaying(true);
      utterance.onend = () => setIsTtsPlaying(false);
      utterance.onerror = () => setIsTtsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsTtsPlaying(true);
      setTimeout(() => setIsTtsPlaying(false), 4000);
    }
  };

  const handleFinishAnswer = () => {
    setIsRecording(false);
    onSubmitForRubric(transcript);
  };

  const handleReRecord = () => {
    if (window.confirm('Are you sure you want to discard this answer audio and re-record?')) {
      setTranscript('Listening for speech input...');
      setIsRecording(true);
      setTimeElapsed(0);
      setIsPaused(false);
      setTimeout(() => {
        setTranscript(currentQuestion.defaultTranscript);
      }, 1500);
    }
  };

  const roleName = selectedRole === 'frontend' ? 'Frontend Developer' : 'Data Analyst';
  const seniorityLabel = selectedSeniority === 'entry' ? 'Entry-level' : selectedSeniority === 'mid' ? 'Mid-level' : 'Senior';

  // Calculate dynamic wave paths based on sine offset
  const generateSinePath = (amplitude: number, freq: number, phase: number, yCenter: number) => {
    const points: string[] = [];
    const width = 700;
    for (let x = 0; x <= width; x += 10) {
      const y = yCenter + Math.sin(x * freq + phase + sineOffset) * amplitude * (isRecording && !isPaused && !isMuted ? 1 : 0.15);
      points.push(`${x},${y.toFixed(1)}`);
    }
    return `M${points.join(' L')}`;
  };

  const path1 = generateSinePath(24, 0.015, 0, 60);
  const path2 = generateSinePath(18, 0.02, Math.PI / 3, 60);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col gap-6">
      {/* Top Telemetry & Global Progress Rail */}
      <section className="w-full bg-[#181b25] rounded-xl p-4 sm:p-5 border border-white/[0.05] shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1c1f29] rounded-lg border border-white/[0.04]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#c0c1ff] uppercase tracking-wider font-semibold">
              Queue
            </span>
            <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef] font-semibold">
              Question 0{questionIndex + 1} / 0{totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1c1f29] rounded-lg border border-white/[0.04]">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">terminal</span>
            <span className="font-['JetBrains_Mono'] text-[12px] text-[#dfe2ef]">
              {roleName} ({seniorityLabel})
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1c1f29] rounded-lg border border-white/[0.04]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3]">SESSION:</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#c7c4d7] font-mono">
              SYS-9102-ALPHA
            </span>
          </div>
        </div>

        {/* Segmented Bar & Global Timer Module */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#c7c4d7] uppercase">
                Time Allocation
              </span>
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#c0c1ff] font-bold tracking-wider">
                {formatTime(timeElapsed)}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#908fa0]">/ 03:00 MAX</span>
            </div>
            {/* 5-Segment Progression Indicator */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalQuestions }).map((_, idx) => {
                const isCompleted = idx < questionIndex;
                const isCurrent = idx === questionIndex;
                return (
                  <div
                    key={idx}
                    className={`w-8 h-1.5 rounded-full transition-all ${
                      isCompleted
                        ? 'bg-[#4edea3]'
                        : isCurrent
                        ? 'bg-[#c0c1ff] animate-pulse'
                        : 'bg-[#31353f]'
                    }`}
                  ></div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded-lg transition-colors cursor-pointer border border-white/[0.04] ${
              isPaused
                ? 'bg-[#8083ff] text-[#0d0096]'
                : 'bg-[#1c1f29] hover:bg-[#262a34] text-[#c7c4d7] hover:text-[#dfe2ef]'
            }`}
            title={isPaused ? 'Resume Evaluation' : 'Emergency Pause Evaluation'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPaused ? 'play_circle' : 'pause_circle'}
            </span>
          </button>
        </div>
      </section>

      {/* Main Asymmetric 12-Column Technical Workspace Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Synthesizer Engine & Question Presentation Box (S04) */}
        <section className="lg:col-span-5 flex flex-col gap-5 w-full">
          <div className="w-full bg-[#1c1f29] rounded-xl p-5 sm:p-6 border border-white/[0.05] shadow-xl relative overflow-hidden flex flex-col gap-4">
            {/* Ambient Glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#c0c1ff]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Subtitle & Audio Status */}
            <div className="flex items-center justify-between gap-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c0c1ff] animate-ping"></span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#c0c1ff] uppercase font-bold tracking-widest">
                  Dimension Focus
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#262a34] border border-white/[0.04]">
                <span className="material-symbols-outlined text-[#c0c1ff] text-[14px]">volume_up</span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef]">
                  TTS Neural Engine v2.4
                </span>
              </div>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#dfe2ef] font-semibold tracking-tight relative z-10">
              {currentQuestion.dimensionFocus}
            </h2>

            {/* Prompt Box with Elevated Depth */}
            <div className="bg-[#0a0e17]/85 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/[0.05] shadow-md flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between text-[#908fa0] text-[11px] font-['JetBrains_Mono']">
                <span className="tracking-wider uppercase text-[#c7c4d7]">
                  SPEC_ID: {currentQuestion.specId}
                </span>
                <span className="text-[#7bd0ff] bg-[#262a34] px-2 py-0.5 rounded">
                  Weight: {currentQuestion.weight}%
                </span>
              </div>
              <p className="font-['Inter'] text-base sm:text-[17px] text-[#dfe2ef] leading-relaxed font-normal">
                {currentQuestion.question}
              </p>
            </div>

            {/* Synthesizer Audio Stream Controller */}
            <div className="flex flex-col gap-3 pt-1 relative z-10">
              <div className="flex items-center justify-between px-1">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] flex items-center gap-1.5">
                  <span className={`material-symbols-outlined text-[15px] ${isTtsPlaying ? 'text-[#4edea3] animate-spin' : 'text-[#c0c1ff]'}`}>
                    record_voice_over
                  </span>
                  Synthesizer Playback Stream
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] font-mono">
                  {isTtsPlaying ? 'Speaking...' : `${currentQuestion.ttsDuration} / ${currentQuestion.ttsDuration} (Completed)`}
                </span>
              </div>

              {/* Mini Waveform / Audio State Graphic for AI voice */}
              <div className="w-full bg-[#0a0e17] h-10 rounded-lg p-2 flex items-center justify-between gap-1 shadow-sm border border-white/[0.02]">
                {[4, 8, 3, 10, 8, 5, 12, 7, 4, 9, 6, 11, 4, 8, 3, 6].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: isTtsPlaying ? `${(h * 2)}px` : `${h + 4}px` }}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      isTtsPlaying ? 'bg-[#c0c1ff]' : 'bg-[#c0c1ff]/50'
                    }`}
                  ></span>
                ))}
              </div>

              {/* Interactive TTS Controls */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleReplayTts}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] flex items-center justify-center gap-2 transition-all shadow-sm border border-white/[0.04] cursor-pointer"
                  id="tts-replay-btn"
                >
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">
                    {isTtsPlaying ? 'stop' : 'replay'}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px] font-medium">
                    {isTtsPlaying ? 'Stop Audio' : 'Replay Audio (TTS)'}
                  </span>
                </button>

                {/* Speed Toggle Pills */}
                <div className="flex items-center bg-[#262a34] rounded-lg p-0.5 border border-white/[0.04]">
                  {[1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setTtsSpeed(speed)}
                      className={`px-2.5 py-1.5 rounded-md font-['JetBrains_Mono'] text-[11px] transition-all cursor-pointer ${
                        ttsSpeed === speed
                          ? 'bg-[#8083ff] text-[#0d0096] font-bold'
                          : 'text-[#c7c4d7] hover:text-[#dfe2ef]'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Reference Callout Card */}
          <div className="w-full bg-[#181b25] rounded-xl p-4 sm:p-5 border border-white/[0.04] shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#7bd0ff]">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider font-semibold">
                Evaluation Rubric Lens
              </span>
            </div>
            <p className="font-['Inter'] text-[13px] text-[#c7c4d7] leading-relaxed">
              {currentQuestion.lensDescription}
            </p>
            <div className="flex items-center gap-2 flex-wrap pt-2">
              {currentQuestion.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#1c1f29] text-[#4edea3] border border-white/[0.03]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Interactive Recording Node (S05) & Live Transcription (S06) */}
        <section className="lg:col-span-7 flex flex-col gap-6 w-full">
          {/* S05 Candidate Voice Recording Module */}
          <div className="w-full bg-[#1c1f29] rounded-xl p-5 sm:p-6 border border-white/[0.05] shadow-xl relative overflow-hidden flex flex-col gap-4">
            {/* Ambient Glow */}
            <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-[#7bd0ff]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full font-['JetBrains_Mono'] text-[11px] font-semibold tracking-wide border ${
                    isRecording && !isPaused
                      ? 'bg-[#93000a]/20 text-[#ffb4ab] border-[#93000a]/30'
                      : 'bg-[#262a34] text-[#c7c4d7] border-white/[0.04]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRecording && !isPaused ? 'bg-[#ffb4ab] animate-ping' : 'bg-[#908fa0]'
                    }`}
                  ></span>
                  {isRecording ? (isPaused ? 'PAUSED' : 'RECORDING') : 'LOCKED'}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#262a34] text-[#c7c4d7] font-['JetBrains_Mono'] text-[10px] border border-white/[0.04]">
                  <span className="material-symbols-outlined text-[#4edea3] text-[14px]">graphic_eq</span>
                  Silence Detection: Active
                </span>
              </div>

              {/* Input Level Monitor */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#262a34] border border-white/[0.04]">
                <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">mic</span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef] font-mono">
                  Input: {isMuted ? 'Muted (0dB)' : 'Optimal (-6dB)'}
                </span>
                <div className="w-12 h-2 rounded-full bg-[#0a0e17] overflow-hidden flex">
                  <div
                    className={`h-full transition-all ${
                      isMuted ? 'w-0' : 'w-9 bg-[#7bd0ff]'
                    }`}
                  ></div>
                  <div className="w-3 h-full bg-[#31353f]"></div>
                </div>
              </div>
            </div>

            {/* Studio Waveform Canvas Visualizer Unit */}
            <div className="w-full h-44 bg-[#0a0e17] rounded-xl p-4 shadow-inner flex flex-col justify-between relative overflow-hidden border border-white/[0.04]">
              {/* Grid Lines Background */}
              <div className="absolute inset-0 opacity-10 flex flex-col justify-between py-2 pointer-events-none">
                <div className="w-full h-[1px] bg-[#908fa0]"></div>
                <div className="w-full h-[1px] bg-[#908fa0]"></div>
                <div className="w-full h-[1px] bg-[#908fa0]"></div>
                <div className="w-full h-[1px] bg-[#908fa0]"></div>
              </div>

              {/* Waveform Canvas SVG */}
              <div className="relative w-full h-full flex items-center justify-center">
                <svg
                  className="w-full h-28 overflow-visible"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 700 120"
                >
                  <defs>
                    <linearGradient id="wave-gradient-dynamic" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c0c1ff" />
                      <stop offset="50%" stopColor="#7bd0ff" />
                      <stop offset="100%" stopColor="#4edea3" />
                    </linearGradient>
                  </defs>

                  {/* Primary Harmonics */}
                  <path
                    className="opacity-95 transition-all duration-75"
                    d={path1}
                    stroke="#7bd0ff"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />

                  {/* Secondary Harmonic Wave */}
                  <path
                    className="opacity-75 transition-all duration-75"
                    d={path2}
                    stroke="#c0c1ff"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />

                  {/* Subtle Glow Aura */}
                  <path
                    className="opacity-15"
                    d={`${path1} L700,120 L0,120 Z`}
                    fill="url(#wave-gradient-dynamic)"
                  />
                </svg>
              </div>

              {/* Waveform Footer Info */}
              <div className="flex items-center justify-between relative z-10 text-[#c7c4d7] font-['JetBrains_Mono'] text-[10px]">
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff] animate-pulse"></span>
                  48.0 kHz • 24-BIT STEREO L/R
                </span>
                <span className="font-mono text-[#7bd0ff]">LATENCY: 18ms</span>
              </div>
            </div>

            {/* Studio Mic Recording Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-4 py-2 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] flex items-center gap-2 transition-all shadow-sm border border-white/[0.04] cursor-pointer"
                  id="pause-rec-btn"
                >
                  <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">
                    {isPaused ? 'play_arrow' : 'pause'}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px]">
                    {isPaused ? 'Resume Recording' : 'Pause Recording'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-lg transition-all shadow-sm border border-white/[0.04] cursor-pointer ${
                    isMuted
                      ? 'bg-[#93000a] text-white'
                      : 'bg-[#262a34] hover:bg-[#353943] text-[#c7c4d7] hover:text-[#dfe2ef]'
                  }`}
                  title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                  id="mute-mic-btn"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isMuted ? 'mic_off' : 'mic'}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleFinishAnswer}
                className="px-5 py-2.5 rounded-lg bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] font-['JetBrains_Mono'] text-[12px] font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(128,131,255,0.3)] hover:shadow-[0_0_24px_rgba(128,131,255,0.5)] transition-all cursor-pointer"
                id="finish-answer-btn"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Finish Answer & Lock</span>
                <kbd className="hidden sm:inline bg-[#0d0096]/15 text-[#0d0096] px-1.5 py-0.5 rounded font-mono text-[10px]">
                  Enter
                </kbd>
              </button>
            </div>
          </div>

          {/* S06 Real-time Speech-to-Text Transcription Review */}
          <div className="w-full bg-[#1c1f29] rounded-xl p-5 sm:p-6 border border-white/[0.05] shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7bd0ff] text-[20px]">short_text</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#dfe2ef] font-semibold">
                  Live Speech-to-Text Stream
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] bg-[#00885d]/20 px-2.5 py-0.5 rounded font-mono border border-[#4edea3]/20">
                  Whisper-V3 Realtime
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              </div>
            </div>

            {/* Interactive Transcription Container */}
            <div className="w-full bg-[#0a0e17] rounded-xl p-4 shadow-inner flex flex-col gap-2 relative border border-white/[0.04]">
              <div className="flex items-center justify-between text-[#908fa0] text-[11px] font-['JetBrains_Mono'] border-none">
                <span className="text-[#c7c4d7]">STREAM_SYNC: 00:01:42</span>
                <span className="text-[#7bd0ff]">
                  Word Count: {transcript.split(/\s+/).filter(Boolean).length} • Confidence: 98.4%
                </span>
              </div>

              {/* Editable or Static Transcript */}
              {isEditingTranscript ? (
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={4}
                  className="w-full bg-[#181b25] text-[#dfe2ef] p-3 rounded-lg border border-[#8083ff] font-['Inter'] text-[14px] leading-relaxed focus:outline-none"
                />
              ) : (
                <div
                  className="font-['Inter'] text-[14px] text-[#dfe2ef] leading-relaxed p-1"
                  id="transcript-body"
                >
                  {transcript}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1 text-[#c7c4d7] font-['JetBrains_Mono'] text-[10px]">
                <span className="material-symbols-outlined text-[#4edea3] text-[14px]">auto_fix_high</span>
                <span>Acoustic NLP punctuation auto-applied</span>
              </div>
            </div>

            {/* Action Controls for Transcript Tuning */}
            <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all font-['JetBrains_Mono'] text-[11px] cursor-pointer border border-white/[0.04] ${
                    isEditingTranscript
                      ? 'bg-[#00885d] text-white'
                      : 'bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef]'
                  }`}
                  id="edit-transcript-toggle"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#7bd0ff]">
                    {isEditingTranscript ? 'check' : 'edit'}
                  </span>
                  <span>{isEditingTranscript ? 'Save Changes' : 'Edit Transcript Manually'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReRecord}
                  className="px-3 py-1.5 rounded-lg bg-[#262a34] hover:bg-[#93000a]/20 text-[#c7c4d7] hover:text-[#ffb4ab] flex items-center gap-1.5 transition-all font-['JetBrains_Mono'] text-[11px] cursor-pointer border border-white/[0.04]"
                  id="rerecord-btn"
                >
                  <span className="material-symbols-outlined text-[15px]">replay_circle_filled</span>
                  <span>Re-record Answer</span>
                </button>
              </div>

              <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] hidden md:inline font-mono">
                STATUS: READY_FOR_GRADING
              </span>
            </div>
          </div>

          {/* Global Action Ribbon: Submit for Rubric Scoring */}
          <div className="w-full bg-[#181b25] rounded-xl p-4 sm:p-5 border border-white/[0.05] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#262a34] text-[#4edea3] flex items-center justify-center shrink-0 border border-white/[0.04]">
                <span className="material-symbols-outlined text-[24px]">fact_check</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[15px] text-[#dfe2ef] font-semibold">
                  Ready for Evaluation
                </span>
                <span className="font-['Inter'] text-[13px] text-[#c7c4d7]">
                  Scores against the 5-dimension architecture rubric benchmark
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onSubmitForRubric(transcript)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4edea3] text-[#003824] font-['Plus_Jakarta_Sans'] text-base text-center font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(78,222,163,0.3)] hover:shadow-[0_0_32px_rgba(78,222,163,0.5)] transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>Submit for Rubric Evaluation</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
