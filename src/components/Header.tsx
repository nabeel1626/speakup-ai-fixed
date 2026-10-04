import React from 'react';
import { ActiveTab, RoleType, SeniorityType } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedRole: RoleType;
  selectedSeniority: SeniorityType;
  isMicActive: boolean;
  onOpenSettings: () => void;
  onResetSession: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedRole,
  selectedSeniority,
  isMicActive,
  onOpenSettings,
  onResetSession
}) => {
  const roleName = selectedRole === 'frontend' ? 'Frontend Dev' : 'Data Analyst';
  const seniorityLabel = selectedSeniority === 'entry' ? 'Entry' : selectedSeniority === 'mid' ? 'Mid' : 'Sr';

  const navItems: { id: ActiveTab; num: string; label: string }[] = [
    { id: 'session-setup', num: '01', label: 'Setup' },
    { id: 'interview-simulation', num: '02', label: 'Interview Simulation' },
    { id: 'rubric-evaluation', num: '03', label: 'Rubric Evaluation' },
    { id: 'final-report-card', num: '04', label: 'Final Report Card' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0a0e17]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('session-setup')} 
          className="flex items-center gap-2 shrink-0 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#262a34] text-[#c0c1ff] shadow-[0_0_12px_rgba(192,193,255,0.2)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[18px] sm:text-[20px] text-[#dfe2ef] font-bold tracking-tight">
            SpeakUp AI
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#262a34] text-[#7bd0ff] font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider">
            BETA / MVP
          </span>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 px-1.5 py-1 rounded-xl bg-[#181b25] border border-white/[0.04]">
          {navItems.map((item, idx) => {
            const isActive = activeTab === item.id;
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <span className="text-[#908fa0] text-[10px] select-none px-0.5">/</span>}
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 transition-all flex items-center gap-1.5 text-[12px] font-['JetBrains_Mono'] font-medium rounded-lg cursor-pointer ${
                    isActive
                      ? 'bg-[#8083ff] text-[#0d0096] shadow-[0_0_16px_rgba(128,131,255,0.35)] font-semibold'
                      : 'text-[#c7c4d7] hover:text-[#dfe2ef] hover:bg-[#1c1f29]'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'opacity-75' : 'opacity-60'}`}>{item.num}</span>
                  <span>{item.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right Telemetry & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Status Pills */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181b25] border border-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef] font-medium">FastAPI</span>
            </div>
            <span className="text-[#464554] text-[10px]">|</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isMicActive ? 'bg-[#4edea3]' : 'bg-[#7bd0ff]'}`}></span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#c7c4d7]">Mic</span>
            </div>
            <span className="text-[#464554] text-[10px]">|</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] truncate max-w-[140px]">
              {roleName} ({seniorityLabel})
            </span>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-[#1c1f29] hover:bg-[#262a34] text-[#c7c4d7] hover:text-[#dfe2ef] transition-colors flex items-center justify-center cursor-pointer border border-white/[0.04]"
              title="Audio & Telemetry Settings"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
            <button
              type="button"
              onClick={onResetSession}
              className="px-2.5 py-1.5 rounded-lg bg-[#93000a]/20 hover:bg-[#93000a]/40 text-[#ffb4ab] transition-all font-['JetBrains_Mono'] text-[11px] flex items-center gap-1 cursor-pointer border border-[#93000a]/30"
              title="Reset Session"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Profile Badge */}
          <div 
            className="w-8 h-8 rounded-full bg-[#c0c1ff] flex items-center justify-center shrink-0 shadow-sm"
            title="Candidate: Anonymous Session"
          >
            <span className="material-symbols-outlined text-[#1000a9] text-[18px]">person</span>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className="xl:hidden flex items-center justify-around px-2 py-1.5 bg-[#181b25] border-t border-white/[0.04] overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-2 py-1 text-[11px] font-['JetBrains_Mono'] rounded transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#8083ff] text-[#0d0096] font-semibold'
                  : 'text-[#c7c4d7] hover:text-[#dfe2ef]'
              }`}
            >
              <span className="opacity-60 mr-1">{item.num}</span>
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
