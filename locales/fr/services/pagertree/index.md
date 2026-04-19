---
title: "Notifications PagerTree"
description: "Envoyer PagerTree notifications."
sidebar:
  label: "PagerTree"

source: https://pagertree.com

schemas:
  - pagertree

sample_urls:
  - pagertree://{integration}
  - pagertree://{integration}?action=resolve&thirdparty_id=abc123
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

1. For this to work, you'll need to signup for a [PagerTree](https://pagertree.com) account (free trial is fine). Make sure you follow the setup wizard (you'll want to be on-call for the team the integration is pointed to in Step 2)
2. Create a [webhook integration](https://pagertree.com/docs/integration-guides/webhook) and point it to the team (default: "Devops Team")
3. From the integration page, copy the integration Prefix ID (used for the apprise url)
   ![image](./images/217587441-cfbf0f43-f736-4b9d-85dc-18acc6cc418c.png)
4. Use the Prefix ID for the apprise URL `./bin/apprise -t test -b message "pagertree://int_xxxxxxxxxx"`
   Vous devez disposer d’un compte chez [PagerTree](https://pagertree.com) and create a [webhook integration](https://pagertree.com/docs/integration-guides/webhook).

## Syntaxe

La syntaxe valide est la suivante :

- `pagertree://{integration}`
- `pagertree://{integration}?action=resolve&thirdparty_id=abc123`
- `pagertree://{integration}?+pagertree-token=123&:env=prod&-incident=true&-incident_severity=SEV-1&-incident-message=Please join the bridge&tags=prod,server,outage`

## Detail des parametres

| Variable    | Required | Description                                                                                                                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integration | Yes      | This is the Prefix ID of your webhook integration. Found at the top of the integration page.                                                                                                                                 |
| action      | No       | The action for the webhook. Possible values are `create`, `acknowledge`, and `resolve`. When using acknowledge or resolve, please use the `thirdparty_id` parameter to indicate to PagerTree which alert should be actioned. |
| thirdparty  | No       | An Id PagerTree uses to map thirdparty applications to alerts. You can specify your own, or if not, a random UUID will be generated for you.                                                                                 |
| urgency     | No       | Urgency of the alert to be generated. Possible values `silent`, `low`, `medium`, `high`, or `critical`. If not provided, PagerTree will use the integration's default.                                                       |
| tags        | No       | Comma seperated list of tags. (ex: "prod,server,outage")                                                                                                                                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une PagerTree create command.

```bash

# Assuming our {integration_id} is int_0123456789
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagertree://int_0123456789"
```

### Payload Manipulation

Making use of the `:` on the Apprise URL allows you to alter and add to the body content posted upstream to PagerTree. This is useful when using the [Capture Additional Data feature](https://pagertree.com/docs/integration-guides/webhook#integration-options).

```bash
# Add to the payload delivered to PagerTree
#
# Assuming our {integration_id} is int_xxxxxxxxxx
# Assuming we want to include "server": "blue-ranger-2" as part of the existing payload:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagertree://int_xxxxxxxxxx/?:server=blue-ranger-2"
```

The above would post a message such as:

```json
{
  "id": "0f85aa1c-711e-4873-95b6-e441c291537d",
  "action": "create",
  "title": "Test Message Title",
  "message": "Test Message Body",
  "server": "blue-ranger-2"
}
```

### Manipulation des en-tetes

Some users may require special HTTP headers to be present when they post their data to PagerTree. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string. This is useful when making use of the [PagerTree Token feature](https://pagertree.com/docs/integration-guides/webhook#integration-options).

```bash
# Below would set the header:
#    pagertree-token: abcdefg
#
# Assuming our {integration_id} is int_xxxxxxxxxx
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagertree://int_xxxxxxxxxx?+pagertree-token=abcdefg"

```

### Meta Manipulation

Some PagerTree functionality (like incidents) lives in the `meta` property of the payload. To add to the meta property you just need to prefix your entries with a minus (`-`) symbol. [See example.](https://pagertree.com/docs/integration-guides/webhook#example-request-2)

```bash
# Indicate to PagerTree this alert should be marked as an incident
# The `-` symbol will get stripped off when the upstream post takes place
# Apprise knows not to do anything with the argument at all and pass it along as is.
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pagertree://int_xxxxxxxxxx?-incident=true&-incident_severity=SEV-1&-incident_message=Join the war room"
```
