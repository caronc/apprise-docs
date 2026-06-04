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
2. Créez un groupe et notez son **code de groupe** — c'est la valeur du topic.
3. Les abonnés rejoignent le groupe dans WeChat ; lorsque vous envoyez au topic, tous les membres reçoivent le message.

Placez un ou plusieurs codes de groupe directement dans le chemin de l'URL :

```text
pushplus://{token}/{topic}
pushplus://{token}/{topic1}/{topic2}
```

Lorsque plusieurs topics sont listés, Apprise envoie la notification à chaque groupe dans un appel API séparé.

### Canaux de Livraison

Par défaut, les notifications arrivent via WeChat. Vous pouvez les rediriger vers un canal différent en utilisant le paramètre de requête `?channel=` (ou son synonyme `?mode=`) :

| Valeur `?channel=` | Canal                                   |
| ------------------ | --------------------------------------- |
| `wechat`           | WeChat (défaut — peut être omis)        |
| `webhook`          | Point de terminaison webhook configuré  |
| `cp`               | WeCom (WeChat Work / Enterprise WeChat) |
| `wecom`            | Alias convivial pour `cp` — même canal  |
| `mail`             | Adresse e-mail enregistrée              |
| `sms`              | SMS                                     |

```text
pushplus://{token}?channel=mail
pushplus://{token}/{topic}?channel=cp
```

`channel=` et `mode=` sont entièrement interchangeables ; utilisez celui qui se lit le plus naturellement dans votre configuration.

#### Alias de Schéma

Apprise accepte également `wecom://` comme préfixe de schéma pour les utilisateurs WeCom. Il définit automatiquement le canal de livraison à `cp` — aucun paramètre de requête supplémentaire n'est nécessaire :

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

### Rendu des Messages

Le corps du message est rendu par PushPlus sur leurs serveurs en utilisant un template qui correspond au paramètre de format standard d'Apprise :

| `?format=` Apprise | PushPlus rend comme                       |
| ------------------ | ----------------------------------------- |
| `html` (défaut)    | HTML — gras, liens et images fonctionnent |
| `markdown`         | Markdown — titres, gras, listes, etc.     |
| `text`             | Texte brut — sans mise en forme           |

Il n'y a pas de paramètre spécifique à PushPlus ; définissez `?format=markdown` (ou l'équivalent dans votre YAML/config) de la même manière que pour tout autre service Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `https://www.pushplus.plus/send?token={token}`
- `pushplus://{token}`
- `pushplus://{token}/{topic}`
- `pushplus://{token}/{topic1}/{topic2}`
- `pushplus://{token}?channel={channel}`
- `pushplus://{token}/{topic}?channel={channel}`
- `pushplus://{token}?channel=webhook&name={webhook_name}`
- `pushplus://{webhook_name}@{token}`
- `wecom://{token}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                   |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | \*Oui  | Votre token PushPlus personnel depuis le tableau de bord. Peut également être fourni via `?token=`.                                                                                           |
| topic    | Non    | Code de groupe placé dans le chemin de l'URL. Plusieurs topics peuvent apparaître ; un appel API est effectué par topic. Peut également être fourni via `?topic=` ou `?to=`.                  |
| channel  | Non    | Canal de livraison. L'un des suivants : `wechat` (défaut), `webhook`, `cp`, `wecom`, `mail`, `sms`. Fourni via `?channel=` ou son alias `?mode=`.                                             |
| name     | Non    | Nom du point de terminaison webhook. Utilisé uniquement lorsque `?channel=webhook`. Fourni via `?name=` ou via le composant user@ : `pushplus://{name}@{token}` (implique `channel=webhook`). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Voir Aussi

Apprise propose deux integrations WeCom/WeChat complementaires :

- **[WeChat (WeCom)](../wechat/)** -- envoie directement aux utilisateurs, departements et etiquettes WeCom via l'API de messages de l'application WeCom ; necessite un CorpID, un Secret d'Application et un AgentID depuis la console d'administration WeCom.
- **[WeCom Bot](../wecombot/)** -- envoie dans un groupe WeCom via une cle de webhook ; plus simple a configurer, mais livre dans un groupe plutot qu'a des utilisateurs ou departements specifiques.

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
