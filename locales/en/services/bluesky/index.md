---
title: "Bluesky Notifications"
description: "Send Bluesky notifications."
sidebar:
  label: "Bluesky"

source: https://bsky.app/
schemas:
  - bluesky

sample_urls:
  - bluesky://user@app_pw
  - bluesky://user.host@app_pw

has_attachments: true

limits:
  max_chars: 280
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Create a BlueSky account
1. Access Settings -> Privacy and Security
1. Generate an App Password
1. Assemble your Apprise URL like:
   - bluesky://handle@you-token-here

## Syntax

Valid syntax is as follows:

- `bluesky://user@app_pw`
- `bluesky://user.host@app_pw`
  - This is only required if the `host` is not `bsky.social`

## Examples

Send a public message:

```bash
# Assuming our {Handle} is @John
# Assuming our {AppID} is abcd-1234-efghi-6789

# our user is @testaccount
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "bluesky://John@abcd-1234-efghi-6789"

```
