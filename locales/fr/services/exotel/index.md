---
title: "Notifications Exotel"
description: "Envoyer des notifications Exotel."
sidebar:
  label: "Exotel"

source: https://exotel.com/

schemas:
  - exotel

has_sms: true

sample_urls:
  - exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}
  - exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo}
  - exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}
  - exotel://{AccountSid}:{ApiToken}@{SenderID}/{PhoneNo}?apikey={ApiKey}

limits:
  max_chars: 2000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Exotel, vous aurez besoin de votre _Account SID_, de votre _API Key_ et de votre _API Token_. Ces valeurs sont disponibles dans le [tableau de bord Exotel](https://my.exotel.com/) dans les parametres API.

Exotel utilise le _Account SID_ dans le point d'acces API ainsi que l'_API Key_ avec l'_API Token_ pour l'authentification HTTP basique. Pour des raisons de compatibilite ascendante, Apprise utilise le _Account SID_ comme cle API lorsque `apikey=` n'est pas fourni.

Vous aurez aussi besoin d'une valeur source valide pour **{FromPhoneNo}**. Exotel accepte un ExoPhone, un Sender ID alphanumerique approuve ou un identifiant expediteur numerique approuve associe a votre compte.

## Syntaxe

La syntaxe valide est la suivante :

- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}`
- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo}`
- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
- `exotel://{AccountSid}:{ApiToken}@{SenderID}/{PhoneNo}?apikey={ApiKey}`
- `exotel://{AccountSid}:{ApiToken}@{SenderID}/{PhoneNo1}/{PhoneNo2}?batch=yes`

Si aucun _ToPhoneNo_ n'est precise, alors le _FromPhoneNo_ recevra le message a la place ; l'URL suivante est donc valide :

- `exotel://{AccountSid}:{ApiToken}@{FromPhoneNo}/`

Vous pouvez aussi transmettre des valeurs sous forme de parametres de requete :

- `exotel://_?sid={AccountSid}&token={ApiToken}&apikey={ApiKey}&from={FromPhoneNo}&to={PhoneNo}`

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                                                                                              |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AccountSid  | Oui         | _Account SID_ associe a votre compte Exotel. Il est utilise dans le chemin API Exotel.                                                                                                                                                                                   |
| ApiToken    | Oui         | _API Token_ associe a votre compte Exotel. Il est utilise comme mot de passe pour l'authentification HTTP basique.                                                                                                                                                       |
| ApiKey      | **Non**     | _API Key_ associee a votre compte Exotel. Elle est utilisee comme nom d'utilisateur pour l'authentification HTTP basique. Si elle est omise, Apprise utilise **AccountSid** pour assurer la compatibilite avec les anciennes URL.                                        |
| FromPhoneNo | Oui         | ExoPhone associe a votre compte Exotel. Le numero doit inclure l'indicatif du pays. Les espaces, parentheses et tirets sont acceptes pour la lisibilite.                                                                                                                 |
| SenderID    | Oui         | Identifiant expediteur, header, Exotel approuve et associe a votre compte. Il peut s'agir d'un Sender ID alphanumerique, tel que `EXOTEL`, ou d'un identifiant numerique, comme `600123`. Utilisez-le a la place de **FromPhoneNo** lorsqu'il est configure dans Exotel. |
| PhoneNo     | **\*Non**   | Le numero de telephone doit inclure l'indicatif du pays. Les espaces, parentheses et tirets sont acceptes pour la lisibilite. Si aucune cible n'est fournie, Apprise envoie le SMS a **FromPhoneNo**.                                                                    |
| region      | Non         | Peut etre `us` ou `in`. Par defaut, la region est definie sur `us`. Utilisez `in` pour le point d'acces API de Mumbai.                                                                                                                                                   |
| priority    | Non         | Peut etre `normal` ou `high`. Par defaut, la priorite est definie sur `normal`. Exotel recommande `high` uniquement pour les messages OTP.                                                                                                                               |
| unicode     | Non         | Permet facultativement d'indiquer a Apprise si le SMS doit etre envoye en Unicode. Par defaut, cette valeur est `yes` ; definissez-la sur `no` pour utiliser un encodage texte brut.                                                                                     |
| batch       | Non         | Envoie plusieurs cibles dans une seule requete d'API bulk SMS Exotel. Par defaut, cette option est definie sur `no`, donc Apprise envoie une requete amont par cible.                                                                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Exotel sous forme de SMS :

```bash
# Supposons que notre {AccountSid} soit acme123
# Supposons que notre {ApiToken} soit exo-token
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo}
#  - se trouve aux Etats-Unis, donc avec l'indicatif +1
#  - corresponde a 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   exotel://acme123:exo-token@19005559999/18005551223

# l'exemple suivant aurait egalement fonctionne, les espaces,
# parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   exotel://acme123:exo-token@1-(900) 555-9999/1-(800) 555-1223
```

Envoyer via la region Inde en utilisant une cle API distincte et un sender ID approuve :

```bash
# Supposons que notre {AccountSid} soit acme123
# Supposons que notre {ApiKey} soit api-key
# Supposons que notre {ApiToken} soit exo-token
# Supposons que notre {SenderID} soit EXOTEL
# Supposons que notre {PhoneNo} soit +91-98765-43210
apprise -vv -b "Your verification code is 123456" \
   "exotel://acme123:exo-token@EXOTEL/919876543210?apikey=api-key&region=in&priority=high"
```

Envoyer un message a plusieurs cibles en utilisant les bulk SMS Exotel :

```bash
# Supposons que notre {AccountSid} soit acme123
# Supposons que notre {ApiKey} soit api-key
# Supposons que notre {ApiToken} soit exo-token
# Supposons que notre {SenderID} soit EXOTEL
# Supposons que notre {PhoneNo1} soit +91-98765-43210
# Supposons que notre {PhoneNo2} soit +91-98765-43211
apprise -vv -b "Your scheduled reminder" \
   "exotel://acme123:exo-token@EXOTEL/919876543210/919876543211?apikey=api-key&region=in&batch=yes"
```
