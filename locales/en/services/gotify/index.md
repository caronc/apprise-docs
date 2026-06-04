---
title: "Gotify Notifications"
description: "Send Gotify notifications."
sidebar:
  label: "Gotify"

source: https://github.com/gotify/server

schemas:
  - gotify: insecure
  - gotifys

has_selfhosted: true

sample_urls:
  - gotify://{hostname}/{token}
  - gotifys://{hostname}:{port}/{token}
  - gotifys://{hostname}:{port}/{path}/{token}
  - gotifys://{hostname}/{token}/?priority=high
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntax

Valid syntax is as follows:

- `gotify://{hostname}/{token}`
- `gotifys://{hostname}/{token}`
- `gotifys://{hostname}:{port}/{token}`
- `gotifys://{hostname}/{path}/{token}`
- `gotifys://{hostname}:{port}/{path}/{token}`
- `gotifys://{hostname}/{token}/?priority=high`

Secure connections (via https) should be referenced using **gotifys://** where as insecure connections (via http) should be referenced via **gotify://**.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Gotify server you're sending your notification to.                                                                                                                                                                                                                    |
| token    | Yes      | The Application Token you generated on your Gotify Server                                                                                                                                                                                                                 |
| port     | No       | The port the Gotify server is listening on. By default the port is **80** for **gotify://** and **443** for all **gotifys://** references.                                                                                                                                |
| path     | No       | For those that host their Gotify server on a hostname that requires you to specify an additional path prefix may just include this as part of their URL string (the default is '**/**'). What is important here is the final entry of your URL must still be the _token_. |
| priority | No       | The priority level to pass the message along as. Possible values are **low**, **moderate**, **normal**, and **high**. If no priority is specified then **normal** is used.                                                                                                |
| format   | No       | The message format to announce to Gotify. By default all information is identified as `text`. But you can alternatively set this value to `markdown` as well.                                                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Gotify message:

```bash
# Assuming our {hostname} is localhost
# Assuming our {token} is abcdefghijklmn
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gotify://gotify.server.local/abcdefghijklmn"

# If your server is being hosted elsewhere and requires you to specify an
# additional path to get to it, you can notify it as follows:
# Assuming our {hostname} is localhost
# Assuming our {token} is abcdefghijklmn
# Assuming our {path} is /my/gotify/path/
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gotify://gotify.server.local/my/gotify/path/abcdefghijklmn"
```

There is also **markdown** support if you want to leverage it; simply add `format=markdown` into your URL:

```bash
# Assuming our {hostname} is localhost
# Assuming our {token} is abcdefghijklmn
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gotify://gotify.server.local/abcdefghijklmn?format=markdown"
#                                                ^      ^
#                                                |      |
```
