---
title: "Evolution API Notifications"
description: "Send WhatsApp notifications via a self-hosted Evolution API instance."
sidebar:
  label: "Evolution API"

source: https://github.com/EvolutionAPI/evolution-api

schemas:
  - evolution
  - evolutions

has_selfhosted: true

sample_urls:
  - evolution://{apikey}@{host}/{instance}/{phoneNo}
  - evolutions://{apikey}@{host}/{instance}/{phoneNo}
  - evolution://{apikey}@{host}:{port}/{instance}/{phoneNo1}/{phoneNo2}

limits:
  max_chars: 65536
---

<!-- SERVICE:DETAILS -->

## Account Setup

[Evolution API](https://github.com/EvolutionAPI/evolution-api) is a self-hosted WhatsApp integration layer. Deploy it on your own server (Docker is recommended) and connect a WhatsApp account by scanning the QR code shown in the dashboard.

Once your instance is connected you will have:
- A **hostname** (or IP) where the API is running
- An **API key** (found in the instance settings)
- An **instance name** you created during setup

Phone numbers must be supplied in international format **without** the leading `+`, e.g. `5511999999999` for a Brazilian mobile number.

## Syntax

Valid syntax is as follows:

- `evolution://{apikey}@{host}/{instance}/{phoneNo}`
- `evolutions://{apikey}@{host}/{instance}/{phoneNo}` *(HTTPS)*
- `evolution://{apikey}@{host}:{port}/{instance}/{phoneNo1}/{phoneNo2}`

## Parameter Breakdown

| Variable | Required | Description |
| -------- | -------- | ----------- |
| apikey   | Yes      | The API Key associated with your Evolution API instance. |
| host     | Yes      | The hostname or IP address where Evolution API is running. |
| port     | No       | The port Evolution API listens on (default 80 for HTTP, 443 for HTTPS). |
| instance | Yes      | The name of the WhatsApp instance created in Evolution API. |
| phoneNo  | Yes      | One or more destination phone numbers in international format without the leading `+`. |
| to       | No       | An alias for `phoneNo`; can be used as a query parameter to add extra targets. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a WhatsApp message via a locally hosted Evolution API instance:

```bash
# Assuming our API key is abc123
# Assuming our Evolution API instance name is MyInstance
# Assuming our destination number is +55 11 99999-9999
apprise -vv -t "Test Title" -b "Test Message Body" \
   evolution://abc123@myserver.example.com/MyInstance/5511999999999
```

Send to multiple recipients over HTTPS on a custom port:

```bash
apprise -vv -t "Alert" -b "Server is down" \
   evolutions://abc123@myserver.example.com:8443/MyInstance/5511999999999/5521888888888
```
