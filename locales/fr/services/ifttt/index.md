---
title: "Notifications IFTTT (If This Then That)"
description: "Envoyer des notifications IFTTT (If This Then That)."
sidebar:
  label: "IFTTT (If This Then That)"

source: https://ifttt.com/

schemas:
  - ifttt

sample_urls:
  - ifttt://{WebhookID}@{Event}/
  - ifttt://{WebhookID}@{Event1}/{Event2}/{EventN}/
  - ifttt://{WebhookID}@{Event}/?+NewArg=ArgValue
  - ifttt://{WebhookID}@{Event}/?-value3
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Créer un compte IFTTT est simple. Rendez-vous sur leur site web et créez votre compte gratuit.

Une fois votre compte prêt, rendez-vous sur [cette URL](https://ifttt.com/services/maker_webhooks/settings) consacrée aux Webhooks. Ce sera la passerelle utilisée par Apprise pour déclencher tous les Applets que vous créez. En visitant cette page, vous obtiendrez votre clé API sous la forme d'une URL.

L'URL ressemblera à quelque chose comme ceci :
`https://maker.ifttt.com/use/b1lUk7b9LpGakJARKBwRIZ`

Cela correspond en pratique à :
`https://maker.ifttt.com/use/{WebhookID}`

Dans l'exemple ci-dessus, le **WebhookID** est `b1lUk7b9LpGakJARKBwRIZ`. Vous aurez besoin de cette valeur.

## Syntaxe

La syntaxe valide est la suivante :

- `https://maker.ifttt.com/use/{WebhookID}`
- `ifttt://{WebhookID}@{Event}/`
- `ifttt://{WebhookID}@{Event1}/{Event2}/{EventN}/`
- `ifttt://{WebhookID}@{Event}/?+NewArg=ArgValue`
- `ifttt://{WebhookID}@{Event}/?-value3`

Par défaut, les entrées de modèle suivantes sont affectées :

- **{value1}** : Le **titre** sera placé ici
- **{value2}** : Le **corps** sera placé ici
- **{value3}** : Le **type de message** sera placé ici (il indiquera _info_, _warning_, _critical_ ou _success_)

## Détail des Paramètres

| Variable  | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebhookID | Oui    | Clé API Webhooks que vous avez obtenue depuis [la zone de paramètres du service Webhooks lui-même](https://ifttt.com/services/maker_webhooks).                                                                                                                                                                                                                                                                                                                   |
| Event     | Oui    | Il s'agit du **Event Name** que vous avez attribué à l'Applet créé. Vous devez en fournir au moins un. C'est cet événement qui sera déclenché via le webhook.                                                                                                                                                                                                                                                                                                    |
| +Arg=Val  | Non    | Ajoute un argument supplémentaire **{Arg}** dans la charge utile et lui attribue la valeur **{Val}**. Il est très important que votre argument commence par un symbole plus, **+**, pour utiliser cette option.                                                                                                                                                                                                                                                  |
| -Arg      | Non    | Cette option est utile si vous souhaitez supprimer l'un des arguments prédéfinis présentés ci-dessous. Vous pouvez par exemple utiliser **?-value1&-value2** afin de ne transmettre que **value3** dans la charge utile. Il est très important que votre argument commence par un symbole moins, **-**, pour utiliser cette option. Comme indiqué plus haut, votre charge utile inclura toujours **value1**, **value2** et **value3** sauf indication contraire. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification IFTTT :

```bash
# Supposons que notre {WebhookID} soit b1lUk7b9LpGakJARKBwRIZ
# Supposons que notre {Event} soit sms_message
# Supposons que nous voulions que {value1} contienne "Mon Titre"
# Supposons que nous voulions que {value2} contienne "My Corps du Message"
# Supposons que nous voulions que {value3} contienne "info"
apprise -vv -t "Mon Titre" -b "Ma Valeur" \
   ifttt:///b1lUk7b9LpGakJARKBwRIZ@sms_message
```

Tout le monde ne voudra pas nécessairement utiliser les entrées par défaut **{valueX}**. Vous pouvez par exemple utiliser Apprise pour allumer un interrupteur et définir une valeur complètement différente comme **{switch}** sur `_on_`. Voici comment procéder :

```bash
# Envoyer la valeur 'on' à {switch}
# Supposons que notre {WebhookID} soit b1lUk7b9LpGakJARKBwRIZ
# Supposons que notre {Event} soit my_light
# Tout argument préfixé par un moins, -,
# supprime un argument de notre charge utile. Comme nous savons
# que value1, value2 et value3 sont toujours présents, nous les supprimons.
#
# Nous utilisons ensuite un symbole plus, +, devant un argument
# pour indiquer au serveur distant que nous voulons inclure une
# nouvelle option appelée switch avec la valeur 'on'
apprise -vv -b "" ifttt:///b1lUk7b9LpGakJARKBwRIZ@my_light/?-value1&-value2&-value3&+switch=on
```

**Réflexion** : les options +/- sont relativement récentes, mais il semble toujours possible de rendre ce plugin encore plus simple à utiliser. Si vous avez des idées, n'hésitez pas à ouvrir un ticket et à les partager.
