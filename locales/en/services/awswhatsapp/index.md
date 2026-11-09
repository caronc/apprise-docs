---
title: "AWS End User Messaging Social (WhatsApp) Notifications"
description: "Send WhatsApp notifications through AWS."
sidebar:
  label: "AWS End User Messaging Social (WhatsApp)"

source: https://aws.amazon.com/end-user-messaging/

schemas:
  - awswhatsapp

has_chat: true
has_attachments: true

sample_urls:
  - awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}
  - awswhatsapp://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}

limits:
  max_chars: 1024
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

This service sends WhatsApp messages through AWS End User Messaging Social using your AWS credentials. If you would rather send through Meta directly with a Meta access token, see [WhatsApp](../whatsapp/).

## Account Setup

1. In the AWS End User Messaging Social console, link your WhatsApp Business Account and register a sender phone number. See the [AWS setup guide](https://docs.aws.amazon.com/social-messaging/latest/userguide/what-is-service.html).
1. Copy the sender's **phone number ID**. It looks like `phone-number-id-01234567890123456789012345678901`. This is not your actual phone number.
1. Generate an _Access Key ID_ and _Secret Access Key_ for an IAM user that is allowed to call `social-messaging:SendWhatsAppMessage`. The [SNS](../sns/) page walks through creating access keys.

WhatsApp only lets you send a free-form message to someone who has messaged you in the last 24 hours. Outside of that window you must send an approved template instead (see [Templates](#templates)).

### Temporary Credentials (Session Token)

Short-lived credentials (for example from `aws sts assume-role` or an AWS Lambda role) come with a third value, the **Session Token**. Apprise accepts it in two ways:

- **Query parameter** (recommended): append `?token={SessionToken}`. The token can be used exactly as AWS provides it.
- **URL prefix**: `awswhatsapp://{SessionToken}@{AccessKeyID}/...`. Any `/` in the token must be written as `%2F`.

## Syntax

Valid syntax is as follows:

- `awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}`
- `awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
- `awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}?template={Template}`
- `awswhatsapp://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}`

## Parameter Breakdown

| Variable        | Required | Description                                                                                                 |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| AccessKeyID     | Yes      | The _Access Key ID_ from the AWS Management Console.                                                        |
| AccessKeySecret | Yes      | The _Secret Access Key_ from the AWS Management Console.                                                    |
| Region          | Yes      | The AWS region your sender lives in, e.g. **us-east-1**.                                                    |
| FromPhoneID     | Yes      | The AWS sender ID, starting with `phone-number-id-`.                                                        |
| PhoneNo         | Yes      | One or more recipient phone numbers including the country code. Brackets, spaces, and hyphens are accepted. |
| SessionToken    | No       | A session token for temporary credentials. Prefer `?token=`.                                                |
| template        | No       | The name of an approved template to send instead of a free-form message.                                    |
| lang            | No       | The template language; it must match the approved template. Defaults to `en_US`.                            |
| bucket          | No       | A private S3 bucket used to send attachments. See [Attachments](#attachments).                              |
| key             | No       | An alias for **AccessKeyID** (`?key=`).                                                                     |
| access          | No       | An alias for **AccessKeyID** (`?access=`).                                                                  |
| secret          | No       | An alias for **AccessKeySecret** (`?secret=`).                                                              |
| token           | No       | An alias for **SessionToken** (`?token=`).                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Templates

Template parameters are filled in the same way as the [WhatsApp](../whatsapp/) service:

- `:1=Production` places the text `Production` in `{{1}}`.
- `:body=2` places the notification body in `{{2}}`.
- `:type=3` places the notification type (`info`, `success`, `warning` or `failure`) in `{{3}}`.

If no parameters are given, the template is sent as-is, which suits static templates such as `hello_world`.

Named templates are also supported:

- `:nome=Test` supplies the literal value `Test` for `{{nome}}`.
- `:body=mensagem` maps the notification body to `{{mensagem}}`.
- `:type=tipo` maps the notification type to `{{tipo}}`.

Named parameters include Meta's `parameter_name` field. Names use lowercase letters, digits and underscores and cannot start with a digit. `body` and `type` are reserved mapping keys. Named and positional formats cannot be mixed, and duplicate assignments are rejected. URL-encode values containing reserved characters.

Apprise does not download templates or discover their parameters. Configure mappings to match the approved template. Only text body parameters are supported; template header and button parameters are not implemented.

## Attachments

Add `?bucket={Bucket}` to send attachments. Each file is briefly stored in the `apprise/` folder of that bucket while WhatsApp copies it, then removed.

- The bucket must be private and in the **same AWS account and region** as your sender.
- Your IAM user also needs `social-messaging:PostWhatsAppMessageMedia`, plus `s3:PutObject`, `s3:GetObject` and `s3:DeleteObject` on `apprise/*`.

Images, audio and video are sent as such; any other file is sent as a document. Each attachment is sent as its own message after the text. WhatsApp's own [file type and size limits](https://docs.aws.amazon.com/social-messaging/latest/userguide/supported-media-types.html) apply.

Attachments are separate messages rather than template headers. They require an open customer-service window, even when sent alongside an approved text template. AWS acceptance is not proof of delivery. Applications remain responsible for opt-in and delivery-status processing.

## Examples

Send a WhatsApp message:

```bash
# Assuming our {AccessKeyID} is AHIAJGNT76XIMXDBIJYA
# Assuming our {AccessKeySecret} is bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Assuming our {Region} is us-east-1
# Assuming our {FromPhoneID} is phone-number-id-0123456789abcdef0123456789abcdef
# Assuming our {PhoneNo} is +1 555-555-0123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   awswhatsapp://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-1/phone-number-id-0123456789abcdef0123456789abcdef/15555550123
```

Send an approved `system_alert` template with the body placed in `{{1}}`:

```bash
apprise -vv -b "The backup failed" \
   "awswhatsapp://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-1/phone-number-id-0123456789abcdef0123456789abcdef/15555550123?template=system_alert&:body=1"
```

Send an attachment:

```bash
apprise -vv -b "Your report is ready" -a report.pdf \
   "awswhatsapp://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-1/phone-number-id-0123456789abcdef0123456789abcdef/15555550123?bucket=my-staging-bucket"
```
