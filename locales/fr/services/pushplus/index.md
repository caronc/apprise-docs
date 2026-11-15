---
title: "Notifications Pushplus"
description: "Envoyer des notifications WeChat et multi-canaux via la plateforme PushPlus."
sidebar:
  label: "Pushplus"

source: https://www.pushplus.plus/

schemas:
  - pushplus
  - wecom

sample_urls:
  - https://www.pushplus.plus/send?token={token}
  - pushplus://{token}
  - pushplus://{token}/{topic}
  - pushplus://{token}/@{friend_token}
  - pushplus://{token}?channel={channel}
  - wecom://{token}

limits:
  max_chars: 20000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

PushPlus est une plateforme de notification chinoise qui distribue les messages via WeChat et plusieurs autres canaux (e-mail, SMS, WeCom, webhook). Elle utilise un token personnel pour authentifier les requêtes.

1. Inscrivez-vous ou connectez-vous sur [PushPlus](https://www.pushplus.plus/).
2. Copiez le **Token** affiché dans votre tableau de bord sous la section « Push ».
3. Installez optionnellement le mini-programme PushPlus dans WeChat pour recevoir les messages sur votre téléphone.

L'URL de notification pour le cas d'usage le plus simple est :

```text
pushplus://{token}
```

### Envoi en Groupe (Topic)

PushPlus prend également en charge l'envoi d'une notification à tous les membres abonnés à un groupe nommé.

1. Ouvrez la section **Group Push** de la console PushPlus.
2. Créez un groupe et notez son **code de groupe**. C'est la valeur du topic.
3. Les abonnés rejoignent le groupe dans WeChat ; lorsque vous envoyez au topic, tous les membres reçoivent le message.

Placez un ou plusieurs codes de groupe directement dans le chemin de l'URL :

```text
pushplus://{token}/{topic}
pushplus://{token}/{topic1}/{topic2}
pushplus://{token}/#{topic}
```

Lorsque plusieurs topics sont listés, Apprise envoie la notification à chaque groupe dans un appel API séparé. Le `#` devant un topic est facultatif.

### Envoi aux Amis

Vous pouvez aussi envoyer aux amis que vous avez ajoutés dans PushPlus. Placez le token de chaque ami dans le chemin de l'URL, précédé d'un `@`. Sur le canal `cp` (WeCom), utilisez plutôt l'identifiant utilisateur WeCom.

```text
pushplus://{token}/@{friend_token}
pushplus://{token}/@{friend1}/@{friend2}
```

Apprise envoie à 10 amis au maximum par appel API, ce qui correspond à la limite de PushPlus pour un compte vérifié.

### Canaux de Livraison

Par défaut, les notifications arrivent via WeChat. Vous pouvez les rediriger vers un canal différent en utilisant le paramètre de requête `?channel=` (ou son synonyme `?mode=`) :

| Valeur `?channel=` | Canal                                            |
| ------------------ | ------------------------------------------------ |
| `wechat`           | WeChat (défaut, peut être omis)                  |
| `webhook`          | Point de terminaison webhook configuré           |
| `app`              | Application mobile PushPlus                      |
| `extension`        | Extension de navigateur ou application de bureau |
| `clawbot`          | WeChat ClawBot                                   |
| `cmcc`             | ClawBot pour les abonnés China Mobile            |
| `qq`               | Bot QQ                                           |
| `cp`               | WeCom (WeChat Work / Enterprise WeChat)          |
| `wecom`            | Alias convivial pour `cp`, même canal            |
| `mail`             | Adresse e-mail enregistrée                       |
| `sms`              | SMS (payé en points PushPlus)                    |
| `voice`            | Appel vocal (payé en points PushPlus)            |

```text
pushplus://{token}?channel=mail
pushplus://{token}/{topic}?channel=cp
```

`channel=` et `mode=` sont entièrement interchangeables ; utilisez celui qui se lit le plus naturellement dans votre configuration.

Pour livrer par plusieurs canaux à la fois, listez-les séparés par des virgules. Apprise envoie alors une seule requête au point de terminaison multi-canaux de PushPlus :

```text
pushplus://{token}?channel=wechat,mail
```

#### Alias de Schéma

Apprise accepte également `wecom://` comme préfixe de schéma pour les utilisateurs WeCom. Il définit automatiquement le canal de livraison à `cp`, aucun paramètre de requête supplémentaire n'est donc nécessaire :

| Schéma            | Équivalent à                    |
| ----------------- | ------------------------------- |
| `wecom://{token}` | `pushplus://{token}?channel=cp` |

#### Point de Terminaison Webhook Nommé

Lorsque vous utilisez `?channel=webhook`, vous pouvez également cibler un point de terminaison nommé spécifique. Deux formes équivalentes sont acceptées :

```text
pushplus://{token}?channel=webhook&name={webhook_name}
pushplus://{webhook_name}@{token}
```

Dans la deuxième forme (`schema://{name}@{token}`), le canal webhook est implicite -- il n'est pas nécessaire d'ajouter `?channel=webhook` explicitement. Un `?channel=` explicite remplace toujours cette implication si vous avez besoin d'un canal différent.

#### Code de Configuration du Canal

Les canaux `cp`, `webhook`, `mail` et `qq` peuvent utiliser un code de configuration que vous créez dans les paramètres des canaux de la console PushPlus. Transmettez-le avec `?option=`. Le nom de webhook ci-dessus est le même réglage, donc `?name=` et `?webhook=` fonctionnent aussi.

```text
pushplus://{token}?channel=mail&option={code}
```

Lorsque vous listez plusieurs canaux, donnez un code par canal, dans le même ordre et séparés par des virgules. Laissez une place vide pour un canal qui n'a pas besoin de code. Dans cet exemple, seul le webhook reçoit un code :

```text
pushplus://{token}?channel=wechat,webhook&option=,{code}
```

### Rappel du Résultat de Livraison

PushPlus peut envoyer le résultat final de la livraison à une adresse web qui vous appartient. Définissez-la avec `?callback=` (le nom propre à PushPlus, `?callbackUrl=`, fonctionne aussi).

```text
pushplus://{token}?callback={url}
```

### Rendu des Messages

Le corps du message est rendu par PushPlus sur leurs serveurs en utilisant un template qui correspond au paramètre de format standard d'Apprise :

| `?format=` Apprise | PushPlus rend comme                       |
| ------------------ | ----------------------------------------- |
| `html` (défaut)    | HTML : gras, liens et images fonctionnent |
| `markdown`         | Markdown : titres, gras, listes, etc.     |
| `text`             | Texte brut, sans mise en forme            |

Il n'y a pas de paramètre spécifique à PushPlus pour ces formats ; définissez `?format=markdown` (ou l'équivalent dans votre YAML/config) de la même manière que pour tout autre service Apprise.

