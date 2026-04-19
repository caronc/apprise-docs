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
    "status": {
      "persistent_storage": true,
      "can_write_config": true,
      "can_write_attach": true,
      "details": ["OK"]
    }
  }
  ```

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
- `format` : facultatif. Format du texte : `text` (par défaut), `markdown`, `html`.

## Points de terminaison Persistants avec État

Gérez et utilisez des configurations enregistrées associées à une clé `{KEY}`.

| Chemin             | Méthode | Description                                                                                                                           |
| :----------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `/add/{KEY}`       | `POST`  | Enregistre la configuration Apprise dans le stockage persistant. Charge utile : `urls`, `config`, `format`.                           |
| `/del/{KEY}`       | `POST`  | Supprime la configuration Apprise du stockage persistant.                                                                             |
| `/get/{KEY}`       | `POST`  | Renvoie la configuration Apprise. Alias : `/cfg/{KEY}`, utilisé par l'interface Web.                                                  |
| `/notify/{KEY}`    | `POST`  | Envoie des notifications aux destinations associées à `{KEY}`. Charge utile : `body` (obligatoire), `title`, `type`, `tag`, `format`. |
| `/json/urls/{KEY}` | `GET`   | Renvoie un objet JSON contenant toutes les URL et tous les tags associés à cette clé.                                                 |

## Observabilité

| Chemin     | Méthode | Description                                                                                                   |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| `/details` | `GET`   | Récupère un objet JSON contenant toutes les URL Apprise prises en charge. Envoyez `Accept: application/json`. |
| `/metrics` | `GET`   | Point de terminaison Prometheus pour la collecte de métriques de base.                                        |

## Codes de Réponse

Pour la liste complète, y compris les codes propres à l'interface Web et les réponses d'erreur courantes, consultez [Codes de Réponse](/api/reference/response-codes/).
