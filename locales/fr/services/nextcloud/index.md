---
title: "Notifications Nextcloud"
description: "Envoyer Nextcloud notifications."
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

## Configuration du compte

The official [Notifications app](https://github.com/nextcloud/notifications) will need to be installed. An 'app password' (also referred to as 'device-specific' password/token) of the admin-user will need to be created, see the [documentation](https://docs.nextcloud.com/server/19/user_manual/session_management.html#device-specific-passwords-and-password-changes) for more information. Don't forget to disable file system access for this password.

## Syntaxe

Secure connections (via https) should be referenced using **nclouds://** where as insecure connections (via http) should be referenced via **ncloud://**.

La syntaxe valide est la suivante :

- `ncloud://{hostname}/{targets}`
- `ncloud://{hostname}:{port}/{targets}`
- `ncloud://{admin_user}:{password}@{hostname}/{targets}`
- `ncloud://{admin_user}:{password}@{hostname}:{port}/{targets}`
- `nclouds://{hostname}/{targets}`
- `nclouds://{hostname}:{port}/{targets}`
- `nclouds://{admin_user}:{password}@{hostname}/{targets}`
- `nclouds://{admin_user}:{password}@{hostname}:{port}/{targets}`

Targets can either be a `user` or `@group`.

You can notify more then one user by simply chaining them at the end of the URL.

- `ncloud://{admin_user}:{password}@{hostname}/{notify_user1}/{notify_user2}/{notify_userN}`
- `nclouds://{admin_user}:{password}@{hostname}/{notify_user1}/{notify_user2}/{notify_userN}`
- `ncloud://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_group2}/{notify_groupN}`
- `nclouds://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_group2}/{notify_groupN}`

You can mix/match `@group` and `user` values as well:

- `ncloud://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_user1}`
- `nclouds://{admin_user}:{password}@{hostname}/{notify_group1}/{notify_user1}`

## Detail des parametres

| Variable    | Required | Description                                                                                                                                                                                                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname    | Yes      | The hostname of the server hosting your Nextcloud service.                                                                                                                                                                        |
| admin_user  | Yes      | The administration user of the next cloud service you have set up.                                                                                                                                                                |
| password    | Yes      | The administrator password associated with the **admin_user** for your Nextcloud account.                                                                                                                                         |
| notify_user | Yes      | One or more users you wish to send your notification to.                                                                                                                                                                          |
| to          | No       | This is an alias to the notify_user variable.                                                                                                                                                                                     |
| version     | No       | NextCloud changed their API around with v21. By default Apprise uses their latest API spec. If you're using an older version, you can sent this value accordingly and Apprise will accommodate (switching back to the older API). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une secure nextcloud notification to the user _chucknorris_:

```bash
# Assuming our {host} is localhost
# Assuming our {admin_user} is admin
# Assuming our (admin) {password} is 12345-67890-12345-67890-12345:
apprise nclouds://admin:12345-67890-12345-67890-12345@localhost/chucknorris
```

### Manipulation des en-tetes

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a hyphen (**-**) in front of any parameter you specify on your URL string.

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

Users:

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/user1/user2"
```

Group:

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/#DevTeam"
```

Everyone:

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/all"
```

Mixed (deduplicated):

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host/#DevTeam/user3/all"
```

Sub-path:

```bash
apprise -vv -t "Title" -b "Message" \
  "ncloud://admin:pass@host:8080/#Ops?url_prefix=/nextcloud"
```
