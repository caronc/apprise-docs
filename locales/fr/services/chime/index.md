---
title: "Notifications Amazon Chime"
description: "Envoyer des notifications dans les salles de chat Amazon Chime via les webhooks entrants."
sidebar:
  label: "Amazon Chime"

source: https://aws.amazon.com/chime/

schemas:
  - chime

has_chat: true

sample_urls:
  - chime://{WebhookID}/{Token}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Pour utiliser ce plugin, vous avez besoin d'un compte [Amazon Chime](https://aws.amazon.com/chime/) existant et d'une salle de chat dont vous etes administrateur. Les webhooks entrants sont configures par salle de chat.

1. Ouvrez Amazon Chime dans votre navigateur et accedez a la salle de chat que vous souhaitez recevoir des notifications.
2. Cliquez sur l'icone d'engrenage dans le coin superieur droit du panneau de la salle de chat.
3. Choisissez **Manage webhooks and bots** (Gerer les webhooks et les robots).
4. Cliquez sur **Add webhook** (Ajouter un webhook), donnez-lui un nom reconnaissable (par exemple `Apprise`), puis cliquez sur **Create** (Creer).
5. Cliquez sur **Copy URL** (Copier l'URL) a cote de votre nouveau webhook dans la liste.

L'URL copiee ressemblera a ceci :

```text
https://hooks.chime.aws/incomingwebhooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?token=AaBbCcDd%3D%3D
```

La partie apres `/incomingwebhooks/` et avant le `?` est votre **ID de webhook**. La valeur du parametre de requete `token=` (decode) est votre **Token**.

:::note
Les webhooks entrants ne sont disponibles que pour les administrateurs de la salle de chat. Si l'option n'est pas visible, demandez a votre administrateur de salle.
:::

## Syntaxe

Les syntaxes valides sont les suivantes :

- `chime://{WebhookID}/{Token}`

Vous pouvez egalement passer directement l'URL du webhook Chime -- Apprise la reconnaitra automatiquement :

- `https://hooks.chime.aws/incomingwebhooks/{WebhookID}?token={Token}`

## Detail des parametres

| Variable  | Requis | Description                                                                                                    |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| WebhookID | \*Oui  | L'ID de webhook present dans le chemin de votre URL Chime (le segment de type UUID apres `/incomingwebhooks/`) |
| Token     | \*Oui  | Le jeton d'authentification provenant du parametre de requete `?token=` de votre URL de webhook Chime          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification dans une salle de chat Amazon Chime :

```bash
# En supposant que votre ID de webhook soit xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# En supposant que votre Token soit AaBbCcDd== (forme decodee)
apprise -vv -t "Alerte" -b "Quelque chose s'est passe." \
   "chime://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/AaBbCcDd%3D%3D"
```

Vous pouvez egalement coller directement l'URL native Chime :

```bash
apprise -vv -b "Quelque chose s'est passe." \
   "https://hooks.chime.aws/incomingwebhooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?token=AaBbCcDd%3D%3D"
```

Exemple de configuration YAML :

```yaml
urls:
  - chime://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/AaBbCcDd%3D%3D
```
