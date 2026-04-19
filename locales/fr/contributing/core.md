---
title: "Bibliothèque Principale"
description: "Contribuer to the Apprise Core library"
sidebar:
  order: 2
---

## Contribuer to the Apprise Core Library

Thank you for your interest in contributing to Apprise.

Contributions are welcome across code, bug fixes, CLI improvements, documentation, and deployment tooling.

This repository is the core application and CLI layer that makes up the heart of Apprise.

## Development Requirements

### Supported Python Versions

Apprise supports **Python 3.9 and newer**. All contributions must remain compatible with the lowest supported version unless explicitly discussed.

### Tooling Expectations

Apprise development uses a small toolchain:

- **tox** for environment orchestration. It leverages the following:
  - **pytest** for testing;
  - **ruff** for linting and formatting
  - **coverage** for reporting
- **pyproject.toml** as the authoritative project definition

Local development environments are expected to mirror CI behaviour.

## Retrieve from GitHub

```bash
git clone git@github.com:caronc/apprise.git
cd apprise
```

## Install Tox

The most common way to install this dependency is:

```bash
pip install tox
```

If you are not using a virtual environment or have proper rights on the machine you're using, you may need to use `pip3` or add the `--user` flag:

```bash
pip3 install tox --user
```

## Development Environment

Apprise works best just using a simple bare metal setup. The following commands can assist you:

Run the `apprise` cli from within the pulled code against any changes you made:

```bash
# Print version and exit
tox -e apprise -- -v
```

Simply use `tox -e apprise --` to act equivalently to the `apprise` CLI in an installed environment:

```bash
# Test a new or modified plugin (example: foobar://)
tox -e apprise -- -t "my title" -b "my body" \
    "foobar://credentials/direction?options="
```

### Running Tests

Test your added test coverage in `tests/` a similar way:

```bash
# 'minimal' just pulls in less dependencies which is usually adequate:
tox -e minimal
```

A Full QA can be run by swapping `minimal` with `qa`.

```bash
# 'qa' loads all dev libraries
tox -e qa
```

There is a 'lot' of tests; Apprise aims to maintain 100% test coverage. To avoid running through everything and only focus on your new tests, you can scope the tests runner to do this like so;

```bash
# use -k to filter the tests are run:
tox -e minimal -- -k "test_foobar"
```

:::note
`-k test_foobar` performs substring matching and would match:

```text "test_foobar"
- tests/test_plugin_foobar.py
    ├── def test_foobar_urls():
    └── def test_foobar_advance():
```

You could add `-k test_foobar_urls` to just test 1 specific test:

```text "test_foobar_urls"
- tests/test_plugin_foobar.py
    ├── def test_foobar_urls():
    └── def test_foobar_advance():
```

:::

## Quality Assurance and Testing

Keep linting and formatting consistent across contributor environments:

```bash
# Lint (calls ruff under the hood)
tox -e lint
```

If you get an error with the above, you can use the auto-formatting which fixes most mistakes.

```bash
# Auto-format
tox -e format
```

## Test Expectations

Changes to core behaviour **must** include tests unless there is a strong justification.

General expectations:

- Test coverage for Apprise to remain at 100%
- Tests should reflect actual runtime behaviour
- Edge cases should be explicitly covered
- Existing test patterns should be followed
- Logging noise should be avoided in tests

Tests are part of the public contract of the project.

## Pull Request Guidelines

Before submitting a pull request:

- Tests pass locally for relevant environments
- Linting and formatting checks pass
- Changes are scoped and well-described
- Behavioural changes include rationale

If you added a new plugin, ensure that:

- The `README.md` in the root of the Apprise Repository is updated to reflect the change if necessary.
- The `packaging/redhat/apprise.spec` is updated to reflect the new service
- The `pyproject.toml` section called `keywords` includes the name of the new plugin
- Documentation has been prepared for the [Apprise Docs](https://github.com/caronc/apprise-docs) Repository (later reflected on <https://appriseit.com>).

Pull requests are reviewed for correctness, maintainability, and long-term impact.

## Quick Checklist Before You Submit

- Your change includes tests when practical.
- `tox -e qa` passes locally.
- `tox -e lint` passes locally.
- You run `tox -e format` when formatting changes are needed.
- Your pull request description clearly explains what changed and why.

## Licensing and Attribution

Apprise is released under the BSD 2-Clause licence.

All contributions must be compatible with this licence, and new files should include appropriate headers where required.
