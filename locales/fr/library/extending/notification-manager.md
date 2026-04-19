---
title: "Gestionnaire de notifications"
description: "Guide and reference for the Apprise Notification Manager (N_MGR), including schema overrides and runtime control."
---

## Introduction

Working with the Notification Manager allows you to:

- Replacing a built-in notification service with a custom implementation.
- Disabling one or more notification services at runtime.
- Discovering which schemas and plugins are currently available.
- Safely handling schema conflicts caused by decorators or import order.

If you are trying to **override a built-in service (for example, Discord)**, the recommended solution is:

```python
from apprise.plugins import N_MGR

N_MGR.add(MyCustomNotify, schemas="discord", force=True)
```

:::tip
Using `force=True` avoids import-order problems and does not unload previously imported modules.
:::

The **Notification Manager** is the central registry responsible for discovering, registering,
and resolving notification plugins within Apprise.

It maps notification URL schemas such as `schema://...` to their corresponding Python
implementation and controls whether those implementations are enabled, disabled, or overridden.

The manager is a singleton and is typically accessed via:

```python
from apprise.plugins import N_MGR
```

## Core Concepts

### Schema Mapping

A **schema** maps to exactly one notify implementation at a time.

- Any URL beginning with `schema://` routes to the notify class registered for that schema.
- Schemas are case-insensitive and normalized internally.
- By default, schema collisions are rejected to prevent accidental overrides.

### Lazy Loading

The manager uses lazy loading:

- Built-in plugins are discovered only when needed.
- Most operations trigger discovery automatically.
- Calling `load_modules()` forces immediate discovery.

:::note
You do not need to call `load_modules()` manually; it is automatically called once on the first `import apprise` or relative references to it.
:::

### Custom Plugin Loading

Custom notification plugins can be introduced in two ways:

1. Python classes discovered via plugin search paths.
1. Decorator-based custom notifications created using the `@notify` decorator.

Decorator-based notifications are wrapped and registered through the same manager APIs as class-based plugins.

## API Reference

### add()

Registers a notification plugin or decorator wrapper for one or more schemas.

Definition:

```python
add(plugin, *, schemas=None, force=False)
```

Behaviour:

- Fails if a schema already exists.
- Supports registering multiple schemas at once.
- Does not modify existing mappings unless explicitly forced.

Exemple :

```python
N_MGR.add(MyNotifyClass, schemas="schema")
```

:::tip
Use `force=True` when intentionally replacing an existing service.
:::

### remove()

Removes one or more schema mappings from the registry.

Definition:

```python
remove(*schemas, unload=True)
```

Behaviour:

- By default, removes the schema mapping and may unload unused modules.
- Supports removing multiple schemas in a single call.

Exemple :

```python
N_MGR.remove("schema1", "schema2")
```

### disable()

Disables one or more notification services without removing their schema mappings.

Definition:

```python
disable(*schemas)
```

Behaviour:

- Prevents usage while preserving registration state.
- Supports disabling multiple schemas at once.

Exemple :

```python
N_MGR.disable("schema1", "schema2")
```

### enable()

Re-enables previously disabled notification services.

Definition:

```python
enable(*schemas)
```

Behaviour:

- Restores availability of disabled schemas.
- Has no effect if a schema was not disabled.

### enable_only()

Enables only the specified schemas and disables everything else.

Definition:

```python
enable_only(*schemas)
```

Behaviour:

