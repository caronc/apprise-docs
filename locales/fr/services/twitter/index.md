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

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::note
Apprise utilise l'API X v2 avec le **contexte utilisateur OAuth 1.0a**. La console de développement X affiche également des identifiants OAuth 2.0 et un jeton Bearer réservé à l'application, mais ces identifiants ne sont pas interchangeables et ne sont pas utilisés par cette intégration.

- Les **publications** (`mode=tweet`) nécessitent une application autorisée en **lecture et écriture**.
- Les **messages directs** (`mode=dm`, mode par défaut) nécessitent l'autorisation **lecture, écriture et messages directs**.

L'accès à l'API X est actuellement facturé à l'usage. Ajoutez des crédits et consultez les tarifs actuels des endpoints dans la [documentation tarifaire de l'API X](https://docs.x.com/x-api/getting-started/pricing) avant d'envoyer des notifications.
:::

## Configuration du compte

1. Connectez-vous à la [console de développement X](https://console.x.com/), puis créez ou sélectionnez une application.
2. Vérifiez que le compte développeur dispose de crédits pour l'utilisation de l'API.
3. Configurez les autorisations OAuth 1.0a de l'application :
   - choisissez **Read and write** pour publier des messages ;
   - choisissez **Read, write, and Direct Messages** pour envoyer des messages directs.
4. Générez et conservez les deux paires d'identifiants OAuth 1.0a :
   - **API Key and Secret** ;
   - **Access Token and Secret**.

:::caution
X n'affiche les secrets qu'au moment de leur génération. Conservez les quatre valeurs en lieu sûr. Si vous n'avez pas enregistré un secret, régénérez la paire d'identifiants correspondante.

Après avoir modifié les autorisations OAuth 1.0a de l'application, régénérez l'**Access Token and Secret** afin que les nouveaux jetons reçoivent ces autorisations. Les jetons créés auparavant conservent leurs anciennes autorisations.
:::

Associez les quatre valeurs aux éléments de l'URL Apprise comme suit :

| Console de développement X | Élément de l'URL Apprise |
| -------------------------- | ------------------------ |
| API Key                    | `ConsumerKey`            |
| API Key Secret             | `ConsumerSecret`         |
| Access Token               | `AccessToken`            |
| Access Token Secret        | `AccessSecret`           |

:::caution
Ne remplacez pas ces valeurs par un Client ID, un Client Secret, un Access Token ou un Refresh Token OAuth 2.0, et n'utilisez pas le jeton Bearer réservé à l'application. Apprise attend actuellement les quatre valeurs OAuth 1.0a ci-dessus.
:::

## Syntaxe

La syntaxe valide est la suivante (`x://`, `twitter://` et `tweet://` sont tous des alias acceptes) :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`
- `x://{ScreenName}@{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}`

Si vous connaissez les cibles a identifier, vous pouvez les viser par leur nom d'utilisateur X, leur `ScreenName` :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName}`
- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}/{ScreenName1}/{ScreenName2}/{ScreenNameN}`

:::note
Les schémas `x://` et `twitter://` utilisent par défaut le mode Message Direct. Si aucun `ScreenName` n'est précisé, le message direct est envoyé au compte représenté par l'Access Token.

Utilisez `?mode=tweet` ou l'alias `tweet://` pour publier un message public.
:::

Un tweet public peut etre reference ainsi (necessite un acces en ecriture a l'API X v2) :

- `x://{ConsumerKey}/{ConsumerSecret}/{AccessToken}/{AccessSecret}?mode=tweet`

## Detail des Parametres

| Variable       | Obligatoire | Description                                                                                                                              |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ScreenName     | Non         | Nom d'utilisateur X qui recevra le message direct, sans le caractère `@`. S'il est omis en mode DM, Apprise écrit au compte authentifié. |
| ConsumerKey    | Oui         | Clé API OAuth 1.0a de l'application X.                                                                                                   |
| ConsumerSecret | Oui         | Secret de la clé API OAuth 1.0a de l'application X.                                                                                      |
| AccessToken    | Oui         | Jeton d'accès OAuth 1.0a représentant le compte qui publiera le message ou enverra le message direct.                                    |
| AccessSecret   | Oui         | Secret du jeton d'accès OAuth 1.0a associé à `AccessToken`.                                                                              |
| Mode           | Non         | Utilisez `tweet` pour publier un message public ou `dm` pour envoyer un message direct. La valeur par défaut est `dm`.                   |
| batch          | Non         | Les images sont regroupées par défaut. Définissez cette valeur sur `False` pour publier un message par pièce jointe.                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un tweet public (necessite un acces en ecriture a l'API X v2) :

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

Envoyer un message direct X a `@testaccount` (necessite les permissions d'ecriture DM de l'API X) :

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
