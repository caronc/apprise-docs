---
title: "Notifications Jira"
description: "Envoyer des notifications Jira."
sidebar:
  label: "Jira"

source: https://atlassian.com/

schemas:
  - jira

sample_urls:
  - jira://{apikey}
  - jira://{apikey}/@{user}
  - jira://{apikey}/*{schedule}
  - jira://{apikey}/^{escalation}
  - jira://{apikey}/#{team}

limits:
  max_chars: 15000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Rendez-vous sur <https://atlassian.com/> pour creer votre compte.
1. Generez votre cle API d'integration.

## Syntaxe

La syntaxe valide est la suivante :

- `jira://{apikey}/`
- `jira://{apikey}/@{user}`
- `jira://{apikey}/@{user1}/@{user2}/@{userN}`
- `jira://{apikey}/*{schedule}`
- `jira://{apikey}/*{schedule1}/*{schedule2}/*{scheduleN}`
- `jira://{apikey}/^{escalation}`
- `jira://{apikey}/^{escalation1}/^{escalation2}/^{escalationN}`
- `jira://{apikey}/#{team}`
- `jira://{apikey}/#{team1}/#{team2}/#{teamN}`

:::note
Si aucun caractere de prefixe n'est precise, la cible est presumee etre un utilisateur, c'est-a-dire qu'un symbole `@` est suppose se trouver devant.
:::

Vous pouvez aussi melanger les cibles :

- `jira://{apikey}/@{user}/#{team}/*{schedule}/^{escalation}`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                 |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Oui         | Cle API associee a votre compte Jira.                                                                                                                                                                                                       |
| user       | Non         | Utilisateur a notifier ; il peut s'agir d'un `username`, d'un `email` ou d'un `uuid4`. C'est le type de cible suppose par defaut, mais il est recommande de prefixer tous les utilisateurs avec le symbole `@` pour eviter toute ambiguite. |
| team       | Non         | Equipe a notifier ; il peut s'agir du nom de l'equipe elle-meme ou d'un `uuid4` qui lui est associe. <br>**Remarque :** les equipes doivent etre prefixees par un symbole `#`.                                                              |
| schedule   | Non         | Planning a notifier ; il peut s'agir du nom du planning lui-meme ou d'un `uuid4` qui lui est associe. <br>**Remarque :** les plannings doivent etre prefixes par un symbole `*`.                                                            |
| escalation | Non         | Escalade a notifier ; il peut s'agir du nom de l'escalade elle-meme ou d'un `uuid4` qui lui est associe. <br>**Remarque :** les escalades doivent etre prefixees par un symbole `^`.                                                        |
| region     | Non         | Code region a 2 caracteres. Par defaut, la valeur `us` est utilisee si rien n'est precise. Les utilisateurs europeens doivent definir cette valeur sur `eu` pour que cela fonctionne correctement.                                          |
| batch      | Non         | Definissez cette valeur sur **Yes** si vous souhaitez notifier toutes les cibles identifiees en lot, au lieu de maniere individuelle. Par defaut, cette option est definie sur **No**.                                                      |
| tags       | Non         | Liste de tags separes par des virgules que vous pouvez associer a votre message Jira.                                                                                                                                                       |
| priority   | Non         | Priorite a associer au message. Elle se situe sur une echelle de 1 a 5. La valeur par defaut est `3` si rien n'est precise.                                                                                                                 |
| alias      | Non         | Alias a associer au message.                                                                                                                                                                                                                |
| entity     | Non         | Entite a associer au message.                                                                                                                                                                                                               |
| action     | Non         | Action a effectuer. Voir [Actions d'Alerte](#actions-dalerte) ci-dessous. Par defaut, cette valeur est `map`.                                                                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Actions d'Alerte

Le parametre `action` controle l'operation Jira effectuee lorsqu'une notification est envoyee. Les actions suivantes sont prises en charge :

| Action        | Description                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `map`         | **par defaut** choisit automatiquement une action selon le type de notification Apprise. Voir le tableau ci-dessous.   |
| `new`         | Cree toujours une nouvelle alerte, quel que soit le type de notification.                                              |
| `close`       | Ferme une alerte precedemment ouverte, exige un identifiant de requete stocke a partir d'une action `new`.             |
| `acknowledge` | Acquitte une alerte precedemment ouverte, exige un identifiant de requete stocke a partir d'une action `new`.          |
| `note`        | Ajoute une note a une alerte precedemment ouverte, exige un identifiant de requete stocke a partir d'une action `new`. |
| `delete`      | Supprime une alerte precedemment ouverte, exige un identifiant de requete stocke a partir d'une action `new`.          |

Lorsque `action=map`, valeur par defaut, la correspondance suivante est appliquee :

| Type Apprise | Action par Defaut | Raison                                                      |
| ------------ | ----------------- | ----------------------------------------------------------- |
| `failure`    | `new`             | Quelque chose a mal tourne, ouvrir une nouvelle alerte.     |
| `warning`    | `new`             | Quelque chose peut mal tourner, ouvrir une nouvelle alerte. |
| `success`    | `close`           | Probleme resolu, fermer l'alerte associee.                  |
| `info`       | `note`            | Contexte informatif, annoter une alerte existante.          |

:::note
Les actions autres que `new` exigent un identifiant de requete stocke a partir d'une notification `new` precedente avec le meme `entity`, `alias` ou titre. Apprise met automatiquement ces identifiants en cache pendant 60 jours maximum.
:::

### Mappage d'Action Personnalise

Vous pouvez remplacer la correspondance type-vers-action par defaut en utilisant des parametres d'URL `:key=value` :

- `jira://{apikey}/?:failure=new&:warning=new&:success=close&:info=note`

Par exemple, pour faire en sorte que les notifications `info` creent une nouvelle alerte au lieu d'ajouter une note :

```bash
apprise -vv -t "Test Title" -b "Test Body" \
   "jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?:info=new"
```

## Exemples

Envoyer une notification Jira a tous les appareils associes a un projet :

```bash
# Supposons que notre {apikey} soit a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
```

### Inclure des Détails (Paires Clé/Valeur)

Jira vous permet de fournir des details composes de paires cle/valeur que vous pouvez definir avec vos messages. Pour cela, il suffit d'ajouter un symbole plus, **+**, devant n'importe quel parametre precise dans votre URL.

```bash
# L'exemple ci-dessous definirait la paire cle/valeur foo=bar :
# Supposons que notre {apikey} soit a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?+foo=bar"

# Pour plusieurs paires cle/valeur, il suffit d'ajouter plus d'entrees :
# L'exemple ci-dessous definirait les paires suivantes :
#    foo=bar
#    apprise=awesome
#
# Supposons que notre {apikey} soit a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jira://a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty/?+foo=bar&+apprise=awesome"
```
