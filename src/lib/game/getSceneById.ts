import { scenes } from '@/content/scenes';
import type { Scene } from '@/domain/game/types';

export function getSceneById(id: string): Scene | undefined {
    return scenes.find((scene) => scene.id === id);
}
