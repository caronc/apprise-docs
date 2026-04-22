---
title: "Office 365 / Outlook / Hotmail"
description: "Envoyer des notifications via Office 365, Outlook.com et Hotmail."
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

## Configuration du Compte

Puisque Microsoft a désactivé l'authentification basique (nom d'utilisateur / mot de passe), **vous devez enregistrer une application dans Azure** afin de générer les identifiants nécessaires à Apprise (Client ID, Secret, etc.).

1. Depuis le [**portail Azure**](https://portal.azure.com/), ouvrez **App Registrations** ([lien alternatif](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)).
   - Utilisez la barre de recherche en haut du portail Azure et tapez `App Registrations`.
   - Si vous n'y avez toujours pas accès, il est possible que votre organisation vous le restreigne. Vous devrez peut-être contacter votre administrateur pour poursuivre.<br/>![Office 365](./images/1acb45eda098a004.png)

1. Cliquez sur **Register an application**

   <details>
     <summary>⚠️ Écran que vous pouvez voir si vous n'avez pas de compte Azure</summary>
     Vous devez avoir un compte Azure, plus précisément un abonnement, pour que cette partie fonctionne. Les abonnements sont gratuits, mais exigent tout de même l'enregistrement d'une carte bancaire. Pour créer un abonnement :
     <img src="/services/office365/images/2acb45bda0e8ac14.png" alt="These applications are associated with the account user@example.com but are not contained within any directory. The ability to create applications outside of a directory has been deprecated. You can get a new directory by joining the M365 Developer Program or signing up for Azure."/>
     <ul>
       <li>Allez dans : <strong>Azure Portal → Subscriptions</strong></li>
       <li>Cliquez sur <strong>Add</strong></li>
       <li>Choisissez <strong>Azure subscription (Free)</strong></li>
     </ul>
     <p>Aucune ressource n'a besoin d'être déployée. Cela permet simplement de finaliser le provisionnement du tenant.</p>
     <p>Ensuite, assurez-vous d'être dans le bon annuaire :</p>
     <ul>
       <li>Cliquez sur votre avatar (en haut à droite)</li>
       <li>Sélectionnez <strong>Switch directory</strong></li>
       <li>Choisissez l'annuaire dans lequel l'abonnement a été créé. Il est possible qu'il n'y ait qu'un seul nouvel abonnement, celui que vous venez de créer. Dans ce cas, vous êtes déjà au bon endroit et pouvez poursuivre.</li>
     </ul>
   </details>

   <!-- This comment is required to prevent linter from placing below lines up against tag details
        stanza above which breaks the table layout below -->
   - Donnez-lui un nom, par exemple `Apprise Notifications`.
   - **Point crucial :** sélectionnez la 3e option : **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts**.
   - Cliquez sur **Register**.

1. Depuis le panneau **Overview**, vous pouvez recuperer :
   - l'**Application (client) ID** : votre `client_id` dans `azure://**/**/client_id/**/` ;
   - l'**Object ID** : votre `source` dans `azure://source/**/**/**/` ;
   - le **Directory (tenant) ID** : votre `tenant_id` dans `azure://**/tenant_id/**/**/`.
1. Pour créer votre `client_secret`, développez l'onglet **Manage** à gauche :
   - cliquez sur **Certificates & secrets** → **Client secrets** ;
   - cliquez sur **New client secret** ;
   - fournissez une description, par exemple `Apprise Secret`, ainsi qu'une expiration ;
   - cliquez sur **Add** ;
   - le `client_secret` est la valeur visible dans la colonne **Value**. C'est cette valeur qui sera placée dans la partie `azure://**/**/**/client_secret` de votre URL Apprise.
     :::caution[Cette étape provoque le plus d'échecs]

     Azure affiche deux valeurs :

     | Champ        | A utiliser ? |
     | ------------ | ------------ |
     | Secret Value | Oui          |
     | Secret ID    | Non          |

     La **Secret Value** :
     - n'est visible qu'une seule fois ;
     - devient masquée après avoir quitté la page ;
     - correspond au véritable mot de passe.

     En cas de doute, régénérez simplement le secret ; vous pouvez supprimer l'ancien puis en créer un nouveau.
     :::

1. Pour configurer les permissions, développez l'onglet **Manage** à gauche s'il est replié :
   - cliquez sur **API permissions**. Vous aurez probablement déjà la permission **User.Read** par défaut, mais nous devons en ajouter d'autres ;
   - cliquez sur **Add a permission** ;
   - cliquez sur **Microsoft Graph** ;
   - cliquez sur **Application Permissions** puis recherchez **Mail.Send** ;
   - une fois trouvé, cochez la case puis cliquez sur **Add permissions** ;
   - ajoutez également les permissions d'application suivantes :
     - **User.Read.All** permet à Apprise de résoudre correctement votre Object ID utilisé comme `source` ;
     - **Mail.ReadWrite** (optionnel) si vous souhaitez envoyer de grosses pièces jointes (> 3 Mo).

   **Important :** après ajout, vous devez cliquer sur **Grant admin consent for <Directory Name>** pour que les permissions prennent effet. Pour beaucoup d'utilisateurs, cela apparaîtra comme **Grant admin consent for Default Directory**. Cette option se trouve juste à côté de l'action _Add a permission_ utilisée précédemment.

1. Vous êtes maintenant prêt. 🙂

## Syntaxe

La syntaxe valide est la suivante, les alias `o365://` et `azure://` étant tous deux acceptés :

- `o365://{source}/{tenant_id}/{client_id}/{client_secret}/`
- `o365://{source}/{tenant_id}/{client_id}/{client_secret}/{targets}`

## Détail des Paramètres

| Variable      | Requis | Description                                                                                                                                      |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| source        | Oui    | L'**adresse e-mail** ou l'**Object ID** associé au compte Azure depuis lequel vous souhaitez envoyer l'e-mail.                                   |
| tenant_id     | Oui    | Le **Tenant ID** (Directory ID) associé à l'enregistrement de votre application.                                                                 |
| client_id     | Oui    | Le **Client ID** (Application ID) associé à l'enregistrement de votre application.                                                               |
| client_secret | Oui    | Le **Client Secret** généré dans la section "Certificates & secrets".                                                                            |
| from          | Non    | Si vous souhaitez que l'adresse _ReplyTo_ soit différente de votre propre adresse e-mail, vous pouvez la préciser ici.                           |
| to            | Non    | Surcharge le destinataire. Par défaut, l'e-mail est envoyé à l'adresse identifiée par `source`, ou aux cibles précisées dans le chemin de l'URL. |

<!-- TEMPLATE:SERVICE-PARAMS -->

:::note

- Si aucun `targets` n'est précisé, la notification est simplement envoyée à l'adresse identifiée par `{account_email}`.
- Malheureusement, le `client_secret` contient souvent des caractères qui entrent fortement en conflit avec les règles d'URL standard. Apprise peut donc avoir du mal à détecter correctement votre client secret. Les caractères `?` et `@`, souvent générés par Microsoft, poseront presque à coup sûr problème.
  - Pensez à encoder ce `client secret` avant de le placer dans votre URL Apprise. Cela peut être aussi simple que de le coller dans le formulaire de [ce site](https://www.url-encode-decode.com/).
  - Vous pouvez aussi échapper manuellement ces caractères dans votre URL Apprise, comme [expliqué ici](../../qa/special-characters/). Remplacez simplement :
    - `?` par `%3F`
    - `@` par `%40`
      :::

## Exemples

Envoyer une notification e-mail à votre compte Office 365 :

```bash
# Assuming our {tenant_id} is ab-cd-ef-gh
# Assuming our {account_email} is user@example.com
# Assuming our {client_id} is zz-yy-xx-ww
# Assuming our {client_secret} is rt/djdwjjd
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   azure:///user@example.com/ab-cd-ef-gh/zz-yy-xx-ww/rt/djdwjjd
```
