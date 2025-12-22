---
title: Notification Services
description: Configure notification services with Apprise
---

# Notification Services

Apprise supports over 100+ notification services. Each service is configured using a simple URL format.

## Service Categories

### Messaging Apps
- Discord
- Slack
- Microsoft Teams
- Telegram
- WhatsApp
- Signal

### Email Services
- Gmail
- Outlook
- SendGrid
- Mailgun

### Cloud Platforms
- Amazon SNS
- Google Chat
- Microsoft Teams
- Slack

### Home Automation
- Home Assistant
- Gotify
- Pushover
- Pushbullet

## Documentation Migration

Service-specific documentation is currently being migrated from the [Apprise Wiki](https://github.com/caronc/apprise/wiki). 

For now, please refer to the wiki for detailed service configuration:
- [Notification Services on Wiki](https://github.com/caronc/apprise/wiki#notification-services)

## URL Format

Each service uses a specific URL format. General pattern:

```
service://credentials@hostname/path?parameters
```

### Examples

```bash
# Discord
discord://webhook_id/webhook_token

# Slack
slack://token_a/token_b/token_c

# Email
mailto://user:password@domain.com
```

## Contributing

Help us migrate service documentation! Visit the [apprise-docs repository](https://github.com/caronc/apprise-docs) to contribute.
