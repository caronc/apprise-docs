---
title: "Gorush Notifications"
description: "Send mobile push notifications to iOS, Android and Huawei devices through your own Gorush server."
sidebar:
  label: "Gorush"

source: https://github.com/appleboy/gorush

schemas:
  - gorush: insecure
  - gorushs

has_selfhosted: true

body_formats:
  - text

sample_urls:
  - gorush://{host}:{port}/{device_token}
  - gorush://{host}:{port}/{device_token1}/{device_token2}?platform=ios
  - gorushs://{user}:{password}@{host}/{device_token}

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Gorush](https://github.com/appleboy/gorush) is a push notification server you run yourself. It forwards your messages to Apple (APNs), Android (Firebase Cloud Messaging) and Huawei (HMS) devices.

1. Install and start Gorush by following its [setup guide](https://github.com/appleboy/gorush#run-gorush-web-server). It listens on port `8088` by default.
2. In the Gorush configuration file, enable and set up each platform you plan to use (`ios`, `android` and/or `huawei`).
3. Collect the device tokens your mobile app registered for push notifications.

Gorush has no login of its own. If you placed it behind a reverse proxy that asks for a username and password, add them to your Apprise URL.

Every device token in one URL must belong to the same platform. To reach both iPhones and Android phones, add one URL for each platform.

:::tip
Gorush only reports which devices failed when `sync: true` is set in the `core` section of its configuration. With it on, Apprise can tell you about devices that did not receive the message, and a `?retry=` only sends to those devices.
:::

## Syntax

Valid syntax is as follows:

- `gorush://{host}/{device_token}`
- `gorush://{host}:{port}/{device_token}`
- `gorush://{user}:{password}@{host}:{port}/{device_token}`
- `gorushs://{user}:{password}@{host}/{device_token}`

You can send to as many devices as you like:

- `gorush://{host}:{port}/{device_token1}/{device_token2}/{device_tokenN}`

Use `gorushs://` when Gorush is available over HTTPS, such as through a reverse proxy.

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                                            |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host         | Yes      | The hostname or IP address of your Gorush server.                                                                                                                      |
| port         | No       | The port Gorush listens on. Gorush uses **8088** unless you changed it. Defaults to **80** for `gorush://` and **443** for `gorushs://`.                               |
| user         | No       | The username, if a reverse proxy in front of Gorush asks for one.                                                                                                      |
| password     | No       | The password, if a reverse proxy in front of Gorush asks for one.                                                                                                      |
| device_token | Yes      | The push token of a device to notify. Add as many as you like.                                                                                                         |
| platform     | No       | The platform of the device tokens: `ios`, `android` or `huawei`. You can also use `apns`, `fcm`, `hms` or Gorush's numbers `1`, `2` and `3`. The default is `android`. |
| mode         | No       | Another name for `platform`.                                                                                                                                           |
| priority     | No       | The push priority: `normal` or `high`. When unset, Gorush uses its own default.                                                                                        |
| topic        | No       | The topic to send with the push. On iOS this is your app's bundle ID, for example `com.example.app`.                                                                   |
| sound        | No       | The sound to play when the notification arrives, for example `default`.                                                                                                |
| badge        | No       | The number to show on the app icon (iOS only).                                                                                                                         |
| to           | No       | Another way to list device tokens, separated by commas.                                                                                                                |

You can also pass extra data to your mobile app by adding `+key=value` to the URL. For example, `?+screen=alerts` sends `screen` with the value `alerts`.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification to one Android device through Gorush on the same machine:

```bash
# Assuming Gorush listens on localhost:8088
# Assuming our device token is abcdef1234567890
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gorush://localhost:8088/abcdef1234567890"
```

Send to two iPhones with a sound, a badge and your app's bundle ID:

```bash
# Assuming our device tokens are token1 and token2
apprise -vv -t "Alert" -b "Server is down!" \
   "gorush://localhost:8088/token1/token2?platform=ios&topic=com.example.app&sound=default&badge=1"
```

Send through an HTTPS reverse proxy that asks for a login:

```bash
# Assuming our proxy is push.example.com and the login is admin/secret
apprise -vv -b "Backup finished" \
   "gorushs://admin:secret@push.example.com/abcdef1234567890?priority=high"
```
