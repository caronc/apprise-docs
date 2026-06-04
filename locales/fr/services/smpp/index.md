---
title: "Notifications Short Message Peer-to-Peer (SMPP)"
description: "Envoyer des notifications SMS via un serveur SMPP."
sidebar:
  label: "Short Message Peer-to-Peer (SMPP)"

source: https://smpp.org/

schemas:
  - smpp: insecure
  - smpps

has_selfhosted: true

sample_urls:
  - smpp://{user}:{password}@{host}/{fromPhoneNo}
  - smpps://{user}:{password}@{host}/{fromPhoneNo}/{toPhoneNo}
  - smpps://{user}:{password}@{host}:{port}/{fromPhoneNo}
  - smpp://{user}:{password}@{host}:{port}/{fromPhoneNo}/{toPhoneNo}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

SMPP (Short Message Peer-to-Peer) est un protocole telecom utilise pour transmettre des SMS a un SMSC.
Apprise s'integre a SMPP via la bibliotheque Python `smpplib`.

```bash
pip install smpplib
```

Pour utiliser ce service, vous aurez besoin de :

1. du nom d'hote, ou de l'adresse IP, et du port du serveur SMPP ;
2. d'un nom d'utilisateur et d'un mot de passe SMPP valides, parfois appeles _system_id_ et _password_ ;
3. d'une adresse expediteur, en general votre numero de telephone au format E.164, c'est-a-dire le numero **From** ;
4. d'un ou plusieurs numeros de telephone destinataires.

Si vous n'administrez pas vous-meme un serveur SMPP, votre fournisseur SMS pourra generalement vous fournir ces informations.

---

## Syntaxe

La syntaxe valide est la suivante :

- `smpp://{user}:{password}@{host}/{from_phone}/{targets}`
- `smpp://{user}:{password}@{host}:{port}/{from_phone}/{targets}`

Variantes securisees :

- `smpps://{user}:{password}@{host}/{from_phone}/{targets}`
- `smpps://{user}:{password}@{host}:{port}/{from_phone}/{targets}`

Ou `{targets}` represente un ou plusieurs numeros de telephone separes par `/` :

- `.../{to_phone}`
- `.../{to_phone1}/{to_phone2}/{to_phoneN}`

### Alias de Chaine de Requete

Pour les fichiers de configuration et les environnements ou les chemins sont peu pratiques, vous pouvez aussi utiliser :

- `from=` comme alias du numero expediteur
- `to=` comme liste separee par des virgules des numeros destinataires

Exemple :

- `smpps://_?user=user&pass=password&host=smpp.example.ca&from=+15551234567&to=+15557654321,+15559876543`

---

## Remarques Importantes

- **Les titres ne sont pas utilises** pour les SMS. Si vous en fournissez un, Apprise l'integrera au corps du message lorsque c'est possible.
- Les numeros de telephone devraient, si possible, etre fournis au format **E.164** par exemple `+15551234567`.
- `smpp://` est considere comme un transport _non securise_. Preferez `smpps://` lorsque votre fournisseur le prend en charge.

---

## Détail des Paramètres

| Variable     | Obligatoire | Description                                                                                              |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------- |
| `user`       | Oui         | Nom d'utilisateur SMPP (`system_id`).                                                                    |
| `password`   | Oui         | Mot de passe SMPP.                                                                                       |
| `host`       | Oui         | Nom d'hote du serveur SMPP.                                                                              |
| `port`       | Non         | Port SMPP. La valeur par defaut est **2775** pour `smpp://` et **3550** pour `smpps://`, sauf surcharge. |
| `from_phone` | Oui         | Numero de telephone expediteur, idealement au format E.164.                                              |
| `targets`    | Oui         | Un ou plusieurs numeros de telephone destinataires.                                                      |
| `from`       | Non         | Alias en chaine de requete pour `from_phone`.                                                            |
| `to`         | Non         | Alias en chaine de requete pour fournir des destinataires supplementaires separes par des virgules.      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS a un destinataire unique :

```bash
apprise -vv -b "Test message" \
  smpp://user:password@smpp.example.ca/+15551234567/+15557654321
```

Envoyer a plusieurs destinataires :

```bash
apprise -vv -b "Maintenance window starts at 22:00" \
  smpp://user:password@smpp.example.ca/+15551234567/+15557654321/+15559876543
```

Utiliser `smpps://` en mode securise sur un port personnalise :

```bash
apprise -vv -b "Secure SMPP test" \
  smpps://user:password@smpp.example.ca:3550/+15551234567/+15557654321
```

Utiliser des parametres de requete, pratique dans YAML et les variables d'environnement :

```bash
apprise -vv -b "Query string example" \
  "smpps://_?user=user&pass=password&host=smpp.example.ca&from=+15551234567&to=+15557654321,+15559876543"
```
