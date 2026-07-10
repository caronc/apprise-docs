---
title: "Email Notifications"
description: "Send Notifications Using SMTP And Built-In Email Providers."
sidebar:
  label: "Email"

schemas:
  - mailto: insecure
  - mailtos

has_email: true
has_attachments: true

body_formats:
  - html: default
  - text

sample_urls:
  - mailto://userid:pass@domain.com
  - mailtos://domain.com?user=userid&pass=password
  - mailtos://domain.com:465?user=userid&pass=password
  - mailto://mySendingUsername:mySendingPassword@example.com?to=receivingAddress@example.com
  - mailto://userid:password@example.com?smtp=mail.example.com&from=noreply@example.com&name=no%20reply
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Message Format

Email sends HTML by default and includes a plain-text alternative for mail clients that need it. Set `?format=text` if you want to send a plain-text email only.

## Syntax

Valid syntax is as follows:

- `mailto://{user}:{password}@{domain}`
- `mailto://{user}:{password}@{domain}:{port}`
- `mailto://{domain}?user={user}&pass={password}`
- `mailto://{user}:{password}@{domain}/{to_email}`
- `mailto://{user}:{password}@{domain}/{to_email1}/{to_email2}/{to_emailN}`

Adding an `s` to the schema (i.e. `mailtos://`) switches to a secure STARTTLS connection (port 587 by default):

- `mailtos://{user}:{password}@{domain}`
- `mailtos://{user}:{password}@{domain}:{port}`
- `mailtos://{domain}?user={user}&pass={password}`
- `mailtos://{user}:{password}@{domain}/{to_email}`
- `mailtos://{user}:{password}@{domain}/{to_email1}/{to_email2}/{to_emailN}`

## Built-In Provider Support

Apprise automatically detects many email providers based on the **From** address derived from your URL.  
When a provider is recognized, Apprise automatically configures:

- SMTP host
- Port
- Secure mode (SSL or STARTTLS)
- Login format (full email vs user id)

In most cases, you only need to provide your email and password.

