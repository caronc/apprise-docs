---
title: "Apprise Mobile QR Codes and Passwords"
description: "Why the Apprise API QR code leaves out your password, and the one QR code that includes it."
sidebar:
  order: 10
---

## Why Is My Password Not in the QR Code?

The Apprise API never keeps your password in a readable form. It only stores a one-way fingerprint (a hash) that can check a password but cannot turn back into one, so there is nothing it could put in the QR code.

When you scan the QR code, Apprise Mobile fills in the server address, your Config ID, and your username. Type your password once; the app saves it securely on your phone.

## The QR Code That Includes the Password

Right after you set or change a password on the **Authentication** page, the web interface offers one more QR code. It has a key badge on the Apprise logo. That code includes the new password because you just typed it, and the page has not discarded it yet.

<figure>
  <img
    src="/assets/apprise-mobile-password-qr.png"
    alt="Example password QR code with an orange key badge over the Apprise logo"
    width="360"
    height="360"
    loading="lazy"
  />
  <figcaption>
    Example for <code>apprise://user:password@example.ca/my-config-id</code>. The
    key badge marks the QR code that contains the password. It is shown only once,
    but keeps working until the password changes.
  </figcaption>
</figure>

Save it or share it securely before you leave the page. After that, the password cannot be shown again.

## Forgot the Password?

Set a new one on the **Authentication** page, or ask your administrator to do it, then save or securely share the QR code with the key badge.
