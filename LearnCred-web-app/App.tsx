import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CONTRACT_ADDRESS, shortAddress } from './src/contract';
import ExplorerScreen from './src/screens/ExplorerScreen';
import IssueScreen from './src/screens/IssueScreen';
import { colors, fonts } from './src/theme';

export default function App() {
  const [tab, setTab] = useState<'lookup' | 'issue'>('lookup');

  const contractLabel =
    CONTRACT_ADDRESS.length === 42 ? shortAddress(CONTRACT_ADDRESS) : CONTRACT_ADDRESS;

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>
          LearnCred<Text style={styles.cursor}>_</Text>
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'lookup' && styles.tabActive]}
            onPress={() => setTab('lookup')}
          >
            <Text style={[styles.tabLabel, tab === 'lookup' && styles.tabLabelActive]}>
              Look up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'issue' && styles.tabActive]}
            onPress={() => setTab('issue')}
          >
            <Text style={[styles.tabLabel, tab === 'issue' && styles.tabLabelActive]}>
              Issue
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusLine}>
        <View style={styles.dot} />
        <Text style={styles.statusText}>SEPOLIA TESTNET</Text>
        <Text style={styles.statusSep}>·</Text>
        <Text style={styles.statusText}>CONTRACT {contractLabel}</Text>
      </View>

      <View style={styles.content}>
        {tab === 'lookup' ? <ExplorerScreen /> : <IssueScreen />}
      </View>

      <Text style={styles.footer}>
        every record is public — anyone can verify it on sepolia
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    paddingBottom: 64,
  },
  header: {
    width: '100%',
    maxWidth: 720,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 18,
  },
  wordmark: {
    fontFamily: fonts.mono,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  cursor: {
    color: colors.cyan,
  },
  tabs: {
    flexDirection: 'row',
    gap: 22,
  },
  tab: {
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.cyan,
  },
  tabLabel: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.faded,
  },
  tabLabelActive: {
    color: colors.cyan,
  },
  statusLine: {
    width: '100%',
    maxWidth: 720,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 22,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.hairline,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.green,
    marginRight: 8,
  },
  statusText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.faded,
  },
  statusSep: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.muted,
    marginHorizontal: 10,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    paddingHorizontal: 20,
  },
  footer: {
    marginTop: 36,
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});