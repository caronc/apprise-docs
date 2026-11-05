---
title: "AWS End User Messaging Social (WhatsApp) Notifications"
description: "Send WhatsApp text and template notifications through AWS."
sidebar:
  label: "AWS End User Messaging Social (WhatsApp)"
source: https://aws.amazon.com/end-user-messaging/
schemas:
  - awswhatsapp
has_chat: true
has_attachments: false
has_image: false
sample_urls:
  - awswhatsapp://{region}/{from_phone_id}/{targets}
  - awswhatsapp://{access_key_id}:{secret_access_key}@{region}/{from_phone_id}/{targets}
limits:
  max_chars: 1024
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

Send notifications using AWS End User Messaging Social's `SendWhatsAppMessage` API. AWS handles access to your linked WhatsApp Business Account. This service uses AWS credentials, whereas [WhatsApp](../whatsapp/) sends directly to Meta using a Meta access token. The [SNS](../sns/) service is separate and does not send WhatsApp messages directly.

## Account setup

1. Install the optional AWS SDK: `pip install 'boto3>=1.35.50'`. It is also included in `pip install 'apprise[all-plugins]'`.
1. In the AWS End User Messaging Social console, create or link your WhatsApp Business Account and register a sender number.
1. Copy the AWS sender identifier, such as `phone-number-id-01234567890123456789012345678901`. This is not your phone number or Meta's numeric phone-number ID.
1. Configure AWS credentials with permission to call `social-messaging:SendWhatsAppMessage` for the sender. Prefer an IAM role or the standard AWS credential configuration over credentials embedded in a notification URL.
1. Obtain the recipient's opt-in. For notifications outside an open customer service window, create an approved WhatsApp template with the required language and parameters.

See the [AWS setup guide](https://docs.aws.amazon.com/social-messaging/latest/userguide/what-is-service.html) and [sending requirements](https://docs.aws.amazon.com/social-messaging/latest/userguide/whatsapp-send-message.html).

## Syntax

- `awswhatsapp://{region}/{from_phone_id}/{targets}`
- `awswhatsapp://{access_key_id}:{secret_access_key}@{region}/{from_phone_id}/{targets}`

Separate multiple recipients with `/`. Use international phone numbers with a country code. Group IDs are not supported.

When credentials are omitted, Boto3 uses its [standard credential provider chain](https://docs.aws.amazon.com/boto3/latest/guide/credentials.html), including environment variables, shared AWS configuration, and IAM roles. Region is always required in the URL.

For explicit credentials, URL-encode reserved characters in both keys. For example, `/`, `+`, and `=` become `%2F`, `%2B`, and `%3D`. Temporary explicit credentials also require `?token={session_token}`, with the token URL-encoded. Do not share URLs containing credentials.

## Parameter breakdown

| Variable          | Required | Description                                                                                                 |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| region            | Yes      | AWS region containing your sender, for example `us-east-1`.                                                 |
| from_phone_id     | Yes      | AWS sender identifier beginning with `phone-number-id-`.                                                    |
| targets           | Yes      | One or more international recipient phone numbers. Additional numbers can be supplied with `?to=`.          |
| access_key_id     | No       | Explicit AWS access key; requires `secret_access_key`. Omit both to use SDK credential discovery.           |
| secret_access_key | No       | Explicit AWS secret access key, URL-encoded.                                                                |
| token             | No       | Session token for explicit temporary AWS credentials. Omit it when the SDK discovers temporary credentials. |
| template          | No       | Approved template name. Omit to send free-form text within an open customer service window.                 |
| lang              | No       | Template language, default `en_US`. Must match the approved template.                                       |
| version           | No       | Meta API version, default `v23.0`. Choose a version supported by AWS and Meta.                              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Templates and message content

When a recipient messages your business, a 24-hour customer service window opens or refreshes. Free-form text can only be sent within that window. Outside it, use an approved template. Apprise does not open or track the window for you.

Template body parameters use the same mapping convention as the direct WhatsApp integration:

- `:body=1` places the notification body in template parameter `{{1}}`.
- `:type=2` places the notification type (`info`, `success`, `warning`, or `failure`) in `{{2}}`.
- `:3=Production` places the literal text `Production` in `{{3}}`.

Parameter indices must be consecutive, starting at 1, with no duplicates. Parameters are ordered numerically. The notification title is merged into its body because WhatsApp has no separate title field.

If no mappings are provided, the template is sent without body parameters. This supports static templates such as `hello_world`. To include your alert in a template, explicitly configure `:body=1` and ensure that the approved template has that parameter.

Only positional text parameters in a template's body are supported. Named parameters, template headers, buttons, attachments, and media uploads are not supported by this integration. The plugin uses a conservative 1,024-character notification body limit; template and WhatsApp content rules still apply.

## Examples

Send an approved `system_alert` template whose body contains one text parameter, using credentials discovered by the AWS SDK:

```bash
apprise -t "Database alert" -b "The backup failed" \
  "awswhatsapp://us-east-1/phone-number-id-01234567890123456789012345678901/15555550123?template=system_alert&lang=en_US&:body=1"
```

Send free-form text to two recipients within their open customer service windows:

```bash
apprise -b "Your requested status update" \
  "awswhatsapp://us-east-1/phone-number-id-01234567890123456789012345678901/15555550123/15555550124"
```

## Delivery and retries

Each recipient receives a separate API request. Success means AWS returned a message ID; it does not prove delivery to the recipient's device. Configure AWS message/event destinations if you need delivery status tracking.

Successful recipients are recorded so Apprise retries only failed recipients after a partial failure. Automatic SDK retries are disabled because this API has no idempotency token. If you enable Apprise retries and a request times out after AWS accepted it, a duplicate message is still possible.

AWS and WhatsApp throughput limits apply. The plugin throttles requests and reports API failures through Apprise; it does not provision senders, approve templates, receive messages, or manage account limits.

API reference: [SendWhatsAppMessage](https://docs.aws.amazon.com/social-messaging/latest/APIReference/API_SendWhatsAppMessage.html).
