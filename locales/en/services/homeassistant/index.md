---
title: "Home Assistant Notifications"
description: "Send Home Assistant persistent or service notifications."
sidebar:
  label: "Home Assistant"

source: https://www.home-assistant.io/

schemas:
  - hassio: insecure
  - hassios

has_selfhosted: true

limits:
  max_chars: 4096

sample_urls:
  - hassio://{host}/{access_token}
  - hassio://{host}/{access_token}/{service}
  - hassio://{host}/{access_token}/{domain}.{service}:{target}
---

<!-- SERVICE:DETAILS -->

:::tip[Using Apprise from within Home Assistant?]
This page covers sending notifications **to** Home Assistant from Apprise.
If you want to use Apprise **from within** Home Assistant to fan out to
other services (email, Telegram, etc.), see the
[Home Assistant Integration Guide](/guides/hassio/).
:::

## Account Setup

1. Log into your Home Assistant instance and navigate to your **Profile** page.
2. Scroll to the very bottom and click **Create Token** under
   **Long-Lived Access Tokens**.
3. Give it a name (e.g. _Apprise_) and copy the generated token — you
   will not be able to view it again.

## Syntax

There are two operating modes depending on whether you include a
service target in the URL.

### Persistent Notification Mode (default)

When no service target is provided, Apprise posts a
[persistent notification](https://www.home-assistant.io/integrations/persistent_notification/)
to the Home Assistant dashboard.

```text
hassio://{host}/{access_token}
hassios://{host}/{access_token}
hassio://{host}:{port}/{access_token}
```

By default a new unique notification is created on every send. To
instead **replace** the previous notification (useful for status
updates), pin a fixed notification ID with `?nid=`:

```text
hassio://{host}/{access_token}?nid=myid
```

### Service Notification Mode

Append one or more service targets after the access token to call any
Home Assistant service directly. This supports mobile app push
notifications, TTS, media players, and any other HA service domain.

```text
hassio://{host}/{access_token}/{service}
hassio://{host}/{access_token}/{domain}.{service}
hassio://{host}/{access_token}/{domain}.{service}:{target}
hassio://{host}/{access_token}/{domain}.{service}:{t1},{t2}
```

Multiple targets can be specified as slash-separated path segments:

```text
hassio://{host}/{access_token}/{service1}/{domain}.{service2}:{target}
```

The **default domain** is `notify` when none is specified, so
`hassio://host/token/mobile_app_phone` is equivalent to
`hassio://host/token/notify.mobile_app_phone`.

:::tip[Finding your service name]
In Home Assistant, go to **Developer Tools → Services**. The service
names listed there map directly to `{domain}.{service}` in the Apprise
URL. For mobile app push notifications the service is usually named
`notify.mobile_app_{device_name}` where `{device_name}` matches what
appears in the HA companion app settings.
:::

#### Reverse-Proxy Path Prefix

If your Home Assistant instance is served under a sub-path (e.g.
behind a reverse proxy at `/ha`), supply it with `?prefix=`:

```text
hassio://{host}/{access_token}/{service}?prefix=/ha
```

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                          |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| host         | Yes      | The hostname or IP address of your Home Assistant instance.                                                                                          |
| access_token | Yes      | The **Long-Lived Access Token** generated from your profile page.                                                                                    |
| port         | No       | Port to connect on. Defaults to **8123** for `hassio://` and **443** for `hassios://`.                                                               |
| service      | No       | One or more `[domain.]service[:target]` entries. Omit entirely to use **Persistent Notification** mode.                                              |
| nid          | No       | A fixed **Notification ID** for persistent notifications only. When set, each new message replaces the previous one instead of creating a new entry. |
| prefix       | No       | A URL path prefix prepended to every API call. Required when Home Assistant is served under a sub-path (e.g. `?prefix=/ha`).                         |
| batch        | No       | Set to `yes` to group up to 10 service targets into a single API call. Defaults to `no`.                                                             |
| to           | No       | Alias for service targets. Equivalent to adding targets in the URL path.                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a persistent notification (creates a new entry in the HA
dashboard on every call):

```bash
apprise -vv -t "Alert" -b "Motion detected" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f'
```

Send a persistent notification that always **replaces** the last
(useful for recurring status updates):

```bash
apprise -vv -t "Status" -b "All systems nominal" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f?nid=apprise'
```

Push to a mobile app notification service:

```bash
apprise -vv -t "Alert" -b "Someone rang the doorbell" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f/notify.mobile_app_myphone'
```

Push to multiple services in one URL:

```bash
apprise -vv -t "Alert" -b "Garage door left open" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f/notify.mobile_app_phone1/notify.mobile_app_phone2'
```

Send using a secure connection (`hassios://` → HTTPS on port 443):

```bash
apprise -vv -t "Test" -b "Secure message" \
    'hassios://my.secure.server/4b4f2918fd-dk5f-8f91f/notify.mobile_app_myphone'
```

Use `?to=` when constructing URLs programmatically:

```bash
apprise -vv -t "Test" -b "Hello" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f?to=notify.mobile_app_myphone'
```

## Troubleshooting

- **401 Unauthorized** — Your token is invalid or has expired. Generate
  a new one from the Home Assistant profile page.
- **400 Bad Request** — A service target was specified that does not
  exist, or the payload contained unsupported parameters for that
  service domain. Verify the domain and service name against your HA
  instance.
- **Self-signed certificate** — Add `?verify=no` to skip SSL
  verification: `hassios://myserver/{token}?verify=no`
