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

Separate multiple recipients with `/`. Use international phone numbers with a country code. Bare digits are normalized to E.164, and the leading `+` is preserved in AWS message payloads.

Group messaging is not supported by this integration. Use individual phone-number recipients.

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

Template body parameters support positional or named text values. Media template headers accept one image, video, or document attachment and must match the approved template's header type. Text/location headers and template buttons can be configured with explicit components, described below. Templates must fit one message piece; splitting templates with `overflow=split` is rejected. The default `overflow=upstream` leaves content validation to WhatsApp; `overflow=truncate` can shorten the notification body. The plugin uses a conservative 1,024-character body limit; template and WhatsApp content rules still apply.

### Structured headers and buttons

The `components` URL parameter accepts a URL-encoded JSON list in Meta's template component format. The Python constructor accepts the equivalent list as `template_components`. This supports:

- One text header parameter, or a location header with latitude, longitude, name and address.
- An explicit image/video/document header referring to a media ID or HTTPS link.
- Dynamic URL, quick-reply, copy-code and Flow buttons, with indices from `0` to `9`.
- Explicit text body parameters, including named parameters.

The components must match an approved template. Static button labels, static phone-number buttons and fixed URLs are defined when creating the template; they do not need runtime parameters. Do not combine an explicit body component with `:body`/positional/named mappings, or an explicit header with an attachment. Duplicate headers, body components and button indices are rejected before sending.

An exact string value `$body` or `$type` resolves to notification content or type; `$$body` escapes the placeholder and sends literal `$body`. Components are copied before rendering, so concurrent notifications do not overwrite each other's values. The component JSON is masked in privacy-mode URLs.

For a template with a text header, one body parameter and a dynamic URL button:

```python
from apprise.plugins.awswhatsapp import NotifyAWSWhatsApp

service = NotifyAWSWhatsApp(
    region_name="us-east-1",
    from_phone_id="phone-number-id-01234567890123456789012345678901",
    targets="15555550123",
    template="appointment_details",
    template_mapping={"body": "1"},
    template_components=[
        {"type": "header", "parameters": [{"type": "text", "text": "Appointment"}]},
        {
            "type": "button",
            "sub_type": "url",
            "index": "0",
            "parameters": [{"type": "text", "text": "appointment-123"}],
        },
    ],
)
```

A location header instead uses:

```json
[
  {
    "type": "header",
    "parameters": [
      {
        "type": "location",
        "location": {
          "latitude": -5.09,
          "longitude": -42.8,
          "name": "Office",
          "address": "Example street"
        }
      }
    ]
  }
]
```

Button parameter types are `text` for `url`, `payload` for `quick_reply`, `coupon_code` for `copy_code`, and an `action` object for `flow`. Template approval and any Flow configuration remain requirements of Meta/AWS.

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

