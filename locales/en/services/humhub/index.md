---
title: "HumHub Notifications"
description: "Send notifications to HumHub spaces as posts."
sidebar:
  label: "HumHub"

source: https://www.humhub.com/

schemas:
  - humhub: insecure
  - humhubs

has_selfhosted: true
has_attachments: true

limits:
  max_chars: 4000

sample_urls:
  - humhubs://{token}@{hostname}/{container_id}
  - humhubs://{user}:{password}@{hostname}/{container_id}
  - humhubs://{token}@{hostname}/{id1}/{id2}/{id3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

HumHub is a self-hosted social network for teams. To use this plugin you need a running HumHub instance with the [REST API module](https://marketplace.humhub.com/module/rest) installed and active.

### Bearer Token (Recommended)

1. Log in to your HumHub instance as an administrator.
2. Navigate to **Administration > Modules** and confirm the REST API module is enabled.
3. Go to **Administration > Authentication > REST API > Bearer Auth**.
4. Enable Bearer token authentication and generate a new token.
5. Copy the generated token -- this is your `{token}`.

### Basic Authentication

You can also authenticate with your HumHub username and password directly. No additional setup is required beyond having a valid HumHub account.

### Finding a Container ID

Each HumHub space has a numeric container ID. To find it:

1. Navigate to the space in your HumHub instance.
2. The ID appears in the space URL, for example `https://yourhost/s/my-space-42` -- the trailing number is the container ID.
3. Alternatively, query the REST API: `GET /api/v1/space` returns all spaces with their IDs.

## Syntax

Valid syntax is as follows:

- `humhubs://{token}@{hostname}/{container_id}`
- `humhubs://{user}:{password}@{hostname}/{container_id}`
- `humhubs://{token}@{hostname}/{id1}/{id2}/{id3}`
- `humhubs://{token}@{hostname}/?to={id1},{id2}`
- `humhubs://{token}@{hostname}:{port}/{container_id}`
- `humhub://{token}@{hostname}/{container_id}`

Use **humhubs://** for HTTPS connections (recommended) and **humhub://** for plain HTTP.

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                                        |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hostname     | \*Yes    | The hostname or IP address of your HumHub instance.                                                                                                                |
| token        | \*Yes    | A Bearer token generated in the HumHub admin panel (used when no password is provided).                                                                            |
| user         | \*Yes    | Your HumHub username (used together with `password` for Basic Authentication).                                                                                     |
| password     | No       | Your HumHub password. When provided, Basic Authentication is used instead of Bearer token authentication.                                                          |
| container_id | \*Yes    | The numeric ID of the HumHub space (container) to post to. Multiple IDs can be separated by `/` in the URL path, or provided as a comma-separated list via `?to=`. |
| to           | No       | An alias for `container_id`. Accepts a comma-separated list of container IDs, useful in YAML configuration files where path-based targets are not convenient.      |
| port         | No       | The port your HumHub instance listens on. Defaults to **80** for `humhub://` and **443** for `humhubs://`.                                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification using a Bearer token:

```bash
# Assuming your HumHub hostname is hub.example.com
# Assuming your Bearer token is mytoken123
# Assuming your container ID is 5
apprise -vv -t "Alert" -b "Something happened" \
    "humhubs://mytoken123@hub.example.com/5"
```

Send to multiple spaces in one URL:

```bash
apprise -vv -t "Alert" -b "Something happened" \
    "humhubs://mytoken123@hub.example.com/1/5/12"
```

Send using Basic Authentication:

```bash
apprise -vv -t "Alert" -b "Something happened" \
    "humhubs://admin:mypassword@hub.example.com/5"
```

Send over HTTP (insecure, for development or LAN use only):

```bash
apprise -vv -t "Alert" -b "Something happened" \
    "humhub://mytoken123@hub.local/5"
```
