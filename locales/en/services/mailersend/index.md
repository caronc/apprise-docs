---
title: "MailerSend Notifications"
description: "Send transactional email notifications via MailerSend."
sidebar:
  label: "MailerSend"

source: https://www.mailersend.com

schemas:
  - mailersend

has_email: true
has_attachments: true

body_formats:
  - html
  - text

sample_urls:
  - mailersend://APIToken:FromEmail/ToEmail
  - mailersend://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

MailerSend is a transactional email delivery platform that exposes a JSON HTTP API for sending mail. The `NotifyMailerSend` plugin integrates this API with Apprise using a URL schema consistent with other email providers such as Brevo, Resend, and SendGrid.

1. Visit [https://www.mailersend.com/](https://www.mailersend.com/) and sign in or create a free account.
2. Navigate to **Settings -> API Tokens** and click **Create Token**. Give it a name and grant at least the **Email** send permission. Copy the generated token -- this is your `APIToken`.
3. Verify a sending domain under **Email -> Domains**, or add at least one verified sender address. The **From Email** you use in Apprise must belong to a domain you have verified with MailerSend, or the API will reject the request.
4. Assemble your `mailersend://` URL using the syntax below and add it to your Apprise configuration.

---

## Syntax

Valid syntax is as follows:

- Single sender, default recipient (sends to yourself):
  - `mailersend://APIToken:FromEmail`

- Explicit recipient(s):
  - `mailersend://APIToken:FromEmail/ToEmail`
  - `mailersend://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN`

- Additional recipients and options via query string:
  - `?to=extra1@example.com,extra2@example.com`
  - `?cc=cc1@example.com,cc2@example.com`
  - `?bcc=bcc1@example.com,bcc2@example.com`
  - `?reply=reply@example.com`

## Parameter Breakdown

| Variable    | Required | Description                                                                                |
| ----------- | -------- | ------------------------------------------------------------------------------------------ |
| `APIToken`  | Yes      | Your MailerSend API token with at least the Email send permission.                         |
| `FromEmail` | Yes      | Verified sender email address. Must belong to a domain verified in MailerSend.             |
| `ToEmail`   | No       | One or more recipient email addresses in the URL path.                                     |
| `to`        | No       | Additional recipients as a comma-separated list in the query string.                       |
| `cc`        | No       | Carbon-copy recipients, comma-separated.                                                   |
| `bcc`       | No       | Blind carbon-copy recipients, comma-separated.                                             |
| `reply`     | No       | Reply-To email address.                                                                    |
| `format`    | No       | MailerSend sends HTML by default. Set this to `text` to send a plain-text message instead. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a basic MailerSend notification to yourself (from and to are the same):

```bash
apprise -vv -t "Test Title" -b "Test Message" \
   mailersend://APIToken:sender@example.com
```

Send an email from `sender@example.com` to a single recipient:

```bash
apprise -vv -t "Deployment Complete" -b "The release finished successfully." \
    mailersend://APIToken:sender@example.com/ops@example.com
```

Send to multiple recipients with CC, BCC, and a Reply-To header:

```bash
apprise -vv -t "Incident Report" -b "See attached logs for details." \
   "mailersend://APIToken:alerts@example.com/oncall@example.com?to=dev1@example.com,dev2@example.com&cc=teamlead@example.com&bcc=manager@example.com&reply=support@example.com"
```

Send with an attachment:

```bash
apprise -vv -t "Nightly Report" -b "Attached is the latest report." \
   --attach /path/to/report.pdf \
   mailersend://APIToken:reports@example.com/recipient@example.com
```
