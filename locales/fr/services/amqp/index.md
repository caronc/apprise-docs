---
title: "Notifications AMQP"
description: "Publier des notifications vers un courtier de messages AMQP comme RabbitMQ."
sidebar:
  label: "AMQP"

source: https://www.amqp.org/

schemas:
  - amqp: insecure
  - amqps

has_selfhosted: true

body_formats:
  - text: default
  - markdown
  - html

keywords: "rabbitmq, activemq, artemis, qpid, azure service bus"

sample_urls:
  - amqp://{host}/{queue}
  - amqps://{user}:{password}@{host}/{queue}
  - amqps://{user}:{password}@{host}/?exchange={exchange}
  - amqps://{user}:{password}@{host}/?version=1.0&to={address}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

AMQP permet à Apprise de publier votre notification sous forme de message sur un courtier (broker) comme [RabbitMQ](https://www.rabbitmq.com/), Apache ActiveMQ Artemis, Apache Qpid ou Azure Service Bus. Ce qui lit cette file d'attente la reçoit.

Deux protocoles très différents portent le nom AMQP. Installez la bibliothèque correspondant à celui que parle votre courtier (ou les deux) :

| Version | Utilisée par                                                             | Installation                     |
| ------- | ------------------------------------------------------------------------ | -------------------------------- |
| 0.9.1   | RabbitMQ (par défaut) et la plupart des courtiers qui se disent « AMQP » | `pip install pika`               |
| 1.0     | ActiveMQ Artemis, Qpid, Azure Service Bus, RabbitMQ 4.0 et plus récent   | `pip install python-qpid-proton` |

Si vous ne précisez pas `?version=`, Apprise utilise **0.9.1** lorsque `pika` est installé, et **1.0** sinon.

:::note
Sous Linux, `python-qpid-proton` est compilé à partir des sources. Il faut donc un compilateur C ainsi que les paquets de développement de Python et d'OpenSSL (par exemple `gcc`, `python3-devel` et `openssl-devel` sous Fedora). Sous Fedora, vous pouvez plutôt installer `python3-qpid-proton` avec votre gestionnaire de paquets. RHEL, Rocky Linux et les systèmes similaires le trouvent dans EPEL.
:::

### AMQP 0.9.1

Chaque cible est une **clé de routage** (routing key). Avec l'échange (exchange) par défaut du courtier, qui est utilisé par défaut, la clé de routage est simplement le nom de la file d'attente à laquelle livrer le message. La file d'attente doit déjà exister.

Pour publier vers un autre échange, ajoutez `?exchange=`. Par exemple, `?exchange=amq.topic` avec la cible `alerts.disk` atteint toutes les files d'attente liées à ce sujet. Un échange de type fanout n'a besoin d'aucune cible.

Chaque message doit atteindre au moins une file d'attente, sinon la notification est signalée comme ayant échoué. Ajoutez `?mandatory=no` si vous voulez seulement que le courtier l'accepte.

### AMQP 1.0

Chaque cible est une **adresse** (le nom d'une file d'attente ou d'un sujet). Les échanges n'existent pas en AMQP 1.0, donc `?exchange=` et `?mandatory=` sont ignorés (avec un avertissement) lorsque `?version=1.0` est défini.

RabbitMQ 4.0 et plus récent attend des adresses comme `/queues/alerts` ou `/exchanges/amq.topic/alerts.disk`. Une barre oblique couperait l'adresse en morceaux dans le chemin de l'URL. Placez donc ces adresses dans `?to=`, séparées par des virgules : `?to=/queues/alerts,/queues/backup`.

Pour choisir un hôte virtuel RabbitMQ en AMQP 1.0, utilisez `?vhost=vhost:nom`.

## Syntaxe

La syntaxe valide est la suivante :

- `amqp://{host}/{target}`
- `amqp://{host}:{port}/{target}`
- `amqp://{user}:{password}@{host}/{target}`
- `amqp://{user}:{password}@{host}:{port}/{target1}/{target2}/{targetN}`
- `amqp://{user}:{password}@{host}/?exchange={exchange}`
- `amqp://{user}:{password}@{host}/?version=1.0&to={address1},{address2}`

Pour une connexion sécurisée (TLS), utilisez plutôt `amqps://` :

- `amqps://{user}:{password}@{host}/{target}`
- `amqps://{user}:{password}@{host}:{port}/{target1}/{target2}/{targetN}`

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                                                                                                      |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname   | Oui    | Le courtier auquel vous envoyez votre notification.                                                                                                                                                                                                              |
| port       | Non    | Le port sur lequel le courtier écoute. Par défaut **5672** pour `amqp://` et **5671** pour `amqps://`.                                                                                                                                                           |
| user       | Non    | L'utilisateur avec lequel se connecter. Sans utilisateur, AMQP 0.9.1 utilise le compte `guest` du courtier et AMQP 1.0 se connecte de façon anonyme.                                                                                                             |
| password   | Non    | Le mot de passe de votre utilisateur.                                                                                                                                                                                                                            |
| target     | Non    | Une ou plusieurs clés de routage (AMQP 0.9.1) ou adresses (AMQP 1.0) vers lesquelles publier. Une cible n'est facultative que lors d'une publication vers un `exchange`.                                                                                         |
| to         | Non    | Un alias de `target`. Utilisez-le pour les cibles qui contiennent une barre oblique.                                                                                                                                                                             |
| version    | Non    | La version d'AMQP à utiliser : `0.9.1` ou `1.0`. Les formes courtes comme `0.9` et `1` fonctionnent aussi. `ver` est un alias. Par défaut `0.9.1` lorsque `pika` est installé, sinon `1.0`. Utiliser `exchange` ou `mandatory` sans version sélectionne `0.9.1`. |
| exchange   | Non    | AMQP 0.9.1 uniquement. L'échange vers lequel publier. Par défaut, l'échange par défaut du courtier, qui livre directement à la file d'attente nommée par chaque cible.                                                                                           |
| vhost      | Non    | L'hôte virtuel à utiliser. Par défaut `/` pour AMQP 0.9.1. Pour RabbitMQ en AMQP 1.0, utilisez `vhost:nom`.                                                                                                                                                      |
| persistent | Non    | Demande au courtier d'enregistrer les messages sur disque afin qu'ils survivent à un redémarrage. Par défaut `yes`.                                                                                                                                              |
| mandatory  | Non    | AMQP 0.9.1 uniquement. Signale un échec lorsqu'un message n'atteint aucune file d'attente. Par défaut `yes`.                                                                                                                                                     |
| priority   | Non    | La priorité du message, de `0` à `255`. Votre file d'attente doit être configurée pour les priorités pour que cela ait un effet. Non définie par défaut.                                                                                                         |
| ttl        | Non    | Combien de temps (en millisecondes) le message peut attendre dans une file d'attente avant d'expirer. Non défini par défaut, le message n'expire donc jamais.                                                                                                    |
| +header    | Non    | Ajoute un en-tête au message. Par exemple, `?+source=nas` ajoute l'en-tête `source` avec la valeur `nas`. Utilisez-en autant que vous le souhaitez.                                                                                                              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Publier vers la file d'attente `alerts` d'un RabbitMQ local :

```bash
apprise -vv -t "Espace disque" -b "Le disque de sauvegarde est plein à 90 %" \
   "amqp://guest:guest@localhost/alerts"
```

Publier vers deux files d'attente en TLS, avec un message de haute priorité qui expire au bout d'une minute :

```bash
apprise -vv -b "Le disque de sauvegarde est plein à 90 %" \
   "amqps://user:pass@rabbit.example.com/alerts/backup?priority=9&ttl=60000"
```

Publier vers un échange de type topic avec une clé de routage et un en-tête personnalisé :

```bash
apprise -vv -b "Le disque de sauvegarde est plein à 90 %" \
   "amqp://user:pass@localhost/alerts.disk?exchange=amq.topic&+source=nas"
```

Publier en AMQP 1.0 vers une file d'attente RabbitMQ :

```bash
apprise -vv -b "Le disque de sauvegarde est plein à 90 %" \
   "amqp://user:pass@localhost/?version=1.0&to=/queues/alerts"
```

Publier en AMQP 1.0 vers une file d'attente ActiveMQ Artemis ou Qpid :

```bash
apprise -vv -b "Le disque de sauvegarde est plein à 90 %" \
   "amqp://user:pass@localhost/alerts?version=1.0"
```

## Test

RabbitMQ 4.0 et plus récent parle à la fois AMQP 0.9.1 et AMQP 1.0 dès l'installation, ce qui permet d'essayer facilement les deux versions en local (avec docker) :

```bash
# Démarrer RabbitMQ ; la console web est sur http://localhost:15672 (guest/guest)
docker run --rm --name rabbitmq -p 5672:5672 -p 15672:15672 \
   rabbitmq:4-management

# Créer une file d'attente nommée « alerts » dans la console web, puis :
apprise -vvv -b "Bonjour en 0.9.1" "amqp://guest:guest@localhost/alerts"
apprise -vvv -b "Bonjour en 1.0" \
   "amqp://guest:guest@localhost/?version=1.0&to=/queues/alerts"
```
