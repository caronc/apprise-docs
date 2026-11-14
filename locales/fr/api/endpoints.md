---
title: Points de terminaison de l'API
description: Référence condensée des points de terminaison de l'API Apprise.
sidebar:
  order: 4
---

Cette section détaille les points de terminaison disponibles dans l'API Apprise.

## Vérifications d'état

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

  `config_lock` dépend de l'appelant authentifié et vaut `false` pour un
  administrateur qui peut contourner le verrou. `stateful_enabled` et
  `stateless_enabled` décrivent les modes globaux du serveur ; ils n'accordent
  pas à l'appelant actuel l'autorisation d'utiliser ces modes.

## Notifications sans état

Envoyez des notifications sans utiliser de stockage persistant.

| Chemin     | Méthode | Description                                                                                                     |
| :--------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| `/notify/` | `POST`  | Envoie une ou plusieurs notifications aux URL identifiées dans la charge utile ou via `APPRISE_STATELESS_URLS`. |

**Paramètres de charge utile :**

- `urls` : facultatif. Une ou plusieurs URL de destination. S'il est omis, une requête avec un en-tête `X-Apprise-Config-ID` envoie plutôt via cette configuration enregistrée (seulement ses URL sans tag, sauf si un tag est fourni). Sinon, `APPRISE_STATELESS_URLS` est utilisé.
- `body` : corps du message. Obligatoire, sauf si une pièce jointe est envoyée.
- `title` : facultatif. Titre du message.
- `type` : facultatif. Type de message : `info` (par défaut), `success`, `warning`, `failure`.
- `format` : facultatif. Format d'entrée : `text`, `markdown` ou `html`. S'il est complètement omis, la conversion automatique est ignorée, sauf si le serveur définit `APPRISE_DEFAULT_FORMAT`. Une valeur vide ou `null` force aussi le mode pass-through, même avec cette valeur par défaut. Les limites, la gestion du dépassement et l'emballage sûr pour le service s'appliquent toujours.
- `attach` : facultatif. Une ou plusieurs pièces jointes. Voir [Pièces jointes](#pièces-jointes) ci-dessous.

Les deux points de terminaison de notification peuvent diffuser leur progression. Utilisez `?stream=yes` ou `Accept: text/event-stream`; consultez [Diffusion en direct de la progression](/api/usage/#diffusion-en-direct-de-la-progression).

Lorsque l'authentification est activée, un administrateur peut appeler `/notify` directement. Un utilisateur de configuration doit fournir des `urls` explicites, Basic Auth et l'en-tête `X-Apprise-Config-ID` correspondant ; l'accès doit être `user`. Sans `urls`, la forme v2 avec en-tête conserve l'envoi stateful avec la configuration enregistrée.

Avec `Content-Type: application/json`, la charge utile doit être un objet JSON.
Les autres racines JSON valides, comme les tableaux, chaînes, nombres, booléens
et `null`, sont rejetées avec le code HTTP `400`.

### Formats de requête

`/notify/` et `/notify/{KEY}` lisent le corps de la requête selon son `Content-Type` :

| Content-Type                        | Lecture du corps                                                       |
| :---------------------------------- | :--------------------------------------------------------------------- |
| `application/json`                  | Un objet JSON contenant les paramètres de charge utile ci-dessus       |
| `application/x-www-form-urlencoded` | Des champs de formulaire portant les mêmes noms                        |
| `multipart/form-data`               | Des champs de formulaire, plus des fichiers téléversés dans `attach`   |
| `text/plain`                        | Le corps complet est le message, envoyé comme texte                    |
| `text/html`                         | Le corps complet est le message, envoyé en HTML                        |
| `text/markdown`                     | Le corps complet est le message, envoyé en Markdown                    |
| Tout autre type, ou aucun           | Lu comme des champs de formulaire, comme dans les versions précédentes |

Un corps en texte brut est décodé avec le `charset` de son `Content-Type` (UTF-8 par défaut). `?format=` remplace le format défini par son `Content-Type`. Le mapping de la charge utile (`?:champ=`) ne s'applique pas à un corps en texte brut.

### En-têtes de notification

Ces en-têtes fonctionnent avec tous les formats de requête pris en charge sur les deux points de terminaison de notification :

| En-tête              | Définit                                                               | Exemple                |
| :------------------- | :-------------------------------------------------------------------- | :--------------------- |
| `X-Apprise-Title`    | Le titre                                                              | `État du déploiement`  |
| `X-Apprise-Type`     | Le type                                                               | `success`              |
| `X-Apprise-Tag`      | L'expression de tags                                                  | `devops, admin`        |
| `X-Apprise-Template` | Les valeurs de substitution, en paires `nom=valeur` encodées pour URL | `api_key=abc&room=ops` |

Un en-tête n'est utilisé que si la charge utile omet ce champ, et il l'emporte sur la chaîne de requête. Consultez [Priorité des champs](/api/usage/#priorité-des-champs) pour l'ordre complet, et [Exemples](/api/usage/#exemples) pour chaque méthode d'envoi.

## Pièces jointes

Les points de terminaison `/notify/` et `/notify/{KEY}` acceptent un champ `attach` facultatif. Les formes suivantes peuvent être combinées au sein d'une même requête.

### Envoi de fichier binaire

Lors de la soumission de la requête en `multipart/form-data`, incluez directement le fichier dans le champ `attach`. Le nom de fichier fourni par le client est utilisé tel quel.

### URL HTTP/HTTPS

Passez une URL `http://` ou `https://` sous forme de chaîne. Apprise télécharge le fichier au moment de la requête et détermine automatiquement le nom de la pièce jointe.

La résolution du nom de fichier suit cet ordre de priorité :

1. Paramètre de requête `?name=` : ajoutez-le à l'URL pour imposer un nom précis.
2. Nom de fichier extrait du chemin de l'URL : dernier segment du chemin (ex. `photo.jpg` depuis `/images/photo.jpg`).
3. Repli : `attachment.001`, `attachment.002`, ... lorsqu'aucun nom ne peut être déterminé.

```text
# Enregistré sous photo.jpg (pris dans le chemin de l'URL)
https://example.com/images/photo.jpg

# Enregistré sous abc123 (pris dans le chemin de l'URL)
https://example.com/thumbnails/abc123

# Enregistré sous thumbnail.jpg (imposé par ?name=)
https://example.com/thumbnails/abc123?name=thumbnail.jpg
```

Un paramètre `?name=` vide ou composé uniquement d'espaces est traité comme absent : Apprise revient alors au chemin de l'URL.

### Objet JSON

Passez un objet avec une clé `url` et une clé `filename` facultative :

```json
{ "url": "https://example.com/thumbnails/abc123", "filename": "thumbnail.jpg" }
```

Lorsque `filename` est présent dans l'objet JSON, il est prioritaire sur tout le reste, y compris le chemin de l'URL et le paramètre `?name=`.

## Points de terminaison persistants avec état

Gérez et utilisez des configurations enregistrées associées à une clé `{KEY}`.

Tous les points de terminaison de cette section sont indisponibles avec `APPRISE_STATEFUL_MODE=disabled`.

| Chemin             | Méthode  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/cfg`             | `GET`    | Liste les ID de configuration enregistrés. Le format JSON dépend de l'activation de l'authentification, comme indiqué ci-dessous.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `/add/{KEY}`       | `POST`   | Enregistre une configuration. Charge utile : `urls`, `config`, `format`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `/del/{KEY}`       | `POST`   | Supprime une configuration, de deux façons. Appelé par un administrateur, il supprime le contenu et l'identifiant de la configuration. Appelé avec l'identifiant propre à la configuration, il vide seulement le contenu et conserve l'identifiant. Répond `204` sans corps, qu'il y ait eu quelque chose à supprimer ou non. Les versions antérieures répondaient `200` à une suppression : considérez tout code `2xx` comme une réussite.                                                                                                                                                                                   |
| `/move/{KEY}`      | `POST`   | Déplace une configuration vers un nouvel ID. Charge utile : `to` (obligatoire).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `/get/{KEY}`       | `POST`   | Renvoie une configuration. Alias : `/cfg/{KEY}`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `/notify/{KEY}`    | `POST`   | Envoie avec la configuration enregistrée. Accepte les mêmes [formats de requête](#formats-de-requête) et [en-têtes](#en-têtes-de-notification) que `/notify/`, ainsi qu'un objet `template` facultatif (ou des champs de formulaire `template[nom]`) pour les configurations utilisant `${NOM}`. `locked` et `public` exigent un tag précis ; `disabled` est réservé à l'administrateur.                                                                                                                                                                                                                                      |
| `/resolve/{KEY}`   | `POST`   | Vérifie des URL Apprise (`{"urls": ...}`, une seule chaîne ou une liste de 100 au plus) et renvoie chacune dans l'ordre avec son `service`, si elle est valide (`valid`, avec une `error` sinon) son `url` complète avec toutes ses options, et son `privacy_url` aux secrets masqués, comme les montre `/json/urls?privacy=1`, ainsi que son `id` (celui que `/json/urls` donne à la même URL). Rien n'est contacté. Elle fonctionne quels que soient les modes avec et sans état ; sur une configuration `public` ou `disabled`, seul l'administrateur peut l'utiliser. `/resolve` prend la clé dans `X-Apprise-Config-ID`. |
| `/attach/{KEY}`    | `POST`   | Télécharge l'adresse web d'une pièce jointe (`{"url": ...}`) comme le ferait un envoi, pour la vérifier. Renvoie le fichier en `application/octet-stream`, avec son type dans `X-Apprise-Content-Type` et son nom dans `X-Apprise-Filename`. Un téléchargement échoué renvoie `424` avec `logs` qui en donne la raison, comme un `404`. Les mêmes règles de pièces jointes que `/notify` s'appliquent. Une configuration doit être enregistrée sous `{KEY}`.                                                                                                                                                                  |
| `/json/urls/{KEY}` | `GET`    | Renvoie les URL et les tags enregistrés. Chaque URL indique ses noms de substitution. Avec `privacy=0`, chaque nom porte sa valeur par défaut (ou `null`). Avec `privacy=1`, les secrets des URL sont masqués et chaque nom vaut `null`. Les valeurs de l'environnement du serveur ne sont jamais renvoyées. Avec `APPRISE_CONFIG_LOCK=yes`, les identifiants de l'administrateur global sont requis et chaque nom de substitution vaut `null`.                                                                                                                                                                               |
| `/status/{KEY}`    | `GET`    | Renvoie l'état après authentification. `config_lock` indique si cet appelant peut consulter le contenu de la configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `/qr/{KEY}`        | `GET`    | Renvoie l'URL `apprise://` ou `apprises://`, sans mot de passe, pour ajouter la configuration à Apprise Mobile.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `/auth/{KEY}`      | `GET`    | Ouvre l'éditeur Web ou renvoie le mode, `access` et le nom d'utilisateur en JSON. Le mot de passe n'est jamais renvoyé.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `/auth/{KEY}`      | `POST`   | Définit les identifiants et `access`. L'administrateur modifie l'accès ; l'utilisateur modifie uniquement son mot de passe.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `/auth/{KEY}`      | `DELETE` | Supprime l'authentification sans supprimer la configuration. Les identifiants de l'administrateur global sont requis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

Ces points de terminaison avec état acceptent aussi `X-Apprise-Config-ID`. Par exemple, envoyez `POST /get/` avec `X-Apprise-Config-ID: mykey`. Cela garde la clé hors de l'URL. `/cfg` n'accepte pas cet en-tête.

Le point de terminaison QR renvoie `url` et `uses_admin_credentials` au format
JSON. Il peut inclure un nom d'utilisateur à préremplir, mais jamais un mot de
passe enregistré. Utilisez `/qr/@` pour la configuration mémorisée par la
connexion Web actuelle, ou `/qr` avec `X-Apprise-Config-ID` depuis un client
API. Lorsque l'authentification est activée, les identifiants de
l'administrateur ou de la configuration sont requis ; l'accès aux notifications
`public` ne rend pas ce point de terminaison public. Les réponses ne peuvent pas
être mises en cache.

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

`access` accepte `user`, `locked`, `public` ou `disabled`. L'accès public concerne uniquement les notifications avec état et exige un tag précis. L'accès désactivé conserve le compte mais le réserve à l'administrateur. Seul un administrateur peut envoyer le champ `access`. Les utilisateurs peuvent changer leur mot de passe, mais doivent omettre entièrement `access`. Consultez [Authentification et contrôle d'accès](../deployment/#authentification-et-contrôle-daccès).

`/move/{KEY}` déplace une configuration vers un ID libre. Un utilisateur peut déplacer uniquement sa clé lorsque le verrouillage est désactivé. Un utilisateur avec l'accès `user` peut aussi effacer sa configuration ; ses identifiants restent valides pendant la période de nettoyage configurée afin qu'il puisse enregistrer une configuration de remplacement. Avec `APPRISE_CONFIG_LOCK=yes`, seul un administrateur authentifié peut déplacer ou supprimer des entrées.

Avec `APPRISE_CONFIG_LOCK=yes`, un administrateur authentifié conserve un accès complet aux configurations. Les autres appelants ne peuvent pas ajouter, récupérer, inspecter, lister, déplacer ni supprimer une configuration. Les nouveaux comptes utilisent `locked` par défaut et l'accès `user` enregistré se comporte comme `locked` sans être réécrit. L'accès `public` reste public, car il masque déjà le contenu de la configuration.

Si l'URL et l'en-tête contiennent une clé, l'en-tête est prioritaire. Les en-têtes invalides sont rejetés. L'interface Web et Apprise Mobile peuvent continuer à utiliser les clés dans l'URL.

## Rappels

Les rappels sont des notifications enregistrées maintenant et envoyées plus tard, une seule fois ou de façon répétée. Ils nécessitent le mode avec état et `APPRISE_REMINDER_ENABLED=yes`. Lorsqu'ils sont disponibles, `/status` renvoie `reminders_enabled`, `scheduler_running` et `reminder_urls_max`. `reminders_enabled` indique si l'appelant peut utiliser les rappels de l'identifiant de configuration demandé (envoyé dans `X-Apprise-Config-ID`) : toujours pour l'administrateur, et pour l'identifiant propre à la configuration seulement tant que son accès est `user`. Sans identifiant de configuration, il vaut `true` pour l'administrateur. `scheduler_running` indique si le planificateur qui les envoie fonctionne. `reminder_urls_max` est le nombre maximal d'`urls` qu'un rappel peut contenir (`0` s'il ne peut en contenir aucune). Lorsque les rappels sont désactivés, ces champs sont absents et ces chemins renvoient `404`.

| Chemin                      | Méthode  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/reminders`                | `GET`    | Liste les rappels de chaque Config ID, chacun avec sa `key`, le plus proche en premier. Les mêmes règles que pour `/cfg` s'appliquent : mode avec état simple, `APPRISE_ADMIN`, et la connexion administrateur lorsque les connexions sont requises.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `/reminder/{KEY}`           | `GET`    | Liste les rappels de la configuration. Ajoutez `start` et `end` (horodatages UNIX) pour lister aussi les échéances (`occurrences`) de chaque rappel dans cette période (200 au plus chacun), pour un calendrier. Un rappel en pause n'en liste aucune, sauf si `disabled=show` est ajouté. Ajoutez `privacy=yes` pour afficher les `urls` propres à chaque rappel avec leurs secrets masqués, comme le fait `/json/urls`. Un rappel avec des `urls` liste aussi leurs `url_ids`, les identifiants que `/json/urls` donne aux mêmes URL ; une modification peut en garder une en envoyant `@<id>` dans `urls`, et un nouveau rappel peut ainsi désigner toute URL que les rappels de cette configuration contiennent déjà.                                                                                              |
| `/reminder/{KEY}`           | `POST`   | Ajoute un rappel. Contenu : `body` (ou une pièce jointe) et `when` (obligatoires), ainsi que `name` (par défaut le titre, ou la première ligne du corps), `title`, `type`, `format`, `tag`, `template`, `urls`, `enabled`, `start`, `until`, `count` et `skip`. Les champs du message prennent les mêmes noms, alias et valeurs par défaut que `/notify`, et les en-têtes `X-Apprise-*`, puis `?title=`, `?type=`, `?format=` et `?tag=`, complètent ce que le contenu omet. `title` contient au plus 250 caractères, `body` 32768, `tag` 1000 et une entrée `cron` 255 ; `template` au plus 256 valeurs, `count` au plus 1000000, et un rappel enregistré au plus 256 Ko. Répond comme `/add` : le rappel enregistré pour les appels JSON, un court message sinon, avec son identifiant dans `X-Apprise-Reminder-ID`. |
| `/reminder/{KEY}/{ID}`      | `GET`    | Renvoie un rappel. Ajoutez `privacy=yes` pour afficher ses propres `urls` avec leurs secrets masqués.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `/reminder/{KEY}/{ID}`      | `PUT`    | Remplace les champs d'un rappel ; ceux omis prennent leur valeur par défaut.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `/reminder/{KEY}/{ID}`      | `PATCH`  | Modifie uniquement les champs envoyés ; un champ envoyé à `null` reprend sa valeur par défaut. Envoyez `{"enabled": false}` pour mettre un rappel en pause, ou `{"last": null}` pour effacer le résultat de son dernier envoi (le déplacer à une nouvelle heure l'efface aussi).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `/reminder/{KEY}/{ID}`      | `DELETE` | Supprime un rappel, ainsi que les rappels uniques qui remplacent certaines de ses occurrences. Répond `204` sans corps, comme `/del`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `/reminder/{KEY}/{ID}/test` | `POST`   | Envoie le rappel maintenant sans changer sa prochaine échéance, et répond comme `/notify`, avec son journal en texte, HTML ou JSON. Ajoutez `?stream=yes` ou `Accept: text/event-stream` pour suivre le journal de chaque service en direct, comme avec `/notify`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `/reminder/{KEY}/preview`   | `GET`    | Liste les prochaines heures d'envoi d'un rappel, en horodatages UNIX. Requête : `at` (avec `every`, `interval`, `months` et `days` pour répéter), `cron` ou `holiday` (avec `country` et `region`), ainsi que `tz`, `isc`, `drift`, `start`, `until`, `count` et `limit` (`5` par défaut, `25` au maximum). Un rappel répété sans rien à envoyer renvoie `400`, en nommant `until` lorsque la date de fin en est la cause ; celui dont la date de fin est passée ne liste rien à la place. Une règle qui se répète plus souvent que l'appelant ne le peut renvoie `400` en nommant `when`, comme le ferait l'enregistrement ; passez `id` lors de la modification d'un rappel, qui peut garder les heures qu'il a déjà.                                                                                                |
| `/reminder/{KEY}/holidays`  | `GET`    | Sans `country`, liste chaque code de pays avec ses régions. Avec `country` (et `region` en option), liste ses jours fériés sur les 12 prochains mois, ou sur `year`. Chacun a une `date`, le `name` qu'un rappel de jour férié enregistre et un `label` dans la langue de la page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `/reminder/{KEY}/limits`    | `GET`    | Renvoie les limites et leur utilisation : `reminders`, `reminders_used`, `attach_size` et `attach_used`. Un objet `rules` liste les règles qu'un rappel doit suivre, pour qu'une application puisse le vérifier avant de l'enregistrer : `min_interval` (le plus petit écart en secondes entre deux répétitions permis à l'appelant, `0` sans limite), `drift_min` et `drift_max`, `holiday_last_year`, `timezone` (utilisé quand un rappel n'en précise aucun), `preview_max` et `urls_max` (le nombre maximal d'URL Apprise qu'un rappel peut contenir, `0` s'il ne peut en contenir aucune).                                                                                                                                                                                                                        |
| `/reminder/{KEY}/limits`    | `POST`   | Définit `reminders` (le nombre maximal de rappels de cette configuration) et `attach_size` (octets de pièces jointes stockées au total, `0` pour désactiver les pièces jointes, adresses web comprises). `null` rétablit la valeur par défaut. Réservé à l'administrateur. Les limites s'appliquent à tous sauf à l'administrateur : l'utilisateur de la configuration, ou n'importe qui lorsque les connexions sont désactivées. Les fichiers ajoutés par l'administrateur comptent tout de même, et l'utilisateur peut devoir en retirer avant d'en ajouter d'autres.                                                                                                                                                                                                                                                |

```json
{
  "name": "Standup",
  "body": "Time to meet",
  "tag": "team",
  "when": { "tz": "America/Toronto", "cron": "0 0 9 * * Mon-Fri" }
}
```

Seuls `body` (ou une pièce jointe) et `when` sont nécessaires, par exemple `{"body": "Bonjour", "when": {"at": "2026-12-25 09:00"}}`. Tous les autres champs, y compris ceux de `when`, peuvent être omis ou envoyés à `null` pour prendre leur valeur par défaut. Une liste vide, comme `"tag": []` ou `"urls": []`, compte comme omise.

`when` contient un fuseau horaire IANA (`tz`, celui du serveur par défaut) et l'un des éléments suivants :

- `at` : une date et une heure locales, comme `2026-12-25T09:00:00`. Ajoutez `every` pour répéter à partir de cette heure, comme `{"unit": "weeks", "interval": 2, "days": ["Mon", "Wed"]}`. `unit` vaut `seconds`, `minutes`, `hours`, `days`, `weeks`, `months` ou `years`, et `interval` (`1` par défaut) les compte depuis le début. `months` (`1` à `12`) et `days` (`Sun` à `Sat`) limitent les envois ; sans `days`, les semaines se répètent le jour de la semaine de la date de début.
- `cron` : un cron [dateblock](https://github.com/caronc/dateblock) répété qui commence par les secondes. Ajoutez `"isc": true` pour utiliser plutôt une entrée crontab à 5 champs.
- `holiday` : un jour férié, envoyé chaque année où il tombe, comme `{"country": "CA", "region": "ON", "name": "Christmas Day"}`. `region` est facultatif. Prenez le pays, la région et le `name` du jour férié dans `/reminder/{KEY}/holidays`. Seuls l'année et l'heure de `start` sont utilisées : il est envoyé à cette heure (minuit sans `start`), à partir de cette année, et le jour férié fixe le mois et le jour. `start` peut aussi n'être qu'un `hh:mm` ou `hh:mm:ss`, par exemple `"start": "09:00"` ; il est enregistré à la prochaine date du jour férié. Ajoutez `"count": 1` pour ne l'envoyer qu'une fois.

`when` peut aussi contenir `drift` : un nombre de secondes (`-2147483647` à `2147483647`, la plage acceptée par [dateblock](https://github.com/caronc/dateblock)) ajouté à chaque heure calculée par le calendrier. Par exemple, `90` envoie un rappel de 09:00 à 09:01:30, et `-604800` l'envoie une semaine plus tôt. Un décalage plus long que l'écart entre deux heures avance ou retarde simplement chacune d'elles.

`start` et `until` sont des dates et heures locales, toutes deux facultatives. Les heures propres d'un rappel répété commencent à `start`, avant l'ajout de tout décalage, si bien qu'un jour férié à sa date de début avec un décalage négatif est tout de même envoyé en avance ; un début déjà passé ne change rien. Rien n'est envoyé après `until`. `count` y met fin après ce nombre d'envois, en comptant les heures ignorées pour retard et les envois échoués. Une règle `every` sans `at` commence à `start`, ou sinon au début de la minute de son enregistrement. Un `until` antérieur au début est refusé (pour un jour férié, antérieur à l'année du début). Un rappel unique dont l'heure est passée, ou un rappel répété dont le `until` est passé, est tout de même enregistré, avec `next` à `null`, et n'est jamais envoyé.

Les dates et heures s'écrivent `YYYY-MM-DD` suivies d'un `hh`, `hh:mm` ou `hh:mm:ss` facultatif, séparés par une espace ou un `T`. Une heure absente vaut minuit. Elles sont renvoyées sous la forme `YYYY-MM-DDThh:mm:ss`.

Seul l'administrateur peut répéter un rappel plus souvent que toutes les `APPRISE_REMINDER_USER_MIN_INTERVAL` secondes. Les autres peuvent toutefois modifier un rappel que l'administrateur a réglé plus fréquent, tant qu'il ne se répète pas plus souvent qu'avant.

`skip` liste les heures (horodatages UNIX) auxquelles un rappel répété n'est pas envoyé. Les heures passées sont retirées. Pour modifier une seule occurrence, ajoutez un rappel unique avec `series` (l'`id` du rappel répété) et `occurrence` (l'heure qu'il remplace). Cette heure est alors ignorée par le rappel répété, et le reste. Un rappel unique modifié ensuite pour se répéter ne remplace plus cette heure et est conservé quand la série est supprimée ; la série continue d'ignorer cette heure.

`attach` (ou `attachment` ou `attachments`) accepte les mêmes pièces jointes que `/notify`. Les adresses web sont vérifiées à l'enregistrement et téléchargées à chaque envoi du rappel. Pour envoyer des fichiers, utilisez `multipart/form-data` avec le rappel en JSON dans un champ `reminder` et les fichiers dans `attach`. Les fichiers stockés apparaissent sous la forme `{"file", "filename", "size"}` ; renvoyez `{"file": "<nom>"}` pour en garder un lors d'une modification, ou pour réutiliser celui d'un autre rappel de la configuration, par exemple en le copiant. Les fichiers envoyés comptent dans la limite `attach_size` de la configuration, et un fichier utilisé par plusieurs rappels ne compte qu'une fois. Les fichiers qu'aucun rappel n'utilise sont supprimés par `prune` après une heure.

Un rappel est envoyé comme avec `/notify` et `/notify/{KEY}` :

- `tag` envoie aux URL de la configuration qu'il choisit ; sans `tag` ni `urls`, il envoie aux URL de la configuration sans étiquette.
- `urls` (une seule chaîne ou une liste d'URL Apprise) envoie à ces URL. Sans aucune clé `tag`, il n'est envoyé qu'à elles, comme avec `/notify`.
- `tag` avec `urls` envoie aux deux. Un `tag` à `null` ou `[]` à côté de `urls` ajoute les URL de la configuration sans étiquette, et est enregistré comme `""`.

Chaque URL doit être une URL que le serveur peut charger, et un rappel peut en contenir jusqu'à `APPRISE_REMINDER_URLS_MAX` ; à `0`, on ne peut pas en ajouter aux rappels et celles qu'ils contiennent déjà ne reçoivent rien. Le mode sans état n'a aucun effet sur elles. Un rappel qui n'atteindrait aucun service est refusé. Un rappel envoyé uniquement à ses propres `urls` n'a besoin d'aucune configuration enregistrée.

Un rappel enregistré comporte aussi `id`, `owner`, `runs`, `next` (un horodatage UNIX, ou `null` lorsqu'il ne reste rien à envoyer), `last`, `created` et `updated`. `last.reason` vaut `late` lorsque le rappel avait plus de `APPRISE_REMINDER_GRACE` secondes de retard, `access` lorsqu'il a été mis en pause parce que sa configuration est `disabled`, ou `idle` lorsque la configuration n'a pas été utilisée pendant `APPRISE_REMINDER_IDLE_DAYS` jours. Dans ce cas, les services de la configuration reçoivent un avis unique.

- L'administrateur peut toujours lister, ajouter, modifier, tester et supprimer des rappels, quel que soit l'accès de la configuration. L'utilisateur propre à la configuration ne le peut que tant que son accès est `user` ; les utilisateurs `locked`, `public` et `disabled` n'y ont pas accès. C'est la règle que `/status` indique avec `reminders_enabled`, et l'interface web n'affiche ni onglet, ni champ, ni bouton de rappel lorsqu'elle vaut `false`.
- Les rappels des configurations `user`, `locked` et `public` sont envoyés. Une configuration `disabled` conserve ses rappels, y compris ceux que l'administrateur ajoute, mais les met en pause à leur échéance au lieu de les envoyer.
- Supprimer la connexion d'une configuration avec `DELETE /auth/{KEY}` supprime aussi les rappels ajoutés par son utilisateur. Ajoutez `?keep_reminders=yes` pour les confier plutôt à l'administrateur.
- Supprimer une configuration avec `/del/{KEY}` supprime aussi ses rappels.
- Utilisez `@` à la place de `{KEY}` pour prendre la clé dans `X-Apprise-Config-ID`, ou sinon dans la connexion du navigateur, par exemple `DELETE /reminder/@/{ID}`. `/reminder` avec l'en-tête liste et ajoute aussi des rappels.

## Observabilité

| Chemin     | Méthode | Description                                                                                                    |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------- |
| `/details` | `GET`   | Récupère un objet JSON contenant toutes les URL Apprise prises en charge. Envoyez `Accept: application/json`.  |
| `/metrics` | `GET`   | Récupère les métriques Prometheus. Les identifiants globaux sont requis lorsque l'authentification est active. |

Les déploiements nginx fournis limitent les appels fréquents à `/status` et
`/metrics`. Une requête limitée renvoie `429` avec `Retry-After: 60`.

## Codes de réponse

Pour la liste complète, y compris les codes propres à l'interface Web et les réponses d'erreur courantes, consultez [Codes de réponse](./reference/response-codes/).
