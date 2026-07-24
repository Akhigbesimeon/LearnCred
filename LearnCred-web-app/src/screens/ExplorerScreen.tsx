import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchCredentials, isAddress, type Credential } from '../contract';
import CredentialCard from '../components/CredentialCard';
import StatusBanner, { type Status } from '../components/StatusBanner';
import { colors, fonts, ui } from '../theme';

export default function ExplorerScreen() {
  const [address, setAddress] = useState('');
  const [creds, setCreds] = useState<Credential[]>([]);
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  async function lookUp() {
    const target = address.trim();
    if (!isAddress(target)) {
      setStatus({ kind: 'error', text: "That doesn't look like a wallet address — double-check it." });
      return;
    }

    setBusy(true);
    setStatus(null);
    try {
      setCreds(await fetchCredentials(target));
      setSearched(true);
    } catch (err) {
      console.error('lookup failed', err);
      setStatus({ kind: 'error', text: "Couldn't reach the network. Give it a second and retry." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={ui.panel}>
      <Text style={ui.title}>Look up a record</Text>
      <Text style={ui.subtitle}>
        Paste a student's wallet address to see the credentials issued to it.
      </Text>

      <View style={styles.searchRow}>
        <TextInput
          style={[ui.input, { flex: 1 }]}
          placeholder="0x…"
          placeholderTextColor={colors.muted}
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[ui.button, busy && ui.buttonDisabled]}
          onPress={lookUp}
          disabled={busy}
        >
          <Text style={ui.buttonText}>{busy ? 'Checking…' : 'Look up'}</Text>
        </TouchableOpacity>
      </View>

      <StatusBanner status={status} />

      <View style={styles.divider} />

      {creds.length === 0 ? (
        <View style={styles.emptySlot}>
          <Text style={styles.emptyText}>
            {searched ? '// no entries for that address' : '// look up an address to see its entries'}
          </Text>
        </View>
      ) : (
        <View style={styles.results}>
          <Text style={styles.resultsHeader}>
            {creds.length} {creds.length === 1 ? 'entry' : 'entries'} found
          </Text>
          {creds.map((cred, i) => (
            <CredentialCard key={i} cred={cred} entry={i + 1} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.hairline,
    marginVertical: 28,
  },
  emptySlot: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.line,
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.muted,
  },
  results: {
    gap: 14,
  },
  resultsHeader: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.faded,
    marginBottom: 2,
  },
});