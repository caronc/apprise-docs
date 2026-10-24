---
title: Politique de Confidentialité d'Apprise API
description: Comment Apprise API traite les informations sur le serveur où vous l'exécutez.
sidebar:
  label: Politique de Confidentialité
  order: 30
---

**Dernière mise à jour : 24 octobre 2026**

La présente politique de confidentialité s'applique à Apprise API, y compris l'image Docker `caronc/apprise` et l'application Apprise pour TerraMaster TOS (`apprise-terramaster-tos7-app`).

## Présentation

Apprise API est auto-hébergé. Il fonctionne entièrement sur le serveur ou le NAS où vous l'installez. Nous n'exploitons aucun service en ligne pour celui-ci, n'exigeons aucun compte et n'incluons aucun code de publicité, d'analyse, de suivi ou de rapport de plantage.

## Informations Stockées sur Votre Serveur

Apprise API peut stocker :

- Les URL de notification, les étiquettes et la configuration que vous enregistrez (`/config`).
- Les fichiers que vous joignez à une notification (`/attach`).
- Les plugins de notification personnalisés que vous ajoutez (`/plugin`).

Sur TerraMaster TOS, ces dossiers se trouvent sous `DockerAppData/apprise-terramaster-tos7-app/`.

Les URL de notification contiennent souvent les identifiants des services vers lesquels elles envoient. Toute personne pouvant accéder à l'interface web peut les consulter et les utiliser. Ne l'exposez donc pas sur Internet, ou protégez-la par une connexion.

## Transmission des Données

Apprise API n'envoie ni vos données, ni vos identifiants, ni le contenu de vos notifications, ni vos informations d'utilisation, à nous ou à un tiers choisi par nous.

Lorsque vous envoyez une notification, Apprise API se connecte directement aux services indiqués dans vos URL de notification (par exemple Slack, Discord, Telegram ou un serveur de courriel). Si vous définissez `APPRISE_WEBHOOK_URL`, il envoie également les résultats de livraison à cette adresse. Ces services traitent ce qu'ils reçoivent selon leurs propres politiques de confidentialité.

Votre plateforme de conteneurs télécharge l'image `caronc/apprise` depuis Docker Hub lors de l'installation ou de la mise à jour d'Apprise API.

## Informations que Nous ne Recevons Pas

Nous ne recevons ni le contenu de vos notifications, ni votre configuration, ni vos identifiants, ni vos diagnostics, ni vos données d'utilisation. Nous ne vendons, ne louons ni n'utilisons vos informations à des fins de publicité ou de suivi.

## Suppression de Vos Données

Supprimez les dossiers montés sur `/config`, `/attach` et `/plugin` pour effacer tout ce qu'Apprise API a stocké. Sur TerraMaster TOS, désinstallez l'application et supprimez le dossier `DockerAppData/apprise-terramaster-tos7-app`.

## Contact

Les questions concernant cette politique peuvent être posées sur [https://github.com/caronc/apprise-api/issues](https://github.com/caronc/apprise-api/issues).
