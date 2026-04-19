---
title: "Notifications httpSMS"
description: "Envoyer httpSMS notifications."
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

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a httpSMS [from here](https://httpsms.com/). You will be then be able to access the /settings section of your account to obtain your API Key which you will need to use the Apprise Integration with (as `{apikey}`)

## Syntaxe

La syntaxe valide est la suivante :

- `httpsms://{apikey}@{fromPhoneNo}`
- `httpsms://{apikey}@{fromPhoneNo}/{target}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                     |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | The API Key associated with your httpSMS Account ([visit here](https://httpsms.com/settings) to acquire it).                                                    |
| to       | **\*No** | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`. |
| from     | **\*No** | Specify the phone number you registered with httpSMS you wish the message to be identified as being sent from.                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une httpSMS Message:

```bash
# Assuming our {apikey} is hard-to-guess
# Assuming our {PhoneNo} associated with our account is +1800-555-4444
# Assuming our {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   httpsms://hard-to-guess@+1800-555-4444/+134-555-1223
```
