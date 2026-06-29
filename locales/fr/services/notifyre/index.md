---
title: "Notifications Notifyre"
description: "Envoyez des SMS et des fax via l'API Notifyre."
sidebar:
  label: "Notifyre"

source: https://notifyre.com

schemas:
  - notifyre

has_sms: true
has_attachments: true

limits:
  - name: "SMS"
    max_chars: 160
  - name: "Fax"
    max_chars: 32768
---

<!-- SERVICE:DETAILS -->

<!-- SPONSORS:BANNER -->

## Configuration du compte

1. Inscrivez-vous sur [notifyre.com](https://notifyre.com/) et connectez-vous.
2. Allez dans **Parametres > Developpeur**.
3. Cliquez sur **Nouveau** pour creer un jeton API et copiez-le -- il n'est affiche qu'une seule fois.

Notifyre prend en charge la livraison par SMS et par fax avec la meme cle API. Le mode fax s'active en ajoutant `?mode=fax` a l'URL Apprise. Les pieces jointes (PDF, DOCX, PNG, JPEG, TIFF, etc.) sont prises en charge en mode fax et sont encodees en base64 sous forme de pages de document fax. Le corps de la notification est toujours inclus comme page de garde en texte brut, avant toute piece jointe.

## Syntaxe

Voici les syntaxes valides :

- `notifyre://{apikey}/{phoneno}`
- `notifyre://{apikey}/{phoneno1}/{phoneno2}`
- `notifyre://{apikey}/{phoneno}?from={from}`
- `notifyre://{apikey}/{phoneno}?campaign={campaign}`
- `notifyre://{apikey}/{faxno}?mode=fax`
- `notifyre://{apikey}/{faxno}?mode=fax&from={from}`
- `notifyre://{apikey}/{faxno}?mode=fax&template={template}`
- `notifyre://{apikey}/{faxno}?mode=fax&hq=no`
- `notifyre://{apikey}/{faxno}?mode=fax&ref={ref}`
- `notifyre://{apikey}/{faxno}?mode=fax&header={header}`
- `notifyre://{apikey}/{faxno1}/{faxno2}?mode=fax`

## Detail des parametres

| Variable | Requis | Description                                                                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | \*Oui  | Votre jeton API Notifyre (Parametres > Developpeur).                                                                                 |
| phoneno  | \*Oui  | Le numero de telephone ou de fax cible. Les numeros doivent inclure l'indicatif pays (ex. `+15551234567`).                           |
| from     | Non    | Le numero de l'expediteur. Si omis, Notifyre utilise un numero partage de votre compte.                                              |
| mode     | Non    | Mode de livraison : `sms` (defaut) ou `fax`.                                                                                         |
| campaign | Non    | Nom de campagne associe au message. Par defaut, l'identifiant de l'application Apprise (`Apprise`). Applicable aux modes SMS et fax. |
| template | Non    | Nom du modele de fax. Applicable uniquement en mode fax.                                                                             |
| ref      | Non    | Reference client pour le suivi. Applicable uniquement en mode fax.                                                                   |
| hq       | Non    | Indicateur de qualite elevee pour le fax. Definir a `no` pour desactiver. Par defaut `yes`. Applicable uniquement en mode fax.       |
| header   | Non    | Texte d'en-tete de la page de couverture. Applicable uniquement en mode fax.                                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS a un seul numero :

```bash
apprise -vv -t "Alerte" -b "Le serveur est hors ligne" \
    "notifyre://VOTRECLEAPI/+15551234567"
```

Envoyer un SMS a plusieurs numeros :

```bash
apprise -vv -t "Alerte" -b "Le serveur est hors ligne" \
    "notifyre://VOTRECLEAPI/+15551234567/+15559876543"
```

Envoyer un fax avec le corps de la notification comme page de garde :

```bash
apprise -vv -t "Avis" -b "Veuillez consulter le document ci-joint." \
    "notifyre://VOTRECLEAPI/+15551234567?mode=fax"
```

Envoyer un fax avec une piece jointe PDF :

```bash
apprise -vv -t "Facture" -b "Veuillez trouver la facture ci-jointe." \
    --attach /chemin/vers/facture.pdf \
    "notifyre://VOTRECLEAPI/+15551234567?mode=fax"
```

Envoyer un fax en specifiant le numero de l'expediteur :

```bash
apprise -vv -t "Avis" -b "Document ci-joint." \
    "notifyre://VOTRECLEAPI/+15551234567?mode=fax&from=+15550000001"
```
