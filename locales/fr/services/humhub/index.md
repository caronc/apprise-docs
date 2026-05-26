---
title: "Notifications HumHub"
description: "Envoyer des notifications dans des espaces HumHub sous forme de publications."
sidebar:
  label: "HumHub"

source: https://www.humhub.com/

schemas:
  - humhub: insecure
  - humhubs

has_selfhosted: true

limits:
  max_chars: 4000

sample_urls:
  - humhubs://{token}@{hostname}/{container_id}
  - humhubs://{user}:{password}@{hostname}/{container_id}
  - humhubs://{token}@{hostname}/{id1}/{id2}/{id3}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

HumHub est un reseau social autohberge destine aux equipes. Pour utiliser ce plugin, vous avez besoin d'une instance HumHub en cours d'execution avec le [module REST API](https://marketplace.humhub.com/module/rest) installe et actif.

### Jeton Bearer (recommande)

1. Connectez-vous a votre instance HumHub en tant qu'administrateur.
2. Accedez a **Administration > Modules** et confirmez que le module REST API est active.
3. Allez dans **Administration > Authentification > REST API > Authentification Bearer**.
4. Activez l'authentification par jeton Bearer et generez un nouveau jeton.
5. Copiez le jeton genere -- c'est votre `{token}`.

### Authentification de base

Vous pouvez egalement vous authentifier directement avec votre nom d'utilisateur et votre mot de passe HumHub. Aucune configuration supplementaire n'est necessaire au-dela d'un compte HumHub valide.

### Trouver un identifiant de conteneur

Chaque espace HumHub possede un identifiant de conteneur numerique. Pour le trouver :

1. Naviguez vers l'espace dans votre instance HumHub.
2. L'identifiant apparait dans l'URL de l'espace, par exemple `https://yourhost/s/mon-espace-42` -- le numero final est l'identifiant du conteneur.
3. Vous pouvez egalement interroger l'API REST : `GET /api/v1/space` renvoie tous les espaces avec leurs identifiants.

## Syntaxe

La syntaxe valide est la suivante :

- `humhubs://{token}@{hostname}/{container_id}`
- `humhubs://{user}:{password}@{hostname}/{container_id}`
- `humhubs://{token}@{hostname}/{id1}/{id2}/{id3}`
- `humhubs://{token}@{hostname}/?to={id1},{id2}`
- `humhubs://{token}@{hostname}:{port}/{container_id}`
- `humhub://{token}@{hostname}/{container_id}`

Utilisez **humhubs://** pour les connexions HTTPS (recommande) et **humhub://** pour le HTTP simple.

## Detail des parametres

| Variable     | Obligatoire | Description                                                                                                                                                                                                         |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname     | \*Oui       | Le nom d'hote ou l'adresse IP de votre instance HumHub.                                                                                                                                                             |
| token        | \*Oui       | Un jeton Bearer genere dans le panneau d'administration HumHub (utilise en l'absence de mot de passe).                                                                                                              |
| user         | \*Oui       | Votre nom d'utilisateur HumHub (utilise avec `password` pour l'authentification de base).                                                                                                                           |
| password     | Non         | Votre mot de passe HumHub. Lorsqu'il est fourni, l'authentification de base est utilisee a la place du jeton Bearer.                                                                                                |
| container_id | \*Oui       | L'identifiant numerique de l'espace HumHub (conteneur) ou publier. Plusieurs identifiants peuvent etre separes par `/` dans le chemin de l'URL, ou fournis sous forme de liste separee par des virgules via `?to=`. |
| to           | Non         | Alias de `container_id`. Accepte une liste d'identifiants de conteneurs separes par des virgules, utile dans les fichiers de configuration YAML ou les cibles basees sur le chemin ne sont pas pratiques.           |
| port         | Non         | Le port sur lequel votre instance HumHub ecoute. La valeur par defaut est **80** pour `humhub://` et **443** pour `humhubs://`.                                                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification avec un jeton Bearer :

```bash
# En supposant que le nom d'hote HumHub soit hub.exemple.com
# En supposant que le jeton Bearer soit montoken123
# En supposant que l'identifiant du conteneur soit 5
apprise -vv -t "Alerte" -b "Un evenement s'est produit" \
    "humhubs://montoken123@hub.exemple.com/5"
```

Envoyer a plusieurs espaces en une seule URL :

```bash
apprise -vv -t "Alerte" -b "Un evenement s'est produit" \
    "humhubs://montoken123@hub.exemple.com/1/5/12"
```

Envoyer avec l'authentification de base :

```bash
apprise -vv -t "Alerte" -b "Un evenement s'est produit" \
    "humhubs://admin:monmotdepasse@hub.exemple.com/5"
```

Envoyer via HTTP (non securise, a utiliser uniquement en developpement ou sur un reseau local) :

```bash
apprise -vv -t "Alerte" -b "Un evenement s'est produit" \
    "humhub://montoken123@hub.local/5"
```
