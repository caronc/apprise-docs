---
title: "Apprise Docs"
description: "Contributing to the Apprise Documentation"
sidebar:
  order: 4
---

## Contributing to Apprise Documentation

We welcome documentation improvements! Please follow the guidelines below to help us review and
merge your contributions smoothly.

## Retrieve from GitHub

```bash
# Acquire the documentation source from its official resting spot on GitHub
git clone git@github.com:caronc/apprise-docs.git

```

## Repository Layout

All documentation lives under the `locales/` directory.

Each locale mirrors the same structure so navigation remains predictable across languages.

```text
locales/
  <locale>/
    index.md
    getting-started/
    guides/
    services/
      <service>/
        index.md
        images/       # optional logos — logo.svg, logo-dark.svg, etc.
    config/
    qa/
    dev/
    contributing/
    assets/
sponsorships/
  <id>/               # company-level sponsor entries (maintainer-managed)
    meta.json
    logo.svg
```

### Directory Guide

- **Getting Started** (`getting-started/`)
  Introductory material for new users

- **Guides** (`guides/`)
  How-to articles, workflows, best practices, and troubleshooting patterns

- **Config** (`config/`)
  Configuration syntax and reference material

- **QA** (`qa/`)
  Troubleshooting, diagnostics, and FAQs

- **Dev** (`dev/`)
  Developer-focused documentation and internals

- **Contributing** (`contributing/`)
  How to help improve Apprise and its ecosystem

- **Services** (`services/`)
  Documentation specific to a notification service, including URL syntax,
  configuration options, and examples

- **Sponsorships** (`sponsorships/`)
  Company-level sponsor entries, each containing a `meta.json` and optional logo
  files. This directory is **maintainer-managed** — do not add or modify entries
  unless you have been asked to do so. See `sponsorships/README.md` for the full
  schema and logo naming conventions.

## Getting Started as a Contributor

### Prerequisites

- Node.js (LTS recommended)
- `pnpm` (version pinned in `package.json`)
- Git

### Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Make your documentation changes
   Add, edit, or improve any Markdown file.

3. Run validation:

   ```bash
   pnpm lint
   ```

   Most formatting issues can be fixed automatically with:

   ```bash
   pnpm lint:fix
   ```

4. Open a pull request 🎉

> If linting fails, it will tell you exactly what needs attention.

## Adding or Improving a Service

Each service lives at:

```text
locales/<locale>/services/<service>/index.md
```

Optionally, a service may include an `images/` directory for logos or diagrams.

```text
services/<service>/
├── index.md
└── images/
    └── logo.svg
```

### Service Logos

Service logos are optional, but encouraged when an official logo is available.

- Supported formats: `.svg`, `.png`, `.jpg`, `.jpeg`
- Raster images should not exceed:
  - **200px height**
  - **440px width**

If present, logos are automatically rendered on the service page.

---

## Service Page Template

Each service page starts with a frontmatter block that describes its capabilities.

This metadata is **used to generate the Overview section automatically** on the site.

A minimal example:

````md
---
title: "Example Notifications"
description: "Send notifications using Example"
sidebar:
  label: "Example"

source: https://example.com
group: general

schemas:
  - example://

sample_urls:
  - example://{token}/
  - example://{token}/{target}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

How to get set up with Example

## Syntax

Valid syntax is as follows:

- `example://{token}`
- `example://{token}/{target}`

## Parameter Breakdown

| Variable | Required | Description                                                                                    |
| -------- | -------- | ---------------------------------------------------------------------------------------------- |
| token    | yes      | Token to access the example server                                                             |
| target   | no       | The target you wish to notify. If no target is specified, we send a notification to ourselves. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Example

Send a Example notification:

```bash
apprise -vv -t "My Title" -b "Message Body" \
   "example://my-token/target"
```
````

> The service-page markers shown above — `<!-- SPONSORS:BANNER -->`,
> `<!-- SERVICE:DETAILS -->`, and `<!-- TEMPLATE:SERVICE-PARAMS -->` — are
> intentional and must be left in place. They are replaced automatically when
> the documentation is rendered.

If you created an `mdx` file instead, you can use `{/* SERVICE:DETAILS */}` instead.

### Build Markers

Most service pages should keep these three markers in this order:

```md
<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

...

<!-- TEMPLATE:SERVICE-PARAMS -->
```

The sync pipeline also supports several other build markers. Markdown files normally
use the HTML-comment form, while MDX files may use the JSX-comment form instead.

| Form                               | Example                    |
| ---------------------------------- | -------------------------- |
| Markdown / MDX-safe HTML comment   | `<!-- SERVICE:DETAILS -->` |
| MDX JSX comment                    | `{/* SERVICE:DETAILS */}`  |
| Formatter-tolerant MDX placeholder | `{/_ SERVICE:DETAILS _/}`  |

The following markers are currently supported:

