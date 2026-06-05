---
title: "Streamlabs Notifications"
description: "Send Streamlabs notifications."
sidebar:
  label: "Streamlabs"

source: https://streamlabs.com/

schemas:
  - strmlabs

sample_urls:
  - strmlabs://{access_token}/
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

The process to get signed up with Streamlabs is a bit lengthy.

**Note:** The screenshots and instructions below are 100% full credit to the **[LNBits Project](https://github.com/Fittiboy/lnbits)** ([found here](https://github.com/Fittiboy/lnbits/tree/master/lnbits/extensions/streamalerts#stream-alerts)).

At the moment, the only service that has an open API to work with is Streamlabs, so this setup requires linking your Twitch/YouTube/Facebook account to Streamlabs.

1. Log into [Streamlabs](https://streamlabs.com/login?r=https://streamlabs.com/dashboard).
1. Navigate to the API settings page to register an App:  
   ![image](./images/127759145-710d53b6-3c19-4815-812a-9a6279d1b8bb.png)  
   ![image](./images/127759182-da8a27cb-bb59-48fa-868e-c8892080ae98.png)  
   ![image](./images/127759201-7c28e9f1-6286-42be-a38e-1c377a86976b.png)
1. Fill out the form with anything it will accept as valid. Most fields can be gibberish, as the application is not supposed to ever move past the "testing" stage and is for your personal use only.
   In the "Whitelist Users" field, input the username of a Twitch account you control. While this feature is _technically_ limited to Twitch, you can use the alerts overlay for donations on YouTube and Facebook as well.
   For now, simply set the "Redirect URI" to `http://localhost`, you will change this soon.
   Then, hit create:  
   ![image](./images/127759264-ae91539a-5694-4096-a478-80eb02b7b594.png)
1. Now we'll take the Client ID from the Streamlabs page and generate a code that will be used for apprise to communicate with Streamlabs
   Replace the placeholders in the link below with your Client ID
   `https://www.streamlabs.com/api/v1.0/authorize?client_id=<YOURCLIENTID>&redirect_uri=http://localhost&response_type=code&scope=donations.read+donations.create+alerts.create`
   You are redirected to localhost
   copy the url param code that is specified in the browser url bar
   `http://localhost/?code=<YOURCODE>`
1. Generate an access token using your code generated in the last step, your Client ID, and your Secret
   Open a terminal and make a request to generate an access token that Apprise will utilize

```bash
curl --request POST --url 'https://streamlabs.com/api/v1.0/token' -d  'grant_type=authorization_code&code=<YOURCODE>&client_id=<YOURCLIENTID>&client_secret=<YOURSECRET>&redirect_uri=http%3A%2F%2Flocalhost'
```

``Similar JSON should be returned`{"access_token":<YOURACCESSTOKEN>,"token_type":"Bearer","expires_in":3600,"refresh_token":""}`
Note that the access token does not expire

1. Now copy and paste your access token to build the streamlabs url
   `strmlabs://<YOURACCESSTOKEN>/?call=DONATIONS`

## Syntax

Valid syntax is as follows:

- `strmlabs://{access_token}/`

## Parameter Breakdown

| Variable     | Required | Description                                              |
| ------------ | -------- | -------------------------------------------------------- |
| access_token | Yes      | The access token generated from your Streamlabs account. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Streamlabs notification:

```bash
# Assuming our {access_token} is abcdefghij1234567890
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   strmlabs://abcdefghij1234567890/
```
