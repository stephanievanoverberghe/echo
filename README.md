# 🌑 Echo

Echo est une **expérience narrative interactive minimaliste** : le joueur est une présence qui s'éveille dans un espace sans repères et progresse par une boucle *scène → choix → conséquence → mémoire*. Le monde garde la trace de son passage et lui ouvre du contenu selon ce qu'il a découvert.

> Echo ne doit pas être « compris ». Il doit être ressenti, traversé, interprété.

## ✨ Expérience

- **`/`** — l'entrée dans l'obscurité.
- **`/echo`** — la boucle de jeu : une scène, des choix, une conséquence, une transition.
- **`/journal`** — les fragments de pensée débloqués.
- **`/artefacts`** — les objets découverts.
- **`/carte`** — les zones révélées.
- **`/trace`** — la conclusion : une synthèse du parcours et l'empreinte laissée.

Chaque choix peut débloquer un fragment, un artefact ou une zone, et poser des drapeaux narratifs. Certaines scènes sont **cachées** : elles n'apparaissent que si la mémoire du joueur remplit une condition (par ex. porter un artefact précis).

## ⚙️ Stack

- [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- [Zustand](https://github.com/pmndrs/zustand) — état de jeu, persisté en `localStorage`
- [Framer Motion](https://www.framer.com/motion/) — transitions de scène
- [Tailwind CSS](https://tailwindcss.com/) v4 + tokens visuels et couches atmosphériques (brume, halos, poussière, light-leaks en canvas)

L'ensemble respecte `prefers-reduced-motion`, la navigation clavier et une structure sémantique accessible.

## 🚀 Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint     # ESLint
```

## 🗂️ Structure

```txt
src/
  app/            # routes (/, /echo, /journal, /artefacts, /carte, /trace)
  components/     # game, layout, journal, artefacts, carte, ui
  content/        # scenes, fragments, artefacts, zones (données narratives)
  domain/game/    # types métier (Scene, Choice, Effect, SceneCondition…)
  lib/game/       # logique pure (applyEffects, checkCondition, getAvailableChoices…)
  store/          # useGameStore (Zustand + persistance)
public/images/    # couches d'ambiance, hero, carte, artefacts
docs/             # documentation de conception (v1 archivée, v2 = vision actuelle)
```

## 📚 Conception

La vision, le game design, la boucle de jeu, l'architecture, les systèmes, l'arbre de scènes et la roadmap technique sont documentés dans [`docs/v2/`](docs/v2). Les documents de la première version statique sont archivés dans [`docs/v1/`](docs/v1).

## 👩‍💻 Auteur

Stéphanie — Développeuse Frontend. Projet personnel explorant l'intersection entre design, narration et interaction.
