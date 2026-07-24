import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchCredentials, isAddress, type Credential } from '../contract';
import CredentialCard from '../components/CredentialCard';
import StatusBanner, { type Status } from '../components/StatusBanner';
import { colors, ui } from '../theme';

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
    <View style={ui.card}>
      <Text style={ui.title}>Credential explorer</Text>
      <Text style={ui.subtitle}>
        Paste a student's wallet address to see every credential issued to it.
      </Text>

      <View style={styles.searchRow}>
        <TextInput
          style={[ui.input, ui.mono, { flex: 1 }]}
          placeholder="0x…"
          placeholderTextColor={colors.muted}
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={lookUp}
        />
        <TouchableOpacity
          style={[styles.searchButton, busy && styles.buttonDisabled]}
          onPress={lookUp}
          disabled={busy}
        >
          <Text style={styles.searchButtonText}>{busy ? 'Checking…' : 'Look up'}</Text>
        </TouchableOpacity>
      </View>

      <StatusBanner status={status} />

      <View style={styles.divider} />

      {creds.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            {searched ? 'No credentials on record for that address.' : 'Results show up here.'}
          </Text>
        </View>
      ) : (
        <View style={styles.results}>
          <Text style={styles.resultsHeader}>
            {creds.length} credential{creds.length === 1 ? '' : 's'}
          </Text>
          {creds.map((cred, i) => (
            <CredentialCard key={i} cred={cred} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    backgroundColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  divider: {
    height: 1,
    backgroundColor: colors.hairline,
    marginVertical: 36,
  },
  emptyBox: {
    padding: 32,
    borderRadius: 16,
    backgroundColor: colors.paper,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '500',
  },
  results: {
    gap: 20,
  },
  resultsHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
