---
title: Stockage Persistant
description: Understanding how Apprise caches data to reduce API calls.
sidebar:
  order: 3
---

Persistent Storage allows Apprise to cache data locally. This greatly reduces the number of API transactions between you and the service(s) you are using.

## Why use Persistent Storage?

Some services require complex authentication handshakes or resource lookups that are "expensive" to perform every time you send a notification.

- **Matrix:** Login information is cached locally to avoid re-authenticating with the homeserver on every request.
- **Telegram:** User account details are cached to save extra fetches to the service.

## Storage Locations

Apprise stores all of its persistent data in a directory unique to the Apprise URL you create.

- **File Extension:** `.psdata`
- **Directory Name:** A generated 8-character alphanumeric string (UID).

By default, files are written to:

- **Windows:** `%APPDATA%/Apprise/cache`
- **Linux:** `~/.local/share/apprise/cache`

## Managing Storage via CLI

### Viewing Cache IDs (UIDs)

Every Apprise URL you define has a unique URL ID (`uid`) generated against it. To see which UIDs have been assigned to your configuration, use the `--dry-run` flag combined with `--tag=all`:

```bash
apprise --dry-run --tag=all
```

**Example Output:**
![Apprise Dry Run Output](/cli/images/01abafebf75ad38d.jpeg)

_Note how some plugins (like `dbus://`) display `- n/a -`, indicating they do not use persistent storage._

### Listing Active Storage

You can inspect the current state of your persistent storage using the `storage` command:

```bash
apprise storage
```

**Example Output:**
![Apprise Storage List](/cli/images/3993e3ece1157fec.jpeg)

The output shows:

1. **Grouping:** Multiple URLs sharing the same credentials share the same storage endpoint.
2. **Disk Usage:** The amount of space currently occupied.
3. **Status:**
   - `active`: The plugin has data cached on disk.
   - `unused`: The plugin is not currently occupying space.
   - `stale`: A plugin previously wrote data here, but it is no longer referenced by your current configuration.

### Cleaning Up

To remove all accumulated persistent storage generated through the CLI tool:

```bash
apprise storage clean
```

You can be more specific by targeting a specific UID or tag:

```bash
# Clean a specific UID (e.g. found via 'apprise storage')
apprise storage clean abc123xy

# Clean all URLs associated with the 'family' tag
apprise storage clean --tag family
```

## Storage Modes

The CLI tool enables Persistent Storage by default using the `auto` mode. You can change this behavior using the `--storage-mode` switch.

| Mode         | Description                                                                                                                       |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **`auto`**   | (Default) Persistent storage is used when applicable. Only plugins that require it will write to the local cache.                 |
| **`flush`**  | Similar to `auto`, but changes are immediately flushed to disk. This ensures data is always current but increases I/O operations. |
| **`memory`** | Disables persistent storage. No data is written to disk. This mimics the behavior of older Apprise versions.                      |
