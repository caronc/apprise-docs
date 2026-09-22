---
title: "Notifications Fluxer"
description: "Envoyer des notifications via Fluxer."
sidebar:
  label: "Fluxer"

source: https://fluxer.app/
schemas:
  - fluxer: insecure
  - fluxers

sample_urls:
  - https://api.fluxer.app/webhooks/{WebhookID}/{WebhookToken}
  - https://api.fluxer.app/v1/webhooks/{WebhookID}/{WebhookToken}
  - fluxer://{WebhookID}/{WebhookToken}
  - fluxer://{botname}@{WebhookID}/{WebhookToken}
  - fluxers://{host}/{WebhookID}/{WebhookToken}
  - fluxers://{host}/{path}/{WebhookID}/{WebhookToken}

has_selfhosted: true
has_attachments: true
has_image: true

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Fluxer utilise des webhooks pour publier des notifications.

Une URL de webhook ressemble à ceci :

`https://api.fluxer.app/webhooks/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV`

Sa forme générale est la suivante :
`https://api.fluxer.app/webhooks/{WebhookID}/{WebhookToken}`

Les deux dernières parties sont les jetons nécessaires pour envoyer des notifications :

1. **WebhookID** est `417429632418316298`
2. **WebhookToken** est `JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV`

### Mentionner des rôles, tags et utilisateurs

Fluxer prend en charge les mentions de style Discord. Vous pouvez les placer directement dans le corps du message :

- **user** : `<@123>`
- **role** : `<@&456>`
- **tag** : `@everyone` ou `@here`

Vous pouvez également forcer des pings via le paramètre URL `ping=` (voir ci-dessous).

## Syntaxe

La syntaxe valide est la suivante :

- `https://api.fluxer.app/webhooks/{WebhookID}/{WebhookToken}`
- `https://api.fluxer.app/v1/webhooks/{WebhookID}/{WebhookToken}`
- `fluxer://{WebhookID}/{WebhookToken}/`
- `fluxer://{botname}@{WebhookID}/{WebhookToken}/`

### Mode serveur privé

Fluxer peut être utilisé dans deux modes :

- `mode=cloud` (par défaut) : publie vers l'API Fluxer Cloud (`https://api.fluxer.app`)
- `mode=private` : publie vers l'hôte que vous spécifiez dans l'URL

Lorsque `mode=private` est utilisé, un hôte est requis :

- `fluxer://{host}/{WebhookID}/{WebhookToken}/?mode=private`
- `fluxer://{host}:{port}/{WebhookID}/{WebhookToken}/?mode=private`

Si `mode=private` est sélectionné mais que l'hôte contient `fluxer.app`, Apprise repassera automatiquement en `mode=cloud`.

#### Chemins d'API auto-hébergés

L'installation auto-hébergée officielle expose son API sous `/api`. Apprise utilise ce chemin par défaut :

- `fluxers://{host}/{WebhookID}/{WebhookToken}`
- `fluxers://{host}:{port}/{WebhookID}/{WebhookToken}`

Si votre API utilise un autre chemin, placez-le avant les détails du webhook :

- `fluxers://{host}/{path}/{WebhookID}/{WebhookToken}`
- `fluxers://{host}:{port}/{path}/{WebhookID}/{WebhookToken}`

Par exemple, `/custom/api/webhooks/...` devient `fluxers://{host}/custom/api/{WebhookID}/{WebhookToken}`.

:::note
Utilisez `path=/` lorsque l'API est exposée à la racine de l'hôte, par exemple pour joindre directement son conteneur.
:::

:::caution
Les chemins ne s'appliquent qu'aux serveurs auto-hébergés. Le mode cloud utilise toujours `https://api.fluxer.app` et les ignore.
:::

## Détail des paramètres

