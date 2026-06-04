---
title: "Plivo Notifications"
description: "Send Plivo notifications."
sidebar:
  label: "Plivo"

source: https://plivo.com

schemas:
  - plivo

has_sms: true

sample_urls:
  - plivo://{auth_id}@{token}/{from_phone}/
  - plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo}
  - plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}

limits:
  max_chars: 140
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Signup with Plivo [from here](https://plivo.com). From within your account you can genrate both our **Auth ID** and **Auth Token**

## Syntax

Valid syntax is as follows:

- `plivo://{auth_id}@{token}/{from_phone}/`
- `plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo}`
- `plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`

**Note**: If no target phone numbers are specified, then the `{source_phone}` is notified.

**Note**: All Phone Numbers must be in E.164 format (e.g., `+14151234567`)

## Parameter Breakdown

| Variable | Required | Description                                                                                                                  |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| auth_id  | Yes      | The **Auth ID** Associated with your Plivo account.                                                                          |
| token    | Yes      | This is your generated Access Token associated with your Plivo account.                                                      |
| from     | Yes      | The phone number associated with your account you want the text message to originate from.                                   |
| to       | No       | The phone numbers you wish to notify.                                                                                        |
| batch    | No       | Send multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Plivo notification:

```bash
# Assuming our {auth_id} is abcd123
# Assuming our {token} is 9876test
# Assuming out {from_no} is +1555229999
# Assuming we want to notify 1555221237, and +18005551234
# Test out the changes with the following command:
apprise -t "Test Title" -b "Test Message" \
 "plivo://abcd123@9876test/1555229999/+1555221237/+18005551234"

```
