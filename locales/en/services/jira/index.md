---
title: "Jira Notifications"
description: "Send Jira notifications."
sidebar:
  label: "Jira"

source: https://atlassian.com/

schemas:
  - jira

sample_urls:
  - jira://{apikey}
  - jira://{apikey}/@{user}
  - jira://{apikey}/*{schedule}
  - jira://{apikey}/^{escalation}
  - jira://{apikey}/#{team}

limits:
  max_chars: 15000
---

<!-- SERVICE:DETAILS -->

## Account Setup

1. Visit <https://atlassian.com/> to create your account.
1. Generate your Integration API Key

## Syntax

Valid syntax is as follows:

- `jira://{apikey}/`
- `jira://{apikey}/@{user}`
- `jira://{apikey}/@{user1}/@{user2}/@{userN}`
- `jira://{apikey}/*{schedule}`
- `jira://{apikey}/*{schedule1}/*{schedule2}/*{scheduleN}`
- `jira://{apikey}/^{escalation}`
- `jira://{apikey}/^{escalation1}/^{escalation2}/^{escalationN}`
- `jira://{apikey}/#{team}`
- `jira://{apikey}/#{team1}/#{team2}/#{teamN}`

:::note
If no prefix character is specified, then the target is presumed to be a user (an `@` symbol is presumed to be in front of it).
:::

You can also mix/match the targets:

- `jira://{apikey}/@{user}/#{team}/*{schedule}/^{escalation}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                         |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Yes      | This is the API Key associated with your Jira account.                                                                                                                                                              |
| user       | No       | The user you wish to notify; this can be a `username`, `email`, or `uuid4`. This is the assumed default target type to notify, but it is advised you prefix all users with a `@` symbol to eliminate any ambiguity. |
| team       | No       | The team you wish to notify; this can be the team name itself, or a `uuid4` associated with it. <br>**Note:** Teams must be prefixed with a `#` symbol.                                                             |
| schedule   | No       | The schedule you wish to notify; this can be the schedule name itself, or a `uuid4` associated with it. <br>**Note:** Schedules must be prefixed with a `*` symbol.                                                 |
| escalation | No       | The escalation you wish to notify; this can be the escalation name itself, or a `uuid4` associated with it. <br>**Note:** Escalations must be prefixed with a `^` symbol.                                           |
| region     | No       | The 2 character region code. By default this is set to `us` if not specified. Europeans must set this to `eu` to work correctly.                                                                                    |
| batch      | No       | Set it to **Yes** if you want all identified targets to be notified in batches (instead of individually). By default this is set to **No**.                                                                         |
| tags       | No       | A comma separated list of tags you can associate with your Jira message                                                                                                                                             |
| priority   | No       | The priority to associate with the message. It is on a scale between 1 and 5. The default value is `3` if not specified.                                                                                            |
| alias      | No       | The alias to associate with the message.                                                                                                                                                                            |
| entity     | No       | The entity to associate with the message.                                                                                                                                                                           |
| action     | No       | The action to perform. See [Alert Actions](#alert-actions) below. By default this is set to `map`.                                                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Alert Actions

The `action` parameter controls what Jira operation is performed when a notification is sent. The following actions are supported:

| Action        | Description                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `map`         | **(default)** Automatically choose an action based on the Apprise notification type. See the table below. |
| `new`         | Always create a new alert, regardless of notification type.                                               |
| `close`       | Close a previously opened alert (requires a stored request ID from a prior `new` action).                 |
| `acknowledge` | Acknowledge a previously opened alert (requires a stored request ID from a prior `new` action).           |
| `note`        | Add a note to a previously opened alert (requires a stored request ID from a prior `new` action).         |
| `delete`      | Delete a previously opened alert (requires a stored request ID from a prior `new` action).                |

When `action=map` (the default), the following mapping is applied:

| Apprise Type | Default Action | Rationale                                           |
| ------------ | -------------- | --------------------------------------------------- |
| `failure`    | `new`          | Something went wrong — open a new alert.            |
| `warning`    | `new`          | Something may go wrong — open a new alert.          |
| `success`    | `close`        | Issue resolved — close the associated alert.        |
| `info`       | `note`         | Informational context — annotate an existing alert. |

:::note
Actions other than `new` require a stored request ID from a prior `new` notification with the same `entity`, `alias`, or title. Apprise caches these IDs automatically for up to 60 days.
:::

### Custom Action Mapping

You can override the default type-to-action mapping using `:key=value` URL parameters:

- `jira://{apikey}/?:failure=new&:warning=new&:success=close&:info=note`

For example, to make `info` notifications create a new alert instead of adding a note:

```bash
apprise -vv -t "Test Title" -b "Test Body" \
   "jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?:info=new"
```

## Examples

Send a Jira notification to all devices associated with a project:

```bash
# Assuming our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
```

### Include Details (Key/Value Pairs)

Jira allows you to provide details composed of key/value pairs you can set with messages. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

```bash
# Below would set the key/value pair of foo=bar:
# Assuming our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?+foo=bar"

# Multiple key/value pairs just require more entries:
# Below would set the key/value pairs of:
#    foo=bar
#    apprise=awesome
#
# Assuming our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?+foo=bar&+apprise=awesome"
```
