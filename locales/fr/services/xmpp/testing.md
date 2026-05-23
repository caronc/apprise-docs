---
title: "Tests de Notification XMPP"
description: "Tester les notifications XMPP"
sidebar:
  label: "Tests XMPP"
---

## Prosody

### Configuration du serveur

```bash
docker run --rm -d \
  --name prosody-test \
  -p 5222:5222 \
  -e PROSODY_VIRTUAL_HOSTS=localhost \
  -e PROSODY_LOGLEVEL=debug \
  prosodyim/prosody:13.0
```

### Créer des utilisateurs de test

```bash
docker exec -it prosody-test prosodyctl register apprise localhost password123
docker exec -it prosody-test prosodyctl register receiver localhost password123

```

### Installer le client

Téléchargez et installez [Gajim](https://gajim.org/)

```bash
sudo dnf install gajim
```

Connectez-vous avec `receiver@localhost` et le mot de passe `password123`

### Tester Apprise

Envoyer une notification

```bash
# starttls setup below:
tox -e apprise -- -vv -b 'test message' \
   'xmpps://apprise:password123@localhost/receiver?verify=no'
```

## SCRAM-PLUS et l'Écosystème Python TLS

### L'erreur "Invalid channel binding"

En vous connectant à certains serveurs XMPP, l'authentification peut échouer avec le message :

```text
Authentication failed: not-authorized
Invalid channel binding
```

Cette erreur est causée par les mécanismes SASL SCRAM-PLUS (`SCRAM-SHA-256-PLUS`, `SCRAM-SHA-1-PLUS`). Ceux-ci obtiennent le score SASL le plus élevé et slixmpp les sélectionne automatiquement lorsque le serveur les annonce. Ils intègrent des données de liaison TLS dans l'échange d'authentification pour une protection supplémentaire contre les attaques de l'homme du milieu.

Le problème vient d'une incompatibilité entre ce que le client peut fournir et ce qu'attend le serveur :

- **`tls-unique`** -- le type de liaison de canal traditionnel -- est interdit sur les connexions TLS 1.3 (RFC 9266).
- **`tls-exporter`** -- son remplaçant pour TLS 1.3 -- nécessite Python 3.13+ et n'est pas encore accepté par toutes les implémentations serveur.

Lorsqu'aucun des deux n'est disponible ou accepté, l'authentification échoue avec "Invalid channel binding".

### Solution rapide : désactiver SCRAM-PLUS

Ajoutez `?scramplus=no` à votre URL Apprise pour revenir aux mécanismes SCRAM simples. La connexion reste entièrement chiffrée par TLS ; seule l'étape de liaison de canal supplémentaire est ignorée.

```bash
apprise -vv -b "Test" \
  "xmpps://user:password@chat.example.com/destinataire?scramplus=no"
```

Apprise consigne automatiquement un avertissement ciblé lorsqu'il détecte cette erreur et suggère d'ajouter `?scramplus=no`.

### Contexte : un problème répandu dans l'écosystème Python

Il ne s'agit pas d'un problème propre à Apprise. La rupture de SCRAM-PLUS affecte un grand nombre de bibliothèques et de projets Python. Le membre de la communauté qui a signalé ce problème en premier à Apprise en suit chaque occurrence à l'adresse :

> **<https://github.com/scram-sasl/info/issues/1>**

Cette page documente l'ampleur du problème dans tout l'écosystème Python et a servi à déposer des tickets en amont dans Python et dans de nombreuses bibliothèques. Si ce problème vous touche, pensez à y ajouter un commentaire ou un pouce levé pour aider à augmenter la visibilité et accélérer un correctif en amont.
