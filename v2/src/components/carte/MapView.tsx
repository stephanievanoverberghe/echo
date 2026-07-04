'use client';

import { useGameStore } from '@/store/useGameStore';
import { zones } from '@/content/zones';
import ZoneCard from './ZoneCard';

export default function MapView() {
    const revealedZones = useGameStore((state) => state.revealedZones);
    const revealed = zones.filter((zone) => revealedZones.includes(zone.id));

    return (
        <main
            className="flex flex-1 flex-col items-center px-6 py-16"
            id="contenu-principal"
            tabIndex={-1}
        >
            <h1 className="text-[length:var(--fs-600)] mb-8">Carte</h1>

            {revealed.length === 0 ? (
                <p className="text-[color:var(--color-text-muted)]">
                    Rien n’a encore été révélé.
                </p>
            ) : (
                <ul className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
                    {revealed.map((zone) => (
                        <li key={zone.id}>
                            <ZoneCard zone={zone} />
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
