import { execFile } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const sampleRate = 44100;
const audioRoot = new URL('../public/assets/audio/', import.meta.url);
const questionRoot = new URL('../public/assets/audio/questions/', import.meta.url);
const tmpRoot = new URL('../public/assets/audio/.tmp/', import.meta.url);

const items = [
  ['apple', 'りんご'],
  ['banana', 'バナナ'],
  ['orange', 'みかん'],
  ['grape', 'ぶどう'],
  ['strawberry', 'いちご'],
  ['melon', 'メロン'],
  ['watermelon', 'すいか'],
  ['peach', 'もも'],
  ['pineapple', 'パイナップル'],
  ['pear', 'なし'],
  ['zebra', 'シマウマ'],
  ['lion', 'ライオン'],
  ['giraffe', 'キリン'],
  ['elephant', 'ゾウ'],
  ['panda', 'パンダ'],
  ['hippo', 'カバ'],
  ['rabbit', 'ウサギ'],
  ['dog', 'イヌ'],
  ['cat', 'ネコ'],
  ['penguin', 'ペンギン'],
  ['carrot', 'にんじん'],
  ['tomato', 'トマト'],
  ['cucumber', 'きゅうり'],
  ['potato', 'じゃがいも'],
  ['onion', 'たまねぎ'],
  ['pumpkin', 'かぼちゃ'],
  ['eggplant', 'なす'],
  ['cabbage', 'キャベツ'],
  ['corn', 'とうもろこし'],
  ['broccoli', 'ブロッコリー'],
  ['curry-rice', 'カレー'],
  ['omurice', 'オムライス'],
  ['hamburg-steak', 'ハンバーグ'],
  ['spaghetti', 'スパゲッティ'],
  ['pizza', 'ピザ'],
  ['onigiri', 'おにぎり'],
  ['sandwich', 'サンドイッチ'],
  ['udon', 'うどん'],
  ['ramen', 'ラーメン'],
  ['takoyaki', 'たこ焼き'],
];

function wavBuffer(samples) {
  const bytesPerSample = 2;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * bytesPerSample, 28);
  buffer.writeUInt16LE(bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  samples.forEach((sample, index) => {
    const clamped = Math.max(-1, Math.min(1, sample));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + index * bytesPerSample);
  });

  return buffer;
}

function envelope(position, length, attack = 0.015, release = 0.08) {
  const time = position / sampleRate;
  const duration = length / sampleRate;
  const attackGain = Math.min(1, time / attack);
  const releaseGain = Math.min(1, (duration - time) / release);
  return Math.max(0, Math.min(attackGain, releaseGain));
}

function tone(frequencies, seconds, volume = 0.4) {
  const length = Math.floor(seconds * sampleRate);
  return Array.from({ length }, (_, index) => {
    const gain = envelope(index, length);
    const mixed = frequencies.reduce((sum, frequency) => {
      return sum + Math.sin((2 * Math.PI * frequency * index) / sampleRate);
    }, 0) / frequencies.length;
    return mixed * gain * volume;
  });
}

async function writeWav(path, samples) {
  await writeFile(path, wavBuffer(samples));
}

async function createBgm() {
  const melody = [
    [523.25, 659.25, 783.99],
    [587.33, 739.99, 880.0],
    [659.25, 783.99, 987.77],
    [783.99, 987.77, 1174.66],
    [698.46, 880.0, 1046.5],
    [659.25, 783.99, 987.77],
    [587.33, 739.99, 880.0],
    [523.25, 659.25, 783.99],
  ];
  const samples = melody.flatMap((chord) => tone(chord, 0.46, 0.23));
  await writeWav(new URL('bgm.wav', audioRoot), samples);
}

async function createEffect(path, notes) {
  const samples = notes.flatMap(([frequency, seconds, volume]) => tone([frequency], seconds, volume));
  await writeWav(new URL(path, audioRoot), samples);
}

async function sayToWav(text, outputUrl, rate = '175') {
  const tmpAiff = new URL(`${crypto.randomUUID()}.aiff`, tmpRoot);
  await execFileAsync('say', ['-v', 'Kyoko', '-r', rate, '-o', tmpAiff.pathname, text]);
  await execFileAsync('afconvert', ['-f', 'WAVE', '-d', 'LEI16', tmpAiff.pathname, outputUrl.pathname]);
  await rm(tmpAiff, { force: true });
}

await mkdir(audioRoot, { recursive: true });
await mkdir(questionRoot, { recursive: true });
await rm(tmpRoot, { recursive: true, force: true });
await mkdir(tmpRoot, { recursive: true });
await rm(new URL('test.m4a', audioRoot), { force: true });
await rm(new URL('test.aiff', audioRoot), { force: true });
await rm(new URL('test.wav', audioRoot), { force: true });
await rm(new URL('test2.aiff', audioRoot), { force: true });
await rm(new URL('.DS_Store', audioRoot), { force: true });
await rm(new URL('correct-voice.m4a', audioRoot), { force: true });
await rm(new URL('wrong-voice.m4a', audioRoot), { force: true });

await createBgm();
await createEffect('correct.wav', [
  [659.25, 0.12, 0.45],
  [783.99, 0.12, 0.45],
  [1046.5, 0.26, 0.42],
]);
await createEffect('wrong.wav', [
  [392.0, 0.15, 0.34],
  [329.63, 0.22, 0.34],
]);

await sayToWav('やったね！', new URL('correct-voice.wav', audioRoot), '185');
await sayToWav('違うよ！', new URL('wrong-voice.wav', audioRoot), '175');

for (const [id, label] of items) {
  await rm(new URL(`${id}.m4a`, questionRoot), { force: true });
  await sayToWav(`${label}はどれ？`, new URL(`${id}.wav`, questionRoot), '170');
}

await rm(tmpRoot, { recursive: true, force: true });

console.log(`Generated ${items.length + 5} audio files.`);
