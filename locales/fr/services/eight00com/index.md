---
title: "Notifications 800.com"
description: "Envoyer des notifications SMS et MMS via 800.com."
sidebar:
  label: "800.com"

source: https://www.800.com/

schemas:
  - eight00com

has_sms: true
has_attachments: true

keywords: "800.com"

sample_urls:
  - eight00com://{token}@{fromPhoneNo}
  - eight00com://{token}@{fromPhoneNo}/{toPhoneNo}

limits:
  max_chars: 600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

1. Connectez-vous a votre compte [800.com](https://www.800.com) ou creez-en un.
2. Cliquez sur votre avatar (en haut a droite) et selectionnez **Settings**.
3. Faites defiler jusqu'a la section **API** et cliquez sur **Generate Token**.
4. Copiez le jeton immediatement -- il n'est affiche qu'une seule fois.

Votre numero 800.com active pour la messagerie texte est utilise comme `{fromPhoneNo}` dans l'URL Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `eight00com://{token}@{fromPhoneNo}`
- `eight00com://{token}@{fromPhoneNo}/{toPhoneNo}`
- `eight00com://{token}@{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}`

## Detail des Parametres

| Variable    | Obligatoire | Description |
| ----------- | ----------- | ----------- |
| token       | \*Oui       | Votre jeton d'acces personnel 800.com. |
| fromPhoneNo | \*Oui       | Votre numero 800.com active pour la messagerie. |
| toPhoneNo   | Non         | Le(s) numero(s) de telephone du destinataire. Si omis, le message est envoye au `fromPhoneNo`. Separez plusieurs numeros par `/` dans l'URL ou utilisez `?to=` avec des virgules. |
| to          | Non         | Alias pour `toPhoneNo`. Accepte des numeros separes par des virgules. |
| from        | Non         | Facon alternative de fournir le numero de l'expediteur comme parametre de requete. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS depuis votre numero 800.com :

```bash
# En supposant que votre jeton est abc123, votre numero 800.com est +1-800-555-1234,
# et le destinataire est +1-555-987-6543
apprise -vv -t "Titre du Test" -b "Corps du Message de Test" \
   eight00com://abc123@8005551234/5559876543
```

Envoyer un MMS avec une piece jointe image :

```bash
apprise -vv -t "Titre du Test" -b "Corps du Message de Test" \
   --attach /chemin/vers/image.jpg \
   eight00com://abc123@8005551234/5559876543
```

Envoyer a plusieurs destinataires :

```bash
apprise -vv -t "Titre du Test" -b "Corps du Message de Test" \
   eight00com://abc123@8005551234/5559876543/4441234567
```
