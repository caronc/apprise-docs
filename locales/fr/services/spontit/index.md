---
title: "Notifications Spontit"
description: "Envoyer des notifications Spontit."
sidebar:
  label: "Spontit"

source: https://spontit.com
schemas:
  - spontit

sample_urls:
  - spontit://{user}@{apikey}
  - spontit://{user}@{apikey}/{channel_id}
  - spontit://{user}@{apikey}/{channel_id1}/{channel_id2}/{channel_idN}/

limits:
  - max_chars: 5000

ended: 2022
---

:::note

## Raison de Fin de Service

Inconnue

💡Le service a ete retire d'Apprise dans [apprise/1226](https://github.com/caronc/apprise/issues/1226)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Visitez <https://spontit.com> pour creer votre compte.
2. Pour recuperer votre `{user}` : rendez-vous sur votre profil a <https://spontit.com/profile> et notez votre User ID. Il ressemblera a quelque chose comme `user12345678901`.
3. Pour recuperer votre `{apikey}` : generez une cle API sur <https://spontit.com/secret_keys>, si ce n'est pas deja fait.

## Syntaxe

Les canaux sont facultatifs ; si aucun canal n'est precise, vous serez simplement notifie personnellement.

La syntaxe valide est la suivante :

- `spontit://{user}@{apikey}`
- `spontit://{user}@{apikey}/{channel_id}`
- `spontit://{user}@{apikey}/{channel_id1}/{channel_id2}/{channel_idN}/`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                        |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| user       | Oui         | User ID associe a votre compte Spontit. Il peut etre trouve sur votre [page de profil Spontit](https://spontit.com/profile).                       |
| apikey     | Oui         | Cle API que vous avez generee pour votre compte Spontit. Elle peut etre trouvee, et generee si necessaire, [ici](https://spontit.com/secret_keys). |
| channel_id | Non         | Canal que vous souhaitez notifier et que vous avez cree vous-meme.                                                                                 |
| subtitle   | Non         | Sous-titre de votre push. Il n'apparait que sur les appareils iOS.                                                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Spontit a tous les appareils associes a un projet :

```bash
# Supposons :
#  - que notre {user} soit user28635710302
#  - que notre {apikey} soit a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   spontit://user28635710302@a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty

# Pour remplacer le sous-titre, sur iOS uniquement, faites comme suit :
# Vous devez utiliser des chaines encodees en URL, ci-dessous les espaces sont remplaces par %20
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   spontit://myuser@myapi?subtitle=A%20Different%20Subtitle
```
