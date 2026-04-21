---
title: "Débordement de Données"
description: "Gérer les services amont qui ne peuvent pas supporter le volume de données que vous leur fournissez"
sidebar:
  order: 10
---

## Introduction

Par défaut, Apprise transmet intégralement le message (et le titre) que vous lui fournissez à la ou aux sources de notification. Certaines sources peuvent absorber un large surplus de données, tandis que d'autres non. Ces limitations sont documentées (_dans la mesure de mes connaissances_) sur les [pages wiki correspondant à chaque service individuel](../../services/).

Cependant, si vous ne voulez pas vous préoccuper des restrictions amont, Apprise offre une manière assez _élégante_ de gérer ce genre de situation. Il vous suffit d'ajouter le paramètre **overflow** quelque part dans votre URL Apprise ; par exemple :

- `schema://path/?overflow=split`
- `schema://path/?overflow=truncate`
- `schema://path/?overflow=upstream`
- `schema://path/?other=options&more=settings&overflow=split`

Les options possibles pour **overflow=** sont les suivantes :

| Variable     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **split**    | Découpe le corps du message en autant de petits morceaux que nécessaire pour garantir la livraison complète de ce que vous voulez notifier. La taille de ces morceaux est basée sur les restrictions imposées par le service de notification lui-même.<br/><br/>Par exemple, _Twitter_ limite les tweets publics à 280 caractères. Si votre URL Apprise/Twitter devient `twitter://<auth data>/?overflow=split`, un message de 1000 caractères sera découpé (et envoyé) en 4 messages plus petits (280 + 280 + 280 + 160). |
| **truncate** | Garantit simplement que, quelle que soit la quantité de contenu envoyée à un service de notification distant, le contenu ne dépassera jamais les restrictions imposées par ce service.<br/><br/>Reprenons l'exemple de _Twitter_ (limité à 280 caractères). Si votre URL Apprise/Twitter devient `twitter://<auth data>/?overflow=truncate`, un message de 1000 caractères n'enverra que les 280 premiers caractères. Le reste sera _tronqué_ et ignoré.                                                                   |
| **upstream** | Laisse simplement le service de notification amont gérer l'intégralité des données qui lui sont transmises, qu'elles soient petites ou volumineuses. Apprise ne modifiera pas le contenu.<br/>**Remarque** : c'est l'option par défaut lorsque la directive `overflow=` n'est pas définie.                                                                                                                                                                                                                                 |

:::caution
Veuillez noter que l'option **overflow=** n'est pas une solution parfaite :

- Elle peut échouer pour des services comme Telegram qui peuvent recevoir du contenu au format _HTML_ (en plus du _Markdown_). Si vous utilisez _HTML_, il est très probable que les options `overflow=split` et/ou `overflow=truncate` coupent votre message au milieu d'une balise HTML non fermée. Telegram gère mal cela et, par le passé (au moment de la rédaction de cette page), cela provoquait une erreur et empêchait l'affichage.
- Cela dit, Apprise fait de son mieux pour couper ou tronquer élégamment les messages en fin de mot (au plus près des limites).
- L'option `overflow=split` peut aussi se retourner contre vous. Imaginez que vous envoyiez accidentellement des milliers d'entrées de logs vers un service SMS. Préparez-vous à recevoir des centaines de SMS pour reconstruire tout ce que vous avez demandé à Apprise d'envoyer ! Ce n'est pas forcément l'effet recherché ; dans ce cas, `overflow=truncate` est peut-être un meilleur choix. Certains services peuvent même vous facturer davantage si vous dépassez un certain seuil de messages. L'idée est donc de rester prudent lorsque vous activez l'option _split_ avec des services dont la taille maximale de message est très faible. La bonne nouvelle, c'est que chaque [plugin de notification pris en charge](../../services/) indique ses limites strictes.

:::
