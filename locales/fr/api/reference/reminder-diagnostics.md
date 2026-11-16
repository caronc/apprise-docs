---
title: Diagnostics des Rappels
description: Comment lire les diagnostics copiés depuis un rappel, et les vérifier avec reminder_check.
sidebar:
  order: 4
---

Lorsqu'un rappel n'est pas envoyé au moment prévu, ses diagnostics montrent ce que le serveur savait de lui à cet instant. Collez-les dans un ticket d'assistance, ou lisez-les vous-même à l'aide des tableaux ci-dessous.

## Obtenir les Diagnostics

Sélectionnez l'icône d'insecte (**Diagnostics**) sur la carte d'un rappel dans l'onglet **Rappels**, ou sur un envoi passé dans son calendrier. La fenêtre montre exactement ce que **Copier** copiera, et son interrupteur **Masqué** choisit la quantité de détails :

- **Masqué** (activé au départ) masque le nom et le tag du rappel, et ne garde que le schéma de chaque URL et adresse de pièce jointe (par exemple `json://`), pour que leur nombre et leur type restent visibles.
- Désactivé, le nom, le tag, les URL et les pièces jointes sont affichés en entier, avec les mots de passe et jetons de ses URL toujours masqués.

Dans les deux cas, le titre et le corps du rappel ainsi que le Config ID sont omis. Le texte est copié dans un bloc ` ```json `, pour rester lisible une fois collé dans un ticket GitHub. Les appelants de l'API obtiennent la même chose avec `GET /reminder/{KEY}/{ID}/diagnostics`, en ajoutant `?privacy=yes` pour la version masquée.

Les diagnostics décrivent le rappel dans son ensemble, pas l'une de ses échéances : sa carte et son envoi passé dans le calendrier donnent donc les mêmes diagnostics.

## Heures

Chaque heure est une date et heure ISO 8601 en UTC, par exemple `2026-11-17T14:00:00+00:00`. Seul `server.time` diffère : c'est le moment de la copie, lu sur l'horloge propre du serveur avec son décalage, par exemple `2026-11-17T09:00:00-05:00`. En le comparant à `copied`, on voit l'écart entre l'horloge du serveur et l'UTC, et donc comment chaque heure UTC apparaîtrait dans le journal du serveur. Le fuseau horaire propre au rappel figure dans `reminder.when.tz`.

## Premier Niveau

| Champ      | Signification                                                                                                                                                                                              |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`   | La version de la structure.                                                                                                                                                                                |
| `copied`   | Le moment de la copie. Chaque heure est recalculée à partir de ce moment, et non du moment où vous les lisez.                                                                                              |
| `server`   | L'horloge du serveur et ses réglages de rappels. Voir [server](#server).                                                                                                                                   |
| `config`   | La configuration à laquelle appartient le rappel. Voir [config](#config).                                                                                                                                  |
| `versions` | Les versions de tout ce qui calcule les heures d'un rappel. Voir [versions](#versions).                                                                                                                    |
| `reminder` | Le rappel : sa planification, où il envoie, et le résultat de son dernier envoi. Voir [reminder](#reminder).                                                                                               |
| `upcoming` | Ses 5 prochaines échéances à partir de `copied`, après les heures ignorées, `until` et `count`. Moins de 5 signifie qu'il se termine avant. `null` lorsque ses heures n'ont pas pu être calculées du tout. |

## Server

| Champ               | Signification                                                                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `time`              | Le moment de la copie, sur l'horloge propre du serveur, avec son décalage. Il correspond aux horodatages du journal du serveur.                 |
| `tz`                | Le fuseau horaire du serveur (`TZ`). `time` devrait être lu dans ce fuseau ; sinon, `TZ` n'est pas configuré comme prévu.                       |
| `scheduler_running` | Si un scheduler tournait. Sans lui, aucun rappel n'est envoyé.                                                                                  |
| `grace`             | `APPRISE_REMINDER_GRACE` : combien de secondes de retard un rappel peut encore être envoyé. Au-delà, il est ignoré.                             |
| `idle_days`         | `APPRISE_REMINDER_IDLE_DAYS` : une configuration inutilisée pendant ce nombre de jours voit ses rappels mis en pause. `0` désactive ce réglage. |
| `workers`           | `APPRISE_REMINDER_WORKERS` : combien de rappels sont envoyés en même temps.                                                                     |
| `urls_allowed`      | Si les rappels peuvent envoyer à leurs propres URL (`APPRISE_REMINDER_URLS_MAX` supérieur à `0`).                                               |
| `attach_allowed`    | Si les pièces jointes sont activées (`APPRISE_ATTACH_SIZE` supérieur à `0`).                                                                    |
| `auth_required`     | Si les connexions sont activées (`APPRISE_AUTH_REQUIRED`). L'accès d'une configuration n'affecte ses rappels que lorsqu'elles le sont.          |

## Config

| Champ       | Signification                                                                                                                                                                                                                                   |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `saved`     | Si une configuration est enregistrée sous le Config ID. `null` lorsque cela n'a pas pu être déterminé.                                                                                                                                          |
| `access`    | L'accès de la configuration : `user`, `locked`, `public` ou `disabled`. `null` signifie qu'elle n'a pas d'enregistrement d'accès, donc l'administrateur la gère. `unreadable` signifie qu'il n'a pas pu être lu, donc ses rappels sont retenus. |
| `last_used` | La dernière utilisation du Config ID.                                                                                                                                                                                                           |

## Versions

| Champ         | Signification                                                                                                        |
| :------------ | :------------------------------------------------------------------------------------------------------------------- |
| `apprise-api` | Ce serveur.                                                                                                          |
| `apprise`     | La bibliothèque qui envoie les notifications.                                                                        |
| `dateblock`   | Calcule les heures auxquelles correspond un cron ou une planification répétée.                                       |
| `holidays`    | Le calendrier des jours fériés.                                                                                      |
| `python`      | La version de Python utilisée par le serveur.                                                                        |
| `tzdata`      | La base des fuseaux horaires, qui contient les règles d'heure d'été de chaque pays. `null` lorsqu'elle est inconnue. |

Deux machines aux versions différentes peuvent calculer des heures différentes, par exemple après qu'un pays a modifié ses règles d'heure d'été ou qu'un jour férié a été déplacé.

## Reminder

| Champ                  | Signification                                                                                                                                                                                       |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | L'identifiant du rappel. Le journal du serveur nomme les rappels par celui-ci.                                                                                                                      |
| `name`                 | Son nom, tel qu'affiché dans l'onglet **Rappels**.                                                                                                                                                  |
| `enabled`              | `false` tant qu'il est en pause.                                                                                                                                                                    |
| `when`                 | Sa planification et son fuseau horaire (`tz`) : un envoi unique `at`, `at` avec `every` pour répéter, un `cron` ou un `holiday`, plus un éventuel `drift`. Voir [Rappels](/api/endpoints/#rappels). |
| `start`, `until`       | La date et l'heure locales à partir desquelles il commence, et celles après lesquelles plus rien n'est envoyé.                                                                                      |
| `count`                | Combien de fois il est envoyé avant de s'arrêter.                                                                                                                                                   |
| `runs`                 | Combien de fois il a été dû, en comptant ceux ignorés pour retard et les envois échoués.                                                                                                            |
| `skip`                 | Les heures auxquelles il n'est pas envoyé.                                                                                                                                                          |
| `next`                 | Sa prochaine échéance, ou `null` lorsqu'il ne reste rien. Une heure antérieure à `copied` signifie qu'il était dû et n'avait pas encore été envoyé.                                                 |
| `last`                 | Le résultat de son dernier envoi : quand (`at`), si chaque service l'a accepté (`ok`), et pourquoi pas (`reason`, voir ci-dessous).                                                                 |
| `series`, `occurrence` | Seulement sur un envoi unique qui remplace une échéance d'un rappel répété : l'identifiant de ce rappel, et l'échéance remplacée.                                                                   |
| `owner`                | Qui l'a ajouté : `admin`, ou `user` pour la connexion propre à la configuration.                                                                                                                    |
| `created`, `updated`   | Quand il a été ajouté, et modifié pour la dernière fois.                                                                                                                                            |
| `tag`                  | Les services de la configuration auxquels il envoie. Absent ou `null` à côté de `urls` signifie qu'il n'envoie qu'à ses propres URL ; `""` désigne les services sans tag de la configuration.       |
| `urls`                 | Ses propres URL, avec leurs mots de passe et jetons masqués.                                                                                                                                        |
| `attach`               | Ses pièces jointes : le `filename` et la `size` d'un fichier enregistré, ou une adresse web avec son mot de passe masqué.                                                                           |

### Dépannage

| `last.reason`            | Signification                                                                                                                |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `late`                   | Il avait plus de `grace` secondes de retard, par exemple après un arrêt du serveur, donc il a été ignoré.                    |
| `idle`                   | Sa configuration est restée inutilisée pendant `idle_days`, donc ses rappels ont été mis en pause.                           |
| `urls`                   | Il n'envoie qu'à ses propres URL, que le serveur n'autorise plus.                                                            |
| `config`                 | Il envoie par une configuration, mais aucune n'a été trouvée.                                                                |
| `attach`                 | Ses pièces jointes n'ont pas pu être utilisées, par exemple un fichier enregistré disparu ou des pièces jointes désactivées. |
| `error`                  | Apprise n'a pas pu l'envoyer du tout.                                                                                        |
| aucune, avec `ok: false` | Il a été envoyé, mais un ou plusieurs services ne l'ont pas accepté. Le journal du serveur indique lesquels.                 |

## Vérifier les Diagnostics

`reminder_check` lit des diagnostics, recalcule leurs heures avec le même code que le scheduler, et liste tout ce qui empêcherait l'envoi du rappel. Enregistrez le texte copié dans un fichier, puis exécutez :

```bash
docker exec -i apprise python manage.py reminder_check < diagnostics.txt
```

Sans le conteneur, exécutez `python manage.py reminder_check diagnostics.txt` depuis le répertoire `apprise_api`. Sans fichier, la commande lit le texte collé jusqu'à la fin de l'entrée (`Ctrl+D`). Le bloc ` ```json ` peut rester en place.

Les heures de son rapport sont données sur l'horloge du serveur d'où viennent les diagnostics, pour correspondre à son journal. L'heure locale propre au rappel suit entre parenthèses lorsqu'elle diffère.

```text
Reminder   55aa137ab3a949c2937feb772afc9a13 (Standup)
Copied     2026-11-16 10:30:05 (2026-11-16 15:30:05 Europe/London) (server timezone America/Toronto, its clock read 2026-11-16T10:30:05-05:00)
Schedule   {"cron": "0 0 9 * * Mon-Fri", "tz": "Europe/London"}
Sends to   the configuration's untagged services
Limits     count 3, runs 0; 0 skipped times
Next       2026-11-17 04:00:00 (2026-11-17 09:00:00 Europe/London) (as saved)
Upcoming   2026-11-17 04:00:00 (2026-11-17 09:00:00 Europe/London); ... (worked out here)
Versions   apprise-api 2.1.0, apprise 2.2.0, dateblock 2.2.0, holidays 0.108, python 3.14.8, tzdata 2026e
Findings
  - No scheduler was running, so no reminder was being sent.
```

Le rapport est en anglais. Ses constats, et que faire :

| Constat (en anglais)                                | Que faire                                                                                                                                                         |
| :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No scheduler was running                            | Démarrez le scheduler. Le conteneur en exécute un ; ailleurs, exécutez `python manage.py scheduler` à côté du serveur web (voir [Déploiement](/api/deployment/)). |
| The server's clock ... does not match its timezone  | Le processus lit un autre fuseau horaire que celui nommé par `TZ`. Vérifiez comment `TZ` est défini pour chaque processus, y compris le scheduler.                |
| It is paused                                        | Reprenez-le depuis sa carte.                                                                                                                                      |
| It was due ... before this was copied               | Il part dès que le scheduler regarde à nouveau. Au-delà de `grace`, il est ignoré pour retard.                                                                    |
| It has nothing left to send                         | Son `count` a été atteint, son `until` est passé, ou un envoi unique a été fait. Modifiez-le pour lui donner d'autres échéances.                                  |
| Its configuration is disabled                       | Changez l'accès de la configuration. Ses rappels reprennent à partir de là.                                                                                       |
| It sends through a configuration, but none is saved | Enregistrez une configuration sous le Config ID, ou envoyez le rappel à ses propres URL.                                                                          |
| The server no longer allows URLs in reminders       | L'administrateur les a désactivées. Envoyez plutôt par la configuration.                                                                                          |
| Attachments are turned off on the server            | L'administrateur les a désactivées. Retirez les pièces jointes.                                                                                                   |
| Its configuration went unused                       | Utilisez le Config ID, puis reprenez ses rappels, ou augmentez `APPRISE_REMINDER_IDLE_DAYS`.                                                                      |
| Times or versions differ                            | Les deux machines calculent les heures différemment. Comparez les versions et mettez à jour la plus ancienne.                                                     |

## Journal du Serveur

Le scheduler journalise chaque rappel par son identifiant, sur des lignes qui commencent par `REMINDER -` : un `grep` sur l'identifiant suit un rappel de son enregistrement jusqu'à son envoi. Réglez `LOG_LEVEL=DEBUG` pour voir aussi chaque réveil prévu, chaque rappel envoyé avec sa prochaine échéance, et ceux retenus avec la raison. En `DEBUG`, le journal contient aussi le texte de chaque notification envoyée : ne partagez que les lignes `REMINDER -` dans un ticket public.
