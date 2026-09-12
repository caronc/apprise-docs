---
title: "Notifications Delta Chat"
description: "Envoyer des notifications Delta Chat via SMTP."
sidebar:
  label: "Delta Chat"

source: https://delta.chat/

schemas:
  - deltachat
  - deltachats

has_chat: true
has_selfhosted: true
has_attachments: true

body_formats:
  - text

keywords: "chatmail"

sample_urls:
  - deltachat://user:pass@smtp.example.com/friend@example.org
  - deltachats://user:pass@smtp.example.com:465/friend@example.org?mode=ssl
  - deltachat://user:pass@smtp.example.com/friend1@example.org/friend2@example.org
  - deltachat://user:pass@smtp.example.com/friend@example.org?pgp=sign&wkd=yes
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

[Delta Chat](https://delta.chat/) est une messagerie fondée sur l'e-mail.
Apprise envoie des messages compatibles via le serveur SMTP du compte du bot,
sans passerelle ni autre service local.

1. Choisissez une boîte aux lettres pour votre bot :
   - **Un compte e-mail classique.** Les relais chatmail peuvent refuser ses
     messages si le chiffrement PGP n'est pas disponible ; consultez
     l'avertissement ci-dessous.
   - **Un [relais chatmail](https://chatmail.at/relays) public.** Choisissez un
     nom d'utilisateur et un mot de passe robuste. Le relais crée l'adresse à
     la première connexion. Ces relais conviennent surtout à un usage léger.
   - **Votre propre [relais chatmail auto-hébergé](https://chatmail.at/doc/relay/getting_started.html).**
     Il crée aussi les adresses à la première connexion et vous permet de
     gérer la capacité.
2. Notez l'hôte SMTP du compte, le port, le nom d'utilisateur et le mot de
   passe.
3. Demandez à chaque destinataire d'ajouter le bot comme contact ou de lui
   écrire en premier. Les messages d'expéditeurs inconnus peuvent rester dans
   les **demandes de contact** jusqu'à leur acceptation.

:::caution[Certains serveurs exigent le chiffrement]
Les relais chatmail exigent un chiffrement de bout en bout. Si l'un des comptes
en utilise un, configurez PGP et la découverte de clés comme indiqué dans la
section [Sécurité PGP](#sécurité-pgp).
:::

## Syntaxe

La syntaxe valide est la suivante :

- `deltachat://{user}:{password}@{host}/{targets}`
- `deltachat://{user}:{password}@{host}:{port}/{targets}`

`deltachat://` envoie par défaut sur une connexion non chiffrée. Ajouter un
`s` au schéma (`deltachats://`) fait passer le transport par défaut à
STARTTLS ; utilisez `?mode=ssl` pour du SSL/TLS implicite (voir
[Sécurité du transport](#sécurité-du-transport)) :

- `deltachats://{user}:{password}@{host}/{targets}`
- `deltachats://{user}:{password}@{host}:{port}/{targets}`

`{targets}` représente une ou plusieurs adresses e-mail de destinataires,
chacune étant l'identité Delta Chat de la personne ou du bot que vous
notifiez :

- `deltachat://{user}:{password}@{host}/{target1}/{target2}/{targetN}`

Si vous omettez `{targets}`, Apprise envoie la notification à l'adresse
de votre propre bot. C'est pratique pour vous envoyer une alerte
personnelle ou tester une configuration sans second contact Delta Chat.

`{host}` doit être le domaine de l'adresse de votre bot (il fait partie
de son identité Delta Chat), pas nécessairement le serveur SMTP auquel
vous vous connectez réellement. S'ils diffèrent, par exemple avec un
relais d'entreprise ou tiers, ajoutez `?smtp={smtp-host}` pour préciser
le vrai serveur d'envoi tout en gardant le domaine de votre identité dans
`{host}` :

```text
deltachat://bot:pass@example.com/friend@example.org?smtp=smtp-relay.company.com
```

Consultez la section
[Utiliser des Serveurs SMTP Personnalisés](/services/email/#utiliser-des-serveurs-smtp-personnalisés)
du plugin Email pour en savoir plus.

## Format du Message

Apprise envoie du texte brut avec l'en-tête `Chat-Version: 1.0` exigé par le
[protocole e-mail-chat](https://github.com/deltachat/spec). L'objet commence par
`Chat:`, conformément à la recommandation du protocole. Les messages chiffrés
utilisent l'objet générique `Chat: Encrypted message` afin de ne pas exposer le
texte protégé.

## Sécurité du Transport

| Mode     | Valeur `?mode=` | Port par défaut | Remarques                                                            |
| -------- | --------------- | --------------- | -------------------------------------------------------------------- |
| Aucun    | `insecure`      | 25              | Par défaut pour `deltachat://` ; la plupart des serveurs le refusent |
| STARTTLS | `starttls`      | 587             | Par défaut pour `deltachats://`                                      |
| SSL/TLS  | `ssl`           | 465             | À définir explicitement avec `?mode=ssl`                             |

## Sécurité PGP

Delta Chat utilise les options `pgp`, `pgppub`, `pgpprv` et `wkd` du plugin
[Email](/services/email/#sécurité-pgp). Lorsque PGP est activé et qu'Apprise
possède une clé privée compatible, il publie la clé publique correspondante
afin que les destinataires puissent chiffrer leurs réponses.

Apprise ne lit pas les messages reçus. S'il a généré cette clé, importez le
fichier privé dans le client qui devra lire les réponses chiffrées.

La génération est limitée à la clé d'expéditeur du bot lors d'un auto-envoi
chiffré. Apprise ne génère jamais les clés des destinataires externes.

| Mode          | Ce que ça fait                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `pgp=no`      | Pas de PGP (par défaut).                                                                                                         |
| `pgp=sign`    | Signe le message avec votre clé privée. Chiffre aussi de façon opportuniste si une clé publique du destinataire est déjà connue. |
| `pgp=encrypt` | Chiffre le message avec la clé publique du destinataire. L'envoi échoue si aucune clé n'est trouvée.                             |

Les deux modes protégés nécessitent
[PGPy](https://pypi.org/project/pgpy/) (`pip install pgpy`). Si PGP est demandé
mais indisponible, l'envoi échoue au lieu de partir sans protection.

Utiliser `wkd=yes` sans `pgp=` active le chiffrement. Définissez explicitement
`pgp=no` pour laisser PGP désactivé.

```text
deltachat://user:pass@smtp.example.com/friend@example.org?pgp=sign&pgpprv=/path/to/my-prv.asc
deltachat://user:pass@smtp.example.com/friend@example.org?pgp=encrypt&pgppub=/path/to/recipient-pub.asc
deltachat://user:pass@smtp.example.com/friend@example.org?pgp=sign&wkd=yes&pgpprv=/path/to/my-prv.asc
```

Consultez la section [Sécurité PGP](/services/email/#sécurité-pgp) du plugin
Email pour la découverte et la génération des clés, ainsi que les recherches
Web Key Directory.

## Dépannage

**Apprise indique un succès, mais rien n'apparaît.** Demandez au destinataire
de consulter les **demandes de contact**. Un message inconnu peut y attendre
son approbation.

**L'envoi échoue.** Vérifiez ces causes courantes :

- Vérifiez que `mode=` correspond aux réglages de votre fournisseur ;
  consultez [Sécurité du transport](#sécurité-du-transport). La
  plupart utilisent STARTTLS sur le port 587 ; certains utilisent SSL
  implicite sur le port 465.
- Si l'un des comptes utilise un relais chatmail, configurez PGP et la
  découverte de la clé du destinataire.
- Lancez la commande avec `-vv` (`apprise -vv ...`) pour voir l'erreur
  SMTP exacte renvoyée par le serveur.

**Le chiffrement PGP échoue (`pgp=encrypt`).** Apprise a besoin de la clé
publique du destinataire via `pgppub=`, `wkd=yes` ou son cache. Avec
`pgp=sign`, Apprise envoie un message signé si aucune clé destinataire n'est
connue et le chiffre lorsqu'une clé est trouvée.

**L'authentification échoue, ou le mauvais expéditeur est utilisé.** Si
votre bot s'authentifie via un relais dont le domaine diffère de sa
propre adresse (par exemple `bot@example.com` envoyant via
`smtp-relais.entreprise.com`), placez le domaine de votre identité dans
`{host}` et le relais dans `?smtp=` ; voir la note dans
[Syntaxe](#syntaxe). Mettre directement le nom d'hôte du relais dans
`{host}` fait qu'Apprise traite _ce_ domaine comme votre identité, ce qui
casse à la fois la connexion et l'adresse `From:`.

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                  |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| user     | \*Oui  | Identifiant SMTP, souvent l'adresse e-mail complète.                                                                                                         |
| password | \*Oui  | Mot de passe SMTP.                                                                                                                                           |
| host     | Oui    | Domaine de l'adresse de votre bot (fait partie de son identité Delta Chat).                                                                                  |
| port     | Non    | Port SMTP. Valeur par défaut selon `mode=` (voir [Sécurité du transport](#sécurité-du-transport)).                                                           |
| targets  | Non    | Une ou plusieurs adresses e-mail. Peuvent aussi être définies via `?to=`. Si omis, envoie à l'adresse de votre propre bot.                                   |
| from     | Non    | Change l'adresse de l'expéditeur. Accepte un e-mail simple ou une valeur `Nom <email>`.                                                                      |
| name     | Non    | Change le nom affiché de l'expéditeur.                                                                                                                       |
| mode     | Non    | Sécurité du transport : `insecure`, `starttls`, ou `ssl` (voir [Sécurité du transport](#sécurité-du-transport) pour les valeurs par défaut selon le schéma). |
| smtp     | Non    | Le serveur SMTP d'envoi réel, s'il diffère de `host` (par exemple un relais).                                                                                |
| pgp      | Non    | Mode PGP : `no` (par défaut), `sign`, ou `encrypt`.                                                                                                          |
| pgppub   | Non    | Chemin vers la clé publique PGP d'un destinataire.                                                                                                           |
| pgpprv   | Non    | Chemin vers votre propre clé privée PGP.                                                                                                                     |
| wkd      | Non    | Active la découverte de clé publique via Web Key Directory (`yes`/`no`).                                                                                     |

**\*** Non requis si votre serveur accepte le relais anonyme (sans
authentification).

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message simple à un seul contact Delta Chat :

```bash
apprise -vv -t "Alerte serveur" -b "Utilisation du disque à 92%" \
    "deltachat://bot:app-password@smtp.example.com/friend@example.org"
```

Notifier plusieurs destinataires en une fois :

```bash
apprise -vv -t "Déploiement terminé" -b "Build #482 est en ligne" \
    "deltachat://bot:app-password@smtp.example.com/team1@example.org/team2@example.org"
```

Utiliser SSL/TLS implicite sur un port personnalisé :

```bash
apprise -vv -t "Test" -b "Bonjour depuis Apprise" \
    "deltachats://bot:app-password@smtp.example.com:465/friend@example.org?mode=ssl"
```

Signer chaque message, et chiffrer de façon opportuniste quand la clé
d'un destinataire est déjà connue :

```bash
apprise -vv -t "Test" -b "Bonjour depuis Apprise" \
    "deltachat://bot:app-password@smtp.example.com/friend@example.org?pgp=sign&wkd=yes&pgpprv=/home/user/.gnupg/my-prv.asc"
```
