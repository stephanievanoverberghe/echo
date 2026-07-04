# 📁 Étape 08 — Définir l’arborescence des dossiers et fichiers

---

## 🧭 Objectif

Définir une structure de projet claire avant de commencer le développement.

Cette étape permet de :

- travailler proprement dès le départ
- séparer le HTML, le CSS et les ressources
- garder un projet facile à lire et à faire évoluer

---

## 🧱 Structure globale du projet

Le projet peut être organisé de cette manière :

- un dossier racine pour le projet
- un dossier pour les styles
- un dossier pour les images
- un dossier pour la documentation du projet
- plusieurs fichiers HTML pour les pages du site

---

## 📂 Arborescence recommandée

```
Echo/
│
├── index.html
├── journal.html
├── artefacts.html
├── carte.html
├── trace.html
│
├── assets/
│ ├── css/
│ │ └── style.css
│ │
│ ├── images/
│ │ ├── hero/
│ │ ├── artefacts/
│ │ ├── textures/
│ │ └── icons/
│ │
│ └── fonts/
│
├── docs/
│ ├── 01-concept.md
│ ├── 02-objectif.md
│ ├── 03-arborescence.md
│ ├── 04-contenu.md
│ ├── 05-structure-html.md
│ ├── 06-identite-visuelle.md
│ ├── 07-zoning-accueil.md
│ ├── 08-arborescence-fichiers.md
│ └── 09-page-accueil-html.md
│
└── README.md
```

---

## 📄 Rôle des fichiers HTML

### index.html

Page d’accueil du site.

### journal.html

Page contenant les fragments, chapitres ou pensées.

### artefacts.html

Page galerie des objets, traces ou éléments visuels du monde.

### carte.html

Page représentant les zones du monde ou de l’espace.

### trace.html

Page contenant le formulaire ou l’espace où l’utilisateur laisse une empreinte.

---

## 🎨 Rôle du dossier assets

Le dossier assets contient toutes les ressources statiques du projet.

---

## 📂 assets/css

Contient les fichiers de style.

### style.css

Feuille de style principale du projet.

Au début du projet, un seul fichier CSS suffit largement.

---

## 📂 assets/images

Contient toutes les images du projet.

### hero/

Images ou visuels utilisés dans la page d’accueil.

### artefacts/

Images des artefacts ou éléments de galerie.

### textures/

Textures visuelles éventuelles :

- grain
- brume
- fond abstrait
- halos

### icons/

Icônes si tu en utilises.

---

## 📂 assets/fonts

Contient les polices locales si tu décides d’en ajouter plus tard.

Ce dossier peut rester vide au début.

---

## 📂 docs

Contient toute la documentation du projet.

Ce dossier te permet de :

- réfléchir avant de coder
- garder une trace de tes décisions
- structurer ton projet comme une vraie production

---

## 📄 README.md

Ce fichier sert à présenter le projet.

Il pourra contenir plus tard :

- le nom du projet
- son concept
- ses pages
- ce que tu as voulu travailler
- les technologies utilisées

---

## 🧠 Logique de cette structure

Cette arborescence est pensée pour être :

- simple pour un premier projet
- claire à relire
- évolutive
- proche d’une logique professionnelle

Elle évite :

- les fichiers mélangés partout
- les noms flous
- le désordre dès le départ

---

## ✍️ Convention de nommage

Utiliser de préférence :

- des noms en minuscules
- des noms simples
- des tirets si besoin
- pas d’espaces
- pas d’accents dans les noms de fichiers

Exemples :

- index.html
- style.css
- 01-concept.md
- hero-background.jpg

---

## ✅ Validation de l’étape

L’étape est validée si :

- le dossier racine est créé
- les fichiers HTML principaux sont définis
- les dossiers assets et docs sont prévus
- chaque élément a un rôle clair
- la structure générale du projet est propre
