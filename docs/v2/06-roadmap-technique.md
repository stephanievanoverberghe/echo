# 🚀 Echo — Version 2

## Roadmap technique

---

## 🧭 1. Objectif de ce document

Ce document découpe la construction de Echo V2 en phases concrètes.

Il traduit :

- l'architecture ([03-architecture-nextjs.md](03-architecture-nextjs.md))
- les systèmes ([04-systemes.md](04-systemes.md))
- l'arbre de scènes du MVP ([05-scenes-et-branches.md](05-scenes-et-branches.md))

en étapes séquencées, chacune livrable indépendamment.

---

## 🎯 2. Principe général

Chaque phase doit :

- rester jouable ou vérifiable seule
- ne pas dépendre d'une phase future
- suivre la priorité MVP fixée en doc 04 (§13) : mémoire → journal → artefacts → carte → trace

Pas de phase « tout ou rien » : à la fin de chaque phase, il existe quelque chose qui tourne.

---

## 🧱 3. Phase 0 — Socle technique

**Objectif** : poser le projet Next.js vide mais structuré.

- initialiser Next.js (App Router) + TypeScript + Tailwind CSS
- créer l'arborescence `src/` recommandée (doc 03 §5)
- installer Zustand et Framer Motion
- porter les couches atmosphériques de la V1 (`AmbientLayers`) depuis [assets/css/style.css](../../assets/css/style.css) et [assets/js/main.js](../../assets/js/main.js) (halos, brume, canvas de light leaks)
- mettre en place `layout.tsx` + `globals.css` + accessibilité de base (skip-link, focus visibles, `prefers-reduced-motion`)

**Livrable** : une page `/` qui affiche l'ambiance V1 sous Next.js, sans logique de jeu.

---

## 🔁 4. Phase 1 — Boucle de jeu minimale

**Objectif** : rendre l'arbre de 5 scènes du doc 05 jouable de bout en bout.

- définir les types domaine (`domain/game/types.ts` : `Scene`, `Choice`, `Effect`, `SceneCondition`)
- écrire `content/scenes.ts` avec les 5 scènes (`eveil`, `approche`, `attente`, `seuil`, `revelation`, `trace`)
- créer le store Zustand (`useGameStore.ts`) avec `currentSceneId`, `visitedScenes`, `choiceHistory`, `flags`
- implémenter `selectChoice(choiceId)` (doc 03 §9) : enregistrer, appliquer les effets, changer de scène
- construire la route `/echo` avec `SceneView`, `SceneText`, `ChoiceList`, `ChoiceButton`
- ajouter `saveGame` / `loadGame` en localStorage + `hydrateGame()`

**Livrable** : parcours complet `eveil → ... → trace` jouable, persistant au reload.

**Validation** : les 5 points du MVP boucle (doc 02 §13) — lecture, choix, conséquence, mémoire, transition.

---

## 🧩 5. Phase 2 — Journal et Artefacts

**Objectif** : activer les deux premiers systèmes secondaires (priorité doc 04 §13).

- ajouter `unlockedFragments` / `unlockedArtefacts` au store si absents
- écrire `content/fragments.ts` et `content/artefacts.ts` (au minimum le fragment `premiere-pensee` et l'artefact `premier-eclat` du doc 05)
- construire les routes `/journal` (`JournalEntryList`) et `/artefacts` (`ArtefactGrid`, `ArtefactCard`)
- porter les micro-interactions de profondeur au pointeur (`setupPointerDepth` de [main.js](../../assets/js/main.js)) sur `ArtefactCard`

**Livrable** : les découvertes faites dans `/echo` sont consultables et persistées dans `/journal` et `/artefacts`.

---

## 🗺️ 6. Phase 3 — Carte et Trace finale

**Objectif** : compléter les systèmes secondaires restants.

- ajouter `revealedZones` au store
- écrire `content/zones.ts` (zone `zone-centrale` du doc 05)
- construire `/carte` (`MapView`, `ZoneCard`)
- construire `/trace` comme écran de conclusion : résumé du parcours (chemin choisi, fragment, artefact, zone) au lieu du formulaire actuel de [trace.html](../../trace.html)

**Livrable** : les 4 systèmes secondaires (Journal, Artefacts, Carte, Trace) sont branchés sur la boucle principale.

---

## 🎬 7. Phase 4 — Transitions et ambiance dynamique

**Objectif** : donner à l'interface le rôle actif décrit en doc 00 (§ Rôle de l'interface) et doc 03 (§13-14).

- brancher `AmbientLayers` sur le champ `ambience` de la scène active
- animer les transitions de scène avec Framer Motion (`SceneTransition`) : fade du texte, apparition progressive des choix
- faire varier l'intensité visuelle selon les flags interprétatifs (curiosité, retrait, contact, résistance — doc 04 §12), en commençant par le flag `contact` déjà utilisé en Phase 1

**Livrable** : le chemin `toucher` vs `reculer` produit une différence visuelle et rythmique perceptible, pas seulement textuelle.

---

## 🧭 8. Phase 5 — Navigation secondaire et shell global

**Objectif** : unifier l'accès aux systèmes sans casser l'immersion (doc 03 §15-16).

- construire `AppShell` (structure globale + injection des couches visuelles)
- construire `NavigationPanel` discret vers Journal / Artefacts / Carte depuis `/echo`
- vérifier le responsive (vertical mobile, plus ample desktop — doc 03 §17)

**Livrable** : navigation cohérente entre `/echo` et les systèmes secondaires, sur mobile et desktop.

---

## ♿ 9. Phase 6 — Accessibilité et finition

**Objectif** : ramener Echo V2 au niveau d'exigence accessibilité de la V1 (cf. [README.md](../../README.md)).

- navigation clavier complète sur `/echo` (choix atteignables au clavier, focus géré après transition de scène)
- focus visibles sur tous les éléments interactifs
- structure sémantique (landmarks, headings cohérents)
- vérification `prefers-reduced-motion` sur toutes les animations Framer Motion et canvas

**Livrable** : parité d'accessibilité avec la V1.

---

## 🧪 10. Phase 7 — Extension du contenu

**Objectif** : sortir du strict MVP une fois la mécanique validée (doc 05 §7).

- ajouter des scènes intermédiaires supplémentaires
- introduire des `SceneCondition` (scènes cachées nécessitant artefact/fragment/flag)
- enrichir les variantes de texte selon les variables interprétatives
- envisager une « progression de retour » (doc 02 §8)

**Livrable** : arbre narratif étendu, sans changement d'architecture.

---

## 📋 11. Récapitulatif des phases

| Phase | Contenu | Dépend de |
|---|---|---|
| 0 | Socle Next.js + ambiance V1 | — |
| 1 | Boucle de jeu (5 scènes) | Phase 0 |
| 2 | Journal + Artefacts | Phase 1 |
| 3 | Carte + Trace finale | Phase 1 |
| 4 | Transitions + ambiance dynamique | Phase 1 |
| 5 | Navigation secondaire + shell | Phase 2, 3 |
| 6 | Accessibilité + finition | Phase 5 |
| 7 | Extension du contenu | Phase 6 |

Les phases 2, 3 et 4 peuvent être menées dans un ordre différent ou en parallèle : elles dépendent toutes de la Phase 1, mais pas les unes des autres.

---

## 🎯 Conclusion

Cette roadmap suit le même principe que la boucle de jeu elle-même :

> avancer par étapes courtes, chacune jouable, chacune un pas de plus vers l'expérience complète.

Rien n'est bloqué en attendant une phase lointaine — dès la Phase 1, Echo V2 existe et se joue.

---
