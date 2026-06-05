---
title: "Notifications Nextcloud Talk"
description: "Envoyer des notifications Nextcloud Talk."
sidebar:
  label: "Nextcloud Talk"

source: https://nextcloud.com/talk

schemas:
  - nctalk: insecure
  - nctalks

has_chat: true
has_selfhosted: true

sample_urls:
  - nctalk://{user}:{password}@{hostname}/{room_id}
  - nctalks://{user}:{password}@{hostname}:{port}/{room_id}

limits:
  max_chars: 32000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

L'[application officielle Nextcloud Talk](https://github.com/nextcloud/spreed) doit être installée. Un 'mot de passe d'application' (également appelé mot de passe/jeton 'spécifique à l'appareil') d'un membre du salon de discussion doit être créé ; consultez la [documentation](https://docs.nextcloud.com/server/stable/user_manual/session_management.html#managing-devices) pour plus d'informations. N'oubliez pas de désactiver l'accès au système de fichiers pour ce mot de passe.

## Syntaxe

Les connexions sécurisées (via https) doivent utiliser **nctalks://** tandis que les connexions non sécurisées (via http) doivent utiliser **nctalk://**.

La syntaxe valide est la suivante :

- `nctalk://{user}:{password}@{hostname}/{room_id}`
- `nctalk://{user}:{password}@{hostname}:{port}/{room_id}`
- `nctalks://{user}:{password}@{hostname}/{room_id}`
- `nctalks://{user}:{password}@{hostname}:{port}/{room_id}`

Vous pouvez publier dans plusieurs salons en les enchaînant simplement à la fin de l'URL.

- `nctalk://{user}:{password}@{hostname}:{port}/{room_id1}/{room_id2}/{room_id3}`
- `nctalks://{user}:{password}@{hostname}:{port}/{room_id1}/{room_id2}/{room_id3}`

## Détail des Paramètres

| Variable | Requis | Description                                                            |
| -------- | ------ | ---------------------------------------------------------------------- |
| hostname | Oui    | Le nom d'hôte du serveur hébergeant votre service Nextcloud.           |
| user     | Oui    | L'utilisateur du service Nextcloud que vous avez configuré.            |
| password | Oui    | Le mot de passe associé à l'**utilisateur** de votre compte Nextcloud. |
| room_id  | Oui    | L'identifiant de salon Nextcloud Talk.                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message Nextcloud Talk sécurisé vers le salon _93nfkdn3_ :

```bash
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345:
apprise nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3
```

### Manipulation des En-têtes

Certains utilisateurs peuvent avoir besoin d'en-têtes HTTP spéciaux lors de l'envoi de données vers leur serveur. Cela peut être accompli en ajoutant un tiret (**-**) devant tout paramètre spécifié dans la chaîne d'URL.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# We want to send an insecure connection (we'll use ncloud://)
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room _93nfkdn3_:
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3?-X-Token=abcdefg

# Multiple headers just require more entries defined with a hyphen in front:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room _93nfkdn3_:
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   nctalks://user1:12345-67890-12345-67890-12345@localhost/arnold?-X-Token=abcdefg&-X-Apprise=is%20great
```
