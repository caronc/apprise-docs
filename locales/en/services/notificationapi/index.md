---
title: "NotificationAPI (now Pingram) Notifications"
description: "Send NotificationAPI (Pingram) notifications."
sidebar:
  label: "NotificationAPI (Pingram)"

source: https://www.pingram.io

schemas:
  - napi
  - notificationapi

has_sms: true
has_image: true

sample_urls:
  - napi://{ApiKey}/{Target}
  - napi://{ClientID}/{ClientSecret}/{Target}
  - napi://{Type}@{ClientID}/{ClientSecret}/{Target}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::note
NotificationAPI has rebranded to [Pingram](https://www.pingram.io). The `napi://` and `notificationapi://` URL schemes are unchanged and remain fully backwards compatible. What changed is authentication: new Pingram accounts issue a single API key instead of the legacy `clientId`/`clientSecret` pair. Both formats are documented below.
:::

## Account Setup

NotificationAPI (now Pingram) lets you trigger email, SMS, calls, push, and in‑app notifications using a single API. The Apprise plugin supports the US, CA, and EU regional hosts. Configure the content once in your dashboard, then trigger it from Apprise by sending the notification **type** and **recipient** information, with optional merge‑tag parameters.

1. Create a Pingram account and sign in.
2. Obtain your credentials. This depends on whether your account predates the rebrand:
   - **Current (Pingram) accounts:** locate your API key under the **API Keys** (or **Environments**) section of the dashboard. Keys are prefixed `pingram_sk_` (secret key) or `pingram_pk_` (public key).
   - **Legacy (pre‑rebrand NotificationAPI) accounts:** locate your **clientId** and **clientSecret** under _Environments_. This pairing still works, but is deprecated in favour of a single API key.
3. Create or identify the **notification type** you want to trigger (for example, `order_tracking`).
4. Make sure your recipients have the correct identifiers:
   - **Email** notifications require an email address on the `to` object.
   - **SMS** notifications require a phone number in **E.164** format, for example `+15005550006`.
   - You can also address users by a Pingram/NotificationAPI **user id**. With a Pingram API key, the `id` is now optional alongside an email or phone target; with a legacy `clientId`/`clientSecret` pair, an `id` is still required.
5. If you are hosted outside the US, note your region’s API host (US default, CA, or EU).

## Syntax

Valid syntax is as follows (both `napi://` and `notificationapi://` are accepted aliases). Apprise automatically detects a Pingram API key by its `pingram_sk_`/`pingram_pk_` prefix, so no extra flag is needed to select the current, single‑credential format:

**Current (Pingram API key):**

- `napi://{ApiKey}/{Target}`
- `napi://{Type}@{ApiKey}/{Target}`
- `napi://{ApiKey}/{Id}/{Target}` (an `id` may still optionally be supplied)

**Legacy (deprecated, NotificationAPI clientId/clientSecret):**

- `napi://{ClientID}/{ClientSecret}/{Target}`
- `napi://{Type}@{ClientID}/{ClientSecret}/{Target}`

**Targets** can be combined in a single path and are grouped by a leading **id**. Each `{Target}` segment may be:

- a user id (`userid` or `@userid`) — required to start a new group with a legacy `clientId`/`clientSecret` pair; optional with a Pingram API key
- an email (`name@example.com`)
- an E.164 phone number (`+15551234567`)

Examples of grouped targets:

- `userid/test@example.com` → id + email
- `userid/+15551234567` → id + SMS
- `userid/+15551234567/test@example.com` → id + SMS + email
- `+15551234567` → SMS with no id (Pingram API key only)

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                         |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | No       | Notification type id from your NotificationAPI dashboard. Defaults to `apprise`.                                                                                                                                                    |
| `mode`     | No       | Notification mode; can be either `message` or `template`. Defaults to `message`.                                                                                                                                                    |
| `id`       | Yes\*    | Client id, or a Pingram API key (`pingram_sk_…`/`pingram_pk_…`). Required unless supplied in the path.                                                                                                                              |
| `secret`   | Yes\*\*  | Client secret. Only applies to a legacy `clientId`; not used (and not required) when `id` is a Pingram API key.                                                                                                                    |
| `to`       | No       | Comma‑separated target. With a legacy `clientId`/`clientSecret` pair, each subset of targets must have an `id` associated with them; with a Pingram API key, the `id` is optional.                                                |
| `region`   | No       | `us` (default), `ca`, or `eu` to select the API host.                                                                                                                                                                               |
| `channels` | No       | Channels are detected based on first target detected. The following channels can be proivded: `email`, `sms` , `inapp`, `web_push`, `mobile_push` and/or `slack`.                                                                   |
| `from`     | No       | Display name for the email _From_ identity.                                                                                                                                                                                         |
| `cc`       | No       | Comma‑separated list of CC addresses.                                                                                                                                                                                               |
| `bcc`      | No       | Comma‑separated list of BCC addresses.                                                                                                                                                                                              |
| `:{key}`   | No       | Dynamic template parameter tokens passed to `parameters` (e.g., `:orderId=123`). It's important to prefix each one of these with a colon (`:`) for it to be correctly interpreted. This is only used if `mode` is set to `template` |

\* Required when not already set in the URL path component.  
\*\* Required only alongside a legacy `clientId`; never required alongside a Pingram API key.

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

### Current (Pingram API key)

Send an SMS notification; no recipient `id` is required with a Pingram API key:

```bash
apprise -vv -t "Order Update" -b "Your order shipped." \
   napi://pingram_sk_abc123/+15551234567
```

Send an email notification the same way, letting Pingram pick the channel:

```bash
apprise -vv -t "Welcome" -b "Hello from Apprise" \
   napi://pingram_sk_abc123/user@example.com
```

An `id` can still optionally be supplied alongside a target:

```bash
apprise -vv -t "Order Update" -b "Your order shipped." \
   napi://pingram_sk_abc123/myid/+15551234567
```

### Legacy (deprecated, clientId/clientSecret)

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
