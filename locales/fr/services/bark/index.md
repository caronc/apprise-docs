---
title: "Notifications Bark"
description: "Envoyer des notifications Bark."
sidebar:
  label: "Bark"

source: https://github.com/Finb/Bark

schemas:
  - bark: insecure
  - barks

sample_urls:
  - barks://{host}/{device_key}
  - barks://{host}:{port}/{device_key}

has_selfhosted: true
has_image: true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Bark est une application iOS qui vous permet d'envoyer des notifications personnalisées sur votre iPhone. Téléchargez également le serveur si vous souhaitez une solution auto-hébergée.

## Syntaxe

La syntaxe valide est la suivante :

- `bark://{host}/{device_key}`
- `bark://{host}:{port}/{device_key}`

Les versions sécurisées :

- `barks://{host}/{device_key}`
- `barks://{host}:{port}/{device_key}`

Vous pouvez également notifier plusieurs appareils à la fois :

- `bark://{host}:{port}/{device_key1}/{device_key2}/{device_keyN}/`

## Prise en Charge du Format des Messages

Bark prend en charge la réception de contenu en texte brut ou en Markdown.

Apprise enverra automatiquement l'un des champs de charge utile suivants, selon le format de message utilisé :

- **Texte brut** (par défaut) : le contenu est envoyé via le champ `body`.
- **Markdown** : le contenu est envoyé via le champ `markdown`.

Pour contrôler explicitement ce comportement, définissez le format de message Apprise. Par exemple :

- `?format=text` force le traitement en texte brut.
- `?format=markdown` active le traitement Markdown.

Notez que la gestion de `format` est effectuée par Apprise et influe sur la manière dont la notification est assemblée puis remise à Bark.

## Chiffrement

Bark peut chiffrer vos notifications de bout en bout avec AES-GCM, de sorte que ni le serveur Bark ni le service de notifications d'Apple ne voient jamais le titre ou le corps en clair.

