# 🧩 Echo — Version 2

## Systèmes

---

## 🧭 1. Objectif de ce document

Ce document définit les systèmes principaux de Echo V2.

Son rôle est de structurer tout ce qui dépasse la simple boucle :

- mémoire
- journal
- artefacts
- carte
- trace finale
- réactions du monde

Ces systèmes donnent à Echo sa profondeur.

Ils transforment une suite de scènes en expérience cohérente.

---

## 🎯 2. Rôle des systèmes

Les systèmes ne doivent pas être pensés comme des “features” séparées.

Ils doivent servir une seule idée :

> donner au joueur la sensation que le monde garde une trace de son passage.

Chaque système doit :

- prolonger la narration
- renforcer la progression
- enrichir l’intrigue
- matérialiser les choix du joueur

---

## 🧠 3. Vue d’ensemble

Echo V2 repose sur 5 systèmes principaux :

### 1. Le système de mémoire

Il garde la trace du parcours

### 2. Le Journal

Il conserve les fragments révélés

### 3. Les Artefacts

Il matérialise certaines découvertes

### 4. La Carte

Elle rend visible l’exploration du monde

### 5. La Trace

Elle synthétise et conclut l’expérience

---

## 🧠 4. Système de mémoire

Le système de mémoire est le cœur invisible du jeu.

Il enregistre :

- les scènes visitées
- les choix effectués
- les objets obtenus
- les zones révélées
- certains états narratifs

Cette mémoire doit permettre :

- d’ouvrir de nouvelles scènes
- de modifier certains textes
- de faire émerger des conséquences

### Rôle narratif

Le monde ne doit pas sembler statique.

Il doit donner l’impression de :

- se souvenir
- réagir
- se transformer

---

## 📝 5. Système Journal

Le Journal est la mémoire textuelle du joueur.

Il ne sert pas juste à stocker du texte.

Il sert à :

- garder trace de ce qui a été découvert
- donner une profondeur au monde
- permettre la relecture
- faire émerger des motifs narratifs

### Contenu du Journal

Le Journal peut contenir :

- fragments débloqués
- notes issues de certaines scènes
- réécritures légères selon le parcours
- éléments ambigus ou contradictoires

### Effet recherché

Le joueur doit parfois sentir que :

- le Journal se complète
- le Journal se déforme
- le Journal en dit plus après coup

---

## 🧱 6. Système Artefacts

Les Artefacts sont des objets narratifs.

Ils servent à :

- matérialiser certaines découvertes
- densifier le monde
- créer une sensation d’étrangeté
- offrir des points d’ancrage à l’intrigue

### Ce qu’un artefact peut faire

Un artefact peut :

- être simplement observé
- être débloqué après un choix
- permettre l’accès à une scène
- modifier une ambiance
- servir de clé symbolique

### Effet recherché

Chaque artefact doit donner l’impression :

- d’avoir une histoire
- de porter une mémoire
- de ne pas être décoratif

---

## 🗺️ 7. Système Carte

La Carte n’est pas obligée d’être géographique.

Elle peut être :

- mentale
- symbolique
- fragmentée
- évolutive

Son rôle est de :

- rendre visible la progression
- montrer que le monde s’ouvre
- donner un sentiment d’exploration

### Ce que la Carte peut révéler

- nouvelles zones
- zones déjà visitées
- connexions implicites
- instabilité ou changement d’état

### Effet recherché

Le joueur doit sentir que :

- le monde n’est pas donné d’emblée
- il se révèle par l’expérience
- il se recompose selon le parcours

---

## 🫧 8. Système Trace

La Trace est un système de conclusion.

Elle sert à :

- recueillir la dernière empreinte du joueur
- donner une forme de synthèse
- transformer la fin en geste personnel

### Ce que la Trace peut contenir

- un message
- un mot
- une phrase
- un fragment généré à partir du parcours
- une fin influencée par les choix précédents

### Effet recherché

Le joueur ne quitte pas Echo sans rien laisser.

Il dépose quelque chose.

---

## 🧪 9. Systèmes visibles vs invisibles

Tous les systèmes ne doivent pas être exposés de manière frontale.

### Visibles

- Journal
- Artefacts
- Carte
- Trace

### Invisibles

- flags narratifs
- tendances du joueur
- historique précis des choix
- états émotionnels implicites

Les systèmes invisibles sont essentiels pour :

- enrichir la narration
- rendre le monde plus vivant
- créer des variations discrètes

---

## ⚙️ 10. Connexion entre les systèmes

Les systèmes ne doivent jamais vivre isolément.

### Exemple de connexion

Un choix dans une scène peut :

- débloquer un fragment de Journal
- révéler un Artefact
- ouvrir une zone sur la Carte
- modifier la future Trace

C’est cette connexion qui crée la profondeur.

---

## 🔁 11. Fonctionnement systémique type

Exemple :

1. le joueur entre dans une scène
2. il choisit d’approcher un objet
3. un artefact est débloqué
4. un fragment est ajouté au Journal
5. une nouvelle zone devient visible
6. une scène future change légèrement

Cette logique rend le monde réactif.

---

## 🧠 12. Variables d’état recommandées

Le jeu peut suivre plusieurs dimensions :

- `visitedScenes`
- `choiceHistory`
- `unlockedFragments`
- `unlockedArtefacts`
- `revealedZones`
- `flags`

Mais aussi des variables plus interprétatives :

- curiosité
- retrait
- contact
- résistance

Ces variables peuvent influencer :

- le ton
- les scènes
- certaines fins

---

## 🧱 13. Priorité MVP des systèmes

Pour le MVP, il ne faut pas tout faire d’un coup.

### À prioriser

1. mémoire
2. journal
3. artefacts

### À ajouter ensuite

4. carte
5. trace finale

Pourquoi :

- mémoire = indispensable
- journal = profondeur immédiate
- artefacts = matérialité du monde
- carte et trace = excellents systèmes, mais secondaires au tout début

---

## 🎨 14. Rôle visuel des systèmes

Chaque système peut aussi avoir une identité UI :

### Journal

- plus textuel
- plus sobre
- plus silencieux

### Artefacts

- plus visuel
- plus mystérieux
- plus sensoriel

### Carte

- plus spatial
- plus abstrait
- plus évolutif

### Trace

- plus intime
- plus épuré
- plus grave

---

## 🧭 15. Navigation entre les systèmes

Le joueur doit pouvoir consulter les systèmes sans casser le flux.

Deux approches possibles :

### Approche 1

Pages dédiées :

- `/journal`
- `/artefacts`
- `/carte`
- `/trace`

### Approche 2

Overlay ou panel secondaire depuis `/echo`

### Recommandation

Pour le MVP :

- garder les routes dédiées
- plus simple à construire
- plus lisible
- plus facile à faire évoluer ensuite

---

## 🚀 16. Conclusion

Les systèmes de Echo V2 sont ce qui transforme :

- une simple narration branchée

en

- une expérience vivante, mémorielle et interprétable

Ils donnent au joueur la sensation que :

- le monde le regarde
- le monde retient quelque chose
- le monde change avec lui

---
