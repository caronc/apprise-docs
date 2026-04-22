---
title: "Notifications DAPNET/Hampager"
description: "Envoyer des notifications DAPNET/Hampager."
sidebar:
  label: "DAPNET/Hampager"

source: https://hampager.de/

schemas:
  - dapnet

sample_urls:
  - dapnet://{userid}:{password}@{callsign}
  - dapnet://{userid}:{password}@{callsign1}/{callsign2}/{callsignN}

limits:
  max_chars: 80
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

![apprise](./images/147219640-6ce23b59-bc12-4a30-b5f2-f4d4d2d3fd3c.jpg)

Assurez-vous d'enregistrer votre indicatif d'appel radioamateur et de creer un compte chez [Hampager](https://hampager.de).

## Syntaxe

La syntaxe valide est la suivante :

- `dapnet://{userid}:{password}@{callsign}`
- `dapnet://{userid}:{password}@{callsign1}/{callsign2}/{callsignN}/`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                                                                     |
| -------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callsign | Oui         | Un ou plusieurs indicatifs radioamateur sont requis pour envoyer une notification.                                                                                                                                                                                                                              |
| userid   | Oui         | Identifiant de connexion de votre compte [Hampager](https://hampager.de).                                                                                                                                                                                                                                       |
| password | Oui         | Mot de passe de votre compte [Hampager](https://hampager.de).                                                                                                                                                                                                                                                   |
| priority | Non         | Priorite du message ; si elle n'est pas precisee, `normal` est utilise par defaut. Les valeurs possibles sont `emergency` et `normal`.                                                                                                                                                                          |
| txgroups | Non         | Groupe(s) d'emetteurs a associer a votre message. Utilisez une virgule `,` pour en indiquer plusieurs. Si cette valeur n'est pas precisee, le groupe `dl-all` est utilise par defaut.                                                                                                                           |
| batch    | Non         | [Hampager](https://hampager.de) permet un mode lot. Si vous indiquez plusieurs indicatifs, vous pouvez tous les envoyer en une seule fois au lieu de l'approche habituelle d'Apprise, qui les envoie un par un. L'activation du mode lot a des avantages comme des inconvenients. Par defaut, il est desactive. |

## Contraintes

- L'API DAPNET vous permet de specifier plus d'un indicatif cible. Tout indicatif inconnu ou invalide dans cette liste [interrompra la diffusion complete du message pour tous les indicatifs](https://hampager.de/dokuwiki/doku.php?id=dapnetapisendcall).
- Si le message depasse 80 caracteres, le plugin tronquera automatiquement le contenu pour respecter la longueur maximale de message de DAPNET.
- Si vous indiquez un parametre Apprise `title`, Apprise ajoutera automatiquement ce titre au corps du message avec une sequence de controle `\r\n` finale, ce qui peut produire un resultat indesirable. Il est recommande d'eviter d'utiliser le parametre `title` d'Apprise ici.
- Pour les messages, il est recommande de rester sur l'alphabet anglais, car DAPNET ne peut pas traiter les jeux de caracteres etendus comme l'alphabet cyrillique. L'API DAPNET acceptera tout de meme ces messages, mais le pager de l'utilisateur risque de ne pas les afficher correctement.
- Pour acceder a l'API DAPNET, vous devez etre radioamateur licence.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification DAPNET :

```bash
# Supposons que notre {user} soit df1abc
# Supposons que notre {password} soit appriseIsAwesome
# Supposons que notre {callsign} soit df1def
#
apprise -vv -b "Test Message Body" \
   "dapnet://df1abc:appriseIsAwesome@df1def"

# Supposons que notre {user} soit df1abc
# Supposons que notre {password} soit appriseIsAwesome
# Supposons que nos {callsign}s soient df1def, df1ghi et df1def-12
# Cela produira deux indicatifs cibles car le plugin retirera
# le SSID '-12' et detectera l'indicatif en doublon
#
apprise -vv -b "Test Message Body" \
   dapnet://df1abc:appriseIsAwesome@df1def/df1ghi/df1def-12

# Supposons que notre {user} soit df1abc
# Supposons que notre {password} soit test
# Supposons que notre {callsign} soit df1def
# Supposons que notre {priority} soit emergency
# Supposons que nos {txgroups} soient 'dl-all', 'all'
apprise -vv -b "Test Message Body" \
   "dapnet://df1abc:test@df1def?txgroups=dl-all,all&priority=emergency"
```
