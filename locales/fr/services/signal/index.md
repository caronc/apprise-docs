---
title: "Notifications Signal API"
description: "Envoyer des notifications via Signal API."
sidebar:
  label: "Signal API"

source: https://github.com/bbernhard/signal-cli-rest-api

schemas:
  - signal: insecure
  - signals

has_chat: true
has_selfhosted: true
has_attachments: true

sample_urls:
  - signal://{user}:{password}@{hostname}/{from_phone}
  - signal://{user}:{password}@{hostname}:{port}/{from_phone}
  - signal://{user}:{password}@{hostname}/{from_phone}/{target}
---

## Signal API

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous avez besoin d'un compte Signal et de l'application Signal pour [iOS](https://signal.org/download/ios/) ou [Android](https://signal.org/download/android/).

Vous devez également configurer le [service API REST Signal](https://github.com/bbernhard/signal-cli-rest-api).

Une configuration simple pourrait ressembler à ceci :

```bash
# Créer un répertoire pour y stocker notre configuration
mkdir -p $HOME/.signal-api

# Lancer une instance Signal API qui écoute sur le port 9922
docker run -d --name signal-api --restart=always -p 9922:8080 \
 -v $HOME/.signal-api:/home/.local/share/signal-cli \
   -e 'MODE=native' -e SIGNAL_CLI_UID=$(id -u) -e SIGNAL_CLI_GID=$(id -g) \
   bbernhard/signal-cli-rest-api
```

Si tout se passe bien, vous devriez pouvoir pointer votre navigateur vers : `http://localhost:9922/v1/qrcodelink?device_name=signal-api` et, depuis l'application de votre téléphone, suivre les instructions pour ajouter un **Linked Device**.

Le **`{FromPhoneNo}`** doit être le numéro associé à votre compte.

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
    "members": ["+1555555551234", "+16666661234"],
    "blocked": false,
    "pending_invites": [],
    "pending_requests": [],
    "invite_link": "",
    "admins": ["+1555555551234"]
  }
]
```

La valeur à retenir est l'`id` du groupe (ici `group.abcdefghijklmnop=`). Utilisez-la comme cible pour envoyer une notification à ce groupe.

### Mise en Forme du Texte

Ajoutez `?format=markdown` pour envoyer des messages mis en forme. Signal prend en charge le **gras**, l'_italique_, le ~~barré~~, le `monospace` et le `||spoiler||`. Signal n'a pas de titres de section : les titres apparaissent donc en gras.

```bash
apprise -vv -i markdown -t "Rapport de Build" -b "**3** tests en _échec_" \
   "signal://localhost:9922/15555551234?format=markdown"
```

## Exemples

Envoyer une notification Signal (via Signal API) :

```bash
# Supposons que notre {Hostname} soit localhost (qui héberge bbernhard/signal-cli-rest-api)
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo}
#  - se trouve aux États-Unis, donc avec l'indicatif +1
#  - corresponde à 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "signal://localhost/19005559999/18005551223"

# l'exemple suivant aurait également fonctionné, les espaces,
# parenthèses et tirets sont acceptés dans un numéro :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "signal://localhost/1-(900) 555-9999/1-(800) 555-1223"
```

D'après mon expérience personnelle, j'ai pu m'envoyer une notification à moi-même en procédant simplement comme suit :

```bash
# Supposons que notre {Hostname} soit localhost (qui héberge bbernhard/signal-cli-rest-api)
# Supposons que notre {Port} soit 9922
# Supposons que notre {FromPhoneNo} soit +1 555 555 1234
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "signal://localhost:9922/15555551234"
```

Si vous connaissez l'identifiant du groupe auquel vous souhaitez envoyer une notification, vous pouvez également le spécifier sur la ligne de commande :

```bash
# Supposons que notre {Hostname} soit localhost (qui héberge bbernhard/signal-cli-rest-api)
# Supposons que notre {Port} soit 9922
# Supposons que notre {FromPhoneNo} soit +1 555 555 1234
# Supposons que notre {Group} soit group.abcdefghijklmnop=
apprise -vv -t "Message de Groupe :" -b "Bonjour aux membres du groupe" \
    "signal://localhost:9922/+1555555551234/group.abcdefghijklmnop="
```

J'ai même pu envoyer une pièce jointe sans problème :

```bash
apprise -vv -t -b "test" \
   signal://localhost:9922/15555551234 --attach apprise-test.gif
```

Ce qui a produit :
![image](./images/168930313-05e2bfb2-48f3-4a0a-b0ef-e5c601c97703.png)

## Dépannage

### Signal API envoie mon SMS, mais Apprise signale un échec

Le message a bien été envoyé, mais `signal-cli-rest-api` a dépassé le délai
d'attente de 4 secondes d'Apprise avant de le confirmer. Avec l'API Apprise,
le journal peut afficher `A Connection error occured sending ...`, et une
chaîne de priorité peut alors passer au service suivant. Le problème peut être
plus visible lors du premier message après le redémarrage d'un processus
Gunicorn.

Donnez plus de temps au serveur pour répondre en ajoutant `?rto=8` à l'URL
Apprise :

```text
signal://localhost:9922/15555551234?rto=8
```

La valeur indique le nombre de secondes pendant lesquelles Apprise attendra.
Si l'URL contient déjà des options après un `?`, ajoutez plutôt `&rto=8`.
Utilisez une valeur plus élevée si nécessaire.

Le mode natif peut également améliorer le temps de réponse sur certains
systèmes. L'exemple Docker ci-dessus l'active déjà avec :

```bash
-e 'MODE=native'
```

Si le problème persiste, essayez de déplacer le conteneur Signal API vers une
machine plus rapide ou moins sollicitée.
