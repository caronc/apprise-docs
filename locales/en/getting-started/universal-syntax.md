---
title: "Universal URL Syntax"
description: "Understanding the Apprise URL Structure"
sidebar:
  order: 5
---

## The Blueprint

Apprise uses a standardized URL schema to identify where notifications should be sent. No matter which service you are using, the format remains consistent:

```text
service://credentials/direction/?parameter=value
```

## Breakdown

### 1. The Schema (`service://`)

The `schema` determines which plugin Apprise loads.

- **`mailto://`**: Email
- **`tgram://`**: Telegram
- **`slack://`**: Slack

[View the full list of supported services](/services/).

### 2. Credentials & Host

Most services require authentication. Apprise maps these standard URL parts to the service's API requirements.

- **User/Pass:** `service://user:password@...`
- **API Tokens:** `service://token@...`
- **Hostnames:** `service://hostname`

### 3. The Target (`/direction`)

The `direction` (or path) tells Apprise **where** to send the message once authenticated. This varies by service but always represents the final destination.

- **Channels:** `slack://.../#general`
- **Phone Numbers:** `twilio://.../15555555555`
- **Chat IDs:** `tgram://.../123456789`

### 4. Parameters (`?key=value`)

Parameters allow you to tune the behavior of a specific notification. They are appended to the end of the URL starting with a `?`.

Parameters are unique to each service. For example, you can enable Text-to-Speech in Discord (`?tts=yes`) or add a CC recipient to an email (`?cc=user@example.ca`).

**Example:**
Sending an email to two people, in HTML format:

```text
mailto://user:pass@gmail.com/?to=jane@example.com&format=html
```

## Contextual Usage

You will use these URLs everywhere in Apprise:

1. **CLI arguments:** `apprise "service://..."`
2. **Configuration files:** Listed in your YAML or TEXT files.
3. **API calls:** Sent in the JSON payload.
