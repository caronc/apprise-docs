---
title: "Correspondance des Tags"
description: "Problèmes liés aux affectations de tags et aux notifications déclenchées à partir des tags définis"
sidebar:
  order: 10
---

## Introduction

Si vous avez ajouté des tags à vos URL, elles ne seront pas notifiées tant que vous ne les référencez pas explicitement avec **--tag=** (ou **-g**). Vous pouvez toujours vérifier quelles URL ont été chargées en utilisant la directive de tag `all` combinée à **--dry-run** :

### Débogage des associations de tags

Si vous avez accès à la CLI Apprise (installée via `pip install apprise`), vous pouvez facilement suivre ce qui correspond à différentes combinaisons de tags. L'option `--dry-run` indique à `apprise` de ne rien envoyer, mais seulement d'afficher en sortie terminale ce qui correspond.

La commande suivante liste simplement toutes les entrées trouvées dans le fichier `apprise.txt`, qu'elles aient un tag ou non :

```bash
apprise --dry-run --tag=all \
   --config=/my/path/to/my/config/apprise.txt
```

Sans `--tag`, vous ne verrez correspondre que les URL auxquelles aucun tag n'est associé :

```bash
# Lister les notifications qui seraient déclenchées sans tag spécifié :
apprise --dry-run \
   --config=/my/path/to/my/config/apprise.txt
```

Nous pouvons maintenant lister toutes les URL définies ayant le tag `devops` :

```bash
apprise --dry-run --tag=devops \
   --config=/my/path/to/my/config/apprise.txt
```

Une fois que vous avez identifié votre problème de tags dans la configuration et que les bonnes entrées s'affichent avec les commandes ci-dessus, vous pouvez envoyer votre notification en retirant `--dry-run` et en ajoutant au minimum `--body` (`-b`).

Les expressions de filtrage générales sont les suivantes :

| Filtre                        | Services sélectionnés                                                           |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `--tag TagA`                  | Correspond à `TagA`                                                             |
| `--tag TagA,TagB`             | Correspond à `TagA` **ET** `TagB` (strict)                                      |
| `--tag 'TagA' --tag 'TagB`    | Correspond à `TagA` **OU** `TagB` (union)                                       |
| `--tag 'TagA,TagC --tag TagB` | Correspond à (`TagA` **ET** `TagC`) **OU** `TagB`. Mélange de strict et d'union |
| `--tag all`                   | Correspond à **TOUS** les services (tagués et non tagués).                      |
| `(omis)`                      | Notifie uniquement les services **non tagués**.                                 |

:::note
Lorsque vous utilisez une virgule, vous appliquez un filtre : vous demandez à Apprise de réduire la liste aux seuls services qui possèdent tous les tags listés. Pour élargir la sélection et inclure plusieurs groupes différents, répétez simplement le switch `-g`.
:::
