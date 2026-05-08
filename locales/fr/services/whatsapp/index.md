---
title: "Notifications WhatsApp"
description: "Envoyer des notifications WhatsApp."
sidebar:
  label: "WhatsApp"

source: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started

schemas:
  - whatsapp

sample_urls:
  - whatsapp://{token}@{from_phone_id}/{targets}
  - whatsapp://{template}:{token}@{from_phone_id}/{targets}

limits:
  max_chars: 1024
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

La configuration de l'API Cloud WhatsApp de Meta est repartie entre deux portails distincts : [Meta Business Manager](https://business.facebook.com/) pour la gestion des utilisateurs systeme et des jetons permanents, et le [tableau de bord Meta Developer](https://developers.facebook.com/) pour la creation de l'application et la localisation de l'identifiant de numero de telephone.

1. **Creer un compte Meta Business Manager**
   Rendez-vous sur [Meta Business Manager](https://business.facebook.com/) puis connectez-vous ou creez un compte. Vos comptes WhatsApp Business (WABA) et utilisateurs systeme sont geres ici.
1. **Creer un compte Meta Developer et une application**
   Rendez-vous sur [Meta for Developers](https://developers.facebook.com/) puis connectez-vous ou creez un compte. Creez une nouvelle application de type **Business**, puis ajoutez **WhatsApp** comme produit. Si vous y etes invite depuis la page d'accueil, cliquez sur **Customise Use Case** et selectionnez le cas d'usage **Connect to Customers (WhatsApp)** pour acceder a la configuration de l'API Cloud.
1. **Generer un jeton d'acces permanent via Business Manager**
   - Dans [Meta Business Manager](https://business.facebook.com/), allez dans **Parametres** > **Utilisateurs** > **Utilisateurs systeme**.
   - Creez un utilisateur systeme (role Administrateur ou Employe).
   - Cliquez sur **Ajouter des ressources**, selectionnez votre application WhatsApp et activez la permission `whatsapp_business_messaging` (et optionnellement `whatsapp_business_management`).
   - Cliquez sur **Generer un jeton**, selectionnez votre application, confirmez les permissions et copiez le jeton obtenu. Ce jeton permanent n'expire pas sauf revocation et est utilise dans le champ Apprise `token`.
1. **Recuperer votre `From Phone Number ID`**
   Retournez sur le [tableau de bord Meta Developer](https://developers.facebook.com/), ouvrez votre application, puis naviguez vers **WhatsApp** > **API Setup** (ou **Premiers pas**). Votre numero expediteur et son **Phone Number ID** y sont affiches. Cet identifiant n'est pas votre vrai numero de telephone — il s'agit d'un ID numerique distinct (environ 14 chiffres) attribue par Meta.
1. **Enregistrer les numeros destinataires**
   - Pendant les tests en sandbox, vous devez verifier chaque numero que vous souhaitez contacter via l'interface Meta.
   - En production, votre entreprise devra etre verifiee et disposer du niveau de messagerie approprie.
1. **Facultatif : creer et faire approuver des modeles de message**
   - Ouvrez **WhatsApp** > **Message Templates** dans le tableau de bord Developer, ou utilisez le gestionnaire WhatsApp dans Business Manager.
   - Creez un modele, par exemple `hello_world`, puis attendez son approbation.
   - Les modeles permettent une messagerie structuree avec des variables comme `{{1}}`, `{{2}}`, et peuvent etre utilises via le prefixe Apprise `template:`. Cela est explique plus bas.

Une fois tout cela en place, vous etes pret a envoyer des messages WhatsApp avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `whatsapp://{token}@{from_phone_id}/{targets}`
- `whatsapp://{template}:{token}@{from_phone_id}/{targets}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui         | **Jeton d'acces** associe a votre application Meta WhatsApp.                                                                                                                                               |
| from     | Oui         | **From Phone ID** associe a votre application Meta WhatsApp ; il ne faut pas le confondre avec votre vrai numero de telephone. Il s'agit d'un identifiant distinct, d'environ 14 chiffres.                 |
| targets  | Oui         | Destinataires WhatsApp que vous souhaitez notifier.                                                                                                                                                        |
| template | Non         | Vous pouvez facultativement specifier ici un `template_name`, comme `hello_world`, le modele par defaut cree lors de la configuration de votre application Meta. Apprise utilisera alors le modele defini. |
| lang     | Non         | Si vous utilisez un modele, vous pouvez facultativement surcharger la langue par defaut, `en_US`, afin de pointer vers une autre version du modele specifie.                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Variables de Modele

Les modeles que vous creez permettent de definir `{{1}}`, `{{2}}`, etc., qui seront remplaces lors de l'execution d'Apprise. Pour predefinir ces valeurs, il suffit d'utiliser le prefixe `:`, deux-points, devant l'index a renseigner.

Par exemple, `?:3=Ma Valeur` affectera `Ma Valeur` a `{{3}}` a l'execution. Vous devez fournir tous les index attendus, sinon le serveur distant renverra une erreur.

Si vous souhaitez associer le `body` ou le `type` d'Apprise a un index, utilisez ces mots-cles speciaux avec le prefixe `:` pour definir la correspondance. Par exemple, `?:body=1` est accepte et placera le contenu du `body` d'Apprise dans `{{1}}`.

:::note

1. L'en-tete du modele doit etre vide, `''`, ou contenir du contenu explicite.
1. Les variables du corps du message, s'il y en a, doivent utiliser le format numerique, par exemple `{{1}}`, et non le format a nommage libre, par exemple `{{order_id}}`.

   :::

## Exemples

Envoyer une notification WhatsApp :

```bash
# Testez avec la commande suivante :
apprise -b "Message de Test" \
  "whatsapp://token@from_phone_id/to_phone_no/"

# Les modeles peuvent etre utilises ainsi :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/"

# Si vous avez defini les tokens {{1}} et {{2}}, vous pouvez leur attribuer des valeurs ainsi :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:1=the data i want put here&:2=more data here"

# La forme :<id> permet d'associer les elements {{<id>}}. Si vous souhaitez mapper le body
# ou le type du message a un index, 2 mots-cles reserves sont disponibles pour cela :
# L'exemple ci-dessous place la valeur du body Apprise dans l'element {{1}} :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:body=1"

# Vous pouvez melanger mots-cles et index :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:body=2&:type=3&1:MyID1Value"

# Il revient au developpeur de s'assurer que tous les {{1}}, {{2}}, etc. sont correctement renseignes
```
