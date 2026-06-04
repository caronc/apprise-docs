---
title: "Notifications Home Assistant"
description: "Envoyer des notifications persistantes ou de service à Home Assistant."
sidebar:
  label: "Home Assistant"

source: https://www.home-assistant.io/

schemas:
  - hassio: insecure
  - hassios

has_selfhosted: true

limits:
  max_chars: 4096

sample_urls:
  - hassio://{host}/{access_token}
  - hassio://{host}/{access_token}/{service}
  - hassio://{host}/{access_token}/{domain}.{service}:{target}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::tip[Utiliser Apprise depuis Home Assistant ?]
Cette page couvre l'envoi de notifications **vers** Home Assistant depuis Apprise.
Si vous souhaitez utiliser Apprise **à l'intérieur** de Home Assistant pour
redistribuer vers d'autres services (email, Telegram, etc.), consultez le
[guide d'intégration Home Assistant](../../guides/hassio/).
:::

## Configuration du Compte

1. Connectez-vous à votre instance Home Assistant et ouvrez votre page **Profil**.
2. Faites défiler tout en bas et cliquez sur **Create Token** sous
   **Long-Lived Access Tokens**.
3. Donnez-lui un nom (par exemple _Apprise_) et copiez le jeton généré :
   vous ne pourrez plus l'afficher ensuite.

## Syntaxe

Deux modes de fonctionnement existent selon que vous incluez ou non une
cible de service dans l'URL.

### Mode Notification Persistante (par Défaut)

Lorsqu'aucune cible de service n'est fournie, Apprise publie une
[notification persistante](https://www.home-assistant.io/integrations/persistent_notification/)
sur le tableau de bord Home Assistant.

```text
hassio://{host}/{access_token}
hassios://{host}/{access_token}
hassio://{host}:{port}/{access_token}
```

Par défaut, une nouvelle notification unique est créée à chaque envoi.
Pour **remplacer** la notification précédente à la place (utile pour
des mises à jour d'état), fixez un identifiant via `?nid=` :

```text
hassio://{host}/{access_token}?nid=myid
```

### Mode Notification de Service

Ajoutez une ou plusieurs cibles de service après le jeton d'accès pour
appeler directement n'importe quel service Home Assistant. Cela prend en
charge les notifications push de l'application mobile, le TTS, les lecteurs
média et tout autre domaine de service HA.

Chaque segment cible suit cette grammaire :

| Forme                  | Exemple                    | Remarques                                  |
| ---------------------- | -------------------------- | ------------------------------------------ |
| `service`              | `mobile_app_phone`         | Domaine par défaut : `notify`              |
| `domain.service`       | `media_player.living_room` | Domaine explicite                          |
| `service:target`       | `mobile_app_phone:user1`   | Sous-cible unique                          |
| `service:t1,t2,t3`     | `notify_group:alice,bob`   | Sous-cibles séparées par virgule ou espace |
| `domain.service:t1,t2` | `tts.google_say:en-US`     | Domaine + sous-cibles                      |

Plusieurs cibles de premier niveau sont séparées par `/` dans l'URL :

```text
hassio://{host}/{access_token}/{service}
hassio://{host}/{access_token}/{domain}.{service}
hassio://{host}/{access_token}/{domain}.{service}:{target}
hassio://{host}/{access_token}/{domain}.{service}:{t1},{t2}
hassio://{host}/{access_token}/{service1}/{domain}.{service2}:{target}
```

Le **domaine par défaut** est `notify` lorsqu'aucun domaine n'est précisé ;
ainsi, `hassio://host/token/mobile_app_phone` est équivalent à
`hassio://host/token/notify.mobile_app_phone`.

:::tip[Trouver le nom de votre service]
Dans Home Assistant, ouvrez **Developer Tools → Services**. Les noms de
service listés ici correspondent directement à `{domain}.{service}` dans
l'URL Apprise. Pour les notifications push de l'application mobile, le service
porte généralement le nom `notify.mobile_app_{device_name}`, où `{device_name}`
correspond à ce qui apparaît dans les réglages de l'application compagnon HA.
:::

#### Préfixe de Chemin pour Proxy Inverse

Si votre instance Home Assistant est servie sous un sous-chemin
(par exemple derrière un reverse proxy sur `/ha`), fournissez-le avec `?prefix=` :

```text
hassio://{host}/{access_token}/{service}?prefix=/ha
```

## Détail des Paramètres

| Variable     | Requis | Description                                                                                                                                      |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| host         | Oui    | Le nom d'hôte ou l'adresse IP de votre instance Home Assistant.                                                                                  |
| access_token | Oui    | Le **Long-Lived Access Token** généré depuis votre page de profil.                                                                               |
| port         | Non    | Port de connexion. Par défaut : **8123** pour `hassio://` et **443** pour `hassios://`.                                                          |
| service      | Non    | Une ou plusieurs entrées `[domain.]service[:target]`. Omettez entièrement ce champ pour utiliser le mode **Notification Persistante**.           |
| nid          | Non    | Un **Notification ID** fixe, uniquement pour les notifications persistantes. Lorsqu'il est défini, chaque nouveau message remplace le précédent. |
| prefix       | Non    | Un préfixe de chemin URL ajouté à tous les appels API. Requis lorsque Home Assistant est servi sous un sous-chemin (par exemple `?prefix=/ha`).  |
| batch        | Non    | Définissez `yes` pour regrouper jusqu'à 10 cibles de service dans un seul appel API. La valeur par défaut est `no`.                              |
| to           | Non    | Alias pour les cibles de service. Équivalent à l'ajout de cibles dans le chemin URL.                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification persistante (crée une nouvelle entrée dans le tableau de bord HA à chaque appel) :

```bash
apprise -vv -t "Alert" -b "Mouvement detecte" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f'
```

Envoyer une notification persistante qui **remplace** toujours la précédente
(utile pour des mises à jour d'état récurrentes) :

```bash
apprise -vv -t "Statut" -b "All systems nominal" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f?nid=apprise'
```

Envoyer vers un service de notification de l'application mobile :

```bash
apprise -vv -t "Alert" -b "Quelqu'un a sonne a la porte" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f/notify.mobile_app_myphone'
```

Envoyer vers plusieurs services dans une seule URL :

```bash
apprise -vv -t "Alert" -b "La porte du garage est restee ouverte" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f/notify.mobile_app_phone1/notify.mobile_app_phone2'
```

Envoyer via une connexion sécurisée (`hassios://` → HTTPS sur le port 443) :

```bash
apprise -vv -t "Test" -b "Secure message" \
    'hassios://my.secure.server/4b4f2918fd-dk5f-8f91f/notify.mobile_app_myphone'
```

Utiliser `?to=` lors de la construction programmatique des URL :

```bash
apprise -vv -t "Test" -b "Hello" \
    'hassio://myserver.local/4b4f2918fd-dk5f-8f91f?to=notify.mobile_app_myphone'
```

## Dépannage

- **401 Unauthorized** — Votre jeton est invalide ou a expiré. Générez-en
  un nouveau depuis la page de profil Home Assistant.
- **400 Bad Request** — Une cible de service inexistante a été fournie, ou
  la charge utile contenait des paramètres non pris en charge pour ce domaine
  de service. Vérifiez le domaine et le nom du service dans votre instance HA.
- **Certificat auto-signé** — Ajoutez `?verify=no` pour ignorer la
  vérification SSL : `hassios://myserver/{token}?verify=no`
