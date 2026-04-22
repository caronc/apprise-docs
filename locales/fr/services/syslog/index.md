---
title: "Notifications Syslog"
description: "Envoyer des notifications Syslog."
sidebar:
  label: "Syslog"

source: https://tools.ietf.org/html/rfc5424

schemas:
  - syslog: insecure

has_sms: true

sample_urls:
  - syslog://
  - syslog://{facility}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `syslog://`
- `syslog://{facility}`

Vous pouvez par exemple remplacer la facility par defaut comme ceci :

- `syslog://local5`

## Détail des Paramètres

| Variable | Obligatoire | Description |
| -------- | ----------- | ----------- |

| facility | Non | Facility a utiliser ; la valeur par defaut est `user`. Les options valides sont **kern**, **user**, **mail**, **daemon**, **auth**, **syslog**, **lpr**, **news**, **uucp**, **cron**, **local0**, **local1**, **local2**, **local3**, **local4**, **local5**, **local6** et **local7**. |
| logperror | Non | Envoie aussi le message de journal vers `_stderr_`. Cette methode est ignoree lors d'une requete distante. |
| logpid | Oui | Inclut le PID dans la sortie de journalisation. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Syslog :

```bash
# L'exemple ci-dessous envoie une notification syslog vers la facility `user`
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   syslog://
```
