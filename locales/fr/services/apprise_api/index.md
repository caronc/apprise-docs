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
  - apprises://{user}@{host}:{port}/{token}
  - apprises://{user}:{password}@{host}:{port}/{token}

has_attachments: true
has_selfhosted: true
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Mettez en place une instance auto-hebergee de [Apprise-API](https://github.com/caronc/apprise-api) et utilisez ce service pour vous y integrer a distance.

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

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                          |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Nom d'hote du serveur web.                                                                                                                           |
| port     | Non         | Port sur lequel votre serveur web ecoute. La valeur par defaut est **80** pour **apprise://** et **443** pour toutes les references **apprises://**. |
| user     | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _username_ pour vous authentifier.                                    |
| password | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _password_ pour vous authentifier.                                    |
| tags     | Non         | Vous pouvez facultativement definir les tags que vous souhaitez fournir lors de votre appel au serveur API Apprise.                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification a un serveur API Apprise a l'ecoute sur le port 80 :

```bash
# Supposons que notre {hostname} soit apprise.server.local
# Supposons que notre {token} soit token
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token"
```

Voici un autre exemple ou vous pouvez appeler votre serveur Apprise selon les tags fournis :

```bash
# Supposons que notre {hostname} soit apprise.server.local
# Supposons que notre {token} soit token
# Supposons que nous voulions declencher toute notification associee au {tag} email
apprise -vv --body="Message de Test" \
   "apprise://apprise.server.local/token?tags=email"
```

Vous pouvez aussi utiliser la logique ET et OU lorsque vous transmettez des tags :

| Valeur `tags=`   | Services selectionnes                        |
| ---------------- | -------------------------------------------- |
| `TagA`           | Possede `TagA`                               |
| `TagA TagB`      | Possede `TagA` **ET** `TagB`                 |
| `TagA+TagB`      | Possede `TagA` **ET** `TagB`                 |
| `TagA&TagB`      | Possede `TagA` **ET** `TagB`                 |
| `TagA,TagB`      | Possede `TagA` **OU** `TagB`                 |
| `TagA\|TagB`     | Possede `TagA` **OU** `TagB`                 |
| `TagA TagC,TagB` | Possede (`TagA` **ET** `TagC`) **OU** `TagB` |

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

### Manipulation des en-tetes

Certains utilisateurs peuvent avoir besoin d'en-tetes HTTP speciaux lors de l'envoi de leurs donnees vers leur serveur. Pour cela, il suffit d'ajouter un symbole plus, **+**, devant n'importe quel parametre precise dans votre URL.

```bash
# L'exemple ci-dessous definirait l'en-tete :
#    X-Token: abcdefg
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
# Supposons que notre {token} soit apprise
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "apprise://localhost:8080/apprise/?+X-Token=abcdefg"

# Pour plusieurs en-tetes, il suffit d'ajouter plus d'entrees :
# L'exemple ci-dessous definirait les en-tetes :
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
# Supposons que notre {token} soit apprise
# Dans cet exemple, nous permettons la definition d'un chemin URL personnalise
# dans le cas ou notre API Apprise serait hebergee a cet endroit
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "apprise://localhost:8080/path/apprise/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

**Remarque :** ce service est un peu redondant, car vous pouvez deja utiliser la CLI et pointer sa configuration vers un serveur API Apprise existant, via `--config` dans la CLI ou la classe `AppriseConfig()` via son API interne.

```bash
# Exemple simple de la CLI Apprise utilisant plutot un fichier de configuration :
# recuperation d'une configuration deja stockee
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
# Supposons que notre {token} soit apprise
apprise --body="test message" --config=http://localhost:8080/get/apprise
```
