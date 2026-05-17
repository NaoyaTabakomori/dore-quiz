import type { GameItem, GameMode, Question } from '../types/game';

export const TOTAL_QUESTIONS = 10;
export const CHOICE_COUNT = 6;

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

export function createQuestion(mode: GameMode, previousAnswerId?: string): Question {
  if (mode.items.length < CHOICE_COUNT) {
    console.warn(`Mode "${mode.id}" needs at least ${CHOICE_COUNT} items.`);
  }

  const answerCandidates = mode.items.filter((item) => item.id !== previousAnswerId);
  const answerPool = answerCandidates.length > 0 ? answerCandidates : mode.items;
  const answer = shuffle(answerPool)[0];
  const wrongChoices = shuffle(mode.items.filter((item) => item.id !== answer.id)).slice(0, CHOICE_COUNT - 1);
  const fallbackChoices = mode.items.filter((item) => item.id === answer.id || wrongChoices.some((choice) => choice.id === item.id));
  const choices = shuffle([answer, ...wrongChoices]).slice(0, CHOICE_COUNT);

  return {
    answer,
    choices: choices.length === CHOICE_COUNT ? choices : shuffle(fallbackChoices),
  };
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  if (minutes === 0) {
    return `${restSeconds}秒`;
  }

  return `${minutes}分${String(restSeconds).padStart(2, '0')}秒`;
}

export function getElapsedSeconds(startedAt: number | null): number {
  if (!startedAt) {
    return 0;
  }

  return Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
}
