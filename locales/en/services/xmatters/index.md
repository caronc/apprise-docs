---
title: "xMatters Notifications"
description: "Raise xMatters alerts through a workflow's HTTP trigger."
sidebar:
  label: "xMatters"

source: https://www.xmatters.com

schemas:
  - xmatters

has_incident: true

body_formats:
  - text

sample_urls:
  - xmatters://{apikey}@{host}/{integration_id}
  - xmatters://{apikey}@{host}/{integration_id}/{recipient}
  - xmatters://{user}:{password}@{host}/{integration_id}/{recipient}
  - https://{company}.xmatters.com/api/integration/1/functions/{integration_id}/triggers?apiKey={apikey}

limits:
  - name: "Title"
    max_chars: 250
  - name: "Body"
    max_chars: 32768
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

xMatters (by Everbridge) is an incident management and on-call alerting platform. Apprise raises alerts through the **Trigger Alerts by Webhook** workflow:

1. Sign in to xMatters and open the **Workflows** tab.
2. Open **Workflow Templates**, click the **Trigger Alerts by Webhook** tile, then click **Next**.
3. Choose an authentication method. **URL Authentication** is the simplest because the API key is part of the URL.
4. Copy the trigger URL. It looks like `https://acmeco.xmatters.com/api/integration/1/functions/ba601cb1-3513-4320-b48a-05cb501bb5af/triggers?apiKey=ffcd4dec-8a49-4a67-9e59-ed9fabcb002d&recipients=jdoe`.

You can give that URL to Apprise exactly as you copied it. You can also build an `xmatters://` URL from its parts:

- `acmeco.xmatters.com` is your **host**. Your company name on its own (`acmeco`) also works.
- `ba601cb1-3513-4320-b48a-05cb501bb5af` is your **integration ID**.
- The `apiKey` value is your **API key**.
- The `recipients` values are the xMatters users, groups or dynamic teams to notify.

For the example above, the Apprise URL is `xmatters://ffcd4dec-8a49-4a67-9e59-ed9fabcb002d@acmeco/ba601cb1-3513-4320-b48a-05cb501bb5af/jdoe`.

If you chose **Basic Authentication** or **API Key Authentication** instead, put your username and password (or API key and secret) in front of the host: `xmatters://{user}:{password}@acmeco/{integration_id}/jdoe`.

## Syntax

Valid syntax is as follows:

- `xmatters://{apikey}@{host}/{integration_id}`
- `xmatters://{apikey}@{host}/{integration_id}/{recipient}`
- `xmatters://{apikey}@{host}/{integration_id}/{recipient1}/{recipient2}/{recipientN}`
- `xmatters://{user}:{password}@{host}/{integration_id}/{recipient}`
- `https://{company}.xmatters.com/api/integration/1/functions/{integration_id}/triggers?apiKey={apikey}&recipients={recipient}`

## Parameter Breakdown

| Variable       | Required | Description                                                                                                                                                     |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host           | Yes      | Your xMatters host, for example `acmeco.xmatters.com`. If you only give your company name (`acmeco`), `.xmatters.com` is added for you.                         |
| integration_id | Yes      | The ID found in your trigger URL, between `/functions/` and `/triggers`.                                                                                        |
| apikey         | \*Yes    | The API key from a trigger that uses **URL Authentication**. You can also pass it as `?apikey=`.                                                                |
| user           | \*Yes    | Your xMatters username, or the API key when the trigger uses **API Key Authentication**. Use it together with **password**.                                     |
| password       | \*Yes    | Your xMatters password, or the secret when the trigger uses **API Key Authentication**.                                                                         |
| recipient      | No       | One or more xMatters users, groups or dynamic teams to notify. Names with spaces work. You can also pass them as `?to=` or `?recipients=`, separated by commas. |

\*Use either an **apikey**, or a **user** and **password**.

The title becomes the alert summary and the body becomes the alert message. When no title is given, the start of the body is used as the summary. The webhook trigger does not accept file attachments.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Raise an xMatters alert for one person:

```bash
# Assuming our {apikey} is ffcd4dec-8a49-4a67-9e59-ed9fabcb002d
# Assuming our {host} is acmeco.xmatters.com
# Assuming our {integration_id} is ba601cb1-3513-4320-b48a-05cb501bb5af
apprise -vv -t "Disk space low" -b "Only 2% free on /var" \
   "xmatters://ffcd4dec-8a49-4a67-9e59-ed9fabcb002d@acmeco/ba601cb1-3513-4320-b48a-05cb501bb5af/jdoe"
```

Use the trigger URL exactly as copied from xMatters:

```bash
apprise -vv -t "Disk space low" -b "Only 2% free on /var" \
   "https://acmeco.xmatters.com/api/integration/1/functions/ba601cb1-3513-4320-b48a-05cb501bb5af/triggers?apiKey=ffcd4dec-8a49-4a67-9e59-ed9fabcb002d&recipients=jdoe"
```

Notify a person and a group, using Basic Authentication:

```bash
apprise -vv -t "Backup failed" -b "Nightly backup did not finish" \
   "xmatters://jdoe:mypassword@acmeco/ba601cb1-3513-4320-b48a-05cb501bb5af/jdoe/Database%20Admins"
```
