---
title: "Flowtriq Notifications"
description: "Send Flowtriq notifications for DDoS detection alerting."
sidebar:
  label: "Flowtriq"

source: https://flowtriq.com

schemas:
  - flowtriq: insecure
  - flowtriqs

has_selfhosted: true

sample_urls:
  - flowtriqs://{apikey}@{hostname}/{webhook_path}
  - flowtriq://{apikey}@{hostname}:{port}/{webhook_path}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Flowtriq](https://flowtriq.com) is a DDoS detection and mitigation platform. Apprise integrates with it via webhook channels configured in the Flowtriq dashboard.

1. Log in to your Flowtriq dashboard and navigate to the Webhooks or Integrations section.
2. Create a new webhook channel and give it a name.
3. Copy the webhook URL and the API Key that the dashboard provides. For example:
   - Webhook URL: `https://flowtriq.com/hooks/abc123`
   - API Key: `ft_key_xxxx`

The webhook URL is broken into two parts for the Apprise URL: the **hostname** (`flowtriq.com`) and the **webhook path** (`hooks/abc123`). The **API Key** is placed in the user credential position.

Your Apprise URL becomes (using HTTPS):

```text
flowtriqs://ft_key_xxxx@flowtriq.com/hooks/abc123
```

For a self-hosted instance over plain HTTP, use `flowtriq://` instead:

```text
flowtriq://ft_key_xxxx@myhost/hooks/abc123
```

Apprise maps notification types to Flowtriq severity levels as follows:

| Apprise type | Flowtriq severity |
| ------------ | ----------------- |
| `info`       | `info`            |
| `success`    | `success`         |
| `warning`    | `warning`         |
| `failure`    | `critical`        |

## Syntax

Valid syntax is as follows:

- `flowtriqs://{apikey}@{hostname}/{webhook_path}`
- `flowtriqs://{apikey}@{hostname}:{port}/{webhook_path}`
- `flowtriq://{apikey}@{hostname}/{webhook_path}`
- `flowtriq://{apikey}@{hostname}:{port}/{webhook_path}`

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                                                                                           |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey       | \*Yes    | The API Key provided by your Flowtriq dashboard. It is passed to the webhook endpoint via the `X-API-Key` HTTP header.                                                                                                |
| hostname     | \*Yes    | The hostname of the Flowtriq server (or your self-hosted instance). For the Flowtriq cloud service this is `flowtriq.com`.                                                                                            |
| webhook_path | \*Yes    | The path component of the webhook URL provided by the Flowtriq dashboard (everything after the hostname). For example, if the webhook URL is `https://flowtriq.com/hooks/abc123`, the webhook path is `hooks/abc123`. |
| port         | No       | The port the Flowtriq server listens on. Defaults to **443** for the `flowtriq://` schema.                                                                                                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Flowtriq notification using the cloud service (HTTPS):

```bash
# Assuming our {apikey} is ft_key_xxxx
# Assuming our {hostname} is flowtriq.com
# Assuming our {webhook_path} is hooks/abc123

apprise -vv -t "DDoS Alert" -b "Attack detected on 192.0.2.1" \
   "flowtriqs://ft_key_xxxx@flowtriq.com/hooks/abc123"
```

Send a Flowtriq notification to a self-hosted instance over HTTP:

```bash
# Assuming our {apikey} is mykey
# Assuming our self-hosted {hostname} is monitor.example.com
# Assuming our {webhook_path} is api/v1/webhook/xyz

apprise -vv -t "Alert Title" -b "Alert body text" \
   "flowtriq://mykey@monitor.example.com/api/v1/webhook/xyz"
```

Send to a self-hosted instance over HTTPS on a non-default port:

```bash
apprise -vv -t "Alert Title" -b "Alert body text" \
   "flowtriqs://mykey@monitor.example.com:8443/api/v1/webhook/xyz"
```
