import type { Choice } from '@/domain/game/types';
import { useGameStore } from '@/store/useGameStore';

export default function ChoiceButton({ choice }: { choice: Choice }) {
    const selectChoice = useGameStore((state) => state.selectChoice);

    return (
        <button
            type="button"
            onClick={() => selectChoice(choice.id)}
            className="rounded-full border px-4 py-2 text-[color:var(--color-text)] transition-colors"
            style={{ borderColor: 'var(--color-border)' }}
        >
            {choice.label}
        </button>
    );
}
