---
title: "Blink(1) USB LED Notification Light"
description: "Flash a Blink(1) USB LED with the color that matches the notification type."
sidebar:
  label: "Blink(1)"

source: https://blink1.thingm.com/

group: desktop

schemas:
  - blink1: insecure

has_local: true
has_selfhosted: true
has_image: false

sample_urls:
  - blink1://
  - blink1://ABCD1234/
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Blink(1)](https://blink1.thingm.com/) is a small USB RGB LED notification
light made by ThingM. Plug it into any USB port and Apprise can flash it
in a color that reflects the notification type:

| Notification Type | Color  |
| ----------------- | ------ |
| Info              | Blue   |
| Success           | Green  |
| Warning           | Yellow |
| Failure           | Red    |

The plugin talks to the device directly over USB HID using the
[hidapi](https://pypi.org/project/hidapi/) Python package. There is no
cloud service, no API key, and no network connection required.

:::note
Install the `hidapi` package before using this plugin:

```bash
pip install hidapi
```

:::

## Syntax

```text
blink1://
blink1://{serial}/
blink1://{serial}/?duration={ms}&fade={ms}&ledn={n}
```

Use `blink1://` (or `blink1://_/`) to target the first connected device.
Supply the device serial number in the host position to address a specific
unit when more than one Blink(1) is attached.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                 |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| serial   | No       | USB serial number of the target device. Omit (or use `_`) to use the first available device.                                |
| duration | No       | How long in milliseconds to hold the notification color before switching the LED off. Default: `5000`. Range: `0`-`300000`. |
| fade     | No       | Fade transition time in milliseconds. `0` = instant. Default: `0`. Range: `0`-`10000`.                                      |
| ledn     | No       | Which LED to address: `0` = all (default), `1` = first LED only, `2` = second LED only (mk2 devices).                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Flash the first connected Blink(1) with all defaults (blue, instant, 5 s):

```bash
apprise -vv -t "Deploy finished" -b "All checks passed." \
   blink1://
```

Address a specific device and use a 250 ms fade with a 2-second hold:

```bash
apprise -vv -n warning -b "Disk almost full." \
   "blink1://ABCD1234/?fade=250&duration=2000"
```

Light only the second LED on a mk2 device:

```bash
apprise -vv -n failure -b "Build failed." \
   "blink1://?ledn=2"
```
