---
title: "Construction d'URL"
description: "Dépannage de la construction d'URL Apprise"
sidebar:
  order: 10
---

## Introduction

Apprise est construit autour des URL. Malheureusement, les URL utilisent des caractères réservés comme délimiteurs pour distinguer un argument ou un réglage d'un autre.

Par exemple, dans une URL, **&**, **/** et **%** ont tous des significations très différentes, et s'ils apparaissent aussi dans votre mot de passe ou votre nom d'utilisateur, cela peut rendre le dépannage assez pénible lorsque vos notifications ne fonctionnent pas.

Il existe heureusement une solution : vous pouvez remplacer ces caractères par des valeurs spéciales de type **%XX** (encodage URL). Ces caractères encodés évitent que l'URL soit mal interprétée, ce qui vous permet d'envoyer vos notifications correctement.

:::tip[Besoin d'aide pour construire l'URL ?]
Si vous préférez ne pas échapper les caractères spéciaux à la main, essayez le [Générateur d'URL Apprise](../url-builder/). Il vous aide à construire des URL Apprise partageables tout en gardant les champs sensibles hors du lien généré.
:::

Voici ci-dessous un tableau des caractères spéciaux et de la valeur à utiliser :

| Caractère     | Encodage URL | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[**         | **%5B**      | Le caractère `[` peut prêter à confusion avec les chaînes IPv6 lors du parsing. Vous devriez utiliser sa forme encodée s'il apparaît par exemple dans votre mot de passe.                                                                                                                                                                                                                                                                                                                                                    |
| **]**         | **%5D**      | Le caractère `]` peut prêter à confusion avec les chaînes IPv6 lors du parsing. Vous devriez utiliser sa forme encodée s'il apparaît par exemple dans votre mot de passe.                                                                                                                                                                                                                                                                                                                                                    |
| **%**         | **%25**      | Le signe pourcentage lui-même est le caractère de départ des séquences `%XX`.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **&**         | **%26**      | L'esperluette indique à une URL qu'elle doit arrêter de lire la variable en cours et passer à la suivante. Si elle se trouve dans un mot de passe ou un nom d'utilisateur, la lecture s'arrêtera à cet endroit. Il faut donc l'échapper si vous l'utilisez.                                                                                                                                                                                                                                                                  |
| **#**         | **%23**      | Le dièse, parfois appelé hash ou pound symbol, peut être utilisé dans une URL comme ancre.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **?**         | **%3F**      | Le point d'interrogation sépare le chemin d'une URL des arguments que vous lui passez. Il est préférable de l'échapper s'il apparaît dans votre mot de passe ou s'il doit faire partie de l'une des variables que vous passez dans votre chaîne d'URL.                                                                                                                                                                                                                                                                       |
| _(un espace)_ | **%20**      | Même si beaucoup d'URL fonctionneront avec un espace, il est préférable de l'échapper afin que l'URL reste plus claire à lire.                                                                                                                                                                                                                                                                                                                                                                                               |
| **/**         | **%2F**      | Le slash est le délimiteur le plus courant dans une URL ; il sert à définir un chemin et/ou un emplacement.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **@**         | **%40**      | L'arobase est ce qui sépare l'utilisateur et/ou le mot de passe du nom d'hôte dans une URL. Si votre nom d'utilisateur ou votre mot de passe contient un `@`, le parseur d'URL peut être perturbé.                                                                                                                                                                                                                                                                                                                           |
| **+**         | **%2B**      | Par défaut, un symbole plus **(+)** est interprété comme un _espace_ lorsqu'il apparaît dans une URL. Il doit être échappé si vous voulez qu'il soit réellement représenté comme un **+**.                                                                                                                                                                                                                                                                                                                                   |
| **,**         | **%2C**      | Une virgule n'a besoin d'être échappée que dans des _cas extrêmement rares_, par exemple lorsqu'elle se trouve tout à la fin d'une URL spécifique chaînée avec d'autres au moyen d'une virgule. [Voir la PR#104](https://github.com/caronc/apprise/pull/104) pour plus de détails sur les cas où cela _peut_ être nécessaire.                                                                                                                                                                                                |
| **:**         | **%3A**      | Un deux-points n'a généralement jamais besoin d'être échappé, sauf s'il apparaît dans une combinaison utilisateur/mot de passe. Ainsi, dans l'URL `http://user:pass@host`, on voit qu'un deux-points sépare déjà le _nom d'utilisateur_ du _mot de passe_. Si votre _{user}_ contient lui-même un deux-points, le parseur peut interpréter ce qui suit comme un mot de passe et non comme la suite du nom d'utilisateur. C'est un cas très rare, car la plupart des systèmes n'autorisent pas `:` dans un nom d'utilisateur. |
| **;**         | **%3B**      | Un point-virgule peut également poser problème s'il apparaît dans l'URL. Il vaut mieux le convertir lui aussi ([voir 1433](https://github.com/caronc/apprise/issues/1433)).                                                                                                                                                                                                                                                                                                                                                  |

## URL Apprise en ligne de commande

Si vous passez une URL sur l'interface en ligne de commande (CLI) de votre shell Linux/Windows/Mac, il est important de l'entourer de guillemets. Les URL exploitent le caractère `&` pour séparer un paramètre d'un autre (par ex. `schema://config?parm=value&parm2=value`).

Le problème, c'est que le caractère `&` est également interprété par la CLI. Il pousse le shell à exécuter tout ce qui précède comme un processus en arrière-plan. Résultat : tous les paramètres situés après le premier `&` peuvent être perdus et ne jamais être enregistrés.

```bash
# Exemple d'URL Apprise problématique sans "guillemets" :
apprise -vvv -b "Test Email" \
     mailtos://user:pass@example.com?mode=ssl&smtp=smtp.example.com&from=Chris
#    ^                                      ^^
#    |--------------------------------------||
#                      |                     |
#  C'est tout ce qui est transmis à Apprise |
#                                            |
#                             Le reste est interprété par le shell comme
#                             une tâche d'arrière-plan selon la manière dont
#                             la CLI gère les arguments après ce point. Ainsi,
#                             seul "mailtos://user:pass@example.com?mode=ssl"
#                             est réellement chargé dans Apprise dans cet exemple.

```

Ce n'est très probablement PAS ce que vous voulez obtenir. La même URL devrait plutôt être écrite ainsi :

```bash
apprise -vvv -b "Test Email" \
     "mailtos://user:pass@example.com?mode=ssl&smtp=smtp.example.com&from=Chris"
#    |-------------------------------------------------------------------------|
#                                         |
#        Avec des guillemets, l'URL complète est correctement transmise à Apprise !
```