PushPlus propose aussi quelques templates spéciaux que `?format=` ne peut pas choisir. Choisissez-en un avec `?template=` :

| Valeur `?template=` | PushPlus rend comme                         |
| ------------------- | ------------------------------------------- |
| `json`              | Le corps affiché en JSON                    |
| `cloudMonitor`      | Mise en page d'alerte Alibaba Cloud Monitor |
| `jenkins`           | Mise en page de build Jenkins               |
| `route`             | Mise en page du plugin de routeur           |
| `pay`               | Mise en page de paiement reçu               |

## Syntaxe

La syntaxe valide est la suivante :

- `https://www.pushplus.plus/send?token={token}`
- `https://www.pushplus.plus/send/{token}`
- `https://www.pushplus.plus/batchSend?token={token}`
- `pushplus://{token}`
- `pushplus://{token}/{topic}`
- `pushplus://{token}/{topic1}/{topic2}`
- `pushplus://{token}/#{topic}`
- `pushplus://{token}/@{friend_token}`
- `pushplus://{token}/@{friend1}/@{friend2}`
- `pushplus://{token}?channel={channel}`
- `pushplus://{token}?channel={channel1},{channel2}`
- `pushplus://{token}/{topic}?channel={channel}`
- `pushplus://{token}?channel=webhook&name={webhook_name}`
- `pushplus://{webhook_name}@{token}`
- `pushplus://{token}?channel={channel}&option={code}`
- `pushplus://{token}?template={template}`
- `pushplus://{token}?callback={url}`
- `wecom://{token}`

## Détail des Paramètres

