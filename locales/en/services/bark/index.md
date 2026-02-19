---
title: "Bark Notifications"
description: "Send Bark notifications."
sidebar:
  label: "Bark"

source: https://github.com/Finb/Bark

schemas:
  - bark: insecure
  - barks

sample_urls:
  - barks://{host}/{device_key}
  - barks://{host}:{port}/{device_key}

has_selfhosted: true
---

<!-- SERVICE:DETAILS -->

## Account Setup

Bark is an iOS App which allows you to push custom notifications to your iPhone. Download the server for a self-hosted solution.

## Syntax

Valid syntax is as follows:

- `bark://{host}/{device_key}`
- `bark://{host}:{port}/{device_key}`

The secure versions:

- `barks://{host}/{device_key}`
- `barks://{host}:{port}/{device_key}`

You can also notify more than one device at a time:

- `bark://{host}:{port}/{device_key1}/{device_key2}/{device_keyN}/`

## Message Format Support

Bark supports receiving content as either plain text or Markdown.

Apprise will automatically send one of the following payload fields,
depending on the message format in use:

- **Plain text** (default): content is sent using the `body` field.
- **Markdown**: content is sent using the `markdown` field.

To explicitly control this behaviour, set the Apprise message format.
For example:

- `?format=text` forces plain text handling.
- `?format=markdown` enables Markdown handling.

Note that the `format` handling is done by Apprise and affects how the
notification is assembled and delivered to Bark.

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                              |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device_key | Yes      | The device key you wish to notify                                                                                                                        |
| sound      | No       | Optionally set a sound file to be played with notification sent. Supported sounds are identified [here](https://github.com/Finb/Bark/tree/master/Sounds) |
| click      | No       | Provide a hyperlink that should be associated with the notification                                                                                      |
| level      | No       | Specify the message level. Can be either **active**, **timeSensitive**, or **passive**.                                                                  |
| volume     | No       | Specify a volume between 0 and 10 (inclusive).                                                                                                           |
| badge      | No       | Provide a numerical value of 0 (zero) or greater to associate a badge with the bark icon on the iOS device.                                              |
| category   | No       | Associate a category with your notification                                                                                                              |
| group      | No       | Associate a group with your notification                                                                                                                 |
| icon       | No       | Set a custom icon URL for the notification. If not specified, Apprise may use its default notify image (unless disabled).                                |
| image      | No       | Set to `no` if you do not want the Apprise alert level being placed as the icon associated with the message.                                             |
| call       | No       | Boolean-like input. Accepts `yes/no`, `true/false`, `1/0`, `+/-`. When enabled, payload includes `1`.                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Bark notification to all devices associated with a project:

```bash
# Assume:
#  - our {hostname} is localhost
#  - our {port} is 8080
#  - our {device_key} is j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P
```

Send a Markdown formatted Bark notification:

```bash
# Markdown content is sent using Bark's `markdown` field
apprise -vv -t "Build Status" -b "# Success\n\nDeployment completed." \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=markdown
```

Force plain text behaviour (even if your Apprise configuration defaults
to another format):

```bash
apprise -vv -t "Plain Text" -b "**This will not be bold**" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=text
```
