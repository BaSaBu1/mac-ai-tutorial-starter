import { Platform, StatusBar, useColorScheme } from 'react-native';

export type Colors = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  onAccent: string;
  success: string;
  error: string;
};

const light: Colors = {
  background: '#F7F7F5',
  surface: '#FFFFFF',
  text: '#111111',
  muted: '#8A8A8E',
  border: '#E6E6E3',
  accent: '#FF5B2E',
  onAccent: '#FFFFFF',
  success: '#1FA35B',
  error: '#E5484D',
};

const dark: Colors = {
  background: '#0E0E10',
  surface: '#1A1A1D',
  text: '#F5F5F7',
  muted: '#8E8E93',
  border: '#2A2A2E',
  accent: '#FF6A40',
  onAccent: '#FFFFFF',
  success: '#34C27A',
  error: '#FF6369',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 };
export const radius = { sm: 10, md: 16, lg: 28, pill: 999 };

// Space to leave at the top so content clears the status bar.
export const topInset =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + spacing.md : 60;

export function useColors(): Colors {
  return useColorScheme() === 'dark' ? dark : light;
}
