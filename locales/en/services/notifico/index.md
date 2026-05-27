---
title: "Notifico Notifications"
description: "Send Notifico notifications to IRC channels."
sidebar:
  label: "Notifico"

source: https://notifico.tech/

schemas:
  - notifico: insecure
  - notificos

has_selfhosted: true

sample_urls:
  - notifico://{ProjectID}/{MessageHook}
  - notifico://{host}/{ProjectID}/{MessageHook}
  - notificos://{host}/{ProjectID}/{MessageHook}

limits:
  max_chars: 512
---

<!-- SERVICE:DETAILS -->

## Account Setup

Notifico allows you to send a message to one or more IRC Channel(s). The original hosted service at [n.tkte.ch](https://n.tkte.ch) has gone offline, but the project is open source and can be [self-hosted](https://notifico.tech/).

### Official / Legacy Setup (n.tkte.ch)

1. Visit <https://n.tkte.ch> and sign up for an account.
1. Create a project; either manually or sync with GitHub.
1. From within the project, create a **Plain Text Message Hook**.
   ![notifico plain text hook](./images/66708086-3f17cb00-ed19-11e9-8e37-bc7e6ba5a3cd.png)

Once your hook has been created successfully, from the main project page retrieve the link needed to send your messages:
![notifico hook capture instructions](./images/66708104-6c647900-ed19-11e9-895e-d5f755d05079.png)

The URL will look something like this:

```text
       https://n.tkte.ch/h/2144/uJmKaBW9WFk42miB146ci3Kj
                            ^                ^
                            |                |
                         project id       message hook
```

From the example above:

1. **ProjectID** is `2144`
2. **MessageHook** is `uJmKaBW9WFk42miB146ci3Kj`

### Self-Hosted Setup

Deploy a Notifico instance by following the instructions at <https://notifico.tech/>. Once running, create a project and a Plain Text Message Hook exactly as described above. Use the hostname (and optional port) of your instance in the Apprise URL.

## Syntax

You can pass in the native `n.tkte.ch` URL directly:

- `https://n.tkte.ch/h/{ProjectID}/{MessageHook}`

Or use one of the Apprise URL forms below.

**Official endpoint (n.tkte.ch):**

- `notifico://{ProjectID}/{MessageHook}`

**Self-hosted instance (HTTP):**

- `notifico://{host}/{ProjectID}/{MessageHook}`
- `notifico://{host}:{port}/{ProjectID}/{MessageHook}`
- `notifico://{user}@{host}/{ProjectID}/{MessageHook}`
- `notifico://{user}:{password}@{host}/{ProjectID}/{MessageHook}`
- `notifico://{user}:{password}@{host}:{port}/{ProjectID}/{MessageHook}`

**Self-hosted instance (HTTPS):**

- `notificos://{host}/{ProjectID}/{MessageHook}`
- `notificos://{host}:{port}/{ProjectID}/{MessageHook}`
- `notificos://{user}@{host}/{ProjectID}/{MessageHook}`
- `notificos://{user}:{password}@{host}/{ProjectID}/{MessageHook}`
- `notificos://{user}:{password}@{host}:{port}/{ProjectID}/{MessageHook}`

You can optionally turn colors off (on by default):

- `notifico://{ProjectID}/{MessageHook}?color=off`

You can optionally turn the notification-type prefix off (on by default):

- `notifico://{ProjectID}/{MessageHook}?prefix=off`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                                                                                                                               |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ProjectID   | Yes      | The project ID is an integer and makes up the first part of the provided Notifico Message Hook URL. For the official endpoint it is placed in the host position of the URL; for self-hosted instances it follows the hostname.                                            |
| MessageHook | Yes      | The message hook token found at the end of the provided Notifico Message Hook URL.                                                                                                                                                                                        |
| host        | No       | The hostname (or IP address) of a self-hosted Notifico instance. When omitted, notifications are sent to the official `n.tkte.ch` endpoint.                                                                                                                              |
| port        | No       | The port of the self-hosted instance. Defaults to 80 (HTTP) or 443 (HTTPS) when not specified.                                                                                                                                                                           |
| user        | No       | An optional username for HTTP Basic Auth on a self-hosted instance.                                                                                                                                                                                                       |
| password    | No       | An optional password for HTTP Basic Auth on a self-hosted instance.                                                                                                                                                                                                       |
| color       | No       | Uses IRC coloring to provide a richer experience. It also allows the parsing of IRC colors found in the notification passed in. You must ensure the **Color** checkbox is selected when setting up your Message Hook for this to work. By default this is set to **Yes**. |
| prefix      | No       | All messages sent to IRC by default have a prefix that helps identify the type of message (info, error, warning, or success) as well as the system performing the notification. By default this is set to **Yes**.                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Notifico notification to the official endpoint:

```bash
# Assuming our {ProjectID} is 2144
# Assuming our {MessageHook} is uJmKaBW9WFk42miB146ci3Kj
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   notifico://2144/uJmKaBW9WFk42miB146ci3Kj
```

Send a Notifico notification to a self-hosted instance over HTTP:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   notifico://myhost.example/2144/uJmKaBW9WFk42miB146ci3Kj
```

Send a Notifico notification to a self-hosted instance over HTTPS with auth:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   notificos://user:password@myhost.example:8443/2144/uJmKaBW9WFk42miB146ci3Kj
```
