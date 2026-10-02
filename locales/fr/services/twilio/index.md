---
title: "Notifications Twilio"
description: "Envoyer des notifications Twilio par SMS, WhatsApp ou appel téléphonique."
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
  - twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}?method=call

limits:
  - name: "SMS"
    max_chars: 160
  - name: "Appel téléphonique (TwiML)"
    max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Twilio, vous devez récupérer votre _Account SID_ et votre _Auth Token_. Tous deux sont disponibles via le [Tableau de Bord Twilio](https://www.twilio.com/console).

Vous devez aussi disposer d'un numéro défini comme Active Number, [accessible depuis votre tableau de bord ici](https://www.twilio.com/console/phone-numbers/incoming). Il deviendra votre **`{FromPhoneNo}`** dans les exemples ci-dessous.

## Syntaxe

La syntaxe valide est la suivante :

### SMS (par défaut)

- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}`
- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

Si aucun _ToPhoneNo_ n'est précisé, alors le _FromPhoneNo_ recevra le message à la place ; l'URL suivante est donc valide :

- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/`

Les [Short Codes](https://www.twilio.com/docs/glossary/what-is-a-short-code) sont aussi pris en charge, mais exigent au moins un PhoneNo cible :

- `twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo}`
- `twilio://{AccountSID}:{AuthToken}@{ShortCode}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

### Appel téléphonique

Lorsque `method=call` est spécifié, Twilio lance un appel téléphonique sortant et lit le corps du message à l'aide de [TwiML](https://www.twilio.com/docs/voice/twiml). Ce qui est envoyé dépend du corps de votre message :

- Si le corps est un document TwiML (il commence par `<`, par ex. `<Response><Say>Bonjour</Say></Response>`), il est envoyé exactement tel que vous l'avez écrit. Le titre éventuel est ignoré afin que le document reste valide.
- Si le corps est du texte simple, il est lu à voix haute pour vous. Le titre (s'il est fourni) est lu en premier, suivi du corps.

- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo}?method=call`
- `twilio://{AccountSID}:{AuthToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}?method=call`

:::note
Les appels téléphoniques ne sont pas compatibles avec les Short Codes ni avec les numéros préfixés WhatsApp (`w:`).
:::

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSID  | Oui         | _Account SID_ associé à votre compte Twilio. Il est disponible via le Tableau de Bord Twilio.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| AuthToken   | Oui         | _Auth Token_ associé à votre compte Twilio. Il est disponible via le Tableau de Bord Twilio.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| FromPhoneNo | **\*Non**   | [Active Phone Number](https://www.twilio.com/console/phone-numbers/incoming) associé à votre compte Twilio et depuis lequel vous souhaitez envoyer le SMS ou effectuer l'appel. Il doit s'agir d'un numéro enregistré chez Twilio. En alternative à **FromPhoneNo**, vous pouvez fournir un [ShortCode](https://www.twilio.com/docs/glossary/what-is-a-short-code) (SMS uniquement). Le numéro doit inclure l'indicatif du pays. Ce champ est assez tolérant et accepte aussi les parenthèses, les espaces et les tirets pour une meilleure lisibilité. |
| ShortCode   | **\*Non**   | ShortCode associé à votre compte Twilio et depuis lequel vous souhaitez envoyer le SMS. Il doit s'agir d'un numéro enregistré chez Twilio. En alternative à **ShortCode**, vous pouvez fournir un **FromPhoneNo**. Les Short Codes ne sont pas pris en charge pour les appels téléphoniques.                                                                                                                                                                                                                                                            |
| PhoneNo     | **\*Non**   | Le numéro de téléphone doit inclure l'indicatif du pays. Ce champ est assez tolérant et accepte aussi les parenthèses, les espaces et les tirets pour une meilleure lisibilité.<br/>**Remarque :** si vous utilisez un _ShortCode_, alors au moins un _PhoneNo_ doit être défini.                                                                                                                                                                                                                                                                       |
| method      | Non         | La méthode de notification à utiliser. Définissez `sms` (par défaut) pour envoyer un SMS, ou `call` pour lancer un appel téléphonique sortant. Avec `call`, le corps du message peut être un document [TwiML](https://www.twilio.com/docs/voice/twiml) (par ex. `<Response><Say>Bonjour</Say></Response>`) ou du texte simple qui sera lu à voix haute. Les préfixes WhatsApp (`w:`) et les Short Codes ne sont pas compatibles avec `method=call`.                                                                                                     |
| apikey      | Non         | Clé API Twilio optionnelle (commençant par `SK`). Lorsqu'elle est fournie, elle remplace l'_Account SID_ pour l'authentification HTTP Basic, ce qui correspond à l'[approche recommandée](https://www.twilio.com/docs/iam/api-keys) pour un usage en production.                                                                                                                                                                                                                                                                                        |

:::note
Les SMS n'ont pas de champ titre : le titre est donc placé en haut du corps du message. Pour les appels téléphoniques, consultez [Appel téléphonique](#appel-téléphonique) ci-dessus.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Twilio sous forme de SMS :

```bash
# Supposons que notre {AccountSID} soit AC735c307c62944b5a
# Supposons que notre {AuthToken} soit e29dfbcebf390dee9
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo}
#  - se trouve aux États-Unis, donc avec l'indicatif +1
#  - corresponde à 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/18005551223

# l'exemple suivant aurait également fonctionné (les espaces,
# parenthèses et tirets sont acceptés dans un numéro) :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/1-(800) 555-1223

```

Envoyer une notification Twilio sous forme d'appel téléphonique avec TwiML :

```bash
# Supposons que notre {AccountSID} soit AC735c307c62944b5a
# Supposons que notre {AuthToken} soit e29dfbcebf390dee9
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo} soit +1-800-555-1223
apprise -vv -t "Titre du Message de Test" \
   -b "<Response><Say>Corps du Message de Test</Say></Response>" \
   "twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/18005551223?method=call"

```

### Prise en Charge de WhatsApp

Si votre compte est configuré pour prendre en charge [WhatsApp for Business](https://www.twilio.com/en-us/messaging/channels/whatsapp), vous pouvez aussi utiliser ce plugin pour notifier ces points de terminaison. Il suffit de placer `w:` devant les numéros sortants qui doivent être remis via WhatsApp au lieu de la configuration Twilio par défaut, par exemple :

```bash
# Supposons que notre {AccountSID} soit AC735c307c62944b5a
# Supposons que notre {AuthToken} soit e29dfbcebf390dee9
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo} WhatsApp soit +1 555 123 3456
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/w:15551233456

# l'exemple suivant aurait également fonctionné (les espaces,
# parenthèses et tirets sont acceptés dans un numéro) :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twilio://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/w:+1 555 123 3456

```

Vous pouvez aussi placer `w:` devant votre propre numéro afin de modifier le comportement par défaut et faire en sorte que tous les numéros suivants soient interprétés comme des destinations WhatsApp. Par exemple : `twilio://credentials/w:18005559876/15551234444/15551235555`

Dans l'exemple ci-dessus, les numéros cibles `15551234444` et `15551235555` seraient envoyés via WhatsApp, car le comportement par défaut de traitement des numéros a été modifié en préfixant la source par `w:`.

**Remarque :** les sources basées sur des Short Codes ne fonctionneront pas avec WhatsApp.
