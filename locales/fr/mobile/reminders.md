---
title: Rappels
description: Programmez depuis Apprise Mobile des notifications envoyées plus tard, une fois ou de façon répétée.
sidebar:
  label: Rappels
  order: 2
---

Un rappel est une notification que vous écrivez maintenant et que votre serveur Apprise API envoie plus tard. Il peut être envoyé une seule fois, de façon répétée (chaque jour, un mardi sur deux, le premier de chaque mois) ou lors d'un jour férié, chaque année.

Les rappels sont conservés sur votre serveur Apprise API, pas sur votre téléphone. Une fois enregistré, un rappel est envoyé à l'heure par le serveur, même si votre téléphone est éteint.

## Ce qu'il vous faut

Les rappels n'apparaissent dans Apprise Mobile que pour un serveur qui les propose :

- Une version d'Apprise API qui prend en charge les rappels, avec les rappels activés (`APPRISE_REMINDER_ENABLED`, activé par défaut) et le mode avec état disponible.
- Le planificateur de rappels en marche sur le serveur. S'il est arrêté, les rappels peuvent toujours être enregistrés, et l'application vous avertit qu'ils ne seront pas envoyés tant qu'il ne tourne pas.
- Si l'authentification est activée, un identifiant administrateur ou l'identifiant d'une configuration avec l'accès **user**.

Apprise Mobile vérifie cela pour chacune de vos configurations. Une configuration qui ne peut pas recevoir de rappels est simplement laissée de côté. Consultez [Rappels](/api/endpoints/#rappels) dans la documentation d'Apprise API pour le côté serveur.

## L'écran Rappels

Touchez **Rappels** dans la barre en bas de l'écran. Vous pouvez passer d'une vue à l'autre :

- **Agenda** : un calendrier du mois, avec un point sous chaque jour où quelque chose est prévu. En dessous, chaque envoi prévu, regroupé par jour. Utilisez les flèches pour changer de mois. Touchez un jour pour n'afficher que ce jour (touchez-le de nouveau pour revoir tout le mois) ; **Ajouter un rappel** commence alors le nouveau rappel ce jour-là.
- **Tous** : une carte par rappel, y compris ceux en pause ou terminés. Chaque carte indique comment il se répète, quand il sera envoyé ensuite et comment s'est passé son dernier envoi.

L'Agenda regroupe les rappels de tous vos serveurs. Les rappels en pause apparaissent estompés dans les deux vues.

Une fois téléchargés, les rappels sont gardés sur votre téléphone : l'écran s'ouvre tout de suite et les affiche même hors connexion. Ils sont téléchargés de nouveau au même rythme que les listes du tableau de bord (**Actualiser les listes de services** dans les Réglages), et après une modification faite dans l'application. Faites glisser l'une ou l'autre vue vers le bas pour les télécharger de nouveau maintenant.

Faites glisser un rappel vers la **droite** pour l'envoyer maintenant, sans changer son prochain envoi. Une notice indique tout de suite l'envoi, puis son résultat ; le faire glisser de nouveau avant la fin ne l'envoie pas deux fois. Faites-le glisser vers la **gauche** pour le suspendre, ou reprendre un rappel suspendu.

## Ajouter un rappel

Touchez **Ajouter un rappel**. L'écran du message s'ouvre avec sa section **Rappel** déjà activée. Vous pouvez aussi activer vous-même la section Rappel chaque fois que vous rédigez un message.

Tant que la section Rappel est activée, le bouton **Envoyer** devient **Planifier** : rien n'est envoyé maintenant et le message est enregistré comme rappel.

La section Rappel propose les mêmes champs que la page web d'Apprise API :

- **Nom** : le nom du rappel dans vos listes. Laissé vide, le titre ou la première ligne du message est utilisé.
- **Envoyer le** : à une date que vous choisissez, ou lors d'un jour férié. Pour un jour férié, choisissez le pays (au départ, celui du réglage de région de votre téléphone ; aucune localisation n'est utilisée), une région facultative et le jour férié lui-même.
- **Fuseau horaire** : le fuseau dans lequel la date et l'heure sont lues. Au départ, c'est le dernier que vous avez choisi, sinon celui de votre téléphone. Si aucun des deux n'est dans la liste, le champ est vide et un fuseau doit être choisi avant d'enregistrer.
- **Date et heure** : le moment de l'envoi. Pour un rappel répété, c'est son début, qui peut rester sur **Maintenant**.
- **Rendre récurrent** : activez-le pour répéter le rappel.
- **Fin** : un dernier jour facultatif pour un rappel répété.
- **Intervalle** : la fréquence de répétition, par exemple toutes les 2 semaines. Choisissez **Personnalisé (crontab)** pour saisir votre propre règle crontab en cinq parties.
- **Décalage** : décale chaque envoi un peu plus tard, ou plus tôt avec un signe moins. Par exemple, `-1` semaine envoie un rappel de jour férié une semaine avant le jour.
- **Jours** et **Mois** : limitent un rappel répété à certains jours de la semaine ou à certains mois.

La liste **À venir** sous les champs montre les prochains envois prévus par votre serveur, et se met à jour à mesure que vous modifiez les champs.

### Planifier sans connexion

Planifier fonctionne comme envoyer. Chaque message planifié apparaît dans **Tâches**, marqué d'un réveil, et indique si chaque serveur a enregistré son rappel. Ouvrez Tâches et utilisez le sélecteur en haut pour passer de **Tâches** à **En file d'attente**.

