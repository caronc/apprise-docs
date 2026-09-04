---
title: "SendPulse Notifications"
description: "Send SendPulse notifications."
sidebar:
  label: "SendPulse"

source: https://sendpulse.com/

schemas:
  - sendpulse

has_email: true
has_attachments: true

body_formats:
  - html: default
  - text

sample_urls:
  - sendpulse://{user}@{host}/{client_id}/{client_secret}
  - sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email}
  - sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Message Format

SendPulse sends HTML email by default. Set `?format=text` when you want to send a plain-text email instead.

## Account Setup

Once you have an account and access to [your dashboard](https://app.sendpulse.com/). You will need to ensure you acquire your Client ID and Client Secret in order to construct the Apprise URLs

## Syntax

Valid syntax is as follows:

- `sendpulse://{user}@{host}/{client_id}/{client_secret}`
- `sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email}`
- `sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email1}/{to_email2}/{to_email3}`

Template support is also supported as well, You just need to specify the integer assigned to it as part of the URL:

- `sendpulse://{user}@{host}/{client_id}/{client_secret}/:{to_email}?template={temlate_int}`

If you want to take advantage of the `dynamic_template_data` variables, just create arguments prefixed with a plus (+); for example:

- `sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email}?template={template_int}&+{sub1}=value&+{sub2}=value2`

## Parameter Breakdown

| Variable      | Required | Description                                                                                                                                       |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| user          | Yes      | Combined with the `host`, it constructs the email address you have configured with your SendPulse account.                                        |
| host          | Yes      | Combined with the `user`, it constructs the email address you have configured with your SendPulse account.                                        |
| client_id     | Yes      | The Client ID associated with your SendPulse account.                                                                                             |
| client_secret | Yes      | The Client Secret associated with your SendPulse account.                                                                                         |
| from          | No       | You can optionally identify who the email is from if you wish.                                                                                    |
| to_email      | No       | This is the email address will identify the email's destination (the _To_ address). If one isn't specified then the _from_email_ is used instead. |
| template      | No       | You may optionally specify the integer of a previously generated SendPulse template to base the email on.                                         |
| cc            | No       | The _Carbon Copy_ (CC:) portion of the email. This is entirely optional.                                                                          |
| bcc           | No       | The _Blind Carbon Copy_ (BCC:) portion of the email.                                                                                              |

### Dynamic Template Data

Apprise has template support for SendPulse. Just define the `?template=` and the optional arguments you want to set. You can identify and set these variables using Apprise by simply sticking a plus (+) in front of any parameter you specify on your URL string.

Consider the following template: `1234`

An Apprise URL might look like:<br/>
`sendpulse://user@example.com?template=1234&+what=templates&+app=Apprise`

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a SendPulse notification:

```bash
# Assuming our {user} is user@example.com
# Assuming our {client_id} is client_id
# Assuming our {client_secret} is client_secret
# Assuming we want to send an email to target@example.com
# Assuming our {to_email} is someone@microsoft.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sendpulse:///user@example.com/client_id/client_secret/target@example.com
```
