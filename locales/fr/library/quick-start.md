---
title: "Démarrage rapide"
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

### Sending Notifications (`notify`)

The `notify()` method sends messages to all registered services.

```python
apobj.notify(
    title="Server Alert",
    body="CPU usage is at 99%",
)
```

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

### Etiquetage

Etiquetage allows you to send notifications to specific subgroups of services.

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

Les expressions de tags programmatiques suivent les regles suivantes :

| Expression `notify(tag=...)` | Services selectionnes                        |
| ---------------------------- | -------------------------------------------- |
| `"TagA"`                     | Possede `TagA`                               |
| `"TagA,TagB"`                | Possede `TagA` **ET** `TagB`                 |
| `["TagA", "TagB"]`           | Possede `TagA` **OU** `TagB`                 |
| `["TagA,TagC", "TagB"]`      | Possede (`TagA` **ET** `TagC`) **OU** `TagB` |

:::note
En Python, une liste signifie **OU**, tandis qu'une chaine separee par des virgules signifie **ET**.
C'est la difference la plus importante a retenir pour `notify(tag=...)`.
:::

```python
# Notify services tagged 'product' AND 'create'
apobj.notify(title="Created", body="...", tag="product,create")

# Notify services tagged 'devops' OR 'finance'
apobj.notify(title="Report", body="...", tag=["devops", "finance"])

# Notify services matching ('comment' AND 'create') OR 'admin'
apobj.notify(title="Comment Created", body="...", tag=["comment,create", "admin"])
```

### Chargement de la configuration Files

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
