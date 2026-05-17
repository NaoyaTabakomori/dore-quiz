import { formatTime } from '../utils/game';

type ClearScreenProps = {
  clearSeconds: number;
  onReplay: () => void;
  onBackToTitle: () => void;
};

export function ClearScreen({ clearSeconds, onReplay, onBackToTitle }: ClearScreenProps) {
  return (
    <main className="screen clear-screen">
      <section className="clear-panel" aria-labelledby="clear-title">
        <div className="clear-emoji" aria-hidden="true">🎉</div>
        <h1 id="clear-title">クリア！</h1>
        <p className="clear-time">じかん: {formatTime(clearSeconds)}</p>
        <div className="clear-actions">
          <button className="primary-action" type="button" onClick={onReplay}>もう一度遊ぶ</button>
          <button className="secondary-action" type="button" onClick={onBackToTitle}>タイトルに戻る</button>
        </div>
      </section>
    </main>
  );
}
