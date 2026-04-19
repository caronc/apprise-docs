---
title: "Notifications notifiarr"
description: "Envoyer notifiarr notifications."
---

## Notifiarr Notifications

- **Source**: <https://notifiarr.com>
- **Icon Support**: No
- **Attachment Support**: No
- **Message Format**: Text
- **Message Limit**: 32768 Characters per message

## Configuration du compte

You need to first set up an account with [Notifiarr](https://notifiarr.com) if you don't have one already. From there you can generate yourself your `{api_key}`. You will need to use your “global” API key, the integration-specific Notifiarr API keys do not work with Apprise.

### Discord Channel IDs

To use Notifiarr, you need your Discord ChannelID. **It must be the numeric version of it**. [Here is some great instructions on how to get it](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).

In short:

- **Enable Developer Mode** by visiting your _Discord Settings_ and going to **Appearance**.

### Mentionner des roles, tags et utilisateurs

The notifiarr message body can contain content such as the following to trigger the appropriate pings

- **user**: `<@123>`
- **role**: `<@&456>`
- **tag**: `@everyone`

**Note**: that as of this time (2024 Jul 28th), the upstream webhook to Notifiarr only supports 1 user/role in the payload. If you provide more then one, only the first will be passed upstream.

## Syntaxe

La syntaxe valide est la suivante :

- `notifiarr://{api_key}/{channel_id}`
- `notifiarr://{api_key}/{channel1_id}/{channel2_id}/{channelN_id}`

## Detail des parametres

| Variable | Required | Description                                                                                                                             |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| api_key  | Yes      | Your global (not integration-specific) Notifiarr API Key                                                                                |
| source   | No       | Optionally provide the source of the notification as a descriptive string (you can also use `from` as an alias to this same variable)   |
| event    | No       | Optionally specify the Notifiarr Event ID you want your notification update. If none is specified, then a new notification is generated |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une discord notification:

```bash
# Assuming our {APIKey} is 4174216298
# Assuming our {ChannelID} is 123456789
# Test out the changes with the following command:
apprise -t "Test Title" -b "Test Message" \
"notifiarr://4174216298/123456789"

```

If you have a Discord Event ID you wish to reference, you can do the following:

```bash
# Assuming our {APIKey} is 4174216298
# Assuming our {ChannelID} is 123456789
# Assuming our {EventID} is 1234
# Test out the changes with the following command:
apprise -t "Test Title" -b "Test Message" \
"notifiarr://4174216298/123456789?event=1234"

```
