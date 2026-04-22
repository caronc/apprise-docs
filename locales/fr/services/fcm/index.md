---
title: "Notifications Firebase Cloud Messaging (FCM)"
description: "Envoyer des notifications Firebase Cloud Messaging (FCM)."
sidebar:
  label: "Firebase Cloud Messaging (FCM)"

source: https://firebase.google.com/docs/cloud-messaging

schemas:
  - fcm

sample_urls:
  - fcm://{APIKey}/{Device}
  - fcm://{APIKey}/{Device1}/{Device2}/{DeviceN}
  - fcm://{APIKey}/#{Topic}
  - fcm://{APIKey}/#{Topic1}/#{Topic2}/#{TopicN}

limits:
  max_chars: 5000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous devez d'abord creer un compte pour le service Firebase Cloud Messaging, ou FCM, de Google afin d'utiliser cette integration.

Ensuite, vous accederez a la console de gestion FCM et choisirez le mode que vous souhaitez utiliser pour l'envoi de vos notifications. Les modes disponibles sont **legacy** et **oauth2**. Chacun a ses avantages et ses inconvenients. Selon le mode choisi, vous devrez construire votre URL Apprise de maniere legerement differente :<br/>
![Firebase](./images/106963460-9dd33600-670e-11eb-8aaa-8499121e3147.png)

## Syntaxe

La syntaxe valide est la suivante :

Le mode legacy ne semble pas destine a etre retire prochainement, mais c'est bien ainsi que FCM le designe. Ce mode exige uniquement la cle API generee via la console de gestion FCM.

- `fcm://{APIKey}/{Device}`
- `fcm://{APIKey}/{Device1}/{Device2}/{DeviceN}`
- `fcm://{APIKey}/#{Topic}`
- `fcm://{APIKey}/#{Topic1}/#{Topic2}/#{TopicN}`

Vous pouvez egalement melanger ces entrees :

- `fcm://{APIKey}/{Device1}/#{Topic1}/`

### Mode OAuth2

Le mode OAuth2 est celui que FCM semble recommander. Il introduit toutefois bien plus de surcharge que la methode legacy. Il exige aussi que vous pointiez vers un fichier `JSON` genere specialement a partir de votre console de gestion FCM.

Vous pouvez pointer vers le fichier `JSON` genere localement, si vous l'avez enregistre sur votre machine, ou le referencer via son URL web, si vous le partagez quelque part sur votre reseau, comme ceci :

- `fcm://{Project}/{Device}/?keyfile=/path/to/keyfile`
- `fcm://{Project}/{Device1}/{Device2}/{DeviceN}/?keyfile=https://user:pass@localhost/web/location`
- `fcm://{Project}/#{Topic}/?keyfile=/path/to/keyfile`
- `fcm://{Project}/#{Topic1}/#{Topic2}/#{TopicN}/?keyfile=https://user:pass@localhost/web/location`

Vous pouvez egalement melanger ces entrees :

- `fcm://{Project}/{Device1}/#{Topic1}/?keyfile={JSON_KeyFile}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIKey    | Oui         | _Cle API_ generee depuis la console de gestion FCM. Elle n'est requise que si vous souhaitez utiliser la methode **Legacy**.                                                                                                                                                                                                                                                                                                 |
| Project   | Oui         | _Identifiant de projet_ genere depuis la console de gestion FCM. Il n'est requis que si vous souhaitez utiliser la methode **OAuth2**.                                                                                                                                                                                                                                                                                       |
| KeyFile   | Oui         | Emplacement du fichier \_JSON Keyfile\_\_ genere depuis la console de gestion FCM. Il n'est requis que si vous souhaitez utiliser la methode **OAuth2**.                                                                                                                                                                                                                                                                     |
| Device    | Non         | Appareil auquel vous souhaitez envoyer votre message.                                                                                                                                                                                                                                                                                                                                                                        |
| Topic     | Non         | Sujet sur lequel vous souhaitez publier votre message.                                                                                                                                                                                                                                                                                                                                                                       |
| mode      | Non         | Le mode peut etre defini sur **legacy** ou **oauth2**. Il est detecte automatiquement selon ce que vous fournissez dans l'URL Apprise, mais vous pouvez aussi le definir explicitement si necessaire.                                                                                                                                                                                                                        |
| priority  | Non         | Priorite FCM. Par defaut, elle n'est pas transmise dans la charge utile et laisse donc les valeurs amont s'appliquer. Les options valides sont `min`, `low`, `normal`, `high` et `max`.                                                                                                                                                                                                                                      |
| image     | Non         | Definissez cette valeur sur `yes` si vous souhaitez inclure une image dans la charge utile. Selon votre abonnement Firebase, cela peut ou non entrainer des frais. Par defaut, cette valeur est `no`.                                                                                                                                                                                                                        |
| image_url | Non         | Precisez votre propre `image_url` personnalisee a inclure dans la charge utile. Si cette valeur est fournie, il est suppose que `image` vaut `yes`. Vous pouvez aussi definir `image=no` pour empecher cette supposition.                                                                                                                                                                                                    |
| color     | Non         | Permet d'identifier la couleur de votre notification en fournissant une valeur RGB personnalisee, au format \#RRGGBB ou le croisillon `#` est facultatif. Les autres options sont `yes` et `no`. Lorsque cette valeur est `no`, l'argument `color` n'est tout simplement pas inclus dans la charge utile. Lorsqu'elle est `yes`, valeur par defaut, Apprise choisit la couleur selon le type de message, info, warning, etc. |

**Remarque :** ce service de notification n'utilise pas le champ `title` ; seul le _body_ est transmis.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification FCM Legacy :

```bash
# Supposons que notre {APIKey} soit bu1dHSdO22pfaaVy
# Supposons que notre {Device} soit ABCD:12345

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "fcm://bu1dHSdO22pfaaVy/ABCD:12345"

```

Envoyer une notification FCM OAuth2 :

```bash
# Supposons que notre {Project} soit Apprise
# Supposons que le chemin vers notre JSON {Keyfile} soit /etc/apprise/fcm/keyfile.json
# Supposons que notre {Device} soit ABCD:12345

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "fcm://Apprise/ABCD:12345/?keyfile=/etc/apprise/fcm/keyfile.json"
```
