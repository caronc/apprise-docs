---
title: "Notifications ClickEnvoyer"
description: "Envoyer des notifications ClickSend."
sidebar:
  label: "ClickSend"

source: https://clicksend.com

schemas:
  - clicksend

has_sms: true

sample_urls:
  - clicksend://{user}:{password}@{PhoneNo}
  - clicksend://{user}:{password}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a un compte ClickSend [ici](https://clicksend.com). Un identifiant utilisateur et un mot de passe associes a votre compte vous seront fournis. C'est tout ce dont vous avez besoin pour utiliser ce service avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `clicksend://{user}:{password}@{PhoneNo}`
- `clicksend://{user}:{password}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                                                                                         |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Oui         | _Username_ associe a votre compte ClickSend.                                                                                                                                                                                                                                                                                        |
| password | Oui         | _Password_ associe a votre compte ClickSend.                                                                                                                                                                                                                                                                                        |
| PhoneNo  | Oui         | Au moins un numero de telephone doit etre precise pour utiliser ce plugin. Ce champ est assez tolerant et accepte aussi les parentheses, les espaces et les tirets si vous souhaitez formater le numero de maniere plus lisible.                                                                                                    |
| batch    | Non         | ClickSend permet un mode lot. Si vous indiquez plus d'un numero de telephone, vous pouvez envoyer tous les numeros identifies dans l'URL en une seule fois, au lieu de l'approche habituelle d'_Apprise_, qui les envoie un par un. L'activation du mode lot a des avantages comme des inconvenients. Par defaut, il est desactive. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification ClickSend sous forme de SMS :

```bash
# Supposons que notre {user} soit l2g
# Supposons que notre {password} soit appriseIsAwesome
# Supposons que notre {PhoneNo}
#  - se trouve aux Etats-Unis, donc avec l'indicatif +1
#  - corresponde a 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "clicksend://l2g:appriseIsAwesome@18005551223"

# l'exemple suivant aurait egalement fonctionne, les espaces,
# parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "clicksend://l2g:appriseIsAwesome@1-(800) 555-1223"
```
