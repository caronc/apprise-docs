---
title: "Microsoft Teams Notifications"
description: "Send Microsoft Teams notifications."
sidebar:
  label: "Microsoft Teams"

source: https://teams.microsoft.com

schemas:
  - msteams

ended: 2026-05-22

has_image: true

sample_urls:
  - https://team-name.office.com/webhook/{tokenA}/IncomingWebhook/{tokenB}/{tokenC}
  - msteams://{team}/{tokenA}/{tokenB}/{tokenC}/

limits:
  max_chars: 1000
---

:::caution

This service has been retired upstream. All information below pertains to its legacy configuration.
:::

<!-- SERVICE:DETAILS -->

## Account Setup

Create a free account at <https://teams.microsoft.com>.

You will need to create an **Incoming Webhook** to attach Apprise. This can be accomplished through the **the app store** (bottom left hand side of slack like interface); don't worry, it's free. From within the app store, search for **Incoming Webhook**. Once you click on it you can associate it with your team. You can also assign it a name, and an avatar. Finally you will have to assign it to a channel.

Alternatively, go to the channel where you want to add the webhook and select ••• icon (More options) from the top navigation bar. Search for **Incoming Webhook** and select **Add**.

When you've completed this, it will generate you a URL that looks like:

```text
https://team-name.office.com/webhook/ \
       abcdefgf8-2f4b-4eca-8f61-225c83db1967@abcdefg2-5a99-4849-8efc-\
        c9e78d28e57d/IncomingWebhook/291289f63a8abd3593e834af4d79f9fe/\
          a2329f43-0ffb-46ab-948b-c9abdad9d643
```

Yes... The URL is that big... but at the end of the day this effectively equates to:
`https://{team}.office.com/webhook/{tokenA}/IncomingWebhook/{tokenB}/{tokenC}`

Hence:
The team name can be found in the generated webhook which looks like:

```text
# https://TEAM-NAME.office.com/webhook/ABCD/IncomingWebhook/DEFG/HIJK
#             ^                         ^                    ^    ^
#             |                         |                    |    |
#  These are important <----------------^--------------------^----^
```

vs the legacy URL which looked like (always stating `outlook` as the team name):

```text
# https://outlook.office.com/webhook/ABCD/IncomingWebhook/DEFG/HIJK
#           ^                         ^                    ^    ^
#           |                         |                    |    |
#   legacy team reference: 'outlook'  |                    |    |
#                                     |                    |    |
#  These are important <--------------^--------------------^----^
```

So as you can see, we have is 3 separate tokens. These are what you need to build your apprise URL with. In the above example the tokens are as follows:

1. **TokenA** is `ABCD@WXYZ`
2. **TokenB** is `DEFG`
3. **TokenC** is `HIJK`

**Note:** Apprise supports this URL _as-is_ (_as of v0.7.7_); you no longer need to parse the URL any further. However there is slightly more overhead (internally) if you do use it this way.

## Syntax

Valid syntax is as follows:

- `https://team-name.office.com/webhook/{tokenA}/IncomingWebhook/{tokenB}/{tokenC}`
- `msteams://{team}/{tokenA}/{tokenB}/{tokenC}/`

The Legacy format is also still supported. The below URL would automatically set the team name to `outlook`

- `msteams://{tokenA}/{tokenB}/{tokenC}/`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| team     | Yes      | Extracted from the _incoming-webhook_.                                                                                                                                                                                                    |
| tokenA   | Yes      | The first part of 3 tokens provided to you after creating a _incoming-webhook_                                                                                                                                                            |
| tokenB   | Yes      | The second part of 3 tokens provided to you after creating a _incoming-webhook_                                                                                                                                                           |
| tokenC   | Yes      | The last part of 3 tokens provided to you after creating a _incoming-webhook_                                                                                                                                                             |
| template | No       | Optionally point to your own custom JSON formatted Microsoft Teams **MessageCard**; [See here for details on their formatting](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Microsoft Teams notification:

```bash
# Assuming our {team} is Apprise
# Assuming our {tokenA} is T1JJ3T3L2@DEFK543
# Assuming our {tokenB} is A1BRTD4JD
# Assuming our {tokenC} is TIiajkdnlazkcOXrIdevi7F
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   msteams:///Apprise/T1JJ3T3L2@DEFK543/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/
```

## Templating

### The `template` URL Argument

Define a `?template=` argument that points to a predefined **MessageCard** you've already prepared for Microsoft Teams. The `template` parameter can either point to a local file or a web based URL. Its contents must be JSON (or you'll get an error trying to process it), and it at the very minimum must have the basic pattern:

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions"
}
```

#### The Template Tokens

The `template=` you point to, can either be fully populate and ready to go as is (up to the MSTeams chat server), or you can dynamically populate it on the fly each time you call Apprise. You do this by using the double curly brace `{{` and `}}` to surround a keyword that you invent; here is an example:

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "{{app_id}}",
  "sections": [
    {
      "activityImage": "{{app_image_url}}",
      "activityTitle": "{{app_title}}",
      "text": "Hello {{ target }}, how are you {{ whence }}?"
    }
  ]
}
```

