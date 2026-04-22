---
title: "Notifications Boxcar"
description: "Envoyer des notifications Boxcar."
sidebar:
  label: "Boxcar"

source: https://boxcar.io/
schemas:
  - boxcar

has_image: true
sample_urls:
  - boxcar://{access_key}/{secret_key}/{device_id}
  - boxcar://{access_key}/{secret_key}/{device_id01}/{device_id02}/{device_idNN}

limits:
  - max_chars: 10000

ended: 2019-02
---

:::note

## Raison de Fin de Service

Inconnue

💡Le service a ete retire d'Apprise dans [apprise/1219](https://github.com/caronc/apprise/issues/1219)
:::

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Boxcar ne propose aujourd'hui plus qu'une plateforme de developpement. Vous ne pouvez plus recevoir de notifications sur vos appareils AppleOS ou Android, mais vous pouvez toujours creer un compte [sur leur site web](https://boxcar.io/) et y creer des projets.

Chaque _project_ que vous creez vous donnera acces a votre propre **Access Key** unique ainsi qu'a une **Secret Key**. Vous pourrez publier des notifications a l'aide de ces 2 valeurs.

## Syntaxe

La syntaxe valide est la suivante :

- `boxcar://{access_key}/{secret_key}`

Prise en charge des tags :

- `boxcar://{access_key}/{secret_key}/@{tag_id}`
- `boxcar://{access_key}/{secret_key}/@{tag_id01}/@{tag_id02}/@{tag_idNN}`

Jetons d'appareil :

- `boxcar://{access_key}/{secret_key}/{device_id}`
- `boxcar://{access_key}/{secret_key}/{device_id01}/{device_id02}/{device_idNN}`

Vous pouvez egalement combiner les formes ci-dessus et effectuer les mises a jour depuis une seule URL :

- `boxcar://{access_key}/{secret_key}/@{tag_id}**/{device_id}`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                          |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| access_key | Oui         | Cette valeur est requise pour que votre compte fonctionne. Elle vous est fournie par le site Boxcar lors de la creation d'un compte. |
| secure_key | Oui         | Cette valeur est requise pour que votre compte fonctionne. Elle vous est fournie par le site Boxcar lors de la creation d'un compte. |
| device_id  | Non         | Appareils associes a votre configuration Boxcar. Tous les _device_ids_ font 64 caracteres.                                           |
| tag_id     | Non         | Les tags doivent etre prefixes par un symbole `@`, sinon ils seront interpretes comme un _device_id_ et/ou un _alias_.               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Boxcar a tous les appareils associes a un projet :

```bash
# Supposons :
#  - que notre {access_key} soit pJz1KEP5zGo9KwDnIb-7_Kab
#  - que notre {secret_key} soit j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   boxcar://pJz1KEP5zGo9KwDnIb-7_Kab/j300012fl9y0b5AW9g9Nsejb8P
```
