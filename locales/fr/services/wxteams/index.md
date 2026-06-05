---
title: "Notifications Webex Teams"
description: "Envoyer des notifications Webex Teams avec prise en charge optionnelle des pièces jointes."
sidebar:
  label: "Webex Teams"

source: https://teams.webex.com

schemas:
  - wxteams
  - webex

has_chat: true
has_attachments: true

sample_urls:
  - https://api.ciscospark.com/v1/webhooks/incoming/{token}
  - https://webexapis.com/v1/webhooks/incoming/{token}
  - wxteams://{token}/
  - webex://{token}/
  - wxteams://{bot_token}/{room_id}/

limits:
  - name: "Webhook"
    max_chars: 1000
  - name: "API Robot"
    max_chars: 7439
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Les notifications Webex Teams peuvent être envoyées selon deux modes :
**Webhook** (simple, sans pièces jointes) et **Robot** (accès API complet avec
prise en charge des pièces jointes). Le mode est détecté automatiquement à
partir du format du jeton, ou vous pouvez le forcer avec le paramètre d'URL `mode=`.

### Mode 1 — Webhook (par défaut)

Pour utiliser le mode webhook, accédez d'abord à [https://teams.webex.com](https://teams.webex.com)
et créez un compte si vous n'en avez pas encore. Vous devrez créer au moins
un "space" avant de récupérer le "incoming webhook".

Ensuite, installez l'intégration "Incoming webhook" disponible dans la
catégorie "other" sur [https://apphub.webex.com/integrations/](https://apphub.webex.com/integrations/). Au moment
de la rédaction, [ce lien direct](https://apphub.webex.com/applications/incoming-webhooks-cisco-systems-38054-23307-75252)
y menait.

Une fois connecté, cliquez sur "Connect", acceptez les permissions, puis
donnez un nom au webhook, par exemple `apprise`.

Une fois terminé, vous recevrez une URL ressemblant à ceci :

```text
https://api.ciscospark.com/v1/webhooks/incoming/\
       Y3lzY29zcGkyazovL3VzL1dFQkhPT0sajkkzYWU4fTMtMGE4Yy00
```

![image](./images/218330896-ea8715df-0e7d-4584-a803-aa23add9bd15.png)

La dernière partie de l'URL est votre `{token}` :

- `https://api.ciscospark.com/v1/webhooks/incoming/{token}`

**Remarque :** Apprise prend en charge cette URL _telle quelle_ (_depuis la version 0.7.7_).

> **Limitation :** les incoming webhooks ne prennent **pas** en charge les pièces jointes.
> Utilisez le mode robot (ci-dessous) si vous devez envoyer des fichiers.

### Mode 2 — Robot (Jeton API + Identifiant de Salon, avec pièces jointes)

1. Rendez-vous sur [https://developer.webex.com/my-apps](https://developer.webex.com/my-apps) et créez un nouveau **robot**.
2. Après création du robot, copiez le **jeton d'accès du robot** affiché sur la page
   de confirmation (il n'est visible qu'une seule fois).
3. Invitez le robot dans l'espace/salon où il devra publier.
4. Récupérez l'**identifiant de salon** de cet espace. Vous pouvez lister les salons via
   la [Rooms API](https://developer.webex.com/docs/api/v1/rooms/list-rooms).
   Cet identifiant de salon est une longue chaîne base64url comme
   `Y2lzY29zcGFyazovL3VzL1JPTU9NLzEyMzQ1`.

Assemblez votre URL Apprise comme suit :

```text
wxteams://{bot_token}/{room_id}
```

## Syntaxe

La syntaxe valide est la suivante :

### Mode Webhook

- `https://api.ciscospark.com/v1/webhooks/incoming/{token}`
- `https://webexapis.com/v1/webhooks/incoming/{token}`
- `wxteams://{token}/`
- `webex://{token}/`

### Mode Robot

- `wxteams://{bot_token}/{room_id}/`
- `wxteams://{bot_token}/{room_id1}/{room_id2}/`

Vous pouvez forcer explicitement un mode en ajoutant `?mode=webhook`
ou `?mode=bot`. Si ce paramètre est omis, le mode est détecté automatiquement
à partir du format du jeton :

- Un jeton de 80 à 160 caractères alphanumériques est traité comme un jeton **webhook**.
- Tout autre jeton (plus long, ou contenant des caractères non alphanumériques) est traité comme un jeton d'accès **robot** et exige au moins un identifiant de salon.

## Détail des Paramètres

| Variable | Requis          | Description                                                                    |
| -------- | --------------- | ------------------------------------------------------------------------------ |
| token    | Oui             | Jeton webhook _ou_ jeton d'accès robot (détection automatique selon le format) |
| room_id  | Mode Robot seul | Identifiant du salon Webex où publier (peut être répété plusieurs fois)        |
| mode     | Non             | Force le mode `webhook` ou `bot` (détection automatique si omis)               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Webex Teams via webhook :

```bash
# Supposons que notre {token} soit T1JJ3T3L2DEFK543
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   wxteams://T1JJ3T3L2DEFK543/
```

Envoyer une notification via l'API robot vers un salon spécifique :

```bash
# {bot_token} et {room_id} sont des valeurs de remplacement pour vos vraies données
apprise -vv -b "Bonjour depuis le robot Apprise" \
   wxteams://NThhZjI0NzQtMGQx.../Y2lzY29zcGFyazovL3Vz.../
```

Envoyer une notification avec une pièce jointe (mode robot requis) :

```bash
apprise -vv -b "Voir le rapport joint" \
   --attach /path/to/report.pdf \
   wxteams://NThhZjI0NzQtMGQx.../Y2lzY29zcGFyazovL3Vz.../
```

Publier dans plusieurs salons avec un seul jeton robot :

```bash
apprise -vv -b "Message diffuse" \
   wxteams://{bot_token}/{room_id1}/{room_id2}/
```
