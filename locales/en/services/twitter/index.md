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
  - name: "Private Message"
    max_chars: 25000
  - name: "Tweet"
    max_chars: 280
---

<!-- SERVICE:DETAILS -->

## Account Setup

You need to register to X developer account at [developer.x.com](https://developer.x.com/en).

X Direct Messages are slightly more complicated then some of the other notification services, so here is quick breakdown of what you need to know and do in order to send Notifications through it using this tool:

### If there are Project and App

When you registered to X developer account, you may have already created a default project and app. You can use this app and it's through an X App we will be able to send our DMs.

1. First off, you'll need to **regenerate the API Keys**. This is done by accessing the app name under **Projects & Apps** (on left menu), then under the **Consumer Keys** from the "_Keys and tokens_" Tab. Once generated, copy it to a safe place. This is **Consumer Keys**.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)
2. Next, grant the appropriate access permissions so that you can post or send DMs. After clicking on the app name under **Projects & Apps** (on left menu), click on **Set up** under the **User authentication settings** section.<br/>![X User authentication set up](./images/X-User-authentication-set-up.png)<br/>On the **User authentication settings** page, set the following
   - **App permissions**\
     Select **Read and write** if you want to post only. If you want to send DMs, select **Read and write and Direct message**.
   - **Type of App**\
     Select **Web App, Automated App or Bot**
   - **App info**\
     Enter any URL for **Callback URI / Redirect URL** and **Website URL**. If you are using Apprise to send posts or DMs, it doesn't matter what you enter.

   Once you entered them all, click **Save**.

3. Lastly, you'll need to **regenerate the Access Tokens**. This is done under the **Authentication Tokens** from the "_Keys and tokens_" Tab. Once generated, copy it to a safe place.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)

### If there is no Project and App

1. First off, you need to create a project and an X App (not Standalone apps) from [developer.x.com](https://developer.x.com/en/portal/projects-and-apps). It's through an X App we will be able to send our DMs.<br/>![X Create Project](./images/X-Create-Project.png)<br/>X asks you to justify why you need it as long as you specify the purpose of your app in detail.
2. Once you created the app, you'll see the **API Tokens** on the screen, so copy it to a safe place. This is **Consumer Keys**.<br/>![X App API Key](./images/X-App-API-Key.png)
3. Next, grant the appropriate access permissions so that you can post or send DMs. After clicking on the app name under **Projects & Apps** (on left menu), click on **Set up** under the **User authentication settings** section.<br/>![X User authentication set up](./images/X-User-authentication-set-up.png)<br/>On the **User authentication settings** page, set the following
   - **App permissions**\
     Select **Read and write** if you want to post only. If you want to send DMs, select **Read and write and Direct message**.
   - **Type of App**\
     Select **Web App, Automated App or Bot**
   - **App info**\
     Enter any URL for **Callback URI / Redirect URL** and **Website URL**. If you are using Apprise to send posts or DMs, it doesn't matter what you enter.

   Once you entered them all, click **Save**.

4. Lastly, you'll need to **generate the Access Tokens**. This is done under the **Authentication Tokens** from the "_Keys and tokens_" Tab. Once generated, copy it to a safe place.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)

You should now have the following 4 tokens ready to use.

- A Consumer Key (An API Key)
- A Consumer Secret (An API Secret)
- An Access Token
- An Access Token Secret

From here you're ready to go. You can post public posts or simply create DMs through the use of the `mode=` variable. By default Direct Messaging (DM) is used.

## Syntax

Valid syntax is as follows (`x://`, `twitter://`, and `tweet://` are all accepted aliases):

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`
- `x://{ScreenName}@{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`

If you know the targets you wish to identify; they can be targeted by their X Screen Name:

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName}`
- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName1}/{ScreenName2}/{ScreenNameN}`

> [!NOTE]
> If no ScreenName is specified, then by default the Direct Message is sent to your own account.

A Public post can be referenced like so:

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}?mode=tweet`

## Parameter Breakdown

| Variable       | Required | Description                                                                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ScreenName     | Yes      | The UserID of your account such as _l2gnux_ (if your id is @l2gnux). You must specify a `{userid}` _or_ an `{ownerid}`.                                     |
| ConsumerKey    | Yes      | The Consumer Key (API Key)                                                                                                                                  |
| ConsumerSecret | Yes      | The Consumer Secret Key (API Secret Key)                                                                                                                    |
| AccessToken    | Yes      | The Access Token; you would have had to generate this one from your X App Configuration.                                                                    |
| AccessSecret   | Yes      | The Access Secret; you would have had to generate this one from your X App Configuration.                                                                   |
| Mode           | No       | The X mode you want to operate in. Possible values are `dm` (for Private Direct Messages) and `tweet` to make a public post. By default this is set to `dm` |
| batch          | No       | By default images are batched together. However if you want your attachments to be posted 1 post per attachment, set this to False.                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a X DM to @testaccount:

```bash
# Assuming our {ConsumerKey} is T1JJ3T3L2
# Assuming our {ConsumerSecret} is A1BRTD4JD
# Assuming our {AccessToken} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {AccessSecret} is FDVJaj4jcl8chG3
# our user is @testaccount
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twitter://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Or

```bash
# Assuming our {ConsumerKey} is T1JJ3T3L2
# Assuming our {ConsumerSecret} is A1BRTD4JD
# Assuming our {AccessToken} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {AccessSecret} is FDVJaj4jcl8chG3
# our user is @testaccount
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   x://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Send a public post:

```bash
# Assuming our {ConsumerKey} is T1JJ3T3L2
# Assuming our {ConsumerSecret} is A1BRTD4JD
# Assuming our {AccessToken} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {AccessSecret} is FDVJaj4jcl8chG3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twitter://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3?mode=tweet
```

Or

```bash
# Assuming our {ConsumerKey} is T1JJ3T3L2
# Assuming our {ConsumerSecret} is A1BRTD4JD
# Assuming our {AccessToken} is TIiajkdnlazkcOXrIdevi7F
# Assuming our {AccessSecret} is FDVJaj4jcl8chG3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   x://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3?mode=tweet
```
