---
title: Quick Start
description: Send your first notification with Apprise
---

# Quick Start

Get started with Apprise in minutes by sending your first notification.

## Basic Usage

### Command Line

The simplest way to use Apprise is through the command line:

```bash
# Send a notification to Discord
apprise -t "Test Title" -b "Test Message" \
    discord://webhook_id/webhook_token

# Send to multiple services at once
apprise -t "Alert" -b "Something happened!" \
    discord://webhook_id/webhook_token \
    mailto://user:pass@gmail.com
```

### Python

Use Apprise in your Python applications:

```python
import apprise

# Create an Apprise instance
apobj = apprise.Apprise()

# Add notification services
apobj.add('discord://webhook_id/webhook_token')
apobj.add('mailto://user:pass@gmail.com')

# Send notifications
apobj.notify(
    title='Test Title',
    body='Test Message'
)
```

## Configuration Files

For managing multiple notification services, use a configuration file:

```yaml
# config.yml
urls:
  - discord://webhook_id/webhook_token
  - mailto://user:pass@gmail.com
  - slack://token_a/token_b/token_c
```

Then use it:

```bash
apprise --config=config.yml -t "Title" -b "Message"
```

Or in Python:

```python
import apprise

apobj = apprise.Apprise()

# Load configuration
config = apprise.AppriseConfig()
config.add('config.yml')

# Add all configured services
apobj.add(config)

# Send notification
apobj.notify(title='Title', body='Message')
```

## Next Steps

- Explore the [Guides](/guides) section for detailed tutorials
- Check out [Notification Services](/notify) for service-specific configuration
- Learn about advanced features in the [Reference](/reference) section
