---
title: "[Service Name] Notifications"
description: "Describes how to send notifications via [Service]"
sidebar:
  label: "[Service Name]"

# Provide the upstream source that lets users where they can go to get upstream details about
# the service Apprise sends notifications through/to:
source: https://url/to/official/app/this-apprise/service/supports
# the following groups are supported:
# - custom
# - social
# - general  <-- default if a 'group' is not defined
# - <Suggest a new group if you want through a new ticket>
group: "general"
schemas:
  # Optionally add insecure as an assignment to let users know that use of the protocol
  # will not perform secure transactions. If 'insecure' isn't defined, then 'secure' is implied.
  - schema://: insecure
  - schemas://

# Optional. Declares which message format(s) this service accepts: any of
# text, html, markdown. Omit this field entirely if the service only
# accepts plain text -- that is the implicit behavior with no body_formats
# block at all.
#
# When declaring more than one format, mark exactly one entry ": default"
# the same way 'schemas' marks an entry ": insecure" above. If no entry is
# marked default, the first one listed is used. Declaring more than one
# default fails documentation validation.
# body_formats:
#   - html: default
#   - text

sample_urls:
  # These will automatically be rendered for users visiting the main service tab
  # Do not specify more than 4 or 5 as it tends to bloat the main display; users
  # who want to see more will read the documentation below.
  - schema://{credentials}/{targets}

# `has_*` values always default to `false` if not provided.
# Set these only when the service truly supports the capability.

# File attachment support, not avatar/logo image support.
has_attachments: false

# Graphical notification image/status presentation controlled by Apprise.
has_image: false

# SMS/MMS delivery through this plugin or its upstream provider.
has_sms: false

# Chat rooms, channels, group chats, direct messages, or chat bot destinations.
has_chat: false

# Email delivery through SMTP or a dedicated email provider.
has_email: false

# Same-machine native notifications or a locally attached/native device.
has_local: false

# Upstream app/service can be operated as a self-hosted deployment.
has_selfhosted: false

# Optional extra search terms for the service listing search box.
# Use this when users would naturally type a name that does not appear in the
# title or any schema token (e.g. a legacy brand name or a common alias).
# Separate multiple terms with commas or spaces. Dots are allowed so that
# domain-style names survive as one searchable token. Matching is substring-based,
# so shorter queries still find results. Only add terms a real user would type;
# do not duplicate the title or schemas.
# keywords: "alias, legacy-name"

# Define any message limits — only applicable when the user specifies
# ?overflow=truncate or ?overflow=split; otherwise the upstream service handles
# content beyond these values.  Remove this block entirely if the service has no
# known limits.
#
# limits:
#   - name: "Title"
#     max_chars: 250
#   - name: "Body"
#     max_chars: 2000

# Place a service into the graveyard by adding one of the following:
#    ended: YYYY-MM-DD
#    ended: YYYY-MM
#    ended: YYYY

# Sponsorship (do not set manually — maintainer use only)
# sponsorship_level: 50   # Integer 1-100; unlocks site features at each tier
# sponsorship_weight: 1   # Optional integer 1-5; banner ticket count for level 75+
# sponsor_since: 2026-06  # Optional YYYY-MM; maintainer note for sponsorship start
# sponsor_message: ""     # Optional level 75+ banner text; empty string disables it
---

<!-- Leave the below as is as it will place the sponsor banner when eligible -->
<!-- SPONSORS:BANNER -->

<!-- Leave the below as is as it will place our ## Overview section -->
<!-- SERVICE:DETAILS -->

<!--
  LOGO FILES (place in the images/ directory alongside this file):
    logo.svg            — default logo, shown in light and dark mode
    logo.png / .jpg     — bitmap fallback when SVG is unavailable
    logo-light.svg      — optional explicit light-mode variant
    logo-dark.svg       — optional dark-mode variant (e.g. white logos)
  The sync pipeline publishes all images/ files automatically.
-->

## Account Setup

Describe how to set up an account or the application so that Apprise can send notifications through it.

## Syntax

Valid syntax is as follows:

- `schema://credentials/`
- `schema://credentials/{target}`

## Parameters

<!-- Provide the supported parameters for users to understand/leverage -->

| Variable | Required | Description |
| -------- | -------- | ----------- |

<!-- Leave the below as is as it will place our ## Global Parameters section -->
<!-- TEMPLATE:SERVICE-PARAMS -->

## 📖 Examples

Provide clear, copy-pasteable CLI and Python examples.

```bash
apprise -v -t "title" -b "body" \
   "schema://configuration"
```

```python
import apprise

ap = apprise.Apprise()
ap.add("schema://configuration")
ap.notify(title="title", body="body")
```
