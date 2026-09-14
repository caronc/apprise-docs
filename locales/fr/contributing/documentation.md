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

<!-- SPONSORS:BANNER -->
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

> Les marqueurs de page de service ci-dessus — `<!-- SPONSORS:BANNER -->`,
> `<!-- SERVICE:DETAILS -->` et `<!-- TEMPLATE:SERVICE-PARAMS -->` — sont
> intentionnels et doivent rester en place. Ils sont remplacés automatiquement
> lors du rendu de la documentation.

Si vous avez créé un fichier `mdx` à la place, vous pouvez utiliser `{/* SERVICE:DETAILS */}` à la place.

### Marqueurs de Build

La plupart des pages de service devraient conserver ces trois marqueurs dans cet ordre :

```md
<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

...

<!-- TEMPLATE:SERVICE-PARAMS -->
```

Le pipeline de synchronisation prend aussi en charge plusieurs autres marqueurs de build.
Les fichiers Markdown utilisent normalement la forme en commentaire HTML, tandis que les
fichiers MDX peuvent utiliser la forme en commentaire JSX.

| Forme                                      | Exemple                    |
| ------------------------------------------ | -------------------------- |
| Commentaire HTML compatible Markdown / MDX | `<!-- SERVICE:DETAILS -->` |
| Commentaire JSX MDX                        | `{/* SERVICE:DETAILS */}`  |
| Placeholder MDX tolérant aux formateurs    | `{/_ SERVICE:DETAILS _/}`  |

Les marqueurs suivants sont actuellement pris en charge :

