---
title: "Notifications Facebook Messenger"
description: "Envoyez des messages Facebook Messenger depuis votre page Facebook."
sidebar:
  label: "Facebook Messenger"

source: https://developers.facebook.com/docs/messenger-platform/

schemas:
  - messenger

has_attachments: true
has_chat: true

body_formats:
  - text

sample_urls:
  - messenger://{token}/{user_id}
  - messenger://{token}/{user_id1}/{user_id2}
  - messenger://{token}/{user_id}?template={template}

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::caution
Facebook permet seulement à une page d'écrire aux personnes qui lui ont écrit en premier. Un message ordinaire n'est accepté que dans les **24 heures** qui suivent le dernier message de la personne à votre page. Pour la joindre après ce délai, utilisez un [modèle utilitaire](#envoyer-après-24-heures).
:::

## Configuration du compte

Apprise envoie les messages Messenger depuis une **page** Facebook, et non depuis un profil personnel.

1. Créez une page Facebook pour envoyer vos notifications, ou utilisez une page que vous gérez déjà.
2. Rendez-vous sur le portail [Meta for Developers](https://developers.facebook.com/apps), créez une nouvelle application de type **Entreprise** et ajoutez-lui le produit **Messenger**.
3. Ouvrez **Messenger** > **Paramètres de l'API Messenger**, connectez votre page et cliquez sur **Générer un jeton**. Copiez le jeton d'accès de la page.
4. Demandez à chaque personne à notifier d'envoyer un message à votre page. Trouvez ensuite son identifiant (voir ci-dessous).

Si votre application est encore en mode **Développement**, chaque personne que vous contactez doit avoir un rôle dans l'application (par exemple Testeur) dans **Rôles de l'application**.

### Trouver un identifiant d'utilisateur

Facebook identifie chaque personne par un identifiant numérique qui n'est valable que pour votre page. Une fois que quelqu'un a écrit à votre page, listez ses conversations pour le trouver :

```bash
curl "https://graph.facebook.com/v26.0/me/conversations?fields=participants&access_token={token}"
```

Chaque conversation liste ses participants avec leur `name` et leur `id`. Utilisez l'`id` de la personne à notifier.

### Envoyer après 24 heures

Un modèle utilitaire est un court message approuvé à l'avance qui contient un emplacement `{{1}}`. Apprise remplace `{{1}}` par votre notification, et Facebook la livre même lorsque la fenêtre de 24 heures est fermée.

Votre application a besoin de l'autorisation `page_utility_messaging`. Créez le modèle une seule fois avec :

```bash
curl -X POST "https://graph.facebook.com/v26.0/me/message_templates" \
   -H "Authorization: Bearer {token}" \
   -H "Content-Type: application/json" \
   -d '{"name": "apprise_alert", "language": "fr", "category": "UTILITY",
        "components": [{"type": "BODY",
          "text": "Vous avez une nouvelle alerte : {{1}}. Ce message a été envoyé automatiquement.",
          "example": {"body_text": [["Le serveur est en panne"]]}}]}'
```

Facebook l'approuve généralement en quelques secondes. Ajoutez ensuite `?template=apprise_alert&lang=fr` à votre URL Apprise. Les modèles ne peuvent pas servir à la publicité, et les pièces jointes sont toujours envoyées comme des messages ordinaires.

## Syntaxe

La syntaxe valide est la suivante :

- `messenger://{token}/{user_id}`
- `messenger://{token}/{user_id1}/{user_id2}/{user_idN}`
- `messenger://{token}/{user_id}?template={template}`
- `messenger://{token}/{user_id}?template={template}&lang={language}`

## Détail des paramètres

| Variable | Requis | Description                                                                                               |
| -------- | ------ | --------------------------------------------------------------------------------------------------------- |
| token    | Oui    | Le jeton d'accès généré pour votre page Facebook.                                                         |
| user_id  | Oui    | L'identifiant numérique d'une personne à contacter. Vous pouvez en indiquer autant que vous le souhaitez. |
| to       | Non    | Une autre façon de lister les identifiants, séparés par des virgules.                                     |
| template | Non    | Le nom d'un modèle utilitaire approuvé. Votre notification remplace son emplacement `{{1}}`.              |
| lang     | Non    | Le code de langue utilisé lors de la création du modèle. La valeur par défaut est `en`.                   |

Les images, l'audio, la vidéo et les autres fichiers (jusqu'à 25 Mo) peuvent être joints. Chacun arrive dans son propre message.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message à une personne :

```bash
# En supposant que notre {token} est EAAabc123
# En supposant que le {user_id} à notifier est 1234567890123456
apprise -vv -t "Titre du message de test" -b "Corps du message de test" \
   "messenger://EAAabc123/1234567890123456"
```

Envoyer une image à deux personnes :

```bash
apprise -vv -b "Le graphique du jour" --attach=graph.png \
   "messenger://EAAabc123/1234567890123456/6543210987654321"
```

Envoyer avec un modèle utilitaire pour que le message arrive même après 24 heures :

```bash
apprise -vv -b "Le serveur est en panne" \
   "messenger://EAAabc123/1234567890123456?template=apprise_alert&lang=fr"
```
