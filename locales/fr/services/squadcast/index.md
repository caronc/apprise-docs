---
title: "Notifications Squadcast"
description: "Déclencher et résoudre des incidents Squadcast à l'aide d'un Incident Webhook."
sidebar:
  label: "Squadcast"

source: https://www.squadcast.com

schemas:
  - squadcast

has_incident: true

body_formats:
  - markdown

keywords: "SolarWinds Incident Response"

limits:
  max_chars: 30000

sample_urls:
  - squadcast://{webhook_key}
  - squadcast://{webhook_key}?region=eu
  - squadcast://{webhook_key}?action=resolve&dedup={key}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[Squadcast](https://www.squadcast.com) (désormais SolarWinds Incident Response) reçoit les notifications d'Apprise sous forme d'incidents, qui préviennent ensuite la personne d'astreinte pour le service.

1. Connectez-vous à Squadcast et ouvrez **Services**.
2. Choisissez l'équipe et le service à alerter, puis cliquez sur **Alert Sources**.
3. Recherchez **Incident Webhook** et copiez la Webhook URL. Elle ressemble à `https://api.squadcast.com/v2/incidents/api/7f550a9f4c44173a37664d938f1355f0f92a47a7`. La valeur à la fin est votre clé de webhook.

Vous pouvez aussi coller cette URL telle quelle dans Apprise. Les comptes hébergés en Europe reçoivent une URL commençant par `https://api.eu.squadcast.com` ; Apprise en déduit la région, ou vous pouvez ajouter `?region=eu` à une URL `squadcast://`.

## Syntaxe

La syntaxe valide est la suivante :

- `squadcast://{webhook_key}`
- `squadcast://{webhook_key}?region=eu`
- `squadcast://{webhook_key}?action=resolve&dedup={key}`
- `https://api.squadcast.com/v2/incidents/api/{webhook_key}`
- `https://api.eu.squadcast.com/v2/incidents/api/{webhook_key}`

## Détails des paramètres

| Variable    | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| webhook_key | Oui    | La valeur à la fin de l'URL de l'Incident Webhook fournie par Squadcast pour votre service.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| region      | Non    | L'endroit où votre compte Squadcast est hébergé. Les valeurs possibles sont **us** et **eu**. La valeur par défaut est **us**.                                                                                                                                                                                                                                                                                                                                                                                   |
| action      | Non    | Ce qu'il faut faire de l'incident. Les valeurs possibles sont **map**, **trigger** et **resolve**. **map** résout l'incident quand le type de notification est `success` et en déclenche un pour tous les autres types. **trigger** déclenche un nouvel incident à chaque fois, même si le titre se répète, et **resolve** le résout toujours. La valeur par défaut est **map**.                                                                                                                                 |
| dedup       | Non    | L'identifiant d'événement (event ID) que Squadcast utilise pour rattacher les notifications à un même incident. Une résolution ferme tous les incidents ayant le même identifiant. Sans cette valeur, **map** et **resolve** utilisent le titre (ou la première ligne du message s'il n'y a pas de titre) comme identifiant : une notification `success` résout donc l'incident qu'une notification `failure` avec le même titre a déclenché, tandis que **trigger** déclenche un nouvel incident à chaque fois. |
| priority    | Non    | La priorité de l'incident. Les valeurs possibles sont **P1**, **P2**, **P3**, **P4** et **P5** (un simple chiffre comme `2` fonctionne aussi). Si elle n'est pas définie, Squadcast laisse la priorité à **Unset**.                                                                                                                                                                                                                                                                                              |
| +key        | Non    | Ajoute une étiquette (tag) à l'incident, par exemple `+severity=high`.                                                                                                                                                                                                                                                                                                                                                                                                                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Déclencher un incident :

```bash
apprise -vv -t "Base de données en panne" -b "La base de données principale ne répond pas" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7?priority=P1"
```

Déclencher un incident, puis le résoudre plus tard en envoyant une notification `success` avec le même titre :

```bash
apprise -vv -n failure -t "Disque presque plein" -b "db01 utilise 95 % de son disque" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7?+service=database"

apprise -vv -n success -t "Disque presque plein" -b "db01 est revenu à la normale" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7"
```

Toujours résoudre l'incident avec un identifiant d'événement fixe, pour un compte hébergé en Europe, quel que soit le type de notification :

```bash
apprise -vv -t "Disque" -b "db01 est revenu à la normale" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7?region=eu&dedup=db01-disk&action=resolve"
```

Si vous n'indiquez pas de titre, votre message sert de titre à l'incident.
