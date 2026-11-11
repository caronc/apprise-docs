---
title: Configurer Apprise Mobile
description: Connectez Apprise Mobile sur Android, iPhone ou iPad à votre serveur API Apprise auto-hébergé.
sidebar:
  label: Premiers Pas
  order: 2
---

Apprise Mobile suit le même fonctionnement sur Android, iPhone et iPad. L'application se connecte à votre propre serveur API Apprise, qui transmet vos notifications aux services que vous configurez.

## Installer l'Application

Choisissez votre boutique sur la [page Apprise Mobile](../). Android nécessite Android 8.0 ou version ultérieure ; iPhone et iPad nécessitent iOS 17.2 ou version ultérieure. Utilisez votre boutique pour installer les mises à jour.

## Préparer Votre Serveur

1. [Déployez Apprise API](/fr/api/deployment/) si vous ne l'utilisez pas encore.
2. Ouvrez son interface web et ajoutez une configuration contenant au moins une destination de notification.
3. Vérifiez que votre téléphone peut joindre l'adresse du serveur. Un serveur sur votre réseau domestique peut nécessiter le Wi-Fi ou un VPN lorsque vous êtes ailleurs. Utilisez HTTPS sur un réseau non fiable.

Apprise Mobile est un client, pas un service de notification hébergé. L'application ne remplace pas votre serveur API et ne reçoit pas les notifications push d'autres applications.

## Connecter Apprise Mobile

Ajoutez un serveur dans l'application. Scannez le code QR de la configuration depuis l'interface web d'Apprise API, ou saisissez manuellement l'adresse du serveur et l'identifiant de configuration. Saisissez les identifiants d'authentification si votre serveur les exige.

Autorisez l'accès à la caméra pour scanner un code QR. Si votre serveur utilise un mot de passe, vous devrez peut-être le saisir après le scan : l'interface web ne peut pas retrouver un mot de passe stocké sous forme de hachage. Consultez [pourquoi un code QR peut omettre le mot de passe](/fr/qa/mobile-qr-password/).

Utilisez une adresse accessible depuis votre appareil. `localhost` sur votre téléphone désigne le téléphone, pas l'ordinateur qui exécute Apprise API. Gardez les identifiants et les codes QR privés.

## Envoyer Votre Première Notification

Ouvrez le serveur connecté, choisissez la configuration ou les destinations, puis rédigez un message. Ajoutez un titre, des tags ou une pièce jointe selon vos besoins, puis envoyez. Consultez le rapport de livraison pour vérifier les destinations ayant réussi et réessayez les envois échoués si nécessaire.

Vous pouvez gérer les URL des services et enregistrer des modèles depuis la même application. La version gratuite permet les opérations essentielles avec un serveur actif. L'achat unique facultatif de la version complète augmente les limites de l'application.

## Partager depuis une Autre Application

- **Android :** choisissez Apprise dans la feuille de partage Android pour ouvrir le texte ou les fichiers partagés dans l'application.
- **iPhone et iPad :** choisissez Apprise dans la feuille de partage, puis ouvrez Apprise pour terminer la rédaction et l'envoi. L'extension de partage prépare le contenu ; elle ne l'envoie pas automatiquement.

Autorisez l'accès aux photos ou aux fichiers uniquement lorsque vous souhaitez joindre du contenu. Vérifiez les destinataires avant d'envoyer le contenu partagé.

## Livraison en Arrière-Plan

Android et iOS gèrent les tâches en arrière-plan différemment. iOS décide du moment des actualisations en arrière-plan et accorde un temps d'exécution limité ; les tâches en attente peuvent attendre la réouverture de l'application. Gardez Apprise ouvert pour les envois urgents ou les pièces jointes volumineuses. L'activité en arrière-plan dépend aussi des réglages de votre appareil et de la connexion réseau.

## Sauvegardes et Achats

Utilisez les paramètres pour exporter une sauvegarde avant de changer d'appareil. Les sauvegardes sans secrets omettent les identifiants ; les sauvegardes chiffrées les protègent avec votre phrase secrète. Conservez cette phrase en lieu sûr, puis importez la sauvegarde sur l'autre appareil. Les sauvegardes sont compatibles entre Android et iOS.

Les achats de la version complète sont liés au compte de la boutique utilisé pour les acheter. Utilisez la restauration des achats sur iOS lors d'une réinstallation avec le même compte Apple. Un achat Google Play ne débloque pas la version App Store, et un achat App Store ne débloque pas la version Android.

Consultez la [Politique de confidentialité](../privacy/) et les [Conditions d'utilisation](../tos/) pour plus de détails.
