---
title: "Notifications OpsiMate"
description: "Déclenchez et résolvez des alertes sur un serveur OpsiMate auto-hébergé."
sidebar:
  label: "OpsiMate"

source: https://opsimate.dev

schemas:
  - opsimate: insecure
  - opsimates

has_incident: true
has_selfhosted: true

sample_urls:
  - opsimate://{apikey}@{hostname}
  - opsimate://{apikey}@{hostname}:{port}
  - opsimates://{apikey}@{hostname}/{path}
  - opsimates://{apikey}@{hostname}:{port}?action=trigger
  - opsimates://{apikey}@{hostname}:{port}?dedup={key}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

[OpsiMate](https://opsimate.dev) est une console d'exploitation auto-hébergée qui regroupe les alertes de vos outils de supervision dans une seule file. Apprise lui envoie des alertes via son [API Custom Alerts](https://docs.opsimate.dev/docs/integrations/custom-alerts) : tout ce qu'Apprise peut notifier peut donc apparaître sur votre tableau OpsiMate. Le projet est hébergé sur [GitHub](https://github.com/OpsiMate/OpsiMate).

1. Installez OpsiMate et notez le nom d'hôte et le port sur lesquels son serveur écoute.
2. Trouvez le jeton d'API (API token) de votre installation. Il s'agit du réglage `API_TOKEN` du serveur OpsiMate (`security.api_token` dans son fichier de configuration). Une installation par défaut est livrée avec le jeton `opsimate`.

Il n'y a aucun compte à créer ; le jeton d'API est tout ce dont Apprise a besoin.

## Syntaxe

La syntaxe valide est la suivante :

- `opsimate://{apikey}@{hostname}`
- `opsimate://{apikey}@{hostname}:{port}`
- `opsimate://{apikey}@{hostname}/{path}`
- `opsimates://{apikey}@{hostname}`
- `opsimates://{apikey}@{hostname}:{port}`
- `opsimates://{apikey}@{hostname}:{port}/{path}`
- `opsimates://{apikey}@{hostname}:{port}?action=trigger`
- `opsimates://{apikey}@{hostname}:{port}?dedup={key}`

Les connexions sécurisées (via https) doivent utiliser **opsimates://**, tandis que les connexions non sécurisées (via http) doivent utiliser **opsimate://**.

## Contenu des Alertes

Chaque notification déclenche ou résout une alerte :

- Le titre donne son nom à l'alerte. Sans titre, la première ligne du message est utilisée (coupée à 250 caractères).
- Le message devient le résumé de l'alerte.
- Le type de notification choisit la sévérité : `failure` donne **critical**, `warning` donne **warning**, et `info` ou `success` donnent **info**. Définissez `severity=` pour toujours utiliser une même sévérité.
- Un lien `click=` apparaît sur l'alerte comme son lien **Source** : vous accédez ainsi directement au tableau de bord ou à la vérification qui l'a déclenchée.
- Chaque alerte porte l'étiquette (tag) `source=apprise` (sauf si vous définissez votre propre `+source=`), ainsi que les étiquettes `+key=value` que vous ajoutez.

Chaque alerte porte aussi un identifiant. OpsiMate met à jour l'alerte qui a déjà le même identifiant au lieu d'en ajouter une nouvelle : une vérification qui se déclenche chaque minute garde donc une seule alerte ouverte au lieu d'une par minute. Sauf si vous définissez `dedup=`, l'identifiant est dérivé du nom de l'alerte, si bien que les notifications portant le même titre visent toujours la même alerte.

Par défaut, une notification `success` résout l'alerte au lieu de la déclencher. Un outil qui signale une panne par une notification `failure` et le retour à la normale par une notification `success` garde ainsi la vue des alertes actives d'OpsiMate propre de lui-même. Une alerte résolue conserve la sévérité avec laquelle elle a été déclenchée.

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                                                                                   |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui    | Le jeton d'API de votre serveur OpsiMate. Vous pouvez aussi le passer avec `apikey=` ou `token=` au lieu de le placer devant le nom d'hôte.                                                                                                                                                                                   |
| hostname | Oui    | Le serveur OpsiMate auquel vous envoyez vos alertes.                                                                                                                                                                                                                                                                          |
| port     | Non    | Le port sur lequel le serveur OpsiMate écoute. Par défaut, le port est **80** pour **opsimate://** et **443** pour toutes les références **opsimates://**.                                                                                                                                                                    |
| path     | Non    | Le chemin depuis lequel OpsiMate est servi, s'il se trouve derrière un proxy inverse sous un sous-chemin (par exemple `/opsimate/`). La valeur par défaut est `/`.                                                                                                                                                            |
| action   | Non    | Ce qu'il faut faire de l'alerte. Les valeurs possibles sont **map**, **trigger** et **resolve**. **map** résout l'alerte quand le type de notification est `success` et la déclenche pour tous les autres types. **trigger** déclenche toujours l'alerte et **resolve** la résout toujours. La valeur par défaut est **map**. |
| dedup    | Non    | Un identifiant d'alerte fixe. Chaque notification envoyée par cette URL déclenche ou résout alors cette seule alerte, quel que soit son titre. Sans cette valeur, l'identifiant est dérivé du nom de l'alerte.                                                                                                                |
| click    | Non    | Un lien ajouté à l'alerte, par exemple vers le tableau de bord ou la vérification qui l'a déclenchée. Il doit s'agir d'une URL complète comme `https://grafana.example.com/d/disk`.                                                                                                                                           |
| severity | Non    | Utilise toujours cette sévérité au lieu de celle choisie d'après le type de notification. Les valeurs possibles sont **info**, **warning** et **critical**.                                                                                                                                                                   |
| +key     | Non    | Ajoute une étiquette à l'alerte, par exemple `+env=prod`. Utilisez `+team=` pour définir l'équipe propriétaire de l'alerte. L'étiquette `source` vaut `apprise`, sauf si vous la définissez vous-même.                                                                                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Déclencher une alerte critique sur un serveur OpsiMate qui écoute sur le port 3001 :

```bash
# En supposant que notre {apikey} est opsimate (le jeton par défaut)
# En supposant que notre {hostname} est opsimate.local
apprise -vv -n failure -t "Disk full on web-01" -b "Disk usage at 98 percent" \
   "opsimate://opsimate@opsimate.local:3001"
```

Déclencher une alerte appartenant à une équipe, avec des étiquettes supplémentaires, via https :

```bash
apprise -vv -n warning -t "Disk filling on web-01" -b "Disk usage at 85 percent" \
   "opsimates://opsimate@opsimate.example.com?+team=platform&+env=prod&+host=web-01"
```

Déclencher une alerte, puis la résoudre plus tard en envoyant une notification `success` avec le même titre :

```bash
apprise -vv -n failure -t "Disk full on web-01" -b "Disk usage at 98 percent" \
   "opsimate://opsimate@opsimate.local:3001?+team=platform"

apprise -vv -n success -t "Disk full on web-01" -b "Disk usage back to 40 percent" \
   "opsimate://opsimate@opsimate.local:3001?+team=platform"
```

Toujours viser une même alerte avec un identifiant fixe, quel que soit le titre :

```bash
apprise -vv -n failure -t "Backup job" -b "Nightly backup did not finish" \
   "opsimate://opsimate@opsimate.local:3001?dedup=backup-nightly"
```

Toujours déclencher une alerte critique, avec un lien vers le tableau de bord qui l'a levée :

```bash
apprise -vv -t "Disk filling on web-01" -b "Disk usage at 85 percent" \
   "opsimate://opsimate@opsimate.local:3001?severity=critical&click=https://grafana.example.com/d/disk"
```

Les pièces jointes ne sont pas prises en charge ; l'API Custom Alerts n'a aucun champ pour les fichiers.
