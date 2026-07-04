'use client';

import { useGameStore } from '@/store/useGameStore';
import { fragments } from '@/content/fragments';

export default function JournalEntryList() {
    const unlockedFragments = useGameStore((state) => state.unlockedFragments);
    const entries = fragments.filter((fragment) => unlockedFragments.includes(fragment.id));

    return (
        <main
            className="flex flex-1 flex-col items-center px-6 py-16"
            id="contenu-principal"
            tabIndex={-1}
        >
            <h1 className="text-[length:var(--fs-600)] mb-8">Journal</h1>

            {entries.length === 0 ? (
                <p className="text-[color:var(--color-text-muted)]">
                    Rien n’a encore été découvert.
                </p>
            ) : (
                <ul className="grid w-full max-w-2xl gap-4">
                    {entries.map((fragment) => (
                        <li
                            key={fragment.id}
                            className="rounded-[var(--radius-md)] border p-5"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
                            <h2 className="text-[length:var(--fs-500)] mb-2">{fragment.title}</h2>
                            <p className="text-[color:var(--color-text-muted)]">{fragment.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