Unsupported MIME types, empty files, and oversized files are rejected before any AWS upload. The media contents must satisfy [WhatsApp's format and codec requirements](https://docs.aws.amazon.com/social-messaging/latest/userguide/supported-media-types.html). MIME detection depends on the attachment provider and your platform's MIME database. For large uploads, increase Apprise's `cto`/`rto` timeouts as needed.

### Optional media conversion

By default, files are sent as provided. Set `transcode=image`, `audio`, `video`, or `sticker` to explicitly convert attachments before upload. FFmpeg must be installed locally and available on `PATH`; it is not a Python runtime dependency.

| Profile   | Output                                             |
| --------- | -------------------------------------------------- |
| `image`   | JPEG, first frame only                             |
| `audio`   | MP3, 128 kbit/s, two channels                      |
| `video`   | MP4 with H.264, YUV 4:2:0 and AAC audio            |
| `sticker` | Static WebP, padded to 512 × 512, first frame only |

Conversion uses local temporary files, a 120-second per-file timeout, a 100 MiB input limit and restricted FFmpeg protocols/input formats. Temporary files are removed after sending or on failure. Converted outputs still undergo the normal WhatsApp MIME/size checks; conversion does not guarantee a file fits the upload limits. The selected profile applies to every attachment in that notification. Office/PDF document conversion is not a media-codec operation and is not performed by FFmpeg.

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

## Template discovery and administration

An explicit companion utility provides template and sender inspection. Sending a notification never creates templates, changes event destinations or runs administration calls.

```bash
python -m apprise.utils.awswhatsapp --region us-east-1 senders
python -m apprise.utils.awswhatsapp --region us-east-1 templates --waba waba-example
python -m apprise.utils.awswhatsapp --region us-east-1 describe-template \
  --waba waba-example --name appointment_details --language en_US
```

`describe-template` returns the template text, approval status, language, header format, required body/header variable names, button definitions and the original template JSON. Template administration requires a recent Boto3 version with the corresponding AWS operations; the older SDK supported for sending may not expose template-management APIs. Upgrade Boto3 if the command reports that requirement.

Create a template from a local Meta-format JSON definition with:

```bash
python -m apprise.utils.awswhatsapp --region us-east-1 create-template \
  --waba waba-example --definition template.json
```

This explicitly calls `CreateWhatsAppMessageTemplate` and requires its IAM permission. The template is submitted for Meta approval, not automatically approved. Creating/linking the WABA or registering a sender number remains part of [AWS's embedded console sign-up flow](https://docs.aws.amazon.com/social-messaging/latest/userguide/getting-started-whatsapp.html); AWS documents `AssociateWhatsAppBusinessAccount` as console sign-up use only. The utility discovers existing senders rather than pretending to replace that process.

## Incoming messages and delivery receipts

AWS publishes incoming messages and statuses to the configured event destination. A separate consumer handles these asynchronous events; a successful send still means API acceptance rather than device delivery.

The companion utility normalizes AWS WhatsApp webhook entries, SNS notifications, SQS/Lambda envelopes, direct Meta entries and EventBridge statuses into JSON records. Each record identifies its kind (`message`, `status` or provider `event`), message ID, status or sender, timestamp and provider data. When supplied by AWS, `aws_message_id` is preserved alongside the Meta/native message ID for correlation. Raw provider data includes incoming text/media metadata, button replies and failure details. Store and deduplicate these records in your application as appropriate; the decoder does not make consent decisions or automatically mark messages read.

Decode a trusted event file without network requests:

```bash
python -m apprise.utils.awswhatsapp decode-events --file event.json
```

Or long-poll one batch from your SQS subscription to the SNS event topic:

```bash
python -m apprise.utils.awswhatsapp --region us-east-1 receive-events \
  --queue-url https://sqs.us-east-1.amazonaws.com/123456789012/example
```

This emits JSON Lines and does not delete queue messages by default. Add `--ack` to delete each SQS message only after all decoded records have been written and flushed. A parser/handler failure leaves the message unacknowledged for retry. A production application can call `receive_events(client, queue_url, handler, delete=True)` with a durable, idempotent storage handler; SQS is at-least-once and duplicates remain possible. Configure SNS/SQS subscriptions, queue access policies and a dead-letter queue for your consumer.

To explicitly set the existing SNS topic as the WABA event destination:

```bash
python -m apprise.utils.awswhatsapp --region us-east-1 configure-events \
  --waba waba-example --topic-arn arn:aws:sns:us-east-1:123456789012:example
```

This replaces the WABA's event destination, requires `PutWhatsAppBusinessAccountEventDestinations`, and assumes the topic and its publishing permissions already exist. It does not silently provision or change IAM policies. Do not use the decoder as an unauthenticated HTTP webhook: it is an event parser, not an SNS signature verifier or web server. Consume through an IAM-authorized queue/Lambda integration or validate the transport separately.

See [AWS incoming messages](https://docs.aws.amazon.com/social-messaging/latest/userguide/whatsapp-receive-message.html) and [message statuses](https://docs.aws.amazon.com/social-messaging/latest/userguide/managing-event-destinations-status.html).
