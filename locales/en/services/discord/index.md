---
title: "Discord Notifications"
description: "Send Discord notifications."
sidebar:
  label: "Discord"

source: https://discordapp.com/
schemas:
  - discord

sample_urls:
  - https://discordapp.com/api/webhooks/{WebhookID}/{WebhookToken}
  - discord://{WebhookID}/{WebhookToken}
  - discord://{botname}@{WebhookID}/{WebhookToken}

has_attachments: true
has_image: true

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Creating a Discord account is easy. The only part that requires a little bit of extra work is once you've got a channel set up (by default discord puts you in a #General channel). Click on the Gear icon (Settings) and from here you need to enable webhooks.

The webhook will end up looking something like this:
`https://discordapp.com/api/webhooks/4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js`

This effectively equates to:
`https://discordapp.com/api/webhooks/{WebhookID}/{WebhookToken}`

**Note:** Apprise supports this URL _as-is_ (_as of v0.7.7_); you no longer need to parse the URL any further. However there is slightly less overhead (internally) if you do.

The last part of the URL you're given make up the 2 tokens you need to send notifications with. With respect to the above example the tokens are as follows:

1. **WebhookID** is `4174216298`
2. **WebhookToken** is `JHMHI8qBe7bk2ZwO5U711o3dV_js`

### Pinging Roles, Tags, and Users

The discord message body can contain content such as the following to trigger the appropriate pings

- **user**: `<@123>`
- **role**: `<@&456>`
- **tag**: `@everyone`

## Syntax

Valid syntax is as follows:

- `https://discordapp.com/api/webhooks/{WebhookID}/{WebhookToken}`
- `discord://{WebhookID}/{WebhookToken}/`
- `discord://{botname}@{WebhookID}/{WebhookToken}/`

Discord can also support a variety of website arguments, the below identifies the defaults and therefore do not need to be specified unless you want to override them:

- `discord://{WebhookID}/{WebhookToken}/?tts=No&avatar=Yes&footer=No&image=Yes`

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                                                                                                                                                                                                                                |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebhookID    | Yes      | The first part of 2 tokens provided to you after creating a _incoming-webhook_                                                                                                                                                                                                                                                                             |
| WebhookToken | Yes      | The second part of 2 tokens provided to you after creating a _incoming-webhook_                                                                                                                                                                                                                                                                            |
| botname      | No       | Identify the name of the bot that should issue the message. If one isn't specified then the default is to just use your account (associated with the _incoming-webhook_).                                                                                                                                                                                  |
| tts          | No       | Enable Text-To-Speech (by default is is set to **No**)                                                                                                                                                                                                                                                                                                     |
| footer       | No       | Include a message footer (by default is is set to **No**)                                                                                                                                                                                                                                                                                                  |
| image        | No       | Include an image in-line with the message describing the notification type (by default is is set to **Yes**)                                                                                                                                                                                                                                               |
| avatar       | No       | Over-ride the default discord avatar icon and replace it with one identify the notification type (by default is is set to **Yes**)                                                                                                                                                                                                                         |
| avatar_url   | No       | Over-ride the default discord avatar icon URL. By default this is not set and Apprise chooses the URL dynamically based on the type of message (info, success, warning, or error).                                                                                                                                                                         |
| format       | No       | The default value of this is _text_. But if you plan on managing the format yourself, you can optionally set this to _markdown_. If the mode is set to markdown, apprise will scan for header entries (usually on lines by themselves surrounded by hashtags (#)) and will place these inside embedded objects. This is done to give a nicer presentation. |
| href         | No       | Identify a URL the title should link to when posting the Discord Notification. This forces the post into `markdown` format in order to leverage the `embeds` section of Discord. You can also use `url=` as an alias of this as well.                                                                                                                      |
| thread       | No       | Optionally set the `thread_id` you wish your message to be applied to.                                                                                                                                                                                                                                                                                     |
| ping         | No       | Optionally identify a role, user, our parsed name (such as `everyone`) that should always be pinged when them message is sent. Follow the syntax [identified above](https://github.com/caronc/apprise/wiki/Notify_discord/#pinging-roles-tags-and-users) for the format.                                                                                   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Discord notification:

```bash
# Assuming our {WebhookID} is 4174216298
# Assuming our {WebhookToken} is JHMHI8qBe7bk2ZwO5U711o3dV_js
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js"
```

If you want to have your own custom avatar URL you're already hosting from another website, you could set the following:

```bash
# Assuming our {WebhookID} is 4174216298
# Assuming our {WebhookToken} is JHMHI8qBe7bk2ZwO5U711o3dV_js
# Assuming our {AvatarURL} is https://i.imgur.com/FsEpmwg.jpeg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js?avatar_url=https://i.imgur.com/FsEpmwg.jpeg"
```

Send a notification that notifies `@everyone` in the channel:

```bash
# Assuming our {WebhookID} is 4174216298
# Assuming our {WebhookToken} is JHMHI8qBe7bk2ZwO5U711o3dV_js
apprise -vv -t "Hello All" -b "Test Message that pings @everyone" \
   "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js"
```

Send a notification that leverages the built in `markdown` support of Discord:

```bash
# Assuming our {WebhookID} is 4174216298
# Assuming our {WebhookToken} is JHMHI8qBe7bk2ZwO5U711o3dV_js
cat << _EOF | apprise -vv "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js?format=markdown"
# Title

- Bullet 1
- Bullet 2
- Bullet 3
_EOF
```
