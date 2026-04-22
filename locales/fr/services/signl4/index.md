---
title: "Notifications SIGNL4"
description: "Envoyer des notifications SIGNL4."
sidebar:
  label: "SIGNL4"

source: https://www.signl4.com

schemas:
  - signl4

sample_urls:
  - signl4://{secret}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous devez disposer d'un compte chez [SIGNL4](https://www.signl4.com) et utiliser le secret de votre équipe ou d'intégration SIGNL4.

[SIGNL4](https://www.signl4.com) envoie des alertes mobiles exploitables aux utilisateurs ou équipes responsables. Il offre un ensemble de fonctionnalités puissantes comprenant une application mobile, des notifications push, des SMS, des appels vocaux, des escalades automatisées et la planification des astreintes. Cela garantit que les alertes critiques sont transmises instantanément et de manière fiable aux bonnes personnes, à tout moment et en tout lieu.

1. Visitez [signl4.com](https://www.signl4.com/) et inscrivez-vous si vous n'avez pas encore de compte.
2. Une fois connecté, obtenez le secret de votre équipe ou d'intégration SIGNL4 comme décrit [ici](https://support.signl4.com/hc/en-us/articles/360015827597-Where-is-my-team-secret).
3. Le secret de votre équipe ou d'intégration SIGNL4 constitue le nom d'hôte dans votre URL Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `signl4://{secret}`

## Détail des Paramètres

| Variable          | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secret            | Oui    | Le « secret » est le secret de votre équipe ou d'intégration SIGNL4.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| service           | Non    | Assigne l'alerte à la catégorie service/système avec le nom spécifié.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| location          | Non    | Transmet des informations de localisation ('latitude, longitude') avec votre événement et affiche une carte dans l'application mobile.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| alerting_scenario | Non    | Si cet événement déclenche une alerte, permet de contrôler la façon dont SIGNL4 notifie l'équipe. **single_ack** : Une seule personne doit acquitter cette alerte. **multi_ack** : L'alerte doit être confirmée par le nombre de personnes d'astreinte au moment de sa création. **emergency** : Toutes les personnes de l'équipe sont notifiées indépendamment de leur statut d'astreinte et doivent acquitter l'alerte, qui est également assignée à la catégorie d'urgence intégrée.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| filtering         | Non    | Spécifiez une valeur booléenne true ou false pour appliquer ou non le filtrage d'événements à cet événement. Si défini à true, l'événement ne déclenchera une notification à l'équipe que s'il contient au moins un mot-clé de l'une de vos catégories de services et systèmes (c'est-à-dire s'il est sur liste blanche).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| external_id       | Non    | Si l'événement provient d'un enregistrement dans un système tiers, utilisez ce paramètre pour transmettre l'identifiant unique de cet enregistrement. Cet identifiant sera communiqué dans les notifications webhook sortantes de SIGNL4, ce qui est idéal pour la corrélation/synchronisation de cet enregistrement avec l'alerte.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| status            | Non    | Si vous souhaitez résoudre une alerte existante via un identifiant externe (external_id), vous pouvez ajouter ce paramètre de statut. Il possède trois valeurs possibles : **new** : Valeur par défaut signifiant que cet événement déclenche une nouvelle alerte. **acknowledged** : Si vous souhaitez acquitter une alerte précédemment déclenchée (par exemple, quelqu'un a répondu dans le système tiers et non dans l'application mobile pendant les heures de bureau), définissez le « statut » à « acknowledged » et fournissez un identifiant externe via le paramètre « external_id » pour l'alerte à acquitter. Il n'est possible d'acquitter une alerte qu'avec un identifiant externe fourni lors de son déclenchement initial. **resolved** : Si vous souhaitez résoudre une alerte précédemment déclenchée (par exemple, un système de supervision a fermé automatiquement l'événement), assurez-vous de définir X-S4-Statut à 'resolved' et fournissez un identifiant externe via le paramètre « external_id » pour l'alerte à résoudre. Il n'est possible de résoudre une alerte qu'avec un identifiant externe fourni lors de son déclenchement initial. |

Vous trouverez plus d'informations [ici](https://docs.signl4.com/integrations/webhook/webhook.html).

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une alerte SIGNL4 simple :

```bash
apprise -vv \
   --title 'Alerte d'Apprise' \
   --body 'Bonjour tout le monde.' \
   'signl4://secret'
```

Voici un autre exemple :

```bash
apprise -vv --title 'Alerte d'Apprise' \
  --body 'Bonjour tout le monde.' \
   'signl4://secret?service=IoT&location=52.3984235,13.0544149&external_id=a2&status=new'
```
