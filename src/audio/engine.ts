import { createAudioPlayer, AudioPlayer } from 'expo-audio';

// Index = pad number (matches the grid, left to right, top to bottom).
// null = no sound assigned yet.
const SOURCES = [
  require('../../assets/sounds/Kick 808.mp3'),             // 0  Kick
  require('../../assets/sounds/Snare.wav'),            // 1  Snare
  require('../../assets/sounds/dry-808-clap.wav'),                                                // 2  Clap
  require('../../assets/sounds/snare-rim-808-mafia.wav'),  //  Rim
  require('../../assets/sounds/HiHat Closed.wav'),     // 4  Hat C
  require('../../assets/sounds/HiHat Open.wav'),       // 5  Hat O
  require('../../assets/sounds/Crash Cymbal.wav'),     // 6  Crash
  require('../../assets/sounds/smooth-808-ride.wav'),                                                // 7  Ride
  null, null, null, null,                              // 8-11  Toms
  require('../../assets/sounds/machine-gun-01.wav'),       // 12 SFX1
  require('../../assets/sounds/woman-scream-02.wav'),      // 13 SFX2
  null, null,                                              // 14-15                              // 12-15 Perc/FX
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