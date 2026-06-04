---
title: "Notifications Dot."
description: "Envoyer des notifications Dot."
sidebar:
  label: "Dot."

source: https://dot.mindreset.tech

schemas:
  - dot

has_attachments: true

sample_urls:
  - dot://{apitoken}@{device_id}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Ouvrez l'application mobile Dot. et récupérez votre **jeton API** (`dot_app_...`) ainsi que le **numéro de série** de l'appareil (chaîne hexadécimale de 12 caractères).
2. Dans l'application, activez le contenu **Text API** et/ou **Image API** pour l'appareil.
3. Utilisez le jeton et l'identifiant de l'appareil avec les URLs `dot://` ci-dessous pour déclencher des notifications.

## Syntaxe

La syntaxe valide est la suivante :

- `dot://{token}@{device_id}/`
- `dot://{token}@{device_id}/?mode=image`

Le mode par défaut est **text**. En mode texte, le corps et le titre sont envoyés vers l'API texte, et toute pièce jointe ou paramètre `image=` est envoyé vers l'API image. Lorsque les deux sont présents, le texte est envoyé en premier, puis l'image.

:::note
Les anciens formats d'URL avec `/text/` ou `/image/` dans le chemin continuent de fonctionner pour la compatibilité ascendante, mais ne sont plus générés.
:::

## Comportement des modes

| Mode            | Comportement                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` (défaut) | Le corps et le titre vont vers l'API texte. Toute pièce jointe ou paramètre `image=` va également vers l'API image. Lorsque les deux sont présents, le texte est envoyé en premier, puis l'image. |
| `image`         | Seule l'API image est appelée. Le corps et le titre sont ignorés. Requiert `image=` ou une pièce jointe.                                                                                          |

## Prise en charge des pièces jointes

- **Mode texte** (défaut) : La pièce jointe est envoyée comme image plein écran (PNG 296×152) vers l'API image. Si un corps ou un titre est également présent, le texte est envoyé en premier. Le paramètre URL `icon=` peut toujours être utilisé indépendamment pour définir l'icône de coin (40×40) dans la carte texte.
- **Mode image** : La première pièce jointe est utilisée comme image plein écran (PNG 296×152) si aucun `image=` n'est fourni dans l'URL.
- Dans tous les modes, seule la première pièce jointe est utilisée ; les pièces jointes supplémentaires déclenchent un avertissement.
- Si `image=` est déjà fourni dans l'URL, les pièces jointes sont ignorées.

## Détail des paramètres

| Variable      | Requis      | Description                                                                                                                                                    |
| ------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token         | \*Oui       | Jeton API Dot. (`dot_app_...`)                                                                                                                                 |
| device_id     | \*Oui       | Numéro de série de l'appareil Dot. (12 caractères hexadécimaux)                                                                                                |
| mode          | Non         | `text` (défaut) ou `image`. Détermine quel point d'API est utilisé. En mode `text`, les deux APIs peuvent être appelées lors d'un seul envoi.                  |
| refresh       | Non         | Mettre à `no` pour différer l'affichage jusqu'au prochain rafraîchissement planifié (défaut : `yes`)                                                           |
| title         | Non (texte) | Titre affiché sur l'appareil                                                                                                                                   |
| message       | Non (texte) | Texte du corps affiché sur l'appareil                                                                                                                          |
| signature     | Non (texte) | Texte de pied de page affiché sur l'appareil                                                                                                                   |
| icon          | Non (texte) | Icône PNG en base64 (40×40) pour le coin inférieur gauche de la carte texte.                                                                                   |
| image         | Oui (image) | Image PNG en base64 (296×152) affichée en plein écran. Peut être fourni via le paramètre URL ou la première pièce jointe (convertie automatiquement).          |
| link          | Non         | Cible de tap-to-interact (http/https ou schéma personnalisé)                                                                                                   |
| border        | Non (image) | `0`=cadre blanc (défaut), `1`=cadre noir                                                                                                                       |
| dither_type   | Non (image) | `DIFFUSION` (défaut), `ORDERED`, ou `NONE`                                                                                                                     |
| dither_kernel | Non (image) | `FLOYD_STEINBERG` (défaut), `THRESHOLD`, `ATKINSON`, `BURKES`, `SIERRA2`, `STUCKI`, `JARVIS_JUDICE_NINKE`, `DIFFUSION_ROW`, `DIFFUSION_COLUMN`, `DIFFUSION_2D` |
| task_key      | Non         | Indique quel emplacement de contenu mettre à jour lorsque plusieurs contenus Text ou Image API existent sur un appareil                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

**Envoyer un rappel texte :**

```bash
apprise -vv -t "Routine du matin" -b "N'oubliez pas d'arroser les plantes" \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?signature=Apprise"
```

**Envoyer texte et image ensemble (texte en premier, puis image) :**

```bash
apprise -vv -t "Routine du matin" -b "N'oubliez pas d'arroser les plantes" \
  -a /chemin/vers/image.png \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/"
```

**Mettre à jour un emplacement spécifique avec task_key :**

```bash
apprise -vv -t "Statut serveur" -b "Tous les systèmes opérationnels" \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?task_key=moniteur_statut"
```

**Envoyer une carte image (via paramètre URL) :**

```bash
apprise -vv \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?mode=image&image=$(base64 -w0 affiche.png)&link=https://example.com"
```

**Envoyer une carte image via pièce jointe :**

```bash
apprise -vv -a /chemin/vers/image.png \
  "dot://dot_app_TOKEN@A1B2C3D4E5F6/?mode=image&link=https://example.com"
```
