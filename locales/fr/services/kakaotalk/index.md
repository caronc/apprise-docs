---
title: "Notifications KakaoTalk"
description: "Envoyez des messages KakaoTalk à vous-même ou à vos amis."
sidebar:
  label: "KakaoTalk"

source: https://www.kakaocorp.com

schemas:
  - kakaotalk
  - kakao

has_chat: true

body_formats:
  - text

sample_urls:
  - kakaotalk://{client_id}/{refresh_token}
  - kakaotalk://{client_secret}@{client_id}/{refresh_token}
  - kakaotalk://{client_id}/{refresh_token}/{uuid1}/{uuid2}/{uuidN}

limits:
  max_chars: 200
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Apprise envoie les messages grâce à l'API Kakao Talk Message. Les messages partent de votre propre compte KakaoTalk, soit vers vous-même (dans votre salon « Chat with me »), soit vers vos amis.

1. Connectez-vous à [Kakao Developers](https://developers.kakao.com/) et créez une application.
2. Dans **App Keys**, copiez la **REST API Key**. C'est votre `{client_id}`.
3. Dans **Kakao Login**, activez Kakao Login et ajoutez une **Redirect URI** (par exemple `https://localhost/`).
4. Dans **Kakao Login > Consent Items**, activez **Send message in KakaoTalk** (`talk_message`).
5. Dans **Kakao Login > Security**, copiez le **Client Secret** s'il est activé. C'est votre `{client_secret}`.
6. Ouvrez cette adresse dans votre navigateur, connectez-vous et acceptez. Remplacez `{client_id}` et `{redirect_uri}` par vos propres valeurs :

   ```text
   https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope=talk_message
   ```

7. Votre navigateur est redirigé vers votre Redirect URI avec `?code=` à la fin. Copiez ce code et échangez-le contre vos jetons :

   ```bash
   curl -X POST https://kauth.kakao.com/oauth/token \
       -d grant_type=authorization_code \
       -d client_id={client_id} \
       -d client_secret={client_secret} \
       -d redirect_uri={redirect_uri} \
       -d code={code}
   ```

8. Conservez la valeur `refresh_token` de la réponse. C'est votre `{refresh_token}`. Retirez la ligne `client_secret` si votre application n'en utilise pas.

Apprise utilise le jeton d'actualisation pour obtenir un nouveau jeton d'accès chaque fois qu'il en a besoin. Lorsque Kakao fournit un nouveau jeton d'actualisation (environ un mois avant l'expiration de l'ancien), Apprise le conserve dans son [stockage persistant](/cli/persistent-storage/). Assurez-vous donc que le stockage persistant est activé pour les installations qui tournent longtemps.

### Envoyer à des amis

Sans cible, les messages vous sont envoyés à vous-même. Pour écrire à des amis, ajoutez leurs UUID KakaoTalk à l'URL. Vos amis doivent eux aussi s'être connectés à votre application, et celle-ci doit avoir la permission d'écrire à des amis (voir **Kakao Talk Message** dans la console Kakao Developers). Vous pouvez obtenir les UUID de vos amis avec l'[API de liste d'amis](https://developers.kakao.com/docs/en/kakaotalk-social/rest-api) une fois l'élément de consentement **Friends list in Kakao Service** (`friends`) activé.

Utilisez `me` comme cible pour vous inclure avec vos amis.

:::note
Un message KakaoTalk contient au plus 200 caractères, les messages plus longs sont donc découpés. Chaque message inclut un lien qui s'ouvre lorsqu'on le touche. Définissez-le avec `?link=` vers une page d'un domaine enregistré dans **Platform > Web** de votre application.
:::

:::note
Les pièces jointes ne sont pas prises en charge, car l'API Kakao Talk Message n'accepte les images que par URL et ne permet pas d'envoyer de fichiers.
:::

## Syntaxe

Les syntaxes valides sont les suivantes :

- `kakaotalk://{client_id}/{refresh_token}`
- `kakaotalk://{client_secret}@{client_id}/{refresh_token}`
- `kakaotalk://{client_id}/{refresh_token}/{uuid}`
- `kakaotalk://{client_id}/{refresh_token}/{uuid1}/{uuid2}/{uuidN}/me`

Vous pouvez raccourcir `kakaotalk://` en `kakao://`.

## Détail des Paramètres

| Variable      | Requis | Description                                                                                                                  |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| client_id     | Oui    | La REST API Key de votre application Kakao Developers.                                                                       |
| refresh_token | Oui    | Le jeton d'actualisation obtenu lors de la configuration de votre compte.                                                    |
| client_secret | Non    | Le Client Secret de votre application, s'il est activé. Il peut aussi être fourni avec `?secret=`.                           |
| uuid          | Non    | L'UUID d'un ami à notifier. Utilisez `me` pour vous-même. Si aucune cible n'est indiquée, le message vous est envoyé à vous. |
| link          | Non    | La page web qui s'ouvre lorsqu'on touche le message. La valeur par défaut est `https://developers.kakao.com`.                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message à vous-même :

```bash
# Remplacez 0123456789abcdef0123456789abcdef par votre REST API Key
# Remplacez tGb4hhaFbYxNRexWXy6TQuKGx par votre jeton d'actualisation
apprise -vv -b "Sauvegarde terminée." \
    kakaotalk://0123456789abcdef0123456789abcdef/tGb4hhaFbYxNRexWXy6TQuKGx
```

Envoyer un message à deux amis et à vous-même, avec un Client Secret :

```bash
# Remplacez Sx9QeT1aYp7Lr3Kd par votre Client Secret
apprise -vv -t "Alerte" -b "Il s'est passé quelque chose." \
    "kakao://Sx9QeT1aYp7Lr3Kd@0123456789abcdef0123456789abcdef/tGb4hhaFbYxNRexWXy6TQuKGx/-Jqzh7SBuYq4kKCRo5WvhrCJsJS9gbm7kQ/aBcDeFgHiJkLmNoPqRsTuVwXyZ/me"
```

Ouvrir votre propre page d'état lorsqu'on touche le message :

```bash
apprise -vv -b "Le serveur est hors service." \
    "kakaotalk://0123456789abcdef0123456789abcdef/tGb4hhaFbYxNRexWXy6TQuKGx?link=https://status.example.com"
```
