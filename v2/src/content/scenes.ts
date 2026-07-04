import type { Scene } from '@/domain/game/types';

export const scenes: Scene[] = [
    {
        id: 'eveil',
        title: 'Je me suis éveillée dans le silence',
        body: [
            'Il n’y a ni ciel, ni murs, ni frontière. Seulement une présence qui cherche sa forme.',
            'Quelque chose persiste sous la surface — une mémoire incomplète, une voix qui ne sait plus si elle parle ou si elle rêve.',
        ],
        ambience: 'dust',
        choices: [
            { id: 's-approcher', label: 'S’approcher du fragment', nextSceneId: 'approche' },
            { id: 'attendre', label: 'Attendre', nextSceneId: 'attente' },
        ],
    },
    {
        id: 'approche',
        title: 'Le premier contact',
        body: [
            'Un objet affleure dans l’obscurité. Il est froid, presque vivant sous les doigts, et il ne révèle rien de sa nature.',
        ],
        ambience: 'dust',
        choices: [
            {
                id: 'avancer',
                label: 'Avancer vers le seuil',
                nextSceneId: 'seuil',
                effects: [{ type: 'unlock-artefact', id: 'premier-eclat' }],
            },
        ],
    },
    {
        id: 'attente',
        title: 'Le silence se prolonge',
        body: [
            'Rien ne bouge. Puis une pensée se forme d’elle-même, sans que je l’aie cherchée — une direction plus qu’un mot.',
        ],
        ambience: 'blue-fog',
        choices: [
            {
                id: 'avancer',
                label: 'Avancer vers le seuil',
                nextSceneId: 'seuil',
                effects: [{ type: 'unlock-fragment', id: 'premiere-pensee' }],
            },
        ],
    },
    {
        id: 'seuil',
        title: 'Le seuil',
        body: [
            'Une frontière invisible se dresse. Rien ne la marque, mais je sens qu’un choix va changer quelque chose durablement.',
        ],
        choices: [
            {
                id: 'toucher',
                label: 'Toucher la surface',
                nextSceneId: 'revelation-contact',
                effects: [{ type: 'set-flag', key: 'contact', value: true }],
            },
            {
                id: 'reculer',
                label: 'Reculer',
                nextSceneId: 'revelation-distanciation',
                effects: [{ type: 'set-flag', key: 'contact', value: false }],
            },
        ],
    },
    {
        id: 'revelation-contact',
        title: 'Ce qui fusionne',
        body: [
            'La surface cède. Il n’y a plus de dedans ni de dehors — seulement une continuité que je n’avais pas anticipée.',
        ],
        ambience: 'violet-halo',
        choices: [
            {
                id: 'continuer',
                label: 'Continuer',
                nextSceneId: 'trace',
                effects: [{ type: 'reveal-zone', id: 'zone-centrale' }],
            },
        ],
    },
    {
        id: 'revelation-distanciation',
        title: 'Ce qui reste distinct',
        body: [
            'Je n’ai pas franchi le seuil. La distance demeure, mais elle a changé de nature — moins une absence qu’un choix assumé.',
        ],
        ambience: 'blue-fog',
        choices: [
            {
                id: 'continuer',
                label: 'Continuer',
                nextSceneId: 'trace',
                effects: [{ type: 'reveal-zone', id: 'zone-centrale' }],
            },
        ],
    },
    {
        id: 'trace',
        title: 'Une empreinte dans le vide',
        body: [
            'Quand je repartirai, cet endroit restera ouvert. Je laisse quelque chose ici — pas un mot, pas une preuve. Une trace.',
        ],
        choices: [],
    },
];
