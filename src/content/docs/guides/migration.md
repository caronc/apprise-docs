---
title: Migration Guide
description: Guide for migrating content from the Apprise Wiki
---

# Documentation Migration Guide

This guide explains how documentation is being migrated from the [Apprise Wiki](https://github.com/caronc/apprise/wiki) to this Astro Starlight site.

## Why Migrate?

The migration to Astro Starlight provides several benefits:

- **Better Search**: Full-text search across all documentation
- **Faster Performance**: Static site generation for instant page loads
- **Improved Navigation**: Better sidebar and navigation structure
- **Easier Contributions**: Standard markdown files in a Git repository
- **Better Mobile Experience**: Responsive design optimized for all devices
- **Version Control**: Full history of changes via Git

## Current Status

The migration is in progress. Documentation is being gradually moved from the wiki to this site.

### Completed Sections

- ✅ Basic site structure
- ✅ Getting Started guides
- ✅ Placeholder pages for main sections

### In Progress

- 🔄 Service-specific notification guides
- 🔄 Configuration examples
- 🔄 API reference documentation

### Planned

- ⏳ Advanced usage guides
- ⏳ Troubleshooting guides
- ⏳ Integration examples

## How to Help

We welcome contributions to help migrate and improve the documentation!

### Finding Content to Migrate

1. Visit the [Apprise Wiki](https://github.com/caronc/apprise/wiki)
2. Look for pages that haven't been migrated yet
3. Check the corresponding section in this documentation site

### Migration Process

1. **Choose a page** from the wiki to migrate
2. **Create a new markdown file** in the appropriate directory:
   - Getting started content → `src/content/docs/getting-started/`
   - Guides and tutorials → `src/content/docs/guides/`
   - Service documentation → `src/content/docs/notify/`
   - API reference → `src/content/docs/reference/`

3. **Convert the content**:
   - Copy the wiki content
   - Convert to standard Markdown format
   - Add frontmatter with title and description
   - Update any internal links
   - Add code syntax highlighting
   - Improve formatting and organization

4. **Test locally**:
   ```bash
   npm run dev
   ```

5. **Submit a pull request** with your changes

### Example Migration

Here's an example of migrating a wiki page:

#### Wiki Page (Original)
```
## Discord Notifications

To send notifications to Discord, use this URL format:

discord://webhook_id/webhook_token
```

#### Migrated Page (New Format)
```md
---
title: Discord Notifications
description: Send notifications to Discord using webhooks
---

# Discord Notifications

Apprise can send notifications to Discord using webhooks.

## Configuration

Use the following URL format:

```bash
discord://webhook_id/webhook_token
```

## Getting Your Webhook

1. Open your Discord server settings
2. Go to Integrations → Webhooks
3. Create a new webhook or use an existing one
4. Copy the webhook URL
5. Extract the `webhook_id` and `webhook_token` from the URL

## Example

```python
import apprise

apobj = apprise.Apprise()
apobj.add('discord://123456789/abcdefghijklmnop')
apobj.notify(title='Hello', body='Discord notification!')
```

## Additional Options

- Custom avatar: Add `?avatar=url` parameter
- Username override: Add `&name=BotName` parameter
```
```

### Markdown Guidelines

- Use proper heading hierarchy (# for title, ## for sections)
- Add code blocks with syntax highlighting
- Include examples where appropriate
- Add descriptive frontmatter
- Link to related documentation
- Keep language clear and concise

## Questions?

If you have questions about migrating documentation:

- Open an issue in the [apprise-docs repository](https://github.com/caronc/apprise-docs)
- Ask in the pull request if you're working on a migration
- Check the [CONTRIBUTING.md](https://github.com/caronc/apprise-docs/blob/main/CONTRIBUTING.md) guide

Thank you for helping improve Apprise documentation! 🎉
