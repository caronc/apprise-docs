---
title: "Syslog Notifications"
description: "Send Syslog notifications."
sidebar:
  label: "Syslog"

source: https://tools.ietf.org/html/rfc5424

schemas:
  - syslog: insecure

has_sms: true

sample_urls:
  - syslog://
  - syslog://{facility}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Syntax

Valid syntax is as follows:

- `syslog://`
- `syslog://{facility}`

One might change the facility from its default like so:

- `syslog://local5`

## Parameter Breakdown

| Variable | Required | Description |
| -------- | -------- | ----------- |

is used by default.
| facility | No | The facility to use, by default it is `user`. Valid options are **kern**, **user**, **mail**, **daemon**, **auth**, **syslog**, **lpr**, **news**, **uucp**, **cron**, **local0**, **local1**, **local2**, **local3**, **local4**, **local5**, **local6**, and **local7**
| logperror | No | Additionally send the log message to _stderr_. This method is ignored when preforming a remote query.
| logpid | Yes | Include PID as part of the log output.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Syslog notification

```bash
# The following sends a syslog notification to the `user` facility
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   syslog://
```
