---
title: "Notifications Notifiarr"
description: "Envoyer des notifications Notifiarr."
---

## Notifications Notifiarr

- **Source** : <https://notifiarr.com>
- **Prise en Charge des Icônes** : Non
- **Prise en Charge des Pièces Jointes** : Non
- **Format des Messages** : Texte
- **Limite des Messages** : 32768 caractères par message

## Configuration du Compte

Vous devez d'abord creer un compte chez [Notifiarr](https://notifiarr.com) si vous n'en avez pas deja un. A partir de la, vous pourrez generer votre `{api_key}`. Vous devrez utiliser votre cle API “globale” ; les cles API Notifiarr specifiques aux integrations ne fonctionnent pas avec Apprise.

### Identifiants de Canal Discord

Pour utiliser Notifiarr, vous avez besoin de votre identifiant de canal Discord. **Il doit s'agir de sa version numerique**. [Voici de bonnes instructions pour le recuperer](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).

En bref :

- **Activez le mode developpeur** en allant dans les _parametres Discord_, puis dans **Appearance**.

### Mentionner des roles, tags et utilisateurs

Le corps du message Notifiarr peut contenir des elements comme les suivants pour declencher les pings appropries :

- **user** : `<@123>`
- **role** : `<@&456>`
- **tag** : `@everyone`

**Remarque :** a la date du 28 juillet 2024, le webhook amont vers Notifiarr ne prend en charge qu'un seul utilisateur ou role dans la charge utile. Si vous en fournissez plusieurs, seul le premier sera transmis en amont.

## Syntaxe

La syntaxe valide est la suivante :

- `notifiarr://{api_key}/{channel_id}`
- `notifiarr://{api_key}/{channel1_id}/{channel2_id}/{channelN_id}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                              |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| api_key  | Oui         | Votre cle API Notifiarr globale, et non specifique a une integration.                                                                                                    |
| source   | Non         | Permet facultativement de fournir la source de la notification sous forme de chaine descriptive, vous pouvez aussi utiliser `from` comme alias.                          |
| event    | Non         | Permet facultativement de specifier l'identifiant d'evenement Notifiarr que vous souhaitez mettre a jour. Si aucun n'est precise, une nouvelle notification est generee. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Discord :

```bash
# Supposons que notre {APIKey} soit 4174216298
# Supposons que notre {ChannelID} soit 123456789
# Testez les changements avec la commande suivante :
apprise -t "Test Title" -b "Test Message" \
"notifiarr://4174216298/123456789"

```

Si vous avez un Discord Event ID que vous souhaitez reutiliser, vous pouvez faire ceci :

```bash
# Supposons que notre {APIKey} soit 4174216298
# Supposons que notre {ChannelID} soit 123456789
# Supposons que notre {EventID} soit 1234
# Testez les changements avec la commande suivante :
apprise -t "Test Title" -b "Test Message" \
"notifiarr://4174216298/123456789?event=1234"

```
