---
title: "Quick Start"
description: "Core methods: add, notify, tagging, and loading configurations."
sidebar:
  order: 2
---

## The Apprise Object

```python
import apprise
apobj = apprise.Apprise()
```

### Adding Services (`add`)

The `add()` method registers notification services to your instance.

```python
# Add a single service
apobj.add('json://localhost')

# Add multiple services at once
apobj.add([
    'mailto://user:pass@example.com',
    'slack://tokenA/tokenB/tokenC'
])
```

You can also pass services when creating the instance:

```python
apobj = apprise.Apprise(services='json://localhost')
```

### Sending Notifications (`notify`)

The `notify()` method sends messages to all registered services.

```python
apobj.notify(
    title="Server Alert",
    body="CPU usage is at 99%",
)
```

:::tip
`notify()` actually returns a small result object rather than a plain `True`/`False` --
but you can still treat it exactly like a boolean if that's all you need. See
[Notification Results](/library/results/) if you want to know which service succeeded
or failed, or why.
:::

#### Message Types

You can categorize your notifications using `NotifyType`. This often changes the icon or color of the notification (depending on the receiving service).

```python
from apprise import NotifyType

apobj.notify(
    title="Success",
    body="Backup completed successfully.",
    notify_type=NotifyType.SUCCESS
)
```

| Icon                                           | Type                 | Description                   |
| ---------------------------------------------- | :------------------- | :---------------------------- |
| ![info](./images/apprise-info-72x72.png)       | `NotifyType.INFO`    | Default. General information. |
| ![success](./images/apprise-success-72x72.png) | `NotifyType.SUCCESS` | Successful operations.        |
| ![warning](./images/apprise-warning-72x72.png) | `NotifyType.WARNING` | Issues that aren't fatal.     |
| ![failure](./images/apprise-failure-72x72.png) | `NotifyType.FAILURE` | Critical errors.              |

### Tagging

Tagging allows you to send notifications to specific subgroups of services.

**1. Assign Tags**

```python
# Assign tags when adding services
apobj.add('slack://...', tag='devops')
apobj.add('mailto://...', tag='management')
apobj.add('discord://...', tag=['devops', 'management']) # Multiple tags
```

**2. Filter by Tags**

```python
# Notify ONLY services tagged 'devops'
apobj.notify(title="Deploying", body="...", tag="devops")

# Notify services tagged 'devops' OR 'management'
apobj.notify(title="Update", body="...", tag=["devops", "management"])
```

Programmatic tag expressions follow:

| `notify(tag=...)` expression | Selected services                         |
| ---------------------------- | ----------------------------------------- |
| `"TagA"`                     | Has `TagA`                                |
| `"TagA,TagB"`                | Has `TagA` **AND** `TagB`                 |
| `["TagA", "TagB"]`           | Has `TagA` **OR** `TagB`                  |
| `["TagA,TagC", "TagB"]`      | Has (`TagA` **AND** `TagC`) **OR** `TagB` |

:::note
In Python, a list means **OR**, while a comma-separated string means **AND**.
This is the most important difference from what many people intuitively try first.
:::

```python
# Notify services tagged 'product' AND 'create'
apobj.notify(title="Created", body="...", tag="product,create")

# Notify services tagged 'devops' OR 'finance'
apobj.notify(title="Report", body="...", tag=["devops", "finance"])

# Notify services matching ('comment' AND 'create') OR 'admin'
apobj.notify(title="Comment Created", body="...", tag=["comment,create", "admin"])
```

#### Priority Filtering

Tags in configuration files may carry a numeric priority prefix (for example `1:alerts` or `5:alerts` in YAML). There are two modes depending on whether you include a priority in the filter.

**Without a priority prefix -- escalation (default)**

Services are grouped by their tag priority and dispatched in ascending order. If every service in the lowest-numbered group succeeds, the result evaluates as true immediately without running higher-numbered groups. If any fail, Apprise escalates to the next group.

```python
# All 'alerts' services dispatched in ascending priority order.
# Priority-1 entries run first; if they all succeed, priority-5 entries
# are never triggered.
apobj.notify(body="...", tag="alerts")
```

**With a priority prefix -- exclusive filter**

Only services whose matching tag has exactly that priority are notified. No escalation occurs.

```python
# Notify ONLY 'alerts' entries assigned priority 2
apobj.notify(body="...", tag="2:alerts")
```

#### Per-Call Retry Override

A trailing `:N` on a tag value overrides each matched service's configured retry count for this one call only:

```python
# Notify all 'alerts' services, retrying each up to 3 times on failure
apobj.notify(body="...", tag="alerts:3")

# Notify only priority-2 'alerts' services with up to 3 retries
apobj.notify(body="...", tag="2:alerts:3")
```

The retry count does not permanently modify the service configuration.

### Attachments

Pass files to `notify()` using the `attach` argument. Local paths, remote URLs, and in-memory data are all accepted.

```python
# Local file
apobj.notify(
    title="Report ready",
    body="Please see the attached file.",
    attach="/path/to/report.pdf",
)

# Remote URL — filename derived from the URL path automatically (photo.jpg)
apobj.notify(
    body="Check this out.",
    attach="https://example.com/images/photo.jpg",
)

# Remote URL with an explicit filename override via ?name=
apobj.notify(
    body="Thumbnail attached.",
    attach="https://example.com/thumbnails/abc123?name=preview.jpg",
)

# Multiple attachments
apobj.notify(
    body="Two files attached.",
    attach=[
        "/path/to/report.pdf",
        "https://example.com/images/photo.jpg",
    ],
)
```

When an `http://` or `https://` URL is used as an attachment, Apprise resolves the filename in this order:

1. `?name=` query parameter (if provided and non-empty).
2. Filename component of the URL path (`photo.jpg` from `/images/photo.jpg`).
3. Fallback: `attachment.001`, `attachment.002`, …

### Loading Configuration Files

You can use the `AppriseConfig` object to load URLs from external YAML or Text files instead of hardcoding them.

```python
import apprise

# 1. Create the Config Object
config = apprise.AppriseConfig()

# 2. Add configuration sources
config.add('/path/to/my/config.yml')
config.add('https://myserver.com/my/apprise/config')

# 3. Create Apprise instance and ingest the config
apobj = apprise.Apprise()
apobj.add(config)

# 4. Notify as usual (URLs from the file are now loaded)
apobj.notify("Loaded from config!")
```
