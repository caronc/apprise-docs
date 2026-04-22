---
title: "Notifications MSG91"
description: "Envoyer des notifications MSG91."
sidebar:
  label: "MSG91"

source: https://msg91.com

schemas:
  - msg91

has_sms: true

sample_urls:
  - msg91://{TemplateID}@{AuthKey}/{PhoneNo}
  - msg91://{TemplateID}@{AuthKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser MSG91, vous devez obtenir votre _Clé d'Authentification_. Celle-ci est accessible via le [Tableau de Bord MSG91](https://control.msg91.com). De plus, vous devrez préparer un modèle et lui assigner des variables `body`, `title` et `type` afin qu'Apprise puisse y relayer ses informations.

## Syntaxe

La syntaxe valide est la suivante :

- `msg91://{TemplateID}@{AuthKey}/{PhoneNo}`
- `msg91://{TemplateID}@{AuthKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                                                     |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AuthKey    | Oui    | La _Clé d'Authentification_ associée à votre compte MSG91. Disponible via le [Tableau de Bord MSG91](https://control.msg91.com/).                                                                               |
| TemplateID | Oui    | L'_Identifiant de Modèle_ associé à votre compte MSG91. Disponible via le [Tableau de Bord MSG91](https://control.msg91.com/).                                                                                  |
| PhoneNo    | Oui    | Un numéro de téléphone DOIT inclure le préfixe d'appel international du pays. Ce champ est très flexible et accepte les parenthèses, espaces et tirets si vous souhaitez formater le numéro de manière lisible. |
| short_url  | Non    | Un booléen (par défaut `Non`) indiquant si les messages SMS doivent utiliser la notation URL courte.                                                                                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

### Variables de Modèle

Les modèles que vous générez vous permettent de définir vos propres correspondances de clés.

Les clés suivantes sont automatiquement transmises par Apprise au système de modèles MSG91, que vous choisissiez de les utiliser ou non.

- `##body##` : Le corps du message Apprise (le titre y est préfixé s'il est défini)
- `##type##` : Le type de message Apprise (par exemple `warning`, `info`, `failure` ou `success`)

Si vous souhaitez assigner de nouveaux types à `body` ou `type` depuis Apprise, ces mots-clés spéciaux sont spécifiés avec le préfixe `:` (deux-points) pour effectuer la correspondance/substitution. Par exemple : `?:body=msg` remapperait le corps du message par défaut d'Apprise vers le mot-clé `msg`.

Si vous souhaitez exclure `type` de la transmission, définissez-le simplement dans l'URL sans lui assigner de valeur, comme ceci : `?:type`.

Enfin, si vous souhaitez définir vos propres arguments, définissez-les de la manière suivante : `?:key=value` assignera à `key` le contenu de `value` lors de la transmission à votre modèle.

## Exemples

Envoyer une notification MSG91 par SMS :

```bash
# Assuming our {TemplateID} is 12345
# Assuming our {AuthKey} is gank339l7jk3cjaE
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   msg91://12345@gank339l7jk3cjaE/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "msg91://12345@gank339l7jk3cjaE/1-(800) 555-1223"
```

Voici un exemple de modèle :
Envoyer une notification MSG91 par SMS :

```bash
# Assuming our {TemplateID} is 12345
# Assuming our {AuthKey} is gank339l7jk3cjaE
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
# Assuming we want to map our `body` tag (sent from Apprise to `payload` instead
# Assuming we want to make sure Apprise does not pass along the `type`
# Assuming we want to define our Foobar Inc company name as the template token `company`:
#                        - identifies as 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "msg91://12345@gank339l7jk3cjaE/18005551223?:body=payload&:type&company=Foobar%20Inc"

```
