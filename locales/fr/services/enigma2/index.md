---
title: "Notifications Enigma2"
description: "Envoyer des notifications Enigma2."
sidebar:
  label: "Enigma2"

schemas:
  - enigma2: insecure
  - enigma2s

has_selfhosted: true

sample_urls:
  - enigma2://{host}
  - enigma2s://{host}/{fullpath}
  - enigma2://{user}@{host}
  - enigma2s://{user}@{host}:{port}
  - enigma2://{user}:{password}@{host}

limits:
  max_chars: 1000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Un [_E2OpenPlugin_](https://github.com/E2OpenPlugins) appele [OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) vous permet de communiquer avec vos appareils Enigma2, comme [Dreambox](http://www.dream-multimedia-tv.de/), [Vu+](http://www.vuplus.com), etc., a l'aide d'une API.

Une fois [OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) installe, Apprise peut utiliser son API pour envoyer des notifications a votre appareil Enigma2.

Les instructions d'installation d'OpenWebif sur votre appareil Enigma2 sont disponibles sur sa [page GitHub](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif).

## Syntaxe

La syntaxe valide est la suivante :

- `enigma2://{host}`
- `enigma2://{host}/{fullpath}`
- `enigma2://{host}:{port}`
- `enigma2://{host}:{port}/{fullpath}`
- `enigma2://{user}@{host}`
- `enigma2://{user}@{host}/{fullpath}`
- `enigma2://{user}@{host}:{port}`
- `enigma2://{user}@{host}:{port}/{fullpath}`
- `enigma2://{user}:{password}@{host}`
- `enigma2://{user}:{password}@{host}/{fullpath}`
- `enigma2://{user}:{password}@{host}:{port}`
- `enigma2://{user}:{password}@{host}:{port}/{fullpath}`
- `enigma2s://{host}`
- `enigma2s://{host}/{fullpath}`
- `enigma2s://{host}:{port}`
- `enigma2s://{host}:{port}/{fullpath}`
- `enigma2s://{user}@{host}`
- `enigma2s://{user}@{host}/{fullpath}`
- `enigma2s://{user}@{host}:{port}`
- `enigma2s://{user}@{host}:{port}/{fullpath}`
- `enigma2s://{user}:{password}@{host}`
- `enigma2s://{user}:{password}@{host}/{fullpath}`
- `enigma2s://{user}:{password}@{host}:{port}`
- `enigma2s://{user}:{password}@{host}:{port}/{fullpath}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                          |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Adresse IP ou nom d'hote de l'appareil Enigma2.                                                                                                      |
| port     | Non         | Port sur lequel votre serveur web ecoute. La valeur par defaut est **80** pour **enigma2://** et **443** pour toutes les references **enigma2s://**. |
| user     | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _username_ pour vous authentifier.                                    |
| password | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _password_ pour vous authentifier.                                    |
| timeout  | Non         | Nombre de secondes pendant lesquelles la notification envoyee reste affichee a l'ecran. La valeur par defaut est 13.                                 |
| fullpath | Non         | Les personnes hebergeant ce service en interne peuvent souhaiter preciser le chemin, prefixe, sur lequel il ecoute.                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification a notre appareil Enigma2 :

```bash
# Supposons que notre {hostname} soit dreambox
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   enigma2://dreambox

# Si votre service est heberge sous /enigma2, l'exemple suivant peut gerer cela :
# Supposons que notre {hostname} soit dreambox
# Supposons que notre {fullpath} soit /enigma2

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "enigma2://dreambox/enigma2"

```

### Manipulation des en-tetes

Certains utilisateurs peuvent avoir besoin d'en-tetes HTTP speciaux lors de l'envoi de leurs donnees vers leur serveur. Pour cela, il suffit d'ajouter un symbole moins, **-**, devant n'importe quel parametre precise dans votre URL.

```bash
# L'exemple ci-dessous definirait l'en-tete :
#    X-Token: abcdefg
#
# Supposons que notre {hostname} soit vu-device
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "enigma2://localhost/?-X-Token=abcdefg"

# Pour plusieurs en-tetes, il suffit d'ajouter plus d'entrees precedees d'un symbole moins :
# L'exemple ci-dessous definirait les en-tetes :
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Supposons que notre {hostname} soit localhost
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "enigma2://localhost/path/?-X-Token=abcdefg&-X-Apprise=is%20great"
```
