---
title: "Notifications WhatsApp"
description: "Envoyer WhatsApp notifications."
sidebar:
  label: "WhatsApp"

source: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started

schemas:
  - whatsapp

sample_urls:
  - whatsapp://{token}@{from_phone_id}/{targets}
  - whatsapp://{template}:{token}@{from_phone_id}/{targets}

limits:
  max_chars: 1024
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To send WhatsApp messages via Apprise, you must first configure your Meta WhatsApp Cloud API account. Follow these steps:

1. **Create a Meta Developer Account**  
   Go to [Meta for Developers](https://developers.facebook.com/) and log in or create an account.
1. **Create a WhatsApp App**  
   From the Meta Developer Dashboard, create a new App and add **WhatsApp** as a product.
1. **Generate a Permanent Access Token**
   - Navigate to your app's **WhatsApp > API Setup** section.
   - Select or create a **System User**, then assign a role and generate a **permanent access token** with `whatsapp_business_messaging` permissions.
   - This token is used in the Apprise `token` field.
1. **Locate Your `From Phone Number ID`**  
   This is not your actual phone number. It’s a numeric ID assigned by Meta to the sender number.  
   You can find it in your WhatsApp App > **API Setup** section under **Phone Numbers**.
1. **Register Your Recipient Number(s)**
   - During sandbox testing, you must verify any phone number you wish to message through Meta’s interface.
   - For production, your business must be verified and have the appropriate messaging tier.
1. **(Optional) Create and Approve Message Templates**
   - Navigate to **WhatsApp > Message Templates**.
   - Create a template (e.g., `hello_world`) and await approval.
   - Templates allow structured messaging with variables (e.g., `{{1}}`, `{{2}}`) and can be used with Apprise's `template:` prefix. This is explained further below.

Once everything is in place, you're ready to send WhatsApp messages through Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `whatsapp://{token}@{from_phone_id}/{targets}`
- `whatsapp://{template}:{token}@{from_phone_id}/{targets}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | This is the **Access Token** associated with your Meta WhatsApp App                                                                                                                                        |
| from     | Yes      | This is the **From Phone ID** associated with your Meta WhatsApp App; this isn't to be confused with your actual phone number. The ID is a separate assignment (about 14 digits long)                      |
| targets  | Yes      | The target individuals on WhatsApp you wish to notify                                                                                                                                                      |
| template | No       | You can optionally specify a `template_name` here (such as `hello_world` which is the default one created once you set yourself up your Meta App). This causes Apprise to pull from your template defined. |
| lang     | No       | If you've defined a template to reference, you can optionally over-ride the default language of `en_US` to reference a different version of the template specified.                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Template Variables

The templates you generate allow you to specify `{{1}}` and `{{2}}`, etc which are substituted during the Apprise runtime. To pre-set these values, simply leverage the `:` (colon) prefix in front of the index you wish to define.

`?:3=My Value` for example would assign `My Value` to `{{3}}` during the runtime. You must identify all indexes defined or you will get an error from the upstream server.

If you wish to assign the `body` or `type` from Apprise, these special keywords are specified instead with the `:` (colon) prefix providing the mapping/over-ride. For example: `?:body=1` would be accepted and would assign `{{1}}` the contents of the `body` passed into Apprise.

:::note

1. The template header must be set to either '' (empty) or assigned content.
1. Variables in the message body, if any, must use the number format, e.g. `{{1}}`, as opposed to the named variables format, e.g. `{{order_id}}`

   :::

## Exemples

Envoyer une WhatsApp Notification:

```bash
# Test out the changes with the following command:
apprise -b "Test Message" \
  "whatsapp://token@from_phone_id/to_phone_no/"

# Templates can be handled like so:
apprise -b "Test Message" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/"

# If you have defined {{1}} and {{2}} tokens, you can assign them values like so:
apprise -b "Test Message" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:1=the data i want put here&:2=more data here"

# The :<id> is how you map {{<id>}}elements. If you want to associated the body or
# message type with an id, then there are 2 reserved keywords that you can use for this:
# The below would make sure the Apprise Body value would be placed in the {{1}} element:
apprise -b "Test Message" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:body=1"

# You can mix and match the keywords and types:
apprise -b "Test Message" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:body=2&:type=3&1:MyID1Value"

# It's up to the developer to make sure that all of the {{1}}, {{2}}, etc are assigned correctly
```
