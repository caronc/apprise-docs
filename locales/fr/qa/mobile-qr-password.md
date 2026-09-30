---
title: "Codes QR Apprise Mobile et Mots de Passe"
description: "Pourquoi le code QR de l'API Apprise n'inclut pas votre mot de passe, et le seul code QR qui l'inclut."
sidebar:
  order: 10
---

## Pourquoi Mon Mot de Passe N'est-il Pas dans le Code QR ?

L'API Apprise ne conserve jamais votre mot de passe sous une forme lisible. Elle n'en garde qu'une empreinte à sens unique (un hash) qui permet de vérifier un mot de passe mais pas de le retrouver : il n'y a donc rien qu'elle puisse mettre dans le code QR.

Lorsque vous scannez le code QR, Apprise Mobile remplit l'adresse du serveur, votre ID de configuration et votre nom d'utilisateur. Saisissez votre mot de passe une seule fois ; l'application l'enregistre de façon sécurisée sur votre téléphone.

## Le Code QR Qui Contient le Mot de Passe

Juste après avoir défini ou modifié un mot de passe sur la page **Authentification**, l'interface web propose un code QR supplémentaire. Il porte un badge en forme de clé sur le logo Apprise. Ce code inclut le nouveau mot de passe, car vous venez de le saisir et la page ne l'a pas encore effacé.

<figure>
  <img
    src="/assets/apprise-mobile-password-qr.png"
    alt="Exemple de code QR contenant un mot de passe, avec un badge orange en forme de clé sur le logo Apprise"
    width="360"
    height="360"
    loading="lazy"
  />
  <figcaption>
    Exemple pour <code>apprise://user:password@example.ca/my-config-id</code>. Le
    badge en forme de clé signale le code QR qui contient le mot de passe. Il n'est
    affiché qu'une seule fois, mais reste valable jusqu'au changement du mot de passe.
  </figcaption>
</figure>

Enregistrez-le ou partagez-le de façon sécurisée avant de quitter la page. Ensuite, le mot de passe ne pourra plus être affiché.

## Mot de Passe Oublié ?

Définissez-en un nouveau sur la page **Authentification**, ou demandez à votre administrateur de le faire, puis enregistrez ou partagez de façon sécurisée le code QR portant le badge en forme de clé.
