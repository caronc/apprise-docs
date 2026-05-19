---
title: "Notifications Session Open Group Server"
description: "Envoyer des notifications vers un salon Session Open Group Server (SOGS)."
sidebar:
  label: "Session Open Group Server"

source: https://github.com/session-foundation/session-pysogs

schemas:
  - sessions
  - sogs
  - session: insecure

has_selfhosted: true

sample_urls:
  - sessions://{public_key}:{seed}@{hostname}/{room}
  - sessions://{public_key}:{seed}@{hostname}:{port}/{room}
  - session://{public_key}:{seed}@{hostname}/{room}
---

## Session Open Group Server

<!-- SERVICE:DETAILS -->

## Configuration du Compte

[Session](https://getsession.org/) est une application de messagerie privée et
décentralisée. Un **Session Open Group Server** (SOGS) héberge des salons
communautaires accessibles publiquement. Ce plugin vous permet de publier des
messages dans un ou plusieurs salons SOGS en utilisant une identité bot.

Vous avez besoin de deux informations : le **server_key** (la clé publique du
serveur) et un **seed** (le seed Ed25519 privé de votre bot). Ces deux valeurs
sont des chaînes hexadécimales minuscules de 64 caractères.

### Étape 1 -- Générer un seed pour le bot

L'identité du bot repose sur un **seed Ed25519 de 64 caractères hexadécimaux**
(32 octets aléatoires). Générez-en un en Python :

```python
import os
print(os.urandom(32).hex())
# exemple de sortie : a1b2c3d4e5f6...  (64 caractères hexadécimaux)
```

Gardez cette valeur secrète -- c'est votre `seed`. Toute personne qui la détient
peut publier dans n'importe quel salon auquel votre bot a accès en écriture.

### Étape 2 -- Trouver le server_key

Chaque instance SOGS publie un **server_key Curve25519 de 64 caractères
hexadécimaux**. Vous le trouverez dans n'importe quel lien d'invitation Session :

```text
https://open.getsession.org/discussion?public_key=a03c383cf63c3c4e...
```

La valeur de `public_key=` est le `server_key` à fournir dans l'URL Apprise.

### Étape 3 -- Trouver le jeton du salon

Le jeton du salon est le segment de chemin du lien d'invitation ci-dessus
(`discussion` dans l'exemple). Il s'agit d'un identifiant alphanumérique court
qui identifie de façon unique le salon sur ce serveur.

### Étape 4 -- Accorder l'accès en écriture au bot

Un administrateur du serveur doit ajouter la clé publique Ed25519 du bot à la
liste des utilisateurs autorisés du salon. La clé publique du bot est dérivée
automatiquement de votre `seed` ; vous pouvez l'afficher avec :

```python
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat

seed = bytes.fromhex("votre_seed_ici")
key  = Ed25519PrivateKey.from_private_bytes(seed)
print("00" + key.public_key().public_bytes(Encoding.Raw, PublicFormat.Raw).hex())
```

## Syntaxe

La syntaxe valide est la suivante :

- `sessions://{public_key}:{seed}@{hostname}/{room}`
- `sessions://{public_key}:{seed}@{hostname}:{port}/{room}`
- `sessions://{public_key}:{seed}@{hostname}/{room1}/{room2}`
- `sogs://{public_key}:{seed}@{hostname}/{room}`
- `session://{public_key}:{seed}@{hostname}/{room}`

Forme par paramètres de requête (utile dans les fichiers de configuration
lorsque l'intégration des identifiants dans l'URL est difficile) :

- `sessions://{hostname}/{room}?key={public_key}&seed={seed}`
- `sessions://{hostname}/{room}?public_key={public_key}&seed={seed}`

Plusieurs salons peuvent être spécifiés comme segments de chemin
supplémentaires ou via `?to=` :

- `sessions://{public_key}:{seed}@{hostname}?to={room1},{room2}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                            |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui    | Le nom d'hôte (ou l'adresse IP) du serveur SOGS.                                                                                                                       |
| port     | Non    | Le port du serveur. Par défaut **443** pour `sessions://` et **80** pour `session://`.                                                                                 |
| key      | Oui    | La clé publique Curve25519 de 64 caractères hexadécimaux du serveur SOGS (issue du lien d'invitation `?public_key=`). Acceptée également sous la forme `?public_key=`. |
| seed     | Oui    | Le seed Ed25519 de 64 caractères hexadécimaux identifiant le compte bot. Traitez-le comme un mot de passe.                                                             |
| room     | Oui    | Un ou plusieurs jetons identifiant les salons SOGS dans lesquels publier.                                                                                              |
| to       | Non    | Liste de jetons de salons supplémentaires séparés par des virgules (alias pour les segments de chemin de salons).                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Publier une notification dans un salon SOGS public via HTTPS :

```bash
# En supposant :
#   {public_key} = a03c383cf63c3c4ead6c4f0a29...  (64 hex, depuis le lien d'invitation)
#   {seed}       = a1b2c3d4e5f6...  (64 hex, votre seed de bot)
#   {hostname}   = open.getsession.org
#   {room}       = discussion

apprise -vv -t "Bonjour" -b "Notification de test depuis Apprise" \
   "sessions://a03c383c...:a1b2c3d4...@open.getsession.org/discussion"
```

Publier dans deux salons en une seule commande :

```bash
apprise -vv -b "Message diffusé" \
   "sessions://a03c383c...:a1b2c3d4...@open.getsession.org/salon1/salon2"
```

Utiliser le schéma HTTP non chiffré pour un serveur local sans TLS :

```bash
apprise -vv -b "Test SOGS local" \
   "session://a03c383c...:a1b2c3d4...@localhost:8080/discussion"
```

Forme par paramètres de requête (style fichier de configuration) :

```bash
apprise -vv -b "Style fichier de configuration" \
   "sessions://open.getsession.org/discussion?key=a03c383c...&seed=a1b2c3d4..."
```
