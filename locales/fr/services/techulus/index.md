---
title: "Notifications Techulus Push"
description: "Envoyer Techulus Push notifications."
sidebar:
  label: "Techulus Push"

source: https://push.techulus.com

schemas:
  - push

sample_urls:
  - push://{apikey}/

limits:
  max_chars: 1000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use this plugin, you need to first download the mobile app and sign up through there:

- [Apple](https://itunes.apple.com/us/app/push-by-techulus/id1444391917?ls=1&mt=8)
- [Android](https://play.google.com/store/apps/details?id=com.techulus.push)

Once you've got your account, you can get your API key from [here](https://push.techulus.com/login.html).
You can also just get the **{apikey}** right out of the phone app that is installed. The **{apikey}** will look something like:

- `b444a40f-3db9-4224-b489-9a514c41c009`

## Syntaxe

La syntaxe valide est la suivante :

- `push://{apikey}/`

## Detail des parametres

| Variable | Required | Description                                            |
| -------- | -------- | ------------------------------------------------------ |
| apikey   | Yes      | The apikey associated with your Techulus Push account. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Techulus Push notification:

```bash
# Assuming our {apikey} is b444a40f-3db9-4224-b489-9a514c41c009
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   push:///b444a40f-3db9-4224-b489-9a514c41c009/
```
