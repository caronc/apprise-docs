---
title: "Notifications Stackfield"
description: "Envoyer des notifications dans une salle Stackfield via webhook entrant."
sidebar:
  label: "Stackfield"

source: https://www.stackfield.com

schemas:
  - stackfield

sample_urls:
  - https://www.stackfield.com/apiwh/{token}
  - stackfield://{token}

has_chat: true

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Stackfield prend en charge les webhooks entrants associes a des salles individuelles. Chaque webhook envoie un message de chat dans une salle specifique.

1. Connectez-vous a votre compte Stackfield sur [stackfield.com](https://www.stackfield.com).
2. Ouvrez la **salle** dans laquelle vous souhaitez recevoir les notifications Apprise.
3. Cliquez sur le nom de la salle en haut pour ouvrir les **parametres de la salle**.
4. Selectionnez l'onglet **Integrations**, puis cliquez sur **Add a new WebHook**.
5. Choisissez **Chat Message** comme type de webhook et cliquez sur **Create Webhook**.
6. Donnez un nom au webhook (par exemple "Apprise") et cliquez sur **Save and Generate URL**.
7. Copiez l'URL generee -- elle ressemble a ceci :

```text
https://www.stackfield.com/apiwh/e5a1cfbd-970e-45a1-b81c-3e004f9bdab5
                                 |---------- jeton webhook (UUID) ---------|
```

L'UUID a la fin de cette URL est votre **jeton webhook**.

## Syntaxe

La syntaxe valide est la suivante :

- `stackfield://{token}`
- `https://www.stackfield.com/apiwh/{token}`

## Detail des parametres

| Variable | Obligatoire | Description                                                                                    |
| -------- | ----------- | ---------------------------------------------------------------------------------------------- |
| token    | \*Oui       | Le jeton UUID du webhook obtenu depuis les parametres d'integration de votre salle Stackfield. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification avec le format URL Apprise :

```bash
# Remplacez l'UUID ci-dessous par votre jeton webhook
apprise -vv -t "Alerte" -b "Serveur redemarre avec succes." \
   stackfield://e5a1cfbd-970e-45a1-b81c-3e004f9bdab5
```

Apprise accepte egalement l'URL de webhook native directement :

```bash
apprise -vv -t "Alerte" -b "Serveur redemarre avec succes." \
   "https://www.stackfield.com/apiwh/e5a1cfbd-970e-45a1-b81c-3e004f9bdab5"
```
