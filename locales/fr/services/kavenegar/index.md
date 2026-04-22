---
title: "Notifications Kavenegar"
description: "Envoyer des notifications Kavenegar."
sidebar:
  label: "Kavenegar"

source: https://kavenegar.com

schemas:
  - kavenegar

has_sms: true

sample_urls:
  - kavenegar://{apikey}/{to_phone_no}
  - kavenegar://{from_phone_no}@{apikey}/{to_phone_no}
  - kavenegar://{apikey}/{to_phone_no}/{to_phone_no2}/{to_phone_noN}/

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Pour utiliser Kavenegar, commencez par creer un compte sur [leur site web](https://kavenegar.com/). Une fois cela fait, vous pourrez recuperer votre cle API depuis la section [profil du compte](https://panel.kavenegar.com/client/setting/account).

## Syntaxe

La syntaxe valide est la suivante :

- `kavenegar://{apikey}/{to_phone_no}`
- `kavenegar://{from_phone_no}@{apikey}/{to_phone_no}`
- `kavenegar://{apikey}/{to_phone_no}/{to_phone_no2}/{to_phone_noN}/`
- `kavenegar://{from_phone_no}@{apikey}/{to_phone_no}/{to_phone_no2}/{to_phone_noN}/`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                        |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApiKey      | Oui         | _API Key_ associee a votre compte Kavenegar. Elle est disponible dans la section [profil du compte](https://panel.kavenegar.com/client/setting/account) de leur site, apres connexion.             |
| ToPhoneNo   | Oui         | Kavenegar ne prend pas en charge le signe `+` devant les indicatifs de pays. Vous devez donc remplacer ce prefixe par le bon nombre de zeros en tete du numero sortant pour que l'appel aboutisse. |
| FromPhoneNo | Non         | Numero a utiliser comme identifiant de l'appelant. Cet argument est facultatif.                                                                                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Kavenegar sous forme de SMS :

```bash
# Supposons que notre {ApiKey} soit gank339l7jk3cjaE
# Supposons que notre {PhoneNo}
#   - se trouve aux Etats-Unis, donc avec l'indicatif pays 001
#   - corresponde a 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   kavenegar://gank339l7jk3cjaE/0018005551223

# la variante suivante aurait aussi fonctionne
# les espaces, parentheses et tirets sont acceptes dans ce champ :
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   kavenegar://gank339l7jk3cjaE/001 - (800) 555-1223
```
