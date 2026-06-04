---
title: "Notifications Matrix"
description: "Envoyer des notifications Matrix."
sidebar:
  label: "Matrix"

source: https://matrix.org/

schemas:
  - matrix: insecure
  - matrixs

has_image: true
has_attachments: true

sample_urls:
  - matrix://{user}:{password}@{hostname}/#{room_alias}
  - matrixs://{user}:{password}@{hostname}/!{room_id}
  - matrixs://{token}@{hostname}/#{room_alias}
  - matrixs://{user}:{password}@{hostname}/@{target_user}

limits:
  max_chars: 65000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Par défaut, Apprise communique directement avec votre serveur Matrix via l’API Client officielle.

Vous pouvez aussi utiliser le mode webhook à la place de l’API Client Matrix. Ce mode est activé en précisant **?mode=matrix**, **?mode=slack** ou **?mode=hookshot**, selon le service webhook que vous avez configuré.

## Syntaxe

La syntaxe valide est la suivante :

Avec un nom d’utilisateur et un mot de passe :

- `matrix://{user}:{password}@{hostname}/#{room_alias}`
- `matrixs://{user}:{password}@{hostname}/!{room_id}`

Avec un jeton d’accès pré-généré, sans nom d’utilisateur ni mot de passe :

- `matrix://{token}@{hostname}/#{room_alias}`
- `matrixs://{token}@{hostname}/!{room_id}`

Vous pouvez aussi fournir le jeton en paramètre de requête :

- `matrixs://{hostname}/#{room_alias}?token={token}`

### Cibles de type Alias de Salon

Les alias de salon sont préfixés par `#`. Vous pouvez en préciser plusieurs en les séparant par des slashs :

- `matrixs://{user}:{password}@{hostname}/#{room_alias}`
- `matrixs://{user}:{password}@{hostname}/#{room_alias1}/#{room_alias2}`
- `matrixs://{token}@{hostname}/#{room_alias1}/#{room_alias2}`

### Cibles de type Room ID

Les identifiants de salon sont préfixés par `!`. Vous pouvez en préciser plusieurs de la même manière :

- `matrixs://{user}:{password}@{hostname}/!{room_id}`
- `matrixs://{user}:{password}@{hostname}/!{room_id1}/!{room_id2}`
- `matrixs://{token}@{hostname}/!{room_id1}/!{room_id2}`

### Cibles de type Message Direct

Pour envoyer un message direct, DM, à un utilisateur Matrix, préfixez la cible avec `@`. Vous pouvez aussi inclure explicitement le homeserver dans la cible :

- `matrixs://{user}:{password}@{hostname}/@{target_user}`
- `matrixs://{user}:{password}@{hostname}/@{target_user}:{homeserver}`
- `matrixs://{token}@{hostname}/@{target_user}`
- `matrixs://{token}@{hostname}/@{target_user}:{homeserver}`

Vous pouvez notifier plusieurs utilisateurs en DM dans une seule URL :

- `matrixs://{user}:{password}@{hostname}/@{user1}/@{user2}`
- `matrixs://{token}@{hostname}/@{user1}/@{user2}`

:::note
Contrairement aux identifiants de salon, les cibles DM **reçoivent toujours** le homeserver authentifié lorsqu’aucun homeserver explicite n’est fourni. `@alice` est donc toujours résolu en `@alice:{home_server}`, quelle que soit la valeur de `hsreq`. Pour envoyer un DM à un utilisateur sur un autre serveur, précisez explicitement le homeserver, par exemple `@alice:otherhost.com`.
:::

### Mélanger les Types de Cibles

Les alias de salon (`#`), les room IDs (`!`) et les utilisateurs DM (`@`) peuvent être librement combinés dans n’importe quel ordre au sein d’une même URL :

- `matrixs://{user}:{password}@{hostname}/#{room_alias}/@{target_user}`
- `matrixs://{user}:{password}@{hostname}/#{room_alias}/!{room_id}/@{target_user}`
- `matrixs://{token}@{hostname}/#{room_alias}/!{room_id}/@{target_user}`

:::note
Si aucun utilisateur et/ou mot de passe n’est précisé, le processus d’enregistrement Matrix peut être déclenché. Certains serveurs Matrix autorisent l’enregistrement automatique d’utilisateurs temporaires, selon leur configuration. Dans la plupart des environnements de production, vous devriez toujours fournir **`{user}`** et **`{password}`**, ou bien un **`{token}`** pré-généré.
:::

