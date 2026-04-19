---
title: "Notifications Synology"
description: "Envoyer Synology notifications."
sidebar:
  label: "Synology"

source: https://kb.synology.com/en-au/DSM/help/Chat/chat_integration?version=7

schemas:
  - synology: insecure
  - synologys

sample_urls:
  - synologys://{hostname}/{token}
  - synology://{hostname}:{port}/{token}
  - synologys://{user}:{password}@{hostname}/{token}
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `synology://{hostname}}/{token}`
- `synology://{hostname}:{port}/{token}`
- `synology://{user}:{password}@{hostname}/{token}`
- `synology://{user}:{password}@{hostname}:{port}/{token}`

The secure versions (https):

- `synologys://{hostname}/{token}`
- `synologys://{hostname}:{port}/{token}`
- `synologys://{user}:{password}@{hostname}/{token}`
- `synologys://{user}:{password}@{hostname}:{port}/{token}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                 |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Web Server's hostname                                                                                                                   |
| token    | Yes      | The Synology Chat Incoming Token generated                                                                                                  |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **synology://** and **443** for all **synologys://** references. |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                           |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                           |

|

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Synology notification to all devices associated with a project:

```bash
# Assume:
#  - our {hostname} is synology.home.arpa
#  - our {port} is 5000
#  - our {token} is j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   synology://synology.home.arpa:5000/j300012fl9y0b5AW9g9Nsejb8P
```
