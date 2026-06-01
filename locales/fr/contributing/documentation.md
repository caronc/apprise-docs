---
title: "Documentation Apprise"
description: "Contribuer à la documentation Apprise"
sidebar:
  order: 4
---

## Contribuer à la Documentation Apprise

Les améliorations de documentation sont les bienvenues ! Suivez les recommandations ci-dessous pour nous aider à examiner et fusionner vos contributions dans de bonnes conditions.

## Récupérer depuis GitHub

```bash
# Récupérer les sources de la documentation depuis leur emplacement officiel sur GitHub
git clone git@github.com:caronc/apprise-docs.git

```

## Organisation du Dépôt

Toute la documentation vit sous le répertoire `locales/`.

Chaque locale reproduit la même structure afin que la navigation reste prévisible d'une langue à l'autre.

```text
locales/
  <locale>/
    index.md
    getting-started/
    guides/
    services/
      <service>/
        index.md
        images/       # logos optionnels — logo.svg, logo-dark.svg, etc.
    config/
    qa/
    dev/
    contributing/
    assets/
sponsorships/
  <id>/               # entrées de sponsors d'entreprise (gérées par les mainteneurs)
    meta.json
    logo.svg
```

### Guide des Répertoires

- **Getting Started** (`getting-started/`)
  Contenu introductif pour les nouveaux utilisateurs

- **Guides** (`guides/`)
  Articles pratiques, workflows, bonnes pratiques et dépannage

- **Config** (`config/`)
  Syntaxe de configuration et documents de référence

- **QA** (`qa/`)
  Dépannage, diagnostics et FAQ

- **Dev** (`dev/`)
  Documentation orientée développement et fonctionnement interne

- **Contributing** (`contributing/`)
  Comment aider à améliorer Apprise et son écosystème

- **Services** (`services/`)
  Documentation spécifique à un service de notification, y compris la syntaxe d'URL, les options de configuration et des exemples

- **Sponsorships** (`sponsorships/`)
  Entrées de sponsors d'entreprise, chacune contenant un fichier `meta.json` et des logos optionnels.
  Ce répertoire est **géré par les mainteneurs** — n'y ajoutez ou modifiez rien sans en avoir été
  expressément chargé. Consultez `sponsorships/README.md` pour le schéma complet et les conventions
  de nommage des logos.

## Bien Débuter comme Contributeur

### Prérequis

- Node.js (LTS recommandé)
- `pnpm` (version verrouillée dans `package.json`)
- Git

### Démarrage Rapide

1. Installer les dépendances :

   ```bash
   pnpm install
   ```

2. Apporter vos changements dans la documentation
   Ajoutez, modifiez ou améliorez n'importe quel fichier Markdown.

3. Lancer la validation :

   ```bash
   pnpm lint
   ```

   La plupart des problèmes de formatage peuvent être corrigés automatiquement avec :

   ```bash
   pnpm lint:fix
   ```

4. Ouvrir une pull request

> Si le lint échoue, il vous indiquera exactement ce qui doit être corrigé.

## Ajouter ou Améliorer un Service

Chaque service se trouve à l'emplacement suivant :

```text
locales/<locale>/services/<service>/index.md
```

De manière optionnelle, un service peut inclure un répertoire `images/` pour les logos ou schémas.

```text
services/<service>/
├── index.md
└── images/
    └── logo.svg
```

### Logos de Service

Les logos de service sont facultatifs, mais encouragés lorsqu'un logo officiel existe.

- Formats pris en charge : `.svg`, `.png`, `.jpg`, `.jpeg`
- Les images raster ne doivent pas dépasser :
  - **200px de hauteur**
  - **440px de largeur**

S'ils sont présents, les logos sont affichés automatiquement sur la page du service.

---

## Modèle de Page de Service

Chaque page de service commence par un bloc frontmatter qui décrit ses capacités.

Ces métadonnées sont **utilisées pour générer automatiquement la section Aperçu** du site.

Exemple minimal :

````md
---
title: "Notifications Example"
description: "Envoyer des notifications avec Example"
sidebar:
  label: "Example"

source: https://example.com
group: general

schemas:
  - example://

