---
title: "Notifications SpugPush"
description: "Envoyer des notifications SpugPush."
sidebar:
  label: "SpugPush"

source: https://push.spug.dev/

schemas:
  - spugpush

sample_urls:
  - https://push.spug.dev/send/{token}
  - spugpush://{token}

limits:
  max_chars: 10000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

SpugPush est un service webhook simple fourni par la plateforme de supervision Spug. Il permet aux applications d'envoyer des messages d'alerte a l'aide d'un jeton d'acces securise.

1. Visitez le service [SpugPush](https://push.spug.dev/).
1. Connectez-vous et generez votre **token**.
1. Copiez l'URL webhook complete, qui ressemblera a ceci :

```text
https://push.spug.dev/send/abc123def456ghi789jkl012mno345pq
```

La portion `token` a la fin est la seule valeur dont Apprise a besoin.

### Prise en Charge Apprise

Apprise prend en charge a la fois le webhook natif complet et une forme d'URL simplifiee.

## Syntaxe

La syntaxe valide est la suivante :

- `https://push.spug.dev/send/{token}`
- `spugpush://{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                |
| -------- | ----------- | -------------------------------------------------------------------------- |
| token    | Oui         | Jeton SpugPush de 32 a 64 caracteres utilise pour authentifier la requete. |

Vous pouvez egalement utiliser le format avec chaine de requete : `spugpush://?token=YOUR_TOKEN`.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Utilisation de l'URL Apprise simplifiee :

```bash
apprise -vv -t "SpugPush Title" -b "Contenu de la Notification" \
   spugpush://abc123def456ghi789jkl012mno345pq
```

Utilisation du token comme parametre de requete :

```bash
apprise -vv -t "SpugPush Title" -b "Contenu de la Notification" \
   spugpush://?token=abc123def456ghi789jkl012mno345pq
```

Utilisation de l'URL webhook native complete :

```bash
apprise -vv -t "SpugPush Title" -b "Contenu de la Notification" \
   https://push.spug.dev/send/abc123def456ghi789jkl012mno345pq
```
