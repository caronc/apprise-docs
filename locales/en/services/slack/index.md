---
title: "Slack Notifications"
description: "Send Slack notifications."
sidebar:
  label: "Slack"

source: https://slack.com/

schemas:
  - slack

has_attachments: true
has_image: true

sample_urls:
  - https://hooks.slack.com/services/{tokenA}/{tokenB}/{tokenC}
  - slack://{tokenA}/{tokenB}/{tokenC}
  - slack://{OAuthToken}/

limits:
  max_chars: 35000
---

<!-- SERVICE:DETAILS -->

## Account Setup

Slack is slightly more complicated then some of the other notification services, so here is quick breakdown of what you need to know and do in order to send Notifications through it using this tool:

### Method 1: Incoming Webhook

First off, Slack notifications require an _incoming-webhook_ it can connect to.

1. You can create this webhook from [here](https://my.slack.com/services/new/incoming-webhook/). Just follow the wizard to pre-determine the channel(s) you want your message to broadcast to.
2. Or you can create a Slack App [here](https://api.slack.com/slack-apps) and associate it with one of your Slack Workspaces. From here there are just a few extra steps needed to get your webhook URL (all done through the App's configuration screen):
   - You must **Activate** the **Incoming Webhook** _Feature_ if not already.
   - On this same configuration screen, you can create a webhook and assign it to a channel/user.

Regardless of what option you choose (above), both will result in giving you a webhook URL that looks something like this:<br/>
`https://hooks.slack.com/services/T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F`

This URL effectively equates to:<br/>
`https://hooks.slack.com/services/{tokenA}/{tokenB}/{tokenC}`

**Note:** Apprise supports this URL _as-is_ (_as of v0.7.7_); you no longer need to parse the URL any further. However there is slightly less overhead (internally) if you do.

If you want to convert this to an Apprise URL, do the following:
The last part of the URL you're given make up the 3 tokens you need to send notifications with It's very important to pay attention. In the above example the tokens are as follows:

1. **TokenA** is `T1JJ3T3L2`
1. **TokenB** is `A1BRTD4JD`
1. **TokenC** is `TIiajkdnlazkcOXrIdevi7F8`

### Method 2: Create a Bot

Bots offer you slightly more flexibility then Webhooks do. The main difference is _Slack Bots_ can support attachments allowing you to leverage this in Apprise!

1. First create your [Slack App here](https://api.slack.com/apps?new_app=1).
1. Pick an App Name (such as _Apprise_) and select your workspace; click on the **Create App**
1. You'll be able to click on **Bots** menu selection from here where you can then choose to add a **Bot User**. Give it a name and then choose \*_Add Bot User_.
1. You'll need to provide the proper OAuth permissions:<br/>![Slack Bot OAuth Min Permissions](./images/285847dfb5ef03ee.png)
1. Now choose **Install App** to which you can choose **Install App to Workspace**.
1. You will need to authorize the app which you get prompted to do; so this step is easy.
1. Finally you'll get some very important information you will need for Apprise. From this point on you can either used the **OAuth Access Token** or the **Bot User OAuth Access Token** using the syntax `slack://{OAuth Access Token}`.

Your Apprise Slack URL (for accessing your Bot) might look something like:

- `slack://xoxp-1234-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d`
- `slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d`

Both OAuth tokens you are provided have the ability to post text to channels and provide attachments. So it's up to you which of the two you choose to use.

## Syntax

Valid syntax is as follows:

- `slack://{tokenA}/{tokenB}/{tokenC}`
- `https://hooks.slack.com/services/{tokenA}/{tokenB}/{tokenC}`
- `slack://{OAuthToken}/`
  - A Bot has no default channel configurable through Slack like Webhooks do. If no channel is specified, then the channel `#general` is used.

Now if you're using the legacy webhook method (and not going through the App), you're granted a bit more freedom. As a result, the following URLs will also work for you through Apprise:

- `slack://{tokenA}/{tokenB}/{tokenC}/#{channel}`
- `slack://{tokenA}/{tokenB}/{tokenC}/#{channel1}/#{channel2}/#{channelN}`
- `slack://{OAuthToken}/#{channel}`
- `slack://{botname}@{OAuthToken}/#{channel1}/#{channel2}/#{channelN}`

If you know the _Encoded-ID_ of the channel you wish to access, you can use the plus (+) symbol to identify these separately from channels in the url. Valid syntax is as follows:

- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/+{encoded_id}`
- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/+{encoded_id1}/+{encoded_id2}/+{encoded_id3}`
- `slack://{botname}@{OAuthToken}/+{encoded_id}`
- `slack://{botname}@{OAuthToken}/+{encoded_id1}/+{encoded_id2}/+{encoded_id3}`

If you know the user_id you wish to transmit your slack notification to (instead of a channel), you can use the at symbol (@) to do this with. Valid syntax is as follows:

- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/@{user_id}`
- `slack://{botname}@{tokenA}/{tokenB}/{tokenC}/@{user_id1}/@{user_id2}/@{user_id3}`
- `slack://{botname}@{OAuthToken}/@{user_id}`
- `slack://{botname}@{OAuthToken}/@{user_id1}/@{user_id2}/@{user_id3}`

You can freely mix and match all of the combinations in any order as well:

- `slack://**{botname}@{tokenA}/{tokenB}/{tokenC}/@{user_id}/#{channel}/+{encoded_id}`
- `slack://{botname}@{OAuthToken}/@{user_id}/#{channel}/+{encoded_id}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenA     | Yes      | The first part of 3 tokens provided to you after creating a _incoming-webhook_. The OAuthToken is not required if using the Slack Webhook.                                                                                                                                                                                                                                                                                                                          |
| tokenB     | Yes      | The second part of 3 tokens provided to you after creating a _incoming-webhook_. The OAuthToken is not required if using the Slack Webhook.                                                                                                                                                                                                                                                                                                                         |
| tokenC     | Yes      | The last part of 3 tokens provided to you after creating a _incoming-webhook_. The OAuthToken is not required if using the Slack Webhook.                                                                                                                                                                                                                                                                                                                           |
| OAuthToken | Yes      | The OAuth Token provided to you through the Slack App when using a a _Bot_ instead of a Webhook. Token A, B and C are not used when using Bots.                                                                                                                                                                                                                                                                                                                     |
| channel    | No       | Channels must be prefixed with a hash tag **#**! You can specify as many channels as you want by delimiting each of them by a forward slash (/) in the url.                                                                                                                                                                                                                                                                                                         |
| encoded_id | No       | Slack allows you to represent channels and private channels by an _encoded_id_. If you know what they are, you can use this instead of the channel to send your notifications to. All encoded_id's must be prefixed with a plus symbol **+**!                                                                                                                                                                                                                       |
| user_id    | No       | Users must be prefixed with an at symbol **@**! You can specify as many users as you want by delimiting each of them by a forward slash (/) in the url.                                                                                                                                                                                                                                                                                                             |
| botname    | No       | Identify the name of the bot that should issue the message. If one isn't specified then the default is to just use your account (associated with the _incoming-webhook_).                                                                                                                                                                                                                                                                                           |
| footer     | No       | Identify whether or not you want the Apprise Footer icon to show with each message. By default this is set to **yes**.                                                                                                                                                                                                                                                                                                                                              |
| image      | No       | Identify whether or not you want the Apprise image (showing status color) to display with every message or not. By default this is set to **yes**.                                                                                                                                                                                                                                                                                                                  |
| mode       | No       | Optionally enforce the mode the Slack plugin should operate in. This is detected by default, but possible options are `hook` (webhook mode) `gov-hook` (government webhook mode), and `bot` to have the service interact through the slack bot api                                                                                                                                                                                                                  |
| template   | No       | Path to a local template file. When set, the file's contents are used to build the Slack payload instead of the default layout (Block Kit mode is implied automatically). The template must be a JSON file whose top-level object contains a non-empty `"blocks"` list (Slack Block Kit format). Use `{{app_body}}`, `{{app_title}}`, `{{app_color}}`, `{{app_type}}`, `{{app_id}}`, `{{app_desc}}`, `{{app_image_url}}`, and `{{app_url}}` as substitution tokens. |
| :token     | No       | Custom token(s) for template substitution. Prefix each token name with a colon in the URL (e.g. `?:mykey=myval`). Any token defined here is available as `{{mykey}}` inside the template file.                                                                                                                                                                                                                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Slack notification to the channel `#nuxref`:

```bash
# Assuming our {tokenA} is T1JJ3T3L2
# Assuming our {tokenB} is A1BRTD4JD
# Assuming our {tokenC} is TIiajkdnlazkcOXrIdevi7F
# our channel nuxref is represented by #nuxref
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   slack:///T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/#nuxref
```

Alternatively, if you're using the Bot; a Slack notification sent to the channel `#general` might look like this:

```bash
# Assuming our {OAuthToken} is xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d
# our channel general is represented by #general
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d/#general
```

Perhaps you want to disable the footer, you can do so like so:

```bash
# Assuming our {OAuthToken} is xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d
# we want to send it to our #general channel; %23 is the encoded way of representing the #
# we set footer to no as well
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d/%23general?footer=no
```

Send a notification using a custom Slack Block Kit JSON template:

```bash
# First create your template file, e.g. /etc/apprise/slack-blocks.json:
# {
#   "blocks": [
#     {
#       "type": "header",
#       "text": {"type": "plain_text", "text": "{{app_title}}"}
#     },
#     {
#       "type": "section",
#       "text": {"type": "mrkdwn", "text": "{{app_body}}"}
#     }
#   ],
#   "color": "{{app_color}}"
# }
#
# Then reference it with template= (blocks mode is implied automatically):
apprise -vv -t "Alert" -b "Disk usage at 95%" \
   "slack://T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/?template=/etc/apprise/slack-blocks.json"
```

Custom tokens can be injected into any template using the `:key=value` prefix:

```bash
apprise -vv -t "Deploy" -b "v2.3.1 deployed" \
   "slack://xoxb-1234-1234-4ddbc191d40ee098cbaae6f3523ada2d/%23ops/?template=/etc/apprise/slack-tmpl.json&:env=production&:team=platform"
```
