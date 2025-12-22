---
title: Installation
description: How to install Apprise on your system
---

# Installation

Apprise can be installed in several ways depending on your needs and platform.

## Python Package (Recommended)

The easiest way to install Apprise is through pip:

```bash
pip install apprise
```

For the latest development version:

```bash
pip install git+https://github.com/caronc/apprise.git
```

## Docker

Apprise is available as a Docker container for easy deployment:

```bash
docker pull caronc/apprise
```

## Platform-Specific Installation

### Linux

#### Debian/Ubuntu
```bash
sudo apt-get install apprise
```

#### Fedora/CentOS
```bash
sudo dnf install apprise
```

### Windows

```powershell
pip install apprise
```

### macOS

```bash
brew install apprise
```

Or using pip:
```bash
pip install apprise
```

## Verifying Installation

After installation, verify that Apprise is working correctly:

```bash
apprise --version
```

## Next Steps

Once installed, head over to the [Quick Start](/getting-started/quick-start) guide to send your first notification.
