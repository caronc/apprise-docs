---
title: "Notifications MSG91"
description: "Envoyer MSG91 notifications."
sidebar:
  label: "MSG91"

source: https://msg91.com

schemas:
  - msg91

has_sms: true

sample_urls:
  - msg91://{TemplateID}@{AuthKey}/{PhoneNo}
  - msg91://{TemplateID}@{AuthKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use MSG91, you will need to acquire your _Authentication Key_. This is accessible via the [MSG91 Dashboard](https://control.msg91.com). In addition to this, you will need to prepare a template and assign a `body`, `title`, and `type` variable to it so that Apprise can relay its information through here.

## Syntaxe

La syntaxe valide est la suivante :

- `msg91://{TemplateID}@{AuthKey}/{PhoneNo}`
- `msg91://{TemplateID}@{AuthKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Detail des parametres

| Variable   | Required | Description                                                                                                                                                                                                                        |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AuthKey    | Yes      | The _Authentication Key_ associated with your MSG91 account. This is available to you via the [MSG91 Dashboard](https://control.msg91.com/).                                                                                       |
| TemplateID | Yes      | The _Template ID_ associated with your MSG91 account. This is available to you via the [MSG91 Dashboard](https://control.msg91.com/).                                                                                              |
| PhoneNo    | Yes      | A phone number MUST include the country codes dialing prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion |
| short_url  | No       | A boolean (defaults) to `No` whether the SMS messages should use the Short URL notation.                                                                                                                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

### Template Variables

The templates you generate allow you to specify your own key mappings. B

The following keys are automatically passed from Apprise to the MSG91 Template system should you chose to use them or not.

- `##body##`: The Apprise Message Body (Title is prefixed into this if defined)
- `##type##`: The Apprise Message Type (e.g. `warning`, `info`, `failure`, or `success`)

If you wish to assign new types to `body` or `type` from Apprise, these special keywords are specified instead with the `:` (colon) prefix providing the mapping/over-ride. For example: `?:body=msg` would remap the default message body from apprise to the `msg` keyword instead.

If you wish to remove the `type` from being passed, you simply define it in the URL but do not assign it to anything such as: `?:type`.

Finally if you wish to define your own arguments, just define them as such `?:key=value` would assign a `key` the contents of `value` when being passed into your template.

## Exemples

Envoyer une MSG91 Notification as an SMS:

```bash
# Assuming our {TemplateID} is 12345
# Assuming our {AuthKey} is gank339l7jk3cjaE
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   msg91://12345@gank339l7jk3cjaE/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "msg91://12345@gank339l7jk3cjaE/1-(800) 555-1223"
```

Here is a templating example:
Envoyer une MSG91 Notification as an SMS:

```bash
# Assuming our {TemplateID} is 12345
# Assuming our {AuthKey} is gank339l7jk3cjaE
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
# Assuming we want to map our `body` tag (sent from Apprise to `payload` instead
# Assuming we want to make sure Apprise does not pass along the `type`
# Assuming we want to define our Foobar Inc company name as the template token `company`:
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "msg91://12345@gank339l7jk3cjaE/18005551223?:body=payload&:type&company=Foobar%20Inc"

```
