---
title: Points de Terminaison de l'API
description: Référence condensée des points de terminaison de l'API Apprise.
sidebar:
  order: 4
---

Cette section détaille les points de terminaison disponibles dans l'API Apprise.

## Vérifications d'État

Vous pouvez effectuer des contrôles d'état ou de santé de la configuration de votre serveur.

| Chemin    | Méthode | Description                                                                                                                 |
| :-------- | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `/status` | `GET`   | Renvoie l'état du serveur. Le code de réponse HTTP vaut `200` si tout fonctionne correctement, ou `417` en cas de problème. |

**Exemples de réponse :**

- **Texte** : `OK` (si le service est sain) ou `ATTACH_PERMISSION_ISSUE`, `CONFIG_PERMISSION_ISSUE`.
- **JSON** :

  ```json
  {
    "attach_lock": false,
    "config_lock": false,
    "stateful_enabled": true,
    "stateless_enabled": true,
    "degraded": false,
    "max_attachments": 6,
    "attach_size": 209715200,
    "status": {
      "persistent_storage": true,
      "can_write_config": true,
      "can_write_attach": true,
      "details": ["OK"]
    }
  }
  ```

  `degraded` vaut `true` uniquement lorsque `stateful_enabled` et `stateless_enabled` valent tous deux `false`. Le serveur ne peut accepter de notifications tant qu'un administrateur n'a pas activé au moins un mode.

## Notifications sans État

Envoyez des notifications sans utiliser de stockage persistant.

| Chemin     | Méthode | Description                                                                                                     |
| :--------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| `/notify/` | `POST`  | Envoie une ou plusieurs notifications aux URL identifiées dans la charge utile ou via `APPRISE_STATELESS_URLS`. |

**Paramètres de charge utile :**

