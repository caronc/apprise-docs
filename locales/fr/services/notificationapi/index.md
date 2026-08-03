---
title: "Notifications NotificationAPI"
description: "Envoyer des notifications NotificationAPI."
sidebar:
  label: "NotificationAPI"

source: https://www.notificationapi.com

schemas:
  - napi
  - notificationapi

has_sms: true
has_image: true

ended: 2026

sample_urls:
  - napi://{ClientID}/{ClientSecret}/{Target}
  - napi://{Type}@{ClientID}/{ClientSecret}/{Target}

limits:
  max_chars: 160
---

:::note

## Motif de fin du service

NotificationAPI est devenu [Pingram](https://www.pingram.io) en 2026. Il ne s'agit pas d'un arrêt de service : le service sous-jacent fonctionne toujours normalement, seul son nom a changé. L'intégration Apprise `napi://`/`notificationapi://` est retirée au profit d'un nouveau plugin dédié [`pingram://`](/services/pingram/), conçu pour l'API actuelle.

Si vous disposez encore d'un couple `clientId`/`clientSecret` émis avant le changement de nom, il peut continuer à fonctionner si vous appelez directement l'API Pingram, mais il n'est plus pris en charge par ce plugin Apprise. Les nouveaux comptes Pingram reçoivent désormais une seule clé API, utilisée par le plugin `pingram://` à la place de l'ancien couple d'identifiants.
:::

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

NotificationAPI vous permet de déclencher des notifications par e-mail, SMS, appel, push et intégrées à l'application à l'aide d'une seule API. Le plugin Apprise prend en charge les hôtes régionaux US, CA et EU. Configurez le contenu une seule fois dans NotificationAPI, puis déclenchez-le depuis Apprise en envoyant le **type** de notification et les informations du **destinataire**, avec des paramètres de fusion facultatifs.

1. Créez un compte NotificationAPI et connectez-vous.
2. Dans le tableau de bord, repérez votre **clientId** et votre **clientSecret** dans la section _Environments_.
3. Créez ou identifiez le **type de notification** que vous souhaitez déclencher, par exemple `order_tracking`.
4. Vérifiez que vos destinataires disposent des bons identifiants :
   - Les notifications **Email** exigent une adresse e-mail dans l'objet `to`.
   - Les notifications **SMS** exigent un numéro au format **E.164**, par exemple `+15005550006`.
   - Vous pouvez aussi cibler des utilisateurs via un **user id** NotificationAPI.
5. Si votre hébergement n'est pas aux États-Unis, notez l'hôte API de votre région (US par défaut, CA ou EU).

## Syntaxe

La syntaxe valide est la suivante (les alias `napi://` et `notificationapi://` sont acceptés) :

- `napi://{ClientID}/{ClientSecret}/{Target}`
- `napi://{Type}@{ClientID}/{ClientSecret}/{Target}`

Les **cibles** peuvent être combinées dans un seul chemin et sont regroupées autour d'un **id** en tête. Chaque segment `{Target}` peut être :

- un identifiant utilisateur (`userid` ou `@userid`)
- une adresse e-mail (`name@example.com`)
- un numéro de téléphone au format E.164 (`+15551234567`)

Exemples de cibles groupées :

- `userid/test@example.com` → id + email
- `userid/+15551234567` → id + SMS
- `userid/+15551234567/test@example.com` → id + SMS + email

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                                                                                |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`     | Non    | Identifiant du type de notification depuis votre tableau de bord NotificationAPI. La valeur par défaut est `apprise`.                                                                                                                      |
| `mode`     | Non    | Mode de notification, `message` ou `template`. La valeur par défaut est `message`.                                                                                                                                                         |
| `id`       | Oui\*  | Identifiant client. Obligatoire sauf s'il est déjà fourni dans le chemin.                                                                                                                                                                  |
| `secret`   | Oui\*  | Secret client. Obligatoire sauf s'il est déjà fourni dans le chemin.                                                                                                                                                                       |
| `to`       | Non    | Cible séparée par des virgules ; chaque sous-ensemble de cibles doit être associé à un `id`.                                                                                                                                               |
| `region`   | Non    | `us` par défaut, `ca` ou `eu` pour sélectionner l'hôte API.                                                                                                                                                                                |
| `channels` | Non    | Les canaux sont détectés à partir de la première cible identifiée. Les canaux suivants peuvent être fournis : `email`, `sms`, `inapp`, `web_push`, `mobile_push` et/ou `slack`.                                                            |
| `from`     | Non    | Nom d'affichage de l'identité _From_ de l'e-mail.                                                                                                                                                                                          |
| `cc`       | Non    | Liste d'adresses en copie, séparées par des virgules.                                                                                                                                                                                      |
| `bcc`      | Non    | Liste d'adresses en copie cachée, séparées par des virgules.                                                                                                                                                                               |
| `:{key}`   | Non    | Jetons de paramètres dynamiques de modèle transmis à `parameters`, par exemple `:orderId=123`. Il est important de préfixer chacun avec un deux-points `:` pour qu'il soit correctement interprété. Utilisé uniquement si `mode=template`. |

\* Obligatoire si la valeur n'est pas déjà définie dans le composant de chemin de l'URL.

### Paramètres par Défaut de NotificationAPI

Chaque requête NotificationAPI envoyée via Apprise inclut les paramètres par défaut suivants :

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

Envoyer à un destinataire e-mail par type et laisser NotificationAPI choisir le canal :

```bash
apprise -vv -t "Mise a Jour de Commande" -b "Votre commande a ete expediee."   napi://order_tracking@CLIENT_ID/CLIENT_SECRET/id/user@example.com
```

Envoyer la même notification à plusieurs destinataires à l'aide de segments de chemin :

```bash
apprise -vv -t "Statut" -b "Traitement termine."   napi://order_tracking@CLIENT_ID/CLIENT_SECRET/\
     id/user@example.com/+15552341234/alice_123
```

Forcer le canal SMS et définir la région sur le Canada :

```bash
apprise -vv -t "Code" -b "Votre code de verification est 123456"   'napi://order_tracking@CLIENT_ID/CLIENT_SECRET/id/+16475550123?channel=sms&region=ca'
```

Définir _From_, CC et BCC pour un e-mail :

```bash
apprise -vv -t "Publication" -b "La version v2.0.1 est en ligne."   'napi://release_note@CLIENT_ID/CLIENT_SECRET/id/dev@example.ca?from=Dev%20Team&cc=qa@example.ca&bcc=ops@example.ca'
```

Transmettre des jetons dynamiques référencés par votre modèle NotificationAPI :

```bash
apprise -vv -t "Commande" -b " "   'napi://order_tracking@CLIENT_ID/CLIENT_SECRET/user@example.com?:orderId=12345&:status=shipped'
```

Utiliser une forme basée uniquement sur la chaîne de requête, pratique en YAML :

```bash
apprise -vv -t "Hello" -b "Bonjour a vous"   'napi://?id=CLIENT_ID&secret=CLIENT_SECRET&type=greeting&to=id,user@example.com'
```

Version minimale, id + e-mail :

```bash
apprise -vv -t "Bienvenue" -b "Bonjour d'Apprise"   "napi://welcome_email@CID/SECRET/user123/test@example.com"
```

Région EU avec substitutions de jetons :

```bash
apprise -vv -b "<b>Your order shipped!</b>" --format=html   "napi://order_update@CID/SECRET/user123/test@example.com?region=eu&:firstName=Chris&:trackingUrl=https://t.example/ABC123"
```

Définition de From / CC / BCC / Reply-To pour l'e-mail :

```bash
apprise -vv -b "Corps du Message"   "napi://newsletter@CID/SECRET/user123/test@example.com?from=Team<team@example.com>&cc=dev@example.com&bcc=ops@example.com&reply=help@example.com"
```
