---
title: "Postmark Notifications"
description: "Send transactional email notifications via Postmark."
sidebar:
  label: "Postmark"

source: https://postmarkapp.com

schemas:
  - postmark

limits:
  max_chars: 10485760

has_email: true
has_attachments: true

sample_urls:
  - postmark://APIToken:FromEmail/ToEmail
  - postmark://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Postmark is a transactional email delivery service with a JSON HTTP API. To use it with Apprise:

1. Visit [https://account.postmarkapp.com/](https://account.postmarkapp.com/) and sign in (or create an account).
2. Create a **Server** (or select an existing one) from the Postmark dashboard.
3. Inside the server settings click **API Tokens** in the left sidebar.
4. Copy the **Server API Token** shown on that page. This token is what you use as `APIToken` in your Apprise URL.
5. Make sure your sender address is verified. Visit [Sender Signatures](https://account.postmarkapp.com/signature_domains) and add your sending domain or a specific sender address. Postmark will reject mail from unverified senders.

---

## Syntax

Valid syntax is as follows:

- `postmark://{APIToken}:{FromEmail}`
- `postmark://{APIToken}:{FromEmail}/{ToEmail}`
- `postmark://{APIToken}:{FromEmail}/{ToEmail1}/{ToEmail2}/{ToEmailN}`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                    |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `APIToken`  | \*Yes    | The Server API Token found in your Postmark server's API Tokens page.                                                          |
| `FromEmail` | \*Yes    | A verified sender email address or domain. Postmark rejects mail from unverified senders.                                      |
| `ToEmail`   | No       | One or more recipient email addresses placed in the URL path. When omitted the notification is sent to `FromEmail`.            |
| `to`        | No       | Additional recipients as a comma-separated list (`?to=a@example.com,b@example.com`).                                           |
| `name`      | No       | Display name for the sender (`?name=Alice`).                                                                                   |
| `cc`        | No       | Carbon-copy recipients, comma-separated (`?cc=cc@example.com`). Named recipients are supported: `?cc=Alice<cc@example.com>`.   |
| `bcc`       | No       | Blind carbon-copy recipients, comma-separated (`?bcc=bcc@example.com`).                                                        |
| `reply`     | No       | Reply-To address, optionally including a display name (`?reply=support@example.com` or `?reply=Support<support@example.com>`). |
| `format`    | No       | Overrides the default body format. Set to `text` to send plain text instead of HTML.                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a basic notification to yourself (from and to are the same address):

```bash
apprise -vv -t "Test Title" -b "Test Message" \
   postmark://APIToken:user@example.com
```

Send from one address to a single recipient:

```bash
apprise -vv -t "Deployment Complete" -b "The release finished successfully." \
    postmark://APIToken:alerts@example.com/ops@example.com
```

Send to multiple recipients with CC, BCC, and a custom sender name:

```bash
apprise -vv -t "Incident Report" -b "See attached logs for details." \
   "postmark://APIToken:alerts@example.com/oncall@example.com/dev@example.com?cc=lead@example.com&bcc=manager@example.com&name=Alerting+System"
```

Send with an attachment:

```bash
apprise -vv -t "Nightly Report" -b "Attached is the latest report." \
   --attach /path/to/report.pdf \
   postmark://APIToken:reports@example.com/recipient@example.com
```

Send as plain text instead of HTML:

```bash
apprise -vv -t "Plain Text Alert" -b "Something happened." \
   "postmark://APIToken:user@example.com?format=text"
```
