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
  - apprises://{user}@{host}:{port}/{token}
  - apprises://{user}:{password}@{host}:{port}/{token}

has_attachments: true
has_selfhosted: true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Get yourself a self-hosted setup of the [Apprise-API](https://github.com/caronc/apprise-api) and use this service to integrate with it remotely.

## Syntax

Valid syntax is as follows:

- `apprise://{host}/{token}`
- `apprise://{host}:{port}/{token}`
- `apprise://{user}@{host}:{port}/{token}`
- `apprise://{user}:{password}@{host}:{port}/{token}`

For a secure connection, just use `apprises` instead.

- `apprises://{host}/{token}`
- `apprises://{host}:{port}/{token}`
- `apprises://{user}@{host}:{port}/{token}`
- `apprises://{user}:{password}@{host}:{port}/{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Web Server's hostname                                                                                                                 |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **apprise://** and **443** for all **apprises://** references. |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                         |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                         |
| tags     | No       | You can optional set the tags you want to supply with your call to the Apprise API server                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification along to an Apprise API server listening on port 80:

```bash
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token"
```

Here is another example where you can call your Apprise server based on Tags provided:

```bash
# Assuming our {hostname} is apprise.server.local
# Assuming our {token} is token
# Assuming we want to trigger any Notification associated with the {tag} email
apprise -vv --body="Test Message" \
   "apprise://apprise.server.local/token?tags=email"
```

You can also leverage the Logic of AND and OR when passing Tags:

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

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

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

**Note:** this service is a little redundant because you can already use the CLI and point its configuration to an existing Apprise API server (using the `--config` on the CLI or `AppriseConfig()` class via its own internal API).

```bash
# A simple example of the Apprise CLI using a Config file instead:
# pulling down previously stored configuration
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
# Assuming our {token} is apprise
apprise --body="test message" --config=http://localhost:8080/get/apprise
```
