import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PadGrid from './src/components/PadGrid';
import { playPad } from './src/audio/engine';

export default function App() {
  return (
    <View style={styles.container}>
      <PadGrid onHit={playPad} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' },
});