---
title: "Notifications Stride"
description: "Envoyer des notifications Stride."
sidebar:
  label: "Stride"

source: https://www.stride.com/
schemas:
  - stride

sample_urls:
  - stride://{auth_token}/{cloud_id}/{convo_id}

limits:
  - max_chars: 2000

ended: 2019-02-14
---

:::note

## Raison de la Fin du Service

Les créateurs de Stride ([Atlassian](https://www.atlassian.com)) ont conclu un partenariat avec [Slack](https://slack.com) et ont donc mis fin aux services _Stride_ et _Hipchat_. [Consultez leur annonce officielle ici](https://www.atlassian.com/blog/announcements/new-atlassian-slack-partnership). Voici ce qui était affiché sur leur site Web lors de la consultation des informations sur ces produits :<br/>
![Screenshot from 2019-09-07 14-28-34](./images/64478836-58f34a80-d17c-11e9-8779-940f57303b10.png).
💡Le service a été retiré d'Apprise dans [apprise/56](https://github.com/caronc/apprise/issues/56)
:::

<!-- SERVICE:DETAILS -->

## Configuration du Compte

_Stride_ est le successeur de _Hipchat_. Il nécessite la création d'une application personnalisée et son association au canal que vous créez.

Commençons depuis le début :

1. Lors de votre inscription sur stride.com, le site vous demandera si vous souhaitez rejoindre un groupe ou en créer un. Les nouveaux utilisateurs créent généralement le leur, tandis que les entreprises peuvent déjà avoir un groupe que vous souhaitez rejoindre.
2. Une fois configuré, vous aurez la possibilité de créer un canal (ou, si vous avez rejoint le groupe de votre entreprise, vous pourrez déjà voir des canaux à rejoindre). Dans tous les cas, vous devez être dans un canal avant de passer à l'étape suivante.
3. Une fois dans un canal, vous souhaitez connecter _apprise_ (ce service de notification). Pour ce faire, accédez au gestionnaire d'applications (App Manager, sur le côté droit dans votre navigateur) et choisissez «_Connect your own app_».
   - Il vous sera demandé de fournir un «_token name_» qui peut être ce que vous souhaitez. Cela servira de référence ultérieurement. Cliquez sur le bouton _Create_ lorsque vous avez terminé.
   - Une fois terminé, un token sera généré qui ressemble à :<br/>`HQFtq4pF8rKFOlKTm9Th`<br/>Ceci est important et sera référencé en tant que votre **{auth_token}**.
   - En faisant défiler vers le bas, une URL de conversation sera également générée, qui ressemblera à :<br/>`https://api.atlassian.com/site/ce171c45-09ae-4fac-a73d-5a4b7a322872/conversation/a54a80b3-eaad-4524-9a3a-f6653bcfb100/message`<br/>Pensez à cette URL comme suit :<br/>`https://api.atlassian.com/site/{cloud_id}/conversation/{convo_id}/message`. Portez une attention particulière au **{cloud_id}** et au **{convo_id}**, car vous en aurez besoin pour construire votre URL personnalisée.

## Syntaxe

La syntaxe valide est la suivante :

- `stride://{auth_token}/{cloud_id}/{convo_id}`

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                                                                                                              |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| auth_token | Oui    | Le token d'autorisation créé pour vous lors de la création de votre application personnalisée (que vous associez à votre canal).                                                                                                                                         |
| cloud_id   | Oui    | Extrait de l'URL créée lors de la création de votre application personnalisée (identifiée ci-dessus).<br/>**Remarque :** Il s'agit de la première partie de l'URL de conversation :<br/>https\:\/\/api.atlassian.com/site/**{cloud_id}**/conversation/{convo_id}/message |
| convo_id   | Oui    | Extrait de l'URL créée lors de la création de votre application personnalisée (identifiée ci-dessus).<br/>**Remarque :** Il s'agit de la deuxième partie de l'URL de conversation :<br/>https\:\/\/api.atlassian.com/site/{cloud_id}/conversation/**{convo_id}**/message |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Stride :

```bash
# Assuming our {auth_token} is HQFtq4pF8rKFOlKTm9Th
# Assuming our {cloud_id} is ce171c45-09ae-4fac-a73d-5a4b7a322872
# Assuming our {convo_id} is a54a80b3-eaad-4524-9a3a-f6653bcfb100
apprise stride://HQFtq4pF8rKFOlKTm9Th/ce171c45-09ae-4fac-a73d-5a4b7a322872/a54a80b3-eaad-4524-9a3a-f6653bcfb100
```
