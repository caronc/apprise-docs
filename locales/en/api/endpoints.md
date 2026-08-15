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
    "stateful_enabled": true,
    "stateless_enabled": true,
    "degraded": false,
    "max_attachments": 6,
    "attach_size": 209715200,
    "status": {
      "persistent_storage": true,
      "can_write_config": true,
      "can_write_attach": true,
      "details": ["OK"]
    }
  }
  ```

  `degraded` is `true` only when both `stateful_enabled` and `stateless_enabled` are `false`. The server cannot accept notifications until an admin enables at least one mode.

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
- `format`: (Optional) Input format: `text`, `markdown`, or `html`. If omitted entirely, automatic format conversion is skipped unless the server sets `APPRISE_DEFAULT_FORMAT`. Sending it blank or `null` also forces pass-through, even over that server default. Message limits, overflow handling, and service-safe packaging still apply.
- `attach`: (Optional) One or more attachments. See [Attachments](#attachments) below.

Both notification endpoints can stream progress. Use `?stream=yes` or `Accept: text/event-stream`; see [Live Progress Streaming](/api/usage/#live-progress-streaming).

## Attachments

The `/notify/` and `/notify/{KEY}` endpoints accept an optional `attach` field. You may mix the following forms within a single request.

### Binary File Upload

When submitting the request as `multipart/form-data`, include the file directly in the `attach` field. The filename provided by the client is used as-is.

### HTTP/HTTPS URL String

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

### JSON Object

Pass an object with a `url` key and an optional `filename` key:

```json
{ "url": "https://example.com/thumbnails/abc123", "filename": "thumbnail.jpg" }
```

When `filename` is provided in the JSON object it takes the highest priority, overriding both the URL path and any `?name=` parameter.

## Persistent (Stateful) Endpoints

Manage and use saved configurations associated with a `{KEY}`.

| Path               | Method   | Description                                                                                                                      |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `/add/{KEY}`       | `POST`   | Saves a configuration. Payload: `urls`, `config`, `format`.                                                                      |
| `/del/{KEY}`       | `POST`   | Removes a configuration and its per-key authentication.                                                                          |
| `/get/{KEY}`       | `POST`   | Returns a configuration. Alias: `/cfg/{KEY}`.                                                                                    |
| `/notify/{KEY}`    | `POST`   | Sends through the saved configuration. Payload: `body` (required), `title`, `type`, `tag`, `format`.                             |
| `/json/urls/{KEY}` | `GET`    | Returns the URLs and tags saved for the key.                                                                                     |
| `/status/{KEY}`    | `GET`    | Returns server status after applying the key's authentication.                                                                   |
| `/auth/{KEY}`      | `POST`   | Sets or replaces Basic Auth. The first lock requires global credentials; later changes accept global or current key credentials. |
| `/auth/{KEY}`      | `DELETE` | Removes Basic Auth without removing the configuration.                                                                           |

These stateful endpoints also accept `X-Apprise-Config-ID`, such as `POST /get/` with `X-Apprise-Config-ID: mykey`. This keeps the key out of access logs. `/cfg` does not accept the header.

`/auth/{KEY}` requires global auth to remain configured. `APPRISE_CONFIG_LOCK` does not block per-key credential changes. See [Authentication and Access Control](/api/deployment/#authentication-and-access-control).

If the URL and header both contain a key, the header wins. An invalid header is rejected instead of falling back to the URL key. The web UI and Apprise Mobile continue to use URL-based keys.

## Observability

| Path       | Method | Description                                                                                     |
| :--------- | :----- | :---------------------------------------------------------------------------------------------- |
| `/details` | `GET`  | Retrieve a JSON object containing all supported Apprise URLs (send `Accept: application/json`). |
| `/metrics` | `GET`  | Prometheus endpoint for basic metrics collection.                                               |

## Response Codes

For a full list (including UI-only codes and common error responses), see [Response Codes](/api/reference/response-codes/).
