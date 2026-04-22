---
title: "Notifications WxPusher"
description: "Envoyer des notifications WxPusher."
sidebar:
  label: "WxPusher"

source: https://wxpusher.zjiecode.com/

schemas:
  - wxpusher

sample_urls:
  - wxpusher://{app_token}@{userid}
  - wxpusher://{app_token}@{userid1}/{userid2}/{useridN}
  - wxpusher://{app_token}@{topic}
  - wxpusher://{app_token}@{topic1}/{topic2}/{topicN}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

1. [Creez un compte WxPusher](https://wxpusher.zjiecode.com/).
1. Recuperez votre `App Token` depuis votre profil.<br/><img width="1428" alt="appToken" src="./images/1cfd1232081adc73.png"><br/>_Remarque : l'image ci-dessus provient de la [page d'aide de WxPusher](https://wxpusher.zjiecode.com/docs/#/?id=%e8%8e%b7%e5%8f%96apptoken)_

Les cibles peuvent etre soit un utilisateur, `UID_DATA`, soit un topic, `<integer>`, par exemple :

- `wxpusher://apptoken/123/343/UID_ABCD` notifierait 2 topics, `123` et `343`, ainsi qu'un utilisateur, `UID_DATA`.

## Syntaxe

La syntaxe valide est la suivante :

- `wxpusher://{app_token}@{userid}`
- `wxpusher://{app_token}@{userid1}/{userid2}/{useridN}`
- `wxpusher://{app_token}@{topic}`
- `wxpusher://{app_token}@{topic1}/{topic2}/{topicN}`

Vous pouvez aussi melanger topics et identifiants utilisateur :

- `wxpusher://{app_token}@{topic1}/{userid1}/...`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                         |
| --------- | ----------- | --------------------------------------------------------------------------------------------------- |
| app_token | **Oui**     | App Token associe a votre compte WxPusher. Il commence toujours par `AT_`.                          |
| userid    | \*Non       | Vous devez preciser au moins un `userid` ou un `topic`. Un `userid` commence par le prefixe `UID_`. |
| topic     | \*Non       | Vous devez preciser au moins un `userid` ou un `topic`. Un `topic` est une valeur entiere.          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification WxPusher en utilisant un topic :

```bash
# Supposons que notre {app_key} soit AT_12345
# Supposons que notre {topic} soit 987
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" -n failure  \
   wxpusher://AT_12345/987
```

Voici un exemple de notification d'un utilisateur :

```bash
# Supposons que notre {app_key} soit AT_12345
# Supposons que notre {user} soit UID_123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" -n failure  \
   wxpusher://AT_12345/UID_123
```

Nous pouvons notifier plusieurs utilisateurs et topics en les precisant simplement dans le chemin :

```bash
# Supposons que notre {app_key} soit AT_12345
# Supposons que nos {user} soient UID_123 et UID_456
# Supposons que nos {topic} soient 5555 et 4444
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" -n failure  \
   wxpusher://AT_12345/UID_123/5555/4444/UID_456
```
