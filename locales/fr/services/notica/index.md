---
title: "Notifications Notica"
description: "Envoyer Notica notifications."
sidebar:
  label: "Notica"

source: https://notica.us/

schemas:
  - notica

sample_urls:
  - notica://{host}/{token}
  - notica://{user}@{host}/{token}
  - notica://{user}@{host}:{port}/{token}
  - notica://{user}:{password}@{host}/{token}
  - notica://{user}:{password}@{host}:{port}/{token}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Notica doesn't require you to create an account at all. You just have to visit [their website](https://notica.us/) at least once to both:

1. Get your token
1. Enable Browser Notifications (to be sent from the Notica website)

The website will generate you a URL to post to that looks like this:
`https://notica.us/?abc123`

This effectively equates to: `https://notica.us/?{token}`
Note: _disregard the question mark on the URL as it is not part of the token_.

From here you have two options, you can directly pass the Notica URL into apprise exactly how it is shown to you from the website, or you can reconstruct the URL into an Apprised based one (which equates to _slightly_ faster load times) as: `notica://{token}`

## Syntaxe

La syntaxe valide est la suivante :

- `https://notica.us/?{token}`
- `notica://{token}`

For self hosted solutions, you can use the following:

- `notica://{host}/{token}`
- `notica://{host}:{port}/{token}`
- `notica://{user}@{host}/{token}`
- `notica://{user}@{host}:{port}/{token}`
- `notica://{user}:{password}@{host}/{token}`
- `notica://{user}:{password}@{host}:{port}/{token}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                        |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Yes      | The Token that was generated for you after visiting their [website](https://notica.us/). Alternatively this should be the token used by your self hosted solution. |

A self hosted solution allows for a few more parameters:

| Variable | Required | Description                                                                                                                             |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The Web Server's hostname.                                                                                                              |
| port     | No       | The port our Web server is listening on. By default the port is **80** for **notica://** and **443** for all **noticas://** references. |
| user     | No       | If you're system is set up to use HTTP-AUTH, you can provide _username_ for authentication to it.                                       |
| password | No       | If you're system is set up to use HTTP-AUTH, you can provide _password_ for authentication to it.                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notica notification:

```bash
# Assuming our {token} is abc123

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   notica://abc123
```

### Manipulation des en-tetes

Self-hosted solutions may require users to set special HTTP headers when they post their data to their server. This can be accomplished by just sticking a hyphen (**-**) in front of any parameter you specify on your URL string.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {token} is abc123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "notica://localhost/abc123/?-X-Token=abcdefg"

# Multiple headers just require more entries defined with a hyphen in front:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {token} is abc123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "notica://localhost/abc123/?-X-Token=abcdefg&-X-Apprise=is%20great"
```
