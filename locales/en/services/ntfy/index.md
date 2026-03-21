---
title: "Ntfy Notifications"
description: "Send Ntfy (Notify) notifications."
sidebar:
  label: "Ntfy"

source: https://ntfy.sh/

schemas:
  - ntfy: insecure
  - ntfys

has_attachments: true

sample_urls:
  - ntfy://{topic}
  - ntfy://{host}/{topic}
  - ntfy://{user}@{host}:{port}/{topics}
  - ntfy://{user}:{password}@{host}/{topics}
  - ntfy://{token}@{hostname}/{topics}
---

<!-- SERVICE:DETAILS -->

## Account Setup

[Ntfy](https://ntfy.sh/) is an easy to use messaging service that supports both
public cloud usage (`https://ntfy.sh`) and self-hosted private servers.

Apprise supports both insecure (`ntfy://`) and secure (`ntfys://`) schemas.

---

## Syntax

Ntfy can send notifications through the following **modes**:

- **private**: A locally hosted private server <https://github.com/binwiederhier/ntfy>
- **cloud**: A setup pointing to <https://ntfy.sh>

Valid syntax is as follows:

- `ntfy://{topic}`
- `ntfy://{host}/{topic}`
- `ntfy://{host}:{port}/{topics}`
- `ntfy://{user}@{host}/{topics}`
- `ntfy://{user}@{host}:{port}/{topics}`
- `ntfy://{user}:{password}@{host}/{topics}`
- `ntfy://{user}:{password}@{host}:{port}/{topics}`
- `ntfy://{token}@{hostname}/{topics}`

The secure versions:

- `ntfys://{topic}`
- `ntfys://{host}/{topic}`
- `ntfys://{host}:{port}/{topics}`
- `ntfys://{user}@{host}/{topics}`
- `ntfys://{user}@{host}:{port}/{topics}`
- `ntfys://{user}:{password}@{host}/{topics}`
- `ntfys://{user}:{password}@{host}:{port}/{topics}`
- `ntfys://{token}@{hostname}/{topics}`

You can specify more than one topic:

- `ntfy://{user}:{password}@{hostname}/{topic1}/{topic2}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                                                                                                      |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user       | No       | The user account to authenticate with.                                                                                                                                                                                                                                                                                           |
| password   | No       | The password used for authentication.                                                                                                                                                                                                                                                                                            |
| hostname   | No       | The ntfy server to send notifications to.                                                                                                                                                                                                                                                                                        |
| port       | No       | Defaults to **80** for `ntfy://` and **443** for `ntfys://`.                                                                                                                                                                                                                                                                     |
| topic      | Yes      | At least one topic must be defined.                                                                                                                                                                                                                                                                                              |
| token      | No       | Authorization token (auto-detected if provided in URL).                                                                                                                                                                                                                                                                          |
| mode       | No       | Authentication mode. Auto-detected. Possible values: `private`, `cloud`.                                                                                                                                                                                                                                                         |
| auth       | No       | `basic` (default) or `token`.                                                                                                                                                                                                                                                                                                    |
| email      | No       | Associate an email address with the ntfy post.                                                                                                                                                                                                                                                                                   |
| xtags      | No       | **ntfy message tags** (sent as the `X-Tags` header) to associate with the notification. Use comma and/or space to specify more than one. The legacy `tags=` parameter is still accepted as a backward-compatible alias. These are not to be confused with Apprise tags; [see here for more details](#ntfy-tags-vs-apprise-tags). |
| attach     | No       | URL pointing to a remote attachment to reference.                                                                                                                                                                                                                                                                                |
| filename   | No       | Override the attachment filename.                                                                                                                                                                                                                                                                                                |
| click      | No       | Hyperlink users are directed to when clicking the notification.                                                                                                                                                                                                                                                                  |
| priority   | No       | One of `max`, `high`, `default`, `low`, or `min`. Defaults to `default`.                                                                                                                                                                                                                                                         |
| actions    | No       | ntfy action button definitions.                                                                                                                                                                                                                                                                                                  |
| delay      | No       | Delay message delivery.                                                                                                                                                                                                                                                                                                          |
| image      | No       | Defaults to `Yes`; includes image preview when available.                                                                                                                                                                                                                                                                        |
| avatar_url | No       | Override the Apprise icon with a custom image URL.                                                                                                                                                                                                                                                                               |

If your Ntfy server is behind an HTTPS (Secure) hosted setup, then you simply use `ntfys://`:

<!-- TEMPLATE:SERVICE-PARAMS -->

## Ntfy Tags vs Apprise Tags

The `xtags=` parameter above refers to **ntfy message tags only** (sent as
the `X-Tags` header). The legacy `tags=` spelling is still accepted for
backward compatibility but `xtags=` is preferred going forward.

These tags are sent directly to the ntfy server and appear as labels or
emojis on the delivered notification.

They are **not** the same as Apprise routing tags.

Apprise routing tags are configured in your Apprise configuration file
(using `tag:` or `tags:` in YAML) and control which notification services
are triggered. They have no effect on the `X-Tags` header sent to the ntfy
server.

:::caution
The old `tags=` spelling was renamed to `xtags=` because the Apprise YAML
config parser also uses `tags:` as a key for routing tags. Using `tags=`
inside a YAML-loaded ntfy URL could cause the value to be silently
interpreted as an Apprise routing tag instead of an ntfy message tag,
preventing the notification from being delivered when no tag filter is
active. Using `xtags=` avoids this ambiguity entirely.
:::

Below is an example of a Ntfy message being sent that includes tags:

```bash
apprise -vv -t "Failure" -b "Something went wrong" \
   "ntfy://localhost/mytopic?priority=high&xtags=warning"
```

Below is an example that furthers onto the above by showing multiple (Ntfy) tags are supported too:

```bash
apprise -vv -t "Alert" -b "Disk space low" \
   "ntfy://localhost/mytopic?priority=high&xtags=warning,storage"
```

Apprise YAML configuration files can sometimes introduce confusion since they also use tags. Below shows the clear separation between Apprise `tag:` and ntfy `xtags=`.

```yaml
# apprise.yaml
urls:
  - ntfy://localhost/mytopic?priority=high&xtags=warning:
      tag: ntfy-alert
```

In the example above:

- `xtags=warning`: Ntfy message tag (sets the `X-Tags: warning` header)
- `tag: ntfy-alert`: Apprise routing tag; this would later be expected to be triggered by:

  ```bash
  apprise -vv -t "Alert" -b "Disk space low" \
     --tag=ntfy-alert --config=apprise.yaml
  ```

## Examples

Send a notification to a local Ntfy server:

```bash
# Assuming our {hostname} is localhost
# Assuming our {topic} is great-place
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ntfy://localhost/great-place
```

We can also send a notification to the ntfy.sh (cloud) server:

```bash
# Assuming our {topic} is great-place
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ntfy://great-place
```

Ntfy also supports Markdown; if you want to leverage this, simply add `?format=markdown` to your Apprise URL; eg:

```bash
# Assuming our {hostname} is localhost
# Assuming our {topic} is great-place
# Assuming we want to leverage the markdown support
apprise -vv -t "Test Message Title" -b "# Markdown Support" \
   "ntfy://localhost/great-place?format=markdown"
```

Secure HTTPS usage:

```bash
# Assuming our SECURE {hostname} is localhost
# Assuming our {topic} is great-topic
apprise -vv -t "Test Secure Message Title" -b "Test Message Body" \
   ntfys://localhost/great-topic
```

Using ntfy action buttons:

```bash
apprise -vv -t "Title" -b "Message content" \
    ntfy://ntfy.selfhostedexample.com/mytopic?actions=view%2CGoogle%2Chttps://www.google.com%3Bview%2CBing%2Chttps://www.bing.com
```
