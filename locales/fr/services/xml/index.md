---
title: "Notifications Custom XML"
description: "Envoyer des notifications basées sur HTML/XML."
sidebar:
  label: "HTTP/XML"
group: "custom"
schemas:
  - xml: insecure
  - xmls
has_selfhosted: true
has_attachments: true
has_image: true

body_formats:
  - text: default
  - html
  - markdown

sample_urls:
  - xmls://{hostname}
  - xml://{hostname}:{port}
  - xml://{user}:@{hostname}
  - xmls://{user}:@{hostname}:{port}
  - xml://{user}:{password}@{hostname}
  - xmls://{user}:{password}@{hostname}:{port}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Introduction

Il s'agit d'une notification personnalisée qui permet à cet outil de publier vers un serveur Web sous forme d'une simple chaîne XML. Cela est utile pour ceux qui souhaitent être notifiés via leurs propres méthodes personnalisées.

Le format pourrait ressembler à ceci :

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Corps du Message>
        <Notification xmlns:xsi="http://nzbget.lead2gold.org/notify/NotifyXML-1.0.xsd">
            <Version>1.0</Version>
            <Subject>What A Great Movie Downloaded Successfully</Subject>
            <MessageType>info</MessageType>
            <Message>Plenty of details here...</Message>
       </Notification>
    </soapenv:Corps du Message>
</soapenv:Envelope>
```

Le champ _MessageType_ sera l'une des valeurs suivantes :

- **info** : Un message de type informatif
- **success** : Un rapport de succès
- **failure** : Un rapport d'échec
- **warning** : Un rapport d'avertissement

### Format du message

Le champ `Message` est transmis exactement tel que vous le fournissez : ce service relaie le contenu sans le modifier et prend en charge `text`, `html` et `markdown`. Si vous ne précisez pas `?format=`, le texte brut est utilisé par défaut.

## Syntaxe

La syntaxe valide est la suivante :

- `xml://{hostname}`
- `xml://{hostname}:{port}`
- `xml://{user}:{password}@{hostname}`
- `xml://{user}:{password}@{hostname}:{port}`

