---
title: "Problèmes de Formatage"
description: "Understand how Apprise manages HTML, TEXT, and Markdown"
sidebar:
  order: 10
---

## Introduction

If your upstream server is not correctly interpreting the information you're passing it, it could be a simple tweak to Apprise you need to make to help it along.

The thing with Apprise is it doesn't know what you're feeding it (the format the text is in); so by default it just passes exactly what you hand it right along to the upstream service. Since Email operates using HTML formatting (by default), if you feed it raw text, it may not interpret the new lines correctly (because HTML ignores these charaters).

## Apprise URL Manipulation

You can force the upstream service you're working with to push its content using `text`, `html`, or `markdown` by specifying it on the Apprise URL you construct. For example, the below tells the mailto:// to transmit the content it's provided as `text`:

- `mailtos://example.com?user=username&pass=password&to=myspy@example.com&format=text`

:::note
This does not work in every case; the service needs to support the action. It is harmless to enforce a `format=` not supported by a service; it's simply ignored if this is the case.
:::

## Apprise CLI

By default, the `apprise` tool interprets everything it receives as `text`. If you know that the data you're feeding it is of `markdown`, or `html`, you can let Apprise know this by specifying `--input-format <format>` (`-i <format>`). Doing so allows Apprise to make smart decisions with the data it's passed.

## Developers

For developers, your call to `notify()` to include should include the `body_format` value set:

```python
# one more include to keep your code clean
from apprise import NotifyFormat

apobj.notify(
    body=message,
    title='My Notification Title',
    body_format=NotifyFormat.TEXT,
)
```

You can actually make a global variable out of the `body_format` so you don't have to keep setting it every time you call `notify` (in-case you intend to call this throughout your code in several locations):

```python
import apprise
from apprise import NotifyFormat
from apprise import AppriseAsset

# Create your Apprise Asset
asset = apprise.Asset(body_format=apprise.NotifyFormat.TEXT)

# Create your Apprise object (pass in the asset):
apobj = apprise.Apprise(asset=asset)

# Add your objects (like you're already doing)
apobj.add('mailtos://example.com?user=username&pass=password&to=myspy@example.com')

# And your multi-line message
message = """
This message will self-destruct in 10 seconds...

Or not... (... yeah it probably won't at all)

Chris
"""

# The big difference here is now all calls to notify already have the body_format
# set to be TEXT.  Apprise knows everything you're feeding it will always be this
# You can still specify body_format here in the future and over-ride if you ever
# need to, but your notify stays simple like you had it (but the multi line will work
# this time):
apobj.notify(
    body=message,
    title='My Notification Title',
)
```

**What it boils down to is:**

- Developers can use the `body_format` tag which is telling Apprise what the **INPUT source** is. If a Apprise knows this it can go ahead and make special accommodations for the services that are expecting another format. By default the `body_format` is `None` and no modifications to the data fed to Apprise is touched at all (it's just passed right through to the upstream provider).
- End User can modify their URL to specify a `format=` which can be either `text`, `markdown`, or `html` which sets the **OUTPUT source**. Notification Plugins can use this information to accommodate the data it's being fed and behave differently to help accommodate your situation.
