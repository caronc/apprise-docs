---
title: "Apprise Python (Core) Library"
description: "Integrate Apprise notifications directly into your Python applications."
sidebar:
  label: "Introduction"
  order: 1
---

The Apprise library allows you to send notifications to almost all of the most popular notification services available today (Telegram, Discord, Slack, Email, etc.) using a single, unified Python API.

For common helpers used across plugins, see the [Utilities Reference](./utilities/).

## Installation

Apprise is available on PyPI and can be installed via pip.

```bash
pip install apprise
```

## Hello World

The core of the library is the `Apprise` object. You instantiate it, add URLs, and trigger notifications.

```python
import apprise

# 1. Instantiate the Apprise Object
apobj = apprise.Apprise()

# 2. Add one or more service URLs
apobj.add('mailto://myuser:mypass@hotmail.com')
apobj.add('tgram://123456789:ABCDefghIJKLmnOPqrstUVwxyz')

# 3. Send a notification to all added services
apobj.notify(
    body='What a great notification service!',
    title='My Notification Title',
)
```

## Why Use the Library?

- **Unified Syntax**: One URL format for **<!-- SERVICES:COUNT -->** services.
- **Asynchronous**: Sending notifications is non-blocking (optional).
- **Tagging**: Group services (e.g., `devops`, `billing`) and notify them selectively.
- **Attachments**: Send files and images effortlessly.
- **Rich Text**: Support Emojis and handle HTML, TEXT, and Markdown
- **Configuration**: Load URLs from YAML/Text files or API endpoints.
- **[Template Variables](../getting-started/template/)**: Fill declared
  YAML values at send time without changing the saved configuration.
