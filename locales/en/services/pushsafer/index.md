---
title: "Pushsafer Notifications"
description: "Send Pushsafer notifications."
sidebar:
  label: "Pushsafer"

source: https://www.pushsafer.com

schemas:
  - psafer: insecure
  - psafers

has_attachments: true

sample_urls:
  - psafers://{private_key}
  - psafers://{private_key}/{device_id}
  - psafers://{private_key}/{device_id1}/{device_id2}/{device_idN}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

There isn't too much effort requires to use PushSafer notifications. The message is basically just passed to your online PushSafer account and then gets relayed to your device(s) you've setup from there.

### Getting Your Private Key

Once you log into their official [website](https://www.pushsafer.com/), you can find the **`{private_key}`** on your [dashboard](https://www.pushsafer.com/dashboard/).

## Syntax

Valid syntax is as follows:

- `psafers://{private_key}`
- `psafers://{private_key}/{device_id}`
- `psafers://{private_key}/{device_id1}/{device_id2}/{device_idN}`
- `psafers://{private_key}?priority={priority}`
- `psafers://{private_key}?priority=emergency&sound=okay`
- `psafers://{private_key}?vibrate=2`

If no device is specified, the `a` reserved device is used by default. the `a` notifies **all** of your devices currently associated with your account.

Secure connections are always made when you use `psafers://` however `psafer://` also works if you wish to use an unencrypted connection.

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| private_key | Yes      | The private key associated with your PushSafer account. This can be found on your [dashboard](https://www.pushsafer.com/dashboard/) after successfully logging in.                                                                                                                                                                                                               |
| device_id   | No       | The device identifier to send your notification to. By default if one isn't specified then all of devices associated with your account are notified.                                                                                                                                                                                                                             |
| priority    | No       | Can be **low**, **moderate**, **normal**, **high**, or **emergency**; the default is to use whatever the default setting is for the device being notified.                                                                                                                                                                                                                       |
| sound       | No       | Can optionally identify one of the optional sound effects identified [here](https://www.pushsafer.com/en/pushapi#api-sound). By default this variable isn't set at all.                                                                                                                                                                                                          |
| vibration   | No       | Android and iOS devices can be set to vibrate upon the reception of a notification. By setting this, you're effectively setting the strength of the vibration. You can set this to **1**, **2** or **3** where 3 is a maximum vibration setting and 1 causes a lighter vibration. By default this variable isn't set at all causing your device default settings to take effect. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a PushSafer notification to all of our configured devices:

```bash
# Assuming our {private_key} is 435jdj3k78435jdj3k78435jdj3k78
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   psafers://435jdj3k78435jdj3k78435jdj3k78
```

Send a PushSafer notification with the Emergency Priority:

```bash
# Emergency priority advises you to also specify the expire and
# retry values.
# Assuming our {user_key} is 435jdj3k78435jdj3k78435jdj3k78
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   psafers://435jdj3k78435jdj3k78435jdj3k78?priority=emergency
```
