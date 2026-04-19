---
title: "Notifications SpugPush"
description: "Envoyer SpugPush notifications."
sidebar:
  label: "SpugPush"

source: https://push.spug.dev/

schemas:
  - spugpush

sample_urls:
  - https://push.spug.dev/send/{token}
  - spugpush://{token}

limits:
  max_chars: 10000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

SpugPush is a simple webhook service provided by the Spug monitoring platform. It allows applications to send alert messages using a secure access token.

1. Visit the [SpugPush service](https://push.spug.dev/).
1. Sign in and generate your **token**.
1. Copy the full webhook URL, which will look like:

```text
https://push.spug.dev/send/abc123def456ghi789jkl012mno345pq
```

The token portion at the end is the only value Apprise requires.

### Apprise Support

Apprise supports both the full native webhook and a simplified URL form.

## Syntaxe

La syntaxe valide est la suivante :

- `https://push.spug.dev/send/{token}`
- `spugpush://{token}`

## Detail des parametres

| Variable | Required | Description                                                          |
| -------- | -------- | -------------------------------------------------------------------- |
| token    | Yes      | The 32–64 character SpugPush token used to authenticate the request. |

You may also use the query format: `spugpush://?token=YOUR_TOKEN`.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Using the simplified Apprise URL:

```bash
apprise -vv -t "SpugPush Title" -b "Notification content" \
   spugpush://abc123def456ghi789jkl012mno345pq
```

Using the token as a query parameter:

```bash
apprise -vv -t "SpugPush Title" -b "Notification content" \
   spugpush://?token=abc123def456ghi789jkl012mno345pq
```

Using the full native webhook URL:

```bash
apprise -vv -t "SpugPush Title" -b "Notification content" \
   https://push.spug.dev/send/abc123def456ghi789jkl012mno345pq
```