L'ajout d'un `s` au schéma (c'est-à-dire `xmls://`) bascule vers une connexion HTTPS sécurisée :

- `xmls://{hostname}`
- `xmls://{hostname}:{port}`
- `xmls://{user}:{password}@{hostname}`
- `xmls://{user}:{password}@{hostname}:{port}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                 |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui    | Le nom d'hôte du serveur Web                                                                                                                                                                                                |
| port     | Non    | Le port sur lequel notre serveur Web est en écoute. Par défaut, le port est **80** pour **xml://** et **443** pour toutes les références **xmls://**.                                                                       |
| user     | Non    | Si votre système est configuré pour utiliser HTTP-AUTH, vous pouvez fournir le _nom d'utilisateur_ pour l'authentification.                                                                                                 |
| password | Non    | Si votre système est configuré pour utiliser HTTP-AUTH, vous pouvez fournir le _mot de passe_ pour l'authentification.                                                                                                      |
| method   | Non    | Spécifier éventuellement la méthode HTTP du serveur ; les options possibles sont `post`, `put`, `get`, `delete`, `patch`, `head`, `update` et `options`. Par défaut, si aucune méthode n'est spécifiée, `post` est utilisé. |
| format   | Non    | La valeur par défaut est _text_. Définissez cette valeur sur _markdown_ ou _html_ si votre point de réception attend ce format.                                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification XML à notre serveur Web en écoute sur le port 80 :

```bash
# Assuming our {hostname} is xml.server.local
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   xml://xml.server.local
```

### Méthode HTTP

Par défaut, toutes les notifications sont envoyées en tant que requête `POST`. Modifiez ce comportement avec le paramètre URL `method` :

```bash
# Send as a PUT request
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost/?method=put"

# Send as a DELETE request
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost/?method=delete"

# Send as a PATCH request
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost/?method=patch"
```

La liste complète des méthodes prises en charge est : `post` (par défaut), `get`, `put`, `delete`, `patch`, `head`, `update` et `options`.

> **Remarque :** Lorsque `method=get` est utilisé, le corps XML est toujours envoyé en tant que corps de la requête. Pour transmettre des paramètres sous forme de chaînes de requête URL, utilisez le préfixe `-` (voir [Manipulation des Paramètres GET](#manipulation-des-paramètres-get) ci-dessous).

### Manipulation de la Charge Utile

L'utilisation du `:` dans l'URL Apprise vous permet de modifier et d'ajouter du contenu publié en amont vers un serveur distant.

> **Remarque :** Les noms d'éléments XML doivent être des identifiants valides. Tout caractère en dehors de `[A-Za-z0-9_-]` est automatiquement supprimé du nom `:key`.

```bash
# Add to the payload delivered to the remote server as if it was part
# the prepared message Apprise would have otherwise put together
#
# Assuming our {hostname} is localhost
# Assuming we want to include "Sound": "oceanwave" as part of the existing payload:
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost/?:Sound=oceanwave"
```

Ce qui précède publierait un message tel que :

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Corps du Message>
        <Notification xmlns:xsi="http://nzbget.lead2gold.org/notify/NotifyXML-1.0.xsd">
            <Version>1.0</Version>
            <Subject>Titre du Message de Test</Subject>
            <MessageType>info</MessageType>
            <Message>Corps du Message de Test</Message>
            <Sound>oceanwave</Sound>
       </Notification>
    </soapenv:Corps du Message>
</soapenv:Envelope>
```

Vous pouvez également supprimer des éléments intégrés de la sortie en définissant leur valeur à vide :

```bash
# Remove the Version and MessageType elements from the payload:
# Assuming our {hostname} is localhost
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost/?:Version&:MessageType"
```

Ce qui précède publierait un message tel que :

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Corps du Message>
        <Notification>
            <Subject>Titre du Message de Test</Subject>
            <Message>Corps du Message de Test</Message>
       </Notification>
    </soapenv:Corps du Message>
</soapenv:Envelope>
```

> **Remarque :** Lorsqu'une personnalisation de la charge utile est appliquée (ajout, suppression ou remappage d'éléments), l'attribut d'espace de noms XSD est omis de l'élément `<Notification>`.

Enfin, vous pouvez remapper un élément intégré vers un nom de balise différent :

```bash
# Remap "Message" to "Corps du Message" and "Subject" to "Title":
# Assuming our {hostname} is localhost
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost/?:Message=Corps du Message&:Subject=Title"
```

Ce qui précède publierait un message tel que :

```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Corps du Message>
        <Notification>
            <Version>1.0</Version>
            <Title>Titre du Message de Test</Title>
            <MessageType>info</MessageType>
            <Corps du Message>Corps du Message de Test</Corps du Message>
       </Notification>
    </soapenv:Corps du Message>
</soapenv:Envelope>
```

### Manipulation des En-têtes

Certains utilisateurs peuvent avoir besoin que des en-têtes HTTP spéciaux soient présents lors de la publication de leurs données vers leur serveur. Cela peut être accompli en plaçant simplement un symbole plus (**+**) devant tout paramètre que vous spécifiez dans votre chaîne URL.

```bash
# Below would set the header:
#    X-Token: abcdefg
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost:8080/path/?+X-Token=abcdefg"

# Multiple headers just require more entries defined:
# Below would set the headers:
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Assuming our {hostname} is localhost
# Assuming our {port} is 8080
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost:8080/path/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

### Manipulation des Paramètres GET

Certains utilisateurs peuvent avoir besoin que des paramètres GET fassent partie de leur requête POST. Tout paramètre que vous transmettez sur la ligne de commande Apprise est interprété par Apprise lui-même comme des options/actions que vous souhaitez effectuer (comme changer `method=update` ou `cto=3`). Pour qu'Apprise ignore ce qui a été spécifié et transmette le contenu `tel quel` en amont, il vous suffit de préfixer vos entrées d'un symbole moins (`-`).

```bash
# The below for example would post to http://localhost:8000?token=abcdefg
#
# The `-` symbol will get stripped off when the upstream post takes place
# Apprise knows not to do anything with the argument at all and pass it along as is.
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xml://localhost:8080/?-token=abcdefg"

# If you want to pass more then one element, just chain them:
# The below would send a a POST to:
#  https://example.ca/my/path?key1=value1&key2=value2
#
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xmls://example.ca/my/path?-key1=value1&-key2=value2"
```
