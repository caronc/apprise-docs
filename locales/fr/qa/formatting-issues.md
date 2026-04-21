---
title: "Problèmes de Formatage"
description: "Comprendre comment Apprise gère HTML, TEXT et Markdown"
sidebar:
  order: 10
---

## Introduction

Si votre service amont n'interprète pas correctement les informations que vous lui transmettez, il s'agit peut-être simplement d'un petit ajustement à faire dans Apprise.

Le point important avec Apprise, c'est qu'il ne sait pas ce que vous lui donnez (c'est-à-dire le format du texte). Par défaut, il transmet donc exactement ce que vous lui fournissez au service amont. Comme l'email utilise du formatage HTML par défaut, si vous lui envoyez du texte brut, il peut mal interpréter les retours à la ligne (car HTML ignore ces caractères).

## Manipulation des URL Apprise

Vous pouvez forcer le service amont avec lequel vous travaillez à diffuser son contenu en `text`, `html` ou `markdown` en le précisant dans l'URL Apprise que vous construisez. Par exemple, l'URL ci-dessous indique à `mailto://` de transmettre le contenu fourni en `text` :

- `mailtos://example.com?user=username&pass=password&to=myspy@example.com&format=text`

:::note
Cela ne fonctionne pas dans tous les cas ; le service doit prendre en charge cette fonctionnalité. Forcer un `format=` non pris en charge est sans danger ; il sera simplement ignoré.
:::

## CLI Apprise

Par défaut, l'outil `apprise` interprète tout ce qu'il reçoit comme du `text`. Si vous savez que les données que vous lui transmettez sont en `markdown` ou en `html`, vous pouvez le préciser à Apprise avec `--input-format <format>` (`-i <format>`). Cela permet à Apprise de prendre de meilleures décisions sur les données reçues.

## Développeurs

Pour les développeurs, votre appel à `notify()` devrait inclure une valeur `body_format` :

```python
# un import supplémentaire pour garder votre code propre
from apprise import NotifyFormat

apobj.notify(
    body=message,
    title='Mon titre de notification',
    body_format=NotifyFormat.TEXT,
)
```

Vous pouvez aussi définir `body_format` comme variable globale afin de ne pas devoir le préciser à chaque appel de `notify()` si vous utilisez cela à plusieurs endroits dans votre code :

```python
import apprise
from apprise import NotifyFormat
from apprise import AppriseAsset

# Créer votre asset Apprise
asset = apprise.Asset(body_format=apprise.NotifyFormat.TEXT)

# Créer votre objet Apprise (en lui passant l'asset)
apobj = apprise.Apprise(asset=asset)

# Ajouter vos objets comme d'habitude
apobj.add('mailtos://example.com?user=username&pass=password&to=myspy@example.com')

# Et votre message multilignes
message = """
Ce message s'autodétruira dans 10 secondes...

Ou pas... (... oui, probablement pas du tout)

Chris
"""

# La grande différence ici, c'est que tous les appels à notify ont déjà
# body_format défini sur TEXT. Apprise sait donc que tout ce que vous lui
# transmettez sera toujours dans ce format.
# Vous pouvez quand même préciser body_format plus tard si vous devez le
# surcharger, mais votre appel à notify reste simple comme avant
# (et cette fois le multilignes fonctionnera) :
apobj.notify(
    body=message,
    title='Mon titre de notification',
)
```

**En résumé :**

- Les développeurs peuvent utiliser l'attribut `body_format`, qui indique à Apprise quel est le format de la **source d'entrée**. Si Apprise le connaît, il peut effectuer les adaptations nécessaires pour les services qui attendent un autre format. Par défaut, `body_format` vaut `None` et aucune modification n'est apportée aux données fournies à Apprise.
- L'utilisateur final peut modifier son URL pour préciser `format=` avec l'une des valeurs `text`, `markdown` ou `html`, ce qui définit le format de la **sortie**. Les plugins de notification peuvent utiliser cette information pour adapter leur comportement à votre cas.
