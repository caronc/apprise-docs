---
title: Codes de Réponse
description: Codes d'état HTTP renvoyés par l'API Apprise et leur signification.
sidebar:
  order: 2
---

L'API Apprise utilise les codes d'état HTTP standard. De nombreuses réponses d'erreur renvoient un court message en `text/plain`. Si vous demandez du JSON (en envoyant `Accept: application/json`), les réponses d'erreur incluent un champ `error`.

| Code  | Signification                   | Où vous le verrez                                                                                                                                                                                                                                                                               |
| :---- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200` | OK                              | La requête a réussi.                                                                                                                                                                                                                                                                            |
| `204` | No Content                      | Aucune configuration n'existe pour la clé demandée, ou une requête de notification sans état ne contenait aucune URL valide à notifier.                                                                                                                                                         |
| `302` | Found                           | L'interface Web a redirigé le navigateur après une connexion, une déconnexion ou la sélection d'une configuration. Les clients API ne devraient normalement pas recevoir cette réponse.                                                                                                         |
| `400` | Bad Request                     | Charge utile invalide, `type` ou `format` non pris en charge, définition de tag invalide, en-tête de récursion invalide, ou règle de mappage d'un champ de charge utile (`:source=target`) impossible à résoudre (par exemple chemin dot-notation introuvable ou profondeur maximale dépassée). |
| `401` | Unauthorized                    | Les identifiants Basic Auth globaux ou propres à la clé étaient manquants ou invalides. L'en-tête `WWW-Authenticate: Basic` indique au client de demander les identifiants.                                                                                                                     |
| `403` | Forbidden                       | Le paramètre du serveur ou le niveau d'accès actuel refuse la requête. Par exemple : stockage avec état désactivé, compte de configuration suspendu, liste `/cfg` indisponible ou contenu de configuration verrouillé.                                                                          |
| `404` | Not Found                       | La route ou la configuration demandée n'existe pas. Le mode strict renvoie également ce code pour toute route inconnue d'Apprise.                                                                                                                                                               |
| `405` | Method Not Allowed              | La route existe, mais ne prend pas en charge la méthode demandée. L'en-tête `Allow` indique les méthodes acceptées.                                                                                                                                                                             |
| `406` | Not Acceptable                  | La limite de récursion a été atteinte, ou la requête a été rejetée par une règle du serveur.                                                                                                                                                                                                    |
| `409` | Conflict                        | Une configuration ne peut pas être déplacée, car l'ID de configuration de destination existe déjà.                                                                                                                                                                                              |
| `413` | Content Too Large               | Nginx a rejeté un corps de requête dépassant la limite de la route ou du serveur. Les routes de connexion et d'authentification ont une limite plus basse que les téléversements de notification.                                                                                               |
| `414` | URI Too Long                    | Nginx a rejeté une cible de requête trop longue.                                                                                                                                                                                                                                                |
| `417` | Expectation Failed              | Le contrôle d'état a détecté une condition bloquante (par exemple des permissions d'écriture manquantes).                                                                                                                                                                                       |
| `421` | Misdirected Request             | Le mode API-only est activé et une page de l'interface web a été demandée.                                                                                                                                                                                                                      |
| `424` | Failed Dependency               | Au moins une notification n'a pas pu être envoyée.                                                                                                                                                                                                                                              |
| `429` | Too Many Requests               | Nginx a temporairement limité la requête. Les déploiements fournis renvoient `Retry-After: 60` ; le client doit choisir la plus courte entre cette valeur valide et son attente bornée habituelle, ou conserver son attente habituelle si l'en-tête est absent ou invalide.                     |
| `431` | Request Header Fields Too Large | La requête a dépassé la limite de téléversement en mémoire configurée et Django l'a rejetée.                                                                                                                                                                                                    |
| `500` | Internal Server Error           | Erreur côté serveur lors de l'enregistrement ou du chargement d'une configuration, ou erreur d'E/S inattendue.                                                                                                                                                                                  |
| `502` | Bad Gateway                     | Nginx n'a pas pu obtenir de réponse valide du worker de l'application.                                                                                                                                                                                                                          |
| `503` | Service Unavailable             | L'application est temporairement indisponible, ou tous les emplacements de flux en direct sont occupés. Lorsque ces emplacements sont occupés, la réponse inclut `Retry-After: 15`.                                                                                                             |
| `504` | Gateway Timeout                 | Le worker de l'application n'a pas répondu avant l'expiration du délai du proxy.                                                                                                                                                                                                                |

:::note
Certains cas d'erreur dépendent de l'endpoint et peuvent renvoyer soit du `text/plain`, soit du JSON selon la valeur de `Accept`.
:::

:::note
Les contrôles d'état et de métriques réussis sont omis du journal d'accès nginx fourni. Leurs échecs, notamment les codes `417` et `429`, restent journalisés afin de préserver la surveillance et la détection des abus.
:::

:::note
Un [flux de progression en direct](/api/usage/#diffusion-en-direct-de-la-progression) commence avec le code HTTP `200`. Consultez le statut de son événement `result` final au lieu d'attendre un code HTTP `424` ultérieur.
:::
