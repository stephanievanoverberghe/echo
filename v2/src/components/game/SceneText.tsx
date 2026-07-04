'use client';

import { useEffect, useRef, type RefObject } from 'react';
import type { Scene } from '@/domain/game/types';

export default function SceneText({
    scene,
    autoFocusRef,
}: {
    scene: Scene;
    // Ref partagé « une scène a-t-elle déjà été affichée ? ». Au montage :
    // s'il vaut déjà true, on déplace le focus sur le titre ; sinon on le passe à
    // true sans focaliser (évite de voler le focus au premier affichage de /echo).
    // TracePage l'initialise à true pour focaliser sa conclusion dès l'arrivée.
    autoFocusRef?: RefObject<boolean>;
}) {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!autoFocusRef) return;
        if (autoFocusRef.current) {
            headingRef.current?.focus({ preventScroll: true });
        } else {
            autoFocusRef.current = true;
        }
        // Composant remonté à neuf pour chaque scène (clé d'AnimatePresence) :
        // cet effet de montage s'exécute quand le nouveau titre entre dans le DOM.
    }, [autoFocusRef]);

    return (
        <div className="max-w-xl">
            <h1 ref={headingRef} tabIndex={-1} className="text-[length:var(--fs-700)] mb-4">
                {scene.title}
            </h1>
            {scene.body.map((paragraph, index) => (
                <p key={index} className="text-[color:var(--color-text-muted)] mt-3">
                    {paragraph}
                </p>
            ))}
        </div>
    );
}
