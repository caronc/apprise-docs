---
title: Spécification OpenAPI
description: Spécification OpenAPI (Swagger) pour l'API Apprise.
sidebar:
  order: 3
---

L'API Apprise inclut une spécification OpenAPI 3 dans le fichier `swagger.yaml` à la racine du dépôt, [ici](https://github.com/caronc/apprise-api/blob/master/swagger.yaml).

## Exécuter Swagger UI

Pour le développement local ou l'exploration de l'API, vous pouvez lancer une instance autonome de Swagger UI qui lit le fichier de spécification sans modifier le fonctionnement de l'API Apprise principale.

### Via Docker Compose

Utilisez le fichier compose Swagger fourni dans le dépôt :

```bash
docker compose -f docker-compose.swagger.yml up -d
```

Accédez ensuite à : `http://localhost:8001`
