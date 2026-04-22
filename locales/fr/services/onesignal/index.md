---
title: "Notifications OneSignal"
description: "Envoyer des notifications OneSignal."
sidebar:
  label: "OneSignal"

source: https://onesignal.com

schemas:
  - onesignal

has_image: true
sample_urls:
  - onesignal://{app_id}@{apikey}/#{include_segment}
  - onesignal://{app_id}@{apikey}/{player_id}/
  - onesignal://{app_id}@{apikey}/@{user_id}/
  - onesignal://{app_id}@{apikey}/{email}/
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

1. Visitez <https://onesignal.com> pour créer votre compte.
2. Pour obtenir votre `{appid}` et votre `{apikey}`, cliquez sur **Keys and IDs**.<br/>![OneSignalAppKeys](./images/103224241-65616080-48f5-11eb-97c0-fa32a28524b4.png)

## Syntaxe

La syntaxe valide est la suivante :

- `onesignal://{app_id}@{apikey}/#{include_segment}`
- `onesignal://{app_id}@{apikey}/#{include_segment1}/#{include_segment2}/#{include_segmentN}`
- `onesignal://{app_id}@{apikey}/{player_id}/`
- `onesignal://{app_id}@{apikey}/{player_id1}/{player_id2}/{player_idN}`
- `onesignal://{app_id}@{apikey}/@{user_id}/`
- `onesignal://{app_id}@{apikey}/@{user_id1}/@{user_id2}/@{user_idN}`
- `onesignal://{app_id}@{apikey}/{email}/`
- `onesignal://{app_id}@{apikey}/{email1}/{email2}/{emailN}`

Vous pouvez également combiner les cibles :

- `onesignal://{app_id}@{apikey}/{email}/@{user_id}/#{include_segment}/{player_id}`

Si vous avez défini un modèle avec OneSignal, vous pouvez également l'utiliser :

- `onesignal://{template_id}:{app_id}@{apikey}/#{include_segment}`
- `onesignal://{template_id}:{app_id}@{apikey}/#{include_segment1}/#{include_segment2}/#{include_segmentN}`
- `onesignal://{template_id}:{app_id}@{apikey}/{player_id}/`
- `onesignal://{template_id}:{app_id}@{apikey}/{player_id1}/{player_id2}/{player_idN}`
- `onesignal://{template_id}:{app_id}@{apikey}/@{user_id}/`
- `onesignal://{template_id}:{app_id}@{apikey}/@{user_id1}/@{user_id2}/@{user_idN}`
- `onesignal://{template_id}:{app_id}@{apikey}/{email}/`
- `onesignal://{template_id}:{app_id}@{apikey}/{email1}/{email2}/{emailN}`

## Détail des Paramètres

| Variable        | Requis | Description                                                                                                                                                   |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_id          | Oui    | L'identifiant d'application associé à votre compte OneSignal.                                                                                                 |
| apikey          | Oui    | La clé API associée à votre compte OneSignal.                                                                                                                 |
| template_id     | Non    | L'identifiant UUID du modèle à utiliser.                                                                                                                      |
| player_id       | Non    | Un identifiant Player à notifier.                                                                                                                             |
| user_id         | Non    | Un identifiant User à notifier. <br/>**Remarque** : ces valeurs doivent être préfixées par le symbole `@` sinon elles seront interprétées comme un Player ID. |
| include_segment | Non    | Un segment d'inclusion. <br/>**Remarque** : ces valeurs doivent être préfixées par le symbole `#` sinon elles seront interprétées comme un Player ID.         |
| email           | Non    | Une adresse e-mail à notifier.                                                                                                                                |
| subtitle        | Non    | Le sous-titre de votre notification push. Apparaît uniquement sur les appareils iOS.                                                                          |
| language        | Non    | Le code langue à 2 caractères pour l'envoi du message. Par défaut, cette valeur est `en` si non spécifiée.                                                    |
| image           | Non    | Permet d'inclure l'icône/image associée au message. Par défaut, cette valeur est `yes`.                                                                       |
| batch           | Non    | Définissez à **Oui** si vous souhaitez que toutes les cibles identifiées soient notifiées par lots (plutôt qu'individuellement). Par défaut : **Non**.        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification OneSignal à tous les appareils associés à un projet :

```bash
# Assume:
#  - our {app_id} is abc123
#  - our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
#  - our {player_id} is 3456-2345-a3ef
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   onesignal://abc123@a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/3456-2345-a3ef

# Override the subtitle (Mac users only) by doing the following:
# You must use URL encoded strings, below the spaces are swapped with %20
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   onesignal://abc123@a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/3456-2345-a3ef?subtitle=A%20Different%20Subtitle
```

### Données Personnalisées (Modèles)

L'utilisation du `:` dans l'URL Apprise permet de modifier et d'enrichir le payload de votre publication onesignal.

```bash
# As an example:
apprise -vv -b "Test Message Body" \
   "onesignal://credentials/?:key1=value1"
```

L'exemple ci-dessus ajouterait ces assignations dans le payload sous `custom_data` :

```json
{
   ... previous payload elements... and then:
   "custom_data": {"key1": "value1"}
}
```

### Données

L'utilisation du `+` dans l'URL Apprise permet de modifier et d'enrichir le payload de votre publication onesignal.

```bash
# As an example:
apprise -vv -b "Test Message Body" \
   "onesignal://credentials/?+key1=value1"
```

L'exemple ci-dessus ajouterait ces assignations dans le payload sous `data` :

```json
{
   ... previous payload elements... and then:
   "data": {"key1": "value1"}
}
```
