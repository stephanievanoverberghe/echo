export type Zone = {
    id: string;
    title: string;
    description: string;
};

export const zones: Zone[] = [
    {
        id: 'zone-centrale',
        title: 'Zone centrale',
        description: 'Un espace sans repères, révélé par le seuil franchi ou évité. Il n’a pas de forme fixe.',
    },
    {
        id: 'veine-profonde',
        title: 'Veine profonde',
        description: 'Une strate qui ne s’ouvre qu’à ceux qui ont écouté l’éclat. Elle pulse, lente, sous la zone centrale.',
    },
];
