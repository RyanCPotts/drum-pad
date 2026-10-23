import { useRef, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, GestureResponderEvent } from 'react-native';
import Pad from './Pad';

const COLS = 4;
const PADS = [
  { label: 'Kick', color: '#e63946' },   { label: 'Snare', color: '#e63946' },
  { label: 'Clap', color: '#e63946' },   { label: 'Rim', color: '#e63946' },
  { label: 'Hat C', color: '#f4a261' },  { label: 'Hat O', color: '#f4a261' },
  { label: 'Crash', color: '#f4a261' },  { label: 'Ride', color: '#f4a261' },
  { label: 'Tom 1', color: '#2a9d8f' },  { label: 'Tom 2', color: '#2a9d8f' },
  { label: 'Tom 3', color: '#2a9d8f' },  { label: 'Tom 4', color: '#2a9d8f' },
  { label: 'Perc 1', color: '#6a4c93' }, { label: 'Perc 2', color: '#6a4c93' },
  { label: 'FX 1', color: '#6a4c93' },   { label: 'FX 2', color: '#6a4c93' },
];

type Props = { onHit?: (index: number) => void };

export default function PadGrid({ onHit }: Props) {
  const { width } = useWindowDimensions();
  const cell = Math.floor((width - 16) / COLS);
  const touches = useRef(new Map<number, number>()); // touch id -> pad index
  const [active, setActive] = useState<Set<number>>(new Set());

  const padAt = (x: number, y: number) => {
    const col = Math.floor(x / cell);
    const row = Math.floor(y / cell);
    if (col < 0 || col >= COLS || row < 0 || row >= PADS.length / COLS) return -1;
    return row * COLS + col;
  };

  const sync = () => setActive(new Set(touches.current.values()));

  const start = (e: GestureResponderEvent) => {
    for (const t of e.nativeEvent.changedTouches) {
      const idx = padAt(t.locationX, t.locationY);
      if (idx >= 0) {
        touches.current.set(t.identifier, idx);
        onHit?.(idx);
      }
    }
    sync();
  };

  const end = (e: GestureResponderEvent) => {
    for (const t of e.nativeEvent.changedTouches) touches.current.delete(t.identifier);
    sync();
  };

  return (
    <View
      style={[styles.grid, { width: cell * COLS }]}
      onTouchStart={start}
      onTouchEnd={end}
      onTouchCancel={end}
    >
      {PADS.map((p, i) => (
        <Pad key={p.label} label={p.label} color={p.color} size={cell - 8} active={active.has(i)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
});