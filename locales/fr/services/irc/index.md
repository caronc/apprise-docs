---
title: "Notifications IRC"
description: "Envoyer des notifications IRC."
sidebar:
  label: "IRC"

source: https://ircv3.net/
schemas:
  - irc: insecure
  - ircs

has_chat: true

sample_urls:
  - irc://{host}/#channel
  - ircs://{host}/#channel
  - ircs://{host}:{port}/#channel
  - ircs://{nick}@{host}/#channel
  - ircs://{user}:{password}@{host}/#channel?mode=nickserv&nick={nick}
  - ircs://{user}:{password}@{host}/#channel?mode=znc&nick={nick}

limits:
  - max_chars: 380
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

IRC ne nécessite pas de configuration de compte formelle dans Apprise. Vous avez seulement besoin d'un accès à un serveur IRC, ou d'un accès à un relayeur ZNC si vous prévoyez d'utiliser le mode relayeur.

Si votre réseau IRC requiert une authentification NickServ, assurez-vous d'avoir enregistré votre pseudo et d'avoir votre mot de passe NickServ à portée de main.

Si vous utilisez ZNC, vérifiez que votre relayeur est accessible et que votre nom d'utilisateur et mot de passe ZNC sont corrects.

## Syntaxe

La syntaxe valide est la suivante :

- `irc://{host}/{target}`
- `ircs://{host}/{target}`

Les cibles sont définies dans le chemin de l'URL sous forme d'une ou plusieurs entrées :

- Les canaux utilisent le préfixe `#` : `#channel`
- Les utilisateurs utilisent le préfixe `@` : `@nickname`

Vous pouvez fournir plusieurs cibles en les séparant par `/` :

- `ircs://irc.example.net/#alerts/@bob/@alice`

### Clés de Canal

Si un canal est protégé par une clé, ajoutez-la après le nom du canal en utilisant `:` :

- `ircs://irc.example.net/#private:channel-key`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host     | Oui    | Nom d'hôte ou adresse IP du serveur IRC.                                                                                                                                                                                                                                                                                                                                                                                              |
| port     | Non    | Port du serveur IRC. Par défaut 6667 pour `irc://` et 6697 pour `ircs://`.                                                                                                                                                                                                                                                                                                                                                            |
| user     | Non    | Nom d'utilisateur utilisé pour l'authentification. La signification dépend du `mode`.                                                                                                                                                                                                                                                                                                                                                 |
| password | Non    | Mot de passe utilisé pour l'authentification. La signification dépend du `mode`.                                                                                                                                                                                                                                                                                                                                                      |
| target   | Non    | Un ou plusieurs destinataires (canaux et/ou utilisateurs) fournis dans le chemin de l'URL.                                                                                                                                                                                                                                                                                                                                            |
| to       | Non    | Alias de `targets`. Permet de définir les destinataires dans la chaîne de requête plutôt que dans le chemin.                                                                                                                                                                                                                                                                                                                          |
| nick     | Non    | Pseudo utilisé lors de l'enregistrement sur le serveur. Si non spécifié, le pseudo prend par défaut la valeur de `user` lorsque celui-ci est fourni.                                                                                                                                                                                                                                                                                  |
| name     | Non    | Nom réel (GECOS) utilisé lors de l'enregistrement.                                                                                                                                                                                                                                                                                                                                                                                    |
| mode     | Non    | Mode d'authentification, l'un des suivants : `server`, `nickserv`, `znc`. Par défaut `server`.                                                                                                                                                                                                                                                                                                                                        |
| join     | Non    | Contrôle si Apprise rejoint les canaux avant d'envoyer. Par défaut `yes`. <br/>Les canaux protégés par un mot de passe (fourni sous la forme `#channel:key`) ne peuvent pas recevoir le message sans avoir d'abord rejoint le canal. Ainsi, si `join=no`, cela ne s'applique pas aux canaux avec des mots de passe assignés, mais s'applique à tout le reste. Ce paramètre n'a aucun effet si vous ne contactez que des utilisateurs. |

### Remarques sur les Modes

- `mode=server` : Le `password` optionnel est envoyé comme PASS serveur lors de l'enregistrement s'il est fourni.
- `mode=nickserv` : Utilise le flux d'identification NickServ après la connexion, puis envoie les notifications.
- `mode=znc` : S'authentifie auprès du relayeur ZNC. La ligne PASS est construite sous la forme `user:password` pour la compatibilité avec les configurations ZNC courantes. Une vérification de disponibilité PING/PONG est effectuée avant l'envoi des notifications.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message vers un canal via TLS :

```bash
apprise -vv -t "Title" -b "Corps du Message" \
  "ircs://irc.example.net/#alerts"
```

Envoyer vers plusieurs cibles :

```bash
apprise -vv -t "Title" -b "Corps du Message" \
  "ircs://irc.example.net/#alerts/@bob/@alice"
```

Envoyer vers un canal protégé par un mot de passe :

```bash
apprise -vv -t "Title" -b "Corps du Message" \
  "ircs://irc.example.net/#private:channel-key"
```

Exemple en mode NickServ :

```bash
apprise -vv -t "Title" -b "Corps du Message" \
  "ircs://user:pass@irc.example.net/#alerts?mode=nickserv&nick=MyNick"
```

Exemple en mode relayeur ZNC :

```bash
apprise -vv -t "Title" -b "Corps du Message" \
  "ircs://zncuser:zncpass@znc.example.net/#alerts?mode=znc&nick=MyNick"
```

Mode ZNC, plusieurs cibles :

```bash
apprise -vv -t "Title" -b "Corps du Message" \
  "ircs://zncuser:zncpass@znc.example.net/#alerts/@bob?mode=znc&nick=MyNick"
```
