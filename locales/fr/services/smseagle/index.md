---
title: "Notifications SMSEagle"
description: "Envoyer des notifications SMSEagle."
sidebar:
  label: "SMSEagle"

source: https://www.smseagle.eu/

schemas:
  - smseagle: insecure
  - smseagles

has_sms: true
has_attachments: true
has_selfhosted: true

sample_urls:
  - smseagle://{token}@{hostname}:{port}/{phoneNo}
  - smseagles://{token}@{hostname}:{port}/@{contact}
  - smseagle://{token}@{hostname}:{port}/#{group}

limits:
  max_chars: 1200
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Procurez-vous votre passerelle materielle SMS/MMS SMSEagle [ici](https://www.smseagle.eu). C'est depuis l'appareil que vous pourrez acceder a son interface web et configurer votre jeton d'acces.

## Syntaxe

La syntaxe valide est la suivante :

- `smseagles://{token}@{hostname}/{target}`
- `smseagles://{token}@{hostname}:{port}/{target}`

Une `target` peut etre soit un numero de telephone, soit un contact, soit, si elle est prefixee par `#`, un groupe. Les contacts sont generalement prefixes par `@`.

- `smseagles://{token}@{hostname}:{port}/{phoneNo}`
- `smseagles://{token}@{hostname}:{port}/{phoneNo1}/{phoneNo2}/{phoneNoN}`
- `smseagles://{token}@{hostname}:{port}/@{contact}`
- `smseagles://{token}@{hostname}:{port}/@{contact1}/@{contact2}/@{contactN}`
- `smseagles://{token}@{hostname}:{port}/#{group}`
- `smseagles://{token}@{hostname}:{port}/#{group1}/#{group2}/#{groupN}`

**Remarque :** si vous choisissez d'utiliser des groupes, assurez-vous que le groupe est defini comme **Public**, sinon cela ne fonctionnera pas via l'API.
![image](./images/188493684-1d023e26-53f1-4813-87ec-e4a96e0e5a98.png)

Vous pouvez aussi melanger les formats :

- `smseagles://{token}@{hostname}:{port}/{to_phone1}/3@{group1}/@{contact1}`

Pour lever toute ambiguite, si vous ne fournissez pas un numero de telephone valide et que la valeur analysee ne commence ni par `#` ni par `@`, elle sera interpretee comme un contact.

`smseagle://` utilise le port 80, sans chiffrement, tandis que `smseagles://` securise la connexion et utilise par defaut le port 443.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                       |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Nom d'hote associe a votre appliance et/ou compte SMSEagle.                                                                                                       |
| token    | Oui         | Jeton d'acces genere et associe a votre compte SMSEagle.                                                                                                          |
| port     | Non         | Port sur lequel votre serveur web ecoute. La valeur par defaut est **80** pour **smseagle://** et **443** pour toutes les references **smseagles://**.            |
| target   | Oui         | Numero de telephone, groupe et/ou contact auquel vous souhaitez envoyer votre notification.                                                                       |
| batch    | Non         | Envoie plusieurs notifications precisees dans un seul lot, soit une seule publication vers le serveur distant. Par defaut, cette option vaut `no`.                |
| test     | Non         | Execute l'envoi en mode test SMSEagle. Par defaut, cette option vaut `No`.                                                                                        |
| flash    | Non         | Envoie le message comme SMS Flash. Par defaut, cette option vaut `No`.                                                                                            |
| priority | Non         | Peut etre defini sur `normal` ou `high`. Si rien n'est precise, la valeur par defaut est `normal`.                                                                |
| status   | Non         | Permet facultativement d'inclure une petite chaine ASCII representant l'etat de la notification envoyee, integree au message. Par defaut, cette option vaut `no`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification SMSEagle :

```bash
# Supposons que notre {AccessToken} soit abcd123
# Supposons que le {Hostname} de notre appliance SMSEagle soit smseagle.example.com
# Supposons que nous voulions notifier 555221237 et +18005551234
# Testez avec la commande suivante :
apprise -t "Titre de Test" -b "Message de Test" \
 smseagle://abcd123@smseagle.example.com/555221237/+18005551234

```

Les notifications SMSEagle prennent aussi en charge les pieces jointes, images uniquement :

```bash
# Les pieces jointes sont egalement prises en charge :
apprise -t "Titre de Test" -b "Message de Test" \
 smseagle://abcd123@smseagle.example.com/555221237/+18005551234 \
 --attach /path/to/image.png
```
