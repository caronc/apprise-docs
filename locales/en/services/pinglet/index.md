---
title: "Pinglet Notifications"
description: "Send Pinglet notifications."
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

Sign in to your [Pinglet](https://pinglet.co.uk/) account (or your self-hosted instance) and generate an API key. Notifications are published to a **topic** within a **namespace**; both are created automatically on first publish.

## Syntax

Secure connections (via https) should be referenced using **pinglets://** whereas insecure connections (via http) should be referenced via **pinglet://**.

Valid syntax is as follows:

- `pinglet://{token}@{hostname}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}:{port}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}{path}/{namespace}/{topic}`

## Parameter Breakdown

| Variable   | Required | Description                                                     |
| ---------- | -------- | --------------------------------------------------------------- |
| token      | Yes      | Your Pinglet API key (can also be passed as `?token=`)          |
| hostname   | Yes      | The Pinglet server you're sending your notification to          |
| port       | No       | The port your Pinglet server is listening on                    |
| namespace  | Yes      | The namespace the topic resides in                              |
| topic      | Yes      | The topic to publish to                                         |
| priority   | No       | Delivery priority: `silent`, `normal` (default), or `urgent`    |
| :key=value | No       | Adds a badge (pill) to the notification card; up to 3 supported |
| +key=value | No       | Adds metadata shown on the notification's detail sheet          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Pinglet notification:

```bash
# Assuming our {token} is abc123
# Assuming our {hostname} is app.pinglet.co.uk
apprise -vv -t "Deploy Complete" -b "Build #482 shipped to production" \
   "pinglets://abc123@app.pinglet.co.uk/acme/deploys"
```

With a priority, a badge, and metadata:

```bash
apprise -vv -t "Deploy Complete" -b "Build #482 shipped to production" \
   "pinglets://abc123@app.pinglet.co.uk/acme/deploys?priority=urgent&:Host=web-1&+region=eu-west"
```
