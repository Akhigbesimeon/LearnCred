import { StyleSheet, Text, View } from 'react-native';

export type Status = {
  kind: 'success' | 'error' | 'pending';
  text: string;
};

const tones: Record<Status['kind'], { bg: string; border: string; fg: string }> = {
  success: { bg: '#ECFDF5', border: '#A7F3D0', fg: '#065F46' },
  error: { bg: '#FEF2F2', border: '#FECACA', fg: '#991B1B' },
  pending: { bg: '#EEF2FF', border: '#C7D2FE', fg: '#3730A3' },
};

export default function StatusBanner({ status }: { status: Status | null }) {
  if (!status) return null;

  const tone = tones[status.kind];
  return (
    <View style={[styles.box, { backgroundColor: tone.bg, borderColor: tone.border }]}>
      <Text style={[styles.text, { color: tone.fg }]}>{status.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
