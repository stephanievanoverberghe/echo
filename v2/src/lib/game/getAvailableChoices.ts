import type { Choice, GameState, Scene } from '@/domain/game/types';
import { checkCondition } from './checkCondition';

type ConditionState = Pick<GameState, 'flags' | 'unlockedArtefacts' | 'unlockedFragments'>;

export function getAvailableChoices(scene: Scene, state: ConditionState): Choice[] {
    return scene.choices.filter((choice) => checkCondition(choice.condition, state));
}
