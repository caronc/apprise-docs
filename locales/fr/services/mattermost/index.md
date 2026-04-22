---
title: "Notifications Mattermost"
description: "Envoyer des notifications Mattermost."
sidebar:
  label: "Mattermost"

source: https://mattermost.com/

schemas:
  - mmost: insecure
  - mmosts

has_image: true
has_attachments: true

sample_urls:
  - mmosts://{hostname}/{token}
  - mmosts://{botname}@{hostname}/{token}
  - mmosts://{hostname}/{token}?mode=bot&to={channel_id}
  - mmosts://{team}@{hostname}/{token}?mode=bot&to=#general
  - mmosts://{hostname}:{port}/{path}/{token}?mode=bot&to={channel_id}

limits:
  max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser ce plugin, vous devez d'abord disposer d'une instance
<http://mattermost.com>. Téléchargez leur logiciel et configurez-le.

Ce plugin prend en charge 2 styles d'intégration distincts :

1. **Webhooks entrants (par défaut)**, qui publient vers `/hooks/<webhook_token>`.
2. **Publication robot (API REST) (`mode=bot`)**, qui publie vers `/api/v4/posts` à l'aide d'un jeton d'accès (robot ou utilisateur).

### Configuration du Webhook Entrant (par défaut)

Vous aurez besoin d'un \*_webhook entrant_. Vous pouvez le configurer comme suit :

1. Cliquez sur l'option **Integrations** dans le menu déroulant du canal, puis sélectionnez **Incoming Webhook** :<br/>
   <img alt="Webhook entrant Mattermost" src="./images/107084396-ff55dc00-67c4-11eb-899c-a65b2f639158.png" height="300">
2. À partir de là, sélectionnez **Add Incoming Webhook** :<br/>
   <img alt="Ajouter un webhook entrant" src="./images/107083851-3d9ecb80-67c4-11eb-8bf7-820a3554eadb.png" height="300">
3. Enfin, vous pourrez personnaliser le comportement du webhook, puis cliquer sur **Save** en bas de la page une fois terminé.<br/>
   <img alt="Generer une URL Apprise a partir de celui-ci" src="./images/107083865-442d4300-67c4-11eb-8228-7d7afb5974e3.png" height="300">

L'URL fournie peut ressembler à ceci :

```bash
# The URL provided by Mattermost:
http://localhost:8065/hooks/yokkutpah3r3urc5h6i969yima
         ^        ^                ^
         |        |                |
      hostname   port           webhook token

# From here you can do the following to generate your Apprise URL:
# - http:// becomes mmost://
# - drop /hooks reference
# Which gets you:
mmost://localhost:8065/yokkutpah3r3urc5h6i969yima
```

### Publication en Mode Robot

Si vous voulez que le message soit attribué à un **compte robot** (ou à un utilisateur précis), vous devez utiliser la publication via l'API REST Mattermost :

- `POST /api/v4/posts`
- `Authorization: Bearer <bot_access_token>`
- charge utile JSON contenant `channel_id` et `message`

Les incoming webhooks ne s'authentifient pas comme une session utilisateur ;
ils ne peuvent donc pas réellement publier en tant que compte robot. Vous pouvez
toujours définir un nom d'affichage en mode webhook, mais cela dépend des
réglages du serveur Mattermost autorisant les surcharges.

En mode robot, vous pouvez cibler les canaux de deux manières :

1. Fournir un `channel_id` directement (méthode recommandée).
2. Fournir uniquement `#channel_name` lorsqu'un nom d'équipe est également fourni, car Apprise
   doit effectuer une résolution pour traduire `#channel_name` en `channel_id`.

### Pièces Jointes (Mode Robot Uniquement)

Les pièces jointes ne sont prises en charge qu'en **mode robot**. Apprise envoie
d'abord chaque fichier vers `/api/v4/files` (une requête par fichier et par canal),
puis inclut les identifiants de fichiers renvoyés dans la charge utile du post.

:::note
Le mode webhook ne prend pas en charge les pièces jointes. Si des pièces jointes
sont fournies en mode webhook, Apprise journalise un avertissement et envoie
le message texte sans elles.
:::

## Syntaxe

### Mode Webhook (par Défaut)

La syntaxe valide est la suivante :

- `mmost://{hostname}/{token}`
- `mmost://{hostname}:{port}/{token}`
- `mmost://{botname}@{hostname}/{token}`
- `mmost://{botname}@{hostname}:{port}/{token}`
- `mmost://{hostname}/{path}/{token}`
- `mmost://{hostname}:{port}/{path}/{token}`
- `mmost://{botname}@{hostname}/{path}/{token}`
- `mmost://{botname}@{hostname}:{port}/{path}/{token}`

Les connexions sécurisées (via https) doivent utiliser **`mmosts://`**, tandis
que les connexions non sécurisées (via http) doivent utiliser **`mmost://`**.
Les deux suivent la même structure.

Le mode webhook peut être utilisé avec ou sans canaux :

- Si des canaux sont fournis, Apprise inclura `"channel"` dans la charge utile.
- Si aucun canal n'est fourni, Apprise n'inclura pas `"channel"`, et
  Mattermost utilisera les paramètres par défaut configurés dans le webhook.

### Mode Robot (`mode=bot`)

Le mode robot utilise la même syntaxe d'URL de base, avec ces particularités :

- `{token}` est un **jeton d'accès** (jeton robot ou jeton utilisateur) ;
- vous devez fournir une ou plusieurs cibles via `to=` ou `channels=` ;
- `image` et `icon_url` ne s'appliquent pas dans ce mode.

