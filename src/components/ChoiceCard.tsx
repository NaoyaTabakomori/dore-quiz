import { useState } from 'react';
import type { GameItem } from '../types/game';

type ChoiceCardProps = {
  item: GameItem;
  isDisabled?: boolean;
  onSelect: (item: GameItem) => void;
};

export function ChoiceCard({ item, isDisabled, onSelect }: ChoiceCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const handlePointerDown = () => {
    if (isDisabled) {
      return;
    }

    onSelect(item);
  };

  return (
    <button
      className="choice-card"
      type="button"
      disabled={isDisabled}
      onClick={(event) => event.preventDefault()}
      onPointerDown={handlePointerDown}
    >
      <span className="choice-picture" aria-hidden="true">
        {!hasImageError ? (
          <img src={item.imageUrl} alt="" onError={() => setHasImageError(true)} draggable="false" />
        ) : (
          <span className="choice-fallback">{item.emoji ?? '？'}</span>
        )}
      </span>
      <span className="choice-label">{item.label}</span>
    </button>
  );
}
