---
title: "Pushplus Notifications"
description: "Send WeChat and multi-channel notifications via the PushPlus platform."
sidebar:
  label: "Pushplus"

source: https://www.pushplus.plus/

schemas:
  - pushplus
  - wecom

sample_urls:
  - https://www.pushplus.plus/send?token={token}
  - pushplus://{token}
  - pushplus://{token}/{topic}
  - pushplus://{token}?channel={channel}
  - wecom://{token}

limits:
  max_chars: 20000
---

<!-- SERVICE:DETAILS -->

## Account Setup

PushPlus is a Chinese notification platform that delivers messages via WeChat and several other channels (email, SMS, WeCom, webhook). It uses a personal token to authenticate requests.

1. Register or sign in at [PushPlus](https://www.pushplus.plus/).
2. Copy the **Token** shown on your dashboard under the "Push" section.
3. Optionally install the PushPlus mini-program in WeChat to receive messages on your phone.

Your notification URL for the simplest use case is:

```text
pushplus://{token}
```

### Group (Topic) Sending

PushPlus also supports sending a single notification to everyone subscribed to a named group.

1. Open the **Group Push** section of the PushPlus console.
2. Create a group and note its **group code** — this is the topic value.
3. Subscribers join the group inside WeChat; when you send to the topic all members receive the message.

Place one or more group codes directly in the URL path:

```text
pushplus://{token}/{topic}
pushplus://{token}/{topic1}/{topic2}
```

When multiple topics are listed Apprise sends the notification to each group in a separate API call.

### Delivery Channels

By default notifications arrive via WeChat. You can redirect them to a different channel using the `?channel=` (or its synonym `?mode=`) query parameter:

| `?channel=` value | Channel                                 |
| ----------------- | --------------------------------------- |
| `wechat`          | WeChat (default — may be omitted)       |
| `webhook`         | Configured webhook endpoint             |
| `cp`              | WeCom (WeChat Work / Enterprise WeChat) |
| `wecom`           | Friendly alias for `cp` — same channel  |
| `mail`            | Email address on file                   |
| `sms`             | SMS                                     |

```text
pushplus://{token}?channel=mail
pushplus://{token}/{topic}?channel=cp
```

`channel=` and `mode=` are fully interchangeable; use whichever reads more naturally in your configuration.

#### Schema Alias

Apprise also accepts `wecom://` as a schema prefix for WeCom users. It automatically sets the delivery channel to `cp` — no extra query parameter needed:

| Schema            | Equivalent to                   |
| ----------------- | ------------------------------- |
| `wecom://{token}` | `pushplus://{token}?channel=cp` |

#### Named Webhook Endpoint

When using `?channel=webhook` you can also target a specific named endpoint. Two equivalent forms are accepted:

```text
pushplus://{token}?channel=webhook&name={webhook_name}
pushplus://{webhook_name}@{token}
```

In the second form (`schema://{name}@{token}`) the webhook channel is implied -- you do not need to add `?channel=webhook` explicitly. An explicit `?channel=` always overrides the implication if you need a different channel alongside a user@ name.

### Message Rendering

The message body is rendered by PushPlus on their servers using a template that matches the standard Apprise format parameter:

| Apprise `?format=` | PushPlus renders as                    |
| ------------------ | -------------------------------------- |
| `html` (default)   | HTML — bold, links, and images work    |
| `markdown`         | Markdown — headings, bold, lists, etc. |
| `text`             | Plain text — no formatting             |

There is no separate PushPlus-specific parameter; set `?format=markdown` (or the equivalent in your YAML/config) the same way you would for any other Apprise service.

## Syntax

Valid syntax is as follows:

- `https://www.pushplus.plus/send?token={token}`
- `pushplus://{token}`
- `pushplus://{token}/{topic}`
- `pushplus://{token}/{topic1}/{topic2}`
- `pushplus://{token}?channel={channel}`
- `pushplus://{token}/{topic}?channel={channel}`
- `pushplus://{token}?channel=webhook&name={webhook_name}`
- `pushplus://{webhook_name}@{token}`
- `wecom://{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                        |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | \*Yes    | Your personal PushPlus token from the dashboard. May also be supplied as `?token=`.                                                                                |
| topic    | No       | Group code placed in the URL path. Multiple topics may appear; one API call is made per topic. May also be supplied as `?topic=` or `?to=`.                        |
| channel  | No       | Delivery channel. One of `wechat` (default), `webhook`, `cp`, `wecom`, `mail`, `sms`. Supplied as `?channel=` or its alias `?mode=`.                               |
| name     | No       | Webhook endpoint name. Only used when `?channel=webhook`. Supplied as `?name=` or as the user@ component: `pushplus://{name}@{token}` (implies `channel=webhook`). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## See Also

Apprise provides two related WeCom/WeChat integrations:

- **[WeChat (WeCom)](../wechat/)** -- sends directly to WeCom users, departments, and tags using the WeCom Application Message API; requires a CorpID, App Secret, and AgentID from your WeCom admin console.
- **[WeCom Bot](../wecombot/)** -- sends to a WeCom group chat via a webhook key; simpler to set up but delivers to a group rather than individual users or departments.

## Examples

Send a simple personal notification:

```bash
apprise -vv -t "Title" -b "Hello from Apprise" \
    pushplus://abc123def456ghi789jkl012mno345pq
```

Send a Markdown-formatted message:

```bash
apprise -vv -t "Alert" -b "## Warning\n\nSomething happened." \
    "pushplus://abc123def456ghi789jkl012mno345pq?format=markdown"
```

Send to a group (topic):

```bash
apprise -vv -t "Team Alert" -b "Deployment complete." \
    pushplus://abc123def456ghi789jkl012mno345pq/myteamgroup
```

Send to two groups at once (one API call per group):

```bash
apprise -vv -t "Broadcast" -b "System maintenance in 30 minutes." \
    pushplus://abc123def456ghi789jkl012mno345pq/ops-team/dev-team
```

Deliver via email:

```bash
apprise -vv -t "Title" -b "Email body" \
    "pushplus://abc123def456ghi789jkl012mno345pq?channel=mail"
```

Send to a group and deliver via email:

```bash
apprise -vv -t "Title" -b "Group email" \
    "pushplus://abc123def456ghi789jkl012mno345pq/myteamgroup?channel=mail"
```

Deliver via a named webhook endpoint (long form):

```bash
apprise -vv -t "Title" -b "Webhook payload" \
    "pushplus://abc123def456ghi789jkl012mno345pq?channel=webhook&name=myhook"
```

Deliver via a named webhook endpoint (compact form -- channel implied):

```bash
apprise -vv -t "Title" -b "Webhook payload" \
    "pushplus://myhook@abc123def456ghi789jkl012mno345pq"
```

Use the WeCom schema alias (equivalent to `?channel=cp`):

```bash
apprise -vv -t "Title" -b "WeCom message" \
    wecom://abc123def456ghi789jkl012mno345pq
```

Use the native PushPlus API URL directly:

```bash
apprise -vv -t "Title" -b "Hello" \
    "https://www.pushplus.plus/send?token=abc123def456ghi789jkl012mno345pq"
```
