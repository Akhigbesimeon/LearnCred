import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isAddress, issueCredential, shortAddress } from '../contract';
import StatusBanner, { type Status } from '../components/StatusBanner';
import { colors, ui } from '../theme';

export default function IssueScreen() {
  const [student, setStudent] = useState('');
  const [course, setCourse] = useState('');
  const [skill, setSkill] = useState('');
  const [issuer, setIssuer] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  async function submit() {
    const recipient = student.trim();

    if (!recipient || !course.trim() || !skill.trim() || !issuer.trim()) {
      setStatus({ kind: 'error', text: 'Fill in all four fields first.' });
      return;
    }
    if (!isAddress(recipient)) {
      setStatus({ kind: 'error', text: "The recipient address doesn't look right." });
      return;
    }

    setBusy(true);
    setStatus({ kind: 'pending', text: 'Transaction sent — waiting for confirmation…' });
    try {
      await issueCredential(recipient, course.trim(), skill.trim(), issuer.trim());
      setStatus({
        kind: 'success',
        text: `Done — "${course.trim()}" is now on ${shortAddress(recipient)}'s record.`,
      });
      setStudent('');
      setCourse('');
      setSkill('');
      setIssuer('');
    } catch (err: any) {
      console.error('issue failed', err);
      setStatus({
        kind: 'error',
        text:
          err?.code === 'INSUFFICIENT_FUNDS'
            ? 'The issuer wallet is out of Sepolia ETH.'
            : 'Transaction failed — check the console for the reason.',
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={ui.card}>
      <Text style={ui.title}>Issue a record</Text>
      <Text style={ui.subtitle}>
        Writes a permanent entry to the student's wallet. Takes about 15 seconds on Sepolia.
      </Text>

      <View style={styles.field}>
        <Text style={ui.label}>Recipient address</Text>
        <TextInput
          style={[ui.input, ui.mono]}
          placeholder="0x…"
          placeholderTextColor={colors.muted}
          value={student}
          onChangeText={setStudent}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.field}>
        <Text style={ui.label}>Course or cohort</Text>
        <TextInput
          style={ui.input}
          placeholder="Brainbox pilot — Cohort 1"
          placeholderTextColor={colors.muted}
          value={course}
          onChangeText={setCourse}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1, marginRight: 16 }]}>
          <Text style={ui.label}>Skill</Text>
          <TextInput
            style={ui.input}
            placeholder="System architecture"
            placeholderTextColor={colors.muted}
            value={skill}
            onChangeText={setSkill}
          />
        </View>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={ui.label}>Issued by</Text>
          <TextInput
            style={ui.input}
            placeholder="Nuwacu Outreach"
            placeholderTextColor={colors.muted}
            value={issuer}
            onChangeText={setIssuer}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[ui.button, styles.submit, busy && ui.buttonDisabled]}
        onPress={submit}
        disabled={busy}
      >
        <Text style={ui.buttonText}>{busy ? 'Signing…' : 'Issue record'}</Text>
      </TouchableOpacity>

      <StatusBanner status={status} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 22,
  },
  row: {
    flexDirection: 'row',
  },
  submit: {
    marginTop: 6,
  },
});