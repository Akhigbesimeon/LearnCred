import { StyleSheet, Text, View } from 'react-native';
import type { Credential } from '../contract';
import { colors } from '../theme';

export default function CredentialCard({ cred }: { cred: Credential }) {
  const issued = new Date(Number(cred.issueDate) * 1000).toLocaleDateString();

  return (
    <View style={styles.card}>
      <View style={styles.stripe} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={styles.chainTag}>
            <Text style={styles.chainTagText}>ON-CHAIN</Text>
          </View>
          <Text style={styles.date}>{issued}</Text>
        </View>

        <Text style={styles.course}>{cred.courseName}</Text>

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.metaLabel}>SKILL</Text>
            <Text style={styles.metaValue}>{cred.skillGained}</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>ISSUED BY</Text>
            <Text style={styles.metaValue}>{cred.issuerName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  stripe: {
    width: 6,
    backgroundColor: colors.indigo,
  },
  body: {
    flex: 1,
    padding: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chainTag: {
    backgroundColor: colors.indigoTint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  chainTagText: {
    color: colors.indigo,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 13,
    color: colors.faded,
    fontWeight: '500',
  },
  course: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 32,
  },
  metaLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
  },
});
