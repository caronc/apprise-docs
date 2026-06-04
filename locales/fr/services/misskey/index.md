---
title: "Notifications Misskey"
description: "Envoyer des notifications Misskey."
sidebar:
  label: "Misskey"

source: https://misskey-hub.net/

schemas:
  - misskey: insecure
  - misskeys

sample_urls:
  - misskey://{token}@{host}
  - misskeys://{token}@{host}

limits:
  max_chars: 500
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a un service base sur Misskey. [Voici quelques instances parmi lesquelles vous pouvez choisir aujourd'hui](https://misskey-hub.net/en/instances.html).

Dans les versions recentes, la generation du jeton d'acces se trouve sous **Settings** -> **Service Integration** -> **Generate Access Token**.
<img alt="Image" src="./images/7a2720cccf8d5ec4.png" />

**Remarque :** d'autres variantes peuvent proposer **Generate access token** dans le menu **API**. Cela peut varier selon la version de Misskey utilisee par le service choisi.

Lors de la generation du jeton :

- Donnez-lui le nom de votre choix
- Au minimum, vous devez accorder la permission **Compose or delete notes**<br/>
  <img width="408" height="462" alt="Image" src="./images/3731df2b3f8a5da9.png" />

Apres avoir enregistre vos modifications, le **jeton d'acces** necessaire au fonctionnement avec Apprise vous sera fourni.

## Syntaxe

La syntaxe valide est la suivante :

- `misskey://{token}@{host}`
- `misskeys://{token}@{host}`

Utilisez simplement `misskey://` si vous accedez a un serveur non securise et `misskeys://` si vous accedez a un serveur securise, en HTTPS. Dans la plupart des cas, vous utiliserez probablement toujours `misskeys://`.

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token      | Oui         | Jeton d'acces associe a l'application que vous avez creee dans les parametres de compte Misskey. Votre jeton doit disposer au minimum de l'autorisation `write:statuses`. Ajoutez egalement `write:media` si vous souhaitez fournir des pieces jointes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| visibility | Non         | Visibilite Misskey dans laquelle vous souhaitez publier. Valeurs possibles :<br/>🔴 `public` : votre note sera visible par tous les utilisateurs et apparaitra dans toutes les timelines, home, local, social et global.<br/>Remarque : si votre compte est _silenced_, vous ne pouvez pas definir la visibilite de votre note sur `public`.<br/>🔴 `home` : votre note sera visible par tous les utilisateurs, mais n'apparaitra pas dans les timelines local, social ou global pour les non-abonnes.<br/>🔴 `followers` : votre note ne sera visible que par les personnes qui vous suivent. Elle apparaitra dans les timelines de vos abonnes.<br/>🔴 `specified` : votre note ne sera visible que par les utilisateurs individuellement specifies. Elle apparaitra dans leurs timelines. Si vous activez cette option, votre note ne sera pas federée vers des instances distantes. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Creer une note Misskey sur le serveur `misskey.sda1.net` :

```bash
# Supposons que notre {hostname} soit misskey.sda1.net
# Supposons que notre {token} soit abcdefghijklmn
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "misskeys://misskey.sda1.net/abcdefghijklmn"
```

Cet exemple reprend le precedent mais exploite l'option `visibility` :

```bash
# Supposons que notre {hostname} soit misskey.sda1.net
# Supposons que notre {token} soit abcdefghijklmn
# Supposons une {visibility} de home
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "misskeys://misskey.sda1.net/abcdefghijklmn?visibility=home"
```

## Dépannage

1. `WARNING - Failed to send Misskey notification: Method not allowed., error=405.`
   - Si le site est heberge en `http`, non securise, vous devez utiliser `misskey://` pour construire votre URL Apprise, tandis que si le site est heberge en `https`, securise, vous devez utiliser `misskeys://`.
1. `WARNING - Failed to send Misskey notification: error=403.`
   - Assurez-vous que le jeton API que vous avez genere dispose bien de la permission **Compose or delete notes**. Il peut etre necessaire de regenerer une nouvelle cle incluant cette autorisation, ou de verifier que vous avez bien fourni le bon jeton dans votre URL Apprise.
