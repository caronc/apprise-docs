---
title: "Notifications PagerDuty"
description: "Envoyer PagerDuty notifications."
sidebar:
  label: "PagerDuty"

source: https://www.pagerduty.com

schemas:
  - pagerduty

has_attachments: true

sample_urls:
  - pagerduty://{integration_key}@{api_key}
  - pagerduty://{integration_key}@{api_key}/{source}
  - pagerduty://{integration_key}@{api_key}/{source}/{component}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez disposer d’un compte chez [PagerDuty](https://www.pagerduty.com) and generate/access your API key.

From there you can define an API V2 Integration.

## Syntaxe

La syntaxe valide est la suivante :

- `pagerduty://{integration_key}@{api_key}`
- `pagerduty://{integration_key}@{api_key}/{source}`
- `pagerduty://{integration_key}@{api_key}/{source}/{component}`

## Detail des parametres

| Variable        | Required | Description                                                                                                                                                                                                                           |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integration_key | Yes      | This is provided to you on the Events API V2 integration's detail page. This can also be referred to as a Routing Key.                                                                                                                |
| api_key         | Yes      | The API Key associated with your setup                                                                                                                                                                                                |
| group           | No       | Provide a group (string) as part of the payload                                                                                                                                                                                       |
| class           | No       | Provide a class (string) as part of the payload                                                                                                                                                                                       |
| region          | No       | By default this takes on the value of **us**. But you can optionally set it to **eu** as well.                                                                                                                                        |
| source          | No       | Provide a source (string) as part of the payload; the default is **Apprise** if one isn't specified.                                                                                                                                  |
| component       | No       | Provide a component (string) as part of the payload; the default is **Notification** if one isn't specified.                                                                                                                          |
| click           | No       | Provide a clickable URL to associate with the notice.                                                                                                                                                                                 |
| image           | No       | Associate the notification status via a represented icon. You can set this value to `no` if you do not want this to occur.                                                                                                            |
| severity        | No       | The notification severity is otherwise detected on its own, however if you wish to force a specific mode always, you can do so by providing this as part of the URL. Possible values are: `info`, `warning`, `critical`, and `error`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Pager Duty trigger to our **source** `node01.local` and the **component** `drive_sda`

```bash

# Assuming our {integration_key} is A1BRTD4JD
# Assuming our {api_key} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {source} is node01.local
# Assuming our {component} is drive_sda
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/node01.local/drive_sda/"
```

### Custom Details

You can provide custom details as part of the payload as well. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

```bash
# Below would pass along in the `custom_details` payload of the API
#    "disk_space_left": "145GB"
#
# Assuming our {integration_key} is abc123
# Assuming our {api_key} is 98754
# Assuming our {source} is node01.local
# Assuming our {component} is drive_sda
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagerduty://abc123@98754/node01.local/drive_sda/?+disk_space_left=145GB"

# Multiple details just require more entries defined:
# Below would set the custom details to:
#    "disk_space_left": "145GB"
#    "disk_space_total": "500GB"
#
# Assuming our {integration_key} is abc123
# Assuming our {api_key} is 98754
# Assuming our {source} is node01.local
# Assuming our {component} is drive_sda
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagerduty://abc123@98754/node01.local/drive_sda/?+disk_space_left=145GB&"+disk_space_total=500GB"
```
