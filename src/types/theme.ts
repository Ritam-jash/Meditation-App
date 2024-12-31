export type ThemeMode = 'light' | 'dark';
export type MoodTheme = 'sunset' | 'night' | 'beach' | 'dawn' | 'mountain' | 'forest';

export interface ThemeContextType {
  theme: ThemeMode;
  mood: MoodTheme;
  toggleTheme: () => void;
  setMood: (mood: MoodTheme) => void;
}

export interface BreathingSettings {
  breathDuration: number;
  holdDuration: number;
  sessionDuration: number;
}