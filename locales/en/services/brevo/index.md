---
title: "Brevo Notifications"
description: "Send Brevo notifications."
sidebar:
  label: "Brevo"

source: https://www.brevo.com

schemas:
  - brevo

has_attachments: true

sample_urls:
  - brevo://APIToken:FromEmail/ToEmail
  - brevo://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Brevo is a transactional email platform that exposes a JSON HTTP API for sending mail. The new `NotifyBrevo` plugin integrates this API with Apprise, using a URL schema consistent with other email providers such as SendGrid and Resend. The plugin:

1. Visit [https://www.brevo.com/](https://www.brevo.com/) and sign in to your Brevo account.
2. Navigate to **SMTP & API** in your account, then create a **Transactional email API key** with permission to send email.
3. Copy the generated **API key**. This will be used as the `APIToken` part of your Apprise URL.
4. Ensure you have at least one verified sender address or authenticated sending domain configured in Brevo. The **From Email** used in Apprise must be a valid sender, or Brevo will reject the request.
5. Construct your `brevo://` URL using the syntax below, substituting your API key, From address, and target recipients.
6. Use this URL in your Apprise configuration file or CLI calls.

⚠️ Brevo may send you a confirmation email (`subject: Security Alert: Verify a new IP`) indicating that `Someone tried to use your organization account and make an API call with an IP address you have never used before. We wanted to check this activity with you.`. You then need to use the confirmation link to approve the IP in question. From that point forward Apprise should work uninterrupted.

---

## Syntax

Valid syntax is as follows:

- Single sender, default recipient (self-notification). Note that the 'From Email' must be a 'Verified Sender' already with Brevo for this syntax to work.
  - `brevo://APIToken:FromEmail`

- Explicit recipients:
  - `brevo://APIToken:FromEmail/ToEmail`
  - `brevo://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN`

- Additional parameters:
  - `?to=extra1@example.com,extra2@example.com`
  - `?cc=cc1@example.com,cc2@example.com`
  - `?bcc=bcc1@example.com,bcc2@example.com`
  - `?reply=Reply Name <reply@example.com>`

The plugin URL template is:

- `brevo://{apikey}:{from_email}`
- `brevo://{apikey}:{from_email}/{targets}`

## Parameter Breakdown

| Variable    | Required | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `APIToken`  | Yes      | Your Brevo transactional API key (`api-key` header value).                 |
| `FromEmail` | Yes      | Verified sender email address in Brevo (`sender.email`).                   |
| `ToEmail`   | No       | One or more recipient email addresses in the URL path.                     |
| `to`        | No       | Additional recipients as a comma-separated list in the query string.       |
| `cc`        | No       | Carbon-copy recipients, comma-separated.                                   |
| `bcc`       | No       | Blind carbon-copy recipients, comma-separated.                             |
| `reply`     | No       | Reply-To header, optionally including a display name.                      |
| `format`    | No       | Overrides default format (`html` or `text`), consistent with Apprise core. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a basic Brevo notification to yourself (from and to are the same):

```bash
apprise -vv -t "Test Title" -b "Test Message" \
   brevo://APIToken:user@example.com
```

Send an email from `user@example.com` to a single recipient:

```bash
apprise -vv -t "Deployment Complete" -b "The release finished successfully." \
    brevo://APIToken:user@example.com/ops@example.com
```

Send to multiple recipients with CC, BCC and a Reply-To header:

```bash
apprise -vv -t "Incident Report" -b "See attached logs for details." \
   "brevo://APIToken:alerts@example.com/oncall@example.com?to=dev1@example.com,dev2@example.com&cc=teamlead@example.com&bcc=manager@example.com&reply=Support%20Desk%20<support@example.com>"
```

Send with an attachment:

```bash
apprise -vv -t "Nightly Report" -b "Attached is the latest report." \
   --attach /path/to/report.pdf   \
   brevo://APIToken:reports@example.com/recipient@example.com
```
