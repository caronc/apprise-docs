---
title: Apprise API Privacy Policy
description: How Apprise API handles information on the server you run it on.
sidebar:
  label: Privacy Policy
  order: 30
---

**Last updated: October 24, 2026**

This Privacy Policy applies to Apprise API, including the `caronc/apprise` Docker image and the Apprise application for TerraMaster TOS (`apprise-terramaster-tos7-app`).

## Overview

Apprise API is self-hosted. It runs entirely on the server or NAS you install it on. We do not operate a backend for it, require an account, or include advertising, analytics, tracking, or crash-reporting code.

## Information Stored on Your Server

Apprise API may store:

- Notification URLs, tags, and configuration you save (`/config`).
- Files you attach to a notification (`/attach`).
- Custom notification plugins you add (`/plugin`).

On TerraMaster TOS, these folders are under `DockerAppData/apprise-terramaster-tos7-app/`.

Notification URLs often contain credentials for the services they send to. Anyone who can reach the web interface can view and use them, so keep it off the public internet or put it behind a login.

## Data Transmission

Apprise API does not send your data, credentials, notification content, or usage information to us or to any third party chosen by us.

When you send a notification, Apprise API connects directly to the services named in your notification URLs (for example Slack, Discord, Telegram, or an email server). If you set `APPRISE_WEBHOOK_URL`, it also posts delivery results to that address. Those services handle what they receive under their own privacy policies.

Your container platform downloads the `caronc/apprise` image from Docker Hub when Apprise API is installed or updated.

## Information We Do Not Receive

We do not receive notification content, configuration, credentials, diagnostics, or usage data. We do not sell, rent, or use your information for advertising or tracking.

## Removing Your Data

Delete the folders mounted at `/config`, `/attach`, and `/plugin` to remove everything Apprise API stored. On TerraMaster TOS, uninstall the application and delete the `DockerAppData/apprise-terramaster-tos7-app` folder.

## Contact

Questions about this policy can be raised at [https://github.com/caronc/apprise-api/issues](https://github.com/caronc/apprise-api/issues).
