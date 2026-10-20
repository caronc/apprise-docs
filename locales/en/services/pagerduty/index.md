---
title: "PagerDuty Notifications"
description: "Send PagerDuty notifications."
sidebar:
  label: "PagerDuty"

source: https://www.pagerduty.com

schemas:
  - pagerduty

has_incident: true
has_image: true

sample_urls:
  - pagerduty://{integration_key}@{api_key}
  - pagerduty://{integration_key}@{api_key}/{source}
  - pagerduty://{integration_key}@{api_key}/{source}/{component}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

You need to have an account with [PagerDuty](https://www.pagerduty.com) and generate/access your API key.

From there you can define an API V2 Integration.

## Syntax

Valid syntax is as follows:

- `pagerduty://{integration_key}@{api_key}`
- `pagerduty://{integration_key}@{api_key}/{source}`
- `pagerduty://{integration_key}@{api_key}/{source}/{component}`

## Parameter Breakdown

| Variable        | Required | Description                                                                                                                                                                                                                                                                                                                                                             |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integration_key | Yes      | This is provided to you on the Events API V2 integration's detail page. This can also be referred to as a Routing Key.                                                                                                                                                                                                                                                  |
| api_key         | Yes      | The API Key associated with your setup                                                                                                                                                                                                                                                                                                                                  |
| group           | No       | Provide a group (string) as part of the payload                                                                                                                                                                                                                                                                                                                         |
| class           | No       | Provide a class (string) as part of the payload                                                                                                                                                                                                                                                                                                                         |
| region          | No       | By default this takes on the value of **us**. But you can optionally set it to **eu** as well.                                                                                                                                                                                                                                                                          |
| source          | No       | Provide a source (string) as part of the payload; the default is **Apprise** if one isn't specified.                                                                                                                                                                                                                                                                    |
| component       | No       | Provide a component (string) as part of the payload; the default is **Notification** if one isn't specified.                                                                                                                                                                                                                                                            |
| click           | No       | Provide a clickable URL to associate with the notice.                                                                                                                                                                                                                                                                                                                   |
| image           | No       | Associate the notification status via a represented icon. You can set this value to `no` if you do not want this to occur.                                                                                                                                                                                                                                              |
| severity        | No       | The notification severity is otherwise detected on its own, however if you wish to force a specific mode always, you can do so by providing this as part of the URL. Possible values are: `info`, `warning`, `critical`, and `error`.                                                                                                                                   |
| action          | No       | What to do with the incident. Possible values are **trigger**, **map** and **resolve**. **trigger** always raises an incident. **map** resolves the incident when the notification type is `success` and raises one for every other type. **resolve** always resolves it. The default is **trigger**.                                                                   |
| dedup           | No       | A deduplication key. Events sent with the same key update the same open incident instead of creating a new one, and a resolve closes it. With **map** or **resolve** and no key, the title (or the first line of the message when there is no title) is used as the key, so a `success` notification resolves the incident that a `failure` with the same title raised. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Pager Duty trigger to our **source** `node01.local` and the **component** `drive_sda`

```bash

# Assuming our {integration_key} is A1BRTD4JD
# Assuming our {api_key} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {source} is node01.local
# Assuming our {component} is drive_sda
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/node01.local/drive_sda/"
```

### Resolving Incidents

Use `action=map` to raise an incident on a `failure` and resolve it later by sending a `success` notification with the same title:

```bash
apprise -vv -n failure -t "Disk almost full" -b "sda is at 95%" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/node01.local/drive_sda/?action=map"

apprise -vv -n success -t "Disk almost full" -b "sda is back to normal" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/node01.local/drive_sda/?action=map"
```

Always resolve the incident with a fixed deduplication key, whatever the notification type:

```bash
apprise -vv -b "sda is back to normal" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/?dedup=sda-disk&action=resolve"
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
   "pagerduty://abc123@98754/node01.local/drive_sda/?+disk_space_left=145GB&+disk_space_total=500GB"
```
