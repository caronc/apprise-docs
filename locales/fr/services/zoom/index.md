---
title: "Notifications Zoom Team Chat"
description: "Envoyer des notifications vers les canaux Zoom Team Chat via les Webhooks entrants."
sidebar:
  label: "Zoom"

source: https://zoom.us

schemas:
  - zoom

sample_urls:
  - https://inbots.zoom.us/incoming/hook/{webhook_id}?token={token}
  - zoom://{webhook_id}/{token}/
  - zoom://{webhook_id}/{token}/?mode=simple

limits:
  max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Les notifications Zoom Team Chat sont envoyees via l'application **Incoming Webhook** disponible sur le Zoom Marketplace. Elle publie des messages dans le canal de votre choix.

1. Connectez-vous sur <https://marketplace.zoom.us> et recherchez **Incoming Webhook**.
2. Cliquez sur **Add** pour installer l'application dans votre compte Zoom.
3. Ouvrez Zoom Team Chat et rendez-vous dans le canal ou vous souhaitez recevoir les notifications.
4. Dans la zone de saisie du message, tapez la commande slash :

   ```text
   /inc connect
   ```

   Suivez les instructions a l'ecran. Une fois termine, Zoom vous fournit deux valeurs :
   - **URL du point de terminaison** -- par exemple :

     ```text
     https://inbots.zoom.us/incoming/hook/AbCdEfGhIjKl
     ```

   - **Jeton de verification** -- une courte chaine alphanumerique servant a authentifier les requetes.

5. L'identifiant webhook (Webhook ID) est le dernier segment de chemin de l'URL du point de terminaison (`AbCdEfGhIjKl` dans l'exemple ci-dessus).

Assemblez votre URL Apprise avec les deux valeurs :

```text
zoom://{webhook_id}/{token}
```

:::note
Les webhooks entrants Zoom ne prennent pas en charge les pieces jointes ni le formatage Markdown. Tous les messages sont envoyes en texte brut ou avec une mise en page simple titre/corps.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `zoom://{webhook_id}/{token}/`
- `zoom://{webhook_id}/{token}/?mode=full`
- `zoom://{webhook_id}/{token}/?mode=simple`
- `https://inbots.zoom.us/incoming/hook/{webhook_id}?token={token}`

Le **mode full** (par defaut) envoie un message structure. Lorsqu'un titre de notification est fourni, il apparait en en-tete au-dessus du corps du message. Ce mode utilise le parametre API `?format=full` de Zoom.

Le **mode simple** envoie le message sous forme de texte brut. Si un titre est fourni, il est place en debut de corps separe par deux-points.

## Detail des Parametres

| Variable   | Requis | Description                                                                                                |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| webhook_id | \*Oui  | L'identifiant webhook extrait de l'URL du point de terminaison Zoom (le segment de chemin apres `/hook/`). |
| token      | \*Oui  | Le jeton de verification fourni par Zoom lors de la creation du webhook.                                   |
| mode       | Non    | Mode de notification : `full` (par defaut, structure avec en-tete) ou `simple` (texte brut).               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification en mode full (par defaut) :

```bash
# Remplacez AbCdEfGhIjKl par votre Webhook ID
# Remplacez VerToken123 par votre jeton de verification
apprise -vv -t "Titre de l'alerte" -b "Quelque chose s'est produit." \
    zoom://AbCdEfGhIjKl/VerToken123/
```

Envoyer une notification en texte brut avec le mode simple :

```bash
apprise -vv -t "Info" -b "Deploiement termine." \
    "zoom://AbCdEfGhIjKl/VerToken123/?mode=simple"
```

Utiliser l'URL native du point de terminaison avec le jeton en parametre de requete :

```bash
apprise -vv -b "Test webhook." \
    "https://inbots.zoom.us/incoming/hook/AbCdEfGhIjKl?token=VerToken123"
```
