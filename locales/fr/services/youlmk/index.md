---
title: "Notifications YouLMK"
description: "Envoyez des notifications vers votre boîte YouLMK : téléphone, navigateur, e-mail, Slack ou webhook, selon les règles définies pour chaque expéditeur."
sidebar:
  label: "YouLMK"

source: https://youlmk.com/

schemas:
  - youlmk

sample_urls:
  - youlmk://{token}
  - youlmk://{key}
  - youlmk://{token}?priority={priority}
  - youlmk://{token}?info={priority}&success={priority}&warning={priority}&failure={priority}
  - youlmk://{token}?url={link}&group={group}

has_image: true

limits:
  - name: "Titre"
    max_chars: 120
  - name: "Corps"
    max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[YouLMK](https://youlmk.com/) est une boîte de réception hébergée pour les notifications. Tout client HTTP peut y envoyer un message. Pour chaque expéditeur (une _source_), vous choisissez sa portée (Silencieux, Pastille, Bannière, Prioritaire), le respect des heures calmes et le regroupement des répétitions. Les notifications peuvent arriver sur votre téléphone, dans votre navigateur, par e-mail, dans Slack ou sur votre propre webhook.

1. Connectez-vous sur [youlmk.com](https://youlmk.com/) ou dans l'application, puis créez une source pour l'expéditeur (par exemple `apprise`). Chaque source possède sa propre clé et ses propres règles.
2. Ouvrez l'écran **Key** de la source. Il affiche deux identifiants utilisables ici :
   - le jeton bearer, `ylk_` suivi de 32 caractères
   - la clé d'URL, `k_` suivie de 14 caractères

L'essai comprend 10 notifications et 3 surveillances, sans carte bancaire ; ensuite, l'envoi coûte 4 $ par mois.

## Syntaxe

La syntaxe valide est la suivante :

- `https://youlmk.com/k/{key}`
- `youlmk://{token}`
- `youlmk://{key}`
- `youlmk://{token}?priority={priority}`
- `youlmk://{token}?info={priority}&success={priority}&warning={priority}&failure={priority}`
- `youlmk://{token}?url={link}&url_label={label}&group={group}`

La priorité peut être forcée pour toutes les notifications avec `?priority=`, ou définie par type de notification Apprise avec `?info=`, `?success=`, `?warning=` et `?failure=`. Si elle est omise, elle est déduite du type de notification :

| Type Apprise | Priorité YouLMK |
| ------------ | --------------- |
| `info`       | `normal`        |
| `success`    | `normal`        |
| `warning`    | `high`          |
| `failure`    | `high`          |

`critical` n'est jamais une valeur par défaut : cette priorité peut passer outre les heures calmes et le mode Focus lorsque la source l'autorise. Elle doit donc être choisie explicitement. La portée (Reach) de la source reste le plafond ; une priorité ne peut que descendre en dessous.

## Détail des Paramètres

| Variable                           | Obligatoire | Description                                                                                                                                              |
| ---------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token                              | \*Oui       | Jeton bearer de la source (`ylk_` et 32 caractères) ou clé d'URL (`k_` et 14 caractères). Il peut aussi être fourni avec `?token=`.                      |
| priority                           | Non         | Force cette priorité pour toutes les notifications : `low`, `normal`, `high` ou `critical`. Les formes abrégées fonctionnent aussi (par exemple `crit`). |
| info / success / warning / failure | Non         | Remplace la priorité de ce type de notification (valeurs par défaut : `normal` / `normal` / `high` / `high`). Ex. `?info=low&failure=critical`.          |
| url                                | Non         | Adresse derrière le bouton principal de la notification, par exemple l'exécution ou le journal concerné.                                                 |
| url_label                          | Non         | Libellé du bouton, limité à 24 caractères. YouLMK affiche **Open** lorsque ce champ est absent.                                                          |
| group                              | Non         | Les notifications du même groupe reçues en dix minutes sont regroupées sur une carte avec un compteur. Par défaut, le titre sert de groupe.              |
| image                              | Non         | Définissez `yes` pour remplacer l'icône de la source par l'image du type de notification Apprise. Valeur par défaut : `no`.                              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification :

```bash
apprise -vv -t "Sauvegarde terminée" -b "4,2 Go en 3 min 10 s" \
   "youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

La même chose avec la clé d'URL :

```bash
apprise -vv -t "Sauvegarde terminée" -b "4,2 Go en 3 min 10 s" \
   "youlmk://k_xxxxxxxxxxxxxx"
```

Rendre chaque échec critique, avec un lien vers le journal :

```bash
apprise -vv -n failure -t "Échec de la sauvegarde" -b "exit 2" \
   "youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical&url=https://example.com/logs/2041&url_label=Voir%20le%20journal"
```

Exemple de configuration YAML :

```yaml
urls:
  - youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical
  - youlmk://k_xxxxxxxxxxxxxx?priority=low&group=nightly&image=yes
```
