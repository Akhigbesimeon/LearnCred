import { StyleSheet, Text, View } from 'react-native';
import type { Credential } from '../contract';
import { colors, fonts } from '../theme';

export default function CredentialCard({ cred, entry }: { cred: Credential; entry: number }) {
  const issued = new Date(Number(cred.issueDate) * 1000).toLocaleDateString();

  return (
    <View style={styles.record}>
      <View style={styles.topRow}>
        <Text style={styles.index}>#{String(entry).padStart(2, '0')}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>VERIFIED</Text>
        </View>
      </View>

      <Text style={styles.course}>{cred.courseName}</Text>

      <View style={styles.leaders}>
        <Leader label="Skill" value={cred.skillGained} />
        <Leader label="Issued by" value={cred.issuerName} />
        <Leader label="Date" value={issued} />
      </View>
    </View>
  );
}

// Spec-sheet row: LABEL ······· value
function Leader({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.leaderRow}>
      <Text style={styles.leaderLabel}>{label}</Text>
      <View style={styles.dots} />
      <Text style={styles.leaderValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  record: {
    backgroundColor: colors.record,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  index: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.cyan,
  },
  tag: {
    backgroundColor: 'rgba(70,201,137,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(70,201,137,0.4)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.green,
  },
  course: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 16,
    lineHeight: 24,
  },
  leaders: {
    gap: 10,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  leaderLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  dots: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: colors.line,
    marginHorizontal: 10,
    marginBottom: 3,
  },
  leaderValue: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.text,
    flexShrink: 1,
    textAlign: 'right',
  },
});