---
title: "Notifications 46elks"
description: "Envoyer 46elks notifications."
sidebar:
  label: "46elks"

source: https://46elks.com/

schemas:
  - 46elks
  - elks

sample_urls:
  - 46elks://{user}:{password}@/{from}
  - 46elks://{user}:{password}@/{from}/{to}
  - 46elks://{user}:{password}@/{from}/{to1}/{to2}/{toN}

has_sms: true

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

46elks is a straightforward SMS provider. You authenticate with your 46elks API user and password, then send `to`, `message`, and optionally `from`. The plugin loops per target recipient and posts form-encoded payloads to the fixed API endpoint.

1. Log in at <https://46elks.com> and obtain your **API username** and **password**.
2. Optionally choose a **From** sender ID, either an E.164 number or an approved alphanumeric sender.
3. Use the `46elks://` URL form in Apprise to send messages.

## Syntaxe

La syntaxe valide est la suivante (les alias `46elks://` et `elks://` sont acceptes) :

- `46elks://{user}:{password}@/{from}`
- `46elks://{user}:{password}@/{from}/{to}`
- `46elks://{user}:{password}@/{from}/{to1}/{to2}/{toN}`

## Detail des parametres

| Variable | Required | Description                                        |
| -------- | -------- | -------------------------------------------------- |
| user     | Yes      | Your 46elks API username                           |
| password | Yes      | Your 46elks API password                           |
| to       | Yes      | Recipient phone number(s), E.164 recommended       |
| from     | No       | Sender ID or E.164 number, if configured in 46elks |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une simple message:

```bash
# Assuming our {user} is user123
# Assuming our {password} is pass
# Assuming our {Source} is +15551234567
# Because no target is specified, we will notify ourseles
apprise -vv -t "Test" -b "Hello from Apprise" \
  46elks://user123:pass@/+15551234567
```

Plusieurs destinataires et un identifiant expediteur :

```bash
# Assuming our {user} is user
# Assuming our {password} is pass456
# Assuming our {Source} is Acme
# Assuming our target {PhoneNo} we wish to notify is
#     +15551234567 and +15551231234
apprise -vv -b "Status: OK" \
  "46elks://user:pass456@/+15551234567/+15551231234?from=Acme"
```
