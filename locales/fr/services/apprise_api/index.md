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

| Variable | Obligatoire | Description                                                                                                                                                |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Nom d'hôte du serveur Web.                                                                                                                                 |
| port     | Non         | Port du serveur Web. La valeur par défaut est **80** pour **apprise://** et **443** pour **apprises://**.                                                  |
| user     | Non         | Nom d'utilisateur employé lorsque le serveur exige HTTP Basic Auth.                                                                                        |
| password | Non         | Mot de passe employé lorsque le serveur exige HTTP Basic Auth.                                                                                             |
| tags     | Non         | Tags facultatifs envoyés avec la requête.                                                                                                                  |
| version  | Non         | La version `2` envoie le jeton dans `X-Apprise-Config-ID` et est utilisée par défaut. La version `1` le conserve dans le chemin HTTP des anciens serveurs. |

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

Placez le nom d'utilisateur et le mot de passe enregistrés avant le nom d'hôte. Une connexion administrateur avec mot de passe uniquement commence par deux-points. La version 2 envoie automatiquement la clé dans `X-Apprise-Config-ID`.

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

Vous pouvez aussi utiliser la logique ET et OU lorsque vous transmettez des tags :

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

# Exemple mixte : (comment AND create) OR admin
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token?tags=comment create,admin"
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

**Remarque :** L'option `--config` de la CLI et la classe `AppriseConfig()` peuvent aussi charger la configuration depuis un serveur API Apprise.

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
