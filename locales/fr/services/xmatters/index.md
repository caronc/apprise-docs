---
title: "Notifications xMatters"
description: "Déclencher des alertes xMatters à l'aide du déclencheur HTTP d'un workflow."
sidebar:
  label: "xMatters"

source: https://www.xmatters.com

schemas:
  - xmatters

has_incident: true

body_formats:
  - text

sample_urls:
  - xmatters://{apikey}@{host}/{integration_id}
  - xmatters://{apikey}@{host}/{integration_id}/{recipient}
  - xmatters://{user}:{password}@{host}/{integration_id}/{recipient}
  - https://{company}.xmatters.com/api/integration/1/functions/{integration_id}/triggers?apiKey={apikey}

limits:
  - name: "Title"
    max_chars: 250
  - name: "Body"
    max_chars: 32768
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

xMatters (par Everbridge) est une plateforme de gestion des incidents et des alertes d'astreinte. Apprise déclenche des alertes à l'aide du workflow **Trigger Alerts by Webhook** :

1. Connectez-vous à xMatters et ouvrez l'onglet **Workflows**.
2. Ouvrez **Workflow Templates**, cliquez sur la tuile **Trigger Alerts by Webhook**, puis sur **Next**.
3. Choisissez une méthode d'authentification. **URL Authentication** est la plus simple, car la clé d'API fait partie de l'URL.
4. Copiez l'URL du déclencheur. Elle ressemble à `https://acmeco.xmatters.com/api/integration/1/functions/ba601cb1-3513-4320-b48a-05cb501bb5af/triggers?apiKey=ffcd4dec-8a49-4a67-9e59-ed9fabcb002d&recipients=jdoe`.

Vous pouvez donner cette URL à Apprise telle que vous l'avez copiée. Vous pouvez aussi construire une URL `xmatters://` à partir de ses éléments :

- `acmeco.xmatters.com` est votre **hôte**. Le nom de votre entreprise seul (`acmeco`) fonctionne aussi.
- `ba601cb1-3513-4320-b48a-05cb501bb5af` est votre **identifiant d'intégration**.
- La valeur `apiKey` est votre **clé d'API**.
- Les valeurs `recipients` sont les utilisateurs, groupes ou équipes dynamiques xMatters à notifier.

Pour l'exemple ci-dessus, l'URL Apprise est `xmatters://ffcd4dec-8a49-4a67-9e59-ed9fabcb002d@acmeco/ba601cb1-3513-4320-b48a-05cb501bb5af/jdoe`.

Si vous avez plutôt choisi **Basic Authentication** ou **API Key Authentication**, placez votre nom d'utilisateur et votre mot de passe (ou votre clé d'API et son secret) devant l'hôte : `xmatters://{user}:{password}@acmeco/{integration_id}/jdoe`.

## Syntaxe

La syntaxe valide est la suivante :

- `xmatters://{apikey}@{host}/{integration_id}`
- `xmatters://{apikey}@{host}/{integration_id}/{recipient}`
- `xmatters://{apikey}@{host}/{integration_id}/{recipient1}/{recipient2}/{recipientN}`
- `xmatters://{user}:{password}@{host}/{integration_id}/{recipient}`
- `https://{company}.xmatters.com/api/integration/1/functions/{integration_id}/triggers?apiKey={apikey}&recipients={recipient}`

## Détail des Paramètres

| Variable       | Obligatoire | Description                                                                                                                                                                                                         |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host           | Oui         | Votre hôte xMatters, par exemple `acmeco.xmatters.com`. Si vous indiquez seulement le nom de votre entreprise (`acmeco`), `.xmatters.com` est ajouté pour vous.                                                     |
| integration_id | Oui         | L'identifiant présent dans l'URL du déclencheur, entre `/functions/` et `/triggers`.                                                                                                                                |
| apikey         | \*Oui       | La clé d'API d'un déclencheur qui utilise **URL Authentication**. Vous pouvez aussi la passer avec `?apikey=`.                                                                                                      |
| user           | \*Oui       | Votre nom d'utilisateur xMatters, ou la clé d'API lorsque le déclencheur utilise **API Key Authentication**. À utiliser avec **password**.                                                                          |
| password       | \*Oui       | Votre mot de passe xMatters, ou le secret lorsque le déclencheur utilise **API Key Authentication**.                                                                                                                |
| recipient      | Non         | Un ou plusieurs utilisateurs, groupes ou équipes dynamiques xMatters à notifier. Les noms contenant des espaces fonctionnent. Vous pouvez aussi les passer avec `?to=` ou `?recipients=`, séparés par des virgules. |

\*Utilisez soit une **apikey**, soit un **user** et un **password**.

Le titre devient le résumé de l'alerte et le corps devient le message de l'alerte. Sans titre, le début du corps sert de résumé. Le déclencheur webhook n'accepte pas de pièces jointes.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Déclencher une alerte xMatters pour une personne :

```bash
# Supposons que notre {apikey} soit ffcd4dec-8a49-4a67-9e59-ed9fabcb002d
# Supposons que notre {host} soit acmeco.xmatters.com
# Supposons que notre {integration_id} soit ba601cb1-3513-4320-b48a-05cb501bb5af
apprise -vv -t "Espace disque faible" -b "Seulement 2 % libre sur /var" \
   "xmatters://ffcd4dec-8a49-4a67-9e59-ed9fabcb002d@acmeco/ba601cb1-3513-4320-b48a-05cb501bb5af/jdoe"
```

Utiliser l'URL du déclencheur telle que copiée depuis xMatters :

```bash
apprise -vv -t "Espace disque faible" -b "Seulement 2 % libre sur /var" \
   "https://acmeco.xmatters.com/api/integration/1/functions/ba601cb1-3513-4320-b48a-05cb501bb5af/triggers?apiKey=ffcd4dec-8a49-4a67-9e59-ed9fabcb002d&recipients=jdoe"
```

Notifier une personne et un groupe avec Basic Authentication :

```bash
apprise -vv -t "Échec de la sauvegarde" -b "La sauvegarde nocturne ne s'est pas terminée" \
   "xmatters://jdoe:mypassword@acmeco/ba601cb1-3513-4320-b48a-05cb501bb5af/jdoe/Database%20Admins"
```