Si aucun nom d'équipe n'est fourni, les cibles de type `#channel_name` sont ignorées.

Exemples :

- `mmosts://{hostname}/{access_token}?mode=bot&to={channel_id}`
- `mmosts://{hostname}/{access_token}?mode=bot&to={id1},{id2}`
- `mmosts://{team}@{hostname}/{access_token}?mode=bot&to=#general`
- `mmosts://{hostname}/{access_token}?mode=bot&team={team}&to=#general`
- `mmosts://{hostname}:{port}/{path}/{access_token}?mode=bot&to={channel_id}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                                                     |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui    | Le serveur sur lequel Mattermost écoute.                                                                                                                                                                                                                                                        |
| token    | Oui    | **Mode webhook :** jeton de webhook entrant. **Mode robot :** jeton d'accès robot ou utilisateur (jeton Bearer).                                                                                                                                                                                |
| port     | Non    | Le port sur lequel Mattermost écoute. S'il est omis, Apprise utilise le port par défaut associé au schéma, par exemple 443 pour `mmosts://`. De nombreuses installations Mattermost utilisent le port **8065**, indiquez-le si nécessaire.                                                      |
| path     | Non    | Vous pouvez préciser un sous-chemin si besoin. Le dernier élément du chemin doit être le **token**.                                                                                                                                                                                             |
| botname  | Non    | **Mode webhook uniquement.** Surcharge le nom d'affichage du message webhook (champ `username` de la charge utile). Requiert le réglage administrateur Mattermost "Enable integrations to override usernames". Non applicable en mode robot, où les messages apparaissent sous le nom du robot. |
| team     | Non    | **Mode robot uniquement.** Nom d'équipe utilisé pour résoudre les cibles `#channel_name` en identifiants de canaux. Peut aussi être fourni dans la partie utilisateur de l'URL (`{team}@{hostname}`). Non applicable en mode webhook.                                                           |
| image    | Non    | **Mode webhook uniquement.** Inclut l'image d'état Apprise. Ignoré si `icon_url` est défini.                                                                                                                                                                                                    |
| icon_url | Non    | **Mode webhook uniquement.** Surcharge l'icône d'avatar avec une URL personnalisée. Requiert le réglage administrateur Mattermost "Enable integrations to override profile picture icons".                                                                                                      |
| channels | Non    | **Mode webhook :** noms de canaux. **Mode robot :** identifiants de canaux (ou `#channel_name` si `team` est fourni). Vous pouvez fournir une liste séparée par des virgules.                                                                                                                   |
| channel  | Non    | Alias de `channels`.                                                                                                                                                                                                                                                                            |
| to       | Non    | Alias de `channels`. Utile dans une configuration YAML où `to:` existe déjà.                                                                                                                                                                                                                    |
| mode     | Non    | `webhook` (par défaut) ou `bot`.                                                                                                                                                                                                                                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Mattermost sécurisée à notre serveur via un webhook :

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   mmosts://mattermost.server.local/3ccdd113474722377935511fc85d3dd4
```

Envoyer une notification Mattermost sécurisée à notre serveur tournant sur le port TCP 8065 :

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our secure {port} our server is running on is 8065
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   mmosts://mattermost.server.local:8065/3ccdd113474722377935511fc85d3dd4
```

Envoyer une notification Mattermost non sécurisée à un serveur en visant des canaux spécifiques :

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4
# Assuming our {channels} is #support and #general

# We don't need to provide the '#' (hashtag) prefix:
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   mmost://mattermost.server.local/3ccdd113474722377935511fc85d3dd4?channels=support,general
```

Envoyer une notification webhook avec un nom d'affichage personnalisé (`botname`) :

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4
# Assuming our desired display name is mybot

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   'mmosts://mybot@mattermost.server.local/3ccdd113474722377935511fc85d3dd4'
```

Publier en tant que bot dans un identifiant de canal spécifique :

```bash
# Assuming our {access_token} is abcd1234
# Assuming our {channel_id} is f6g7ha13d4e58ib2c9aa
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   'mmosts://mattermost.server.local/abcd1234?mode=bot&to=f6g7ha13d4e58ib2c9aa'
```

Publier en tant que bot dans plusieurs identifiants de canaux :

```bash
# Assuming our {access_token} is abcd1234
# Assuming our {channel_ids} are a1b2c3d4e5f6g7h8i9j0 and f6g7ha13d4e58ib2c9aa
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   'mmosts://mattermost.server.local/abcd1234?mode=bot&to=a1b2c3d4e5f6g7h8i9j0,f6g7ha13d4e58ib2c9aa'
```

Publier en tant que bot en utilisant la résolution `#channel_name` (équipe requise) :

```bash
# Assuming our {access_token} is abcd1234
# Assuming our {team} is myteam
# Assuming our {channel_name} is general

# Team provided via URL user portion:
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   'mmosts://myteam@mattermost.server.local/abcd1234?mode=bot&to=#general'

# Team provided via query string:
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   'mmosts://mattermost.server.local/abcd1234?mode=bot&team=myteam&to=#general'
```

Envoyer un message bot avec une pièce jointe :

```bash
# Assuming our {access_token} is abcd1234
# Assuming our {channel_id} is f6g7ha13d4e58ib2c9aa
# Assuming the file to attach is /path/to/report.pdf

apprise -vv -t "Rapport" -b "Voir ci-joint." \
   --attach /path/to/report.pdf \
   'mmosts://mattermost.server.local/abcd1234?mode=bot&to=f6g7ha13d4e58ib2c9aa'
```
