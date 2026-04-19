---
title: "Notifications Custom XML"
description: "Envoyer HTML/XML based notifications."
sidebar:
  label: "HTTP/XML"
group: "custom"
schemas:
  - xml: insecure
  - xmls
has_selfhosted: true
has_attachments: true
has_image: true

sample_urls:
  - xmls://{hostname}
  - xml://{hostname}:{port}
  - xml://{user}:@{hostname}
  - xmls://{user}:@{hostname}:{port}
  - xml://{user}:{password}@{hostname}
  - xmls://{user}:{password}@{hostname}:{port}
---

<!-- SERVICE:DETAILS -->

## Introduction

This is just a custom Notification that allows you to have this tool post to a web server as a simple XML string. This is useful for those who want to be notified via their own custom methods.

The format might look something like this:

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Body>
        <Notification xmlns:xsi="http://nzbget.lead2gold.org/notify/NotifyXML-1.0.xsd">
            <Version>1.0</Version>
            <Subject>What A Great Movie Downloaded Successfully</Subject>
            <MessageType>info</MessageType>
            <Message>Plenty of details here...</Message>
       </Notification>
    </soapenv:Body>
</soapenv:Envelope>
```

The _MessageType_ will be one of the following:

- **info**: An informative type message
- **success**: A successful report
- **failure**: A failure report
- **warning**: A warning report

## Syntaxe

La syntaxe valide est la suivante :

- `xml://{hostname}`
- `xml://{hostname}:{port}`
- `xml://{user}:{password}@{hostname}`
- `xml://{user}:{password}@{hostname}:{port}`

Adding an `s` to the schema (i.e. `xmls://`) switches to a secure HTTPS connection:

- `xmls://{hostname}`
- `xmls://{hostname}:{port}`
- `xmls://{user}:{password}@{hostname}`
- `xmls://{user}:{password}@{hostname}:{port}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                                                         |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Web Server's hostname                                                                                                                                                                           |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **xml://** and **443** for all **xmls://** references.                                                                   |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                                                                                   |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                                                                                   |
| method   | No       | Optionally specify the server http method; possible options are `post`, `put`, `get`, `delete`, `patch`, `head`, `update`, and `options`. By default if no method is specified then `post` is used. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une XML notification to our web server listening on port 80:

```bash
# Assuming our {hostname} is xml.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   xml://xml.server.local
```

### HTTP Method

By default all notifications are sent as a `POST` request. Override this with the `method` URL parameter:

```bash
# Send as a PUT request
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost/?method=put"

# Send as a DELETE request
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost/?method=delete"

# Send as a PATCH request
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost/?method=patch"
```

The full list of supported methods is: `post` (default), `get`, `put`, `delete`, `patch`, `head`, `update`, and `options`.

> **Note:** When `method=get` is used, the XML body is still sent as a request body. To pass parameters as URL query strings instead, use the `-` prefix (see [GET Parameter Manipulation](#get-parameter-manipulation) below).

### Payload Manipulation

Making use of the `:` on the Apprise URL allows you to alter and add to the content posted upstream to a remote server.

> **Note:** XML element names must be valid identifiers. Any characters outside of `[A-Za-z0-9_-]` are stripped automatically from the `:key` name.

```bash
# Add to the payload delivered to the remote server as if it was part
# the prepared message Apprise would have otherwise put together
#
# Assuming our {hostname} is localhost
# Assuming we want to include "Sound": "oceanwave" as part of the existing payload:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost/?:Sound=oceanwave"
```

The above would post a message such as:

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Body>
        <Notification xmlns:xsi="http://nzbget.lead2gold.org/notify/NotifyXML-1.0.xsd">
            <Version>1.0</Version>
            <Subject>Test Message Title</Subject>
            <MessageType>info</MessageType>
            <Message>Test Message Body</Message>
            <Sound>oceanwave</Sound>
       </Notification>
    </soapenv:Body>
</soapenv:Envelope>
```

You can also remove built-in elements from the output by setting their value to empty:

```bash
# Remove the Version and MessageType elements from the payload:
# Assuming our {hostname} is localhost
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost/?:Version&:MessageType"
```

The above would post a message such as:

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Body>
        <Notification>
            <Subject>Test Message Title</Subject>
            <Message>Test Message Body</Message>
       </Notification>
    </soapenv:Body>
</soapenv:Envelope>
```

> **Note:** When any payload customisation is applied (adding, removing, or remapping elements), the XSD namespace attribute is omitted from the `<Notification>` element.

Finally, you can remap a built-in element to a different tag name:

```bash
# Remap "Message" to "Body" and "Subject" to "Title":
# Assuming our {hostname} is localhost
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost/?:Message=Body&:Subject=Title"
```

The above would post a message such as:

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Body>
        <Notification>
            <Version>1.0</Version>
            <Title>Test Message Title</Title>
            <MessageType>info</MessageType>
            <Body>Test Message Body</Body>
       </Notification>
    </soapenv:Body>
</soapenv:Envelope>
```

### Manipulation des en-tetes

Some users may require special HTTP headers to be present when they post their data to their server. This can be accomplished by just sticking a plus symbol (**+**) in front of any parameter you specify on your URL string.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost:8080/path/?+X-Token=abcdefg"

# Multiple headers just require more entries defined:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost:8080/path/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

### GET Parameter Manipulation

Some users may require GET parameters to be part of their POST. Any parameters you pass onto the Apprise command line are interpreted by Apprise itself as options/actions you wish to perform (such as changing `method=update`, or `cto=3`). To have Apprise ignore what was specified and past the content `as-is` upstream, you just need to prefix your entries with a minus (`-`) symbol.

```bash
# The below for example would post to http://localhost:8000?token=abcdefg
#
# The `-` symbol will get stripped off when the upstream post takes place
# Apprise knows not to do anything with the argument at all and pass it along as is.
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xml://localhost:8080/?-token=abcdefg"

# If you want to pass more then one element, just chain them:
# The below would send a a POST to:
#  https://example.ca/my/path?key1=value1&key2=value2
#
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "xmls://example.ca/my/path?-key1=value1&-key2=value2"
```
