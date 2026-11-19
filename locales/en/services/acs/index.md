---
title: "Azure Communication Services Notifications"
description: "Send email through Azure Communication Services."
sidebar:
  label: "Azure Communication Services"

source: https://azure.microsoft.com/products/communication-services

schemas:
  - acs

has_email: true
has_attachments: true

body_formats:
  - html: default
  - text

keywords: "microsoft"

sample_urls:
  - acs://{from_email}/{access_key}/{endpoint}
  - acs://{from_email}/{access_key}/{endpoint}/{to_email}
  - acs://{from_email}/{access_key}/{endpoint}/{to_email1}/{to_email2}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. In the Azure portal, create an **Email Communication Services** resource.
2. Add a domain to it. An Azure-managed domain works.
3. Create a **Communication Services** resource.
4. Connect the email domain to the Communication Services resource.
5. In the Communication Services resource, open **Keys**.
6. Copy the **Endpoint** and an **Access Key**.
7. In the email domain, open **MailFrom addresses** and pick the sender to use, such as `DoNotReply@xxxx.azurecomm.net`.

:::tip
`azure://` is a different service. It sends from a [Microsoft 365](/services/office365/) mailbox. Use `acs://` for Azure Communication Services.
:::

## Syntax

Valid syntax is as follows:

- `acs://{from_email}/{access_key}/{endpoint}`
- `acs://{from_email}/{access_key}/{endpoint}/{to_email}`
- `acs://{from_email}/{access_key}/{endpoint}/{to_email1}/{to_email2}`

If the access key contains `//`, write each `/` as `%2F`, or use `?key=`.

## Parameter Breakdown

| Variable   | Required | Description                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------- |
| from_email | Yes      | A sender address of the connected domain. Also `from=`.                         |
| access_key | Yes      | The access key from the **Keys** page. Also `key=`.                             |
| endpoint   | Yes      | The endpoint host, such as `contoso.communication.azure.com`. Also `endpoint=`. |
| to_email   | No       | One or more recipients. With none, the email goes to the from_email.            |
| cc         | No       | Carbon copy addresses. You can add a name: `Name <email>`.                      |
| bcc        | No       | Blind carbon copy addresses.                                                    |
| reply      | No       | Reply-to addresses. You can add a name: `Name <email>`.                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an email:

```bash
apprise -vv -t "Test Title" -b "Test Body" \
   "acs://DoNotReply@xxxx.azurecomm.net/{access_key}/contoso.communication.azure.com/you@example.com"
```
