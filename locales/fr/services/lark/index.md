---
title: "Notifications Lark (Feishu)"
description: "Envoyer des notifications Lark (Feishu)."
sidebar:
  label: "Lark (Feishu)"

source: https://open.larksuite.com/

schemas:
  - lark

has_chat: true

sample_urls:
  - https://open.larksuite.com/open-apis/bot/v2/hook/{token}
  - lark://{token}

limits:
  max_chars: 20000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Lark, egalement appele Feishu en Chine, vous permet de creer des **robots personnalises** capables d'envoyer des notifications a des groupes et a des discussions a l'aide de **webhooks entrants**.

1. Rendez-vous sur la [Console Developpeur Lark](https://open.larksuite.com/) et creez votre application, ou accedez a une application existante.
2. Dans **Features**, activez **Bot** puis la fonctionnalite **Custom Bot**.
3. Depuis les **Bot settings** de l'application, generez une **URL de webhook**.
4. Copiez le webhook, il ressemblera a ceci :

   ```text
   https://open.larksuite.com/open-apis/bot/v2/hook/abcdef1234567890abcdef1234567890
   ```

Ce webhook contient un unique jeton a la fin. C'est tout ce dont Apprise a besoin pour delivrer des messages.

Bien que vous puissiez utiliser directement l'URL webhook complete, Apprise prend aussi en charge une forme simplifiee utilisant le schema `lark://`.

## Syntaxe

La syntaxe valide est la suivante :

- `https://open.larksuite.com/open-apis/bot/v2/hook/{token}`
- `lark://{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                              |
| -------- | ----------- | ------------------------------------------------------------------------ |
| token    | Oui         | Cle d'integration de 32 caracteres situee a la fin de votre URL webhook. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Utilisation de l'URL Apprise simplifiee :

```bash
# Supposons que notre token soit abcdef1234567890abcdef1234567890

apprise -vv -t "Titre Lark" -b "Corps du message" \
   lark://abcdef1234567890abcdef1234567890
```

Utilisation de l'URL native complete telle quelle :

```bash
apprise -vv -t "Titre Lark" -b "Corps du message" \
   https://open.larksuite.com/open-apis/bot/v2/hook/abcdef1234567890abcdef1234567890
```
