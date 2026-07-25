---
title: "Pinglet Notifications"
description: "Send Pinglet notifications to a topic feed."
sidebar:
  label: "Pinglet"

source: https://pinglet.co.uk/

schemas:
  - pinglet: insecure
  - pinglets

has_selfhosted: true

sample_urls:
  - pinglets://{token}@{hostname}/{namespace}/{topic}
  - pinglets://{token}@{hostname}:{port}/{namespace}/{topic}

limits:
  - name: "Title"
    max_chars: 250
  - name: "Body"
    max_chars: 3000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Sign in to your [Pinglet](https://pinglet.co.uk/) account (or your self-hosted instance) and generate an API key from the account/API section.

Notifications are published to a **topic** within a **namespace**. Both are created automatically the first time you publish to them, so there is nothing to set up in the dashboard ahead of time.

## Syntax

Secure connections (over HTTPS) should be referenced using **pinglets://**, whereas insecure connections (over HTTP) should be referenced using **pinglet://**.

Valid syntax is as follows:

- `pinglet://{token}@{hostname}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}:{port}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}{path}{namespace}/{topic}`

The last form is for a self-hosted Pinglet server sitting behind a reverse-proxy path prefix, where `{path}` is the mount point (for example `/pinglet/`).

## Parameter Breakdown

| Variable   | Required | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| token      | \*Yes    | Your Pinglet API key (can also be passed as `?token=`)       |
| hostname   | \*Yes    | The hostname of your Pinglet server                          |
| port       | No       | The port your Pinglet server is listening on                 |
| namespace  | \*Yes    | The namespace the topic resides in                           |
| topic      | \*Yes    | The topic to publish to                                      |
| priority   | No       | Delivery priority: `silent`, `normal` (default), or `urgent` |
| :key=value | No       | Adds a badge (pill) to the notification card                 |
| +key=value | No       | Adds metadata shown on the notification's detail sheet       |

:::note
Pinglet renders at most 3 badges per notification. Additional `:key=value` entries beyond the third are dropped, and any badge key longer than 24 characters or value longer than 32 characters gets truncated. Metadata (`+key=value`) keys are truncated at 64 characters and values at 256 characters.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a simple Pinglet notification:

```bash
# Assuming our {token} is abc123
# Assuming our {hostname} is app.pinglet.co.uk
apprise -vv -t "Deploy Complete" -b "Build #482 shipped to production" \
   "pinglets://abc123@app.pinglet.co.uk/acme/deploys"
```

Send with a priority, a badge, and metadata:

```bash
apprise -vv -t "Deploy Complete" -b "Build #482 shipped to production" \
   "pinglets://abc123@app.pinglet.co.uk/acme/deploys?priority=urgent&:Host=web-1&+region=eu-west"
```

Send to a self-hosted instance mounted behind a reverse-proxy path prefix:

```bash
apprise -vv -t "Deploy Complete" -b "Build #482 shipped to production" \
   "pinglet://abc123@myhost/prefix/acme/deploys"
```
