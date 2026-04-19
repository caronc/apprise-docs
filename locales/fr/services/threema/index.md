---
title: "Notifications Threema Gateway"
description: "Envoyer Threema Gateway notifications."
sidebar:
  label: "Threema Gateway"

source: https://gateway.threema.ch/

schemas:
  - threema

sample_urls:
  - threema://{gateway_id}@{secret}/{user}
  - threema://{gateway_id}@{secret}/{email}
  - threema://{gateway_id}@{secret}/{phone}

limits:
  max_chars: 3500
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

You need to set up a [Threema Gateway](https://gateway.threema.ch/) account first, which will allow you to request and access one or more 8-character Gateway IDs (each starting with an asterisk (`*`), e.g., `*THREEMA`).

**Important**: Please make sure to request a "Basic" ID for now, as end-to-end encrypted Threema Gateway messages are not yet supported by Apprise. End-to-end Gateway IDs cannot be used for sending Simple Messages (encrypted on Threema Servers).

- Create your Threema Gateway account at <https://gateway.threema.ch/>, and confirm your e-mail address
- For credits:
  - Ask Threema Gateway support via e-mail (support-gateway at threema.ch) for test credits, and they will get you covered for some testing
  - OR acquire them after logging into your Gateway account.
- [Request](https://gateway.threema.ch/en/id-request?type=simple) your Simple Gateway ID. After a short review, Threema will then create your ID, and you will find the corresponding ID secret on the ID overview page. This usually takes no more than one or two business days.

## Syntaxe

La syntaxe valide est la suivante :

- `threema://{gateway_id}@{secret}/{user}`
- `threema://{gateway_id}@{secret}/{user1}/{user2}/{user3}/{userN}`
- `threema://{gateway_id}@{secret}/{email}`
- `threema://{gateway_id}@{secret}/{email1}/{email2}/{email3}/{emailN}`
- `threema://{gateway_id}@{secret}/{phone}`
- `threema://{gateway_id}@{secret}/{phone1}/{phone2}/{phone3}/{phoneN}`

You can also freely mix/match the variables:

- `threema://{gateway_id}@{secret}/{phone1}/{user1}/{email1}/...`

## Detail des parametres

| Variable   | Required | Description                                                                                                                                                                 |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gateway_id | Yes      | Your Gateway ID. It consists of 8 characters and usually starts with an asterisk (`*`), e.g., `*MYGWYID`. You may use `?from=` (or `gwid`) as an alias to this variable.    |
| secret     | Yes      | The ID secret associated with your Gateway ID. You may use `?secret=` as an alias to this variable.                                                                         |
| target     | No       | Specfiy the recipient Threema ID, e-mail address, or phone no. There is no limit to the number of targets you may specify. You may use `?to=` as an alias to this variable. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Threema (Gateway) Simple Notification

```bash
# Assume:
#  - our {gateway_id} is *MYGWYID
#  - our {secret} is abc123-2345
#  - The {toPhoneNo} is 6135551234
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   threema://*MYGWYID@abc123-2345/6135551234
```

Envoyer une Threema (Gateway) Simple Notification to a Threema User by specifying their ID:

```bash
# Assume:
#  - our {gateway_id} is *MYGWYID
#  - our {secret} is abc123-2345
#  - The {toThreemaID} is FRIENDID
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   threema://*MYGWYID@abc123-2345/FRIENDID
```
