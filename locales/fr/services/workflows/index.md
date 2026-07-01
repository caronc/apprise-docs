---
title: "Notifications Microsoft Power Automate / Workflows"
description: "Envoyer des notifications Microsoft Power Automate / Workflows."
sidebar:
  label: "Microsoft Power Automate / Workflows"

source: https://www.microsoft.com/power-platform/products/power-automate

schemas:
  - workflows

has_image: true

sample_urls:
  - workflows://{host}:{port}/{workflow}/{signature}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Selon l’endroit où vous souhaitez voir apparaître votre notification, vous devez créer un workflow adapté. Par exemple, un workflow MS Teams peut ressembler à ceci :<br/>
![image](./images/f6034b792cdb90d1.png)

La documentation correspondante se trouve [ici](https://learn.microsoft.com/en-us/power-automate/teams/send-a-message-in-teams).

Une fois terminé, cela générera une URL ressemblant à ceci :

```text
https://prod-NO.LOCATION.logic.azure.com:443/workflows/WFID/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SIGNATURE
       |-------------------------------| |-|             |                                                                                                  |
                    |                     |          {workflow}                                                                                          {signature}
             host information {host}      |
                                         {port}

```

Oui, l’URL est effectivement aussi longue... mais au final elle correspond à :

- `workflows://{host}:{port}/{workflow}/{signature}`

:::tip
Apprise prend également cette URL en charge _telle quelle_ ; vous n’avez donc plus besoin de la reparser. Il existe toutefois un léger surcoût interne si vous l’utilisez ainsi. Parfois, le copier-coller reste malgré tout la solution la plus simple.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `https://prod-site.logic.azure.com:443/workflows/{workflow}/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig={signature}`
- `workflows://{host}:{port}/{workflow}/{signature}`

## Détail des Paramètres

| Variable  | Requis | Description                                                                                                                                                                                                                                                                                   |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| workflow  | Oui    | L’identifiant de workflow fourni dans le lien webhook Azure.                                                                                                                                                                                                                                  |
| signature | Oui    | L’identifiant de signature fourni dans le lien webhook Azure, c’est-à-dire `sig=`.                                                                                                                                                                                                            |
| wrap      | Non    | Enveloppe le texte du corps dans la réponse.                                                                                                                                                                                                                                                  |
| ver       | Non    | Version d’API Power Automate à utiliser ; la valeur par défaut est `2016-06-01`. Cette valeur peut aussi être lue via le mot-clé `api-version` présent dans le lien webhook Azure.                                                                                                            |
| template  | Non    | Permet d’indiquer le chemin vers un template que vous préférez utiliser à la place de la carte Adaptive choisie par Apprise. Utilisez des doubles accolades `{{token}}` pour marquer les jetons à remplacer avant soumission au service amont, par exemple `{{app_body}}` ou `{{app_title}}`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Modèles

### L’Argument d’URL `template`

Définissez un argument `?template=` pointant vers une charge utile JSON prédéfinie que vous souhaitez fournir au workflow. Dans l’idéal, vous pouvez rester sur le format [AdaptiveCards](https://learn.microsoft.com/en-us/power-automate/create-adaptive-cards).

#### Les Jetons de Modèle

Le `template=` que vous indiquez peut soit être entièrement rempli et prêt à être utilisé tel quel, soit être alimenté dynamiquement à chaque appel Apprise. Pour cela, utilisez des doubles accolades `{{` et `}}` autour d’un mot-clé de votre choix, comme dans l’exemple ci-dessous :

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "{{app_title}}",
      "weight": "Bolder",
      "separator": true
    },
    {
      "type": "TextBlock",
      "text": "{{app_body}}",
      "wrap": true
    }
  ]
}
```

Dans l’exemple ci-dessus, nous introduisons plusieurs jetons : `app_id`, `app_title`, `target` et `whence`. Certaines entrées seront TOUJOURS définies et ne peuvent pas être surchargées :

- **app_id** : l’identifiant de l’application, généralement défini à `Apprise`, même si un développeur peut le surcharger.
- **app_desc** : la description de l’application, souvent une variante un peu plus explicite de `app_id`. Elle vaut généralement `Apprise Notification` sauf surcharge.
- **app_color** : un code hexadécimal représentant la couleur associée au message. Par exemple, les messages `info` sont souvent bleus, tandis que les messages `warning` sont orange.
- **app_color_hex** : alias explicite de `app_color` ; meme valeur hexadecimale, fourni pour que les gabarits puissent utiliser un nom auto-documenté pour la variante hexadecimale.
- **app_type** : le type du message lui-même, comme `info`, `warning`, `success`, etc.
- **app_title** : le titre réel transmis à la notification Apprise via `--title` ou `-t`.
- **app_body** : le corps réel transmis à la notification Apprise via `--body` ou `-b`.
- **app_image_url** : l’URL de l’image associée au type de message, par exemple `info` ou `warning`, si elle existe et n’a pas été désactivée dans l’URL via `image=no`.
- **app_url** : l’URL associée à l’instance Apprise, trouvée dans l’objet **AppriseAsset()**. Sauf surcharge explicite, sa valeur est `https://github.com/caronc/apprise`.

