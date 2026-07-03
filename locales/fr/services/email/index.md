---
title: "Notifications Email"
description: "Envoyer des notifications avec SMTP et les fournisseurs e-mail intégrés."
sidebar:
  label: "Email"

schemas:
  - mailto: insecure
  - mailtos

has_email: true
has_attachments: true

sample_urls:
  - mailto://userid:pass@domain.com
  - mailtos://domain.com?user=userid&pass=password
  - mailtos://domain.com:465?user=userid&pass=password
  - mailto://mySendingUsername:mySendingPassword@example.com?to=receivingAddress@example.com
  - mailto://userid:password@example.com?smtp=mail.example.com&from=noreply@example.com&name=no%20reply
---

<!-- SPONSORS:BANNER -->
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

| Fournisseur                                  | Exemple d'URL                                                       | Remarques                                                                                                                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Google (Gmail)**                           | `mailto://user:app-password@gmail.com`                              | Si la validation en 2 étapes est activée, générez un mot de passe d'application : [https://security.google.com/settings/security/apppasswords](https://security.google.com/settings/security/apppasswords) |
| **Yahoo**                                    | `mailto://user:app-password@yahoo.com`                              | Nécessite un mot de passe d'application : [https://help.yahoo.com/kb/SLN15241.html](https://help.yahoo.com/kb/SLN15241.html)                                                                               |
| **Fastmail**                                 | `mailto://user:app-password@fastmail.com`                           | Le mot de passe d'application doit autoriser SMTP. Voir les domaines pris en charge [ici](./fastmail/).                                                                                                    |
| **GMX**                                      | `mailto://user:password@gmx.net`                                    | Prend aussi en charge `gmx.com`, `gmx.de`, `gmx.at`, `gmx.ch`, `gmx.fr`.                                                                                                                                   |
| **Zoho**                                     | `mailto://user:password@zoho.com`                                   | Les valeurs par défaut du fournisseur sont appliquées automatiquement.                                                                                                                                     |
| **Yandex**                                   | `mailto://user:password@yandex.com`                                 | La connexion peut reposer sur l'identifiant utilisateur selon les règles du domaine.                                                                                                                       |
| **SendGrid (SMTP)**                          | `mailto://apikey:password@sendgrid.com?from=noreply@yourdomain.com` | `from=` doit utiliser une identité d'expéditeur validée.                                                                                                                                                   |
| **QQ / Foxmail**                             | `mailto://user:password@qq.com`                                     | Les valeurs par défaut du fournisseur sont appliquées automatiquement.                                                                                                                                     |
| **163.com**                                  | `mailto://user:password@163.com`                                    | Les valeurs par défaut du fournisseur sont appliquées automatiquement.                                                                                                                                     |
| **Microsoft (Outlook, Hotmail, Office 365)** | _Utilisez `azure://` à la place_                                    | Microsoft a désactivé l'authentification SMTP basique. Utilisez le plugin [`azure://`](../office365/).                                                                                                     |

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

```text
mailtos://user:password@server.com?smtp=smtp.server.com&from=noreply@server.com
```

Inclure un nom d'affichage pour l'expéditeur :

```text
mailtos://user:password@server.com?smtp=smtp.server.com&from=Optional%20Name<noreply@server.com>
```

Forcer SSL, généralement sur le port 465 :

```text
mailtos://user:password@server.com:465?smtp=smtp.server.com&mode=ssl&from=noreply@server.com
```

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

L'adresse d'expéditeur comporte deux composantes : l'**adresse email** et le **nom d'affichage** facultatif (ce que les destinataires voient dans leur client mail à la place d'une adresse brute).

**Forme historique -- toujours entièrement supportée :** `name=` n'acceptait qu'une chaîne de nom d'affichage ; `from=` n'acceptait qu'une adresse email. Utilisés ensemble, ils étaient combinés :

```text
name=No%20Reply&from=noreply@example.com
# Résultat : "No Reply" <noreply@example.com>
```

**Forme moderne -- recommandée :** Apprise analyse désormais le format `Nom d'Affichage <email@example.com>` dans `from=` et `name=`. L'un ou l'autre paramètre peut fournir les deux composantes en une seule valeur. L'approche recommandée est d'utiliser `from=` seul :

```text
from=No%20Reply <noreply@example.com>
# Résultat : "No Reply" <noreply@example.com>
```

Lorsque `from=` contient une valeur `Nom <email>` complète, il est autonome -- il n'est pas nécessaire de fournir également `name=`.

**Récapitulatif des comportements :**

| Paramètres              | Nom d'affichage        | Adresse email                   |
| ----------------------- | ---------------------- | ------------------------------- |
| `from=email` seul       | Nom de l'appli (repli) | Valeur de `from=`               |
| `name=Nom` seul         | Valeur de `name=`      | Dérivée de user + host de l'URL |
| `from=email&name=Nom`   | Valeur de `name=`      | Valeur de `from=`               |
| `from=Nom <email>` seul | Nom intégré            | Email intégré                   |
| `name=Nom <email>` seul | Nom intégré            | Email intégré                   |

:::caution
Ne combinez pas `name=` avec une valeur `from=` qui intègre déjà un nom d'affichage (ex. `from=Nom <email>&name=Autre`). Les deux sont combinés de manière indéfinie et peuvent produire un en-tête From malformé. Utilisez `from=Nom <email>` seul lorsque la forme combinée est souhaitée.
:::

## Manipulation des En-têtes

Email prend en charge l'injection d'en-têtes personnalisés en préfixant les clés de requête avec le symbole plus (**+**).

Cela est utile pour les filtres de messagerie, le routage interne et le marquage.

### Un En-tête

Définissez :

- `X-Token: abcdefg`

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
  "mailto://localhost?to=john@example.ca&+X-Token=abcdefg"
```

### Plusieurs En-têtes

Si vous devez contrôler certains des en-têtes envoyés au serveur de messagerie, vous pouvez générer des arguments mot-clé préfixés avec le symbole plus (`+`).

Par exemple, si vous souhaitez aussi transmettre les en-têtes e-mail suivants dans le payload :

- `X-Token: abcdefg`
- `X-Apprise: is great`

Vous structurerez alors votre e-mail comme ceci :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
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

## Pièces Jointes Intégrées (RFC 2387)

Par défaut, toutes les pièces jointes sont envoyées comme téléchargements standards (`Content-Disposition: attachment`). Ajouter `?inline=yes` à votre URL demande à Apprise d'incorporer les pièces jointes de type image **dans** le corps de l'e-mail, en utilisant la structure MIME `multipart/related` définie dans la [RFC 2387](https://datatracker.ietf.org/doc/html/rfc2387) et le schéma d'URI `cid:` de la [RFC 2392](https://datatracker.ietf.org/doc/html/rfc2392).

### Fonctionnement

Lorsque `inline=yes` est défini :

- **E-mails HTML** -- Apprise analyse le corps à la recherche de références `cid:nom_de_fichier` existantes. Pour chaque pièce jointe de type image (type MIME `image/*`) qui n'est pas encore référencée, Apprise ajoute automatiquement `<br/><img src="cid:nom_de_fichier">` à la fin du corps, de sorte que chaque image soit toujours visible en ligne. L'enveloppe MIME passe de `multipart/mixed` à `multipart/related`, et chaque pièce jointe intégrée reçoit les en-têtes `Content-Disposition: inline` et `Content-ID`.
- **E-mails en texte brut** -- les images ne peuvent pas être incorporées dans du texte brut. Apprise ajoute à la place des lignes `[Image: nom_de_fichier]` au corps, afin que le destinataire sache que des images sont jointes. La pièce jointe est tout de même envoyée comme téléchargement standard.
- **Pièces jointes non-images** -- les fichiers qui ne sont pas des images (PDF, tableurs, etc.) sont toujours envoyés comme téléchargements standards, quel que soit le paramètre `inline=`.

### Référencer les images manuellement

Si vous écrivez vous-même des références `cid:` dans un corps HTML, Apprise les respecte et n'ajoute pas d'ancre en doublon :

```text
<p>Voir le graphique ci-dessous :</p>
<img src="cid:chart.png">
```

Lorsque `inline=yes` est actif et que `chart.png` fait partie des pièces jointes, aucune ancre supplémentaire n'est ajoutée -- la pièce jointe est quand même intégrée via l'en-tête `Content-ID`.

### Références cid: sans pièce jointe correspondante

Si une référence `cid:nom_de_fichier` apparaît dans le corps mais qu'aucune pièce jointe portant ce nom exact n'a été fournie, Apprise enregistre un avertissement pour vous aider à déboguer l'incohérence :

```text
Email inline: no attachment matches cid:chart.png -- check the filename.
```

### Exemple

Envoyer un e-mail HTML avec une image intégrée en ligne :

```bash
apprise -vv -t "Rapport" -b "<h1>Résumé</h1><p>Voir le graphique ci-joint.</p>" \
    "mailto://user:pass@example.com?inline=yes" \
    --attach /chemin/vers/chart.png
```

## Sécurité PGP

Apprise prend en charge deux modes PGP pour les e-mails sortants, sélectionnés avec le paramètre `?pgp=`.

| Mode          | Ce qu'il fait                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `pgp=no`      | Aucun PGP (par défaut).                                                                                                            |
| `pgp=sign`    | Signe l'e-mail avec la clé privée de l'expéditeur. Chiffre aussi opportunément si une clé publique du destinataire est disponible. |
| `pgp=encrypt` | Chiffre l'e-mail avec la clé publique du destinataire. Aucune signature.                                                           |

Ces deux modes nécessitent le package Python [pgpy](https://pypi.org/project/pgpy/) :

```bash
pip install pgpy
```

Si pgpy n'est pas installé, Apprise enregistre un avertissement et envoie le message sans protection PGP.

### Signature (`pgp=sign`)

La signature prouve que l'e-mail vient bien de vous. Apprise crée une signature détachée avec votre clé privée et encapsule l'e-mail dans un conteneur MIME `multipart/signed` ([RFC 3156](https://datatracker.ietf.org/doc/html/rfc3156)).

Indiquez le chemin vers votre clé privée blindée ASCII avec `pgpprv=` :

```text
mailtos://user:pass@example.com?pgp=sign&pgpprv=/chemin/vers/ma-clé-prv.asc
```

Si aucune clé privée n'est trouvée lors de l'envoi, la notification échoue. Si la clé est protégée par une phrase de passe, Apprise la rejette (les clés protégées par phrase de passe ne sont pas prises en charge).

Apprise recherche aussi automatiquement dans le répertoire de stockage persistant : il y cherche un fichier nommé `{email}-prv.asc`, `pgp-prv.asc`, `prv.asc` ou `pgp-private.asc`. Si un tel fichier s'y trouve, le paramètre `pgpprv=` n'est pas nécessaire.

### Signer + Chiffrer (Opportuniste)

Lorsque `pgp=sign` est actif et qu'une clé publique du destinataire est disponible, Apprise va plus loin : il signe d'abord le message, puis chiffre le résultat signé. Le résultat est un `multipart/encrypted` — le destinataire bénéficie d'une protection de bout en bout ainsi que d'une preuve d'authenticité de l'expéditeur.

Le chiffrement est opportuniste — il ne se produit que si une clé publique est trouvée. Si aucune clé publique n'est disponible, l'e-mail est envoyé uniquement en `multipart/signed`, sans chiffrement. L'envoi n'échoue jamais silencieusement à cause d'une clé publique manquante en mode signature.

Pour déclencher la signature + chiffrement, combinez `pgp=sign` avec la découverte WKD ou une clé publique explicite :

```text
mailtos://user:pass@example.com?pgp=sign&wkd=yes&pgpprv=/chemin/vers/ma-clé-prv.asc
```

```text
mailtos://user:pass@example.com?pgp=sign&pgppub=/chemin/vers/destinataire-pub.asc&pgpprv=/chemin/vers/ma-clé-prv.asc
```

### Chiffrement Seul (`pgp=encrypt`)

Lorsque `pgp=encrypt` est défini, Apprise chiffre le corps de l'e-mail avec la clé publique du destinataire avant de le remettre au serveur SMTP. Aucune signature n'est appliquée. Le serveur et les relais intermédiaires ne voient jamais le texte en clair.

```text
mailtos://user:pass@example.com?pgp=encrypt&pgppub=/chemin/vers/destinataire-pub.asc
```

### Ordre de Découverte des Clés

Pour les **clés publiques** (utilisées par `pgp=encrypt` et l'étape de chiffrement opportuniste de `pgp=sign`), Apprise cherche dans ces sources dans l'ordre et utilise la première clé trouvée :

1. **Fichier de clé explicite** -- un fichier `.asc` fourni via `pgppub=`
1. **Web Key Directory (WKD)** -- récupération automatique via HTTPS, activée avec `wkd=yes`
1. **Fichier de clé local** -- Apprise parcourt le répertoire d'espace de noms du stockage persistant en cherchant les noms de fichiers listés dans le [tableau de recherche des clés publiques](#ordre-de-recherche-des-cles-publiques) ci-dessous
1. **Paire de clés générée automatiquement** -- créée lors de la première utilisation lorsque le stockage persistant est configuré et que `pgp_autogen` est activé dans l'asset (uniquement pour `pgp=encrypt` ; l'étape opportuniste de `pgp=sign` ne génère jamais de clé automatiquement)

Pour les **clés privées** (utilisées par `pgp=sign`), Apprise cherche :

1. **Fichier de clé explicite** -- un fichier `.asc` fourni via `pgpprv=`
1. **Fichier de clé local** -- Apprise parcourt le répertoire d'espace de noms du stockage persistant en cherchant les noms de fichiers listés dans le [tableau de recherche des clés privées](#ordre-de-recherche-des-cles-privees) ci-dessous

### Web Key Directory (WKD)

Le WKD ([RFC 9080](https://datatracker.ietf.org/doc/html/rfc9080)) est un standard qui permet aux clients de messagerie de récupérer automatiquement la clé publique d'un destinataire auprès de son fournisseur, sans échange manuel de clé. Si le fournisseur du destinataire publie sa clé via WKD, activer `wkd=yes` est tout ce qu'il faut -- aucun fichier de clé, aucune importation manuelle.

Définir `wkd=yes` implique automatiquement `pgp=encrypt`, ainsi les deux URL suivantes sont équivalentes :

```text
mailtos://user:pass@example.com?wkd=yes
mailtos://user:pass@example.com?pgp=encrypt&wkd=yes
```

Apprise essaie deux formes d'URL (méthode sous-domaine en premier, puis méthode directe) et met en cache les résultats en mémoire pour la durée de la session. Si aucune URL ne retourne de clé, Apprise passe à la méthode de découverte suivante.

:::tip[Chiffrement sans configuration]

Pour les destinataires chez des fournisseurs qui publient des clés WKD (Proton Mail, Fastmail et de nombreuses installations auto-hébergées), `wkd=yes` est la façon la plus simple d'obtenir un e-mail chiffré de bout en bout -- aucun fichier de clé à gérer, aucune génération de clé requise.

:::

### Clés Générées Automatiquement

Lorsqu'aucune clé publique n'est trouvée par une autre méthode, Apprise génère une nouvelle paire de clés RSA-2048 et écrit **les deux** fichiers dans le répertoire d'espace de noms du stockage persistant :

| Fichier               | Rôle                                                           |
| --------------------- | -------------------------------------------------------------- |
| `{localpart}-pub.asc` | Clé publique — utilisée pour chiffrer les messages sortants    |
| `{localpart}-prv.asc` | Clé privée — découverte automatiquement par le mode `pgp=sign` |

`{localpart}` est la partie de l'adresse From de l'expéditeur avant le `@`, en minuscules. Pour `user@example.com`, les fichiers sont `user-pub.asc` et `user-prv.asc`.

Comme `keygen()` écrit la clé privée en même temps que la clé publique, un seul envoi `pgp=encrypt` qui déclenche la génération automatique rend aussi la signature disponible. Tout envoi `pgp=sign` ultérieur pointant vers le même stockage découvrira `user-prv.asc` sans paramètre `pgpprv=`.

La génération automatique est activée par défaut lorsque le [stockage persistant](/library/persistent-storage/) est configuré. Elle peut être désactivée au niveau de l'asset en définissant `pgp_autogen = False`. Notez que `pgp_autogen` ne concerne que `pgp=encrypt` -- l'étape de chiffrement opportuniste de `pgp=sign` ne génère jamais de clé automatiquement.

### Emplacement des Fichiers de Clé

Apprise stocke le matériel de clé dans un **répertoire d'espace de noms haché** sous `storage_path`. Le nom du répertoire est un hachage de 8 caractères dérivé de manière déterministe à partir de l'URL, de sorte que la même URL pointe toujours vers le même répertoire. Utilisez `pgppub=` et `pgpprv=` pour pointer vers des chemins absolus n'importe où sur le système de fichiers si vous préférez ne pas utiliser le cache.

#### Ordre de Recherche des Clés Publiques

Les clés publiques sont recherchées en fonction des adresses e-mail des **destinataires** (premier résultat trouvé est utilisé) :

| Priorité | Exemple de nom de fichier                                              |
| -------- | ---------------------------------------------------------------------- |
| 1        | `{destinataire@domaine.com}-pub.asc` (adresse complète, en minuscules) |
| 1        | `{destinataire}-pub.asc` (partie locale seulement, en minuscules)      |
| 2        | `pgp-public.asc`                                                       |
| 2        | `pgp-pub.asc`                                                          |
| 2        | `public.asc`                                                           |
| 2        | `pub.asc`                                                              |

Les entrées de priorité 1 sont générées pour chaque destinataire dans l'ordre ; les noms de fichiers de base (priorité 2) sont essayés en dernier.

#### Ordre de Recherche des Clés Privées

Les clés privées sont recherchées en fonction de l'adresse **expéditeur** (From) (premier résultat trouvé est utilisé) :

| Priorité | Exemple de nom de fichier                                                        |
| -------- | -------------------------------------------------------------------------------- |
| 1        | `{expediteur@domaine.com}-prv.asc` (adresse complète, en minuscules)             |
| 1        | `{expediteur}-prv.asc` (partie locale seulement — c'est ce que `keygen()` écrit) |
| 2        | `pgp-private.asc`                                                                |
| 2        | `pgp-prv.asc`                                                                    |
| 2        | `private.asc`                                                                    |
| 2        | `prv.asc`                                                                        |

Les clés privées protégées par une phrase de passe sont rejetées, quelle que soit leur méthode de découverte.

#### Spécifier les Clés via un Fichier de Configuration

Lorsque vous gérez Apprise via un [fichier de configuration YAML](/library/configuration/), les paramètres `pgppub=` et `pgpprv=` peuvent être écrits comme des sous-clés YAML propres plutôt qu'être intégrés dans une longue chaîne d'URL. Ces deux paramètres étant gérés par le système Attachment d'Apprise, vous pouvez fournir aussi bien un chemin de fichier local qu'une URL HTTP/HTTPS :

```yaml
urls:
  - mailtos://user:pass@smtp.example.com/:
      pgp: sign
      pgpprv: /chemin/vers/ma-clé-prv.asc
      pgppub: http://interne.example.com/cles/destinataire-pub.asc
      wkd: "yes"
```

C'est particulièrement utile lorsque les chemins de clé sont longs ou contiennent des caractères qui nécessiteraient un encodage URL dans une chaîne de requête.

:::caution[Gardez les clés privées en local]
`pgpprv` supporte les URL HTTP via le même système Attachment, mais récupérer une clé privée sur le réseau l'expose à une interception. Utilisez toujours un chemin sur le système de fichiers local pour `pgpprv`.
:::

#### Placer une Clé dans le Cache

La façon la plus simple de fournir une clé sans utiliser `pgppub=` ou `pgpprv=` est de la copier dans le répertoire d'espace de noms du cache en utilisant l'un des noms de fichiers des tableaux de priorité ci-dessus. Apprise la détecte automatiquement au prochain envoi — aucune modification d'URL n'est nécessaire.

Pour trouver le répertoire d'espace de noms associé à une URL donnée, utilisez `apprise storage list` :

```bash
apprise storage list "mailtos://user:pass@example.com"
```

La colonne uid dans la sortie (ex. `2a3f8b1c`) est le hash d'espace de noms à 8 caractères de cette URL — le même identifiant affiché dans l'onglet de révision d'Apprise-API. Le répertoire de cache complet est `{storage-path}/2a3f8b1c/`. Copiez votre fichier de clé dans ce répertoire avec un nom correspondant — par exemple `user@example.com-pub.asc` pour une clé publique, ou `user-prv.asc` pour une clé privée — et Apprise la trouvera sans paramètre `pgppub=` ni `pgpprv=`.

#### Clés par destinataire (destinataires multiples)

Lorsque vous notifiez plusieurs destinataires dans une seule URL, Apprise envoie un **e-mail séparé par destinataire** et effectue la recherche de clé indépendamment pour chacun. Chaque destinataire peut donc avoir sa propre clé publique pré-placée dans le répertoire de cache et recevoir sa propre copie chiffrée individuellement.

Par exemple, pour envoyer un e-mail signé+chiffré à `alice@example.com` et `bob@example.com` :

```bash
# Trouvez d'abord le répertoire d'espace de noms pour votre URL d'envoi
apprise storage list "mailtos://user:pass@smtp.example.com"
# Sortie : uid 2a3f8b1c  → répertoire de cache : {storage-path}/2a3f8b1c/
```

Copiez la clé publique de chaque destinataire dans ce répertoire en utilisant le format de nom complet :

```bash
cp alice-key.asc {storage-path}/2a3f8b1c/alice@example.com-pub.asc
cp bob-key.asc   {storage-path}/2a3f8b1c/bob@example.com-pub.asc
```

Puis envoyez aux deux à la fois :

```bash
apprise -t "Bonjour" -b "Message secret" \
    "mailtos://user:pass@smtp.example.com/alice@example.com/bob@example.com?pgp=sign&pgpprv=/chemin/vers/ma-clé-prv.asc"
```

Apprise envoie deux e-mails séparés :

- Alice reçoit un message `multipart/signed+encrypted` chiffré avec `alice@example.com-pub.asc`.
- Bob reçoit un message `multipart/signed+encrypted` chiffré avec `bob@example.com-pub.asc`.

Si un fichier de clé est manquant pour un destinataire particulier, le repli opportuniste s'applique : ce destinataire reçoit une copie signée uniquement (non chiffrée). Les autres destinataires ne sont pas affectés — chaque envoi est indépendant.

:::note[Paramètre déprécié : `pgpkey=`]

Le paramètre `pgpkey=` a été renommé en `pgppub=` pour indiquer clairement qu'il référence une clé **publique**. Les URL existantes utilisant `pgpkey=` continuent de fonctionner mais génèrent un avertissement de dépréciation dans les logs. Mettez à jour vos URL pour utiliser `pgppub=` -- la prise en charge de `pgpkey=` sera supprimée dans une prochaine version.

:::

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                    |
| -------- | -----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     |  Oui\* | Nom d'utilisateur SMTP. Peut être un identifiant ou une adresse e-mail complète. Peut aussi être précisé avec `?user=`.                                                                                                                                        |
| pass     |  Oui\* | Mot de passe SMTP. Peut aussi être précisé avec `?pass=`.                                                                                                                                                                                                      |
| domain   |    Oui | Partie domaine de l'hôte URL. Pour `mailto://user:pass@example.com`, le domaine est `example.com`.                                                                                                                                                             |
| port     |    Non | Port SMTP. Par défaut : 25 (`mailto`) et 587 (`mailtos`) sauf si des valeurs fournisseur s'appliquent.                                                                                                                                                         |
| smtp     |    Non | Surcharge l'hôte SMTP. Si défini, la détection fournisseur est contournée.                                                                                                                                                                                     |
| from     |    Non | Adresse expéditeur. Accepte un email simple (`noreply@example.com`) ou une valeur combinée `Nom d'Affichage <email>`. En forme combinée, `name=` n'est pas nécessaire.                                                                                         |
| name     |    Non | Nom d'affichage de l'expéditeur. Historiquement, n'acceptait qu'une chaîne de nom ; accepte désormais aussi le format `Nom <email>`. Utilisé avec `from=`, `name=` fournit le nom et `from=` l'email. Ne pas combiner avec un `from=` qui intègre déjà un nom. |
| to       |    Non | Surcharge du destinataire. Pris en charge aussi via les cibles dans le chemin URL.                                                                                                                                                                             |
| cc       |    Non | Destinataires en copie. Séparés par des virgules. Le formatage des noms est pris en charge.                                                                                                                                                                    |
| bcc      |    Non | Destinataires en copie cachée. Séparés par des virgules. Le formatage des noms est pris en charge.                                                                                                                                                             |
| reply    |    Non | Destinataires Reply-To. Séparés par des virgules. Le formatage des noms est pris en charge.                                                                                                                                                                    |
| mode     |    Non | Mode sécurisé : `ssl` ou `starttls`. Avec `mailto://`, préciser `mode=` force une connexion sécurisée.                                                                                                                                                         |
| pgp      |    Non | Mode PGP : `no` (par défaut), `sign` ou `encrypt`. Abréviations acceptées : `n`, `s`, `e`. Les valeurs `yes`/`true` impliquent `encrypt` (dépréciées). `none`/`false` correspondent à `no`.                                                                    |
| pgppub   |    Non | Chemin ou URL vers la clé PGP **publique** blindée ASCII (`.asc`) du destinataire. Si défini, WKD et la génération automatique sont ignorés. Masqué dans les URL anonymisées.                                                                                  |
| pgpprv   |    Non | Chemin vers la clé PGP **privée** blindée ASCII (`.asc`) de l'expéditeur. Requis pour `pgp=sign`. Les clés protégées par phrase de passe ne sont pas prises en charge. Masqué dans les URL anonymisées.                                                        |
| pgpkey   |    Non | **Déprécié.** Alias de `pgppub=`. Toujours accepté mais génère un avertissement de dépréciation. Sera supprimé dans une prochaine version. Utilisez `pgppub=` à la place.                                                                                      |
| wkd      |    Non | Active la découverte de clé via Web Key Directory (`yes` ou `no`). Par défaut : `no`. Définir `wkd=yes` implique `pgp=encrypt` si `pgp=` n'est pas précisé.                                                                                                    |
| inline   |    Non | Incorpore les pièces jointes de type image dans le corps des e-mails HTML (`yes` ou `no`). Par défaut : `no`. Voir [Pièces Jointes Intégrées](#pieces-jointes-integrees-rfc-2387).                                                                              |
| +Header  |    Non | Ajoute des en-têtes e-mail personnalisés en préfixant les clés avec `+`. Exemple : `?+X-Team=Ops`.                                                                                                                                                             |

**\*** Non requis pour les relais anonymes.

Pour éviter toute ambiguïté, tout paramètre d'URL (`?key=value`) surcharge les valeurs définies dans l'URL principale :

- `mailto://usera:pass123@domain.com?user=foobar` : l'utilisateur `foobar` surcharge l'utilisateur `usera` défini dans l'URL. En revanche, comme le mot de passe n'est pas surchargé, `pass123` reste utilisé.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Exemple avec un fournisseur intégré :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
    mailto:///example:mypassword@gmail.com
```

Envoyer un e-mail via un fournisseur personnalisé ; comme aucun `smtp=` n'est précisé, l'hôte `example.com` est aussi supposé être le serveur SMTP :

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george
# Assuming the {password} is pass123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   mailto://george:pass123@example.com

# L'URL ci-dessus aurait aussi pu être écrite comme ceci :
#  mailto://example.com?user=george&pass=pass123
```

Si le serveur SMTP diffère du domaine, ce qui est généralement le cas, votre URL doit inclure l'argument `?smtp=` :

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george
# Assuming the {password} is pass123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   mailto://george:pass123@example.com?smtp=smtp.example.com
```

Dans certains cas, `{user}` est une adresse e-mail complète. Vous pouvez alors placer cette information dans les paramètres de l'URL :

```bash
# Assuming the {domain} is example.com
# Assuming the {user} is george@example.com
# Assuming the {password} is pass123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mailto://example.com?user=george@example.com&pass=pass123"

# Notez que l'esperluette (&), utilisée dans l'URL pour séparer
# les arguments, est aussi interprétée par le CLI comme une exécution
# en arrière-plan. Encadrez donc votre URL de guillemets.

# Envoyer un e-mail vers un serveur relais SMTP que vous hébergez :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   mailto://localhost?from=john@example.ca
```

Les utilisateurs de serveurs SMTP personnalisés auront besoin d'une configuration légèrement plus complexe :

```bash
# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use starttls (port 587)
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mailtos://_?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com"

# Remarques (pour l'URL ci-dessus) :
# - Comme aucun `to=` n'a été précisé, c'est l'adresse `from` qui est notifiée
# - `mailtos://` utilise starttls sur 587 par défaut ; si vous voulez utiliser
#   le port 465 (SSL), ajoutez simplement `mode=ssl` aux paramètres de l'URL.
```

Voici un exemple plus avancé où vous souhaitez utiliser `ssl` et un port personnalisé :

```bash
# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use ssl on port 12522
# Assuming you want your email to go to bob@example.com and jane@yahoo.ca
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mailtos://example.com:12522?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com&to=bob@example.com,jane@yahoo.ca&mode=ssl"
```

Relais local :

```bash
apprise -t "Titre de Test" -b "Corps de Test" \
   mailto://localhost?to=john@example.com
```

Chiffrement via la découverte de clé WKD (aucun fichier de clé requis ; `pgp=encrypt` est implicite) :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mailtos://user:pass@example.com?wkd=yes"
```

Chiffrement avec un fichier de clé publique local explicite :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mailtos://user:pass@example.com?pgp=encrypt&pgppub=/home/user/.gnupg/destinataire-pub.asc"
```

Signer chaque e-mail avec votre clé privée (chiffre aussi opportunément lorsque WKD retourne une clé publique) :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mailtos://user:pass@example.com?pgp=sign&wkd=yes&pgpprv=/home/user/.gnupg/ma-clé-prv.asc"
```

Signer uniquement — sans recherche de clé publique, l'e-mail signé en texte clair est toujours envoyé :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mailtos://user:pass@example.com?pgp=sign&pgpprv=/home/user/.gnupg/ma-clé-prv.asc"
```
