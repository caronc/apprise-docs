---
title: "Notifications SimplePush"
description: "Envoyer des notifications SimplePush."
sidebar:
  label: "SimplePush"

source: https://simplepush.io/

schemas:
  - simplepush

sample_urls:
  - spush://{apikey}/
  - spush://{salt}:{password}@{apikey}/

limits:
  max_chars: 10000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

SimplePush est un systeme de messagerie plutot simple que vous pouvez utiliser sur votre appareil Android via leur application disponible [ici](https://play.google.com/store/apps/details?id=io.tymm.simplepush).

Vous pouvez facultativement ajouter un chiffrement supplementaire aux notifications dans les parametres. Le service vous fournit alors une valeur **{salt}** et vous permet de definir votre propre **{password}** de chiffrement.

### 🔒 Faiblesse du Chiffrement AES-CBC-128

L'equipe Apprise reconnait que le chiffrement utilise par ce plugin est l'AES-CBC-128, un mode dont certaines faiblesses sont connues, notamment sa vulnerabilite potentielle aux attaques de type _padding oracle_ ([reference](https://soatok.blog/2020/07/12/comparison-of-symmetric-encryption-methods/#aes-gcm-vs-aes-cbc)).

Si ce niveau de chiffrement ne vous convient pas, plusieurs options s'offrent a vous :

1. contacter SimplePush pour leur demander d'ameliorer leur securite, ce qu'Apprise prendra volontiers en charge ensuite ;
2. ne pas utiliser SimplePush et choisir plutot l'un des [nombreux autres services disponibles](https://github.com/caronc/apprise/wiki#notification-services).

Il est important de noter que ce chiffrement plus faible n'est utilise par Apprise que pour rester compatible avec SimplePush. Cela n'a aucun effet de bord et n'impacte aucun autre service de notification securise pris en charge par Apprise.

Vous trouverez ci-dessous une capture d'ecran de <https://simplepush.io/features> presentant le reglage de chiffrement tel qu'il est defini par le service d'origine :<br/>![Screenshot from 2024-10-03 21-52-46](./images/624566e31f044891.png)

## Syntaxe

La syntaxe valide est la suivante :

- `spush://{apikey}/`
- `spush://{salt}:{password}@{apikey}/`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                         |
| -------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui         | Cle requise pour faire fonctionner votre compte. Elle vous est fournie par votre compte SimplePush.                                                                                                                                                 |
| event    | Non         | Permet facultativement de preciser un evenement dans l'URL.                                                                                                                                                                                         |
| password | Non         | SimplePush permet de chiffrer davantage le message et le titre pendant leur transmission, en plus du canal securise deja utilise. Il s'agit ici du mot de passe de chiffrement. Vous devez fournir aussi la valeur `salt` pour que cela fonctionne. |
| salt     | Non         | La valeur `salt` vous est fournie par SimplePush et constitue la seconde partie du chiffrement additionnel disponible avec ce service. Vous devez fournir egalement un `password` pour que cela fonctionne.                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification SimplePush :

```bash
# Supposons que :
#  - notre {apikey} soit ABC123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   spush://ABC123
```
