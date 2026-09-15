---
title: "Notifications Telnyx"
description: "Envoyer des notifications SMS via Telnyx."
sidebar:
  label: "Telnyx"

source: https://telnyx.com

schemas:
  - telnyx

has_sms: true

sample_urls:
  - telnyx://{apikey}@{fromPhoneNo}
  - telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo}
  - telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Creez un compte sur [telnyx.com](https://telnyx.com/).
2. Achetez un numero de telephone depuis la section **Numbers** du [Mission Control Portal](https://portal.telnyx.com/).
3. Creez un **Messaging Profile** et associez-y votre numero de telephone. Un numero ne peut pas envoyer de messages tant qu'il n'appartient pas a un profil.
4. Generez une **cle API V2** depuis la [page API Keys](https://portal.telnyx.com/#/app/api-keys) et conservez-la en lieu sur. Elle ne vous est affichee qu'une seule fois.

Votre cle API et le numero de telephone que vous avez achete suffisent pour commencer a envoyer des messages.

## Syntaxe

Les syntaxes valides sont les suivantes :

- `telnyx://{apikey}@{fromPhoneNo}`
- `telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo}`
- `telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

Si vous ne precisez aucun numero de destination, Apprise renvoie le message vers le numero expediteur. C'est pratique pour faire un test.

## Detail des parametres

| Variable    | Obligatoire | Description                                                                                                                                                             |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey      | \*Oui       | La cle API V2 generee depuis votre Mission Control Portal Telnyx.                                                                                                       |
| fromPhoneNo | \*Oui       | Le numero de telephone Telnyx utilise comme expediteur. Il doit etre associe a un Messaging Profile.                                                                    |
| toPhoneNo   | Non         | Un ou plusieurs numeros de destination. Separez-les par un `/` dans le chemin de l'URL. Si vous l'omettez, le message est envoye vers `fromPhoneNo`.                    |
| to          | Non         | Alias des numeros de destination. Accepte une liste separee par des virgules et peut se combiner avec les numeros deja presents dans le chemin de l'URL.                |
| from        | Non         | Alias de `fromPhoneNo`. Utile dans les fichiers de configuration YAML ou vous preferez garder le numero sur sa propre ligne.                                            |
| key         | Non         | Alias de `apikey`. Utile dans les fichiers de configuration YAML.                                                                                                       |
| profile     | Non         | L'identifiant du Messaging Profile a utiliser. Utile uniquement lorsque votre numero appartient a plusieurs profils et que vous souhaitez en choisir un en particulier. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message vers vous-meme (le numero expediteur est aussi la destination) :

```bash
# Supposons que notre cle API soit KEY0123456789abcdef
# Supposons que notre numero Telnyx soit +1-405-123-1234
apprise -vv -t "Titre du message de test" -b "Corps du message de test" \
   "telnyx://KEY0123456789abcdef@+14051231234"
```

Envoyer un message a quelqu'un d'autre :

```bash
apprise -vv -t "Alerte" -b "La tache de sauvegarde a echoue" \
   "telnyx://KEY0123456789abcdef@+14051231234/+15551231234"
```

Envoyer a plusieurs destinataires en une seule fois :

```bash
apprise -vv -b "Le serveur est hors service" \
   "telnyx://KEY0123456789abcdef@+14051231234/+15551231234/+15559876543"
```

Envoyer via un Messaging Profile precis :

```bash
apprise -vv -b "Le rapport nocturne est pret" \
   "telnyx://KEY0123456789abcdef@+14051231234/+15551231234?profile=40017b3c-1234-5678-9abc-def012345678"
```

Utiliser les parametres de requete plutot que d'inscrire les numeros dans l'URL. Cette forme se lit bien dans un fichier de configuration YAML :

```bash
apprise -vv -b "Bonjour tout le monde" \
   "telnyx://?key=KEY0123456789abcdef&from=+14051231234&to=+15551231234,+15559876543"
```
