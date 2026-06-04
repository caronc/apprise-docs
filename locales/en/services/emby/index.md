---
title: "Emby Notifications"
description: "Send Emby on-screen message notifications."
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

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntax

Valid syntax is as follows:

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

Apprise’s **Emby** notification plugin also works with **Jellyfin**.

If you prefer to make your intent clearer in configuration files, you can alias your notification entry name to Emby, for example:

- `jellyfin://...`
- `jellyfins://...`

If you are targeting Jellyfin, prefer the Jellyfin schemas above and refer to the [Jellyfin service documentation](../jellyfin/) for examples and details.

## Parameter Breakdown

| Variable | Required | Description                                                                                                            |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The server Emby is listening on.                                                                                       |
| port     | No       | The port the server is listening on. By default the port is **8096** for both **emby://** and **embys://** references. |
| userid   | Yes      | The account login to your Emby server.                                                                                 |
| password | No       | The password associated with your Emby server.                                                                         |
| modal    | No       | Defines if the notification should appear as a modal type box. By default this is set to No.                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification to a server listening on the default port (8096):

```bash
# Assuming our {hostname} is media.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "emby://user:password@media.server.local"
```

Send a secure (https) notification:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "embys://user:password@media.server.local"
```
