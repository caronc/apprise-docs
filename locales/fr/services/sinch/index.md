---
title: "Notifications Sinch"
description: "Envoyer des notifications Sinch."
sidebar:
  label: "Sinch"

source: https://sinch.com

schemas:
  - sinch

has_sms: true

sample_urls:
  - sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo}
  - sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Sinch, vous devez obtenir votre _Service Plan ID_ et votre _API Token_. Ces deux éléments sont accessibles via le [tableau de bord Sinch](https://dashboard.sinch.com/sms/overview) ou depuis [la section API](https://dashboard.sinch.com/sms/api/rest).

Vous devez avoir un numéro défini comme numéro actif ([depuis votre tableau de bord ici](https://dashboard.sinch.com/numbers/your-numbers/number)). Ce numéro deviendra votre **{FromPhoneNo}** lors de l'identification des détails ci-dessous.

## Syntaxe

La syntaxe valide est la suivante :

- `sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo}`
- `sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

Si aucun _ToPhoneNo_ n'est spécifié, le _FromPhoneNo_ sera utilisé comme destinataire ; la syntaxe suivante est donc valide :

- `sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/`

Les codes courts (Short Codes) sont également pris en charge, mais nécessitent au moins un numéro de téléphone cible (Target PhoneNo) :

- `sinch://{ServicePlanID}:{ApiToken}@{ShortCode}/{PhoneNo}`
- `sinch://{ServicePlanID}:{ApiToken}@{ShortCode}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Détail des Paramètres

| Variable      | Requis    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ServicePlanID | Oui       | L'_Account SID_ associé à votre compte Sinch. Il est disponible depuis le tableau de bord Sinch.                                                                                                                                                                                                                                                                                                                                                                                                             |
| ApiToken      | Oui       | L'_Auth Token_ associé à votre compte Sinch. Il est disponible depuis le tableau de bord Sinch.                                                                                                                                                                                                                                                                                                                                                                                                              |
| FromPhoneNo   | **\*Non** | Le [numéro de téléphone actif](https://dashboard.sinch.com/numbers/your-numbers/number) associé à votre compte Sinch depuis lequel vous souhaitez envoyer le SMS. Ce doit être un numéro enregistré auprès de Sinch. En alternative au **FromPhoneNo**, vous pouvez également fournir un **ShortCode**. Le numéro de téléphone DOIT inclure le préfixe d'indicatif du pays. Ce champ est très flexible et prend en charge les parenthèses, les espaces et les tirets pour faciliter la lisibilité du numéro. |
| ShortCode     | **\*Non** | Le code court (ShortCode) associé à votre compte Sinch depuis lequel vous souhaitez envoyer le SMS. Ce doit être un numéro enregistré auprès de Sinch. En alternative au **ShortCode**, vous pouvez fournir un **FromPhoneNo**.                                                                                                                                                                                                                                                                              |
| PhoneNo       | **\*Non** | Un numéro de téléphone DOIT inclure le préfixe d'indicatif du pays. Ce champ est très flexible et prend en charge les parenthèses, les espaces et les tirets pour faciliter la lisibilité du numéro.<br/>**Remarque :** Si vous utilisez un _ShortCode_, au moins un _PhoneNo_ DOIT être défini.                                                                                                                                                                                                             |
| Region        | **Non**   | Peut être soit `us` soit `eu`. Par défaut, la région est définie sur `us`.                                                                                                                                                                                                                                                                                                                                                                                                                                   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Sinch par SMS :

```bash
# Assuming our {ServicePlanID} is AC735c307c62944b5a
# Assuming our {ApiToken} is e29dfbcebf390dee9
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sinch://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sinch://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/1-(800) 555-1223
```
