---
title: "Gestionnaire de Notifications"
description: "Guide et référence du gestionnaire de notifications Apprise (N_MGR), y compris les surcharges de schémas et le contrôle à l'exécution."
---

## Introduction

Travailler avec le gestionnaire de notifications vous permet :

- de remplacer un service de notification intégré par une implémentation personnalisée ;
- de désactiver un ou plusieurs services de notification à l'exécution ;
- de découvrir quels schémas et plugins sont actuellement disponibles ;
- de gérer proprement les conflits de schémas causés par les décorateurs ou l'ordre d'import.

Si vous essayez de **remplacer un service intégré (par exemple Discord)**, la solution recommandée est :

```python
from apprise.plugins import N_MGR

N_MGR.add(MyCustomNotify, schemas="discord", force=True)
```

:::tip
Utiliser `force=True` évite les problèmes d'ordre d'import et ne décharge pas les modules déjà importés.
:::

Le **gestionnaire de notifications** est le registre central chargé de découvrir, enregistrer et résoudre les plugins de notification dans Apprise.

Il associe des schémas d'URL de notification tels que `schema://...` à leur implémentation Python correspondante et contrôle si ces implémentations sont activées, désactivées ou surchargées.

Le gestionnaire est un singleton, généralement accessible via :

```python
from apprise.plugins import N_MGR
```

## Concepts de base

### Mappage de schéma

Un **schéma** est associé à exactement une implémentation de notification à la fois.

- Toute URL commençant par `schema://` est routée vers la classe enregistrée pour ce schéma.
- Les schémas ne sont pas sensibles à la casse et sont normalisés en interne.
- Par défaut, les collisions de schéma sont rejetées afin d'éviter les surcharges accidentelles.

### Chargement paresseux

Le gestionnaire utilise un chargement paresseux :

- les plugins intégrés ne sont découverts qu'en cas de besoin ;
- la plupart des opérations déclenchent automatiquement la découverte ;
- appeler `load_modules()` force une découverte immédiate.

:::note
Vous n'avez pas besoin d'appeler `load_modules()` manuellement ; il est automatiquement appelé une première fois lors du premier `import apprise` ou d'une référence relative à celui-ci.
:::

### Chargement de plugins personnalisés

Des plugins de notification personnalisés peuvent être introduits de deux façons :

1. par des classes Python découvertes via les chemins de recherche de plugins ;
1. par des notifications personnalisées basées sur décorateur, créées avec `@notify`.

Les notifications basées sur décorateur sont encapsulées et enregistrées via les mêmes API de gestionnaire que les plugins basés sur des classes.

## Référence API

### add()

Enregistre un plugin de notification ou un wrapper de décorateur pour un ou plusieurs schémas.

Définition :

```python
add(plugin, *, schemas=None, force=False)
```

Comportement :

- échoue si un schéma existe déjà ;
- prend en charge l'enregistrement de plusieurs schémas à la fois ;
- ne modifie pas les mappages existants sauf si c'est explicitement forcé.

Exemple :

```python
N_MGR.add(MyNotifyClass, schemas="schema")
```

:::tip
Utilisez `force=True` lorsque vous remplacez volontairement un service existant.
:::

### remove()

Supprime un ou plusieurs mappages de schéma du registre.

Définition :

```python
remove(*schemas, unload=True)
```

Comportement :

- supprime par défaut le mappage de schéma et peut décharger les modules inutilisés ;
- prend en charge plusieurs suppressions en un seul appel.

Exemple :

```python
N_MGR.remove("schema1", "schema2")
```

### disable()

Désactive un ou plusieurs services de notification sans supprimer leurs mappages de schéma.

Définition :

```python
disable(*schemas)
```

Comportement :

- empêche l'utilisation tout en conservant l'état d'enregistrement ;
- prend en charge la désactivation de plusieurs schémas à la fois.

Exemple :

```python
N_MGR.disable("schema1", "schema2")
```

### enable()

Réactive des services de notification précédemment désactivés.

Définition :

```python
enable(*schemas)
```

Comportement :

- restaure la disponibilité des schémas désactivés ;
- n'a aucun effet si un schéma n'avait pas été désactivé.

### enable_only()

N'active que les schémas spécifiés et désactive tout le reste.

Définition :

```python
enable_only(*schemas)
```

Comportement :

- chaque service enregistré qui n'est pas dans la liste est désactivé ;
- les services présents dans la liste sont (ré)activés ;
- si `evict_on_disable` est défini, les bibliothèques dont le dernier service dépendant vient d'être désactivé sont évincées de la mémoire (voir [Éviction de bibliothèques](#éviction-de-bibliothèques)).

Exemple :

```python
# Seuls Telegram et NTFY restent actifs ; tous les autres sont désactivés
N_MGR.enable_only("tgram", "ntfy")
```

### load_modules()

Force la découverte immédiate des plugins de notification intégrés.

Définition :

```python
load_modules()
```

:::note
C'est rarement nécessaire car le gestionnaire charge les plugins de manière paresseuse.
:::

## Éviction de bibliothèques

Lorsqu'un service de notification est désactivé, une bibliothèque tierce optionnelle dont il dépend peut ne plus être nécessaire. Si tous les services qui utilisent une bibliothèque donnée sont désactivés, le gestionnaire peut évincer cette bibliothèque du cache de modules Python (`sys.modules`), libérant ainsi la mémoire qu'elle occupe.

### Activation

