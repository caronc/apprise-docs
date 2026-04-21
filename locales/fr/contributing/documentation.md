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
    config/
    qa/
    dev/
    contributing/
    assets/
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

Ces métadonnées sont **utilisées pour générer automatiquement la section Overview** du site.

Exemple minimal :

````md
---
title: "Example Notifications"
description: "Send notifications using Example"
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

## Account Setup

How to get set up with Example

## Syntax

Valid syntax is as follows:

- `example://{token}`
- `example://{token}/{target}`

## Parameter Breakdown

| Variable | Required | Description                                                                                    |
| -------- | -------- | ---------------------------------------------------------------------------------------------- |
| token    | yes      | Token to access the example server                                                             |
| target   | no       | The target you wish to notify. If no target is specified, we send a notification to ourselves. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Example

Send a Example notification:

```bash
apprise -vv -t "My Title" -b "Message Body" \
   "example://my-token/target"
```
````

> Les marqueurs comme `<!-- SERVICE:DETAILS -->` sont intentionnels et doivent rester en place.
> Ils sont remplacés automatiquement lors du rendu de la documentation.

Si vous avez créé un fichier `mdx` à la place, vous pouvez utiliser `{/* SERVICE:DETAILS *}` ou `{/_ SERVICE:DETAILS _/}`, par exemple : `{/*- SERVICE:DETAILS */}`

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
