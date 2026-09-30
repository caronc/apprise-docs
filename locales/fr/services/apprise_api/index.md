---
title: "Notifications API Apprise"
description: "Envoyer des notifications API Apprise."
sidebar:
  label: "API Apprise"

source: https://github.com/caronc/apprise-api

schemas:
  - apprise: insecure
  - apprises

sample_urls:
  - apprises://{host}/{token}
  - apprises://{host}:{port}/{token}
  - apprises://:{password}@{host}:{port}/{token}
  - apprises://{user}@{host}:{port}/{token}
  - apprises://{user}:{password}@{host}:{port}/{token}

body_formats:
  - text: default
  - html
  - markdown

has_attachments: true
has_selfhosted: true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Installez une instance [Apprise API](https://github.com/caronc/apprise-api) auto-hébergée, puis utilisez ce service pour lui envoyer des notifications.

## Syntaxe

La syntaxe valide est la suivante :

- `apprise://{host}/{token}`
- `apprise://{host}:{port}/{token}`
- `apprise://:{password}@{host}:{port}/{token}`
- `apprise://{user}@{host}:{port}/{token}`
- `apprise://{user}:{password}@{host}:{port}/{token}`

Pour une connexion sécurisée, utilisez plutôt `apprises`.

- `apprises://{host}/{token}`
- `apprises://{host}:{port}/{token}`
- `apprises://:{password}@{host}:{port}/{token}`
- `apprises://{user}@{host}:{port}/{token}`
- `apprises://{user}:{password}@{host}:{port}/{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                      |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Nom d'hôte du serveur Web.                                                                                                                                       |
| port     | Non         | Port du serveur Web. La valeur par défaut est **80** pour **apprise://** et **443** pour **apprises://**.                                                        |
| user     | Non         | Nom d'utilisateur employé lorsque le serveur exige HTTP Basic Auth.                                                                                              |
| password | Non         | Mot de passe employé lorsque le serveur exige HTTP Basic Auth.                                                                                                   |
| tags     | Non         | Tags facultatifs envoyés avec la requête.                                                                                                                        |
| version  | Non         | La version `2` envoie le jeton dans `X-Apprise-Config-ID` et est utilisée par défaut. La version `1` le conserve dans le chemin HTTP, pour les anciens serveurs. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

La version 2 est utilisée sauf si `v=1` est indiqué. Le jeton reste dans l'URL du plugin `apprise://`, mais la version 2 l'envoie au serveur dans un en-tête plutôt que dans le chemin HTTP. Utilisez la version 1 avec un ancien serveur Apprise API :

```bash
apprise --body="Message de Test" \
   "apprise://apprise.server.local/token?v=1"
```

### Sans Authentification

Envoyez une notification à un serveur API Apprise à l'écoute sur le port 80 :

```bash
# Supposons que notre {hostname} soit apprise.server.local
# Supposons que notre {token} soit token
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token"
```

### Avec Authentification

Placez le nom d'utilisateur et le mot de passe enregistrés avant le nom d'hôte. Une connexion administrateur avec mot de passe uniquement commence par deux-points. La version 2 envoie automatiquement la clé de configuration dans `X-Apprise-Config-ID`.

```bash
# Connexion de configuration avec nom d'utilisateur et mot de passe
apprise -vv --body="Message de Test" \
   "apprises://user:password@apprise.server.local/token"

# Connexion administrateur avec mot de passe uniquement
apprise -vv --body="Message de Test" \
   "apprises://:password@apprise.server.local/token"
```

Vous pouvez aussi sélectionner les services par tag :

```bash
# Supposons que notre {hostname} soit apprise.server.local
# Supposons que notre {token} soit token
# Envoyer aux services associés au {tag} email
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token?tags=email"
```

Les tags prennent en charge les expressions ET et OU :

| Valeur `tags=`   | Services sélectionnés                        |
| ---------------- | -------------------------------------------- |
| `TagA`           | Possède `TagA`                               |
| `TagA TagB`      | Possède `TagA` **ET** `TagB`                 |
| `TagA+TagB`      | Possède `TagA` **ET** `TagB`                 |
| `TagA&TagB`      | Possède `TagA` **ET** `TagB`                 |
| `TagA,TagB`      | Possède `TagA` **OU** `TagB`                 |
| `TagA\|TagB`     | Possède `TagA` **OU** `TagB`                 |
| `TagA TagC,TagB` | Possède (`TagA` **ET** `TagC`) **OU** `TagB` |

```bash
# Exemple OU
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token?tags=devops,finance"

# Exemple ET
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token?tags=devops alerts"

# Exemple mixte : (comment ET create) OU admin
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token?tags=comment create,admin"
```

### Formats des Messages

Ce service transmet votre message à un autre serveur Apprise, qui le met ensuite en forme pour ses propres services. Pour éviter de modifier votre message deux fois, le titre et le corps sont toujours transmis exactement tels que vous les avez écrits. Aucune conversion n'est faite en chemin.

- Lorsque vous indiquez à Apprise le format de votre message, ce format est transmis au serveur avec le message. L'outil en ligne de commande `apprise` le fait toujours : il utilise `text`, sauf si vous en choisissez un autre avec `--input-format` (ou `-i`).
- Lorsque le message n'a pas de format propre (par exemple un appel Python à `notify()` sans `body_format`), vous pouvez ajouter `?format=` à l'URL (`text`, `html` ou `markdown`) pour indiquer au serveur dans quel format votre message est écrit. Le message lui-même est toujours envoyé sans modification.
- Si aucun des deux n'est défini, aucun format n'est transmis et le serveur utilise son propre format par défaut.

```bash
# Notre message est écrit en Markdown ; on l'indique au serveur
apprise -vv --input-format=markdown --body="**Le serveur** est de nouveau en ligne" \
   "apprise://apprise.server.local/token"
```

### Manipulation des En-Têtes

Ajoutez un signe plus (**+**) devant un paramètre d'URL pour l'envoyer comme en-tête HTTP.

```bash
# L'exemple ci-dessous définit l'en-tête :
#    X-Token: abcdefg
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
# Supposons que notre {token} soit apprise
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "apprise://localhost:8080/apprise/?+X-Token=abcdefg"

# Pour plusieurs en-têtes, ajoutez plusieurs paramètres :
# L'exemple ci-dessous définit les en-têtes :
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
# Supposons que notre {token} soit apprise
# Cet exemple utilise un chemin URL personnalisé pour l'API Apprise.
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "apprise://localhost:8080/path/apprise/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

**Remarque :** l'option `--config` de la CLI et la classe `AppriseConfig()` peuvent aussi charger la configuration depuis un serveur API Apprise.

```bash
# Exemple de la CLI chargeant une configuration déjà enregistrée :
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
# Supposons que notre {token} soit apprise
apprise --body="test message" --config=http://localhost:8080/get/apprise

# Configuration distante authentifiée
apprise --body="test message" \
   --config="http://user:password@localhost:8080/get/apprise"
```
