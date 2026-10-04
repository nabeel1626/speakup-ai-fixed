export type RoleType = 'frontend' | 'data';
export type SeniorityType = 'entry' | 'mid' | 'senior';
export type ActiveTab = 'session-setup' | 'interview-simulation' | 'rubric-evaluation' | 'final-report-card';

export interface DimensionScore {
  name: string;
  weight: number;
  score: number; // e.g. 4.5
  percentage: number; // e.g. 90
  description: string;
  tag: string;
  tier: string;
  color: 'tertiary' | 'primary' | 'secondary' | 'error';
  isGrowthOpportunity?: boolean;
}

export interface QuestionData {
  id: number;
  specId: string;
  topic: string;
  question: string;
  dimensionFocus: string;
  weight: number;
  ttsDuration: string;
  lensDescription: string;
  tags: string[];
  defaultTranscript: string;
  followUpPrompt?: string;
  followUpAudioDuration?: string;
  scores: {
    overall: number;
    weightedPct: number;
    performanceBadge: string;
    summary: string;
    dimensions: DimensionScore[];
  };
  diagnostics: {
    summary: string;
    latency: string;
    duration: string;
    transcriptSync: string;
  };
}

export interface AudioSettings {
  micGain: number;
  noiseSuppression: boolean;
  echoCancellation: boolean;
  sampleRate: '44.1kHz' | '48.0kHz' | '96.0kHz';
  audioCodec: 'Opus' | 'AAC' | 'PCM';
  ttsSpeed: number;
  ttsVoice: string;
}
