---
title: "Notifications Nostr"
description: "Publier des notes publiques ou envoyer des messages directs privés sur Nostr."
sidebar:
  label: "Nostr"

source: https://nostr.com/

schemas:
  - nostr

has_attachments: true
has_chat: true
has_selfhosted: true

body_formats:
  - text

keywords: "damus, primal, amethyst, 0xchat"

sample_urls:
  - nostr://{secret_key}
  - nostr://{secret_key}/{npub}
  - nostr://{secret_key}/{name}@{domain}

limits:
  max_chars: 7000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Nostr est un réseau social ouvert et décentralisé. Vos messages sont signés avec votre propre clé et publiés sur des relais (serveurs) que tout le monde peut faire fonctionner. Il n'y a donc aucun compte à créer auprès d'un service.

1. Créez un compte Nostr dans n'importe quel client, comme [Damus](https://damus.io/), [Primal](https://primal.net/), [Amethyst](https://github.com/vitorpamplona/amethyst) ou [0xchat](https://0xchat.com/). Un compte séparé, réservé aux notifications, est une bonne idée.
1. Cherchez l'option pour exporter ou sauvegarder votre clé privée dans les paramètres du client. Elle commence par `nsec1`. Une clé écrite sous forme de 64 caractères hexadécimaux fonctionne aussi.
1. Gardez cette clé secrète. Toute personne qui la possède peut publier en votre nom.

Apprise peut envoyer deux types de messages :

- **Une note publique :** sans destinataire, le message est publié sur votre fil public pour que vos abonnés le voient.
- **Un message direct :** ajoutez un ou plusieurs destinataires et chacun reçoit un message privé et chiffré. Un destinataire est une clé publique (commençant par `npub1`) ou une adresse Nostr comme `alice@example.com`.

Les messages directs utilisent par défaut le format privé NIP-17, qui cache qui parle à qui. Utilisez `?mode=nip04` pour un ancien client qui ne comprend que les messages NIP-04.

:::note
Les messages directs nécessitent le paquet `cryptography` (`pip install cryptography`). Les notes publiques fonctionnent sans lui.
:::

### Relais

Les messages sont envoyés à quelques relais publics bien connus, sauf si vous choisissez les vôtres avec `?relay=`. L'adresse d'un relais commence par `wss://`. Si vous l'omettez, `wss://` est utilisé. Apprise signale un succès dès qu'au moins un relais accepte le message.

Un message direct NIP-17 est envoyé uniquement aux relais que le destinataire a indiqués pour recevoir ses messages (3 au maximum). Si le destinataire n'a pas publié une telle liste, l'envoi échoue, car il ne verrait jamais le message. `?mode=nip04` permet alors de le joindre. Si votre propre compte indique aussi de tels relais, Apprise y garde une copie de chaque message pour qu'elle apparaisse dans vos autres clients Nostr.

### Pièces jointes

Les pièces jointes sont téléversées sur un serveur de médias [Blossom](https://github.com/hzrd149/blossom) et un lien vers chacune est ajouté au message. Apprise utilise le serveur défini avec `?blossom=`. Sans lui, il utilise le premier serveur de la liste de serveurs Blossom de votre profil Nostr, et se rabat sur `https://nostr.download` s'il n'y en a aucun.

Dans un message direct NIP-17, chaque fichier est chiffré avant d'être téléversé, afin que seul le destinataire puisse l'ouvrir. Les notes publiques et les messages NIP-04 renvoient au fichier tel quel, donc toute personne qui a le lien peut le voir.

## Syntaxe

La syntaxe valide est la suivante :

- `nostr://{secret_key}`
- `nostr://{secret_key}/{npub}`
- `nostr://{secret_key}/{name}@{domain}`
- `nostr://{secret_key}/{npub1}/{npub2}/{npubN}`
- `nostr://{secret_key}/{npub}?mode=nip04`
- `nostr://{secret_key}?relay={relay1},{relay2}`

## Détail des paramètres

| Variable   | Requis | Description                                                                                                                                                                                                                    |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| secret_key | Oui    | Votre clé privée, commençant par `nsec1` ou écrite sous forme de 64 caractères hexadécimaux. Elle peut aussi être définie avec `?key=`.                                                                                        |
| target     | Non    | Un ou plusieurs destinataires pour un message direct. Chacun est une clé publique (`npub1...` ou 64 caractères hexadécimaux) ou une adresse Nostr comme `alice@example.com`. Sans destinataire, une note publique est publiée. |
| to         | Non    | Un alias de `target`. Séparez plusieurs destinataires par des virgules.                                                                                                                                                        |
| mode       | Non    | La façon d'envoyer les messages directs : `nip17` (messages privés) ou `nip04` (anciens messages chiffrés). Par défaut `nip17`.                                                                                                |
| relay      | Non    | Un ou plusieurs relais où publier, séparés par des virgules. Par défaut `wss://relay.damus.io`, `wss://nos.lol` et `wss://relay.primal.net`.                                                                                   |
| blossom    | Non    | Le serveur Blossom sur lequel les pièces jointes sont téléversées, comme `https://blossom.example.com`. Par défaut, le premier serveur indiqué dans votre profil Nostr, ou `https://nostr.download`.                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Publier une note publique :

```bash
apprise -vv -b "La sauvegarde est terminée" \
   "nostr://nsec1yourprivatekey"
```

Envoyer un message direct privé à deux personnes :

```bash
apprise -vv -t "Sauvegarde" -b "La sauvegarde est terminée" \
   "nostr://nsec1yourprivatekey/npub1yourfriendskey/alice@example.com"
```

Envoyer une photo dans un ancien message direct NIP-04 par votre propre relais :

```bash
apprise -vv -b "Quelqu'un est à la porte" --attach=/tmp/door.jpg \
   "nostr://nsec1yourprivatekey/npub1yourfriendskey?mode=nip04&relay=relay.example.com"
```
