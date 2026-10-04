---
title: "Notifications GoAlert"
description: "Déclencher et clôturer des alertes GoAlert."
sidebar:
  label: "GoAlert"

source: https://goalert.me

schemas:
  - goalert: insecure
  - goalerts

has_selfhosted: true

body_formats:
  - markdown

sample_urls:
  - goalerts://{hostname}/{integration_key}
  - goalerts://{hostname}:{port}/{integration_key}
  - goalerts://{hostname}/{path}/{integration_key}
  - goalerts://{hostname}/{integration_key1}/{integration_key2}
  - goalerts://{hostname}/{integration_key}?dedup=disk-check

limits:
  - name: "Title"
    max_chars: 1024
  - name: "Body"
    max_chars: 6144
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

GoAlert est une plateforme auto-hébergée de gestion des astreintes et des alertes. Apprise déclenche des alertes à l'aide d'une clé d'intégration GoAlert de type **Generic API** :

1. Connectez-vous à GoAlert et ouvrez le **Service** qui doit recevoir les alertes.
2. Dans la section **Integration Keys**, cliquez sur le bouton **+**.
3. Donnez un nom à la clé, par exemple `Apprise`, choisissez le type **Generic API** et enregistrez-la.
4. Copiez l'URL générée. Elle ressemble à `https://goalert.example.com/api/v2/generic/incoming?token=ab12cd34-ab12-4c5d-8e9f-0123456789ab`.

La valeur `token` à la fin est votre clé d'intégration, et le début de l'URL correspond à votre serveur GoAlert. Pour l'exemple ci-dessus, l'URL Apprise est `goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab`.

Chaque clé d'intégration appartient à un seul service GoAlert. Ajoutez d'autres clés à la même URL pour déclencher l'alerte dans plusieurs services à la fois.

## Syntaxe

La syntaxe valide est la suivante :

- `goalert://{hostname}/{integration_key}`
- `goalerts://{hostname}/{integration_key}`
- `goalerts://{hostname}:{port}/{integration_key}`
- `goalerts://{hostname}/{path}/{integration_key}`
- `goalerts://{hostname}/{integration_key1}/{integration_key2}/{integration_keyN}`

Utilisez **goalerts://** pour les connexions sécurisées (https) et **goalert://** pour les connexions non sécurisées (http).

## Détail des Paramètres

| Variable        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname        | Oui         | Le serveur GoAlert auquel vous envoyez votre alerte.                                                                                                                                                                                                                                                                                                                                |
| integration_key | Oui         | Une ou plusieurs clés d'intégration GoAlert de type **Generic API**. Chaque clé déclenche l'alerte dans le service auquel elle appartient.                                                                                                                                                                                                                                          |
| port            | Non         | Le port sur lequel le serveur GoAlert écoute. La valeur par défaut est **80** pour **goalert://** et **443** pour **goalerts://**.                                                                                                                                                                                                                                                  |
| path            | Non         | Si GoAlert est hébergé sous un sous-chemin (par exemple derrière un proxy inverse), indiquez-le avant vos clés d'intégration. La valeur par défaut est **/**.                                                                                                                                                                                                                       |
| action          | Non         | Ce qu'il faut faire de l'alerte. Les valeurs possibles sont **map**, **trigger** et **close**. **map** clôture les alertes correspondantes lorsque le type de notification est `success` et déclenche une alerte pour tous les autres types. **trigger** déclenche toujours une alerte et **close** clôture toujours les alertes correspondantes. La valeur par défaut est **map**. |
| dedup           | Non         | Une clé de déduplication. Les alertes envoyées avec la même clé mettent à jour la même alerte ouverte au lieu d'en créer une nouvelle, et une action **close** la clôture. Sans elle, GoAlert ne fait correspondre que les alertes ayant exactement le même titre et le même corps. Définissez donc une clé **dedup** dès qu'un message ultérieur doit clôturer une alerte.         |

Vous pouvez aussi joindre des métadonnées à une alerte en ajoutant des entrées `+clé=valeur` à l'URL, par exemple `+env=prod&+team=ops`.

Le titre devient le résumé de l'alerte, que GoAlert envoie par SMS et par appel vocal. Le corps devient le détail de l'alerte. Sans titre, le début du corps sert de résumé. GoAlert n'accepte pas de pièces jointes sur cette API.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Déclencher une alerte GoAlert :

```bash
# Supposons que notre {hostname} soit goalert.example.com
# Supposons que notre {integration_key} soit ab12cd34-ab12-4c5d-8e9f-0123456789ab
apprise -vv -t "Espace disque faible" -b "Seulement 2 % libre sur /var" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab"
```

Déclencher une alerte avec une clé de déduplication, puis la clôturer une fois le problème résolu :

```bash
# Déclencher l'alerte
apprise -vv -n failure -t "Espace disque faible" -b "Seulement 2 % libre sur /var" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab?dedup=disk-var"

# La clôturer (une notification success clôture les alertes par défaut)
apprise -vv -n success -t "Espace disque rétabli" -b "40 % libre sur /var" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab?dedup=disk-var"
```

Déclencher la même alerte dans deux services, avec des métadonnées :

```bash
apprise -vv -t "Échec de la sauvegarde" -b "La sauvegarde nocturne ne s'est pas terminée" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab/cd34ef56-cd34-4e5f-9a0b-0123456789cd?+env=prod"
```