| Marqueur                                                            | Effet                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<!-- SERVICE:DETAILS -->`                                          | Pages de service uniquement. Génère le bloc Aperçu (URL source, capacités, logo).                                                                                                                                                                                             |
| `<!-- TEMPLATE:SERVICE-PARAMS -->`                                  | Injecte le tableau localisé réutilisable des paramètres de service depuis `locales/<locale>/_templates/service-params.md`.                                                                                                                                                    |
| `<!-- SPONSORS:BANNER -->`                                          | Pages de service uniquement. Injecte la bannière rotative des sponsors. Le fichier est automatiquement converti en `.mdx` lorsque ce marqueur est présent. La bannière n'affiche rien si aucun sponsor éligible n'existe, il est donc possible de l'ajouter par anticipation. |
| `<!-- SERVICES:FILTER -->`                                          | Index des services uniquement. Injecte le composant interactif de filtrage/liste des services.                                                                                                                                                                                |
| `<!-- SERVICES:COUNT -->`                                           | Toute page. Remplacé par le nombre de services actifs pris en charge.                                                                                                                                                                                                         |
| `<!-- SERVICES:<GROUP>:COUNT -->`                                   | Toute page. Remplacé par le nombre de services actifs d'un groupe, par exemple `<!-- SERVICES:GENERAL:COUNT -->`.                                                                                                                                                             |
| `<!-- SERVICES:BEGIN -->` / `<!-- SERVICES:END -->`                 | Région de secours de l'index des services pour la liste statique générée lorsque le filtre interactif n'est pas utilisé.                                                                                                                                                      |
| `<!-- SERVICES:<GROUP>:BEGIN -->` / `<!-- SERVICES:<GROUP>:END -->` | Région de secours de l'index des services pour un groupe de services généré.                                                                                                                                                                                                  |
| `<!-- GRAVEYARD:COUNT -->`                                          | Page du cimetière. Remplacé par le nombre de services retirés.                                                                                                                                                                                                                |
| `<!-- GRAVEYARD:BEGIN -->` / `<!-- GRAVEYARD:END -->`               | Page du cimetière. Région remplacée par la liste générée des services retirés.                                                                                                                                                                                                |
| `<!-- URL_BUILDER:COMPONENT -->`                                    | Page du générateur d'URL uniquement. Injecte l'application de génération d'URL.                                                                                                                                                                                               |
| `<!-- COMPANY_SPONSORS -->`                                         | Page des sponsors uniquement. Injecte les cartes des sponsors mis en avant.                                                                                                                                                                                                   |
| `<!-- TEMPLATE:EVICTION-TABLE -->`                                  | Injecte le tableau localisé réutilisable d'éviction des dépendances optionnelles depuis `locales/<locale>/_templates/eviction-table.md`. Ce marqueur est utilisé par des pages comme la référence Environment et le guide d'utilisation des ressources.                       |

Les marqueurs `TEMPLATE:*` sont découverts automatiquement depuis :

- `shared_templates/*.md` ou `shared_templates/*.mdx`
- `locales/<locale>/_templates/*.md` ou `locales/<locale>/_templates/*.mdx`

Par exemple, `locales/fr/_templates/service-params.md` devient
`<!-- TEMPLATE:SERVICE-PARAMS -->`, et `locales/fr/_templates/eviction-table.md`
devient `<!-- TEMPLATE:EVICTION-TABLE -->`. Les templates d'une locale remplacent
les templates partagés du même nom.

### Référence Complète du Frontmatter

L'exemple ci-dessus présente les champs courants. Une page de service peut également comporter les champs optionnels suivants :

```md
---
# Indicateurs de capacité — mettre à true si le service prend en charge la fonctionnalité
has_attachments: false
has_image: false
has_sms: false
has_chat: false
has_email: false
has_local: false
has_selfhosted: false

# Termes de recherche supplémentaires optionnels pour la boîte de recherche de la liste des services.
# À utiliser lorsque les utilisateurs tapent un nom qui n'apparaît pas dans le titre ou les schémas.
# Les points sont autorisés pour que les noms composés restent un seul token.
# La correspondance est par sous-chaîne, donc des requêtes plus courtes trouvent quand même des résultats.
# keywords: "alias, ancien-nom"

# Limites de longueur de message (supprimer le bloc entier si le service n'a pas de limites connues)
limits:
  - name: "Titre"
    max_chars: 250
  - name: "Corps"
    max_chars: 2000

# Format(s) de message accepté(s) par le service. Omettez entièrement ce
# champ si le service n'accepte que du texte brut. Voir « Formats de
# Corps » ci-dessous pour la directive « : default ».
# body_formats:
#   - html: default
#   - text

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

#### Champs Frontmatter d'un Service

| Champ           | Type               | Obligatoire | Rôle                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | chaîne             | Oui         | Titre de la page et nom d'affichage par défaut du service.                                                                                                                                                                                                                                                                                        |
| `description`   | chaîne             | Recommandé  | Court résumé du service utilisé par les listes générées et les métadonnées.                                                                                                                                                                                                                                                                       |
| `sidebar.label` | chaîne             | Recommandé  | Libellé court utilisé dans la navigation et les listes de services.                                                                                                                                                                                                                                                                               |
| `source`        | chaîne URL         | Recommandé  | Site officiel du service/projet. Seules les URL `http://` et `https://` sont acceptées par la synchronisation du site.                                                                                                                                                                                                                            |
| `group`         | chaîne             | Recommandé  | Identifiant de groupe utilisé par l'index des services. Les groupes inconnus reviennent au groupe par défaut pendant la synchronisation.                                                                                                                                                                                                          |
| `schemas`       | tableau de chaînes | Oui         | Schémas d'URL Apprise pris en charge, comme `discord://` ou `tgram://`.                                                                                                                                                                                                                                                                           |
| `sample_urls`   | tableau de chaînes | Recommandé  | Exemples d'URL Apprise utilisés dans les métadonnées générées et les aides du générateur d'URL.                                                                                                                                                                                                                                                   |
| `body_formats`  | tableau de chaînes | Non         | Format(s) de message accepté(s) par le service (`text`, `html`, `markdown`). Omettez entièrement pour un service texte uniquement. Voir [Formats de Corps](#formats-de-corps) ci-dessous.                                                                                                                                                         |
| `keywords`      | chaîne             | Non         | Termes de recherche supplémentaires pour la boîte de recherche de la liste des services. Séparés par des virgules ou des espaces ; les points sont autorisés. À utiliser lorsque le titre et les schémas ne contiennent pas un nom que les utilisateurs taperaient naturellement. La correspondance est par sous-chaîne et insensible à la casse. |
| `limits`        | tableau d'objets   | Non         | Limites optionnelles de longueur de message. Chaque entrée doit inclure un `name` affichable et `max_chars`.                                                                                                                                                                                                                                      |
| `ended`         | chaîne de date     | Non         | Marque un service retiré. Utilisez `YYYY`, `YYYY-MM` ou `YYYY-MM-DD`.                                                                                                                                                                                                                                                                             |

#### Formats de Corps

`body_formats` déclare le(s) format(s) de message qu'un service accepte :
`text`, `html`, ou `markdown`. Ce champ reflète la déclaration `notify_format`
du plugin correspondant dans la bibliothèque Apprise.

Le champ est entièrement optionnel. Une page de service qui l'omet est
documentée comme n'acceptant que `text`, la même valeur par défaut que
`NotifyBase` utilise lui-même lorsqu'un plugin ne déclare aucun
`notify_format`.

```yaml
# Service texte uniquement -- aucun bloc body_formats n'est nécessaire.
schemas:
  - example://
```

Lorsqu'un service accepte plusieurs formats, listez-les et marquez celui
par défaut avec un mapping à clé unique `format: default`, le même
raccourci que `schemas` utilise déjà pour `: insecure` :

```yaml
body_formats:
  - html: default
  - text
```

Règles, dans l'ordre :

1. **`body_formats` est optionnel.** Omettez-le entièrement pour un
   service texte uniquement ; cela équivaut à `body_formats: [text]`.
2. **Au plus une entrée peut être marquée `: default`.** Déclarer deux
   valeurs par défaut ou plus est un échec de validation de la
   documentation — il n'existe aucun moyen d'honorer deux valeurs par
   défaut sur le même service.
3. **Si aucune entrée n'est marquée `: default`, la première entrée de la
   liste devient la valeur par défaut implicite.** Ceci est valide et ne
   fera pas échouer la validation, mais `pnpm lint` affiche une
   recommandation d'en marquer une explicitement dès qu'un service déclare
   plus d'un format, car l'intention est facile à manquer à la lecture
   autrement.
4. **Le même format ne peut pas être déclaré deux fois** dans la même
   liste.
5. **Les noms de format inconnus font échouer la validation.** Seuls
   `text`, `html`, et `markdown` sont reconnus.

```yaml
# Valide : aucune valeur par défaut explicite -- "text" (la première
# entrée) est utilisée, mais pnpm lint recommande d'en marquer une
# explicitement.
body_formats:
  - text
  - html
  - markdown
```

```yaml
# Invalide : deux entrées marquées par défaut -- échoue la validation.
body_formats:
  - html: default
  - markdown: default
```

#### Indicateurs de Capacité

Les indicateurs de capacité sont des booléens frontmatter nommés `has_<feature>`.
Définissez-les à `true` uniquement lorsque le service prend en charge la fonctionnalité.
Ces indicateurs alimentent l'aperçu du service, les badges de fonctionnalités et les
paramètres de filtre d'URL ; par exemple, `has_attachments: true` devient le jeton de
filtre `attachments` dans `?f=attachments`.

| Clé frontmatter   | Jeton de filtre URL | Signification                                                     |
| ----------------- | ------------------- | ----------------------------------------------------------------- |
| `has_sms`         | `sms`               | Service axé sur la livraison SMS/MMS.                             |
| `has_chat`        | `chat`              | Service ciblant salons, canaux ou messages directs.               |
| `has_email`       | `email`             | Service axé sur l’envoi d’e-mails.                                |
| `has_local`       | `local`             | Service ciblant un système ou appareil local/natif.               |
| `has_selfhosted`  | `selfhosted`        | Service prenant en charge un déploiement auto-hébergé.            |
| `has_attachments` | `attachments`       | Service prenant en charge les pièces jointes.                     |
| `has_image`       | `image`             | Service utilisant les images ou icônes d'état gérées par Apprise. |

`has_sponsorship` est un raccourci spécial réservé aux mainteneurs pour
`sponsorship_level: 1` ; il est documenté séparément ci-dessous parce qu'il contrôle
la visibilité des sponsors plutôt qu'une capacité générale du service.

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