Quand un serveur est injoignable (pas de réseau, ou serveur arrêté), le rappel attend et est enregistré dès que le serveur répond à nouveau, comme un message en attente de livraison. Avec la version complète, vous pouvez continuer à travailler pendant l'attente et le suivre dans **En file d'attente**. L'écran Rappels indique combien de rappels attendent encore.

Ouvrir une tâche planifiée propose **Planifier à nouveau**, qui rouvre le message avec la même planification.

### Envoyer à plusieurs serveurs

Un rappel appartient à une configuration d'un serveur. Lorsque votre message s'adresse à plusieurs d'entre elles, Apprise Mobile enregistre un rappel pour chacune, et la section Rappel les énumère avant la planification.

Les URL choisies une par une sont enregistrées avec le rappel uniquement sur leur propre serveur. Elles ne sont jamais copiées sur un autre serveur. Un serveur qui ne conserve pas d'URL avec les rappels laisse de côté ses URL choisies, et la section Rappel vous indique lesquelles.

## Planifier un rappel d'un message envoyé

Ouvrez un message déjà envoyé depuis **Tâches** et touchez le bouton en forme de réveil en haut. Le message s'ouvre à nouveau, adressé de la même façon, avec sa section Rappel activée. Choisissez quand l'envoyer et touchez **Planifier**.

## Modifier un rappel

Touchez un rappel pour le modifier. Dans la vue Agenda, toucher un envoi d'un rappel répété vous demande s'il faut modifier **Cette fois** seulement ou **Toute la série**.

Un rappel s'ouvre sur le même écran que celui où vous rédigez vos messages, avec sa section Rappel activée. L'interrupteur est verrouillé pendant que vous modifiez un rappel enregistré, et le bas de l'écran affiche **Annuler** et **Enregistrer** au lieu de **Envoyer**. Ce que vous rédigiez auparavant est mis de côté et revient dès que vous enregistrez ou annulez.

- **Cibles** : touchez le nombre de cibles pour voir celles du rappel. Seules les étiquettes, URL et URL locales de sa propre configuration sont listées, celles qu'il utilise étant déjà sélectionnées. Une URL que seul le rappel contient (ajoutée sur la page web d'Apprise API, par exemple) est marquée **Seulement dans ce rappel**. Ces changements ne touchent que le rappel, jamais votre configuration ni vos URL locales.
- **Services sans étiquette** : avec ses propres URL et sans étiquette, **Envoyer aussi aux services sans étiquette** dans la section Rappel l'envoie aussi aux services sans étiquette de la configuration. Le même interrupteur apparaît quand vous planifiez ainsi un nouveau rappel.
- **Pièces jointes** : touchez le trombone. Les fichiers et adresses web déjà enregistrés avec le rappel sont listés par leur nom et marqués **Enregistré avec le rappel** ; rien n'est téléchargé pour les afficher. Retirez-en avec le bouton corbeille, ou ajoutez-en de nouveaux, qui sont envoyés à votre serveur quand vous touchez **Enregistrer**.

La date de début peut être n'importe quelle date, même passée, pour qu'un ancien rappel puisse être ouvert et enregistré tel quel. Un rappel unique dont l'heure est passée n'est pas envoyé ; un rappel répété reprend à sa prochaine heure. La date de fin ne peut pas être antérieure au début.

Chaque rappel dispose aussi d'un menu avec ces choix :

- **Modifier** : changer le message, ses étiquettes ou sa planification.
- **Suspendre** et **Reprendre** : arrêter les envois pour l'instant, sans supprimer le rappel.
- **Dupliquer** : créer un nouveau rappel copié de celui-ci.
- **Supprimer l'entrée** : retirer un rappel unique ou, dans la vue Agenda, seulement cet envoi d'un rappel répété.
- **Supprimer la série** : retirer un rappel répété et tous ses envois. Ce choix n'apparaît que pour un rappel qui se répète.

Un rappel dont le serveur est injoignable pour le moment ne peut pas être modifié : son menu apparaît estompé, et le toucher explique pourquoi.

## Versions gratuite et complète

Les rappels font partie de la version gratuite. La version gratuite gère vos 3 premiers rappels, comptés à partir du plus ancien, y compris ceux créés depuis la page web d'Apprise API. Les rappels au-delà de ces 3 restent sur votre serveur et continuent d'être envoyés ; ils apparaissent grisés dans l'application, et en toucher un explique comment les débloquer.

Les rappels qui attendent encore d'être enregistrés comptent aussi dans les 3. Une fois que la version gratuite compte 3 rappels, le bouton **Ajouter un rappel** et l'interrupteur Rappel de l'écran du message sont grisés. Toucher l'un ou l'autre explique la limite : débloquez la version complète, ou supprimez un rappel pour faire de la place.

La version complète n'impose aucune limite dans l'application. Les limites définies sur le serveur restent applicables.

## Dépannage

**L'écran Rappels indique que les rappels ne sont pas disponibles.** Vérifiez que votre serveur prend en charge les rappels et qu'ils sont activés. Si l'authentification est activée, vérifiez que votre identifiant dispose de l'accès requis. Faites ensuite glisser vers le bas pour actualiser.

**Un serveur affiche un avertissement indiquant que son planificateur ne tourne pas.** Les rappels sont enregistrés mais pas envoyés. Démarrez le planificateur sur ce serveur.

**La liste À venir affiche une erreur.** Le serveur n'a pas pu calculer les envois pour la planification saisie, par exemple une date de fin avant le début. Ajustez les champs indiqués dans le message.
