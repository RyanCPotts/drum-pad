import { View, Text, StyleSheet } from 'react-native';

type Props = { label: string; color: string; size: number; active: boolean };

export default function Pad({ label, color, size, active }: Props) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.pad,
        {
          width: size,
          height: size,
          margin: 4,
          backgroundColor: color,
          opacity: active ? 1 : 0.55,
          transform: [{ scale: active ? 0.96 : 1 }],
        },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  label: { color: '#fff', fontWeight: '700', fontSize: 14 },
});