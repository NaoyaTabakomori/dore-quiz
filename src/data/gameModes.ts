import type { GameMode } from '../types/game';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const imageAsset = (path: string) => publicAsset(`assets/images/${path}`);
const questionAudio = (id: string) => publicAsset(`assets/audio/questions/${id}.wav`);

export const AUDIO_PATHS = {
  bgm: publicAsset('assets/audio/bgm.wav'),
  correct: publicAsset('assets/audio/correct.wav'),
  wrong: publicAsset('assets/audio/wrong-voice.wav'),
} as const;

export const gameModes: GameMode[] = [
  {
    id: 'fruits',
    label: '果物',
    emoji: '🍎',
    items: [
      { id: 'apple', label: 'りんご', emoji: '🍎', imageUrl: imageAsset('fruits/apple.png'), audioUrl: questionAudio('apple') },
      { id: 'banana', label: 'バナナ', emoji: '🍌', imageUrl: imageAsset('fruits/banana.png'), audioUrl: questionAudio('banana') },
      { id: 'orange', label: 'みかん', emoji: '🍊', imageUrl: imageAsset('fruits/orange.png'), audioUrl: questionAudio('orange') },
      { id: 'grape', label: 'ぶどう', emoji: '🍇', imageUrl: imageAsset('fruits/grape.png'), audioUrl: questionAudio('grape') },
      { id: 'strawberry', label: 'いちご', emoji: '🍓', imageUrl: imageAsset('fruits/strawberry.png'), audioUrl: questionAudio('strawberry') },
      { id: 'melon', label: 'メロン', emoji: '🍈', imageUrl: imageAsset('fruits/melon.png'), audioUrl: questionAudio('melon') },
      { id: 'watermelon', label: 'すいか', emoji: '🍉', imageUrl: imageAsset('fruits/watermelon.png'), audioUrl: questionAudio('watermelon') },
      { id: 'peach', label: 'もも', emoji: '🍑', imageUrl: imageAsset('fruits/peach.png'), audioUrl: questionAudio('peach') },
      { id: 'pineapple', label: 'パイナップル', emoji: '🍍', imageUrl: imageAsset('fruits/pineapple.png'), audioUrl: questionAudio('pineapple') },
      { id: 'pear', label: 'なし', emoji: '🍐', imageUrl: imageAsset('fruits/pear.png'), audioUrl: questionAudio('pear') },
    ],
  },
  {
    id: 'animals',
    label: '動物',
    emoji: '🦁',
    items: [
      { id: 'zebra', label: 'シマウマ', emoji: '🦓', imageUrl: imageAsset('animals/zebra.png'), audioUrl: questionAudio('zebra') },
      { id: 'lion', label: 'ライオン', emoji: '🦁', imageUrl: imageAsset('animals/lion.png'), audioUrl: questionAudio('lion') },
      { id: 'giraffe', label: 'キリン', emoji: '🦒', imageUrl: imageAsset('animals/giraffe.png'), audioUrl: questionAudio('giraffe') },
      { id: 'elephant', label: 'ゾウ', emoji: '🐘', imageUrl: imageAsset('animals/elephant.png'), audioUrl: questionAudio('elephant') },
      { id: 'panda', label: 'パンダ', emoji: '🐼', imageUrl: imageAsset('animals/panda.png'), audioUrl: questionAudio('panda') },
      { id: 'hippo', label: 'カバ', emoji: '🦛', imageUrl: imageAsset('animals/hippo.png'), audioUrl: questionAudio('hippo') },
      { id: 'rabbit', label: 'ウサギ', emoji: '🐰', imageUrl: imageAsset('animals/rabbit.png'), audioUrl: questionAudio('rabbit') },
      { id: 'dog', label: 'イヌ', emoji: '🐶', imageUrl: imageAsset('animals/dog.png'), audioUrl: questionAudio('dog') },
      { id: 'cat', label: 'ネコ', emoji: '🐱', imageUrl: imageAsset('animals/cat.png'), audioUrl: questionAudio('cat') },
      { id: 'penguin', label: 'ペンギン', emoji: '🐧', imageUrl: imageAsset('animals/penguin.png'), audioUrl: questionAudio('penguin') },
    ],
  },
  {
    id: 'vegetables',
    label: '野菜',
    emoji: '🥕',
    items: [
      { id: 'carrot', label: 'にんじん', emoji: '🥕', imageUrl: imageAsset('vegetables/carrot.png'), audioUrl: questionAudio('carrot') },
      { id: 'tomato', label: 'トマト', emoji: '🍅', imageUrl: imageAsset('vegetables/tomato.png'), audioUrl: questionAudio('tomato') },
      { id: 'cucumber', label: 'きゅうり', emoji: '🥒', imageUrl: imageAsset('vegetables/cucumber.png'), audioUrl: questionAudio('cucumber') },
      { id: 'potato', label: 'じゃがいも', emoji: '🥔', imageUrl: imageAsset('vegetables/potato.png'), audioUrl: questionAudio('potato') },
      { id: 'onion', label: 'たまねぎ', emoji: '🧅', imageUrl: imageAsset('vegetables/onion.png'), audioUrl: questionAudio('onion') },
      { id: 'pumpkin', label: 'かぼちゃ', emoji: '🎃', imageUrl: imageAsset('vegetables/pumpkin.png'), audioUrl: questionAudio('pumpkin') },
      { id: 'eggplant', label: 'なす', emoji: '🍆', imageUrl: imageAsset('vegetables/eggplant.png'), audioUrl: questionAudio('eggplant') },
      { id: 'cabbage', label: 'キャベツ', emoji: '🥬', imageUrl: imageAsset('vegetables/cabbage.png'), audioUrl: questionAudio('cabbage') },
      { id: 'corn', label: 'とうもろこし', emoji: '🌽', imageUrl: imageAsset('vegetables/corn.png'), audioUrl: questionAudio('corn') },
      { id: 'broccoli', label: 'ブロッコリー', emoji: '🥦', imageUrl: imageAsset('vegetables/broccoli.png'), audioUrl: questionAudio('broccoli') },
    ],
  },
];
