---
title: "Notifications X (anciennement Twitter)"
description: "Envoyer des notifications X."
sidebar:
  label: "X (anciennement Twitter)"

source: https://x.com/
schemas:
  - x
  - twitter
  - tweet

sample_urls:
  - x://{ScreenName}@{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}
  - x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName}
  - x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}?mode=tweet

has_attachments: true

limits:
  - name: "Private Message"
    max_chars: 25000
  - name: "Tweet"
    max_chars: 280
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez creer un compte developpeur X sur [developer.x.com](https://developer.x.com/en).

Les messages directs X sont un peu plus complexes a configurer que certains autres services de notification. Voici donc un resume rapide de ce qu'il faut savoir et faire pour envoyer des notifications avec cet outil.

### Si un Projet et une App Existent Deja

Lors de la creation de votre compte developpeur X, un projet et une application par defaut ont peut-etre deja ete crees. Vous pouvez utiliser cette application ; c'est elle qui permettra l'envoi de vos messages directs.

1. Commencez par **regenerer les cles API**. Pour cela, ouvrez le nom de l'application dans **Projects & Apps** dans le menu de gauche, puis allez dans **Consumer Keys** depuis l'onglet "_Keys and tokens_". Une fois generees, copiez-les dans un endroit sur. Il s'agit des **Consumer Keys**.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)
2. Accordez ensuite les autorisations necessaires pour publier des posts ou envoyer des messages directs. Apres avoir clique sur le nom de l'application dans **Projects & Apps**, cliquez sur **Set up** dans la section **User authentication settings**.<br/>![X User authentication set up](./images/X-User-authentication-set-up.png)<br/>Dans la page **User authentication settings**, configurez :
   - **App permissions**\
     Selectionnez **Read and write** si vous souhaitez seulement publier. Si vous voulez envoyer des DMs, choisissez **Read and write and Direct message**.
   - **Type of App**\
     Selectionnez **Web App, Automated App or Bot**
   - **App info**\
     Saisissez n'importe quelle URL dans **Callback URI / Redirect URL** et **Website URL**. Si vous utilisez Apprise pour publier ou envoyer des DMs, la valeur exacte n'a pas d'importance.

   Une fois tout saisi, cliquez sur **Save**.

3. Enfin, vous devrez **regenerer les jetons d'acces**. Cela se fait dans **Authentication Tokens** depuis l'onglet "_Keys and tokens_". Une fois generes, copiez-les dans un endroit sur.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)

### Si Aucun Projet ni Aucune App n'Existent

1. Vous devez d'abord creer un projet et une application X, et non une Standalone app, depuis [developer.x.com](https://developer.x.com/en/portal/projects-and-apps). C'est via cette application X que vous pourrez envoyer vos DMs.<br/>![X Create Project](./images/X-Create-Project.png)<br/>X vous demandera de justifier votre besoin si vous decrivez le but de votre application.
2. Une fois l'application creee, vous verrez les **jetons API** a l'ecran ; copiez-les dans un endroit sur. Il s'agit des **Consumer Keys**.<br/>![X App API Key](./images/X-App-API-Key.png)
3. Accordez ensuite les autorisations necessaires pour publier des posts ou envoyer des DMs. Apres avoir clique sur le nom de l'application dans **Projects & Apps**, cliquez sur **Set up** dans la section **User authentication settings**.<br/>![X User authentication set up](./images/X-User-authentication-set-up.png)<br/>Dans la page **User authentication settings**, configurez :
   - **App permissions**\
     Selectionnez **Read and write** si vous souhaitez seulement publier. Si vous voulez envoyer des DMs, choisissez **Read and write and Direct message**.
   - **Type of App**\
     Selectionnez **Web App, Automated App or Bot**
   - **App info**\
     Saisissez n'importe quelle URL dans **Callback URI / Redirect URL** et **Website URL**. Si vous utilisez Apprise pour publier ou envoyer des DMs, la valeur exacte n'a pas d'importance.

   Une fois tout saisi, cliquez sur **Save**.

