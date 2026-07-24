import { StyleSheet, Text, View } from 'react-native';
import type { Credential } from '../contract';
import { colors, fonts } from '../theme';

export default function CredentialCard({ cred, entry }: { cred: Credential; entry: number }) {
  const issued = new Date(Number(cred.issueDate) * 1000).toLocaleDateString();

  return (
    // Double rule, like the border of a printed certificate
    <View style={styles.frame}>
      <View style={styles.inner}>
        <View style={styles.serialRow}>
          <Text style={[styles.serial, { color: colors.green }]}>
            ENTRY {String(entry).padStart(2, '0')}
          </Text>
          <Text style={styles.serial}>{issued}</Text>
        </View>

        <Text style={styles.course}>{cred.courseName}</Text>

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.metaLabel}>Skill</Text>
            <Text style={styles.metaValue}>{cred.skillGained}</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Issued by</Text>
            <Text style={styles.metaValue}>{cred.issuerName}</Text>
          </View>
        </View>

        <View style={styles.stamp}>
          <Text style={styles.stampText}>VERIFIED · SEPOLIA</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    padding: 5,
  },
  inner: {
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 3,
    padding: 24,
  },
  serialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  serial: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.faded,
  },
  course: {
    fontFamily: fonts.serif,
    fontSize: 21,
    lineHeight: 28,
    color: colors.ink,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 32,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 15,
    color: colors.ink,
    fontWeight: '500',
  },
  stamp: {
    alignSelf: 'flex-end',
    marginTop: 18,
    borderWidth: 2,
    borderColor: colors.stamp,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    opacity: 0.9,
    transform: [{ rotate: '-4deg' }],
  },
  stampText: {
    color: colors.stamp,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});