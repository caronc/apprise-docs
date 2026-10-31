---
title: "Notifications FireHydrant"
description: "Ouvrir et résoudre des alertes FireHydrant Signals via une source d'événements webhook."
sidebar:
  label: "FireHydrant"

source: https://firehydrant.com

schemas:
  - firehydrant

has_incident: true
has_image: true

body_formats:
  - text

sample_urls:
  - firehydrant://{token}
  - firehydrant://{token}?priority=low&tags=service:api-gateway
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[FireHydrant](https://firehydrant.com) reçoit les notifications d'Apprise sous forme d'événements Signals. Vos règles d'alerte dans FireHydrant décident ensuite qui est prévenu.

1. Connectez-vous à FireHydrant et ouvrez **Signals** -> **Sources**.
2. Copiez l'URL du webhook générique. Elle ressemble à `https://signals.firehydrant.com/v1/process/eyJhbGciOiJIUzI1NiJ9...`. La longue valeur à la fin est votre jeton.

Pour contourner vos règles d'alerte et prévenir quelqu'un directement, ouvrez **Teams**, choisissez une équipe et allez dans son onglet **Alert Triggers**. Choisissez une équipe, une politique d'escalade, un planning d'astreinte ou un utilisateur dans la liste déroulante, puis copiez l'URL du webhook affichée à la place.

Vous pouvez coller l'une ou l'autre de ces URL telle quelle dans Apprise. Pour envoyer à plusieurs d'entre elles, ajoutez une URL Apprise pour chacune.

FireHydrant n'accepte pas les pièces jointes provenant d'autres services, Apprise ne les envoie donc pas.

## Syntaxe

La syntaxe valide est la suivante :

- `firehydrant://{token}`
- `firehydrant://{token}?action=resolve&dedup={key}`
- `https://signals.firehydrant.com/v1/process/{token}`

## Détails des paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui    | La longue valeur à la fin de l'URL de votre webhook FireHydrant.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| action   | Non    | Ce qu'il faut faire de l'alerte. Les valeurs possibles sont **map**, **trigger** et **resolve**. **map** résout l'alerte quand le type de notification est `success` et ouvre une alerte pour tous les autres types. **trigger** ouvre une nouvelle alerte à chaque fois, même si le titre se répète, et **resolve** la résout toujours. La valeur par défaut est **map**.                                                                                                       |
| level    | Non    | Le niveau de l'événement. Les valeurs possibles sont **info**, **warn**, **error** et **fatal**. Par défaut, il suit le type de notification : `info` et `success` envoient **info**, `warning` envoie **warn** et `failure` envoie **error**.                                                                                                                                                                                                                                   |
| priority | Non    | L'urgence avec laquelle les personnes sont prévenues. Les valeurs possibles sont **low**, **medium** et **high**. Si elle n'est pas définie, FireHydrant utilise **high**, sauf si une règle d'alerte indique autre chose.                                                                                                                                                                                                                                                       |
| dedup    | Non    | Une clé de déduplication. Les événements envoyés avec la même clé mettent à jour la même alerte ouverte au lieu d'en créer une nouvelle, et une résolution la ferme. Sans cette clé, **map** et **resolve** utilisent le titre (ou la première ligne du message s'il n'y a pas de titre) comme clé : une notification `success` résout donc l'alerte qu'une notification `failure` avec le même titre a ouverte, tandis que **trigger** ouvre une nouvelle alerte à chaque fois. |
| click    | Non    | Un lien vers l'endroit d'où provient l'alerte. FireHydrant l'affiche sur l'alerte.                                                                                                                                                                                                                                                                                                                                                                                               |
| tags     | Non    | Une liste d'étiquettes séparées par des virgules. Utilisez `service:{slug}` et `environment:{slug}` pour relier l'alerte aux éléments de votre catalogue de services FireHydrant.                                                                                                                                                                                                                                                                                                |
| image    | Non    | Envoie l'icône de notification d'Apprise avec l'alerte. La valeur par défaut est `yes`.                                                                                                                                                                                                                                                                                                                                                                                          |
| +key     | Non    | Ajoute une annotation à l'alerte, par exemple `+team=sre`. Vos règles d'alerte peuvent s'en servir.                                                                                                                                                                                                                                                                                                                                                                              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Ouvrir une alerte :

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123"
```

Ouvrir une alerte, puis la résoudre plus tard en envoyant une notification `success` avec le même titre :

```bash
apprise -vv -n failure -t "Disk almost full" -b "db01 is at 95% disk usage" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123?tags=service:database"

apprise -vv -n success -t "Disk almost full" -b "db01 is back to normal" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123"
```

Envoyer une alerte de faible priorité avec une annotation que vos règles d'alerte peuvent utiliser :

```bash
apprise -vv -t "Backup slow" -b "The nightly backup took 3 hours" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123?priority=low&+team=sre"
```

FireHydrant exige un résumé pour chaque alerte. Si vous ne donnez pas de titre, votre message sert de résumé.
