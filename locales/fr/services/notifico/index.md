---
title: "Notifications Notifico"
description: "Envoyer des notifications Notifico vers des canaux IRC."
sidebar:
  label: "Notifico"

source: https://notifico.tech/

schemas:
  - notifico: insecure
  - notificos

has_selfhosted: true

sample_urls:
  - notifico://{ProjectID}/{MessageHook}
  - notifico://{host}/{ProjectID}/{MessageHook}
  - notificos://{host}/{ProjectID}/{MessageHook}

limits:
  max_chars: 512
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Notifico vous permet d'envoyer un message vers un ou plusieurs salons IRC. Le service d'origine heberge a [n.tkte.ch](https://n.tkte.ch) est hors ligne, mais le projet est open source et peut etre [auto-heberge](https://notifico.tech/).

### Configuration officielle / legacy (n.tkte.ch)

1. Rendez-vous sur <https://n.tkte.ch> et creez un compte.
1. Creez un projet, manuellement ou en le synchronisant avec GitHub.
1. Depuis le projet, creez ensuite un **Plain Text Message Hook**.
   ![notifico plain text hook](./images/66708086-3f17cb00-ed19-11e9-8e37-bc7e6ba5a3cd.png)

Une fois votre hook cree avec succes, recuperez depuis la page principale du projet le lien necessaire a l'envoi de vos messages :
![notifico hook capture instructions](./images/66708104-6c647900-ed19-11e9-895e-d5f755d05079.png)

L'URL ressemblera a ceci :

```text
       https://n.tkte.ch/h/2144/uJmKaBW9WFk42miB146ci3Kj
                            ^                ^
                            |                |
                         project id       message hook
```

Dans l'exemple ci-dessus :

1. **ProjectID** est `2144`
2. **MessageHook** est `uJmKaBW9WFk42miB146ci3Kj`

### Configuration auto-hebergee

Deployez une instance Notifico en suivant les instructions disponibles sur <https://notifico.tech/>. Une fois l'instance en fonctionnement, creez un projet et un Plain Text Message Hook comme decrit ci-dessus. Utilisez le nom d'hote (et le port si necessaire) de votre instance dans l'URL Apprise.

## Syntaxe

Vous pouvez transmettre directement l'URL native de `n.tkte.ch` :

- `https://n.tkte.ch/h/{ProjectID}/{MessageHook}`

Ou utiliser l'une des formes d'URL Apprise ci-dessous.

**Endpoint officiel (n.tkte.ch) :**

- `notifico://{ProjectID}/{MessageHook}`

**Instance auto-hebergee (HTTP) :**

- `notifico://{host}/{ProjectID}/{MessageHook}`
- `notifico://{host}:{port}/{ProjectID}/{MessageHook}`
- `notifico://{user}@{host}/{ProjectID}/{MessageHook}`
- `notifico://{user}:{password}@{host}/{ProjectID}/{MessageHook}`
- `notifico://{user}:{password}@{host}:{port}/{ProjectID}/{MessageHook}`

**Instance auto-hebergee (HTTPS) :**

- `notificos://{host}/{ProjectID}/{MessageHook}`
- `notificos://{host}:{port}/{ProjectID}/{MessageHook}`
- `notificos://{user}@{host}/{ProjectID}/{MessageHook}`
- `notificos://{user}:{password}@{host}/{ProjectID}/{MessageHook}`
- `notificos://{user}:{password}@{host}:{port}/{ProjectID}/{MessageHook}`

Vous pouvez desactiver les couleurs (activees par defaut) :

- `notifico://{ProjectID}/{MessageHook}?color=off`

Vous pouvez desactiver le prefixe de type de notification (active par defaut) :

- `notifico://{ProjectID}/{MessageHook}?prefix=off`

## Detail des Parametres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                                        |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ProjectID   | Oui         | Identifiant du projet. C'est un entier qui constitue la premiere partie de l'URL du hook. Pour l'endpoint officiel, il est place en position d'hote dans l'URL ; pour les instances auto-hebergees, il suit le nom d'hote.                                                        |
| MessageHook | Oui         | Le token de hook de message, situe a la fin de l'URL fournie.                                                                                                                                                                                                                      |
| host        | Non         | Le nom d'hote (ou l'adresse IP) d'une instance Notifico auto-hebergee. Lorsqu'il est omis, les notifications sont envoyees vers l'endpoint officiel `n.tkte.ch`.                                                                                                                  |
| port        | Non         | Le port de l'instance auto-hebergee. Par defaut, 80 (HTTP) ou 443 (HTTPS) si non specifie.                                                                                                                                                                                        |
| user        | Non         | Nom d'utilisateur optionnel pour l'authentification HTTP Basic sur une instance auto-hebergee.                                                                                                                                                                                     |
| password    | Non         | Mot de passe optionnel pour l'authentification HTTP Basic sur une instance auto-hebergee.                                                                                                                                                                                          |
| color       | Non         | Utilise les couleurs IRC pour offrir un rendu plus riche. Cela permet egalement d'interpreter les couleurs IRC deja presentes dans la notification. Assurez-vous que la case **Color** est cochee lors de la creation du Message Hook. La valeur par defaut est **Yes**.           |
| prefix      | Non         | Tous les messages envoyes vers IRC comportent par defaut un prefixe permettant d'identifier le type de message (`info`, `error`, `warning` ou `success`) ainsi que le systeme a l'origine de la notification. Par defaut, cette valeur est **Yes**.                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Notifico vers l'endpoint officiel :

```bash
# Supposons que notre {ProjectID} soit 2144
# Supposons que notre {MessageHook} soit uJmKaBW9WFk42miB146ci3Kj
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   notifico://2144/uJmKaBW9WFk42miB146ci3Kj
```

Envoyer une notification Notifico vers une instance auto-hebergee en HTTP :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   notifico://monhote.example/2144/uJmKaBW9WFk42miB146ci3Kj
```

Envoyer une notification Notifico vers une instance auto-hebergee en HTTPS avec authentification :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   notificos://utilisateur:motdepasse@monhote.example:8443/2144/uJmKaBW9WFk42miB146ci3Kj
```
