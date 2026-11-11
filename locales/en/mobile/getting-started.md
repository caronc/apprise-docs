---
title: Set Up Apprise Mobile
description: Connect Apprise Mobile on Android, iPhone, or iPad to your self-hosted Apprise API server.
sidebar:
  label: Getting Started
  order: 2
---

Apprise Mobile uses the same workflow on Android, iPhone, and iPad. It connects to your own Apprise API server, which delivers your notifications to the services you configure.

## Install the App

Choose your store on the [Apprise Mobile page](../). Android requires Android 8.0 or later; iPhone and iPad require iOS 17.2 or later. Use your store to install updates.

## Prepare Your Server

1. [Deploy Apprise API](/api/deployment/) if you do not already run it.
2. Open its web interface and add a configuration with at least one notification destination.
3. Make sure your phone can reach the server address. A server on your home network may require Wi-Fi or a VPN when you are away. Use HTTPS when connecting across an untrusted network.

Apprise Mobile is a client, not a hosted notification service. It does not replace your API server or receive push notifications from other applications.

## Connect Apprise Mobile

Add a server in the app. Scan the configuration's QR code from the Apprise API web interface, or enter the server address and configuration ID manually. Enter authentication credentials if your server requires them.

Allow camera access when scanning a QR code. If your server uses a password, you may need to enter it after scanning: the web interface cannot recover a stored password from its hash. See [why a QR code may omit the password](/qa/mobile-qr-password/).

Use a server address reachable from your device. `localhost` on your phone refers to the phone, not the computer running Apprise API. Keep credentials and QR codes private.

## Send Your First Notification

Open the connected server, choose the configuration or destinations, and compose a message. Add a title, tags, or an attachment as needed, then send. Review the delivery report to check which destinations succeeded and retry failed deliveries when appropriate.

You can manage service URLs and save templates from the same app. The free version supports the core workflow with one active server. The optional one-time Full Version purchase expands the app's limits.

## Share from Another App

- **Android:** choose Apprise from the Android share sheet to open shared text or files in the app.
- **iPhone and iPad:** choose Apprise from the share sheet, then open Apprise to finish composing and sending. The share extension prepares the content; it does not send it automatically.

Grant photo or file access only when you need to attach content. Check the recipients before sending shared content.

## Background Delivery

Android and iOS manage background work differently. iOS decides when background refresh runs and grants limited execution time; queued work may wait until you reopen the app. Keep Apprise open for time-sensitive deliveries or large attachments. Background activity also depends on your device settings and network connection.

## Backups and Purchases

Use Settings to export a backup before changing devices. Secret-free backups omit credentials; encrypted backups protect them with your passphrase. Keep the passphrase somewhere safe, then import the backup on the other device. Backups are compatible between Android and iOS.

Full Version purchases belong to the store account used to buy them. Use Restore Purchases on iOS when reinstalling with the same Apple Account. A Google Play purchase does not unlock the App Store version, and an App Store purchase does not unlock the Android version.

Read the [Privacy Policy](../privacy/) and [Terms of Service](../tos/) for details.
