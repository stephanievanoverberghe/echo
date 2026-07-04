import type { GameState, SceneCondition } from '@/domain/game/types';

type ConditionState = Pick<GameState, 'flags' | 'unlockedArtefacts' | 'unlockedFragments'>;

export function checkCondition(
    condition: SceneCondition | undefined,
    state: ConditionState
): boolean {
    if (!condition) return true;

    const flagsMet = (condition.requiredFlags ?? []).every((key) => state.flags[key] === true);
    const artefactsMet = (condition.requiredArtefacts ?? []).every((id) =>
        state.unlockedArtefacts.includes(id)
    );
    const fragmentsMet = (condition.requiredFragments ?? []).every((id) =>
        state.unlockedFragments.includes(id)
    );

    return flagsMet && artefactsMet && fragmentsMet;
}
