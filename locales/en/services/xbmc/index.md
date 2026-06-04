---
title: "XBMC Notifications"
description: "Send XBMC notifications."
sidebar:
  label: "XBMC"

source: http://kodi.tv/

schemas:
  - xbmc: insecure

has_image: true

sample_urls:
  - xbmc://{hostname}
  - xbmc://{hostname}:{port}
  - xbmc://{userid}:{password}@{hostname}
  - xbmc://{userid}:{password}@{hostname}:{port}

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::note
XMBC is a legacy product and has been replaced by [[KODI|Notify_kodi]]. However for systems that can't be updated (such as a Jail Broken Apple TV2) you can use this protocol.
:::

## Syntax

Valid syntax is as follows:

- `xbmc://{hostname}`
- `xbmc://{hostname}:{port}`
- `xbmc://{userid}:{password}@{hostname}`
- `xbmc://{userid}:{password}@{hostname}:{port}`

## Parameter Breakdown

| Variable | Required | Description                                                     |
| -------- | -------- | --------------------------------------------------------------- |
| hostname | Yes      | The server XBMC is listening on.                                |
| port     | No       | The port XBMC is listening on. By default the port is **8080**. |
| userid   | No       | The account login to your XBMC server.                          |
| password | No       | The password associated with your XBMC Server.                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a XBMC notification to our server listening on port 8080:

```bash
# Assuming our {hostname} is xbmc.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xbmc://xbmc.server.local"

# You may have a password and user protecting your xbmc server; so the
# following is another way to hit your xbmc server:
# Assuming our {hostname} is xbmc.server.local
# Assuming our {userid} is xbmc
# Assuming our {password} is xbmc
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xbmc://xbmc:xbmc@xbmc.server.local"
```
