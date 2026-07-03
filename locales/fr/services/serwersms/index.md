---
title: "Notifications SerwerSMS"
description: "Envoyez des notifications SMS et MMS via la passerelle polonaise SerwerSMS."
sidebar:
  label: "SerwerSMS"

source: https://serwersms.pl

schemas:
  - serwersms

has_sms: true
has_attachments: true

keywords: "serwer, serwersms.pl"

sample_urls:
  - serwersms://{username}:{password}@{sender}/{target_phone}
  - serwersms://{username}:{password}@{sender}/{target_group}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Inscrivez-vous sur SerwerSMS a l'adresse [serwersms.pl](https://serwersms.pl).
2. Notez votre nom d'utilisateur et votre mot de passe dans les parametres de votre compte.
3. Configurez un nom d'expediteur dans le panneau client SerwerSMS. Les noms d'expediteur doivent etre pre-approuves par l'operateur et sont limites a 11 caracteres alphanumeriques (par exemple `MonApp`).
4. Vous pouvez egalement creer des groupes de contacts dans le panneau et noter leurs identifiants de groupe numeriques.

## Syntaxe

La syntaxe valide est la suivante :

- `serwersms://{username}:{password}@{sender}/{target_phone}`
- `serwersms://{username}:{password}@{sender}/#{target_group}`
- `serwersms://{username}:{password}@{sender}/{target_phone}/#{target_group}`

:::note
Le prefixe de groupe `#` doit etre saisi sous la forme `%23` directement dans une URL (par exemple `/%23456`). Apprise encode et decode automatiquement ce caractere lors de la sauvegarde ou du chargement depuis un fichier de configuration.
:::

## Detail des parametres

| Variable     | Requis    | Description                                                                                                                            |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| username     | **\*Oui** | Le nom d'utilisateur de connexion a votre compte SerwerSMS.                                                                            |
| password     | **\*Oui** | Le mot de passe de votre compte SerwerSMS.                                                                                             |
| sender       | **\*Oui** | Le nom d'expediteur approuve qui s'affiche sur le telephone du destinataire (11 caracteres alphanumeriques maximum).                   |
| target_phone | **\*Non** | Un ou plusieurs numeros de telephone auxquels envoyer le SMS. Faites preceder chaque numero de `+` suivi de l'indicatif du pays.       |
| target_group | **\*Non** | Un ou plusieurs identifiants de groupes de contacts SerwerSMS. Faites preceder chaque identifiant de groupe de `#`.                    |
| to           | Non       | Une liste de numeros de telephone et/ou d'identifiants de groupe separee par des virgules. Alias pour `target_phone` / `target_group`. |
| from         | Non       | Alias pour `sender`.                                                                                                                   |

:::note
Au moins un `target_phone` ou un `target_group` doit etre fourni. Chaque cible genere un appel API distinct.
:::

:::note
Lorsqu'une piece jointe est fournie, le message est automatiquement envoye en MMS via le point de terminaison MMS de SerwerSMS. Aucune configuration supplementaire n'est necessaire -- il suffit de passer `--attach` en ligne de commande ou de fournir une piece jointe dans l'appel API.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS a un seul numero de telephone :

```bash
# En supposant : username=monlogin, password=secret, sender=MonApp
# Numero de telephone cible : +48 123 456 789
apprise -vv -t "Titre de test" -b "Message de test" \
   serwersms://monlogin:secret@MonApp/+48123456789
```

Envoyer a plusieurs numeros de telephone :

```bash
apprise -vv -t "Alerte" -b "Le serveur est hors ligne" \
   serwersms://monlogin:secret@MonApp/+48123456789/+48987654321
```

Envoyer a un groupe de contacts SerwerSMS (ID de groupe 100) :

```bash
apprise -vv -t "Diffusion" -b "Maintenance ce soir" \
   "serwersms://monlogin:secret@MonApp/%23100"
```

Envoyer a un numero de telephone et a un groupe dans une seule URL :

```bash
apprise -vv -t "Alerte" -b "Verifiez les journaux" \
   "serwersms://monlogin:secret@MonApp/+48123456789/%23200"
```

Envoyer un MMS avec une image en piece jointe :

```bash
apprise -vv -t "Alerte" -b "Voir la piece jointe" \
   --attach /chemin/vers/image.jpg \
   serwersms://monlogin:secret@MonApp/+48123456789
```
