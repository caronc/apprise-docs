---
title: "Office 365 / Outlook / Hotmail"
description: "Envoyer notifications via Office 365, Outlook.com, and Hotmail."
sidebar:
  label: "Office 365 / Outlook"

schemas:
  - o365
  - azure

has_attachments: true

sample_urls:
  - o365://{source}/{tenant_id}/{client_id}/{client_secret}/
  - o365://{source}/{tenant_id}/{client_id}/{client_secret}/{targets}
  - azure://{source}/{tenant_id}/{client_id}/{client_secret}/
  - azure://{source}/{tenant_id}/{client_id}/{client_secret}/{targets}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Because Microsoft has disabled Basic Authentication (Username/Password), **you must register an application in Azure** to generate the credentials Apprise needs (Client ID, Secret, etc).

1. From the [**Azure Portal**](https://portal.azure.com/) go to **App Registrations** ([alt link](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade))
   - Use the search bar at the top of the Azure Portal and type `App Registrations`.
   - If you still can't access anything, it's possible your organization restricts you from doing so. You may need to reach out to your administrator in order to proceed.<br/>![Office 365](./images/1acb45eda098a004.png)

1. Click **Register an application**

   <details>
     <summary>⚠️ Screen you may see if you do not have an Azure Account</summary>
     You must have an Azure account (specifically a subscription) for this area to work.  Subscriptions are free, but they do still require you to put your credit card in.  To create a subscription:
     <img src="/services/office365/images/2acb45bda0e8ac14.png" alt="These applications are associated with the account user@example.com but are not contained within any directory. The ability to create applications outside of a directory has been deprecated. You can get a new directory by joining the M365 Developer Program or signing up for Azure."/>
     <ul>
       <li>Go to: <strong>Azure Portal → Subscriptions</strong></li>
       <li>Click <strong>Add</strong></li>
       <li>Choose <strong>Azure subscription (Free)</strong></li>
     </ul>
     <p>No resources need to be deployed. This simply completes tenant provisioning.</p>
     <p>After this, ensure you are viewing the correct directory:</p>
     <ul>
       <li>Click your avatar (top right)</li>
       <li>Select <strong>Switch directory</strong></li>
       <li>Choose the directory where the subscription was created. It's possible there is only one new subscription (the one you just created).  Therefore you're already in the right place and can proceed with the steps below.</li>
     </ul>
   </details>

   <!-- This comment is required to prevent linter from placing below lines up against tag details
        stanza above which breaks the table layout below -->
   - Give it a name (for example: `Apprise Notifications`)
   - **Crucial:** Select the 3rd option: **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts**.
   - Click **Register**.

1. From here (the **Overview** panel) you can acquire both:
   - The **Application (client) ID**: our `client_id` for the `azure://**/**/client_id/**/` and
   - The **Object ID**: our `source` for the `azure://source/**/**/**/` and
   - The **Directory (tenant) ID**: our `tenant_id` for the `azure://**/tenant_id/**/**/`
1. To create your `client_secret` , expand the **Manage** tab on the left:
   - Click on **Certificates & secrets** -> **Client secrets**
   - Click **New client secret**
   - Provide a description (for example `Apprise Secret`) and an expiry
   - Click **Add**.
   - The `client_secret` is the value under the **Value** column. This will be placed in our final `azure://**/**/**/client_secret` part of our Apprise URL.
     :::caution[This step causes the most failures]

     Azure shows two values:

     | Field        | Use this? |
     | ------------ | --------- |
     | Secret Value | ✅ Yes    |
     | Secret ID    | ❌ No     |

     The **Secret Value**:
     - Is only visible once
     - Becomes masked after you leave the page
     - Is the actual password

     If unsure, simply regenerate the secret; you can delete the old and create a new one.
     :::

1. To set up permissions, expand the **Manage** tab on the left (if it is collapsed for whatever reason):
   - Click on **API permissions**. You will likely already have the **User.Read** permission set up (as a default). But we need to add more.
   - Click **Add a permission**.
   - Click on **Microsoft Graph**.
   - Click on **Application Permissions** and search for **Mail.Send**.
   - Once found; check the box (so that it can be added and click **Add permissions**.
   - You should also add the following **Application Permission**:
     - **User.Read.All** allows apprise to correctly look up use your Object ID the `source`.
     - **Mail.ReadWrite** (Optional) if you intend to send large attachments (> 3MB)

   **Important:** After adding, you must click **Grant admin consent for <Directory Name>** for the permissions to take effect. For most this may read as **Grant admin consent for Default Directory**. This option is located right beside the _Add a permission_ action you were previous using above.

1. Now you're good to go. 🙂

## Syntaxe

La syntaxe valide est la suivante (les alias `o365://` et `azure://` sont acceptes) :

- `o365://{source}/{tenant_id}/{client_id}/{client_secret}/`
- `o365://{source}/{tenant_id}/{client_id}/{client_secret}/{targets}`

## Detail des parametres

| Variable      | Required | Description                                                                                                                                    |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| source        | Yes      | The **Email Address** or **Object ID** associated with the Azure Account you wish to send the email from.                                      |
| tenant_id     | Yes      | The **Tenant ID** (Directory ID) associated with your App Registration.                                                                        |
| client_id     | Yes      | The **Client ID** (Application ID) associated with your App Registration.                                                                      |
| client_secret | Yes      | The **Client Secret** you generated in the "Certificates & secrets" section.                                                                   |
| from          | No       | If you want the email _ReplyTo_ address to be something other than your own email address, you can specify it here.                            |
| to            | No       | Override the target email. By default, the email is sent to the address identified by the `source` (or the targets specified in the URL path). |

<!-- TEMPLATE:SERVICE-PARAMS -->

:::note

- If no `targets` are specified, then the notification is just sent to the address identified by `{account_email}`
- Unfortunately the `client_secret` contains a lot of characters that can drastically conflict with standard URL rules (and thus Apprise might have difficulty detecting your client secret). The `?` and `@` characters can get generated by Microsoft and will almost definitely cause you issues.
  - Consider encoding this `client secret` before putting it into your Apprise URL. Encoding the URL can be as simple as just pasting it into the form on [this website](https://www.url-encode-decode.com/).
  - You can also just manually escape these characters on your Apprise URL yourself manually ([explained here](../../qa/special-characters/)). Simply swap all instances of: - `?` with `%3F` - `@` with `%40`
    :::

## Exemples

Envoyer an email notification to our your Office 365 account:

```bash
# Assuming our {tenant_id} is ab-cd-ef-gh
# Assuming our {account_email} is user@example.com
# Assuming our {client_id} is zz-yy-xx-ww
# Assuming our {client_secret} is rt/djdwjjd
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   azure:///user@example.com/ab-cd-ef-gh/zz-yy-xx-ww/rt/djdwjjd
```
