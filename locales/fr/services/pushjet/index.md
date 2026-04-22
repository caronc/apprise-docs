---
title: "Notifications Pushjet"
description: "Envoyer des notifications Pushjet."
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
Le service en ligne Pushjet semble avoir disparu. En revanche, l'ensemble du code source est toujours disponible en open source [sur GitHub](https://github.com/Pushjet). Le plugin _apprise_ `pjet://` reste donc utilisable pour un hebergement local d'un serveur Pushjet.
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

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                       |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secret_key | Oui         | Secret Key associee a votre compte Pushjet.                                                                                                                                                                                                       |
| host       | Oui         | Serveur Pushjet que vous hebergez.                                                                                                                                                                                                                |
| user       | Non         | Si votre systeme utilise HTTP-AUTH, vous pouvez fournir le _username_ a utiliser pour l'authentification.                                                                                                                                         |
| password   | Non         | Si votre systeme utilise HTTP-AUTH, vous pouvez fournir le _password_ a utiliser pour l'authentification.                                                                                                                                         |
| port       | Non         | Port Pushjet facultatif, necessaire uniquement si votre serveur de notification autoheberge ecoute sur un port different des ports standards. Par defaut, **80** est utilise pour **pjet://** et **443** pour toutes les references **pjets://**. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Pushjet :

```bash
# Supposons que notre {secret_key} soit abcdefghijklmnopqrstuvwxyzabc
# Supposons que notre {hostname} soit localhost
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pjet://abcdefghijklmnopqrstuvwxyzabc@localhost
```
