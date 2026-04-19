---
title: "Notifications Exotel"
description: "Envoyer Exotel notifications."
sidebar:
  label: "Exotel"

source: https://exotel.com/

schemas:
  - exotel

has_sms: true

sample_urls:
  - exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}
  - exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo}
  - exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}
  - exotel://{AccountSid}:{ApiToken}@{SenderID}/{PhoneNo}?apikey={ApiKey}

limits:
  max_chars: 2000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use Exotel, you will need your _Account SID_, _API Key_, and _API Token_. These are available from the [Exotel Dashboard](https://my.exotel.com/) under API settings.

Exotel uses the _Account SID_ in the API endpoint and the _API Key_ with _API Token_ for HTTP Basic authentication. For backwards compatibility, Apprise uses the _Account SID_ as the API key when `apikey=` is not provided.

You will also need a valid source value for **{FromPhoneNo}**. Exotel accepts an ExoPhone, an approved alphanumeric Sender ID, or an approved numeric sender ID associated with your account.

## Syntaxe

La syntaxe valide est la suivante :

- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}`
- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo}`
- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
- `exotel://{AccountSid}:{ApiToken}@{SenderID}/{PhoneNo}?apikey={ApiKey}`
- `exotel://{AccountSid}:{ApiToken}@{SenderID}/{PhoneNo1}/{PhoneNo2}?batch=yes`

If no _ToPhoneNo_ is specified, then the _FromPhoneNo_ will be messaged instead; hence the following is a valid URL:

- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/`

You can also pass values as query parameters:

- `exotel://_?sid={AccountSid}&token={ApiToken}&apikey={ApiKey}&from={FromPhoneNo}&to={PhoneNo}`

## Detail des parametres

| Variable    | Required | Description                                                                                                                                                                                                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSid  | Yes      | The _Account SID_ associated with your Exotel account. This is used in the Exotel API path.                                                                                                                                       |
| ApiToken    | Yes      | The _API Token_ associated with your Exotel account. This is used as the HTTP Basic authentication password.                                                                                                                      |
| ApiKey      | **No**   | The _API Key_ associated with your Exotel account. This is used as the HTTP Basic authentication username. If omitted, Apprise uses **AccountSid** for backwards compatibility with older URLs.                                   |
| FromPhoneNo | Yes      | An ExoPhone associated with your Exotel account. The phone number MUST include the country code dialling prefix. Spaces, brackets, and hyphens are accepted for readability.                                                      |
| SenderID    | Yes      | An approved Exotel sender ID/header associated with your account. This may be an alphanumeric Sender ID such as `EXOTEL` or a numeric sender ID such as `600123`. Use this in place of **FromPhoneNo** when configured in Exotel. |
| PhoneNo     | **\*No** | A phone number MUST include the country code dialling prefix. Spaces, brackets, and hyphens are accepted for readability. If no target is provided, Apprise sends the SMS to **FromPhoneNo**.                                     |
| region      | No       | Can be either `us` or `in`. By default, the region is set to `us`. Use `in` for the Mumbai API endpoint.                                                                                                                          |
| priority    | No       | Can be either `normal` or `high`. By default, priority is set to `normal`. Exotel recommends `high` only for OTP SMS messages.                                                                                                    |
| unicode     | No       | Optionally tell Apprise whether the SMS should be sent as unicode. By default this is set to `yes`; set it to `no` to use plain text encoding.                                                                                    |
| batch       | No       | Envoyer multiple targets in a single Exotel bulk SMS API request. By default this is set to `no`, so Apprise sends one upstream request per target.                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer an Exotel notification as an SMS:

```bash
# Assuming our {AccountSid} is acme123
# Assuming our {ApiToken} is exo-token
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   exotel://acme123:exo-token@19005559999/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   exotel://acme123:exo-token@1-(900) 555-9999/1-(800) 555-1223
```

Envoyer through the India region using a separate API key and an approved sender ID:

```bash
# Assuming our {AccountSid} is acme123
# Assuming our {ApiKey} is api-key
# Assuming our {ApiToken} is exo-token
# Assuming our {SenderID} is EXOTEL
# Assuming our {PhoneNo} is +91-98765-43210
apprise -vv -b "Your verification code is 123456" \
   "exotel://acme123:exo-token@EXOTEL/919876543210?apikey=api-key&region=in&priority=high"
```

Envoyer one message to multiple targets using Exotel bulk SMS:

```bash
# Assuming our {AccountSid} is acme123
# Assuming our {ApiKey} is api-key
# Assuming our {ApiToken} is exo-token
# Assuming our {SenderID} is EXOTEL
# Assuming our {PhoneNo1} is +91-98765-43210
# Assuming our {PhoneNo2} is +91-98765-43211
apprise -vv -b "Your scheduled reminder" \
   "exotel://acme123:exo-token@EXOTEL/919876543210/919876543211?apikey=api-key&region=in&batch=yes"
```
