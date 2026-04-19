---
title: "Notifications Spontit"
description: "Envoyer Spontit notifications."
sidebar:
  label: "Spontit"

source: https://spontit.com
schemas:
  - spontit

sample_urls:
  - spontit://{user}@{apikey}
  - spontit://{user}@{apikey}/{channel_id}
  - spontit://{user}@{apikey}/{channel_id1}/{channel_id2}/{channel_idN}/

limits:
  - max_chars: 5000

ended: 2022
---

:::note

## Service End Reason

Unknown

💡The Service was removed from Apprise in [apprise/1226](https://github.com/caronc/apprise/issues/1226)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Visit <https://spontit.com> to create your account.
2. To acquire your `{user}`: Visit your profile at <https://spontit.com/profile> and take note of your User ID here. It will look something like: `user12345678901`
3. To acquire your `{apikey}`: Generate an API key at <https://spontit.com/secret_keys> (if you haven't already done so).

## Syntaxe

Channels are optional; if no channel is specified then you are just personally notified.

La syntaxe valide est la suivante :

- `spontit://{user}@{apikey}`
- `spontit://{user}@{apikey}/{channel_id}`
- `spontit://{user}@{apikey}/{channel_id1}/{channel_id2}/{channel_idN}/`

## Detail des parametres

| Variable   | Required | Description                                                                                                                                                      |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user       | Yes      | This is the User ID associated with your Spontit account. It can be found on your [Spontit Profile page](https://spontit.com/profile).                           |
| apikey     | Yes      | This is the API key you generated for your Spontit account. It can be found (and generated if it doesn't already exist) [here](https://spontit.com/secret_keys). |
| channel_id | No       | A Channel you wish to notify _that you created_.                                                                                                                 |
| subtitle   | No       | The subtitle of your push. Only appears on iOS devices.                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Spontit notification to all devices associated with a project:

```bash
# Assume:
#  - our {user} is user28635710302
#  - our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   spontit://user28635710302@a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty

# Override the subtitle (Mac users only) by doing the following:
# You must use URL encoded strings, below the spaces are swapped with %20
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   spontit://myuser@myapi?subtitle=A%20Different%20Subtitle
```
