---
title: "Notifications Lunasea"
description: "Envoyer des notifications Lunasea."

sidebar:
  label: "Lunasea"

source: https://www.lunasea.app/
schemas:
  - lunasea

sample_urls:
  - lunasea://{toFireBaseUser}
  - lunasea://{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}
  - lunasea://+{toFireBaseDevice}
  - lunasea://+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}

limits:
  - max_chars: 160

ended: 2025-04-30
---

:::note

## Raison de Fin de Service

Extrait de leur site web :
![Screenshot From 2025-07-06 13-20-14](./images/11ef07079a9e2aa2.png)
💡Le service a été retiré d'Apprise dans [apprise/1318](https://github.com/caronc/apprise/issues/1318)
:::

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

### Hébergement Nuagique

- `lunasea://{toFireBaseUser}`
- `lunasea://{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}`
- `lunasea://+{toFireBaseDevice}`
- `lunasea://+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}`

Vous pouvez également combiner les formats :

- `lunasea://{user}:{pass}@/+{toFireBaseUser1}/{toFireBaseDevice1}/`

### Hébergement Privé

Cela fonctionne exactement de la même façon ; vous pouvez simplement spécifier en plus vos informations de connexion à votre serveur local :

- `lunasea://{user}:{pass}@{hostname}/{toFireBaseUser}`
- `lunasea://{user}:{pass}@{hostname}/{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}`
- `lunasea://{user}:{pass}@{hostname}/+{toFireBaseDevice}`
- `lunasea://{user}:{pass}@{hostname}/+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}`
- `lunasea://{user}:{pass}@{hostname}:{port}/{toFireBaseUser}`
- `lunasea://{user}:{pass}@{hostname}:{port}/{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}`
- `lunasea://{user}:{pass}@{hostname}:{port}/+{toFireBaseDevice}`
- `lunasea://{user}:{pass}@{hostname}:{port}/+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}`

**Remarque :** Le `{user}`/`{pass}` est entièrement facultatif.

Vous pouvez également combiner les formats :

- `lunasea://{user}:{pass}@{hostname}/+{toFireBaseUser1}/{toFireBaseDevice1}/`
- `lunasea://{user}:{pass}@{hostname}:{port}/+{toFireBaseUser1}/{toFireBaseDevice1}/`

### Remarques Supplémentaires

Utilisez `lunaseas://` pour une connexion sécurisée (`https://`) et `lunasea://` pour une connexion non sécurisée (`http://`).

`lsea://` et `lseas://` peuvent également être utilisés comme alias de `lunasea://` et `lunaseas://` (respectivement) si vous le souhaitez.

## Détail des Paramètres

| Variable | Requis    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| to       | **\*Non** | Un ou plusieurs identifiants Firebase User ou Device auxquels vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour séparer plusieurs entrées.                                                                                                                                                                                                                                                                                                    |
| image    | Non       | Associe l'image liée au type de notification à la charge utile. Par défaut, cette valeur est définie sur `no`.                                                                                                                                                                                                                                                                                                                                                                |
| mode     | Non       | Le mode par défaut pour interpréter l'URL fournie. Les valeurs possibles sont `cloud` et `private`. Ce mode est détecté automatiquement si rien n'est précisé. En mode `private`, un nom d'hôte doit être fourni dans l'URL. En mode `cloud`, tous les éléments sont supposés être des points de terminaison de notification et <https://lunasea.app> est utilisé. En mode nuagique, toutes les transactions sont sécurisées (que vous spécifiiez `lunasea://` ou `lsea://`). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification LunaSea :

```bash
# Assuming our {FireBaseDeviceID} is abcd_abcd_abcd
# Send to a Device (make sure to add + at front):
apprise -t "Test Title" -b "Test Message" \
  lunasea://+abcd_abcd_abcd

# Assuming our {FireBaseDeviceID} is abcd_abcd_abcd
# Assuming our {FireBaseUserID} is wxyz_wxyz_wxyz
#Send to a device (add +) and a user (optionally add @)
apprise -t "Test Title" -b "Test Message" \
  lunasea://+abcd_abcd_abcd/@wxyz_wxyz_wxyz

# Running your own private server, no problem:
# Assuming our {hostname} is myhostname
# Assuming our {user} is user
# Assuming our {password} is pass
# Assuming our {FireBaseDeviceID} is abcd_abcd_abcd
# Assuming our {FireBaseUserID} is wxyz_wxyz_wxyz
apprise -t "Test Title" -b "Test Message" \
  lunasea://user:pass@myhostname/+FireBaseDevice1/@FireBaseUserID
```
