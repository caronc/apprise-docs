---
title: "Notifications OneSignal"
description: "Envoyer OneSignal notifications."
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

## Configuration du compte

1. Visit <https://onesignal.com> to create your account.
2. To acquire your `{appid}` and `{apikey}` Clic on the **Keys and IDs**.<br/>![OneSignalAppKeys](./images/103224241-65616080-48f5-11eb-97c0-fa32a28524b4.png)

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

You can also mix/match the targets:

- `onesignal://{app_id}@{apikey}/{email}/@{user_id}/#{include_segment}/{player_id}`

If you defined a template with OneSignal, you can use it as well:

- `onesignal://{template_id}:{app_id}@{apikey}/#{include_segment}`
- `onesignal://{template_id}:{app_id}@{apikey}/#{include_segment1}/#{include_segment2}/#{include_segmentN}`
- `onesignal://{template_id}:{app_id}@{apikey}/{player_id}/`
- `onesignal://{template_id}:{app_id}@{apikey}/{player_id1}/{player_id2}/{player_idN}`
- `onesignal://{template_id}:{app_id}@{apikey}/@{user_id}/`
- `onesignal://{template_id}:{app_id}@{apikey}/@{user_id1}/@{user_id2}/@{user_idN}`
- `onesignal://{template_id}:{app_id}@{apikey}/{email}/`
- `onesignal://{template_id}:{app_id}@{apikey}/{email1}/{email2}/{emailN}`

## Detail des parametres

| Variable        | Required | Description                                                                                                                                          |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_id          | Yes      | This is the Application ID associated with your OneSignal account.                                                                                   |
| apikey          | Yes      | This is the API Key associated with your OneSignal account.                                                                                          |
| template_id     | No       | The UUID Template ID you wish to use                                                                                                                 |
| player_id       | No       | A Player ID to notify                                                                                                                                |
| user_id         | No       | A User ID to notify. <br/>**Note**: these must be prefixed with an `@` symbol or it will be interpreted as a Player ID                               |
| include_segment | No       | An include segment. <br/>**Note**: these must be prefixed with an `#` symbol or it will be interpreted as a Player ID                                |
| email           | No       | An email to notify.                                                                                                                                  |
| subtitle        | No       | The subtitle of your push. Only appears on iOS devices.                                                                                              |
| language        | No       | The 2 character language code to push your message as. By default this is set to `en` if not specified.                                              |
| image           | No       | to include the icon/image associated with the message. By default this is set to `yes`.                                                              |
| batch           | No       | Set it to **Yes** if you want all identified targets to be notified notified in batches (instead of individually). By default this is set to **No**. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une OneSignal notification to all devices associated with a project:

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

### Custom Data (Templates)

Making use of the `:` on the Apprise URL allows you to alter and add to the payload of your onesignal post.

```bash
# As an example:
apprise -vv -b "Test Message Body" \
   "onesignal://credentials/?:key1=value1"
```

The above would additional these assignments into the payload as `custom_data':

```json
{
   ... previous payload elements... and then:
   "custom_data": {"key1": "value1"}
}
```

### Data

Making use of the `+` on the Apprise URL allows you to alter and add to the payload of your onesignal post.

```bash
# As an example:
apprise -vv -b "Test Message Body" \
   "onesignal://credentials/?+key1=value1"
```

The above would additional these assignments into the payload as `data':

```json
{
   ... previous payload elements... and then:
   "data": {"key1": "value1"}
}
```
