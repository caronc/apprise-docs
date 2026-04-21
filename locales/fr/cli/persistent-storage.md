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

## Emplacements de Stockage

Apprise stocke toutes ses données persistantes dans un répertoire unique pour chaque URL Apprise créée.

- **Extension de fichier :** `.psdata`
- **Nom de répertoire :** une chaîne alphanumérique générée de 8 caractères (UID)

Par défaut, les fichiers sont écrits dans :

- **Windows :** `%APPDATA%/Apprise/cache`
- **Linux :** `~/.local/share/apprise/cache`

## Gérer le Stockage via la CLI

### Afficher les IDs de Cache (UID)

Chaque URL Apprise que vous définissez reçoit un identifiant d'URL unique (`uid`). Pour voir quels UID ont été attribués à votre configuration, utilisez le flag `--dry-run` combiné à `--tag=all` :

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

### Nettoyage

Pour supprimer tout le stockage persistant accumulé via l'outil CLI :

```bash
apprise storage clean
```

Vous pouvez être plus précis en visant un UID ou un tag spécifique :

```bash
# Nettoyer un UID spécifique (par ex. trouvé via 'apprise storage')
apprise storage clean abc123xy

# Nettoyer toutes les URL associées au tag 'family'
apprise storage clean --tag family
```

## Modes de Stockage

L'outil CLI active le stockage persistant par défaut en mode `auto`. Vous pouvez modifier ce comportement avec le switch `--storage-mode`.

| Mode         | Description                                                                                                                                                      |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`auto`**   | (Par défaut) Le stockage persistant est utilisé lorsque cela s'applique. Seuls les plugins qui en ont besoin écrivent dans le cache local.                       |
| **`flush`**  | Semblable à `auto`, mais les modifications sont écrites immédiatement sur disque. Cela garantit des données toujours à jour, mais augmente les opérations d'I/O. |
| **`memory`** | Désactive le stockage persistant. Aucune donnée n'est écrite sur disque. Cela reproduit le comportement des anciennes versions d'Apprise.                        |
