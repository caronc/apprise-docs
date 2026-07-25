---
title: "Notifications Pinglet"
description: "Envoyer des notifications Pinglet vers un flux de sujet."
sidebar:
  label: "Pinglet"

source: https://pinglet.co.uk/

schemas:
  - pinglet: insecure
  - pinglets

has_selfhosted: true

sample_urls:
  - pinglets://{token}@{hostname}/{namespace}/{topic}
  - pinglets://{token}@{hostname}:{port}/{namespace}/{topic}

limits:
  - name: "Title"
    max_chars: 250
  - name: "Body"
    max_chars: 3000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Connectez-vous a votre compte [Pinglet](https://pinglet.co.uk/) (ou a votre instance auto-hebergee) et generez une cle API depuis la section compte/API.

Les notifications sont publiees sur un **sujet** (topic) au sein d'un **espace de noms** (namespace). Les deux sont crees automatiquement des la premiere publication, il n'y a donc rien a preparer au prealable dans le tableau de bord.

## Syntaxe

Les connexions securisees (via HTTPS) doivent utiliser **pinglets://**, tandis que les connexions non securisees (via HTTP) doivent utiliser **pinglet://**.

La syntaxe valide est la suivante :

- `pinglet://{token}@{hostname}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}:{port}/{namespace}/{topic}`
- `pinglets://{token}@{hostname}{path}{namespace}/{topic}`

Cette derniere forme concerne un serveur Pinglet auto-heberge place derriere un prefixe de chemin de proxy inverse, ou `{path}` est le point de montage (par exemple `/pinglet/`).

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                              |
| ---------- | ----------- | ------------------------------------------------------------------------ |
| token      | \*Oui       | Votre cle API Pinglet (peut aussi etre transmise via `?token=`)          |
| hostname   | \*Oui       | Le nom d'hote de votre serveur Pinglet                                   |
| port       | Non         | Le port sur lequel ecoute votre serveur Pinglet                          |
| namespace  | \*Oui       | L'espace de noms dans lequel se trouve le sujet                          |
| topic      | \*Oui       | Le sujet sur lequel publier                                              |
| priority   | Non         | Priorite de livraison : `silent`, `normal` (par defaut), ou `urgent`     |
| :key=value | Non         | Ajoute un badge (pastille) sur la carte de notification                  |
| +key=value | Non         | Ajoute une metadonnee affichee sur la fiche de detail de la notification |

:::note
Pinglet affiche au maximum 3 badges par notification. Les entrees `:key=value` au-dela de la troisieme sont ignorees, et toute cle de badge de plus de 24 caracteres ou valeur de plus de 32 caracteres est tronquee. Les cles de metadonnees (`+key=value`) sont tronquees a 64 caracteres et les valeurs a 256 caracteres.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une simple notification Pinglet :

```bash
# Supposons que notre {token} soit abc123
# Supposons que notre {hostname} soit app.pinglet.co.uk
apprise -vv -t "Deploiement Termine" -b "Build #482 deploye en production" \
   "pinglets://abc123@app.pinglet.co.uk/acme/deploys"
```

Envoyer avec une priorite, un badge et une metadonnee :

```bash
apprise -vv -t "Deploiement Termine" -b "Build #482 deploye en production" \
   "pinglets://abc123@app.pinglet.co.uk/acme/deploys?priority=urgent&:Host=web-1&+region=eu-west"
```

Envoyer vers une instance auto-hebergee montee derriere un prefixe de chemin de proxy inverse :

```bash
apprise -vv -t "Deploiement Termine" -b "Build #482 deploye en production" \
   "pinglet://abc123@myhost/prefix/acme/deploys"
```
