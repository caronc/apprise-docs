---
title: "Notifications API Apprise"
description: "Envoyer API Apprise notifications."
sidebar:
  label: "API Apprise"

source: https://github.com/caronc/apprise-api

schemas:
  - apprise: insecure
  - apprises

sample_urls:
  - apprises://{host}/{token}
  - apprises://{host}:{port}/{token}
  - apprises://{user}@{host}:{port}/{token}
  - apprises://{user}:{password}@{host}:{port}/{token}

has_attachments: true
has_selfhosted: true
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Mettez en place une instance auto-hebergee de [Apprise-API](https://github.com/caronc/apprise-api) and use this service to integrate with it remotely.

## Syntaxe

La syntaxe valide est la suivante :

- `apprise://{host}/{token}`
- `apprise://{host}:{port}/{token}`
- `apprise://{user}@{host}:{port}/{token}`
- `apprise://{user}:{password}@{host}:{port}/{token}`

Pour une connexion securisee, utilisez plutot `apprises`.

- `apprises://{host}/{token}`
- `apprises://{host}:{port}/{token}`
- `apprises://{user}@{host}:{port}/{token}`
- `apprises://{user}:{password}@{host}:{port}/{token}`

## Detail des parametres

| Variable | Required | Description                                                                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Web Server's hostname                                                                                                                 |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **apprise://** and **443** for all **apprises://** references. |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                         |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                         |
| tags     | No       | You can optional set the tags you want to supply with your call to the API Apprise server                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification along to an API Apprise server listening on port 80:

```bash
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token"
```

Voici un autre exemple ou vous pouvez appeler votre serveur Apprise selon les tags fournis :

```bash
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
# Assuming we want to trigger any Notification associated with the {tag} email
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=email"
```

Vous pouvez aussi utiliser la logique ET et OU lorsque vous transmettez des tags :

```bash
#
# OR Example
#
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
# Assuming we want to trigger any Notification associated with notifications
# that have either (OR) devops and finance
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=devops,finance"

#
# AND Example
#
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
# Assuming we want to trigger any Notification associated with notifications
# that have all of the following tags associated with them:
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=devops alerts"
```

### Manipulation des en-tetes

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
# Assuming our {token} is apprise
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "apprise://localhost:8080/apprise/?+X-Token=abcdefg"

# Multiple headers just require more entries defined:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
# Assuming our {token} is apprise
# In this example we allow for a custom URL path to be defined
# in the event we're hosting our Apprise API here instead
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "apprise://localhost:8080/path/apprise/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

**Note:** this service is a little redundant because you can already use the CLI and point its configuration to an existing API Apprise server (using the `--config` on the CLI or `AppriseConfig()` class via its own internal API).

```bash
# A simple example of the Apprise CLI using a Config file instead:
# pulling down previously stored configuration
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
# Assuming our {token} is apprise
apprise --body="test message" --config=http://localhost:8080/get/apprise
```
