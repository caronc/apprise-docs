---
title: "Démarrage Rapide"
description: "Méthodes principales : add, notify, tags et chargement de configurations."
sidebar:
  order: 2
---

## L'objet Apprise

```python
import apprise
apobj = apprise.Apprise()
```

### Ajouter des services (`add`)

La méthode `add()` enregistre des services de notification dans votre instance.

```python
# Ajouter un seul service
apobj.add('json://localhost')

# Ajouter plusieurs services d'un coup
apobj.add([
    'mailto://user:pass@example.com',
    'slack://tokenA/tokenB/tokenC'
])
```

### Envoyer des notifications (`notify`)

La méthode `notify()` envoie des messages à tous les services enregistrés.

```python
apobj.notify(
    title="Alerte serveur",
    body="L'utilisation CPU est à 99%",
)
```

#### Types de message

Vous pouvez catégoriser vos notifications avec `NotifyType`. Cela modifie souvent l'icône ou la couleur de la notification selon le service destinataire.

```python
from apprise import NotifyType

apobj.notify(
    title="Succès",
    body="La sauvegarde s'est terminée avec succès.",
    notify_type=NotifyType.SUCCESS
)
```

| Icône                                          | Type                 | Description                              |
| ---------------------------------------------- | :------------------- | :--------------------------------------- |
| ![info](./images/apprise-info-72x72.png)       | `NotifyType.INFO`    | Valeur par défaut. Information générale. |
| ![success](./images/apprise-success-72x72.png) | `NotifyType.SUCCESS` | Opérations réussies.                     |
| ![warning](./images/apprise-warning-72x72.png) | `NotifyType.WARNING` | Problèmes non fatals.                    |
| ![failure](./images/apprise-failure-72x72.png) | `NotifyType.FAILURE` | Erreurs critiques.                       |

### Tags

Les tags permettent d'envoyer des notifications à des sous-groupes précis de services.

**1. Assigner des tags**

```python
# Assigner des tags lors de l'ajout des services
apobj.add('slack://...', tag='devops')
apobj.add('mailto://...', tag='management')
apobj.add('discord://...', tag=['devops', 'management']) # Plusieurs tags
```

**2. Filtrer par tags**

```python
# Notifier UNIQUEMENT les services tagués 'devops'
apobj.notify(title="Déploiement", body="...", tag="devops")

# Notifier les services tagués 'devops' OU 'management'
apobj.notify(title="Mise à jour", body="...", tag=["devops", "management"])
```

Les expressions de tags utilisées en programmation suivent ces règles :

| Expression `notify(tag=...)` | Services sélectionnés                        |
| ---------------------------- | -------------------------------------------- |
| `"TagA"`                     | Possède `TagA`                               |
| `"TagA,TagB"`                | Possède `TagA` **ET** `TagB`                 |
| `["TagA", "TagB"]`           | Possède `TagA` **OU** `TagB`                 |
| `["TagA,TagC", "TagB"]`      | Possède (`TagA` **ET** `TagC`) **OU** `TagB` |

:::note
En Python, une liste signifie **OU**, tandis qu'une chaîne séparée par des virgules signifie **ET**.
C'est la différence la plus importante par rapport à ce que beaucoup essaient intuitivement en premier.
:::

```python
# Notifier les services tagués 'product' ET 'create'
apobj.notify(title="Créé", body="...", tag="product,create")

# Notifier les services tagués 'devops' OU 'finance'
apobj.notify(title="Rapport", body="...", tag=["devops", "finance"])

# Notifier les services correspondant à ('comment' ET 'create') OU 'admin'
apobj.notify(title="Commentaire créé", body="...", tag=["comment,create", "admin"])
```

#### Filtrage par Priorité

Les tags dans les fichiers de configuration peuvent porter un préfixe numérique de priorité (par exemple `1:alerts` ou `5:alerts` en YAML). Deux modes sont disponibles selon que vous incluez ou non une priorité dans le filtre.

**Sans préfixe de priorité -- escalade (par défaut)**

Les services sont regroupés par priorité de tag et traités dans l'ordre croissant. Si tous les services du groupe de priorité la plus basse réussissent, Apprise retourne `True` immédiatement sans déclencher les groupes de priorité supérieure. En cas d'échec, Apprise passe au groupe suivant.

```python
# Tous les services 'alerts' sont traités par priorité croissante.
# Les entrées de priorité 1 s'exécutent en premier ; si elles réussissent
# toutes, les entrées de priorité 5 ne sont jamais déclenchées.
apobj.notify(body="...", tag="alerts")
```

**Avec un préfixe de priorité -- filtre exclusif**

Seuls les services dont le tag correspondant porte exactement cette priorité sont notifiés. Pas d'escalade.

```python
# Notifier UNIQUEMENT les entrées 'alerts' de priorité 2
apobj.notify(body="...", tag="2:alerts")
```

#### Remplacement du Nombre de Tentatives par Appel

Un suffixe `:N` sur une valeur de tag remplace le nombre de tentatives configuré pour chaque service correspondant, pour cet appel uniquement :

```python
# Notifier tous les services 'alerts' en réessayant chacun jusqu'à 3 fois
apobj.notify(body="...", tag="alerts:3")

# Notifier uniquement les services 'alerts' de priorité 2 avec jusqu'à 3 tentatives
apobj.notify(body="...", tag="2:alerts:3")
```

Le nombre de tentatives ne modifie pas la configuration permanente du service.

### Pièces jointes

Passez des fichiers à `notify()` via l'argument `attach`. Les chemins locaux, les URL distantes et les données en mémoire sont tous acceptés.

```python
# Fichier local
apobj.notify(
    title="Rapport prêt",
    body="Veuillez consulter le fichier joint.",
    attach="/chemin/vers/rapport.pdf",
)

# URL distante — nom de fichier déduit automatiquement depuis le chemin (photo.jpg)
apobj.notify(
    body="Jetez un œil à ça.",
    attach="https://example.com/images/photo.jpg",
)

# URL distante avec remplacement explicite du nom via ?name=
apobj.notify(
    body="Miniature jointe.",
    attach="https://example.com/thumbnails/abc123?name=apercu.jpg",
)

# Plusieurs pièces jointes
apobj.notify(
    body="Deux fichiers joints.",
    attach=[
        "/chemin/vers/rapport.pdf",
        "https://example.com/images/photo.jpg",
    ],
)
```

Lorsqu'une URL `http://` ou `https://` est utilisée comme pièce jointe, Apprise résout le nom de fichier dans cet ordre :

1. Paramètre de requête `?name=` (s'il est présent et non vide).
2. Composant nom de fichier du chemin de l'URL (`photo.jpg` depuis `/images/photo.jpg`).
3. Repli : `attachment.001`, `attachment.002`, …

### Charger des fichiers de configuration

Vous pouvez utiliser l'objet `AppriseConfig` pour charger des URL depuis des fichiers YAML ou texte externes au lieu de les coder en dur.

```python
import apprise

# 1. Créer l'objet de configuration
config = apprise.AppriseConfig()

# 2. Ajouter des sources de configuration
config.add('/path/to/my/config.yml')
config.add('https://myserver.com/my/apprise/config')

# 3. Créer l'instance Apprise et absorber la configuration
apobj = apprise.Apprise()
apobj.add(config)

# 4. Notifier comme d'habitude (les URL du fichier sont maintenant chargées)
apobj.notify("Chargé depuis la configuration !")
```
