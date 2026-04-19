---
title: "XMPP Notification Testing"
description: "Testing XMPP Notifications"
sidebar:
  label: "XMPP Testing"
---

## Prosody

### Server Setup

```bash
docker run --rm -d \
  --name prosody-test \
  -p 5222:5222 \
  -e PROSODY_VIRTUAL_HOSTS=localhost \
  -e PROSODY_LOGLEVEL=debug \
  prosodyim/prosody:13.0
```

### Create Test Users

```bash
docker exec -it prosody-test prosodyctl register apprise localhost password123
docker exec -it prosody-test prosodyctl register receiver localhost password123

```

### Install the Client

Download and install [Gajim](https://gajim.org/)

```bash
sudo dnf install gajim
```

Log in as `receiver@localhost` and password `password123`

### Test Apprise

Envoyer une notification

```bash
# starttls setup below:
tox -e apprise -- -vv -b 'test message' \
   'xmpps://apprise:password123@localhost/receiver?verify=no'
```
