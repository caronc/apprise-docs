---
title: "Mattermost Notifications"
description: "Send Mattermost notifications."
sidebar:
  label: "Mattermost"

source: https://mattermost.com/

schemas:
  - mmost: insecure
  - mmosts

has_image: true

sample_urls:
  - mmosts://{hostname}/{token}
  - mmosts://{botname}@{hostname}/{token}
  - mmosts://{hostname}/{token}?mode=bot&to={channel_id}
  - mmosts://{team}@{hostname}/{token}?mode=bot&to=#general
  - mmosts://{hostname}:{port}/{path}/{token}?mode=bot&to={channel_id}

limits:
  max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Account Setup

To use this plugin, you need to first set yourself up with <http://mattermost.com>. Download their software and set it up.

This plugin supports 2 different integration styles:

1. **Incoming Webhooks (default)**, posts to `/hooks/<webhook_token>`.
2. **Bot (REST API) posting (mode=bot)**, posts to `/api/v4/posts` using an access token (Bot or User).

### Incoming Webhook Setup (default)

From here you'll need an \*_Incoming Webhook_. This can be done as follows:

1. Click on the **Integrations** option under the channel dropdown and select **Incoming Webhook**:<br/>
   <img alt="Incoming Webhook" src="./images/107084396-ff55dc00-67c4-11eb-899c-a65b2f639158.png" height="300">
2. From here you can select **Add Incoming Webhook**:<br/>
   <img alt="Add Incoming Webhook" src="./images/107083851-3d9ecb80-67c4-11eb-8bf7-820a3554eadb.png" height="300">
3. Finally you'll be able to customize how you want the webhook to act and you can press **Save** at the bottom when you're complete.<br/>
   <img alt="Generate An Apprise URL from it" src="./images/107083865-442d4300-67c4-11eb-8228-7d7afb5974e3.png" height="300">

An example URL you may be provided could look like this:

```bash
# The URL provided by Mattermost:
http://localhost:8065/hooks/yokkutpah3r3urc5h6i969yima
         ^        ^                ^
         |        |                |
      hostname   port           webhook token

# From here you can do the following to generate your Apprise URL:
# - http:// becomes mmost://
# - drop /hooks reference
# Which gets you:
mmost://localhost:8065/yokkutpah3r3urc5h6i969yima
```

### Posting as the Bot

If you want the message to be attributed to a **bot account** (or a specific user), you must use Mattermost's REST API posting:

- `POST /api/v4/posts`
- `Authorization: Bearer <bot_access_token>`
- JSON payload containing `channel_id` and `message`

Incoming webhooks do not authenticate as a user session, so they cannot truly
post as a bot account. You can still set a display name in webhook mode, but it
depends on Mattermost server settings permitting overrides.

In bot mode you can target channels in two ways:

1. Provide a `channel_id` directly (preferred).
2. Provide `#channel_name` only when a team name is also provided, since Apprise
   must perform a lookup to translate `#channel_name` into a `channel_id`.

## Syntax

### Webhook Mode (default)

Valid syntax is as follows:

- `mmost://{hostname}/{token}`
- `mmost://{hostname}:{port}/{token}`
- `mmost://{botname}@{hostname}/{token}`
- `mmost://{botname}@{hostname}:{port}/{token}`
- `mmost://{hostname}/{path}/{token}`
- `mmost://{hostname}:{port}/{path}/{token}`
- `mmost://{botname}@{hostname}/{path}/{token}`
- `mmost://{botname}@{hostname}:{port}/{path}/{token}`

Secure connections (via https) should be referenced using **mmosts://**, whereas
insecure connections (via http) should be referenced via **mmost://**. They
follow the same structure.

Webhook mode can be used with or without channels:

- If channels are provided, Apprise will include `"channel"` in the payload.
- If channels are not provided, Apprise will not include `"channel"`, and
  Mattermost will use the webhook's configured defaults.

### Bot Mode (mode=bot)

Bot mode uses the same base URL syntax, however:

- `{token}` is an **access token** (Bot token or User token)
- you must provide one or more targets using `to=` or `channels=`
- `image` and `icon_url` do not apply in this mode

