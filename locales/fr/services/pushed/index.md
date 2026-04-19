---
title: "Notifications Pushed"
description: "Envoyer Pushed notifications."
sidebar:
  label: "Pushed"

source: https://pushed.co/

schemas:
  - pushed

has_sms: true

sample_urls:
  - pushed://{app_key}/{app_secret}
  - pushed://{app_key}/{app_secret}/@{user_pushed_id}
  - pushed://{app_key}/{app_secret}/#{channel_alias}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

You'll want to _Request Developer Access_ which is asked of you when you first log in to the site. Check your email because you'll need to verify your account with them.

Once this is done you will have access to the [apps](https://account.pushed.co/apps) where you can create a new one if you don't already have one.

Once this is done, you'll get access to an:

- Application Key: **{app_key}**
- Application Secret: **{app_secret}**

You'll also need something to notify; so once you've created an account and an app, you'll also need to retrieve their mobile app (for either [Android](https://play.google.com/store/apps/details?id=co.pushed.GetPushed) or [iOS](https://itunes.apple.com/us/app/get-pushed/id804777699?mt=8&uo=6&at=&ct=)) and log in.

Subscribe to this App; there is a _Subscription Link_ you can follow right from the settings page of the App you just created. You will need at least one subscription to use the notification service.

## Syntaxe

La syntaxe valide est la suivante :

- `pushed://{app_key}/{app_secret}`
- `pushed://{app_key}/{app_secret}/@{user_pushed_id}`
- `pushed://{app_key}/{app_secret}/@{user_pushed_id1}/@{user_pushed_id2}/@{user_pushed_idN}`
- `pushed://{app_key}/{app_secret}/#{channel_alias}`
- `pushed://{app_key}/{app_secret}/#{channel_alias1}/#{channel_alias2}/#{channel_aliasN}`

Vous pouvez egalement combiner les formes ci-dessus et effectuer les mises a jour depuis une seule URL :

- `pushed://{app_key}/{app_secret}/@{user_pushed_id}/#{channel_alias}/`

neither a **@{user_pushed_id}** or **#{channel}** is specified, then the default configuration is to send to just the _App_ you provided keys for.

## Detail des parametres

| Variable       | Required | Description                                                                                                                                                                                                                                                                             |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_key        | Yes      | The Application Key can be generated on the Settings page of your Pushed's account. You must have an application key for this Notification service to work.                                                                                                                             |
| app_secret     | Yes      | The Application Secret can be generated on the Settings page of your Pushed's account. You must have an application secret for this Notification service to work.                                                                                                                       |
| user_pushed_id | No       | Users must be prefixed with an _at_ (@) character or they will be ignored. You can identify users here by their Pushed ID.                                                                                                                                                              |
| channel_alias  | No       | Channels must be prefixed with a _hash tag_ (#) or they will be ignored. Channels must be registered with your Pushed account to work. This must be the channel alias itself; not the channel. The alias can be retrieved from the channel settings from within your pushed.io account. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Pushed notification:

```bash
# Assuming our {app_key} is sopJo0dVKVC9YK1F5wDQ
# Assuming our {app_secret} is KWEtXxVm1PtDTTrKaEM49DhBd8MJvSMCHSvunPerbCf1MaNLO300roqOL0F8HErAl
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushed://sopJo0dVKVC9YK1F5wDQ/KWEtXxVm1PtDTTrKaEM49DhBd8MJvSMCHSvunPerbCf1MaNLO300roqOL0F8HErAl
```
