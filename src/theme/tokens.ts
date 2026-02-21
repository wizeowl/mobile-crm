import { ViewStyle } from 'react-native';

export const colors = {
  canvas: '#e8edf4',
  surface: '#ffffff',
  infoSurface: '#eaf2ff',
  primary: '#3d87f5',
  primaryPressed: '#2f78e5',
  textPrimary: '#1f2a37',
  textSecondary: '#556070',
  textMuted: '#8b96a8',
  border: '#d7e0ec',
  danger: '#dc4c4c',
  success: '#37b26c',
  warning: '#f2b233',
  lavender: '#8a74f6',
  muted: '#aab4c3',
  teal: '#18bdd8',
  slate: '#eef3f9',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

export const typography = {
  heading: {
    fontSize: 30,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 34,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  helper: {
    fontSize: 13,
    fontWeight: '500',
  },
} as const;

export const shadows: Record<'button', ViewStyle> = {
  button: {
    shadowColor: '#1f2a37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
};
