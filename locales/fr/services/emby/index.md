---
title: "Notifications Emby"
description: "Envoyer Emby on-screen message notifications."
sidebar:
  label: "Emby"

source: https://emby.media

has_selfhosted: true

schemas:
  - emby: insecure
  - embys

sample_urls:
  - embys://{hostname}
  - emby://{hostname}:{port}
  - emby://{userid}:{password}@{hostname}
  - embys://{userid}:{password}@{hostname}:{port}
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `emby://{hostname}`
- `emby://{hostname}:{port}`
- `emby://{userid}:{password}@{hostname}`
- `emby://{userid}:{password}@{hostname}:{port}`
- `embys://{hostname}`
- `embys://{hostname}:{port}`
- `embys://{userid}:{password}@{hostname}`
- `embys://{userid}:{password}@{hostname}:{port}`

Secure connections (via https) should be referenced using **embys://**, whereas insecure connections (via http) should be referenced via **emby://**.

## Jellyfin Compatibility

Apprise **Emby** notification plugin also works with **Jellyfin**.

If you prefer to make your intent clearer in configuration files, you can alias your notification entry name to Emby, for example:

- `jellyfin://...`
- `jellyfins://...`

If you are targeting Jellyfin, prefer the Jellyfin schemas above and refer to the [Jellyfin service documentation](../jellyfin/) for examples and details.

## Detail des parametres

| Variable | Required | Description                                                                                                            |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The server Emby is listening on.                                                                                       |
| port     | No       | The port the server is listening on. By default the port is **8096** for both **emby://** and **embys://** references. |
| userid   | Yes      | The account login to your Emby server.                                                                                 |
| password | No       | The password associated with your Emby server.                                                                         |
| modal    | No       | Defines if the notification should appear as a modal type box. By default this is set to No.                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification to a server listening on the default port (8096):

```bash
# Assuming our {hostname} is media.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "emby://user:password@media.server.local"
```

Envoyer une secure (https) notification:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "embys://user:password@media.server.local"
```
