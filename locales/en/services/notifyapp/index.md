---
title: "Notify! Notifications"
description: "Send push notifications to iPhone, iPad, Mac and web browsers with Notify!."
sidebar:
  label: "Notify!"

source: https://getnotifyapp.com

schemas:
  - notifyapp

has_image: true

body_formats:
  - text

keywords: "pingie"

sample_urls:
  - notifyapp://{device_id}/{token}
  - notifyapp://{group_id}/{token}

limits:
  - name: "Title"
    max_chars: 2048
  - name: "Body"
    max_chars: 16384
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Install [Notify!](https://getnotifyapp.com) on your iPhone, iPad or Mac, or open the web app in your browser (this is how Android, Windows and Linux devices receive notifications).
1. Open the app to find your **Device ID** and **Token**.

### Device Groups

A Device Group lets one notification reach every device in it. Create one in the app, then open **Devices** -> **Device Groups** and pick your group to find its **Group ID** (it starts with `GRP`) and its own **Token**. Use these in place of a Device ID and its Token.

## Syntax

Valid syntax is as follows:

- `notifyapp://{device_id}/{token}`
- `notifyapp://{group_id}/{token}`

You can also paste the URL the Notify! app gives you straight into Apprise:

- `https://push.getnotifyapp.com/notify/{device_id}?token={token}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                            |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| device_id | Yes      | The Device ID shown in the Notify! app, or a Device Group ID (starting with `GRP`).                                    |
| token     | Yes      | The Token that goes with your Device ID or Device Group ID.                                                            |
| image     | No       | Shows an icon matching the notification type next to the title. Set this to `no` to turn it off. The default is `yes`. |
| thread    | No       | Groups notifications that share the same thread name together on your device.                                          |
| urgent    | No       | Sends the notification as Time Sensitive so it can break through Focus modes. The default is `no`.                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Notify! notification:

```bash
# Assuming our {device_id} is IOabcd1234efgh56
# Assuming our {token} is aB3dE5fG7hJ9kL2
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   notifyapp://IOabcd1234efgh56/aB3dE5fG7hJ9kL2
```

Send a Time Sensitive notification to a Device Group and keep it in its own thread:

```bash
# Assuming our {group_id} is GRPA1B2C
# Assuming our {token} is aB3dE5fG7hJ9kL2
apprise -vv -t "Backup Failed" -b "The nightly backup did not finish" \
   "notifyapp://GRPA1B2C/aB3dE5fG7hJ9kL2?thread=backups&urgent=yes"
```
