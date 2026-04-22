---
title: "Microsoft"
description: "Utiliser Apprise avec Microsoft et les domaines Microsoft pris en charge."
---

:::caution[SMTP et mots de passe d’application ne fonctionnent plus chez Microsoft]

Microsoft a désactivé de façon permanente l’**authentification basique** pour :

- Outlook.com
- Hotmail
- Live.com
- Office 365 (personal and business)

Cela inclut **SMTP AUTH**, même lors de l’utilisation de **mots de passe d’application**.

Si vous essayez d’utiliser des URL comme :

```text
mailto://user:password@smtp.office365.com
```

vous recevrez désormais des erreurs du type :

```text
5.7.139 Authentication unsuccessful, basic authentication is disabled
```

Ce comportement est **normal** et ne peut pas être contourné.

**Vous devez utiliser OAuth 2.0 via l’API Microsoft Graph**, ce que fournit le service Apprise Office 365.
:::

## Pourquoi l’Enregistrement d’une Application Azure est Requis

Puisque l’authentification basique est désactivée, Microsoft exige que tout envoi d’e-mail utilise :

- OAuth 2.0
- Microsoft Graph API
- An Azure Entra ID application

Depuis les changements récents côté Azure :

- les enregistrements d’applications **ne peuvent pas exister en dehors d’un annuaire** ;
- les comptes Microsoft personnels doivent passer par l’onboarding Azure ;
- cela exige souvent la création d’un abonnement Azure gratuit.

C’est une exigence de Microsoft, pas d’Apprise.

Veuillez utiliser le plugin Apprise [`azure://`](../office365/) à la place.
