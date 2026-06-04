---
title: "Notifications Line"
description: "Envoyer des notifications Line."
sidebar:
  label: "Line"

source: https://line.me

schemas:
  - line

has_image: true

sample_urls:
  - line://{token}/{user}
  - line://{token}/{user1}/{user2}/{userN}

limits:
  max_chars: 5000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Commencez par telecharger Line depuis [Google Play](https://play.google.com/store/apps/details?id=jp.naver.line.android) ou [Apple](https://apps.apple.com/us/app/line/id443904275).
1. Une fois l'application installee, ouvrez-la sur votre appareil mobile, touchez l'icone ⚙️ puis **Accounts**. A partir de la, vous devrez associer une adresse e-mail a votre compte si ce n'est pas deja fait. Une procedure de validation sera necessaire.

### Generer un Jeton

Pour generer un jeton, vous devez avoir associe une adresse e-mail a votre compte afin de pouvoir vous connecter a la [console developpeur](https://developers.line.biz/console/).

1. Creez un **Provider** si ce n'est pas deja fait ; lorsqu'on vous le demande, choisissez de creer une **Messaging API**.
1. Creez ensuite un **Channel**.
   - Dans l'onglet **Basic settings**, vous pourrez recuperer le **User ID** de votre bot. Il est recommande d'utiliser cette valeur pour votre champ Apprise `{user}`.
   - Dans l'onglet **Messaging API**, vous pouvez generer un **Channel access token** longue duree. Il deviendra votre champ Apprise `{token}`.
1. Dans les parametres de votre Channel, sous l'onglet **Message API** :
   1. vous pouvez desactiver facultativement les **Greeting messages** ; certains les trouvent utiles, d'autres non ;
   2. sur votre appareil mobile, ajoutez ensuite un ami puis scannez le QR code disponible dans cet onglet **Message API**, vers le haut de la page.

## Syntaxe

La syntaxe valide est la suivante :

- `line://{token}/{user}`
- `line://{token}/{user1}/{user2}/{userN}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Oui         | Il s'agit du jeton d'acces longue duree genere depuis la console [Line](https://line.me), dans la section **Message API** de votre canal. C'est un jeton tres long, souvent termine par un signe egal `=` et contenant de nombreux slashs `/`. Apprise sait distinguer l'API des utilisateurs que vous ajoutez ; vous pouvez donc coller le jeton complet tel quel dans l'URL.                                                       |
| user     | Oui         | Utilisateurs Line, separes par des slashs `/`, que vous souhaitez notifier. Il ne s'agit **pas** du `@userid` visible sur votre appareil mobile, mais bien du `Line User ID`, qui commence generalement par la lettre `U`. Par exemple, vous pouvez recuperer le **Line Bot User ID** depuis la [console developpeur](https://developers.line.biz/console/) dans les parametres du canal, onglet **Basic settings**, en bas de page. |
| image    | Non         | Associe l'etat de la notification a une icone representative. Vous pouvez definir cette valeur sur `no` si vous ne souhaitez pas ce comportement.                                                                                                                                                                                                                                                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Line :

```bash
# Supposons que notre {token} soit 4174216298
# Supposons que notre {user} soit U1234567
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   line://4174216298/U1234567
```
