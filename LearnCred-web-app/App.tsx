import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ExplorerScreen from './src/screens/ExplorerScreen';
import IssueScreen from './src/screens/IssueScreen';
import { colors, fonts } from './src/theme';

export default function App() {
  const [tab, setTab] = useState<'lookup' | 'issue'>('lookup');

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.wordmark}>LearnCred</Text>
          <Text style={styles.eyebrow}>CREDENTIAL REGISTRY · SEPOLIA</Text>
        </View>

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

      <View style={styles.content}>
        {tab === 'lookup' ? <ExplorerScreen /> : <IssueScreen />}
      </View>

      <Text style={styles.footer}>
        Every record here is public — anyone can verify it on Sepolia.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: colors.paper,
    alignItems: 'center',
    paddingBottom: 64,
  },
  header: {
    width: '100%',
    maxWidth: 720,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 28,
  },
  wordmark: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.ink,
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.green,
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
  },
  tab: {
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.green,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.faded,
  },
  tabLabelActive: {
    color: colors.ink,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    paddingHorizontal: 20,
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});