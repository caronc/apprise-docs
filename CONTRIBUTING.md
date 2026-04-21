# Contributing to Apprise Documentation

Thank you for your interest in contributing to the Apprise documentation.

This repository is intentionally **low-friction**. If you can write Markdown,
you can make a meaningful contribution. You do not need to be a developer, and
you do not need to understand how the website is built.

All content here is validated and synced into the official documentation site
automatically.

---

## What You Can Contribute

You are welcome to contribute:

- New guides and tutorials
- Improvements or corrections to existing pages
- Service-specific documentation
- Real-world examples and usage notes
- Translations into other languages

Small improvements are just as valuable as large ones.

## Where Content Belongs

Use these guidelines when adding or editing content:

### Service documentation

```text
locales/<locale>/services/<service>/index.md
```

### Guides and how-to articles

```text
locales/<locale>/guides/
```

### Images

Place images in an `images/` directory beside the page that uses them.

### Shared assets

```text
locales/<locale>/assets/
```

If you are unsure where something belongs, place it under `guides/` and it can
be reorganized later.

## Creating or Updating Pages

1. Choose the appropriate directory
2. Create or edit a Markdown file
3. Ensure required frontmatter is present (see service template below)
4. Write clear, concise documentation
5. Run validation and open a pull request

---

## Service Documentation Template

Each service page uses frontmatter metadata to generate parts of the site
automatically.

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

<!-- GLOBAL:SERVICE:PARAMS -->

## Example

Send a Example notification:

```bash
apprise -vv -t "My Title" -b "Message Body" \
   "example://my-token/target"
```
````

Markers such as `<!-- SERVICE:DETAILS -->` must be left in place. They are
replaced automatically when documentation is rendered.

## Documentation Markers (Important)

Some pages include special comment markers used by the documentation build
pipeline (for example service listings, counts, or generated sections).

Examples include:

- `<!-- SERVICE:DETAILS -->`
- `<!-- SERVICES:COUNT -->`
- `{/* SERVICES:COUNT */}`
- `{/_ TEMPLATE:NEW_SERVICE _/}`

These markers are **not comments for humans** and must not be modified, reformatted, or removed.

Please note:

- Automated formatters may rewrite marker syntax.
- If this happens, do not "fix" the marker manually.
- Leave the marker exactly as it appears in the file.

If a marker is accidentally altered, it can cause sections of the site to stop
updating without obvious errors.

## Editing Existing Pages

- Keep changes focused and intentional
- Preserve existing structure where possible
- Improve clarity, grammar, and examples freely
- Large rewrites are welcome, but may involve discussion

## Images and Media

- Use local images only (no hot-linking)
- Keep file sizes reasonable
- Use descriptive filenames
- Reference images with relative paths
- Avoid hot-linking images from external sites

## Internal Links

- Prefer relative links for documentation pages within the same locale
- Avoid root-absolute internal docs links such as `/services/`, `/url-builder/`, `/api/`, `/cli/`, `/guides/`, `/library/`, `/qa/`, `/contributing/`, and `/getting-started/`
- Root-absolute shared assets such as `/assets/...` are acceptable when the asset is intentionally global to the site

Examples:

```md
[Supported Services](../services/)
[URL Builder](../url-builder/)
![Service Logo](./images/logo.svg)
```

This prevents translated pages from accidentally sending visitors back to the
default English route. The site build currently includes a safeguard for
localized content, but contributors should still write locale-safe links in the
source whenever practical.

## Translations

Translations are always welcome, even if incomplete.

Guidelines:

- Mirror the source directory structure
- Translate titles and headings
- Leave technical terms unchanged if unsure
- Keep internal links locale-safe by using relative paths when linking to other docs pages

Example:

```text
locales/fr/guides/getting-started.md
```

## Validation and Linting

This repository uses automated checks to ensure:

- Consistent Markdown formatting
- Supported frontmatter keys
- Predictable rendering on the site

Most issues are formatting-related and easy to fix.

Run locally with:

```bash
pnpm lint
```

Auto-fix common issues with:

```bash
pnpm lint:fix
```

## Review Process

- All contributions are reviewed
- Maintainers may suggest edits
- Small fixes are merged quickly
- Larger changes may involve discussion

## Questions or Uncertainty

If you are unsure where to start or how to proceed:

- Open an issue
- Ask for guidance
- Suggest improvements

We are happy to help.

Thank you for contributing to Apprise.
