---
title: "Notifications Notica"
description: "Envoyer des notifications Notica."
sidebar:
  label: "Notica"

source: https://notica.us/

schemas:
  - notica

sample_urls:
  - notica://{host}/{token}
  - notica://{user}@{host}/{token}
  - notica://{user}@{host}:{port}/{token}
  - notica://{user}:{password}@{host}/{token}
  - notica://{user}:{password}@{host}:{port}/{token}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Notica ne vous oblige pas a creer un compte. Il vous suffit de visiter [leur site web](https://notica.us/) au moins une fois afin de :

1. recuperer votre jeton ;
2. activer les notifications du navigateur, qui seront ensuite envoyees depuis le site Notica.

Le site vous generera alors une URL de publication ressemblant a ceci :
`https://notica.us/?abc123`

Cela correspond en pratique a : `https://notica.us/?{token}`
Remarque : _ignorez le point d'interrogation dans l'URL ; il ne fait pas partie du jeton_.

A partir de la, vous avez deux possibilites : transmettre directement a Apprise l'URL Notica telle qu'elle apparait sur le site, ou la reconstruire dans le format Apprise, ce qui est legerement plus rapide a traiter : `notica://{token}`

## Syntaxe

La syntaxe valide est la suivante :

- `https://notica.us/?{token}`
- `notica://{token}`

Pour les solutions autohebergees, vous pouvez utiliser les variantes suivantes :

- `notica://{host}/{token}`
- `notica://{host}:{port}/{token}`
- `notica://{user}@{host}/{token}`
- `notica://{user}@{host}:{port}/{token}`
- `notica://{user}:{password}@{host}/{token}`
- `notica://{user}:{password}@{host}:{port}/{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                           |
| -------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui         | Jeton genere pour vous apres votre visite sur [le site web](https://notica.us/). Pour une instance autohebergee, il s'agit du jeton defini par votre propre solution. |

Une solution autohebergee prend aussi en charge quelques parametres supplementaires :

| Variable | Obligatoire | Description                                                                                                                                       |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Nom d'hote du serveur web.                                                                                                                        |
| port     | Non         | Port sur lequel votre serveur web ecoute. Par defaut, **80** est utilise pour **notica://** et **443** pour toutes les references **noticas://**. |
| user     | Non         | Si votre systeme utilise HTTP-AUTH, vous pouvez fournir le _username_ a utiliser pour l'authentification.                                         |
| password | Non         | Si votre systeme utilise HTTP-AUTH, vous pouvez fournir le _password_ a utiliser pour l'authentification.                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Notica :

```bash
# Supposons que notre {token} soit abc123

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   notica://abc123
```

### Manipulation des en-tetes

Les solutions autohebergees peuvent necessiter des en-tetes HTTP speciaux lors de l'envoi des donnees. Pour cela, il suffit d'ajouter un tiret (`-`) devant tout parametre precise dans votre URL.

```bash
# L'exemple ci-dessous definirait l'en-tete :
#    X-Token: abcdefg
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {token} soit abc123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "notica://localhost/abc123/?-X-Token=abcdefg"

# Pour plusieurs en-tetes, il suffit d'ajouter d'autres entrees prefixees par `-` :
# L'exemple ci-dessous definirait les en-tetes :
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {token} soit abc123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "notica://localhost/abc123/?-X-Token=abcdefg&-X-Apprise=is%20great"
```