If a team name is not provided, any `#channel_name` targets are ignored.

Examples:

- `mmosts://{hostname}/{access_token}?mode=bot&to={channel_id}`
- `mmosts://{hostname}/{access_token}?mode=bot&to={id1},{id2}`
- `mmosts://{team}@{hostname}/{access_token}?mode=bot&to=#general`
- `mmosts://{hostname}/{access_token}?mode=bot&team={team}&to=#general`
- `mmosts://{hostname}:{port}/{path}/{access_token}?mode=bot&to={channel_id}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The server Mattermost is listening on.                                                                                                                                                                                     |
| token    | Yes      | **Webhook mode:** Incoming Webhook token. **Bot mode:** Bot or User access token (Bearer token).                                                                                                                           |
| port     | No       | The server port Mattermost is listening on. If omitted, Apprise uses the default port associated with the scheme (for example 443 for `mmosts://`). Many Mattermost installs use port **8065**, so specify it when needed. |
| path     | No       | You can identify a sub-path if you wish. The last element of the path must be the **token**.                                                                                                                               |
| botname  | No       | **Webhook mode:** optional display name override. Requires the Mattermost admin setting "Enable integrations to override usernames". **Bot mode:** alias of `team`, used only for `#channel_name` lookup.                  |
| team     | No       | **Bot mode only.** Team name used to resolve `#channel_name` targets into channel ids. This maps to the same internal value as `botname` and the URL user portion.                                                         |
| image    | No       | **Webhook mode only.** Include the Apprise status image. Ignored when `icon_url` is set.                                                                                                                                   |
| icon_url | No       | **Webhook mode only.** Override the avatar icon with a custom URL. Requires the Mattermost admin setting "Enable integrations to override profile picture icons".                                                          |
| channels | No       | **Webhook mode:** channel names. **Bot mode:** channel ids (or `#channel_name` when `team` is provided). You can specify a comma separated list.                                                                           |
| channel  | No       | Alias of `channels`.                                                                                                                                                                                                       |
| to       | No       | Alias of `channels`. Useful for YAML config where `to:` is already a concept.                                                                                                                                              |
| mode     | No       | `webhook` (default) or `bot`.                                                                                                                                                                                              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a secure Mattermost notification to our server using a webhook:

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mmosts://mattermost.server.local/3ccdd113474722377935511fc85d3dd4
```

Send a secure Mattermost notification to our server running on TCP Port 8065:

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our secure {port} our server is running on is 8065
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mmosts://mattermost.server.local:8065/3ccdd113474722377935511fc85d3dd4
```

Send an insecure Mattermost notification to a server, addressing specific
channels:

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4
# Assuming our {channels} is #support and #general

# We don't need to provide the '#' (hashtag) prefix:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mmost://mattermost.server.local/3ccdd113474722377935511fc85d3dd4?channels=support,general
```

Post as a bot into a specific channel id:

```bash
# Assuming our {access_token} is abcd1234
# Assuming our {channel_id} is f6g7ha13d4e58ib2c9aa
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   'mmosts://mattermost.server.local/abcd1234?mode=bot&to=f6g7ha13d4e58ib2c9aa'
```

Post as a bot into multiple channel id targets:

```bash
# Assuming our {access_token} is abcd1234
# Assuming our {channel_ids} are a1b2c3d4e5f6g7h8i9j0 and f6g7ha13d4e58ib2c9aa
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   'mmosts://mattermost.server.local/abcd1234?mode=bot&to=a1b2c3d4e5f6g7h8i9j0,f6g7ha13d4e58ib2c9aa'
```

Post as a bot using `#channel_name` lookup (team required):

```bash
# Assuming our {access_token} is abcd1234
# Assuming our {team} is myteam
# Assuming our {channel_name} is general

# Team provided via URL user portion:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   'mmosts://myteam@mattermost.server.local/abcd1234?mode=bot&to=#general'

# Team provided via query string:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   'mmosts://mattermost.server.local/abcd1234?mode=bot&team=myteam&to=#general'
```
