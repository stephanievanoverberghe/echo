'use client';

import { useRef } from 'react';
import type { Artefact } from '@/content/artefacts';

export default function ArtefactCard({ artefact }: { artefact: Artefact }) {
    const cardRef = useRef<HTMLElement>(null);

    const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        cardRef.current?.classList.add('is-depth-active');
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch') return;
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const px = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
        const py = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
        const rotateY = (px - 0.5) * 4.4;
        const rotateX = (0.5 - py) * 3.2;

        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
        card.style.setProperty('--pointer-lift', '4px');
    };

    const handlePointerLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.classList.remove('is-depth-active');
        card.style.removeProperty('--rotate-x');
        card.style.removeProperty('--rotate-y');
        card.style.removeProperty('--pointer-lift');
    };

    return (
        <article
            ref={cardRef}
            className="echo-card rounded-[var(--radius-md)] border p-5"
            style={{ borderColor: 'var(--color-border)' }}
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <h2 className="text-[length:var(--fs-500)] mb-2">{artefact.title}</h2>
            <p className="text-[color:var(--color-text-muted)]">{artefact.description}</p>
        </article>
    );
}
