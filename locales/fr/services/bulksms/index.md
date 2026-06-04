---
title: "Notifications BulkSMS"
description: "Envoyer des notifications BulkSMS."
sidebar:
  label: "BulkSMS"

source: https://bulksms.com

schemas:
  - bulksms

has_sms: true

sample_urls:
  - bulksms://{user}:{password}@{phoneNo}
  - bulksms://{user}:{password}@{phoneNo1}/{phoneNo2}/{phoneNoN}
  - bulksms://{user}:{password}@{group}
  - bulksms://{user}:{password}@{group1}/@{group2}/@{groupN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a un compte BulkSMS [ici](https://bulksms.com). Un identifiant utilisateur et un mot de passe associes a votre compte vous seront fournis. C'est tout ce dont vous avez besoin pour utiliser ce service avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `bulksms://{user}:{password}@{target}`

Une `target` peut etre soit un numero de telephone, soit un groupe si elle est prefixee par `@`.

- `bulksms://{user}:{password}@{phoneNo}`
- `bulksms://{user}:{password}@{phoneNo1}/{phoneNo2}/{phoneNoN}`
- `bulksms://{user}:{password}@{group}`
- `bulksms://{user}:{password}@{group1}/@{group2}/@{groupN}`

Vous pouvez aussi melanger les formats

- `bulksms://{user}:{password}@{to_phone1}/@{group1}`

Pour lever toute ambiguite, si vous ne fournissez pas un numero de telephone valide et que l'information analysee n'est pas uniquement prefixee par `@`, elle est d'abord interpretee comme un numero. En revanche, si des caracteres alphanumeriques y sont detectes, elle sera alors traitee comme un groupe.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                     |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Oui         | Nom d'utilisateur associe a votre compte BulkSMS.                                                                                                                                               |
| password | Oui         | Mot de passe associe a votre compte BulkSMS.                                                                                                                                                    |
| to       | **\*Non**   | Numero(s) de telephone et/ou groupe(s) auxquels vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour separer plusieurs entrees. Il s'agit d'un alias de `targets`. |
| from     | **\*Non**   | Numero de telephone enregistre chez BulkSMS que vous souhaitez utiliser comme expediteur du message.                                                                                            |
| batch    | Non         | Envoie plusieurs notifications specifiees dans un seul lot, soit 1 publication amont vers le serveur final. Par defaut, cette option est definie sur `no`.                                      |
| route    | Non         | Peut etre defini sur `ECONOMY`, `STANDARD` ou `PREMIUM`, sans sensibilite a la casse. Si aucune valeur n'est fournie, la valeur par defaut est `STANDARD`.                                      |
| unicode  | Non         | Permet facultativement d'indiquer a Apprise de ne pas marquer votre SMS comme contenant des caracteres Unicode. Le mode de message devient `TEXT` si cette valeur est definie sur `No`.         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message BulkSMS :

```bash
# Supposons que notre {user} soit joe
# Supposons que notre {password} soit hard-to-guess
# Supposons que le {PhoneNo} que nous voulons notifier soit +134-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   bulksms://joe:hard-to-guess@+134-555-1223
```