| Variable     | Requis | Description                                                                                                                                            |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| WebhookID    | Oui    | La première partie des 2 jetons fournis lors de la création d'un webhook entrant                                                                       |
| WebhookToken | Oui    | La seconde partie des 2 jetons fournis lors de la création d'un webhook entrant                                                                        |
| botname      | Non    | Indique le nom du robot qui doit émettre le message                                                                                                    |
| host         | Non    | Nom d'hôte de votre serveur Fluxer privé (utilisé avec `mode=private`)                                                                                 |
| port         | Non    | Port de votre serveur Fluxer privé (utilisé avec `mode=private`)                                                                                       |
| path         | Non    | Chemin de l'API d'un serveur Fluxer privé (`/api` par défaut ; utilisez `/` pour la racine de l'hôte)                                                  |
| mode         | Non    | L'une des valeurs suivantes : `cloud` (par défaut) ou `private`                                                                                        |
| tts          | Non    | Activer la synthèse vocale (Text-To-Speech) (par défaut **Non**)                                                                                       |
| avatar       | Non    | Remplacer l'icône d'avatar par défaut par une icône identifiant le type de notification (par défaut **Oui**)                                           |
| avatar_url   | Non    | Remplacer l'URL de l'icône d'avatar. Si non défini, Apprise choisit dynamiquement une URL en fonction du type de message                               |
| footer       | Non    | Inclure une section pied de page dans l'intégration (par défaut **Non**)                                                                               |
| footer_logo  | Non    | Inclure le logo de pied de page Fluxer lorsque `footer=yes` (par défaut **Oui**)                                                                       |
| image        | Non    | Inclure une image en ligne avec le message décrivant le type de notification (par défaut **Non**)                                                      |
| fields       | Non    | Utiliser des champs intégrés lors de la publication au format `markdown` (par défaut **Oui**)                                                          |
| format       | Non    | La valeur par défaut est `text`. Définir sur `markdown` pour activer l'analyse markdown vers intégration (les en-têtes sont convertis en intégrations) |
| href         | Non    | Identifier une URL vers laquelle le titre doit pointer lors de la publication. Vous pouvez également utiliser `url=` comme alias                       |
| thread       | Non    | Définir éventuellement le `thread_id` auquel vous souhaitez que votre message soit appliqué                                                            |
| thread_name  | Non    | Définir éventuellement le nom du fil de discussion lors de l'utilisation de `thread=`                                                                  |
| ping         | Non    | Une liste séparée par des virgules d'utilisateurs, de rôles ou de jetons tels que `everyone` qui doivent toujours être mentionnés                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Fluxer :

```bash
# En supposant que {WebhookID} soit 417429632418316298
# En supposant que {WebhookToken} soit JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "fluxer://417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV"
```

Envoyer une notification en utilisant le formatage markdown vers intégration :

```bash
# En supposant que {WebhookID} soit 417429632418316298
# En supposant que {WebhookToken} soit JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
cat << _EOF | apprise -vv \
  "fluxer://417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV?format=markdown"
# Titre

- Élément 1
- Élément 2
- Élément 3
_EOF
```

Envoyer une pièce jointe :

```bash
# En supposant que {WebhookID} soit 417429632418316298
# En supposant que {WebhookToken} soit JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o3dV_js
apprise -vv -b "Voici un fichier" \
  --attach=/path/to/file.png \
  "fluxer://417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV"
```

Publier vers un serveur Fluxer privé :

```bash
# En supposant que l'URL de votre webhook soit :
#   https://fluxer.example.com/api/webhooks/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
apprise -vv -b "Test du serveur privé" \
  "fluxers://fluxer.example.com/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV"
```

Publier vers un serveur Fluxer privé avec un chemin d'API personnalisé :

```bash
# En supposant que l'URL de votre webhook soit :
#   https://fluxer.example.com/custom/api/webhooks/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
apprise -vv -b "Test du serveur privé" \
  "fluxers://fluxer.example.com/custom/api/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV"
```

Publier vers un serveur Fluxer privé qui expose son API à la racine du nom d'hôte :

```bash
# En supposant que l'URL de votre webhook soit :
#   https://fluxer.example.com/webhooks/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
apprise -vv -b "Test du serveur privé" \
  "fluxers://fluxer.example.com/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV?path=/"
```
