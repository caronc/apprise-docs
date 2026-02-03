---
title: "IRC Notifications"
description: "Send IRC notifications."
sidebar:
  label: "IRC"

source: https://ircv3.net/
schemas:
  - irc: insecure
  - ircs

sample_urls:
  - irc://{host}/#channel
  - ircs://{host}/#channel
  - ircs://{host}:{port}/#channel
  - ircs://{nick}@{host}/#channel
  - ircs://{user}:{password}@{host}/#channel?mode=nickserv&nick={nick}
  - ircs://{user}:{password}@{host}/#channel?mode=znc&nick={nick}

limits:
  - max_chars: 380
---

<!-- SERVICE:DETAILS -->

## Account Setup

IRC does not require a formal account setup in Apprise. You only need access to an IRC server, or access to a ZNC bouncer if you plan to use bouncer mode.

If your IRC network requires NickServ authentication, make sure you have registered your nickname and have your NickServ password ready.

If you are using ZNC, ensure your bouncer is reachable and your ZNC username and password are correct.

## Syntax

Valid syntax is as follows:

- `irc://{host}/{target}`
- `ircs://{host}/{target}`

Targets are defined in the URL path as one or more entries:

- Channels use `#` prefix: `#channel`
- Users use `@` prefix: `@nickname`

You can provide multiple targets by separating them with `/`:

- `ircs://irc.example.net/#alerts/@bob/@alice`

### Channel Keys

If a channel is protected by a key, append it after the channel name using `:`:

- `ircs://irc.example.net/#private:channel-key`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| host     | Yes      | IRC server hostname or IP address.                                                                                                                                                                                                                                                                                                                                                                           |
| port     | No       | IRC server port. Defaults to 6667 for `irc://` and 6697 for `ircs://`.                                                                                                                                                                                                                                                                                                                                       |
| user     | No       | Username used for authentication. Meaning depends on `mode`.                                                                                                                                                                                                                                                                                                                                                 |
| password | No       | Password used for authentication. Meaning depends on `mode`.                                                                                                                                                                                                                                                                                                                                                 |
| target   | No       | One or more recipients (channels and/or users) provided in the URL path.                                                                                                                                                                                                                                                                                                                                     |
| to       | No       | Alias of `targets`. Allows defining recipients in the query string instead of the path.                                                                                                                                                                                                                                                                                                                      |
| nick     | No       | Nickname used when registering to the server. If not specified, the nick defaults to `user` when provided.                                                                                                                                                                                                                                                                                                   |
| name     | No       | Real name (GECOS) used during registration.                                                                                                                                                                                                                                                                                                                                                                  |
| mode     | No       | Authentication mode, one of: `server`, `nickserv`, `znc`. Default is `server`.                                                                                                                                                                                                                                                                                                                               |
| join     | No       | Controls whether Apprise joins channels before sending. Default is `yes`. <br/>Channels that have a password associated with them (provided as `#channel:key` here) can not post the message without first joining the channel. Thus if this `join=no`, it will not apply to channels with assigned passwords, but will apply to everything else. This setting has no value if you are only messaging users. |

### Mode Notes

- `mode=server`: Optional `password` is sent as a server PASS during registration when provided.
- `mode=nickserv`: Uses NickServ identify flow after connecting, then sends notifications.
- `mode=znc`: Authenticates to the ZNC bouncer. The PASS line is built as `user:password` for compatibility with common ZNC configurations. A PING/PONG liveness check is performed prior to sending notifications.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to a channel over TLS:

```bash
apprise -vv -t "Title" -b "Message body" \
  "ircs://irc.example.net/#alerts"
```

Send to multiple targets:

```bash
apprise -vv -t "Title" -b "Message body" \
  "ircs://irc.example.net/#alerts/@bob/@alice"
```

Send to a password protected channel:

```bash
apprise -vv -t "Title" -b "Message body" \
  "ircs://irc.example.net/#private:channel-key"
```

NickServ mode example:

```bash
apprise -vv -t "Title" -b "Message body" \
  "ircs://user:pass@irc.example.net/#alerts?mode=nickserv&nick=MyNick"
```

ZNC bouncer mode example:

```bash
apprise -vv -t "Title" -b "Message body" \
  "ircs://zncuser:zncpass@znc.example.net/#alerts?mode=znc&nick=MyNick"
```

ZNC mode, multiple targets:

```bash
apprise -vv -t "Title" -b "Message body" \
  "ircs://zncuser:zncpass@znc.example.net/#alerts/@bob?mode=znc&nick=MyNick"
```
