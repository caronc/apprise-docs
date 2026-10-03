---
title: "BulkSMS Notifications"
description: "Send BulkSMS notifications."
sidebar:
  label: "BulkSMS"

source: https://bulksms.com

schemas:
  - bulksms

has_sms: true

sample_urls:
  - bulksms://{token_id}:{token_secret}@{phoneNo}
  - bulksms://{token_id}:{token_secret}@{phoneNo1}/{phoneNo2}/{phoneNoN}
  - bulksms://{token_id}:{token_secret}@{group}
  - bulksms://{token_id}:{token_secret}@{group1}/@{group2}/@{groupN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Sign up for a BulkSMS account [from here](https://bulksms.com), then create an API Token:

1. Log in and go to **Settings** > **Developers** > **API Tokens**.
2. Click **Create Token** and give it a name like `Apprise`.
3. Copy the **Token ID** and **Token Secret** that are shown to you.

The Token ID and Token Secret are all you need to use BulkSMS through Apprise.

:::note
BulkSMS no longer accepts a username and password for new accounts. If your older account still uses them, enter your username as the `token_id` and your password as the `token_secret`.
:::

## Syntax

Valid syntax is as follows:

- `bulksms://{token_id}:{token_secret}@{target}`

A `target` can be either a phone number, or if prefixed with `@` it becomes a group.

- `bulksms://{token_id}:{token_secret}@{phoneNo}`
- `bulksms://{token_id}:{token_secret}@{phoneNo1}/{phoneNo2}/{phoneNoN}`
- `bulksms://{token_id}:{token_secret}@{group}`
- `bulksms://{token_id}:{token_secret}@{group1}/@{group2}/@{groupN}`

You can mix and match as well

- `bulksms://{token_id}:{token_secret}@{to_phone1}/@{group1}`

The Token Secret can contain characters such as `#`, `!` or `*`. Characters that have a special meaning in a URL must be [URL encoded](https://www.w3schools.com/tags/ref_urlencode.asp). Most importantly, `#` must be written as `%23`.

For ambiguity, if you do not provide a valid phone number, and the information parsed does not exclusively have a`@` in front of it, then it is first interpreted as phone number. However if alphanumeric characters are detected in it, then it is switched to a group.

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                                     |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token_id     | Yes      | The Token ID of the API Token you created. This can also be passed as `?user=`.                                                                                 |
| token_secret | Yes      | The Token Secret of the API Token you created. This can also be passed as `?password=`.                                                                         |
| to           | **\*No** | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`. |
| from         | **\*No** | Specify the phone number you registered with BulkSMS you wish the message to be identified as being sent from.                                                  |
| batch        | No       | Send multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`.                                    |
| route        | No       | Can be set to either `ECONOMY`, `STANDARD`, or `PREMIUM` (not case sensitive). If not otherwise provided, this assumes to be `STANDARD` by default.             |
| unicode      | No       | Optionally tell Apprise to not mark your text message as having unicode characters in it. The message mode changes to `TEXT` if this is set to `No`             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a BulkSMS Message:

```bash
# Assuming our {token_id} is BBDE1B476E03498AA768F66A286AABDC-01-B
# Assuming our {token_secret} is 9jSbVDK20!MXdfRGiIIFu#ffUE8*S
#   - the # is written as %23 so it survives in the URL
# Assuming the {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   'bulksms://BBDE1B476E03498AA768F66A286AABDC-01-B:9jSbVDK20!MXdfRGiIIFu%23ffUE8*S@+134-555-1223'
```
