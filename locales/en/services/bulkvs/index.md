---
title: "BulkVS Notifications"
description: "Send BulkVS notifications."
sidebar:
  label: "BulkVS"

source: https://www.bulkvs.com

schemas:
  - bulkvs

has_sms: true

sample_urls:
  - bulkvs://{user}:{password}@{fromPhoneNo}
  - bulkvs://{user}:{password}@{fromPhoneNo}/{target}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Sign up for BulkVS [from here](https://www.bulkvs.com/). You will be provided to create a user and password to associate with your account. This is all you need to use this through Apprise.

## Syntax

Valid syntax is as follows:

- `bulkvs://{user}:{password}@{fromPhoneNo}`
- `bulkvs://{user}:{password}@{fromPhoneNo}/{target}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                     |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Yes      | The username associated with your BulkVS Account.                                                                                                               |
| password | Yes      | The password associated with your BulkVS Account.                                                                                                               |
| to       | **\*No** | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`. |
| from     | **\*No** | Specify the phone number you registered with BulkVS you wish the message to be identified as being sent from.                                                   |
| batch    | No       | Send multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`.                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a BulkVS Message:

```bash
# Assuming our {user} is joe
# Assuming our {password} is hard-to-guess
# Assuming the {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   bulkvs://joe:hard-to-guess@+134-555-1223
```
