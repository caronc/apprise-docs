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
