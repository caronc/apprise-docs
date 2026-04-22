---
title: "Notifications Email"
description: "Envoyer des notifications avec SMTP et les fournisseurs e-mail intégrés."
sidebar:
  label: "Email"

schemas:
  - mailto: insecure
  - mailtos

has_attachments: true

sample_urls:
  - mailto://userid:pass@domain.com
  - mailtos://domain.com?user=userid&pass=password
  - mailtos://domain.com:465?user=userid&pass=password
  - mailto://mySendingUsername:mySendingPassword@example.com?to=receivingAddress@example.com
  - mailto://userid:password@example.com?smtp=mail.example.com&from=noreply@example.com&name=no%20reply
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `mailto://{user}:{password}@{domain}`
- `mailto://{user}:{password}@{domain}:{port}`
- `mailto://{domain}?user={user}&pass={password}`
- `mailto://{user}:{password}@{domain}/{to_email}`
- `mailto://{user}:{password}@{domain}/{to_email1}/{to_email2}/{to_emailN}`

Ajouter un `s` au schéma, c'est-à-dire `mailtos://`, bascule vers une connexion STARTTLS sécurisée, avec le port 587 par défaut :

- `mailtos://{user}:{password}@{domain}`
- `mailtos://{user}:{password}@{domain}:{port}`
- `mailtos://{domain}?user={user}&pass={password}`
- `mailtos://{user}:{password}@{domain}/{to_email}`
- `mailtos://{user}:{password}@{domain}/{to_email1}/{to_email2}/{to_emailN}`

## Prise en Charge Intégrée des Fournisseurs

Apprise détecte automatiquement de nombreux fournisseurs e-mail à partir de l'adresse **From** déduite de votre URL.
Lorsqu'un fournisseur est reconnu, Apprise configure automatiquement :

- l'hôte SMTP ;
- le port ;
- le mode sécurisé (SSL ou STARTTLS) ;
- le format d'identification (adresse e-mail complète ou identifiant).

Dans la plupart des cas, il vous suffit de fournir votre adresse e-mail et votre mot de passe.

| Fournisseur                                  | Exemple d'URL                                                       | Remarques                                                                                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Google (Gmail)**                           | `mailto://user:app-password@gmail.com`                              | Si la validation en 2 étapes est activée, générez un mot de passe d'application : <https://security.google.com/settings/security/apppasswords> |
| **Yahoo**                                    | `mailto://user:app-password@yahoo.com`                              | Nécessite un mot de passe d'application : <https://help.yahoo.com/kb/SLN15241.html>                                                            |
| **Fastmail**                                 | `mailto://user:app-password@fastmail.com`                           | Le mot de passe d'application doit autoriser SMTP. Voir les domaines pris en charge [ici](./fastmail/).                                        |
| **GMX**                                      | `mailto://user:password@gmx.net`                                    | Prend aussi en charge `gmx.com`, `gmx.de`, `gmx.at`, `gmx.ch`, `gmx.fr`.                                                                       |
| **Zoho**                                     | `mailto://user:password@zoho.com`                                   | Les valeurs par défaut du fournisseur sont appliquées automatiquement.                                                                         |
| **Yandex**                                   | `mailto://user:password@yandex.com`                                 | La connexion peut reposer sur l'identifiant utilisateur selon les règles du domaine.                                                           |
| **SendGrid (SMTP)**                          | `mailto://apikey:password@sendgrid.com?from=noreply@yourdomain.com` | `from=` doit utiliser une identité d'expéditeur validée.                                                                                       |
| **QQ / Foxmail**                             | `mailto://user:password@qq.com`                                     | Les valeurs par défaut du fournisseur sont appliquées automatiquement.                                                                         |
| **163.com**                                  | `mailto://user:password@163.com`                                    | Les valeurs par défaut du fournisseur sont appliquées automatiquement.                                                                         |
| **Microsoft (Outlook, Hotmail, Office 365)** | _Utilisez `azure://` à la place_                                    | Microsoft a désactivé l'authentification SMTP basique. Utilisez le plugin [`azure://`](../office365/).                                         |

> Cette liste n'est pas exhaustive. Des domaines supplémentaires sont détectés automatiquement lorsqu'ils sont pris en charge.

:::tip[Mise à Niveau Sécurisée Automatique]

Lorsqu'un fournisseur pris en charge est détecté, Apprise force automatiquement une connexion sécurisée avec le bon mode TLS et le bon port.

Même si vous utilisez `mailto://`, un mode sécurisé est appliqué si le modèle du fournisseur le définit.

Si vous précisez explicitement `smtp=`, Apprise considère que vous surchargez la détection automatique du fournisseur.

:::

## Format des Adresses E-mail

Les adresses e-mail peuvent être écrites comme suit :

- `user@example.com`
- `Optional Name<user@example.com>`

Cette syntaxe fonctionne dans :

