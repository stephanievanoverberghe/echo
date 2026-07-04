# 🏗️ Echo — Version 2

## Architecture Next.js

---

## 🧭 1. Objectif de ce document

Ce document définit l’architecture technique de Echo V2.

Son rôle est de traduire :

- la vision produit
- le game design
- la boucle de jeu

en une structure Next.js propre, évolutive et maintenable.

---

## 🎯 2. Objectif technique

Echo V2 doit être construit comme une expérience narrative interactive moderne.

L’architecture doit permettre :

- d’afficher des scènes dynamiques
- de gérer un état global de jeu
- de débloquer du contenu
- de faire évoluer l’interface selon les choix
- de garder une base propre pour de futures extensions

---

## ⚙️ 3. Stack technique

### Framework

- Next.js (App Router)

### UI

- React
- TypeScript
- Tailwind CSS

### État

- Zustand

### Animation

- Framer Motion

### Persistance

- localStorage

---

## 🧱 4. Routes principales

L’application peut être structurée autour des routes suivantes :

### `/`

Écran d’entrée
Rôle :

- poser l’ambiance
- introduire Echo
- proposer d’entrer dans l’expérience

### `/echo`

Route principale du jeu
Rôle :

- afficher la scène active
- afficher les choix
- gérer la progression

### `/journal`

Fragments débloqués
Rôle :

- stocker la mémoire textuelle du joueur

### `/artefacts`

Artefacts révélés
Rôle :

- afficher les objets découverts

### `/carte`

Carte / zones révélées
Rôle :

- montrer la progression spatiale ou mentale

### `/trace`

Fin / empreinte / conclusion
Rôle :

- laisser une trace finale
- afficher une forme de synthèse du parcours

---

## 🗂️ 5. Structure de dossiers recommandée

```txt
src/
  app/
    page.tsx
    echo/
      page.tsx
    journal/
      page.tsx
    artefacts/
      page.tsx
    carte/
      page.tsx
    trace/
      page.tsx
    layout.tsx
    globals.css

  components/
    game/
      SceneView.tsx
      ChoiceList.tsx
      ChoiceButton.tsx
      SceneText.tsx
      SceneTransition.tsx
    journal/
      JournalEntryList.tsx
    artefacts/
      ArtefactGrid.tsx
      ArtefactCard.tsx
    carte/
      MapView.tsx
      ZoneCard.tsx
    layout/
      AppShell.tsx
      AmbientLayers.tsx
      NavigationPanel.tsx
    ui/
      Button.tsx
      Card.tsx
      Heading.tsx

  content/
    scenes.ts
    fragments.ts
    artefacts.ts
    zones.ts

  domain/
    game/
      types.ts
      scene.ts
      choice.ts
      effect.ts

  store/
    useGameStore.ts

  lib/
    game/
      applyEffects.ts
      getAvailableChoices.ts
      getSceneById.ts
      saveGame.ts
      loadGame.ts
```

---

## 🧠 6. Logique centrale du projet

Le cœur du projet repose sur 3 piliers :

### 1. Les données narratives

Elles décrivent le contenu du jeu :

- scènes
- choix
- fragments
- artefacts
- zones

### 2. Le state global

Il décrit la progression du joueur :

- scène actuelle
- historique
- contenu débloqué
- flags

### 3. L’interface

Elle affiche :

- la scène active
- les réactions du monde
- les systèmes secondaires

---

## 🧩 7. Route `/echo`

La route `/echo` est le centre du projet.

Elle doit afficher :

- la scène actuelle
- le titre
- les paragraphes
- les choix disponibles
- l’ambiance liée à la scène

### Composants principaux recommandés

#### `SceneView`

Affiche toute la scène

#### `SceneText`

Affiche le contenu narratif

#### `ChoiceList`

Liste les choix disponibles

#### `ChoiceButton`

Permet de sélectionner un choix

#### `SceneTransition`

Gère les transitions entre deux scènes

---

## 🧠 8. Gestion du state avec Zustand

Le store doit centraliser l’état du joueur.

### Contenu recommandé du store

- `currentSceneId`
- `visitedScenes`
- `choiceHistory`
- `unlockedFragments`
- `unlockedArtefacts`
- `revealedZones`
- `flags`

