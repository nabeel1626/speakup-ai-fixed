import React, { useState } from 'react';
import { AudioSettings } from '../types';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AudioSettings;
  onSave: (newSettings: AudioSettings) => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [localSettings, setLocalSettings] = useState<AudioSettings>(settings);
  const [isTestingAudio, setIsTestingAudio] = useState(false);

  if (!isOpen) return null;

  const handleTestBeep = () => {
    setIsTestingAudio(true);
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio context might be restricted
    }
    setTimeout(() => setIsTestingAudio(false), 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#1c1f29] border border-white/[0.08] rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-[#dfe2ef]"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[22px]">tune</span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold">
              Audio & Telemetry Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#c7c4d7] hover:text-white hover:bg-[#262a34] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 text-sm max-h-[70vh] overflow-y-auto pr-1">
          {/* Default Hardware */}
          <div className="flex flex-col gap-1.5">
            <label className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] uppercase tracking-wider">
              Selected Audio Input
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0e17] border border-white/[0.04]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#7bd0ff] text-[20px]">mic</span>
                <span className="font-medium text-[#dfe2ef]">MacBook Pro Microphone (Built-in)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] bg-[#00885d]/30 text-[#4edea3]">
                READY
              </span>
            </div>
          </div>

          {/* Mic Gain Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] uppercase tracking-wider">
                Microphone Gain Level
              </label>
              <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] font-semibold">
                {localSettings.micGain}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={localSettings.micGain}
              onChange={(e) => setLocalSettings({ ...localSettings, micGain: Number(e.target.value) })}
              className="w-full accent-[#8083ff] bg-[#0a0e17] h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#181b25] border border-white/[0.04]">
              <div className="flex flex-col">
                <span className="font-medium text-[13px]">Noise Suppression</span>
                <span className="text-[11px] text-[#908fa0]">RNNoise Filter</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.noiseSuppression}
                onChange={(e) => setLocalSettings({ ...localSettings, noiseSuppression: e.target.checked })}
                className="w-4 h-4 accent-[#4edea3] cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#181b25] border border-white/[0.04]">
              <div className="flex flex-col">
                <span className="font-medium text-[13px]">Echo Cancellation</span>
                <span className="text-[11px] text-[#908fa0]">AEC Filter</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.echoCancellation}
                onChange={(e) => setLocalSettings({ ...localSettings, echoCancellation: e.target.checked })}
                className="w-4 h-4 accent-[#4edea3] cursor-pointer"
              />
            </div>
          </div>

          {/* Sample Rate & Codec */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] uppercase tracking-wider">
                Sampling Rate
              </label>
              <select
                value={localSettings.sampleRate}
                onChange={(e) => setLocalSettings({ ...localSettings, sampleRate: e.target.value as AudioSettings['sampleRate'] })}
                className="p-2.5 rounded-xl bg-[#0a0e17] border border-white/[0.06] text-sm text-[#dfe2ef] focus:outline-none focus:border-[#8083ff]"
              >
                <option value="44.1kHz">44.1 kHz (CD Quality)</option>
                <option value="48.0kHz">48.0 kHz (Opus Studio)</option>
                <option value="96.0kHz">96.0 kHz (Hi-Res)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] uppercase tracking-wider">
                Codec Profile
              </label>
              <select
                value={localSettings.audioCodec}
                onChange={(e) => setLocalSettings({ ...localSettings, audioCodec: e.target.value as AudioSettings['audioCodec'] })}
                className="p-2.5 rounded-xl bg-[#0a0e17] border border-white/[0.06] text-sm text-[#dfe2ef] focus:outline-none focus:border-[#8083ff]"
              >
                <option value="Opus">Opus Ultra-Low Latency</option>
                <option value="AAC">AAC-LC Broadcast</option>
                <option value="PCM">Linear PCM 24-bit</option>
              </select>
            </div>
          </div>

          {/* Test Audio Hardware Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleTestBeep}
              disabled={isTestingAudio}
              className="w-full py-2.5 px-4 rounded-xl bg-[#262a34] hover:bg-[#31353f] text-[#7bd0ff] font-['JetBrains_Mono'] text-xs font-semibold flex items-center justify-center gap-2 border border-white/[0.06] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isTestingAudio ? 'volume_up' : 'speaker'}
              </span>
              <span>{isTestingAudio ? 'Synthesizing Test Frequency (440Hz)...' : 'Test Audio Playback Output'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
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
              onSave(localSettings);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#8083ff] text-[#0d0096] text-xs font-['JetBrains_Mono'] font-bold hover:brightness-110 shadow-[0_0_16px_rgba(128,131,255,0.35)] transition-all cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
