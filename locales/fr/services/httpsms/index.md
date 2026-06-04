---
title: "Notifications httpSMS"
description: "Envoyer des notifications httpSMS."
sidebar:
  label: "httpSMS"

source: https://httpsms.com/

schemas:
  - httpsms

has_sms: true

sample_urls:
  - httpsms://{apikey}@{fromPhoneNo}
  - httpsms://{apikey}@{fromPhoneNo}/{target}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a httpSMS [ici](https://httpsms.com/). Vous pourrez ensuite acceder a la section `/settings` de votre compte afin d'y recuperer votre cle API, dont vous aurez besoin pour utiliser l'integration Apprise, en tant que `{apikey}`.

## Syntaxe

La syntaxe valide est la suivante :

- `httpsms://{apikey}@{fromPhoneNo}`
- `httpsms://{apikey}@{fromPhoneNo}/{target}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                     |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui         | Cle API associee a votre compte httpSMS, [a recuperer ici](https://httpsms.com/settings).                                                                                                       |
| to       | **\*Non**   | Numero(s) de telephone et/ou groupe(s) auxquels vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour separer plusieurs entrees. Il s'agit d'un alias de `targets`. |
| from     | **\*Non**   | Numero de telephone enregistre chez httpSMS que vous souhaitez utiliser comme expediteur du message.                                                                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message httpSMS :

```bash
# Supposons que notre {apikey} soit hard-to-guess
# Supposons que le {PhoneNo} associe a notre compte soit +1800-555-4444
# Supposons que le {PhoneNo} que nous voulons notifier soit +134-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   httpsms://hard-to-guess@+1800-555-4444/+134-555-1223
```
