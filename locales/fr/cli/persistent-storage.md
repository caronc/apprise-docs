---
title: Stockage Persistant
description: Comprendre comment Apprise met en cache des données pour réduire les appels API.
sidebar:
  order: 3
---

Le stockage persistant permet à Apprise de mettre des données en cache localement. Cela réduit fortement le nombre de transactions API entre vous et le ou les services que vous utilisez.

## Pourquoi utiliser le Stockage Persistant ?

Certains services nécessitent des échanges d'authentification complexes ou des recherches de ressources « coûteuses » à effectuer à chaque envoi de notification.

- **Matrix :** les informations de connexion sont mises en cache localement pour éviter une réauthentification au homeserver à chaque requête.
- **Telegram :** les détails du compte utilisateur sont mis en cache pour éviter des récupérations supplémentaires auprès du service.
- **Email (PGP) :** lorsque le chiffrement PGP est activé sans fournir de fichiers de clés explicites, Apprise génère automatiquement une paire de clés PGP et la conserve de façon persistante afin que les mêmes clés soient réutilisées à chaque exécution.

## Emplacements de Stockage

Apprise stocke toutes ses données persistantes dans un répertoire unique pour chaque URL Apprise créée.

- **Extension de fichier :** `.psdata`
- **Nom de répertoire :** une chaîne alphanumérique générée de 8 caractères (UID)

Par défaut, les fichiers sont écrits dans :

- **Windows :** `%APPDATA%/Apprise/cache`
- **Linux :** `~/.local/share/apprise/cache`

## Gérer le Stockage via la CLI

### Afficher les IDs de Cache (UID)

Chaque URL Apprise que vous définissez reçoit un identifiant d'URL unique (`uid`). La façon la plus directe de trouver l'UID d'une URL spécifique est de la passer directement à `apprise storage list` :

```bash
apprise storage list "mailtos://user:pass@example.com"
```

Cela affiche le hash d'espace de noms de 8 caractères (`uid`) de cette URL ainsi que son état actuel, même si aucune donnée n'a encore été écrite (l'état affiche `unused`). Le répertoire de cache complet sur disque est `{storage-path}/{uid}/`.

Pour voir les UID de toutes les URL chargées en une seule fois, utilisez le flag `--dry-run` combiné à `--tag=all` :

```bash
apprise --dry-run --tag=all
```

**Exemple de sortie :**
![Apprise Dry Run Output](/cli/images/01abafebf75ad38d.jpeg)

_Notez que certains plugins (comme `dbus://`) affichent `- n/a -`, ce qui indique qu'ils n'utilisent pas le stockage persistant._

### Lister le Stockage Actif

Vous pouvez inspecter l'état actuel de votre stockage persistant à l'aide de la commande `storage` :

```bash
apprise storage
```

**Exemple de sortie :**
![Apprise Storage List](/cli/images/3993e3ece1157fec.jpeg)

La sortie affiche :

1. **Groupement :** plusieurs URL partageant les mêmes identifiants partagent le même endpoint de stockage.
2. **Utilisation disque :** l'espace actuellement occupé.
3. **Statut :**
   - `active` : le plugin possède des données mises en cache sur disque ;
   - `unused` : le plugin n'occupe actuellement aucun espace ;
   - `stale` : un plugin avait précédemment écrit des données ici, mais n'est plus référencé par votre configuration actuelle.

Vous pouvez filtrer la liste par préfixe d'UID ou en passant une URL Apprise complète :

```bash
# Filtrer par préfixe d'UID sur 8 caractères (correspondance la plus proche)
apprise storage list abc1

# Filtrer par URL complète — résolue automatiquement vers son espace de noms
apprise storage list "mailtos://user:pass@example.com"
```

### Purger le Stockage Obsolète

Pour supprimer les données en cache qui ont expiré ou ne sont plus à jour, utilisez la commande `prune` :

```bash
apprise storage prune
```

Par défaut, Apprise supprime les données de plus de 30 jours. Vous pouvez ajuster ce seuil avec `--storage-prune-days` :

```bash
# Supprimer les données de plus de 7 jours
apprise storage prune --storage-prune-days 7
```

Vous pouvez limiter la purge à une URL spécifique, un préfixe d'UID ou un tag — seul le stockage appartenant aux plugins correspondants est éligible à la suppression :

```bash
# Purger uniquement le stockage d'une URL spécifique
apprise storage prune "mailtos://user:pass@example.com"

# Purger un préfixe d'UID spécifique
apprise storage prune abc1

# Purger uniquement le stockage des URL associées au tag 'family'
apprise storage prune --tag family
```

### Effacer le Stockage

Pour effacer immédiatement toutes les données en cache (quelle que soit leur ancienneté), utilisez la commande `clear` :

```bash
apprise storage clear
```

Vous pouvez être plus précis en ciblant un UID spécifique, une URL complète ou un tag — seuls les espaces de noms des plugins correspondants sont effacés :

```bash
# Effacer un UID spécifique (par ex. trouvé via 'apprise storage list')
apprise storage clear abc123xy

# Effacer via une URL complète — résolue automatiquement vers son espace de noms
apprise storage clear "mailtos://user:pass@example.com"

# Effacer toutes les URL associées au tag 'family'
apprise storage clear --tag family
```

## Modes de Stockage

L'outil CLI active le stockage persistant par défaut en mode `auto`. Vous pouvez modifier ce comportement avec le switch `--storage-mode`.

| Mode         | Description                                                                                                                                                      |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`auto`**   | (Par défaut) Le stockage persistant est utilisé lorsque cela s'applique. Seuls les plugins qui en ont besoin écrivent dans le cache local.                       |
| **`flush`**  | Semblable à `auto`, mais les modifications sont écrites immédiatement sur disque. Cela garantit des données toujours à jour, mais augmente les opérations d'I/O. |
| **`memory`** | Désactive le stockage persistant. Aucune donnée n'est écrite sur disque. Cela reproduit le comportement des anciennes versions d'Apprise.                        |
