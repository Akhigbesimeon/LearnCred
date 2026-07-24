import { Platform, StyleSheet } from 'react-native';

export const colors = {
  ink: '#0F172A',
  slate: '#475569',
  faded: '#64748B',
  muted: '#94A3B8',
  line: '#E2E8F0',
  hairline: '#F1F5F9',
  paper: '#F8FAFC',
  indigo: '#4F46E5',
  indigoTint: '#EEF2FF',
};

export const ui = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    borderWidth: 1,
    borderColor: colors.hairline,
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.04)',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.faded,
    marginTop: 6,
    marginBottom: 32,
    lineHeight: 22,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.ink,
    fontSize: 15,
  },
  // Fonts
  mono: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
});
