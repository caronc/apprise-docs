---
title: "Bibliothèque Principale"
description: "Contribuer à la bibliothèque principale d'Apprise"
sidebar:
  order: 2
---

## Contribuer à la Bibliothèque Principale d'Apprise

Merci pour votre intérêt à contribuer à Apprise.

Les contributions sont bienvenues pour le code, les corrections de bugs, les améliorations de la CLI, la documentation et l'outillage de déploiement.

Ce dépôt correspond à l'application cœur et à la couche CLI qui constituent le cœur d'Apprise.

## Exigences de Développement

### Versions Python Prises en Charge

Apprise prend en charge **Python 3.9 et plus récent**. Toutes les contributions doivent rester compatibles avec la version minimale prise en charge, sauf discussion explicite.

### Attentes côté Outillage

Le développement d'Apprise s'appuie sur une petite chaîne d'outils :

- **tox** pour l'orchestration des environnements. Il s'appuie sur :
  - **pytest** pour les tests ;
  - **ruff** pour le linting et le formatage ;
  - **coverage** pour les rapports ;
- **pyproject.toml** comme définition de projet faisant autorité.

Les environnements de développement locaux doivent refléter le comportement de la CI.

## Récupérer depuis GitHub

```bash
git clone git@github.com:caronc/apprise.git
cd apprise
```

## Installer Tox

La manière la plus courante d'installer cette dépendance est :

```bash
pip install tox
```

Si vous n'utilisez pas d'environnement virtuel ou n'avez pas les droits nécessaires sur la machine, vous devrez peut-être utiliser `pip3` ou ajouter le flag `--user` :

```bash
pip3 install tox --user
```

## Environnement de Développement

Apprise fonctionne très bien avec un simple environnement bare metal. Les commandes suivantes peuvent vous aider :

Exécuter la CLI `apprise` depuis le code local avec vos modifications :

```bash
# Afficher la version et quitter
tox -e apprise -- -v
```

Utilisez simplement `tox -e apprise --` pour obtenir un comportement équivalent à la CLI `apprise` dans un environnement installé :

```bash
# Tester un plugin nouveau ou modifié (exemple : foobar://)
tox -e apprise -- -t "mon titre" -b "mon corps" \
    "foobar://credentials/direction?options="
```

### Exécuter les Tests

Testez votre couverture ajoutée dans `tests/` de manière similaire :

```bash
# 'minimal' installe moins de dépendances, ce qui suffit généralement :
tox -e minimal
```

Une QA complète peut être lancée en remplaçant `minimal` par `qa`.

```bash
# 'qa' charge toutes les bibliothèques de développement
tox -e qa
```

Il y a _beaucoup_ de tests ; Apprise vise à maintenir une couverture de 100 %. Pour éviter d'exécuter tout l'ensemble et vous concentrer seulement sur vos nouveaux tests, vous pouvez restreindre l'exécuteur ainsi :

```bash
# utiliser -k pour filtrer les tests à lancer :
tox -e minimal -- -k "test_foobar"
```

:::note
`-k test_foobar` effectue un filtrage par sous-chaîne et correspondrait à :

```text "test_foobar"
- tests/test_plugin_foobar.py
    ├── def test_foobar_urls():
    └── def test_foobar_advance():
```

Vous pouvez utiliser `-k test_foobar_urls` pour ne lancer qu'un seul test précis :

```text "test_foobar_urls"
- tests/test_plugin_foobar.py
    ├── def test_foobar_urls():
    └── def test_foobar_advance():
```

:::

## Assurance Qualité et Tests

Gardez un linting et un formatage cohérents d'un environnement contributeur à l'autre :

```bash
# Lint (appelle ruff en interne)
tox -e lint
```

Si la commande ci-dessus échoue, vous pouvez utiliser le formatage automatique qui corrige la plupart des erreurs.

```bash
# Formatage automatique
tox -e format
```

## Attentes concernant les Tests

Les changements touchant au comportement du cœur **doivent** inclure des tests, sauf justification solide.

Attentes générales :

- maintenir la couverture de test d'Apprise à 100 % ;
- faire en sorte que les tests reflètent le comportement réel à l'exécution ;
- couvrir explicitement les cas limites ;
- suivre les patterns de test existants ;
- éviter le bruit de logs dans les tests.

Les tests font partie du contrat public du projet.

## Recommandations pour les Pull Requests

Avant de soumettre une pull request :

- les tests passent localement dans les environnements pertinents ;
- les vérifications de linting et de formatage passent ;
- les changements sont bien cadrés et correctement décrits ;
- les changements de comportement incluent leur justification.

Si vous avez ajouté un nouveau plugin, assurez-vous que :

- le `README.md` à la racine du dépôt Apprise est mis à jour si nécessaire ;
- `packaging/redhat/apprise.spec` est mis à jour pour refléter le nouveau service ;
- la section `keywords` de `pyproject.toml` inclut le nom du nouveau plugin ;
- la documentation a été préparée pour le dépôt [Apprise Docs](https://github.com/caronc/apprise-docs) (puis reflétée sur <https://appriseit.com>).

Les pull requests sont évaluées sur la correction, la maintenabilité et l'impact à long terme.

## Checklist Rapide Avant Soumission

- Votre changement inclut des tests lorsque c'est pertinent.
- `tox -e qa` passe localement.
- `tox -e lint` passe localement.
- Vous exécutez `tox -e format` lorsque des changements de formatage sont nécessaires.
- La description de votre pull request explique clairement ce qui a changé et pourquoi.

## Licence et Attribution

Apprise est publié sous licence BSD 2-Clause.

Toutes les contributions doivent être compatibles avec cette licence, et les nouveaux fichiers doivent inclure les en-têtes appropriés lorsque cela est requis.
