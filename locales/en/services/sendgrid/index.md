---
title: "SendGrid Notifications"
description: "Send SendGrid notifications."
sidebar:
  label: "SendGrid"

source: https://sendgrid.com/

schemas:
  - sendgrid

has_email: true
has_attachments: true

sample_urls:
  - sendgrid://{apikey}:{from_email}
  - sendgrid://{apikey}:{from_email}/{to_email}
  - sendgrid://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Creating an account with SendGrid is free of charge and can be done through their main page.

Once you have an account and access to [your dashboard](https://app.sendgrid.com/). You will need to ensure you've correctly **authenticated your domains** with them; this is done in the [Sender Authentication](https://app.sendgrid.com/settings/sender_auth) section of your dashboard. You get here by clicking on **Settings** > **Sender Authentication** from your dashboard.

The last thing you need is to generate an **API Key** with at least the **Mail Send** permission. This can also be done through your dashboard in the [API Keys](https://app.sendgrid.com/settings/api_keys) section of your dashboard. You can get here by clicking on **Settings** > **API Keys**

## Syntax

Valid syntax is as follows:

- `sendgrid://{apikey}:{from_email}`
- `sendgrid://{apikey}:{from_email}/{to_email}`
- `sendgrid://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}`

Template support is also supported as well, You just need to specify the UUID assigned to it as part of the URL:

- `sendgrid://{apikey}:{from_email}/{to_email}?template={template_uuid}`

If you want to take advantage of the `dynamic_template_data` variables, just create arguments prefixed with a plus (+); for example:

- `sendgrid://{apikey}:{from_email}/{to_email}?template={template_uuid}&+{sub1}=value&+{sub2}=value2`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Yes      | The [API Key](https://app.sendgrid.com/settings/api_keys) you generated from within your SendGrid dashboard.                                                                                                                                                                                                                                                                                                                                                                             |
| from_email | Yes      | This is the email address will identify the email's origin (the _From_ address). This address **must** contain a domain that was previously authenticated with your SendGrid account (See [Domain Authentication](https://app.sendgrid.com/settings/sender_auth)).                                                                                                                                                                                                                       |
| to_email   | No       | This is the email address will identify the email's destination (the _To_ address). If one isn't specified then the _from_email_ is used instead.                                                                                                                                                                                                                                                                                                                                        |
| template   | No       | You may optionally specify the UUID of a previously generated SendGrid dynamic template to base the email on.                                                                                                                                                                                                                                                                                                                                                                            |
| cc         | No       | The _Carbon Copy_ (CC:) portion of the email. This is entirely optional. It should be noted that SendGrid immediately rejects emails where the _cc_ contains an email address that exists in the _to_ or the _bcc_ list. To avoid having issues, Apprise automatically eliminates these duplicates silently if detected.                                                                                                                                                                 |
| bcc        | No       | The _Blind Carbon Copy_ (BCC:) portion of the email. This is entirely optional. It should be noted that SendGrid immediately rejects emails where the _bcc_ contains an email address that exists in the _to_ or the _cc_ list. To avoid having issues, Apprise automatically eliminates these duplicates silently if detected. If an identical email is detected in both the CC and the BCC list, the BCC list will maintain the email and it will drop from the CC list automatically. |

<!-- TEMPLATE:SERVICE-PARAMS -->

### Dynamic Template Data

Templates allow you to define {`{variables}`} within them that can be substituted on the fly once the email is sent. You can identify and set these variables using Apprise by simply sticking a plus (+) in front of any parameter you specify on your URL string.

Consider the following template: `d-e624763c71314ea2a1fae38d7fa64a4a`

```text
This is a test email about {{what}}.

You can take a mapped variable on a SendGrid template
and easily swap it with whatever you want using {{app}}.
```

In the above example, we defined the following variables: `what` and `app`.

An Apprise URL might look like:<br/>
`sendgrid://myapikey:noreply@example.com?template=d-e624763c71314ea2a1fae38d7fa64a4a&+what=templates&+app=Apprise`

The above URL would create the following:

```text
This is a test email about templates.

You can take a mapped variable on a SendGrid template
and easily swap it with whatever you want using Apprise.
```

## Examples

Send a SendGrid notification:

```bash
# Assuming our {apikey} is abcd123-xyz
# Assuming our Authenticated Domain is example.com, we might want to
#  set our {from_email} to noreply@example.com
# Assuming our {to_email} is someone@microsoft.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sendgrid:///abcd123-xyz:noreply@example.com/someone@microsoft.com
```
