import { createAudioPlayer, AudioPlayer } from 'expo-audio';

// Index = pad number (matches the grid, left to right, top to bottom).
// null = no sound assigned yet.
const SOURCES = [
  require('../../assets/sounds/Kick.wav'),             // 0  Kick
  require('../../assets/sounds/Snare.wav'),            // 1  Snare
  null,                                                // 2  Clap
  null,                                                // 3  Rim
  require('../../assets/sounds/HiHat Closed.wav'),     // 4  Hat C
  require('../../assets/sounds/HiHat Open.wav'),       // 5  Hat O
  require('../../assets/sounds/Crash Cymbal.wav'),     // 6  Crash
  null,                                                // 7  Ride
  null, null, null, null,                              // 8-11  Toms
  null, null, null, null,                              // 12-15 Perc/FX
];

const players: (AudioPlayer | null)[] = SOURCES.map((src) =>
  src ? createAudioPlayer(src) : null
);

export function playPad(index: number) {
  const player = players[index];
  if (!player) return;
  player.seekTo(0);
  player.play();
}