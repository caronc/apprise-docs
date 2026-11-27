---
title: "Utilisation Avancée"
description: "Asynchrone, sérialisation et contrôle bas niveau."
sidebar:
  order: 5
---

## Notifications Asynchrones

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

Voir [Résultats de notification](/library/results/) pour tout ce que `result` peut vous dire : détail par service, durée, journaux capturés, et plus encore.

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

## Bas Niveau : l'Objet de Notification Apprise

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

### Les URL et Leurs Champs

Un objet de notification peut rendre son URL sous forme de champs séparés, nommés d'après les jetons et les arguments de [`details()`](/fr/library/inspection/), les mêmes noms que ceux du [générateur d'URL](/fr/url-builder/). `fields_to_url()` rassemble les champs en une URL. Un programme peut ainsi présenter une URL sous forme de formulaire, puis transformer le formulaire en URL.

```python
import apprise
from apprise.fields import fields_to_url

obj = apprise.Apprise.instantiate(
    "mailtos://user:secret@example.com?to=a@example.com&smtp=smtp.example.com"
)

# L'URL sous forme de champs, et les mêmes champs aux secrets masqués
fields = obj.url_fields()
hidden = obj.url_fields(privacy=True)

# fields["targets"] == ["a@example.com"]
# fields["smtp"] == "smtp.example.com"
# hidden["password"] == "****"

# Les champs redonnent la même URL
url = fields_to_url(fields)
assert apprise.Apprise.instantiate(url).url() == obj.url()
```

- Un alias comme `to` est regroupé dans l'entrée qu'il représente, ici `targets`.
- Les options clé/valeur (`+header`, `-param`, `:key`) reviennent sous forme de tables, comme `headers`, `params` et `payload`.
- Les valeurs reviennent dans le type que leur donne `details()` : listes, nombres et `True`/`False`.
- Les champs masqués masquent chaque entrée que `details()` marque comme privée.
- `fields_to_url()` renvoie `None` lorsque le schéma est inconnu, qu'un nom de champ ne fait pas partie de ceux du service ou que le service refuse les valeurs. Un hôte contenant `/`, `?`, `#`, `@` ou `:` (hors adresse IPv6) et un port qui n'est pas un nombre entier de 1 à 65535 sont également refusés : un champ ne peut ainsi jamais modifier une autre partie de l'URL.
- `apprise.fields.parse_fields(url)` lit les champs d'une URL que son service ne chargerait pas encore, comme `mailto://` sans rien après, pour qu'un formulaire affiche ce qui a déjà été saisi.

## Gestion des Erreurs de Configuration

Apprise lève `AppriseImproperlyConfigured` lorsqu'un appel à la bibliothèque reçoit des paramètres manquants, non valides ou incompatibles. Interceptez cette exception lorsque votre application doit signaler un problème de configuration :

```python
from apprise import AppriseAsset
from apprise.exception import AppriseImproperlyConfigured

try:
    asset = AppriseAsset(service_timeout=-1)
except AppriseImproperlyConfigured as error:
    print(f"Paramètres Apprise non valides : {error}")
```

Les gestionnaires existants pour `TypeError`, `ValueError` ou `AttributeError` continuent de fonctionner. Dans le nouveau code, interceptez plutôt `AppriseImproperlyConfigured` afin d'identifier facilement les problèmes de configuration.

Toutes les exceptions propres à Apprise héritent de `AppriseException`. Vous pouvez donc intercepter cette dernière lorsque votre application n'a pas besoin de distinguer la cause. Les erreurs de disque signalées par `AppriseDiskIOError` peuvent également être interceptées avec `OSError`. Les erreurs propres aux plugins qui reposent sur `ApprisePluginException` peuvent être traitées ensemble lorsque leurs détails individuels ne sont pas nécessaires.

`notify()` et `async_notify()` signalent ces problèmes dans leur valeur de retour plutôt qu'en levant une exception.

Un service qui échoue avant de préparer son message reçoit sa propre entrée `FAILURE`, comme un service qui échoue pendant l'envoi. Les autres services sont quand même exécutés, l'escalade continue et les services optionnels le restent. Un appel dont les résultats sont mixtes renvoie `PARTIAL`.

Si Apprise ne peut pas utiliser le message, l'appel entier renvoie `FAILURE` sans entrée de service et n'envoie rien. Une valeur `timeout=` invalide est le seul cas où ces méthodes lèvent encore une exception.

## Prise en Charge des Proxys

Apprise envoie chaque notification via [requests](https://requests.readthedocs.io/), qui respecte automatiquement les variables d'environnement standard `HTTP_PROXY`, `HTTPS_PROXY` et `NO_PROXY`. Aucune configuration spécifique à Apprise n'est nécessaire : définissez la variable avant de démarrer votre processus (ou exportez-la dans l'environnement dans lequel Apprise s'exécute) et chaque requête sortante passera par le proxy :

```bash
export HTTPS_PROXY="http://127.0.0.1:3128"
export HTTP_PROXY="http://127.0.0.1:3128"

python3 my_script.py
```

Si vous souhaitez que seul Apprise passe par le proxy (et non le reste de votre application), limitez la variable au sous-processus ou à l'environnement qui exécute Apprise plutôt que de l'exporter globalement. Définissez-la par exemple pour une seule commande, ou dans la directive `Environment=` d'une unité systemd pour un service de longue durée.

`NO_PROXY` est également respectée, ce qui permet d'exempter certains hôtes :

```bash
export HTTPS_PROXY="http://127.0.0.1:3128"
export NO_PROXY="localhost,127.0.0.1,internal.example.com"
```

:::note
Les proxys SOCKS (`socks5h://...`) nécessitent le paquet optionnel [PySocks](https://pypi.org/project/PySocks/) (`pip install pysocks`). `requests` en a besoin pour comprendre les URL de proxy SOCKS. Sans lui, une valeur `socks5h://` dans `HTTP_PROXY`/`HTTPS_PROXY` échouera.
:::
