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
  - nctalks://{hostname}/{room_id}?secret={secret}

limits:
  max_chars: 32000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Apprise peut publier dans Nextcloud Talk en tant qu'utilisateur ordinaire ou en tant que bot.

### Compte utilisateur

L'[application officielle Nextcloud Talk](https://github.com/nextcloud/spreed) doit être installée. Un 'mot de passe d'application' (également appelé mot de passe/jeton 'spécifique à l'appareil') d'un membre du salon de discussion doit être créé ; consultez la [documentation](https://docs.nextcloud.com/server/stable/user_manual/session_management.html#managing-devices) pour plus d'informations. N'oubliez pas de désactiver l'accès au système de fichiers pour ce mot de passe.

### Bot

Les bots nécessitent Nextcloud Talk 17.1 (Nextcloud 27.1) ou une version plus récente. Les messages sont publiés sous le nom du bot plutôt que sous celui d'un utilisateur.

1. Un administrateur du serveur installe le bot avec un secret partagé de 40 à 128 caractères. Le bot a besoin de la fonctionnalité `response` pour pouvoir publier des messages. L'argument URL est exigé par la commande, mais Apprise ne l'utilise pas :

   ```bash
   occ talk:bot:install --feature response \
       "Apprise" "{secret}" "https://localhost"
   ```

2. Activez le bot dans chaque conversation où il doit publier. Un modérateur peut le faire depuis les paramètres **Bots** de la conversation, ou un administrateur peut exécuter `occ talk:bot:setup {bot_id} {room_id}`.
3. Utilisez le jeton de la conversation (la dernière partie du lien de la conversation) comme `{room_id}` dans votre URL Apprise.

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

Pour publier en tant que bot, retirez l'utilisateur et le mot de passe et ajoutez le `secret` du bot :

- `nctalk://{hostname}/{room_id}?secret={secret}`
- `nctalks://{hostname}/{room_id}?secret={secret}`
- `nctalks://{hostname}:{port}/{room_id1}/{room_id2}?secret={secret}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                   |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| hostname | Oui    | Le nom d'hôte du serveur hébergeant votre service Nextcloud.                                                  |
| user     | \*Oui  | L'utilisateur du service Nextcloud que vous avez configuré.                                                   |
| password | \*Oui  | Le mot de passe associé à l'**utilisateur** de votre compte Nextcloud.                                        |
| secret   | \*Oui  | Le secret partagé d'un bot installé. À utiliser à la place d'un utilisateur et d'un mot de passe.             |
| room_id  | Oui    | L'identifiant de salon Nextcloud Talk.                                                                        |
| silent   | Non    | Mettez `yes` pour publier sans déclencher de notifications de discussion. Par défaut, cette option vaut `no`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message Nextcloud Talk sécurisé vers le salon _93nfkdn3_ :

```bash
# Assuming our {host} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345:
apprise nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3
```

Envoyer le même message en tant que bot :

```bash
# Assuming our {host} is localhost
# Assuming our bot {secret} is abcdefghijklmnopqrstuvwxyz0123456789ABCD
apprise -vv -t "Sauvegarde terminée" -b "La sauvegarde nocturne est prête." \
   'nctalks://localhost/93nfkdn3?secret=abcdefghijklmnopqrstuvwxyz0123456789ABCD'
```

:::tip
Si votre secret contient des caractères spéciaux comme `&`, `+`, `/` ou `%`, encodez-les pour l'URL (par exemple `&` devient `%26`).
:::

### Manipulation des En-têtes

Certains utilisateurs peuvent avoir besoin d'en-têtes HTTP spéciaux lors de l'envoi de données vers leur serveur. Pour cela, il suffit d'ajouter un symbole plus (**+**) devant n'importe quel paramètre précisé dans votre URL.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room 93nfkdn3
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3?+X-Token=abcdefg"

# Multiple headers just require more entries defined:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {user} is user1
# Assuming our (user1) {password} is 12345-67890-12345-67890-12345
# We want to notify Room 93nfkdn3
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "nctalks://user1:12345-67890-12345-67890-12345@localhost/93nfkdn3?+X-Token=abcdefg&+X-Apprise=is%20great"
```
