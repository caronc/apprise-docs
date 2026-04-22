---
title: "Notifications Octopush"
description: "Envoyer des notifications Octopush."
sidebar:
  label: "Octopush"

source: https://octopush.com/

schemas:
  - octopush

has_sms: true

sample_urls:
  - octopush://{api_login}/{api_key}/{phone_no}
  - octopush://{api_login}/{api_key}/{phone_no1}/{phone_no2}/{phone_noN}
  - octopush://{sender}:{api_login}/{api_key}/{phone_no}
  - octopush://_?login={api_login}&key={api_key}&sender={sender}&to={phone_no}

limits:
  max_chars: 1224
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Octopush, vous aurez besoin de votre _API Login_ et de votre _API Key_. L'API login correspond a l'adresse e-mail associee a votre compte Octopush.

Vous pouvez aussi definir facultativement une valeur _Sender_. Octopush accepte un expediteur alphanumerique de 3 a 11 caracteres pour les routes qui le prennent en charge.

## Syntaxe

La syntaxe valide est la suivante :

- `octopush://{api_login}/{api_key}/{phone_no}`
- `octopush://{api_login}/{api_key}/{phone_no1}/{phone_no2}/{phone_noN}`
- `octopush://{sender}:{api_login}/{api_key}/{phone_no}`
- `octopush://{sender}:{api_login}/{api_key}/{phone_no1}/{phone_no2}?batch=yes`

Vous pouvez aussi transmettre les valeurs sous forme de parametres de requete :

- `octopush://_?login={api_login}&key={api_key}&to={phone_no}`
- `octopush://_?login={api_login}&key={api_key}&sender={sender}&to={phone_no}&type=sms_low_cost`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                          |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| api_login | Oui         | _API Login_ associe a votre compte Octopush. Il doit s'agir d'une adresse e-mail valide.                                                                                                                                             |
| api_key   | Oui         | _API Key_ associee a votre compte Octopush.                                                                                                                                                                                          |
| sender    | Non         | Identifiant expediteur facultatif a afficher si votre route Octopush le prend en charge.                                                                                                                                             |
| phone_no  | Oui         | Au moins un numero de telephone doit etre fourni pour utiliser ce plugin. Ce champ accepte aussi les parentheses, espaces et tirets pour une meilleure lisibilite.                                                                   |
| batch     | Non         | Octopush prend en charge un mode lot. Si vous indiquez plusieurs numeros, vous pouvez les envoyer en une seule fois dans l'URL au lieu de l'approche normale d'Apprise, qui les envoie un par un. Par defaut, ce mode est desactive. |
| replies   | Non         | Lorsque cette valeur est definie sur `yes`, Apprise demande la gestion des reponses via Octopush. Par defaut, cette option vaut `no`.                                                                                                |
| purpose   | Non         | Objet du message. Les valeurs prises en charge sont `alert` et `wholesale`. Par defaut, cette valeur est `alert`.                                                                                                                    |
| type      | Non         | Type de message. Les valeurs prises en charge sont `sms_premium` et `sms_low_cost`. Par defaut, cette valeur est `sms_premium`.                                                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Octopush sous forme de SMS :

```bash
# Supposons que notre {api_login} soit user@example.com
# Supposons que notre {api_key} soit my-api-key
# Supposons que notre {phone_no} soit aux Etats-Unis, donc avec l'indicatif pays +1,
# et corresponde au numero 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "octopush://user@example.com/my-api-key/18005551223"

# la variante suivante aurait aussi fonctionne
# les espaces, parentheses et tirets sont acceptes dans ce champ :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "octopush://user@example.com/my-api-key/1-(800) 555-1223"
```

Envoyer via un identifiant expediteur et la route low-cost :

```bash
# Supposons que notre {api_login} soit user@example.com
# Supposons que notre {api_key} soit my-api-key
# Supposons que notre {sender} soit MyCompany
# Supposons que notre {phone_no} soit +33-6-00-01-02-03
apprise -vv -b "Your order has shipped" \
   "octopush://MyCompany:user@example.com/my-api-key/33600010203?type=sms_low_cost"
```

Envoyer un message a plusieurs cibles avec le mode lot d'Octopush :

```bash
# Supposons que notre {api_login} soit user@example.com
# Supposons que notre {api_key} soit my-api-key
# Supposons que notre {sender} soit MyCompany
# Supposons que notre {phone_no1} soit +33-6-00-01-02-03
# Supposons que notre {phone_no2} soit +33-6-00-01-02-04
apprise -vv -b "System maintenance starts in 15 minutes" \
   "octopush://MyCompany:user@example.com/my-api-key/33600010203/33600010204?batch=yes&purpose=alert"
```
