---
title: "Kodi Notifications"
description: "Send Kodi notifications."
sidebar:
  label: "Kodi"

source: http://kodi.tv/

schemas:
  - kodi: insecure
  - kodis

has_image: true

sample_urls:
  - kodis://{hostname}
  - kodi://{hostname}:{port}
  - kodi://{userid}:{password}@{hostname}
  - kodis://{userid}:{password}@{hostname}:{port}

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntax

Valid syntax is as follows:

- `kodi://{hostname}`
- `kodi://{hostname}:{port}`
- `kodi://{userid}:{password}@{hostname}`
- `kodi://{userid}:{password}@{hostname}:{port}`
- `kodis://{hostname}`
- `kodis://{hostname}:{port}`
- `kodis://{userid}:{password}@{hostname}`
- `kodis://{userid}:{password}@{hostname}:{port}`

Secure connections (via https) should be referenced using **kodis://** where as insecure connections (via http) should be referenced via **kodi://**.

## Parameter Breakdown

| Variable | Required | Description                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The server Kodi is listening on.                                                                                          |
| port     | No       | The port Kodi is listening on. By default the port is **80** for **kodi://** and **443** for all **kodis://** references. |
| userid   | No       | The account login to your KODI server.                                                                                    |
| password | No       | The password associated with your KODI Server.                                                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Kodi notification to our server listening on port 80:

```bash
# Assuming our {hostname} is kodi.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "kodi://kodi.server.local"
```
