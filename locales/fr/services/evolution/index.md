---
title: "Notifications Evolution API"
description: "Envoyer des notifications WhatsApp via une instance Evolution API auto-hébergée."
sidebar:
  label: "Evolution API"

source: https://github.com/EvolutionAPI/evolution-api

schemas:
  - evolution: insecure
  - evolutions

has_selfhosted: true

sample_urls:
  - evolution://{apikey}@{host}/{instance}/{phoneNo}
  - evolutions://{apikey}@{host}/{instance}/{phoneNo}
  - evolution://{apikey}@{host}:{port}/{instance}/{phoneNo1}/{phoneNo2}

limits:
  max_chars: 65536
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

[Evolution API](https://github.com/EvolutionAPI/evolution-api) est une passerelle WhatsApp auto-hébergée qui expose une API REST au-dessus du protocole WhatsApp Web.

### 1. Déployer Evolution API

La méthode recommandée passe par Docker :

```bash
docker run -d \
  -p 8080:8080 \
  --name evolution-api \
  atendai/evolution-api:latest
```

Les instructions complètes de déploiement ainsi que des exemples `docker-compose` sont disponibles dans le [dépôt officiel](https://github.com/EvolutionAPI/evolution-api).

### 2. Créer et Connecter une Instance

1. Ouvrez le tableau de bord Evolution API (par exemple `http://yourserver:8080`).
2. Créez une nouvelle **instance** et donnez-lui un nom (par exemple `MyInstance`).
3. Scannez le **QR code** affiché dans le tableau de bord avec l'application mobile WhatsApp pour lier votre compte.
4. Une fois connecté, l'état de l'instance passe à **open**.

### 3. Récupérer Votre Clé API

La clé API est affichée dans la page de paramètres de l'instance, dans le tableau de bord. Copiez-la : vous l'utiliserez comme `{apikey}` dans l'URL Apprise.

### Format des Numéros de Téléphone

Tous les numéros de téléphone doivent être fournis au **format international sans le `+` initial**, par exemple :

| Pays      | Numéro            | Format pour Apprise |
| --------- | ----------------- | ------------------- |
| Brésil    | +55 11 99999-9999 | `5511999999999`     |
| USA       | +1 (555) 123-4567 | `15551234567`       |
| Allemagne | +49 30 12345678   | `493012345678`      |

## Syntaxe

HTTP simple (port 80 par défaut) :

- `evolution://{apikey}@{host}/{instance}/{phoneNo}`
- `evolution://{apikey}@{host}:{port}/{instance}/{phoneNo}`

HTTPS (port 443 par défaut) :

- `evolutions://{apikey}@{host}/{instance}/{phoneNo}`
- `evolutions://{apikey}@{host}:{port}/{instance}/{phoneNo}`

Destinataires multiples :

- `evolution://{apikey}@{host}/{instance}/{phoneNo1}/{phoneNo2}/{phoneNoN}`

Destinataires supplémentaires via un paramètre de requête :

- `evolution://{apikey}@{host}/{instance}/{phoneNo}?to={phoneNo2}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                          |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui    | La clé API affichée dans les paramètres de votre instance Evolution API.                                                                             |
| host     | Oui    | Le nom d'hôte ou l'adresse IP sur lequel Evolution API s'exécute.                                                                                    |
| port     | Non    | Le port écouté par Evolution API. Par défaut : **80** pour `evolution://` et **443** pour `evolutions://`.                                           |
| instance | Oui    | Le nom de l'instance WhatsApp créée dans le tableau de bord Evolution API.                                                                           |
| phoneNo  | Oui    | Un ou plusieurs numéros de destination au format international sans le `+` initial. Séparez plusieurs numéros avec une barre oblique `/` dans l'URL. |
| to       | Non    | Alias de `phoneNo`. Peut être utilisé comme paramètre de requête (`?to=`) pour préciser des destinataires supplémentaires.                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message WhatsApp via HTTP :

```bash
# Assuming our {apikey} is abc123secret
# Assuming our Evolution API is running at myserver.local:8080
# Assuming our instance name is MyInstance
# Assuming the destination number is +55 11 99999-9999
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "evolution://abc123secret@myserver.local:8080/MyInstance/5511999999999"
```

Envoyer via HTTPS (Evolution API derrière un reverse proxy avec TLS) :

```bash
# Assuming our {apikey} is abc123secret
# Assuming our Evolution API is reachable at api.example.com (HTTPS)
# Assuming our instance name is MyInstance
apprise -vv -t "Alert" -b "Server is down!" \
   "evolutions://abc123secret@api.example.com/MyInstance/5511999999999"
```

Envoyer à plusieurs destinataires :

```bash
# Notify two numbers in a single command
apprise -vv -t "Broadcast" -b "Maintenance window starts in 30 minutes" \
   "evolution://abc123secret@myserver.local:8080/MyInstance/5511999999999/5521888888888"
```
