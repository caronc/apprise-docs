---
title: "Evolution API Notifications"
description: "Send WhatsApp notifications via a self-hosted Evolution API instance."
sidebar:
  label: "Evolution API"

source: https://github.com/EvolutionAPI/evolution-api

schemas:
  - evolution: insecure
  - evolutions

has_selfhosted: true

sample_urls:
  - evolution://{apikey}@{host}/{instance}/{phoneNo}
  - evolutions://{apikey}@{host}/{instance}/{phoneNo}
  - evolution://{apikey}@{host}:{port}/{instance}/{phoneNo1}/{phoneNo2}

limits:
  max_chars: 65536
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Evolution API](https://github.com/EvolutionAPI/evolution-api) is a self-hosted WhatsApp gateway that exposes a REST API on top of the WhatsApp Web protocol.

### 1. Deploy Evolution API

The recommended way is via Docker:

```bash
docker run -d \
  -p 8080:8080 \
  --name evolution-api \
  atendai/evolution-api:latest
```

Full deployment instructions and docker-compose examples are available in the [official repository](https://github.com/EvolutionAPI/evolution-api).

### 2. Create and connect an instance

1. Open the Evolution API dashboard (e.g. `http://yourserver:8080`).
2. Create a new **instance** and give it a name (e.g. `MyInstance`).
3. Scan the **QR code** shown in the dashboard with the WhatsApp mobile app to link your account.
4. Once connected, the instance status will change to **open**.

### 3. Obtain your API key

The API key is displayed in the instance settings page of the dashboard. Copy it — you will use it as `{apikey}` in the Apprise URL.

### Phone number format

All phone numbers must be supplied in **international format without the leading `+`**, e.g.:

| Country | Number            | Format for Apprise |
| ------- | ----------------- | ------------------ |
| Brazil  | +55 11 99999-9999 | `5511999999999`    |
| USA     | +1 (555) 123-4567 | `15551234567`      |
| Germany | +49 30 12345678   | `493012345678`     |

## Syntax

Plain HTTP (default port 80):

- `evolution://{apikey}@{host}/{instance}/{phoneNo}`
- `evolution://{apikey}@{host}:{port}/{instance}/{phoneNo}`

HTTPS (default port 443):

- `evolutions://{apikey}@{host}/{instance}/{phoneNo}`
- `evolutions://{apikey}@{host}:{port}/{instance}/{phoneNo}`

Multiple recipients:

- `evolution://{apikey}@{host}/{instance}/{phoneNo1}/{phoneNo2}/{phoneNoN}`

Extra recipients via query parameter:

- `evolution://{apikey}@{host}/{instance}/{phoneNo}?to={phoneNo2}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                          |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | The API Key shown in your Evolution API instance settings.                                                                                           |
| host     | Yes      | The hostname or IP address where Evolution API is running.                                                                                           |
| port     | No       | The port Evolution API listens on. Defaults to **80** for `evolution://` and **443** for `evolutions://`.                                            |
| instance | Yes      | The name of the WhatsApp instance you created in the Evolution API dashboard.                                                                        |
| phoneNo  | Yes      | One or more destination phone numbers in international format without the leading `+`. Delimit multiple numbers with a forward slash `/` in the URL. |
| to       | No       | Alias for `phoneNo`. Can be used as a query parameter (`?to=`) to specify additional recipients.                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a WhatsApp message over HTTP:

```bash
# Assuming our {apikey} is abc123secret
# Assuming our Evolution API is running at myserver.local:8080
# Assuming our instance name is MyInstance
# Assuming the destination number is +55 11 99999-9999
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "evolution://abc123secret@myserver.local:8080/MyInstance/5511999999999"
```

Send over HTTPS (Evolution API behind a reverse proxy with TLS):

```bash
# Assuming our {apikey} is abc123secret
# Assuming our Evolution API is reachable at api.example.com (HTTPS)
# Assuming our instance name is MyInstance
apprise -vv -t "Alert" -b "Server is down!" \
   "evolutions://abc123secret@api.example.com/MyInstance/5511999999999"
```

Send to multiple recipients:

```bash
# Notify two numbers in a single command
apprise -vv -t "Broadcast" -b "Maintenance window starts in 30 minutes" \
   "evolution://abc123secret@myserver.local:8080/MyInstance/5511999999999/5521888888888"
```
