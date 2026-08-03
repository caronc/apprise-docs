---
title: "Notifications Pingram"
description: "Envoyer des notifications Pingram."
sidebar:
  label: "Pingram"

source: https://www.pingram.io

schemas:
  - pingram

has_sms: true
has_image: true

sample_urls:
  - pingram://{ApiKey}/{Target}
  - pingram://{Type}@{ApiKey}/{Target}

limits:
  max_chars: 160
---

:::note
Pingram est le nouveau nom de NotificationAPI. Si vous vous êtes inscrit
avant ce changement et disposez toujours d'un couple `clientId`/`clientSecret`,
cette intégration est retirée : ce plugin n'accepte désormais qu'une clé API
Pingram. Vos anciens identifiants peuvent encore fonctionner si vous appelez
directement l'API Pingram, mais ils ne sont plus pris en charge par Apprise.
:::

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pingram vous permet de déclencher des notifications par e-mail, SMS, appel, push et intégrées à l'application à l'aide d'une seule API. Le plugin Apprise prend en charge les hôtes régionaux US, CA et EU. Configurez le contenu une seule fois dans Pingram, puis déclenchez-le depuis Apprise en envoyant le **type** de notification et les informations du **destinataire**, avec des paramètres de fusion facultatifs.

1. Créez un compte Pingram et connectez-vous sur [app.pingram.io](https://app.pingram.io/).
2. Dans les paramètres de votre environnement, ouvrez la section **API Keys** et créez une clé secrète (serveur à serveur) ou une clé publique. Elle ressemblera à `pingram_sk_AbCdEf012345` ou `pingram_pk_AbCdEf012345`.
3. Créez ou identifiez le **type de notification** que vous souhaitez déclencher, par exemple `order_tracking`.
4. Vérifiez que vos destinataires disposent des bons identifiants :
   - Les notifications **Email** exigent une adresse e-mail dans l'objet `to`.
   - Les notifications **SMS** exigent un numéro au format **E.164**, par exemple `+15005550006`.
   - Vous pouvez aussi cibler des utilisateurs via un **user id** Pingram, mais celui-ci reste toujours facultatif ; un e-mail ou un numéro de téléphone seul suffit à identifier un destinataire.
5. Si votre hébergement n'est pas aux États-Unis, notez l'hôte API de votre région (US par défaut, CA ou EU).

## Syntaxe

La syntaxe valide est la suivante :

- `pingram://{ApiKey}/{Target}`
- `pingram://{Type}@{ApiKey}/{Target}`

Les **cibles** peuvent être combinées dans un seul chemin. Chaque segment `{Target}` peut être :

- un identifiant utilisateur (`userid` ou `@userid`) — toujours facultatif
- une adresse e-mail (`name@example.com`)
- un numéro de téléphone au format E.164 (`+15551234567`)

Un id de destinataire n'est jamais obligatoire pour accompagner un e-mail ou un numéro de téléphone ; un e-mail ou un numéro seul suffit à identifier un nouveau destinataire. Si vous en fournissez un malgré tout, il est associé au prochain e-mail/numéro rencontré dans le chemin :

- `test@example.com` → e-mail seul, sans id
- `userid/test@example.com` → id + email
- `userid/+15551234567` → id + SMS
- `+15551234567/test@example.com` → deux destinataires distincts (SMS, puis email)

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                                                                                |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`     | Non    | Identifiant du type de notification depuis votre tableau de bord Pingram. La valeur par défaut est `apprise`.                                                                                                                              |
| `mode`     | Non    | Mode de notification, `message` ou `template`. La valeur par défaut est `message`.                                                                                                                                                         |
| `apikey`   | Oui\*  | Votre clé API Pingram (`pingram_sk_...` ou `pingram_pk_...`). Obligatoire sauf si elle est déjà fournie dans le chemin.                                                                                                                    |
| `to`       | Non    | Liste de cibles supplémentaires, séparées par des virgules.                                                                                                                                                                                |
| `region`   | Non    | `us` par défaut, `ca` ou `eu` pour sélectionner l'hôte API.                                                                                                                                                                                |
| `channels` | Non    | Les canaux sont détectés à partir de la première cible identifiée. Les canaux suivants peuvent être fournis : `email`, `sms`, `inapp`, `web_push`, `mobile_push`, `slack` et/ou `call`.                                                    |
| `from`     | Non    | Nom d'affichage de l'identité _From_ de l'e-mail.                                                                                                                                                                                          |
| `cc`       | Non    | Liste d'adresses en copie, séparées par des virgules.                                                                                                                                                                                      |
| `bcc`      | Non    | Liste d'adresses en copie cachée, séparées par des virgules.                                                                                                                                                                               |
| `:{key}`   | Non    | Jetons de paramètres dynamiques de modèle transmis à `parameters`, par exemple `:orderId=123`. Il est important de préfixer chacun avec un deux-points `:` pour qu'il soit correctement interprété. Utilisé uniquement si `mode=template`. |

\* Obligatoire si la valeur n'est pas déjà définie dans le composant de chemin de l'URL.

### Paramètres par Défaut de Pingram

Chaque requête Pingram envoyée via Apprise inclut les paramètres par défaut suivants :

| Paramètre        | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `appBody`        | Charge utile principale du corps du message de la notification.                                 |
| `appTitle`       | Titre du message ou ligne d'objet.                                                              |
| `appType`        | Type de notification Apprise, par exemple `info`, `success`, `warning` ou `failure`.            |
| `appId`          | Identifiant de l'application Apprise, généralement `apprise`.                                   |
| `appDescription` | Texte de description configuré pour le service Apprise.                                         |
| `appColor`       | Code couleur associé au type de notification, utilisé par certains canaux à des fins visuelles. |
| `appImageUrl`    | URL pointant vers une image d'icône représentative du type de notification.                     |
| `appUrl`         | URL de référence vers l'application source, si elle est configurée.                             |

Ces paramètres sont toujours inclus par Apprise en plus des jetons personnalisés `:{key}={value}` que vous fournissez dans votre URL.

Ces valeurs par défaut sont communes à tous les plugins Apprise, en plus des paramètres spécifiques au service décrits ci-dessus.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer à un destinataire e-mail par type et laisser Pingram choisir le canal :

```bash
apprise -vv -t "Mise a Jour de Commande" -b "Votre commande a ete expediee." \
   pingram://order_tracking@API_KEY/user@example.com
```

Envoyer la même notification à plusieurs destinataires à l'aide de segments de chemin :

```bash
apprise -vv -t "Statut" -b "Traitement termine." \
   pingram://order_tracking@API_KEY/user@example.com/+15552341234/alice_123
```

Forcer le canal SMS et définir la région sur le Canada :

```bash
apprise -vv -t "Code" -b "Votre code de verification est 123456" \
   'pingram://order_tracking@API_KEY/+16475550123?channels=sms&region=ca'
```

Définir _From_, CC et BCC pour un e-mail :

```bash
apprise -vv -t "Publication" -b "La version v2.0.1 est en ligne." \
   'pingram://release_note@API_KEY/dev@example.ca?from=Dev%20Team&cc=qa@example.ca&bcc=ops@example.ca'
```

Transmettre des jetons dynamiques référencés par votre modèle Pingram :

```bash
apprise -vv -t "Commande" -b " " \
   'pingram://order_tracking@API_KEY/user@example.com?:orderId=12345&:status=shipped&mode=template'
```

Utiliser une forme basée uniquement sur la chaîne de requête, pratique en YAML :

```bash
apprise -vv -t "Hello" -b "Bonjour a vous" \
   'pingram://?apikey=API_KEY&type=greeting&to=user@example.com'
```

Version minimale, un e-mail seul sans id :

```bash
apprise -vv -t "Bienvenue" -b "Bonjour d'Apprise" \
   "pingram://welcome_email@API_KEY/test@example.com"
```

Région EU avec substitutions de jetons :

```bash
apprise -vv -b "<b>Your order shipped!</b>" --format=html \
   "pingram://order_update@API_KEY/test@example.com?region=eu&:firstName=Chris&:trackingUrl=https://t.example/ABC123&mode=template"
```

Définition de From / CC / BCC / Reply-To pour l'e-mail :

```bash
apprise -vv -b "Corps du Message" \
   "pingram://newsletter@API_KEY/test@example.com?from=Team<team@example.com>&cc=dev@example.com&bcc=ops@example.com&reply=help@example.com"
```
