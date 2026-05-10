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
  - name: "Message direct"
    max_chars: 10000
  - name: "Tweet"
    max_chars: 280
---

<!-- SERVICE:DETAILS -->

:::note
Depuis 2023, X (anciennement Twitter) a retire l'acces a l'API v1.1 pour les comptes gratuits. Apprise utilise desormais l'API X v2. Les deux modes ont des exigences d'abonnement differentes :

- **Tweets** (`mode=tweet`) -- disponibles sur le niveau **gratuit** de l'API X et au-dessus.
- **Messages directs** (`mode=dm`, mode par defaut) -- necessitent un abonnement paye **Basic** ou superieur. Les comptes gratuits recevront une erreur 403 lors de la tentative d'envoi de messages directs.

Les envois de medias (pieces jointes) utilisent toujours l'endpoint media v1.1, qui reste autorise sur tous les niveaux d'acces, y compris le niveau gratuit.
:::

## Configuration du compte

Vous devez creer un compte developpeur X sur [developer.x.com](https://developer.x.com/en).

Les messages directs X sont un peu plus complexes a configurer que certains autres services de notification. Voici donc un resume rapide de ce qu'il faut savoir et faire pour envoyer des notifications avec cet outil.

### Si un Projet et une App Existent Deja

Lors de la creation de votre compte developpeur X, un projet et une application par defaut ont peut-etre deja ete crees. Vous pouvez utiliser cette application ; c'est elle qui permettra l'envoi de vos messages directs.

1. Commencez par **regenerer les cles API**. Pour cela, ouvrez le nom de l'application dans **Projects & Apps** dans le menu de gauche, puis allez dans **Consumer Keys** depuis l'onglet "_Keys and tokens_". Une fois generees, copiez-les dans un endroit sur. Il s'agit des **Consumer Keys**.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)
2. Accordez ensuite les autorisations necessaires pour publier des posts ou envoyer des messages directs. Apres avoir clique sur le nom de l'application dans **Projects & Apps**, cliquez sur **Set up** dans la section **User authentication settings**.<br/>![X User authentication set up](./images/X-User-authentication-set-up.png)<br/>Dans la page **User authentication settings**, configurez :
   - **App permissions**\
     Selectionnez **Read and write** si vous souhaitez seulement publier. Si vous voulez envoyer des messages directs (abonnement Basic+ requis), choisissez **Read and write and Direct message**.
   - **Type of App**\
     Selectionnez **Web App, Automated App or Bot**
   - **App info**\
     Saisissez n'importe quelle URL dans **Callback URI / Redirect URL** et **Website URL**. Si vous utilisez Apprise pour publier ou envoyer des messages directs, la valeur exacte n'a pas d'importance.

   Une fois tout saisi, cliquez sur **Save**.

3. Enfin, vous devrez **regenerer les jetons d'acces**. Cela se fait dans **Authentication Tokens** depuis l'onglet "_Keys and tokens_". Une fois generes, copiez-les dans un endroit sur.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)

### Si Aucun Projet ni Aucune App n'Existent

1. Vous devez d'abord creer un projet et une application X, et non une Standalone app, depuis [developer.x.com](https://developer.x.com/en/portal/projects-and-apps). C'est via cette application X que vous pourrez envoyer vos messages directs.<br/>![X Create Project](./images/X-Create-Project.png)<br/>X vous demandera de justifier votre besoin si vous decrivez le but de votre application.
2. Une fois l'application creee, vous verrez les **jetons API** a l'ecran ; copiez-les dans un endroit sur. Il s'agit des **Consumer Keys**.<br/>![X App API Key](./images/X-App-API-Key.png)
3. Accordez ensuite les autorisations necessaires pour publier des posts ou envoyer des messages directs. Apres avoir clique sur le nom de l'application dans **Projects & Apps**, cliquez sur **Set up** dans la section **User authentication settings**.<br/>![X User authentication set up](./images/X-User-authentication-set-up.png)<br/>Dans la page **User authentication settings**, configurez :
   - **App permissions**\
     Selectionnez **Read and write** si vous souhaitez seulement publier. Si vous voulez envoyer des messages directs (abonnement Basic+ requis), choisissez **Read and write and Direct message**.
   - **Type of App**\
     Selectionnez **Web App, Automated App or Bot**
   - **App info**\
     Saisissez n'importe quelle URL dans **Callback URI / Redirect URL** et **Website URL**. Si vous utilisez Apprise pour publier ou envoyer des messages directs, la valeur exacte n'a pas d'importance.

   Une fois tout saisi, cliquez sur **Save**.

