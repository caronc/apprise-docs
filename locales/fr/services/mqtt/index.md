---
title: "Notifications MQTT"
description: "Envoyer des notifications MQTT."
sidebar:
  label: "MQTT"

source: https://mqtt.org/

schemas:
  - mqtt: insecure
  - mqtts

has_selfhosted: true

sample_urls:
  - mqtts://{host}/{topic}
  - mqtts://{host}:{port}/{topic}
  - mqtts://{user}@{host}:{port}/{topic}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

La prise en charge MQTT necessite **paho-mqtt** v2.1.0 ou plus recent pour fonctionner :

```bash
pip install "paho-mqtt"
```

:::note
Pour vous connecter a un serveur MQTT utilisant un certificat auto-signe, ajoutez `?verify=no` a l'URL. Par exemple : `mqtts://user:pass@host/topic?verify=no`. Dans ce mode, la validation complete de la chaine de certificats est desactivee, ce qui permet d'accepter les certificats auto-signes.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `mqtt://{host}/{topic}`
- `mqtt://{host}:{port}/{topic}`
- `mqtt://{user}@{host}:{port}/{topic}`
- `mqtt://{user}:{password}@{host}:{port}/{topic}`

Pour une connexion securisee, utilisez simplement `mqtts` a la place.

- `mqtts://{host}/{topic}`
- `mqtts://{host}:{port}/{topic}`
- `mqtts://{user}@{host}:{port}/{topic}`
- `mqtts://{user}:{password}@{host}:{port}/{topic}`

Les connexions securisees doivent etre referencees avec **mqtts://**, tandis que les connexions non securisees doivent utiliser **mqtt://**.

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                                                                                                                               |
| --------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user      | Non         | Utilisateur associe a votre serveur MQTT.                                                                                                                                                                                                                                                                                                 |
| password  | Non         | Mot de passe associe a votre serveur MQTT.                                                                                                                                                                                                                                                                                                |
| hostname  | Oui         | Serveur MQTT auquel vous envoyez votre notification.                                                                                                                                                                                                                                                                                      |
| port      | Non         | Port sur lequel le serveur MQTT ecoute. Par defaut, il s'agit de **1883** pour **mqtt://** et de **8883** pour toutes les references **mqtts://**.                                                                                                                                                                                        |
| qos       | Non         | Parametre MQTT Quality of Service, QoS. Par defaut, la valeur **0**, zero, est utilisee.                                                                                                                                                                                                                                                  |
| version   | Non         | Version du protocole MQTT a utiliser. Par defaut, la valeur **v3.1.1** est utilisee. Les autres valeurs possibles sont **v3.1** et **v5**.                                                                                                                                                                                                |
| client_id | Non         | Identifiant client MQTT a utiliser lors de l'etablissement de la connexion avec le serveur. Par defaut, il n'est pas defini et un identifiant unique est genere pour chaque message.                                                                                                                                                      |
| session   | Non         | Session MQTT a maintenir, associee a `client_id`. Si aucun `client_id` n'est precise, cette valeur n'est pas prise en compte. Par defaut, aucune session n'est etablie et chaque connexion effectuee par Apprise est unique. Si vous souhaitez imposer une session, associee a un `client_id` fourni, definissez cette valeur sur `True`. |
| retain    | Non         | Drapeau MQTT publisher retain. Par defaut, cette option vaut `no`, mais vous pouvez facultativement la surcharger et la definir sur `yes`.                                                                                                                                                                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

```bash
# Supposons que nous executons simplement un serveur MQTT localement sur notre machine
# Supposons que nous voulions publier notre message sur le topic `my/topic`
apprise -vvv -b "whatever-payload-want" "mqtt://localhost/my/topic"
```

## Test

Voici ce qui a ete fait pour tester ce service localement, avec Docker :

```bash
# Recuperer Mosquitto, version v2.x a l'epoque, le 16 septembre 2021
docker pull eclipse-mosquitto

# Creer un emplacement pour la configuration
mkdir mosquitto
cd mosquitto
cat << _EOF > mosquitto.conf
persistence false
allow_anonymous true
connection_messages true
log_type all
listener 1883
_EOF

# Lancer ensuite une instance, que l'on pourra interrompre avec Ctrl-C :
docker run --name mosquitto -p 1883:1883 \
   --rm -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf \
   eclipse-mosquitto

# Tous les tests Apprise peuvent ensuite etre effectues contre l'IP de ce systeme, par exemple :
apprise -vvv -b "my=payload" "mqtt://localhost/a/simple/topic"

# Voici un exemple avec le drapeau `retain` active :
apprise -vvv -b "my=payload" "mqtt://localhost/a/simple/topic?retain=yes"
```
