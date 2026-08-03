---
title: "Signal API Notifications"
description: "Send Signal API notifications."
sidebar:
  label: "Signal API"

source: https://github.com/bbernhard/signal-cli-rest-api

schemas:
  - signal: insecure
  - signals

has_chat: true
has_selfhosted: true
has_attachments: true

sample_urls:
  - signal://{user}:{password}@{hostname}/{from_phone}
  - signal://{user}:{password}@{hostname}:{port}/{from_phone}
  - signal://{user}:{password}@{hostname}/{from_phone}/{target}
---

## Signal API

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

First of all you need a Signal account. So it is presumed you've either got the Apple or Android version of the Signal software.

From here, the plugin assumes you have configured yourself up with the [Signal Rest API Service](https://github.com/bbernhard/signal-cli-rest-api).

A simple setup might be:

```bash
# Create a directory for our configuration to get stored into
mkdir -p $HOME/.signal-api

# Launch a Signal API instance that listens on port 9922
docker run -d --name signal-api --restart=always -p 9922:8080 \
 -v $HOME/.signal-api:/home/.local/share/signal-cli \
   -e 'MODE=native' -e SIGNAL_CLI_UID=$(id -u) -e SIGNAL_CLI_GID=$(id -g) \
   bbernhard/signal-cli-rest-api
```

If all goes well, you should be able to point your browser to: `http://localhost:9922/v1/qrcodelink?device_name=signal-api` and from your phone app, follow the instructions to add a **Linked Device**.

The **`{FromPhoneNo}`** must be the number associated with your account.

## Syntax

Valid syntax is as follows:

- `signal://{user}:{password}@{hostname}/{from_phone}`
- `signal://{user}:{password}@{hostname}:{port}/{from_phone}`
- `signal://{user}:{password}@{hostname}/{from_phone}/{target}`
- `signal://{user}:{password}@{hostname}:{port}/{from_phone}/{target}`

You can post in multiple chats by simply chaining them at the end of the URL.

- `signal://{user}:{password}@{hostname}:{port}/{from_phone}/{target1}/{target2}/{target3}`
- `signals://{user}:{password}@{hostname}:{port}/{from_phone}/{target1}/{target2}/{target3}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                      |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| hostname | Yes      | The Web Server's hostname                                                                                                                        |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **signal://** and **443** for all **signals://** references.          |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                                |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                                |
| from     | Yes      | This must be a _From Phone Number_ you've added to the API service.                                                                              |
| to       | **\*No** | A phone number or group id you wish to send your notification to. If one isn't specified, then the `from` is used instead.                       |
| batch    | No       | Send multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`.                     |
| status   | No       | Optionally include a small little ASCII string representing the notification status being sent (inline with it) by default this is set to `yes`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

### Acquiring A Group ID

Groups can be created in the app, or via the [Signal Rest API Service](https://github.com/bbernhard/signal-cli-rest-api).
To get a list of available groups and their ids run:

```bash
curl -X GET -H "Content-Type: application/json" localhost:9922/v1/groups/+15555551234 | jq
```

Example output is as follows:

```json
[
  {
    "name": "Test Group",
    "id": "group.abcdefghijklmnop=",
    "internal_id": "aabbccdd/eeffgghh=",
    "members": [
      "+1555555551234
      "+16666661234"
    ],
      "blocked": false,
      "pending_invites": [],
      "pending_requests": [],
      "invite_link": "",
      "admins": [
      "+1555555551234"
    ]
  }
]

The takeaway from the above is the group
```

Example sending a notification to a group: `group.aabbccdd/eeffgghh=` identified by the `id`.

## Examples

Send a Signal Notification (via Signal API):

```bash
# Assuming our {Hostname} is localhost (hosting the bbernhard/signal-cli-rest-api)
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "signal://localhost/19005559999/18005551223"

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "signal://localhost/1-(900) 555-9999/1-(800) 555-1223"
```

Based on my personal experiences, I was able to send a notification to myself by simply doing the following:

```bash
# Assuming our {Hostname} is localhost (hosting the bbernhard/signal-cli-rest-api)
# Assuming our {Port} is 9922
# Assuming our {FromPhoneNo} is +1 555 555 1234
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "signal://localhost:9922/15555551234"
```

If you know the Group ID you want to notify, you can idenify it as well on the command line:

```bash
# Assuming our {Hostname} is localhost (hosting the bbernhard/signal-cli-rest-api)
# Assuming our {Port} is 9922
# Assuming our {FromPhoneNo} is +1 555 555 1234
# Assuming our {Group} is group.abcdefghijklmnop=
apprise -vv -t "Group Message:" -b "Hello group members" \
    "signal://localhost:9922/+1555555551234/group.abcdefghijklmnop="
```

I could even send an attachment without a problem:

```bash
apprise -vv -t -b "test" \
   signal://localhost:9922/15555551234 --attach apprise-test.gif
```

Which produced:
![image](./images/168930313-05e2bfb2-48f3-4a0a-b0ef-e5c601c97703.png)

## Troubleshooting

### Signal API sends my SMS message, but Apprise reports a failure

The message was sent, but `signal-cli-rest-api` took longer than Apprise's
default 4-second timeout to confirm it. When using the Apprise API, this may be
logged as `A Connection error occured sending ...`, and a priority chain may
continue to the next service. It can be more noticeable on the first message
after a Gunicorn worker restarts.

Give the server more time to respond by adding `?rto=8` to the Apprise URL:

```text
signal://localhost:9922/15555551234?rto=8
```

The value is the number of seconds Apprise will wait. If the URL already has
options after a `?`, add `&rto=8` instead. Use a larger value if needed.

Native mode may also improve response time on some systems. The Docker example
above already enables it with:

```bash
-e 'MODE=native'
```

If the problem continues, try moving the Signal API container to a faster or
less busy machine.
