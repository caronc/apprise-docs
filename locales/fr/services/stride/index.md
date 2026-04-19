---
title: "Notifications Stride"
description: "Envoyer Stride notifications."
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

## Service End Reason

The creators of Stride ([Atlassian](https://www.atlassian.com)) performed partnership with [Slack](https://slack.com) and therefore are discontinuing both _Stride_ and _Hipchat_ services. [See their official announcement here](https://www.atlassian.com/blog/announcements/new-atlassian-slack-partnership). This was what was displayed on their website when looking up info on these products:<br/>
![Screenshot from 2019-09-07 14-28-34](./images/64478836-58f34a80-d17c-11e9-8779-940f57303b10.png).
💡The Service was removed from Apprise in [apprise/56](https://github.com/caronc/apprise/issues/56)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

_Stride_ is the successor to _Hipchat_. It requires you to create a custom app and assign it to your channel you create.

Let's start from the beginning:

1. When you sign-up with stride.com, the site will ask if you want to join a group or creating your own. Brand new users will start their own while companies might have already formed a group you want to join.
2. Once you get set up, you'll have the option of creating a channel (or if you joined your companies group, you might already see channels you can join in front of you). Either way, you need to be in a channel before you get to the next step.
3. Once you're in a channel you'll want to connect _apprise_ (this notification service) up. To do this, you need to go to the App Manager (on right hand side in your browser) an choose to '_Connect your own app_'.
   - It will ask you to provide a '_token name_' which can be whatever you want. This will be used for reference later. Click the _Create_ button when you're done.
   - When it completes it will generate a token that looks something like:<br/>`HQFtq4pF8rKFOlKTm9Th`<br/>This is important and we'll referenced it as your **{auth_token}**.
   - If you scroll down it will also generate you a conversation URL that might look like:<br/>`https://api.atlassian.com/site/ce171c45-09ae-4fac-a73d-5a4b7a322872/conversation/a54a80b3-eaad-4524-9a3a-f6653bcfb100/message`<br/>Think of this URL like this:<br/>`https://api.atlassian.com/site/{cloud_id}/conversation/{convo_id}/message`. Specifically pay close attention to the **{cloud_id}** and **{convo_id}** because you will need this to build your custom URL with.

## Syntaxe

La syntaxe valide est la suivante :

- `stride://{auth_token}/{cloud_id}/{convo_id}`

## Detail des parametres

| Variable   | Required | Description                                                                                                                                                                                                                                                                         |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth_token | Yes      | The Authorization token that is created for you once you create your Custom App (that you associate with your channel).                                                                                                                                                             |
| cloud_id   | Yes      | This is extracted from the URL that is created for you when you create your Custom App (the same one that is identified above).<br/>**Note**: This is the first part of the conversation URL:<br/>https\:\/\/api.atlassian.com/site/**{cloud_id}**/conversation/{convo_id}/message  |
| convo_id   | Yes      | This is extracted from the URL that is created for you when you create your Custom App (the same one that is identified above).<br/>**Note**: This is the second part of the conversation URL:<br/>https\:\/\/api.atlassian.com/site/{cloud_id}/conversation/**{convo_id}**/message |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Stride notification:

```bash
# Assuming our {auth_token} is HQFtq4pF8rKFOlKTm9Th
# Assuming our {cloud_id} is ce171c45-09ae-4fac-a73d-5a4b7a322872
# Assuming our {convo_id} is a54a80b3-eaad-4524-9a3a-f6653bcfb100
apprise stride://HQFtq4pF8rKFOlKTm9Th/ce171c45-09ae-4fac-a73d-5a4b7a322872/a54a80b3-eaad-4524-9a3a-f6653bcfb100
```
