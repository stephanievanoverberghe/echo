'use client';

import { useGameStore } from '@/store/useGameStore';
import { getSceneById } from '@/lib/game/getSceneById';
import SceneText from './SceneText';
import ChoiceList from './ChoiceList';

export default function SceneView() {
    const currentSceneId = useGameStore((state) => state.currentSceneId);
    const unlockedFragments = useGameStore((state) => state.unlockedFragments);
    const unlockedArtefacts = useGameStore((state) => state.unlockedArtefacts);
    const revealedZones = useGameStore((state) => state.revealedZones);
    const flags = useGameStore((state) => state.flags);
    const resetGame = useGameStore((state) => state.resetGame);

    const scene = getSceneById(currentSceneId);
    if (!scene) return null;

    const isEnding = scene.choices.length === 0;

    return (
        <main
            className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
            id="contenu-principal"
            tabIndex={-1}
        >
            <SceneText scene={scene} />
            <ChoiceList choices={scene.choices} />

            {isEnding && (
                <div className="mt-8 max-w-xl text-[length:var(--fs-300)] text-[color:var(--color-text-muted)]">
                    <p>
                        Parcours : {unlockedFragments.length} fragment(s), {unlockedArtefacts.length} artefact(s),{' '}
                        {revealedZones.length} zone(s) révélée(s)
                        {flags.contact !== undefined && (flags.contact ? ' — tu as touché la surface.' : ' — tu as reculé.')}
                    </p>
                    <button
                        type="button"
                        onClick={resetGame}
                        className="mt-4 rounded-full border px-4 py-2 text-[color:var(--color-text)]"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        Recommencer
                    </button>
                </div>
            )}
        </main>
    );
}
