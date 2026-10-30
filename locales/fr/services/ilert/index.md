---
title: "Notifications ilert"
description: "Déclenchez, acceptez et résolvez des alertes ilert via une source d'alertes API."
sidebar:
  label: "ilert"

source: https://www.ilert.com

schemas:
  - ilert

has_incident: true
has_image: true

body_formats:
  - markdown

sample_urls:
  - ilert://{integration_key}
  - ilert://{integration_key}?priority=high
  - ilert://{integration_key}?action=resolve&dedup={key}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[ilert](https://www.ilert.com) reçoit les notifications d'Apprise sous forme d'alertes, qui préviennent ensuite la personne d'astreinte via la politique d'escalade de la source d'alertes.

1. Connectez-vous à ilert et ouvrez **Alert sources**.
2. Cliquez sur **Add a new alert source** et choisissez **API** comme type d'intégration.
3. Choisissez la politique d'escalade à prévenir, puis enregistrez.
4. Copiez la **clé d'intégration** (integration key) affichée sur la page de détails de la source d'alertes.

## Syntaxe

La syntaxe valide est la suivante :

- `ilert://{integration_key}`
- `ilert://{integration_key}?priority=high`
- `ilert://{integration_key}?action=resolve&dedup={key}`

## Détails des paramètres

| Variable        | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| integration_key | Oui    | La clé d'intégration de votre source d'alertes API ilert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| action          | Non    | Ce qu'il faut faire de l'alerte. Les valeurs possibles sont **map**, **trigger**, **acknowledge** et **resolve**. **map** résout l'alerte quand le type de notification est `success` et en déclenche une pour tous les autres types. **trigger** déclenche une nouvelle alerte à chaque fois, même si le titre se répète. **acknowledge** accepte l'alerte et **resolve** la résout toujours. La valeur par défaut est **map**.                                                                                                                                               |
| dedup           | Non    | La clé d'alerte (alert key) qu'ilert utilise pour rattacher les notifications à une même alerte. Tant qu'une alerte avec cette clé est ouverte, les nouvelles notifications y sont ajoutées au lieu d'en déclencher une autre. Sans cette valeur, **map**, **acknowledge** et **resolve** utilisent le titre (ou la première ligne du message s'il n'y a pas de titre) comme clé d'alerte : une notification `success` résout donc l'alerte qu'une notification `failure` avec le même titre a déclenchée, tandis que **trigger** déclenche une nouvelle alerte à chaque fois. |
| priority        | Non    | La priorité de l'alerte. Les valeurs possibles sont **high** et **low**. Si elle n'est pas définie, le réglage de priorité de la source d'alertes s'applique.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| route           | Non    | Une clé de routage (routing key) qui envoie les nouvelles alertes vers une autre politique d'escalade que celle de la source d'alertes.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| click           | Non    | Un lien à afficher sur l'alerte.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| image           | Non    | Affiche sur l'alerte une icône correspondant au type de notification. Mettez `no` si vous ne le souhaitez pas. La valeur par défaut est `yes`.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| +key            | Non    | Ajoute un libellé (label) à l'alerte, par exemple `+env=prod`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Déclencher une alerte de priorité haute :

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "ilert://il1api0123456789abcdef0123456789abcdef?priority=high"
```

Déclencher une alerte, puis la résoudre plus tard en envoyant une notification `success` avec le même titre :

```bash
apprise -vv -n failure -t "Disk almost full" -b "db01 is at 95% disk usage" \
   "ilert://il1api0123456789abcdef0123456789abcdef?+service=database"

apprise -vv -n success -t "Disk almost full" -b "db01 is back to normal" \
   "ilert://il1api0123456789abcdef0123456789abcdef"
```

Toujours résoudre l'alerte avec une clé d'alerte fixe, quel que soit le type de notification :

```bash
apprise -vv -t "Disk" -b "db01 is back to normal" \
   "ilert://il1api0123456789abcdef0123456789abcdef?dedup=db01-disk&action=resolve"
```

Si vous ne donnez pas de titre, votre message sert de résumé à l'alerte.
