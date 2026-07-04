'use client';

import Image from 'next/image';
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
            <h1 className="text-[length:var(--fs-600)] mb-6">Carte</h1>

            <div
                className="relative mb-8 aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-[var(--radius-lg)] border"
                style={{ borderColor: 'var(--color-border)' }}
            >
                <Image
                    src="/images/carte/carte.png"
                    alt="Représentation abstraite du monde d’Echo, sans repères fixes."
                    fill
                    sizes="(max-width: 42rem) 100vw, 42rem"
                    className="object-cover opacity-80"
                />
            </div>

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
