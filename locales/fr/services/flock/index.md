---
title: "Notifications Flock"
description: "Envoyer des notifications Flock."
sidebar:
  label: "Flock"

source: https://flock.com/

schemas:
  - flock

sample_urls:
  - https://api.flock.com/hooks/sendMessage/{token}
  - flock://{token}/
  - flock://{botname}@{token}/
  - flock://{botname}@{token}/u:{user}
  - flock://{botname}@{token}/g:{channel}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Flock présente de nombreuses similitudes avec Slack. Les notifications Flock nécessitent un _incoming-webhook_ ou une _application/bot_ à laquelle se connecter.

### Webhook Entrant

Vous pouvez générer un webhook entrant depuis [ici](https://dev.flock.com/webhooks). Suivez simplement l'assistant pour prédéterminer le ou les canaux vers lesquels votre message sera diffusé. Une fois ce processus terminé, vous recevrez une URL similaire à celle-ci :
`https://api.flock.com/hooks/sendMessage/134b8gh0-eba0-4fa9-ab9c-257ced0e8221`

Cela correspond effectivement à :
`https://api.flock.com/hooks/sendMessage/{token}`

**Remarque :** Apprise prend en charge cette URL _telle quelle_ (_depuis la v0.7.7_) ; il n'est plus nécessaire d'analyser l'URL davantage. Toutefois, cela entraîne légèrement moins de surcharge (en interne) si vous le faites.

Dans cet exemple, le token est `134b8gh0-eba0-4fa9-ab9c-257ced0e8221`

### Robot

Les bots sont un peu plus complexes et supposent que vous avez suivi leurs instructions pour configurer [votre propre application](https://docs.flock.com/display/flockos/Creating+an+App#CreatinganApp-HowdoIcreateaFlockOSapp?). Comme pour un webhook, vous obtiendrez votre propre **{token}** qui vous permettra d'envoyer des messages directement à des personnes et des canaux.

## Syntaxe

La syntaxe valide avec un _webhook entrant_ est la suivante :

- `https://api.flock.com/hooks/sendMessage/{token}`
- `flock://{token}/`
- `flock://{botname}@{token}/`

La syntaxe valide avec une _application / bot_ est la suivante :
**Remarque :** le **userid** et le **channelid** correspondent à l'identifiant encodé réel et non à la valeur affichée publiquement. Par exemple, si vous avez un canal appelé #general, il aura un identifiant encodé qui ressemble à quelque chose comme **g:abcd1234defg**. Les utilisateurs sont identifiés de manière similaire mais sont préfixés par **u:** au lieu de **g:**. Ce sont ces valeurs que vous devez spécifier ici :

- `flock://{token}/u:userid`
- `flock://{botname}@{token}/u:{user}`
- `flock://{botname}@{token}/u:{user1}/u:{user2}/u:{userN}/`
- `flock://{botname}@{token}/g:{channel}`
- `flock://{token}/g:{channel}`
- `flock://{botname}@{token}/g:{channel1}/g:{channel2}/g:{channelN}/`
- `flock://{botname}@{token}/g:{channel}/u:{user}/`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                                                                          |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui    | La première partie des 3 tokens fournis après la création d'un _incoming-webhook_ et/ou d'une _application/bot_.                                                                                                                                                                                                     |
| botname  | Non    | Identifie le nom du bot qui doit émettre le message. Si aucun n'est spécifié, le comportement par défaut est d'utiliser votre compte (associé au _incoming-webhook_).                                                                                                                                                |
| channel  | Non    | Les canaux doivent être préfixés par un dièse **#** ou **g:**. Ils doivent représenter l'identifiant encodé du nom du canal (et non la référence lisible par l'humain). Vous pouvez spécifier autant de canaux que vous le souhaitez en les séparant par une barre oblique (/) dans l'URL.                           |
| user     | Non    | Les utilisateurs doivent être préfixés par un symbole arobase **@** ou **u:**! Ils doivent représenter l'identifiant encodé du nom d'utilisateur (et non la référence lisible par l'humain). Vous pouvez spécifier autant d'utilisateurs que vous le souhaitez en les séparant par une barre oblique (/) dans l'URL. |
| image    | Non    | Associe une image au message. Par défaut, cette option est activée.                                                                                                                                                                                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Flock à notre canal #nuxref (identifié comme `g:abcd1234efgh`) :

```bash
# Assuming our {token} is 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# our channel nuxref is represented as g:abcd1234efgh
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   flock:///134b8gh0-eba0-4fa9-ab9c-257ced0e8221/g:abcd1234efgh
```
