---
title: "Notifications Boxcar"
description: "Envoyer Boxcar notifications."
sidebar:
  label: "Boxcar"

source: https://boxcar.io/
schemas:
  - boxcar

has_image: true
sample_urls:
  - boxcar://{access_key}/{secret_key}/{device_id}
  - boxcar://{access_key}/{secret_key}/{device_id01}/{device_id02}/{device_idNN}

limits:
  - max_chars: 10000

ended: 2019-02
---

:::note

## Service End Reason

Unknown

💡The Service was removed from Apprise in [apprise/1219](https://github.com/caronc/apprise/issues/1219)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

Boxcar just has a development platform these days. You can't get notifications through your AppleOS or Android devices anymore. You can still however sign up for an account [on their website](https://boxcar.io/). From there you can create projects through them.

Each _project_ you create with them will grant you access to your own unique **Access Key** and a **Secret Key**. You can post notifications knowing these 2 values.

## Syntaxe

La syntaxe valide est la suivante :

- `boxcar://{access_key}/{secret_key}`

Tags support:

- `boxcar://{access_key}/{secret_key}/@{tag_id}`
- `boxcar://{access_key}/{secret_key}/@{tag_id01}/@{tag_id02}/@{tag_idNN}`

Device Tokens:

- `boxcar://{access_key}/{secret_key}/{device_id}`
- `boxcar://{access_key}/{secret_key}/{device_id01}/{device_id02}/{device_idNN}`

Vous pouvez egalement combiner les formes ci-dessus et effectuer les mises a jour depuis une seule URL :

- `boxcar://{access_key}/{secret_key}/@{tag_id}**/{device_id}`

## Detail des parametres

| Variable   | Required | Description                                                                                                                   |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| access_key | Yes      | This is required for your account to work. You will be provided one from boxcar's website upon creating an account with them. |
| secure_key | Yes      | This is required for your account to work. You will be provided one from boxcar's website upon creating an account with them. |
| device_id  | No       | Associated devices with your Boxcar setup. All _device_ids_ are 64 characters in length.                                      |
| tag_id     | No       | Tags must be prefixed with a @ symbol or they will be interpreted as a _device_id_ and/or _alias_.                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Boxcar notification to all devices associated with a project:

```bash
# Assume:
#  - our {access_key} is pJz1KEP5zGo9KwDnIb-7_Kab
#  - our {secret_key} is j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   boxcar://pJz1KEP5zGo9KwDnIb-7_Kab/j300012fl9y0b5AW9g9Nsejb8P
```
