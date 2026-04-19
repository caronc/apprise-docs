---
title: "Notifications Super Toasty"
description: "Envoyer Super Toasty notifications."
sidebar:
  label: "Super Toasty"

source: http://supertoasty.com/
schemas:
  - toasty

has_image: true
sample_urls:
  - toasty://{user_id}@{device_id}
  - toasty://{user_id}@{device_id1}/{device_id2}/{device_idN}

ended: 2016
---

:::note

## Service End Reason

It is hard to find much details on this project and whether or not it still exists in some form or another.

Here is the open source project that extended on this: <https://github.com/JohnPersano/SuperToasts>.

💡The Service was removed from Apprise in [apprise/46](https://github.com/caronc/apprise/issues/46)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

There isn't too much configuration for Super Toasty notifications. The message is basically just passed to your online Super Toasty account and then gets relayed to your device(s) you've setup from there.

## Syntaxe

La syntaxe valide est la suivante :

- `toasty://{user_id}@{device_id}`
- `toasty://{user_id}@{device_id1}/{device_id2}/{device_idN}`

## Detail des parametres

| Variable  | Required | Description                                                    |
| --------- | -------- | -------------------------------------------------------------- |
| user_id   | Yes      | The user identifier associated with your Super Toasty account. |
| device_id | No       | The device identifier to send your notification to.            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Super Toasty notification a configured device:

```bash
# Assuming our {user_id} is nuxref
# Assuming our {device_id} is abcdefghijklmnop-abcdefg
apprise toasty://nuxref@abcdefghijklmnop-abcdefg
```
