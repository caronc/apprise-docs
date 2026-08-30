---
title: "Notifications Lauther"
description: "Envoyer des notifications push Lauther."
sidebar:
  label: "Lauther"

source: https://lauther.app/

schemas:
  - lauther

sample_urls:
  - lauther://{token}
  - lauther://{token}?priority=high&sound=default

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Lauther est une application de notifications push et d'identite anonyme pour votre telephone.

1. Installez l'[application Lauther](https://lauther.app/) sur votre appareil.
2. Dans l'application, allez dans **Apps** et appuyez sur **+** pour creer un **New Token**.
3. Copiez le token genere, il ressemblera a ceci :

   ```text
   lpt_AbCdEf1234567890
   ```

Ce token est tout ce dont Apprise a besoin pour delivrer des messages a votre appareil.

## Syntaxe

La syntaxe valide est la suivante :

- `lauther://{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                       |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui         | Le token genere pour vous dans l'application Lauther. Il commence toujours par `lpt_`.                                                            |
| priority | Non         | La priorite d'envoi de la notification. Valeurs possibles : **lowest**, **low**, **normal**, **high** et **emergency**. Par defaut : **normal**.  |
| sound    | Non         | Le nom du son de notification a jouer sur l'appareil destinataire.                                                                                |
| click    | Non         | Une URL a ouvrir lorsque la notification est touchee.                                                                                             |
| icon     | Non         | Une URL vers une image utilisee pour remplacer l'icone de la notification.                                                                        |
| color    | Non         | Une couleur utilisee pour personnaliser l'apparence de la notification (par exemple `#D9EF00`).                                                   |
| group    | Non         | Une cle de regroupement utilisee pour regrouper les notifications liees sur l'appareil.                                                           |
| route    | Non         | Une page de votre site jumele a ouvrir (en etant connecte) lorsque la notification est touchee. Doit avoir la meme origine que votre site jumele. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Lauther simple :

```bash
# Supposons que notre token soit lpt_AbCdEf1234567890
apprise -vv -t "Titre du message de test" -b "Corps du message de test" \
   lauther://lpt_AbCdEf1234567890
```

Envoyer une notification de priorite haute avec un son personnalise et un lien de suivi :

```bash
apprise -vv -t "Titre du message de test" -b "Corps du message de test" \
   "lauther://lpt_AbCdEf1234567890?priority=high&sound=default&click=https://example.com"
```
