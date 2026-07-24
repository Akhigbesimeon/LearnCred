import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ExplorerScreen from './src/screens/ExplorerScreen';
import IssueScreen from './src/screens/IssueScreen';
import { colors } from './src/theme';

export default function App() {
  const [tab, setTab] = useState<'explorer' | 'issue'>('explorer');

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.nav}>
        <Text style={styles.brand}>
          Learn<Text style={styles.brandAccent}>Cred</Text>
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'explorer' && styles.tabActive]}
            onPress={() => setTab('explorer')}
          >
            <Text style={[styles.tabLabel, tab === 'explorer' && styles.tabLabelActive]}>
              Explorer
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
        {tab === 'explorer' ? <ExplorerScreen /> : <IssueScreen />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: colors.paper,
    alignItems: 'center',
    paddingBottom: 80,
  },
  nav: {
    width: '100%',
    maxWidth: 800,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginBottom: 10,
  },
  brand: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: colors.indigo,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.line,
    borderRadius: 30,
    padding: 4,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 26,
  },
  tabActive: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  tabLabel: {
    color: colors.faded,
    fontSize: 14,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: colors.ink,
  },
  content: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: 16,
  },
});