- `urls` : obligatoire. Une ou plusieurs URL de destination.
- `body` : obligatoire. Corps du message.
- `title` : facultatif. Titre du message.
- `type` : facultatif. Type de message : `info` (par défaut), `success`, `warning`, `failure`.
- `format` : facultatif. Format d'entrée : `text`, `markdown` ou `html`. S'il est complètement omis, la conversion automatique est ignorée, sauf si le serveur définit `APPRISE_DEFAULT_FORMAT`. Une valeur vide ou `null` force aussi le mode pass-through, même avec cette valeur par défaut. Les limites, la gestion du dépassement et l'emballage sûr pour le service s'appliquent toujours.
- `attach` : facultatif. Une ou plusieurs pièces jointes. Voir [Pièces jointes](#pièces-jointes) ci-dessous.

Les deux points de terminaison de notification peuvent diffuser leur progression. Utilisez `?stream=yes` ou `Accept: text/event-stream`; consultez [Diffusion en direct de la progression](/api/usage/#diffusion-en-direct-de-la-progression).

Lorsque l'authentification est activée, un administrateur peut appeler `/notify` directement. Un utilisateur de configuration doit fournir des `urls` explicites, Basic Auth et l'en-tête `X-Apprise-Config-ID` correspondant ; l'accès doit être `user`. Sans `urls`, la forme v2 avec en-tête conserve l'envoi stateful avec la configuration enregistrée.

Avec `Content-Type: application/json`, la charge utile doit être un objet JSON.
Les autres racines JSON valides, comme les tableaux, chaînes, nombres, booléens
et `null`, sont rejetées avec le code HTTP `400`.

## Pièces Jointes

Les points de terminaison `/notify/` et `/notify/{KEY}` acceptent un champ `attach` facultatif. Les formes suivantes peuvent être combinées au sein d'une même requête.

### Envoi de Fichier Binaire

Lors de la soumission de la requête en `multipart/form-data`, incluez directement le fichier dans le champ `attach`. Le nom de fichier fourni par le client est utilisé tel quel.

### URL HTTP/HTTPS

Passez une URL `http://` ou `https://` sous forme de chaîne. Apprise télécharge le fichier au moment de la requête et détermine automatiquement le nom de la pièce jointe.

La résolution du nom de fichier suit cet ordre de priorité :

1. Paramètre de requête `?name=` — ajoutez-le à l'URL pour imposer un nom précis.
2. Nom de fichier extrait du chemin de l'URL — dernier segment du chemin (ex. `photo.jpg` depuis `/images/photo.jpg`).
3. Repli — `attachment.001`, `attachment.002`, … lorsqu'aucun nom ne peut être déterminé.

```text
# Nom résolu depuis le chemin de l'URL : photo.jpg
https://example.com/images/photo.jpg

# Nom résolu depuis le chemin de l'URL : abc123
https://example.com/thumbnails/abc123

# Nom imposé via ?name= : thumbnail.jpg
https://example.com/thumbnails/abc123?name=thumbnail.jpg
```

Un paramètre `?name=` vide ou composé uniquement d'espaces est traité comme absent : Apprise revient alors au chemin de l'URL.

### Objet JSON

Passez un objet avec une clé `url` et une clé `filename` facultative :

```json
{ "url": "https://example.com/thumbnails/abc123", "filename": "thumbnail.jpg" }
```

Lorsque `filename` est présent dans l'objet JSON, il est prioritaire sur tout le reste, y compris le chemin de l'URL et le paramètre `?name=`.

## Points de Terminaison Persistants avec État

Gérez et utilisez des configurations enregistrées associées à une clé `{KEY}`.

Tous les points de terminaison de cette section sont indisponibles avec `APPRISE_STATEFUL_MODE=disabled`.

| Chemin             | Méthode  | Description                                                                                                                       |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `/cfg`             | `GET`    | Liste les ID de configuration enregistrés. Le format JSON dépend de l'activation de l'authentification, comme indiqué ci-dessous. |
| `/add/{KEY}`       | `POST`   | Enregistre une configuration. Charge utile : `urls`, `config`, `format`.                                                          |
| `/del/{KEY}`       | `POST`   | Supprime une configuration et son authentification par clé.                                                                       |
| `/move/{KEY}`      | `POST`   | Déplace une configuration vers un nouvel ID. Charge utile : `to` (obligatoire).                                                   |
| `/get/{KEY}`       | `POST`   | Renvoie une configuration. Alias : `/cfg/{KEY}`.                                                                                  |
| `/notify/{KEY}`    | `POST`   | Envoie avec la configuration enregistrée. `locked` et `public` exigent un tag précis ; `disabled` est réservé à l'administrateur. |
| `/json/urls/{KEY}` | `GET`    | Renvoie les URL et tags enregistrés. Avec `APPRISE_CONFIG_LOCK=yes`, les identifiants de l'administrateur global sont requis.     |
| `/status/{KEY}`    | `GET`    | Renvoie l'état après authentification. `config_lock` inclut l'accès effectif de la clé.                                           |
| `/auth/{KEY}`      | `GET`    | Ouvre l'éditeur Web ou renvoie le mode, l'accès et le nom d'utilisateur en JSON. Le mot de passe n'est jamais renvoyé.            |
| `/auth/{KEY}`      | `POST`   | Définit les identifiants et `access`. L'administrateur modifie l'accès ; l'utilisateur modifie uniquement son mot de passe.       |
| `/auth/{KEY}`      | `DELETE` | Supprime l'authentification sans supprimer la configuration. Les identifiants de l'administrateur global sont requis.             |

Ces points de terminaison avec état acceptent aussi `X-Apprise-Config-ID`. Par exemple, envoyez `POST /get/` avec `X-Apprise-Config-ID: mykey`. Cela garde la clé hors de l'URL. `/cfg` n'accepte pas cet en-tête.

`GET /cfg` conserve la réponse v1 d'origine lorsque l'authentification est désactivée :

```json
["alerts", "monitoring"]
```

Lorsque l'authentification est activée, utilisez le compte administrateur global. Chaque entrée contient alors le nom d'utilisateur associé :

```json
[
  { "key": "alerts", "user": "alice", "access": "locked" },
  { "key": "monitoring", "user": null, "access": "public" }
]
```

Une valeur `user` vide indique un accès par mot de passe uniquement. La valeur `null` signifie qu'aucun nom d'utilisateur de configuration n'est disponible. Les utilisateurs d'une configuration ne peuvent pas obtenir la liste de tous les ID de configuration enregistrés.

`access` accepte `user`, `locked`, `public` ou `disabled`. L'accès public concerne uniquement les notifications avec état et exige un tag précis. L'accès désactivé conserve le compte mais le réserve à l'administrateur. Seul un administrateur peut envoyer le champ `access`. Les utilisateurs peuvent changer leur mot de passe, mais doivent omettre entièrement `access`. Consultez [Authentification et Contrôle d'Accès](../deployment/#authentification-et-contrôle-daccès).

`/move/{KEY}` déplace une configuration vers un ID libre. Un utilisateur peut déplacer uniquement sa clé lorsque le verrouillage est désactivé. Avec `APPRISE_CONFIG_LOCK=yes`, seul un administrateur authentifié peut déplacer ou supprimer des entrées.

Avec `APPRISE_CONFIG_LOCK=yes`, un administrateur authentifié conserve un accès complet aux configurations. Les autres appelants ne peuvent pas ajouter, récupérer, inspecter, lister, déplacer ni supprimer une configuration. Les nouveaux comptes utilisent `locked` par défaut. Un administrateur peut enregistrer `user` ou `public`, mais ces modes se comportent comme `locked` jusqu'au retrait du verrou global. Le choix enregistré n'est pas réécrit.

Si l'URL et l'en-tête contiennent une clé, l'en-tête est prioritaire. Les en-têtes invalides sont rejetés. L'interface Web et Apprise Mobile peuvent continuer à utiliser les clés dans l'URL.

## Observabilité

| Chemin     | Méthode | Description                                                                                                   |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| `/details` | `GET`   | Récupère un objet JSON contenant toutes les URL Apprise prises en charge. Envoyez `Accept: application/json`. |
| `/metrics` | `GET`   | Point de terminaison Prometheus pour la collecte de métriques de base.                                        |

## Codes de Réponse

Pour la liste complète, y compris les codes propres à l'interface Web et les réponses d'erreur courantes, consultez [Codes de Réponse](./reference/response-codes/).
