---
title: "Notifications PagerDuty"
description: "Envoyer des notifications PagerDuty."
sidebar:
  label: "PagerDuty"

source: https://www.pagerduty.com

schemas:
  - pagerduty

has_incident: true
has_image: true

sample_urls:
  - pagerduty://{integration_key}@{api_key}
  - pagerduty://{integration_key}@{api_key}/{source}
  - pagerduty://{integration_key}@{api_key}/{source}/{component}

limits:
  max_chars: 1024
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous devez disposer d'un compte chez [PagerDuty](https://www.pagerduty.com) et generer, ou recuperer, votre cle API.

Ensuite, vous pouvez definir une integration API V2.

## Syntaxe

La syntaxe valide est la suivante :

- `pagerduty://{integration_key}@{api_key}`
- `pagerduty://{integration_key}@{api_key}/{source}`
- `pagerduty://{integration_key}@{api_key}/{source}/{component}`

## Détail des Paramètres

| Variable        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integration_key | Oui         | Cette valeur vous est fournie sur la page de details de l'integration Events API V2. Elle peut aussi etre appelee Routing Key.                                                                                                                                                                                                                                                                                |
| api_key         | Oui         | Cle API associee a votre configuration.                                                                                                                                                                                                                                                                                                                                                                       |
| group           | Non         | Fournit un groupe, sous forme de chaine, dans la charge utile.                                                                                                                                                                                                                                                                                                                                                |
| class           | Non         | Fournit une classe, sous forme de chaine, dans la charge utile.                                                                                                                                                                                                                                                                                                                                               |
| region          | Non         | La valeur par defaut est **us**. Vous pouvez egalement la definir sur **eu**.                                                                                                                                                                                                                                                                                                                                 |
| source          | Non         | Fournit une source, sous forme de chaine, dans la charge utile ; la valeur par defaut est **Apprise** si rien n'est precise.                                                                                                                                                                                                                                                                                  |
| component       | Non         | Fournit un composant, sous forme de chaine, dans la charge utile ; la valeur par defaut est **Notification** si rien n'est precise.                                                                                                                                                                                                                                                                           |
| click           | Non         | Fournit une URL cliquable a associer a l'avis.                                                                                                                                                                                                                                                                                                                                                                |
| image           | Non         | Associe l'etat de la notification a une icone representative. Vous pouvez definir cette valeur sur `no` si vous ne souhaitez pas ce comportement.                                                                                                                                                                                                                                                             |
| severity        | Non         | Le niveau de gravite de la notification est normalement detecte automatiquement, mais si vous souhaitez toujours imposer un mode specifique, vous pouvez le faire via l'URL. Les valeurs possibles sont `info`, `warning`, `critical` et `error`.                                                                                                                                                             |
| action          | Non         | Ce qu'il faut faire de l'incident. Les valeurs possibles sont **trigger**, **map** et **resolve**. **trigger** déclenche toujours un incident. **map** résout l'incident quand le type de notification est `success` et en déclenche un pour tous les autres types. **resolve** le résout toujours. La valeur par défaut est **trigger**.                                                                     |
| dedup           | Non         | Une clé de déduplication. Les événements envoyés avec la même clé mettent à jour le même incident ouvert au lieu d'en créer un nouveau, et une résolution le ferme. Avec **map** ou **resolve** et sans clé, le titre (ou la première ligne du message s'il n'y a pas de titre) sert de clé : une notification `success` résout donc l'incident qu'une notification `failure` avec le même titre a déclenché. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un declenchement PagerDuty pour notre **source** `node01.local` et le **component** `drive_sda`

```bash

# Supposons que notre {integration_key} soit A1BRTD4JD
# Supposons que notre {api_key} soit TIiajkdnlazkcOXrIdevi7F
# Supposons que notre {source} soit node01.local
# Supposons que notre {component} soit drive_sda
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/node01.local/drive_sda/"
```

### Résoudre des incidents

Utilisez `action=map` pour déclencher un incident lors d'une notification `failure`, puis le résoudre plus tard en envoyant une notification `success` avec le même titre :

```bash
apprise -vv -n failure -t "Disque presque plein" -b "sda est à 95 %" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/node01.local/drive_sda/?action=map"

apprise -vv -n success -t "Disque presque plein" -b "sda est revenu à la normale" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/node01.local/drive_sda/?action=map"
```

Toujours résoudre l'incident avec une clé de déduplication fixe, quel que soit le type de notification :

```bash
apprise -vv -b "sda est revenu à la normale" \
   "pagerduty://A1BRTD4JD@TIiajkdnlazkcOXrIdevi7F/?dedup=sda-disk&action=resolve"
```

### Détails Personnalisés

Vous pouvez aussi fournir des details personnalises dans la charge utile. Pour cela, il suffit d'ajouter un symbole plus, **+**, devant n'importe quel parametre precise dans votre URL.

```bash
# L'exemple ci-dessous transmettrait dans `custom_details` de l'API
#    "disk_space_left": "145GB"
#
# Supposons que notre {integration_key} soit abc123
# Supposons que notre {api_key} soit 98754
# Supposons que notre {source} soit node01.local
# Supposons que notre {component} soit drive_sda
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pagerduty://abc123@98754/node01.local/drive_sda/?+disk_space_left=145GB"

# Pour plusieurs details, il suffit d'ajouter plus d'entrees :
# L'exemple ci-dessous definirait les details personnalises suivants :
#    "disk_space_left": "145GB"
#    "disk_space_total": "500GB"
#
# Supposons que notre {integration_key} soit abc123
# Supposons que notre {api_key} soit 98754
# Supposons que notre {source} soit node01.local
# Supposons que notre {component} soit drive_sda
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pagerduty://abc123@98754/node01.local/drive_sda/?+disk_space_left=145GB&+disk_space_total=500GB"
```
