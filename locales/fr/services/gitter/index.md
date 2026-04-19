---
title: "Notifications Gitter"
description: "Envoyer Gitter notifications."
sidebar:
  label: "Gitter"

source: https://gitter.im/

schemas:
  - gitter

ended: 2023-02-13

has_image: true

sample_urls:
  - gitter://{token}/{room}/
  - gitter://{token}/{room1}/{room2}/{roomN}/
  - gitter://{token}/{room}/?image=Yes
---

:::caution

Gitter uses Matrix and does not have its own custom service anymore. All information below pertains to its legacy configuration for those still hosting it.
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

Gitter isn't to difficult to get yourself an account [on their website](https://gitter.im/).

From here, you just need to get your Gitter **Personal Access Token** which is as simple as visiting their [development website](https://developer.gitter.im/apps) and signing in (if you're not already). Almost immediately you should see a pop-up box providing you your token.

\*\*Note: You can ignore the App generation feature here as it's not relevant to sending an apprise notification.

The last thing you need to know about this is you need to have already joined the channel you wish to send notifications to. The **Personal Access Token** represents you, so even if you join a channel and close out of your web browser, you're still actually a part of that channel (until you log back in and leave the channel).

Channels identify themselves as **name**/community; you only need to focus on the name. So if the channel was [**apprise**/community](https://gitter.im/apprise-notifications/community), the channel name can be assumed to be **apprise** when using this script.

## Syntaxe

La syntaxe valide est la suivante :

- `gitter://{token}/{room}/`
- `gitter://{token}/{room1}/{room2}/{roomN}/`
- `gitter://{token}/{room}/?image=Yes`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                        |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Yes      | The Personal Access Token associated with your account. This is available to you after signing into their [development website](https://developer.gitter.im/apps). |
| room     | No       | The room you want to notify. You can specify as many as you want of these on the URL.                                                                              |
| image    | No       | Envoyer an image representing the message type prior to sending the message body. This is disabled by default.                                                     |
| to       | No       | This is an alias to the room variable.                                                                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Gitter notification to the channel _apprise/community_:

```bash
# Assuming our {token} is abcdefghij1234567890
# Assuming our {room} is apprise/community
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   gitter:///abcdefghij1234567890/apprise
```
