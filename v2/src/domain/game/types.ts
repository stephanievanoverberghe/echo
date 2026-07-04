export type Ambience = 'blue-fog' | 'violet-halo' | 'dust';

export type Effect =
    | { type: 'unlock-fragment'; id: string }
    | { type: 'unlock-artefact'; id: string }
    | { type: 'reveal-zone'; id: string }
    | { type: 'set-flag'; key: string; value: boolean };

export type Choice = {
    id: string;
    label: string;
    nextSceneId: string;
    effects?: Effect[];
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
