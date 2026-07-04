import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState } from '@/domain/game/types';
import { getSceneById } from '@/lib/game/getSceneById';
import { applyEffects } from '@/lib/game/applyEffects';
import { checkCondition } from '@/lib/game/checkCondition';

const INITIAL_SCENE_ID = 'eveil';

const initialState: GameState = {
    currentSceneId: INITIAL_SCENE_ID,
    visitedScenes: [INITIAL_SCENE_ID],
    choiceHistory: [],
    unlockedFragments: [],
    unlockedArtefacts: [],
    revealedZones: [],
    flags: {},
};

type GameStore = GameState & {
    selectChoice: (choiceId: string) => void;
    resetGame: () => void;
};

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            selectChoice: (choiceId) => {
                const state = get();
                const currentScene = getSceneById(state.currentSceneId);
                const choice = currentScene?.choices.find((c) => c.id === choiceId);
                if (!choice) return;
                // La condition est déjà filtrée à l'affichage ; on la revérifie ici
                // pour que le déblocage reste autoritatif et pas seulement cosmétique.
                if (!checkCondition(choice.condition, state)) return;

                const effectsPatch = applyEffects(state, choice.effects);

                set({
                    currentSceneId: choice.nextSceneId,
                    visitedScenes: state.visitedScenes.includes(choice.nextSceneId)
                        ? state.visitedScenes
                        : [...state.visitedScenes, choice.nextSceneId],
                    choiceHistory: [...state.choiceHistory, choice.id],
                    ...effectsPatch,
                });
            },

            resetGame: () => set(initialState),
        }),
        { name: 'echo-game-state' }
    )
);
