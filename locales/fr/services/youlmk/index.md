---
title: "Notifications YouLMK"
description: "Envoyez des notifications vers votre boite YouLMK : votre telephone, le navigateur, un e-mail, Slack ou un webhook qui vous appartient, avec les regles que vous definissez par expediteur."
sidebar:
  label: "YouLMK"

source: https://youlmk.com/

schemas:
  - youlmk

sample_urls:
  - youlmk://{token}
  - youlmk://{key}
  - youlmk://{token}?priority={priority}
  - youlmk://{token}?info={priority}&success={priority}&warning={priority}&failure={priority}
  - youlmk://{token}?url={link}&group={group}

has_image: true

limits:
  - name: "Titre"
    max_chars: 120
  - name: "Corps"
    max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[YouLMK](https://youlmk.com/) est une boite de reception de notifications hebergee. Tout ce qui dispose d'un client HTTP peut y envoyer un message, et vous decidez pour chaque expediteur (une _source_) jusqu'ou un message peut aller (Silencieux, Pastille, Banniere, Prioritaire), si les heures calmes le retiennent et comment les repetitions sont regroupees. Une notification arrive sur votre telephone, dans votre navigateur, par e-mail, dans Slack ou sur un webhook qui vous appartient.

1. Connectez-vous sur [youlmk.com](https://youlmk.com/) ou dans l'application, puis creez une source pour ce qui va envoyer (par exemple `apprise`). Chaque source possede sa propre cle et ses propres regles.
2. Ouvrez l'ecran **Key** de la source. Il affiche deux identifiants, et l'un ou l'autre fonctionne ici :
   - le jeton bearer, `ylk_` suivi de 32 caracteres
   - la cle d'URL, `k_` suivi de 14 caracteres

L'essai comprend 10 notifications et 3 surveillances, sans carte bancaire ; ensuite, l'envoi coute 4 $ par mois.

## Syntaxe

La syntaxe valide est la suivante :

- `https://youlmk.com/k/{key}`
- `youlmk://{token}`
- `youlmk://{key}`
- `youlmk://{token}?priority={priority}`
- `youlmk://{token}?info={priority}&success={priority}&warning={priority}&failure={priority}`
- `youlmk://{token}?url={link}&url_label={label}&group={group}`

La priorite peut etre forcee pour toutes les notifications avec `?priority=`, ou definie par type de notification Apprise avec `?info=`, `?success=`, `?warning=` et `?failure=`. Si elle est omise, elle est deduite du type de notification :

| Type Apprise | Priorite YouLMK |
| ------------ | --------------- |
| `info`       | `normal`        |
| `success`    | `normal`        |
| `warning`    | `high`          |
| `failure`    | `high`          |

`critical` n'est jamais une valeur par defaut : cette priorite peut passer outre les heures calmes et le mode Focus lorsque la source l'autorise, elle doit donc etre choisie explicitement. La portee (Reach) de la source reste le plafond ; une priorite ne peut que descendre en dessous.

## Détail des Paramètres

| Variable                           | Obligatoire | Description                                                                                                                                                    |
| ---------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token                              | \*Oui       | Le jeton bearer de la source (`ylk_` et 32 caracteres) ou sa cle d'URL (`k_` et 14 caracteres). Il peut aussi etre fourni via l'argument `?token=`.            |
| priority                           | Non         | Force cette priorite pour toutes les notifications : `low`, `normal`, `high` ou `critical`. Les formes abregees fonctionnent aussi (par exemple `crit`).       |
| info / success / warning / failure | Non         | Remplace la priorite utilisee pour ce type de notification (valeurs par defaut : `normal` / `normal` / `high` / `high`). Ex. `?info=low&failure=critical`.     |
| url                                | Non         | L'adresse derriere le bouton principal de la notification, par exemple l'execution ou le journal concerne.                                                     |
| url_label                          | Non         | Le libelle de ce bouton, jusqu'a 24 caracteres. Tout ce qui depasse est tronque. YouLMK ecrit **Open** lorsque ce champ est absent.                            |
| group                              | Non         | Les notifications partageant le meme groupe dans un intervalle de dix minutes sont regroupees en une seule carte avec un compteur. Par defaut, c'est le titre. |
| image                              | Non         | Mettez `yes` pour placer l'image du type de notification Apprise sur la carte a la place de l'icone de votre source. Par defaut `no`.                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification :

```bash
apprise -vv -t "Sauvegarde terminee" -b "4,2 Go en 3 min 10 s" \
   "youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

La meme chose avec la cle d'URL :

```bash
apprise -vv -t "Sauvegarde terminee" -b "4,2 Go en 3 min 10 s" \
   "youlmk://k_xxxxxxxxxxxxxx"
```

Rendre chaque echec critique, avec un lien libelle vers le journal :

```bash
apprise -vv -n failure -t "Echec de la sauvegarde" -b "exit 2" \
   "youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical&url=https://example.com/logs/2041&url_label=Voir%20le%20journal"
```

Exemple de configuration YAML :

```yaml
urls:
  - youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical
  - youlmk://k_xxxxxxxxxxxxxx?priority=low&group=nightly&image=yes
```
