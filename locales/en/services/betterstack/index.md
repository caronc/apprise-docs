---
title: "Better Stack Notifications"
description: "Raise Better Stack incidents or send entries to a Better Stack log source."
sidebar:
  label: "Better Stack"

source: https://betterstack.com

schemas:
  - betterstack

has_incident: true

body_formats:
  - text

sample_urls:
  - betterstack://{token}/{email}
  - betterstack://{token}/{email}/{team}
  - betterstack://{source_token}@{ingesting_host}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Better Stack](https://betterstack.com) receives Apprise notifications in two ways:

- **Incidents** raise an incident that alerts whoever is on-call.
- **Logs** add an entry to one of your log sources.

Apprise picks the mode from the URL you use.

### Incidents

1. Sign in to Better Stack and open [API tokens](https://betterstack.com/settings/api-tokens/0).
2. Select your team and copy (or create) a token in the **Uptime API tokens** section.
3. Copy the email address of the user who should appear as the person requesting the incident.

A [global API token](https://betterstack.com/settings/global-api-tokens) works across all of your teams. When you use one, name the team(s) that should receive the incident in the URL.

### Logs

1. Sign in to [Better Stack Telemetry](https://telemetry.betterstack.com/) and create (or open) a source of the type **HTTP**.
2. Copy the **Source token** and the **Ingesting host** shown for that source.

## Syntax

Valid syntax is as follows:

### Incident URLs

- `betterstack://{token}/{email}`
- `betterstack://{token}/{email}/{team}`
- `betterstack://{token}/{email}/{team1}/{team2}/{teamN}`

### Log URLs

- `betterstack://{source_token}@{ingesting_host}`

## Parameter Breakdown

| Variable       | Required          | Description                                                                                                                                                                                                                         |
| -------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token          | Yes               | Your Better Stack API token (incidents) or source token (logs).                                                                                                                                                                     |
| email          | Yes for incidents | The email address of a user on your Better Stack account. Better Stack shows this user as the person requesting the incident. You can also set it with `?from=`.                                                                    |
| team           | No                | The team that should receive the incident. Only needed with a global API token. Each team you list gets its own incident. You can also set teams with `?to=`.                                                                       |
| ingesting_host | Yes for logs      | The ingesting host shown on your log source, such as `s1234.eu-nbg-2.betterstackdata.com`.                                                                                                                                          |
| alert          | No                | How Better Stack alerts the on-call person. Use any of `call`, `sms`, `email`, `push` and `critical`, separated by commas. Methods you leave out are switched off. When this is not set, your team settings decide. Incidents only. |
| policy         | No                | The ID of the escalation policy to use. Incidents only.                                                                                                                                                                             |
| team_wait      | No                | How many seconds to wait before alerting the whole team. Incidents only.                                                                                                                                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Raise an incident:

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "betterstack://abc123def456/me@example.com"
```

Raise an incident for two teams using a global API token, and alert by phone call and SMS:

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "betterstack://abc123def456/me@example.com/Operations/Database%20Team?alert=call,sms"
```

Send a log entry:

```bash
apprise -vv -t "Backup" -b "Nightly backup finished" \
   "betterstack://srcToken123@s1234.eu-nbg-2.betterstackdata.com"
```

Log entries include the title (when given), the message, and a `level` based on the notification type (`info`, `warn` or `error`).
