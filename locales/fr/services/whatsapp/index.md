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

Pour envoyer des messages WhatsApp via Apprise, vous devez d'abord configurer votre compte Meta WhatsApp Cloud API. Suivez les etapes suivantes :

1. **Creer un compte Meta Developer**  
   Rendez-vous sur [Meta for Developers](https://developers.facebook.com/) puis connectez-vous ou creez un compte.
1. **Creer une application WhatsApp**  
   Depuis le tableau de bord Meta Developer, creez une nouvelle application et ajoutez **WhatsApp** comme produit.
1. **Generer un jeton d'acces permanent**
   - Ouvrez la section **WhatsApp > API Setup** de votre application.
   - Selectionnez ou creez un **System User**, attribuez-lui un role puis generez un **permanent access token** avec les permissions `whatsapp_business_messaging`.
   - Ce jeton sera utilise dans le champ Apprise `token`.
1. **Recuperer votre `From Phone Number ID`**  
   Il ne s'agit pas de votre vrai numero de telephone, mais d'un identifiant numerique attribue par Meta au numero expediteur.  
   Vous le trouverez dans votre application WhatsApp > **API Setup**, section **Phone Numbers**.
1. **Enregistrer les numeros destinataires**
   - Pendant les tests en sandbox, vous devez verifier chaque numero que vous souhaitez contacter via l'interface Meta.
   - En production, votre entreprise devra etre verifiee et disposer du niveau de messagerie approprie.
1. **Facultatif : creer et faire approuver des modeles de message**
   - Ouvrez **WhatsApp > Message Templates**.
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
