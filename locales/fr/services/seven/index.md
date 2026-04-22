---
title: "Notifications Seven"
description: "Envoyer des notifications Seven."
sidebar:
  label: "Seven"

source: https://www.seven.io/

schemas:
  - seven

has_sms: true

sample_urls:
  - seven://{token}/{target}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous [ici](https://www.seven.io/). Depuis votre compte, vous pourrez acceder a l'interface web et configurer votre jeton d'acces.

## Syntaxe

La syntaxe valide est la suivante :

- `seven://{token}/{target}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                |
| -------- | ----------- | -------------------------------------------------------------------------- |
| token    | Oui         | Jeton d'acces genere et associe a votre compte Seven.                      |
| target   | Oui         | Un ou plusieurs numeros de telephone auxquels envoyer votre notification.  |
| flash    | Non         | Mode flash. La valeur par defaut est `no` ; indiquez `yes` pour l'activer. |
| label    | Non         | Definit un libelle.                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Seven :

```bash
# Supposons que notre {AccessToken} soit abcd123
# Supposons que nous voulions notifier 555221237 et +18005551234
# Testez avec la commande suivante :
apprise -t "Titre de Test" -b "Message de Test" \
 seven://abcd123/555221237/+18005551234

```