| Marker                                                              | Effect                                                                                                                                                                                                                          |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<!-- SERVICE:DETAILS -->`                                          | Service pages only. Generates the Overview block (source URL, capabilities, logo).                                                                                                                                              |
| `<!-- TEMPLATE:SERVICE-PARAMS -->`                                  | Injects the localized reusable service parameter table from `locales/<locale>/_templates/service-params.md`.                                                                                                                    |
| `<!-- SPONSORS:BANNER -->`                                          | Service pages only. Injects the rotating sponsor banner. The file is automatically converted to `.mdx` when this marker is present. The banner renders nothing if no eligible sponsors exist, so it is safe to add proactively. |
| `<!-- SERVICES:FILTER -->`                                          | Services index only. Injects the interactive services filter/list component.                                                                                                                                                    |
| `<!-- SERVICES:COUNT -->`                                           | Any page. Replaced with the number of active supported services.                                                                                                                                                                |
| `<!-- SERVICES:<GROUP>:COUNT -->`                                   | Any page. Replaced with the number of active services in a group, such as `<!-- SERVICES:GENERAL:COUNT -->`.                                                                                                                    |
| `<!-- SERVICES:BEGIN -->` / `<!-- SERVICES:END -->`                 | Services index fallback region for the generated static services list when the interactive filter is not used.                                                                                                                  |
| `<!-- SERVICES:<GROUP>:BEGIN -->` / `<!-- SERVICES:<GROUP>:END -->` | Services index fallback region for one generated service group.                                                                                                                                                                 |
| `<!-- GRAVEYARD:COUNT -->`                                          | Graveyard page. Replaced with the number of retired services.                                                                                                                                                                   |
| `<!-- GRAVEYARD:BEGIN -->` / `<!-- GRAVEYARD:END -->`               | Graveyard page. Region replaced with the generated retired-services list.                                                                                                                                                       |
| `<!-- URL_BUILDER:COMPONENT -->`                                    | URL Builder page only. Injects the URL Builder application.                                                                                                                                                                     |
| `<!-- COMPANY_SPONSORS -->`                                         | Sponsors page only. Injects the featured sponsor cards.                                                                                                                                                                         |
| `<!-- TEMPLATE:EVICTION-TABLE -->`                                  | Injects the localized reusable optional dependency eviction table from `locales/<locale>/_templates/eviction-table.md`. This is used by pages such as the Environment reference and resource-usage guide.                       |

`TEMPLATE:*` markers are discovered automatically from:

- `shared_templates/*.md` or `shared_templates/*.mdx`
- `locales/<locale>/_templates/*.md` or `locales/<locale>/_templates/*.mdx`

For example, `locales/en/_templates/service-params.md` becomes
`<!-- TEMPLATE:SERVICE-PARAMS -->`, and `locales/en/_templates/eviction-table.md`
becomes `<!-- TEMPLATE:EVICTION-TABLE -->`. Locale templates override shared templates
with the same name.

### Full Frontmatter Reference

The example above shows the common fields. A service page may also carry the following
optional fields:

```md
---
# Capability flags — set to true when the service supports the feature
has_attachments: false
has_image: false
has_sms: false
has_chat: false
has_email: false
has_local: false
has_selfhosted: false

# Optional extra search terms for the service listing search box.
# Use this when users would type a name that does not appear in the title
# or any schema token. Dots are allowed so domain-style names stay as one
# token. Matching is substring-based, so shorter queries still find results.
# keywords: "alias, legacy-name"

# Message length limits (remove the block entirely if the service has no known limits)
limits:
  - name: "Title"
    max_chars: 250
  - name: "Body"
    max_chars: 2000

# Message format(s) the service accepts. Omit this field entirely if the
# service only accepts plain text. See "Body Formats" below for the
# ":default" directive used when declaring more than one format.
# body_formats:
#   - html: default
#   - text

# Retired services — set to the date the service stopped being available
# ended: YYYY-MM-DD

# -----------------------------------------------------------------------
# Sponsorship fields — MAINTAINER USE ONLY. Do not add or change these.
# -----------------------------------------------------------------------
# sponsorship_level: 50   # Integer 1–100; controls site visibility tier
# sponsorship_weight: 1   # Optional 1–5; banner rotation weight for level 75+
# sponsor_since: "2026-06"
# sponsor_message: ""     # Empty string intentionally suppresses the banner message
---
```

#### Service Frontmatter Fields

| Field           | Type         | Required    | Purpose                                                                                                                                                                                                                             |
| --------------- | ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | string       | Yes         | Page title and default service display name.                                                                                                                                                                                        |
| `description`   | string       | Recommended | Short service summary used by generated listings and metadata.                                                                                                                                                                      |
| `sidebar.label` | string       | Recommended | Short label used in navigation and service listings.                                                                                                                                                                                |
| `source`        | URL string   | Recommended | Official service/project website. Only `http://` and `https://` URLs are accepted by the site sync.                                                                                                                                 |
| `group`         | string       | Recommended | Service group id used by the services index. Unknown groups fall back to the default group during sync.                                                                                                                             |
| `schemas`       | string array | Yes         | Supported Apprise URL schemas, such as `discord://` or `tgram://`.                                                                                                                                                                  |
| `sample_urls`   | string array | Recommended | Example Apprise URLs shown in generated metadata and URL Builder hints.                                                                                                                                                             |
| `body_formats`  | string array | No          | Message format(s) the service accepts (`text`, `html`, `markdown`). Omit entirely for text-only services. See [Body Formats](#body-formats) below.                                                                                  |
| `keywords`      | string       | No          | Extra search terms for the service listing search box. Comma or space separated; dots preserved. Use when the title and schemas do not contain a name users would naturally type. Matching is substring-based and case-insensitive. |
| `limits`        | object array | No          | Optional message length limits. Each entry should include a display `name` and `max_chars`.                                                                                                                                         |
| `ended`         | date string  | No          | Marks a retired service. Use `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`.                                                                                                                                                                    |

#### Body Formats

`body_formats` declares which message format(s) a service accepts: any of
`text`, `html`, or `markdown`. It mirrors the plugin's own `notify_format`
declaration in the Apprise library.

The field is entirely optional. A service page that omits it is documented
as accepting `text` only, the same default `NotifyBase` itself uses when a
plugin declares no `notify_format`.

```yaml
# Text-only service -- no body_formats block needed at all.
schemas:
  - example://
```

When a service accepts more than one format, list them and mark the
default with a single-key `format: default` mapping, the same shorthand
`schemas` already uses for `: insecure`:

```yaml
body_formats:
  - html: default
  - text
```

Rules, in order:

1. **`body_formats` is optional.** Omit it entirely for a text-only
   service; this is equivalent to `body_formats: [text]`.
2. **At most one entry may be marked `: default`.** Declaring two or more
   defaults is a documentation validation failure — there is no way to
   honor two defaults on the same service.
3. **If no entry is marked `: default`, the first entry listed is the
   implicit default.** This is valid and will not fail validation, but
   `pnpm lint` prints a recommendation to mark one explicitly once a
   service declares more than one format, since the intent is easy to
   miss on a quick read otherwise.
4. **The same format may not be declared twice** in the same list.
5. **Unknown format names fail validation.** Only `text`, `html`, and
   `markdown` are recognized.

```yaml
# Valid: no explicit default -- "text" (the first entry) is used, but
# pnpm lint recommends marking one explicitly.
body_formats:
  - text
  - html
  - markdown
```

```yaml
# Invalid: two entries marked default -- fails validation.
body_formats:
  - html: default
  - markdown: default
```

#### Capability Flags

Capability flags are frontmatter booleans named `has_<feature>`. Set them to `true`
only when the service supports the feature. These flags drive the service overview,
feature badges, and URL filter parameters; for example, `has_attachments: true`
becomes the `attachments` filter token in `?f=attachments`.

| Frontmatter key   | URL filter token | Meaning                                                          |
| ----------------- | ---------------- | ---------------------------------------------------------------- |
| `has_sms`         | `sms`            | Service focuses on SMS/MMS delivery.                             |
| `has_chat`        | `chat`           | Service targets chat rooms, channels, or direct messages.        |
| `has_email`       | `email`          | Service focuses on email delivery.                               |
| `has_local`       | `local`          | Service targets a local/native system or device.                 |
| `has_selfhosted`  | `selfhosted`     | Service supports a self-hosted deployment.                       |
| `has_attachments` | `attachments`    | Service supports file attachments.                               |
| `has_image`       | `image`          | Service uses Apprise-managed status images or icons in messages. |

`has_sponsorship` is a special maintainer-only shorthand for `sponsorship_level: 1`;
it is documented separately below because it controls sponsor visibility rather than
a general service capability.

> **Do not add or modify sponsorship fields** unless you are the project maintainer
> or have been explicitly asked to do so. These fields have commercial significance.
> An empty `sponsor_message: ""` is intentional — it suppresses the banner message
> without removing the sponsor's banner slot. See [CONTRIBUTING.md](../../../CONTRIBUTING.md)
> for the full sponsorship level table and validation rules.

## Localization and Translations

- Each language lives under `locales/<locale>/`
- English (`en`) is the default
- Translations may be partial and incremental
- Prefer relative links between docs pages inside a locale
- Avoid root-absolute internal docs links such as `/services/` or `/url-builder/` in translated content
- Root-absolute shared assets such as `/assets/...` are fine when they are intentionally global

Examples:

```md
[Supported Services](../services/)
[URL Builder](../url-builder/)
![Service Logo](./images/logo.svg)
```

The site build includes a safeguard that rewrites locale-local internal links
for non-default locales during sync, but contributors should still author
locale-safe links in source content whenever practical.

Even partial translations are welcome.

## Linting and Validation

This repository uses automated checks to ensure:

- Consistent Markdown formatting
- Supported frontmatter keys and structure
- Predictable rendering on the website

Linting exists to **help contributors**, not to block them. Most failures are
formatting or unsupported metadata issues and are easy to fix.

## How You Can Help

- Improve documentation for a service you use
- Clarify confusing sections
- Add examples
- Fix typos or formatting issues
- Translate content into another language

If you are unsure where something belongs, open an issue and ask.
