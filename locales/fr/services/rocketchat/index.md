---
title: "Notifications Rocket.Chat"
description: "Envoyer des notifications Rocket.Chat."
sidebar:
  label: "Rocket.Chat"

source: https://rocket.chat/

schemas:
  - rocket: insecure
  - rockets

has_chat: true
has_selfhosted: true
has_image: true

sample_urls:
  - rockets://{user}:{password}@{hostname}/{@user}
  - rocket://{user}:{password}@{hostname}/#{channel}
  - rocket://{user}:{password}@{hostname}/{room_id}
  - rocket://{webhook}@{hostname}/{@user}
  - rockets://{webhook}@{hostname}/#{channel}
  - rockets://{webhook}@{hostname}/{room_id}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntaxe

Rocket.Chat peut envoyer des notifications via les **modes** suivants :

- **webhook** : un webhook entrant configuré ; il peut être mis en place dans la zone **Administration** sous la rubrique **Intégrations**.
- **basic** : une combinaison identifiant/mot de passe.

Les connexions sécurisées (via https) doivent être référencées avec **rockets://** tandis que les connexions non sécurisées (via http) doivent utiliser **rocket://**.

### Mode Basique

La syntaxe valide est la suivante :

- `rocket://{user}:{password}@{hostname}/#{channel}`
- `rocket://{user}:{password}@{hostname}:{port}/#{channel}`
- `rocket://{user}:{password}@{hostname}/{room_id}`
- `rocket://{user}:{password}@{hostname}:{port}/{room_id}`
- `rockets://{user}:{password}@{hostname}/#{channel}`
- `rockets://{user}:{password}@{hostname}:{port}/#{channel}`
- `rockets://{user}:{password}@{hostname}/{room_id}`
- `rockets://{user}:{password}@{hostname}:{port}/{room_id}`

**Remarque :** l'option `?avatar=yes` ne fonctionnera que si votre utilisateur possède le paramètre de permission `bot`.

Vous pouvez également combiner les formes ci-dessus et effectuer des mises à jour depuis une seule URL :

- **rocket**://**`{user}`**:**`{password}`**@**`{hostname}`**/#**`{channel_id}`**/**`{room_id}`**

Pour le Mode Basique uniquement : si ni **`{room_id}`** ni **#`{channel}`** n'est spécifié, cette notification échouera.

### Mode Webhook

La syntaxe valide est la suivante :

- `rocket://{webhook}@{hostname}/#{channel}`
- `rocket://{webhook}@{hostname}/{room_id}`
- `rocket://{webhook}@{hostname}/{@user}`
- `rockets://{webhook}@{hostname}/#{channel}`
- `rockets://{webhook}@{hostname}:{port}/#{channel}`
- `rockets://{webhook}@{hostname}/{room_id}`
- `rockets://{webhook}@{hostname}:{port}/{room_id}`

Vous pouvez également combiner les formes ci-dessus et effectuer des mises à jour depuis une seule URL :

- **rocket**://**`{webhook}`**@**`{hostname}`**:**`{port}`**/#**`{channel_id}`**/**`{room_id}`**/**@`{user}`**

Par défaut, un webhook est configuré pour être associé à un canal. La syntaxe suivante est donc également valide :

- **rocket**://**`{webhook}`**@**`{hostname}`**/

**Remarque :** Certains webhooks contiennent des barres obliques. Dans ce cas, vous devez vous assurer d'échapper la barre oblique (`/`) avec `%2F`. Votre URL peut donc ressembler à :

- `rocket://abcd%2F12345@{hostname}/` - Notez le `%2F` (pour remplacer le `/` présent dans le webhook)

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                           |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | \*Oui  | L'identifiant utilisateur associé à votre serveur Rocket.Chat. Requis uniquement si vous ne fournissez pas de **webhook**. Peut être combiné optionnellement avec le **webhook** si vous souhaitez remplacer le nom du robot.                         |
| password | \*Oui  | Le mot de passe associé à votre serveur Rocket.Chat. Requis uniquement si vous ne fournissez pas de **webhook**. Cette valeur peut également se substituer à un jeton prégénéré.                                                                      |
| webhook  | \*Oui  | Le webhook entrant que vous avez créé et associé à votre serveur Rocket.Chat. Requis uniquement si vous ne fournissez pas de **webhook** à la place.                                                                                                  |
| hostname | Oui    | Le serveur Rocket.Chat auquel vous envoyez votre notification.                                                                                                                                                                                        |
| port     | Non    | Le port sur lequel le serveur Rocket.Chat écoute. Par défaut, le port est **80** pour **rocket://** et **443** pour toutes les références **rockets://**.                                                                                             |
| room_id  | Non    | Un identifiant de salon. Disponible pour les modes **basic** et **webhook**.                                                                                                                                                                          |
| channel  | Non    | Les canaux doivent être préfixés par un dièse (#) sinon ils seront interprétés comme un identifiant de salon. Disponible pour les modes **basic** et **webhook**. Les canaux doivent être enregistrés sur votre serveur Rocket.Chat pour fonctionner. |
| user_id  | Non    | Un autre utilisateur à notifier. Les identifiants utilisateur doivent être préfixés par le symbole arobase (@). Disponible pour le mode **webhook** uniquement.                                                                                       |
| mode     | Non    | Le mode d'authentification est détecté automatiquement d'après l'URL fournie. Vous n'avez à le définir que si vous estimez qu'il est mal détecté. Les modes possibles sont **basic**, **token** et **webhook**, décrits ci-dessus.                    |
| avatar   | Non    | Remplace l'avatar par défaut associé au message pour correspondre au type de notification (Avertissement, Erreur, Info, etc.). Par défaut, cette option est **Non** pour le mode **basic** et **Oui** pour le mode **webhook**.                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Rocket.Chat vers le canal _#nuxref_ :

```bash
# Supposons que notre {user} soit l2g
# Supposons que notre {password} soit awes0m3!
# Supposons que notre {hostname} soit rocket.server.local
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   rocket://l2g:awes0m3!@rocket.server.local/#nuxref
```
