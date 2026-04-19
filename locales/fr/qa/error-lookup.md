---
title: "Messages d'Erreur"
description: "Common error messages and handling of them."
sidebar:
  order: 10
---

## Introduction

Frequently identified error messages can be recorded in this section.

### RuntimeError: asyncio.run() cannot be called from a running event loop

If your calling program runs its own event loop, then Apprise can cause some commotion when it tries to work with its own. For these circumstances you have 2 options:

1. Do not call `notify()`. Instead `await` the `async_notify()` call itself. [See here for more details](/qa/#async_notify--leveraging-await-to-send-notifications).
1. Leverage a library that handles this exact case called [nest-asyncio](https://pypi.org/project/nest-asyncio/):

   ```bash
   pip3 install nest-asyncio
   ```

   Then from within your python application just import it at the top:

   ```python
   import nest_asyncio
   # apply it
   nest_asyncio.apply()
   ```

   An issue related to FastCGI was brought forth [here](https://github.com/caronc/apprise/issues/610) and solved using this method.
