---
title: Interface en ligne de commande
description: Envoyez des notifications directement depuis votre terminal avec la CLI Apprise.
sidebar:
  label: "Introduction"
  order: 1
---

La CLI Apprise (`apprise`) est un outil leger en ligne de commande qui vous permet d'envoyer des notifications vers pratiquement n'importe quel service directement depuis votre terminal. Elle est ideale pour les administrateurs systeme, les ingenieurs DevOps et les scripts d'automatisation.

## Installer la CLI

La commande `apprise` est incluse dans l'installation du coeur Apprise.

La plupart des utilisateurs l'installent via `pip install apprise`.

Les images Docker ciblent principalement **Apprise API**, meme si la CLI reste disponible dans le conteneur pour un usage operationnel.

Pour toutes les options d'installation, consultez [Installation](/getting-started/installation/).

## Utilisation de base

La syntaxe est volontairement intuitive. Il vous suffit de fournir les details de la notification et les URL de destination.

```bash
# Syntaxe generale
apprise -t "Title" -b "Body" "service-url://..."
```

### Envoyer une notification simple

Pour envoyer une notification, fournissez un titre (`-t`) et un corps (`-b`), suivis d'une ou plusieurs URL Apprise.

```bash
# Envoyer une notification vers Discord
apprise -t "Task Complete" -b "The backup finished successfully."     "discord://webhook_id/webhook_token"
```

### Chainer plusieurs services

Vous pouvez notifier plusieurs services a la fois en les listant a la suite. Par defaut, Apprise envoie les notifications de maniere asynchrone pour de meilleures performances.

Utilisez `--disable-async` pour envoyer les notifications de maniere synchrone, en traitant chaque service un par un dans leur ordre de chargement.

```bash
# Notifier Discord et Email simultanement
apprise -vv -t "Server Alert" -b "High CPU usage detected."    -n "warning"    "discord://webhook_id/webhook_token"    "mailto://user:pass@gmail.com"
```

:::tip
Ajouter `-v` (mode verbeux) est utile pour le debogage. Cela affiche l'etat de livraison et des informations de diagnostic dans la console. La verbosite augmente a chaque `v` supplementaire (par exemple `-vv`, `-vvv`).
:::

## Lecture depuis l'entree standard (`stdin`)

La CLI fonctionne naturellement avec l'entree standard (`stdin`). Si vous ne specifiez pas de corps (`-b`), Apprise lit ce qui arrive dans le pipe. C'est ideal pour surveiller des journaux ou capturer la sortie d'une commande.

```bash
# Envoyer le contenu d'un fichier
cat /proc/cpuinfo | apprise -t "CPU Info"    "mailto://user:pass@gmail.com"

# Envoyer le resultat d'une commande
uptime | apprise "discord://webhook_id/webhook_token"
```

## Charger une configuration

Bien que vous puissiez passer les URL directement a la commande, il est souvent plus propre d'utiliser un fichier de configuration. Cela garde les secrets hors de votre historique et facilite la gestion de groupes de notification complexes.

```bash
# Charger la configuration depuis un fichier et envoyer un message
apprise --config "/etc/apprise/config.yml"     --body "System is going down for maintenance"
```

Pour plus de details sur la structure des fichiers de configuration, consultez le guide [Configuration](/getting-started/configuration/).
