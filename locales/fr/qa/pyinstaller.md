---
title: "Support de PyInstaller"
description: "PyInstaller Remarques"
sidebar:
  order: 10
  title: "PyInstaller"
---

[Pyinstaller](https://pyinstaller.org/) allows to package a python application with its dependencies in a single exe.

It is possible to package an application that is using Apprise but there is a trick.

Let's take a simple script:

```python
from apprise import Apprise
apobj = Apprise()
apobj.add('<SCHEME>://<FQDN>/<TOKEN>')
apobj.notify(title="a title", body="this is the body of the notification")
```

Then package with `pytinstaller`:

```bash
pyinstaller -F myscript.py
```

And launch it:

```bash
./dist/myscript
```

We get:

```text
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/attachment'
or
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/plugins'
or
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/config'
```

We have to use `--collect-all` option which, according to documentation:

> Collect all submodules, data files, and binaries from the specified package or module. This option can be used multiple times.

```bash
pyinstaller -F --collect-all apprise myscript.py
```

No more errors, notifications are sent.
