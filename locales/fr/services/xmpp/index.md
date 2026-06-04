---
title: "Notifications XMPP"
description: "Envoyer des notifications XMPP."
sidebar:
  label: "XMPP"

source: https://xmpp.org/

schemas:
  - xmpp: insecure
  - xmpps

has_selfhosted: true

sample_urls:
  - xmpp://{user}:{password}@{hostname}
  - xmpps://{user}:{password}@{hostname}/{jid}
  - xmpps://{user}:{password}@{hostname}/{jid1}/{jid2}/{jidN}
  - xmpps://{user}:{password}@{hostname}/#{room}@{conference_host}
  - xmpps://{user}:{password}@{hostname}/{jid}?xmpp={xmpp_server}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

La prise en charge XMPP exige **slixmpp version 1.10.0 ou plus récente** :

```bash
pip install "slixmpp>=1.10.0"
```

Vous aurez besoin des éléments suivants :

1. Un nom d’utilisateur de compte XMPP existant, sur un serveur XMPP auto-hébergé ou distant.
1. Le mot de passe associé à ce compte.
1. Le **domaine JID** de votre compte XMPP, par exemple `example.com` dans `user@example.com`.
1. Facultativement, un **nom d’hôte serveur** distinct si votre serveur XMPP est hébergé à une adresse différente du domaine JID ; voir [Domaine Scindé](#domaine-scindé--surcharge-du-nom-dhôte-serveur) plus bas.
1. Facultativement, le port sur lequel le serveur XMPP écoute.

Dans Apprise, le **JID de connexion est automatiquement construit sous la forme `{user}@{host}`**. Vous n’avez pas besoin de fournir explicitement un JID complet. Les identifiants d’authentification sont fournis sous la forme `{user}:{password}@{host}`, mais l’identité finale de connexion est toujours normalisée en `{user}@{host}`.

## Syntaxe

La syntaxe valide est la suivante :

- `xmpp://{user}:{password}@{host}`
- `xmpps://{user}:{password}@{host}`
- `xmpp://{user}:{password}@{host}:{port}`
- `xmpp://{user}:{password}@{host}/{jid}`
- `xmpp://{user}:{password}@{host}/{jid1}/{jid2}`
- `xmpps://{user}:{password}@{host}/{jid}?verify=no`
- `xmpps://{user}:{password}@{host}/{jid}?xmpp={xmpp_server}`

Les connexions sécurisées doivent utiliser **`xmpps://`**, tandis que les connexions non sécurisées doivent utiliser **`xmpp://`**.

Si aucune cible n’est précisée, Apprise envoie la notification au compte authentifié lui-même, soit `{user}@{host}`.

Les cibles peuvent aussi être fournies avec l’argument de requête `to=`, séparées par des virgules.

### Salons Multi-User Chat (MUC)

Pour envoyer vers un salon XMPP **Multi-User Chat** ([XEP-0045](https://xmpp.org/extensions/xep-0045.html)), préfixez le JID du salon avec `#` :

- `xmpps://{user}:{password}@{host}/#room@{conference_host}`
- `xmpps://{user}:{password}@{host}/#room1@{ch}/#room2@{ch}`

Vous pouvez mélanger librement des cibles de salons et d’utilisateurs dans la même URL :

- `xmpps://{user}:{password}@{host}/#room@{ch}/{jid}`

:::note
Lorsque Apprise reconstruit une URL en interne, par exemple pour la journalisation ou le stockage, les préfixes de salons MUC sont stockés sous la forme `#` ou `%23` encodé afin d’éviter toute ambiguïté avec des identifiants JID classiques. Les deux formes sont acceptées en entrée.
:::

## Détail des Paramètres

| Variable  | Requis  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user      | **Oui** | Nom d’utilisateur XMPP, la partie locale, combiné avec `host` pour former le JID de connexion.                                                                                                                                                                                                                                                                                                                                                                                    |
| password  | **Oui** | Mot de passe du compte XMPP.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| host      | **Oui** | Domaine JID, par exemple `example.com` pour un compte de la forme `user@example.com`. Sert aussi de nom d’hôte de connexion tant que `xmpp=` n’est pas défini.                                                                                                                                                                                                                                                                                                                    |
| port      | Non     | Port serveur, avec 5222 par défaut pour `xmpp` et 5223 pour `xmpps`.                                                                                                                                                                                                                                                                                                                                                                                                              |
| xmpp      | Non     | Surcharge le nom d’hôte TCP de connexion sans modifier le domaine JID. Utilisez-le lorsque votre serveur XMPP est joignable à une adresse différente du domaine JID, par exemple `xmpp=xmpp.example.com`. Tous les JID continuent d’être construits à partir de `host`. Voir [Domaine Scindé](#domaine-scindé--surcharge-du-nom-dhôte-serveur).                                                                                                                                   |
| mode      | Non     | Surcharge du mode de sécurité du transport ; valeurs possibles : `none`, `starttls` ou `tls`.                                                                                                                                                                                                                                                                                                                                                                                     |
| roster    | Non     | Récupère le roster depuis le serveur après la connexion ; la valeur par défaut est `no`.                                                                                                                                                                                                                                                                                                                                                                                          |
| keepalive | Non     | Active le mode keepalive XMPP pour maintenir une connexion persistante entre les notifications. Cela n’est utile que si l’instance Apprise reste en mémoire, par exemple dans une application longue durée. Cela n’a aucun effet pratique avec la CLI ou l’API en mode one-shot, car l’instance est créée, envoie la notification, puis est détruite. Même avec `?keepalive=yes`, la connexion se ferme dès que l’instance Apprise sort de portée. La valeur par défaut est `no`. |
| subject   | Non     | Les messages sont envoyés en `mtype=chat`, qui n’utilise généralement pas le champ XMPP intégré `subject=`. Définir `yes` redirige le titre fourni vers `subject=` au lieu de le concaténer au corps ; le comportement par défaut est `subject=no`.                                                                                                                                                                                                                               |
| name      | Non     | Surnom utilisé lors de l’entrée dans des salons MUC, uniquement alphanumérique et underscore. Le nom d’utilisateur JID est détecté et utilisé par défaut, sauf surcharge explicite. Si aucun n’est disponible, la valeur par défaut du système est utilisée.                                                                                                                                                                                                                      |
| scramplus | Non     | Mettre à `no` pour désactiver les mécanismes SASL SCRAM-PLUS avec liaison de canal. Utilisez ce paramètre si l’authentification échoue avec l’erreur "Invalid channel binding" (voir [SCRAM-PLUS et Liaison de Canal](#scram-plus-et-liaison-de-canal)). La valeur par défaut est `yes`.                                                                                                                                                                                          |
| to        | Non     | Autre manière de préciser les JID cibles ou les salons MUC, séparés par des virgules ; préfixez les salons avec `#`.                                                                                                                                                                                                                                                                                                                                                              |
| target    | Non     | JID destinataire, pour un utilisateur classique, ou JID de salon MUC lorsqu’il est préfixé par `#`.                                                                                                                                                                                                                                                                                                                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Modes Sécurisés

Le paramètre **`mode`** contrôle explicitement la manière dont la connexion XMPP est établie et **surcharge le comportement par défaut du schéma (`xmpp://` ou `xmpps://`)**.

| Mode       | Description                                       |
| ---------- | ------------------------------------------------- |
| `none`     | Connexion en clair, sans TLS                      |
| `starttls` | Mise à niveau STARTTLS sur une connexion en clair |
| `tls`      | Connexion TLS directe                             |

:::note
Le plugin XMPP choisit l’option la plus sécurisée lorsqu’il se trouve dans une situation ambiguë :

1. Si vous utilisez un schéma sécurisé, `xmpps://`, tout en définissant `mode=none`, le schéma sécurisé l’emporte et `starttls` est utilisé.
1. Si vous utilisez un schéma non sécurisé, `xmpp://`, tout en définissant `mode=starttls` ou `mode=tls`, c’est le mode sécurisé que vous avez précisé qui l’emporte.

   :::

### Comportement par Défaut

- `xmpp://` utilise `mode=none` par défaut ;
- `xmpps://` utilise `mode=starttls` par défaut.

## Mode Maintien de Connexion

Le mode keepalive est destiné aux applications longues durées qui réutilisent une même instance Apprise.

Lorsqu’il est activé :

- la connexion XMPP reste ouverte entre les notifications ;
- plusieurs messages réutilisent la même session ;
- le coût de connexion est réduit.

Avec la CLI ou un modèle one-shot, keepalive n’apporte aucun bénéfice car le processus s’arrête immédiatement après l’envoi.

Exemple d’activation de keepalive :

```bash
apprise -vv -b "Persistent Message" \
  xmpps://user:password@chat.example.com?keepalive=yes
```

Dans un usage embarqué :

```python
from apprise import Apprise

a = Apprise()
a.add("xmpps://user:password@chat.example.com?keepalive=yes")

a.notify(body="First message")
a.notify(body="Second message")
```

Dans ce scénario, la connexion est réutilisée entre les notifications.

## Assemblage des JID

Apprise normalise les JID afin de garantir un comportement cohérent et prévisible, même lorsque des formes abrégées sont utilisées.

Considérez l’URL XMPP Apprise suivante :

```text
         xmpp://user:pass@example.ca
                              ^
                              |
                         default_host
```

:::tip[Définir des Ressources]
Utilisez `%2F` pour représenter une ressource, ce qui équivaut à `/`, lorsque vous précisez des ressources dans le chemin URL, par exemple `jason@example.ca%2Fresource`.

Vous pouvez aussi utiliser l’argument de requête `to=`, ce qui évite d’encoder `/` dans l’URL. Par exemple : `?to=jason@example.ca/resource`.
:::
:::note[Multi-User Chat (MUC)]
MUC est le protocole de discussion de groupe XMPP ([XEP-0045](https://xmpp.org/extensions/xep-0045.html)). Un JID de salon MUC ressemble typiquement à `roomname@conference.example.com`. Apprise identifie les cibles MUC grâce au préfixe `#`, comme dans IRC et de nombreuses applications de discussion. Lorsqu’Apprise rejoint un salon, il utilise le nom d’utilisateur de l’expéditeur comme surnom.
:::

| URL                                                                      | Cibles notifiées                                         |
| ------------------------------------------------------------------------ | -------------------------------------------------------- |
| `xmpps://user:pass@example.ca`                                           | `user@example.ca` lui-même                               |
| `xmpps://user:pass@example.ca/jane`                                      | `jane@example.ca`                                        |
| `xmpps://user:pass@example.ca/jane/joe`                                  | `jane@example.ca`, `joe@example.ca`                      |
| `xmpps://user:pass@example.ca/jane@foobar.ca`                            | `jane@foobar.ca`                                         |
| `xmpps://user:pass@example.ca/jason%2Fmobile`                            | `jason@example.ca/mobile`                                |
| `xmpps://user:pass@example.ca/jane@foobar.ca%2Fworkstation`              | `jane@foobar.ca/workstation`                             |
| `xmpps://user:pass@example.ca/#general@conference.example.ca`            | Salon MUC `general@conference.example.ca`                |
| `xmpps://user:pass@example.ca/#general@conference.example.ca/jane`       | Salon MUC `general@...` et utilisateur `jane@example.ca` |
| `xmpps://user:pass@example.ca/#room1@conference.ca/#room2@conference.ca` | Salons MUC `room1@...` et `room2@...`                    |

## Domaine Scindé / Surcharge du Nom d’Hôte Serveur

Certaines installations XMPP hébergent le serveur sur un nom d’hôte différent du domaine JID. Par exemple, les comptes peuvent être de la forme `user@example.com`, alors que le serveur réel est joignable sur `xmpp.example.com`. Normalement, XMPP résout cela avec des enregistrements DNS SRV, mais si ces enregistrements sont absents ou incorrects, la connexion échoue.

Utilisez le paramètre `xmpp=` pour préciser séparément le nom d’hôte de connexion :

```text
xmpps://user@example.com/joe?xmpp=xmpp.example.com
```

Cela produit :

| Propriété        | Valeur             |
| ---------------- | ------------------ |
| JID de connexion | `user@example.com` |
| JID cible        | `joe@example.com`  |
| Connexion TCP    | `xmpp.example.com` |
| Flux XMPP `to`   | `example.com`      |

Tous les JID, de connexion comme de cible, sont toujours assemblés à partir du composant `host` de l’URL, ici `example.com`. La valeur `xmpp=` est utilisée **uniquement** pour la connexion TCP.

:::note
Sans `xmpp=`, Apprise se connecte directement à `host`. Si le serveur se trouve à une autre adresse et qu’aucun enregistrement DNS SRV ne comble l’écart, vous verrez une erreur de flux `host-unknown`. Définir `xmpp=` permet de résoudre cela sans ruse particulière d’encodage d’URL.
:::

## SCRAM-PLUS et Liaison de Canal

Par défaut, Apprise autorise slixmpp à tenter les mécanismes SASL SCRAM-PLUS (comme `SCRAM-SHA-256-PLUS`) lorsque le serveur les annonce. Ces mécanismes incluent des données de liaison TLS pour offrir une protection supplémentaire contre les attaques de type man-in-the-middle.

Cependant, certaines configurations serveur ou certaines versions de Python SSL ne peuvent pas fournir des données de liaison de canal valides, ce qui provoque un échec d'authentification avec un message tel que :

```text
Invalid channel binding
```

Si vous rencontrez cette erreur, ajoutez `?scramplus=no` à votre URL Apprise pour désactiver la négociation SCRAM-PLUS. Apprise négociera alors un mécanisme SASL non-PLUS (par exemple `SCRAM-SHA-256` ou `SCRAM-SHA-1`). La connexion reste entièrement chiffrée par TLS ; seule l'étape de liaison de canal est ignorée.

```bash
apprise -vv -b "Test" \
  "xmpps://user@example.com/joe?xmpp=xmpp.example.com&scramplus=no"
```

:::note
Cette erreur est le plus souvent déclenchée dans les situations suivantes :

- Le serveur XMPP ne supporte pas correctement la liaison de canal `tls-unique` ou `tls-exporter` avec votre version de Python.
- Python 3.13+ inclut la prise en charge de `tls-exporter`, mais le serveur ne l'accepte pas.

L'ajout de `?scramplus=no` résout les échecs d'authentification dans tous ces cas.

Il s'agit d'un problème répandu dans l'écosystème Python. Pour le contexte et le suivi en amont, consultez la page [Problèmes SCRAM-SASL dans l'écosystème Python](https://github.com/scram-sasl/info/issues/1).
:::

## Exemples

Envoyer une notification XMPP en clair :

```bash
apprise -vv -b "Message de Test" \
  xmpp://user:password@localhost
```

Envoyer une notification STARTTLS sécurisée :

```bash
apprise -vv -b "Secure Message" \
  xmpp://user:password@localhost?mode=starttls
```

Envoyer une notification en TLS direct :

```bash
apprise -vv -b "TLS Message" \
  xmpps://user:password@chat.example.com
```

Envoyer un message à un destinataire spécifique :

```bash
apprise -vv -t "Titre de Test" -b "Bonjour d'Apprise" \
  xmpps://user:password@chat.example.com/alice@example.net
```

Envoyer un message à plusieurs destinataires avec l’argument `to=` :

```bash
apprise -vv -b "Group Message" \
  xmpps://user:password@chat.example.com?to=alice@example.net,bob@example.org
```

Désactiver la vérification du certificat TLS :

```bash
apprise -vv -b "Message de Test" \
  xmpps://user:password@chat.example.com/alice@example.net?verify=no
```

Envoyer une notification vers une ressource :

```bash
apprise -vv -b "Message de Test" \
  xmpps://user:password@chat.example.com/?to=alice@example.net/mobile
```

Envoyer un message vers un salon MUC :

```bash
apprise -vv -b "Bonjour, salon !" \
  "xmpps://user:password@chat.example.com/#general@conference.example.com"
```

Envoyer un message vers plusieurs salons MUC et un utilisateur direct :

```bash
apprise -vv -b "Broadcast" \
  "xmpps://user:password@chat.example.com/#ops@conference.example.com/#dev@conference.example.com/alice@example.com"
```

Envoyer vers un salon MUC avec l’argument `to=` :

```bash
apprise -vv -b "Room message" \
  "xmpps://user:password@chat.example.com?to=#general@conference.example.com"
```

Se connecter à un serveur dont le nom d’hôte diffère du domaine JID :

```bash
# JID domain is example.com; server is physically at xmpp.example.com
apprise -vv -b "Hello" \
  "xmpps://user@example.com/joe?xmpp=xmpp.example.com"
```

Désactiver SCRAM-PLUS en cas d’échec avec "Invalid channel binding" :

```bash
apprise -vv -b "Hello" \
  "xmpps://user@example.com/joe?xmpp=xmpp.example.com&scramplus=no"
```

## Tests

Pour un guide détaillé sur la mise en place d’un serveur Prosody local et la vérification des notifications de bout en bout, consultez le [Guide de Tests XMPP](./testing/).
