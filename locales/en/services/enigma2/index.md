---
title: "Enimga2 Notifications"
description: "Send Enimga2 notifications."
sidebar:
  label: "Enimga2"

schemas:
  - enigma2: insecure
  - enigma2s

has_selfhosted: true

sample_urls:
  - enigma2://{host}
  - enigma2s://{host}/{fullpath}
  - enigma2://{user}@{host}
  - enigma2s://{user}@{host}:{port}
  - enigma2://{user}:{password}@{host}

limits:
  max_chars: 1000
---

<!-- SERVICE:DETAILS -->

## Account Setup

A [_E2OpenPlugin_](https://github.com/E2OpenPlugins) called [OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) can allow you to communicate with your Enigma2 devices (such as [Dreambox](http://www.dream-multimedia-tv.de/), [Vu+](http://www.vuplus.com), etc.) using a API.

Once [OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) is installed, Apprise can utilize its API to send notifications to your Enigma2 device.

Installation instructions on how to install OpenWebif onto your Engima2 device can be found on its [GitHub Page](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif).

## Syntax

Valid syntax is as follows:

- `enigma2://{host}`
- `enigma2://{host}/{fullpath}`
- `enigma2://{host}:{port}`
- `enigma2://{host}:{port}/{fullpath}`
- `enigma2://{user}@{host}`
- `enigma2://{user}@{host}/{fullpath}`
- `enigma2://{user}@{host}:{port}`
- `enigma2://{user}@{host}:{port}/{fullpath}`
- `enigma2://{user}:{password}@{host}`
- `enigma2://{user}:{password}@{host}/{fullpath}`
- `enigma2://{user}:{password}@{host}:{port}`
- `enigma2://{user}:{password}@{host}:{port}/{fullpath}`
- `enigma2s://{host}`
- `enigma2s://{host}/{fullpath}`
- `enigma2s://{host}:{port}`
- `enigma2s://{host}:{port}/{fullpath}`
- `enigma2s://{user}@{host}`
- `enigma2s://{user}@{host}/{fullpath}`
- `enigma2s://{user}@{host}:{port}`
- `enigma2s://{user}@{host}:{port}/{fullpath}`
- `enigma2s://{user}:{password}@{host}`
- `enigma2s://{user}:{password}@{host}/{fullpath}`
- `enigma2s://{user}:{password}@{host}:{port}`
- `enigma2s://{user}:{password}@{host}:{port}/{fullpath}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Enigma2 devices IP/hostname                                                                                                           |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **enigma2s://** and **443** for all **enigma2://** references. |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                         |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                         |
| timeout  | No       | The number of seconds delivered notification stay on the screen for. The default value is 13.                                             |
| fullpath | No       | Those hosting this internally may wish to specify the (prefix) path their service is listening on.                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an notification to our Enigma2 Device:

```bash
# Assuming our {hostname} is dreambox
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   enigma2://dreambox

# Hosting your service at /enigma2, the following can be handle this:
# Assuming our {hostname} is dreambox
# Assuming our {fullpath} is /enigma2

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "enigma2://dreambox/enigma2"

```

### Header Manipulation

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a hyphen (**-**) in front of any parameter you specify on your URL string.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is vu-device
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "enigma2://localhost/?-X-Token=abcdefg"

# Multiple headers just require more entries defined with a hyphen in front:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "enigma2://localhost/path/?-X-Token=abcdefg&-X-Apprise=is%20great"
```
