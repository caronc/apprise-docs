---
title: "Firebase Cloud Messaging (FCM) Notifications"
description: "Send Firebase Cloud Messaging (FCM) notifications."
sidebar:
  label: "Firebase Cloud Messaging (FCM)"

source: https://firebase.google.com/docs/cloud-messaging

schemas:
  - fcm

sample_urls:
  - fcm://{APIKey}/{Device}
  - fcm://{APIKey}/{Device1}/{Device2}/{DeviceN}
  - fcm://{APIKey}/#{Topic}
  - fcm://{APIKey}/#{Topic1}/#{Topic2}/#{TopicN}

limits:
  max_chars: 5000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

You'll need to create an account with Google's Firebase Cloud Messaging Service (FCM) first to use this.

From there you will access the FCM Management Console and choose which mode you wish to leverage when sending your notifications. The modes are **legacy** and **oauth2**. Both have their pros and con. Depending on which mode you choose, you will be required to construct your Apprise URL slightly diferent:<br/>
![Firebase](./images/106963460-9dd33600-670e-11eb-8aaa-8499121e3147.png)

## Syntax

Valid syntax is as follows:

The legacy mode doesn't seem to suggest it will be decommissioned anytime soon, however this is how the FCM refers to it as. This only requires the APIKey generated through the FCM Management Console.

- `fcm://{APIKey}/{Device}`
- `fcm://{APIKey}/{Device1}/{Device2}/{DeviceN}`
- `fcm://{APIKey}/#{Topic}`
- `fcm://{APIKey}/#{Topic1}/#{Topic2}/#{TopicN}`

You can mix and match these entries as well:

- `fcm://{APIKey}/{Device1}/#{Topic1}/`

### OAuth2 Mode

The OAuth2 mode is what FCM seems to hint that you use. But it has much more overhead then the legacy way of doing things. It also requires you to point to a specially generated `JSON` file you can generate from your FCM Management Console.

You can point to the `JSON` file generated locally (if you saved it onto your PC) or refer to it by its web URL (if you're sharing it somewhere on your network) like so:

- `fcm://{Project}/{Device}/?keyfile=/path/to/keyfile`
- `fcm://{Project}/{Device1}/{Device2}/{DeviceN}/?keyfile=https://user:pass@localhost/web/location`
- `fcm://{Project}/#{Topic}/?keyfile=/path/to/keyfile`
- `fcm://{Project}/#{Topic1}/#{Topic2}/#{TopicN}/?keyfile=https://user:pass@localhost/web/location`

You can mix and match these entries as well:

- `fcm://{Project}/{Device1}/#{Topic1}/?keyfile={JSON_KeyFile}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                                                                                                                                                                                                                                             |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APIKey    | Yes      | The generated _API Key_ from the FCM Management Console. This is only required if you intend to use the **Legacy** method.                                                                                                                                                                                                                                              |
| Project   | Yes      | The generated _Project ID_ from the FCM Management Console. This is only required if you intend to use the **OAuth2** method.                                                                                                                                                                                                                                           |
| KeyFile   | Yes      | The location of the \_JSON Keyfile\_\_ generated from the FCM Management Console. This is only required if you intend to use the **OAuth2** method.                                                                                                                                                                                                                     |
| Device    | No       | The device you wish send your message to                                                                                                                                                                                                                                                                                                                                |
| Topic     | No       | The topic you want to publish your message to.                                                                                                                                                                                                                                                                                                                          |
| mode      | No       | The mode can be set to either **legacy** or **oauth2**. This is automatically detected depending on what you provide the Apprise URL. But you can explicitly set this here if you require.                                                                                                                                                                              |
| priority  | No       | The FCM Priority. By default the priority isn't passed into the payload so it takes on all upstream defaults. Valid options here are `min`, `low`, `normal`, `high`, and `max`.                                                                                                                                                                                         |
| image     | No       | Set this to `yes` if you want to include an image as part of the payload. Depending on your firebase subscription; this may or may not incur charges. By default this is set to `no`                                                                                                                                                                                    |
| image_url | No       | Specify your own custom image_url to include as part of the payload. If this is provided, it is assumed `image` is `yes`. You an additionally set `image=no` to enforce that this assumption does not happen.                                                                                                                                                           |
| color     | No       | Identify the colour of your notification by specifying your own custom RGB value (in format \#RRGGBB where the hashtag (`#`) is optional. The other options are `yes` and `no`. When set to `no`, the `color` argument simply is not part of the payload at all. When set to `yes` (default), Apprise chooses the color based on the message type (info, warning, etc). |

**Note:** This notification service does not use the title field; only the _body_ is passed along.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Legacy FCM notification:

```bash
# Assuming our {APIKey} is bu1dHSdO22pfaaVy
# Assuming our {Device} is ABCD:12345

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "fcm://bu1dHSdO22pfaaVy/ABCD:12345"

```

Send a OAuth2 FCM notification:

```bash
# Assuming our {Project} is Apprise
# Assuming the path to our JSON  {Keyfile} is /etc/apprise/fcm/keyfile.json
# Assuming our {Device} is ABCD:12345

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "fcm://Apprise/ABCD:12345/?keyfile=/etc/apprise/fcm/keyfile.json"
```