1. Ouvrez l'application Bark sur votre iPhone.
2. Repérez **Encrypted Push** (chiffrement des notifications) sur l'écran d'accueil et accédez à ses réglages.
3. Choisissez l'algorithme **AES-GCM** et saisissez une clé de 16, 24 ou 32 caractères exactement (ces longueurs correspondent respectivement à AES-128, AES-192 et AES-256).
4. Ajoutez cette même clé à votre URL Apprise avec `?key=`.

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?key=1234567890123456"
```

Chaque notification est chiffrée avec un vecteur d'initialisation (IV) généré aléatoirement, de sorte qu'envoyer deux fois le même message ne produit jamais le même texte chiffré.

:::note
Le chiffrement nécessite le paquet Python `cryptography` :

```bash
pip install cryptography
```

Contrairement au volet en texte brut de ce plugin, le chiffrement n'est pas optionnel dès lors qu'une `key` est définie. Si `cryptography` n'est pas installé, ou si la clé ne fait pas exactement 16, 24 ou 32 caractères, Apprise refuse de charger l'URL plutôt que d'envoyer silencieusement votre message en clair.
:::

:::caution
Toute personne disposant de votre clé de chiffrement peut lire vos notifications. Protégez-la avec autant de soin que votre clé d'appareil ou un jeton d'API, et utilisez la même clé que celle configurée dans les réglages Encrypted Push de l'application Bark.
:::

Consultez la [documentation officielle de Bark sur le chiffrement](https://github.com/Finb/Bark/blob/master/docs/encryption.md) pour en savoir plus sur le fonctionnement des notifications chiffrées.

## Remplacer et Supprimer des Notifications

Attribuez un `id` à une notification pour pouvoir la mettre à jour ou la retirer plus tard. C'est utile pour les messages d'état, par exemple un build qui échoue puis réussit.

1. Envoyez une notification avec `?id=build-42`.
2. Envoyez-en une autre avec le même `id` pour la remplacer. La nouvelle notification prend la place de l'ancienne au lieu de s'y ajouter.
3. Envoyez-en une avec `?id=build-42&delete=yes` pour la retirer du Centre de notifications et de l'historique de l'application Bark.

Cette fonctionnalité nécessite Bark v1.5.2 et bark-server v2.2.5 ou plus récents.

:::note
Bark transmet une suppression sous forme de notification silencieuse. Activez **Réglages > Général > Actualisation en arrière-plan** pour Bark, sinon la suppression est ignorée. Apprise a tout de même besoin d'un corps de message pour l'envoyer, mais ce corps n'est jamais affiché.
:::

Lorsque `key=` est défini, l'`id` et l'indicateur de suppression sont envoyés en clair à côté du message chiffré, car le serveur Bark en a besoin pour retrouver la notification sur votre appareil. Évitez de placer des informations privées dans l'`id`.

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                                                                                                                                |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| device_key | Oui    | La clé de l'appareil que vous souhaitez notifier.                                                                                                                                                                                                                                          |
| sound      | Non    | Permet facultativement de définir un fichier son à jouer avec la notification envoyée. Les sons pris en charge sont identifiés [ici](https://github.com/Finb/Bark/tree/master/Sounds).                                                                                                     |
| click      | Non    | Fournit un lien hypertexte à associer à la notification.                                                                                                                                                                                                                                   |
| level      | Non    | Précise le niveau du message. Peut être **active**, **timeSensitive** ou **passive**.                                                                                                                                                                                                      |
| volume     | Non    | Précise un volume entre 0 et 10, inclus.                                                                                                                                                                                                                                                   |
| badge      | Non    | Fournit une valeur numérique égale ou supérieure à 0 pour associer un badge à l'icône Bark sur l'appareil iOS.                                                                                                                                                                             |
| category   | Non    | Associe une catégorie à votre notification.                                                                                                                                                                                                                                                |
| group      | Non    | Associe un groupe à votre notification.                                                                                                                                                                                                                                                    |
| icon       | Non    | Définit une URL d'icône personnalisée pour la notification. Si elle n'est pas précisée, Apprise peut utiliser son image de notification par défaut, sauf si elle est désactivée.                                                                                                           |
| image      | Non    | Définissez cette valeur sur `no` si vous ne souhaitez pas que le niveau d'alerte Apprise soit utilisé comme icône associée au message.                                                                                                                                                     |
| call       | Non    | Entrée de type booléen. Accepte `yes/no`, `true/false`, `1/0`, `+/-`. Lorsqu'elle est activée, la charge utile inclut `1`.                                                                                                                                                                 |
| subtitle   | Non    | Une ligne de texte affichée entre le titre et le corps.                                                                                                                                                                                                                                    |
| copy       | Non    | Le texte copié lorsque vous copiez la notification sur votre appareil, à la place du corps. Pratique pour les codes à usage unique.                                                                                                                                                        |
| action     | Non    | Ce qui se passe lorsque vous touchez la notification. `alert` ouvre l'application avec une fenêtre permettant de copier ou de partager le message. `none` ouvre seulement l'application. Une URL `click` est prioritaire sur ce paramètre.                                                 |
| archive    | Non    | Définissez `yes` pour enregistrer la notification dans l'historique de l'application Bark, ou `no` pour ne pas l'enregistrer. Sans valeur, c'est le réglage de l'application qui décide (l'enregistrement est activé par défaut).                                                          |
| ttl        | Non    | Durée de conservation, en secondes, d'une notification enregistrée. À l'expiration, Bark la retire de l'historique de l'application et du Centre de notifications. Ne s'applique qu'aux notifications enregistrées dans l'historique.                                                      |
| id         | Non    | Un identifiant unique pour la notification. Une nouvelle notification envoyée avec le même `id` remplace la précédente. Nécessite Bark v1.5.2 et bark-server v2.2.5 ou plus récents. Voir [Remplacer et Supprimer des Notifications](#remplacer-et-supprimer-des-notifications) ci-dessus. |
| delete     | Non    | Définissez `yes` pour supprimer la notification correspondant à `id` au lieu d'en afficher une nouvelle. Nécessite `id`. La valeur par défaut est `no`.                                                                                                                                    |
| key        | Non    | Une clé de chiffrement AES-GCM de 16, 24 ou 32 caractères, identique à celle configurée dans les réglages Encrypted Push de l'application Bark. Nécessite le paquet Python `cryptography`. Voir [Chiffrement](#chiffrement) ci-dessus.                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Bark à tous les appareils associés à un projet :

```bash
# Supposons :
#  - que notre {hostname} soit localhost
#  - que notre {port} soit 8080
#  - que notre {device_key} soit j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P
```

Envoyer une notification Bark au format Markdown :

```bash
# Le contenu Markdown est envoyé via le champ `markdown` de Bark
apprise -vv -t "Build Statut" -b "# Success\n\nDeployment completed." \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=markdown
```

Forcer le comportement en texte brut, même si votre configuration Apprise par défaut utilise un autre format :

```bash
apprise -vv -t "Plain Text" -b "**This will not be bold**" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=text
```

Envoyer une notification Bark chiffrée de bout en bout (voir
[Chiffrement](#chiffrement) ci-dessus) :

```bash
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?key=1234567890123456"
```

Envoyer une notification avec un sous-titre, et ne copier que le code lorsque vous la copiez sur votre appareil :

```bash
apprise -vv -t "Connexion" -b "Votre code de connexion est 123456" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?subtitle=MyApp&copy=123456"
```

Enregistrer une notification dans l'historique de l'application et laisser Bark la retirer au bout d'une heure :

```bash
apprise -vv -t "Rappel" -b "La porte est toujours ouverte" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?archive=yes&ttl=3600"
```

Afficher l'état d'un build, le remplacer une fois le build terminé, puis le retirer (voir [Remplacer et Supprimer des Notifications](#remplacer-et-supprimer-des-notifications) ci-dessus) :

```bash
# Afficher l'état
apprise -vv -t "Build" -b "En cours" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?id=build-42"

# Le remplacer
apprise -vv -t "Build" -b "Réussi" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?id=build-42"

# Le retirer
apprise -vv -b "delete" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?id=build-42&delete=yes"
```
