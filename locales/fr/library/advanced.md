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

## Prise en charge des proxys

Apprise envoie chaque notification via [requests](https://requests.readthedocs.io/), qui respecte automatiquement les variables d'environnement standard `HTTP_PROXY`, `HTTPS_PROXY` et `NO_PROXY`. Aucune configuration spécifique à Apprise n'est nécessaire : définissez la variable avant de démarrer votre processus (ou exportez-la dans l'environnement dans lequel Apprise s'exécute) et chaque requête sortante passera par le proxy :

```bash
export HTTPS_PROXY="http://127.0.0.1:3128"
export HTTP_PROXY="http://127.0.0.1:3128"

python3 my_script.py
```

Si vous souhaitez que seul Apprise passe par le proxy (et non le reste de votre application), limitez la variable au sous-processus ou à l'environnement qui exécute Apprise plutôt que de l'exporter globalement — par exemple en la définissant pour une seule commande, ou dans la directive `Environment=` d'une unité systemd pour un service de longue durée.

`NO_PROXY` est également respectée, ce qui permet d'exempter certains hôtes :

```bash
export HTTPS_PROXY="http://127.0.0.1:3128"
export NO_PROXY="localhost,127.0.0.1,internal.example.com"
```

:::note
Les proxys SOCKS (`socks5h://...`) nécessitent le paquet optionnel [PySocks](https://pypi.org/project/PySocks/) (`pip install pysocks`) — `requests` en a besoin pour comprendre les URL de proxy SOCKS. Sans lui, une valeur `socks5h://` dans `HTTP_PROXY`/`HTTPS_PROXY` échouera.
:::