In the above example, we introduce several tokens... `app_id`, `app_title`, `target` and `whence`. There are a few entries that will ALWAYS be set and you can not over-ride them. They are:

- **app_id**: The Application identifier; usually set to `Apprise`, but developers of custom applications may choose to over-ride this and place their name here. this is how you acquire this value.
- **app_desc**: Similar the the Application Identifier, this is the Application Description. It's usually just a slightly more descriptive alternative to the _app_id_. This is usually set to `Apprise Notification` unless it has been over-ridden by a developer.
- **app_color**: A hex code that identifies a colour associate with a message. For instance, `info` type messages are generally blue where as `warning` ones are orange, etc.
- **app_type**: The message type itself; it may be `info`, `warning`, `success`, etc
- **app_title**: The actual title (`--title` or `-t` if from the command line) that was passed into the apprise notification when called.
- **app_body**: The actual body (`--body` or `-b` if from the command line) that was passed into the apprise notification when called.
- **app_image_url**: The image URL associated with the message type (`info`, `warning`, etc) if one exists and/or was not specified to be turned off from the URL (`image=no`)
- **app_url**: The URL associated with the Apprise instance (found in the **AppriseAsset()** object). Unless this has been over-ridden by a developer, its value will be `https://github.com/caronc/apprise`.

Anything you invent outside of that is yours. So lets get back to the `target` and `whence` that was define. Template tokens can be dynamically set by using the colon `:` operator before any URL argument you identify. For example we can set these values on our Apprise URL like so:

- `msteams://credentials/?template=/path/to/template.json&:target=Chris&:whence=this%20afternoon`
- `msteams://credentials/?template=http://host/to/template.json&:target=Chris&:whence=this%20afternoon`

A notification like so:

```bash
# using colons, we can set our target and whence dynamically from the
# command line:
apprise -t "My Title" -b "This is Ignored" \
   "msteams://credentials/?template=http://host/to/template.json&:target=Chris&:whence=this%20afternoon"
```

Would post to MSTeams (with respect to our template above):

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "Apprise",
  "sections": [
    {
      "activityImage": null,
      "activityTitle": "My Title",
      "text": "Hello Chris, how are you this afternoon?"
    }
  ]
}
```

The default Apprise template today (and still has no change even after this commit looks like this):

```json
# Prepare our payload
payload = {
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "{{app_desc}}",
  "themeColor": "{{app_color}}",
  "sections": [
    {
        "activityImage": null,
        "activityTitle": "{{app_title}}",
        "text": "{{app_body}}"
    }
  ]
}
```

#### Other Template Examples

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "{{app_desc}}",
  "themeColor": "{{app_color}}",
  "sections": [
    {
      "activityImage": null,
      "activityTitle": "{{app_title}}",
      "text": "{{app_body}}"
    }
  ],
  "potentialAction": [
    {
      "@type": "ActionCard",
      "name": "Add a comment",
      "inputs": [
        {
          "@type": "TextInput",
          "id": "comment",
          "isMultiline": false,
          "title": "Add a comment here for this task"
        }
      ],
      "actions": [
        {
          "@type": "HttpPOST",
          "name": "Add comment",
          "target": "{{ target }}"
        }
      ]
    }
  ]
}
```

#### Additional Template Notes

- Tokens can have white space around them for readability if you like. Hence `{{ token }}` is no different then `{{token}}`.
- All tokens are escaped properly, so don't worry if your defined token has a double quote in it (`"`); it would be correctly escaped before it is sent upstream.
- Tokens ARE case sensitive, so `{{Token}}` NEEDS to be populated with a `:Token=` value on your URL.
- Tokens that are not matched correctly simply are not swapped and the {{keyword}} will remain as is in the message.
- Apprise always requires you to specify a `--body` (`-b`) at a very minimum which can be optionally referenced as `{{app_body}}` in your template. Even if you choose not to use this token, you must still pass in something (anything) just to satisfy this requirement and make use of the template calls.
