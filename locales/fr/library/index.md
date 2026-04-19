---
title: "Bibliothèque Python Apprise (cœur)"
description: "Integrez directement les notifications Apprise dans vos applications Python."
sidebar:
  label: "Introduction"
  order: 1
---

La bibliotheque Apprise vous permet d'envoyer des notifications vers la quasi-totalite des services de notification populaires d'aujourd'hui (Telegram, Discord, Slack, e-mail, etc.) a l'aide d'une API Python unique et unifiee.

Pour les utilitaires communs utilises dans les plugins, consultez la [reference des utilitaires](./utilities/).

## Installation

Apprise est disponible sur PyPI et peut etre installe via pip.

```bash
pip install apprise
```

## Bonjour le monde

L'objet central de la bibliotheque est `Apprise`. Vous l'instanciez, vous ajoutez des URL et vous declenchez des notifications.

```python
import apprise

# 1. Instancier l'objet Apprise
apobj = apprise.Apprise()

# 2. Ajouter une ou plusieurs URL de service
apobj.add('mailto://myuser:mypass@hotmail.com')
apobj.add('tgram://123456789:ABCDefghIJKLmnOPqrstUVwxyz')

# 3. Envoyer une notification vers tous les services ajoutes
apobj.notify(
    body='Quel excellent service de notification !',
    title='Titre de ma notification',
)
```

## Pourquoi utiliser la bibliotheque ?

- **Syntaxe unifiee** : un format d'URL unique pour **<!-- SERVICES:COUNT -->** services.
- **Asynchrone** : l’envoi des notifications est non bloquant (facultatif).
- **Etiquetage** : regroupez les services (par ex. `devops`, `billing`) et notifiez-les de maniere selective.
- **Pieces jointes** : envoyez facilement des fichiers et des images.
- **Texte enrichi** : prise en charge des emojis ainsi que du HTML, du texte brut et du Markdown
- **Configuration** : chargez des URL depuis des fichiers YAML/Texte ou des points de terminaison API.