4. Enfin, vous devrez **generer les jetons d'acces**. Cela se fait dans **Authentication Tokens** depuis l'onglet "_Keys and tokens_". Une fois generes, copiez-les dans un endroit sur.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)

Vous devriez maintenant disposer des 4 jetons suivants prets a l'emploi :

- une Consumer Key, c'est-a-dire une cle API ;
- un Consumer Secret, c'est-a-dire un API Secret ;
- un jeton d'acces ;
- un secret de jeton d'acces.

A partir de la, vous etes pret. Vous pouvez publier des messages publics ou creer des messages directs grace a la variable `mode=`. Par defaut, le mode Direct Messaging, `dm`, est utilise.

## Syntaxe

La syntaxe valide est la suivante (`x://`, `twitter://` et `tweet://` sont tous des alias acceptes) :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`
- `x://{ScreenName}@{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`

Si vous connaissez les cibles a identifier, vous pouvez les viser par leur nom d'utilisateur X, leur `ScreenName` :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName}`
- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName1}/{ScreenName2}/{ScreenNameN}`

> [!NOTE]
> Si aucun `ScreenName` n'est precise, le message direct est envoye par defaut a votre propre compte.

Un post public peut etre reference ainsi :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}?mode=tweet`

## Détail des Paramètres

| Variable       | Obligatoire | Description                                                                                                                                                  |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ScreenName     | Oui         | Identifiant de votre compte, par exemple _l2gnux_ si votre identifiant est `@l2gnux`. Vous devez preciser un `{userid}` ou un `{ownerid}`.                   |
| ConsumerKey    | Oui         | Consumer Key, c'est-a-dire la cle API.                                                                                                                       |
| ConsumerSecret | Oui         | Consumer Secret Key, c'est-a-dire l'API Secret Key.                                                                                                          |
| AccessToken    | Oui         | Jeton d'acces genere depuis la configuration de votre application X.                                                                                         |
| AccessSecret   | Oui         | Secret d'acces genere depuis la configuration de votre application X.                                                                                        |
| Mode           | Non         | Mode X a utiliser. Les valeurs possibles sont `dm` pour les messages directs prives et `tweet` pour publier un message public. Par defaut, `dm` est utilise. |
| batch          | Non         | Par defaut, les images sont regroupees ensemble. Si vous voulez publier une publication par piece jointe, definissez cette valeur sur `False`.               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message direct X a `@testaccount` :

```bash
# Supposons que notre {ConsumerKey} soit T1JJ3T3L2
# Supposons que notre {ConsumerSecret} soit A1BRTD4JD
# Supposons que notre {AccessToken} soit TIiajkdnlazkcOXrIdevi7F
# Supposons que notre {AccessSecret} soit FDVJaj4jcl8chG3
# notre utilisateur est @testaccount
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twitter://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Ou

```bash
# Supposons que notre {ConsumerKey} soit T1JJ3T3L2
# Supposons que notre {ConsumerSecret} soit A1BRTD4JD
# Supposons que notre {AccessToken} soit TIiajkdnlazkcOXrIdevi7F
# Supposons que notre {AccessSecret} soit FDVJaj4jcl8chG3
# notre utilisateur est @testaccount
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   x://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Envoyer un post public :

```bash
# Supposons que notre {ConsumerKey} soit T1JJ3T3L2
# Supposons que notre {ConsumerSecret} soit A1BRTD4JD
# Supposons que notre {AccessToken} soit TIiajkdnlazkcOXrIdevi7F
# Supposons que notre {AccessSecret} soit FDVJaj4jcl8chG3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   twitter://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3?mode=tweet
```

Ou

```bash
# Supposons que notre {ConsumerKey} soit T1JJ3T3L2
# Supposons que notre {ConsumerSecret} soit A1BRTD4JD
# Supposons que notre {AccessToken} soit TIiajkdnlazkcOXrIdevi7F
# Supposons que notre {AccessSecret} soit FDVJaj4jcl8chG3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   x://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3?mode=tweet
```
