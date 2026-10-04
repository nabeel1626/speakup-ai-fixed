import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0a0e17]/90 backdrop-blur-md mt-auto border-t border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="w-full px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          <a
            href="https://github.com/nabeel1626/Speakup-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[12px] text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>github.com/nabeel1626/Speakup-AI</span>
          </a>
          <span className="hidden md:inline text-[#464554] text-[12px]">•</span>
          <span className="font-['Inter'] text-[13px] text-[#c7c4d7]">
            Illustrative AI Rubric Benchmark Notice
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] text-[#4edea3] bg-[#181b25] px-3 py-1 rounded-full border border-[#4edea3]/20">
          <span className="material-symbols-outlined text-[14px]">verified_user</span>
          <span>Zero-Auth Session: No data stored permanently</span>
        </div>
      </div>
    </footer>
  );
};
