'use client';

import { useGameStore } from '@/store/useGameStore';
import { getSceneById } from '@/lib/game/getSceneById';
import LightLeaksCanvas from './LightLeaksCanvas';

export default function AmbientLayers() {
    const currentSceneId = useGameStore((state) => state.currentSceneId);
    const ambience = getSceneById(currentSceneId)?.ambience ?? 'dust';

    return (
        <div className="atmosphere" aria-hidden="true" data-ambience={ambience}>
            <div className="atmosphere__layer atmosphere__layer--ambiance" />
            <div className="atmosphere__layer atmosphere__layer--halo" />
            <div className="atmosphere__layer atmosphere__layer--dust" />
            <div className="atmosphere__layer atmosphere__layer--texture" />
            <LightLeaksCanvas />
        </div>
    );
}
