---
title: "Débordement de Données"
description: "Gérer les services amont qui ne peuvent pas supporter le volume de données que vous leur fournissez"
sidebar:
  order: 10
---

## Introduction

Par défaut, Apprise transmet intégralement le message (et le titre) que vous lui fournissez à la ou aux sources de notification. Certaines sources peuvent absorber un large surplus de données, tandis que d'autres non. Ces limitations sont documentées (_dans la mesure de mes connaissances_) sur les [pages wiki correspondant à chaque service individuel](../../services/).

Utilisez le paramètre **overflow** pour demander à Apprise de gérer ces limites. Ajoutez-le à votre URL Apprise, par exemple :

- `schema://path/?overflow=split`
- `schema://path/?overflow=truncate`
- `schema://path/?overflow=upstream`
- `schema://path/?other=options&more=settings&overflow=split`

Les options possibles pour **overflow=** sont les suivantes :

| Variable     | Description                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **split**    | Préserve le message complet en le répartissant sur autant de notifications que nécessaire. Chaque bloc respecte au mieux la limite du service documentée par le plugin et est envoyé dans l'ordre. |
| **truncate** | Envoie une seule notification contenant uniquement le début qui respecte la limite du service documentée par le plugin. Le reste est supprimé.                                                     |
| **upstream** | Transmet le corps complet au service, qui applique sa propre limite. C'est le comportement par défaut.                                                                                             |

:::caution
L'option **overflow=** est une protection au mieux :

- Apprise privilégie les limites de mots lorsque c'est possible. Il tente aussi de préserver la lisibilité du Markdown déclaré lorsqu'une découpe coupe sa mise en forme.
- La réparation peut ajouter quelques caractères de fermeture. Un service avec une limite stricte peut encore refuser le résultat.
- Les balises HTML et les variantes Markdown propres aux services ne survivent pas toujours parfaitement à une découpe.
- `split` peut transformer un contenu volumineux en de nombreuses notifications. Soyez particulièrement prudent avec les SMS et les services mobiles, car chaque message peut être décompté de votre forfait ou facturé. Utilisez `truncate` si perdre la fin est préférable à l'envoi de nombreux messages.

:::
