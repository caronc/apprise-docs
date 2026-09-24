---
title: "Notifications Mobile Message"
description: "Envoyer des notifications SMS vers des mobiles australiens via Mobile Message."
sidebar:
  label: "Mobile Message"

source: https://mobilemessage.com.au

schemas:
  - mobilemessage
  - mobilemsg

has_sms: true

sample_urls:
  - mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo}
  - mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

limits:
  max_chars: 1530
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Créez un compte sur [mobilemessage.com.au](https://mobilemessage.com.au/).
2. Connectez-vous et ouvrez **Settings** -> **API**. Créez une clé API, puis copiez son **nom d'utilisateur API** et son **mot de passe API**.
3. Ouvrez **Settings** -> **Sender IDs** et choisissez un identifiant d'expéditeur approuvé. Il peut s'agir d'un numéro dédié, d'un mobile vérifié ou d'un nom enregistré auprès de l'ACMA, comme `ALERTS`.

:::caution
Mobile Message ne livre que vers les mobiles australiens. Apprise écarte les autres numéros avant l'envoi.
:::

## Syntaxe

Les syntaxes valides sont les suivantes :

- `mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo}`
- `mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

Vous pouvez raccourcir `mobilemessage://` en `mobilemsg://`.

Utilisez le format local (`0412345678`) ou international (`61412345678`). Apprise convertit les numéros au format international.

## Détail des paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                      |
| --------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiUser   | \*Oui       | Le nom d'utilisateur API créé dans **Settings** -> **API**.                                                                                                                      |
| apiPass   | \*Oui       | Le mot de passe API fourni avec votre nom d'utilisateur API.                                                                                                                     |
| senderID  | \*Oui       | L'identifiant d'expéditeur utilisé pour la livraison. Il doit déjà être enregistré sur votre compte.                                                                             |
| toPhoneNo | \*Oui       | Un ou plusieurs numéros de mobile australiens. Séparez-les par un `/` dans le chemin de l'URL.                                                                                   |
| to        | Non         | Alias des numéros de destination. Accepte une liste séparée par des virgules et peut se combiner aux numéros présents dans le chemin de l'URL.                                   |
| from      | Non         | Alias de `senderID`. Pratique dans un fichier YAML pour placer l'identifiant d'expéditeur sur sa propre ligne.                                                                   |
| batch     | Non         | Regroupe jusqu'à 10 000 destinataires par requête plutôt que d'envoyer une requête par destinataire. Vaut `yes` par défaut.                                                      |
| unicode   | Non         | Conserve les émojis et les caractères accentués au lieu de les supprimer. Cette option réduit la taille de chaque partie et peut utiliser plus de crédits. Vaut `no` par défaut. |
| max_parts | Non         | Nombre maximal de parties par notification, entre `1` et `99`. Réduisez-le pour limiter le coût d'une alerte. Vaut `10` par défaut.                                              |
| ref       | Non         | Référence ajoutée à chaque message et renvoyée par le service. Elle facilite la recherche dans l'historique Mobile Message.                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

:::note
Les messages longs sont découpés en parties, et chaque partie coûte un crédit. Les parties GSM-7 contiennent 153 caractères, soit 1 530 par défaut. Avec `unicode=yes`, elles en contiennent 67, soit 670 par défaut.
:::

## Exemples

Envoyer une alerte vers un seul numéro :

```bash
# Supposons que notre nom d'utilisateur API soit apiuser01
# Supposons que notre mot de passe API soit s3cr3tpassw0rd
# Supposons que notre identifiant d'expéditeur soit ALERTS
apprise -vv -t "Titre du message de test" -b "Corps du message de test" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678"
```

Envoyer à plusieurs destinataires dans une seule requête :

```bash
apprise -vv -b "La tâche de sauvegarde a échoué" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678/0498765432"
```

Envoyer depuis un numéro dédié plutôt que depuis un nom alphanumérique :

```bash
apprise -vv -b "Le serveur est hors service" \
   "mobilemsg://apiuser01:s3cr3tpassw0rd@61400000000/0412345678"
```

Limiter une alerte à une seule partie pour contrôler son coût :

```bash
apprise -vv -b "Utilisation du disque au-delà de 90 %" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678?max_parts=1"
```

Autoriser les émojis et les caractères accentués, puis ajouter votre propre référence :

```bash
apprise -vv -b "Sauvegarde terminée, serveur café inclus" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678?unicode=yes&ref=nightly-backup"
```

Utiliser des paramètres de requête pour séparer les valeurs dans un fichier YAML :

```bash
apprise -vv -b "Bonjour tout le monde" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@?from=ALERTS&to=0412345678,0498765432"
```
