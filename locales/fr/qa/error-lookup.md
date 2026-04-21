---
title: "Messages d'Erreur"
description: "Messages d'erreur courants et comment les gérer."
sidebar:
  order: 10
---

## Introduction

Les messages d'erreur fréquemment rencontrés peuvent être documentés dans cette section.

### RuntimeError: asyncio.run() cannot be called from a running event loop

Si le programme appelant exécute sa propre boucle d'événements, Apprise peut provoquer quelques frictions lorsqu'il essaie d'utiliser la sienne. Dans ce cas, vous avez 2 possibilités :

1. Ne pas appeler `notify()`. À la place, utilisez directement `await` sur `async_notify()`. [Voir ici pour plus de détails](/qa/#async_notify--leveraging-await-to-send-notifications).
1. Utiliser une bibliothèque qui gère précisément ce cas, appelée [nest-asyncio](https://pypi.org/project/nest-asyncio/) :

   ```bash
   pip3 install nest-asyncio
   ```

   Ensuite, dans votre application Python, importez-la simplement en haut du fichier :

   ```python
   import nest_asyncio
   # l'appliquer
   nest_asyncio.apply()
   ```

   Un problème lié à FastCGI a été remonté [ici](https://github.com/caronc/apprise/issues/610) et résolu grâce à cette méthode.
