---
title: "Notifications Zulip"
description: "Envoyer Zulip notifications."
sidebar:
  label: "Zulip"

source: https://zulipchat.com/

schemas:
  - zulip

sample_urls:
  - zulip://{botname}@{organization}/{token}/
  - zulip://{botname}@{organization}/{token}/{stream}
  - zulip://{botname}@{organization}/{token}/{email}

limits:
  max_chars: 10000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use this Zulip, you must have a Zulip Chat bot defined; See [here for more details](https://zulipchat.com/help/add-a-bot-or-integration). At the time of writing this plugin the instructions were:

1. From your desktop, click on the gear icon in the upper right corner.
2. Select Settings.
3. On the left, click Your bots.
4. Click Add a new bot.
5. Fill out the fields, and click Create bot.

If you know your organization **{ID}** (as it's part of your zulipchat.com url), then you can also access your bot information by visiting: `https://ID.zulipchat.com/#settings/your-bots`

Upon creating a bot successfully, you'll now be able to access its API Token.

## Syntaxe

La syntaxe valide est la suivante :

- `zulip://{botname}@{organization}/{token}/`
- `zulip://{botname}@{organization}/{token}/{stream}`
- `zulip://{botname}@{organization}/{token}/{stream1}/{stream2}/{streamN}`
- `zulip://{botname}@{organization}/{token}/{email}`
- `zulip://{botname}@{organization}/{token}/{email1}/{email2}/{emailN}`

**Note**: If neither a **{stream}** or **{email}** is specified then by default the stream **general** is notified.

You can also mix and match the entries above too:

- `zulip://{botname}@{organization}/{token}/{stream1}/{email1}/`

## Detail des parametres

| Variable     | Required | Description                                                                                                                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| organization | Yes      | The organization you created your webhook under. The trailing part of the organization reading `.zulipchat.com` is not required here, however this is gracefully handled if specified. |
| token        | Yes      | The API token provided to you after creating a _bot_                                                                                                                                   |
| botname      | Yes      | The botname associated with the API Key. The `-bot` portion of the bot name is not required, however this is gracefully handled if specified.                                          |
| email        | No       | An email belonging to one of the users that have been added to your organization the private message.                                                                                  |
| stream       | No       | A stream to notify.                                                                                                                                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Zulip notification to default #general (default) stream:

```bash
# Assuming our {organization} is apprise
# Assuming our {token} is T1JJ3T3L2
# Assuming our {botname} is goober
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   zulip:///goober@apprise/T1JJ3T3L2
```

Envoyer une Zulip notification to the #support stream:

```bash
# Assuming our {organization} is apprise
# Assuming our {token} is T1JJ3T3L2
# Assuming our {stream} is #support
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   zulip:///apprise/T1JJ3T3L2/support
```
