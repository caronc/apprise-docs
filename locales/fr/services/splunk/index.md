---
title: "Notifications Splunk/VictorOps"
description: "Envoyer des notifications Splunk/VictorOps."
sidebar:
  label: "Splunk/VictorOps"

source: https://www.splunk.com/en_us/products/on-call.html

schemas:
  - splunk
  - victorops

sample_urls:
  - splunk://{routing_key}@{apikey}
  - splunk://{routing_key}@{apikey}/{entity_id}
  - victorops://{routing_key}@{apikey}
  - victorops://{routing_key}@{apikey}/{entity_id}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

1. [Creez un compte Splunk On-Call](https://www.splunk.com/en_us/sign-up.html?redirecturl=https://www.splunk.com/en_us/products/on-call.html), anciennement VictorOps. Configurez ensuite votre point de terminaison REST.<br/> ![splunk-01](./images/f691ec449bf87a06.png)
1. Recuperez votre API Key [a cette adresse](https://portal.victorops.com/dash/apprise#/advanced/rest).<br/> ![splunk-02](./images/fb3c3c430919015a.png)<br/>Elle ressemblera a ceci :

   ```text
   https://alert.victorops.com/integrations/generic/20131114/alert/1234abcd-c11c-1ad1-a1a1-12345678abcd/$routing_key
                                                                   ^                                  ^ ^          ^
                                                                   |------------ apikey --------------| |          |
                                                                                                        | routing  |
                                                                                                       /    key     \
                                                                                                      | placeholder |
                                                                                                      |-------------|
   ```

1. Enfin, vous devrez definir un `routing_key`, ce qui se fait dans **Settings** -> **Route Keys**.<br/>![splunk-03](./images/ffc0e172e7d2e730.png)
1. L'`entity_id` sert a garantir qu'un meme message puisse etre declenche puis acquitte. C'est en pratique une cle. Si vous n'en fournissez pas, Apprise en generera une pour vous, toujours la meme.

## Syntaxe

La syntaxe valide est la suivante :

- `splunk://{routing_key}@{apikey}`
- `splunk://{routing_key}@{apikey}/{entity_id}`
- `victorops://{routing_key}@{apikey}`
- `victorops://{routing_key}@{apikey}/{entity_id}`
- `https://alert.victorops.com/integrations/generic/20131114/ alert/{apikey}/{routing_key}`
- `https://alert.victorops.com/integrations/generic/20131114/ alert/{apikey}/{routing_key}/{entity_id}`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey      | **Oui**     | REST API key associee a votre compte Splunk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| routing_key | **Oui**     | L'une des valeurs `routing_key` associees a votre compte Splunk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| entity_id   | Non         | Cle a utiliser pour generer votre declenchement. Les cles permettent ensuite d'alerter, d'acquitter et/ou de resoudre la meme notification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| action      | Non         | Action a effectuer avec votre notification Apprise Splunk/VictorOps. Les options disponibles sont :<br/>⚪ `map` : utilise les correspondances d'action Apprise, ou personnalisees, selon le type de notification. Ainsi, un `warning` Apprise declenche un `WARNING` Splunk, un `failure` declenche un message `CRITICAL` Splunk, donc un incident, et un `success` declenche un message `RECOVERY`, ce qui clot un incident. **`map` est l'action par defaut si rien n'est precise.**<br/>⚪ `warning` : declenche toujours un message Splunk `WARNING`.<br/>⚪ `critical` : declenche toujours un message Splunk `CRITICAL`.<br/>⚪ `acknowledgement` : declenche toujours un message Splunk `ACKNOWLEDGEMENT`.<br/>⚪ `info` : declenche toujours un message Splunk `INFO`.<br/>⚪ `recovery` : declenche toujours un message Splunk `RECOVERY`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Mappage Personnalise des Evenements Splunk/On-Call

Vous pouvez faire en sorte qu'Apprise declenche une action Splunk/On-Call specifique selon la notification emise si vous utilisez l'action par defaut `map` avec cette integration.

Commencez par noter que Splunk prend en charge les etats suivants :

1. `CRITICAL` : declenche un incident
1. `WARNING` : peut declencher un incident, selon votre configuration
1. `ACKNOWLEDGEMENT` : acquitte un incident
1. `INFO` : cree un evenement de timeline sans declencher d'incident
1. `RECOVERY` : resout un incident

Par defaut, si `action=map`, Apprise applique les correspondances suivantes :

- Apprise `info` 👉 Splunk `INFO`
- Apprise `warning` 👉 Splunk `WARNING`
- Apprise `failure` 👉 Splunk `CRITICAL`
- Apprise `success` 👉 Splunk `RECOVERY`

Si vous souhaitez modifier ces correspondances, il suffit d'utiliser `:` devant la variable Apprise a surcharger. Par exemple, si vous voulez mapper `info` d'Apprise vers `ACKNOWLEDGEMENT` de Splunk, votre URL contiendra `?:info=acknowledgement`. Vous pouvez aussi utiliser une forme courte comme `?i=a`, avec le meme effet.

Vous pouvez ajouter autant de remappages que vous le souhaitez. Assurez-vous simplement de placer un deux-points, `:`, devant le type de notification Apprise a surcharger.

## Tests

Envoyer une alerte Splunk On-Call pour simuler l'echec de notre service de base de donnees :

```bash
# Supposons que nous voulions declencher un message Splunk `CRITICAL`, donc envoyer une notification Apprise de type `failure`
# Supposons que notre {apikey} soit 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Supposons que notre {route_key} soit database
apprise -vv -t "Test Message Title" -b "Test Message Body" -n failure \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221
```

Nous pouvons resoudre la panne ci-dessus en procedant simplement comme suit :

```bash
# Supposons que nous voulions declencher un message Splunk `ACKNOWLEDGEMENT`, donc envoyer une notification Apprise de type `success`
# Supposons que notre {apikey} soit 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Supposons que notre {route_key} soit database
apprise -vv -t "Test Message Title" -b "Test Message Body" -n success \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221
```

Envoyer un message Splunk avec remappage de nos cles :

```bash
# Supposons que nous voulions que `info` d'Apprise declenche un `RECOVERY` Splunk
# Supposons que nous voulions que `warning` d'Apprise declenche toujours un `CRITICAL` Splunk
# Supposons que notre {apikey} soit 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Supposons que notre {route_key} soit database
# Dans cet exemple, nous enverrons un message `warning`, qui deviendra donc un `CRITICAL`
apprise -vv -t "Test Message Title" -b "Test Message Body" -n warning \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221?:info=rec&:warn=crit
```

Quel que soit le type de message envoye, nous pouvons aussi le forcer en `RECOVERY` :

```bash
# Supposons que nous voulions toujours declencher un `RECOVERY`
# Supposons que notre {apikey} soit 134b8gh0-eba0-4fa9-ab9c-257ced0e8221
# Supposons que notre {route_key} soit database
# Dans cet exemple, nous enverrons un message `failure`, mais il sera traite comme un `RECOVERY` a cause de notre configuration
apprise -vv -t "Test Message Title" -b "Test Message Body" -n failure  \
   splunk://database@134b8gh0-eba0-4fa9-ab9c-257ced0e8221?:action=recovery
```
