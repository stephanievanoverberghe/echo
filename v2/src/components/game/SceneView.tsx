'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/useGameStore';
import { getSceneById } from '@/lib/game/getSceneById';
import SceneText from './SceneText';
import ChoiceList from './ChoiceList';
import SceneTransition from './SceneTransition';

export default function SceneView() {
    const router = useRouter();
    const currentSceneId = useGameStore((state) => state.currentSceneId);
    const scene = getSceneById(currentSceneId);

    // Ref persistant à travers les remontages de SceneText : la première scène
    // affichée ne prend pas le focus (skip-link préservé), les suivantes oui.
    const sceneShownRef = useRef(false);

    useEffect(() => {
        if (scene?.id === 'trace') {
            router.replace('/trace');
        }
    }, [scene?.id, router]);

    if (!scene || scene.id === 'trace') return null;

    return (
        <main
            className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
            id="contenu-principal"
            tabIndex={-1}
        >
            <SceneTransition id={scene.id}>
                <SceneText scene={scene} autoFocusRef={sceneShownRef} />
                <ChoiceList choices={scene.choices} />
            </SceneTransition>
        </main>
    );
}