## Identifiants de Salon et Comportement du Homeserver

Matrix prend en charge à la fois :

- les **alias de salon** préfixés par `#` ;
- les **room IDs** préfixés par `!`.

Les identifiants de salon peuvent inclure un composant homeserver, par exemple `:example.com`. Dans Matrix, les alias de salon sont souvent écrits avec un homeserver, et les room IDs sont eux aussi généralement attendus sous cette forme.

Exemples:

- `#general`
- `#general:example.com`
- `!abc123`
- `!abc123:example.com`

### Comportement par Défaut (Recommandé)

Par défaut, Apprise **impose** la présence d’un homeserver sur les identifiants de salon lorsqu’il manque.

Si vous fournissez :

- `#room` : il est interprete en interne comme `#room:{hostname}`
- `!room` : il est interprete en interne comme `!room:{hostname}`

Si vous incluez explicitement un homeserver, Apprise le respecte exactement tel quel.

### Désactivation de ce Comportement (Mode Compatibilité)

Vous pouvez désactiver cette contrainte en précisant `?hsreq=no`. Dans ce cas :

- `#room` est utilise exactement tel qu'il est fourni.
- `!room` est utilise exactement tel qu'il est fourni.

`hsreq` ne s’applique qu’aux identifiants de salon, c’est-à-dire `#` et `!`. Les cibles DM de type `@` ne sont pas concernées : elles utilisent toujours le homeserver authentifié lorsqu’aucun homeserver explicite n’est présent.

Ce mode est destiné aux environnements où un reverse proxy, un comportement serveur non standard ou un routage URL strict rend l’ajout du suffixe `:homeserver` indésirable.

Si vous utilisez des room IDs préfixés par `!`, notez que de nombreuses installations Matrix attendent des identifiants complètement qualifiés. Si votre serveur rejette `!room:{hostname}` mais accepte `!room` tel quel, `hsreq=no` peut être nécessaire.

Par exemple, avec :

```text
matrix://user:pass@localhost/#room/!abc123
```

Avec le comportement par défaut, `hsreq=yes` :

- `#room` devient `#room:localhost`
- `!abc123` devient `!abc123:localhost`

Avec la contrainte désactivée :

```text
matrix://user:pass@localhost/#room/!abc123?hsreq=no
```

- `#room` est utilise comme `#room`
- `!abc123` est utilise comme `!abc123`

Dans les deux cas, une cible DM comme `@alice` deviendrait `@alice:localhost`, quelle que soit la valeur de `hsreq`.

## Mode Webhook

Lorsque vous précisez l’argument **?mode=**, le plugin bascule entièrement en comportement webhook et la syntaxe change :

- `matrix://{user}:{token}@{hostname}?mode=matrix`
- `matrixs://{token}@{hostname}:{port}?mode=matrix`
- `matrix://{user}:{token}@{hostname}?mode=slack&format=markdown`
- `matrixs://{token}@{hostname}?mode=slack&format=markdown`
- `matrix://{user}:{token}@{hostname}?mode=hookshot`
- `matrixs://{user}:{token}@{hostname}?mode=hookshot&path=/webhook`

Avec **matrix-hookshot**, le chemin du webhook est configurable et vaut **/webhook** par défaut :

- `matrixs://{user}:{token}@{hostname}?mode=hookshot`
- `matrixs://{user}:{token}@{hostname}?mode=hookshot&path=/public-hooks`

