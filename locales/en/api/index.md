---
title: Apprise API
description: A lightweight, production-ready notification gateway.
sidebar:
  label: "Introduction"
  order: 1
---

The **Apprise API** is a web-based gateway to the Apprise library. It provides a RESTful interface to send notifications, allowing you to centralize your notification configuration and trigger alerts from systems that might not support Python or the CLI directly.

## Why Use the API?

- **Microservices:** Provide a single notification endpoint for all your applications.
- **Stateless and Stateful:** Send notifications on the fly or reference pre-saved configurations by key.
- **Web interface:** Includes a built-in dashboard to manage configurations and test notifications. The UI can be disabled with `APPRISE_API_ONLY=yes`.
- **Per-configuration access:** Assign a username and password to a saved configuration through `/auth/{KEY}`.
- **Extensible:** Runs as a lightweight container compatible with Docker, Kubernetes, and more.
- **Centralized configuration:** Use one server as the configuration source for multiple apps and environments.

## Getting Started

The Apprise API is designed to be run as a container.

1. **Deploy it:** Set up the container using [Docker or Kubernetes](/api/deployment/).
2. **Configure it:** Save your URLs and assign them a key (for example, `my-alerts`).
3. **Notify:** Trigger your alerts using a simple HTTP request.

```bash
curl -X POST -d "body=Test Message" \
  http://localhost:8000/notify/my-alerts
```

:::tip
If your server is public, [enable authentication](/api/deployment/#authentication-and-access-control) and protect saved configurations through the Web interface or `/auth/{KEY}`. A hard-to-guess key is still useful, but it is not a replacement for a username and password.
:::
