---
title: "Notifications Twilio"
description: "Envoyer des notifications Twilio."
sidebar:
  label: "Twilio"

source: https://twilio.com

schemas:
  - twilio

has_sms: true

sample_urls:
  - twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}
  - twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}
  - twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo}

limits:
  max_chars: 140
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Twilio, vous devez recuperer votre _Account SID_ et votre _Auth Token_. Tous deux sont disponibles via le [Tableau de Bord Twilio](https://www.twilio.com/console).

Vous devez aussi disposer d'un numero defini comme Active Number, [accessible depuis votre tableau de bord ici](https://www.twilio.com/console/phone-numbers/incoming). Il deviendra votre **{FromPhoneNo}** dans les exemples ci-dessous.

## Syntaxe

La syntaxe valide est la suivante :

- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}`
- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

Si aucun _ToPhoneNo_ n'est precise, alors le _FromPhoneNo_ recevra le message a la place ; l'URL suivante est donc valide :

- twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/`

Les [Short Codes](https://www.twilio.com/docs/glossary/what-is-a-short-code) sont aussi pris en charge, mais exigent au moins un PhoneNo cible.

- `twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo}`
- `twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSID  | Oui         | _Account SID_ associe a votre compte Twilio. Il est disponible via le Tableau de Bord Twilio.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| AuthToken   | Oui         | _Auth Token_ associe a votre compte Twilio. Il est disponible via le Tableau de Bord Twilio.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| FromPhoneNo | **\*Non**   | [Active Phone Number](https://www.twilio.com/console/phone-numbers/incoming) associe a votre compte Twilio et depuis lequel vous souhaitez envoyer le SMS. Il doit s'agir d'un numero enregistre chez Twilio. En alternative a **FromPhoneNo**, vous pouvez fournir un [ShortCode](https://www.twilio.com/docs/glossary/what-is-a-short-code). Le numero doit inclure l'indicatif du pays. Ce champ est assez tolerant et accepte aussi les parentheses, les espaces et les tirets pour une meilleure lisibilite. |
| ShortCode   | **\*Non**   | ShortCode associe a votre compte Twilio et depuis lequel vous souhaitez envoyer le SMS. Il doit s'agir d'un numero enregistre chez Twilio. En alternative a **ShortCode**, vous pouvez fournir un **FromPhoneNo**.                                                                                                                                                                                                                                                                                                |
| PhoneNo     | **\*Non**   | Le numero de telephone doit inclure l'indicatif du pays. Ce champ est assez tolerant et accepte aussi les parentheses, les espaces et les tirets pour une meilleure lisibilite.<br/>**Remarque :** si vous utilisez un _ShortCode_, alors au moins un _PhoneNo_ doit etre defini.                                                                                                                                                                                                                                 |

::note
Ce service de notification n'utilise pas le champ `title` ; seul le _body_ est transmis.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Twilio sous forme de SMS :

```bash
# Supposons que notre {AccountSID} soit AC735c307c62944b5a
# Supposons que notre {AuthToken} soit e29dfbcebf390dee9
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo}
#  - se trouve aux Etats-Unis, donc avec l'indicatif +1
#  - corresponde a 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/18005551223

# l'exemple suivant aurait egalement fonctionne, les espaces,
# parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/1-(800) 555-1223

```

### Prise en Charge de WhatsApp

Si votre compte est configure pour prendre en charge [WhatsApp for Business](https://www.twilio.com/en-us/messaging/channels/whatsapp), vous pouvez aussi utiliser ce plugin pour notifier ces points de terminaison. Il suffit de placer `w:` devant les numeros sortants qui doivent etre remis via WhatsApp au lieu de la configuration Twilio par defaut, par exemple :

```bash
# Supposons que notre {AccountSID} soit AC735c307c62944b5a
# Supposons que notre {AuthToken} soit e29dfbcebf390dee9
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo} WhatsApp soit +1 555 123 3456
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/w:15551233456

# l'exemple suivant aurait egalement fonctionne, les espaces,
# parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/w:+1 555 123 3456

```

Vous pouvez aussi placer `w:` devant votre propre numero afin de modifier le comportement par defaut et faire en sorte que tous les numeros suivants soient interpretes comme des destinations WhatsApp. Par exemple : `twillio://credentials/w:18005559876/15551234444/15551235555`

Dans l'exemple ci-dessus, les numeros cibles `15551234444` et `15551235555` seraient envoyes via WhatsApp, car le comportement par defaut de traitement des numeros a ete modifie en prefixant la source par `w:`.

**Remarque :** les sources basees sur des Short Codes ne fonctionneront pas avec WhatsApp.
