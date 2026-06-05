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

Growl exige que ce script preregistre les notifications qu'il envoie avant de pouvoir effectivement transmettre quoi que ce soit. Assurez-vous que votre configuration autorise bien l'enregistrement des applications.

## Syntaxe

La syntaxe valide est la suivante :

- `growl://{hostname}`
- `growl://{hostname}:{port}`
- `growl://{password}@{hostname}`
- `growl://{password}@{hostname}:{port}`
- `growl://{hostname}/?priority={priority}`

Selon la version de votre Apple OS, vous pouvez souhaiter activer la version legacy du protocole, v1.4, comme suit si vous rencontrez des problemes de reception d'icone avec la version 2, celle par defaut :

- `growl://{password}@{hostname}?version=1`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                     |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Hote sur lequel le serveur Growl ecoute.                                                                                                        |
| port     | Non         | Port sur lequel le serveur Growl ecoute. La valeur par defaut est **23053**. Vous n'aurez probablement jamais besoin de la changer.             |
| password | Non         | Mot de passe associe au serveur Growl si vous en avez configure un.                                                                             |
| version  | Non         | La version par defaut est 2, mais vous pouvez preciser l'attribut `?version=1` si vous avez besoin de la version 1.4 du protocole.              |
| priority | Non         | Peut etre **low**, **moderate**, **normal**, **high** ou **emergency** ; la valeur par defaut est **normal** si aucune priorite n'est precisee. |
| image    | Non         | Indique s'il faut inclure ou non une icone, une image, avec votre message. Par defaut, cette option est definie sur **yes**.                    |
| sticky   | Non         | Drapeau sticky de Growl ; par defaut, cette option est definie sur **no**.                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Growl a notre serveur

```bash
# Supposons que notre {hostname} soit growl.server.local
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   growl://growl.server.local
```

Certaines versions de Growl n'affichent pas correctement l'image ou l'icone ; vous pouvez aussi essayer ce qui suit pour voir si cela resout le probleme :

```bash
# Envoyer une notification Growl en utilisant une image binaire brute (au lieu d’une URL, en interne)
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   growl://growl.server.local?version=1
```
