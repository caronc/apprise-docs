---
title: "Keybase -- Deploying with Docker or Nginx"
description: "Mount the Keybase socket inside a container or expose it over a local TCP port for use with Apprise."
sidebar:
  label: "Keybase: Docker / Nginx"
---

Apprise talks to the Keybase service over a Unix domain socket (default) or a local TCP connection. When running Apprise or the [Apprise API](https://github.com/caronc/apprise-api) inside Docker, the socket file lives on the host and must be made available inside the container. This page covers three ways to bridge that gap.

---

## Option 1 -- Docker: mount the socket directly

Mount the host's Keybase socket into the container as a read-only volume, then use the `?socket=` parameter to tell Apprise where it is.

```bash
docker run --rm \
    -p 8000:8000 \
    -v /run/user/1000/keybase/keybased.sock:/run/keybase/keybased.sock:ro \
    caronc/apprise-api:latest
```

Use this Apprise URL inside the container:

```text
keybase://_/@alice?socket=/run/keybase/keybased.sock
```

Replace `/run/user/1000/keybase/keybased.sock` with the actual socket path for your Linux user (check with `echo $XDG_RUNTIME_DIR/keybase/keybased.sock`).

:::note
The socket path on both sides of the `-v` mapping must contain the word `keybase`. Apprise validates this at startup and will refuse paths that do not match (e.g. `/var/run/docker.sock`).
:::

---

## Option 2 -- Docker Compose: mount the socket

Add a `volumes` entry to your Compose service definition:

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

The Apprise URL is the same as Option 1:

```text
keybase://_/@alice?socket=/run/keybase/keybased.sock
```

To make the socket path dynamic (different users on different hosts), use an environment variable or `.env` file:

```yaml
volumes:
  - ${XDG_RUNTIME_DIR:-/run/user/1000}/keybase/keybased.sock:/run/keybase/keybased.sock:ro
```

---

## Option 3 -- Nginx: proxy the socket to a TCP port

When you cannot mount a socket file directly -- for example when Apprise runs on a separate host, or when your container runtime does not support Unix socket volume mounts -- use Nginx's `stream` module to expose the Keybase socket as a local TCP port.

### Nginx configuration

Add a `stream` block to your Nginx configuration (outside the `http` block, typically in `/etc/nginx/nginx.conf` or a separate file included from there):

```nginx
stream {
    upstream keybase_service {
        server unix:/run/user/1000/keybase/keybased.sock;
    }

    server {
        # Bind to localhost only -- do not expose this port externally.
        listen 127.0.0.1:3000;
        proxy_pass keybase_service;
    }
}
```

Reload Nginx after saving:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Apprise URL (TCP mode)

With the proxy running, use TCP mode:

```text
keybase://localhost:3000/@alice
```

### Reaching the proxy from inside Docker

If Apprise runs in a Docker container, replace `localhost` with the host's Docker bridge IP. For the default bridge network this is usually `172.17.0.1`; verify with:

```bash
docker network inspect bridge \
    --format '{{range .IPAM.Config}}{{.Gateway}}{{end}}'
```

Then use:

```text
keybase://172.17.0.1:3000/@alice
```

Or use `host.docker.internal` on Docker Desktop (macOS / Windows):

```text
keybase://host.docker.internal:3000/@alice
```

:::caution
Keep the Nginx `stream` listener bound to `127.0.0.1` (loopback) or a private network interface. Exposing the Keybase service socket on a public IP would allow anyone who can reach that port to send messages as your Keybase identity.
:::

---

## Confirming the connection

Use the Apprise CLI to send a test notification before wiring up your full stack:

```bash
# Socket mount (inside the container or after mounting the socket)
apprise -vv -t "Test" -b "Docker socket works" \
    "keybase://_/@yourusername?socket=/run/keybase/keybased.sock"

# Nginx TCP proxy
apprise -vv -t "Test" -b "Nginx proxy works" \
    "keybase://localhost:3000/@yourusername"
```

A successful run prints `Notification sent successfully` and no `WARNING` lines.
