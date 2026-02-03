---
title: "Mattermost Notifications"
description: "Send Mattermost notifications."
sidebar:
  label: "Mattermost"

source: https://mattermost.com/

schemas:
  - mmost: insecure
  - mmosts

has_image: true

sample_urls:
  - mmosts://{hostname}/{token}
  - mmosts://{botname}@{hostname}/{token}
  - mmost://{botname}@{hostname}:{port}/{token}
  - mmosts://{botname}@{hostname}:{port}/{path}/{token}

limits:
  max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Account Setup

To use this plugin, you need to first set yourself up with <http://mattermost.com>. Download their software and set it up.

From here you'll need an \*_Incoming Webhook_. This can be done as follows:

1. Click on the **Integrations** option under the channel dropdown and select **Incoming Webhook**:<br/>
   <img alt="Incoming Webhook" src="./images/107084396-ff55dc00-67c4-11eb-899c-a65b2f639158.png" height="300">
2. From here you can select **Add Incoming Webhook**:<br/>
   <img alt="Add Incoming Webhook" src="./images/107083851-3d9ecb80-67c4-11eb-8bf7-820a3554eadb.png" height="300">
3. Finally you'll be able to customize how you want the webhook to act/behave and you can press **Save** at the bottom when you're complete.<br/>
   <img alt="Generate An Apprise URL from itk" src="./images/107083865-442d4300-67c4-11eb-8228-7d7afb5974e3.png" height="300">

An example URL you may be provided could look like this:

```bash
# The URL provided by Mattermost:
http://localhost:8065/hooks/yokkutpah3r3urc5h6i969yima
         ^        ^                ^
         |        |                |
      hostname   port           webhook token

# From here you can do the following to generate your Apprise URL:
# - http:// becomes mmost://
# - drop /hooks reference
# Which gets you:
mmost://localhost:8065/yokkutpah3r3urc5h6i969yima
```

## Syntax

Valid syntax is as follows:

- `mmost://{hostname}/{token}`
- `mmost://{hostname}:{port}/{token}`
- `mmost://{botname}@{hostname}/{token}`
- `mmost://{botname}@{hostname}:{port}/{token}`
- `mmost://{hostname}/{path}/{token}`
- `mmost://{hostname}:{port}/{path}/{token}`
- `mmost://{botname}@{hostname}/{path}/{token}`
- `mmost://{botname}@{hostname}:{port}/{path}/{token}`

Secure connections (via https) should be referenced using **mmosts://** where as insecure connections (via http) should be referenced via **mmost://**; they follow the same structure:

- `mmosts://{hostname}/{token}`
- `mmosts://{hostname}:{port}/{token}`
- `mmosts://{botname}@{hostname}/{token}`
- `mmosts://{botname}@{hostname}:{port}/{token}`
- `mmosts://{hostname}/{path}/{token}`
- `mmosts://{hostname}:{port}/{path}/{token}`
- `mmosts://{botname}@{hostname}/{path}/{token}`
- `mmosts://{botname}@{hostname}:{port}/{path}/{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                           |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The server Mattermost is listening on.                                                                                                                                                                                                                                                                |
| token    | Yes      | The Webhook Token you would have received after setting up the Mattermost **Incoming Webhook**                                                                                                                                                                                                        |
| port     | No       | The server port Mattermost is listening on. By default the port is **8065**.                                                                                                                                                                                                                          |
| path     | No       | You can identify a sub-path if you wish. The last element of the path must be the **token**.                                                                                                                                                                                                          |
| botname  | No       | An optional botname you can associate with your post. Requires the Mattermost admin setting [Enable integrations to override usernames](https://docs.mattermost.com/administration-guide/configure/integrations-configuration-settings.html#enable-integrations-to-override-usernames).               |
| image    | No       | Identify whether or not you want the Apprise image (showing status color) to display with every message or not. By default this is set to **yes**. Ignored when `icon_url` is set.                                                                                                                    |
| icon_url | No       | Override the avatar icon with a custom URL. Requires the Mattermost admin setting [Enable integrations to override profile picture icons](https://docs.mattermost.com/administration-guide/configure/integrations-configuration-settings.html#enable-integrations-to-override-profile-picture-icons). |
| channels | No       | You can optionally specify as many channels as you want in a comma separated value (as a keyword argument). See example below for how to use this. You must also not restrict your **Incoming Webhook** to only focus on a specific channel or providing alternatives here will not work.             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a secure Mattermost notification to our server

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mmosts://mattermost.server.local/3ccdd113474722377935511fc85d3dd4
```

Send a secure Mattermost notification to our server running on TCP Port 8065

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our secure {port} our server is running on is 8065
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mmosts://mattermost.server.local:8065/3ccdd113474722377935511fc85d3dd4
```

Send an insecure Mattermost notification to server in addition to having to address specific channels:

```bash
# Assuming our {hostname} is mattermost.server.local
# Assuming our {token} is 3ccdd113474722377935511fc85d3dd4
# Assuming our {channels} is #support and #general

# We don't need to provide the '#' (hashtag) prefix:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mmost://mattermost.server.local/3ccdd113474722377935511fc85d3dd4?channels=support,general
```
