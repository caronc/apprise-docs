---
title: "Notifications Custom JSON"
description: "Envoyer des notifications HTML/JSON."
sidebar:
  label: "HTTP/JSON"
group: "custom"
schemas:
  - json: insecure
  - jsons
has_selfhosted: true
has_attachments: true
has_image: true

body_formats:
  - text
  - html
  - markdown

sample_urls:
  - json://{hostname}
  - jsons://{hostname}:{port}
  - jsons://{user}:@{hostname}
  - json://{user}:@{hostname}:{port}
  - jsons://{user}:{password}@{hostname}
  - json://{user}:{password}@{hostname}:{port}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Introduction

Il s'agit simplement d'une notification personnalisee qui permet a cet outil de publier vers un serveur web sous la forme d'une simple chaine JSON. C'est utile pour les personnes qui souhaitent etre notifiees via leurs propres methodes personnalisees.

Le format peut ressembler a ceci :

```json
{
  "version": "1.0",
  "title": "Some Great Software Downloaded Successfully",
  "message": "Plenty of details here",
  "type": "info"
}
```

Le _type_ prendra l'une des valeurs suivantes :

- **info** : message de type informatif
- **success** : rapport de succes
- **failure** : rapport d'echec
- **warning** : avertissement

### Format du message

Le champ `message` est transmis exactement tel que vous le fournissez : ce service relaie le contenu sans le modifier et prend en charge `text`, `html` et `markdown`. Si vous ne precisez pas `?format=`, le texte brut est utilise par defaut.

## Syntaxe

La syntaxe valide est la suivante :

- `json://{hostname}`
- `json://{hostname}:{port}`
- `json://{user}:{password}@{hostname}`
- `json://{user}:{password}@{hostname}:{port}`

L'ajout d'un `s` au schema, c'est-a-dire `jsons://`, bascule vers une connexion HTTPS securisee :

- `jsons://{hostname}`
- `jsons://{hostname}:{port}`
- `jsons://{user}:{password}@{hostname}`
- `jsons://{user}:{password}@{hostname}:{port}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                         |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Nom d'hote du serveur web.                                                                                                                                                                                                          |
| port     | Non         | Port sur lequel votre serveur web ecoute. La valeur par defaut est **80** pour **json://** et **443** pour toutes les references **jsons://**.                                                                                      |
| user     | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _username_ pour vous authentifier.                                                                                                                   |
| password | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _password_ pour vous authentifier.                                                                                                                   |
| method   | Non         | Permet facultativement de preciser la methode HTTP du serveur ; les options possibles sont `post`, `put`, `get`, `delete`, `patch`, `head`, `update` et `options`. Si aucune methode n'est precisee, `post` est utilise par defaut. |
| format   | Non         | La valeur par défaut est _text_. Définissez cette valeur sur _markdown_ ou _html_ si votre point de réception attend ce format.                                                                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification JSON a notre serveur web a l'ecoute sur le port 80 :

```bash
# Supposons que notre {hostname} soit json.server.local
apprise json://json.server.local
```

### Methode HTTP

Par defaut, toutes les notifications sont envoyees en `POST`. Remplacez ce comportement avec le parametre d'URL `method` :

```bash
# Envoyer comme requete PUT
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost/?method=put"

# Envoyer comme requete DELETE
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost/?method=delete"

# Envoyer comme requete PATCH
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost/?method=patch"
```

La liste complete des methodes prises en charge est : `post`, par defaut, `get`, `put`, `delete`, `patch`, `head`, `update` et `options`.

> **Remarque :** lorsque `method=get` est utilise, le corps JSON est tout de meme envoye comme corps de requete. Pour transmettre les parametres a la place sous forme de chaine de requete dans l'URL, utilisez le prefixe `-`, voir [Manipulation des Parametres GET](#manipulation-des-parametres-get) ci-dessous.

### Manipulation de la Charge Utile

L'utilisation de `:` dans l'URL Apprise vous permet de modifier et d'ajouter du contenu a ce qui est publie en amont vers un serveur distant.

```bash
# Ajouter a la charge utile envoyee au serveur distant comme si cela
# faisait partie du message qu'Apprise aurait autrement prepare
#
# Supposons que notre {hostname} soit localhost
# Supposons que nous voulions inclure `"sound": "oceanwave"` dans la charge utile existante :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost/?:sound=oceanwave"
```

L'exemple ci-dessus publierait un message comme celui-ci :

```json
{
  "version": "1.0",
  "title": "Titre du Message de Test",
  "message": "Corps du Message de Test",
  "type": "info",
  "sound": "oceanwave"
}
```

Vous pouvez aussi supprimer des entrees en definissant leur valeur comme vide :

```bash
# Vider version et type de la charge utile :
# Supposons que notre {hostname} soit localhost
# Supposons que nous voulions retirer version et type de la sortie :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost/?:version&:type"
```

L'exemple ci-dessus publierait un message comme celui-ci :

```json
{
  "title": "Titre du Message de Test",
  "message": "Corps du Message de Test"
}
```

Enfin, vous pouvez remapper des valeurs, par exemple en envoyant le message dans une cle `body` a la place :

```bash
# Ajouter a la charge utile envoyee au serveur distant comme si cela
# faisait partie du message qu'Apprise aurait autrement prepare
#
# Supposons que notre {hostname} soit localhost
# Supposons que nous voulions remapper la section message vers body :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost/?:message=body"
```

L'exemple ci-dessus publierait un message comme celui-ci :

```json
{
  "version": "1.0",
  "title": "Titre du Message de Test",
  "body": "Corps du Message de Test",
  "type": "info"
}
```

### Manipulation des en-tetes

Certains utilisateurs peuvent avoir besoin d'en-tetes HTTP speciaux lors de l'envoi de leurs donnees vers leur serveur. Pour cela, il suffit d'ajouter un symbole plus, **+**, devant n'importe quel parametre precise dans votre URL.

```bash
# L'exemple ci-dessous definirait l'en-tete :
#    X-Token: abcdefg
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost:8080/path/?+X-Token=abcdefg"

# Pour plusieurs en-tetes, il suffit d'ajouter plus d'entrees :
# L'exemple ci-dessous definirait les en-tetes :
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost:8080/path/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

### Manipulation des Parametres GET

Certains utilisateurs peuvent avoir besoin que des parametres GET fassent partie de leur POST. Tous les parametres que vous passez a la ligne de commande Apprise sont interpretes par Apprise lui-meme comme des options ou actions a executer, comme `method=update` ou `cto=3`. Pour qu'Apprise ignore ce qui a ete precise et transmette le contenu tel quel en amont, il suffit de prefixer vos entrees avec un symbole moins, `-`.

```bash
# L'exemple ci-dessous publierait vers http://localhost:8000?token=abcdefg
#
# Le symbole `-` sera retire lors de l'envoi en amont
# Apprise sait qu'il ne doit pas traiter cet argument et qu'il doit le transmettre tel quel.
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "json://localhost:8080/?-token=abcdefg"

# Si vous voulez transmettre plus d'un element, il suffit de les enchainer :
# L'exemple ci-dessous enverrait un POST vers :
#  https://example.ca/my/path?key1=value1&key2=value2
#
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "jsons://example.ca/my/path?-key1=value1&-key2=value2"
```