- les cibles de l'URL ;
- `from=` ;
- `cc=` ;
- `bcc=` ;
- `reply=`.

Si vous avez besoin d'espaces dans une URL, encodez-les en `%20`.

Exemple :

```text
from=Optional%20Name<noreply@example.com>
```

## Comportement des Destinataires

| Ce que vous précisez              | Ce qui se passe                                                        |
| --------------------------------- | ---------------------------------------------------------------------- |
| Aucun destinataire et aucun `to=` | Apprise envoie l'e-mail à l'adresse expéditeur (adresse From déduite). |
| Cibles dans le chemin URL         | Chaque cible devient un destinataire.                                  |
| `to=` dans la query string        | Traité comme un destinataire supplémentaire.                           |
| `cc=` / `bcc=`                    | Appliqué à chaque e-mail généré.                                       |
| `reply=`                          | Définit l'en-tête Reply-To, potentiellement avec plusieurs adresses.   |

## Utiliser des Serveurs SMTP Personnalisés

Si votre fournisseur n'est pas détecté automatiquement, configurez SMTP manuellement.

Valeurs par défaut :

- `mailto://` : port **25**
- `mailtos://` : port **587** avec STARTTLS

La plupart des fournisseurs publics exigent TLS. Préférez `mailtos://` pour les serveurs externes.

### Exemples SMTP Authentifié

Envoyer via un hôte SMTP personnalisé :

- `mailtos://user:password@server.com?smtp=smtp.server.com&from=noreply@server.com`

Inclure un nom d'affichage pour l'expéditeur :

- `mailtos://user:password@server.com?smtp=smtp.server.com&from=Optional%20Name<noreply@server.com>`

Forcer SSL, généralement sur le port 465 :

- `mailtos://user:password@server.com:465?smtp=smtp.server.com&mode=ssl&from=noreply@server.com`

## Relais Local sans Authentification

Si vous utilisez Postfix, Exim ou un autre relais interne qui ne requiert pas d'authentification, omettez `user` et `pass`.

```text
mailto://localhost?from=john@example.ca
```

Hôte de relais interne :

```text
mailto://relay-server?from=noreply@example.com&to=alerts@example.com
```

Si l'hôte SMTP diffère de l'hôte indiqué dans l'URL :

```text
mailto://server.com?smtp=smtp.server.com&from=noreply@server.com
```

## Nom d'Expéditeur vs Adresse d'Expéditeur

Si vous souhaitez définir un nom d'affichage, vous pouvez utiliser :

- `from=Optional%20Name<noreply@example.com>` (recommandé)
- `name=Optional%20Name&from=noreply@example.com`

Si les deux sont fournis, le nom intégré à `from=` est prioritaire.

## Manipulation des En-têtes

Email prend en charge l'injection d'en-têtes personnalisés en préfixant les clés de requête avec le symbole plus (**+**).

Cela est utile pour les filtres de messagerie, le routage interne et le marquage.

### Un En-tête

Définissez :

- `X-Token: abcdefg`

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
  "mailto://localhost?to=john@example.ca&+X-Token=abcdefg"
```

### Plusieurs En-têtes

Si vous devez contrôler certains des en-têtes envoyés au serveur de messagerie, vous pouvez générer des arguments mot-clé préfixés avec le symbole plus (`+`).

Par exemple, si vous souhaitez aussi transmettre les en-têtes e-mail suivants dans le payload :

- `X-Token: abcdefg`
- `X-Apprise: is great`

Vous structurerez alors votre e-mail comme ceci :

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
  "mailto://localhost?to=john@example.ca&+X-Token=abcdefg&+X-Apprise=is%20great"
```

### Remarques

- Les valeurs des en-têtes doivent être encodées dans l'URL lorsqu'elles contiennent des espaces.
- Apprise renseigne automatiquement `X-Application` et fusionne tous les en-têtes que vous définissez.

## Plusieurs Destinataires

Par défaut, `mailto://user:pass@domain` envoie à `user@domain`, sauf si `to=` est précisé.

Envoyer à plusieurs destinataires via la forme query ou la forme chemin :

- `mailto://user:pass@domain/?to=target@example.com,target2@example.com`
- `mailto://user:pass@domain/target@example.com/target2@example.com`
- `mailto://user:pass@domain/Accounting<accounting@example.com>/Billing<billing@example.com>`

Il n'existe pas de limite codifiée en dur au nombre de destinataires, même si votre serveur SMTP peut en imposer une.

`cc=` et `bcc=` s'appliquent à chaque e-mail envoyé. Si vous notifiez 3 destinataires, les mêmes listes cc et bcc sont utilisées pour chaque e-mail généré.

## Pièces Jointes

Les pièces jointes sont entièrement prises en charge.

Les limites de votre fournisseur SMTP peuvent s'appliquer. Apprise n'impose pas lui-même de restriction de taille sur les pièces jointes.

