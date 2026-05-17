---
title: "Twilio Notifications"
description: "Send Twilio notifications via SMS, WhatsApp, or phone call."
sidebar:
  label: "Twilio"

source: https://twilio.com

schemas:
  - twilio

has_sms: true

sample_urls:
  - twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}
  - twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}
  - twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo}
  - twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}?method=call

limits:
  - name: "SMS"
    max_chars: 160
  - name: "Phone Call (TwiML)"
    max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Account Setup

To use Twilio, you will need to acquire your _Account SID_ and _Auth Token_. Both of these are accessible via the [Twilio Dashboard](https://www.twilio.com/console).

You'll need to have a number defined as an Active Number ([from your dashboard here](https://www.twilio.com/console/phone-numbers/incoming)). This will become your **{FromPhoneNo}** when identifying the details below.

## Syntax

Valid syntax is as follows:

### SMS (default)

- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}`
- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

If no _ToPhoneNo_ is specified, then the _FromPhoneNo_ will be messaged instead; hence the following is a valid URL:

- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/`

[Short Codes](https://www.twilio.com/docs/glossary/what-is-a-short-code) are also supported but require at least 1 Target PhoneNo:

- `twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo}`
- `twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

### Phone Call

When `method=call` is specified, Twilio initiates an outbound phone call and reads the message body using [TwiML](https://www.twilio.com/docs/voice/twiml). The body should be a valid TwiML document:

- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}?method=call`
- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}?method=call`

:::note
Phone calls do not support Short Codes or WhatsApp-prefixed numbers (`w:`).
:::

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSID  | Yes      | The _Account SID_ associated with your Twilio account. This is available to you via the Twilio Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| AuthToken   | Yes      | The _Auth Token_ associated with your Twilio account. This is available to you via the Twilio Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| FromPhoneNo | **\*No** | The [Active Phone Number](https://www.twilio.com/console/phone-numbers/incoming) associated with your Twilio account you wish the SMS message or call to come from. It must be a number registered with Twilio. As an alternative to the **FromPhoneNo**, you may provide a [ShortCode](https://www.twilio.com/docs/glossary/what-is-a-short-code) instead (SMS only). The phone number MUST include the country codes dialling prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion. |
| ShortCode   | **\*No** | The ShortCode associated with your Twilio account you wish the SMS message to come from. It must be a number registered with Twilio. As an alternative to the **ShortCode**, you may provide a **FromPhoneNo** instead. Short Codes are not supported for phone calls.                                                                                                                                                                                                                                                                                                                                        |
| PhoneNo     | **\*No** | A phone number MUST include the country codes dialling prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion.<br/>**Note:** If you're using a _ShortCode_, then at least one _PhoneNo_ MUST be defined.                                                                                                                                                                                                                                                                                |
| method      | No       | The notification method to use. Set to `sms` (default) to send a text message, or `call` to initiate an outbound phone call. When using `call`, the message body must be a valid [TwiML](https://www.twilio.com/docs/voice/twiml) document (e.g. `<Response><Say>Hello</Say></Response>`). WhatsApp (`w:`) prefixes and Short Codes are not compatible with `method=call`.                                                                                                                                                                                                                                    |
| apikey      | No       | An optional Twilio API Key (beginning with `SK`). When provided, it is used instead of the _Account SID_ for HTTP Basic authentication, which is the [recommended approach](https://www.twilio.com/docs/iam/api-keys) for production use.                                                                                                                                                                                                                                                                                                                                                                     |

:::note
This notification service does not use the title field; only the _body_ is passed along.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Twilio Notification as an SMS:

```bash
# Assuming our {AccountSID} is AC735c307c62944b5a
# Assuming our {AuthToken} is e29dfbcebf390dee9
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/1-(800) 555-1223

```

Send a Twilio Notification as a phone call using TwiML:

```bash
# Assuming our {AccountSID} is AC735c307c62944b5a
# Assuming our {AuthToken} is e29dfbcebf390dee9
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} is +1-800-555-1223
apprise -vv -t "Test Message Title" \
   -b "<Response><Say>Test Message Body</Say></Response>" \
   "twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/18005551223?method=call"

```

### WhatsApp Support

If your account is configured to support [WhatsApp for Buisness](https://www.twilio.com/en-us/messaging/channels/whatsapp) you can also use this plugin to notify those endpoints as well. Simply place a `w:` infront of the outbound phone numbers that should be delivered through WhatsApp instead of the default Twillio configuration: e.g:

```bash
# Assuming our {AccountSID} is AC735c307c62944b5a
# Assuming our {AuthToken} is e29dfbcebf390dee9
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our WhatsApp {PhoneNo} is +1 555 123 3456
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/w:15551233456

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/w:+1 555 123 3456

```

You can also place a `w:` infront of your own phone number to switch the default behavior to interpret all of the numbers that follow to be sent to WhatsApp. For example: `twillio://credentials/w:18005559876/15551234444/15551235555`

In the above example, the target numbers `15551234444` and `15551235555` would have been sent through WhatsApp because the default switch of how to treat the numbers was switched by prefixing the source with `w:` instead.

**Note:** Sources with Short Codes will not work for WhatsApp.
