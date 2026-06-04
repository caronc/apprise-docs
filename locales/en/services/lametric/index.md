---
title: "LaMetric Time/Clock Notifications"
description: "Send LaMetric Time/Clock notifications."
sidebar:
  label: "LaMetric Time/Clock"

source: https://lametric.com

schemas:
  - lametric

sample_urls:
  - lametric://{apikey}@{hostname}
  - lametric://{apikey}@{hostname}:{port}
  - lametric://{userid}:{apikey}@{hostname}
  - lametric://{userid}:{apikey}@{hostname}:{port}
  - lametric://{app_access_token}@{app_id}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

You now have to methods of notifying your LaMetric Device:

1. **Device Mode**: Directly query your LaMetric Device on your local network to send it a notification.
1. **Cloud Mode**: A secure query to LaMetric's API server in the cloud to send a message to your clock. You will have limited options with this method.

### Device Mode Setup

With Device Mode, your Apprise query will directly interface with the LaMetric Time Device on your local network.

1. Sign Up and login to the [Developer Webpage](https://developer.lametric.com).
1. Locate your Device **API Key**; you can find it [here](https://developer.lametric.com/user/devices):
1. You now need to know the IP address your device resides on. Your devices **IP Address** can be found in LaMetric Time app at: **Settings** -> **Wi-Fi** -> **IP Address**

### Cloud Mode Setup

**Note**: It appears that at some point in time Lametric dropped support and usage of their cloud mode. While documented in their forums with screenshots and usage examples. None of this seems to be available for the end user anymore to play/work with. For those who still have access to their upstream servers can leverage this. Alternatively those who use this Apprise plugin will need to focus on the normal Device Mode (explained above) instead.

Using Cloud Mode, you will interface with your LaMetric Time device through the internet.

1. Sign Up and login to the [Developer Webpage](https://developer.lametric.com).
1. Create a **Indicator App** if you haven't already done so from [here](https://developer.lametric.com/applications/sources).
   - There is a great official tutorial on how to do this [here](https://lametric-documentation.readthedocs.io/en/latest/guides/first-steps/first-lametric-indicator-app.html#publish-app-and-install-it-to-your-lametric-time)
1. Make sure to set the **Communication Type** to **PUSH**
1. You will be able to **Publish** your app once you've finished setting it up. This will allow it to be accessible from the internet using the `cloud` mode of this Apprise Plugin. The **Publish** button shows up from within the settings of your Lametric App upon clicking on the **Draft Vx** folder (where `x` is the version - usually a 1)

1. When you've completed the above steps, the site would have provided you a **PUSH URL** that looks like this:
   - `https://developer.lametric.com/api/v1/dev/widget/update/com.lametric.{app_id}/{app_ver}`

   You will need to record the `{app_id}` and `{app_ver}` to use the `cloud` mode.

   The same page should also provide you with an Application **Access Token**. It's approximately 86 characters with two equal (`=`) characters at the end of it. This becomes your `{app_access_token}`. Here is an example of what one might look like:
   - `K2MxWI0NzU0ZmI2NjJlZYTgViMDgDRiN8YjlmZjRmNTc4NDVhJzk0RiNjNh0EyKWW==`

## Syntax

Valid _Device Mode_ syntax is as follows:

- `lametric://{apikey}@{hostname}`
- `lametric://{apikey}@{hostname}:{port}`
- `lametric://{userid}:{apikey}@{hostname}`
- `lametric://{userid}:{apikey}@{hostname}:{port}`

Valid _Cloud Mode_ syntax is as follows:

- `lametric://{app_access_token}@{app_id}`
- `lametric://{app_access_token}@{app_id}/{app_version}`

## Parameter Breakdown

The breakdown of parameters depend on whether you are using the Cloud Mode or Device Mode.

### Device Mode

| Variable  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey    | Yes      | Your Device **API Key** can be found on LaMetric's website [here](https://developer.lametric.com/user/devices)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| hostname  | No       | This is the IP address or hostname of your Lametric device on your local network.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| port      | No       | The port your LaMetric device is listening on. By default the port is **8080**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| userid    | No       | The account login to your Lametric device on your local network. By default the user is set to `dev`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| mode      | No       | Define the Apprise/Lametric mode to use. This can be either set to `cloud` or `device`. It's worth pointing out that Apprise is smart enough to detect the mode you're using based on the URL you provide it. But for those who want to explicitly provide its value, they can do so.                                                                                                                                                                                                                                                                                                                                                                               |
| cycles    | No       | The number of times message should be displayed. If cycles is set to `0`, notification will stay on the screen until user dismisses it manually. By default it is set to `1`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| sound     | No       | An audible alarm that can be sent with the notification. The following keywords are supported: `bicycle`, `car`, `cash`, `cat`, `dog`, `dog2`, `energy`, `knock-knock`, `letter_email`, `lose1`, `lose2`, `negative1`, `negative2`, `negative3`, `negative4`, `negative5`, `notification`, `notification2`, `notification3`, `notification4`, `open_door`, `positive1`, `positive2`, `positive3`, `positive4`, `positive5`, `positive6`, `statistic`, `thunder`, `water1`, `water2`, `win`, `win2`, `wind`, `wind_short`, `alarm1`, `alarm2`, `alarm3`, `alarm4`, `alarm5`, `alarm6`, `alarm7`, `alarm8`, `alarm9`, `alarm10`, `alarm11`, `alarm12`, and `alarm13`. |
| priority  | No       | The priority of the message; the possible values are `info`, `warning`, and `critical`. By default `info` is used if nothing is specified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| icon_type | No       | Represents the nature of notification; the possible values are `info`, `alert`, and `none`. By default `none` is used if nothing is specified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### Cloud Mode

| Variable         | Required | Description                                                                                                                                                                                                                                                                           |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_id           | Yes      | Your Indicator App's **Application ID** can be found in your \*Indicator App Configuration\*\*. You can access your application's configuration from the LaMetric's website [here](https://developer.lametric.com/applications/).                                                     |
| app_access_token | Yes      | Your Indicator App's **Access Token** can be found in your \*Indicator App Configuration\*\*. You can access your application's configuation from the LaMetric's website [here](https://developer.lametric.com/applications/).                                                        |
| app_ver          | No       | The version associated with your Indicator App. If this isn't specified, then the default value of `1` (One) is used.                                                                                                                                                                 |
| mode             | No       | Define the Apprise/Lametric mode to use. This can be either set to `cloud` or `device`. It's worth pointing out that Apprise is smart enough to detect the mode you're using based on the URL you provide it. But for those who want to explicitly provide its value, they can do so. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a LaMetric Time notification using Device Mode (local to our network):

```bash
# Assuming our {apikey} is abc123
# Assuming our {hostname} is 192.168.1.3
apprise -vv -b "Test Message Body" lametric://abc123@192.168.1.3
```

Send a LaMetric Time notification using Cloud Mode (using LaMetrics Developer API):

```bash
# Assuming our {app_id} ABCD1234
# Assuming our {app_access_token} is abcdefg==
apprise -vv -b "Test Message Body" lametric://abcdefg==@ABCD1234
```
