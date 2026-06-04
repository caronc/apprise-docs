---
title: "Notifications Threema Gateway"
description: "Envoyer des notifications Threema Gateway."
sidebar:
  label: "Threema Gateway"

source: https://gateway.threema.ch/

schemas:
  - threema

sample_urls:
  - threema://{gateway_id}@{secret}/{user}
  - threema://{gateway_id}@{secret}/{email}
  - threema://{gateway_id}@{secret}/{phone}

limits:
  max_chars: 3500
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez d'abord configurer un compte [Threema Gateway](https://gateway.threema.ch/), ce qui vous permettra de demander et d'utiliser un ou plusieurs identifiants Gateway de 8 caracteres, chacun commencant generalement par un asterisque (`*`), par exemple `*THREEMA`.

**Important :** veillez pour le moment a demander un identifiant "Basic", car les messages Threema Gateway chiffres de bout en bout ne sont pas encore pris en charge par Apprise. Les identifiants Gateway de type end-to-end ne peuvent pas etre utilises pour envoyer des messages simples, qui sont eux chiffres sur les serveurs Threema.

- Creez votre compte Threema Gateway sur [https://gateway.threema.ch/](https://gateway.threema.ch/) puis confirmez votre adresse e-mail.
- Pour les credits :
- contactez l'assistance Threema Gateway par e-mail (`support-gateway` chez `threema.ch`) pour obtenir des credits de test ;
- ou achetez-les apres vous etre connecte a votre compte Gateway.
- [Demandez](https://gateway.threema.ch/en/id-request?type=simple) votre identifiant Simple Gateway. Apres une breve verification, Threema creera votre identifiant et vous trouverez le secret associe sur la page de presentation des identifiants. Cela prend en general un ou deux jours ouvrables au maximum.

## Syntaxe

La syntaxe valide est la suivante :

- `threema://{gateway_id}@{secret}/{user}`
- `threema://{gateway_id}@{secret}/{user1}/{user2}/{user3}/{userN}`
- `threema://{gateway_id}@{secret}/{email}`
- `threema://{gateway_id}@{secret}/{email1}/{email2}/{email3}/{emailN}`
- `threema://{gateway_id}@{secret}/{phone}`
- `threema://{gateway_id}@{secret}/{phone1}/{phone2}/{phone3}/{phoneN}`

Vous pouvez aussi melanger librement les differentes cibles :

- `threema://{gateway_id}@{secret}/{phone1}/{user1}/{email1}/...`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                             |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gateway_id | Oui         | Votre identifiant Gateway. Il se compose de 8 caracteres et commence generalement par un asterisque (`*`), par exemple `*MYGWYID`. Vous pouvez utiliser `?from=` ou `gwid` comme alias. |
| secret     | Oui         | Le secret associe a votre identifiant Gateway. Vous pouvez utiliser `?secret=` comme alias pour cette variable.                                                                         |
| target     | Non         | Identifiant Threema, adresse e-mail ou numero de telephone du destinataire. Vous pouvez fournir autant de cibles que necessaire. Vous pouvez utiliser `?to=` comme alias.               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Threema Gateway simple :

```bash
# Supposons que :
#  - notre {gateway_id} soit *MYGWYID
#  - notre {secret} soit abc123-2345
#  - le {toPhoneNo} soit 6135551234
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   threema://*MYGWYID@abc123-2345/6135551234
```

Envoyer une notification Threema Gateway simple a un utilisateur Threema en precisant son identifiant :

```bash
# Supposons que :
#  - notre {gateway_id} soit *MYGWYID
#  - notre {secret} soit abc123-2345
#  - le {toThreemaID} soit FRIENDID
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   threema://*MYGWYID@abc123-2345/FRIENDID
```
