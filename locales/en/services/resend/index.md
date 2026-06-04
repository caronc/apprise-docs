---
title: "Resend Notifications"
description: "Send Resend notifications."
sidebar:
  label: "Resend"

source: https://resend.com/

schemas:
  - resend

has_attachments: true

sample_urls:
  - resend://{apikey}:{from_email}
  - resend://{apikey}:{from_email}/{to_email}
  - resend://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Creating an account with Resend is free of charge and can be done through their main page.

Once you have an account and access to [your dashboard](https://resend.com/). You will need to ensure you've correctly **authenticated your domains** with them; this is done from the [Domains](https://resend.com/domains) section of your dashboard.

The last thing you need is to generate an **API Key** with at least the **Sending** permission. This can also be done through your dashboard in the [API Keys](https://resend.com/api-keys) section of your dashboard.

## Syntax

Valid syntax is as follows:

- `resend://{apikey}:{from_email}`
- `resend://{apikey}:{from_email}/{to_email}`
- `resend://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Yes      | The [API Key](https://resend.com/api-keys) you generated from within your Resend dashboard.                                                                                                                                                                                                                                                                                                                                                                                            |
| from_email | Yes      | This is the email address will identify the email's origin (the _From_ address). This address **must** contain a domain that was previously authenticated with your Resend account (See [Domain](https://resend.com/domains) section of API).                                                                                                                                                                                                                                          |
| to_email   | No       | This is the email address will identify the email's destination (the _To_ address). If one isn't specified then the _from_email_ is used instead.                                                                                                                                                                                                                                                                                                                                      |
| cc         | No       | The _Carbon Copy_ (CC:) portion of the email. This is entirely optional. It should be noted that Resend immediately rejects emails where the _cc_ contains an email address that exists in the _to_ or the _bcc_ list. To avoid having issues, Apprise automatically eliminates these duplicates silently if detected.                                                                                                                                                                 |
| bcc        | No       | The _Blind Carbon Copy_ (BCC:) portion of the email. This is entirely optional. It should be noted that Resend immediately rejects emails where the _bcc_ contains an email address that exists in the _to_ or the _cc_ list. To avoid having issues, Apprise automatically eliminates these duplicates silently if detected. If an identical email is detected in both the CC and the BCC list, the BCC list will maintain the email and it will drop from the CC list automatically. |
| name       | No       | With respect to `{from_email}`, this allows you to provide a name with your _Reply-To_ address. <br/>**Note:** This field has become redundant and become synonymous to `from=`. It still behaves as it did in previous versions, but you can also follow the `A User<user@email.com>` syntax as well. To eliminate ambiguity; the values parsed from the `from=` will always trump the `name=`.                                                                                       |
| reply      | No       | Provide a Reply-To email (or set of). More than one can be separated with a space and/or comma.                                                                                                                                                                                                                                                                                                                                                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Resend notification:

```bash
# Assuming our {apikey} is re_bcd123-xyz
# Assuming our Authenticated Domain is example.com, we might want to
#  set our {from_email} to noreply@example.com
# Assuming our {to_email} is someone@microsoft.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   resend:///re_bcd123-xyz:noreply@example.com/someone@microsoft.com
```
