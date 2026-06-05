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

limits:
  max_chars: 32000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

The official [Nextcloud Talk app](https://github.com/nextcloud/spreed) will need to be installed. An 'app password' (also referred to as 'device-specific' password/token) of one member of the chat will need to be created, see the [documentation](https://docs.nextcloud.com/server/stable/user_manual/session_management.html#managing-devices) for more information. Don't forget to disable file system access for this password.

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

## Parameter Breakdown

| Variable | Required | Description                                                           |
| -------- | -------- | --------------------------------------------------------------------- |
| hostname | Yes      | The hostname of the server hosting your Nextcloud service.            |
| user     | Yes      | The user of the nextcloud service you have set up.                    |
| password | Yes      | The password associated with the **user** for your Nextcloud account. |
| room_id  | Yes      | The room_id of Nextcloud Talk.                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a secure nextcloud talk message to the room _93nfkdn3_:

```bash
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345:
apprise nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3
```

### Header Manipulation

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a hyphen (**-**) in front of any parameter you specify on your URL string.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# We want to send an insecure connection (we'll use ncloud://)
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room _93nfkdn3_:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3?-X-Token=abcdefg

# Multiple headers just require more entries defined with a hyphen in front:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room _93nfkdn3_:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   nctalks://user1:12345-67890-12345-67890-12345@localhost/arnold?-X-Token=abcdefg&-X-Apprise=is%20great
```
