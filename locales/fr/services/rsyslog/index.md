---
title: "Notifications Remote Syslog"
description: "Envoyer des messages Remote Syslog."
sidebar:
  label: "Remote Syslog"

source: https://tools.ietf.org/html/rfc5424

schemas:
  - rsyslog: insecure

sample_urls:
  - rsyslog://{host}
  - rsyslog://{host}:{port}
  - rsyslog://{host}/{facility}
  - rsyslog://{host}:{port}/{facility}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Remote Syslog permet aux equipements reseau d'envoyer des messages d'evenement vers un serveur de journalisation, generalement appele serveur Syslog. Le protocole Syslog est pris en charge par un large eventail d'equipements et peut etre utilise pour journaliser differents types d'evenements.

## Syntaxe

La syntaxe valide est la suivante :

- `rsyslog://{host}`
- `rsyslog://{host}:{port}`
- `rsyslog://{host}/{facility}`
- `rsyslog://{host}:{port}/{facility}`

Vous pouvez par exemple remplacer la facility par defaut sur un serveur syslog distant (rsyslog) comme ceci :

- `rsyslog://localhost/local5`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                                              |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host     | Non         | Nom d'hote du serveur Syslog distant.                                                                                                                                                                                                                                                    |
| port     | Non         | Port associe a votre serveur `rsyslog`. Si aucune valeur n'est fournie, le port **514** est utilise par defaut.                                                                                                                                                                          |
| facility | Non         | Facility a utiliser ; la valeur par defaut est `user`. Les options valides sont **kern**, **user**, **mail**, **daemon**, **auth**, **syslog**, **lpr**, **news**, **uucp**, **cron**, **local0**, **local1**, **local2**, **local3**, **local4**, **local5**, **local6** et **local7**. |
| logpid   | Oui         | Inclut le PID dans la sortie de journalisation.                                                                                                                                                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Remote Syslog :

```bash
# L'exemple ci-dessous envoie une notification syslog vers la facility `user`
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   rsyslog://localhost
```

### Serveur de Test RSyslog Interne

```bash
# Creer un Dockerfile minimal qui lancera notre serveur rsyslog :
cat << _EOF > dockerfile.syslog
FROM ubuntu
RUN apt update && apt install rsyslog -y
RUN echo '\$ModLoad imudp\n \\
\$UDPServerRun 514\n \\
\$ModLoad imtcp\n \\
\$InputTCPServerRun 514\n \\
\$template RemoteStore, "/var/log/remote/%\$year%-%\$Month%-%\$Day%.log"\n \\
:source, !isequal, "localhost" -?RemoteStore\n \\
:source, isequal, "last" ~ ' > /etc/rsyslog.conf
ENTRYPOINT ["rsyslogd", "-n"]
_EOF

# Construire l'image :
docker build -t mysyslog -f dockerfile.syslog .

# Puis la lancer :
docker run  --cap-add SYSLOG --restart always \
  -v $(pwd)/log:/var/log \
  -p 514:514 -p 514:514/udp --name rsyslog mysyslog

# Dans un autre terminal, vous pourrez consulter le repertoire
# `log` cree a l'emplacement depuis lequel vous avez lance la commande.
# Il pourra etre necessaire d'ajuster ses permissions ; le fichier journal
# ne sera cree qu'apres l'envoi d'une notification Apprise.
```
