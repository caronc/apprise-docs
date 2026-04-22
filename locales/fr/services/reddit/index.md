---
title: "Notifications Reddit"
description: "Envoyer des notifications Reddit."
sidebar:
  label: "Reddit"

source: https://reddit.com

schemas:
  - reddit

sample_urls:
  - reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit}
  - reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit_1}/{subreddit_2}/{subreddit_N}

limits:
  max_chars: 6000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

1. Rendez-vous sur <https://old.reddit.com/prefs/apps> et faites defiler jusqu'en bas.
1. Cliquez sur le bouton indiquant '**are you a developer? create an app...**'.
1. Definissez le mode sur `script`.
1. Fournissez un `name`, une `description` et une `redirect uri`, les valeurs peuvent etre quelconques.
1. Enregistrez votre configuration :
   ![Reddit-Setup01](./images/109997361-20372180-7cde-11eb-868d-e5e46bb41873.png)
1. Une fois le robot enregistre, un identifiant, a cote de son nom, ainsi qu'un secret vous seront fournis.
   ![Reddit-Setup02](./images/109997391-262d0280-7cde-11eb-8681-067c0e00d4ab.png)

- L'**App ID** ressemblera a quelque chose comme `YWARPXajkk645m`.
- L'**App Secret** ressemblera a quelque chose comme `YZGKc5YNjq3BsC-bf7oBKalBMeb1xA`.
- L'application comporte egalement une zone vous permettant d'identifier les utilisateurs ou developpeurs autorises a utiliser cette cle. Par defaut, elle est deja configuree pour vous. Vous devrez aussi utiliser le user/pass de l'un des comptes indiques ici pour utiliser les capacites de publication.

## Syntaxe

La syntaxe valide est la suivante :

- `reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit}`
- `reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit_1}/{subreddit_2}/{subreddit_N}`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_id     | Oui         | App ID genere pour l'application **script** que vous avez creee sur la page [Reddit Apps](https://old.reddit.com/prefs/apps).                                                                                                                                                                                                                                                                                                                                                                  |
| app_secret | Oui         | App Secret genere pour l'application **script** que vous avez creee sur la page [Reddit Apps](https://old.reddit.com/prefs/apps).                                                                                                                                                                                                                                                                                                                                                              |
| user       | Oui         | Identifiant Reddit associe a l'un des developpeurs rattaches a l'application que vous avez creee. Par defaut, il s'agit simplement du meme compte utilisateur que celui utilise pour creer l'application Reddit.                                                                                                                                                                                                                                                                               |
| pass       | Oui         | Mot de passe Reddit associe a l'identifiant utilisateur defini ci-dessus.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| subreddit  | Oui         | Subreddit sur lequel vous souhaitez publier votre message. Vous devez en specifier au moins 1.                                                                                                                                                                                                                                                                                                                                                                                                 |
| kind       | Non         | Type de message, `self`, `link` ou `auto`.<br/>Definissez `self` si vous publiez un message general dans le subreddit. Definissez `link` si le corps du message fourni dans la charge utile Apprise contient uniquement un lien ou une URI vers un site web. Le mode `auto`, qui est aussi la valeur par defaut, analysera le _corps du message_ et reglera automatiquement `self` ou `link` selon ce qui est detecte.                                                                         |
| ad         | Non         | Indique si ce que vous publiez est une publicite. La valeur par defaut est **No**.                                                                                                                                                                                                                                                                                                                                                                                                             |
| nsfw       | Non         | Drapeau _Not Safe For Work_, NSFW. La valeur par defaut est **No**.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| replies    | Non         | Envoyer toutes les reponses du fil dans votre boite de reception Reddit ? La valeur par defaut est **Yes**.                                                                                                                                                                                                                                                                                                                                                                                    |
| resubmit   | Non         | Indique a Reddit qu'il s'agit d'une republication. Certains subreddits bloquent la republication de contenu ; definir cette option sur `yes` peut forcer l'acceptation du contenu lorsque c'est possible. Certains subreddits marquent aussi differemment le message lorsque vous le declarez comme republication des le depart. Cela peut ou non correspondre a votre besoin. Par defaut, cette option est **No** afin que tous les messages soient traites normalement par le serveur amont. |
| spoiler    | Non         | Marque votre publication avec le drapeau **spoiler**. La valeur par defaut est **No**.                                                                                                                                                                                                                                                                                                                                                                                                         |
| flair_id   | Non         | Fournit le `flair_id` a associer a votre publication. Par defaut, il n'est pas transmis en amont tant qu'il n'est pas explicitement fourni.                                                                                                                                                                                                                                                                                                                                                    |
| flair_text | Non         | Fournit le `flair_text` a associer a votre publication. Par defaut, il n'est pas transmis en amont tant qu'il n'est pas explicitement fourni.                                                                                                                                                                                                                                                                                                                                                  |

:::note
Reddit exige toujours un `title` accompagne d'un `body`. Reddit refusera votre publication en amont si vous ne fournissez pas les deux.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Reddit

```bash
# Supposons que notre {user} soit sstark
# Supposons que notre {pass} soit notAFanOfLannisters
# Supposons que notre {app_id} soit YWARPXajkk645m
# Supposons que notre {app_secret} soit YZGKc5YNjq3BsC-bf7oBKalBMeb1xA
# Supposons que nous voulions publier dans le {subreddit} Apprise

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   reddit://sstark:notAFanOfLannisters@YWARPXajkk645m/YZGKc5YNjq3BsC-bf7oBKalBMeb1xA/Apprise
```
