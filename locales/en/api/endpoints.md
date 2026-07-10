---
title: API Endpoints
description: Compact reference of Apprise API endpoints.
sidebar:
  order: 4
---

This section details the available endpoints for the Apprise API.

## Health Checks

You can perform status or health checks on your server configuration.

| Path      | Method | Description                                                                                                          |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------- |
| `/status` | `GET`  | Returns a server status. The server HTTP response code is `200` if working correctly, or `417` if there is an issue. |

**Response Examples:**

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

## Stateless Notifications

Send notifications without using persistent storage.

| Path       | Method | Description                                                                                            |
| :--------- | :----- | :----------------------------------------------------------------------------------------------------- |
| `/notify/` | `POST` | Sends one or more notifications to the URLs identified in the payload or via `APPRISE_STATELESS_URLS`. |

**Payload Parameters:**

- `urls`: (Required) One or more URLs to send to.
- `body`: (Required) The message body.
- `title`: (Optional) The message title.
- `type`: (Optional) Message type: `info` (default), `success`, `warning`, `failure`.
- `format`: (Optional) Text format: `text`, `markdown`, `html`. If omitted entirely, no format is applied and content is passed through untouched (unless `APPRISE_DEFAULT_FORMAT` is set on the server). Sending `format` as blank or `null` also forces pass-through, even if `APPRISE_DEFAULT_FORMAT` is set -- it's treated as you deliberately asking for no formatting.
- `attach`: (Optional) One or more attachments. See [Attachments](#attachments) below.

## Attachments

The `/notify/` and `/notify/{KEY}` endpoints accept an optional `attach` field. You may mix the following forms within a single request.

### Binary file upload

When submitting the request as `multipart/form-data`, include the file directly in the `attach` field. The filename provided by the client is used as-is.

### HTTP/HTTPS URL string

Pass an `http://` or `https://` URL as a string. Apprise downloads the file at request time and derives the attachment filename automatically.

Filename resolution follows this priority order:

1. `?name=` query parameter — append it to the URL to force a specific name.
2. Filename from the URL path — extracted from the last path segment (e.g. `photo.jpg` from `/images/photo.jpg`).
3. Fallback — `attachment.001`, `attachment.002`, … when no name can be determined.

```text
# Filename resolved from URL path: photo.jpg
https://example.com/images/photo.jpg

# Filename resolved from URL path: abc123
https://example.com/thumbnails/abc123

# Filename forced via ?name=: thumbnail.jpg
https://example.com/thumbnails/abc123?name=thumbnail.jpg
```

An empty or whitespace-only `?name=` is treated as if the parameter were absent, so Apprise falls back to the URL path.

### JSON object

Pass an object with a `url` key and an optional `filename` key:

```json
{ "url": "https://example.com/thumbnails/abc123", "filename": "thumbnail.jpg" }
```

When `filename` is provided in the JSON object it takes the highest priority, overriding both the URL path and any `?name=` parameter.

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
