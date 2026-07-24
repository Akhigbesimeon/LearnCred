import { Platform, StyleSheet } from 'react-native';

export const colors = {
  bg: '#0F141C',
  panel: '#151C26',
  inset: '#0C1118',
  record: '#111823',
  line: '#27313F',
  hairline: '#1C2430',
  text: '#DCE3EC',
  faded: '#8B98A8',
  muted: '#5D6A7A',
  cyan: '#4FC8E0',
  green: '#46C989',
  amber: '#D9A44A',
  red: '#E06553',
};

export const fonts = {
  mono: Platform.select({
    web: '"JetBrains Mono", "SF Mono", "Cascadia Mono", Consolas, Menlo, monospace',
    ios: 'Menlo',
    default: 'monospace',
  }),
};

export const ui = StyleSheet.create({
  panel: {
    backgroundColor: colors.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.faded,
    marginTop: 6,
    marginBottom: 28,
    lineHeight: 21,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.faded,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.inset,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts.mono,
  },
  button: {
    backgroundColor: colors.cyan,
    borderRadius: 6,
    paddingVertical: 13,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#0B1119',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
});