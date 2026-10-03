---
title: "Notifications BulkSMS"
description: "Envoyer des notifications BulkSMS."
sidebar:
  label: "BulkSMS"

source: https://bulksms.com

schemas:
  - bulksms

has_sms: true

sample_urls:
  - bulksms://{token_id}:{token_secret}@{phoneNo}
  - bulksms://{token_id}:{token_secret}@{phoneNo1}/{phoneNo2}/{phoneNoN}
  - bulksms://{token_id}:{token_secret}@{group}
  - bulksms://{token_id}:{token_secret}@{group1}/@{group2}/@{groupN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a un compte BulkSMS [ici](https://bulksms.com), puis creez un jeton d'API (API Token) :

1. Connectez-vous et allez dans **Settings** > **Developers** > **API Tokens**.
2. Cliquez sur **Create Token** et donnez-lui un nom comme `Apprise`.
3. Copiez le **Token ID** et le **Token Secret** qui vous sont affiches.

Le Token ID et le Token Secret sont tout ce dont vous avez besoin pour utiliser BulkSMS avec Apprise.

:::note
BulkSMS n'accepte plus de nom d'utilisateur et de mot de passe pour les nouveaux comptes. Si votre ancien compte les utilise encore, saisissez votre nom d'utilisateur comme `token_id` et votre mot de passe comme `token_secret`.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `bulksms://{token_id}:{token_secret}@{target}`

Une `target` peut etre soit un numero de telephone, soit un groupe si elle est prefixee par `@`.

- `bulksms://{token_id}:{token_secret}@{phoneNo}`
- `bulksms://{token_id}:{token_secret}@{phoneNo1}/{phoneNo2}/{phoneNoN}`
- `bulksms://{token_id}:{token_secret}@{group}`
- `bulksms://{token_id}:{token_secret}@{group1}/@{group2}/@{groupN}`

Vous pouvez aussi melanger les formats

- `bulksms://{token_id}:{token_secret}@{to_phone1}/@{group1}`

Le Token Secret peut contenir des caracteres comme `#`, `!` ou `*`. Les caracteres qui ont une signification speciale dans une URL doivent etre [encodes pour l'URL](https://www.w3schools.com/tags/ref_urlencode.asp). Surtout, `#` doit etre ecrit `%23`.

Pour lever toute ambiguite, si vous ne fournissez pas un numero de telephone valide et que l'information analysee n'est pas uniquement prefixee par `@`, elle est d'abord interpretee comme un numero. En revanche, si des caracteres alphanumeriques y sont detectes, elle sera alors traitee comme un groupe.

## Détail des Paramètres

| Variable     | Obligatoire | Description                                                                                                                                                                                     |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token_id     | Oui         | Le Token ID du jeton d'API que vous avez cree. Peut aussi etre fourni avec `?user=`.                                                                                                            |
| token_secret | Oui         | Le Token Secret du jeton d'API que vous avez cree. Peut aussi etre fourni avec `?password=`.                                                                                                    |
| to           | **\*Non**   | Numero(s) de telephone et/ou groupe(s) auxquels vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour separer plusieurs entrees. Il s'agit d'un alias de `targets`. |
| from         | **\*Non**   | Numero de telephone enregistre chez BulkSMS que vous souhaitez utiliser comme expediteur du message.                                                                                            |
| batch        | Non         | Envoie plusieurs notifications specifiees dans un seul lot, soit 1 publication amont vers le serveur final. Par defaut, cette option est definie sur `no`.                                      |
| route        | Non         | Peut etre defini sur `ECONOMY`, `STANDARD` ou `PREMIUM`, sans sensibilite a la casse. Si aucune valeur n'est fournie, la valeur par defaut est `STANDARD`.                                      |
| unicode      | Non         | Permet facultativement d'indiquer a Apprise de ne pas marquer votre SMS comme contenant des caracteres Unicode. Le mode de message devient `TEXT` si cette valeur est definie sur `No`.         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message BulkSMS :

```bash
# Supposons que notre {token_id} soit BBDE1B476E03498AA768F66A286AABDC-01-B
# Supposons que notre {token_secret} soit 9jSbVDK20!MXdfRGiIIFu#ffUE8*S
#   - le # est ecrit %23 pour etre conserve dans l'URL
# Supposons que le {PhoneNo} que nous voulons notifier soit +134-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   'bulksms://BBDE1B476E03498AA768F66A286AABDC-01-B:9jSbVDK20!MXdfRGiIIFu%23ffUE8*S@+134-555-1223'
```
