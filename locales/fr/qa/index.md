---
title: "Dépannage"
description: "Problemes courants, diagnostics et correctifs lorsque les notifications Apprise ne se comportent pas comme prevu."
sidebar:
  label: "Introduction"
  order: 1
---

La meilleure chose a faire lorsque vous diagnostiquez un probleme de notification est de commencer par le reproduire avec l'outil en ligne de commande _apprise_. Vous pouvez augmenter la verbosite pour voir ce qui se passe, simplement avec **-v** ; plus vous ajoutez de `v`, plus la sortie est detaillee :

```bash
# Dans l'exemple ci-dessous, j'essaie de comprendre pourquoi ma ligne
# mailto:// ne fonctionne pas :
apprise -vvv -t "test title" -b "test body"     "mailto://user:password@gmail.com"
```

La sortie peut vous aider a identifier precisement ce qui ne va pas dans votre URL.

Si la sortie vous semble obscure, ou si vous avez l'impression d'avoir tout essaye, n'hesitez pas a [ouvrir un ticket ici](https://github.com/caronc/apprise/issues). Il est tres utile de partager la sortie recue en mode debug. Il peut s'agir d'un simple ajustement de votre URL, ou bien d'un vrai bug a corriger.

N'hesitez pas a nous rejoindre sur [Discord](https://discord.gg/MMPeN2D) ; la communaute n'est pas enorme, mais elle grandit doucement. Vous pourriez y trouver une reponse rapidement.

Restez prudent : les informations de debogage peuvent exposer a l'ecran des donnees personnelles (mot de passe, jetons d'acces prives, etc.). Pensez a les masquer ou a les remplacer avant toute publication publique.

## Sujets

Les sujets suivants sont deja documentes ici :

- [Messages d'erreur](./error-lookup/)
- [Correspondance des tags](./tag-matching/)
- [Construction des URL](./special-characters/)
- [Problemes de formatage](./formatting-issues/)
- [Depassement de donnees](./data-overflow/)
- [Prise en charge de PyInstaller](./pyinstaller/)
- [Utilisation des ressources (RAM / memoire)](./resource-usage/)
