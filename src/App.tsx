import { useCallback, useEffect, useState } from 'react';
import { ClearScreen } from './components/ClearScreen';
import { CountdownScreen } from './components/CountdownScreen';
import { GameScreen } from './components/GameScreen';
import { TitleScreen } from './components/TitleScreen';
import { AUDIO_PATHS, gameModes } from './data/gameModes';
import { useAudio } from './hooks/useAudio';
import type { GameItem, GameMode, Question, ScreenState } from './types/game';
import { TOTAL_QUESTIONS, createQuestion, getElapsedSeconds } from './utils/game';

const COUNTDOWN_STEPS = ['3', '2', '1', 'スタート！'];

function App() {
  const [screen, setScreen] = useState<ScreenState>('title');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [clearSeconds, setClearSeconds] = useState(0);
  const [countdownIndex, setCountdownIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const { isBgmPlaying, startBgm, stopBgm, playCorrect, playWrong, playQuestion } = useAudio(
    AUDIO_PATHS.bgm,
    AUDIO_PATHS.correct,
    AUDIO_PATHS.wrong,
  );

  const buildQuestion = useCallback((mode: GameMode, previousAnswerId?: string) => {
    const nextQuestion = createQuestion(mode, previousAnswerId);
    setQuestion(nextQuestion);
    window.setTimeout(() => playQuestion(nextQuestion.answer.audioUrl), 250);
  }, [playQuestion]);

  const startCountdown = useCallback((mode: GameMode) => {
    setSelectedMode(mode);
    setCorrectCount(0);
    setElapsedSeconds(0);
    setClearSeconds(0);
    setFeedback(null);
    setQuestion(null);
    setCountdownIndex(0);
    setStartedAt(null);
    setScreen('countdown');
    void startBgm();
  }, [startBgm]);

  const startGame = useCallback(() => {
    if (!selectedMode) {
      return;
    }

    setCorrectCount(0);
    setStartedAt(Date.now());
    setElapsedSeconds(0);
    buildQuestion(selectedMode);
    setScreen('playing');
  }, [buildQuestion, selectedMode]);

  const replay = useCallback(() => {
    if (selectedMode) {
      startCountdown(selectedMode);
      return;
    }

    setScreen('title');
  }, [selectedMode, startCountdown]);

  const backToTitle = useCallback(() => {
    stopBgm();
    setScreen('title');
    setSelectedMode(null);
    setQuestion(null);
    setStartedAt(null);
    setCorrectCount(0);
    setElapsedSeconds(0);
    setFeedback(null);
  }, [stopBgm]);

  const handleSelectChoice = useCallback((item: GameItem) => {
    if (!question || !selectedMode || screen !== 'playing') {
      return;
    }

    if (item.id !== question.answer.id) {
      setFeedback('wrong');
      playWrong();
      window.setTimeout(() => setFeedback(null), 900);
      return;
    }

    playCorrect();
    setFeedback('correct');

    const nextCorrectCount = correctCount + 1;
    if (nextCorrectCount >= TOTAL_QUESTIONS) {
      const finalSeconds = getElapsedSeconds(startedAt);
      setCorrectCount(nextCorrectCount);
      setClearSeconds(finalSeconds);
      window.setTimeout(() => {
        stopBgm();
        setScreen('cleared');
        setFeedback(null);
      }, 650);
      return;
    }

    setCorrectCount(nextCorrectCount);
    window.setTimeout(() => {
      buildQuestion(selectedMode, question.answer.id);
      setFeedback(null);
    }, 650);
  }, [buildQuestion, correctCount, playCorrect, playWrong, question, screen, selectedMode, startedAt, stopBgm]);

  useEffect(() => {
    if (screen !== 'countdown') {
      return undefined;
    }

    if (countdownIndex >= COUNTDOWN_STEPS.length - 1) {
      const timerId = window.setTimeout(startGame, 800);
      return () => window.clearTimeout(timerId);
    }

    const timerId = window.setTimeout(() => setCountdownIndex((current) => current + 1), 800);
    return () => window.clearTimeout(timerId);
  }, [countdownIndex, screen, startGame]);

  useEffect(() => {
    if (screen !== 'playing' || !startedAt) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setElapsedSeconds(getElapsedSeconds(startedAt));
    }, 300);

    return () => window.clearInterval(timerId);
  }, [screen, startedAt]);

  if (screen === 'title') {
    return <TitleScreen modes={gameModes} onSelectMode={startCountdown} />;
  }

  if (screen === 'countdown') {
    return <CountdownScreen label={COUNTDOWN_STEPS[countdownIndex]} />;
  }

  if (screen === 'playing' && question) {
    return (
      <GameScreen
        question={question}
        correctCount={correctCount}
        elapsedSeconds={elapsedSeconds}
        feedback={feedback}
        isBgmPlaying={isBgmPlaying}
        onSelectChoice={handleSelectChoice}
      />
    );
  }

  if (screen === 'cleared') {
    return <ClearScreen clearSeconds={clearSeconds} onReplay={replay} onBackToTitle={backToTitle} />;
  }

  return <TitleScreen modes={gameModes} onSelectMode={startCountdown} />;
}

export default App;
