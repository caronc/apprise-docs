---
title: "Notifications Join"
description: "Envoyer des notifications Join."
sidebar:
  label: "Join"

source: https://joaoapps.com/join/

schemas:
  - join

has_image: true

sample_urls:
  - join://{apikey}/
  - join://{apikey}/{device_id}
  - join://{apikey}/{group_id}
  - join://{apikey}/{device_name}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser ce plugin :

1. Assurez-vous que votre navigateur autorise les fenetres popup, puis rendez-vous sur [joinjoaomgcd.appspot.com](https://joinjoaomgcd.appspot.com/).
2. Pour vous inscrire, il vous suffit d'autoriser la page a se lier a votre profil Google. La bonne nouvelle, c'est qu'elle ne demande rien de trop personnel.
3. Telechargez l'application sur votre telephone depuis le [Play Store](https://play.google.com/store/apps/details?id=com.joaomgcd.join).
4. Lors de la premiere ouverture sur votre telephone, l'application vous demandera une serie d'autorisations et vous posera quelques questions.
5. Si vous venez juste d'enregistrer votre appareil a l'etape precedente, vous devriez maintenant pouvoir actualiser votre navigateur sur [joinjoaomgcd.appspot.com](https://joinjoaomgcd.appspot.com/). Votre appareil devrait apparaitre dans la liste. A partir de la, vous pourrez recuperer l'API necessaire pour fonctionner avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `join://{apikey}/`
- `join://{apikey}/{device_id}`
- `join://{apikey}/{device_id1}/{device_id2}/{device_idN}`

:::note
Si aucun appareil n'est precise, alors **group.all** est utilise par defaut.
:::

Les groupes peuvent etre references comme ceci, la partie _group._ est facultative :

- `join://{apikey}/group.{group_id}`
- `join://{apikey}/group.{group_id1}/group.{group_id2}/group.{group_idN}`
- `join://{apikey}/{group_id}`
- `join://{apikey}/{group_id1}/{group_id2}/{group_idN}`

Si ce que vous specifiez n'est ni un `group` ni un `device_id`, alors ce sera interprete comme un `device_name` en repli :

- `join://{apikey}/{device_name}`
- `join://{apikey}/{device_name1}/{device_name1}/{device_nameN}`

Vous pouvez aussi melanger librement ces combinaisons :

- `join://{apikey}/{device_id}/{group_id}/{device_name}`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                              |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| apikey      | Oui         | Cle API associee a votre compte Join.                                                                    |
| device_id   | Non         | Identifiant de l'appareil auquel envoyer votre notification, une chaine alphanumerique de 32 caracteres. |
| device_name | Non         | Nom de l'appareil, PC, Nexus, etc.                                                                       |
| group_id    | Non         | Identifiant du groupe auquel envoyer votre notification.                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Join a tous nos appareils configures :

```bash
# Supposons que notre {apikey} soit abcdefghijklmnop-abcdefg
# Supposons que nous envoyions au groupe : all
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   join://abcdefghijklmnop-abcdefg/group.all
```
