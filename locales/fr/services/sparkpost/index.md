---
title: "Notifications SparkPost"
description: "Envoyer des notifications SparkPost."
sidebar:
  label: "SparkPost"

source: https://sparkpost.com/

schemas:
  - sparkpost

has_attachments: true

sample_urls:
  - sparkpost://{user}@{domain}/{apikey}/
  - sparkpost://{user}@{domain}/{apikey}/{email}/
  - sparkpost://{user}@{domain}/{apikey}/{email1}/{email2}/{emailN}/
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous pouvez creer un compte gratuitement [sur leur site web](https://sparkpost.com/), mais cette formule comporte des restrictions.

Pour chaque domaine configure chez eux, vous pourrez y acceder depuis votre tableau de bord une fois connecte. Vous devrez generer une API key et lui accorder le droit `transmission`.

## Syntaxe

La syntaxe valide est la suivante :

- `sparkpost://{user}@{domain}/{apikey}/`
- `sparkpost://{user}@{domain}/{apikey}/{email}/`
- `sparkpost://{user}@{domain}/{apikey}/{email1}/{email2}/{emailN}/`

Vous pouvez aussi preciser votre region si vous n'utilisez pas les serveurs americains :

- `sparkpost://{user}@{domain}/{apikey}/?region=eu`

Vous pouvez egalement ajuster le nom associe a l'adresse e-mail `From` :

- `sparkpost://{user}@{domain}/{apikey}/?name=Darth%20Vader`

### Extensions d'Adresse E-mail

Si vous souhaitez utiliser des extensions d'adresse, vous devez echapper le caractere plus `+` avec **%2B** comme ceci :<br/>
`sparkpost://{user}@{domain}/{apikey}/chris%2Bextension@example.com`

Les champs Carbon Copy, `cc=`, et Blind Carbon Copy, `bcc=`, sont en revanche appliques a chaque e-mail envoye. Ainsi, si vous envoyez un message a 3 destinataires, les listes _cc_ et _bcc_ seront incluses dans chacun des 3 e-mails.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                        |
| -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui         | Cle API associee au domaine depuis lequel vous souhaitez envoyer vos e-mails. Elle est disponible apres connexion a leur site et acces au [tableau de bord](https://app.sparkpost.com/app/domains).                                                |
| domain   | Oui         | Domaine depuis lequel vous souhaitez envoyer vos e-mails. Ce domaine doit etre enregistre et configure avec votre compte SparkPost.                                                                                                                |
| user     | Oui         | L'utilisateur est combine au domaine indique dans l'URL pour former l'adresse **From** visible par vos destinataires.                                                                                                                              |
| batch    | Non         | Si le mode `batch` est defini sur `yes`, toutes les adresses e-mail sont envoyees dans un seul lot que SparkPost traitera.                                                                                                                         |
| email    | Non         | Vous pouvez specifier autant d'adresses e-mail que vous le souhaitez. Chaque adresse indiquee representera le champ **To**.<br/>**Remarque :** selon la configuration de votre compte, SparkPost peut restreindre l'envoi vers certaines adresses. |
| region   | Non         | Identifie la region du serveur a utiliser. Les options prises en charge sont **eu** et **us**. Par defaut, la valeur **us** est utilisee si rien n'est precise. Cela affecte le serveur API contacte pour l'envoi des e-mails.                     |
| from     | Non         | Permet de definir le nom associe a l'adresse e-mail **From** lors de l'envoi.                                                                                                                                                                      |
| to       | Non         | Alias de la variable `email`. Vous pouvez y chaîner autant d'adresses **To** que souhaite, separees par des virgules et/ou des espaces.                                                                                                            |
| cc       | Non         | Adresse(s) e-mail en Carbon Copy. Plusieurs valeurs peuvent etre separees par des espaces et/ou des virgules.                                                                                                                                      |
| bcc      | Non         | Adresse(s) e-mail en Blind Carbon Copy. Plusieurs valeurs peuvent etre separees par des espaces et/ou des virgules.                                                                                                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification SparkPost a l'adresse e-mail `bill.gates@microsoft.com` :

```bash
# Supposons que le {domain} configure dans notre compte SparkPost soit example.com
# Supposons que notre {apikey} soit 4b4f2918fddk5f8f91f
# Supposons que notre {email} de destination soit bill.gates@microsoft.com
# Supposons que nous voulions envoyer depuis noreply@example.com
apprise sparkpost:///noreply@example.com/4b4f2918fddk5f8f91f/bill.gates@microsoft.com
```

### Manipulation des en-tetes

Certains utilisateurs peuvent avoir besoin d'en-tetes HTTP speciaux lors de l'envoi de leurs donnees. Pour cela, il suffit d'ajouter un symbole plus, **+**, devant n'importe quel parametre precise dans votre URL. Les exemples ci-dessous envoient une notification SparkPost a l'adresse `bill.gates@microsoft.com` en exploitant cette personnalisation des en-tetes.

```bash
# L'exemple ci-dessous definirait l'en-tete :
#    X-Token: abcdefg
#
# Supposons que le {domain} configure dans notre compte SparkPost soit example.com
# Supposons que notre {apikey} soit 4b4f2918fddk5f8f91f
# Supposons que notre {email} de destination soit bill.gates@microsoft.com
# Supposons que nous voulions envoyer depuis noreply@example.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "sparkpost:///noreply@example.com/4b4f2918fddk5f8f91f/bill.gates@microsoft.com/?+X-Token=abcdefg"

# Pour plusieurs en-tetes, il suffit d'ajouter d'autres entrees :
# L'exemple ci-dessous definirait les en-tetes :
#    X-Token: abcdefg
#    X-Apprise: is great
#
# Supposons que le {domain} configure dans notre compte SparkPost soit example.com
# Supposons que notre {apikey} soit 4b4f2918fddk5f8f91f
# Supposons que notre {email} de destination soit bill.gates@microsoft.com
# Supposons que nous voulions envoyer depuis noreply@example.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "sparkpost:///noreply@example.com/4b4f2918fddk5f8f91f/bill.gates@microsoft.com/?+X-Token=abcdefg&+X-Apprise=is%20great"
```

### Substitution Globale

SparkPost permet d'utiliser des `{{tokens}}` encadres par deux accolades. [Consultez leur documentation sur le templating](https://developers.sparkpost.com/api/template-language/) pour plus de details. Si vous souhaitez transmettre un mot-cle et sa valeur de substitution, il suffit d'ajouter un deux-points, `:`, devant n'importe quel parametre precise dans votre URL. L'exemple ci-dessous envoie une notification SparkPost a `bill.gates@microsoft.com` en utilisant ce mecanisme.

```bash
# L'exemple ci-dessous definirait le token {{software}} pour qu'il soit remplace par Microsoft :
# Supposons que le {domain} configure dans notre compte SparkPost soit example.com
# Supposons que notre {apikey} soit 4b4f2918fddk5f8f91f
# Supposons que notre {email} de destination soit bill.gates@microsoft.com
# Supposons que nous voulions envoyer depuis noreply@example.com
apprise -vv -t "Titre du Message de Test" -b "Bill Gates works at {{software}}" \
   "sparkpost:///noreply@example.com/4b4f2918fddk5f8f91f/bill.gates@microsoft.com/?:software=Microsoft"
```

Vous pouvez specifier autant de tokens que vous le souhaitez. Apprise fournit egalement automatiquement quelques tokens par defaut si vous souhaitez les utiliser :

- **app_id** : identifiant de l'application ; il vaut generalement `Apprise`, mais les developpeurs d'applications personnalisees peuvent le surcharger et y placer leur propre nom.
- **app_desc** : description de l'application ; c'est en general une variante un peu plus explicite de _app_id_. Cette valeur est habituellement `Apprise Notification`, sauf surcharge par un developpeur.
- **app_color** : code hexadecimal identifiant une couleur associee au message. Par exemple, les messages `info` sont generalement bleus tandis que les messages `warning` sont orange.
- **app_type** : type du message lui-meme, par exemple `info`, `warning` ou `success`.
- **app_title** : titre reel, c'est-a-dire la valeur `--title` ou `-t` transmise lors de l'appel a la notification Apprise.
- **app_body** : corps reel du message, c'est-a-dire la valeur `--body` ou `-b` transmise lors de l'appel a la notification Apprise.
- **app_url** : URL associee a l'instance Apprise, trouvee dans l'objet **AppriseAsset()**. Sauf surcharge par un developpeur, sa valeur est `https://github.com/caronc/apprise`.