4. Enfin, vous devrez **generer les jetons d'acces**. Cela se fait dans **Authentication Tokens** depuis l'onglet "_Keys and tokens_". Une fois generes, copiez-les dans un endroit sur.<br/>![X Generate Tokens](./images/X-Generate-Tokens.png)

Vous devriez maintenant disposer des 4 jetons suivants prets a l'emploi :

- une Consumer Key, c'est-a-dire une cle API ;
- un Consumer Secret, c'est-a-dire un API Secret ;
- un jeton d'acces ;
- un secret de jeton d'acces.

A partir de la, vous etes pret. Vous pouvez publier des tweets publics ou creer des messages directs grace a la variable `mode=`. Par defaut, le mode Message Direct (`dm`) est utilise.

:::caution
L'envoi de messages directs necessite un abonnement paye X API de niveau **Basic** ou superieur. Si vous etes sur un compte developpeur gratuit, utilisez plutot `mode=tweet`.
:::

## Syntaxe

La syntaxe valide est la suivante (`x://`, `twitter://` et `tweet://` sont tous des alias acceptes) :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`
- `x://{ScreenName}@{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`

Si vous connaissez les cibles a identifier, vous pouvez les viser par leur nom d'utilisateur X, leur `ScreenName` :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName}`
- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName1}/{ScreenName2}/{ScreenNameN}`

:::note
Si aucun `ScreenName` n'est precise, le message direct est envoye par defaut a votre propre compte.
:::

Un tweet public peut etre reference ainsi (disponible sur le niveau gratuit de l'API X et au-dessus) :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}?mode=tweet`

## Detail des Parametres

| Variable       | Obligatoire | Description                                                                                                                                                                           |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ScreenName     | Oui         | Identifiant de votre compte, par exemple _l2gnux_ si votre identifiant est `@l2gnux`. Vous devez preciser un `{userid}` ou un `{ownerid}`.                                            |
| ConsumerKey    | Oui         | Consumer Key, c'est-a-dire la cle API.                                                                                                                                                |
| ConsumerSecret | Oui         | Consumer Secret Key, c'est-a-dire l'API Secret Key.                                                                                                                                   |
| AccessToken    | Oui         | Jeton d'acces genere depuis la configuration de votre application X.                                                                                                                  |
| AccessSecret   | Oui         | Secret d'acces genere depuis la configuration de votre application X.                                                                                                                 |
| Mode           | Non         | Mode X a utiliser. Utilisez `tweet` pour publier un message public (niveau gratuit+) ou `dm` pour envoyer un message direct (abonnement Basic+ requis). Par defaut, `dm` est utilise. |
| batch          | Non         | Par defaut, les images sont regroupees ensemble. Si vous voulez publier une publication par piece jointe, definissez cette valeur sur `False`.                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un tweet public (fonctionne sur le niveau gratuit de l'API X) :

```bash
# Supposons que notre {ConsumerKey} soit T1JJ3T3L2
# Supposons que notre {ConsumerSecret} soit A1BRTD4JD
# Supposons que notre {AccessToken} soit TIiajkdnlazkcOXrIdevi7F
# Supposons que notre {AccessSecret} soit FDVJaj4jcl8chG3
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   x://T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3?mode=tweet
```

Ou en utilisant l'alias de schema `tweet://` (implique `mode=tweet`) :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   tweet://T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Envoyer un message direct X a `@testaccount` (necessite un abonnement Basic+ de l'API X) :

```bash
# Supposons que notre {ConsumerKey} soit T1JJ3T3L2
# Supposons que notre {ConsumerSecret} soit A1BRTD4JD
# Supposons que notre {AccessToken} soit TIiajkdnlazkcOXrIdevi7F
# Supposons que notre {AccessSecret} soit FDVJaj4jcl8chG3
# notre utilisateur est @testaccount
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   x://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```

Ou

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twitter://testaccount@T1JJ3T3L2/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/FDVJaj4jcl8chG3
```
