---
title: "Simplepush Notifications"
description: "Send Simplepush tasks to your own devices, to topics, or to an organization."
sidebar:
  label: "Simplepush"

source: https://simplepu.sh/

schemas:
  - spush
  - simplepush

has_attachments: true

body_formats:
  - markdown

sample_urls:
  - spush://{api_token}
  - spush://{api_token}/{topic}
  - spush://{password}@{api_token}/{topic}
  - spush://{integration_token}/@{member}
  - spush://{integration_token}/?broadcast=yes

limits:
  max_chars: 7000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Simplepush delivers tasks and notifications to your phone. Every message Apprise sends arrives as a task in the Simplepush app, so it stays there after the push.

1. Install the Simplepush app and open its settings. Your **API Token** is listed there.
2. To send to a topic, create the topic in the app and have the recipients join it.
3. To send as an organization, an organization admin creates an integration token:

   ```bash
   sp integration create --scopes send
   ```

   The token looks like `spi_<credential>.<seed>`. Use it in place of the API Token.

:::caution
URLs written for the previous Simplepush service (`spush://{apikey}`, `spush://{salt}:{password}@{apikey}` and the `event=` option) no longer work. Get a new API Token from the current Simplepush app and update your URLs.
:::

### End-to-End Encryption

Messages, links and attachments can be end-to-end encrypted with XChaCha20-Poly1305, the same scheme the Simplepush apps use:

- **Topic send with a password:** encrypted with that topic's password.
- **Send to your own devices with a password:** encrypted with your Personal Password.
- **Organization send:** encrypted with the organization key whenever the organization has encryption turned on. Organization sends do not take a password.

:::note
Encryption requires the `PyNaCl` Python package:

```bash
pip install PyNaCl
```

Without it, Apprise refuses to load a URL that has a password, and an organization send with encryption turned on fails. Apprise never falls back to sending your message unencrypted. Sends without encryption do not need PyNaCl.
:::

## Syntax

Valid syntax is as follows:

- `spush://{api_token}`
- `spush://{api_token}/{topic}`
- `spush://{api_token}/{topic1}/{topic2}/{topicN}`
- `spush://{password}@{api_token}`
- `spush://{password}@{api_token}/{topic}`
- `spush://{integration_token}/{topic}`
- `spush://{integration_token}/@{member}`
- `spush://{integration_token}/{topic}/@{member1}/@{member2}`
- `spush://{integration_token}/?broadcast=yes`

`simplepush://` can be used in place of `spush://` in any of these.

## Parameter Breakdown

| Variable         | Required | Description                                                                                                                                               |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_token        | Yes      | Your API Token from the app settings, or an organization integration token (`spi_...`).                                                                   |
| password         | No       | Encrypts the message. With a topic it is the topic password, otherwise it is your Personal Password. Not allowed with an integration token.               |
| topic            | No       | One or more topics. Each topic receives its own task.                                                                                                     |
| @member          | No       | An organization member, prefixed with `@`. Requires an integration token.                                                                                 |
| to               | No       | Topics and `@members` as a comma separated list. An alternative to placing them in the URL path.                                                          |
| broadcast        | No       | Set to `yes` to send to every member of the organization. Requires an integration token and can not be combined with topics or members.                   |
| shared           | No       | Set to `yes` to send one task that all recipients see, where the first answer resolves it. By default every recipient gets their own copy.                |
| priority         | No       | `1` (silent) to `5` (critical, sounds even on a muted phone). The names `minimal`, `low`, `default`, `high` and `critical` also work. The default is `3`. |
| critical_volume  | No       | The volume of the iOS critical alert sound, greater than `0` and at most `1`. Requires `priority=5`.                                                      |
| sptag            | No       | The Simplepush tag shown on the task.                                                                                                                     |
| links            | No       | Links to attach to the task, separated by spaces. At most 25.                                                                                             |
| topic_auth_token | No       | The auth token of a protected topic.                                                                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a task to your own devices:

```bash
# Assume:
#  - our {api_token} is abcdefghijklmn
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   spush://abcdefghijklmn
```

Send to a topic, encrypted with the topic password:

```bash
# Assume:
#  - our {api_token} is abcdefghijklmn
#  - our {topic} is deploys
#  - the topic password is s3cret
apprise -vv -t "Deploy done" -b "Version 2.4 is live" \
   "spush://s3cret@abcdefghijklmn/deploys"
```

Send a critical alert with an attachment:

```bash
apprise -vv -t "Database down" -b "Primary is unreachable" \
   --attach /var/log/postgres.log \
   "spush://abcdefghijklmn/oncall?priority=5&critical_volume=0.5"
```

Send to two organization members:

```bash
# Assume:
#  - our {integration_token} is spi_cred.seed
apprise -vv -t "Site visit" -b "Please check the north gate" \
   "spush://spi_cred.seed/@Alice/@Bob"
```
