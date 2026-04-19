---
title: "Notifications SMSEagle"
description: "Envoyer SMSEagle notifications."
sidebar:
  label: "SMSEagle"

source: https://www.smseagle.eu/

schemas:
  - smseagle: insecure
  - smseagles

has_sms: true
has_attachments: true
has_selfhosted: true

sample_urls:
  - smseagle://{token}@{hostname}:{port}/{phoneNo}
  - smseagles://{token}@{hostname}:{port}/@{contact}
  - smseagle://{token}@{hostname}:{port}/#{group}

limits:
  max_chars: 1200
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Get your SMSEagle Hardware SMS/MMS Gateway connection [from here](https://www.smseagle.eu). It is from the device you can access its web interface and configure your access token.

## Syntaxe

La syntaxe valide est la suivante :

- `smseagles://{token}@{hostname}/{target}`
- `smseagles://{token}@{hostname}:{port}/{target}`

A `target` can be either a phone number, a contact, or if prefixed with `#` it becomes a group. Contacts are generally prefixed with a `@`.

- `smseagles://{token}@{hostname}:{port}/{phoneNo}`
- `smseagles://{token}@{hostname}:{port}/{phoneNo1}/{phoneNo2}/{phoneNoN}`
- `smseagles://{token}@{hostname}:{port}/@{contact}`
- `smseagles://{token}@{hostname}:{port}/@{contact1}/@{contact2}/@{contactN}`
- `smseagles://{token}@{hostname}:{port}/#{group}`
- `smseagles://{token}@{hostname}:{port}/#{group1}/#{group2}/#{groupN}`

**Note**: If you choose to leverage Groups, make sure your group as **Public** or it will not work from the API.
![image](./images/188493684-1d023e26-53f1-4813-87ec-e4a96e0e5a98.png)

Vous pouvez aussi melanger les formats

- `smseagles://{token}@{hostname}:{port}/{to_phone1}/3@{group1}/@{contact1}`

For ambiguity, if you do not provide a valid phone number, and the information parsed does not exclusively have a `#` or `@` in front of it, then it is interpreted as a Contact.

`smseagle:///` uses port 80 (and is not encrypted) while `smseagles://` secures the connection and defaults to port 443.

## Detail des parametres

| Variable | Required | Description                                                                                                                                     |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The hostname belonging to SMSEagle Appliance and/or account.                                                                                    |
| token    | Yes      | This is your generated Access Token associated with your SMSEagle account.                                                                      |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **smseagle://** and **443** for all **smseagles://** references.     |
| target   | Yes      | A phone number, group, and/or contact you wish to send your notification to.                                                                    |
| batch    | No       | Envoyer multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`.                 |
| test     | No       | Run in SMSEagle test mode. By default (unless specified) this is set to `No`.                                                                   |
| flash    | No       | Envoyer as SMS Flash message. By default (unless specified) this is set to `No`.                                                                |
| priority | No       | Can be set to either `normal` or `high`. If not otherwise provided, this assumes to be `normal` by default.                                     |
| status   | No       | Optionally include a small little ASCII string representing the notification status being sent (inline with it) by default this is set to `no`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une SMSEagle notification:

```bash
# Assuming our {AccessToken} is abcd123
# Assuming our {Hostname} of our SMSEagle Appliance is smseagle.example.com
# Assuming we want to notify 555221237, and +18005551234
# Test out the changes with the following command:
apprise -t "Test Title" -b "Test Message" \
 smseagle://abcd123@smseagle.example.com/555221237/+18005551234

```

SMSEagle Notifications also support attachments (Images only though):

```bash
# Assuming our {WebhookID} is 4174216298
# Assuming our {WebhookToken} is JHMHI8qBe7bk2ZwO5U711o3dV_js
# Assuming our {AvatarURL} is https://i.imgur.com/FsEpmwg.jpeg
# Also support for attachments:
apprise -t "Test Title" -b "Test Message" \
 smseagle://abcd123@smseagle.example.com/555221237/+18005551234 \
 --attach /path/to/image.png
```
