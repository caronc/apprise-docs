---
title: "Notifications Ntfy"
description: "Envoyer des notifications Ntfy (Notify)."
sidebar:
  label: "Ntfy"

source: https://ntfy.sh/

schemas:
  - ntfy: insecure
  - ntfys

has_attachments: true

sample_urls:
  - ntfy://{topic}
  - ntfy://{host}/{topic}
  - ntfy://{user}@{host}:{port}/{topics}
  - ntfy://{user}:{password}@{host}/{topics}
  - ntfy://{token}@{hostname}/{topics}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

[Ntfy](https://ntfy.sh/) est un service de messagerie simple a utiliser qui prend en charge a la fois l'offre nuagique publique, `https://ntfy.sh`, et les serveurs prives auto-heberges.

Apprise prend en charge les schemas non securises, `ntfy://`, ainsi que les schemas securises, `ntfys://`.

---

## Syntaxe

Ntfy peut envoyer des notifications via les **modes** suivants :

- **private** : un serveur prive heberge localement <https://github.com/binwiederhier/ntfy>
- **cloud** : une configuration pointant vers <https://ntfy.sh>

La syntaxe valide est la suivante :

- `ntfy://{topic}`
- `ntfy://{host}/{topic}`
- `ntfy://{host}:{port}/{topics}`
- `ntfy://{user}@{host}/{topics}`
- `ntfy://{user}@{host}:{port}/{topics}`
- `ntfy://{user}:{password}@{host}/{topics}`
- `ntfy://{user}:{password}@{host}:{port}/{topics}`
- `ntfy://{token}@{hostname}/{topics}`

Les versions securisees sont les suivantes :

- `ntfys://{topic}`
- `ntfys://{host}/{topic}`
- `ntfys://{host}:{port}/{topics}`
- `ntfys://{user}@{host}/{topics}`
- `ntfys://{user}@{host}:{port}/{topics}`
- `ntfys://{user}:{password}@{host}/{topics}`
- `ntfys://{user}:{password}@{host}:{port}/{topics}`
- `ntfys://{token}@{hostname}/{topics}`

Vous pouvez specifier plus d'un sujet :

- `ntfy://{user}:{password}@{hostname}/{topic1}/{topic2}`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user       | Non         | Compte utilisateur utilise pour l'authentification.                                                                                                                                                                                                                                                                                                  |
| password   | Non         | Mot de passe utilise pour l'authentification.                                                                                                                                                                                                                                                                                                        |
| hostname   | Non         | Serveur ntfy vers lequel envoyer les notifications.                                                                                                                                                                                                                                                                                                  |
| port       | Non         | La valeur par defaut est **80** pour `ntfy://` et **443** pour `ntfys://`.                                                                                                                                                                                                                                                                           |
| topic      | Oui         | Au moins un sujet doit etre defini.                                                                                                                                                                                                                                                                                                                  |
| token      | Non         | Jeton d'autorisation, detecte automatiquement s'il est fourni dans l'URL.                                                                                                                                                                                                                                                                            |
| mode       | Non         | Mode d'authentification, detecte automatiquement. Valeurs possibles : `private`, `cloud`.                                                                                                                                                                                                                                                            |
| auth       | Non         | `basic`, par defaut, ou `token`.                                                                                                                                                                                                                                                                                                                     |
| email      | Non         | Associe une adresse e-mail a la publication ntfy.                                                                                                                                                                                                                                                                                                    |
| xtags      | Non         | **Etiquettes de message ntfy**, envoyees dans l'en-tete `X-Tags`, a associer a la notification. Utilisez des virgules et/ou des espaces pour en specifier plusieurs. L'ancien parametre `tags=` est toujours accepte comme alias compatible. A ne pas confondre avec les tags Apprise ; [voir ici pour plus de details](#tags-ntfy-vs-tags-apprise). |
| attach     | Non         | URL pointant vers une piece jointe distante a referencer.                                                                                                                                                                                                                                                                                            |
| filename   | Non         | Remplace le nom du fichier joint.                                                                                                                                                                                                                                                                                                                    |
| click      | Non         | Lien vers lequel les utilisateurs sont rediriges lorsqu'ils cliquent sur la notification.                                                                                                                                                                                                                                                            |
| priority   | Non         | Une des valeurs `max`, `high`, `default`, `low` ou `min`. La valeur par defaut est `default`.                                                                                                                                                                                                                                                        |
| actions    | Non         | Definitions des boutons d'action ntfy.                                                                                                                                                                                                                                                                                                               |
| delay      | Non         | Differe la livraison du message.                                                                                                                                                                                                                                                                                                                     |
| image      | Non         | La valeur par defaut est `Yes` ; inclut un apercu de l'image lorsqu'il est disponible.                                                                                                                                                                                                                                                               |
| avatar_url | Non         | Remplace l'icone Apprise par une URL d'image personnalisee.                                                                                                                                                                                                                                                                                          |

Si votre serveur Ntfy est heberge derriere une configuration HTTPS securisee, utilisez simplement `ntfys://` :

<!-- TEMPLATE:SERVICE-PARAMS -->

## Tags Ntfy vs Tags Apprise

Le parametre `xtags=` ci-dessus fait reference **uniquement aux tags de message ntfy**, envoyes dans l'en-tete `X-Tags`. L'ancienne orthographe `tags=` reste acceptee pour des raisons de compatibilite ascendante, mais `xtags=` est desormais a privilegier.

Ces tags sont envoyes directement au serveur ntfy et apparaissent sous forme d'etiquettes ou d'emojis sur la notification livree.

Ils **ne correspondent pas** aux tags de routage Apprise.

Les tags de routage Apprise sont configures dans votre fichier de configuration Apprise, avec `tag:` ou `tags:` en YAML, et determinent quels services de notification sont declenches. Ils n'ont aucun effet sur l'en-tete `X-Tags` envoye au serveur ntfy.

:::caution
L'ancienne orthographe `tags=` a ete renommee en `xtags=` parce que l'analyseur YAML d'Apprise utilise lui aussi `tags:` comme cle pour les tags de routage. Employer `tags=` dans une URL ntfy chargee depuis un fichier YAML pouvait faire interpreter silencieusement la valeur comme un tag de routage Apprise plutot que comme un tag de message ntfy, empechant alors la livraison de la notification si aucun filtre de tag n'etait actif. Utiliser `xtags=` elimine completement cette ambiguite.
:::

Voici un exemple de message Ntfy envoye avec des tags :

```bash
apprise -vv -t "Failure" -b "Something went wrong" \
   "ntfy://localhost/mytopic?priority=high&xtags=warning"
```

Voici un exemple reprenant le precedent pour montrer que plusieurs tags Ntfy sont egalement pris en charge :

```bash
apprise -vv -t "Alert" -b "Disk space low" \
   "ntfy://localhost/mytopic?priority=high&xtags=warning,storage"
```

Les fichiers de configuration YAML d'Apprise peuvent parfois preter a confusion puisqu'ils utilisent eux aussi des tags. L'exemple ci-dessous montre clairement la difference entre `tag:` dans Apprise et `xtags=` dans ntfy.

```yaml
# apprise.yaml
urls:
  - ntfy://localhost/mytopic?priority=high&xtags=warning:
      tag: ntfy-alert
```

Dans l'exemple ci-dessus :

- `xtags=warning` : tag de message Ntfy, qui definit l'en-tete `X-Tags: warning`
- `tag: ntfy-alert` : tag de routage Apprise ; il serait ensuite utilise lors du declenchement suivant :

  ```bash
  apprise -vv -t "Alert" -b "Disk space low" \
     --tag=ntfy-alert --config=apprise.yaml
  ```

## Exemples

Envoyer une notification vers un serveur Ntfy local :

```bash
# Supposons que notre {hostname} soit localhost
# Supposons que notre {topic} soit great-place
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ntfy://localhost/great-place
```

Nous pouvons aussi envoyer une notification au serveur ntfy.sh, en mode cloud :

```bash
# Supposons que notre {topic} soit great-place
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ntfy://great-place
```

Ntfy prend egalement en charge Markdown ; pour en profiter, ajoutez simplement `?format=markdown` a votre URL Apprise, par exemple :

```bash
# Supposons que notre {hostname} soit localhost
# Supposons que notre {topic} soit great-place
# Supposons que nous voulions tirer parti de la prise en charge de markdown
apprise -vv -t "Test Message Title" -b "# Markdown Support" \
   "ntfy://localhost/great-place?format=markdown"
```

Utilisation securisee en HTTPS :

```bash
# Supposons que notre {hostname} SECURISE soit localhost
# Supposons que notre {topic} soit great-topic
apprise -vv -t "Test Secure Message Title" -b "Test Message Body" \
   ntfys://localhost/great-topic
```

Utilisation des boutons d'action ntfy :

```bash
apprise -vv -t "Title" -b "Message content" \
    ntfy://ntfy.selfhostedexample.com/mytopic?actions=view%2CGoogle%2Chttps://www.google.com%3Bview%2CBing%2Chttps://www.bing.com
```
