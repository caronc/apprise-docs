---
title: Response Codes
description: HTTP status codes returned by Apprise API and what they mean.
sidebar:
  order: 2
---

Apprise API uses standard HTTP status codes. Many error responses return a short message as `text/plain`. If you request JSON (send `Accept: application/json`), error responses include an `error` field.

| Code  | Meaning                         | Where you will see it                                                                                                                                                                                                                                                |
| :---- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200` | OK                              | Request succeeded.                                                                                                                                                                                                                                                   |
| `204` | No Content                      | No configuration exists for the requested key, or a stateless notify request had no valid URLs to notify.                                                                                                                                                            |
| `302` | Found                           | The Web interface redirected the browser after login, logout, or configuration selection. API clients should not normally receive this response.                                                                                                                     |
| `400` | Bad Request                     | Invalid payload, unsupported `type` or `format`, invalid tag definition, invalid recursion header, or a payload field mapping rule (`:source=target`) could not be resolved (e.g. the dot-notation path was not found in the payload or exceeded the maximum depth). |
| `401` | Unauthorized                    | Global or per-key Basic Auth credentials were missing or invalid. The `WWW-Authenticate: Basic` header tells the client to request credentials.                                                                                                                      |
| `403` | Forbidden                       | The server setting or current access level denies the request. Examples include disabled stateful storage, a frozen configuration account, an unavailable `/cfg` list, or locked configuration content.                                                              |
| `404` | Not Found                       | The route or requested configuration does not exist. Strict mode also returns this for every route that Apprise does not recognize.                                                                                                                                  |
| `405` | Method Not Allowed              | The route exists but does not support the request method. The `Allow` header identifies its supported methods.                                                                                                                                                       |
| `406` | Not Acceptable                  | The recursion limit has been reached, or the request was rejected by a server rule.                                                                                                                                                                                  |
| `409` | Conflict                        | A configuration cannot be moved because the destination Config ID already exists.                                                                                                                                                                                    |
| `413` | Content Too Large               | Nginx rejected a request body larger than the route or server upload limit. Login and authentication routes have a smaller limit than notification uploads.                                                                                                          |
| `414` | URI Too Long                    | Nginx rejected a request target that was too long.                                                                                                                                                                                                                   |
| `417` | Expectation Failed              | Health check detected a blocking condition (for example, missing write permissions).                                                                                                                                                                                 |
| `421` | Misdirected Request             | API-only mode is enabled and a web UI page was requested.                                                                                                                                                                                                            |
| `424` | Failed Dependency               | At least one notification failed to send.                                                                                                                                                                                                                            |
| `429` | Too Many Requests               | Nginx temporarily rate-limited the request. Packaged deployments return `Retry-After: 60`; clients should use the shorter of a valid hint and their normal bounded delay, or their normal delay if the header is missing or invalid.                                 |
| `431` | Request Header Fields Too Large | The request exceeded the configured in-memory upload limit and Django rejected it.                                                                                                                                                                                   |
| `500` | Internal Server Error           | Server-side error saving or loading configuration, or an unexpected I/O error.                                                                                                                                                                                       |
| `502` | Bad Gateway                     | Nginx could not obtain a valid response from the application worker.                                                                                                                                                                                                 |
| `503` | Service Unavailable             | The application is temporarily unavailable, or all live-stream slots are busy. When the slots are busy, the response includes `Retry-After: 15`.                                                                                                                     |
| `504` | Gateway Timeout                 | The application worker did not respond before the proxy timeout.                                                                                                                                                                                                     |

:::note
Some error cases are endpoint-specific and may return either `text/plain` or JSON depending on `Accept`.
:::

:::note
Successful health and metrics probes are omitted from the packaged nginx access log. Their failures, including `417` and `429`, remain logged so monitoring and abuse detection still work.
:::

:::note
A [live progress stream](/api/usage/#live-progress-streaming) starts with HTTP `200`. Check its final `result` status instead of expecting a later HTTP `424`.
:::
