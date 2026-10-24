---
title: "Notifications Zoho Cliq"
description: "Publiez des messages dans des canaux et des bots Zoho Cliq à l'aide d'un jeton de webhook."
sidebar:
  label: "Zoho Cliq"

source: https://www.zoho.com/cliq/

schemas:
  - cliq
  - zcliq
  - zohocliq

has_chat: true
has_image: true

body_formats:
  - markdown

limits:
  max_chars: 5000

sample_urls:
  - cliq://{token}/{channel}
  - cliq://{token}/@{bot}
  - cliq://{botname}@{token}/#{channel}/@{bot}?region=eu
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Les messages [Zoho Cliq](https://www.zoho.com/cliq/) sont publiés à l'aide d'un jeton de webhook (Webhook Token) :

1. Connectez-vous à Zoho Cliq et ouvrez **Bots & Tools**, puis **Webhook Tokens**.
2. Terminez l'étape de vérification et cliquez sur **Generate New Token**.
3. Copiez le jeton. Il ressemble à `1001.2798931fdf4905dc5d37806b47d8253a.2d73063dae2ccf4a04810ddb0a1b2c3d`.

Les messages peuvent être envoyés à un canal ou à un bot :

- Les **canaux** sont désignés par leur nom unique, affiché sur la page **Channel Info** du canal.
- Les **bots** sont désignés par leur nom unique précédé d'un `@`. Un message de bot arrive dans votre propre discussion avec le bot, sauf si `broadcast=yes` est défini : dans ce cas, chaque abonné du bot le reçoit.

Si votre compte n'est pas hébergé dans le centre de données américain, ajoutez `region=` à l'URL. L'adresse à laquelle vous vous connectez vous l'indique : par exemple, `cliq.zoho.eu` correspond à `region=eu`.

Vous pouvez aussi coller telle quelle une URL de webhook Cliq, par exemple `https://cliq.zoho.com/api/v2/channelsbyname/{channel}/message?zapikey={token}`.

:::note
Les jetons de webhook permettent uniquement de publier des messages, les pièces jointes ne sont donc pas prises en charge.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `cliq://{token}/{channel}`
- `cliq://{token}/#{channel}`
- `cliq://{token}/@{bot}`
- `cliq://{botname}@{token}/#{channel1}/#{channel2}/@{bot}`
- `https://cliq.zoho.com/api/v2/channelsbyname/{channel}/message?zapikey={token}`
- `https://cliq.zoho.com/api/v2/bots/{bot}/message?zapikey={token}`

Les schémas `zcliq://` et `zohocliq://` fonctionnent de la même façon que `cliq://`.

## Détails des paramètres

| Variable  | Requis | Description                                                                                                                                                                          |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token     | Oui    | Votre jeton de webhook Zoho Cliq.                                                                                                                                                    |
| channel   | \*Non  | Le nom unique d'un canal à notifier. Le `#` initial est facultatif.                                                                                                                  |
| bot       | \*Non  | Le nom unique d'un bot à notifier, précédé d'un `@`.                                                                                                                                 |
| botname   | Non    | Le nom d'expéditeur affiché sur le message. S'il n'est pas défini et que `image=yes`, le nom **Apprise** est utilisé.                                                                |
| region    | Non    | Le centre de données qui héberge votre compte. Les valeurs possibles sont **us**, **eu**, **in**, **au**, **cn**, **jp**, **sa**, **uk** et **ca**. La valeur par défaut est **us**. |
| company   | Non    | L'identifiant de votre entreprise, pour les comptes qui appartiennent à plusieurs entreprises. C'est le numéro qui suit `/company/` dans votre adresse Cliq.                         |
| image     | Non    | Affiche comme image de l'expéditeur une icône correspondant au type de notification. Mettez `no` pour publier en votre propre nom. La valeur par défaut est `yes`.                   |
| broadcast | Non    | Envoie les messages de bot à chaque abonné du bot. La valeur par défaut est `no`.                                                                                                    |

\*Au moins un canal ou un bot doit être indiqué.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message au canal `general` :

```bash
apprise -vv -t "Sauvegarde terminée" -b "Tous les fichiers ont été copiés" \
   "cliq://1001.2798931fdf4905dc5d37806b47d8253a.2d73063dae2ccf4a04810ddb0a1b2c3d/general"
```

Envoyer un message à un canal et à chaque abonné d'un bot, pour un compte hébergé en Europe :

```bash
apprise -vv -t "Espace disque" -b "db01 est utilisé à 95 %" \
   "cliq://Monitor@1001.2798931fdf4905dc5d37806b47d8253a.2d73063dae2ccf4a04810ddb0a1b2c3d/#ops/@alertbot?region=eu&broadcast=yes"
```
