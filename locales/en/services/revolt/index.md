---
title: "Revolt Notifications"
description: "Send Revolt notifications."
sidebar:
  label: "Revolt"

source: https://revolt.chat

schemas:
  - revolt

has_image: true

sample_urls:
  - revolt://{bot_token}/{channel_id}
  - revolt://{bot_token}/{channel_id1}/{channel_id2}/{channel_id3}

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Set up your account on [Revolt Chat](https://revolt.chat/) and generate a bot token

## Syntax

Valid syntax is as follows:

- `revolt://{bot_token}/{channel_id}`
- `revolt://{bot_token}/{channel_id1}/{channel_id2}/{channel_id3}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                      |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| bot_token  | Yes      | The token that identifies the bot you created through the Revolt Admin Area.                                     |
| channel_id | Yes      | Identify the users you want your bot to deliver your notifications to. You must specify at least 1 _channel_id_. |
| url        | No       | Optionally specify an Embed URL with the API                                                                     |
| icon_url   | No       | Optionally specify a URL to and Image to over-ride defaults                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Revolt notification to lead2gold:

```bash
# Assuming our {bot_token} is 123456789:abcdefg_hijklmnop
# Assuming the {channel} belonging to lead2gold is 12315544
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   revolt://123456789:abcdefg_hijklmnop/12315544/
```
