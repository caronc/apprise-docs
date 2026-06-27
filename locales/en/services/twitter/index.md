---
title: "X (Formerly Twitter) Notifications"
description: "Send X Notifications."
sidebar:
  label: "X (Formerly Twitter)"

source: https://x.com/

schemas:
  - x
  - twitter
  - tweet

sample_urls:
  - x://{ScreenName}@{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}
  - x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName}
  - x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}?mode=tweet

has_attachments: true

limits:
  - name: "Direct Message"
    max_chars: 10000
  - name: "Tweet"
    max_chars: 280
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::note
Apprise uses the X API v2 with **OAuth 1.0a User Context**. The X Developer Console also displays OAuth 2.0 credentials and an app-only Bearer Token, but those credentials are not interchangeable and are not used by this integration.

- **Posts** (`mode=tweet`) require an app with **Read and write** permission.
- **Direct Messages** (`mode=dm`, the default) require **Read, write, and Direct Messages** permission.

X API access is currently pay-per-use. Add credits and review the current endpoint prices in the [X API pricing documentation](https://docs.x.com/x-api/getting-started/pricing) before sending notifications.
:::

## Account Setup

1. Sign in to the [X Developer Console](https://console.x.com/), then create or select an App.
2. Make sure the developer account has pay-per-use credits available.
3. Configure the App's OAuth 1.0a permissions:
   - Choose **Read and write** to publish posts.
   - Choose **Read, write, and Direct Messages** to send DMs.
4. Generate and save both OAuth 1.0a credential pairs:
   - **API Key and Secret**
   - **Access Token and Secret**

:::caution
X displays credential secrets only when they are generated. Store all four values securely. If a secret was not saved, regenerate its credential pair.

After changing OAuth 1.0a App permissions, regenerate the **Access Token and Secret** so the new tokens receive those permissions. Previously generated tokens keep their original permissions.
:::

Map the four values into the Apprise URL as follows:

| X Developer Console | Apprise URL token |
| ------------------- | ----------------- |
| API Key             | `ConsumerKey`     |
| API Key Secret      | `ConsumerSecret`  |
| Access Token        | `AccessToken`     |
| Access Token Secret | `AccessSecret`    |

:::caution
Do not substitute an OAuth 2.0 Client ID, Client Secret, Access Token, or Refresh Token, and do not use the app-only Bearer Token. Apprise currently expects the four OAuth 1.0a values listed above.
:::

## Syntax

Valid syntax is as follows (`x://`, `twitter://`, and `tweet://` are all accepted aliases):

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`
- `x://{ScreenName}@{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`

If you know the targets you wish to identify, they can be targeted by their X Screen Name:

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName}`
- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName1}/{ScreenName2}/{ScreenNameN}`

:::note
`x://` and `twitter://` default to Direct Message mode. If no ScreenName is specified, the DM is sent to the account represented by the Access Token.

Use `?mode=tweet` or the `tweet://` alias when you want to publish a public post.
:::

A public tweet can be referenced like so (requires X API v2 write access):

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}?mode=tweet`

## Parameter Breakdown

| Variable       | Required | Description                                                                                                                           |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ScreenName     | No       | X username to receive the Direct Message, without the leading `@`. If omitted in DM mode, Apprise messages the authenticated account. |
| ConsumerKey    | Yes      | OAuth 1.0a API Key from the X App.                                                                                                    |
| ConsumerSecret | Yes      | OAuth 1.0a API Key Secret from the X App.                                                                                             |
| AccessToken    | Yes      | OAuth 1.0a Access Token representing the account that will publish the post or send the DM.                                           |
| AccessSecret   | Yes      | OAuth 1.0a Access Token Secret paired with `AccessToken`.                                                                             |
| Mode           | No       | Use `tweet` to publish a public post or `dm` to send a Direct Message. The default is `dm`.                                           |
| batch          | No       | Images are grouped by default. Set this to `False` to publish one post per attachment.                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a public tweet (requires X API v2 write access):

```bash
# Assuming our {ConsumerKey} is T1JJ3T3L2
# Assuming our {ConsumerSecret} is A1BRTD4JD
# Assuming our {AccessToken} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {AccessSecret} is FDVJaj4jcl8chG3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   x://T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3?mode=tweet
```

Or using the `tweet://` schema alias (implies `mode=tweet`):

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   tweet://T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Send a X DM to @testaccount (requires X API DM write permissions):

```bash
# Assuming our {ConsumerKey} is T1JJ3T3L2
# Assuming our {ConsumerSecret} is A1BRTD4JD
# Assuming our {AccessToken} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {AccessSecret} is FDVJaj4jcl8chG3
# our user is @testaccount
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   x://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Or

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twitter://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```
