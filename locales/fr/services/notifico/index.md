---
title: "Notifications Notifico"
description: "Envoyer des notifications Notifico."
sidebar:
  label: "Notifico"

source: https://n.tkte.ch/

schemas:
  - notifico

sample_urls:
  - notifico://{ProjectID}/{MessageHook}

limits:
  max_chars: 512
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Notifico vous permet d'envoyer un message vers un ou plusieurs salons IRC.

1. Rendez-vous sur <https://n.tkte.ch> et creez un compte.
1. Creez un projet, manuellement ou en le synchronisant avec GitHub.
1. Depuis le projet, creez ensuite un **Plain Text Message Hook**.
   ![notifico plain text hook](./images/66708086-3f17cb00-ed19-11e9-8e37-bc7e6ba5a3cd.png)

Une fois votre hook cree avec succes, vous pouvez recuperer depuis la page principale du projet le lien necessaire a l'envoi de vos messages. C'est ce dont Apprise a besoin :
![notifico hook capture instructions](./images/66708104-6c647900-ed19-11e9-895e-d5f755d05079.png)

L'URL ressemblera a ceci :

```text
       https://n.tkte.ch/h/2144/uJmKaBW9WFk42miB146ci3Kj
                            ^                ^
                            |                |
                         project id       message hook
```

Cette URL correspond en pratique a :<br/>
`https://n.tkte.ch/h/{ProjectID}/{MessageHook}`

Si vous souhaitez la convertir en URL Apprise, procede comme suit :
La derniere partie de l'URL recue correspond aux 2 arguments qui nous interessent. Dans l'exemple ci-dessus, il s'agit de :

1. **ProjectID** is `2144`
2. **MessageHook** is `uJmKaBW9WFk42miB146ci3Kj`

## Syntaxe

Vous pouvez transmettre directement l'URL native telle que recuperée sur le site :

- `https://n.tkte.ch/h/{ProjectID}/{MessageHook}`

Ou vous pouvez la reformater pour Apprise, ce qui reduit legerement la surcharge :

- `notifico://{ProjectID}/{MessageHook}`

Vous pouvez aussi desactiver les couleurs, activees par defaut :

- `notifico://{ProjectID}/{MessageHook}?color=off`

Par defaut, Apprise envoie un prefixe avec chaque message ; vous pouvez aussi le desactiver ainsi :

- `notifico://{ProjectID}/{MessageHook}?prefix=off`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                                        |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ProjectID   | Oui         | Identifiant du projet. C'est un entier qui constitue la premiere partie de l'URL du Notifico Message Hook fournie.                                                                                                                                                                 |
| MessageHook | Oui         | Le hook de message se trouve a la fin de l'URL du Notifico Message Hook fournie.                                                                                                                                                                                                   |
| color       | Non         | Utilise les couleurs IRC pour offrir un rendu plus riche. Cela permet egalement d'interpreter les couleurs IRC deja presentes dans la notification transmise. Assurez-vous que la case **Color** est cochee lors de la creation du Message Hook. La valeur par defaut est **Yes**. |
| prefix      | Non         | Tous les messages envoyes vers IRC comportent par defaut un prefixe permettant d'identifier le type de message, `info`, `error`, `warning` ou `success`, ainsi que le systeme a l'origine de la notification. Par defaut, cette valeur est **Yes**.                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Notifico :

```bash
# L'exemple ci-dessous envoie une notification Notifico
# Supposons que notre {ProjectID} soit 2144
# Supposons que notre {MessageHook} soit uJmKaBW9WFk42miB146ci3Kj
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   notifico://2144/uJmKaBW9WFk42miB146ci3Kj
```
