---
title: "Notifications Vapid/WebPush"
description: "Envoyer des notifications Vapid/WebPush."
sidebar:
  label: "Vapid/WebPush"

source: https://datatracker.ietf.org/doc/html/draft-thomson-webpush-vapi/

schemas:
  - vapid

has_image: true

sample_urls:
  - vapid://subscription_id/
  - vapid://subscription_id/target/
  - vapid://subscription_id/target1/target2/targetN/

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vapid/WebPush nécessite un fichier `subscriptions.json` qui identifie tous les utilisateurs à notifier, ainsi qu'un fichier `private_key.pem`.

## Syntaxe

La syntaxe valide est la suivante :

- `vapid://subscription_id/`
- `vapid://subscription_id/target`
- `vapid://subscription_id/target1/target2/targetN/`

## Détail des Paramètres

| Variable | Requis  | Description                                                                                                                                                                                                 |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyfile  | **Oui** | Une `clé privée` au format `PEM` appartenant au compte associé au `subscription_id`.                                                                                                                        |
| subfile  | **Oui** | Un fichier `subscriptions.json` identifiant la configuration à utiliser.                                                                                                                                    |
| mode     | Non     | Le mode à utiliser (par défaut `chrome`). Les valeurs possibles sont `chrome`, `firefox`, `edge` et `opera`. Ce paramètre simplifie uniquement la source amont utilisée lors de l'envoi de la notification. |

Tableau des modes :
De nombreuses duplications existent (plusieurs modes pointant vers le même emplacement). L'idée est que si les points de terminaison changent, la mise à jour sera effectuée dans Apprise afin que votre code/URL n'ait pas à changer ultérieurement.

| Mode    | URL                                                  |
| ------- | ---------------------------------------------------- |
| chrome  | `https://fcm.googleapis.com/fcm/send`                |
| forefpx | `https://updates.push.services.mozilla.com/wpush/v1` |
| edge    | `https://fcm.googleapis.com/fcm/send`                |
| opera   | `https://fcm.googleapis.com/fcm/send`                |
| apple   | `https://web.push.apple.com'`                        |
| brave   | `https://fcm.googleapis.com/fcm/send`                |
| samsung | `https://fcm.googleapis.com/fcm/send`                |
| generic | `https://fcm.googleapis.com/fcm/send`                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Configuration du Fichier subscriptions.json

Pour utiliser Vapid, vous devez disposer d'un fichier `subscriptions.json` vers lequel pointer. Le plugin Vapid prend en charge les 2 formats suivants :

1. Autonome ; dans l'exemple ci-dessous, la cible serait `abc123`

   ```json
   {
     "endpoint": "https://fcm.googleapis.com/fcm/send/abc123",
     "keys": {
       "p256dh": "BNcW4oA7zq5H9TKIrA3XfKclN2fX9P_7NR...",
       "auth": "k9Xzm43nBGo="
     }
   }
   ```

1. Prise en charge de plusieurs cibles ; dans l'exemple ci-dessous, 2 cibles sont créées, appelées `name1` et `name2`

   ```json
   {
       "name1": {
           "endpoint": "https://fcm.googleapis.com/fcm/send/...",
           "keys": {
               "p256dh": "BNcW4oA7zq5H9TKIrA3XfKclN2fX9P_7NR...",
               "auth": "k9Xzm43nBGo=",
           }
       },
       "name2": {
           "endpoint": "https://fcm.googleapis.com/fcm/send/...",
           "keys": {
               "p256dh": "BNcW4oA7zq5H9TKIrA3XfKclN2fX9P_7NR...",
               "auth": "k9Xzm43nBGo=",
           }
       }
   ```

C'est par le biais des cibles que vous notifiez un ou plusieurs points de terminaison. Si vous utilisez le stockage persistant avec Apprise, vous pouvez simplement gérer votre fichier `subscription.json` à cet emplacement et votre URL reste épurée. Vous pouvez également spécifier `?subfile=` dans votre URL et pointer vers un fichier d'abonnements à charger. L'emplacement peut être local au système de fichiers ou distant (par exemple `subfile=https://user:pass@myhost/special/location/subscription.json`).

Si aucune cible n'est spécifiée dans votre URL, une cible correspondant à votre propre `subscriberid` est recherchée dans le fichier `subcriptions.json`.

## Configuration de la Clé Privée (PEM)

De manière similaire au fichier `subscription.json`, vous devez pointer vers un fichier `private_key.pem`. Si vous utilisez le stockage persistant d'Apprise, vous pouvez placer le fichier ici. Vous pouvez également spécifier `?keyfile=` dans l'URL et pointer vers un fichier local ou distant à utiliser.

## Conseils sur le Stockage Persistant

La commande suivante liste tous les emplacements de stockage persistant associés à votre configuration :

```bash
apprise storage list
```

Repérez simplement l'identifiant associé au compte Vapid que vous souhaitez mettre à jour ; les identifiants de répertoire se trouvent aux emplacements suivants :

1. Microsoft Windows : `%APPDATA%/Apprise/cache`
1. Linux : `~/.local/share/apprise/cache`

Pour plus de détails à ce sujet, consultez [cette page](https://github.com/caronc/apprise/wiki/persistent_storage).

## Construction de l'URL Apprise

Ce plugin est plus complexe à utiliser car il nécessite une clé privée PEM binaire ainsi qu'un fichier `subscription.json`. Il est conseillé d'utiliser un fichier de configuration YAML Apprise structuré comme suit :

```yaml
urls:
  - vapid://:
      mode: apple
      keyfile: /path/to/keyfile
      subfile: /path/to/subscription.json
```

N'oubliez pas que `keyfile` et `subfile` peuvent également être des URLs, y compris protégées par identifiant/mot de passe :

```yaml
urls:
  - vapid://:
      mode: apple
      keyfile: https://user:pass123@example.com/private_key.pem
      subfile: https://user:pass123@example.com/subscriptions.json
```

Si vous ne définissez pas de `keyfile` et/ou de `subfile`, les règles décrites ci-dessus s'appliquent et les fichiers par défaut sont recherchés dans votre répertoire de stockage persistant.
