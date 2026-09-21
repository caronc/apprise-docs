---
title: "Keybase -- Deploiement avec Docker ou Nginx"
description: "Montez le socket Keybase dans un conteneur ou exposez-le via un port TCP local pour une utilisation avec Apprise."
sidebar:
  label: "Keybase : Docker / Nginx"
---

Apprise communique avec le service Keybase via un socket de domaine Unix (par defaut) ou une connexion TCP locale. Lorsqu'Apprise ou l'[API Apprise](https://github.com/caronc/apprise-api) s'execute dans Docker, le fichier socket se trouve sur l'hote et doit etre rendu accessible a l'interieur du conteneur. Cette page presente trois facons de combler cet ecart.

---

## Option 1 -- Docker : monter le socket directement

Montez le socket Keybase de l'hote dans le conteneur en volume lecture seule, puis utilisez le parametre `?socket=` pour indiquer a Apprise ou il se trouve.

```bash
docker run --rm \
    -p 8000:8000 \
    -v /run/user/1000/keybase/keybased.sock:/run/keybase/keybased.sock:ro \
    caronc/apprise-api:latest
```

Utilisez cette URL Apprise a l'interieur du conteneur :

```text
keybase://_/@alice?socket=/run/keybase/keybased.sock
```

Remplacez `/run/user/1000/keybase/keybased.sock` par le chemin reel du socket pour votre utilisateur Linux (verifiez avec `echo $XDG_RUNTIME_DIR/keybase/keybased.sock`).

:::note
Le chemin du socket des deux cotes du mappage `-v` doit contenir le mot `keybase`. Apprise valide cela au demarrage et refusera les chemins qui ne correspondent pas (par exemple `/var/run/docker.sock`).
:::

---

## Option 2 -- Docker Compose : monter le socket

Ajoutez une entree `volumes` a la definition de votre service Compose :

```yaml
services:
  apprise-api:
    image: caronc/apprise-api:latest
    ports:
      - "8000:8000"
    volumes:
      - /run/user/1000/keybase/keybased.sock:/run/keybase/keybased.sock:ro
    restart: unless-stopped
```

L'URL Apprise est la meme qu'a l'option 1 :

```text
keybase://_/@alice?socket=/run/keybase/keybased.sock
```

Pour rendre le chemin du socket dynamique (differents utilisateurs sur differents hotes), utilisez une variable d'environnement ou un fichier `.env` :

```yaml
volumes:
  - ${XDG_RUNTIME_DIR:-/run/user/1000}/keybase/keybased.sock:/run/keybase/keybased.sock:ro
```

---

## Option 3 -- Nginx : proxy du socket vers un port TCP

Lorsque vous ne pouvez pas monter un fichier socket directement -- par exemple quand Apprise s'execute sur un hote separe, ou que votre environnement d'execution de conteneurs ne supporte pas les montages de sockets Unix en volume -- utilisez le module `stream` de Nginx pour exposer le socket Keybase en tant que port TCP local.

### Configuration Nginx

Ajoutez un bloc `stream` a votre configuration Nginx (en dehors du bloc `http`, generalement dans `/etc/nginx/nginx.conf` ou un fichier separe inclus depuis la) :

```nginx
stream {
    upstream keybase_service {
        server unix:/run/user/1000/keybase/keybased.sock;
    }

    server {
        # Lier uniquement a localhost -- ne pas exposer ce port a l'exterieur.
        listen 127.0.0.1:3000;
        proxy_pass keybase_service;
    }
}
```

Rechargez Nginx apres la sauvegarde :

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### URL Apprise (mode TCP)

Avec le proxy en cours d'execution, utilisez le mode TCP :

```text
keybase://localhost:3000/@alice
```

### Atteindre le proxy depuis Docker

Si Apprise s'execute dans un conteneur Docker, remplacez `localhost` par l'IP du pont Docker de l'hote. Pour le reseau pont par defaut, il s'agit generalement de `172.17.0.1` ; verifiez avec :

```bash
docker network inspect bridge \
    --format '{{range .IPAM.Config}}{{.Gateway}}{{end}}'
```

Puis utilisez :

```text
keybase://172.17.0.1:3000/@alice
```

Ou utilisez `host.docker.internal` sur Docker Desktop (macOS / Windows) :

```text
keybase://host.docker.internal:3000/@alice
```

:::caution
Gardez le listener Nginx `stream` lie a `127.0.0.1` (loopback) ou a une interface reseau privee. Exposer le socket du service Keybase sur une IP publique permettrait a quiconque pouvant atteindre ce port d'envoyer des messages sous votre identite Keybase.
:::

---

## Verifier la connexion

Utilisez le CLI Apprise pour envoyer une notification de test avant de connecter votre pile complete :

```bash
# Montage du socket (a l'interieur du conteneur ou apres montage du socket)
apprise -vv -t "Test" -b "Le socket Docker fonctionne" \
    "keybase://_/@votrenom?socket=/run/keybase/keybased.sock"

# Proxy TCP Nginx
apprise -vv -t "Test" -b "Le proxy Nginx fonctionne" \
    "keybase://localhost:3000/@votrenom"
```

Une execution reussie affiche `Notification sent successfully` sans aucune ligne `WARNING`.
