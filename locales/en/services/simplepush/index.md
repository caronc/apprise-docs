---
title: "SimplePush Notifications"
description: "Send SimplePush notifications."
sidebar:
  label: "SimplePush"

source: https://simplepush.io/

schemas:
  - simplepush

sample_urls:
  - spush://{apikey}/
  - spush://{salt}:{password}@{apikey}/

limits:
  max_chars: 10000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

SimplePush is a pretty straight forward messaging system you can get for your Android Device through their App [here](https://play.google.com/store/apps/details?id=io.tymm.simplepush).

You can optionally add additional notification encryption in the settings where it provides you with a **`{salt}`** value and allows you to configure/set your own encryption **`{password}`**.

### 🔒 AES-CBC-128 Encryption Weakness

The Apprise team recognizes that the encryption used by this plugin is AES-CBC-128 which has been identified to have weaknesses including being vulnerable to the padding oracle attack ([Reference](https://soatok.blog/2020/07/12/comparison-of-symmetric-encryption-methods/#aes-gcm-vs-aes-cbc)).

If the level of encryption is not satisfactory to you, your options are:

1. Reach out to SimplePush and ask for them to improve their security (to which Apprise will gladly accomodate) ...or
1. Choose not to use Simple Push and select one of the [many other options available](https://github.com/caronc/apprise/wiki#notification-services).

What is important to identify is this weak encryption used by Apprise to access SimplePush is in place for compliance only. This will never have any cascading effect or impact any other secure notification service also supported by Apprise.

Below is a screenshot from [https://simplepush.io/features](https://simplepush.io/features) explaining the defined encryption setting from the upstream source:<br/>![Screenshot from 2024-10-03 21-52-46](./images/624566e31f044891.png)

## Syntax

Valid syntax is as follows:

- `spush://{apikey}/`
- `spush://{salt}:{password}@{apikey}/`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                  |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | Yes      | This is required for your account to work. You will be provided one from your SimplePush account.                                                                                                                                                            |
| event    | No       | Optionally specify an event on the URL.                                                                                                                                                                                                                      |
| password | No       | SimplePush offers a method of further encrypting the message and title during transmission (on top of the secure channel it's already sent on). This is the Encryption password set. You must provide the `salt` value with the `password` in order to work. |
| salt     | No       | The salt is provided to you by SimplePush and is the second part of the additional encryption you can use with this service. You must provide a `password` with the `salt` value in order to work.                                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a SimplePush notification:

```bash
# Assume:
#  - our {apikey} is ABC123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   spush://ABC123
```
