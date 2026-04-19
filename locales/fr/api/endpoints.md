---
title: Points de Terminaison de l'API
description: Compact reference of API Apprise endpoints.
sidebar:
  order: 4
---

This section details the available endpoints for the API Apprise.

## Health Checks

You can perform status or health checks on your server configuration.

| Path      | Method | Description                                                                                                          |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------- |
| `/status` | `GET`  | Returns a server status. The server HTTP response code is `200` if working correctly, or `417` if there is an issue. |

**Response Exemples:**

- **Text**: `OK` (if healthy) or `ATTACH_PERMISSION_ISSUE`, `CONFIG_PERMISSION_ISSUE`.
- **JSON**:

  ```json
  {
    "attach_lock": false,
    "config_lock": false,
    "status": {
      "persistent_storage": true,
      "can_write_config": true,
      "can_write_attach": true,
      "details": ["OK"]
    }
  }
  ```

## Notifications sans etat

Envoyer notifications without using persistent storage.

| Path       | Method | Description                                                                                            |
| :--------- | :----- | :----------------------------------------------------------------------------------------------------- |
| `/notify/` | `POST` | Sends one or more notifications to the URLs identified in the payload or via `APPRISE_STATELESS_URLS`. |

**Payload Parameters:**

- `urls`: (Required) One or more URLs to send to.
- `body`: (Required) The message body.
- `title`: (Optional) The message title.
- `type`: (Optional) Message type: `info` (default), `success`, `warning`, `failure`.
- `format`: (Optional) Text format: `text` (default), `markdown`, `html`.

## Persistent (Stateful) Endpoints

Manage and use saved configurations associated with a `{KEY}`.

| Path               | Method | Description                                                                                                             |
| :----------------- | :----- | :---------------------------------------------------------------------------------------------------------------------- |
| `/add/{KEY}`       | `POST` | Saves Apprise configuration to the persistent store. Payload: `urls`, `config`, `format`.                               |
| `/del/{KEY}`       | `POST` | Removes Apprise configuration from the persistent store.                                                                |
| `/get/{KEY}`       | `POST` | Returns the Apprise configuration. Alias: `/cfg/{KEY}` (web UI uses this).                                              |
| `/notify/{KEY}`    | `POST` | Sends notifications to endpoints associated with `{KEY}`. Payload: `body` (required), `title`, `type`, `tag`, `format`. |
| `/json/urls/{KEY}` | `GET`  | Returns a JSON object containing all URLs and tags associated with the key.                                             |

## Observability

| Path       | Method | Description                                                                                     |
| :--------- | :----- | :---------------------------------------------------------------------------------------------- |
| `/details` | `GET`  | Retrieve a JSON object containing all supported Apprise URLs (send `Accept: application/json`). |
| `/metrics` | `GET`  | Prometheus endpoint for basic metrics collection.                                               |

## Response codes

For a full list (including UI-only codes and common error responses), see [Response Codes](/api/reference/response-codes/).
