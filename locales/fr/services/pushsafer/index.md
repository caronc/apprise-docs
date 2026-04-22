---
title: "Notifications Pushsafer"
description: "Envoyer Pushsafer notifications."
sidebar:
  label: "Pushsafer"

source: https://www.pushsafer.com

schemas:
  - psafer: insecure
  - psafers

has_attachments: true

sample_urls:
  - psafers://{private_key}
  - psafers://{private_key}/{device_id}
  - psafers://{private_key}/{device_id1}/{device_id2}/{device_idN}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

La configuration des notifications PushSafer est assez simple. Le message est essentiellement transmis a votre compte PushSafer en ligne, puis redirige vers les appareils que vous y avez configures.

### Recuperer votre Private Key

Une fois connecte a leur [site officiel](https://www.pushsafer.com/), vous pouvez trouver votre **{private_key}** sur votre [tableau de bord](https://www.pushsafer.com/dashboard/).

## Syntaxe

La syntaxe valide est la suivante :

- `psafers://{private_key}`
- `psafers://{private_key}/{device_id}`
- `psafers://{private_key}/{device_id1}/{device_id2}/{device_idN}`
- `psafers://{private_key}?priority={priority}`
- `psafers://{private_key}?priority=emergency&sound=okay`
- `psafers://{private_key}?vibrate=2`

Si aucun appareil n'est precise, l'appareil reserve `a` est utilise par defaut. Le `a` notifie **tous** les appareils actuellement associes a votre compte.

Des connexions securisees sont toujours etablies lorsque vous utilisez `psafers://`. Toutefois, `psafer://` fonctionne aussi si vous souhaitez utiliser une connexion non chiffree.

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                         |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| private_key | Oui         | Cle privee associee a votre compte PushSafer. Vous pouvez la trouver sur votre [tableau de bord](https://www.pushsafer.com/dashboard/) apres connexion.                                                                                                                                                                                                                             |
| device_id   | Non         | Identifiant de l'appareil auquel envoyer votre notification. Si aucune valeur n'est precisee, tous les appareils associes a votre compte sont notifies.                                                                                                                                                                                                                             |
| priority    | Non         | Peut etre **low**, **moderate**, **normal**, **high** ou **emergency** ; par defaut, la valeur utilisee est celle deja definie pour l'appareil notifie.                                                                                                                                                                                                                             |
| sound       | Non         | Permet facultativement d'indiquer l'un des effets sonores disponibles [ici](https://www.pushsafer.com/en/pushapi#api-sound). Par defaut, cette variable n'est pas definie.                                                                                                                                                                                                          |
| vibration   | Non         | Les appareils Android et iOS peuvent vibrer a la reception d'une notification. En definissant cette valeur, vous reglez la force de vibration. Vous pouvez utiliser **1**, **2** ou **3**, ou 3 correspond a la vibration maximale et 1 a une vibration plus legere. Par defaut, cette variable n'est pas definie et laisse donc les reglages propres a votre appareil s'appliquer. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification PushSafer a tous nos appareils configures :

```bash
# Supposons que notre {private_key} soit 435jdj3k78435jdj3k78435jdj3k78
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   psafers://435jdj3k78435jdj3k78435jdj3k78
```

Envoyer une notification PushSafer avec la priorite Emergency :

```bash
# La priorite Emergency recommande aussi de preciser les valeurs
# expire et retry.
# Supposons que notre {user_key} soit 435jdj3k78435jdj3k78435jdj3k78
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   psafers://435jdj3k78435jdj3k78435jdj3k78?priority=emergency
```
