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

Exemple de configuration YAML :

```yaml
urls:
  - pushward://hlk_xxxxxxxxxxxx?level=time-sensitive
  - pushward://hlk_xxxxxxxxxxxx?info=passive&warning=time-sensitive&failure=critical
```
