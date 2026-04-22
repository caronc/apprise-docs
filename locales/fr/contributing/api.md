---
title: "API Apprise"
description: "Contribuer au dépôt de l'API Apprise"
sidebar:
  order: 3
---

## Contribuer à l'API Apprise

Merci pour votre intérêt à contribuer à l'API Apprise.

Ce dépôt correspond à l'application web et à la couche API qui encapsulent la bibliothèque principale d'Apprise. Les contributions sont bienvenues pour le code, les corrections de bugs, les améliorations d'interface, la documentation et l'outillage de déploiement.

## Récupérer depuis GitHub

```bash
git clone git@github.com:caronc/apprise-api.git
cd apprise-api
```

## Environnement de Développement

L'API Apprise prend en charge à la fois un workflow local (bare metal) et un workflow Docker Compose.

### Installation Directe

Démarrez le serveur de développement en mode debug :

```bash
tox -e runserver
# visiter : http://localhost:8000/
```

Vous pouvez aussi vous binder sur une autre adresse ou un autre port :

```bash
tox -e runserver -- "localhost:8080"
tox -e runserver -- "0.0.0.0:8080"
```

### Docker Compose pour le Développement

Un checkout fraîchement cloné peut être lancé avec Docker Compose, et le flux de développement monte votre arborescence source locale dans le conteneur afin que les changements soient visibles sans rebuild :

```bash
# Précréer les chemins que vous allez monter
mkdir -p attach config plugin

# Lancer la stack
PUID=$(id -u) PGID=$(id -g) docker compose up
```

## Assurance Qualité et Tests

Ce dépôt utilise `tox` afin de garder le linting, les tests et le formatage cohérents d'un environnement contributeur à l'autre :

```bash
# Lancer les tests unitaires
tox -e test

# Lint (appelle ruff en interne)
tox -e lint

# Formatage automatique
tox -e format
```

Vous pouvez également combiner les environnements :

```bash
tox -e test,lint
```

Si vous préférez exécuter les outils directement (une fois les dépendances de développement installées), le dépôt documente `pytest` et `ruff` comme équivalents manuels optionnels.

## Checklist Rapide Avant Soumission

- Votre changement inclut des tests lorsque c'est pertinent.
- `tox -e test` passe localement.
- `tox -e lint` passe localement.
- Vous avez exécuté `tox -e format` lorsque des changements de formatage étaient nécessaires.
- La description de votre pull request explique clairement ce qui a changé et pourquoi.

## Notes sur les Fichiers Docker Compose

- Pour le développement, `docker compose up` appliquera automatiquement le fichier d'override dans un checkout frais, et ce mode est conçu pour une itération en direct.
- Pour des déploiements de type production, préférez uniquement le fichier Compose de base afin d'exécuter l'image immuable et les assets statiques inclus.

## Licence et Attribution

L'API Apprise est publiée sous licence MIT.

Toutes les contributions doivent être compatibles avec cette licence, et les nouveaux fichiers doivent inclure les en-têtes appropriés lorsque cela est requis.