### Actions recommandées

- `startGame()`
- `goToScene(sceneId)`
- `selectChoice(choiceId)`
- `unlockFragment(id)`
- `unlockArtefact(id)`
- `revealZone(id)`
- `setFlag(key, value)`
- `resetGame()`
- `hydrateGame()`

---

## 🧪 9. Exemple de responsabilités du store

### `selectChoice(choiceId)`

Cette action doit :

1. retrouver le choix dans la scène active
2. enregistrer le choix dans l’historique
3. appliquer ses effets
4. changer la scène active
5. sauvegarder le state

---

## 📚 10. Gestion du contenu en data

Le contenu du jeu ne doit pas être codé directement dans les composants.

Il doit vivre dans des fichiers data.

### Exemple

- `content/scenes.ts`
- `content/fragments.ts`
- `content/artefacts.ts`
- `content/zones.ts`

Avantages :

- plus lisible
- plus maintenable
- plus facile à faire évoluer
- plus simple à écrire narrativement

---

## 🧱 11. Domain types

Le dossier `domain/` contient les types métier du projet.

### Exemples

- `Scene`
- `Choice`
- `Effect`
- `Fragment`
- `Artefact`
- `Zone`

Ce découpage permet de séparer :

- la logique métier
- l’UI
- la data

---

## 💾 12. Persistance

Le state doit être sauvegardé localement.

### Solution simple

- localStorage

### Données à sauvegarder

- scène actuelle
- historique
- fragments
- artefacts
- zones
- flags

### Fonctions recommandées

- `saveGame(state)`
- `loadGame()`

Le chargement doit se faire côté client.

---

## 🎨 13. Gestion de l’ambiance visuelle

L’ambiance peut être pilotée par la scène active.

Chaque scène peut définir un champ :

```ts
ambience?: "blue-fog" | "violet-halo" | "dust"
```

Le composant `AmbientLayers` peut lire cette valeur et adapter :

- le fond
- les halos
- les transitions
- les particules

---

## 🎬 14. Transitions

Les transitions entre scènes doivent être soignées.

### Outil recommandé

- Framer Motion

### Types de transitions possibles

- fade du texte
- apparition progressive des choix
- variation de lumière
- changement lent d’ambiance

---

## 🧭 15. Navigation secondaire

Le joueur doit pouvoir accéder à :

- Journal
- Artefacts
- Carte

Mais cette navigation doit rester discrète.

### Option recommandée

Un shell global avec :

- zone centrale = scène
- accès secondaire = panel discret ou navigation flottante

---

## 🧱 16. Shell global

Le composant `AppShell` peut servir à :

- gérer la structure globale
- injecter les couches visuelles
- afficher la navigation secondaire
- maintenir une cohérence entre les pages

---

## 📱 17. Responsive

Le projet doit rester jouable sur :

- mobile
- tablette
- desktop

La lecture doit rester confortable.

Les choix doivent être faciles à sélectionner.

Le layout doit être :

- vertical sur mobile
- plus ample sur desktop

---

## ♿ 18. Accessibilité

Même si le projet est expérimental, il doit rester accessible.

À prévoir :

- structure sémantique
- navigation clavier
- focus visibles
- reduced motion
- lisibilité forte

---

## 🚀 19. MVP technique recommandé

Pour la première version Next.js jouable :

### À implémenter en priorité

- App Router
- route `/echo`
- store Zustand
- fichier `scenes.ts`
- affichage de la scène active
- système de choix
- transition simple
- sauvegarde localStorage

### À ajouter ensuite

- journal
- artefacts
- carte
- trace finale

---

## 🧠 20. Philosophie de l’architecture

L’architecture doit rester :

- simple
- lisible
- narrative-first
- scalable

Le but n’est pas de sur-ingénier.

Le but est de construire une base propre pour une expérience forte.

---

## 🎯 21. Conclusion

Echo V2 doit être conçu comme :

> un moteur narratif léger,
> porté par une interface immersive.

Next.js structure l’application.
Zustand porte la mémoire.
Les données décrivent le monde.
L’UI donne vie à l’expérience.

---
