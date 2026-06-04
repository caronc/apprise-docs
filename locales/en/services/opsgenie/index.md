---
title: "Opsgenie Notifications"
description: "Send Opsgenie notifications."
sidebar:
  label: "Opsgenie"

source: https://www.opsgenie.com

schemas:
  - opsgenie

sample_urls:
  - opsgenie://{apikey}/
  - opsgenie://{apikey}/@{user}
  - opsgenie://{apikey}/*{schedule}
  - opsgenie://{apikey}/^{escalation}
  - opsgenie://{apikey}/#{team}

limits:
  max_chars: 15000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Visit [https://www.opsgenie.com](https://www.opsgenie.com) to create your account.
2. [Generate your Integration API Key](https://app.opsgenie.com/settings/integration/add/API/)

:::note
You must generate an Integration API Key; this is not to be confused with the Opsgenie Management API Key.
:::

:::caution
Opsgenie is being retired by Atlassian. Consider migrating to [Jira Service Management](../jira/) which provides the same functionality. See the [Atlassian migration guide](https://support.atlassian.com/jira-service-management-cloud/docs/merge-opsgenie-with-jira-service-management/) for details.
:::

## Syntax

Valid syntax is as follows:

- `opsgenie://{apikey}/`
- `opsgenie://{apikey}/@{user}`
- `opsgenie://{apikey}/@{user1}/@{user2}/@{userN}`
- `opsgenie://{apikey}/*{schedule}`
- `opsgenie://{apikey}/*{schedule1}/*{schedule2}/*{scheduleN}`
- `opsgenie://{apikey}/^{escalation}`
- `opsgenie://{apikey}/^{escalation1}/^{escalation2}/^{escalationN}`
- `opsgenie://{apikey}/#{team}`
- `opsgenie://{apikey}/#{team1}/#{team2}/#{teamN}`

:::note
If no prefix character is specified, then the target is presumed to be a user (an `@` symbol is presumed to be in front of it).
:::

You can also mix/match the targets:

- `opsgenie://{apikey}/@{user}/#{team}/*{schedule}/^{escalation}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                         |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Yes      | This is the API Key associated with your Opsgenie account.                                                                                                                                                          |
| user       | No       | The user you wish to notify; this can be a `username`, `email`, or `uuid4`. This is the assumed default target type to notify, but it is advised you prefix all users with a `@` symbol to eliminate any ambiguity. |
| team       | No       | The team you wish to notify; this can be the team name itself, or a `uuid4` associated with it. <br/>**Note:** Teams must be prefixed with a `#` symbol.                                                            |
| schedule   | No       | The schedule you wish to notify; this can be the schedule name itself, or a `uuid4` associated with it. <br/>**Note:** Schedules must be prefixed with a `*` symbol.                                                |
| escalation | No       | The escalation you wish to notify; this can be the escalation name itself, or a `uuid4` associated with it. <br/>**Note:** Escalations must be prefixed with a `^` symbol.                                          |
| region     | No       | The 2 character region code. By default this is set to `us` if not specified. Europeans must set this to `eu` to work correctly.                                                                                    |
| batch      | No       | Set it to **Yes** if you want all identified targets to be notified in batches (instead of individually). By default this is set to **No**.                                                                         |
| tags       | No       | A comma separated list of tags you can associate with your Opsgenie message                                                                                                                                         |
| priority   | No       | The priority to associate with the message. It is on a scale between 1 and 5. The default value is `3` if not specified.                                                                                            |
| alias      | No       | The alias to associate with the message.                                                                                                                                                                            |
| entity     | No       | The entity to associate with the message.                                                                                                                                                                           |
| action     | No       | The action to perform. See [Alert Actions](#alert-actions) below. By default this is set to `map`.                                                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Alert Actions

The `action` parameter controls what Opsgenie operation is performed when a notification is sent. The following actions are supported:

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

- `opsgenie://{apikey}/?:failure=new&:warning=new&:success=close&:info=note`

For example, to make `info` notifications create a new alert instead of adding a note:

```bash
apprise -vv -t "Test Title" -b "Test Body" \
   "opsgenie://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?:info=new"
```

## Examples

Send a Opsgenie notification to all devices associated with a project:

```bash
# Assuming our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   opsgenie://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
```

### Include Details (Key/Value Pairs)

Opsgenie allows you to provide details composed of key/value pairs you can set with messages. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

```bash
# Below would set the key/value pair of foo=bar:
# Assuming our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "opsgenie://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?+foo=bar"

# Multiple key/value pairs just require more entries:
# Below would set the key/value pairs of:
#    foo=bar
#    apprise=awesome
#
# Assuming our {apikey} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "opsgenie://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?+foo=bar&+apprise=awesome"
```