## Détail des Paramètres

| Variable | Requis | Description                                                                                                             |
| -------- | -----: | ----------------------------------------------------------------------------------------------------------------------- |
| user     |  Oui\* | Nom d'utilisateur SMTP. Peut être un identifiant ou une adresse e-mail complète. Peut aussi être précisé avec `?user=`. |
| pass     |  Oui\* | Mot de passe SMTP. Peut aussi être précisé avec `?pass=`.                                                               |
| domain   |    Oui | Partie domaine de l'hôte URL. Pour `mailto://user:pass@example.com`, le domaine est `example.com`.                      |
| port     |    Non | Port SMTP. Par défaut : 25 (`mailto`) et 587 (`mailtos`) sauf si des valeurs fournisseur s'appliquent.                  |
| smtp     |    Non | Surcharge l'hôte SMTP. Si défini, la détection fournisseur est contournée.                                              |
| from     |    Non | Adresse expéditeur. Prend en charge `Optional Name<email@example.com>`. Correspond à l'en-tête From.                    |
| name     |    Non | Alias historique pour le nom d'expéditeur. Si `from=` et `name=` sont fournis, `from=` est prioritaire.                 |
| to       |    Non | Surcharge du destinataire. Pris en charge aussi via les cibles dans le chemin URL.                                      |
| cc       |    Non | Destinataires en copie. Séparés par des virgules. Le formatage des noms est pris en charge.                             |
| bcc      |    Non | Destinataires en copie cachée. Séparés par des virgules. Le formatage des noms est pris en charge.                      |
| reply    |    Non | Destinataires Reply-To. Séparés par des virgules. Le formatage des noms est pris en charge.                             |
| mode     |    Non | Mode sécurisé : `ssl` ou `starttls`. Avec `mailto://`, préciser `mode=` force une connexion sécurisée.                  |
| pgp      |    Non | Active le chiffrement PGP (`yes` ou `no`). La valeur par défaut est `no`.                                               |
| pgpkey   |    Non | Chemin vers une clé publique PGP (clé d'entrée : `pgpkey`). Considéré comme sensible.                                   |
| +Header  |    Non | Ajoute des en-têtes e-mail personnalisés en préfixant les clés avec `+`. Exemple : `?+X-Team=Ops`.                      |

**\*** Non requis pour les relais anonymes.

Pour éviter toute ambiguïté, tout paramètre d'URL (`?key=value`) surcharge les valeurs définies dans l'URL principale :

- `mailto://usera:pass123@domain.com?user=foobar` : l'utilisateur `foobar` surcharge l'utilisateur `usera` défini dans l'URL. En revanche, comme le mot de passe n'est pas surchargé, `pass123` reste utilisé.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Exemple avec un fournisseur intégré :

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
    mailto:///example:mypassword@gmail.com
```

Envoyer un e-mail via un fournisseur personnalisé ; comme aucun `smtp=` n'est précisé, l'hôte `example.com` est aussi supposé être le serveur SMTP :

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://george:pass123@example.com

# L'URL ci-dessus aurait aussi pu être écrite comme ceci :
#  mailto://example.com?user=george&pass=pass123
```

Si le serveur SMTP diffère du domaine, ce qui est généralement le cas, votre URL doit inclure l'argument `?smtp=` :

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://george:pass123@example.com?smtp=smtp.example.com
```

Dans certains cas, `{user}` est une adresse e-mail complète. Vous pouvez alors placer cette information dans les paramètres de l'URL :

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george@example.com
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailto://example.com?user=george@example.com&pass=pass123"

# Notez que l'esperluette (&), utilisée dans l'URL pour séparer
# les arguments, est aussi interprétée par le CLI comme une exécution
# en arrière-plan. Encadrez donc votre URL de guillemets.

# Envoyer un e-mail vers un serveur relais SMTP que vous hébergez :
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://localhost?from=john@example.ca
```

Les utilisateurs de serveurs SMTP personnalisés auront besoin d'une configuration légèrement plus complexe :

```bash
# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use starttls (port 587)
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://_?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com"

# Remarques (pour l'URL ci-dessus) :
# - Comme aucun `to=` n'a été précisé, c'est l'adresse `from` qui est notifiée
# - `mailtos://` utilise starttls sur 587 par défaut ; si vous voulez utiliser
#   le port 465 (SSL), ajoutez simplement `mode=ssl` aux paramètres de l'URL.
```

Voici un exemple plus avancé où vous souhaitez utiliser `ssl` et un port personnalisé :

````bash
# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use ssl on port 12522
# Assuming you want your email to go to bob@example.com and jane@yahoo.ca
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://example.com:12522?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com&to=bob@example.com,jane@yahoo.ca&mode=ssl"

Relais local :
```bash
apprise -t "Test Title" -b "Test Body" \
   mailto://localhost?to=john@example.com
````
