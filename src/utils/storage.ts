import { ActiveTab, RoleType, SeniorityType } from '../types';

export interface PersistedSession {
  role: RoleType;
  seniority: SeniorityType;
  questionIndex: number;
  activeTab: ActiveTab;
  lastUpdated: number;
}

const STORAGE_KEY = 'speakup_ai_interview_session_v1';

export const loadPersistedSession = (): PersistedSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    
    // Validate role
    const validRoles: RoleType[] = ['frontend', 'data'];
    const role: RoleType = validRoles.includes(parsed.role) ? parsed.role : 'frontend';

    // Validate seniority
    const validSeniorities: SeniorityType[] = ['entry', 'mid', 'senior'];
    const seniority: SeniorityType = validSeniorities.includes(parsed.seniority) ? parsed.seniority : 'mid';

    // Validate questionIndex
    const questionIndex = typeof parsed.questionIndex === 'number' && parsed.questionIndex >= 0 && parsed.questionIndex <= 4
      ? parsed.questionIndex
      : 0;

    // Validate activeTab
    const validTabs: ActiveTab[] = ['session-setup', 'interview-simulation', 'rubric-evaluation', 'final-report-card'];
    const activeTab: ActiveTab = validTabs.includes(parsed.activeTab) ? parsed.activeTab : 'session-setup';

    return {
      role,
      seniority,
      questionIndex,
      activeTab,
      lastUpdated: parsed.lastUpdated || Date.now()
    };
  } catch (err) {
    console.warn('Failed to load persisted SpeakUp session:', err);
    return null;
  }
};

export const savePersistedSession = (session: Partial<PersistedSession>) => {
  try {
    const existing = loadPersistedSession() || {
      role: 'frontend',
      seniority: 'mid',
      questionIndex: 0,
      activeTab: 'session-setup',
      lastUpdated: Date.now()
    };

    const updated: PersistedSession = {
      ...existing,
      ...session,
      lastUpdated: Date.now()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to persist SpeakUp session to localStorage:', err);
  }
};

export const clearPersistedSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear SpeakUp session from localStorage:', err);
  }
};
