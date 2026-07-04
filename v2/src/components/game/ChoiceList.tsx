import type { Choice } from '@/domain/game/types';
import ChoiceButton from './ChoiceButton';

export default function ChoiceList({ choices }: { choices: Choice[] }) {
    if (!choices.length) return null;

    return (
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {choices.map((choice) => (
                <li key={choice.id}>
                    <ChoiceButton choice={choice} />
                </li>
            ))}
        </ul>
    );
}
