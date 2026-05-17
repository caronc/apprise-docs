---
title: "RingCentral Notifications"
description: "Send SMS and MMS notifications via RingCentral."
sidebar:
  label: "RingCentral"

source: https://ringcentral.com

schemas:
  - ringc

has_sms: true

sample_urls:
  - ringc://{SourcePhoneNo}:{Password}@{ClientID}/{ClientSecret}
  - ringc://{SourcePhoneNo}:{JWTToken}@{ClientID}/{ClientSecret}/{ToPhoneNo}
  - ringc://{SourcePhoneNo}:{JWTToken}@{ClientID}/{ClientSecret}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up at [https://ringcentral.com](https://ringcentral.com).
2. Log in to the [RingCentral Developer Console](https://developers.ringcentral.com/).
3. Click **Create App** and choose **REST API App** -> **Server/Bot (No UI)**.
4. Under **Permissions**, enable **SMS** (and **MMS** if you also need multimedia messages).
5. On the **Credentials** tab, copy the **Client ID** and **Client Secret**.

Two authentication modes are supported:

### BASIC mode (username + password)

Use the RingCentral user account password associated with your source phone number. This is the simpler option when you do not want to manage JWT tokens.

### JWT mode

Generate a JWT token in the developer portal and use it in place of the password. JWT tokens are longer (> 60 characters) and Apprise auto-detects this mode when no explicit `?mode=` is provided.

## Syntax

Valid syntax is as follows:

- `ringc://{SourcePhoneNo}:{Password}@{ClientID}/{ClientSecret}`
- `ringc://{SourcePhoneNo}:{Password}@{ClientID}/{ClientSecret}/{ToPhoneNo}`
- `ringc://{SourcePhoneNo}:{Password}@{ClientID}/{ClientSecret}/{To1}/{To2}/{ToN}`
- `ringc://{SourcePhoneNo}:{JWTToken}@{ClientID}/{ClientSecret}`
- `ringc://{SourcePhoneNo}:{JWTToken}@{ClientID}/{ClientSecret}/{ToPhoneNo}`

You can also supply credentials as query parameters (useful in YAML config files):

- `ringc://_?token={TokenOrPassword}&secret={ClientSecret}&from={SourcePhoneNo}`
- `ringc://_?token={TokenOrPassword}&secret={ClientSecret}&from={SourcePhoneNo}&to={ToPhoneNo}`

If no target phone number is provided, the notification is sent to the source phone number itself (useful for testing).

## Parameter Breakdown

| Variable      | Required  | Description                                                                                |
| ------------- | --------- | ------------------------------------------------------------------------------------------ |
| SourcePhoneNo | **\*Yes** | The RingCentral phone number to send from. Must be associated with your account.           |
| Password      | **\*Yes** | The RingCentral user password (BASIC mode) or JWT token (JWT mode).                        |
| ClientID      | **\*Yes** | The Client ID from the RingCentral developer portal app credentials.                       |
| ClientSecret  | **\*Yes** | The Client Secret from the RingCentral developer portal app credentials.                   |
| ToPhoneNo     | No        | One or more destination phone numbers. If omitted, the source phone is used.               |
| to            | No        | Alias for the target phone number(s); accepts comma-separated values.                      |
| from          | No        | Alias for the source phone number; useful in query-parameter form.                         |
| source        | No        | Alias for `from`.                                                                          |
| token         | No        | Query-parameter alias for the password or JWT token.                                       |
| secret        | No        | Query-parameter alias for the Client Secret.                                               |
| mode          | No        | Force authentication mode: `basic` or `jwt`. Auto-detected from token length when omitted. |
| env           | No        | API environment: `prod` (default) or `sandbox` (RingCentral devtest).                      |
| ext           | No        | Message type: `sms` (default) or `mms`.                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a BASIC mode SMS:

```bash
# Assuming SourcePhoneNo is +15551230000
# Assuming Password is MyPassword
# Assuming ClientID is AbCdEf123
# Assuming ClientSecret is secret123
# Assuming ToPhoneNo is +15559998888
apprise -vv -t "Test Title" -b "Test Message" \
    "ringc://15551230000:MyPassword@AbCdEf123/secret123/15559998888"
```

Send a JWT mode SMS to multiple recipients:

```bash
apprise -vv -t "Test Title" -b "Test Message" \
    "ringc://15551230000:eyJhbGciOiJSUzI1NiJ9...@AbCdEf123/secret123/15559998881/15559998882"
```

Send an MMS via the sandbox environment:

```bash
apprise -vv -t "Test Title" -b "Test Message" \
    "ringc://15551230000:MyPassword@AbCdEf123/secret123/15559998888?ext=mms&env=sandbox"
```

Send using query parameters (YAML-friendly form):

```bash
apprise -vv -t "Test Title" -b "Test Message" \
    "ringc://_?token=MyPassword&secret=secret123&from=15551230000&to=15559998888"
```
