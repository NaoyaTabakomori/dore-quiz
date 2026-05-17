import { ChoiceCard } from './ChoiceCard';
import type { GameItem, Question } from '../types/game';
import { TOTAL_QUESTIONS, formatTime } from '../utils/game';

type Feedback = 'correct' | 'wrong' | null;

type GameScreenProps = {
  question: Question;
  correctCount: number;
  elapsedSeconds: number;
  feedback: Feedback;
  isAcceptingInput: boolean;
  isBgmPlaying: boolean;
  onSelectChoice: (item: GameItem) => void;
};

export function GameScreen({ question, correctCount, elapsedSeconds, feedback, isAcceptingInput, isBgmPlaying, onSelectChoice }: GameScreenProps) {
  const questionNumber = Math.min(correctCount + 1, TOTAL_QUESTIONS);

  return (
    <main className="screen game-screen">
      <header className="game-header">
        <div className="game-stats" aria-label="ゲームの状態">
          <span>{questionNumber} / {TOTAL_QUESTIONS}問</span>
          <span>正解 {correctCount}</span>
          <span>{formatTime(elapsedSeconds)}</span>
          <span className={isBgmPlaying ? 'sound-on' : 'sound-off'}>{isBgmPlaying ? '♪' : '音なし'}</span>
        </div>
        <h1>{question.answer.label}はどれ？</h1>
      </header>

      <div className="feedback-space" aria-live="polite">
        {feedback === 'correct' && <div className="feedback correct-feedback">やったね！</div>}
        {feedback === 'wrong' && <div className="feedback wrong-feedback">ちがうよ、もういちど！</div>}
      </div>

      <section className="choices-grid" aria-label="選択肢">
        {question.choices.map((item) => (
          <ChoiceCard item={item} isDisabled={!isAcceptingInput} key={item.id} onSelect={onSelectChoice} />
        ))}
      </section>
    </main>
  );
}
