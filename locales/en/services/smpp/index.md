---
title: "Short Message Peer-to-Peer (SMPP) Notifications"
description: "Send SMS notifications through an SMPP server."
sidebar:
  label: "Short Message Peer-to-Peer (SMPP)"

source: https://smpp.org/

schemas:
  - smpp: insecure
  - smpps

has_selfhosted: true

sample_urls:
  - smpp://{user}:{password}@{host}/{fromPhoneNo}
  - smpps://{user}:{password}@{host}/{fromPhoneNo}/{toPhoneNo}
  - smpps://{user}:{password}@{host}:{port}/{fromPhoneNo}
  - smpp://{user}:{password}@{host}:{port}/{fromPhoneNo}/{toPhoneNo}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

SMPP (Short Message Peer-to-Peer) is a telecom protocol used to submit SMS messages to an SMSC.
Apprise integrates with SMPP using the `smpplib` Python library.

```bash
pip install smpplib
```

To use this service you will need:

1. The SMPP server hostname (or IP) and port.
2. A valid SMPP username and password (sometimes called _system_id_ and _password_).
3. A sender address, usually your E.164 phone number (the **From** phone number).
4. One or more recipient phone numbers (targets).

If you do not control an SMPP server yourself, your SMS provider can usually supply these details.

---

## Syntax

Valid syntax is as follows:

- `smpp://{user}:{password}@{host}/{from_phone}/{targets}`
- `smpp://{user}:{password}@{host}:{port}/{from_phone}/{targets}`

Secure variants:

- `smpps://{user}:{password}@{host}/{from_phone}/{targets}`
- `smpps://{user}:{password}@{host}:{port}/{from_phone}/{targets}`

Where `{targets}` is one or more phone numbers separated by `/`:

- `.../{to_phone}`
- `.../{to_phone1}/{to_phone2}/{to_phoneN}`

### Query string aliases

For configuration files and environments where paths are inconvenient, you may also specify:

- `from=` as an alias for the sender phone number
- `to=` as a comma-separated list of target phone numbers

Example:

- `smpps://_?user=user&pass=password&host=smpp.example.ca&from=+15551234567&to=+15557654321,+15559876543`

---

## Important Notes

- **Titles are not used** for SMS messages. If you pass a title, Apprise will merge it into the body where applicable.
- Phone numbers should be in **E.164** format where possible (for example `+15551234567`).
- `smpp://` is considered _insecure_ transport. Prefer `smpps://` when your provider supports it.

---

## Parameter Breakdown

| Variable     | Required | Description                                                                                   |
| ------------ | -------- | --------------------------------------------------------------------------------------------- |
| `user`       | Yes      | SMPP username (system_id).                                                                    |
| `password`   | Yes      | SMPP password.                                                                                |
| `host`       | Yes      | SMPP server hostname.                                                                         |
| `port`       | No       | SMPP port. Default is **2775** for `smpp://` and **3550** for `smpps://` (unless overridden). |
| `from_phone` | Yes      | Sender phone number (E.164 recommended).                                                      |
| `targets`    | Yes      | One or more destination phone numbers.                                                        |
| `from`       | No       | Query-string alias for `from_phone`.                                                          |
| `to`         | No       | Query-string alias for additional targets as a comma-separated list.                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS to a single recipient:

```bash
apprise -vv -b "Test message" \
  smpp://user:password@smpp.example.ca/+15551234567/+15557654321
```

Send to multiple recipients:

```bash
apprise -vv -b "Maintenance window starts at 22:00" \
  smpp://user:password@smpp.example.ca/+15551234567/+15557654321/+15559876543
```

Use `smpps://` (secure) on a custom port:

```bash
apprise -vv -b "Secure SMPP test" \
  smpps://user:password@smpp.example.ca:3550/+15551234567/+15557654321
```

Use query parameters (handy for YAML and environment variables):

```bash
apprise -vv -b "Query string example" \
  "smpps://_?user=user&pass=password&host=smpp.example.ca&from=+15551234567&to=+15557654321,+15559876543"
```
