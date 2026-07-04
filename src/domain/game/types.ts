export type Ambience = 'blue-fog' | 'violet-halo' | 'dust';

export type Effect =
    | { type: 'unlock-fragment'; id: string }
    | { type: 'unlock-artefact'; id: string }
    | { type: 'reveal-zone'; id: string }
    | { type: 'set-flag'; key: string; value: boolean };

export type SceneCondition = {
    requiredFlags?: string[];
    requiredArtefacts?: string[];
    requiredFragments?: string[];
};

export type Choice = {
    id: string;
    label: string;
    nextSceneId: string;
    effects?: Effect[];
    // Si présente, le choix n'est proposé que lorsque la condition est satisfaite
    // (contenu débloqué par la mémoire du joueur — doc 02 §9).
    condition?: SceneCondition;
};

export type Scene = {
    id: string;
    title: string;
    body: string[];
    ambience?: Ambience;
    choices: Choice[];
};

export type GameState = {
    currentSceneId: string;
    visitedScenes: string[];
    choiceHistory: string[];
    unlockedFragments: string[];
    unlockedArtefacts: string[];
    revealedZones: string[];
    flags: Record<string, boolean>;
};
