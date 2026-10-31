---
title: "Notifications Better Stack"
description: "Créer des incidents Better Stack ou envoyer des entrées à une source de journaux Better Stack."
sidebar:
  label: "Better Stack"

source: https://betterstack.com

schemas:
  - betterstack

has_incident: true

body_formats:
  - text

sample_urls:
  - betterstack://{token}/{email}
  - betterstack://{token}/{email}/{team}
  - betterstack://{source_token}@{ingesting_host}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[Better Stack](https://betterstack.com) reçoit les notifications d'Apprise de deux façons :

- Le mode **Incidents** crée un incident qui alerte la personne d'astreinte.
- Le mode **Journaux** ajoute une entrée à une source de journaux.

Apprise choisit le mode selon l'URL utilisée.

### Incidents

1. Connectez-vous à Better Stack et ouvrez [API tokens](https://betterstack.com/settings/api-tokens/0).
2. Sélectionnez votre équipe et copiez (ou créez) un jeton dans la section **Uptime API tokens**.
3. Copiez l'adresse e-mail de la personne qui apparaîtra comme ayant demandé l'incident.

Un [jeton d'API global](https://betterstack.com/settings/global-api-tokens) fonctionne pour toutes vos équipes. Si vous en utilisez un, indiquez dans l'URL la ou les équipes qui doivent recevoir l'incident.

### Journaux

1. Connectez-vous à [Better Stack Telemetry](https://telemetry.betterstack.com/) et créez (ou ouvrez) une source de type **HTTP**.
2. Copiez le **Source token** et l'**Ingesting host** affichés pour cette source.

## Syntaxe

La syntaxe valide est la suivante :

### URL des incidents

- `betterstack://{token}/{email}`
- `betterstack://{token}/{email}/{team}`
- `betterstack://{token}/{email}/{team1}/{team2}/{teamN}`

### URL des journaux

- `betterstack://{source_token}@{ingesting_host}`

## Détails des paramètres

| Variable       | Requis             | Description                                                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token          | Oui                | Votre jeton d'API Better Stack (incidents) ou votre jeton de source (journaux).                                                                                                                                                                                                                                                                                              |
| email          | Oui pour incidents | L'adresse e-mail d'un utilisateur de votre compte Better Stack. Cet utilisateur apparaîtra comme ayant demandé l'incident. Vous pouvez aussi la définir avec `?from=`.                                                                                                                                                                                                       |
| team           | Non                | L'équipe qui doit recevoir l'incident. Nécessaire uniquement avec un jeton d'API global. Chaque équipe indiquée reçoit son propre incident. Vous pouvez aussi définir les équipes avec `?to=`.                                                                                                                                                                               |
| ingesting_host | Oui pour journaux  | L'hôte d'ingestion affiché pour votre source de journaux, par exemple `s1234.eu-nbg-2.betterstackdata.com`.                                                                                                                                                                                                                                                                  |
| alert          | Non                | La façon dont Better Stack alerte la personne d'astreinte. Utilisez une ou plusieurs valeurs parmi `call`, `sms`, `email`, `push` et `critical`, séparées par des virgules. Les méthodes non indiquées sont désactivées : `alert=,` désactive donc toutes les méthodes. Si ce paramètre est absent ou vide, les réglages de votre équipe s'appliquent. Incidents uniquement. |
| policy         | Non                | L'identifiant de la politique d'escalade à utiliser. Incidents uniquement.                                                                                                                                                                                                                                                                                                   |
| team_wait      | Non                | Le nombre de secondes à attendre avant d'alerter toute l'équipe. Incidents uniquement.                                                                                                                                                                                                                                                                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Créer un incident :

```bash
apprise -vv -t "Base de données indisponible" -b "La base de données principale ne répond pas" \
   "betterstack://abc123def456/me@example.com"
```

Créer un incident pour deux équipes avec un jeton d'API global, et alerter par appel téléphonique et SMS :

```bash
apprise -vv -t "Base de données indisponible" -b "La base de données principale ne répond pas" \
   "betterstack://abc123def456/me@example.com/Operations/Database%20Team?alert=call,sms"
```

Envoyer une entrée de journal :

```bash
apprise -vv -t "Sauvegarde" -b "La sauvegarde nocturne est terminée" \
   "betterstack://srcToken123@s1234.eu-nbg-2.betterstackdata.com"
```

Les entrées de journal contiennent le titre (s'il est fourni), le message et un `level` basé sur le type de notification (`info`, `warn` ou `error`).
