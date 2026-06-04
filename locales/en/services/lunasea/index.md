---
title: "Lunasea Notifications"
description: "Send Lunasea notifications."

sidebar:
  label: "Lunasea"

source: https://www.lunasea.app/
schemas:
  - lunasea

sample_urls:
  - lunasea://{toFireBaseUser}
  - lunasea://{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}
  - lunasea://+{toFireBaseDevice}
  - lunasea://+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}

limits:
  - max_chars: 160

ended: 2025-04-30
---

:::note

## Service End Reason

Taken from their website:
![Screenshot From 2025-07-06 13-20-14](./images/11ef07079a9e2aa2.png)
💡The Service was removed from Apprise in [apprise/1318](https://github.com/caronc/apprise/issues/1318)
:::

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntax

Valid syntax is as follows:

### Cloud Hosting

- `lunasea://{toFireBaseUser}`
- `lunasea://{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}`
- `lunasea://+{toFireBaseDevice}`
- `lunasea://+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}`

You can mix and match as well:

- `lunasea://{user}:{pass}@/+{toFireBaseUser1}/{toFireBaseDevice1}/`

### Private Hosting

This works the exact same way; you can just additionally specify your connection details to your local server:

- `lunasea://{user}:{pass}@{hostname}/{toFireBaseUser}`
- `lunasea://{user}:{pass}@{hostname}/{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}`
- `lunasea://{user}:{pass}@{hostname}/+{toFireBaseDevice}`
- `lunasea://{user}:{pass}@{hostname}/+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}`
- `lunasea://{user}:{pass}@{hostname}:{port}/{toFireBaseUser}`
- `lunasea://{user}:{pass}@{hostname}:{port}/{toFireBaseUser1}/{toFireBaseUser2}/{toFireBaseUserN}`
- `lunasea://{user}:{pass}@{hostname}:{port}/+{toFireBaseDevice}`
- `lunasea://{user}:{pass}@{hostname}:{port}/+{toFireBaseDevice1}/{toFireBaseDevice2}/{toFireBaseDeviceN}`

**Note:** The `{user}`/`{pass}` is purely optional.

You can mix and match as well:

- `lunasea://{user}:{pass}@{hostname}/+{toFireBaseUser1}/{toFireBaseDevice1}/`
- `lunasea://{user}:{pass}@{hostname}:{port}/+{toFireBaseUser1}/{toFireBaseDevice1}/`

### Additional Notes

Use `lunaseas://` for a Secure (`https://`) connection and `lunasea://` for Insecure (`http://`).

`lsea://` and `lseas://` can also be used as an alias to `lunasea://` and `lunaseas://` (respectively) if you choose.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| to       | **\*No** | One or more Firebase User IDs or Device IDs you wish to send your notification to. You can use comma's to separate multiple entries if you wish.                                                                                                                                                                                                                                                                                                    |
| image    | No       | Map the image associated with the notification type to the payload. By default this is set to `no`.                                                                                                                                                                                                                                                                                                                                                 |
| mode     | No       | The default mode to treat the URL provided as. Possible values are `cloud` and `private`. This is detected if no otherwise specified. When set to `private`, a hostname must be provided as part of the URL. When set to `cloud`, all elements are presumed to be notification end points and [https://lunasea.app](https://lunasea.app) is used. In cloud mode, all transactions are secure (regardless if you specify `lunasea://` or `lsea://`). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a LunaSea notification:

```bash
# Assuming our {FireBaseDeviceID} is abcd_abcd_abcd
# Send to a Device (make sure to add + at front):
apprise -t "Test Title" -b "Test Message" \
  lunasea://+abcd_abcd_abcd

# Assuming our {FireBaseDeviceID} is abcd_abcd_abcd
# Assuming our {FireBaseUserID} is wxyz_wxyz_wxyz
#Send to a device (add +) and a user (optionally add @)
apprise -t "Test Title" -b "Test Message" \
  lunasea://+abcd_abcd_abcd/@wxyz_wxyz_wxyz

# Running your own private server, no problem:
# Assuming our {hostname} is myhostname
# Assuming our {user} is user
# Assuming our {password} is pass
# Assuming our {FireBaseDeviceID} is abcd_abcd_abcd
# Assuming our {FireBaseUserID} is wxyz_wxyz_wxyz
apprise -t "Test Title" -b "Test Message" \
  lunasea://user:pass@myhostname/+FireBaseDevice1/@FireBaseUserID
```
