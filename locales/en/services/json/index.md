---
title: "Custom JSON Notifications"
description: "Send HTML/JSON based notifications."
sidebar:
  label: "HTTP/JSON"
group: "custom"
schemas:
  - json: insecure
  - jsons
has_selfhosted: true
has_attachments: true
has_image: true

sample_urls:
  - json://{hostname}
  - jsons://{hostname}:{port}
  - jsons://{user}:@{hostname}
  - json://{user}:@{hostname}:{port}
  - jsons://{user}:{password}@{hostname}
  - json://{user}:{password}@{hostname}:{port}
---

<!-- SERVICE:DETAILS -->

## Introduction

This is just a custom Notification that allows you to have this tool post to a web server as a simple JSON string. This is useful for those who want to be notified via their own custom methods.

The format might look something like this:

```json
{
  "version": "1.0",
  "title": "Some Great Software Downloaded Successfully",
  "message": "Plenty of details here",
  "type": "info"
}
```

The _type_ will be one of the following:

- **info**: An informative type message
- **success**: A successful report
- **failure**: A failure report
- **warning**: A warning report

## Syntax

Valid syntax is as follows:

- `json://{hostname}`
- `json://{hostname}:{port}`
- `json://{user}:{password}@{hostname}`
- `json://{user}:{password}@{hostname}:{port}`

Adding an `s` to the schema (i.e. `jsons://`) switches to a secure HTTPS connection:

- `jsons://{hostname}`
- `jsons://{hostname}:{port}`
- `jsons://{user}:{password}@{hostname}`
- `jsons://{user}:{password}@{hostname}:{port}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                         |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Web Server's hostname                                                                                                                                                                           |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **json://** and **443** for all **jsons://** references.                                                                 |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                                                                                   |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                                                                                   |
| method   | No       | Optionally specify the server http method; possible options are `post`, `put`, `get`, `delete`, `patch`, `head`, `update`, and `options`. By default if no method is specified then `post` is used. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a JSON notification to our web server listening on port 80:

```bash
# Assuming our {hostname} is json.server.local
apprise json://json.server.local
```

### Payload Manipulation

Making use of the `:` on the Apprise URL allows you to alter and add to the content posted upstream to a remote server.

```bash
# Add to the payload delivered to the remote server as if it was part
# the prepared message Apprise would have otherwise put together
#
# Assuming our {hostname} is localhost
# Assuming we want to include "sound": "oceanwave" as part of the existing payload:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "json://localhost/?:sound=oceanwave"
```

The above would post a message such as:

```json
{
  "version": "1.0",
  "title": "Test Message Title",
  "message": "Test Message Body",
  "type": "info",
  "sound": "oceanwave"
}
```

You can also clear entries from showing by setting their values to being empty:

```bash
# Clear version and type from the payload:
# Assuming our {hostname} is localhost
# Assuming we want to clear both version and type from the output:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "json://localhost/?:version&:type"
```

The above would post a message such as:

```json
{
  "title": "Test Message Title",
  "message": "Test Message Body"
}
```

Finally, you can re-map values such as having the message go into a `body` tag instead:

```bash
# Add to the payload delivered to the remote server as if it was part
# the prepared message Apprise would have otherwise put together
#
# Assuming our {hostname} is localhost
# Assuming we want to remap the message section to body:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "json://localhost/?:message=body"
```

The above would post a message such as:

```json
{
  "version": "1.0",
  "title": "Test Message Title",
  "body": "Test Message Body",
  "type": "info"
}
```

### Header Manipulation

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "json://localhost:8080/path/?+X-Token=abcdefg"

# Multiple headers just require more entries defined:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "json://localhost:8080/path/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

### GET Parameter Manipulation

Some users may require GET parameters to be part of their POST. Any parameters you pass onto the Apprise command line are interpreted by Apprise itself as options/actions you wish to perform (such as changing `method=update`, or `cto=3`). To have Apprise ignore what was specified and past the content `as-is` upstream, you just need to prefix your entries with a minus (`-`) symbol.

```bash
# The below for example would post to http://localhost:8000?token=abcdefg
#
# The `-` symbol will get stripped off when the upstream post takes place
# Apprise knows not to do anything with the argument at all and pass it along as is.
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "json://localhost:8080/?-token=abcdefg"

# If you want to pass more then one element, just chain them:
# The below would send a a POST to:
#  https://example.ca/my/path?key1=value1&key2=value2
#
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jsons://example.ca/my/path?-key1=value1&-key2=value2"
```
