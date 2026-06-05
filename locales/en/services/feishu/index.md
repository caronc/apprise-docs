---
title: "Feishu Notifications"
description: "Send Feishu notifications."
sidebar:
  label: "Feishu"

source: https://open.feishu.cn/

schemas:
  - feishu

has_chat: true

sample_urls:
  - feishu://{token}

limits:
  max_chars: 19985
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Register your account with [Feishu](https://open.feishu.cn/) and then [follow these instructions](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot) to create a custom bot (and acquire the token you need).

## Syntax

Valid syntax is as follows:

- `feishu://{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                           |
| -------- | -------- | ------------------------------------------------------------------------------------- |
| token    | **Yes**  | The token you generated as part of your Fieshu Custom Bot Creation (via your account) |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification to your Feishu account:

```bash
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "feishu://token"
```