sample_urls:
  - example://{token}/
  - example://{token}/{target}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Comment configurer Example

## Syntaxe

La syntaxe valide est la suivante :

- `example://{token}`
- `example://{token}/{target}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                           |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| token    | oui         | Jeton permettant d'acceder au serveur Example.                                                        |
| target   | non         | Cible que vous souhaitez notifier. Si aucune cible n'est precisee, une notification nous est envoyee. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemple

Envoyer une notification Example :

```bash
apprise -vv -t "Mon Titre" -b "Corps du Message" \
   "example://my-token/target"
```
````

> Les marqueurs comme `<!-- SERVICE:DETAILS -->` sont intentionnels et doivent rester en place.
> Ils sont remplacés automatiquement lors du rendu de la documentation.

Si vous avez créé un fichier `mdx` à la place, vous pouvez utiliser `{/* SERVICE:DETAILS */}` à la place.

### Référence Complète du Frontmatter

L'exemple ci-dessus présente les champs courants. Une page de service peut également comporter les champs optionnels suivants :

```md
---
# Indicateurs de capacité — mettre à true si le service prend en charge la fonctionnalité
has_attachments: false
has_image: false
has_sms: false
has_selfhosted: false

# Limites de longueur de message (supprimer le bloc entier si le service n'a pas de limites connues)
limits:
  - name: "Titre"
    max_chars: 250
  - name: "Corps"
    max_chars: 2000

# Services retirés — indiquer la date à laquelle le service a cessé d'être disponible
# ended: YYYY-MM-DD

# -----------------------------------------------------------------------
# Champs de parrainage — RÉSERVÉ AUX MAINTENEURS. Ne pas ajouter ni modifier.
# -----------------------------------------------------------------------
# sponsorship_level: 50   # Entier 1–100 ; contrôle le niveau de visibilité sur le site
# sponsorship_weight: 1   # Optionnel 1–5 ; poids de rotation de la bannière pour le niveau 75+
# sponsor_since: "2026-06"
# sponsor_message: ""     # Une chaîne vide désactive intentionnellement le message de bannière
---
```

> **N'ajoutez ni ne modifiez les champs de parrainage** sauf si vous êtes mainteneur du projet
> ou si vous en avez été explicitement chargé. Ces champs ont une portée commerciale.
> Un `sponsor_message: ""` vide est intentionnel — il supprime le message de bannière sans retirer
> le créneau de bannière du sponsor. Consultez [CONTRIBUTING.md](../../../CONTRIBUTING.md)
> pour le tableau complet des niveaux de parrainage et les règles de validation.

## Localisation et Traductions

- Chaque langue vit sous `locales/<locale>/`
- L'anglais (`en`) est la langue par défaut
- Les traductions peuvent être partielles et incrémentales
- Préférez les liens relatifs entre pages de documentation dans une même locale
- Évitez les liens internes absolus à la racine comme `/services/` ou `/url-builder/` dans le contenu traduit
- Les assets partagés absolus à la racine comme `/assets/...` conviennent lorsqu'ils sont volontairement globaux

Exemples :

```md
[Services Pris en Charge](../services/)
[Générateur d'URL](../url-builder/)
![Logo du Service](./images/logo.svg)
```

Le build du site inclut un garde-fou qui réécrit les liens internes locaux pour les locales non par défaut pendant la synchronisation, mais les contributeurs devraient tout de même écrire des liens sûrs pour leur locale dans les sources dès que possible.

Même les traductions partielles sont les bienvenues.

## Linting et Validation

Ce dépôt utilise des vérifications automatiques pour garantir :

- un formatage Markdown cohérent ;
- des clés frontmatter et une structure prises en charge ;
- un rendu prévisible sur le site.

Le lint existe pour **aider les contributeurs**, pas pour les bloquer. La plupart des échecs concernent le formatage ou des métadonnées non prises en charge et sont faciles à corriger.

## Comment Vous Pouvez Aider

- Améliorer la documentation d'un service que vous utilisez
- Clarifier les sections confuses
- Ajouter des exemples
- Corriger des fautes ou des problèmes de formatage
- Traduire du contenu dans une autre langue

Si vous ne savez pas où quelque chose doit aller, ouvrez une issue et demandez.
