---
title: "Pingram Notifications"
description: "Send Pingram notifications."
sidebar:
  label: "Pingram"

source: https://www.pingram.io

schemas:
  - pingram

has_sms: true
has_image: true

sample_urls:
  - pingram://{ApiKey}/{Target}
  - pingram://{Type}@{ApiKey}/{Target}

limits:
  max_chars: 160
---

:::note
Pingram is the rebrand of NotificationAPI. If you signed up before the
rebrand and still have a `clientId`/`clientSecret` pair, that integration
is retired: this plugin only accepts a Pingram API key. Your old
credentials may still work if you call the Pingram API directly, but
they are no longer supported through Apprise.
:::

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Pingram lets you trigger email, SMS, calls, push, and in‑app notifications using a single API. The Apprise plugin supports the US, CA, and EU regional hosts. Configure the content once in Pingram, then trigger it from Apprise by sending the notification **type** and **recipient** information, with optional merge‑tag parameters.

1. Create a Pingram account and sign in at [app.pingram.io](https://app.pingram.io/).
2. In your Environment settings, open the **API Keys** section and create a Secret Key (server‑to‑server) or Public Key. It will look like `pingram_sk_AbCdEf012345` or `pingram_pk_AbCdEf012345`.
3. Create or identify the **notification type** you want to trigger (for example, `order_tracking`).
4. Make sure your recipients have the correct identifiers:
   - **Email** notifications require an email address on the `to` object.
   - **SMS** notifications require a phone number in **E.164** format, for example `+15005550006`.
   - You can also address users by a Pingram **user id**, but this is always optional; an email or phone number alone is enough to identify a recipient.
5. If you are hosted outside the US, note your region's API host (US default, CA, or EU).

## Syntax

Valid syntax is as follows:

- `pingram://{ApiKey}/{Target}`
- `pingram://{Type}@{ApiKey}/{Target}`

**Targets** can be combined in a single path. Each `{Target}` segment may be:

- a user id (`userid` or `@userid`) — always optional
- an email (`name@example.com`)
- an E.164 phone number (`+15551234567`)

A recipient id is never required to accompany an email or phone number; a bare email or phone number is enough on its own to identify a new recipient. If you supply one anyway, it is paired with the very next email/phone number in the path:

- `test@example.com` → email only, no id
- `userid/test@example.com` → id + email
- `userid/+15551234567` → id + SMS
- `+15551234567/test@example.com` → two separate recipients (SMS, then email)

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                         |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | No       | Notification type id from your Pingram dashboard. Defaults to `apprise`.                                                                                                                                                            |
| `mode`     | No       | Notification mode; can be either `message` or `template`. Defaults to `message`.                                                                                                                                                    |
| `apikey`   | Yes\*    | Your Pingram API key (`pingram_sk_...` or `pingram_pk_...`). Required unless supplied in the path.                                                                                                                                  |
| `to`       | No       | Comma‑separated list of additional targets.                                                                                                                                                                                         |
| `region`   | No       | `us` (default), `ca`, or `eu` to select the API host.                                                                                                                                                                               |
| `channels` | No       | Channels are detected based on the first target detected. The following channels can be provided: `email`, `sms`, `inapp`, `web_push`, `mobile_push`, `slack` and/or `call`.                                                        |
| `from`     | No       | Display name for the email _From_ identity.                                                                                                                                                                                         |
| `cc`       | No       | Comma‑separated list of CC addresses.                                                                                                                                                                                               |
| `bcc`      | No       | Comma‑separated list of BCC addresses.                                                                                                                                                                                              |
| `:{key}`   | No       | Dynamic template parameter tokens passed to `parameters` (e.g., `:orderId=123`). It's important to prefix each one of these with a colon (`:`) for it to be correctly interpreted. This is only used if `mode` is set to `template` |

\* Required when not already set in the URL path component.

### Pingram Default Parameters

Each Pingram request sent through Apprise includes the following default parameters:

| Parameter        | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `appBody`        | The main message body payload of the notification.                                              |
| `appTitle`       | The message title or subject line.                                                              |
| `appType`        | The Apprise notification type (e.g., `info`, `success`, `warning`, `failure`).                  |
| `appId`          | The Apprise application identifier, usually `apprise`.                                          |
| `appDescription` | The description text configured for the Apprise service.                                        |
| `appColor`       | A colour code associated with the notification type (used by some channels for visual context). |
| `appImageUrl`    | A URL pointing to an icon image representing the notification type.                             |
| `appUrl`         | A URL reference back to the source application (if configured).                                 |

These parameters are always included by Apprise in addition to any custom `:{key}={value}` tokens you provide in your URL.

These defaults are common across all Apprise plugins, in addition to the service‑specific parameters described above.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send to one email recipient by type and let Pingram pick the channel:

```bash
apprise -vv -t "Order Update" -b "Your order shipped." \
   pingram://order_tracking@API_KEY/user@example.com
```

Send the same notification to multiple recipients using path segments:

```bash
apprise -vv -t "Status" -b "Processing complete." \
   pingram://order_tracking@API_KEY/user@example.com/+15552341234/alice_123
```

Force the SMS channel and set the region to Canada:

```bash
apprise -vv -t "Code" -b "Your verification code is 123456" \
   'pingram://order_tracking@API_KEY/+16475550123?channels=sms&region=ca'
```

Set _From_, CC and BCC for an email:

```bash
apprise -vv -t "Release" -b "v2.0.1 is live." \
   'pingram://release_note@API_KEY/dev@example.ca?from=Dev%20Team&cc=qa@example.ca&bcc=ops@example.ca'
```

Pass dynamic template tokens that your Pingram template references:

```bash
apprise -vv -t "Order" -b " " \
   'pingram://order_tracking@API_KEY/user@example.com?:orderId=12345&:status=shipped&mode=template'
```

Use a query‑only form, handy in YAML:

```bash
apprise -vv -t "Hello" -b "Hi there" \
   'pingram://?apikey=API_KEY&type=greeting&to=user@example.com'
```

Minimal (a bare email, no id):

```bash
apprise -vv -t "Welcome" -b "Hello from Apprise" \
   "pingram://welcome_email@API_KEY/test@example.com"
```

EU region + token substitutions:

```bash
apprise -vv -b "<b>Your order shipped!</b>" --format=html \
   "pingram://order_update@API_KEY/test@example.com?region=eu&:firstName=Chris&:trackingUrl=https://t.example/ABC123&mode=template"
```

Setting From / CC / BCC / Reply‑To (email):

```bash
apprise -vv -b "Body" \
   "pingram://newsletter@API_KEY/test@example.com?from=Team<team@example.com>&cc=dev@example.com&bcc=ops@example.com&reply=help@example.com"
```
