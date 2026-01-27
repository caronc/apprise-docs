---
title: "DAPNET/Hampager Notifications"
description: "Send DAPNET/Hampager notifications."
sidebar:
  label: "DAPNET/Hampager"

source: https://hampager.de/

schemas:
  - dapnet

sample_urls:
  - dapnet://{userid}:{password}@{callsign}
  - dapnet://{userid}:{password}@{callsign1}/{callsign2}/{callsignN}

limits:
  max_chars: 80
---

<!-- SERVICE:DETAILS -->

## Account Setup

![apprise](./images/147219640-6ce23b59-bc12-4a30-b5f2-f4d4d2d3fd3c.jpg)

Make sure you register your Amateur Radio Call Sign and create an account with [Hampager](https://hampager.de).

## Syntax

Valid syntax is as follows:

- `dapnet://{userid}:{password}@{callsign}`
- `dapnet://{userid}:{password}@{callsign1}/{callsign2}/{callsignN}/`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callsign | Yes      | One or more Amateur Radio Call sign's is required to send a notification.                                                                                                                                                                                                                              |
| userid   | Yes      | Your [Hampager](https://hampager.de) account login                                                                                                                                                                                                                                                     |
| password | Yes      | Your [Hampager](https://hampager.de) account password                                                                                                                                                                                                                                                  |
| priority | No       | The message priority; if this isn't specified then `normal` is used by default. The possible options are `emergency` and `normal`.                                                                                                                                                                     |
| txgroups | No       | The transmitter group(s) to associate with your message. Use a comma (`,`) to identify more then one. By default if this value isn't specified then the group `dl-all` is used.                                                                                                                        |
| batch    | No       | [Hampager](https://hampager.de) allows for a batch mode. If you identify more then one call sign, you can send all of them in a single shot instead of the normal Apprise approach (which sends them one by one). Enabling batch mode has both pros and cons. By default batch mode is disabled. |

## Constraints

- The DAPNET API permits you to specify more than one target call sign. Any unknown or invalid call sign in that list will [terminate the whole message broadcast for all call signs](https://hampager.de/dokuwiki/doku.php?id=dapnetapisendcall)
- If the message exceeds 80 characters, the plugin will automatically truncate the content to DAPNET's max message length
- If you specify an Apprise 'title' parameter, Apprise will automatically add that title to the message body along with a trailing `\r\n` control sequence which may result in undesired experiences. It is recommended to refrain from using Apprise's 'title' parameter.
- For messages, it is recommended to stick to the English alphabet as DAPNET cannot process extended character sets like the cyrillic alphabet. The DAPNET API will still process messages with this content but the user's pager may not display them in a proper format.
- In order to gain access to the DAPNET API, you need to be a licensed ham radio operator.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a DAPNET Notification :

```bash
# Assuming our {user} is df1abc
# Assuming our {password} is appriseIsAwesome
# Assuming our {callsign} - df1def
#
apprise -vv -b "Test Message Body" \
   "dapnet://df1abc:appriseIsAwesome@df1def"

# Assuming our {user} is df1abc
# Assuming our {password} is appriseIsAwesome
# Assuming our {callsign}s are - df1def,df1ghi and df1def-12
# This will result in two target call signs as the plugin is going
# to strip the '-12' ssid and detect the dupe call sign
#
apprise -vv -b "Test Message Body" \
   dapnet://df1abc:appriseIsAwesome@df1def/df1ghi/df1def-12

# Assuming our {user} is df1abc
# Assuming our {password} is test
# Assuming our {callsign} - df1def
# Assuming our {priority} - emergency
# Assuming our {txgroups} - 'dl-all', 'all'
apprise -vv -b "Test Message Body" \
   "dapnet://df1abc:test@df1def?txgroups=dl-all,all&priority=emergency"
```
