---
title: "Notifications Voip.ms"
description: "Envoyer Voip.ms notifications."
sidebar:
  label: "Voip.ms"

source: https://voip.ms/

schemas:
  - voipms

has_sms: true

sample_urls:
  - voipms://{password}:{email}/{fromPhoneNo}
  - voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo}
  - voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}/

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a Voip.ms [from here](https://voip.ms). From your dashboard, you will have to enable API access and create a password at the following link: [here](https://voip.ms/m/api.php)

You must edit your `DID` and enable `SMS/MMS ($0.0075/SMS, and $0.02/MMS)`:<br/>
![Screenshot from 2024-10-27 09-44-48](./images/75e25ff77c2f4149.png)

## Syntaxe

La syntaxe valide est la suivante :

- `voipms://{password}:{email}/{fromPhoneNo}`
- `voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo}`
- `voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}/`

## Detail des parametres

| Variable    | Required | Description                                                                                                                      |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| email       | Yes      | The email associated with your Voip.ms account                                                                                   |
| password    | Yes      | The password for API access, this is different from your Voip.ms account password                                                |
| fromPhoneNo | Yes      | Specify the phone number you registered with Voip.ms you wish the message to be identified as being sent from.                   |
| toPhoneNo   | No       | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Voip.ms notification to ourselves:

```bash
# Assume:
#  - our {email} is test@example.com
#  - our {password} is abc123
#  - The {toPhoneNo} and {fromPhoneNo} is 6135551234
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   voipms://abc123:test@example.com/6135551234
```

Envoyer une Voip.ms notification to another device:

```bash
# Assume:
#  - our {email} is test@example.com
#  - our {password} is abc123
#  - The {fromPhoneNo} is 6135551234
#  - The {ToPhoneNo} is 5645554321
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   voipms://abc123:test@example.com/6135551234/5645554321
```

## Depannage

There have been cases where error messages would be sent back from the VoipMS Server that are not very descriptive to what the issue is. The key things you need to verify for this service to work is:

- Account has credits available to use
- SMS/MMS is enabled (see **Setup** section above)

In certain cases, it's possible that the Carrier you were delivering to was unable to send the message.
