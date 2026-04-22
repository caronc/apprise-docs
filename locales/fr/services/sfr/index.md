---
title: "Notifications Société Française du Radiotéléphone (SFR)"
description: "Envoyer des notifications Société Française du Radiotéléphone, SFR."
sidebar:
  label: "Société Française du Radiotéléphone (SFR)"

source: https://www.sfr.fr/

schemas:
  - sfr

has_sms: true

sample_urls:
  - sfr://{user}:{password}@{space_id}/{PhoneNo}
  - sfr://{user}:{password}@{space_id}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `sfr://{user}:{password}@{space_id}/{PhoneNo}`
- `sfr://{user}:{password}@{space_id}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Détail des Paramètres

| Variable | Obligatoire            | Description                                                                                                                                                                                                 |
| -------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Oui                    | Utilisateur associe a votre compte SFR.                                                                                                                                                                     |
| password | Oui                    | Mot de passe associe a votre compte SFR.                                                                                                                                                                    |
| space_id | Oui                    | Space ID associe a votre compte SFR.                                                                                                                                                                        |
| PhoneNo  | **\*Non**              | Numero de telephone a notifier.                                                                                                                                                                             |
| to       | Oui                    | Numero de telephone qui recevra la notification ; il s'agit d'un alias de `PhoneNo`.                                                                                                                        |
| lang     | Non, valeur par defaut | Valeur requise par SFR lors de l'envoi d'un SMS. La valeur par defaut est `fr_FR`.                                                                                                                          |
| from     | Non                    | Nom d'expediteur visible par les destinataires du SMS. Il **DOIT** avoir ete enregistre au prealable dans le compte SFR Business DMC.                                                                       |
| timeout  | Non                    | Duree apres laquelle le SMS sera abandonne par SFR. La valeur par defaut est `2880` minutes.                                                                                                                |
| voice    | Non                    | Voix utilisee lorsque le SMS est encode sous forme vocale. Ce parametre n'est pas exploite par Apprise, mais doit etre present pour des raisons de compatibilite API. Sa valeur par defaut est `claire08s`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification SFR :

```bash
# Supposons que notre {user} soit foo
# Supposons que notre {password} soit bar
# Supposons que notre {space_id} soit 1234
# Supposons que notre {PhoneNo}
#   - se trouve aux Etats-Unis, donc avec l'indicatif pays +1
#   - corresponde a 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sfr://foo:bar@1234/18005551223

# la variante suivante aurait aussi fonctionne
# les espaces, parentheses et tirets sont acceptes dans ce champ :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sfr://foo:bar@1234//1-(800) 555-1223
```
