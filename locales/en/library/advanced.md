---
title: "Advanced Usage"
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

    # Await the notification delivery -- like notify(), this returns an
    # AppriseResult, so capture it if you care whether delivery succeeded
    result = await apobj.async_notify(
        title='Async Test',
        body='This was sent asynchronously',
    )

    if not result:
        print("Delivery failed:", result.status.name)

asyncio.run(main())
```

See [Notification Results](/library/results/) for everything `result` can tell you
(per-service detail, timing, captured logs, and more).

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

## Handling Configuration Errors

Apprise raises `AppriseImproperlyConfigured` when a library call receives
missing, invalid, or conflicting settings. Catch it when your application needs
to report a configuration problem:

```python
from apprise import AppriseAsset
from apprise.exception import AppriseImproperlyConfigured

try:
    asset = AppriseAsset(service_timeout=-1)
except AppriseImproperlyConfigured as error:
    print(f"Invalid Apprise settings: {error}")
```

Existing handlers for `TypeError`, `ValueError`, or `AttributeError` continue to
work. New code should catch `AppriseImproperlyConfigured` so configuration
problems are easier to identify.

All Apprise-specific exceptions inherit from `AppriseException`, which provides
one catch-all when your application does not need to distinguish the cause.
Disk failures reported as `AppriseDiskIOError` can also be caught as
`OSError`. Plugin-specific failures based on `ApprisePluginException` can be
handled together when their individual details are not needed.

## Proxy Support

Apprise sends every notification over [requests](https://requests.readthedocs.io/), which honours the standard `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` environment variables automatically. No Apprise-specific configuration is required — set the variable before your process starts (or export it in the environment Apprise runs under) and every outbound request routes through the proxy:

```bash
export HTTPS_PROXY="http://127.0.0.1:3128"
export HTTP_PROXY="http://127.0.0.1:3128"

python3 my_script.py
```

If you only want Apprise to proxy (and not the rest of your application), scope the variable to the subprocess or environment that runs Apprise rather than exporting it globally — for example, setting it inline for a single command, or in a systemd unit's `Environment=` directive for a long-running service.

`NO_PROXY` is also honoured, letting you exempt specific hosts:

```bash
export HTTPS_PROXY="http://127.0.0.1:3128"
export NO_PROXY="localhost,127.0.0.1,internal.example.com"
```

:::note
SOCKS proxies (`socks5h://...`) require the optional [PySocks](https://pypi.org/project/PySocks/) package (`pip install pysocks`) — `requests` needs it to understand SOCKS proxy URLs. Without it, a `socks5h://` value in `HTTP_PROXY`/`HTTPS_PROXY` will fail.
:::
