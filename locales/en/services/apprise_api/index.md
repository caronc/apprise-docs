---
title: "Apprise API Notifications"
description: "Send Apprise API notifications."
sidebar:
  label: "Apprise API"

source: https://github.com/caronc/apprise-api

schemas:
  - apprise: insecure
  - apprises

sample_urls:
  - apprises://{host}/{token}
  - apprises://{host}:{port}/{token}
  - apprises://:{password}@{host}:{port}/{token}
  - apprises://{user}@{host}:{port}/{token}
  - apprises://{user}:{password}@{host}:{port}/{token}

body_formats:
  - text: default
  - html
  - markdown

has_attachments: true
has_selfhosted: true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Set up a self-hosted [Apprise API](https://github.com/caronc/apprise-api) instance, then use this service to send notifications to it.

## Syntax

Valid syntax is as follows:

- `apprise://{host}/{token}`
- `apprise://{host}:{port}/{token}`
- `apprise://:{password}@{host}:{port}/{token}`
- `apprise://{user}@{host}:{port}/{token}`
- `apprise://{user}:{password}@{host}:{port}/{token}`

For a secure connection, just use `apprises` instead.

- `apprises://{host}/{token}`
- `apprises://{host}:{port}/{token}`
- `apprises://:{password}@{host}:{port}/{token}`
- `apprises://{user}@{host}:{port}/{token}`
- `apprises://{user}:{password}@{host}:{port}/{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | Web server hostname                                                                                                               |
| port     | No       | Web server port. The default is **80** for **apprise://** and **443** for **apprises://**.                                        |
| user     | No       | Username used when the server requires HTTP Basic Auth.                                                                           |
| password | No       | Password used when the server requires HTTP Basic Auth.                                                                           |
| tags     | No       | Optional tags sent with the request.                                                                                              |
| version  | No       | Version `2` sends the token in `X-Apprise-Config-ID` and is the default. Version `1` keeps it in the HTTP path for older servers. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Version 2 is used unless `v=1` is specified. The token remains part of the `apprise://` plugin URL, but version 2 sends it to the server in a header instead of the HTTP request path. Use version 1 when connecting to an older Apprise API server:

```bash
apprise --body="Test Message" \
   "apprise://apprise.server.local/token?v=1"
```

### Without Authentication

Send a notification along to an Apprise API server listening on port 80:

```bash
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token"
```

### With Authentication

Place the saved username and password before the hostname. A password-only administrator login starts with a colon. Version 2 sends the configuration key in `X-Apprise-Config-ID` automatically.

```bash
# Configuration login with a username and password
apprise -vv --body="Test Message" \
   "apprises://user:password@apprise.server.local/token"

# Password-only administrator login
apprise -vv --body="Test Message" \
   "apprises://:password@apprise.server.local/token"
```

You can also select services by tag:

```bash
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
# Send to services associated with the {tag} email
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=email"
```

Tags support AND and OR expressions:

| `tags=` value    | Selected services                         |
| ---------------- | ----------------------------------------- |
| `TagA`           | Has `TagA`                                |
| `TagA TagB`      | Has `TagA` **AND** `TagB`                 |
| `TagA+TagB`      | Has `TagA` **AND** `TagB`                 |
| `TagA&TagB`      | Has `TagA` **AND** `TagB`                 |
| `TagA,TagB`      | Has `TagA` **OR** `TagB`                  |
| `TagA\|TagB`     | Has `TagA` **OR** `TagB`                  |
| `TagA TagC,TagB` | Has (`TagA` **AND** `TagC`) **OR** `TagB` |

```bash
# OR example
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=devops,finance"

# AND example
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=devops alerts"

# Mixed example: (comment AND create) OR admin
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=comment create,admin"
```

### Header Manipulation

Prefix a URL parameter with a plus sign (**+**) to send it as an HTTP header.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
# Assuming our {token} is apprise
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "apprise://localhost:8080/apprise/?+X-Token=abcdefg"

# Multiple headers just require more entries defined:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
# Assuming our {token} is apprise
# In this example we allow for a custom URL path to be defined
# in the event we're hosting our Apprise API here instead
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "apprise://localhost:8080/path/apprise/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

**Note:** The CLI `--config` option and the `AppriseConfig()` class can also load configuration from an Apprise API server.

```bash
# A simple example of the Apprise CLI using a Config file instead:
# pulling down previously stored configuration
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
# Assuming our {token} is apprise
apprise --body="test message" --config=http://localhost:8080/get/apprise

# Authenticated remote configuration
apprise --body="test message" \
   --config="http://user:password@localhost:8080/get/apprise"
```
