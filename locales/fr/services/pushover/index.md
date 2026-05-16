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
- `pover://{user_key}@{token}?priority=emergency&expire={expire}&interval={interval}`
- `pover://{user_key}@{token}?key={cle_chiffrement}`
- `pover://{user_key}@{token}?key={cle_chiffrement}&e2ee=no`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| user_key  | Oui         | Identifiant de cle utilisateur associe a votre compte Pushover. Ce n'est **pas** votre adresse e-mail. Cette cle peut etre recuperee depuis votre tableau de bord Pushover.                                                                                                                                                                                                                                                                                                                                                                                        |
| token     | Oui         | Jeton associe a votre compte Pushover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| device_id | Non         | Identifiant de l'appareil auquel envoyer la notification. Si aucune valeur n'est precisee, tous les appareils associes a votre compte seront notifies.                                                                                                                                                                                                                                                                                                                                                                                                             |
| group_key | Non         | Cle d'un [groupe de diffusion](https://pushover.net/api/groups) Pushover, prefixee par `#`. Les group_key ressemblent aux user_key et permettent de diffuser un message a tous les membres d'un groupe avec une seule cle. Plusieurs groupes peuvent etre specifies. Les groupes et les appareils peuvent etre melanges dans une meme URL.                                                                                                                                                                                                                         |
| priority  | Non         | Peut etre **low**, **moderate**, **normal**, **high** ou **emergency** ; la valeur par defaut est **normal** si aucune priorite n'est precisee. <br/>Pour envoyer une notification en priorite d'urgence, les parametres `interval` et `expire` _devraient_ etre fournis. Vous pouvez aussi utiliser les priorites telles que documentees dans l'[API Pushover](https://pushover.net/api#priority), ou `-2` est **low**, `-1` est **moderate**, `0` est **normal**, `1` est **high** et `2` est **emergency**.                                                     |
| expire    | Non         | Le parametre `expire` precise pendant combien de secondes votre notification continuera a etre retentee, toutes les `interval` secondes. Si la notification n'a pas ete acquittee avant `expire` secondes, elle sera marquee comme expiree et ne sera plus envoyee. Notez qu'elle reste visible pour l'utilisateur apres expiration, mais ne lui demandera plus d'acquittement. Cette valeur ne peut pas depasser 10800 secondes, soit 3 heures. La valeur par defaut est 3600 secondes, soit 1 heure, si rien n'est precise.                                      |
| interval  | Non         | Precise a quelle frequence, en secondes, les serveurs Pushover renverront la meme notification d'urgence a l'utilisateur. Si l'utilisateur se trouve dans un environnement bruyant ou dort, retenter la notification, avec son et vibration, peut aider a attirer son attention. Cette valeur doit etre d'au moins 30 secondes entre deux tentatives. La valeur par defaut est 900 secondes, soit 15 minutes, si rien n'est precise. Note : ce parametre est distinct du mecanisme `retry` d'Apprise, qui controle le nombre de tentatives d'envoi en cas d'echec. |
| sound     | Non         | Permet de preciser l'un des effets sonores facultatifs identifies [ici](https://pushover.net/api#sounds). Le son par defaut est **pushover**.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| url       | Non         | Permet de fournir une URL supplementaire accompagnee de votre message.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| url_title | Non         | Permet de fournir un titre pour l'URL supplementaire accompagnee de votre message.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| key       | Non         | Chaine hexadecimale de 64 caracteres representant une cle AES 256 bits utilisee pour le [chiffrement de bout en bout](https://pushover.net/api#e2ee). Lorsqu'elle est definie, les champs `message`, `title`, `url` et `url_title` sont chiffres cote client avant d'etre transmis a l'API Pushover. Necessite le paquet Python `cryptography` (`pip install cryptography`). Si le paquet est absent, Apprise envoie le message en texte clair avec un avertissement.                                                                                              |
| e2ee      | Non         | Controle si le chiffrement de bout en bout est applique lorsqu'une `key` est configuree. La valeur par defaut est **yes**. Definir sur **no** pour envoyer temporairement en texte clair meme lorsqu'une cle est presente.                                                                                                                                                                                                                                                                                                                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Chiffrement de Bout en Bout (E2EE)

Pushover prend en charge le [chiffrement de bout en bout cote client](https://pushover.net/api#e2ee). Lorsqu'il est active, les champs `message`, `title`, `url` et `url_title` sont chiffres du cote d'Apprise via **AES-256-CBC** avant d'etre transmis a l'API Pushover. Les serveurs Pushover ne voient jamais le contenu en clair.

### Generer une Cle de Chiffrement

La cle est une valeur de 256 bits que vous creez vous-meme, representee sous forme d'une **chaine de 64 caracteres hexadecimaux**. Vous devez egalement configurer la meme cle dans l'application Pushover sur chaque appareil devant pouvoir lire les notifications. Consultez la [documentation Pushover](https://pushover.net/api#e2ee) pour la configuration cote application.

Pour generer rapidement une cle sous Linux/macOS :

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### Prerequis

Le chiffrement E2EE requiert le paquet Python `cryptography`. Installez-le avec :

```bash
pip install cryptography
```

Si le paquet n'est pas installe et qu'une `key` est configuree, Apprise enregistre un avertissement et envoie le message **sans chiffrement** en repli gracieux. Definissez `e2ee=no` pour envoyer intentionnellement en texte clair tout en conservant la cle dans l'URL pour une utilisation future.

:::caution
Conservez votre cle de chiffrement en lieu sur. Toute personne disposant de cette cle peut dechiffrer les notifications. Traitez-la avec le meme soin que votre jeton API.
:::

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
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg
```

Envoyer une notification Pushover a un groupe de diffusion :

```bash
# Supposons que notre {user_key} soit 435jdj3k78435jdj3k78435jdj3k78
# Supposons que notre {token} soit abcdefghijklmnop-abcdefg
# Supposons que notre {group_key} soit gznej3rKEVAvPUxu9vvNnqpmZpokzF
# Le prefixe # l'identifie comme une group key
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg/#gznej3rKEVAvPUxu9vvNnqpmZpokzF"
```

Envoyer une notification Pushover avec la priorite Emergency :

```bash
# La priorite Emergency recommande aussi de preciser les valeurs
# expire et interval (intervalle de relance d'urgence).
# Supposons que notre {user_key} soit 435jdj3k78435jdj3k78435jdj3k78
# Supposons que notre {token} soit abcdefghijklmnop-abcdefg
# L'exemple ci-dessous definit une expiration de 1 heure et tente
# de renvoyer le message toutes les 10 minutes :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg?priority=emergency&interval=600&expire=3600
```

Envoyer une notification Pushover chiffree de bout en bout :

```bash
# Supposons que notre {user_key} soit 435jdj3k78435jdj3k78435jdj3k78
# Supposons que notre {token} soit abcdefghijklmnop-abcdefg
# Supposons que notre cle de chiffrement hexadecimale de 64 chars soit aabbcc...
# (generez-en une avec : python3 -c "import secrets; print(secrets.token_hex(32))")
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg?key=aabbccdd11223344aabbccdd11223344aabbccdd11223344aabbccdd11223344"
```
