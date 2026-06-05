---
title: "WhatsApp Notifications"
description: "Send WhatsApp notifications."
sidebar:
  label: "WhatsApp"

source: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started

schemas:
  - whatsapp

has_chat: true

sample_urls:
  - whatsapp://{token}@{from_phone_id}/{targets}
  - whatsapp://{template}:{token}@{from_phone_id}/{targets}

limits:
  max_chars: 1024
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Meta’s WhatsApp Cloud API setup is split across two separate portals: [Meta Business Manager](https://business.facebook.com/) for managing System Users and permanent tokens, and the [Meta Developer Dashboard](https://developers.facebook.com/) for creating your app and finding your Phone Number ID.

1. **Create a Meta Business Manager Account**
   Go to [Meta Business Manager](https://business.facebook.com/) and log in or create an account. Your WhatsApp Business Account (WABA) and System Users are managed here.
1. **Create a Meta Developer Account and App**
   Go to [Meta for Developers](https://developers.facebook.com/) and log in or create an account. Create a new app using the **Business** app type, then add **WhatsApp** as a product. If prompted on the home page, click **Customise Use Case** and select the **Connect to Customers (WhatsApp)** use case to reach the Cloud API setup.
1. **Generate a Permanent Access Token via Business Manager**
   - In [Meta Business Manager](https://business.facebook.com/), go to **Settings** > **Users** > **System Users**.
   - Create a System User (Admin or Employee role).
   - Click **Add Assets**, select your WhatsApp app, and enable the `whatsapp_business_messaging` permission (and optionally `whatsapp_business_management`).
   - Click **Generate Token**, select your app, confirm the permissions, and copy the resulting token. This permanent token does not expire unless revoked and is used in the Apprise `token` field.
1. **Locate Your `From Phone Number ID`**
   Switch back to the [Meta Developer Dashboard](https://developers.facebook.com/), open your app, then navigate to **WhatsApp** > **API Setup** (or **Getting Started**). Your registered sender number and its **Phone Number ID** are listed there. This ID is not your actual phone number — it is a separate numeric ID (roughly 14 digits) assigned by Meta.
1. **Register Your Recipient Number(s)**
   - During sandbox testing, you must verify any phone number you wish to message through Meta’s interface.
   - For production, your business must be verified and placed on the appropriate messaging tier.
1. **(Optional) Create and Approve Message Templates**
   - Navigate to **WhatsApp** > **Message Templates** in the Developer Dashboard, or use the WhatsApp Manager in Business Manager.
   - Create a template (e.g., `hello_world`) and await approval.
   - Templates allow structured messaging with variables (e.g., `{{1}}`, `{{2}}`) and can be used with Apprise’s `template:` prefix. This is explained further below.

Once everything is in place, you’re ready to send WhatsApp messages through Apprise.

## Syntax

Valid syntax is as follows:

- `whatsapp://{token}@{from_phone_id}/{targets}`
- `whatsapp://{template}:{token}@{from_phone_id}/{targets}`

Targets may be phone numbers, group IDs, or a mix of both:

- `+{phone}` — E.164 phone number (the `+` prefix is required; bare digits are also accepted)
- `#{group_id}` — WhatsApp group ID (numeric, `#` prefix required)

:::caution

**Group messaging requires a qualifying Meta account tier.** At the time this was written, Meta restricts the WhatsApp Groups API to businesses with at least 100,000 monthly business-initiated conversations. Check the [Meta Groups API documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/groups) for current eligibility requirements. Group IDs are returned by the Groups API when a group is created — they are not manually generated.

:::

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | This is the **Access Token** associated with your Meta WhatsApp App                                                                                                                                        |
| from     | Yes      | This is the **From Phone ID** associated with your Meta WhatsApp App; this isn't to be confused with your actual phone number. The ID is a separate assignment (about 14 digits long)                      |
| targets  | Yes      | One or more recipients — phone numbers (`+{phone}` or `@{phone}`) and/or group IDs (`#{group_id}`). At least one target must be provided.                                                                  |
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

## Examples

Send a WhatsApp Notification to a group:

```bash
# Send a message to a phone number:
apprise -b "Test Message" \
  "whatsapp://token@from_phone_id/+14155552671/"

# Send a message to a WhatsApp group (requires a qualifying Meta tier):
apprise -b "Test Message" \
  "whatsapp://token@from_phone_id/#120363043968066561"

# Send to a phone number and a group in the same call:
apprise -b "Test Message" \
  "whatsapp://token@from_phone_id/+14155552671/#120363043968066561"

# The original form still works (bare phone digits without a '+'):
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
