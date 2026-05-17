---
title: "Notifications RingCentral"
description: "Envoyer des notifications SMS et MMS via RingCentral."
sidebar:
  label: "RingCentral"

source: https://ringcentral.com

schemas:
  - ringc

has_sms: true
has_attachments: true

sample_urls:
  - ringc://{NumeroSource}:{MotDePasse}@{ClientID}/{ClientSecret}
  - ringc://{NumeroSource}:{TokenJWT}@{ClientID}/{ClientSecret}/{NumeroDestinataire}
  - ringc://{NumeroSource}:{TokenJWT}@{ClientID}/{ClientSecret}/{Dest1}/{Dest2}/{DestN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

1. Inscrivez-vous sur [https://ringcentral.com](https://ringcentral.com).
2. Connectez-vous a la [Console Developpeur RingCentral](https://developers.ringcentral.com/).
3. Cliquez sur **Create App** et choisissez **REST API App** -> **Server/Bot (No UI)**.
4. Sous **Permissions**, activez **SMS** et **MMS** (MMS est requis pour la prise en charge des pieces jointes).
5. Dans l'onglet **Credentials**, copiez le **Client ID** et le **Client Secret**.

Deux modes d'authentification sont supportes :

### Mode BASIC (utilisateur + mot de passe)

Utilisez le mot de passe du compte utilisateur RingCentral associe a votre numero source. C'est l'option la plus simple lorsque vous ne souhaitez pas gerer des tokens JWT.

### Mode JWT

Generez un token JWT dans le portail developpeur et utilisez-le a la place du mot de passe. Les tokens JWT sont plus longs (> 60 caracteres) et Apprise detecte automatiquement ce mode si aucun parametre `?mode=` explicite n'est fourni.

## Pieces Jointes

Lorsqu'une piece jointe est incluse dans une notification, Apprise bascule automatiquement vers le point de terminaison MMS. Aucune configuration supplementaire n'est necessaire -- SMS est utilise pour les messages simples et MMS est utilise lorsque des fichiers sont joints.

## Syntaxe

La syntaxe valide est la suivante :

- `ringc://{NumeroSource}:{MotDePasse}@{ClientID}/{ClientSecret}`
- `ringc://{NumeroSource}:{MotDePasse}@{ClientID}/{ClientSecret}/{NumeroDestinataire}`
- `ringc://{NumeroSource}:{MotDePasse}@{ClientID}/{ClientSecret}/{Dest1}/{Dest2}/{DestN}`
- `ringc://{NumeroSource}:{TokenJWT}@{ClientID}/{ClientSecret}`
- `ringc://{NumeroSource}:{TokenJWT}@{ClientID}/{ClientSecret}/{NumeroDestinataire}`

Vous pouvez egalement fournir les identifiants sous forme de parametres de requete (utile dans les fichiers de configuration YAML) :

- `ringc://_?token={TokenOuMotDePasse}&secret={ClientSecret}&from={NumeroSource}`
- `ringc://_?token={TokenOuMotDePasse}&secret={ClientSecret}&from={NumeroSource}&to={NumeroDestinataire}`

Si aucun numero destinataire n'est fourni, la notification est envoyee au numero source lui-meme (utile pour les tests).

## Detail des Parametres

| Variable           | Obligatoire | Description                                                                                    |
| ------------------ | ----------- | ---------------------------------------------------------------------------------------------- |
| NumeroSource       | **\*Oui**   | Le numero de telephone RingCentral utilise comme expediteur. Doit etre associe a votre compte. |
| MotDePasse         | **\*Oui**   | Le mot de passe utilisateur RingCentral (mode BASIC) ou le token JWT (mode JWT).               |
| ClientID           | **\*Oui**   | L'identifiant client provenant de l'onglet credentials du portail developpeur.                 |
| ClientSecret       | **\*Oui**   | Le secret client provenant de l'onglet credentials du portail developpeur.                     |
| NumeroDestinataire | Non         | Un ou plusieurs numeros de telephone destinataires. Si omis, le numero source est utilise.     |
| to                 | Non         | Alias pour le(s) numero(s) destinataire(s) ; accepte des valeurs separees par des virgules.    |
| from               | Non         | Alias pour le numero source ; utile sous forme de parametre de requete.                        |
| source             | Non         | Alias de `from`.                                                                               |
| token              | Non         | Alias du mot de passe ou du token JWT sous forme de parametre de requete.                      |
| secret             | Non         | Alias du Client Secret sous forme de parametre de requete.                                     |
| mode               | Non         | Forcer le mode d'authentification : `basic` ou `jwt`. Detecte automatiquement si omis.         |
| env                | Non         | Environnement API : `prod` (par defaut) ou `sandbox` (devtest RingCentral).                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS en mode BASIC :

```bash
# NumeroSource : +15551230000
# MotDePasse : MonMotDePasse
# ClientID : AbCdEf123
# ClientSecret : secret123
# NumeroDestinataire : +15559998888
apprise -vv -t "Titre de Test" -b "Corps du Message" \
    "ringc://15551230000:MonMotDePasse@AbCdEf123/secret123/15559998888"
```

Envoyer un SMS JWT a plusieurs destinataires :

```bash
apprise -vv -t "Titre de Test" -b "Corps du Message" \
    "ringc://15551230000:eyJhbGciOiJSUzI1NiJ9...@AbCdEf123/secret123/15559998881/15559998882"
```

Envoyer un MMS avec une piece jointe (MMS est selectionne automatiquement) :

```bash
apprise -vv -t "Titre de Test" -b "Corps du Message" \
    --attach /chemin/vers/image.jpg \
    "ringc://15551230000:MonMotDePasse@AbCdEf123/secret123/15559998888"
```

Envoyer via des parametres de requete (format adapte au YAML) :

```bash
apprise -vv -t "Titre de Test" -b "Corps du Message" \
    "ringc://_?token=MonMotDePasse&secret=secret123&from=15551230000&to=15559998888"
```
