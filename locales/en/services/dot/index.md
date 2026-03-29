---
title: "Dot. Notifications"
description: "Send Dot. notifications."
sidebar:
  label: "Dot."

source: https://dot.mindreset.tech

schemas:
  - dot

has_sms: true
has_image: true

sample_urls:
  - dot://{apitoken}@{device_id}/text
---

## Dot. Notifications

<!-- SERVICE:DETAILS -->

## Account Setup

1. Open the Dot. mobile app and retrieve both your **API token** (`dot_app_...`) and device **serial number** (12-character hex string).
2. In the app, enable the **Text API** and/or **Image API** content slot for the device.
3. Use the token and device ID with the `dot://` URLs shown below to trigger notifications.

## Syntax

Valid syntax is as follows:

- **Text API**
  `dot://{token}@{device_id}/text/?signature={footer}&icon={base64_icon}&task_key={key}`

  Title and message can be provided at runtime via `apprise.notify(title="...", body="...")`.

- **Image API**
  `dot://{token}@{device_id}/image/?image={base64_png}&link={tap_url}&border={0|1}&dither_type={type}&dither_kernel={kernel}&task_key={key}`

## Attachment Support

The plugin supports file attachments that are automatically converted to base64 encoding:

- **Text mode**: The first attachment is automatically used as the `icon` parameter (40×40 PNG) if no `icon` is provided via URL or configuration
- **Image mode**: The first attachment is automatically used as the `image` parameter (296×152 PNG) if no `image` is provided via URL or configuration
- If multiple attachments are provided, only the first one is used and a warning is logged
- If `icon` (text mode) or `image` (image mode) is already provided via URL/configuration, attachments are ignored

## Parameter Breakdown

| Variable     | Required    | Description                                                                                                                         |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| token        | Yes         | Dot. API token (`dot_app_...`)                                                                                                      |
| device_id    | Yes         | Dot. device serial number (12 hex characters)                                                                                       |
| refresh      | No          | Set to `no` to defer content display until the next scheduled refresh (default: `yes`)                                              |
| title        | No (text)   | Title shown on device                                                                                                               |
| message      | No (text)   | Body text shown on device                                                                                                           |
| signature    | No (text)   | Footer text shown on device                                                                                                         |
| icon         | No (text)   | Base64 PNG icon (40×40) for the lower-left corner. Can be provided via URL parameter or first attachment (auto-converted to base64) |
| image        | Yes (image) | Base64 PNG image (296×152) rendered full-screen. Can be provided via URL parameter or first attachment (auto-converted to base64)   |
| link         | No          | Tap-to-interact target (http/https or custom scheme)                                                                                |
| border       | No (image)  | 0=white (default), 1=black frame                                                                                                    |
| ditherType   | No (image)  | DIFFUSION, ORDERED, or NONE                                                                                                         |
| ditherKernel | No (image)  | THRESHOLD, ATKINSON, BURKES, FLOYD_STEINBERG, SIERRA2, STUCKI, JARVIS_JUDICE_NINKE, DIFFUSION_ROW, DIFFUSION_COLUMN, DIFFUSION_2D   |
| task_key     | No          | Specify which content slot to update when multiple Text or Image API contents exist on a device                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

**Send a text reminder (via URL parameters):**

```bash
apprise -vv -t "Morning Routine" -b "Remember to water the plants" \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/text/?signature=Apprise
```

**Send a text reminder with icon via attachment:**

```bash
apprise -vv -t "Morning Routine" -b "Remember to water the plants" \
  -a /path/to/icon.png \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/text/?signature=Apprise
```

**Update a specific content slot using task_key:**

```bash
apprise -vv -t "Server Status" -b "All systems operational" \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/text/?task_key=status_monitor
```

**Push an image card (via URL parameter):**

```bash
apprise -vv \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/image/?image=$(base64 -w0 poster.png)&link=https://example.com
```

**Push an image card via attachment:**

```bash
apprise -vv -a /path/to/image.png \
  dot://dot_app_TOKEN@A1B2C3D4E5F6/image/?link=https://example.com
```
