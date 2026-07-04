'use client';

import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/useGameStore';
import { getSceneById } from '@/lib/game/getSceneById';
import SceneText from '@/components/game/SceneText';

export default function TracePage() {
    const router = useRouter();
    const unlockedFragments = useGameStore((state) => state.unlockedFragments);
    const unlockedArtefacts = useGameStore((state) => state.unlockedArtefacts);
    const revealedZones = useGameStore((state) => state.revealedZones);
    const flags = useGameStore((state) => state.flags);
    const resetGame = useGameStore((state) => state.resetGame);

    const scene = getSceneById('trace');
    if (!scene) return null;

    const handleReset = () => {
        resetGame();
        router.push('/');
    };

    return (
        <main
            className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
            id="contenu-principal"
            tabIndex={-1}
        >
            <SceneText scene={scene} />

            <div className="mt-8 max-w-xl text-[length:var(--fs-300)] text-[color:var(--color-text-muted)]">
                <p>
                    Parcours : {unlockedFragments.length} fragment(s), {unlockedArtefacts.length} artefact(s),{' '}
                    {revealedZones.length} zone(s) révélée(s)
                    {flags.contact !== undefined && (flags.contact ? ' — tu as touché la surface.' : ' — tu as reculé.')}
                </p>
                <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 rounded-full border px-4 py-2 text-[color:var(--color-text)]"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    Recommencer
                </button>
            </div>
        </main>
    );
}
