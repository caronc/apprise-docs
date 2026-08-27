---
title: API Apprise
description: Une passerelle de notifications légère, prête pour la production.
sidebar:
  label: "Introduction"
  order: 1
---

L'**API Apprise** est une passerelle Web vers la bibliothèque Apprise. Son interface REST centralise la configuration des notifications et permet aux systèmes sans prise en charge directe de Python ou de la CLI de déclencher des alertes.

## Pourquoi Utiliser l'API ?

- **Microservices :** fournissez un point de terminaison unique pour toutes vos applications.
- **Sans état et avec état :** envoyez des notifications à la volée ou utilisez des configurations enregistrées par clé.
- **Interface Web :** un tableau de bord intégré permet de gérer les configurations et de tester les notifications. L'interface peut être désactivée avec `APPRISE_API_ONLY=yes`.
- **Accès par configuration :** attribuez un nom d'utilisateur et un mot de passe à une configuration enregistrée avec `/auth/{KEY}`.
- **Extensible :** fonctionne comme un conteneur léger compatible avec Docker, Kubernetes, etc.
- **Configuration centralisée :** utilisez un seul serveur comme source de configuration pour plusieurs applications et environnements.

## Prise en Main

L'API Apprise est conçue pour être exécutée dans un conteneur.

1. **Déployez-la :** configurez le conteneur avec [Docker ou Kubernetes](./deployment/).
2. **Configurez-la :** enregistrez vos URL et attribuez-leur une clé (par exemple `my-alerts`).
3. **Notifiez :** déclenchez vos alertes avec une simple requête HTTP.

```bash
curl -X POST -d "body=Test Message" \
  http://localhost:8000/notify/my-alerts
```

:::tip
Si votre serveur est public, [activez l'authentification](./deployment/#authentification-et-contrôle-daccès) et protégez les configurations enregistrées avec l'interface Web ou `/auth/{KEY}`. Une clé difficile à deviner reste utile, mais elle ne remplace pas un nom d'utilisateur et un mot de passe.
:::
