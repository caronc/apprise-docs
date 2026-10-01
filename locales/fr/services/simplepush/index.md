---
title: "Notifications Simplepush"
description: "Envoyer des tâches Simplepush à vos propres appareils, à des sujets ou à une organisation."
sidebar:
  label: "Simplepush"

source: https://simplepu.sh/

schemas:
  - spush
  - simplepush

has_attachments: true

body_formats:
  - markdown

sample_urls:
  - spush://{api_token}
  - spush://{api_token}/{topic}
  - spush://{password}@{api_token}/{topic}
  - spush://{integration_token}/@{member}
  - spush://{integration_token}/?broadcast=yes

limits:
  max_chars: 7000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Simplepush envoie des tâches et des notifications sur votre téléphone. Chaque message envoyé par Apprise arrive sous forme de tâche dans l'application Simplepush et y reste après la notification.

1. Installez l'application Simplepush et ouvrez ses paramètres. Votre **API Token** y est indiqué.
2. Pour envoyer vers un sujet, créez le sujet dans l'application et demandez aux destinataires de le rejoindre.
3. Pour envoyer au nom d'une organisation, un administrateur de l'organisation crée un jeton d'intégration :

   ```bash
   sp integration create --scopes send
   ```

   Le jeton a la forme `spi_<credential>.<seed>`. Utilisez-le à la place de l'API Token.

:::caution
Les URL écrites pour l'ancien service Simplepush (`spush://{apikey}`, `spush://{salt}:{password}@{apikey}` et l'option `event=`) ne fonctionnent plus. Récupérez un nouvel API Token dans l'application Simplepush actuelle et mettez vos URL à jour.
:::

### Chiffrement de bout en bout

Les messages, les liens et les pièces jointes peuvent être chiffrés de bout en bout avec XChaCha20-Poly1305, le même procédé que celui des applications Simplepush :

- **Envoi vers un sujet avec un mot de passe :** chiffré avec le mot de passe de ce sujet.
- **Envoi vers vos propres appareils avec un mot de passe :** chiffré avec votre mot de passe personnel (Personal Password).
- **Envoi d'organisation :** chiffré avec la clé de l'organisation dès que celle-ci a activé le chiffrement. Les envois d'organisation n'acceptent pas de mot de passe.

:::note
Le chiffrement nécessite le paquet Python `PyNaCl` :

```bash
pip install PyNaCl
```

Sans lui, Apprise refuse de charger une URL contenant un mot de passe, et un envoi d'organisation dont le chiffrement est activé échoue. Apprise n'envoie jamais votre message en clair à la place. Les envois sans chiffrement n'ont pas besoin de PyNaCl.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `spush://{api_token}`
- `spush://{api_token}/{topic}`
- `spush://{api_token}/{topic1}/{topic2}/{topicN}`
- `spush://{password}@{api_token}`
- `spush://{password}@{api_token}/{topic}`
- `spush://{integration_token}/{topic}`
- `spush://{integration_token}/@{member}`
- `spush://{integration_token}/{topic}/@{member1}/@{member2}`
- `spush://{integration_token}/?broadcast=yes`

`simplepush://` peut remplacer `spush://` dans chacune de ces formes.

## Détail des Paramètres

| Variable         | Obligatoire | Description                                                                                                                                                                                        |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_token        | Oui         | Votre API Token indiqué dans les paramètres de l'application, ou un jeton d'intégration d'organisation (`spi_...`).                                                                                |
| password         | Non         | Chiffre le message. Avec un sujet, il s'agit du mot de passe du sujet, sinon de votre mot de passe personnel. Non autorisé avec un jeton d'intégration.                                            |
| topic            | Non         | Un ou plusieurs sujets. Chaque sujet reçoit sa propre tâche.                                                                                                                                       |
| @member          | Non         | Un membre de l'organisation, précédé de `@`. Nécessite un jeton d'intégration.                                                                                                                     |
| to               | Non         | Sujets et `@membres` sous forme de liste séparée par des virgules. Une alternative à leur placement dans le chemin de l'URL.                                                                       |
| broadcast        | Non         | Mettez `yes` pour envoyer à tous les membres de l'organisation. Nécessite un jeton d'intégration et ne peut pas être combiné avec des sujets ou des membres.                                       |
| shared           | Non         | Mettez `yes` pour envoyer une seule tâche visible par tous les destinataires, la première réponse la résolvant. Par défaut, chaque destinataire reçoit sa propre copie.                            |
| priority         | Non         | De `1` (silencieux) à `5` (critique, sonne même sur un téléphone en mode silencieux). Les noms `minimal`, `low`, `default`, `high` et `critical` fonctionnent aussi. La valeur par défaut est `3`. |
| critical_volume  | Non         | Le volume du son d'alerte critique sur iOS, supérieur à `0` et au plus `1`. Nécessite `priority=5`.                                                                                                |
| sptag            | Non         | L'étiquette Simplepush affichée sur la tâche.                                                                                                                                                      |
| links            | Non         | Liens à joindre à la tâche, séparés par des espaces. 25 au maximum.                                                                                                                                |
| topic_auth_token | Non         | Le jeton d'authentification d'un sujet protégé.                                                                                                                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une tâche vers vos propres appareils :

```bash
# Supposons que :
#  - notre {api_token} soit abcdefghijklmn
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   spush://abcdefghijklmn
```

Envoyer vers un sujet, chiffré avec le mot de passe du sujet :

```bash
# Supposons que :
#  - notre {api_token} soit abcdefghijklmn
#  - notre {topic} soit deploys
#  - le mot de passe du sujet soit s3cret
apprise -vv -t "Déploiement terminé" -b "La version 2.4 est en ligne" \
   "spush://s3cret@abcdefghijklmn/deploys"
```

Envoyer une alerte critique avec une pièce jointe :

```bash
apprise -vv -t "Base de données en panne" -b "Le serveur principal est injoignable" \
   --attach /var/log/postgres.log \
   "spush://abcdefghijklmn/oncall?priority=5&critical_volume=0.5"
```

Envoyer à deux membres de l'organisation :

```bash
# Supposons que :
#  - notre {integration_token} soit spi_cred.seed
apprise -vv -t "Visite du site" -b "Merci de vérifier le portail nord" \
   "spush://spi_cred.seed/@Alice/@Bob"
```
