---
title: "Notifications WPUSH"
description: "Envoyer des notifications WeChat et multi-canaux via la plateforme WPUSH."
sidebar:
  label: "WPUSH"

source: https://wpush.cn/

schemas:
  - wpush

sample_urls:
  - https://api.wpush.cn/api/v1/send?apikey={apikey}
  - wpush://{apikey}
  - wpush://{apikey}/{topic}
  - wpush://{apikey}?channel={channel}
  - wpush://{apikey}?channel=qqbot&group={qq_group_code}

limits:
  max_chars: 10000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

WPUSH envoie des notifications via WeChat, son application, SMS, e-mail, DingTalk, Feishu, WeCom, WeChat ClawBot, le robot QQ et des Webhooks personnalisés. Plusieurs canaux peuvent partager un même appel API. L'authentification utilise une clé API personnelle.

1. Inscrivez-vous ou connectez-vous sur [WPUSH](https://wpush.cn/).
2. Rendez-vous sur la page [Clé API](https://wpush.cn/apikey) et copiez votre clé. Elle commence toujours par `WPUSH` suivi de 27 autres caractères (32 au total).
3. Rendez-vous sur la page [Canaux](https://wpush.cn/channels) et associez au moins un canal de livraison avant d'envoyer votre premier message.

L'URL de notification pour le cas d'usage le plus simple est :

```text
wpush://{apikey}
```

### Envoi par Topic (Diffusion)

WPUSH prend également en charge l'envoi d'une notification unique à tous les abonnés d'un topic nommé.

1. Créez un topic et notez son **code de topic** depuis votre tableau de bord WPUSH.
2. Envoyez au topic pour notifier tous ses abonnés.

Placez un ou plusieurs codes de topic directement dans le chemin de l'URL :

```text
wpush://{apikey}/{topic}
wpush://{apikey}/{topic1}/{topic2}
```

Lorsque plusieurs topics sont listés, Apprise envoie la notification à chacun d'eux dans un appel API séparé.

### Canaux de Livraison

Les notifications utilisent WeChat par défaut. Sélectionnez un ou plusieurs canaux avec `?channel=` :

| Valeur `?channel=` | Canal                                   |
| ------------------ | --------------------------------------- |
| `wechat`           | WeChat (par défaut, peut être omis)     |
| `app`              | L'application mobile WPUSH              |
| `sms`              | SMS                                     |
| `mail`             | E-mail                                  |
| `webhook`          | Point de terminaison webhook configuré  |
| `dingtalk`         | DingTalk                                |
| `feishu`           | Feishu                                  |
| `wechat_work`      | WeCom (WeChat Work / Entreprise WeChat) |
| `clawbot`          | WeChat ClawBot                          |
| `qqbot`            | Robot QQ                                |

Séparez plusieurs canaux par des virgules. WPUSH utilise un seul appel API pour tous :

```text
wpush://{apikey}?channel=mail
wpush://{apikey}/{topic}?channel=feishu
wpush://{apikey}?channel=feishu,dingtalk,wechat_work
```

### Codes de Groupe et d'Instance

`?group=` correspond au champ `option` de WPUSH et a deux usages :

- Avec `qqbot`, il sélectionne un groupe QQ plutôt que le propriétaire du compte.
- Avec Feishu, DingTalk, WeCom ou Webhook, il sélectionne une instance liée.

```text
wpush://{apikey}?channel=qqbot&group={qq_group_code}
wpush://{apikey}?channel=feishu&group={instance_code}
```

Trouvez le code sur la page [Canaux WPUSH](https://wpush.cn/channels). Sans ce paramètre, WPUSH utilise le propriétaire du compte ou l'instance par défaut. Cette option ne peut pas être combinée avec une diffusion par topic.

### Lien Cliquable

Utilisez `?url=` pour ajouter un lien sur les canaux compatibles :

```text
wpush://{apikey}?url=https://example.com/
```

## Syntaxe

Voici la syntaxe valide :

- `https://api.wpush.cn/api/v1/send?apikey={apikey}`
- `wpush://{apikey}`
- `wpush://{apikey}/{topic}`
- `wpush://{apikey}/{topic1}/{topic2}`
- `wpush://{apikey}?channel={channel}`
- `wpush://{apikey}?channel={channel1},{channel2}`
- `wpush://{apikey}/{topic}?channel={channel}`
- `wpush://{apikey}?channel=qqbot&group={qq_group_code}`
- `wpush://{apikey}?url={lien_cliquable}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | \*Oui  | Votre clé API WPUSH personnelle. Commence toujours par `WPUSH`. Peut aussi être fournie via `?apikey=`.                                                                                    |
| topic    | Non    | Code de topic placé dans le chemin de l'URL. Plusieurs topics peuvent apparaître ; un appel API est effectué par topic. Peut aussi être fourni via `?to=`, `?topic=` ou `?topic_code=`.    |
| channel  | Non    | Un ou plusieurs de `wechat` (défaut), `app`, `sms`, `mail`, `webhook`, `dingtalk`, `feishu`, `wechat_work`, `clawbot`, `qqbot`, séparés par des virgules. Fourni via `?channel=`.          |
| group    | Non    | Code de groupe QQ (`qqbot`), ou code d'instance liée pour `feishu`, `dingtalk`, `wechat_work` ou `webhook`. Ne peut pas être combiné avec un topic. Peut aussi être fourni via `?option=`. |
| url      | Non    | Un lien cliquable optionnel joint à la notification.                                                                                                                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une simple notification personnelle :

```bash
apprise -vv -t "Titre" -b "Bonjour depuis Apprise" \
    wpush://WPUSHabc123def456ghi789jkl012mno
```

Envoyer à un topic :

```bash
apprise -vv -t "Alerte Équipe" -b "Déploiement terminé." \
    wpush://WPUSHabc123def456ghi789jkl012mno/ops-team
```

Envoyer à deux topics à la fois (un appel API par topic) :

```bash
apprise -vv -t "Diffusion" -b "Maintenance système dans 30 minutes." \
    wpush://WPUSHabc123def456ghi789jkl012mno/ops-team/dev-team
```

Livrer via Feishu au lieu du canal WeChat par défaut :

```bash
apprise -vv -t "Titre" -b "Message Feishu" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=feishu"
```

Livrer via trois canaux à la fois, en un seul appel API :

```bash
apprise -vv -t "Titre" -b "Message multi-canal" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=feishu,dingtalk,wechat_work"
```

Envoyer à un topic et livrer par e-mail :

```bash
apprise -vv -t "Titre" -b "E-mail de topic" \
    "wpush://WPUSHabc123def456ghi789jkl012mno/ops-team?channel=mail"
```

Livrer à un groupe QQ spécifique via le canal Robot QQ :

```bash
apprise -vv -t "Titre" -b "Message de groupe QQ" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=qqbot&group=123456789"
```

Livrer via une instance Feishu liée spécifique :

```bash
apprise -vv -t "Titre" -b "Message d'instance Feishu" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?channel=feishu&group=my-instance"
```

Joindre un lien cliquable à la notification :

```bash
apprise -vv -t "Titre" -b "Voir le rapport" \
    "wpush://WPUSHabc123def456ghi789jkl012mno?url=https://example.com/report"
```

Utiliser directement l'URL native de l'API WPUSH :

```bash
apprise -vv -t "Titre" -b "Bonjour" \
    "https://api.wpush.cn/api/v1/send?apikey=WPUSHabc123def456ghi789jkl012mno"
```
