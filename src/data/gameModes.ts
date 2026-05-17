import type { GameMode } from '../types/game';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const imageAsset = (path: string) => publicAsset(`assets/images/${path}`);
const questionAudio = (id: string) => publicAsset(`assets/audio/questions/${id}.wav`);

export const AUDIO_PATHS = {
  bgm: publicAsset('assets/audio/bgm.wav'),
  correct: publicAsset('assets/audio/correct.m4a'),
  wrong: publicAsset('assets/audio/wrong.m4a'),
} as const;

export const gameModes: GameMode[] = [
  {
    id: 'fruits',
    label: '果物',
    items: [
      { id: 'apple', label: 'りんご', imageUrl: imageAsset('fruits/apple.jpg'), audioUrl: questionAudio('apple') },
      { id: 'banana', label: 'バナナ', imageUrl: imageAsset('fruits/banana.jpg'), audioUrl: questionAudio('banana') },
      { id: 'orange', label: 'みかん', imageUrl: imageAsset('fruits/orange.jpg'), audioUrl: questionAudio('orange') },
      { id: 'grape', label: 'ぶどう', imageUrl: imageAsset('fruits/grape.jpg'), audioUrl: questionAudio('grape') },
      { id: 'strawberry', label: 'いちご', imageUrl: imageAsset('fruits/strawberry.jpg'), audioUrl: questionAudio('strawberry') },
      { id: 'melon', label: 'メロン', imageUrl: imageAsset('fruits/melon.jpg'), audioUrl: questionAudio('melon') },
      { id: 'watermelon', label: 'すいか', imageUrl: imageAsset('fruits/watermelon.jpg'), audioUrl: questionAudio('watermelon') },
      { id: 'peach', label: 'もも', imageUrl: imageAsset('fruits/peach.jpg'), audioUrl: questionAudio('peach') },
      { id: 'pineapple', label: 'パイナップル', imageUrl: imageAsset('fruits/pineapple.jpg'), audioUrl: questionAudio('pineapple') },
      { id: 'pear', label: 'なし', imageUrl: imageAsset('fruits/pear.jpg'), audioUrl: questionAudio('pear') },
    ],
  },
  {
    id: 'animals',
    label: '動物',
    items: [
      { id: 'zebra', label: 'シマウマ', imageUrl: imageAsset('animals/zebra.jpg'), audioUrl: questionAudio('zebra') },
      { id: 'lion', label: 'ライオン', imageUrl: imageAsset('animals/lion.jpg'), audioUrl: questionAudio('lion') },
      { id: 'giraffe', label: 'キリン', imageUrl: imageAsset('animals/giraffe.jpg'), audioUrl: questionAudio('giraffe') },
      { id: 'elephant', label: 'ゾウ', imageUrl: imageAsset('animals/elephant.jpg'), audioUrl: questionAudio('elephant') },
      { id: 'panda', label: 'パンダ', imageUrl: imageAsset('animals/panda.jpg'), audioUrl: questionAudio('panda') },
      { id: 'hippo', label: 'カバ', imageUrl: imageAsset('animals/hippo.jpg'), audioUrl: questionAudio('hippo') },
      { id: 'rabbit', label: 'ウサギ', imageUrl: imageAsset('animals/rabbit.jpg'), audioUrl: questionAudio('rabbit') },
      { id: 'dog', label: 'イヌ', imageUrl: imageAsset('animals/dog.jpg'), audioUrl: questionAudio('dog') },
      { id: 'cat', label: 'ネコ', imageUrl: imageAsset('animals/cat.jpg'), audioUrl: questionAudio('cat') },
      { id: 'penguin', label: 'ペンギン', imageUrl: imageAsset('animals/penguin.jpg'), audioUrl: questionAudio('penguin') },
    ],
  },
  {
    id: 'vegetables',
    label: '野菜',
    items: [
      { id: 'carrot', label: 'にんじん', imageUrl: imageAsset('vegetables/carrot.jpg'), audioUrl: questionAudio('carrot') },
      { id: 'tomato', label: 'トマト', imageUrl: imageAsset('vegetables/tomato.jpg'), audioUrl: questionAudio('tomato') },
      { id: 'cucumber', label: 'きゅうり', imageUrl: imageAsset('vegetables/cucumber.jpg'), audioUrl: questionAudio('cucumber') },
      { id: 'potato', label: 'じゃがいも', imageUrl: imageAsset('vegetables/potato.jpg'), audioUrl: questionAudio('potato') },
      { id: 'onion', label: 'たまねぎ', imageUrl: imageAsset('vegetables/onion.jpg'), audioUrl: questionAudio('onion') },
      { id: 'pumpkin', label: 'かぼちゃ', imageUrl: imageAsset('vegetables/pumpkin.jpg'), audioUrl: questionAudio('pumpkin') },
      { id: 'eggplant', label: 'なす', imageUrl: imageAsset('vegetables/eggplant.jpg'), audioUrl: questionAudio('eggplant') },
      { id: 'cabbage', label: 'キャベツ', imageUrl: imageAsset('vegetables/cabbage.jpg'), audioUrl: questionAudio('cabbage') },
      { id: 'corn', label: 'とうもろこし', imageUrl: imageAsset('vegetables/corn.jpg'), audioUrl: questionAudio('corn') },
      { id: 'broccoli', label: 'ブロッコリー', imageUrl: imageAsset('vegetables/broccoli.jpg'), audioUrl: questionAudio('broccoli') },
    ],
  },
  {
    id: 'cooking',
    label: 'お料理',
    emoji: '🍳',
    items: [
      { id: 'curry-rice', label: 'カレー', imageUrl: imageAsset('cooking/curry-rice.jpg'), audioUrl: questionAudio('curry-rice') },
      { id: 'omurice', label: 'オムライス', imageUrl: imageAsset('cooking/omurice.jpg'), audioUrl: questionAudio('omurice') },
      { id: 'hamburg-steak', label: 'ハンバーグ', imageUrl: imageAsset('cooking/hamburg-steak.jpg'), audioUrl: questionAudio('hamburg-steak') },
      { id: 'spaghetti', label: 'スパゲッティ', imageUrl: imageAsset('cooking/spaghetti.jpg'), audioUrl: questionAudio('spaghetti') },
      { id: 'pizza', label: 'ピザ', imageUrl: imageAsset('cooking/pizza.jpg'), audioUrl: questionAudio('pizza') },
      { id: 'onigiri', label: 'おにぎり', imageUrl: imageAsset('cooking/onigiri.jpg'), audioUrl: questionAudio('onigiri') },
      { id: 'sandwich', label: 'サンドイッチ', imageUrl: imageAsset('cooking/sandwich.jpg'), audioUrl: questionAudio('sandwich') },
      { id: 'udon', label: 'うどん', imageUrl: imageAsset('cooking/udon.jpg'), audioUrl: questionAudio('udon') },
      { id: 'ramen', label: 'ラーメン', imageUrl: imageAsset('cooking/ramen.jpg'), audioUrl: questionAudio('ramen') },
      { id: 'takoyaki', label: 'たこ焼き', imageUrl: imageAsset('cooking/takoyaki.jpg'), audioUrl: questionAudio('takoyaki') },
    ],
  },
];
