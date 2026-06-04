---
title: "Jellyfin Notifications"
description: "Send Jellyfin notifications (Emby-compatible on-screen messages)."
sidebar:
  label: "Jellyfin"

source: https://jellyfin.org

has_selfhosted: true

schemas:
  - jellyfin: insecure
  - jellyfins

sample_urls:
  - jellyfins://{hostname}
  - jellyfin://{hostname}:{port}
  - jellyfin://{userid}:{password}@{hostname}
  - jellyfins://{userid}:{password}@{hostname}:{port}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntax

Valid syntax is as follows:

- `jellyfin://{hostname}`
- `jellyfin://{hostname}:{port}`
- `jellyfin://{userid}:{password}@{hostname}`
- `jellyfin://{userid}:{password}@{hostname}:{port}`
- `jellyfins://{hostname}`
- `jellyfins://{hostname}:{port}`
- `jellyfins://{userid}:{password}@{hostname}`
- `jellyfins://{userid}:{password}@{hostname}:{port}`

Secure connections (via https) should be referenced using **jellyfins://**, whereas insecure connections (via http) should be referenced via **jellyfin://**.

## Emby Compatibility

Jellyfin is a fork of Emby, and Apprise treats Jellyfin as an Emby-compatible notification target.

If you also run Emby, you can use the **Emby** schema in the same way:

- `emby://...`
- `embys://...`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                    |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| hostname | Yes      | The server Jellyfin is listening on.                                                                                           |
| port     | No       | The port the server is listening on. By default the port is **8096** for both **jellyfin://** and **jellyfins://** references. |
| userid   | Yes      | The account login to your Jellyfin server.                                                                                     |
| password | No       | The password associated with your Jellyfin server.                                                                             |
| modal    | No       | Defines if the notification should appear as a modal type box. By default this is set to No.                                   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification to a server listening on the default port (8096):

```bash
# Assuming our {hostname} is media.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jellyfin://user:password@media.server.local"
```

Send a notification to a server listening on a non-default port:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jellyfin://user:password@media.server.local:8097"
```

Send a secure (https) notification:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jellyfins://user:password@media.server.local"
```
