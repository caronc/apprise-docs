---
title: "Notifications Slack"
description: "Envoyer des notifications Slack."
sidebar:
  label: "Slack"

source: https://slack.com/

schemas:
  - slack

has_chat: true
has_attachments: true
has_image: true

sample_urls:
  - https://hooks.slack.com/services/{tokenA}/{tokenB}/{tokenC}
  - slack://{tokenA}/{tokenB}/{tokenC}
  - slack://{OAuthToken}/
  - https://hooks.slack.com/workflows/{seg1}/{seg2}/{seg3}/{seg4}
  - slack://{seg1}/{seg2}/{seg3}/{seg4}/?mode=workflow
  - https://hooks.slack.com/triggers/{seg1}/{seg2}/{seg3}
  - slack://{seg1}/{seg2}/{seg3}/?mode=trigger

limits:
  max_chars: 35000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Slack est un peu plus complexe que certains autres services de notification. Voici donc un résumé rapide de ce que vous devez savoir et faire pour envoyer des notifications avec cet outil.

### Méthode 1 : Webhook Entrant

Les notifications Slack exigent tout d’abord un _incoming-webhook_ auquel se connecter.

1. Vous pouvez créer ce webhook [ici](https://my.slack.com/services/new/incoming-webhook/). Suivez simplement l’assistant pour choisir à l’avance le ou les canaux où vos messages seront diffusés.
2. Vous pouvez aussi créer une Slack App [ici](https://api.slack.com/slack-apps) et l’associer à l’un de vos espaces de travail Slack. Il suffit ensuite de quelques étapes supplémentaires, toutes effectuées depuis l’écran de configuration de l’application, pour récupérer votre URL webhook :
   - vous devez **activer** la fonctionnalité **Incoming Webhook** si ce n’est pas déjà fait ;
   - sur ce même écran de configuration, vous pouvez créer un webhook et l’associer à un canal ou à un utilisateur.

Quelle que soit l’option choisie ci-dessus, vous obtiendrez une URL webhook ressemblant à ceci :<br/>
`https://hooks.slack.com/services/T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F`

Cette URL correspond en pratique à :<br/>
`https://hooks.slack.com/services/{tokenA}/{tokenB}/{tokenC}`

**Remarque :** Apprise prend en charge cette URL _telle quelle_ (_depuis la version 0.7.7_). Vous n’avez donc plus besoin de la reparser, même s’il y a un léger gain interne à le faire.

Si vous voulez la convertir en URL Apprise, procédez comme suit :
la dernière partie de l’URL qui vous est fournie contient les 3 jetons nécessaires à l’envoi des notifications. Dans l’exemple ci-dessus, ils sont les suivants :

1. **TokenA** est `T1JJ3T3L2`
1. **TokenB** est `A1BRTD4JD`
1. **TokenC** est `TIiajkdnlazkcOXrIdevi7F8`

### Méthode 2 : Créer un Robot

Les bots offrent un peu plus de souplesse que les webhooks. La principale différence est que les _Slack Bots_ prennent en charge les pièces jointes, ce qui permet à Apprise d’en tirer parti.

1. Commencez par créer votre [Slack App ici](https://api.slack.com/apps?new_app=1).
1. Choisissez un nom d’application, par exemple _Apprise_, sélectionnez votre espace de travail, puis cliquez sur **Create App**.
1. Vous pourrez ensuite ouvrir la section **Bots**, ajouter un **utilisateur robot**, lui donner un nom, puis choisir \*_Add Bot User_.
1. Vous devrez fournir les bonnes permissions OAuth :<br/>![Autorisations minimales OAuth du robot Slack](./images/285847dfb5ef03ee.png)
1. Sélectionnez ensuite **Install App**, puis **Install App to Workspace**.
1. Vous devrez autoriser l’application lorsqu’on vous le demandera.
1. Enfin, vous obtiendrez des informations très importantes pour Apprise. À partir de là, vous pourrez utiliser soit le **jeton d'accès OAuth**, soit le **jeton d'accès OAuth de l'utilisateur robot**, avec une syntaxe de type `slack://{OAuth Access Token}`.

Votre URL Apprise Slack, pour accéder à votre bot, peut ressembler à ceci :

- `slack://xoxp-1234-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d`
- `slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d`

Les deux jetons OAuth fournis permettent de publier du texte dans des canaux et de joindre des fichiers. Le choix de l’un ou de l’autre depend donc de votre preference.

## Syntaxe

La syntaxe valide est la suivante :

- `slack://{tokenA}/{tokenB}/{tokenC}`
- `https://hooks.slack.com/services/{tokenA}/{tokenB}/{tokenC}`
- `slack://{OAuthToken}/`
  - Un robot n’a pas de canal par défaut configurable dans Slack comme c’est le cas avec les webhooks. Si aucun canal n’est précisé, c’est `#general` qui sera utilisé.

Si vous utilisez l’ancienne méthode par webhook, sans passer par l’application, vous disposez d’un peu plus de liberté. Les URL suivantes fonctionneront donc également avec Apprise :

- `slack://{tokenA}/{tokenB}/{tokenC}/#{channel}`
- `slack://{tokenA}/{tokenB}/{tokenC}/#{channel1}/#{channel2}/#{channelN}`
- `slack://{OAuthToken}/#{channel}`
- `slack://{botname}@{OAuthToken}/#{channel1}/#{channel2}/#{channelN}`

Si vous connaissez l’_Encoded-ID_ du canal que vous souhaitez cibler, vous pouvez utiliser le symbole plus (+) pour le distinguer des canaux dans l’URL. La syntaxe valide est la suivante :

- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/+{encoded_id}`
- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/+{encoded_id1}/+{encoded_id2}/+{encoded_id3}`
- `slack://{botname}@{OAuthToken}/+{encoded_id}`
- `slack://{botname}@{OAuthToken}/+{encoded_id1}/+{encoded_id2}/+{encoded_id3}`

Si vous connaissez le `user_id` auquel vous souhaitez envoyer votre notification Slack, plutôt qu’un canal, utilisez le symbole arobase (@). La syntaxe valide est la suivante :

- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/@{user_id}`
- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/@{user_id1}/@{user_id2}/@{user_id3}`
- `slack://{botname}@{OAuthToken}/@{user_id}`
- `slack://{botname}@{OAuthToken}/@{user_id1}/@{user_id2}/@{user_id3}`

Vous pouvez également combiner librement toutes ces formes dans l’ordre de votre choix :

- `slack://**{botname}@{tokenA}/{tokenB}/{tokenC}/@{user_id}/#{channel}/+{encoded_id}`
- `slack://{botname}@{OAuthToken}/@{user_id}/#{channel}/+{encoded_id}`

### Méthode 3 : Webhooks Slack Workflow Builder

Les webhooks [Slack Workflow Builder](https://slack.com/help/articles/360041352714) utilisent un format d’URL différent et sont détectés automatiquement. Vous pouvez coller l’URL native directement, ou construire une URL Apprise avec `?mode=workflow` ou `?mode=trigger`.

**Workflow Builder** (chemin à 4 segments sous `/workflows/`) :

- `https://hooks.slack.com/workflows/{seg1}/{seg2}/{seg3}/{seg4}`
- `slack://{seg1}/{seg2}/{seg3}/{seg4}/?mode=workflow`

**Workflow Trigger** (chemin à 3 segments sous `/triggers/`) :

- `https://hooks.slack.com/triggers/{seg1}/{seg2}/{seg3}`
- `slack://{seg1}/{seg2}/{seg3}/?mode=trigger`

Les deux formes envoient `{"text": "Titre : Corps"}` par défaut (le titre est omis s’il est vide). Vous pouvez aussi passer un fichier `template=` pour envoyer un payload Block Kit personnalisé.

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenA     | Oui    | La première partie des 3 jetons fournis après la création d’un _incoming-webhook_. `OAuthToken` n’est pas requis si vous utilisez le webhook Slack.                                                                                                                                                                                                                                                                                                                                                                                |
| tokenB     | Oui    | La deuxième partie des 3 jetons fournis après la création d’un _incoming-webhook_. `OAuthToken` n’est pas requis si vous utilisez le webhook Slack.                                                                                                                                                                                                                                                                                                                                                                                |
| tokenC     | Oui    | La dernière partie des 3 jetons fournis après la création d’un _incoming-webhook_. `OAuthToken` n’est pas requis si vous utilisez le webhook Slack.                                                                                                                                                                                                                                                                                                                                                                                |
| OAuthToken | Oui    | Jeton OAuth fourni par la Slack App lorsque vous utilisez un robot au lieu d’un webhook. Les jetons A, B et C ne sont alors pas utilisés.                                                                                                                                                                                                                                                                                                                                                                                          |
| channel    | Non    | Les canaux doivent être préfixés par **#**. Vous pouvez en préciser autant que vous voulez en les séparant par des slashs (`/`) dans l’URL.                                                                                                                                                                                                                                                                                                                                                                                        |
| encoded_id | Non    | Slack permet aussi de désigner des canaux et canaux privés par un _encoded_id_. Si vous les connaissez, vous pouvez les utiliser à la place d’un nom de canal. Tous les `encoded_id` doivent être préfixés par **+**.                                                                                                                                                                                                                                                                                                              |
| user_id    | Non    | Les utilisateurs doivent être préfixés par **@**. Vous pouvez en préciser autant que nécessaire en les séparant par des slashs (`/`) dans l’URL.                                                                                                                                                                                                                                                                                                                                                                                   |
| botname    | Non    | Remplace le nom d’affichage de l’expéditeur. En mode webhook, s’il n’est pas défini, Slack utilise le nom d’affichage configuré dans les paramètres du webhook. Définissez-le pour que les notifications apparaissent sous un nom personnalisé, quel que soit le webhook utilisé.                                                                                                                                                                                                                                                  |
| footer     | Non    | Détermine si l’icône de pied de page Apprise doit être affichée à chaque message. La valeur par défaut est **yes**.                                                                                                                                                                                                                                                                                                                                                                                                                |
| image      | Non    | Détermine si l’image Apprise, reflétant la couleur d’état, doit être affichée avec chaque message. La valeur par défaut est **yes**.                                                                                                                                                                                                                                                                                                                                                                                               |
| mode       | Non    | Permet de forcer le mode de fonctionnement du plugin Slack. Il est détecté automatiquement par défaut, mais les valeurs possibles sont `hook` (webhook), `gov-hook` (webhook gouvernemental), `bot` (API bot Slack), `workflow` (webhook Workflow Builder) et `trigger` (webhook de déclenchement de workflow).                                                                                                                                                                                                                    |
| template   | Non    | Chemin vers un fichier gabarit local. Lorsqu’il est défini, le contenu du fichier est utilisé pour construire la charge utile Slack à la place de la mise en page par défaut (le mode Block Kit est activé automatiquement). Le gabarit doit être un fichier JSON dont l’objet racine contient une liste `"blocks"` non vide (format Slack Block Kit). Utilisez `{{app_body}}`, `{{app_title}}`, `{{app_color}}`, `{{app_type}}`, `{{app_id}}`, `{{app_desc}}`, `{{app_image_url}}` et `{{app_url}}` comme jetons de substitution. |
| :jeton     | Non    | Jeton(s) personnalisé(s) pour la substitution dans le gabarit. Préfixez chaque nom de jeton par un deux-points dans l’URL (par exemple `?:maclé=mavaleur`). Tout jeton défini ici est accessible via `{{maclé}}` dans le fichier gabarit.                                                                                                                                                                                                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Slack vers le canal `#nuxref` :

```bash
# Supposons que notre {tokenA} soit T1JJ3T3L2
# Supposons que notre {tokenB} soit A1BRTD4JD
# Supposons que notre {tokenC} soit TIiajkdnlazkcOXrIdevi7F
# Notre canal nuxref est represente par #nuxref
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   slack:///T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/#nuxref
```

Autrement, si vous utilisez un bot, une notification Slack vers le canal `#general` pourrait ressembler à ceci :

```bash
# Supposons que notre {OAuthToken} soit xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d
# Notre canal general est represente par #general
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d/#general
```

Vous pouvez aussi désactiver le pied de page, par exemple ainsi :

```bash
# Supposons que notre {OAuthToken} soit xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d
# Nous voulons l'envoyer vers notre canal #general ; %23 est la forme encodee du symbole #
# Nous definissons aussi footer sur no
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d/%23general?footer=no
```

Envoyer une notification à l'aide d'un gabarit JSON Slack Block Kit personnalisé :

```bash
# Créez d'abord votre fichier gabarit, par exemple /etc/apprise/slack-blocks.json :
# {
#   "blocks": [
#     {
#       "type": "header",
#       "text": {"type": "plain_text", "text": "{{app_title}}"}
#     },
#     {
#       "type": "section",
#       "text": {"type": "mrkdwn", "text": "{{app_body}}"}
#     }
#   ],
#   "color": "{{app_color}}"
# }
#
# Puis référencez-le avec template= (le mode blocks est activé automatiquement) :
apprise -vv -t "Alerte" -b "Utilisation disque à 95 %" \
   "slack://T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/?template=/etc/apprise/slack-blocks.json"
```

Des jetons personnalisés peuvent être injectés dans n'importe quel gabarit avec le préfixe `:clé=valeur` :

```bash
apprise -vv -t "Déploiement" -b "v2.3.1 déployé" \
   "slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d/%23ops/?template=/etc/apprise/slack-tmpl.json&:env=production&:team=platform"
```
