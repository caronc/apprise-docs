---
title: "Line Notifications"
description: "Send Line notifications."
sidebar:
  label: "Line"

source: https://line.me

schemas:
  - line

has_chat: true
has_image: true

sample_urls:
  - line://{token}/{user}
  - line://{token}/{user1}/{user2}/{userN}

limits:
  max_chars: 5000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. First download Line in order to use it via [Google Play](https://play.google.com/store/apps/details?id=jp.naver.line.android) or [Apple](https://apps.apple.com/us/app/line/id443904275).
1. Once installed, you need to open up the software on your mobile device and access the ⚙️ icon and click on **Accounts**. From here you need to associate an Email address with your account if you haven't done so already. There is a validation process you must complete.

### Generate a Token

In order to generate a token, you need to have associated an email address with your account so that you can log into the [developer console here](https://developers.line.biz/console/).

1. Create a **Provider** if you haven't done so already; when prompted you want to create a **Messaging API**
1. Next you'll need to create a **Channel**.
   - On the **Basic settings** tab you can acquire your BOT **User ID**. This is suggested to become your `{user}` Apprise field.
   - On the **Messaging API** tab you can **Issue** a Long Lived **Channel access token**. This will become your `{token}` Apprise field.
1. In your Channel settings under the **Message API** tab:
   1. you may want to optionally turn off **Greeting messages**; I personally find it annoying but you may not. So this is up to you.
   2. On your mobile device, you will want to chose to add a friend and scan the QR Code under this **Message API** tab (near the top)

## Syntax

Valid syntax is as follows:

- `line://{token}/{user}`
- `line://{token}/{user1}/{user2}/{userN}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | This is the **Long Lived Access Token** generated from the [Line](https://line.me) console (under the Message API section of your channel). This is a very long token that ends with an equal sign `=`. This token also contains numerous forward slashes in it `/`. Apprise is able to detect the API and distinguish it apart from the one or more users you've added. So you can safely paste the entire token **as is** straight into the URL. |
| user     | Yes      | The Line users (separated by forward slash `/`) that you wish to notify. This is NOT the `@userid` you can acquire from your mobile device. It is instead the Line User ID (which usually starts with the letter `U`). For example, you can acquire your Line BOT User ID from the [developer console](https://developers.line.biz/console/) within your channel settings under the **Basic settings** tab (at the bottom).                        |
| image    | No       | Associate the notification status via a represented icon. You can set this value to `no` if you do not want this to occur.                                                                                                                                                                                                                                                                                                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a line notification:

```bash
# Assuming our {token} is 4174216298
# Assuming our {user} is U1234567
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   line://4174216298/U1234567
```
