---
title: "Notifications Voip.ms"
description: "Envoyer des notifications Voip.ms."
sidebar:
  label: "Voip.ms"

source: https://voip.ms/

schemas:
  - voipms

has_sms: true

sample_urls:
  - voipms://{password}:{email}/{fromPhoneNo}
  - voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo}
  - voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}/

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a Voip.ms [ici](https://voip.ms). Depuis votre tableau de bord, vous devrez activer l'acces API et creer un mot de passe a l'adresse suivante : [ici](https://voip.ms/m/api.php)

Vous devez modifier votre `DID` et activer `SMS/MMS ($0.0075/SMS, and $0.02/MMS)` :<br/>
![Screenshot from 2024-10-27 09-44-48](./images/75e25ff77c2f4149.png)

## Syntaxe

La syntaxe valide est la suivante :

- `voipms://{password}:{email}/{fromPhoneNo}`
- `voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo}`
- `voipms://{password}:{email}/{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}/`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                          |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| email       | Oui         | Adresse e-mail associee a votre compte Voip.ms.                                                                                                      |
| password    | Oui         | Mot de passe pour l'acces API. Il est different du mot de passe de votre compte Voip.ms.                                                             |
| fromPhoneNo | Oui         | Numero de telephone enregistre chez Voip.ms que vous souhaitez utiliser comme expediteur du message.                                                 |
| toPhoneNo   | Non         | Numero de telephone et/ou groupe auquel vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour separer plusieurs entrees. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Voip.ms a nous-meme :

```bash
# Supposons que :
#  - notre {email} soit test@example.com
#  - notre {password} soit abc123
#  - les {toPhoneNo} et {fromPhoneNo} soient 6135551234
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   voipms://abc123:test@example.com/6135551234
```

Envoyer une notification Voip.ms a un autre appareil :

```bash
# Supposons que :
#  - notre {email} soit test@example.com
#  - notre {password} soit abc123
#  - le {fromPhoneNo} soit 6135551234
#  - le {ToPhoneNo} soit 5645554321
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   voipms://abc123:test@example.com/6135551234/5645554321
```

## Dépannage

Il arrive que les messages d'erreur renvoyes par le serveur Voip.ms ne soient pas tres explicites. Les principaux points a verifier pour que ce service fonctionne sont les suivants :

- le compte dispose de credits disponibles ;
- le service SMS/MMS est bien active, voir la section de configuration ci-dessus.

Dans certains cas, il est aussi possible que l'operateur destinataire n'ait pas pu distribuer le message.
