import React from 'react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#1c1f29] border border-white/[0.08] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-[#dfe2ef]"
        role="dialog"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#93000a]/20 text-[#ffb4ab] flex items-center justify-center shrink-0 border border-[#93000a]/30">
            <span className="material-symbols-outlined text-[24px]">restart_alt</span>
          </div>
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[17px] font-bold">
              Reset Interview Session?
            </h3>
            <p className="text-xs text-[#908fa0] mt-0.5">
              Current progress, recorded audio telemetry, and diagnostic scores will be cleared.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0a0e17] border border-white/[0.04] text-xs text-[#c7c4d7] flex flex-col gap-1">
          <span className="font-semibold text-[#7bd0ff]">Session State Cleanup:</span>
          <span>• Audio stream buffer will be cleared</span>
          <span>• Question progression rewinds to 01 Setup</span>
          <span>• Local attempt session saved in zero-auth cache</span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#c7c4d7] text-xs font-['JetBrains_Mono'] font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#93000a] hover:bg-[#93000a]/90 text-white text-xs font-['JetBrains_Mono'] font-bold shadow-lg transition-all cursor-pointer"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};
