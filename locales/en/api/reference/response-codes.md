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
| `400` | Bad Request                     | Invalid payload, unsupported `type` or `format`, invalid tag definition, invalid recursion header, or a payload field mapping rule (`:source=target`) could not be resolved (e.g. the dot-notation path was not found in the payload or exceeded the maximum depth). |
| `401` | Unauthorized                    | Global or per-key Basic Auth credentials were missing or invalid. The `WWW-Authenticate: Basic` header tells the client to request credentials.                                                                                                                      |
| `403` | Forbidden                       | The server is configured to deny the request regardless of credentials (for example, `APPRISE_CONFIG_LOCK=yes`, `/cfg` listing disabled, or `APPRISE_STATELESS_MODE=disabled`).                                                                                      |
| `405` | Method Not Allowed              | The request used an unsupported HTTP method for the endpoint.                                                                                                                                                                                                        |
| `406` | Not Acceptable                  | The recursion limit has been reached, or the request was rejected by a server rule.                                                                                                                                                                                  |
| `417` | Expectation Failed              | Health check detected a blocking condition (for example, missing write permissions).                                                                                                                                                                                 |
| `421` | Misdirected Request             | API-only mode is enabled and a web UI page was requested.                                                                                                                                                                                                            |
| `424` | Failed Dependency               | At least one notification failed to send.                                                                                                                                                                                                                            |
| `429` | Too Many Requests               | Too many recent Basic Auth failures for this client and key. Wait for the `Retry-After` value before retrying.                                                                                                                                                       |
| `431` | Request Header Fields Too Large | The request exceeded the configured in-memory upload limit and Django rejected it.                                                                                                                                                                                   |
| `500` | Internal Server Error           | Server-side error saving or loading configuration, or an unexpected I/O error.                                                                                                                                                                                       |

:::note
Some error cases are endpoint-specific and may return either `text/plain` or JSON depending on `Accept`.
:::

:::note
A [live progress stream](/api/usage/#live-progress-streaming) starts with HTTP `200`. Check its final `result` status instead of expecting a later HTTP `424`.
:::
