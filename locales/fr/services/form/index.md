---
title: "Notifications Custom FORM"
description: "Envoyer des notifications HTML/Form."
sidebar:
  label: "HTTP/Form"
group: "custom"
schemas:
  - form: insecure
  - forms
has_selfhosted: true
has_attachments: true
has_image: true

body_formats:
  - text: default
  - html
  - markdown

sample_urls:
  - form://{hostname}
  - forms://{hostname}:{port}
  - forms://{user}:@{hostname}
  - form://{user}:@{hostname}:{port}
  - forms://{user}:{password}@{hostname}
  - form://{user}:{password}@{hostname}:{port}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Introduction

Il s'agit simplement d'une notification personnalisee permettant a cet outil de publier vers un serveur web sous la forme d'un simple FORM, `application/x-www-form-urlencoded`. C'est utile pour les personnes qui souhaitent etre notifiees via leurs propres methodes personnalisees.

La charge utile inclura `body`, `title`, `version` et `type` dans la requete. Vous pouvez en ajouter d'autres, voir les details ci-dessous.

Le _type_ prendra l'une des valeurs suivantes :

- **info** : message de type informatif
- **success** : rapport de succes
- **failure** : rapport d'echec
- **warning** : avertissement

### Format du message

Le champ `message` est transmis exactement tel que vous le fournissez : ce service relaie le contenu sans le modifier et prend en charge `text`, `html` et `markdown`. Si vous ne precisez pas `?format=`, le texte brut est utilise par defaut.

## Syntaxe

La syntaxe valide est la suivante :

- `form://{hostname}`
- `form://{hostname}:{port}`
- `form://{user}:@{hostname}`
- `form://{user}:@{hostname}:{port}`
- `form://{user}:{password}@{hostname}`
- `form://{user}:{password}@{hostname}:{port}`

L'ajout d'un `s` au schema, c'est-a-dire `forms://`, bascule vers une connexion HTTPS securisee :

- `forms://{hostname}`
- `forms://{hostname}:{port}`
- `forms://{user}:@{hostname}`
- `forms://{user}:@{hostname}:{port}`
- `forms://{user}:{password}@{hostname}`
- `forms://{user}:{password}@{hostname}:{port}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname  | Oui         | Nom d'hote du serveur web.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| port      | Non         | Port sur lequel votre serveur web ecoute. La valeur par defaut est **80** pour **form://** et **443** pour toutes les references **forms://**.                                                                                                                                                                                                                                                                                                                                                                                                |
| user      | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _username_ pour vous authentifier.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| password  | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _password_ pour vous authentifier.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| method    | Non         | Permet facultativement de preciser la methode HTTP du serveur ; les options possibles sont `post`, `put`, `get`, `delete`, `patch`, `head`, `update` et `options`. Si aucune methode n'est precisee, `post` est utilise par defaut.                                                                                                                                                                                                                                                                                                           |
| format    | Non         | La valeur par défaut est _text_. Définissez cette valeur sur _markdown_ ou _html_ si votre point de réception attend ce format.                                                                                                                                                                                                                                                                                                                                                                                                               |
| attach-as | Non         | Permet facultativement de remplacer le nom meta du fichier lorsqu'il y a des pieces jointes. Par defaut, chaque piece jointe est publiee sous `file01`, `file02`, etc. Il existe des cas d'usage ou le point de terminaison distant attend un nom meta precis, c'est-a-dire le champ sous lequel le fichier apparait dans la requete HTTP, comme `document`. Utilisez cette surcharge pour obtenir ce comportement. Utilisez aussi le caractere `*` pour autoriser la numerotation. Ainsi `?attach-as=meta*` donnera `meta01`, `meta02`, etc. |

**Remarque :** si vous incluez des pieces jointes, elles sont toutes concatenees dans une seule publication vers le serveur amont. Dans ce cas, l'en-tete `Content-Type` passe aussi de `application/x-www-form-urlencoded` a `multipart/form-data`.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une requete web FORM a notre serveur web a l'ecoute sur le port 80 :

```bash
# Supposons que notre {hostname} soit my.server.local
apprise form://my.server.local
```

### Methode HTTP

Par defaut, toutes les notifications sont envoyees en `POST`. Remplacez ce comportement avec le parametre d'URL `method` :

```bash
# Envoyer comme requete PUT
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost/?method=put"

# Envoyer comme requete DELETE
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost/?method=delete"