- Every registered service not in the list is disabled.
- Services in the list are (re-)enabled.
- If `evict_on_disable` is set, libraries whose last dependent service was disabled are evicted from memory (see [Library Eviction](#library-eviction)).

Exemple :

```python
# Only Telegram and NTFY remain active; all others are disabled
N_MGR.enable_only("tgram", "ntfy")
```

### load_modules()

Forces immediate discovery of built-in notification plugins.

Definition:

```python
load_modules()
```

:::note
This is rarely required because the manager loads plugins lazily.
:::

## Library Eviction

When a notification service is disabled, any optional third-party library it depends on may no longer be needed. If every service that uses a given library is disabled, the manager can evict that library from Python's module cache (`sys.modules`), freeing the memory it occupies.

### Opting In

Eviction is **off by default** to preserve backward compatibility for third-party code that may import Apprise alongside its own use of those libraries. To enable it:

```python
from apprise.plugins import N_MGR

N_MGR.evict_on_disable = True
```

Once set, eviction happens automatically whenever `disable()` or `enable_only()` brings a library's reference count to zero.

### Declaring Dependencies — `runtime_deps()`

Each notification service class can advertise its optional runtime dependencies by overriding the `runtime_deps()` static method on `NotifyBase`:

```python
from apprise.plugins import NotifyBase

class NotifyMyService(NotifyBase):
    protocol = "myservice"

    @staticmethod
    def runtime_deps():
        return ("mylibrary",)

    # ...
```

The return value is a tuple of **top-level importable package names** (the same string you would pass to `import`). The manager uses these at load time to build a reference counter across all enabled services. When the counter for a library reaches zero, that library — and all of its submodules — is removed from `sys.modules`.

:::note
Native C extensions (for example, `cryptography`'s OpenSSL backend) release their Python wrapper objects when evicted, but the underlying shared library (`.so`) remains mapped by the OS for the lifetime of the process. This is a Python / OS constraint, not an Apprise limitation.
:::

### How the Reference Counter Works

1. After all built-in plugins are loaded, the manager counts how many **enabled** services declare each library in `runtime_deps()`.
2. When a service is disabled, its libraries are decremented.
3. When a library's count reaches zero **and** `evict_on_disable` is `True`, the manager removes every matching entry from `sys.modules` (e.g., `slixmpp`, `slixmpp.stanza`, `slixmpp.xmlstream`, …).
4. When a service is re-enabled, its libraries are incremented back. Re-import happens automatically the next time that service's code path runs.

Eviction attempts are always made for the full `runtime_deps()` tuple, in order. A missing entry (e.g., a library that was never imported) is skipped with a trace-level log and does not interrupt the remaining evictions.

### Known Evictable Libraries

The following built-in services declare `runtime_deps()` and benefit from eviction:

| Library        | Services                              | Memory Freed |
| :------------- | :------------------------------------ | :----------: |
| `slixmpp`      | `xmpp://`                             |    ~20 MB    |
| `paho`         | `mqtt://`                             |    ~4 MB     |
| `gntp`         | `growl://`                            |    ~2 MB     |
| `smpplib`      | `smpp://`, `smpps://`                 |    ~2 MB     |
| `cryptography` | `simplepush://`, `fcm://`, `vapid://` |   partial†   |

†`cryptography` uses a native OpenSSL backend. Python wrapper objects are freed; the shared library remains OS-mapped.

## Behavioural Remarques

### Unmap vs Unload

Removing a schema can mean:

1. **Unmap only**  
   The schema mapping is removed, but imported Python modules remain loaded.

1. **Unmap and unload**  
   The schema mapping is removed and unused modules may be removed from memory.

:::warning
Unloading modules can affect third-party code that imports or subclasses notify classes.
Use unmap-only behaviour when class identity stability matters.
:::

### Force Overrides

Using `force=True` when calling `add()`:

- Removes any existing mapping for the schema.
- Does not unload previously imported modules.
- Registers the new implementation atomically.

This is the recommended way to replace built-in services.

### Import Order and Decorators

Decorator-based notifications may register schemas at import time.
If ordering is uncertain, `force=True` ensures predictable behaviour regardless of when modules are loaded.

## Exemples

### Replace a Built-in Service

```python
N_MGR.add(MyCustomNotify, schemas="discord", force=True)
```

### Disable vs Remove

```python
# Disable schema - can be enabled again using N_MGR.enable("schema")
N_MGR.disable("schema")

# Remove completely
N_MGR.remove("schema")
```

### Multiple Schema Operations

```python
N_MGR.disable("schema1", "schema2")
N_MGR.remove("schema3", "schema4", unload=False)
```

## Depannage

### Schema Already Defined

If a schema already exists, registration will fail unless explicitly overridden. Consider:

1. Choosing a unique schema.
1. Use `add(..., force=True)` for intentional overrides.

### Import-Order Issues

If schemas are registered during module import, conflicts may occur before manual intervention.
Using `force=True` avoids these timing issues.
