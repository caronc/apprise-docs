---
title: "Microsoft"
description: "Using Apprise with Fastmail and supported Fastmail domains."
---

:::caution[SMTP and App Passwords No Longer Work for Microsoft]

Microsoft has permanently disabled **Basic Authentication** for:

- Outlook.com
- Hotmail
- Live.com
- Office 365 (personal and business)

This includes **SMTP AUTH**, even when using **App Passwords**.

If you attempt to use URLs such as:

```text
mailto://user:password@smtp.office365.com
```

you will now receive errors similar to:

```text
5.7.139 Authentication unsuccessful, basic authentication is disabled
```

This behaviour is **expected** and cannot be worked around.

**You must use OAuth 2.0 via the Microsoft Graph API**, which is what the Apprise Office 365 service provides.
:::

## Why Azure App Registration Is Required

Because Basic Authentication is disabled, Microsoft requires all email sending to use:

- OAuth 2.0
- Microsoft Graph API
- An Azure Entra ID application

As of recent Azure changes:

- App registrations **cannot exist outside of a directory**
- Personal Microsoft accounts must complete Azure onboarding
- This often requires creating a free Azure subscription

This is a Microsoft requirement, not an Apprise one.
:::

Please use the [`azure://` Apprise plugin](/services/office365/) instead.