L'éviction est **désactivée par défaut** afin de préserver la compatibilité descendante pour le code tiers qui importe Apprise tout en utilisant lui-même ces bibliothèques. Pour l'activer :

```python
from apprise.plugins import N_MGR

N_MGR.evict_on_disable = True
```

Une fois défini, l'éviction se produit automatiquement dès que `disable()` ou `enable_only()` fait tomber le compteur de références d'une bibliothèque à zéro.

### Déclarer les dépendances — `runtime_deps()`

Chaque classe de service de notification peut annoncer ses dépendances optionnelles à l'exécution en surchargeant la méthode statique `runtime_deps()` sur `NotifyBase` :

```python
from apprise.plugins import NotifyBase

class NotifyMyService(NotifyBase):
    protocol = "myservice"

    @staticmethod
    def runtime_deps():
        return ("mylibrary",)

    # ...
```

La valeur renvoyée est un tuple de **noms de paquets importables de premier niveau** (la même chaîne que vous passeriez à `import`). Le gestionnaire les utilise au chargement pour construire un compteur de références sur l'ensemble des services activés. Lorsque le compteur d'une bibliothèque tombe à zéro, cette bibliothèque et tous ses sous-modules sont retirés de `sys.modules`.

:::note
Les extensions natives en C (par exemple le backend OpenSSL de `cryptography`) libèrent leurs objets wrappers Python lorsqu'elles sont évincées, mais la bibliothèque partagée sous-jacente (`.so`) reste mappée par le système d'exploitation pendant toute la durée de vie du processus. C'est une contrainte Python / OS, pas une limite d'Apprise.
:::

### Fonctionnement du compteur de références

1. Après le chargement de tous les plugins intégrés, le gestionnaire compte combien de services **activés** déclarent chaque bibliothèque dans `runtime_deps()`.
1. Lorsqu'un service est désactivé, ses bibliothèques sont décrémentées.
1. Lorsqu'un compteur atteint zéro **et** que `evict_on_disable` vaut `True`, le gestionnaire supprime chaque entrée correspondante de `sys.modules` (par ex. `slixmpp`, `slixmpp.stanza`, `slixmpp.xmlstream`, ...).
1. Lorsqu'un service est réactivé, ses bibliothèques sont incrémentées à nouveau. Le réimport se fera automatiquement lors de la prochaine exécution du chemin de code de ce service.

Les tentatives d'éviction portent toujours sur l'intégralité du tuple `runtime_deps()`, dans l'ordre. Une entrée absente (par exemple une bibliothèque jamais importée) est ignorée avec un log de niveau trace et n'interrompt pas l'éviction des autres bibliothèques.

### Bibliothèques évictables connues

Les services intégrés suivants déclarent `runtime_deps()` et bénéficient d'une éviction :

| Bibliothèque   | Services                              | Mémoire libérée |
| :------------- | :------------------------------------ | :-------------: |
| `slixmpp`      | `xmpp://`                             |     ~20 MB      |
| `paho`         | `mqtt://`                             |      ~4 MB      |
| `gntp`         | `growl://`                            |      ~2 MB      |
| `smpplib`      | `smpp://`, `smpps://`                 |      ~2 MB      |
| `cryptography` | `simplepush://`, `fcm://`, `vapid://` |    partiel†     |

†`cryptography` utilise un backend natif OpenSSL. Les objets wrappers Python sont libérés ; la bibliothèque partagée reste mappée par l'OS.

## Notes comportementales

### Désassocier vs décharger

Supprimer un schéma peut signifier :

1. **Désassocier uniquement**  
   Le mappage du schéma est supprimé, mais les modules Python importés restent chargés.

1. **Désassocier et décharger**  
   Le mappage du schéma est supprimé et les modules inutilisés peuvent être retirés de la mémoire.

:::warning
Décharger des modules peut affecter du code tiers qui importe ou sous-classe des classes de notification.
Utilisez le comportement de désassociation seule lorsque la stabilité de l'identité de classe est importante.
:::

### Surcharges forcées

Utiliser `force=True` lors d'un appel à `add()` :

- supprime tout mappage existant pour le schéma ;
- ne décharge pas les modules déjà importés ;
- enregistre la nouvelle implémentation de manière atomique.

C'est la méthode recommandée pour remplacer un service intégré.

### Ordre d'import et décorateurs

Les notifications basées sur décorateur peuvent enregistrer des schémas au moment de l'import.
Si l'ordre de chargement est incertain, `force=True` garantit un comportement prévisible quel que soit le moment où les modules sont chargés.

## Exemples

### Remplacer un service intégré

```python
N_MGR.add(MyCustomNotify, schemas="discord", force=True)
```

### Désactiver vs supprimer

```python
# Désactiver le schéma - peut être réactivé avec N_MGR.enable("schema")
N_MGR.disable("schema")

# Supprimer complètement
N_MGR.remove("schema")
```

### Opérations multi-schémas

```python
N_MGR.disable("schema1", "schema2")
N_MGR.remove("schema3", "schema4", unload=False)
```

## Dépannage

### Schéma déjà défini

Si un schéma existe déjà, l'enregistrement échouera sauf en cas de surcharge explicite. Envisagez :

1. de choisir un schéma unique ;
1. d'utiliser `add(..., force=True)` pour les surcharges intentionnelles.

### Problèmes d'ordre d'import

Si des schémas sont enregistrés pendant l'import des modules, des conflits peuvent apparaître avant toute intervention manuelle.
Utiliser `force=True` évite ces problèmes de timing.
