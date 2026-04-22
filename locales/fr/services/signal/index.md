---
title: "Notifications Signal API"
description: "Envoyer des notifications via Signal API."
sidebar:
  label: "Signal API"

source: https://github.com/bbernhard/signal-cli-rest-api

schemas:
  - signal: insecure
  - signals

has_attachments: true
has_selfhosted: true

sample_urls:
  - signal://{user}:{password}@{hostname}/{from_phone}
  - signal://{user}:{password}@{hostname}:{port}/{from_phone}
  - signal://{user}:{password}@{hostname}/{from_phone}/{target}
---

## Signal API

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Tout d'abord, vous devez disposer d'un compte Signal. Il est donc supposé que vous disposez de la version Apple ou Android du logiciel Signal.

À partir de là, le plugin suppose que vous avez configuré le [Signal Rest API Service](https://github.com/bbernhard/signal-cli-rest-api).

Une configuration simple pourrait ressembler à ceci :

```bash
# Create a directory for our configuration to get stored into
mkdir -p $HOME/.signal-api

# Launch a Signal API instance that listens on port 9922
docker run -d --name signal-api --restart=always -p 9922:8080 \
 -v $HOME/.signal-api:/home/.local/share/signal-cli \
   -e 'MODE=native' -e SIGNAL_CLI_UID=$(id -u) -e SIGNAL_CLI_GID=$(id -g) \
   bbernhard/signal-cli-rest-api
```

Si tout se passe bien, vous devriez pouvoir pointer votre navigateur vers : `http://localhost:9922/v1/qrcodelink?device_name=signal-api` et, depuis l'application de votre téléphone, suivre les instructions pour ajouter un **Linked Device**.

Le **{FromPhoneNo}** doit être le numéro associé à votre compte.

## Syntaxe

La syntaxe valide est la suivante :

- `signal://{user}:{password}@{hostname}/{from_phone}`
- `signal://{user}:{password}@{hostname}:{port}/{from_phone}`
- `signal://{user}:{password}@{hostname}/{from_phone}/{target}`
- `signal://{user}:{password}@{hostname}:{port}/{from_phone}/{target}`

Vous pouvez publier dans plusieurs conversations en les enchaînant simplement à la fin de l'URL.

- `signal://{user}:{password}@{hostname}:{port}/{from_phone}/{target1}/{target2}/{target3}`
- `signals://{user}:{password}@{hostname}:{port}/{from_phone}/{target1}/{target2}/{target3}`

## Détail des Paramètres

| Variable | Requis    | Description                                                                                                                                                                 |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui       | Le nom d'hôte du serveur Web                                                                                                                                                |
| port     | Non       | Le port sur lequel notre serveur Web est en écoute. Par défaut, le port est **80** pour **signal://** et **443** pour toutes les références **signals://**.                 |
| user     | Non       | Si votre système est configuré pour utiliser HTTP-AUTH, vous pouvez fournir le _nom d'utilisateur_ pour l'authentification.                                                 |
| password | Non       | Si votre système est configuré pour utiliser HTTP-AUTH, vous pouvez fournir le _mot de passe_ pour l'authentification.                                                      |
| from     | Oui       | Il doit s'agir d'un _numéro de téléphone expéditeur_ que vous avez ajouté au service API.                                                                                   |
| to       | **\*Non** | Un numéro de téléphone ou un identifiant de groupe auquel vous souhaitez envoyer votre notification. Si aucun n'est spécifié, le champ `from` est utilisé à la place.       |
| batch    | Non       | Envoyer plusieurs notifications spécifiées en un seul lot (1 envoi en amont vers le serveur final). Par défaut, cette option est définie sur `no`.                          |
| status   | Non       | Inclure éventuellement une petite chaîne ASCII représentant le statut de la notification envoyée (en ligne avec celle-ci) ; par défaut, cette option est définie sur `yes`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

### Obtenir un Identifiant de Groupe

Les groupes peuvent être créés dans l'application ou via le [Signal Rest API Service](https://github.com/bbernhard/signal-cli-rest-api).
Pour obtenir la liste des groupes disponibles et leurs identifiants, exécutez :

```bash
curl -X GET -H "Content-Type: application/json" localhost:9922/v1/groups/+15555551234 | jq
```

Un exemple de sortie est le suivant :

```json
[
  {
    "name": "Test Group",
    "id": "group.abcdefghijklmnop=",
    "internal_id": "aabbccdd/eeffgghh=",
    "members": [
      "+1555555551234
      "+16666661234"
    ],
      "blocked": false,
      "pending_invites": [],
      "pending_requests": [],
      "invite_link": "",
      "admins": [
      "+1555555551234"
    ]
  }
]

The takeaway from the above is the group
```

Exemple d'envoi d'une notification à un groupe : `group.aabbccdd/eeffgghh=` identifié par le champ `id`.

## Exemples

Envoyer une notification Signal (via Signal API) :

```bash
# Assuming our {Hostname} is localhost (hosting the bbernhard/signal-cli-rest-api)
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "signal://localhost/19005559999/18005551223"

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "signal://localhost/1-(900) 555-9999/1-(800) 555-1223"
```

D'après mon expérience personnelle, j'ai pu m'envoyer une notification à moi-même en procédant simplement comme suit :

```bash
# Assuming our {Hostname} is localhost (hosting the bbernhard/signal-cli-rest-api)
# Assuming our {Port} is 9922
# Assuming our {FromPhoneNo} is +1 555 555 1234
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "signal://localhost:9922/15555551234"
```

Si vous connaissez l'identifiant du groupe auquel vous souhaitez envoyer une notification, vous pouvez également le spécifier sur la ligne de commande :

```bash
# Assuming our {Hostname} is localhost (hosting the bbernhard/signal-cli-rest-api)
# Assuming our {Port} is 9922
# Assuming our {FromPhoneNo} is +1 555 555 1234
# Assuming our {Group} is group.abcdefghijklmnop=
apprise -vv -t "Group Message:" -b "Hello group members" \
    "signal://localhost:9922/+1555555551234/group.abcdefghijklmnop="
```

J'ai même pu envoyer une pièce jointe sans problème :

```bash
apprise -vv -t -b "test" \
   signal://localhost:9922/15555551234 --attach apprise-test.gif
```

Ce qui a produit :
![image](./images/168930313-05e2bfb2-48f3-4a0a-b0ef-e5c601c97703.png)
