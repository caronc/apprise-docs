---
title: "Notifications PagerTree"
description: "Envoyer des notifications PagerTree."
sidebar:
  label: "PagerTree"

source: https://pagertree.com

schemas:
  - pagertree

has_incident: true

sample_urls:
  - pagertree://{integration}
  - pagertree://{integration}?action=resolve&thirdparty_id=abc123
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

1. Pour que cela fonctionne, vous devez creer un compte [PagerTree](https://pagertree.com), l'essai gratuit convient parfaitement. Veillez a suivre l'assistant de configuration, car vous voudrez etre d'astreinte pour l'equipe vers laquelle l'integration pointera a l'etape 2.
2. Creez une [integration webhook](https://pagertree.com/docs/integration-guides/webhook) et pointez-la vers l'equipe voulue, par defaut "Devops Team".
3. Depuis la page de l'integration, copiez le Prefix ID de l'integration, utilise pour l'URL Apprise.
   ![image](./images/217587441-cfbf0f43-f736-4b9d-85dc-18acc6cc418c.png)
4. Utilisez ensuite ce Prefix ID dans l'URL Apprise : `./bin/apprise -t test -b message "pagertree://int_xxxxxxxxxx"`

## Syntaxe

La syntaxe valide est la suivante :

- `pagertree://{integration}`
- `pagertree://{integration}?action=resolve&thirdparty_id=abc123`
- `pagertree://{integration}?+pagertree-token=123&:env=prod&-incident=true&-incident_severity=SEV-1&-incident-message=Please join the bridge&tags=prod,server,outage`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integration | Oui         | Prefix ID de votre integration webhook. Il se trouve en haut de la page de l'integration.                                                                                                                                                                                                                                                                                                                                                                  |
| action      | Non         | Ce qu'il faut faire de l'alerte. Les valeurs possibles sont `create`, `acknowledge`, `resolve` et `map`. **map** résout l'alerte quand le type de notification est `success` et en crée une pour tous les autres types. La valeur par défaut est `create`.                                                                                                                                                                                                 |
| thirdparty  | Non         | L'identifiant que PagerTree utilise pour rattacher les événements à la même alerte. `tid` et `dedup` sont des alias. Avec `create` et sans identifiant, un nouvel identifiant aléatoire est utilisé à chaque fois. Avec toute autre action et sans identifiant, le titre (ou la première ligne du message s'il n'y a pas de titre) est utilisé : une notification `success` résout donc l'alerte qu'une notification `failure` avec le même titre a créée. |
| urgency     | Non         | Niveau d'urgence de l'alerte a generer. Les valeurs possibles sont `silent`, `low`, `medium`, `high` ou `critical`. Si aucune valeur n'est fournie, PagerTree utilisera celle definie par defaut dans l'integration.                                                                                                                                                                                                                                       |
| tags        | Non         | Liste de tags separes par des virgules, par exemple `prod,server,outage`.                                                                                                                                                                                                                                                                                                                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une commande de creation PagerTree.

```bash

# Supposons que notre {integration_id} soit int_0123456789
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pagertree://int_0123456789"
```

### Résoudre des alertes

Utilisez `action=map` pour créer une alerte lors d'une notification `failure`, puis la résoudre plus tard en envoyant une notification `success` avec le même titre :

```bash
apprise -vv -n failure -t "Disque presque plein" -b "sda est à 95 %" \
   "pagertree://int_xxxxxxxxxxx?action=map"

apprise -vv -n success -t "Disque presque plein" -b "sda est revenu à la normale" \
   "pagertree://int_xxxxxxxxxxx?action=map"
```

### Manipulation du Payload

L'utilisation de `:` dans l'URL Apprise vous permet de modifier et d'ajouter du contenu au corps envoye en amont a PagerTree. C'est utile lorsque vous exploitez la fonctionnalite [Capture Additional Data](https://pagertree.com/docs/integration-guides/webhook#integration-options).

```bash
# Ajouter des donnees au payload envoye a PagerTree
#
# Supposons que notre {integration_id} soit int_xxxxxxxxxx
# Supposons que nous voulions inclure "server": "blue-ranger-2" dans le payload existant :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pagertree://int_xxxxxxxxxx/?:server=blue-ranger-2"
```

Cela publierait un message comme celui-ci :

```json
{
  "id": "0f85aa1c-711e-4873-95b6-e441c291537d",
  "action": "create",
  "title": "Titre du Message de Test",
  "message": "Corps du Message de Test",
  "server": "blue-ranger-2"
}
```

### Manipulation des En-têtes

Certains utilisateurs peuvent avoir besoin d'en-tetes HTTP speciaux lors de l'envoi de leurs donnees a PagerTree. Pour cela, il suffit d'ajouter un symbole plus, **+**, devant n'importe quel parametre defini dans votre URL. C'est utile lorsque vous exploitez la fonctionnalite [PagerTree Token](https://pagertree.com/docs/integration-guides/webhook#integration-options).

```bash
# L'exemple ci-dessous definirait l'en-tete :
#    pagertree-token: abcdefg
#
# Supposons que notre {integration_id} soit int_xxxxxxxxxx
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pagertree://int_xxxxxxxxxx?+pagertree-token=abcdefg"

```

### Manipulation des Métadonnées

Certaines fonctionnalites de PagerTree, comme les incidents, se trouvent dans la propriete `meta` du payload. Pour ajouter des donnees dans `meta`, il suffit de prefixer vos entrees avec le symbole moins, `-`. [Voir l'exemple.](https://pagertree.com/docs/integration-guides/webhook#example-request-2)

```bash
# Indiquer a PagerTree que cette alerte doit etre marquee comme incident
# Le symbole `-` sera retire lors de l'envoi en amont
# Apprise sait qu'il ne doit pas traiter cet argument et qu'il doit le transmettre tel quel.
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "pagertree://int_xxxxxxxxxx?-incident=true&-incident_severity=SEV-1&-incident_message=Join the war room"
```