Si vous utilisez [**t2bot.io**](https://t2bot.io/), vous pouvez utiliser :

- `matrix://{t2bot_webhook_token}`
- `matrix://{user}@{t2bot_webhook_token}`

Ou directement :

- `https://webhooks.t2bot.io/api/v1/matrix/hook/{t2bot_webhook_token}`

## Détail des Paramètres

| Variable            | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hostname            | \*Oui  | Le serveur Matrix auquel vous souhaitez vous connecter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| t2bot_webhook_token | \*Oui  | Utilisé en mode webhook t2bot. Dans ce cas, il tient lieu de nom d’hôte.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| user                | Non    | L’utilisateur à authentifier, et éventuellement à enregistrer, auprès du serveur Matrix.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| password            | Non    | Le mot de passe à utiliser pour l’authentification, et éventuellement l’enregistrement, auprès du serveur Matrix.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| token               | Non    | Jeton d’accès Matrix pré-généré. Utilisez-le à la place de **user** et **password** lorsque votre serveur désactive la connexion par mot de passe, par exemple dans un déploiement SSO uniquement. Peut aussi être fourni avec `?token=`. Lorsqu’il est utilisé sans nom d’utilisateur, placez-le dans la position utilisateur : `matrix://{token}@{hostname}/`.                                                                                                                                                                                                                                                                                                                                                                                                   |
| port                | Non    | Port sur lequel le serveur Matrix écoute. Par défaut, **matrixs://** utilise le port **443** tandis que **matrix://** utilise le port **80**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| room_alias          | Non    | Alias du salon à rejoindre et notifier. Il est recommandé de le préfixer avec **#**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| room_id             | Non    | Identifiant du salon à rejoindre et notifier. Il doit être préfixé avec **!**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| thumbnail           | Non    | Affiche une image avant chaque notification pour représenter le type de notification. La valeur par défaut est **False**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| mode                | Non    | Active le mode webhook. Les valeurs valides sont **matrix**, **slack**, **t2bot** et **hookshot**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| path                | Non    | Utilisé avec le mode **hookshot** pour définir le chemin webhook public. La valeur par défaut est **/webhook**. Par exemple, si votre instance hookshot est exposée à `https://hookshot.example/public-hooks/{token}`, alors utilisez `?mode=hookshot&path=/public-hooks`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| msgtype             | Non    | Type de message Matrix : **text** ou **notice**. La valeur par défaut est **text**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| version             | Non    | Surcharge la version de l’API Client Matrix. Les valeurs prises en charge sont **2** et **3**. La valeur par défaut est **3**. Peut aussi être fournie avec `?v=`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| hsreq               | Non    | Lorsqu’il est activé, ce qui est le cas par défaut, Apprise ajoute automatiquement le homeserver authentifié aux identifiants de salon qui n’en contiennent pas déjà un. Par exemple, `#room` devient `#room:hostname`. Définissez `no` pour désactiver ce comportement et utiliser les identifiants exactement tels qu’ils sont fournis.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| e2ee                | Non    | Contrôle le chiffrement de bout en bout via le protocole Matrix Olm/MegOLM. Lorsqu’il est activé, ce qui est le cas par défaut, Apprise détecte automatiquement si chaque salon est configuré pour le chiffrement et chiffre alors les messages comme les pièces jointes pour ceux qui le prennent en charge, tout en envoyant les autres en texte brut. Lorsqu’Apprise crée un nouveau salon avec `e2ee=yes`, il définit l’état `m.room.encryption` dès la création afin que le salon soit chiffré dès le premier message. Cela exige le paquet Python `cryptography` et une connexion **matrixs://**. Non pris en charge en mode webhook. Définissez `no` pour toujours envoyer en clair et éviter la création de salons E2EE. La valeur par défaut est **yes**. |
| target_user         | Non    | Identifiant utilisateur Matrix à notifier en message direct. Doit être préfixé par **@**, par exemple **@alice** ou **@alice:homeserver**. Apprise cherche, ou crée, automatiquement un salon DM avec cet utilisateur. Non pris en charge en mode webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| discovery           | Non    | Lorsqu’elle est activée, ce qui est le cas par défaut, Apprise effectue une recherche `.well-known/matrix/client` au premier usage pour résoudre l’URL de base réelle du homeserver. Définissez `no` pour désactiver cette découverte et vous connecter directement au nom d’hôte fourni. Désactivé automatiquement en mode webhook. La valeur par défaut est **yes**.                                                                                                                                                                                                                                                                                                                                                                                             |

:::note
Si ni **`{room_alias}`**, ni **`{room_id}`**, ni **`{target_user}`** n’est précisé, Apprise interrogera le serveur pour récupérer les salons actuellement rejoints et les notifiera tous.
:::
:::note
Lors d’un envoi vers un **`{target_user}`**, Apprise recherche un salon DM existant via les données de compte `m.direct`, ou en crée un si nécessaire. Si l’utilisateur cible quitte ensuite ce salon, Apprise continuera à y envoyer les messages, qui seront acceptés par le serveur mais ne seront plus visibles pour l’utilisateur. Il n’existe pas de réinvitation automatique. Pour corriger cela, l’utilisateur doit rejoindre à nouveau le salon, ou vous devez effacer le stockage persistant Apprise afin qu’un nouveau salon DM soit créé lors du prochain envoi.
:::
:::note
E2EE exige à la fois une URL **matrixs://**, donc HTTPS, et le paquet Python `cryptography`, installé par exemple via `pip install cryptography`. Avec une connexion **matrix://** en HTTP simple, E2EE est silencieusement ignoré et les messages sont envoyés en clair, quelle que soit la valeur de `e2ee`.
:::
:::tip
Apprise met en cache les clés de session E2EE ainsi que l’état de chiffrement des salons dans son stockage persistant afin d’éviter des allers-retours réseau inutiles. Si la configuration de chiffrement d’un salon change après le premier envoi, par exemple si le chiffrement est activé sur un salon auparavant non chiffré, Apprise continuera à utiliser l’état mis en cache jusqu’à réinitialisation du stockage. Pour forcer un nouvel échange de clés et une nouvelle lecture de l’état du salon, effacez le stockage persistant Apprise de cette instance du plugin.
:::
:::note[Salons créés par Apprise lorsque `e2ee=yes`]
Lorsque `e2ee=yes`, ce qui est la valeur par défaut, et qu’Apprise crée un nouveau salon, soit parce qu’un alias n’existe pas encore, soit parce qu’un nouveau salon DM est nécessaire, Apprise crée ce salon **avec** l’événement d’état `m.room.encryption` défini sur `m.megolm.v1.aes-sha2`.

- Le chiffrement est **irréversible** une fois activé sur un salon ; Apprise chiffre donc les nouveaux salons dès leur création afin que chaque message, y compris le tout premier, soit protégé.
- Les clients ne prenant pas en charge E2EE, anciens ou non standard, peuvent toujours **rejoindre** le salon, mais ils ne pourront pas lire les messages chiffrés.
- Si vous avez besoin d’un salon lisible par des clients non E2EE, précréez-le dans votre client Matrix sans activer le chiffrement avant de le cibler avec Apprise, ou utilisez `e2ee=no` dans votre URL Apprise.

Pour les salons qu’Apprise n’a **pas** créés, il vérifie l’état `m.room.encryption` à chaque envoi et chiffre automatiquement les messages pour les salons qui l’ont déjà défini, quelle que soit leur origine. Les salons sans état de chiffrement reçoivent toujours des messages en clair, même lorsque `e2ee=yes`.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Matrix sécurisée avec nom d’utilisateur et mot de passe :

```bash
# Supposons que {hostname} soit matrix.example.com
# Supposons que {user} soit nuxref
# Supposons que {password} soit abc123
# Notifier #general et #apprise
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   matrixs://nuxref:abc123@matrix.example.com/#general/#apprise
```

Envoyer une notification avec un jeton d’accès pré-généré, pratique lorsque
la connexion par mot de passe est désactivée sur le serveur :

```bash
# Supposons que {hostname} soit matrix.example.com
# Supposons que {token} soit syt_abc123...
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "matrixs://syt_abc123@matrix.example.com/#general"
```

Desactiver l'imposition du homeserver :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   matrixs://nuxref:abc123@matrix.example.com/!abc123?hsreq=no
```

Utiliser l’API v2, requise pour les pièces jointes sur certains déploiements :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   matrixs://nuxref:abc123@matrix.example.com/#general?v=2
```

E2EE est activé par défaut lorsque le paquet `cryptography` est installé et que le salon le prend en charge. Pour désactiver explicitement E2EE et toujours envoyer en clair :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "matrixs://nuxref:abc123@matrix.example.com/#general?e2ee=no"
```

Envoyer un message direct a un utilisateur Matrix :

```bash
# Supposons que {hostname} soit matrix.example.com
# Supposons que {user} soit nuxref, et {password} abc123
# Envoyer un MP a @bob sur le meme homeserver
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   matrixs://nuxref:abc123@matrix.example.com/@bob
```

Envoyer un message direct avec un jeton d’accès pré-généré :

```bash
# Supposons que {hostname} soit matrix.example.com
# Supposons que {token} soit syt_abc123...
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "matrixs://syt_abc123@matrix.example.com/@bob"
```

Envoyer une requête webhook **t2bot.io** :

```bash
# Supposons que {webhook} soit ABCDEFG12345
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   matrix://ABCDEFG12345
```

Envoyer une requête webhook **matrix-hookshot** :

```bash
# Supposons que {hostname} soit hookshot.example.com
# Supposons que {token} soit ABCDEFG12345
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "matrixs://apprise:ABCDEFG12345@hookshot.example.com?mode=hookshot"
```

Si votre instance hookshot est exposée derrière un chemin webhook public personnalisé :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "matrixs://apprise:ABCDEFG12345@hookshot.example.com?mode=hookshot&path=/public-hooks"
```
