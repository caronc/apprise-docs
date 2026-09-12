---
title: "Débordement de Données"
description: "Découper ou raccourcir les messages qui dépassent la limite d'un service"
sidebar:
  order: 10
---

## Introduction

Apprise envoie normalement le message et le titre en entier. Certains services
limitent leur longueur. Lorsqu'elles sont connues, ces limites figurent sur la
[page du service](../../services/).

Utilisez le paramètre **overflow** pour demander à Apprise de gérer ces limites. Ajoutez-le à votre URL Apprise, par exemple :

- `schema://path/?overflow=split`
- `schema://path/?overflow=truncate`
- `schema://path/?overflow=upstream`
- `schema://path/?other=options&more=settings&overflow=split`

Choisissez l'une des valeurs suivantes :

| Variable     | Description                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **split**    | Préserve le message complet en le répartissant sur autant de notifications que nécessaire. Chaque partie est adaptée à la limite connue du service et envoyée dans l'ordre. |
| **truncate** | Envoie une seule notification contenant uniquement le début qui respecte la limite du service documentée par le plugin. Le reste est supprimé.                              |
| **upstream** | Transmet le corps complet au service, qui applique sa propre limite. C'est le comportement par défaut.                                                                      |

:::caution
Les limites varient selon les services. Cette option aide à les respecter, mais
ne peut pas garantir que chaque service acceptera le message :

- Apprise essaie de couper entre les mots.
- La mise en forme peut changer légèrement lorsque le message est découpé.
- Un service peut encore refuser une partie proche de sa limite stricte.
- `split` peut transformer un contenu volumineux en de nombreuses notifications. Soyez particulièrement prudent avec les SMS et les services mobiles, car chaque message peut être décompté de votre forfait ou facturé. Utilisez `truncate` si perdre la fin est préférable à l'envoi de nombreux messages.

:::
