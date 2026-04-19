---
title: "Notifications WxPusher"
description: "Envoyer WxPusher notifications."
sidebar:
  label: "WxPusher"

source: https://wxpusher.zjiecode.com/

schemas:
  - wxpusher

sample_urls:
  - wxpusher://{app_token}@{userid}
  - wxpusher://{app_token}@{userid1}/{userid2}/{useridN}
  - wxpusher://{app_token}@{topic}
  - wxpusher://{app_token}@{topic1}/{topic2}/{topicN}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

1. [Create an account with WxPusher](https://wxpusher.zjiecode.com/).
1. Acquire your App Token from your profile<br/><img width="1428" alt="appToken" src="./images/1cfd1232081adc73.png"><br/>_Note: The above image was taken from [WxPusher's Help Page](https://wxpusher.zjiecode.com/docs/#/?id=%e8%8e%b7%e5%8f%96apptoken)_

Targets can be either a User (`UID_DATA`) or a Topic (`<integer>`). i.e:

- `wxpusher://apptoken/123/343/UID_ABCD` would notify 2 topics (`123`, and `343`) plus one user `UID_DATA`)

## Syntaxe

La syntaxe valide est la suivante :

- `wxpusher://{app_token}@{userid}`
- `wxpusher://{app_token}@{userid1}/{userid2}/{useridN}`
- `wxpusher://{app_token}@{topic}`
- `wxpusher://{app_token}@{topic1}/{topic2}/{topicN}`

You can also mix/match topic's and user ids:

- `wxpusher://{app_token}@{topic1}/{userid1}/...`

## Detail des parametres

| Variable  | Required | Description                                                                                      |
| --------- | -------- | ------------------------------------------------------------------------------------------------ |
| app_token | **Yes**  | The App Token associated with your WxPusher account. It always starts with `AT_`                 |
| userid    | \*No     | You must specify at least 1 (one) `userid` OR 1 (one) `topic`. A `userid` has a prefix of `UID_` |
| topic     | \*No     | You must specify at least 1 (one) `userid` OR 1 (one) `topic`. A `topic` is an integer value     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une WxPusher notification using a topic a topic:

```bash
# Assuming our {app_key} is AT_12345
# Assuming our {topic} is 987
apprise -vv -t "Test Message Title" -b "Test Message Body" -n failure  \
   wxpusher://AT_12345/987
```

Here is an example of notifying a user:

```bash
# Assuming our {app_key} is AT_12345
# Assuming our {user} is UID_123
apprise -vv -t "Test Message Title" -b "Test Message Body" -n failure  \
   wxpusher://AT_12345/UID_123
```

We can notify a variety of users/topics by just specifying htem on the path:

```bash
# Assuming our {app_key} is AT_12345
# Assuming our {user} is UID_123 and UID_456
# Assuming our {topic} is 5555 and 4444
apprise -vv -t "Test Message Title" -b "Test Message Body" -n failure  \
   wxpusher://AT_12345/UID_123/5555/4444/UID_456
```
