# 🔁 Echo — Version 2

## Boucle de jeu

---

## 🧭 1. Objectif de ce document

Ce document définit la boucle principale de l’expérience Echo V2.

Son rôle est de transformer l’intention narrative en système jouable.

Il sert à répondre à une question simple :

> Concrètement, comment le joueur avance-t-il dans Echo ?

---

## 🎮 2. Boucle principale

La boucle centrale de Echo est la suivante :

1. Le joueur arrive dans une scène
2. Il lit / observe
3. Il fait un choix
4. Le système enregistre ce choix
5. Le monde réagit
6. Une nouvelle scène apparaît
7. Le joueur progresse dans l’expérience

Cette boucle doit être :

- simple
- fluide
- lisible
- émotionnelle

---

## 🧩 3. Composition d’une scène

Chaque scène doit contenir au minimum :

- un identifiant unique
- un titre
- un ou plusieurs paragraphes
- une ambiance visuelle
- une liste de choix

Exemple conceptuel :

```ts
type Scene = {
    id: string;
    title: string;
    body: string[];
    ambience?: 'blue-fog' | 'violet-halo' | 'dust';
    choices: Choice[];
};
```

---

## 🧠 4. Composition d’un choix

Chaque choix doit contenir :

- un identifiant
- un libellé
- une destination
- des effets éventuels

Exemple conceptuel :

```ts
type Choice = {
    id: string;
    label: string;
    nextSceneId: string;
    effects?: Effect[];
};
```

---

## ⚙️ 5. Effets d’un choix

Un choix peut produire plusieurs effets :

### Effets narratifs

- débloquer une scène
- changer l’ordre de révélation
- activer une variante de texte

### Effets système

- ajouter un fragment au journal
- débloquer un artefact
- révéler une zone sur la carte
- modifier une variable d’état

Exemple conceptuel :

```ts
type Effect =
    | { type: 'unlock-fragment'; id: string }
    | { type: 'unlock-artefact'; id: string }
    | { type: 'reveal-zone'; id: string }
    | { type: 'set-flag'; key: string; value: boolean };
```

---

## 🧠 6. État global du joueur

Le jeu doit garder une mémoire du parcours.

L’état global doit au minimum contenir :

- la scène actuelle
- l’historique des scènes visitées
- l’historique des choix
- les fragments débloqués
- les artefacts débloqués
- les zones révélées
- les flags narratifs

Exemple conceptuel :

```ts
type GameState = {
    currentSceneId: string;
    visitedScenes: string[];
    choiceHistory: string[];
    unlockedFragments: string[];
    unlockedArtefacts: string[];
    revealedZones: string[];
    flags: Record<string, boolean>;
};
```

---

## 🪶 7. Fonctionnement d’un tour de jeu

À chaque tour, le système suit ce cycle :

### Étape 1

Lire la scène active depuis le state

### Étape 2

Afficher :

- le titre
- le texte
- l’ambiance
- les choix disponibles

### Étape 3

Le joueur sélectionne un choix

### Étape 4

Le système :

- enregistre le choix
- applique les effets
- change la scène active

### Étape 5

La nouvelle scène est affichée

---

## 🔀 8. Types de progression

Echo peut utiliser plusieurs formes de progression :

### Progression linéaire

Une scène mène clairement à une autre

### Progression branchée

Une scène ouvre plusieurs directions possibles

### Progression conditionnelle

Certaines scènes n’existent que si certaines conditions sont remplies

### Progression de retour

Le joueur peut revenir à certains espaces, mais avec un contexte différent

---

## 🫧 9. Importance des conditions

Toutes les scènes ne doivent pas être accessibles tout de suite.

Certaines scènes doivent dépendre de :

- la découverte d’un artefact
- un choix précédent
- un certain état émotionnel ou narratif
- une combinaison d’éléments débloqués

Exemple :

```ts
type SceneCondition = {
    requiredFlags?: string[];
    requiredArtefacts?: string[];
    requiredFragments?: string[];
};
```

---

## 🗺️ 10. Place des systèmes secondaires dans la boucle

La boucle principale ne doit pas être isolée.

Elle doit nourrir les autres systèmes :

### Journal

Chaque scène ou choix peut débloquer un fragment

### Artefacts

Certaines scènes peuvent révéler un objet

### Carte

Certaines zones peuvent devenir visibles

### Trace

Le parcours global prépare la fin

---

## ✨ 11. Réaction du monde

Le monde doit donner une sensation de réponse.

Cette réponse peut être :

- visuelle
- narrative
- structurelle

### Exemples

- un texte change après un choix
- une nouvelle zone apparaît
- un artefact devient consultable
- une scène devient inaccessible
- l’ambiance visuelle devient plus froide ou plus lumineuse

---

## 🎭 12. Rythme de la boucle

La boucle doit rester courte et intense.

Il vaut mieux :

- peu de texte mais fort
- peu de choix mais significatifs
- peu de systèmes mais connectés

Le joueur doit avoir le sentiment que chaque pas compte.

---

## 🧪 13. MVP recommandé

Pour la première boucle jouable :

### Contenu minimum

- 1 scène d’introduction
- 3 scènes intermédiaires
- 2 choix par scène
- 1 artefact débloquable
- 1 fragment de journal
- 1 variation d’ambiance
- 1 fin simple

### Objectif

Valider :

- la lecture
- le choix
- la conséquence
- la mémoire
- la transition

---

## 🧱 14. Écran principal recommandé

La route principale du jeu peut être `/echo`.

Elle doit afficher :

- la scène actuelle
- le texte
- les choix
- éventuellement un accès discret au journal, aux artefacts et à la carte

Cette route devient le cœur du système.

---

## 💾 15. Persistance

Le joueur ne doit pas perdre sa progression à chaque reload.

La V2 doit prévoir une persistance simple via :

- localStorage

À sauvegarder :

- scène actuelle
- choix
- fragments
- artefacts
- zones
- flags

---

## 🚀 16. Conclusion

La boucle de jeu de Echo V2 repose sur un principe simple :

> scène → choix → conséquence → mémoire → progression

Cette simplicité est une force.

Elle permet de construire une expérience :

- claire techniquement
- riche narrativement
- immersive émotionnellement

---
