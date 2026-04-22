---
title: "Notifications Vonage (anciennement Nexmo)"
description: "Envoyer des notifications Vonage, anciennement Nexmo."
sidebar:
  label: "Vonage (anciennement Nexmo)"

source: https://nexmo.com/

schemas:
  - nexmo
  - vonage

has_sms: true

sample_urls:
  - vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo}
  - vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Vonage, vous devez recuperer votre _API Key_ et votre _API Secret_. Tous deux sont disponibles via le [Tableau de Bord Vonage](https://dashboard.nexmo.com/getting-started-guide).

Le **{FromPhoneNo}** doit etre un numero fourni par Nexmo.

## Syntaxe

La syntaxe valide est la suivante (les alias `vonage://` et `nexmo://` sont acceptes ; `nexmo://` est le nom historique) :

- `vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo}`
- `vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

Si aucun _ToPhoneNo_ n'est precise, alors le _FromPhoneNo_ recevra le message a la place ; l'URL suivante est donc valide :

- `vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                              |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ApiKey      | Oui         | _API Key_ associee a votre compte Nexmo. Elle est disponible via le [Tableau de Bord Vonage](https://dashboard.nexmo.com/getting-started-guide).                                                                         |
| ApiSecret   | Oui         | _API Secret_ associe a votre compte Nexmo. Il est disponible via le [Tableau de Bord Vonage](https://dashboard.nexmo.com/getting-started-guide).                                                                         |
| FromPhoneNo | Oui         | Il doit s'agir d'un _From Phone Number_ qui vous a ete fourni par le site Vonage.                                                                                                                                        |
| PhoneNo     | **\*Non**   | Le numero de telephone doit inclure l'indicatif du pays. Ce champ est toutefois assez tolerant et accepte aussi les parentheses, les espaces et les tirets si vous souhaitez formater le numero de maniere plus lisible. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Vonage sous forme de SMS :

```bash
# Supposons que notre {APIKey} soit bc1451bd
# Supposons que notre {APISecret} soit gank339l7jk3cjaE
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo}
#  - se trouve aux Etats-Unis, donc avec l'indicatif +1
#  - corresponde a 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   vonage://bc1451bd:gank339l7jk3cjaE@19005559999/18005551223

# l'exemple suivant aurait egalement fonctionne, les espaces,
# parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   vonage://bc1451bd:gank339l7jk3cjaE@1-(900) 555-9999/1-(800) 555-1223
```
