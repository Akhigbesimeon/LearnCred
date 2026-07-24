import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../theme';

export type Status = {
  kind: 'success' | 'error' | 'pending';
  text: string;
};

const tones: Record<Status['kind'], { bg: string; border: string; fg: string }> = {
  success: { bg: 'rgba(70,201,137,0.10)', border: 'rgba(70,201,137,0.35)', fg: '#63D69C' },
  error: { bg: 'rgba(224,101,83,0.10)', border: 'rgba(224,101,83,0.35)', fg: '#E8836F' },
  pending: { bg: 'rgba(217,164,74,0.10)', border: 'rgba(217,164,74,0.35)', fg: '#E0B265' },
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
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
  },
  text: {
    fontFamily: fonts.mono,
    fontSize: 13,
    textAlign: 'center',
  },
});