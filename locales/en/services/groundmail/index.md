---
title: "Groundmail Notifications"
description: "Send email notifications through the Groundmail transactional email API."
sidebar:
  label: "Groundmail"

source: https://groundmail.dev/

schemas:
  - groundmail

has_email: true
has_attachments: true

body_formats:
  - html: default
  - text

sample_urls:
  - groundmail://{apikey}:{from_email}
  - groundmail://{apikey}:{from_email}/{to_email}
  - groundmail://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Creating a [Groundmail](https://groundmail.dev/) account is free, and the free plan includes 3,000 emails a month.

Then create an **API Key** in the [API Keys](https://app.groundmail.dev/api-keys) section of your dashboard. Keys start with `gm_`.

To send notifications only to yourself (the email address on your Groundmail account), no domain setup is needed: use `noreply@mail.groundmail.dev` as the `{from_email}`.

To send to anyone else, add and verify your domain in the [Domains](https://app.groundmail.dev/domains) section of your dashboard, then use an address on that domain as the `{from_email}`. Sending to other recipients also needs a payment method on file. The free plan is never charged.

## Syntax

Valid syntax is as follows:

- `groundmail://{apikey}:{from_email}`
- `groundmail://{apikey}:{from_email}/{to_email}`
- `groundmail://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}`

Each `{to_email}` is sent its own copy of the message.

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                 |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Yes      | The [API Key](https://app.groundmail.dev/api-keys) you generated in your Groundmail dashboard.                                                                                                              |
| from_email | Yes      | The _From_ address. Use an address on a domain you verified with Groundmail, or `noreply@mail.groundmail.dev` to send only to your own account email. You can also use the `A User<user@email.com>` syntax. |
| to_email   | No       | The _To_ address. If one isn't specified then the _from_email_ is used instead.                                                                                                                             |
| cc         | No       | The _Carbon Copy_ (CC:) portion of the email. This is entirely optional.                                                                                                                                    |
| bcc        | No       | The _Blind Carbon Copy_ (BCC:) portion of the email. This is entirely optional.                                                                                                                             |
| name       | No       | A display name for the `{from_email}`. Do not combine it with the `A User<user@email.com>` syntax.                                                                                                          |
| reply      | No       | Provide a Reply-To email (or set of). More than one can be separated with a space and/or comma.                                                                                                             |
| format     | No       | Groundmail always sends both an HTML and a plain text version of each email. This sets which one your message is written in: `html` (the default) or `text`. The other version is created from it.          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Groundmail notification to yourself (no domain setup needed):

```bash
# Assuming our {apikey} is gm_abc123
# Assuming the email on our Groundmail account is me@example.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   groundmail://gm_abc123:noreply@mail.groundmail.dev/me@example.com
```

Send to your team from a verified domain:

```bash
# Assuming our verified domain is example.com
apprise -vv -t "Backup failed" -b "The nightly backup did not finish." \
   "groundmail://gm_abc123:alerts@example.com/ops@example.com?name=Backups&cc=lead@example.com"
```
