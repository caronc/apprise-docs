---
title: "Notifications Nextcloud"
description: "Envoyer des notifications Nextcloud."
sidebar:
  label: "Nextcloud"

source: https://nextcloud.com

schemas:
  - ncloud: insecure
  - nclouds

sample_urls:
  - nclouds://{hostname}/@{user}
  - nclouds://{hostname}:{port}/#{group}
  - nclouds://{admin_user}:{password}@{hostname}/@{user1}/@{user2}/#{group}

limits:
  max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

L'application officielle [Notifications](https://github.com/nextcloud/notifications) doit être installée. Un « mot de passe d'application » (également appelé mot de passe/token « spécifique à l'appareil ») de l'utilisateur administrateur doit être créé ; consultez la [documentation](https://docs.nextcloud.com/server/19/user_manual/session_management.html#device-specific-passwords-and-password-changes) pour plus d'informations. N'oubliez pas de désactiver l'accès au système de fichiers pour ce mot de passe.

## Syntaxe

Les connexions sécurisées (via https) doivent être référencées avec **nclouds://** tandis que les connexions non sécurisées (via http) doivent utiliser **ncloud://**.

La syntaxe valide est la suivante :

- `ncloud://{hostname}/{targets}`
- `ncloud://{hostname}:{port}/{targets}`
- `ncloud://{admin_user}:{password}@{hostname}/{targets}`
- `ncloud://{admin_user}:{password}@{hostname}:{port}/{targets}`
- `nclouds://{hostname}/{targets}`
- `nclouds://{hostname}:{port}/{targets}`
- `nclouds://{admin_user}:{password}@{hostname}/{targets}`
- `nclouds://{admin_user}:{password}@{hostname}:{port}/{targets}`

Les cibles peuvent être un `user` ou un `@group`.

Vous pouvez notifier plusieurs utilisateurs en les enchaînant simplement à la fin de l'URL.

- `ncloud://{admin_user}:{password}@{hostname}/{notify_user1}/{notify_user2}/{notify_userN}`
- `nclouds://{admin_user}:{password}@{hostname}/{notify_user1}/{notify_user2}/{notify_userN}`
- `ncloud://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_group2}/{notify_groupN}`
- `nclouds://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_group2}/{notify_groupN}`

Vous pouvez également combiner des valeurs `@group` et `user` :

- `ncloud://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_user1}`
- `nclouds://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_user1}`

## Détail des Paramètres

| Variable    | Requis | Description                                                                                                                                                                                                                                                          |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname    | Oui    | Le nom d'hôte du serveur hébergeant votre service Nextcloud.                                                                                                                                                                                                         |
| admin_user  | Oui    | L'utilisateur administrateur du service Nextcloud que vous avez configuré.                                                                                                                                                                                           |
| password    | Oui    | Le mot de passe administrateur associé à **admin_user** pour votre compte Nextcloud.                                                                                                                                                                                 |
| notify_user | Oui    | Un ou plusieurs utilisateurs auxquels vous souhaitez envoyer votre notification.                                                                                                                                                                                     |
| to          | Non    | Alias de la variable notify_user.                                                                                                                                                                                                                                    |
| version     | Non    | NextCloud a modifié son API à partir de la v21. Par défaut, Apprise utilise la dernière spécification de leur API. Si vous utilisez une version plus ancienne, vous pouvez définir cette valeur en conséquence et Apprise s'adaptera (en revenant à l'ancienne API). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Nextcloud sécurisée à l'utilisateur _chucknorris_ :

```bash
# Assuming our {host} is localhost
# Assuming our {admin_user} is admin
# Assuming our (admin) {password} is 12345-67890-12345-67890-12345:
apprise nclouds://admin:12345-67890-12345-67890-12345@localhost/chucknorris
```

### Manipulation des En-têtes

Certains utilisateurs peuvent nécessiter la présence d'en-têtes HTTP spéciaux lors de la publication de données sur leur serveur. Cela peut être accompli en ajoutant simplement un tiret (**-**) devant tout paramètre spécifié dans la chaîne d'URL.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# We want to send an insecure connection (we'll use ncloud://)
# Assuming our {host} is localhost
# Assuming our {admin_user} is admin
# Assuming our (admin) {password} is 12345-67890-12345-67890-12345:
# We want to notify arnold
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ncloud://admin:12345-67890-12345-67890-12345@localhost/arnold?-X-Token=abcdefg

# Multiple headers just require more entries defined with a hyphen in front:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {host} is localhost
# Assuming our {admin_user} is admin
# Assuming our (admin) {password} is secret:
# We want to notify arnold
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ncloud://admin:12345-67890-12345-67890-12345@localhost/arnold?-X-Token=abcdefg&-X-Apprise=is%20great

# If we're using an older version of NextCloud (their API changed) we may need
# to let Apprise know this (using the version= directive)
apprise -t "Title" -b "Body" "ncloud://admin:12345-67890-12345-67890-12345@localhost/arnold??version=20"

```

Utilisateurs :

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/user1/user2"
```

Groupe :

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/#DevTeam"
```

Tous :

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/all"
```

Mixte (dédupliqué) :

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/#DevTeam/user3/all"
```

Sous-chemin :

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host:8080/#Ops?url_prefix=/nextcloud"
```
