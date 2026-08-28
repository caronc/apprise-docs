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

With authentication enabled, an administrator may call `/notify` directly. A configuration user must provide explicit `urls`, matching Basic Auth, and `X-Apprise-Config-ID`; the configuration must use `user` access. Without `urls`, the v2 header form remains a stateful send through the saved configuration.

When using `Content-Type: application/json`, the payload must be a JSON object.
Other valid JSON roots, such as arrays, strings, numbers, booleans, and `null`,
are rejected with HTTP `400`.

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

All endpoints in this section are unavailable when `APPRISE_STATEFUL_MODE=disabled`.

| Path               | Method   | Description                                                                                                            |
| :----------------- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| `/cfg`             | `GET`    | Lists saved Config IDs. The JSON format depends on whether authentication is enabled, as shown below.                  |
| `/add/{KEY}`       | `POST`   | Saves a configuration. Payload: `urls`, `config`, `format`.                                                            |
| `/del/{KEY}`       | `POST`   | Removes a configuration and its per-key authentication.                                                                |
| `/move/{KEY}`      | `POST`   | Moves a configuration to a new Config ID. Payload: `to` (required).                                                    |
| `/get/{KEY}`       | `POST`   | Returns a configuration. Alias: `/cfg/{KEY}`.                                                                          |
| `/notify/{KEY}`    | `POST`   | Sends through the saved configuration. `locked` and `public` require a specific tag; `disabled` is administrator-only. |
| `/json/urls/{KEY}` | `GET`    | Returns saved URLs and tags. With `APPRISE_CONFIG_LOCK=yes`, global administrator credentials are required.            |
| `/status/{KEY}`    | `GET`    | Returns status after authentication. `config_lock` includes the key's effective access.                                |
| `/auth/{KEY}`      | `GET`    | Opens the browser editor, or returns mode, access, and username as JSON. Passwords are never returned.                 |
| `/auth/{KEY}`      | `POST`   | Sets credentials and `access`. Administrators change access; configuration users change only their password.           |
| `/auth/{KEY}`      | `DELETE` | Removes Basic Auth without removing the configuration. Global administrator credentials are required.                  |

These stateful endpoints also accept `X-Apprise-Config-ID`. For example, send `POST /get/` with `X-Apprise-Config-ID: mykey`. This keeps the key out of the URL. `/cfg` does not accept the header.

`GET /cfg` keeps the original v1 response when authentication is disabled:

```json
["alerts", "monitoring"]
```

When authentication is enabled, use the global administrator login. Each entry then includes its assigned username:

```json
[
  { "key": "alerts", "user": "alice", "access": "locked" },
  { "key": "monitoring", "user": null, "access": "public" }
]
```

An empty `user` means password-only access. `null` means that no configuration username is available. Configuration users cannot list every saved Config ID.

`access` accepts `user`, `locked`, `public`, or `disabled`. Public access applies only to stateful notification calls and requires a specific tag. Disabled access preserves the account but permits only the administrator. Only an administrator may send the `access` field. Configuration users may change their password, but must omit `access` entirely. See [Authentication and Access Control](/api/deployment/#authentication-and-access-control).

`/move/{KEY}` moves a configuration to a free Config ID. Configuration users may move only their own key while locking is off. A `user` may also clear their own configuration; their credentials remain for the configured prune grace period so they can save a replacement. With `APPRISE_CONFIG_LOCK=yes`, only an authenticated administrator may move or delete entries.

When `APPRISE_CONFIG_LOCK=yes`, an authenticated administrator retains full configuration access. Other callers cannot add, retrieve, inspect, list, move, or delete configuration. New accounts default to `locked`. An administrator may save `user` or `public`, but either behaves as `locked` until the global lock is removed. Saved access is not rewritten.

If both the URL and header contain a key, the header wins. Invalid headers are rejected. The Web interface and Apprise Mobile may continue using URL-based keys.

## Observability

| Path       | Method | Description                                                                                     |
| :--------- | :----- | :---------------------------------------------------------------------------------------------- |
| `/details` | `GET`  | Retrieve a JSON object containing all supported Apprise URLs (send `Accept: application/json`). |
| `/metrics` | `GET`  | Prometheus endpoint for basic metrics collection.                                               |

## Response Codes

For a full list (including UI-only codes and common error responses), see [Response Codes](/api/reference/response-codes/).
