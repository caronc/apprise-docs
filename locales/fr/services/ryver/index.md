---
title: "Notifications Ryver"
description: "Envoyer des notifications Ryver."
sidebar:
  label: "Ryver"

source: https://ryver.com/

schemas:
  - ryver

has_chat: true
has_image: true

sample_urls:
  - https://{organization}.ryver.com/application/webhook/{token}
  - ryver://{organization}/{token}/
  - ryver://{botname}@{organization}/{token}/
  - ryver://{organization}/{token}/?webhook=slack

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Ryver, vous devez avoir créé au préalable le ou les forums que vous souhaitez notifier. Cette étape est nécessaire avant de suivre les instructions ci-dessous.

Ensuite, vous devez définir un nouveau webhook et obtenir l'URL correspondante. Pour ce faire :

1. Cliquez sur **Integrations** > **Incoming Webhooks** dans les paramètres à gauche.
2. Cliquez sur le bouton **Create Webhook**.
3. Choisissez soit **Slack** soit **Plain/text Ryver**, car ce plugin prend en charge les deux.
4. Quel que soit le type de webhook choisi (Slack ou Ryver), les étapes suivantes restent identiques :
   - Définissez le type de webhook sur **Chat Message**.
   - Sélectionnez le ou les forums déjà configurés pour autoriser l'accès à ce webhook.
   - Cliquez sur Suivant.

Une fois ce processus terminé, vous recevrez une URL similaire à celle-ci :
`https://apprise.ryver.com/application/webhook/ckhrjW8w672m6HG`

Cela correspond effectivement à :<br/>
`https://{organization}.ryver.com/application/webhook/{token}`

**Remarque :** Apprise prend en charge cette URL _telle quelle_ (_depuis la v0.7.7_) ; il n'est plus nécessaire d'analyser l'URL davantage. Toutefois, cela entraîne légèrement moins de surcharge (en interne) si vous le faites.

La dernière partie de l'URL fournie est le token qui nous intéresse. Par rapport à l'exemple ci-dessus :

- le **token** est `ckhrjW8w672m6HG`
- l'**organization** est `apprise`

## Syntaxe

La syntaxe valide est la suivante :

- `https://{organization}.ryver.com/application/webhook/{token}`
- `ryver://{organization}/{token}/`
- `ryver://{botname}@{organization}/{token}/`
- `ryver://{organization}/{token}/?webhook=slack`

## Détail des Paramètres

| Variable     | Requis | Description                                                                                                                                                                      |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| organization | Oui    | L'organisation sous laquelle vous avez créé votre webhook.                                                                                                                       |
| token        | Oui    | Le token fourni après la création d'un _incoming-webhook_.                                                                                                                       |
| botname      | Non    | Définit le nom d'affichage depuis lequel le message apparaîtra.                                                                                                                  |
| webhook      | Non    | Le type de webhook créé (Slack ou Ryver). Les seules valeurs possibles sont **slack** et **ryver**. La valeur par défaut est **ryver** si aucune valeur webhook n'est spécifiée. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Ryver :

```bash
# Assuming our {organization} is apprise
# Assuming our {token} is T1JJ3T3L2
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   ryver:///apprise/T1JJ3T3L2
```
