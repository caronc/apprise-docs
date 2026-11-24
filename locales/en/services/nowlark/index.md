---
title: "Nowlark Notifications"
description: "Send push notifications to your iPhone, iPad and Apple Watch."
sidebar:
  label: "Nowlark"

source: https://nowlark.com

schemas:
  - nowlark

sample_urls:
  - nowlark://{apikey}
  - nowlark://{apikey}/{source}
  - nowlark://{apikey}/{source}?priority=high
  - nowlark://{apikey}/{source}?url=https://example.com/run/42

limits:
  - name: "Title"
    max_chars: 1024
  - name: "Body"
    max_chars: 10000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Nowlark delivers push notifications to the Nowlark app on iPhone, iPad and Apple Watch:

1. Install Nowlark from the App Store and open it.
2. Go to **Settings › Connect an App › Create Your Key**.
3. Copy the key. It starts with `nlk_` and is shown only once.

Your Apprise URL is then `nowlark://nlk_yourkey`.

## Syntax

Valid syntax is as follows:

- `nowlark://{apikey}`
- `nowlark://{apikey}/{source}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | Your Nowlark key, starting with `nlk_`.                                                                                                                                                                                           |
| source   | No       | The sender's name, shown on every notification and listed under **Sources** in the app, where each source can be muted or capped on its own. Use one per script or job, for example `Nightly backup`. The default is **Apprise**. |
| priority | No       | One of **low**, **moderate**, **normal**, **high** or **emergency** (or **-2** to **2**). **high** breaks through a Focus. **emergency** also repeats until the notification is opened. The default is **normal**.                |
| url      | No       | An `http` or `https` link the notification opens when tapped.                                                                                                                                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification:

```bash
# Assuming our {apikey} is nlk_ab12cd34ef56gh78ij90kl12
apprise -vv -t "Backup finished" -b "All 3 volumes copied" \
   "nowlark://nlk_ab12cd34ef56gh78ij90kl12/Nightly%20backup"
```

Send an alert that breaks through a Focus and opens the run's log when tapped:

```bash
apprise -vv -t "Backup failed" -b "Disk full on nas-1" \
   "nowlark://nlk_ab12cd34ef56gh78ij90kl12/Nightly%20backup?priority=high&url=https://example.com/run/42"
```
