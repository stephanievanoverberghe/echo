# 🌌 Echo — Version 2

## Scènes et embranchements

---

## 🧭 1. Objectif de ce document

Ce document transforme la boucle de jeu ([02-boucle-de-jeu.md](02-boucle-de-jeu.md)) et le game design ([01-game-design.md](01-game-design.md)) en contenu concret.

Son rôle est de répondre à :

> Quelles scènes existent réellement dans le MVP, et comment s'enchaînent-elles ?

Il sert de base directe au fichier `content/scenes.ts` ([03-architecture-nextjs.md](03-architecture-nextjs.md)).

---

## 🎯 2. Périmètre du MVP narratif

D'après le MVP recommandé (doc 01 et doc 02), le premier arbre jouable contient :

- 1 scène d'introduction
- 3 scènes intermédiaires
- 2 embranchements (choix à conséquence visible)
- 1 artefact débloquable
- 1 fragment de Journal
- 1 variation d'ambiance
- 1 fin simple

Soit **5 scènes** au total, réparties sur les Actes 1 à 5 (doc 00).

---

## 🗺️ 3. Arbre des scènes (MVP)

```txt
eveil (Acte 1)
 ├─ choix A → approche
 └─ choix B → attente
        │
        ▼
approche (Acte 2)                attente (Acte 2)
 ├─ effets: unlock-artefact       ├─ effets: unlock-fragment
 └─ choix unique → seuil          └─ choix unique → seuil
        │                                │
        └────────────┬───────────────────┘
                      ▼
                   seuil (Acte 3 — Rupture)
              ├─ choix A → toucher
              └─ choix B → reculer
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
   revelation (Acte 4)         revelation (Acte 4)
   (ambiance: violet-halo)     (ambiance: blue-fog)
        └────────────┬─────────────┘
                      ▼
                   trace (Acte 5 — fin)
```

Les deux chemins de l'Acte 2 (`approche` / `attente`) convergent vers `seuil` : la scène est la même, mais l'état du joueur (fragment ou artefact débloqué) diffère — première preuve que « le monde se souvient ».

Les deux chemins de l'Acte 3 (`toucher` / `reculer`) mènent à la **même scène `revelation`**, mais avec une ambiance différente (`violet-halo` vs `blue-fog`) et une variante de texte : le choix ne change pas la destination, il change la couleur de l'expérience.

---

## 📝 4. Détail des scènes

### `eveil` — Acte 1, Éveil

- **Titre** : « Je me suis éveillée dans le silence »
- **Ambiance** : `dust`
- **Texte** : reprend l'esprit du hero actuel de la V1 ([index.html](../../index.html)) — absence de repères, présence qui cherche sa forme
- **Choix** :
  - `s-approcher` → « S'approcher du fragment » → `approche`
  - `attendre` → « Attendre » → `attente`

### `approche` — Acte 2, Exploration

- **Ambiance** : `dust`
- **Effets** : `unlock-artefact` (id: `premier-eclat`)
- **Texte** : le joueur touche un objet mystérieux, sans en comprendre la nature
- **Choix** : `avancer` → « Avancer vers le seuil » → `seuil`

### `attente` — Acte 2, Exploration

- **Ambiance** : `blue-fog`
- **Effets** : `unlock-fragment` (id: `premiere-pensee`)
- **Texte** : le silence se prolonge, une pensée émerge d'elle-même
- **Choix** : `avancer` → « Avancer vers le seuil » → `seuil`

### `seuil` — Acte 3, Rupture

- **Ambiance** : dépend du chemin (hérite de la scène précédente)
- **Texte** : une frontière invisible apparaît ; le joueur sent qu'un choix va changer quelque chose durablement
- **Choix** :
  - `toucher` → « Toucher la surface » → `revelation` (+ `set-flag: contact = true`)
  - `reculer` → « Reculer » → `revelation` (+ `set-flag: contact = false`)

### `revelation` — Acte 4, Révélation

- **Ambiance** : `violet-halo` si `contact = true`, sinon `blue-fog`
- **Effets** : `reveal-zone` (id: `zone-centrale`)
- **Texte** : deux variantes selon `flags.contact` — une sensation de fusion, ou une sensation de distance préservée
- **Choix** : `continuer` → « Continuer » → `trace`

### `trace` — Acte 5, Trace (fin simple)

- **Ambiance** : synthèse des ambiances traversées
- **Texte** : reprend l'esprit de la page Trace actuelle ([trace.html](../../trace.html)) — le joueur laisse une empreinte
- **Choix** : aucun — écran de conclusion, avec résumé du parcours (fragment débloqué, artefact débloqué, zone révélée, chemin de l'Acte 3)

---

## 🔀 5. Logique des embranchements

Deux formes d'embranchement cohabitent dans ce MVP (cf. doc 02, §8) :

### Convergence avec état différent

`approche` et `attente` mènent toutes les deux à `seuil`, mais laissent des traces différentes (artefact vs fragment). C'est la forme la plus simple de « choix qui compte » sans complexifier l'arbre.

### Convergence avec variante de contenu

`toucher` et `reculer` mènent toutes les deux à `revelation`, mais changent l'ambiance et le texte via un flag (`contact`). C'est la forme recommandée pour un MVP : peu de scènes réelles, mais une sensation de ramification forte.

> Aucune scène du MVP n'est un cul-de-sac narratif : chaque choix mène quelque part, jamais à une impasse. La divergence se joue sur l'état et le ton, pas sur la structure.

---

## 🧩 6. Correspondance avec les types (doc 02)

```ts
// Extrait conceptuel de content/scenes.ts
const scenes: Scene[] = [
    {
        id: 'eveil',
        title: 'Je me suis éveillée dans le silence',
        body: ['...'],
        ambience: 'dust',
        choices: [
            { id: 's-approcher', label: 'S’approcher du fragment', nextSceneId: 'approche' },
            { id: 'attendre', label: 'Attendre', nextSceneId: 'attente' }
        ]
    },
    {
        id: 'seuil',
        title: 'Le seuil',
        body: ['...'],
        choices: [
            {
                id: 'toucher',
                label: 'Toucher la surface',
                nextSceneId: 'revelation',
                effects: [{ type: 'set-flag', key: 'contact', value: true }]
            },
            {
                id: 'reculer',
                label: 'Reculer',
                nextSceneId: 'revelation',
                effects: [{ type: 'set-flag', key: 'contact', value: false }]
            }
        ]
    }
    // ...
];
```

---

## 🚀 7. Extension post-MVP

Une fois la boucle validée, l'arbre peut s'étendre sans changer sa logique :

- ajouter des scènes intermédiaires supplémentaires entre chaque Acte
- ajouter des conditions d'accès (`SceneCondition`, doc 02 §9) pour des scènes cachées
- multiplier les variantes de `revelation` selon d'autres flags (curiosité, retrait, contact, résistance — doc 04 §12)
- introduire de véritables impasses ou boucles de retour (« progression de retour », doc 02 §8)

---

## 🎯 Conclusion

Ce premier arbre est volontairement court : 5 scènes, 2 embranchements réels, mais déjà les trois mécaniques essentielles de Echo V2 —

> convergence, variation d'état, variation d'ambiance.

Il suffit à valider toute la boucle avant d'écrire du contenu plus ambitieux.

---
