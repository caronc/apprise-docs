---
title: "Notifications Lark (Feishu)"
description: "Envoyer Lark (Feishu) notifications."
sidebar:
  label: "Lark (Feishu)"

source: https://open.larksuite.com/

schemas:
  - lark

sample_urls:
  - https://open.larksuite.com/open-apis/bot/v2/hook/{token}
  - lark://{token}

limits:
  max_chars: 20000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Lark (also known as Feishu in China) allows you to create **custom bots** that can send notifications to groups and chats using **incoming webhooks**.

1. Visit the [Lark Developer Console](https://open.larksuite.com/) and create or access your app.
2. Under **Features**, enable **Bot** and turn on the **Custom Bot** feature.
3. From the app's **Bot settings**, generate a **Webhook URL**.
4. Copy the webhook — it will look like this:

   ```text
   https://open.larksuite.com/open-apis/bot/v2/hook/abcdef1234567890abcdef1234567890
   ```

This webhook contains a single unique token at the end. This is all Apprise needs to deliver messages.

While you can use the full webhook URL directly, Apprise also supports a simplified form using the `lark://` schema.

## Syntaxe

La syntaxe valide est la suivante :

- `https://open.larksuite.com/open-apis/bot/v2/hook/{token}`
- `lark://{token}`

## Detail des parametres

| Variable | Required | Description                                                      |
| -------- | -------- | ---------------------------------------------------------------- |
| token    | Yes      | The 32-character integration key at the end of your webhook URL. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Using the simplified Apprise URL:

```bash
# Assuming our token is abcdef1234567890abcdef1234567890

apprise -vv -t "Lark Title" -b "Body of message" \
   lark://abcdef1234567890abcdef1234567890
```

Using the full native URL as-is:

```bash
apprise -vv -t "Lark Title" -b "Body of message" \
   https://open.larksuite.com/open-apis/bot/v2/hook/abcdef1234567890abcdef1234567890
```
