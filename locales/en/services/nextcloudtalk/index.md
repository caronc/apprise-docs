---
title: "Nextcloud Talk Notifications"
description: "Send Nextcloud Talk notifications."
sidebar:
  label: "Nextcloud Talk"

source: https://nextcloud.com/talk

schemas:
  - nctalk: insecure
  - nctalks

has_chat: true
has_selfhosted: true

sample_urls:
  - nctalk://{user}:{password}@{hostname}/{room_id}
  - nctalks://{user}:{password}@{hostname}:{port}/{room_id}
  - nctalks://{hostname}/{room_id}?secret={secret}

limits:
  max_chars: 32000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Apprise can post to Nextcloud Talk as a regular user or as a bot.

### User Account

The official [Nextcloud Talk app](https://github.com/nextcloud/spreed) will need to be installed. An 'app password' (also referred to as 'device-specific' password/token) of one member of the chat will need to be created, see the [documentation](https://docs.nextcloud.com/server/stable/user_manual/session_management.html#managing-devices) for more information. Don't forget to disable file system access for this password.

### Bot

Bots need Nextcloud Talk 17.1 (Nextcloud 27.1) or newer. Messages are posted under the bot's name instead of a user's.

1. A server administrator installs the bot with a shared secret of 40 to 128 characters. The bot needs the `response` feature so it can post messages. The URL argument is required by the command but Apprise does not use it:

   ```bash
   occ talk:bot:install --feature response \
       "Apprise" "{secret}" "https://localhost"
   ```

2. Enable the bot in each conversation it should post to. A moderator can do this from the conversation's **Bots** settings, or an administrator can run `occ talk:bot:setup {bot_id} {room_id}`.
3. Use the conversation token (the last part of the conversation's link) as the `{room_id}` in your Apprise URL.

## Syntax

Secure connections (via https) should be referenced using **nctalks://** where as insecure connections (via http) should be referenced via **nctalk://**.

Valid syntax is as follows:

- `nctalk://{user}:{password}@{hostname}/{room_id}`
- `nctalk://{user}:{password}@{hostname}:{port}/{room_id}`
- `nctalks://{user}:{password}@{hostname}/{room_id}`
- `nctalks://{user}:{password}@{hostname}:{port}/{room_id}`

You can post in multiple chats by simply chaining them at the end of the URL.

- `nctalk://{user}:{password}@{hostname}:{port}/{room_id1}/{room_id2}/{room_id3}`
- `nctalks://{user}:{password}@{hostname}:{port}/{room_id1}/{room_id2}/{room_id3}`

To post as a bot, drop the user and password and add the bot's `secret`:

- `nctalk://{hostname}/{room_id}?secret={secret}`
- `nctalks://{hostname}/{room_id}?secret={secret}`
- `nctalks://{hostname}:{port}/{room_id1}/{room_id2}?secret={secret}`

## Parameter Breakdown

| Variable | Required | Description                                                                                 |
| -------- | -------- | ------------------------------------------------------------------------------------------- |
| hostname | Yes      | The hostname of the server hosting your Nextcloud service.                                  |
| user     | \*Yes    | The user of the nextcloud service you have set up.                                          |
| password | \*Yes    | The password associated with the **user** for your Nextcloud account.                       |
| secret   | \*Yes    | The shared secret of an installed bot. Use it instead of a user and password.               |
| room_id  | Yes      | The room_id of Nextcloud Talk.                                                              |
| silent   | No       | Set to `yes` to post without triggering chat notifications. By default this is set to `no`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a secure nextcloud talk message to the room _93nfkdn3_:

```bash
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345:
apprise nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3
```

Send the same message as a bot instead:

```bash
# Assuming our {host} is localhost
# Assuming our bot {secret} is abcdefghijklmnopqrstuvwxyz0123456789ABCD
apprise -vv -t "Backup completed" -b "The nightly backup is ready." \
   'nctalks://localhost/93nfkdn3?secret=abcdefghijklmnopqrstuvwxyz0123456789ABCD'
```

:::tip
If your secret contains special characters such as `&`, `+`, `/` or `%`, URL-encode them (for example `&` becomes `%26`).
:::

### Header Manipulation

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room 93nfkdn3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3?+X-Token=abcdefg"

# Multiple headers just require more entries defined:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room 93nfkdn3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3?+X-Token=abcdefg&+X-Apprise=is%20great"
```
