---
title: "Notifications Ryver"
description: "Envoyer Ryver notifications."
sidebar:
  label: "Ryver"

source: https://ryver.com/

schemas:
  - ryver

has_image: true

sample_urls:
  - https://{organization}.ryver.com/application/webhook/{token}
  - ryver://{organization}/{token}/
  - ryver://{botname}@{organization}/{token}/
  - ryver://{organization}/{token}/?webhook=slack

limits:
  max_chars: 1000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use Ryver you'll need to have the forum(s) you intend to notify already pre-created. You'll need to do this before you follow the next set of instructions.

Next you need to define a new webhook and get the corresponding URL. This is done through:

1. click on the **Integrations** > **Incoming Webhooks** beneath your settings on the left
2. click on the **Create Webhook** button
3. choose either **Slack** or **Plain/text Ryver** as this plugin currently supports both.
4. Regardless of what webhook type you choose to create (Slack or Ryver), the next steps are still the same:
   - Set the webhook type to **Chat Message**
   - Select the forum(s) you already have set up to allow this webhook to access.
   - Click next.

When you've completed this process you will receive a URL that looks something like this:
`https://apprise.ryver.com/application/webhook/ckhrjW8w672m6HG`

This effectively equates to:<br/>
`https://{organization}.ryver.com/application/webhook/{token}`

**Note:** Apprise supports this URL _as-is_ (_as of v0.7.7_); you no longer need to parse the URL any further. However there is slightly less overhead (internally) if you do.

The last part of the URL you're given is the token we're most interested in. With respect to the above example:

- the **token** is `ckhrjW8w672m6HG`
- the **organization** is `apprise`

## Syntaxe

La syntaxe valide est la suivante :

- `https://{organization}.ryver.com/application/webhook/{token}`
- `ryver://{organization}/{token}/`
- `ryver://{botname}@{organization}/{token}/`
- `ryver://{organization}/{token}/?webhook=slack`

## Detail des parametres

| Variable     | Required | Description                                                                                                                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| organization | Yes      | The organization you created your webhook under.                                                                                                                             |
| token        | Yes      | The token provided to you after creating a _incoming-webhook_                                                                                                                |
| botname      | No       | Set the display name the message should appear from.                                                                                                                         |
| webhook      | No       | The type of webhook you created (Slack or Ryver). The only possible values are **slack** and **ryver**. The default value is **ryver** if the webhook value isn't specified. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une ryver notification:

```bash
# Assuming our {organization} is apprise
# Assuming our {token} is T1JJ3T3L2
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ryver:///apprise/T1JJ3T3L2
```
