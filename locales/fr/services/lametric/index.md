---
title: "Notifications LaMetric Time/Clock"
description: "Envoyer des notifications LaMetric Time/Clock."
sidebar:
  label: "LaMetric Time/Clock"

source: https://lametric.com

schemas:
  - lametric

sample_urls:
  - lametric://{apikey}@{hostname}
  - lametric://{apikey}@{hostname}:{port}
  - lametric://{userid}:{apikey}@{hostname}
  - lametric://{userid}:{apikey}@{hostname}:{port}
  - lametric://{app_access_token}@{app_id}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous disposez de deux methodes pour notifier votre appareil LaMetric :

1. **Mode Appareil** : interroger directement votre appareil LaMetric sur votre reseau local pour lui envoyer une notification.
1. **Mode nuagique** : envoyer un message a votre horloge via une requete securisee vers l'API nuagique de LaMetric. Cette methode offre moins d'options.

### Configuration du Mode Appareil

Avec le Mode Appareil, votre requete Apprise communique directement avec l'appareil LaMetric Time present sur votre reseau local.

1. Creez un compte puis connectez-vous sur la [Page Developpeur](https://developer.lametric.com).
1. Reperez la **Cle API** de votre appareil ; vous pouvez la trouver [ici](https://developer.lametric.com/user/devices).
1. Vous devez ensuite connaitre l'adresse IP de votre appareil. Cette **Adresse IP** est visible dans l'application LaMetric Time sous : **Settings** -> **Wi-Fi** -> **IP Address**

### Configuration du Mode Nuagique

**Remarque** : il semble qu'a un certain moment, LaMetric ait abandonne la prise en charge de son mode nuagique. Bien qu'il soit documente dans leurs forums avec des captures d'ecran et des exemples d'utilisation, tout cela ne semble plus vraiment accessible a l'utilisateur final aujourd'hui. Ceux qui ont encore acces a leurs serveurs amont peuvent continuer a l'exploiter. Sinon, les utilisateurs de ce plugin Apprise devront se concentrer sur le mode appareil standard, explique ci-dessus.

En mode nuagique, vous communiquez avec votre appareil LaMetric Time via internet.

1. Creez un compte puis connectez-vous sur la [Page Developpeur](https://developer.lametric.com).
1. Creez une **Indicator App** si ce n'est pas deja fait, depuis [ici](https://developer.lametric.com/applications/sources).
   - Un excellent tutoriel officiel explique la marche a suivre [ici](https://lametric-documentation.readthedocs.io/en/latest/guides/first-steps/first-lametric-indicator-app.html#publish-app-and-install-it-to-your-lametric-time)
1. Assurez-vous de definir le **Communication Type** sur **PUSH**
1. Une fois la configuration terminee, vous pourrez **Publish** votre application. Cela la rendra accessible depuis internet en utilisant le mode nuagique (`cloud`) de ce plugin Apprise. Le bouton **Publish** apparait dans les parametres de votre application LaMetric lorsque vous cliquez sur le dossier **Draft Vx**, ou `x` correspond a la version, generalement `1`.

1. Une fois les etapes ci-dessus terminees, le site vous fournit une **PUSH URL** ressemblant a ceci :
   - `https://developer.lametric.com/api/v1/dev/widget/update/com.lametric.{app_id}/{app_ver}`

   Vous devrez conserver `{app_id}` et `{app_ver}` pour utiliser le mode nuagique (`cloud`).

   La meme page devrait egalement vous fournir un **Jeton d'Acces** applicatif. Il comporte environ 86 caracteres et se termine par deux signes egal, `=`. Il devient alors votre `{app_access_token}`. Voici un exemple du format attendu :
   - `K2MxWI0NzU0ZmI2NjJlZYTgViMDgDRiN8YjlmZjRmNTc4NDVhJzk0RiNjNh0EyKWW==`

## Syntaxe

La syntaxe valide pour le _Mode Appareil_ est la suivante :

- `lametric://{apikey}@{hostname}`
- `lametric://{apikey}@{hostname}:{port}`
- `lametric://{userid}:{apikey}@{hostname}`
- `lametric://{userid}:{apikey}@{hostname}:{port}`

La syntaxe valide pour le _Mode Nuagique_ est la suivante :

- `lametric://{app_access_token}@{app_id}`
- `lametric://{app_access_token}@{app_id}/{app_version}`

## Détail des Paramètres

La decomposition des parametres depend du fait que vous utilisiez le mode nuagique ou le mode appareil.

### Mode Appareil

| Variable  | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey    | Oui         | La **Cle API** de votre appareil, disponible sur le site de LaMetric [ici](https://developer.lametric.com/user/devices).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| hostname  | Non         | Adresse IP ou nom d'hote de votre appareil LaMetric sur votre reseau local.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| port      | Non         | Port sur lequel votre appareil LaMetric ecoute. La valeur par defaut est **8080**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| userid    | Non         | Identifiant de connexion du compte de votre appareil LaMetric sur le reseau local. La valeur par defaut est `dev`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| mode      | Non         | Definit le mode Apprise/LaMetric a utiliser, `cloud` ou `device`. Il est utile de noter qu'Apprise est suffisamment intelligent pour detecter automatiquement le mode a partir de l'URL fournie. Si vous souhaitez toutefois le preciser explicitement, vous pouvez le faire.                                                                                                                                                                                                                                                                                                                                                                                             |
| cycles    | Non         | Nombre de fois que le message doit etre affiche. Si `cycles` est defini sur `0`, la notification reste affichee jusqu'a ce que l'utilisateur la ferme manuellement. La valeur par defaut est `1`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| sound     | Non         | Alarme sonore pouvant etre envoyee avec la notification. Les mots-cles suivants sont pris en charge : `bicycle`, `car`, `cash`, `cat`, `dog`, `dog2`, `energy`, `knock-knock`, `letter_email`, `lose1`, `lose2`, `negative1`, `negative2`, `negative3`, `negative4`, `negative5`, `notification`, `notification2`, `notification3`, `notification4`, `open_door`, `positive1`, `positive2`, `positive3`, `positive4`, `positive5`, `positive6`, `statistic`, `thunder`, `water1`, `water2`, `win`, `win2`, `wind`, `wind_short`, `alarm1`, `alarm2`, `alarm3`, `alarm4`, `alarm5`, `alarm6`, `alarm7`, `alarm8`, `alarm9`, `alarm10`, `alarm11`, `alarm12`, et `alarm13`. |
| priority  | Non         | Priorite du message ; les valeurs possibles sont `info`, `warning` et `critical`. Si rien n'est precise, `info` est utilise par defaut.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| icon_type | Non         | Nature de la notification ; les valeurs possibles sont `info`, `alert` et `none`. Si rien n'est precise, `none` est utilise par defaut.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### Mode Nuagique

| Variable         | Obligatoire | Description                                                                                                                                                                                                                            |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_id           | Oui         | **Identifiant d'Application** de votre Indicator App, disponible dans la configuration de votre application. Vous pouvez acceder a cette configuration depuis le site de LaMetric [ici](https://developer.lametric.com/applications/). |
| app_access_token | Oui         | **Jeton d'Acces** de votre Indicator App, disponible dans la configuration de votre application. Vous pouvez acceder a cette configuration depuis le site de LaMetric [ici](https://developer.lametric.com/applications/).             |
| app_ver          | Non         | Version associee a votre Indicator App. Si elle n'est pas precisee, la valeur par defaut `1` est utilisee.                                                                                                                             |
| mode             | Non         | Definit le mode Apprise/LaMetric a utiliser, `cloud` ou `device`. Apprise peut generalement detecter automatiquement le mode en fonction de l'URL fournie, mais vous pouvez aussi le definir explicitement si vous le souhaitez.       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification LaMetric Time en Mode Appareil, sur notre reseau local :

```bash
# Supposons que notre {apikey} soit abc123
# Supposons que notre {hostname} soit 192.168.1.3
apprise -vv -b "Corps du Message de Test" lametric://abc123@192.168.1.3
```

Envoyer une notification LaMetric Time en mode nuagique, via l'API developpeur LaMetric :

```bash
# Supposons que notre {app_id} soit ABCD1234
# Supposons que notre {app_access_token} soit abcdefg==
apprise -vv -b "Corps du Message de Test" lametric://abcdefg==@ABCD1234
```