| Variable     | Requis | Description                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | \*Oui  | Votre token PushPlus personnel depuis le tableau de bord. Peut également être fourni via `?token=`.                                                                                                                                                                                                                                                                       |
| topic        | Non    | Code de groupe placé dans le chemin de l'URL, précédé d'un `#` facultatif. Plusieurs topics peuvent apparaître ; un appel API est effectué par topic. Peut également être fourni via `?topic=` ou `?to=`.                                                                                                                                                                 |
| channel      | Non    | Canal de livraison. Un ou plusieurs des suivants, séparés par des virgules : `wechat` (défaut), `app`, `extension`, `webhook`, `clawbot`, `cmcc`, `qq`, `cp`, `wecom`, `mail`, `sms`, `voice`. Fourni via `?channel=` ou son alias `?mode=`.                                                                                                                              |
| friend_token | Non    | Token d'un ami PushPlus, placé dans le chemin de l'URL et précédé d'un `@` (un identifiant utilisateur WeCom sur le canal `cp`). 10 amis au maximum sont envoyés par appel API. Peut également être fourni via `?to=`.                                                                                                                                                    |
| option       | Non    | Code de configuration issu des paramètres des canaux PushPlus, utilisé par les canaux `cp`, `webhook`, `mail` et `qq`. Avec plusieurs canaux, donnez un code par canal, dans le même ordre et séparés par des virgules. `?name=` et `?webhook=` correspondent au même réglage. La forme user@ `pushplus://{name}@{token}` le définit aussi et implique `channel=webhook`. |
| template     | Non    | Un template PushPlus spécial : `json`, `cloudMonitor`, `jenkins`, `route` ou `pay`. Utilisez `?format=` pour HTML, Markdown ou texte brut.                                                                                                                                                                                                                                |
| callback     | Non    | Adresse web à laquelle PushPlus envoie le résultat final de la livraison. `?callbackUrl=` fonctionne aussi.                                                                                                                                                                                                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Voir Aussi

Apprise propose deux intégrations WeCom/WeChat complémentaires :

- **[WeChat (WeCom)](../wechat/)** -- envoie directement aux utilisateurs, départements et étiquettes WeCom via l'API de messages de l'application WeCom ; nécessite un CorpID, un Secret d'Application et un AgentID depuis la console d'administration WeCom.
- **[WeCom Bot](../wecombot/)** -- envoie dans un groupe WeCom via une clé de webhook ; plus simple à configurer, mais livre dans un groupe plutôt qu'à des utilisateurs ou départements spécifiques.

## Exemples

Envoyer une notification personnelle simple :

```bash
apprise -vv -t "Titre" -b "Bonjour depuis Apprise" \
    pushplus://abc123def456ghi789jkl012mno345pq
```

Envoyer un message formaté en Markdown :

```bash
apprise -vv -t "Alerte" -b "## Avertissement\n\nQuelque chose s'est produit." \
    "pushplus://abc123def456ghi789jkl012mno345pq?format=markdown"
```

Envoyer à un groupe (topic) :

```bash
apprise -vv -t "Alerte Équipe" -b "Déploiement terminé." \
    pushplus://abc123def456ghi789jkl012mno345pq/mongroupe
```

Envoyer à deux groupes simultanément (un appel API par groupe) :

```bash
apprise -vv -t "Diffusion" -b "Maintenance système dans 30 minutes." \
    pushplus://abc123def456ghi789jkl012mno345pq/equipe-ops/equipe-dev
```

Livrer par e-mail :

```bash
apprise -vv -t "Titre" -b "Corps de l'e-mail" \
    "pushplus://abc123def456ghi789jkl012mno345pq?channel=mail"
```

Envoyer à un groupe et livrer par e-mail :

```bash
apprise -vv -t "Titre" -b "E-mail de groupe" \
    "pushplus://abc123def456ghi789jkl012mno345pq/mongroupe?channel=mail"
```

Livrer par WeChat et par e-mail en même temps :

```bash
apprise -vv -t "Titre" -b "Bonjour" \
    "pushplus://abc123def456ghi789jkl012mno345pq?channel=wechat,mail"
```

Envoyer à deux amis :

```bash
apprise -vv -t "Titre" -b "Bonjour les amis" \
    "pushplus://abc123def456ghi789jkl012mno345pq/@friendtoken1/@friendtoken2"
```

Livrer par e-mail avec un code de configuration :

```bash
apprise -vv -t "Titre" -b "Corps de l'e-mail" \
    "pushplus://abc123def456ghi789jkl012mno345pq?channel=mail&option=monmail"
```

Livrer via un point de terminaison webhook nommé (forme longue) :

```bash
apprise -vv -t "Titre" -b "Charge utile webhook" \
    "pushplus://abc123def456ghi789jkl012mno345pq?channel=webhook&name=monhook"
```

Livrer via un point de terminaison webhook nommé (forme compacte -- canal implicite) :

```bash
apprise -vv -t "Titre" -b "Charge utile webhook" \
    "pushplus://monhook@abc123def456ghi789jkl012mno345pq"
```

Utiliser l'alias de schéma WeCom (équivalent à `?channel=cp`) :

```bash
apprise -vv -t "Titre" -b "Message WeCom" \
    wecom://abc123def456ghi789jkl012mno345pq
```

Utiliser l'URL native de l'API PushPlus directement :

```bash
apprise -vv -t "Titre" -b "Bonjour" \
    "https://www.pushplus.plus/send?token=abc123def456ghi789jkl012mno345pq"
```
