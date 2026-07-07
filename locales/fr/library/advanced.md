---
title: "Utilisation Avancée"
description: "Asynchrone, sérialisation et contrôle bas niveau."
sidebar:
  order: 5
---

## Notifications asynchrones

Si vous exécutez votre code dans une boucle d'événements `asyncio`, vous pouvez utiliser `async_notify()` pour envoyer des notifications sans bloquer.

```python
import asyncio
import apprise

async def main():
    apobj = apprise.Apprise()
    apobj.add('mailto://user:pass@example.com')

    # Attendre l'envoi de la notification. Comme notify(),
    # async_notify() retourne un AppriseResult : gardez-le si vous
    # voulez savoir si l'envoi a réussi.
    result = await apobj.async_notify(
        title='Test asynchrone',
        body='Ceci a été envoyé de manière asynchrone',
    )

    if not result:
        print("L'envoi a échoué :", result.status.name)

asyncio.run(main())
```

Voir [Résultats de notification](/library/results/) pour tout ce que `result`
peut vous dire : détail par service, durée, journaux capturés, et plus encore.

## Sérialisation (Pickle)

Les objets Apprise peuvent être sérialisés (`pickled`). Cela vous permet de configurer un objet Apprise une seule fois, de l'enregistrer sur disque (ou dans une base de données), puis de le recharger plus tard avec tous ses services déjà configurés.

```python
import apprise
import pickle

# 1. Configuration
apobj = apprise.Apprise()
apobj.add("json://localhost")

# 2. Sérialisation
serialized_data = pickle.dumps(apobj)

# ... plus tard dans votre code ...

# 3. Restauration
restored_obj = pickle.loads(serialized_data)
restored_obj.notify("Je suis de retour !")
```

## Bas niveau : l'objet de notification Apprise

Lorsque vous appelez `Apprise.notify()`, Apprise gère pour vous les tags, la configuration et la journalisation. Si vous devez contourner cela et interagir directement avec un objet de notification précis :

```python
import apprise

# Instancier directement un seul objet de notification
# (en contournant le gestionnaire Apprise())
obj = apprise.Apprise.instantiate('glib://')

# Envoyer un contenu brut
obj.send(
    body="Message brut",
    title="Titre brut"
)
```

:::caution
Utiliser `send()` directement contourne une grande partie des protections et fonctionnalités (comme les tags et le traitement des pièces jointes) fournies par la méthode `notify()`.
:::
