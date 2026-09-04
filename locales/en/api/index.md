---
title: Apprise API
description: A lightweight, production-ready notification gateway.
sidebar:
  label: "Introduction"
  order: 1
---

The **Apprise API** is a web-based gateway to the Apprise library. It provides a RESTful interface to send notifications, allowing you to centralize your notification configuration and trigger alerts from systems that might not support Python or the CLI directly.

:::tip
Want to use your Apprise API from your phone? [Apprise Mobile](/mobile/) is the official Android companion for viewing saved servers, creating notification URLs, and sending notifications.
:::

## Why use the API?

- **Microservices:** Provide a single notification endpoint for all your applications.
- **Stateless and Stateful:** Send notifications on the fly or reference pre-saved configurations by key.
- **Web interface:** Includes a built-in dashboard to manage configurations and test notifications. The UI can be disabled with `APPRISE_API_ONLY=yes`.
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
If your server can be accessed by more than one person, or it is exposed to the internet, generate a new obfuscated key that isolates your environment from others. If you are using the web UI, you can press **New Configuration** in the left menu.
:::
