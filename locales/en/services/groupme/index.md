---
title: "GroupMe Notifications"
description: "Send notifications to GroupMe groups via the Bot API, with optional image attachment support."
sidebar:
  label: "GroupMe"

source: https://groupme.com/

schemas:
  - groupme

has_attachments: true

sample_urls:
  - groupme://{BotID}
  - groupme://{BotID}/{AccessToken}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

GroupMe notifications are delivered through a **Bot** that you create and associate with a group. Each bot is tied to a single group; create one bot per group you want to receive notifications.

1. Sign in at [https://dev.groupme.com/bots](https://dev.groupme.com/bots) using your GroupMe account.
2. Click **Create Bot**.
3. Select the group you want the bot to post into.
4. Give the bot a name (for example, `Apprise`), then click **Submit**.
5. Copy the **Bot ID** shown in the bot list -- it is a hexadecimal string such as `68ca900a7d17f9b9891a73af2a`.

That **Bot ID** is all you need for text-only notifications.

### Attachment Support (Optional)

To send image attachments the plugin must first upload each image to GroupMe's image service, which requires your personal **Access Token** in addition to the Bot ID.

1. Visit [https://dev.groupme.com/](https://dev.groupme.com/) and log in.
2. Click on **Access Token** in the top-right corner of the page.
3. Copy the displayed token.

Supply it to Apprise as the second path segment of the URL. Without a token, text messages are still sent normally; only the image upload step is skipped.

## Syntax

Valid syntax is as follows:

- `groupme://{BotID}`
- `groupme://{BotID}/{AccessToken}`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                            |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BotID       | \*Yes    | The Bot ID copied from [https://dev.groupme.com/bots](https://dev.groupme.com/bots). A hexadecimal string such as `68ca900a7d17f9b9891a73af2a`.        |
| AccessToken | No       | Your personal GroupMe access token, required only when sending image attachments. Obtain it from [https://dev.groupme.com/](https://dev.groupme.com/). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a text notification to a GroupMe group:

```bash
apprise -vv -t "Alert" -b "Something happened." \
   "groupme://68ca900a7d17f9b9891a73af2a"
```

Send a notification with an image attachment (requires access token):

```bash
apprise -vv -t "Alert" -b "See the attached image." \
   --attach /path/to/image.png \
   "groupme://68ca900a7d17f9b9891a73af2a/abc123def456gh789ijklmn0op"
```

Example YAML configuration (text only):

```yaml
urls:
  - groupme://68ca900a7d17f9b9891a73af2a
```

Example YAML configuration (with attachments):

```yaml
urls:
  - groupme://68ca900a7d17f9b9891a73af2a/abc123def456gh789ijklmn0op
```
