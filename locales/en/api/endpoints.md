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

  `config_lock` is relative to the authenticated caller and is `false` for an
  administrator who can bypass the lock. `stateful_enabled` and
  `stateless_enabled` describe server-wide mode switches; they do not grant the
  current caller permission to use those modes.

## Stateless Notifications

Send notifications without using persistent storage.

| Path       | Method | Description                                                                                            |
| :--------- | :----- | :----------------------------------------------------------------------------------------------------- |
| `/notify/` | `POST` | Sends one or more notifications to the URLs identified in the payload or via `APPRISE_STATELESS_URLS`. |

**Payload Parameters:**

- `urls`: (Optional) One or more URLs to send to. When omitted, a request with an `X-Apprise-Config-ID` header sends through that saved configuration instead (only its untagged URLs unless a tag is given). Otherwise `APPRISE_STATELESS_URLS` is used.
- `body`: The message body. Required unless an attachment is sent.
- `title`: (Optional) The message title.
- `type`: (Optional) Message type: `info` (default), `success`, `warning`, `failure`.
- `format`: (Optional) Input format: `text`, `markdown`, or `html`. If omitted entirely, automatic format conversion is skipped unless the server sets `APPRISE_DEFAULT_FORMAT`. Sending it blank or `null` also forces pass-through, even over that server default. Message limits, overflow handling, and service-safe packaging still apply.
- `attach`: (Optional) One or more attachments. See [Attachments](#attachments) below.

Both notification endpoints can stream progress. Use `?stream=yes` or `Accept: text/event-stream`; see [Live Progress Streaming](/api/usage/#live-progress-streaming).

With authentication enabled, an administrator may call `/notify` directly. A configuration user must provide explicit `urls`, matching Basic Auth, and `X-Apprise-Config-ID`; the configuration must use `user` access. Without `urls`, the v2 header form remains a stateful send through the saved configuration.

When using `Content-Type: application/json`, the payload must be a JSON object.
Other valid JSON roots, such as arrays, strings, numbers, booleans, and `null`,
are rejected with HTTP `400`.

### Request Formats

`/notify/` and `/notify/{KEY}` read the request body according to its `Content-Type`:

| Content-Type                        | How the body is read                               |
| :---------------------------------- | :------------------------------------------------- |
| `application/json`                  | A JSON object holding the payload parameters above |
| `application/x-www-form-urlencoded` | Form fields with the same names                    |
| `multipart/form-data`               | Form fields, plus file uploads in `attach`         |
| `text/plain`                        | The whole body is the message, sent as text        |
| `text/html`                         | The whole body is the message, sent as HTML        |
| `text/markdown`                     | The whole body is the message, sent as Markdown    |
| Anything else, or none              | Read as form fields, as in earlier releases        |

A plain text body is decoded with the `charset` in its `Content-Type` (UTF-8 by default). `?format=` overrides the format its `Content-Type` sets. Payload mapping (`?:field=`) does not apply to a raw text body.

### Notification Headers

These headers work with every supported request format on both notification endpoints:

| Header               | Sets                                               | Example                |
| :------------------- | :------------------------------------------------- | :--------------------- |
| `X-Apprise-Title`    | The title                                          | `Deployment Status`    |
| `X-Apprise-Type`     | The type                                           | `success`              |
| `X-Apprise-Tag`      | The tag expression                                 | `devops, admin`        |
| `X-Apprise-Template` | Template values, as URL-encoded `name=value` pairs | `api_key=abc&room=ops` |

A header is used only when the payload leaves that field out, and it wins over the query string. See [Field Priority](/api/usage/#field-priority) for the full order, and [Examples](/api/usage/#examples) for each way of sending.

## Attachments

The `/notify/` and `/notify/{KEY}` endpoints accept an optional `attach` field. You may mix the following forms within a single request.

### Binary File Upload

When submitting the request as `multipart/form-data`, include the file directly in the `attach` field. The filename provided by the client is used as-is.

### HTTP/HTTPS URL String

Pass an `http://` or `https://` URL as a string. Apprise downloads the file at request time and derives the attachment filename automatically.

Filename resolution follows this priority order:

1. `?name=` query parameter: append it to the URL to force a specific name.
2. Filename from the URL path: extracted from the last path segment (e.g. `photo.jpg` from `/images/photo.jpg`).
3. Fallback: `attachment.001`, `attachment.002`, ... when no name can be determined.

```text
# Saved as photo.jpg (taken from the URL path)
https://example.com/images/photo.jpg

# Saved as abc123 (taken from the URL path)
https://example.com/thumbnails/abc123

# Saved as thumbnail.jpg (set by ?name=)
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

| Path               | Method   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/cfg`             | `GET`    | Lists saved Config IDs. The JSON format depends on whether authentication is enabled, as shown below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `/add/{KEY}`       | `POST`   | Saves a configuration. Payload: `urls`, `config`, `format`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `/del/{KEY}`       | `POST`   | Removes a configuration, in one of two ways. Called by an administrator, it removes the content and the configuration's login. Called with the configuration's own login, it only clears the content and keeps the login. Answers `204` with no body, whether or not there was anything to remove. Older releases answered a removal with `200`, so treat any `2xx` as success.                                                                                                                                                                                                                    |
| `/move/{KEY}`      | `POST`   | Moves a configuration to a new Config ID. Payload: `to` (required).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `/get/{KEY}`       | `POST`   | Returns a configuration. Alias: `/cfg/{KEY}`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `/notify/{KEY}`    | `POST`   | Sends through the saved configuration. Accepts the same [request formats](#request-formats) and [headers](#notification-headers) as `/notify/`, plus an optional `template` object (or `template[name]` form fields) for configurations using `${NAME}`. `locked` and `public` require a specific tag; `disabled` is administrator-only.                                                                                                                                                                                                                                                           |
| `/resolve/{KEY}`   | `POST`   | Checks Apprise URLs (`{"urls": ...}`, one string or a list of up to 100) and returns each one in order with its `service`, whether it is `valid` (with an `error` when not), its full `url` with every option written out, and its `privacy_url` with the secrets hidden, the same way `/json/urls?privacy=1` shows them, plus its `id` (the one `/json/urls` gives the same URL). Nothing is contacted. It works whatever the stateful and stateless modes are; on a `public` or `disabled` configuration only the administrator may use it. `/resolve` takes the key from `X-Apprise-Config-ID`. |
| `/attach/{KEY}`    | `POST`   | Downloads an attachment web address (`{"url": ...}`) the way a send would, to check it. Returns the file as `application/octet-stream`, with its type in `X-Apprise-Content-Type` and its name in `X-Apprise-Filename`. A failed download returns `424` with `logs` saying why, such as a `404`. The same attachment rules as `/notify` apply. A configuration must be saved under `{KEY}`.                                                                                                                                                                                                        |
| `/json/urls/{KEY}` | `GET`    | Returns saved URLs and tags. Each URL lists its template names. With `privacy=0`, each name carries its configuration default (or `null`). With `privacy=1`, URL secrets are hidden and every name is `null`. Server environment values are never returned. With `APPRISE_CONFIG_LOCK=yes`, global administrator credentials are required and every template name is `null`.                                                                                                                                                                                                                       |
| `/status/{KEY}`    | `GET`    | Returns status after authentication. `config_lock` reports whether this caller may view configuration content.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `/qr/{KEY}`        | `GET`    | Returns the password-safe `apprise://` or `apprises://` URL used to add the configuration to Apprise Mobile.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `/auth/{KEY}`      | `GET`    | Opens the browser editor, or returns the mode, `access`, and username as JSON. Passwords are never returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `/auth/{KEY}`      | `POST`   | Sets credentials and `access`. Administrators change access; configuration users change only their password.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `/auth/{KEY}`      | `DELETE` | Removes Basic Auth without removing the configuration. Global administrator credentials are required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

These stateful endpoints also accept `X-Apprise-Config-ID`. For example, send `POST /get/` with `X-Apprise-Config-ID: mykey`. This keeps the key out of the URL. `/cfg` does not accept the header.

The QR endpoint returns `url` and `uses_admin_credentials` as JSON. It may
include a username for the app to prefill, but never includes a saved password.
Use `/qr/@` for the configuration remembered by the current browser login, or
`/qr` with `X-Apprise-Config-ID` for API clients. When authentication is
enabled, administrator or configuration credentials are required; `public`
notification access does not make this endpoint public. Responses cannot be
cached.

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

`/move/{KEY}` moves a configuration to a free Config ID. Configuration users may move only their own key while locking is off. A `user` may also clear their own configuration; their credentials remain for the configured cleanup period so they can save a replacement. With `APPRISE_CONFIG_LOCK=yes`, only an authenticated administrator may move or delete entries.

When `APPRISE_CONFIG_LOCK=yes`, an authenticated administrator retains full configuration access. Other callers cannot add, retrieve, inspect, list, move, or delete configuration. New accounts default to `locked`, and saved `user` access behaves as `locked` without being rewritten. Saved `public` access remains public because it already hides configuration content.

If both the URL and header contain a key, the header wins. Invalid headers are rejected. The Web interface and Apprise Mobile may continue using URL-based keys.

## Reminders

Reminders are notifications saved now and sent later, once or on a repeating schedule. They need stateful mode and `APPRISE_REMINDER_ENABLED=yes`. When they are available, `/status` returns `reminders_enabled`, `scheduler_running` and `reminder_urls_max`. `reminders_enabled` says whether the caller may use reminders for the Config ID asked about (sent in `X-Apprise-Config-ID`): always for the administrator, and for the configuration's own login only while its access is `user`. Without a Config ID it is `true` for the administrator. `scheduler_running` says whether the scheduler that sends them is running. `reminder_urls_max` is the most `urls` a reminder can hold (`0` when it can hold none). When reminders are off, these fields are missing and these paths return `404`.

| Path                        | Method   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/reminders`                | `GET`    | Lists the reminders of every Config ID, each with its `key`, soonest first. The same rules as `/cfg` apply: simple stateful mode, `APPRISE_ADMIN`, and the administrator login when logins are required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `/reminder/{KEY}`           | `GET`    | Lists the configuration's reminders. Add `start` and `end` (UNIX timestamps) to also list each reminder's `occurrences` in that window (at most 200 each), for a calendar. A paused reminder lists none unless `disabled=show` is added. Add `privacy=yes` to show each reminder's own `urls` with their secrets hidden, the way `/json/urls` does. A reminder with `urls` also lists their `url_ids`, the IDs `/json/urls` gives the same URLs; a change can keep one of them by sending `@<id>` in `urls`, and a new reminder can name that way any URL this configuration's reminders already hold.                                                                                                                                                     |
| `/reminder/{KEY}`           | `POST`   | Adds a reminder. Payload: `body` (or an attachment) and `when` (required), plus `name` (defaults to the title, or the body's first line), `title`, `type`, `format`, `tag`, `template`, `urls`, `enabled`, `start`, `until`, `count` and `skip`. The message fields take the same names, aliases and defaults as `/notify`, and the `X-Apprise-*` headers, then `?title=`, `?type=`, `?format=` and `?tag=`, fill in what the payload leaves out. `title` holds up to 250 characters, `body` 32768, `tag` 1000 and a `cron` entry 255; `template` up to 256 values, `count` up to 1000000, and a saved reminder up to 256 KB. Answers like `/add`: the saved reminder for JSON callers, a short message otherwise, with its ID in `X-Apprise-Reminder-ID`. |
| `/reminder/{KEY}/{ID}`      | `GET`    | Returns one reminder. Add `privacy=yes` to show its own `urls` with their secrets hidden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `/reminder/{KEY}/{ID}`      | `PUT`    | Replaces a reminder's fields; any left out take their defaults.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `/reminder/{KEY}/{ID}`      | `PATCH`  | Changes only the fields sent; one sent as `null` goes back to its default. Send `{"enabled": false}` to pause a reminder, or `{"last": null}` to clear how its last send went (moving it to a new time also clears it).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `/reminder/{KEY}/{ID}`      | `DELETE` | Removes a reminder, and the one-offs that stand in for some of its times. Answers `204` with no body, like `/del`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `/reminder/{KEY}/{ID}/test` | `POST`   | Sends the reminder now without changing when it is next due, and answers the same way as `/notify`, with its log as text, HTML or JSON. Add `?stream=yes` or `Accept: text/event-stream` to watch each service's log live, as with `/notify`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `/reminder/{KEY}/preview`   | `GET`    | Lists the next times a reminder would be sent, as UNIX timestamps. Query: `at` (with `every`, `interval`, `months` and `days` to repeat), `cron` or `holiday` (with `country` and `region`), plus `tz`, `isc`, `drift`, `start`, `until`, `count` and `limit` (default `5`, at most `25`). A repeating reminder with nothing to send returns `400`, naming `until` when the end date is the cause; one whose end date has passed lists nothing instead. A rule that repeats more often than the caller may set returns `400` naming `when`, just as saving it would; pass `id` when changing a reminder, which may keep the times it already has.                                                                                                          |
| `/reminder/{KEY}/holidays`  | `GET`    | Without `country`, lists every country code with its regions. With `country` (and optional `region`), lists its public holidays over the next 12 months, or over `year`. Each has a `date`, the `name` a holiday reminder saves, and a `label` in the page language.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `/reminder/{KEY}/limits`    | `GET`    | Returns the limits and how much of each is used: `reminders`, `reminders_used`, `attach_size` and `attach_used`. A `rules` object lists what a reminder must follow, so an app can check one before saving it: `min_interval` (the fewest seconds apart the caller may set it to repeat, `0` for no limit), `drift_min` and `drift_max`, `holiday_last_year`, `timezone` (used when a reminder names none), `preview_max` and `urls_max` (the most Apprise URLs a reminder can hold, `0` when it can hold none).                                                                                                                                                                                                                                           |
| `/reminder/{KEY}/limits`    | `POST`   | Sets `reminders` (the most this configuration can hold) and `attach_size` (bytes of stored attachments in total, `0` to turn attachments off, web addresses included). `null` puts a limit back to its default. Administrator only. Limits apply to everyone but the administrator: the configuration's own user, or anyone when logins are off. Files the administrator adds still count, so the user may need to remove some before adding more.                                                                                                                                                                                                                                                                                                         |

```json
{
  "name": "Standup",
  "body": "Time to meet",
  "tag": "team",
  "when": { "tz": "America/Toronto", "cron": "0 0 9 * * Mon-Fri" }
}
```

Only `body` (or an attachment) and `when` are needed, such as `{"body": "Hi", "when": {"at": "2026-12-25 09:00"}}`. Every other field, including those inside `when`, may be left out or sent as `null` to take its default. An empty list, such as `"tag": []` or `"urls": []`, counts as left out.

`when` holds an IANA timezone (`tz`, defaulting to the server's) and one of:

- `at`: a local date and time, such as `2026-12-25T09:00:00`. Add `every` to repeat from it, such as `{"unit": "weeks", "interval": 2, "days": ["Mon", "Wed"]}`. `unit` is `seconds`, `minutes`, `hours`, `days`, `weeks`, `months` or `years`, and `interval` (default `1`) counts them from the start. `months` (`1` to `12`) and `days` (`Sun` to `Sat`) limit when it is sent; weeks without `days` repeat on the start date's weekday.
- `cron`: a repeating [dateblock](https://github.com/caronc/dateblock) cron that starts with seconds. Add `"isc": true` to use a 5-field crontab entry instead.
- `holiday`: a public holiday, sent every year it falls, such as `{"country": "CA", "region": "ON", "name": "Christmas Day"}`. `region` is optional. Take the country, region and holiday `name` from `/reminder/{KEY}/holidays`. Only the year and time of day of `start` are used: it is sent at that time (midnight without a start), from that year on, and the holiday sets the month and day. `start` may also be just `hh:mm` or `hh:mm:ss`, for example `"start": "09:00"`; it is saved on the holiday's next date. Add `"count": 1` to send it only once.

`when` may also hold `drift`: seconds (`-2147483647` to `2147483647`, the range [dateblock](https://github.com/caronc/dateblock) accepts) added to every time the schedule works out to. For example, `90` sends a 09:00 reminder at 09:01:30, and `-604800` sends it a week early. A drift longer than the gap between times still just moves each one later or earlier.

`start` and `until` are local dates and times, both optional. A repeating reminder's own times start from `start`, before any drift is added, so a holiday on its start date with a negative drift is still sent early; a start already passed changes nothing. Nothing is sent after `until`. `count` ends it after that many times, including times skipped as late and sends that failed. An `every` rule without `at` starts at `start`, or else at the start of the minute it is saved in. An `until` before the start is refused (for a holiday, before the start's year). A one-off whose time has passed, or a repeating reminder whose `until` has passed, is still saved, with `next` set to `null`, and is never sent.

Dates and times are `YYYY-MM-DD` followed by an optional `hh`, `hh:mm` or `hh:mm:ss`, joined by a space or `T`. A missing time is midnight. They are returned as `YYYY-MM-DDThh:mm:ss`.

Only the administrator can set a reminder to repeat more often than every `APPRISE_REMINDER_USER_MIN_INTERVAL` seconds. Others can still change one the administrator set to repeat more often, as long as it repeats no more often than before.

`skip` lists times (UNIX timestamps) a repeating reminder is not sent at. Times that have passed are dropped. To change just one time, add a one-off with `series` (the repeating reminder's `id`) and `occurrence` (the time it replaces). That time is then skipped by the repeating reminder, and stays skipped. A one-off later changed to repeat no longer stands in for that time and is kept when the series is removed; the series still skips the time.

`attach` (or `attachment` or `attachments`) takes the same attachments as `/notify`. Web addresses are checked when saved and downloaded each time the reminder is sent. To upload files, send `multipart/form-data` with the reminder as JSON in a `reminder` field and the files in `attach`. Stored files are listed as `{"file", "filename", "size"}`; send `{"file": "<name>"}` back to keep one when changing a reminder, or to reuse one that another reminder of the configuration stores, such as when copying it. Uploads count against the configuration's `attach_size` limit, and a file used by several reminders counts once. Files no reminder uses are removed by `prune` once they are an hour old.

A reminder is sent the same way as `/notify` and `/notify/{KEY}`:

- `tag` sends to the configuration's URLs it picks; without `tag` or `urls`, it sends to the configuration's untagged URLs.
- `urls` (one string or a list of Apprise URLs) sends to those URLs. With no `tag` key at all, they are sent to alone, the same as `/notify`.
- `tag` with `urls` sends to both. A `tag` of `null` or `[]` beside `urls` adds the configuration's untagged URLs, and is saved as `""`.

Each URL must be one the server can load, and a reminder can hold up to `APPRISE_REMINDER_URLS_MAX` of them; at `0`, reminders cannot be given new ones and the ones they already hold are not sent to. Stateless mode does not affect them. A reminder that would reach no service is refused. One sent to its own `urls` alone needs no saved configuration.

A saved reminder also has an `id`, `owner`, `runs`, `next` (a UNIX timestamp, or `null` when nothing is left to send), `last`, `created` and `updated`. `last.reason` is `late` when the reminder was overdue by more than `APPRISE_REMINDER_GRACE`, `access` when it was paused because its configuration is `disabled`, or `idle` when the configuration went unused for `APPRISE_REMINDER_IDLE_DAYS`. When that happens, the configuration's services are sent one notice saying so.

- The administrator may always list, add, change, test and remove reminders, whatever the configuration's access. The configuration's own user may only while its access is `user`; `locked`, `public` and `disabled` users cannot reach them. This is the rule `/status` reports as `reminders_enabled`, and the web interface shows no reminder tab, fields or buttons where it is `false`.
- Reminders of `user`, `locked` and `public` configurations are sent. A `disabled` configuration keeps its reminders, including new ones the administrator adds, but pauses them when they come due instead of sending them.
- Removing a configuration's login with `DELETE /auth/{KEY}` also removes the reminders its user added. Add `?keep_reminders=yes` to hand them to the administrator instead.
- Removing a configuration with `/del/{KEY}` also removes its reminders.
- Use `@` in place of `{KEY}` to take the key from `X-Apprise-Config-ID`, or else from the browser login, for example `DELETE /reminder/@/{ID}`. `/reminder` with the header also lists and adds reminders.

## Observability

| Path       | Method | Description                                                                                     |
| :--------- | :----- | :---------------------------------------------------------------------------------------------- |
| `/details` | `GET`  | Retrieve a JSON object containing all supported Apprise URLs (send `Accept: application/json`). |
| `/metrics` | `GET`  | Retrieve Prometheus metrics. Global credentials are required when authentication is enabled.    |

Packaged nginx deployments rate-limit frequent `/status` and `/metrics`
requests. A limited request returns `429` with `Retry-After: 60`.

## Response Codes

For a full list (including UI-only codes and common error responses), see [Response Codes](/api/reference/response-codes/).
