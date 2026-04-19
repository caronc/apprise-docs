---
title: API Apprise
description: Une passerelle de notifications legere, prete pour la production.
sidebar:
  label: "Introduction"
  order: 1
---

L'**API Apprise** est une passerelle Web vers la bibliotheque Apprise. Elle fournit une interface REST pour envoyer des notifications, ce qui vous permet de centraliser votre configuration et de declencher des alertes depuis des systemes qui ne prennent pas directement en charge Python ou la CLI.

## Pourquoi utiliser l'API ?

- **Microservices :** fournissez un point de terminaison unique pour toutes vos applications.
- **Sans etat et avec etat :** envoyez des notifications a la volee ou referencez des configurations enregistrees par cle.
- **Interface Web :** un tableau de bord integre permet de gerer les configurations et de tester les notifications. L'interface peut etre desactivee avec `APPRISE_API_ONLY=yes`.
- **Extensible :** fonctionne comme un conteneur leger compatible avec Docker, Kubernetes, etc.
- **Configuration centralisee :** utilisez un seul serveur comme source de configuration pour plusieurs applications et environnements.

## Prise en main

L'API Apprise est concue pour etre executee dans un conteneur.

1. **Deployez-la :** configurez le conteneur avec [Docker ou Kubernetes](/api/deployment/).
2. **Configurez-la :** enregistrez vos URL et attribuez-leur une cle (par exemple `my-alerts`).
3. **Notifiez :** declenchez vos alertes avec une simple requete HTTP.

```bash
curl -X POST -d "body=Test Message"   http://localhost:8000/notify/my-alerts
```

:::tip
Si votre serveur est accessible a plusieurs personnes, ou expose a Internet, genere une nouvelle cle obfusquee pour isoler votre environnement. Si vous utilisez l'interface Web, vous pouvez appuyer sur **New Configuration** dans le menu de gauche.
:::
