---
title: "Notifications Zulip"
description: "Envoyer des notifications Zulip."
sidebar:
  label: "Zulip"

source: https://zulipchat.com/

schemas:
  - zulip

sample_urls:
  - zulip://{botname}@{organization}/{token}/
  - zulip://{botname}@{organization}/{token}/{stream}
  - zulip://{botname}@{organization}/{token}/{email}

limits:
  max_chars: 10000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Pour utiliser Zulip, vous devez disposer d'un robot Zulip Chat ; [consultez cette page pour plus de details](https://zulipchat.com/help/add-a-bot-or-integration). Au moment de la redaction de ce plugin, la procedure etait la suivante :

1. Depuis votre ordinateur, cliquez sur l'icone d'engrenage en haut a droite.
2. Selectionnez **Settings**.
3. Dans le menu de gauche, cliquez sur **Your bots**.
4. Cliquez sur **Add a new bot**.
5. Remplissez les champs puis cliquez sur **Create bot**.

Si vous connaissez l'**{ID}** de votre organisation, puisqu'il fait partie de votre URL `zulipchat.com`, vous pouvez aussi acceder aux informations de votre robot en visitant : `https://ID.zulipchat.com/#settings/your-bots`

Une fois le robot cree avec succes, vous pourrez recuperer son jeton API.

## Syntaxe

La syntaxe valide est la suivante :

- `zulip://{botname}@{organization}/{token}/`
- `zulip://{botname}@{organization}/{token}/{stream}`
- `zulip://{botname}@{organization}/{token}/{stream1}/{stream2}/{streamN}`
- `zulip://{botname}@{organization}/{token}/{email}`
- `zulip://{botname}@{organization}/{token}/{email1}/{email2}/{emailN}`

**Remarque :** si ni **{stream}** ni **{email}** ne sont precises, le flux **general** est notifie par defaut.

Vous pouvez aussi melanger les entrees ci-dessus :

- `zulip://{botname}@{organization}/{token}/{stream1}/{email1}/`

## Détail des Paramètres

| Variable     | Obligatoire | Description                                                                                                                                                                |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| organization | Oui         | Organisation dans laquelle vous avez cree votre webhook. La partie finale `.zulipchat.com` n'est pas obligatoire ici, mais elle est prise en charge si vous la fournissez. |
| token        | Oui         | Jeton API fourni apres la creation du robot.                                                                                                                               |
| botname      | Oui         | Nom du robot associe a la cle API. La partie `-bot` du nom n'est pas obligatoire, mais elle est egalement prise en charge si vous la precisez.                             |
| email        | Non         | Adresse e-mail appartenant a l'un des utilisateurs ajoutes a votre organisation pour l'envoi d'un message prive.                                                           |
| stream       | Non         | Flux a notifier.                                                                                                                                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Zulip vers le flux `#general`, utilise par defaut :

```bash
# Supposons que notre {organization} soit apprise
# Supposons que notre {token} soit T1JJ3T3L2
# Supposons que notre {botname} soit goober
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   zulip:///goober@apprise/T1JJ3T3L2
```

Envoyer une notification Zulip vers le flux `#support` :

```bash
# Supposons que notre {organization} soit apprise
# Supposons que notre {token} soit T1JJ3T3L2
# Supposons que notre {stream} soit #support
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   zulip:///apprise/T1JJ3T3L2/support
```
