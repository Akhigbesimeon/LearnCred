import { Platform, StyleSheet } from 'react-native';

export const colors = {
  ink: '#1F1B16',
  paper: '#F6F1E7',
  surface: '#FDFBF6',
  green: '#1A5C45',
  greenDeep: '#123E30',
  stamp: '#B03B33',
  line: '#DCD3C1',
  hairline: '#EAE4D6',
  faded: '#7A7160',
  muted: '#A79C88',
};

export const fonts = {
  serif: Platform.select({
    web: 'Georgia, "Times New Roman", serif',
    ios: 'Georgia',
    default: 'serif',
  }),
  mono: Platform.select({
    web: '"SF Mono", "Cascadia Mono", Consolas, Menlo, monospace',
    ios: 'Menlo',
    default: 'monospace',
  }),
};

export const ui = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 36,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.ink,
  },
  subtitle: {
    fontSize: 15,
    color: colors.faded,
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.faded,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.ink,
    fontSize: 15,
  },

  // Buttons
  mono: {
    fontFamily: fonts.mono,
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.paper,
    fontWeight: '600',
    fontSize: 15,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});