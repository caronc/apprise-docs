---
title: Persistent Storage
description: Understanding how Apprise caches data to reduce API calls.
sidebar:
  order: 3
---

Persistent Storage allows Apprise to cache data locally. This greatly reduces the number of API transactions between you and the service(s) you are using.

## Why use Persistent Storage?

Some services require complex authentication handshakes or resource lookups that are "expensive" to perform every time you send a notification.

- **Matrix:** Login information is cached locally to avoid re-authenticating with the homeserver on every request.
- **Telegram:** User account details are cached to save extra fetches to the service.
- **Email (PGP):** When PGP encryption is enabled without supplying explicit key files, Apprise auto-generates a PGP key pair and stores it persistently so the same keys are reused across every run.

## Storage Locations

Apprise stores all of its persistent data in a directory unique to the Apprise URL you create.

- **File Extension:** `.psdata`
- **Directory Name:** A generated 8-character alphanumeric string (UID).

By default, files are written to:

- **Windows:** `%APPDATA%/Apprise/cache`
- **Linux:** `~/.local/share/apprise/cache`

## Managing Storage via CLI

### Viewing Cache IDs (UIDs)

Every Apprise URL you define has a unique URL ID (`uid`) generated against it. The fastest way to find the UID for a specific URL is to pass it directly to `apprise storage list`:

```bash
apprise storage list "mailtos://user:pass@example.com"
```

This shows the 8-character namespace hash (`uid`) for that URL along with its current state, even when no data has been written yet (state shows `unused`). The full cache directory on disk is `{storage-path}/{uid}/`.

To see UIDs for all loaded URLs at once, use the `--dry-run` flag combined with `--tag=all`:

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

You can filter the listing by UID prefix or by passing a full Apprise URL:

```bash
# Filter by 8-char UID prefix (closest match)
apprise storage list abc1

# Filter by full URL — resolved to its namespace automatically
apprise storage list "mailtos://user:pass@example.com"
```

### Pruning Stale Storage

To remove cached data that has expired or is no longer fresh, use the `prune` command:

```bash
apprise storage prune
```

By default, Apprise removes data older than 30 days. You can adjust the threshold with `--storage-prune-days`:

```bash
# Remove data older than 7 days
apprise storage prune --storage-prune-days 7
```

You can scope a prune to a specific URL, UID prefix, or tag — only storage belonging to the matched plugins is eligible for removal:

```bash
# Prune only storage belonging to a specific URL
apprise storage prune "mailtos://user:pass@example.com"

# Prune a specific UID prefix
apprise storage prune abc1

# Prune only storage for URLs associated with the 'family' tag
apprise storage prune --tag family
```

### Clearing Storage

To erase all cached data immediately (regardless of age), use the `clear` command:

```bash
apprise storage clear
```

You can be more specific by targeting a specific UID, a full URL, or a tag — only the matched plugins' namespaces are cleared:

```bash
# Clear a specific UID (e.g. found via 'apprise storage list')
apprise storage clear abc123xy

# Clear using a full URL — resolved to its namespace automatically
apprise storage clear "mailtos://user:pass@example.com"

# Clear all URLs associated with the 'family' tag
apprise storage clear --tag family
```

## Storage Modes

The CLI tool enables Persistent Storage by default using the `auto` mode. You can change this behavior using the `--storage-mode` switch.

| Mode         | Description                                                                                                                       |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **`auto`**   | (Default) Persistent storage is used when applicable. Only plugins that require it will write to the local cache.                 |
| **`flush`**  | Similar to `auto`, but changes are immediately flushed to disk. This ensures data is always current but increases I/O operations. |
| **`memory`** | Disables persistent storage. No data is written to disk. This mimics the behavior of older Apprise versions.                      |
