---
title: "Notifications Microsoft Teams"
description: "Envoyer des notifications Microsoft Teams."
sidebar:
  label: "Microsoft Teams"

source: https://teams.microsoft.com

schemas:
  - msteams

ended: 2026-05-22

has_chat: true
has_image: true

sample_urls:
  - https://team-name.office.com/webhook/{tokenA}/IncomingWebhook/{tokenB}/{tokenC}
  - msteams://{team}/{tokenA}/{tokenB}/{tokenC}/

limits:
  max_chars: 1000
---

:::caution

Ce service a été retiré en amont. Toutes les informations ci-dessous concernent sa configuration héritée.
:::

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Créez un compte gratuit sur [https://teams.microsoft.com](https://teams.microsoft.com).

Vous devrez créer un **Incoming Webhook** pour relier Apprise. Cela peut se faire via le **magasin d'applications** en bas à gauche de l'interface de type Slack ; ne vous inquiétez pas, c'est gratuit. Depuis ce magasin, recherchez **Incoming Webhook**. Une fois sélectionné, vous pourrez l'associer à votre équipe, lui attribuer un nom et un avatar, puis le rattacher à un canal.

Vous pouvez aussi ouvrir le canal où vous souhaitez ajouter le webhook, cliquer sur l'icône ••• (_More options_) dans la barre de navigation supérieure, rechercher **Incoming Webhook**, puis sélectionner **Add**.

Une fois cette étape terminée, une URL ressemblant à ceci sera générée :

```text
https://team-name.office.com/webhook/ \
       abcdefgf8-2f4b-4eca-8f61-225c83db1967@abcdefg2-5a99-4849-8efc-\
        c9e78d28e57d/IncomingWebhook/291289f63a8abd3593e834af4d79f9fe/\
          a2329f43-0ffb-46ab-948b-c9abdad9d643
```

Oui, l'URL est effectivement aussi longue... mais au final cela correspond à :
`https://{team}.office.com/webhook/{tokenA}/IncomingWebhook/{tokenB}/{tokenC}`

Ainsi, le nom de l'équipe se trouve dans le webhook généré, qui ressemble à ceci :

```text
# https://TEAM-NAME.office.com/webhook/ABCD/IncomingWebhook/DEFG/HIJK
#             ^                         ^                    ^    ^
#             |                         |                    |    |
#  Ces éléments sont importants <--------^--------------------^----^
```

Par comparaison, l'ancienne URL ressemblait à ceci, avec `outlook` comme nom d'équipe fixe :

```text
# https://outlook.office.com/webhook/ABCD/IncomingWebhook/DEFG/HIJK
#           ^                         ^                    ^    ^
#           |                         |                    |    |
#   ancienne reference d'equipe : 'outlook' |             |    |
#                                     |                    |    |
#  Ces éléments sont importants <------^--------------------^----^
```

Comme vous pouvez le voir, nous avons 3 jetons distincts. Ce sont eux qui vous servent à construire votre URL Apprise. Dans l'exemple ci-dessus, les jetons sont les suivants :

1. **TokenA** est `ABCD@WXYZ`
2. **TokenB** est `DEFG`
3. **TokenC** est `HIJK`

**Remarque :** Apprise prend en charge cette URL _telle quelle_ (_depuis la version 0.7.7_). Vous n'avez donc plus besoin de la reparser davantage. Il y a toutefois un léger surcoût interne si vous l'utilisez de cette manière.

## Syntaxe

La syntaxe valide est la suivante :

- `https://team-name.office.com/webhook/{tokenA}/IncomingWebhook/{tokenB}/{tokenC}`
- `msteams://{team}/{tokenA}/{tokenB}/{tokenC}/`

L'ancien format est lui aussi toujours pris en charge. L'URL ci-dessous définirait automatiquement le nom d'équipe à `outlook` :

- `msteams://{tokenA}/{tokenB}/{tokenC}/`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                      |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| team     | Oui    | Extrait de l'_incoming-webhook_.                                                                                                                                                                                                 |
| tokenA   | Oui    | La première partie des 3 jetons fournis après la création d'un _incoming-webhook_.                                                                                                                                               |
| tokenB   | Oui    | La deuxième partie des 3 jetons fournis après la création d'un _incoming-webhook_.                                                                                                                                               |
| tokenC   | Oui    | La dernière partie des 3 jetons fournis après la création d'un _incoming-webhook_.                                                                                                                                               |
| template | Non    | Permet de pointer vers votre propre **MessageCard** Microsoft Teams au format JSON ; [voir ici les détails du format](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Microsoft Teams :

```bash
# Supposons que notre {team} soit Apprise
# Supposons que notre {tokenA} soit T1JJ3T3L2@DEFK543
# Supposons que notre {tokenB} soit A1BRTD4JD
# Supposons que notre {tokenC} soit TIiajkdnlazkcOXrIdevi7F
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   msteams:///Apprise/T1JJ3T3L2@DEFK543/A1BRTD4JD/TIiajkdnlazkcOXrIdevi7F/
```

## Modèles

### L'Argument d'URL `template`

Définissez un argument `?template=` pointant vers une **MessageCard** prédéfinie que vous avez déjà préparée pour Microsoft Teams. Le paramètre `template` peut viser un fichier local ou une URL web. Son contenu doit être du JSON, faute de quoi une erreur sera levée lors du traitement. Au minimum, il doit respecter la structure suivante :

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions"
}
```

#### Les Jetons de Modèle

Le `template=` vers lequel vous pointez peut soit être déjà entièrement rempli et prêt à être envoyé au serveur de discussion MSTeams, soit être alimenté dynamiquement à chaque appel Apprise. Pour cela, utilisez des doubles accolades `{{` et `}}` autour d'un mot-clé de votre choix, comme dans l'exemple ci-dessous :

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "{{app_id}}",
  "sections": [
    {
      "activityImage": "{{app_image_url}}",
      "activityTitle": "{{app_title}}",
      "text": "Hello {{ target }}, how are you {{ whence }}?"
    }
  ]
}
```

Dans l'exemple ci-dessus, nous introduisons plusieurs jetons : `app_id`, `app_title`, `target` et `whence`. Certaines entrées seront TOUJOURS définies et ne peuvent pas être surchargées :

- **app_id** : l’identifiant de l’application, généralement défini à `Apprise`, même si un développeur peut le surcharger.
- **app_desc** : la description de l’application, souvent une variante un peu plus explicite de `app_id`. Elle vaut en général `Apprise Notification` sauf surcharge.
- **app_color** : un code hexadécimal représentant la couleur associée au message. Par exemple, les messages `info` sont généralement bleus tandis que les messages `warning` sont orange.
- **app_type** : le type du message lui-même, par exemple `info`, `warning`, `success`, etc.
- **app_title** : le titre réel transmis à la notification Apprise (`--title` ou `-t` en ligne de commande).
- **app_body** : le corps réel transmis à la notification Apprise (`--body` ou `-b` en ligne de commande).
- **app_image_url** : l’URL d’image associée au type de message (`info`, `warning`, etc.) si elle existe et si elle n’a pas été désactivée dans l’URL (`image=no`).
- **app_url** : l’URL associée à l’instance Apprise, trouvée dans l’objet **AppriseAsset()**. Sauf surcharge explicite, sa valeur est `https://github.com/caronc/apprise`.

Tout ce que vous inventez en dehors de cela vous appartient. Revenons donc à `target` et `whence`. Les jetons de template peuvent être définis dynamiquement en utilisant l’opérateur `:` devant tout argument d’URL que vous choisissez. Par exemple :

- `msteams://credentials/?template=/path/to/template.json&:target=Chris&:whence=this%20afternoon`
- `msteams://credentials/?template=http://host/to/template.json&:target=Chris&:whence=this%20afternoon`

Une notification comme celle-ci :

```bash
# En utilisant des deux-points, nous pouvons definir dynamiquement
# target et whence depuis la ligne de commande :
apprise -t "Mon Titre" -b "Ceci est Ignore" \
   "msteams://credentials/?template=http://host/to/template.json&:target=Chris&:whence=this%20afternoon"
```

Publierait dans MSTeams, sur la base du template ci-dessus :

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "Apprise",
  "sections": [
    {
      "activityImage": null,
      "activityTitle": "Mon Titre",
      "text": "Bonjour Chris, comment allez-vous cet apres-midi ?"
    }
  ]
}
```

Le template Apprise par défaut à ce jour ressemble à ceci :

```json
# Prepare our payload
payload = {
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "{{app_desc}}",
  "themeColor": "{{app_color}}",
  "sections": [
    {
        "activityImage": null,
        "activityTitle": "{{app_title}}",
        "text": "{{app_body}}"
    }
  ]
}
```

#### Autres Exemples de Modèle

```json
{
  "@type": "MessageCard",
  "@context": "https://schema.org/extensions",
  "summary": "{{app_desc}}",
  "themeColor": "{{app_color}}",
  "sections": [
    {
      "activityImage": null,
      "activityTitle": "{{app_title}}",
      "text": "{{app_body}}"
    }
  ],
  "potentialAction": [
    {
      "@type": "ActionCard",
      "name": "Add a comment",
      "inputs": [
        {
          "@type": "TextInput",
          "id": "comment",
          "isMultiline": false,
          "title": "Add a comment here for this task"
        }
      ],
      "actions": [
        {
          "@type": "HttpPOST",
          "name": "Add comment",
          "target": "{{ target }}"
        }
      ]
    }
  ]
}
```

#### Remarques Supplémentaires sur les Modèles

- Les jetons peuvent contenir des espaces autour d’eux pour améliorer la lisibilité. Ainsi, `{{ token }}` n’est pas différent de `{{token}}`.
- Tous les jetons sont correctement échappés ; ne vous inquiétez donc pas si une valeur contient un guillemet double (`"`), il sera correctement échappé avant l’envoi en amont.
- Les jetons sont **sensibles à la casse**. Ainsi, `{{Token}}` doit être alimenté par une valeur `:Token=` dans votre URL.
- Les jetons qui ne correspondent à rien ne sont tout simplement pas remplacés, et `{{keyword}}` restera tel quel dans le message.
- Apprise exige toujours au minimum un `--body` (`-b`), qui peut éventuellement être référencé en tant que `{{app_body}}` dans votre template. Même si vous ne l’utilisez pas, vous devez quand même fournir quelque chose pour satisfaire cette exigence et tirer parti des appels de template.