Tout ce que vous inventez en dehors de cela vous appartient. Revenons donc à `target` et `whence`. Les jetons de template peuvent être définis dynamiquement en utilisant l’opérateur `:` devant les arguments d’URL de votre choix. Par exemple :

- `workflows://credentials/?template=/path/to/template.json&:target=Chris&:whence=this%20afternoon`
- `workflows://credentials/?template=http://host/to/template.json&:target=Chris&:whence=this%20afternoon`

Une notification comme celle-ci :

```bash
# En utilisant des deux-points, nous pouvons definir dynamiquement
# target et whence depuis la ligne de commande :
apprise -t "Mon Titre va dans app_title" -b "Ceci est place dans app_body" \
   "workflows://credentials/?template=http://host/to/template.json&:target=Chris&:whence=this%20afternoon"
```

Publierait dans MSTeams en suivant le template ci-dessus :

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "TextBlock",
      "text": "{{app_title}}",
      "weight": "Bolder",
      "separator": true
    },
    {
      "type": "TextBlock",
      "text": "{{app_body}}",
      "wrap": true
    },
    {
      "type": "TextBlock",
      "text": "Hello {{ target }}, how are you {{ whence }}?",
      "wrap": true
    }
  ]
}
```

#### Remarques Supplémentaires sur les Modèles

- Les jetons peuvent contenir des espaces autour d’eux pour améliorer la lisibilité. Ainsi, `{{ token }}` n’est pas différent de `{{token}}`.
- Tous les jetons sont correctement échappés ; ne vous inquiétez donc pas si une valeur contient un guillemet double (`"`), il sera correctement échappé avant l’envoi en amont.
- Les jetons sont **sensibles à la casse**. Ainsi, `{{Token}}` doit être alimenté par une valeur `:Token=` dans votre URL.
- Les jetons qui ne correspondent à rien ne sont tout simplement pas remplacés, et `{{keyword}}` restera tel quel dans le message.
- Apprise exige toujours au minimum un `--body` (`-b`), qui peut éventuellement être référencé sous `{{app_body}}` dans votre template. Même si vous ne l’utilisez pas, vous devez tout de même fournir une valeur pour satisfaire cette exigence et utiliser les appels de template.

## Exemples

Envoyer une notification Microsoft Teams :

```bash
# Assuming our {host} is prod-site.logic.azure.com
# Assuming our {port} is 443
# Assuming our {workflow} is T1JJ3T3L2@DEFK543
# Assuming our {signature} is TIiajkdnlazkcOXrIdevi7F
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   workflows:///prod-site.logic.azure.com:443/T1JJ3T3L2@DEFK543/TIiajkdnlazkcOXrIdevi7F/
```
