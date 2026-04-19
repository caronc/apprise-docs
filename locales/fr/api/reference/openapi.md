---
title: Spécification OpenAPI
description: OpenAPI (Swagger) specification for API Apprise.
sidebar:
  order: 3
---

API Apprise includes an OpenAPI 3 specification in `swagger.yaml` at the root of the repository [here](https://github.com/caronc/apprise-api/blob/master/swagger.yaml)

## Running Swagger UI

For local development or API exploration, you can bring up a standalone Swagger UI that reads the specification file without changing how the main API Apprise runs.

### Via Docker Compose

Use the provided swagger compose file in the repository:

```bash
docker compose -f docker-compose.swagger.yml up -d
```

Then browse to: `http://localhost:8001`
