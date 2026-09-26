---
title: "API Apprise"
description: "Contribuer au dépôt de l'API Apprise"
sidebar:
  order: 3
---

## Contribuer à l'API Apprise

Merci pour votre intérêt à contribuer à l'API Apprise.

Ce dépôt correspond à l'application web et à la couche API qui encapsulent la bibliothèque principale d'Apprise. Les contributions sont bienvenues pour le code, les corrections de bugs, les améliorations d'interface, la documentation et l'outillage de déploiement.

## Récupérer depuis GitHub

```bash
git clone git@github.com:caronc/apprise-api.git
cd apprise-api
```

## Environnement de Développement

L'API Apprise prend en charge à la fois un workflow local (bare metal) et un workflow Docker Compose.

### Installation Directe

Démarrez le serveur de développement en mode debug :

```bash
tox -e runserver
# visiter : http://localhost:8000/
```

Vous pouvez aussi vous binder sur une autre adresse ou un autre port :

```bash
tox -e runserver -- "localhost:8080"
tox -e runserver -- "0.0.0.0:8080"
```

Pour lancer l'API Apprise avec une branche specifique du coeur Apprise :

```bash
tox -e runserver -- --branch=1341-retries-and-priorities
```

Lorsque `--branch` est fourni, l'environnement runserver reinstalle Apprise
depuis cette branche GitHub avec le cache pip desactive, afin que relancer la
commande recupere les changements de la branche. Lancer `tox -e runserver` sans
`--branch` restaure le paquet Apprise de PyPI si l'environnement utilisait
auparavant une branche.

### Docker Compose pour le Développement

Un checkout fraîchement cloné peut être lancé avec Docker Compose, et le flux de développement monte votre arborescence source locale dans le conteneur afin que les changements soient visibles sans rebuild :

```bash
# Précréer les chemins que vous allez monter
mkdir -p attach config plugin

# Lancer la stack
PUID=$(id -u) PGID=$(id -g) docker compose up
```

## Assurance Qualité et Tests

Ce dépôt utilise `tox` afin de garder le linting, les tests et le formatage cohérents d'un environnement contributeur à l'autre :

```bash
# Lancer les tests unitaires
tox -e test

# Lint (appelle ruff en interne)
tox -e lint

# Formatage automatique
tox -e format
```

Vous pouvez également combiner les environnements :

```bash
tox -e test,lint
```

Si vous préférez exécuter les outils directement (une fois les dépendances de développement installées), le dépôt documente `pytest` et `ruff` comme équivalents manuels optionnels.

## Traductions de l'interface

Les langues prises en charge par l'interface sont définies dans
`apprise_api/core/settings/__init__.py`. La mise à jour et la compilation des
catalogues nécessitent les outils GNU gettext (`xgettext`, `msgmerge` et
`msgfmt`) dans votre PATH ; les dépendances de développement Python ne
suffisent pas. Lorsque vous ajoutez un texte Python
destiné aux utilisateurs, enveloppez-le avec les fonctions `gettext` de Django.
Dans les templates, utilisez `{% trans %}` pour une chaîne courte ou
`{% blocktrans %}` pour un passage plus long. Ne traduisez pas les clés JSON,
les valeurs d'énumération, les codes d'état ni les autres valeurs que les
logiciels clients doivent interpréter de manière stable. Une valeur analysée
par l'API, comme `success` ou `text`, reste en anglais même si les mots qui
l'entourent sont traduits.

Après avoir modifié un texte source, mettez à jour tous les catalogues :

```bash
tox -e translations -- --update
```

La commande affiche chaque langue prise en charge et une puce pour chaque
traduction manquante ou approximative (« fuzzy »). Modifiez le fichier
correspondant sous
`apprise_api/locale/<langue>/LC_MESSAGES/django.po`, puis relancez le rapport en
lecture seule jusqu'à ce qu'il soit propre :

```bash
tox -e translations
```

Les entrées approximatives ne sont pas acceptées. Lorsque le rapport est
propre, compilez les catalogues livrés dans les paquets et les images de
conteneur :

```bash
tox -e translations -- --compile
```

Lorsque vous modifiez la mise en page commune, testez une langue écrite de
gauche à droite et l'arabe sur ordinateur ainsi que sur un téléphone étroit.
La direction du texte peut changer, mais la marque et les contrôles associés
dans l'en-tête doivent rester réunis.

## Checklist Rapide Avant Soumission

- Votre changement inclut des tests lorsque c'est pertinent.
- `tox -e test` passe localement.
- `tox -e lint` passe localement.
- Vous avez exécuté `tox -e format` lorsque des changements de formatage étaient nécessaires.
- Le rapport de traduction est propre lorsque des textes destinés aux utilisateurs ont changé.
- La description de votre pull request explique clairement ce qui a changé et pourquoi.

## Notes sur les Fichiers Docker Compose

- Pour le développement, `docker compose up` appliquera automatiquement le fichier d'override dans un checkout frais, et ce mode est conçu pour une itération en direct.
- Pour des déploiements de type production, préférez uniquement le fichier Compose de base afin d'exécuter l'image immuable et les assets statiques inclus.

## Licence et Attribution

L'API Apprise est publiée sous licence MIT.

Toutes les contributions doivent être compatibles avec cette licence, et les nouveaux fichiers doivent inclure les en-têtes appropriés lorsque cela est requis.
