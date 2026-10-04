import { useState, useEffect } from 'react';
import { ActiveTab, AudioSettings, RoleType, SeniorityType } from './types';
import { FRONTEND_QUESTIONS, DATA_ANALYST_QUESTIONS, INITIAL_AUDIO_SETTINGS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AudioSettingsModal } from './components/AudioSettingsModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SetupScreen } from './components/screens/SetupScreen';
import { SimulationScreen } from './components/screens/SimulationScreen';
import { RubricScreen } from './components/screens/RubricScreen';
import { ReportScreen } from './components/screens/ReportScreen';
import { loadPersistedSession, savePersistedSession, clearPersistedSession } from './utils/storage';

export default function App() {
  // Load initial state from localStorage if available
  const [initialSession] = useState(() => loadPersistedSession());

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => initialSession?.activeTab ?? 'session-setup');
  const [selectedRole, setSelectedRole] = useState<RoleType>(() => initialSession?.role ?? 'frontend');
  const [selectedSeniority, setSelectedSeniority] = useState<SeniorityType>(() => initialSession?.seniority ?? 'mid');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => initialSession?.questionIndex ?? 1);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(INITIAL_AUDIO_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isMicActive, setIsMicActive] = useState(true);

  // Resume notification banner when restoring existing progress
  const [showResumeBanner, setShowResumeBanner] = useState<boolean>(() => {
    return !!(initialSession && (initialSession.questionIndex > 0 || initialSession.activeTab !== 'session-setup'));
  });

  // Automatically persist any session updates to local storage
  useEffect(() => {
    savePersistedSession({
      role: selectedRole,
      seniority: selectedSeniority,
      questionIndex: currentQuestionIndex,
      activeTab
    });
  }, [selectedRole, selectedSeniority, currentQuestionIndex, activeTab]);

  const questions = selectedRole === 'frontend' ? FRONTEND_QUESTIONS : DATA_ANALYST_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const handleStartSimulation = () => {
    setActiveTab('interview-simulation');
    setShowResumeBanner(false);
  };

  const handleViewRubricGuide = () => {
    setActiveTab('rubric-evaluation');
    setShowResumeBanner(false);
  };

  const handleSubmitForRubric = (_transcript: string) => {
    setActiveTab('rubric-evaluation');
    setShowResumeBanner(false);
  };

  const handleProceedNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setActiveTab('interview-simulation');
    } else {
      setActiveTab('final-report-card');
    }
    setShowResumeBanner(false);
  };

  const handleGoToFinalReport = () => {
    setActiveTab('final-report-card');
    setShowResumeBanner(false);
  };

  const handleRetakeInterview = () => {
    setCurrentQuestionIndex(0);
    setActiveTab('interview-simulation');
    setShowResumeBanner(false);
  };

  const handlePracticeAnotherRole = () => {
    const nextRole = selectedRole === 'frontend' ? 'data' : 'frontend';
    setSelectedRole(nextRole);
    setCurrentQuestionIndex(0);
    setActiveTab('session-setup');
    setShowResumeBanner(false);
  };

  const handleConfirmReset = () => {
    clearPersistedSession();
    setCurrentQuestionIndex(0);
    setActiveTab('session-setup');
    setShowResumeBanner(false);
    savePersistedSession({
      role: selectedRole,
      seniority: selectedSeniority,
      questionIndex: 0,
      activeTab: 'session-setup'
    });
  };

  return (
    <div className="bg-[#0f131c] text-[#dfe2ef] font-['Inter'] min-h-screen flex flex-col selection:bg-[#8083ff]/30 selection:text-white">
      {/* Fixed Studio Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setShowResumeBanner(false);
        }}
        selectedRole={selectedRole}
        selectedSeniority={selectedSeniority}
        isMicActive={isMicActive}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetSession={() => setIsResetConfirmOpen(true)}
      />

      {/* Floating Session Resumed Indicator */}
      {showResumeBanner && (
        <div className="fixed top-18 right-4 z-40 max-w-md bg-[#1c1f29] border border-[#8083ff]/40 p-3.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse shrink-0"></span>
            <div className="flex flex-col min-w-0">
              <span className="font-['JetBrains_Mono'] font-semibold text-[#dfe2ef] truncate">
                Resumed Session (Saved Locally)
              </span>
              <span className="text-[#c7c4d7] truncate">
                {selectedRole === 'frontend' ? 'Frontend Dev' : 'Data Analyst'} • Question 0{currentQuestionIndex + 1} of 05
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setActiveTab('session-setup');
                setShowResumeBanner(false);
              }}
              className="px-2 py-1 rounded bg-[#262a34] hover:bg-[#31353f] text-[#c7c4d7] hover:text-[#dfe2ef] font-['JetBrains_Mono'] text-[11px] transition-colors cursor-pointer"
            >
              Restart
            </button>
            <button
              type="button"
              onClick={() => setShowResumeBanner(false)}
              className="p-1 rounded text-[#908fa0] hover:text-[#dfe2ef] transition-colors cursor-pointer"
              title="Dismiss"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Screen Content */}
      <main className="w-full pt-16 min-h-[calc(100vh-64px)] flex flex-col flex-1">
        {activeTab === 'session-setup' && (
          <SetupScreen
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedSeniority={selectedSeniority}
            setSelectedSeniority={setSelectedSeniority}
            onStartSimulation={handleStartSimulation}
            onViewRubricGuide={handleViewRubricGuide}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeTab === 'interview-simulation' && (
          <SimulationScreen
            currentQuestion={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedRole={selectedRole}
            selectedSeniority={selectedSeniority}
            onSubmitForRubric={handleSubmitForRubric}
          />
        )}

        {activeTab === 'rubric-evaluation' && (
          <RubricScreen
            currentQuestion={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onProceedNext={handleProceedNext}
            onGoToFinalReport={handleGoToFinalReport}
          />
        )}

        {activeTab === 'final-report-card' && (
          <ReportScreen
            questions={questions}
            selectedRole={selectedRole}
            selectedSeniority={selectedSeniority}
            onRetakeInterview={handleRetakeInterview}
            onPracticeAnotherRole={handlePracticeAnotherRole}
          />
        )}
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Audio Settings Modal */}
      <AudioSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={audioSettings}
        onSave={(newSettings) => {
          setAudioSettings(newSettings);
          setIsMicActive(true);
        }}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
