---
title: "NotificationAPI Notifications"
description: "Send NotificationAPI notifications."
sidebar:
  label: "NotificationAPI"

source: https://www.notificationapi.com

schemas:
  - napi
  - notificationapi

has_sms: true
has_image: true

ended: 2026

sample_urls:
  - napi://{ClientID}/{ClientSecret}/{Target}
  - napi://{Type}@{ClientID}/{ClientSecret}/{Target}

limits:
  max_chars: 160
---

:::note

## Service End Reason

NotificationAPI rebranded to [Pingram](https://www.pingram.io) in 2026. This is not a shutdown — the underlying service is alive and well, just renamed. Apprise's `napi://`/`notificationapi://` integration has been retired in favor of a dedicated [`pingram://`](/services/pingram/) plugin built for the current API.

If you still have a `clientId`/`clientSecret` pair issued before the rebrand, it may continue to work if you call the Pingram API directly, but it is no longer supported through this Apprise plugin. New Pingram accounts issue a single API key instead, which the `pingram://` plugin uses in place of the retired credential pair.
:::

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

NotificationAPI lets you trigger email, SMS, calls, push, and in‑app notifications using a single API. The Apprise plugin supports the US, CA, and EU regional hosts. Configure the content once in NotificationAPI, then trigger it from Apprise by sending the notification **type** and **recipient** information, with optional merge‑tag parameters.

1. Create a NotificationAPI account and sign in.
2. In the dashboard, locate your **clientId** and **clientSecret** under _Environments_.
3. Create or identify the **notification type** you want to trigger (for example, `order_tracking`).
4. Make sure your recipients have the correct identifiers:
   - **Email** notifications require an email address on the `to` object.
   - **SMS** notifications require a phone number in **E.164** format, for example `+15005550006`.
   - You can also address users by a NotificationAPI **user id**.
5. If you are hosted outside the US, note your region’s API host (US default, CA, or EU).

## Syntax

Valid syntax is as follows (both `napi://` and `notificationapi://` are accepted aliases):

- `napi://{ClientID}/{ClientSecret}/{Target}`
- `napi://{Type}@{ClientID}/{ClientSecret}/{Target}`

**Targets** can be combined in a single path and are grouped by a leading **id**. Each `{Target}` segment may be:

- a user id (`userid` or `@userid`)
- an email (`name@example.com`)
- an E.164 phone number (`+15551234567`)

Examples of grouped targets:

- `userid/test@example.com` → id + email
- `userid/+15551234567` → id + SMS
- `userid/+15551234567/test@example.com` → id + SMS + email

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                         |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | No       | Notification type id from your NotificationAPI dashboard. Defaults to `apprise`.                                                                                                                                                    |
| `mode`     | No       | Notification mode; can be either `message` or `template`. Defaults to `message`.                                                                                                                                                    |
| `id`       | Yes\*    | Client id. Required unless supplied in the path.                                                                                                                                                                                    |
| `secret`   | Yes\*    | Client secret. Required unless supplied in the path.                                                                                                                                                                                |
| `to`       | No       | Comma‑separated target; each subset of targets must have and `id` associated with them                                                                                                                                              |
| `region`   | No       | `us` (default), `ca`, or `eu` to select the API host.                                                                                                                                                                               |
| `channels` | No       | Channels are detected based on first target detected. The following channels can be proivded: `email`, `sms` , `inapp`, `web_push`, `mobile_push` and/or `slack`.                                                                   |
| `from`     | No       | Display name for the email _From_ identity.                                                                                                                                                                                         |
| `cc`       | No       | Comma‑separated list of CC addresses.                                                                                                                                                                                               |
| `bcc`      | No       | Comma‑separated list of BCC addresses.                                                                                                                                                                                              |
| `:{key}`   | No       | Dynamic template parameter tokens passed to `parameters` (e.g., `:orderId=123`). It's important to prefix each one of these with a colon (`:`) for it to be correctly interpreted. This is only used if `mode` is set to `template` |

\* Required when not already set in the URL path component.

### NotificationAPI Default Parameters

Each NotificationAPI request sent through Apprise includes the following default parameters:

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

Send to one email recipient by type and let NotificationAPI pick the channel:

```bash
apprise -vv -t "Order Update" -b "Your order shipped."   napi://order_tracking@CLIENT_ID/CLIENT_SECRET/id/user@example.com
```

Send the same notification to multiple recipients using path segments:

```bash
apprise -vv -t "Status" -b "Processing complete."   napi://order_tracking@CLIENT_ID/CLIENT_SECRET/\
     id/user@example.com/+15552341234/alice_123
```

Force the SMS channel and set the region to Canada:

```bash
apprise -vv -t "Code" -b "Your verification code is 123456"   'napi://order_tracking@CLIENT_ID/CLIENT_SECRET/id/+16475550123?channel=sms&region=ca'
```

Set _From_, CC and BCC for an email:

```bash
apprise -vv -t "Release" -b "v2.0.1 is live."   'napi://release_note@CLIENT_ID/CLIENT_SECRET/id/dev@example.ca?from=Dev%20Team&cc=qa@example.ca&bcc=ops@example.ca'
```

Pass dynamic template tokens that your NotificationAPI template references:

```bash
apprise -vv -t "Order" -b " "   'napi://order_tracking@CLIENT_ID/CLIENT_SECRET/user@example.com?:orderId=12345&:status=shipped'
```

Use a query‑only form, handy in YAML:

```bash
apprise -vv -t "Hello" -b "Hi there"   'napi://?id=CLIENT_ID&secret=CLIENT_SECRET&type=greeting&to=id,user@example.com'
```

Minimal (id + email):

```bash
apprise -vv -t "Welcome" -b "Hello from Apprise"   "napi://welcome_email@CID/SECRET/user123/test@example.com"
```

EU region + token substitutions

```bash
apprise -vv -b "<b>Your order shipped!</b>" --format=html   "napi://order_update@CID/SECRET/user123/test@example.com?region=eu&:firstName=Chris&:trackingUrl=https://t.example/ABC123"
```

Setting From / CC / BCC / Reply‑To (email)

```bash
apprise -vv -b "Body"   "napi://newsletter@CID/SECRET/user123/test@example.com?from=Team<team@example.com>&cc=dev@example.com&bcc=ops@example.com&reply=help@example.com"
```