# Envoyer comme requete PATCH
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost/?method=patch"
```

La liste complete des methodes prises en charge est : `post`, par defaut, `get`, `put`, `delete`, `patch`, `head`, `update` et `options`.

> **Remarque :** lorsque `method=get` est utilise, les champs de charge utile du formulaire, `version`, `title`, `message`, `type`, sont ajoutes comme parametres de requete dans l'URL au lieu d'etre envoyes dans le corps de la requete. L'en-tete `Content-Type` n'est pas defini pour les requetes GET. Les pieces jointes ne sont pas compatibles avec GET.

### Manipulation de la Charge Utile

L'utilisation de `:` dans l'URL Apprise vous permet de modifier et d'ajouter des champs au formulaire publie en amont vers un serveur distant.

```bash
# Ajouter a la charge utile envoyee au serveur distant comme si cela
# faisait partie du message qu'Apprise aurait autrement prepare
#
# Supposons que notre {hostname} soit localhost
# Supposons que nous voulions inclure "sound=oceanwave" dans la charge utile existante :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost/?:sound=oceanwave"
```

L'exemple ci-dessus effectuerait un POST avec les champs de formulaire suivants :

```text
version=1.0
title=Titre du Message de Test
message=Corps du Message de Test
type=info
sound=oceanwave
```

Vous pouvez aussi supprimer les champs integres en definissant leur valeur comme vide :

```bash
# Supprimer version et type de la charge utile :
# Supposons que notre {hostname} soit localhost
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost/?:version&:type"
```

L'exemple ci-dessus publierait :

```text
title=Titre du Message de Test
message=Corps du Message de Test
```

Enfin, vous pouvez remapper un champ integre vers un nom de cle different :

```bash
# Remapper le champ "message" vers "body" :
# Supposons que notre {hostname} soit localhost
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost/?:message=body"
```

L'exemple ci-dessus publierait :

```text
version=1.0
title=Titre du Message de Test
body=Corps du Message de Test
type=info
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
   "form://localhost:8080/path/?+X-Token=abcdefg"

# Pour plusieurs en-tetes, il suffit d'ajouter plus d'entrees :
# L'exemple ci-dessous definirait les en-tetes :
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Supposons que notre {hostname} soit localhost
# Supposons que notre {port} soit 8080
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost:8080/path/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

### Manipulation des Parametres GET

Certains utilisateurs peuvent avoir besoin que des parametres GET fassent partie de leur POST. Tous les parametres que vous passez a la ligne de commande Apprise sont interpretes par Apprise lui-meme comme des options ou actions a executer, comme `method=update` ou `cto=3`. Pour qu'Apprise ignore ce qui a ete precise et transmette le contenu tel quel en amont, il suffit de prefixer vos entrees avec un symbole moins, `-`.

```bash
# L'exemple ci-dessous publierait vers http://localhost:8000?token=abcdefg
#
# Le symbole `-` sera retire lors de l'envoi en amont
# Apprise sait qu'il ne doit pas traiter cet argument et qu'il doit le transmettre tel quel.
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "form://localhost:8080/?-token=abcdefg"

# Si vous voulez transmettre plus d'un element, il suffit de les enchainer :
# L'exemple ci-dessous enverrait un POST vers :
#  https://example.ca/my/path?key1=value1&key2=value2
#
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "forms://example.ca/my/path?-key1=value1&-key2=value2"
```

### Options de Surcharge `attach-as`

Cette section detaille davantage l'option de surcharge `?attach-as=`.

Ajoutez-la simplement a l'URL, par exemple :

```bash
# appliquer la surcharge de `file{:02d}` vers `document`
bin/apprise -vvvv 'forms://webhook.site/<webhook>?attach-as=document' \
   --attach test/var/apprise-test.png -b test
```

Pour prendre en charge d'autres variantes, vous pouvez faire :

```bash
# Definir l'objet tableau de fichiers dans la requete comme `{:02d}meta`
bin/apprise -vvvv 'forms://webhook.site/<webhook>?attach-as=*meta' \
   --attach test/var/apprise-test.png -b test

# Definir l'objet tableau de fichiers dans la requete comme `meta{:02d}`
bin/apprise -vvvv 'forms://webhook.site/<webhook>?attach-as=meta*' \
   --attach test/var/apprise-test.png -b test

# Definir l'objet tableau de fichiers dans la requete comme `meta{:02d}file`
bin/apprise -vvvv 'forms://webhook.site/<webhook>?attach-as=meta*file' \
   --attach test/var/apprise-test.png -b test
```
