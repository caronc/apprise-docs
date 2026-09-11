---
title: "WPUSH Notifications"
description: "Send WeChat and multi-channel notifications via the WPUSH platform."
sidebar:
  label: "WPUSH"

source: https://wpush.cn/

schemas:
  - wpush

sample_urls:
  - https://api.wpush.cn/api/v1/send?apikey={apikey}
  - wpush://{apikey}
  - wpush://{apikey}/{topic}
  - wpush://{apikey}?channel={channel}
  - wpush://{apikey}?channel=qqbot&group={qq_group_code}

limits:
  max_chars: 10000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

WPUSH sends notifications through WeChat, its App, SMS, Email, DingTalk, Feishu, WeCom, WeChat ClawBot, QQ Robot, and custom Webhooks. It can use several channels in one API call and authenticates with a personal API Key.

1. Register or sign in at [WPUSH](https://wpush.cn/).
2. Visit the [API Key](https://wpush.cn/apikey) page and copy your key. It always starts with `WPUSH` followed by 27 more characters (32 total).
3. Visit the [Channels](https://wpush.cn/channels) page and bind at least one delivery channel before sending your first message.

Your notification URL for the simplest use case is:

```text
wpush://{apikey}
```

### Topic (Broadcast) Sending

WPUSH also supports sending a single notification to everyone subscribed to a named topic.

1. Create a topic and note its **topic code** from your WPUSH dashboard.
2. Send to the topic to notify all its subscribers.

Place one or more topic codes directly in the URL path:

```text
wpush://{apikey}/{topic}
wpush://{apikey}/{topic1}/{topic2}
```

When multiple topics are listed, Apprise sends the notification to each one in a separate API call.

### Delivery Channels

Notifications use WeChat by default. Select one or more channels with `?channel=`:

| `?channel=` value | Channel                                 |
| ----------------- | --------------------------------------- |
| `wechat`          | WeChat (default, may be omitted)        |
| `app`             | The WPUSH mobile App                    |
| `sms`             | SMS                                     |
| `mail`            | Email                                   |
| `webhook`         | Configured webhook endpoint             |
| `dingtalk`        | DingTalk                                |
| `feishu`          | Feishu                                  |
| `wechat_work`     | WeCom (WeChat Work / Enterprise WeChat) |
| `clawbot`         | WeChat ClawBot                          |
| `qqbot`           | QQ Robot                                |

Separate multiple channels with commas. WPUSH uses one API call for all of them:

```text
wpush://{apikey}?channel=mail
wpush://{apikey}/{topic}?channel=feishu
wpush://{apikey}?channel=feishu,dingtalk,wechat_work
```

### Group and Instance Codes

`?group=` maps to WPUSH's `option` field and has two uses:

- With `qqbot`, it selects a QQ group instead of the account owner.
- With Feishu, DingTalk, WeCom, or Webhook, it selects a bound instance.

```text
wpush://{apikey}?channel=qqbot&group={qq_group_code}
wpush://{apikey}?channel=feishu&group={instance_code}
```

Find the code on the [WPUSH Channels](https://wpush.cn/channels) page. Without it, WPUSH uses the account owner or default instance. This option cannot be combined with topic broadcasts.

### Click-Through Link

Use `?url=` to include a link on supported channels:

```text
wpush://{apikey}?url=https://example.com/
```

## Syntax

Valid syntax is as follows:

- `https://api.wpush.cn/api/v1/send?apikey={apikey}`
- `wpush://{apikey}`
- `wpush://{apikey}/{topic}`
- `wpush://{apikey}/{topic1}/{topic2}`
- `wpush://{apikey}?channel={channel}`
- `wpush://{apikey}?channel={channel1},{channel2}`
- `wpush://{apikey}/{topic}?channel={channel}`
- `wpush://{apikey}?channel=qqbot&group={qq_group_code}`
- `wpush://{apikey}?url={click_through_url}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                   |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | \*Yes    | Your personal WPUSH API Key. Always starts with `WPUSH`. May also be supplied as `?apikey=`.                                                                                  |
| topic    | No       | Topic code placed in the URL path. Multiple topics may appear; one API call is made per topic. May also be supplied as `?to=`, `?topic=`, or `?topic_code=`.                  |
| channel  | No       | One or more of `wechat` (default), `app`, `sms`, `mail`, `webhook`, `dingtalk`, `feishu`, `wechat_work`, `clawbot`, `qqbot`, comma-separated. Supplied as `?channel=`.        |
| group    | No       | QQ group code (`qqbot`), or a bound instance code for `feishu`, `dingtalk`, `wechat_work`, or `webhook`. Cannot be combined with a topic. May also be supplied as `?option=`. |
| url      | No       | An optional click-through link delivered alongside the notification.                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a simple personal notification:

```bash
apprise -vv -t "Title" -b "Hello from Apprise" \
    wpush://WPUSHabc123def456ghi789jkl012mno
```

Send to a topic:

```bash
apprise -vv -t "Team Alert" -b "Deployment complete." \
    wpush://WPUSHabc123def456ghi789jkl012mno/ops-team
```

Send to two topics at once (one API call per topic):

```bash
apprise -vv -t "Broadcast" -b "System maintenance in 30 minutes." \
    wpush://WPUSHabc123def456ghi789jkl012mno/ops-team/dev-team
```

Deliver via Feishu instead of the default WeChat channel:

```bash
apprise -vv -t "Title" -b "Feishu message" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=feishu"
```

Deliver via three channels at once, in a single API call:

```bash
apprise -vv -t "Title" -b "Multi-channel message" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=feishu,dingtalk,wechat_work"
```

Send to a topic and deliver via email:

```bash
apprise -vv -t "Title" -b "Topic email" \
    "wpush://WPUSHabc123def456ghi789jkl012mno/ops-team?channel=mail"
```

Deliver to a specific QQ group via the QQ Robot channel:

```bash
apprise -vv -t "Title" -b "QQ group message" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=qqbot&group=123456789"
```

Deliver via a specific bound Feishu instance:

```bash
apprise -vv -t "Title" -b "Feishu instance message" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=feishu&group=my-instance"
```

Attach a click-through link to the notification:

```bash
apprise -vv -t "Title" -b "See the report" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?url=https://example.com/report"
```

Use the native WPUSH API URL directly:

```bash
apprise -vv -t "Title" -b "Hello" \
    "https://api.wpush.cn/api/v1/send?apikey=WPUSHabc123def456ghi789jkl012mno"
```
