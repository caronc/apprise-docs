---
title: "Syntaxe URL Universelle"
description: "Comprendre la Structure des URL Apprise"
sidebar:
  order: 5
---

## Le Modèle

Apprise utilise un schéma d'URL standardisé pour identifier où les notifications doivent être envoyées. Quel que soit le service utilisé, le format reste cohérent :

```text
service://credentials/direction/?parameter=value
```

## Décomposition

### 1. Le Schéma (`service://`)

Le `schema` détermine quel plugin Apprise doit charger.

- **`mailto://`** → Email
- **`tgram://`** → Telegram
- **`slack://`** → Slack

[Voir la liste complète des services pris en charge](../services/).

### 2. Identifiants et Hôte

La plupart des services nécessitent une authentification. Apprise associe ces parties standards de l'URL aux exigences de l'API du service.

- **Utilisateur/Mot de passe :** `service://user:password@...`
- **Jetons API :** `service://token@...`
- **Noms d'hôte :** `service://hostname`

### 3. La Cible (`/direction`)

La `direction` (ou le chemin) indique à Apprise **où** envoyer le message une fois l'authentification effectuée. Cette partie varie selon le service mais représente toujours la destination finale.

- **Canaux :** `slack://.../#general`
- **Numéros de téléphone :** `twilio://.../15555555555`
- **Identifiants de discussion :** `tgram://.../123456789`

### 4. Les Paramètres (`?key=value`)

Les paramètres vous permettent d'ajuster le comportement d'une notification spécifique. Ils sont ajoutés à la fin de l'URL en commençant par `?`.

Les paramètres sont propres à chaque service. Par exemple, vous pouvez activer la synthèse vocale dans Discord (`?tts=yes`) ou ajouter un destinataire en copie dans un email (`?cc=user@example.ca`).

**Exemple :**
Envoyer un email à deux personnes au format HTML :

```text
mailto://user:pass@gmail.com/?to=jane@example.com&format=html
```

## Utilisation Contextuelle

Vous utiliserez ces URL partout dans Apprise :

1. **Arguments CLI :** `apprise "service://..."`
2. **Fichiers de configuration :** listés dans vos fichiers YAML ou TEXT.
3. **Appels API :** transmis dans la charge utile JSON.
