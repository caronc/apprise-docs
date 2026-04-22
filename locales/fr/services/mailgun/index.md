---
title: "Notifications Mailgun"
description: "Envoyer des notifications Mailgun."
sidebar:
  label: "Mailgun"

source: https://www.mailgun.com/

schemas:
  - mailgun

has_attachments: true

sample_urls:
  - mailgun://{user}@{domain}/{apikey}/
  - mailgun://{user}@{domain}/{apikey}/{email}/
  - mailgun://{user}@{domain}/{apikey}/{email1}/{email2}/{emailN}/
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous pouvez creer un compte gratuitement [sur leur site web](https://www.mailgun.com/), mais cette formule comporte des restrictions.

Pour chaque domaine que vous configurez chez eux, vous pourrez tous les retrouver dans votre tableau de bord une fois connecte. Voici un [lien direct](https://app.mailgun.com/app/domains). Si vous utilisez un compte gratuit, vous pourrez au minimum y voir votre _sandbox domain_. Depuis cette page, vous pourrez aussi recuperer la **cle API** associee a chacun des domaines que vous avez configures.

## Syntaxe

La syntaxe valide est la suivante :

- `mailgun://{user}@{domain}/{apikey}/`
- `mailgun://{user}@{domain}/{apikey}/{email}/`
- `mailgun://{user}@{domain}/{apikey}/{email1}/{email2}/{emailN}/`

Vous pouvez egalement preciser votre region si vous n'utilisez pas les serveurs americains, comme ceci :

- `mailgun://{user}@{domain}/{apikey}/?region=eu`

Vous pouvez aussi ajuster le nom associe a l'adresse e-mail From :

- `mailgun://{user}@{domain}/{apikey}/?name=Luke%20Skywalker`

### Extensions d'Adresse Email

Si vous souhaitez utiliser des extensions, vous devrez echapper le caractere plus, `+`, avec **%2B**, comme ceci :<br/>
`mailgun://{user}@{domain}/{apikey}/chris%2Bextension@example.com`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                    |
| -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui         | Cle API associee au domaine depuis lequel vous souhaitez envoyer votre e-mail. Elle est disponible apres connexion a leur site web et acces au [tableau de bord](https://app.mailgun.com/app/domains).                                                         |
| domain   | Oui         | Domaine depuis lequel vous souhaitez envoyer votre e-mail ; ce domaine doit etre enregistre et configure dans votre compte Mailgun.                                                                                                                            |
| user     | Oui         | L'utilisateur est associe au domaine precise dans l'URL afin de composer l'adresse e-mail **From** que vos destinataires verront.                                                                                                                              |
| email    | Non         | Vous pouvez specifier autant d'adresses e-mail que vous le souhaitez. Chaque adresse indiquee representera le champ **To**.<br/>**Remarque :** selon la configuration de votre compte, Mailgun peut restreindre l'envoi vers certaines adresses.               |
| region   | Non         | Identifie la region du serveur auquel vous souhaitez acceder. Les options prises en charge sont **eu** et **us**. La valeur par defaut est **us** si rien n'est precise. Cela determine specifiquement quel serveur API sera utilise pour envoyer vos e-mails. |
| name     | Non         | Permet de definir le nom associe a l'adresse e-mail **From** lors de l'envoi de votre e-mail.                                                                                                                                                                  |
| to       | Non         | Alias de la variable `email`. Vous pouvez enchainer autant d'adresses, To, que vous le souhaitez en les separant par des virgules et/ou des espaces.                                                                                                           |
| cc       | Non         | Identifie les adresses a notifier en copie, Carbon Copy.                                                                                                                                                                                                       |
| bcc      | Non         | Identifie les adresses a notifier en copie cachee, Blind Carbon Copy.                                                                                                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Mailgun a l'adresse e-mail <bill.gates@microsoft.com>

```bash
# Supposons que le {domain} configure dans notre compte Mailgun soit example.com
# Supposons que notre {apikey} soit 4b4f2918fd-dk5f-8f91f
# Supposons que notre {email} To soit bill.gates@microsoft.com
# Supposons que nous voulions envoyer depuis noreply@example.com
apprise -vv -t "Email Subject" -b "Message Body" \
   mailgun:///noreply@example.com/4b4f2918fd-dk5f-8f91f/bill.gates@microsoft.com
```
