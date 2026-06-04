---
title: "Chanify Notifications"
description: "Send Chanify notifications."
sidebar:
  label: "Chanify"

source: https://chanify.net/

schemas:
  - chanify

sample_urls:
  - chanify://{token}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Sign up for Chanify [from here](https://chanify.net/). You will be provided to create a user and password to associate with your account. From here you can generate a token; this is all you need to use this through Apprise.

## Syntax

Valid syntax is as follows:

- `chanify://{token}`

## Parameter Breakdown

| Variable | Required | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| token    | **Yes**  | The token you generated as part of your Chanify account |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification to your Chanify account:

```bash
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "chanify://token"
```
