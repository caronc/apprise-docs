---
title: "Notifications Flowtriq"
description: "Envoyer des notifications Flowtriq pour les alertes de detection DDoS."
sidebar:
  label: "Flowtriq"

source: https://flowtriq.com

schemas:
  - flowtriq: insecure
  - flowtriqs

has_selfhosted: true

sample_urls:
  - flowtriqs://{apikey}@{hostname}/{webhook_path}
  - flowtriq://{apikey}@{hostname}:{port}/{webhook_path}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

[Flowtriq](https://flowtriq.com) est une plateforme de detection et de mitigation des attaques DDoS. Apprise s'y integre via des canaux webhook configures depuis le tableau de bord Flowtriq.

1. Connectez-vous a votre tableau de bord Flowtriq et rendez-vous dans la section Webhooks ou Integrations.
2. Creez un nouveau canal webhook et donnez-lui un nom.
3. Copiez l'URL du webhook et la cle API fournies par le tableau de bord. Par exemple :
   - URL du webhook : `https://flowtriq.com/hooks/abc123`
   - Cle API : `ft_key_xxxx`

L'URL du webhook est divisee en deux parties pour l'URL Apprise : le **nom d'hote** (`flowtriq.com`) et le **chemin du webhook** (`hooks/abc123`). La **cle API** est placee dans la position des identifiants utilisateur.

L'URL Apprise devient alors (en utilisant HTTPS) :

```text
flowtriqs://ft_key_xxxx@flowtriq.com/hooks/abc123
```

Pour une instance auto-hebergee en HTTP simple, utilisez `flowtriq://` a la place :

```text
flowtriq://ft_key_xxxx@myhost/hooks/abc123
```

Apprise fait correspondre les types de notifications aux niveaux de severite Flowtriq comme suit :

| Type Apprise | Severite Flowtriq |
| ------------ | ----------------- |
| `info`       | `info`            |
| `success`    | `success`         |
| `warning`    | `warning`         |
| `failure`    | `critical`        |

## Syntaxe

La syntaxe valide est la suivante :

- `flowtriqs://{apikey}@{hostname}/{webhook_path}`
- `flowtriqs://{apikey}@{hostname}:{port}/{webhook_path}`
- `flowtriq://{apikey}@{hostname}/{webhook_path}`
- `flowtriq://{apikey}@{hostname}:{port}/{webhook_path}`

## Détail des Paramètres

| Variable     | Obligatoire | Description                                                                                                                                                                                                                       |
| ------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey       | \*Oui       | La cle API fournie par votre tableau de bord Flowtriq. Elle est transmise au point de terminaison webhook via l'en-tete HTTP `X-API-Key`.                                                                                         |
| hostname     | \*Oui       | Le nom d'hote du serveur Flowtriq (ou de votre instance auto-hebergee). Pour le service cloud Flowtriq, il s'agit de `flowtriq.com`.                                                                                              |
| webhook_path | \*Oui       | La partie chemin de l'URL du webhook fournie par le tableau de bord Flowtriq (tout ce qui suit le nom d'hote). Par exemple, si l'URL du webhook est `https://flowtriq.com/hooks/abc123`, le chemin du webhook est `hooks/abc123`. |
| port         | Non         | Le port sur lequel ecoute le serveur Flowtriq. Par defaut **443** pour le schema `flowtriq://`.                                                                                                                                   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Flowtriq via le service cloud (HTTPS) :

```bash
# Supposons que notre {apikey} soit ft_key_xxxx
# Supposons que notre {hostname} soit flowtriq.com
# Supposons que notre {webhook_path} soit hooks/abc123

apprise -vv -t "Alerte DDoS" -b "Attaque detectee sur 192.0.2.1" \
   "flowtriqs://ft_key_xxxx@flowtriq.com/hooks/abc123"
```

Envoyer une notification Flowtriq vers une instance auto-hebergee en HTTP :

```bash
# Supposons que notre {apikey} soit maclef
# Supposons que notre {hostname} auto-heberge soit monitor.example.com
# Supposons que notre {webhook_path} soit api/v1/webhook/xyz

apprise -vv -t "Titre de l'Alerte" -b "Corps de l'alerte" \
   "flowtriq://maclef@monitor.example.com/api/v1/webhook/xyz"
```

Envoyer vers une instance auto-hebergee en HTTPS sur un port non standard :

```bash
apprise -vv -t "Titre de l'Alerte" -b "Corps de l'alerte" \
   "flowtriqs://maclef@monitor.example.com:8443/api/v1/webhook/xyz"
```
