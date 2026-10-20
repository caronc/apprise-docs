---
title: "Notifications incident.io"
description: "Déclencher et résoudre des alertes incident.io à l'aide d'une source d'alertes HTTP."
sidebar:
  label: "incident.io"

source: https://incident.io

schemas:
  - incidentio

body_formats:
  - markdown

sample_urls:
  - incidentio://{source_id}/{token}
  - incidentio://{source_id}/{token}?action=resolve&dedup={key}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[incident.io](https://incident.io) reçoit les notifications d'Apprise sous forme d'alertes. Une alerte peut ensuite prévenir la personne d'astreinte ou ouvrir un incident, selon les règles de routage d'alertes configurées dans incident.io.

1. Connectez-vous à incident.io, ouvrez **Alerts**, puis allez dans **Sources**.
2. Créez une nouvelle source d'alertes et choisissez **HTTP**.
3. incident.io vous affiche une URL et un jeton secret. L'URL ressemble à `https://api.incident.io/v2/alert_events/http/01GW2G3V0S59R238FAHPDS1R66`. L'identifiant à la fin est l'ID de votre source d'alertes.

Vous pouvez aussi coller cette URL telle quelle dans Apprise, à condition d'y ajouter votre jeton avec `?token=`.

## Syntaxe

La syntaxe valide est la suivante :

- `incidentio://{source_id}/{token}`
- `incidentio://{source_id}/{token}?action=resolve&dedup={key}`
- `https://api.incident.io/v2/alert_events/http/{source_id}?token={token}`

## Détails des paramètres

| Variable  | Requis | Description                                                                                                                                                                                                                                                                                                                             |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| source_id | Oui    | L'identifiant à la fin de l'URL fournie par incident.io pour votre source d'alertes HTTP.                                                                                                                                                                                                                                               |
| token     | Oui    | Le jeton secret fourni par incident.io pour votre source d'alertes HTTP.                                                                                                                                                                                                                                                                |
| action    | Non    | Ce qu'il faut faire de l'alerte. Les valeurs possibles sont **map**, **trigger** et **resolve**. **map** résout l'alerte quand le type de notification est `success` et déclenche une alerte pour tous les autres types. **trigger** déclenche toujours une alerte et **resolve** la résout toujours. La valeur par défaut est **map**. |
| dedup     | Non    | Une clé de déduplication. Les alertes envoyées avec la même clé mettent à jour la même alerte ouverte au lieu d'en créer une nouvelle, et une résolution la ferme. Sans cette clé, le titre sert de clé : une notification `success` résout donc l'alerte qu'une notification `failure` avec le même titre a déclenchée.                |
| click     | Non    | Un lien vers l'endroit d'où provient l'alerte. incident.io l'affiche sur l'alerte.                                                                                                                                                                                                                                                      |
| +key      | Non    | Ajoute des détails à l'alerte, par exemple `+service=web`. Votre source d'alertes doit être configurée pour lire ces détails avant qu'incident.io ne les utilise.                                                                                                                                                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Déclencher une alerte :

```bash
apprise -vv -t "Base de données en panne" -b "La base de données principale ne répond pas" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken"
```

Déclencher une alerte, puis la résoudre plus tard en envoyant une notification `success` avec le même titre :

```bash
apprise -vv -n failure -t "Disque presque plein" -b "db01 utilise 95 % de son disque" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken?+service=database"

apprise -vv -n success -t "Disque presque plein" -b "db01 est revenu à la normale" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken"
```

Toujours résoudre l'alerte avec une clé de déduplication fixe, quel que soit le type de notification :

```bash
apprise -vv -t "Disque" -b "db01 est revenu à la normale" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken?dedup=db01-disk&action=resolve"
```

incident.io exige un titre pour chaque alerte. Si vous n'en indiquez pas, votre message sert de titre.
