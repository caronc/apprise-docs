---
title: Codes de Réponse
description: Codes d'état HTTP renvoyés par l'API Apprise et leur signification.
sidebar:
  order: 2
---

L'API Apprise utilise les codes d'état HTTP standards. De nombreuses réponses d'erreur renvoient un court message en `text/plain`. Si vous demandez du JSON (en envoyant `Accept: application/json`), les réponses d'erreur incluent un champ `error`.

| Code  | Signification                   | Où vous le verrez                                                                                                                                                                                                                                                                               |
| :---- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200` | OK                              | La requête a réussi.                                                                                                                                                                                                                                                                            |
| `204` | No Content                      | Aucune configuration n'existe pour la clé demandée, ou une requête de notification sans état ne contenait aucune URL valide à notifier.                                                                                                                                                         |
| `400` | Bad Request                     | Charge utile invalide, `type` ou `format` non pris en charge, définition de tag invalide, en-tête de récursion invalide, ou règle de mappage d'un champ de charge utile (`:source=target`) impossible à résoudre (par exemple chemin dot-notation introuvable ou profondeur maximale dépassée). |
| `403` | Forbidden                       | Le serveur est configuré pour refuser la requête (par exemple `APPRISE_CONFIG_LOCK=yes`, ou le listing `/cfg` est désactivé).                                                                                                                                                                   |
| `405` | Method Not Allowed              | La requête utilise une méthode HTTP non prise en charge pour cet endpoint.                                                                                                                                                                                                                      |
| `406` | Not Acceptable                  | La limite de récursion a été atteinte, ou la requête a été rejetée par une règle du serveur.                                                                                                                                                                                                    |
| `417` | Expectation Failed              | Le contrôle d'état a détecté une condition bloquante (par exemple des permissions d'écriture manquantes).                                                                                                                                                                                       |
| `421` | Misdirected Request             | Le mode API-only est activé et une page de l'interface web a été demandée.                                                                                                                                                                                                                      |
| `424` | Failed Dependency               | Au moins une notification n'a pas pu être envoyée.                                                                                                                                                                                                                                              |
| `431` | Request Header Fields Too Large | La requête a dépassé la limite de téléversement en mémoire configurée et Django l'a rejetée.                                                                                                                                                                                                    |
| `500` | Internal Server Error           | Erreur côté serveur lors de l'enregistrement ou du chargement d'une configuration, ou erreur d'E/S inattendue.                                                                                                                                                                                  |

:::note
Certains cas d'erreur dépendent de l'endpoint et peuvent renvoyer soit du `text/plain`, soit du JSON selon la valeur de `Accept`.
:::
