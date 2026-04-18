---
title: "Syntaxe URL universelle"
description: "Comprendre la structure des URL Apprise"
sidebar:
  order: 5
---

## Structure générale

Apprise utilise un schéma d'URL standardisé pour identifier l'endroit où envoyer les notifications. Quel que soit le service utilisé, le format reste cohérent :

```text
service://credentials/direction/?parameter=value
```

## Décomposition

### 1. Le schéma (`service://`)

Le `schema` détermine quel plugin Apprise doit charger.

- **`mailto://`** → E-mail
- **`tgram://`** → Telegram
- **`slack://`** → Slack

[Voir la liste complète des services pris en charge](/services/).

### 2. Identifiants et hôte

La plupart des services exigent une authentification. Apprise mappe ces parties standard de l'URL vers les exigences de l'API du service.

- **Utilisateur/Mot de passe :** `service://user:password@...`
- **Jetons API :** `service://token@...`
- **Noms d'hôte :** `service://hostname`

### 3. La cible (`/direction`)

Le `direction` (ou chemin) indique à Apprise **où** envoyer le message une fois l'authentification effectuée. Cela varie selon le service, mais représente toujours la destination finale.

- **Canaux :** `slack://.../#general`
- **Numéros de téléphone :** `twilio://.../15555555555`
- **Identifiants de chat :** `tgram://.../123456789`

### 4. Paramètres (`?key=value`)

Les paramètres vous permettent d'ajuster le comportement d'une notification donnée. Ils sont ajoutés à la fin de l'URL à partir du caractère `?`.

Les paramètres sont propres à chaque service. Par exemple, vous pouvez activer la synthèse vocale dans Discord (`?tts=yes`) ou ajouter un destinataire en copie à un e-mail (`?cc=user@example.ca`).

**Exemple :**
Envoyer un e-mail à deux personnes, au format HTML :

```text
mailto://user:pass@gmail.com/?to=jane@example.com&format=html
```

## Utilisation contextuelle

Vous utiliserez ces URL partout dans Apprise :

1. **Arguments CLI :** `apprise "service://..."`
2. **Fichiers de configuration :** listés dans vos fichiers YAML ou TEXT
3. **Appels API :** envoyés dans la charge utile JSON
