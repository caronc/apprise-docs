---
title: "Notifications Parse Platform"
description: "Envoyer Parse Platform notifications."
sidebar:
  label: "Parse Platform"

source: https://parseplatform.org/

schemas:
  - parsep: insecure
  - parseps

has_selfhosted: true

sample_urls:
  - parsep://{app_id}:{master_key}@{hostname}
  - parseps://{app_id}:{master_key}@{hostname}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

## Syntaxe

Channels are optional; if no channel is specified then you are just personally notified.

La syntaxe valide est la suivante :

- `parsep://{app_id}:{master_key}@{hostname}`
- `parseps://{app_id}:{master_key}@{hostname}`

## Detail des parametres

| Variable   | Required | Description                                         |
| ---------- | -------- | --------------------------------------------------- |
| app_id     | Yes      | The Application ID                                  |
| master_key | Yes      | This is the Master Key associated with your account |
| hostname   | Yes      | The Hostname of your Parse Platform Server          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Parse Platform notification

```bash
# Assume:
#  - our {app_id} is abc123
#  - our {master_key} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
#  - our {hostname} is parseplatform.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   parsep://app_id:master_key@parseplatform.local
```
