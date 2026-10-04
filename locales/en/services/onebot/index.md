---
title: "OneBot (QQ) Notifications"
description: "Send QQ notifications through a self-hosted OneBot 11 bot such as NapCat, LLOneBot or Lagrange."
sidebar:
  label: "OneBot (QQ)"

source: https://github.com/botuniverse/onebot-11

schemas:
  - onebot: insecure
  - onebots

has_attachments: true
has_chat: true
has_selfhosted: true

body_formats:
  - text

keywords: "napcat, llonebot, lagrange, go-cqhttp, cqhttp"

sample_urls:
  - onebot://{host}:{port}/{user_id}
  - onebot://{token}@{host}:{port}/@{user_id}/#{group_id}
  - onebots://{token}@{host}/@{user_id}/#{group_id}

limits:
  max_chars: 4500
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[OneBot 11](https://github.com/botuniverse/onebot-11) is supported by QQ bot programs such as [NapCat](https://napneko.github.io/), LLOneBot, Lagrange.OneBot, and go-cqhttp. Apprise connects to the program's HTTP server and sends notifications from your QQ account.

1. Install one of the bot programs above and log in with the QQ account that should send your notifications.
2. In its settings, turn on the OneBot 11 **HTTP server**. Note the port it listens on (NapCat often uses `3000`, go-cqhttp uses `5700`).
3. Optionally set an **access token**, then include it in your Apprise URL.
4. Find the QQ number of each person you want to message, and the group number of each group. The bot account must be a friend of each person and a member of each group.

Images, voice clips and videos are sent as QQ media. Any other file is sent as a QQ file, which NapCat, LLOneBot and Lagrange support. Each attachment arrives as its own message.

## Syntax

Valid syntax is as follows:

- `onebot://{host}/{user_id}`
- `onebot://{host}:{port}/@{user_id}/#{group_id}`
- `onebot://{token}@{host}:{port}/@{user_id}/#{group_id}`
- `onebots://{token}@{host}:{port}/@{user_id}/#{group_id}`

You can mix as many users and groups as you like:

- `onebot://{token}@{host}:{port}/@{user_id1}/@{user_id2}/#{group_id1}/#{group_idN}`

Use `onebots://` when your bot is available over HTTPS, such as through a reverse proxy. This encrypts the access token and message while they travel to the bot.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| host     | Yes      | The hostname or IP address of the machine running your OneBot program.                                                          |
| port     | No       | The port of the OneBot HTTP server. Defaults to **80** for `onebot://` and **443** for `onebots://`.                            |
| token    | No       | The access token you set in your OneBot program, if any.                                                                        |
| user_id  | \*Yes    | The QQ number of a person to message, up to 19 digits. The `@` in front is optional.                                            |
| group_id | \*Yes    | The number of a QQ group to message, up to 19 digits. It must start with `#`.                                                   |
| to       | No       | Another way to list users and groups, separated by commas. Write a group's `#` as `%23` here, for example `?to=12345,%2367890`. |

\*At least one user or group is required.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to one QQ user through NapCat on the same machine:

```bash
# Assuming our OneBot HTTP server listens on localhost:3000
# Assuming the QQ number to notify is 12345678
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "onebot://localhost:3000/12345678"
```

Send to a user and a group, using an access token:

```bash
# Assuming our {token} is abc123secret
# Assuming the QQ number is 12345678 and the group number is 87654321
apprise -vv -t "Alert" -b "Server is down!" \
   "onebot://abc123secret@localhost:3000/@12345678/#87654321"
```

Send a picture to a group over HTTPS:

```bash
# Assuming our bot is reachable at bot.example.com (HTTPS)
apprise -vv -b "Today's graph" --attach=graph.png \
   "onebots://abc123secret@bot.example.com/#87654321"
```
