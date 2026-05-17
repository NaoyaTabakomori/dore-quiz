import type { GameMode } from '../types/game';

const questionAudio = (id: string) => `/assets/audio/questions/${id}.wav`;

export const AUDIO_PATHS = {
  bgm: '/assets/audio/bgm.wav',
  correct: '/assets/audio/correct.wav',
  wrong: '/assets/audio/wrong-voice.wav',
} as const;

export const gameModes: GameMode[] = [
  {
    id: 'fruits',
    label: '果物',
    emoji: '🍎',
    items: [
      { id: 'apple', label: 'りんご', emoji: '🍎', imageUrl: '/assets/images/fruits/apple.png', audioUrl: questionAudio('apple') },
      { id: 'banana', label: 'バナナ', emoji: '🍌', imageUrl: '/assets/images/fruits/banana.png', audioUrl: questionAudio('banana') },
      { id: 'orange', label: 'みかん', emoji: '🍊', imageUrl: '/assets/images/fruits/orange.png', audioUrl: questionAudio('orange') },
      { id: 'grape', label: 'ぶどう', emoji: '🍇', imageUrl: '/assets/images/fruits/grape.png', audioUrl: questionAudio('grape') },
      { id: 'strawberry', label: 'いちご', emoji: '🍓', imageUrl: '/assets/images/fruits/strawberry.png', audioUrl: questionAudio('strawberry') },
      { id: 'melon', label: 'メロン', emoji: '🍈', imageUrl: '/assets/images/fruits/melon.png', audioUrl: questionAudio('melon') },
      { id: 'watermelon', label: 'すいか', emoji: '🍉', imageUrl: '/assets/images/fruits/watermelon.png', audioUrl: questionAudio('watermelon') },
      { id: 'peach', label: 'もも', emoji: '🍑', imageUrl: '/assets/images/fruits/peach.png', audioUrl: questionAudio('peach') },
      { id: 'pineapple', label: 'パイナップル', emoji: '🍍', imageUrl: '/assets/images/fruits/pineapple.png', audioUrl: questionAudio('pineapple') },
      { id: 'pear', label: 'なし', emoji: '🍐', imageUrl: '/assets/images/fruits/pear.png', audioUrl: questionAudio('pear') },
    ],
  },
  {
    id: 'animals',
    label: '動物',
    emoji: '🦁',
    items: [
      { id: 'zebra', label: 'シマウマ', emoji: '🦓', imageUrl: '/assets/images/animals/zebra.png', audioUrl: questionAudio('zebra') },
      { id: 'lion', label: 'ライオン', emoji: '🦁', imageUrl: '/assets/images/animals/lion.png', audioUrl: questionAudio('lion') },
      { id: 'giraffe', label: 'キリン', emoji: '🦒', imageUrl: '/assets/images/animals/giraffe.png', audioUrl: questionAudio('giraffe') },
      { id: 'elephant', label: 'ゾウ', emoji: '🐘', imageUrl: '/assets/images/animals/elephant.png', audioUrl: questionAudio('elephant') },
      { id: 'panda', label: 'パンダ', emoji: '🐼', imageUrl: '/assets/images/animals/panda.png', audioUrl: questionAudio('panda') },
      { id: 'hippo', label: 'カバ', emoji: '🦛', imageUrl: '/assets/images/animals/hippo.png', audioUrl: questionAudio('hippo') },
      { id: 'rabbit', label: 'ウサギ', emoji: '🐰', imageUrl: '/assets/images/animals/rabbit.png', audioUrl: questionAudio('rabbit') },
      { id: 'dog', label: 'イヌ', emoji: '🐶', imageUrl: '/assets/images/animals/dog.png', audioUrl: questionAudio('dog') },
      { id: 'cat', label: 'ネコ', emoji: '🐱', imageUrl: '/assets/images/animals/cat.png', audioUrl: questionAudio('cat') },
      { id: 'penguin', label: 'ペンギン', emoji: '🐧', imageUrl: '/assets/images/animals/penguin.png', audioUrl: questionAudio('penguin') },
    ],
  },
  {
    id: 'vegetables',
    label: '野菜',
    emoji: '🥕',
    items: [
      { id: 'carrot', label: 'にんじん', emoji: '🥕', imageUrl: '/assets/images/vegetables/carrot.png', audioUrl: questionAudio('carrot') },
      { id: 'tomato', label: 'トマト', emoji: '🍅', imageUrl: '/assets/images/vegetables/tomato.png', audioUrl: questionAudio('tomato') },
      { id: 'cucumber', label: 'きゅうり', emoji: '🥒', imageUrl: '/assets/images/vegetables/cucumber.png', audioUrl: questionAudio('cucumber') },
      { id: 'potato', label: 'じゃがいも', emoji: '🥔', imageUrl: '/assets/images/vegetables/potato.png', audioUrl: questionAudio('potato') },
      { id: 'onion', label: 'たまねぎ', emoji: '🧅', imageUrl: '/assets/images/vegetables/onion.png', audioUrl: questionAudio('onion') },
      { id: 'pumpkin', label: 'かぼちゃ', emoji: '🎃', imageUrl: '/assets/images/vegetables/pumpkin.png', audioUrl: questionAudio('pumpkin') },
      { id: 'eggplant', label: 'なす', emoji: '🍆', imageUrl: '/assets/images/vegetables/eggplant.png', audioUrl: questionAudio('eggplant') },
      { id: 'cabbage', label: 'キャベツ', emoji: '🥬', imageUrl: '/assets/images/vegetables/cabbage.png', audioUrl: questionAudio('cabbage') },
      { id: 'corn', label: 'とうもろこし', emoji: '🌽', imageUrl: '/assets/images/vegetables/corn.png', audioUrl: questionAudio('corn') },
      { id: 'broccoli', label: 'ブロッコリー', emoji: '🥦', imageUrl: '/assets/images/vegetables/broccoli.png', audioUrl: questionAudio('broccoli') },
    ],
  },
];
