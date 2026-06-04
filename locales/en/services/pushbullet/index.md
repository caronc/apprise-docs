---
title: "Pushbullet Notifications"
description: "Send Pushbullet notifications."
sidebar:
  label: "Pushbullet"

source: https://www.pushbullet.com

schemas:
  - pbul

has_attachments: true

sample_urls:
  - pbul://{accesstoken}
  - pbul://{accesstoken}/{device_id}
  - pbul://{accesstoken}/#{channel}
  - pbul://{accesstoken}/{email}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Pushbullet accounts are free; the Pro extension is optional and grants you a larger message limit and a few other features. Once you've signed up on [https://www.pushbullet.com/](https://www.pushbullet.com/) You can generate your API Key by accessing your [account settings](https://www.pushbullet.com/#settings) and clicking on **Create Access Token**.

## Syntax

Valid syntax is as follows:

- `pbul://{accesstoken}`
- `pbul://{accesstoken}/{device_id}`
- `pbul://{accesstoken}/#{channel}`
- `pbul://{accesstoken}/{email}`

You can also form any combination of the above and perform updates from one url:

- `pbul://{accesstoken}/{device_id}/#{channel}/{email}`

If neither a **`{device_id}`**, **#`{channel}`**, or **`{email}`** is specified, then the default configuration is to send to _all_ of your configured _devices_.

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                               |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken | Yes      | The Access Token can be generated on the Settings page of your Pushbullet's account. You must have an access token for this Notification service to work. |
| device_id   | No       | Associated devices with your Pushbullet account can be found in your _Settings_                                                                           |
| channel     | No       | Channels must be prefixed with a hash (#) or they will be interpreted as a device_id. Channels must be registered with your Pushbullet account to work.   |
| email       | No       | Emails only work if you've registered them with your Pushbullet account.                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Pushbullet notification to all devices:

```bash
# Assuming our {accesstoken} is abcdefghijklmno
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pbul://abcdefghijklmno
```
