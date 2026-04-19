---
title: "Notifications Pushjet"
description: "Envoyer Pushjet notifications."
sidebar:
  label: "Pushjet"

source: https://github.com/Pushjet

schemas:
  - pjet: insecure
  - pjets

has_selfhosted: true

sample_urls:
  - pjet://{host}/{secret_key}
  - pjets://{host}:{port}/{secret_key}
  - pjets://{user}:{password}@{host}/{secret_key}
---

<!-- SERVICE:DETAILS -->

:::note
The Pushjet online service appears to have gone dead. They did however leave behind all of our source code as open source [here on github](https://github.com/Pushjet). Thus the _apprise_ plugin _pjet://_ still works for the local hosting of a Pushjet server.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `pjet://{host}/{secret_key}`
- `pjet://{host}:{port}/{secret_key}`
- `pjet://{user}:{password}@{host}/{secret_key}`
- `pjet://{user}:{password}@{host}:{port}/{secret_key}`
- `pjets://{host}/{secret_key}`
- `pjets://{host}:{port}/{secret_key}`
- `pjets://{user}:{password}@{host}/{secret_key}`
- `pjets://{user}:{password}@{host}:{port}/{secret_key}`

## Detail des parametres

| Variable   | Required | Description                                                                                                                                                                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secret_key | Yes      | The Secret Key associated with your Pushjet account.                                                                                                                                                                              |
| host       | Yes      | The Pushjet server you're hosting                                                                                                                                                                                                 |
| user       | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                                                                                                                 |
| password   | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                                                                                                                 |
| port       | No       | The Pushjet port optional and only required if you're hosting your own notification server on a different port then the standard ones. By default the port is **80** for **pjet://** and **443** for all **pjets://** references. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Pushjet notification:

```bash
# Assuming our {secret_key} is abcdefghijklmnopqrstuvwxyzabc
# Assuming our {hostname} is localhost
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pjet://abcdefghijklmnopqrstuvwxyzabc@localhost
```
