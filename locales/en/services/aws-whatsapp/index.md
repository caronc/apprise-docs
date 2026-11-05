---
title: "AWS End User Messaging Social (WhatsApp) Notifications"
description: "Send WhatsApp text, media and template notifications through AWS."
sidebar:
  label: "AWS End User Messaging Social (WhatsApp)"
source: https://aws.amazon.com/end-user-messaging/
schemas:
  - awswhatsapp
has_chat: true
has_attachments: true
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

Separate multiple recipients with `/`. Use international phone numbers with a country code. Bare digits are normalized to E.164, and the leading `+` is preserved in AWS message payloads. Group IDs are not supported.

When credentials are omitted, Boto3 uses its [standard credential provider chain](https://docs.aws.amazon.com/boto3/latest/guide/credentials.html), including environment variables, shared AWS configuration, and IAM roles. Region is always required in the URL.

For explicit credentials, URL-encode reserved characters in both keys. For example, `/`, `+`, and `=` become `%2F`, `%2B`, and `%3D`. Temporary explicit credentials also require `?token={session_token}`, with the token URL-encoded. Do not share URLs containing credentials.

## Parameter breakdown

| Variable          | Required        | Description                                                                                                 |
| ----------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| region            | Yes             | AWS region containing your sender, for example `us-east-1`.                                                 |
| from_phone_id     | Yes             | AWS sender identifier beginning with `phone-number-id-`.                                                    |
| targets           | Yes             | One or more international recipient phone numbers. Additional numbers can be supplied with `?to=`.          |
| access_key_id     | No              | Explicit AWS access key; requires `secret_access_key`. Omit both to use SDK credential discovery.           |
| secret_access_key | No              | Explicit AWS secret access key, URL-encoded.                                                                |
| token             | No              | Session token for explicit temporary AWS credentials. Omit it when the SDK discovers temporary credentials. |
| template          | No              | Approved template name. Omit to send free-form text within an open customer service window.                 |
| lang              | No              | Template language, default `en_US`. Must match the approved template.                                       |
| version           | No              | Meta API version, default `v23.0`. Choose a version supported by AWS and Meta.                              |
| bucket            | For attachments | Private S3 staging bucket in the same account and region as your WABA.                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

The optional `prefix` parameter selects the S3 staging key prefix (default `apprise/`). For example, `?bucket=example-staging&prefix=media/` stages files under `media/`; scope object permissions to that configured prefix.

## Templates and message content

When a recipient messages your business, a 24-hour customer service window opens or refreshes. Free-form text can only be sent within that window. Outside it, use an approved template. Apprise does not open or track the window for you.

Positional template body parameters use the same mapping convention as the direct WhatsApp integration:

- `:body=1` places the notification body in template parameter `{{1}}`.
- `:type=2` places the notification type (`info`, `success`, `warning`, or `failure`) in `{{2}}`.
- `:3=Production` places the literal text `Production` in `{{3}}`.

Parameter indices must be consecutive, starting at 1, with no duplicates. Parameters are ordered numerically. The notification title is merged into its body because WhatsApp has no separate title field.

Named template parameters are also supported. Use `:nome=Joao%20Silva` to assign a literal value to the template variable `{{nome}}`, or `:body=mensagem` to map the notification body to `{{mensagem}}`. Similarly, `:type=tipo` maps the notification type to `{{tipo}}`. The plugin includes `parameter_name` in each named text parameter. The mapping keys `body` and `type` are reserved for dynamic values. Names use lowercase letters and underscores; do not mix named and positional mappings or assign the same parameter twice.

If no mappings are provided, the template is sent without body parameters. This supports static templates such as `hello_world`. To include your alert in a template, explicitly configure `:body=1` and ensure that the approved template has that parameter.

Template body parameters support positional or named text values. Media template headers accept one image, video, or document attachment and must match the approved template's header type. Text/location headers and buttons are not supported. Templates must fit one message piece; splitting templates with `overflow=split` is rejected. The default `overflow=upstream` leaves content validation to WhatsApp; `overflow=truncate` can shorten the notification body. The plugin uses a conservative 1,024-character body limit; template and WhatsApp content rules still apply.

## Media attachments

Add `?bucket={staging_bucket}` to the notification URL and pass files using Apprise's `-a` option or attachment API. Local, in-memory, and downloaded HTTP attachments use Apprise's normal attachment handling.

For each file, the plugin uploads to a unique private S3 key, creates a five-minute presigned GET URL, and calls `PostWhatsAppMessageMedia`. It then sends the returned media ID using the same sender. The S3 staging object is deleted after the import attempt, including when the import fails. No public object ACL is added. Successfully imported media IDs are reused across recipients and retries of the same notification.

Configure the bucket in the **same AWS account and region as the WABA**, as required by [AWS's media upload guide](https://docs.aws.amazon.com/social-messaging/latest/userguide/managing-media-files-s3.html). The calling identity needs:

- `social-messaging:SendWhatsAppMessage` and `social-messaging:PostWhatsAppMessageMedia` for the sender.
- `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject` for the bucket's `apprise/*` prefix. Managed multipart uploads may also need `s3:AbortMultipartUpload` for cleanup.
- Appropriate KMS permissions if your staging bucket uses a customer-managed KMS key.

Use a private staging bucket and configure a lifecycle rule as a fallback for failed cleanup and incomplete multipart uploads. An unversioned bucket is simplest; in a versioned bucket, deleting an object leaves older versions, so lifecycle rules must also expire noncurrent versions. Cleanup failures are logged without resending an already accepted message. WhatsApp keeps imported media for up to 30 days; deleting the staging object does not remove that WhatsApp copy.

Supported MIME types and limits:

| Media    | Formats                                  | Maximum file size            |
| -------- | ---------------------------------------- | ---------------------------- |
| Image    | JPEG, PNG                                | 5 MiB                        |
| Audio    | AAC, AMR, MP3, MP4 audio, OGG            | 16 MiB                       |
| Video    | MP4, 3GPP                                | 16 MiB                       |
| Document | Plain text, PDF, Word, Excel, PowerPoint | 100 MiB                      |
| Sticker  | WebP                                     | 100 KiB (conservative limit) |

Unsupported MIME types, empty files, and oversized files are rejected before any AWS upload. The media contents must satisfy [WhatsApp's format and codec requirements](https://docs.aws.amazon.com/social-messaging/latest/userguide/supported-media-types.html); the plugin does not transcode files. MIME detection depends on the attachment provider and your platform's MIME database. For large uploads, increase Apprise's `cto`/`rto` timeouts as needed.

Within an open customer service window, the text body is sent once as a separate message, followed by one message per attachment. Documents retain their filename. For notifications outside the window, use an approved media template: provide exactly one image, video, or document, and the plugin inserts its media ID into the template header. Audio and stickers cannot be template headers. Multiple attachments with a template are rejected before uploading.

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

Send a PDF using an approved `report_ready` template with a document header and one text body parameter:

```bash
apprise -b "Your report is ready" -a report.pdf \
  "awswhatsapp://us-east-1/phone-number-id-01234567890123456789012345678901/15555550123?bucket=example-staging&template=report_ready&:body=1"
```

Send an image and an audio attachment during an open customer service window:

```bash
apprise -b "Your requested files" -a photo.png -a recording.mp3 \
  "awswhatsapp://us-east-1/phone-number-id-01234567890123456789012345678901/15555550123?bucket=example-staging"
```

## Delivery and retries

Each recipient receives a separate API request. Success means AWS returned a message ID; it does not prove delivery to the recipient's device. Configure AWS message/event destinations if you need delivery status tracking.

Successful text, template, and individual attachment deliveries are recorded so Apprise retries only failed parts after a partial failure. Attachments are not repeated across split free-form text pieces. Automatic SDK retries are disabled because this API has no idempotency token. If you enable Apprise retries and a request times out after AWS accepted it, a duplicate message is still possible.

AWS and WhatsApp throughput limits apply. The plugin throttles requests and reports API failures through Apprise; it does not provision senders, approve templates, receive messages, or manage account limits.

API reference: [SendWhatsAppMessage](https://docs.aws.amazon.com/social-messaging/latest/APIReference/API_SendWhatsAppMessage.html).
