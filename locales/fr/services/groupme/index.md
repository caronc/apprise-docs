---
title: "Notifications GroupMe"
description: "Envoyer des notifications dans les groupes GroupMe via l'API Bot, avec prise en charge optionnelle des pieces jointes d'images."
sidebar:
  label: "GroupMe"

source: https://groupme.com/

schemas:
  - groupme

has_chat: true
has_attachments: true

sample_urls:
  - groupme://{BotID}
  - groupme://{BotID}/{AccessToken}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Les notifications GroupMe sont envoyees via un **Bot** que vous creez et associez a un groupe. Chaque bot est lie a un seul groupe ; creez un bot par groupe que vous souhaitez recevoir des notifications.

1. Connectez-vous sur [https://dev.groupme.com/bots](https://dev.groupme.com/bots) avec votre compte GroupMe.
2. Cliquez sur **Create Bot** (Creer un bot).
3. Selectionnez le groupe dans lequel le bot doit publier ses messages.
4. Donnez un nom au bot (par exemple `Apprise`), puis cliquez sur **Submit** (Soumettre).
5. Copiez le **Bot ID** affiche dans la liste des bots -- il s'agit d'une chaine hexadecimale telle que `68ca900a7d17f9b9891a73af2a`.

Ce **Bot ID** est tout ce dont vous avez besoin pour les notifications textuelles.

### Prise en charge des pieces jointes (optionnel)

Pour envoyer des pieces jointes d'images, le plugin doit d'abord televerser chaque image sur le service d'images GroupMe, ce qui necessite votre **jeton d'acces** personnel en plus du Bot ID.

1. Visitez [https://dev.groupme.com/](https://dev.groupme.com/) et connectez-vous.
2. Cliquez sur **Access Token** (Jeton d'acces) dans le coin superieur droit de la page.
3. Copiez le jeton affiche.

Fournissez-le a Apprise en tant que deuxieme segment de chemin dans l'URL. Sans jeton, les messages texte sont toujours envoyes normalement ; seule l'etape de televersement de l'image est ignoree.

## Syntaxe

Les syntaxes valides sont les suivantes :

- `groupme://{BotID}`
- `groupme://{BotID}/{JetonAcces}`

## Detail des parametres

| Variable   | Requis | Description                                                                                                                                                            |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BotID      | \*Oui  | Le Bot ID copie depuis [https://dev.groupme.com/bots](https://dev.groupme.com/bots). Une chaine hexadecimale telle que `68ca900a7d17f9b9891a73af2a`.                   |
| JetonAcces | Non    | Votre jeton d'acces GroupMe personnel, requis uniquement pour l'envoi de pieces jointes d'images. Obtenez-le sur [https://dev.groupme.com/](https://dev.groupme.com/). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification textuelle dans un groupe GroupMe :

```bash
apprise -vv -t "Alerte" -b "Quelque chose s'est produit." \
   "groupme://68ca900a7d17f9b9891a73af2a"
```

Envoyer une notification avec une piece jointe d'image (necessite un jeton d'acces) :

```bash
apprise -vv -t "Alerte" -b "Voir l'image jointe." \
   --attach /chemin/vers/image.png \
   "groupme://68ca900a7d17f9b9891a73af2a/abc123def456gh789ijklmn0op"
```

Exemple de configuration YAML (texte uniquement) :

```yaml
urls:
  - groupme://68ca900a7d17f9b9891a73af2a
```

Exemple de configuration YAML (avec pieces jointes) :

```yaml
urls:
  - groupme://68ca900a7d17f9b9891a73af2a/abc123def456gh789ijklmn0op
```
