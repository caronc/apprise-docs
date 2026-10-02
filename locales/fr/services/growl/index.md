---
title: "Notifications Growl"
description: "Envoyer des notifications Growl."
sidebar:
  label: "Growl"

source: http://growl.info/

schemas:
  - growl

has_local: true
has_image: true

sample_urls:
  - growl://{hostname}
  - growl://{hostname}:{port}
  - growl://{password}@{hostname}
  - growl://{password}@{hostname}:{port}
  - growl://{hostname}/?priority={priority}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Growl exige que ce script préenregistre les notifications qu'il envoie avant de pouvoir effectivement transmettre quoi que ce soit. Assurez-vous que votre configuration autorise bien l'enregistrement des applications.

## Syntaxe

La syntaxe valide est la suivante :

- `growl://{hostname}`
- `growl://{hostname}:{port}`
- `growl://{password}@{hostname}`
- `growl://{password}@{hostname}:{port}`
- `growl://{hostname}/?priority={priority}`

Selon la version de votre système Apple, vous pouvez activer l'ancienne version du protocole (v1.4) comme suit si vous rencontrez des problèmes de réception d'icône avec la version 2, utilisée par défaut :

- `growl://{password}@{hostname}?version=1`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                     |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Hôte sur lequel le serveur Growl écoute.                                                                                                        |
| port     | Non         | Port sur lequel le serveur Growl écoute. La valeur par défaut est **23053**. Vous n'aurez probablement jamais besoin de la changer.             |
| password | Non         | Mot de passe associé au serveur Growl si vous en avez configuré un.                                                                             |
| version  | Non         | La version par défaut est 2, mais vous pouvez préciser l'attribut `?version=1` si vous avez besoin de la version 1.4 du protocole.              |
| priority | Non         | Peut être **low**, **moderate**, **normal**, **high** ou **emergency** ; la valeur par défaut est **normal** si aucune priorité n'est précisée. |
| image    | Non         | Indique s'il faut inclure ou non une icône (image) avec votre message. Par défaut, cette option est définie sur **yes**.                        |
| sticky   | Non         | Option sticky de Growl ; par défaut, cette option est définie sur **no**.                                                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Growl à notre serveur :

```bash
# Supposons que notre {hostname} soit growl.server.local
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   growl://growl.server.local
```

Certaines versions de Growl n'affichent pas correctement l'image ou l'icône ; vous pouvez aussi essayer ce qui suit pour voir si cela résout le problème :

```bash
# Envoyer une notification Growl en utilisant une image binaire brute (au lieu d'une URL, en interne)
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   growl://growl.server.local?version=1
```
