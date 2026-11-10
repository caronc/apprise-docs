---
title: "Notifications PushWard"
description: "Envoyer des notifications push sur votre iPhone via PushWard."
sidebar:
  label: "PushWard"

source: https://pushward.app/

schemas:
  - pushward

has_image: true

sample_urls:
  - pushward://{apikey}
  - pushward://{apikey}?level=critical&volume=0.8
  - pushward://{apikey}?ack=yes&repeat=120&expire=1800
  - pushward://{apikey}?snooze=15,60

limits:
  - name: "Titre"
    max_chars: 256
  - name: "Corps"
    max_chars: 3000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser ce plugin, vous devez disposer d'un compte [PushWard](https://pushward.app/) et d'une clé d'intégration.

1. Connectez-vous à l'application PushWard.
2. Ouvrez vos paramètres et copiez votre **clé d'intégration**. Elle commence toujours par le préfixe `hlk_`.

Cette clé unique est tout ce dont Apprise a besoin.

:::note
PushWard transmet une notification Apple Push unique. Apple limite la charge utile totale à 4 Ko, partagés entre le titre et le corps. Les messages très longs peuvent être fractionnés avec `?overflow=split`.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `pushward://{apikey}`
- `pushward://{apikey}?level={level}`
- `pushward://{apikey}?info={level}&success={level}&warning={level}&failure={level}`
- `pushward://{apikey}?ack=yes&repeat={seconds}&expire={seconds}`
- `pushward://{apikey}?snooze={minutes},{minutes}`

Le niveau peut être forcé globalement via `?level=`, ou ajusté individuellement pour chaque type Apprise avec `?info=`, `?success=`, `?warning=` et `?failure=`. S'il est omis, il est dérivé automatiquement du type de notification selon les correspondances par défaut suivantes :

| Type Apprise | Niveau PushWard  |
| ------------ | ---------------- |
| `info`       | `active`         |
| `success`    | `active`         |
| `warning`    | `time-sensitive` |
| `failure`    | `time-sensitive` |

## Détail des Paramètres

| Variable                           | Obligatoire | Description                                                                                                                                                                     |
| ---------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey                             | \*Oui       | Votre clé d'intégration PushWard (commence par `hlk_`). Peut aussi être fournie via l'argument `?apikey=`.                                                                      |
| level                              | Non         | Force ce niveau pour toutes les notifications : `passive`, `active`, `time-sensitive` ou `critical`. Les formes abrégées fonctionnent aussi (ex. `crit`).                       |
| info / success / warning / failure | Non         | Remplace le niveau utilisé pour ce type de notification (valeurs par défaut : `active` / `active` / `time-sensitive` / `time-sensitive`). Ex. `?info=passive&failure=critical`. |
| volume                             | Non         | Volume de l'alerte (`0.0`–`1.0`) ; appliqué uniquement quand le niveau résolu est `critical`.                                                                                   |
| ack                                | Non         | Définir sur `yes` pour répéter la notification jusqu'à ce que quelqu'un appuie sur **Acknowledge**. La valeur par défaut est `no`.                                              |
| repeat                             | Non         | Secondes entre les répétitions, de `30` à `3600`. La valeur par défaut est `60`. Utilisé uniquement avec `ack`.                                                                 |
| expire                             | Non         | Secondes avant l'arrêt des répétitions, de `60` à `10800`. La valeur par défaut est `3600`. Utilisé uniquement avec `ack`.                                                      |
| url                                | Non         | Lien ouvert lorsque l'on touche la notification, jusqu'à 2048 caractères.                                                                                                       |
| subtitle                           | Non         | Ligne affichée sous le titre, jusqu'à 256 caractères.                                                                                                                           |
| thread                             | Non         | Regroupe les notifications qui partagent la même valeur, jusqu'à 128 caractères.                                                                                                |
| collapse                           | Non         | Une notification ultérieure avec la même valeur remplace celle-ci, jusqu'à 64 caractères.                                                                                       |
| snooze                             | Non         | Ajoute jusqu'à 3 boutons de rappel, sous forme de durées différentes en minutes, de `1` à `1440`. Par exemple `?snooze=15,60`. Incompatible avec `ack`.                         |

:::note
Avec `ack=yes` :

- PushWard envoie au plus 50 répétitions, et un compte peut avoir jusqu'à 25 notifications qui se répètent en même temps.
- Une notification envoyée au niveau `passive` est livrée sans répétition, car PushWard ne l'autorise pas à ce niveau.
- `ack` ne peut pas être combiné avec `snooze`.

:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification :

```bash
apprise -vv -t "Alerte" -b "Un événement s'est produit." \
   "pushward://hlk_xxxxxxxxxxxx"
```

Envoyer une alerte critique à 80 % de volume :

```bash
apprise -vv -t "Serveur hors ligne" -b "La production est inaccessible." \
   "pushward://hlk_xxxxxxxxxxxx?level=critical&volume=0.8"
```

Associer différents types de notification Apprise à des niveaux PushWard distincts :

```bash
apprise -vv -t "Info" -b "Déploiement terminé." \
   "pushward://hlk_xxxxxxxxxxxx?info=passive&failure=critical"
```

Répéter une notification toutes les 2 minutes, pendant 30 minutes au maximum, jusqu'à ce que quelqu'un l'acquitte :

```bash
apprise -vv -t "Disque plein" -b "Il ne reste que 5 %." \
   "pushward://hlk_xxxxxxxxxxxx?ack=yes&repeat=120&expire=1800"
```

Proposer des boutons de rappel et regrouper les notifications :

```bash
apprise -vv -t "Sauvegarde terminée" -b "La sauvegarde nocturne est terminée." \
   "pushward://hlk_xxxxxxxxxxxx?snooze=15,60&thread=backups"
```

Exemple de configuration YAML :

```yaml
urls:
  - pushward://hlk_xxxxxxxxxxxx?level=time-sensitive
  - pushward://hlk_xxxxxxxxxxxx?info=passive&warning=time-sensitive&failure=critical
```
