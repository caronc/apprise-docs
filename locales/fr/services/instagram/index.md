---
title: "Notifications Instagram"
description: "Envoyez des messages privés Instagram depuis votre compte Instagram professionnel."
sidebar:
  label: "Instagram"

source: https://developers.facebook.com/docs/instagram-platform/

schemas:
  - instagram

has_attachments: true
has_chat: true

body_formats:
  - text

sample_urls:
  - instagram://{token}/{user_id}
  - instagram://{token}/{user_id1}/{user_id2}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::caution
Instagram permet seulement à une entreprise de répondre aux personnes qui lui ont écrit en premier. Chaque personne que vous notifiez doit avoir envoyé un message privé à votre compte Instagram au cours des dernières **24 heures**, sinon Instagram refusera la notification.
:::

## Configuration du compte

Apprise envoie des messages privés Instagram depuis un compte Instagram **professionnel** (entreprise ou créateur).

1. Dans l'application Instagram, passez votre compte en compte professionnel si ce n'est pas déjà fait.
2. Dans l'application Instagram, ouvrez **Paramètres** > **Messages et réponses aux stories** > **Contrôles des messages** et activez **Autoriser l'accès aux messages**.
3. Rendez-vous sur le portail [Meta for Developers](https://developers.facebook.com/apps), créez une nouvelle application de type **Entreprise** et ajoutez-lui le produit **Instagram**.
4. Ouvrez **Instagram** > **Configuration de l'API avec la connexion professionnelle Instagram**, ajoutez votre compte Instagram et cliquez sur **Générer un jeton**. Copiez le jeton d'accès.
5. Demandez à chaque personne à notifier d'envoyer un message privé à votre compte Instagram. Trouvez ensuite son identifiant (voir ci-dessous).

Le jeton d'accès est valide pendant 60 jours. Générez-en un nouveau depuis la même page lorsqu'il expire.

Si votre application est encore en mode **Développement**, ajoutez chaque personne que vous contactez comme testeur Instagram dans **Rôles de l'application**.

### Trouver un identifiant d'utilisateur

Instagram identifie chaque personne par un identifiant numérique qui n'est valable que pour votre compte. Une fois que quelqu'un vous a écrit, listez vos conversations pour le trouver :

```bash
curl "https://graph.instagram.com/v26.0/me/conversations?platform=instagram&fields=participants&access_token={token}"
```

Chaque conversation liste ses participants avec leur `username` et leur `id`. Utilisez l'`id` de la personne à notifier.

### Utiliser un jeton de page Facebook

Si votre compte Instagram est lié à une page Facebook, vous pouvez utiliser le jeton d'accès de cette page (il commence par `EAA`) à la place. Apprise le détecte automatiquement. Meta documente l'envoi de fichiers avec un jeton de page, utilisez-en donc un si les pièces jointes échouent avec votre jeton Instagram.

## Syntaxe

La syntaxe valide est la suivante :

- `instagram://{token}/{user_id}`
- `instagram://{token}/{user_id1}/{user_id2}/{user_idN}`

## Détail des paramètres

| Variable | Requis | Description                                                                                               |
| -------- | ------ | --------------------------------------------------------------------------------------------------------- |
| token    | Oui    | Le jeton d'accès généré pour votre compte Instagram, ou un jeton d'accès de page Facebook.                |
| user_id  | Oui    | L'identifiant numérique d'une personne à contacter. Vous pouvez en indiquer autant que vous le souhaitez. |
| to       | Non    | Une autre façon de lister les identifiants, séparés par des virgules.                                     |

Les images (PNG et JPEG, jusqu'à 8 Mo), l'audio, la vidéo et les fichiers PDF (jusqu'à 25 Mo) peuvent être joints. Chacun arrive dans son propre message.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message à une personne :

```bash
# En supposant que notre {token} est IGAAabc123
# En supposant que le {user_id} à notifier est 1234567890123456
apprise -vv -t "Titre du message de test" -b "Corps du message de test" \
   "instagram://IGAAabc123/1234567890123456"
```

Envoyer une image à deux personnes avec un jeton de page Facebook :

```bash
# En supposant que notre {token} de page Facebook est EAAabc123
apprise -vv -b "Le graphique du jour" --attach=graph.png \
   "instagram://EAAabc123/1234567890123456/6543210987654321"
```
