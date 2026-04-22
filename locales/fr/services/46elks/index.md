---
title: "Notifications 46elks"
description: "Envoyer des notifications 46elks."
sidebar:
  label: "46elks"

source: https://46elks.com/

schemas:
  - 46elks
  - elks

sample_urls:
  - 46elks://{user}:{password}@/{from}
  - 46elks://{user}:{password}@/{from}/{to}
  - 46elks://{user}:{password}@/{from}/{to1}/{to2}/{toN}

has_sms: true

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

46elks est un fournisseur SMS simple. Vous vous authentifiez avec votre nom d'utilisateur et votre mot de passe API 46elks, puis vous envoyez `to`, `message` et optionnellement `from`. Le plugin itère sur chaque destinataire cible et publie des charges utiles encodées en formulaire vers le point de terminaison API fixe.

1. Connectez-vous sur <https://46elks.com> et obtenez votre **nom d'utilisateur API** et votre **mot de passe**.
2. Choisissez facultativement un identifiant d'expéditeur **From**, soit un numéro E.164 soit un expéditeur alphanumérique approuvé.
3. Utilisez la forme URL `46elks://` dans Apprise pour envoyer des messages.

## Syntaxe

La syntaxe valide est la suivante (les alias `46elks://` et `elks://` sont acceptés) :

- `46elks://{user}:{password}@/{from}`
- `46elks://{user}:{password}@/{from}/{to}`
- `46elks://{user}:{password}@/{from}/{to1}/{to2}/{toN}`

## Détail des Paramètres

| Variable | Requis | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| user     | Oui    | Votre nom d'utilisateur API 46elks                                 |
| password | Oui    | Votre mot de passe API 46elks                                      |
| to       | Oui    | Numéro(s) de téléphone destinataire(s), format E.164 recommandé    |
| from     | Non    | Identifiant d'expéditeur ou numéro E.164, si configuré dans 46elks |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message simple :

```bash
# Assuming our {user} is user123
# Assuming our {password} is pass
# Assuming our {Source} is +15551234567
# Because no target is specified, we will notify ourseles
apprise -vv -t "Test" -b "Bonjour d'Apprise" \
  46elks://user123:pass@/+15551234567
```

Plusieurs destinataires et un identifiant d'expéditeur :

```bash
# Assuming our {user} is user
# Assuming our {password} is pass456
# Assuming our {Source} is Acme
# Assuming our target {PhoneNo} we wish to notify is
#     +15551234567 and +15551231234
apprise -vv -b "Statut: OK" \
  "46elks://user:pass456@/+15551234567/+15551231234?from=Acme"
```
