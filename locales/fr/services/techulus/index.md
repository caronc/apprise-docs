---
title: "Notifications Techulus Push"
description: "Envoyer des notifications Techulus Push."
sidebar:
  label: "Techulus Push"

source: https://push.techulus.com

schemas:
  - push

sample_urls:
  - push://{apikey}/

limits:
  max_chars: 1000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Pour utiliser ce plugin, vous devez d'abord telecharger l'application mobile puis vous inscrire depuis celle-ci :

- [Apple](https://itunes.apple.com/us/app/push-by-techulus/id1444391917?ls=1&mt=8)
- [Android](https://play.google.com/store/apps/details?id=com.techulus.push)

Une fois votre compte cree, vous pouvez recuperer votre cle API [ici](https://push.techulus.com/login.html).
Vous pouvez aussi recuperer directement la **{apikey}** depuis l'application mobile installee. Elle ressemblera a quelque chose comme :

- `b444a40f-3db9-4224-b489-9a514c41c009`

## Syntaxe

La syntaxe valide est la suivante :

- `push://{apikey}/`

## Détail des Paramètres

| Variable | Obligatoire | Description                                    |
| -------- | ----------- | ---------------------------------------------- |
| apikey   | Oui         | Cle API associee a votre compte Techulus Push. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Techulus Push :

```bash
# Supposons que notre {apikey} soit b444a40f-3db9-4224-b489-9a514c41c009
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   push:///b444a40f-3db9-4224-b489-9a514c41c009/
```
