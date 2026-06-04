---
title: "Notifications Bluesky"
description: "Envoyer des notifications Bluesky."
sidebar:
  label: "Bluesky"

source: https://bsky.app/
schemas:
  - bluesky

sample_urls:
  - bluesky://user@app_pw
  - bluesky://user.host@app_pw

has_attachments: true

limits:
  max_chars: 280
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Creez un compte Bluesky.
1. Ouvrez `Settings -> Privacy and Security`.
1. Generez un `App Password`.
1. Assemblez ensuite votre URL Apprise, par exemple :
   - bluesky://handle@you-token-here

## Syntaxe

La syntaxe valide est la suivante :

- `bluesky://user@app_pw`
- `bluesky://user.host@app_pw`
  - Cela n'est necessaire que si le `host` n'est pas `bsky.social`

## Exemples

Envoyer un message public :

```bash
# Supposons que notre {Handle} soit @John
# Supposons que notre {AppID} soit abcd-1234-efghi-6789

# notre utilisateur est @testaccount
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "bluesky://John@abcd-1234-efghi-6789"

```
