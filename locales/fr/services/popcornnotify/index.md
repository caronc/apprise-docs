---
title: "Notifications PopcornNotify"
description: "Envoyer des notifications PopcornNotify."
sidebar:
  label: "PopcornNotify"

source: https://popcornnotify.com

schemas:
  - popcorn

ended: 2026

sample_urls:
  - popcorn://{ApiKey}/{PhoneNo}/
  - popcorn://{ApiKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}/
  - popcorn://{ApiKey}/{Email}/
  - popcorn://{ApiKey}/{Email1}/{Email2}/{EmailN}/
---

:::note

## Motif de fin du service

Popcorn Notify a été lancé en 2018 comme une API unique permettant d'envoyer des courriels et des SMS. Aucune annonce publique ni explication concernant sa fermeture ne semble avoir été publiée, mais son site web et son API de notification renvoient désormais une réponse HTTP 503 et le service n'est plus utilisable.

La date exacte et le motif de la fermeture sont inconnus. La date ci-dessus indique 2026 comme l'année où l'indisponibilité a été confirmée ; l'ancienne [fiche Product Hunt](https://www.producthunt.com/products/popcorn-notify) et le [paquet client Python](https://pypi.org/project/popcornnotify/) ne subsistent qu'à titre de références historiques.
:::

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Recuperez une cle API sur [leur site web](https://popcornnotify.com/) et vous serez deja pret a utiliser le service.

## Syntaxe

La syntaxe valide est la suivante :

- `popcorn://{ApiKey}/{PhoneNo}/`
- `popcorn://{ApiKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}/`
- `popcorn://{ApiKey}/{Email}/`
- `popcorn://{ApiKey}/{Email1}/{Email2}/{EmailN}/`

Vous pouvez aussi melanger les informations :

- `popcorn://{ApiKey}/{PhoneNo1}/{Email1}/{EmailN}/{PhoneNoN}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                                                                                               |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApiKey   | Oui         | Jeton API personnel associe a votre compte.                                                                                                                                                                                                                                                                                               |
| PhoneNo  | Non         | Numero de telephone a notifier, via SMS.                                                                                                                                                                                                                                                                                                  |
| Email    | Non         | Adresse e-mail a notifier.                                                                                                                                                                                                                                                                                                                |
| to       | Non         | Alias de la variable Phone/Email.                                                                                                                                                                                                                                                                                                         |
| batch    | Non         | PopcornNotify propose un mode lot. Si vous indiquez plus d'un numero de telephone et/ou e-mail, vous pouvez envoyer toutes ces cibles en une seule fois dans l'URL, au lieu de l'approche normale d'Apprise qui les envoie une par une. L'activation du mode lot a ses avantages et ses inconvenients. Par defaut, ce mode est desactive. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification PopcornNotify sous forme de SMS :

```bash
# Supposons que notre {ApiKey} soit abc123456
# Supposons que notre {PhoneNo}
#   - soit aux Etats-Unis, donc avec l'indicatif pays +1
#   - corresponde au numero 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   popcorn:///abc123456/18005551223

# la variante suivante aurait aussi fonctionne
# les espaces, parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   popcorn:///abc123456/1-(800) 555-1223
```

Vous pouvez aussi envoyer des e-mails tout aussi simplement :

```bash
# Supposons que notre {ApiKey} soit abc123456
# Supposons que notre {Email} soit user@example.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   popcorn:///abc123456/user@example.com
```
