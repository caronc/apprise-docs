---
title: "Notifications Growl"
description: "Envoyer Growl notifications."
sidebar:
  label: "Growl"

source: http://growl.info/

schemas:
  - growl

sample_urls:
  - growl://{hostname}
  - growl://{hostname}:{port}
  - growl://{password}@{hostname}
  - growl://{password}@{hostname}:{port}
  - growl://{hostname}/?priority={priority}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Growl requires this script to pre-register the notifications it sends before being able to actually send something. Make sure you are configured to allow application registration!

## Syntaxe

La syntaxe valide est la suivante :

- `growl://{hostname}`
- `growl://{hostname}:{port}`
- `growl://{password}@{hostname}`
- `growl://{password}@{hostname}:{port}`
- `growl://{hostname}/?priority={priority}`

Depending on the version of your Apple OS, you may wish to enable the legacy protocol version (v1.4) as follows if you have problems receiving the icon in version 2 (the default):

- `growl://{password}@{hostname}?version=1`

## Detail des parametres

| Variable | Required | Description                                                                                                                    |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| hostname | Yes      | The server Growl server is listening on.                                                                                       |
| port     | No       | The port Growl Server is listening on. By default the port is **23053**. You will probably never have to change this.          |
| password | No       | The password associated with the Growl server if you set one up.                                                               |
| version  | No       | The default version is 2, but you can specify the attribute ?version=1 if you would require the 1.4 version of the protocol.   |
| priority | No       | Can be **low**, **moderate**, **normal**, **high**, or **emergency**; the default is **normal** if a priority isn't specified. |
| image    | No       | Whether or not to include an icon/image along with your message. By default this is set to **yes**.                            |
| sticky   | No       | The Gotify sticky flag; by default this is set to **no**.                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Growl notification to our server

```bash
# Assuming our {hostname} is growl.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   growl://growl.server.local
```

Some versions of Growl don't display the image/icon correctly, you can also try the following to see if this solves it for you:

```bash
# Envoyer une notification Growl en utilisant une image binaire brute (au lieu d’une URL, en interne)
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   growl://growl.server.local?version=1
```
