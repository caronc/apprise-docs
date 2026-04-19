---
title: "Notifications Spike.sh"
description: "Envoyer Spike.sh notifications."
sidebar:
  label: "Spike.sh"

source: https://www.spike.sh

schemas:
  - spike

sample_urls:
  - https://api.spike.sh/v1/alerts/{integration_key}
  - spike://{integration_key}

limits:
  max_chars: 20000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Once you've created your alert source in Spike.sh, it will provide you with a webhook URL that looks like this:

```text
https://api.spike.sh/v1/alerts/1234567890abcdef1234567890abcdef
```

This long key at the end is your integration key, which can be used directly in Apprise.

---

### 🛠️ Setup Instructions

1. Log in to your [Spike.sh dashboard](https://www.spike.sh/).
2. Go to **Alert Sources** and create a new source (e.g., for monitoring tools).
3. Copy the provided **Webhook URL**\*integration key\*\*.

Once you've created your alert source in Spike.sh, it will provide you with a webhook URL that looks like this:

```text
https://api.spike.sh/v1/alerts/1234567890abcdef1234567890abcdef
                              |     integration_key           |
```

This long key at the end is your integration key, which can be used directly in Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `https://api.spike.sh/v1/alerts/{integration_key}`
- `spike://{integration_key}`

## Detail des parametres

| Variable        | Required | Description                                                               |
| --------------- | -------- | ------------------------------------------------------------------------- |
| integration_key | Yes      | A 32-character token that uniquely identifies your Spike.sh alert source. |
| token           | No       | An alias to `integration_key`                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Using the simplified Apprise URL:

```bash
# Assuming our token is 1234567890abcdef1234567890abcdef

apprise -vv -t "Spike Alert" -b "Incident occurred" \
   spike://1234567890abcdef1234567890abcdef
```

Using the token as a URL parameter:

```bash
apprise -vv -t "Spike Alert" -b "Incident occurred" \
   spike://?token=1234567890abcdef1234567890abcdef
```

Using the full native webhook URL:

```bash
apprise -vv -t "Spike Alert" -b "Incident occurred" \
   https://api.spike.sh/v1/alerts/1234567890abcdef1234567890abcdef
```
