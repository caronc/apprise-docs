---
title: "Voyant de notification Blink(1) USB LED"
description: "Faire clignoter une LED USB Blink(1) avec une couleur correspondant au type de notification."
sidebar:
  label: "Blink(1)"

source: https://blink1.thingm.com/

group: desktop

schemas:
  - blink1: insecure

has_local: true
has_selfhosted: true
has_image: false

sample_urls:
  - blink1://
  - blink1://ABCD1234/
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[Blink(1)](https://blink1.thingm.com/) est un petit voyant USB RGB de notification fabrique par ThingM. Branchez-le sur n'importe quel port USB et Apprise pourra le faire clignoter dans une couleur correspondant au type de notification :

| Type de Notification | Couleur |
| -------------------- | ------- |
| Info                 | Bleu    |
| Success              | Vert    |
| Warning              | Jaune   |
| Failure              | Rouge   |

Le plugin communique directement avec l'appareil via USB HID a l'aide du paquet Python [hidapi](https://pypi.org/project/hidapi/). Aucun service cloud, aucune API key et aucune connexion reseau ne sont necessaires.

:::note
Installez le paquet `hidapi` avant d'utiliser ce plugin :

```bash
pip install hidapi
```

:::

## Syntaxe

```text
blink1://
blink1://{serial}/
blink1://{serial}/?duration={ms}&fade={ms}&ledn={n}
```

Utilisez `blink1://`, ou `blink1://_/`, pour cibler le premier appareil connecte.
Fournissez le numero de serie de l'appareil dans la position de l'hote si vous souhaitez viser un appareil precis lorsque plusieurs Blink(1) sont branches.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                 |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| serial   | Non         | Numero de serie USB de l'appareil cible. Omettez cette valeur, ou utilisez `_`, pour viser le premier appareil disponible.                                  |
| duration | Non         | Duree, en millisecondes, pendant laquelle conserver la couleur de notification avant d'eteindre la LED. Valeur par defaut : `5000`. Plage : `0` a `300000`. |
| fade     | Non         | Duree de transition en fondu, en millisecondes. `0` signifie instantane. Valeur par defaut : `0`. Plage : `0` a `10000`.                                    |
| ledn     | Non         | LED a adresser : `0` pour toutes, par defaut, `1` pour la premiere LED uniquement, `2` pour la seconde LED uniquement, sur les appareils mk2.               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Faire clignoter le premier Blink(1) connecte avec les valeurs par defaut, bleu, instantane, 5 s :

```bash
apprise -vv -t "Deploy finished" -b "All checks passed." \
   blink1://
```

Cibler un appareil precis et utiliser un fondu de 250 ms avec un maintien de 2 secondes :

```bash
apprise -vv -n warning -b "Disk almost full." \
   "blink1://ABCD1234/?fade=250&duration=2000"
```

N'allumer que la deuxieme LED sur un appareil mk2 :

```bash
apprise -vv -n failure -b "Build failed." \
   "blink1://?ledn=2"
```
