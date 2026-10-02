---
title: "Notifications WhatsApp"
description: "Envoyer des notifications WhatsApp."
sidebar:
  label: "WhatsApp"

source: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started

schemas:
  - whatsapp

has_chat: true

sample_urls:
  - whatsapp://{token}@{from_phone_id}/{targets}
  - whatsapp://{template}:{token}@{from_phone_id}/{targets}

limits:
  max_chars: 1024
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

La configuration de l'API Cloud WhatsApp de Meta est répartie entre deux portails distincts : [Meta Business Manager](https://business.facebook.com/) pour la gestion des utilisateurs système et des jetons permanents, et le [tableau de bord Meta Developer](https://developers.facebook.com/) pour la création de l'application et la localisation de l'identifiant de numéro de téléphone.

1. **Créer un compte Meta Business Manager**
   Rendez-vous sur [Meta Business Manager](https://business.facebook.com/) puis connectez-vous ou créez un compte. Vos comptes WhatsApp Business (WABA) et utilisateurs système sont gérés ici.
1. **Créer un compte Meta Developer et une application**
   Rendez-vous sur [Meta for Developers](https://developers.facebook.com/) puis connectez-vous ou créez un compte. Créez une nouvelle application de type **Business**, puis ajoutez **WhatsApp** comme produit. Si vous y êtes invité depuis la page d'accueil, cliquez sur **Customise Use Case** et sélectionnez le cas d'usage **Connect to Customers (WhatsApp)** pour accéder à la configuration de l'API Cloud.
1. **Générer un jeton d'accès permanent via Business Manager**
   - Dans [Meta Business Manager](https://business.facebook.com/), allez dans **Paramètres** > **Utilisateurs** > **Utilisateurs système**.
   - Créez un utilisateur système (rôle Administrateur ou Employé).
   - Cliquez sur **Ajouter des ressources**, sélectionnez votre application WhatsApp et activez la permission `whatsapp_business_messaging` (et optionnellement `whatsapp_business_management`).
   - Cliquez sur **Générer un jeton**, sélectionnez votre application, confirmez les permissions et copiez le jeton obtenu. Ce jeton permanent n'expire pas sauf révocation et est utilisé dans le champ Apprise `token`.
1. **Récupérer votre `From Phone Number ID`**
   Retournez sur le [tableau de bord Meta Developer](https://developers.facebook.com/), ouvrez votre application, puis naviguez vers **WhatsApp** > **API Setup** (ou **Premiers pas**). Votre numéro expéditeur et son **Phone Number ID** y sont affichés. Cet identifiant n'est pas votre vrai numéro de téléphone. Il s'agit d'un ID numérique distinct (environ 14 chiffres) attribué par Meta.
1. **Enregistrer les numéros destinataires**
   - Pendant les tests en sandbox, vous devez vérifier chaque numéro que vous souhaitez contacter via l'interface Meta.
   - En production, votre entreprise devra être vérifiée et disposer du niveau de messagerie approprié.
1. **Facultatif : créer et faire approuver des modèles de message**
   - Ouvrez **WhatsApp** > **Message Templates** dans le tableau de bord Developer, ou utilisez le gestionnaire WhatsApp dans Business Manager.
   - Créez un modèle, par exemple `hello_world`, puis attendez son approbation.
   - Les modèles permettent une messagerie structurée avec des variables comme `{{1}}`, `{{2}}`, et peuvent être utilisés via le préfixe Apprise `template:`. Cela est expliqué plus bas.

Une fois tout cela en place, vous êtes prêt à envoyer des messages WhatsApp avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `whatsapp://{token}@{from_phone_id}/{targets}`
- `whatsapp://{template}:{token}@{from_phone_id}/{targets}`

Les cibles peuvent être des numéros de téléphone, des identifiants de groupe, ou un mélange des deux :

- `+{phone}` : numéro de téléphone au format E.164 (le préfixe `+` est requis ; les chiffres seuls sont aussi acceptés)
- `#{group_id}` : identifiant de groupe WhatsApp (numérique, préfixe `#` obligatoire)

:::caution

**La messagerie de groupe nécessite un niveau de compte Meta qualifiant.** Au moment de la rédaction, Meta restreint l'API WhatsApp Groups aux entreprises ayant au moins 100 000 conversations initiées par l'entreprise par mois. Consultez la [documentation Meta Groups API](https://developers.facebook.com/documentation/business-messaging/whatsapp/groups) pour les conditions d'éligibilité actuelles. Les identifiants de groupe sont retournés par l'API Groups lors de la création d'un groupe. Ils ne sont pas générés manuellement.

:::

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui         | **Jeton d'accès** associé à votre application Meta WhatsApp.                                                                                                                                               |
| from     | Oui         | **From Phone ID** associé à votre application Meta WhatsApp ; il ne faut pas le confondre avec votre vrai numéro de téléphone. Il s'agit d'un identifiant distinct, d'environ 14 chiffres.                 |
| targets  | Oui         | Un ou plusieurs destinataires : numéros de téléphone (`+{phone}` ou `@{phone}`) et/ou identifiants de groupe (`#{group_id}`). Au moins une cible doit être fournie.                                        |
| template | Non         | Vous pouvez facultativement spécifier ici un `template_name`, comme `hello_world`, le modèle par défaut créé lors de la configuration de votre application Meta. Apprise utilisera alors le modèle défini. |
| lang     | Non         | Si vous utilisez un modèle, vous pouvez facultativement surcharger la langue par défaut, `en_US`, afin de pointer vers une autre version du modèle spécifié.                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Variables de Modèle

Les modèles que vous créez permettent de définir `{{1}}`, `{{2}}`, etc., qui seront remplacés lors de l'exécution d'Apprise. Pour prédéfinir ces valeurs, il suffit d'utiliser le préfixe `:` (deux-points) devant l'index à renseigner.

Par exemple, `?:3=Ma Valeur` affectera `Ma Valeur` à `{{3}}` à l'exécution. Vous devez fournir tous les index attendus, sinon le serveur distant renverra une erreur.

Si vous souhaitez associer le `body` ou le `type` d'Apprise à un index, utilisez ces mots-clés spéciaux avec le préfixe `:` pour définir la correspondance. Par exemple, `?:body=1` est accepté et placera le contenu du `body` d'Apprise dans `{{1}}`.

:::note

1. L'en-tête du modèle doit être vide, `''`, ou contenir du contenu explicite.
1. Les variables du corps du message, s'il y en a, doivent utiliser le format numérique, par exemple `{{1}}`, et non le format à nommage libre, par exemple `{{order_id}}`.

:::

## Exemples

Envoyer une notification WhatsApp à un groupe :

```bash
# Envoyer un message à un numéro de téléphone :
apprise -b "Message de Test" \
  "whatsapp://token@from_phone_id/+14155552671/"

# Envoyer un message à un groupe WhatsApp (niveau Meta requis) :
apprise -b "Message de Test" \
  "whatsapp://token@from_phone_id/#120363043968066561"

# Envoyer à un numéro de téléphone et à un groupe en un seul appel :
apprise -b "Message de Test" \
  "whatsapp://token@from_phone_id/+14155552671/#120363043968066561"

# L'ancienne forme fonctionne toujours (chiffres seuls sans '+') :
apprise -b "Message de Test" \
  "whatsapp://token@from_phone_id/to_phone_no/"

# Les modèles peuvent être utilisés ainsi :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/"

# Si vous avez défini les jetons {{1}} et {{2}}, vous pouvez leur attribuer des valeurs ainsi :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:1=the data i want put here&:2=more data here"

# La forme :<id> permet d'associer les éléments {{<id>}}. Si vous souhaitez mapper le body
# ou le type du message à un index, 2 mots-clés réservés sont disponibles pour cela :
# L'exemple ci-dessous place la valeur du body Apprise dans l'élément {{1}} :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:body=1"

# Vous pouvez mélanger mots-clés et index :
apprise -b "Message de Test" \
  "whatsapp://template_name:token@from_phone_id/to_phone_no/?:body=2&:type=3&1:MyID1Value"

# Il revient au développeur de s'assurer que tous les {{1}}, {{2}}, etc. sont correctement renseignés
```
