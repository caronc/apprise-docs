---
title: "Notifications Join"
description: "Envoyer Join notifications."
sidebar:
  label: "Join"

source: https://joaoapps.com/join/

schemas:
  - join

sample_urls:
  - join://{apikey}/
  - join://{apikey}/{device_id}
  - join://{apikey}/{group_id}
  - join://{apikey}/{device_name}

limits:
  max_chars: 1000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use this plugin:

1. Ensure your browser allows popups and visit [joinjoaomgcd.appspot.com](https://joinjoaomgcd.appspot.com/).
2. To register you just need to allow the page to link with your Google Profile. The good news is it doesn't ask for anything too personal.
3. Download the app for your phone from the [Android Store here](https://play.google.com/store/apps/details?id=com.joaomgcd.join).
4. Using your phone, when you first open the application, it will ask for a series of permissions and ask you a couple questions.
5. If you just recently registered your device (in the previous step), you should now be able to refresh your browser at [joinjoaomgcd.appspot.com](https://joinjoaomgcd.appspot.com/). Your device should list itself. From here you can retrieve the API you need to worth with Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `join://{apikey}/`
- `join://{apikey}/{device_id}`
- `join://{apikey}/{device_id1}/{device_id2}/{device_idN}`

:::note
If no device is specified, then by default **group.all** is used.
:::

Groups can be referenced like this (the _group._ part is optional):

- `join://{apikey}/group.{group_id}`
- `join://{apikey}/group.{group_id1}/group.{group_id2}/group.{group_idN}`
- `join://{apikey}/{group_id}`
- `join://{apikey}/{group_id1}/{group_id2}/{group_idN}`

If what you specify isn't a `group` or `device_id` then it is interpreted as a `device_name` as a fallback:

- `join://{apikey}/{device_name}`
- `join://{apikey}/{device_name1}/{device_name1}/{device_nameN}`

You can freely mix and match these combinations as well:

- `join://{apikey}/{device_id}/{group_id}/{device_name}`

## Detail des parametres

| Variable    | Required | Description                                                                        |
| ----------- | -------- | ---------------------------------------------------------------------------------- |
| apikey      | Yes      | The api key associated with your Join account.                                     |
| device_id   | No       | The device identifier to send your notification to (a 32 bit alpha-numeri string). |
| device_name | No       | The device name (PC, Nexus, etc)                                                   |
| group_id    | No       | The group identifier to send your notification to.                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Join notification to all of our configured devices:

```bash
# Assuming our {apikey} is abcdefghijklmnop-abcdefg
# Assume we're sending to the group: all
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   join://abcdefghijklmnop-abcdefg/group.all
```
