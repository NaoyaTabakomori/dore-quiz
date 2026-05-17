import type { GameMode } from '../types/game';

type TitleScreenProps = {
  modes: GameMode[];
  onSelectMode: (mode: GameMode) => void;
};

export function TitleScreen({ modes, onSelectMode }: TitleScreenProps) {
  return (
    <main className="screen title-screen">
      <section className="title-hero" aria-labelledby="app-title">
        <p className="title-kicker">みつけて タップ！</p>
        <h1 id="app-title">もの当てゲーム</h1>
      </section>

      <div className="mode-grid" aria-label="ゲームモード">
        {modes.map((mode) => (
          <button className={`mode-button mode-${mode.id}`} key={mode.id} type="button" onClick={() => onSelectMode(mode)}>
            <span className="mode-emoji" aria-hidden="true">{mode.emoji}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
