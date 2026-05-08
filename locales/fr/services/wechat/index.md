---
title: "Notifications WeChat (Application WeCom)"
description: "Envoyer des notifications directement aux utilisateurs, departements et etiquettes WeCom via l'API de messages de l'application WeCom."
sidebar:
  label: "WeChat (WeCom)"

source: https://work.weixin.qq.com/

schemas:
  - wechat

limits:
  max_chars: 2048

sample_urls:
  - wechat://{corpid}:{corpsecret}@{agentid}/@all
  - wechat://{corpid}:{corpsecret}@{agentid}/{userid}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Ce plugin utilise l'**API de messages de l'application WeCom** pour livrer des notifications directement aux utilisateurs, departements ou etiquettes d'une organisation WeCom (WeChat Work / Enterprise WeChat). Aucun service intermediaire n'est requis.

Vous aurez besoin de trois identifiants provenant de la console d'administration WeCom :

1. Connectez-vous a la console d'administration WeCom sur [https://work.weixin.qq.com/](https://work.weixin.qq.com/).
2. Allez dans **"Applications & Mini Programs" -> "Applications"** et creez une nouvelle application auto-developpee, ou selectionnez-en une existante.
3. Copiez l'**AgentID** affiche sur la page de details de l'application.
4. Allez dans **"Mon Entreprise" -> "Informations sur l'Entreprise"** et copiez le **CorpID**.
5. Sur la page de l'application, cliquez sur **"Afficher"** a cote de **Secret** et copiez le **Secret d'Application**.

:::note
Le Secret d'Application n'est affiche qu'une seule fois apres sa generation. Conservez-le en lieu sur.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `wechat://{corpid}:{corpsecret}@{agentid}/@all`
- `wechat://{corpid}:{corpsecret}@{agentid}/@{userid}`
- `wechat://{corpid}:{corpsecret}@{agentid}/@{user1}/@{user2}`
- `wechat://{corpid}:{corpsecret}@{agentid}/%23{deptid}`
- `wechat://{corpid}:{corpsecret}@{agentid}/+{tagid}`
- `wechat://{corpid}:{corpsecret}@{agentid}/@{user}/%23{dept}/+{tag}`

**Regles de prefixe des destinataires :**

| Prefixe                   | Type de destinataire                                               | Exemple    |
| ------------------------- | ------------------------------------------------------------------ | ---------- |
| `@`                       | Identifiant utilisateur WeCom (optionnel en entree, toujours emis) | `@johndoe` |
| `@all`                    | Tous les utilisateurs de l'organisation                            | `@all`     |
| `%23` (`#` encode en URL) | Identifiant de departement (numerique)                             | `%23100`   |
| `+`                       | Identifiant d'etiquette (numerique)                                | `+7`       |

:::note
**`@all` est un mot-cle reserve** qui diffuse a tous les membres de l'organisation. La forme sans prefixe `all` (sans `@`) est egalement acceptee et traitee de maniere identique. Les deux formes envoient a tout le monde et non a un utilisateur nomme "all".

Le prefixe `@` sur les identifiants utilisateur ordinaires est **optionnel lors de la saisie manuelle d'une URL** -- `johndoe` et `@johndoe` sont tous deux acceptes. Apprise emet toujours le prefixe `@` dans les URLs generees pour que tous les types de destinataires soient visuellement distincts.
:::

Vous pouvez combiner plusieurs destinataires de differents types dans une seule URL. Au moins un destinataire doit etre specifie.

## Detail des Parametres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                         |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| corpid     | \*Oui       | L'identifiant d'entreprise (CorpID) trouve sous "Mon Entreprise" -> "Informations sur l'Entreprise" dans la console d'administration WeCom.                                                                                                         |
| corpsecret | \*Oui       | Le Secret d'Application genere pour l'application auto-developpee.                                                                                                                                                                                  |
| agentid    | \*Oui       | L'identifiant d'agent (AgentID) numerique affiche sur la page de details de l'application.                                                                                                                                                          |
| targets    | Non         | Un ou plusieurs destinataires dans le chemin de l'URL. Utilisez aucun prefixe pour les identifiants utilisateur, `@all` pour toute l'organisation, le prefixe `%23` pour les identifiants de departement, et `+` pour les identifiants d'etiquette. |
| to         | Non         | Liste de destinataires separee par des virgules fournie en tant que parametre de requete (`?to=`) plutot que dans le chemin de l'URL.                                                                                                               |
| format     | Non         | Definissez a `markdown` pour envoyer le corps de la notification comme un message Markdown WeCom ; le texte brut est la valeur par defaut.                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer a tous les utilisateurs de l'organisation :

```bash
# Remplacez par votre CorpID, Secret d'Application et AgentID
apprise -vv -t "Titre de Test" -b "Message de Test" \
   "wechat://wwCORPID:SECRETAPP@1000002/@all"
```

Envoyer a un utilisateur specifique :

```bash
apprise -vv -t "Titre de Test" -b "Message de Test" \
   "wechat://wwCORPID:SECRETAPP@1000002/@johndoe"
```

Envoyer a plusieurs utilisateurs :

```bash
apprise -vv -t "Titre de Test" -b "Message de Test" \
   "wechat://wwCORPID:SECRETAPP@1000002/@alice/@bob/@charlie"
```

Envoyer a un departement (identifiant de departement 42) :

```bash
apprise -vv -t "Titre de Test" -b "Message de Test" \
   "wechat://wwCORPID:SECRETAPP@1000002/%2342"
```

Envoyer une notification au format Markdown :

```bash
apprise -vv -t "Titre de Test" -b "## Alerte\nQuelque chose s'est produit." \
   "wechat://wwCORPID:SECRETAPP@1000002/@all?format=markdown"
```

## Voir Aussi

Apprise propose egalement deux integrations WeCom/WeChat complementaires :

- **[WeCom Bot](../wecombot/)** -- envoie dans un groupe WeCom via une cle de webhook ; plus simple a configurer, mais livre dans un groupe plutot qu'a des utilisateurs ou departements specifiques.
- **[PushPlus](../pushplus/)** -- achemine les notifications via la plateforme PushPlus, qui prend en charge la livraison via WeChat, WeCom, email et SMS depuis un seul token personnel.
