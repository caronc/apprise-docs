---
title: "Notifications Vapid/WebPush"
description: "Envoyer Vapid/WebPush notifications."
sidebar:
  label: "Vapid/WebPush"

source: https://datatracker.ietf.org/doc/html/draft-thomson-webpush-vapi/

schemas:
  - vapid

has_image: true

sample_urls:
  - vapid://subscription_id/
  - vapid://subscription_id/target/
  - vapid://subscription_id/target1/target2/targetN/

limits:
  max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vapid/WebPush requires a `subscriptions.json` file that identifies all of the users you wish to notify and a `private_key.pem`

## Syntaxe

La syntaxe valide est la suivante :

- `vapid://subscription_id/`
- `vapid://subscription_id/target`
- `vapid://subscription_id/target1/target2/targetN/`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                                            |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyfile  | **Yes**  | A `private key` in `PEM` format belonging to the account associated with the `subscription_id`                                                                                         |
| subfile  | **Yes**  | A `subscriptions.json` file identifying the configuration you wish to reference.                                                                                                       |
| mode     | No       | The mode to use (default `chrome`). Possible values are `chrome`, `firefox`, `edge`, and `opera`. This just simplifies the upstream source that is used when the notification is sent. |

Mode Table:
You will see a lot of duplication (many modes pointing to the same location). The idea is if the end points change, we will update it inside Apprise so your code/URL will not have to change later.

| Mode    | URL                                                  |
| ------- | ---------------------------------------------------- |
| chrome  | `https://fcm.googleapis.com/fcm/send`                |
| forefpx | `https://updates.push.services.mozilla.com/wpush/v1` |
| edge    | `https://fcm.googleapis.com/fcm/send`                |
| opera   | `https://fcm.googleapis.com/fcm/send`                |
| apple   | `https://web.push.apple.com'`                        |
| brave   | `https://fcm.googleapis.com/fcm/send`                |
| samsung | `https://fcm.googleapis.com/fcm/send`                |
| generic | `https://fcm.googleapis.com/fcm/send`                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## subscriptions.json Setup

In order to use Vapid, you must have a `subscriptions.json` file that it can point to. The Vapid plugin supports the 2 following formats:

1. standalone; in the below example, the target would be `abc123`

   ```json
   {
     "endpoint": "https://fcm.googleapis.com/fcm/send/abc123",
     "keys": {
       "p256dh": "BNcW4oA7zq5H9TKIrA3XfKclN2fX9P_7NR...",
       "auth": "k9Xzm43nBGo="
     }
   }
   ```

1. multiple target support; in the below example, 2 targets are created called `name1` and `name2`

   ```json
   {
       "name1": {
           "endpoint": "https://fcm.googleapis.com/fcm/send/...",
           "keys": {
               "p256dh": "BNcW4oA7zq5H9TKIrA3XfKclN2fX9P_7NR...",
               "auth": "k9Xzm43nBGo=",
           }
       },
       "name2": {
           "endpoint": "https://fcm.googleapis.com/fcm/send/...",
           "keys": {
               "p256dh": "BNcW4oA7zq5H9TKIrA3XfKclN2fX9P_7NR...",
               "auth": "k9Xzm43nBGo=",
           }
       }
   ```

It is though targets that you notify one or more endpoints. If you're using persistent storage with Apprise, you can simply manage your `subscription.json` file located here and your URL can stay clean. Alternatively, you can specify `?subfile=` on your URL and point it to a subscription file you wish to load. The location can be local to the filesystem as well as a remote location (such as `subfile=https://user:pass@myhost/special/location/subscription.json`

If no target is specified on your URL, then a target that matches your own `subscriberid` is looked up in the `subcriptions.json` file

## Private Key (PEM) Setup

Similar to the `subscription.json`, you need to point to a `private_key.pem` file. If you are using Apprise persisent storage, you can place the file here. Alternatively you can specify `?keyfile=` on the URL and point it to a local or remote file you wish to use.

## Persistent Storage Tips

The following command will list all of the persistent storage locations associated with your configuration:

```bash
apprise storage list
```

Simply locate the ID associated with the Vapid account you wish to update; consider that the directory ID's can be found as:

1. Microsoft Windows: `%APPDATA%/Apprise/cache`
1. Linux: `~/.local/share/apprise/cache`

For more details on this; see [here](https://github.com/caronc/apprise/wiki/persistent_storage).

## Apprise URL Construction

This is a more complicated plugin to work with since it requires a binary PEM private key and a `subscription.json` file as well. It would be advised to use a Apprise Configuration YAML file that looks like this:

```yaml
urls:
  - vapid://:
      mode: apple
      keyfile: /path/to/keyfile
      subfile: /path/to/subscription.json
```

Remember that both the `keyfile` and `subfile` can be URLs as well (even ones protected behind user/passwords such as:

```yaml
urls:
  - vapid://:
      mode: apple
      keyfile: https://user:pass123@example.com/private_key.pem
      subfile: https://user:pass123@example.com/subscriptions.json
```

If you do not define a keyfile and/or a subfile, the rules above apply as documented above and default ones are looked upon in your persistent storage directory.
