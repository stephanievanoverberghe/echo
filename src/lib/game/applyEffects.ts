import type { Effect, GameState } from '@/domain/game/types';

type EffectsPatch = Pick<
    GameState,
    'unlockedFragments' | 'unlockedArtefacts' | 'revealedZones' | 'flags'
>;

function withoutDuplicate(ids: string[], id: string): string[] {
    return ids.includes(id) ? ids : [...ids, id];
}

export function applyEffects(state: GameState, effects: Effect[] | undefined): EffectsPatch {
    let unlockedFragments = state.unlockedFragments;
    let unlockedArtefacts = state.unlockedArtefacts;
    let revealedZones = state.revealedZones;
    let flags = state.flags;

    for (const effect of effects ?? []) {
        switch (effect.type) {
            case 'unlock-fragment':
                unlockedFragments = withoutDuplicate(unlockedFragments, effect.id);
                break;
            case 'unlock-artefact':
                unlockedArtefacts = withoutDuplicate(unlockedArtefacts, effect.id);
                break;
            case 'reveal-zone':
                revealedZones = withoutDuplicate(revealedZones, effect.id);
                break;
            case 'set-flag':
                flags = { ...flags, [effect.key]: effect.value };
                break;
        }
    }

    return { unlockedFragments, unlockedArtefacts, revealedZones, flags };
}
