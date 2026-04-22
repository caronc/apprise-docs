---
title: "Notifications Streamlabs"
description: "Envoyer des notifications Streamlabs."
sidebar:
  label: "Streamlabs"

source: https://streamlabs.com/

schemas:
  - strmlabs

has_image: true

sample_urls:
  - strmlabs://{access_token}/
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

La procedure d'inscription a Streamlabs est un peu longue.

**Remarque :** les captures d'ecran et instructions ci-dessous sont entierement creditees au **[Projet LNBits](https://github.com/Fittiboy/lnbits)** ([disponible ici](https://github.com/Fittiboy/lnbits/tree/master/lnbits/extensions/streamalerts#stream-alerts)).

Pour le moment, le seul service disposant d'une API ouverte exploitable ici est Streamlabs. Cette configuration exige donc de lier votre compte Twitch, YouTube ou Facebook a Streamlabs.

1. Connectez-vous a [Streamlabs](https://streamlabs.com/login?r=https://streamlabs.com/dashboard).
1. Accedez a la page des parametres API pour enregistrer une application :  
   ![image](./images/127759145-710d53b6-3c19-4815-812a-9a6279d1b8bb.png)  
   ![image](./images/127759182-da8a27cb-bb59-48fa-868e-c8892080ae98.png)  
   ![image](./images/127759201-7c28e9f1-6286-42be-a38e-1c377a86976b.png)
1. Remplissez le formulaire avec n'importe quelles valeurs acceptees comme valides. La plupart des champs peuvent contenir du texte arbitraire, car l'application n'est pas censee depasser le stade "testing" et sert uniquement a un usage personnel.
   Dans le champ "Whitelist Users", saisissez le nom d'utilisateur d'un compte Twitch que vous controlez. Meme si cette fonctionnalite est _techniquement_ limitee a Twitch, vous pouvez aussi utiliser l'overlay d'alertes pour les dons sur YouTube et Facebook.
   Pour l'instant, definissez simplement la "Redirect URI" sur `http://localhost`, vous la modifierez ensuite.
   Cliquez ensuite sur **create** :  
   ![image](./images/127759264-ae91539a-5694-4096-a478-80eb02b7b594.png)
1. Recuperons maintenant le Client ID depuis la page Streamlabs afin de generer un code qui sera utilise par Apprise pour communiquer avec Streamlabs.
   Remplacez les espaces reserves dans le lien ci-dessous par votre Client ID :
   `https://www.streamlabs.com/api/v1.0/authorize?client_id=<YOURCLIENTID>&redirect_uri=http://localhost&response_type=code&scope=donations.read+donations.create+alerts.create`
   Vous serez redirige vers localhost.
   Copiez le code present dans les parametres d'URL affiches dans la barre d'adresse du navigateur :
   `http://localhost/?code=<YOURCODE>`
1. Generez ensuite un jeton d'acces a l'aide du code obtenu a l'etape precedente, de votre Client ID et de votre Secret.
   Ouvrez un terminal et effectuez une requete pour generer le jeton d'acces qu'Apprise utilisera :

```bash
curl --request POST --url 'https://streamlabs.com/api/v1.0/token' -d  'grant_type=authorization_code&code=<YOURCODE>&client_id=<YOURCLIENTID>&client_secret=<YOURSECRET>&redirect_uri=http%3A%2F%2Flocalhost'
```

`Un JSON similaire devrait etre retourne : {"access_token":<YOURACCESSTOKEN>,"token_type":"Bearer","expires_in":3600,"refresh_token":""}`
Notez que le jeton d'acces n'expire pas.

1. Copiez ensuite votre jeton d'acces pour construire l'URL Streamlabs :
   `strmlabs://<YOURACCESSTOKEN>/?call=DONATIONS`

## Syntaxe

La syntaxe valide est la suivante :

- `strmlabs://{access_token}/`

## Détail des Paramètres

| Variable     | Obligatoire | Description                                          |
| ------------ | ----------- | ---------------------------------------------------- |
| access_token | Oui         | Jeton d'acces genere depuis votre compte Streamlabs. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Streamlabs :

```bash
# Supposons que notre {access_token} soit abcdefghij1234567890
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   strmlabs://abcdefghij1234567890/
```
