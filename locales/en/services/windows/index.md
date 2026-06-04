---
title: "Microsoft Windows Notifications"
description: "Send Microsoft Windows notifications."
sidebar:
  label: "Microsoft Windows Notifications"

group: desktop

schemas:
  - windows: insecure

has_image: true

sample_urls:
  - windows://

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Display notifications right inside of your windows application. This only works if you're sending the notification to the same windows system you're currently accessing. Hence this notification can not be sent from one PC to another.

You may have to install a dependency on your windows system to get this to work. Simply run:

```bash
# windows:// minimum requirements
pip install pywin32
```

## Syntax

There are currently no options you can specify for this kind of notification, so it's really easy to reference.

Valid syntax is as follows:

- `windows://`

## Parameter Breakdown

| Variable | Required | Description                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------- |
| duration | No       | Optionally set the duration of the popup message in seconds. By default this value is set to `12` |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Assuming we're on a Windows computer, we can send a Windows Notification to ourselves:

```bash
# Send ourselves a windows notification
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "windows://"
```

Here is an example where we shorten the duration the popup stays active for:

```bash
# Send ourselves a windows notification
apprise -vv -b "A 5 second popup" "windows://?duration=5"
```
