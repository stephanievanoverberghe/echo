'use client';

import { useGameStore } from '@/store/useGameStore';
import { artefacts } from '@/content/artefacts';
import ArtefactCard from './ArtefactCard';

export default function ArtefactGrid() {
    const unlockedArtefacts = useGameStore((state) => state.unlockedArtefacts);
    const discovered = artefacts.filter((artefact) => unlockedArtefacts.includes(artefact.id));

    return (
        <main
            className="flex flex-1 flex-col items-center px-6 py-16"
            id="contenu-principal"
            tabIndex={-1}
        >
            <h1 className="text-[length:var(--fs-600)] mb-8">Artefacts</h1>

            {discovered.length === 0 ? (
                <p className="text-[color:var(--color-text-muted)]">
                    Rien n’a encore été découvert.
                </p>
            ) : (
                <ul className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
                    {discovered.map((artefact) => (
                        <li key={artefact.id}>
                            <ArtefactCard artefact={artefact} />
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
