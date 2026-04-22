---
title: "Notifications Pushover"
description: "Envoyer des notifications Pushover."
sidebar:
  label: "Pushover"

source: https://pushover.net/

schemas:
  - pover

has_attachments: true

sample_urls:
  - pover://{user_key}@{token}
  - pover://{user_key}@{token}/{device_id}
  - pover://{user_key}@{token}/{device_id1}/{device_id2}/{device_idN}
  - pover://{user_key}@{token}/#{group_key}
  - pover://{user_key}@{token}/{device_id}/#{group_key}

limits:
  max_chars: 512
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

La configuration des notifications Pushover est assez simple. Le message est essentiellement transmis a votre compte Pushover en ligne, puis redirige vers les appareils que vous y avez configures.

### Recuperer votre User Key

Une fois connecte au [site web](https://pushover.net/), votre tableau de bord affichera votre **{user_key}**.

### Recuperer votre Jeton API

Sur le tableau de bord, apres connexion, faites defiler vers le bas pour trouver l'option permettant de generer une application. Une fois cette operation effectuee, un jeton API associe a cette application vous sera fourni. Il deviendra votre **{token}**.

## Syntaxe

La syntaxe valide est la suivante :

- `pover://{user_key}@{token}`
- `pover://{user_key}@{token}/{device_id}`
- `pover://{user_key}@{token}/{device_id1}/{device_id2}/{device_idN}`
- `pover://{user_key}@{token}/#{group_key}`
- `pover://{user_key}@{token}/{device_id}/#{group_key}`
- `pover://{user_key}@{token}?priority={priority}`
- `pover://{user_key}@{token}?priority=emergency&expire={expire}&retry={retry}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user_key  | Oui         | Identifiant de cle utilisateur associe a votre compte Pushover. Ce n'est **pas** votre adresse e-mail. Cette cle peut etre recuperee depuis votre tableau de bord Pushover.                                                                                                                                                                                                                                                                                                                                                |
| token     | Oui         | Jeton associe a votre compte Pushover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| device_id | Non         | Identifiant de l'appareil auquel envoyer la notification. Si aucune valeur n'est precisee, tous les appareils associes a votre compte seront notifies.                                                                                                                                                                                                                                                                                                                                                                     |
| group_key | Non         | Cle d'un [groupe de diffusion](https://pushover.net/api/groups) Pushover, prefixee par `#`. Les group_key ressemblent aux user_key et permettent de diffuser un message a tous les membres d'un groupe avec une seule cle. Plusieurs groupes peuvent etre specifies. Les groupes et les appareils peuvent etre melanges dans une meme URL.                                                                                                                                                                                 |
| priority  | Non         | Peut etre **low**, **moderate**, **normal**, **high** ou **emergency** ; la valeur par defaut est **normal** si aucune priorite n'est precisee. <br/>Pour envoyer une notification en priorite d'urgence, les parametres `retry` et `expire` _devraient_ etre fournis. Vous pouvez aussi utiliser les priorites telles que documentees dans l'[API Pushover](https://pushover.net/api#priority), ou `-2` est **low**, `-1` est **moderate**, `0` est **normal**, `1` est **high** et `2` est **emergency**.                |
| expire    | Non         | Le parametre `expire` precise pendant combien de secondes votre notification continuera a etre retentee, toutes les `retry` secondes. Si la notification n'a pas ete acquittee avant `expire` secondes, elle sera marquee comme expiree et ne sera plus envoyee. Notez qu'elle reste visible pour l'utilisateur apres expiration, mais ne lui demandera plus d'acquittement. Cette valeur ne peut pas depasser 10800 secondes, soit 3 heures. La valeur par defaut est 3600 secondes, soit 1 heure, si rien n'est precise. |
| retry     | Non         | Le parametre `retry` precise a quelle frequence, en secondes, les serveurs Pushover renverront la meme notification a l'utilisateur. Si l'utilisateur se trouve dans un environnement bruyant ou dort, retenter la notification, avec son et vibration, peut aider a attirer son attention. Cette valeur doit etre d'au moins 30 secondes entre deux tentatives. La valeur par defaut est 900 secondes, soit 15 minutes, si rien n'est precise.                                                                            |
| sound     | Non         | Permet de preciser l'un des effets sonores facultatifs identifies [ici](https://pushover.net/api#sounds). Le son par defaut est **pushover**.                                                                                                                                                                                                                                                                                                                                                                              |
| url       | Non         | Permet de fournir une URL supplementaire accompagnee de votre message.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| url_title | Non         | Permet de fournir un titre pour l'URL supplementaire accompagnee de votre message.                                                                                                                                                                                                                                                                                                                                                                                                                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Sons Personnalises

L'integration Pushover limite normalement les sons de notification a une liste predefinie. Cette prise en charge ajoute la possibilite d'utiliser un son personnalise dans les notifications, a condition qu'il ait ete televerse et nomme. L'integration Pushover a donc ete mise a jour pour permettre de specifier ce nom au lieu de declencher une erreur.

1. Allez dans Settings -> Alert Settings -> Manage custom sounds -> Upload a sound
1. Televersez un son et donnez-lui un nom, par exemple "mysound".
1. Verifiez que le son est accessible et apparait dans la liste des sons de votre application via <https://api.pushover.net/1/sounds.json?token={app-token}>
1. Precisez ensuite ce son dans votre appel `pover`, par exemple `apprise -vv -t "title" -b "test message" pover://user@app?sound=mysound`

Vous devriez entendre votre son personnalise sur la notification. Si le nom du son personnalise n'est pas trouve, le son de notification Pushover par defaut sera joue.

## Exemples

Envoyer une notification Pushover a tous nos appareils configures :

```bash
# Supposons que notre {user_key} soit 435jdj3k78435jdj3k78435jdj3k78
# Supposons que notre {token} soit abcdefghijklmnop-abcdefg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg
```

Envoyer une notification Pushover a un groupe de diffusion :

```bash
# Supposons que notre {user_key} soit 435jdj3k78435jdj3k78435jdj3k78
# Supposons que notre {token} soit abcdefghijklmnop-abcdefg
# Supposons que notre {group_key} soit gznej3rKEVAvPUxu9vvNnqpmZpokzF
# Le prefixe # l'identifie comme une group key
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg/#gznej3rKEVAvPUxu9vvNnqpmZpokzF"
```

Envoyer une notification Pushover avec la priorite Emergency :

```bash
# La priorite Emergency recommande aussi de preciser les valeurs
# expire et retry.
# Supposons que notre {user_key} soit 435jdj3k78435jdj3k78435jdj3k78
# Supposons que notre {token} soit abcdefghijklmnop-abcdefg
# L'exemple ci-dessous definit une expiration de 1 heure et tente
# de renvoyer le message toutes les 10 minutes :
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg?priority=emergency&retry=600&expire=3600
```
