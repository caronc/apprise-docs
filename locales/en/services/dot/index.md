---
title: "Dot. Notifications"
description: "Send Dot. notifications."
sidebar:
  label: "Dot."

source: https://dot.mindreset.tech

schemas:
  - dot

has_attachments: true

sample_urls:
  - dot://{apitoken}@{device_id}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Open the Dot. mobile app and retrieve both your **API token** (`dot_app_...`) and device **serial number** (12-character hex string).
2. In the app, enable the **Text API** and/or **Image API** content slot for the device.
3. Use the token and device ID with the `dot://` URLs shown below to trigger notifications.

## Syntax

Valid syntax is as follows:

- `dot://{token}@{device_id}/`
- `dot://{token}@{device_id}/?mode=image`

The default mode is **text**. In text mode, body and title are sent to the Text API, and any attachment or `image=` parameter is sent to the Image API. When both are present, text is dispatched first, then image.

:::note
Old-style URLs with `/text/` or `/image/` in the path continue to work for backward compatibility but are no longer generated.
:::

## Mode Behavior

| Mode             | Behavior                                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` (default) | Body and title go to the Text API. Any attachment or `image=` parameter also goes to the Image API. When both are present, text is sent first, then image. |
| `image`          | Only the Image API is called. Body and title are ignored. Requires `image=` or an attachment.                                                              |

## Attachment Support

- **Text mode** (default): The attachment is sent as a full-screen image (296×152 PNG) to the Image API. If body or title are also present, text is sent first. The `icon=` URL parameter can still be used independently to set the 40×40 corner icon in the text card.
- **Image mode**: The first attachment is used as the full-screen image (296×152 PNG) if no `image=` is supplied in the URL.
- In all modes, only the first attachment is used; extra attachments trigger a warning.
- If `image=` is already supplied via URL, attachments are ignored.

## Parameter Breakdown

| Variable      | Required    | Description                                                                                                                                                     |
| ------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token         | \*Yes       | Dot. API token (`dot_app_...`)                                                                                                                                  |
| device_id     | \*Yes       | Dot. device serial number (12 hex characters)                                                                                                                   |
| mode          | No          | `text` (default) or `image`. Controls which API endpoint is used. In `text` mode, both APIs may be called in a single send.                                     |
| refresh       | No          | Set to `no` to defer display until the next scheduled refresh (default: `yes`)                                                                                  |
| title         | No (text)   | Title shown on device                                                                                                                                           |
| message       | No (text)   | Body text shown on device                                                                                                                                       |
| signature     | No (text)   | Footer text shown on device                                                                                                                                     |
| icon          | No (text)   | Base64 PNG icon (40×40) for the lower-left corner of the text card.                                                                                             |
| image         | Yes (image) | Base64 PNG image (296×152) rendered full-screen. Can be provided via URL parameter or first attachment (auto-converted to base64).                              |
| link          | No          | Tap-to-interact target (http/https or custom scheme)                                                                                                            |
| border        | No (image)  | `0`=white frame (default), `1`=black frame                                                                                                                      |
| dither_type   | No (image)  | `DIFFUSION` (default), `ORDERED`, or `NONE`                                                                                                                     |
| dither_kernel | No (image)  | `FLOYD_STEINBERG` (default), `THRESHOLD`, `ATKINSON`, `BURKES`, `SIERRA2`, `STUCKI`, `JARVIS_JUDICE_NINKE`, `DIFFUSION_ROW`, `DIFFUSION_COLUMN`, `DIFFUSION_2D` |
| task_key      | No          | Specify which content slot to update when multiple Text or Image API contents exist on a device                                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

**Send a text reminder:**

```bash
apprise -vv -t "Morning Routine" -b "Remember to water the plants" \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?signature=Apprise"
```

**Send text and image together (text first, then image):**

```bash
apprise -vv -t "Morning Routine" -b "Remember to water the plants" \
  -a /path/to/image.png \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/"
```

**Update a specific content slot using task_key:**

```bash
apprise -vv -t "Server Status" -b "All systems operational" \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?task_key=status_monitor"
```

**Push an image card (via URL parameter):**

```bash
apprise -vv \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?mode=image&image=$(base64 -w0 poster.png)&link=https://example.com"
```

**Push an image card via attachment:**

```bash
apprise -vv -a /path/to/image.png \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?mode=image&link=https://example.com"
```
