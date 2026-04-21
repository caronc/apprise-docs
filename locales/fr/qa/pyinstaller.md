---
title: "Support de PyInstaller"
description: "Notes sur PyInstaller"
sidebar:
  order: 10
  title: "PyInstaller"
---

[PyInstaller](https://pyinstaller.org/) permet d'empaqueter une application Python avec ses dépendances dans un seul exécutable.

Il est possible d'empaqueter une application qui utilise Apprise, mais il y a une petite subtilité.

Prenons un script simple :

```python
from apprise import Apprise
apobj = Apprise()
apobj.add('<SCHEME>://<FQDN>/<TOKEN>')
apobj.notify(title="a title", body="this is the body of the notification")
```

Puis empaquetez-le avec `pyinstaller` :

```bash
pyinstaller -F myscript.py
```

Et lancez-le :

```bash
./dist/myscript
```

On obtient :

```text
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/attachment'
or
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/plugins'
or
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/_MEIEbGkgo/apprise/config'
```

Il faut utiliser l'option `--collect-all` qui, d'après la documentation :

> Collect all submodules, data files, and binaries from the specified package or module. This option can be used multiple times.

```bash
pyinstaller -F --collect-all apprise myscript.py
```

Plus d'erreurs, les notifications sont envoyées.
