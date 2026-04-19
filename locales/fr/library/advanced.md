---
title: "Utilisation avancée"
description: "Async, serialization, and low-level control."
sidebar:
  order: 5
---

## Asynchronous Notifications

If you are running inside an `asyncio` event loop, you can use `async_notify()` to send notifications without blocking.

```python
import asyncio
import apprise

async def main():
    apobj = apprise.Apprise()
    apobj.add('mailto://user:pass@example.com')

    # Await the notification delivery
    await apobj.async_notify(
        title='Async Test',
        body='This was sent asynchronously',
    )

asyncio.run(main())
```

## Serialization (Pickle)

Apprise objects can be serialized (pickled). This allows you to configure an Apprise object once, save it to disk (or a database), and reload it later with all services configured.

```python
import apprise
import pickle

# 1. Setup
apobj = apprise.Apprise()
apobj.add("json://localhost")

# 2. Serialize
serialized_data = pickle.dumps(apobj)

# ... later in your code ...

# 3. Restore
restored_obj = pickle.loads(serialized_data)
restored_obj.notify("I am back!")
```

## Low-Level: The Apprise Notification Object

When you call `Apprise.notify()`, it handles tagging, configuration, and logging for you. If you need to bypass this and interact directly with a specific notification object:

```python
import apprise

# Instantiate a single notification object directly
# (Bypassing the Apprise() manager)
obj = apprise.Apprise.instantiate('glib://')

# Send raw content
obj.send(
    body="Raw message",
    title="Raw title"
)
```

:::caution
Using `send()` directly bypasses many of the safeguards and features (like tagging and attachment processing) provided by the main `notify()` method.
:::