| Provider                                     | Example URL                                                         | Notes                                                                                                                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Google (Gmail)**                           | `mailto://user:app-password@gmail.com`                              | If 2-Step Verification is enabled, generate an App Password: [https://security.google.com/settings/security/apppasswords](https://security.google.com/settings/security/apppasswords) |
| **Yahoo**                                    | `mailto://user:app-password@yahoo.com`                              | Requires an App Password: [https://help.yahoo.com/kb/SLN15241.html](https://help.yahoo.com/kb/SLN15241.html)                                                                          |
| **Fastmail**                                 | `mailto://user:app-password@fastmail.com`                           | App Password must permit SMTP. See supported domains [here](./fastmail/).                                                                                                             |
| **GMX**                                      | `mailto://user:password@gmx.net`                                    | Also supports `gmx.com`, `gmx.de`, `gmx.at`, `gmx.ch`, `gmx.fr`.                                                                                                                      |
| **Zoho**                                     | `mailto://user:password@zoho.com`                                   | Provider defaults are applied automatically.                                                                                                                                          |
| **Yandex**                                   | `mailto://user:password@yandex.com`                                 | Login may be user-id based depending on domain rules.                                                                                                                                 |
| **SendGrid (SMTP)**                          | `mailto://apikey:password@sendgrid.com?from=noreply@yourdomain.com` | `from=` must use a validated sender identity.                                                                                                                                         |
| **QQ / Foxmail**                             | `mailto://user:password@qq.com`                                     | Provider defaults are applied automatically.                                                                                                                                          |
| **163.com**                                  | `mailto://user:password@163.com`                                    | Provider defaults are applied automatically.                                                                                                                                          |
| **Microsoft (Outlook, Hotmail, Office 365)** | _Use `azure://` instead_                                            | Microsoft disabled SMTP basic authentication. Use the [`azure://` plugin](/services/office365/).                                                                                      |

> This is not an exhaustive list. Additional domains are automatically detected when supported.

:::tip[Automatic Secure Upgrade]

When a supported provider is detected, Apprise automatically enforces secure connections using the correct TLS mode and port.

Even if you use `mailto://`, secure mode is applied when the provider template defines it.

If you explicitly specify `smtp=`, Apprise assumes you are overriding provider detection.

:::

## Email Address Formatting

Email addresses may be written as:

- `user@example.com`
- `Optional Name<user@example.com>`

This syntax works in:

- URL targets
- `from=`
- `cc=`
- `bcc=`
- `reply=`

If you need spaces inside a URL, encode them as `%20`.

Example:

```text
from=Optional%20Name<noreply@example.com>
```

## Recipient Behaviour

| What you specify          | What happens                                                            |
| ------------------------- | ----------------------------------------------------------------------- |
| No targets and no `to=`   | Apprise sends the email to the sender address (the derived From email). |
| Targets in the URL path   | Each target becomes a recipient.                                        |
| `to=` in the query string | Treated as an additional recipient (same as adding a target).           |
| `cc=` / `bcc=`            | Applied to each generated email.                                        |
| `reply=`                  | Sets the Reply-To header (can be multiple).                             |

## Using Custom SMTP Servers

If your provider is not automatically detected, configure SMTP manually.

Defaults:

- `mailto://`: defaults to port **25**
- `mailtos://`: defaults to port **587** using STARTTLS

Most public providers require TLS. Prefer `mailtos://` for external servers.

### Authenticated SMTP Examples

Send using a custom SMTP host:

```text
mailtos://user:password@server.com?smtp=smtp.server.com&from=noreply@server.com
```

Include a From display name:

```text
mailtos://user:password@server.com?smtp=smtp.server.com&from=Optional%20Name<noreply@server.com>
```

Force SSL (usually port 465):

```text
mailtos://user:password@server.com:465?smtp=smtp.server.com&mode=ssl&from=noreply@server.com
```

## Local Relay (No Authentication Required)

If you run Postfix, Exim, or another internal relay that does not require authentication, omit `user` and `pass`.

```text
mailto://localhost?from=john@example.ca
```

Internal relay host:

```text
mailto://relay-server?from=noreply@example.com&to=alerts@example.com
```

If the SMTP host differs from the URL host:

```text
mailto://server.com?smtp=smtp.server.com&from=noreply@server.com
```

## From Name vs From Address

The From address has two components: the **email address** and the optional **display name** (what recipients see in their mail client instead of a raw address).

**Historical form -- still fully supported:** `name=` accepted only a plain display name string; `from=` accepted only an email address. Using them together combined the two:

```text
name=No%20Reply&from=noreply@example.com
# Result: "No Reply" <noreply@example.com>
```

**Modern form -- preferred:** Apprise now parses `Display Name <email@example.com>` in both `from=` and `name=`. Either parameter can supply both components in one value. The preferred approach is to use `from=` alone:

```text
from=No%20Reply <noreply@example.com>
# Result: "No Reply" <noreply@example.com>
```

When `from=` contains a complete `Name <email>` value, it is self-contained -- there is no need to also provide `name=`.

**Behaviour summary:**

| Parameters               | Display name        | Email address                |
| ------------------------ | ------------------- | ---------------------------- |
| `from=email` only        | App name (fallback) | `from=` value                |
| `name=Name` only         | `name=` value       | Derived from URL user + host |
| `from=email&name=Name`   | `name=` value       | `from=` value                |
| `from=Name <email>` only | Embedded name       | Embedded email               |
| `name=Name <email>` only | Embedded name       | Embedded email               |

:::caution
Do not mix `name=` with a `from=` value that already embeds a display name (e.g. `from=Name <email>&name=Other`). The two are combined in an undefined way that can produce a malformed From header. Use `from=Name <email>` alone when the combined form is intended.
:::

## Header Manipulation

Email supports custom header injection by prefixing query keys with a plus symbol (**+**).

This is useful for mail filters, internal routing, and tagging.

### One Header

Set:

- `X-Token: abcdefg`

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
  "mailto://localhost?to=john@example.ca&+X-Token=abcdefg"
```

### Multiple Headers

If you need to control some of the headers being sent to the mail server, you can simply generate keyword arguments that are prefixed with the plus (`+`) symbol.

For example, assuming you wanted to also pass along the following email headers (in your payload):

- `X-Token: abcdefg`
- `X-Apprise: is great`

You would structure your email like so:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
  "mailto://localhost?to=john@example.ca&+X-Token=abcdefg&+X-Apprise=is%20great"
```

### Notes

- Header values must be URL-encoded when they contain spaces.
- Apprise automatically sets `X-Application` and merges in any headers you define.

## Multiple Recipients

By default, `mailto://user:pass@domain` sends to `user@domain` unless `to=` is specified.

Send to multiple recipients using either query form or path form:

- `mailto://user:pass@domain/?to=target@example.com,target2@example.com`
- `mailto://user:pass@domain/target@example.com/target2@example.com`
- `mailto://user:pass@domain/Accounting<accounting@example.com>/Billing<billing@example.com>`

There is no hard-coded limit to recipient count, though your SMTP server may impose one.

`cc=` and `bcc=` apply to every email sent. If you notify 3 recipients, the same cc and bcc lists are used for each generated email.

## Attachments

Attachments are fully supported.

SMTP provider limits may apply. Apprise does not impose attachment size restrictions.

## Inline Attachments (RFC 2387)

By default all attachments are sent as regular downloads (`Content-Disposition: attachment`). Adding `?inline=yes` to your URL tells Apprise to embed image attachments **inside** the email body using the `multipart/related` MIME structure defined in [RFC 2387](https://datatracker.ietf.org/doc/html/rfc2387) and the `cid:` URI scheme from [RFC 2392](https://datatracker.ietf.org/doc/html/rfc2392).

### How it works

When `inline=yes` is set:

- **HTML emails** -- Apprise scans the body for existing `cid:filename` references. For each image attachment (`image/*` MIME type) that is not yet referenced, Apprise automatically appends `<br/><img src="cid:filename">` to the body so every image is always visible inline. The MIME wrapper is upgraded from `multipart/mixed` to `multipart/related` and each inlined attachment receives `Content-Disposition: inline` and a `Content-ID` header.
- **Plain-text emails** -- Images cannot be embedded in plain text. Apprise instead appends `[Image: filename]` placeholder lines to the body so the recipient knows image attachments are present. The attachment itself is still sent as a regular download.
- **Non-image attachments** -- Files that are not images (PDFs, spreadsheets, etc.) are always sent as regular downloads regardless of the `inline=` setting.

### Referencing images manually

If you write your own `cid:` references in an HTML body, Apprise honours them and does not add a duplicate anchor:

```text
<p>See the chart below:</p>
<img src="cid:chart.png">
```

When `inline=yes` is active and `chart.png` is among the attachments, no extra anchor is appended -- the attachment is still inlined via the `Content-ID` header.

### Unmatched cid: references

If a `cid:filename` appears in the body but no attachment with that exact name was provided, Apprise logs a warning to help you debug the mismatch:

```text
Email inline: no attachment matches cid:chart.png -- check the filename.
```

### Example

Send an HTML email with an image embedded inline:

```bash
apprise -vv -t "Report" -b "<h1>Summary</h1><p>See attached chart.</p>" \
    "mailto://user:pass@example.com?inline=yes" \
    --attach /path/to/chart.png
```

## PGP Security

Apprise supports two PGP modes for outbound email, selected with the `?pgp=` parameter.

| Mode          | What it does                                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `pgp=no`      | No PGP (default).                                                                                                       |
| `pgp=sign`    | Signs the email using the sender's private key. Opportunistically also encrypts if a recipient public key is available. |
| `pgp=encrypt` | Encrypts the email using the recipient's public key. No signing.                                                        |

Both modes require the [pgpy](https://pypi.org/project/pgpy/) Python package:

```bash
pip install pgpy
```

If pgpy is not installed, Apprise logs a warning and sends the message without PGP protection.

### Signing (`pgp=sign`)

Signing proves the email came from you. Apprise creates a detached signature using your private key and wraps the email in a `multipart/signed` MIME container ([RFC 3156](https://datatracker.ietf.org/doc/html/rfc3156)).

Provide the path to your ASCII-armoured private key with `pgpprv=`:

```text
mailtos://user:pass@example.com?pgp=sign&pgpprv=/path/to/my-prv.asc
```

If no private key is found at send time, the notification fails. If the key exists but is passphrase-protected, Apprise rejects it (passphrase-protected keys are not supported).

Apprise also searches the persistent storage directory automatically — it looks for a file named `{email}-prv.asc`, `pgp-prv.asc`, `prv.asc`, or `pgp-private.asc`. This means if you have previously placed a key there, no `pgpprv=` parameter is needed.

### Sign + Encrypt (Opportunistic)

When `pgp=sign` is active and a recipient public key is also available, Apprise goes further: it signs the message first, then encrypts the signed result. The output is `multipart/encrypted` — the recipient gets end-to-end protection along with proof of sender authenticity.

Encryption is opportunistic — it only happens when a public key is found. If no public key is available, the email is sent as `multipart/signed` only, without encryption. Send never fails silently due to a missing public key in sign mode.

To trigger sign + encrypt, combine `pgp=sign` with WKD lookup or an explicit public key:

```text
mailtos://user:pass@example.com?pgp=sign&wkd=yes&pgpprv=/path/to/my-prv.asc
```

```text
mailtos://user:pass@example.com?pgp=sign&pgppub=/path/to/recipient-pub.asc&pgpprv=/path/to/my-prv.asc
```

### Encryption Only (`pgp=encrypt`)

When `pgp=encrypt` is set, Apprise encrypts the email body using the recipient's public key before handing it to the SMTP server. No signature is applied. The server and any intermediate relays never see the plaintext.

```text
mailtos://user:pass@example.com?pgp=encrypt&pgppub=/path/to/recipient-pub.asc
```

### Key Discovery Order

For **public keys** (used by `pgp=encrypt` and the opportunistic-encrypt step of `pgp=sign`), Apprise searches these sources in order and uses the first key it finds:

1. **Explicit key file** -- a `.asc` file supplied via `pgppub=`
1. **Web Key Directory (WKD)** -- automatic HTTPS lookup, enabled with `wkd=yes`
1. **Local key file** -- Apprise scans the persistent storage namespace directory for the filenames listed in the [public key search table](#public-key-search-order) below
1. **Auto-generated key pair** -- created on first use when persistent storage is configured and `pgp_autogen` is enabled in the asset (only for `pgp=encrypt`; the opportunistic step of `pgp=sign` never auto-generates)

For **private keys** (used by `pgp=sign`), Apprise searches:

1. **Explicit key file** -- a `.asc` file supplied via `pgpprv=`
1. **Local key file** -- Apprise scans the persistent storage namespace directory for the filenames listed in the [private key search table](#private-key-search-order) below

### Web Key Directory (WKD)

WKD ([RFC 9080](https://datatracker.ietf.org/doc/html/rfc9080)) is a standard that lets mail clients automatically fetch a recipient's public key from their mail provider without any manual key exchange. If the recipient's provider publishes their key via WKD, enabling `wkd=yes` is all that is needed -- no key file, no manual import.

Setting `wkd=yes` automatically implies `pgp=encrypt`, so both of the following URLs are equivalent:

```text
mailtos://user:pass@example.com?wkd=yes
mailtos://user:pass@example.com?pgp=encrypt&wkd=yes
```

Apprise tries two URL forms (subdomain method first, then direct method) and caches successful results in memory for the duration of the session. If neither URL returns a key, Apprise falls back to the next discovery method.

:::tip[Zero-configuration encryption]

For recipients at providers that publish WKD keys (Proton Mail, Fastmail, and many self-hosted setups), `wkd=yes` is the easiest path to end-to-end encrypted email -- no key files to manage and no key generation required.

:::

### Auto-Generated Keys

When no public key is found by any other method, Apprise generates a fresh RSA-2048 key pair and writes **both** files to the persistent storage namespace directory:

| File                  | Role                                             |
| --------------------- | ------------------------------------------------ |
| `{localpart}-pub.asc` | Public key — used to encrypt outbound messages   |
| `{localpart}-prv.asc` | Private key — auto-discovered by `pgp=sign` mode |

`{localpart}` is the part of the sender's From address before `@`, lowercased. For `user@example.com`, the files are `user-pub.asc` and `user-prv.asc`.

Because `keygen()` writes the private key alongside the public key, a single `pgp=encrypt` send that triggers auto-generation also makes signing available automatically. Any subsequent `pgp=sign` URL pointing at the same storage discovers `user-prv.asc` without a `pgpprv=` parameter.

Auto-generation is enabled by default when [persistent storage](/library/persistent-storage/) is configured. It can be disabled at the asset level by setting `pgp_autogen = False`. Note that `pgp_autogen` only affects `pgp=encrypt` — the opportunistic-encrypt step of `pgp=sign` never auto-generates keys.

### Key File Placement

Apprise stores key material inside a **hashed namespace directory** under `storage_path`. The directory name is an 8-character hash derived deterministically from the URL, so the same URL always maps to the same directory. Use `pgppub=` and `pgpprv=` to point at absolute paths anywhere on the filesystem when you prefer not to use the cache at all.

#### Public Key Search Order

Public keys are matched against **recipient** email addresses (first match wins):

| Priority | Filename example                                            |
| -------- | ----------------------------------------------------------- |
| 1        | `{recipient@domain.com}-pub.asc` (full address, lowercased) |
| 1        | `{recipient}-pub.asc` (local part only, lowercased)         |
| 2        | `pgp-public.asc`                                            |
| 2        | `pgp-pub.asc`                                               |
| 2        | `public.asc`                                                |
| 2        | `pub.asc`                                                   |

Priority 1 entries are generated for each recipient in order; the baseline filenames (priority 2) are tried last.

#### Private Key Search Order

Private keys are matched against the **sender** (From) address (first match wins):

| Priority | Filename example                                                      |
| -------- | --------------------------------------------------------------------- |
| 1        | `{sender@domain.com}-prv.asc` (full address, lowercased)              |
| 1        | `{sender}-prv.asc` (local part only — this is what `keygen()` writes) |
| 2        | `pgp-private.asc`                                                     |
| 2        | `pgp-prv.asc`                                                         |
| 2        | `private.asc`                                                         |
| 2        | `prv.asc`                                                             |

Passphrase-protected private keys are rejected regardless of how they are discovered.

#### Specifying Keys via a Configuration File

When you manage Apprise through a [YAML configuration file](/library/configuration/), the `pgppub=` and `pgpprv=` parameters can be written as clean YAML sub-keys instead of being embedded inside a long URL string. Because both parameters are handled by the Apprise Attachment system, you can supply either a local file path or an HTTP/HTTPS URL:

```yaml
urls:
  - mailtos://user:pass@smtp.example.com/:
      pgp: sign
      pgpprv: /path/to/my-prv.asc
      pgppub: http://internal.example.com/keys/recipient-pub.asc
      wkd: "yes"
```

This is especially useful when key paths are long or contain characters that would need URL-encoding in a query string.

:::caution[Keep private keys local]
`pgpprv` supports HTTP URLs through the same Attachment system, but fetching a private key over the network exposes it to interception. Always use a local filesystem path for `pgpprv`.
:::

#### Placing a Key in the Cache

The simplest way to supply a key without using `pgppub=` or `pgpprv=` is to copy it into the cache namespace directory using one of the filenames from the search order tables above. Apprise picks it up automatically on the next send — no URL change required.

To find the namespace directory for a given URL, use `apprise storage list`:

```bash
apprise storage list "mailtos://user:pass@example.com"
```

The uid column in the output (e.g. `2a3f8b1c`) is the 8-character namespace hash for that URL — the same identifier shown on the Apprise-API review tab. The full cache directory is `{storage-path}/2a3f8b1c/`. Copy your key file into that directory with a matching name — for example `user@example.com-pub.asc` for a public key, or `user-prv.asc` for a private key — and Apprise will find it without any `pgppub=` or `pgpprv=` parameter.

#### Per-recipient Keys (Multiple Recipients)

When you notify multiple recipients in one URL, Apprise sends a **separate email per recipient** and performs the key lookup independently for each one. This means every recipient can have their own public key pre-placed in the cache directory and will receive their own individually encrypted copy.

For example, to send a signed+encrypted email to both `alice@example.com` and `bob@example.com`:

```bash
# First, find the namespace directory for your sending URL
apprise storage list "mailtos://user:pass@smtp.example.com"
# Output: uid 2a3f8b1c  → cache dir is {storage-path}/2a3f8b1c/
```

Copy each recipient's public key into that directory using the full-address filename format:

```bash
cp alice-key.asc {storage-path}/2a3f8b1c/alice@example.com-pub.asc
cp bob-key.asc   {storage-path}/2a3f8b1c/bob@example.com-pub.asc
```

Then send to both at once:

```bash
apprise -t "Hello" -b "Secret message" \
    "mailtos://user:pass@smtp.example.com/alice@example.com/bob@example.com?pgp=sign&pgpprv=/path/to/my-prv.asc"
```

Apprise sends two separate emails:

- Alice receives a `multipart/signed+encrypted` message encrypted with `alice@example.com-pub.asc`.
- Bob receives a `multipart/signed+encrypted` message encrypted with `bob@example.com-pub.asc`.

If a key file is missing for a particular recipient, the opportunistic fallback applies: that recipient receives a signed-only (unencrypted) copy. No other recipients are affected — each send is independent.

:::note[Deprecated parameter: `pgpkey=`]

The `pgpkey=` parameter has been renamed to `pgppub=` to clarify that it holds a **public** key. Existing URLs using `pgpkey=` continue to work but produce a deprecation warning in the logs. Update your URLs to use `pgppub=` — support for `pgpkey=` will be removed in a future release.

:::

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                              |
| -------- | -------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     |    Yes\* | SMTP username. May be a user id or a full email address. Can also be specified as `?user=`.                                                                                                                                                              |
| pass     |    Yes\* | SMTP password. Can also be specified as `?pass=`.                                                                                                                                                                                                        |
| domain   |      Yes | Domain portion of the URL host. For `mailto://user:pass@example.com`, the domain is `example.com`.                                                                                                                                                       |
| port     |       No | SMTP port. Defaults to 25 (mailto) and 587 (mailtos) unless provider defaults are applied.                                                                                                                                                               |
| smtp     |       No | Override the SMTP host. If set, provider detection is bypassed.                                                                                                                                                                                          |
| from     |       No | From address. Accepts a plain email (`noreply@example.com`) or a combined `Display Name <email>` value. When the combined form is used, no `name=` is needed.                                                                                            |
| name     |       No | From display name. Historically accepted a name string only; now also accepts `Display Name <email>` format. When used with `from=`, `name=` sets the display name and `from=` sets the email. Do not combine with a `from=` that already embeds a name. |
| to       |       No | Recipient override. Also supported via URL path targets.                                                                                                                                                                                                 |
| cc       |       No | Carbon Copy recipients. Comma separated. Name formatting is supported.                                                                                                                                                                                   |
| bcc      |       No | Blind Carbon Copy recipients. Comma separated. Name formatting is supported.                                                                                                                                                                             |
| reply    |       No | Reply-To recipients. Comma separated. Name formatting is supported.                                                                                                                                                                                      |
| mode     |       No | Secure mode: `ssl` or `starttls`. When using `mailto://`, specifying `mode=` upgrades to a secure connection.                                                                                                                                            |
| pgp      |       No | PGP mode: `no` (default), `sign`, or `encrypt`. Prefix shorthand accepted: `n`, `s`, `e`. Legacy `yes`/`true` implies `encrypt` (deprecated). `none`/`false` map to `no`.                                                                                |
| pgppub   |       No | Path or URL to a recipient's ASCII-armoured PGP **public** key (`.asc`). When set, WKD and auto-generation are bypassed. Masked in privacy-safe URLs.                                                                                                    |
| pgpprv   |       No | Path to the sender's ASCII-armoured PGP **private** key (`.asc`). Required for `pgp=sign`. Passphrase-protected keys are not supported. Masked in privacy-safe URLs.                                                                                     |
| pgpkey   |       No | **Deprecated.** Alias for `pgppub=`. Still accepted but emits a deprecation warning. Will be removed in a future release. Use `pgppub=` instead.                                                                                                         |
| wkd      |       No | Enable Web Key Directory key discovery (`yes` or `no`). Defaults to `no`. Setting `wkd=yes` implies `pgp=encrypt` when `pgp=` is not specified.                                                                                                          |
| inline   |       No | Embed image attachments inline in HTML email bodies (`yes` or `no`). Defaults to `no`. See [Inline Attachments](#inline-attachments-rfc-2387).                                                                                                           |
| +Header  |       No | Add custom email headers by prefixing keys with `+`. Example: `?+X-Team=Ops`.                                                                                                                                                                            |

**\*** Not required for anonymous relays.

To avoid ambiguity, any URL parameter (`?key=value`) overrides values in the main URL:

- `mailto://usera:pass123@domain.com?user=foobar`: the user of `foobar` would over-ride the user `usera` specified. However since the password was not over-ridden, the password of `pass123` would be used still.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Built-in provider example:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
    mailto:///example:mypassword@gmail.com
```

Send an email to a custom provider; since no `smtp=` was identified, the host `example.com` is also assumed to be the SMTP server.

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://george:pass123@example.com

# The above URL could also have been written like:
#  mailto://example.com?user=george&pass=pass123
```

If the SMTP Server differs from the domain (which is usually the case), your URL should include the `?smtp=` keyword argument:

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://george:pass123@example.com?smtp=smtp.example.com
```

In some cases, the `{user}` is an email address. In this case you can place this information in the URL parameters instead:

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george@example.com
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailto://example.com?user=george@example.com&pass=pass123"

# Note that the ampersand (&) that is used in the URL to separate
# one argument from another is also interpreted by the CLI as
# run in the background. Wrap your URL in quotes.

# Send an email to a smtp relay server you are hosting:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://localhost?from=john@example.ca
```

Users with custom SMTP Servers will require a slightly more complicated configuration:

```bash
# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use starttls (port 587)
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://_?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com"

# Notes (for above URL):
# - Since no `to=` was specified above, the `from` address is notified
# - mailtos:// defaults to starttls on 587; if you want to use port 465 (SSL)
#   you would just need to add `mode=ssl` to the parameter of your URL.
```

Here is a more complicated example where you want to use `ssl` and a custom port:

```bash
# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use ssl on port 12522
# Assuming you want your email to go to bob@example.com and jane@yahoo.ca
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://example.com:12522?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com&to=bob@example.com,jane@yahoo.ca&mode=ssl"
```

Local relay:

```bash
apprise -t "Test Title" -b "Test Body" \
   mailto://localhost?to=john@example.com
```

Encrypt using WKD key discovery (no key file needed; `pgp=encrypt` is implied):

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://user:pass@example.com?wkd=yes"
```

Encrypt using an explicit local key file:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://user:pass@example.com?pgp=encrypt&pgppub=/home/user/.gnupg/recipient-pub.asc"
```

Sign every email with your private key (opportunistically encrypts when WKD returns a public key):

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://user:pass@example.com?pgp=sign&wkd=yes&pgpprv=/home/user/.gnupg/my-prv.asc"
```

Sign only — no public key lookup, always delivers a signed plain-text email:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://user:pass@example.com?pgp=sign&pgpprv=/home/user/.gnupg/my-prv.asc"
```
