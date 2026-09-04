---
title: API Apprise
description: Une passerelle de notifications légère, prête pour la production.
sidebar:
  label: "Introduction"
  order: 1
---

L'**API Apprise** est une passerelle Web vers la bibliothèque Apprise. Elle fournit une interface REST pour envoyer des notifications, ce qui vous permet de centraliser votre configuration et de déclencher des alertes depuis des systèmes qui ne prennent pas directement en charge Python ou la CLI.

:::tip
Vous souhaitez utiliser votre API Apprise depuis votre téléphone ? [Apprise Mobile](../mobile/) est l'application Android complémentaire officielle. Elle permet de consulter vos serveurs enregistrés, de créer des URL de notification et d'envoyer des notifications.
:::

## Pourquoi Utiliser l'API ?

- **Microservices :** fournissez un point de terminaison unique pour toutes vos applications.
- **Sans état et avec état :** envoyez des notifications à la volée ou référencez des configurations enregistrées par clé.
- **Interface Web :** un tableau de bord intégré permet de gérer les configurations et de tester les notifications. L'interface peut être désactivée avec `APPRISE_API_ONLY=yes`.
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
Si votre serveur est accessible à plusieurs personnes, ou exposé à Internet, générez une nouvelle clé obfusquée pour isoler votre environnement. Si vous utilisez l'interface Web, vous pouvez appuyer sur **New Configuration** dans le menu de gauche.
:::
