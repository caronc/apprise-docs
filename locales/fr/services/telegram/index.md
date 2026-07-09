---
title: "Notifications Telegram"
description: "Envoyer des notifications Telegram."
sidebar:
  label: "Telegram"

source: https://telegram.org/

schemas:
  - tgram

has_chat: true
has_attachments: true
has_image: true

body_formats:
  - html
  - markdown

sample_urls:
  - tgram://{bot_token}/
  - tgram://{bot_token}/{chat_id}/
  - tgram://{bot_token}/{chat_id}:{topic}/

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Telegram est un peu plus complexe que certains autres services de notification, voici donc un rapide apercu de ce que vous devez savoir et faire pour envoyer des notifications avec cet outil.

Pour commencer, si vous n'avez pas encore de compte, vous devrez vous connecter avec un telephone. Le service utilise votre numero de telephone comme identifiant de connexion. Commencez donc par telecharger et installer l'application mobile sur [Android](https://telegram.org/dl/android) ou [Apple](https://telegram.org/dl/ios).

Une fois votre compte configure, il peut etre plus pratique d'utiliser l'interface web disponible [ici](https://telegram.org/dl/webogram) depuis un PC, surtout pour le developpement. Cette partie reste toutefois a votre convenance.

### Configuration du Robot

Les notifications Telegram exigent que vous [creiez un robot](https://api.telegram.org). Ce n'est qu'apres cette etape que vous obtiendrez une information essentielle dont Apprise a besoin, appelee **identifiant de jeton** (ou **bot_token**).

Pour cela, vous devez ouvrir une conversation dans Telegram avec **[BotFather](https://botsfortelegram.com/project/the-bot-father/)**. Il est accessible a tous les utilisateurs inscrits sur la plateforme. Une fois la boite de dialogue ouverte avec lui :

1. Type: `/newbot`
1. Repondez aux questions posees ensuite, notamment pour definir son nom, etc.
1. Une fois l'etape 2 terminee, un _bot_token_ vous sera fourni, sous une forme ressemblant a `123456789:alphanumeric_characters`.
1. Saisissez ensuite `/start` dans la meme boite de dialogue afin d'activer et d'initialiser votre tout nouveau robot.

La bonne nouvelle, c'est que cette procedure ne doit etre effectuee qu'une seule fois. Une fois votre **bot_token** obtenu, conservez-le et vous n'aurez plus a recommencer. C'est via ce robot qu'Apprise peut envoyer des notifications Telegram a differents utilisateurs.

:::warning

### Le Casse-Tete du Chat ID

**Mise a jour du 2021.12.23** : les developpeurs de Telegram ont recemment facilite l'obtention de cet identifiant grace a leur propre outil integre, [explique ici](https://www.alphr.com/find-chat-id-telegram/). Merci a `@mattpackwood` pour cette astuce !
:::

En coulisses, Telegram notifie les utilisateurs a l'aide de leur **`{chat_id}`** et non de leur nom d'utilisateur, plus facile a retenir.
Malheureusement, a l'heure actuelle, Telegram ne facilite pas vraiment la recuperation de ce **`{chat_id}`** sans quelques astuces ou contournements que l'on peut trouver en cherchant en ligne ou en contactant leur equipe de support.

Cependant, Apprise peut simplifier cette tache si votre objectif est simplement de vous envoyer un message prive. Dans ce cas, il suffit d'envoyer un message prive au nouveau robot que vous venez de creer. C'est tout !

En procedant ainsi, Apprise pourra detecter automatiquement _votre_ **`{chat_id}`** a partir du message envoye au robot.

- **tgram**://**`{bot_token}`**/

Lorsque vous utilisez la forme courte de l'URL Telegram/Apprise et que le proprietaire du robot, probablement vous, est detecte correctement, le **`{chat_id}`** trouve apparaitra dans les journaux apres l'envoi de la notification. Notez que l'**API Telegram ne conserve les messages entrants que pendant 24 heures**. Il est donc recommande de mettre a jour ensuite votre URL Apprise pour y faire explicitement reference.

- **tgram**://**`{bot_token}`**/**`{chat_id}`**

**Remarque** : vous pouvez aussi recuperer vous-meme le **`{chat_id}`** apres vous etre d'abord envoye un message, comme explique ci-dessus. Ensuite, il vous suffit de visiter `https://api.telegram.org/bot{bot_token}/getUpdates`.

- _Remarque :_ le mot-cle `bot` doit figurer devant le **`{bot_token}`** reel qui vous a ete fourni par BotFather.
- Le resultat contiendra le message que vous avez envoye. Vous y trouverez egalement une section intitulee `chat`, avec l'`id` indique. Il s'agit du **`{chat_id}`** que vous pouvez utiliser pour envoyer directement des messages via Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `tgram://{bot_token}/`
  - **Remarque** : comme indique plus haut, Apprise est suffisamment intelligent pour determiner le chat*id du proprietaire du bot, vous, \_uniquement si vous lui avez d'abord envoye au moins 1 message prive*.

- `tgram://{bot_token}/{chat_id}/`
- `tgram://{bot_token}/{chat_id1}/{chat_id2}/{chat_id3}/`
- `tgram://{bot_token}/{chat_id}:{topic}/`
- `tgram://{bot_token}/{chat_id1}:topic1}/{chat_id2}:{topic2}/{chat_id3}:{topic3}/`

Si vous souhaitez afficher l'icone ou l'image associee a la notification, vous pouvez l'activer en ajoutant **?image=yes** a votre URL, comme ceci :

- `tgram://{bot_token}/?image=Yes`
- `tgram://{bot_token}/{chat_id}/?image=Yes`
- `tgram://{bot_token}/{chat_id1}/{chat_id2}/{chat_id3}/?image=Yes`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bot_token | Oui         | Jeton identifiant le robot que vous avez cree via _[BotFather](https://botsfortelegram.com/project/the-bot-father/)_.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| chat_id   | Oui         | Identifie les utilisateurs auxquels votre robot doit livrer les notifications. Vous devez indiquer au moins 1 _chat_id_. Si aucun chat_id n'est precise, le script de notification tentera de detecter celui du proprietaire du robot, vous, et l'utilisera.                                                                                                                                                                                                                                                                                                                |
| image     | Non         | Vous pouvez ajouter l'argument **?image=Yes** a la fin de votre URL afin qu'un message Telegram soit genere avant l'avis principal pour televerser l'image associee. En raison des limitations du service, Telegram ne permet pas d'inclure une image directement dans un message texte. En revanche, vous pouvez envoyer un message contenant uniquement une image. Si ce drapeau est active, _apprise_ enverra d'abord une notification image, puis l'avis lui-meme. Comme recevoir 2 messages pour 1 seul avis peut etre genant, cette option est desactivee par defaut. |
| format    | Non         | La valeur par defaut est _html_. Definissez-la sur _markdown_ lorsque vous voulez utiliser le traitement Markdown de Telegram.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| silent    | Non         | Indicateur `yes/no` permettant d'envoyer la notification en mode silencieux. La valeur par defaut est `no`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| preview   | Non         | Indicateur `yes/no` permettant d'afficher les apercus web de votre publication. La valeur par defaut est `no`.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| mdv       | Non         | Permet de definir la version de `markdown` a utiliser, soit `v1`, soit `v2`. La valeur par defaut est `v2` si rien n'est precise. Cette valeur n'est prise en compte que si `?format=markdown` a egalement ete defini.                                                                                                                                                                                                                                                                                                                                                      |
| topic     | Non         | Identifiant du fil de sujet dans lequel vous souhaitez publier votre message. [Voici une publication StackOverflow expliquant comment recuperer le Topic Thread ID](https://stackoverflow.com/questions/74773675/how-to-get-topic-id-for-telegram-group-chat).                                                                                                                                                                                                                                                                                                              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Telegram a lead2gold :

```bash
# Supposons que notre {bot_token} soit 123456789:abcdefg_hijklmnop
# Supposons que le {chat_id} de lead2gold soit 12315544
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   tgram://123456789:abcdefg_hijklmnop/12315544/
```

Vous voulez utiliser les fonctionnalites Markdown de Telegram ? Faites plutot ceci :

```bash
# Supposons que notre {bot_token} soit 123456789:abcdefg_hijklmnop
# Supposons que le {chat_id} de lead2gold soit 12315544
# Nous forçons le format de sortie en markdown dans cet exemple
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   tgram://123456789:abcdefg_hijklmnop/12315544/?format=markdown
```

Vous avez un sujet precis a notifier ?

```bash
# Supposons que notre {bot_token} soit 123456789:abcdefg_hijklmnop
# Supposons que le {chat_id} de lead2gold soit 12315544
# Supposons que le {topic_id} soit 1234567
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   tgram://123456789:abcdefg_hijklmnop/12315544/?topic=1234567
```

Les sujets peuvent egalement etre definis pour chaque chat_id :

```bash
# Supposons que notre {bot_token} soit 123456789:abcdefg_hijklmnop
# Supposons que le {chat_id} de lead2gold soit 12315544
# Supposons que le {topic_id} soit 1234567
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   tgram://123456789:abcdefg_hijklmnop/12315544:1234567/
```
