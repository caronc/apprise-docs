---
title: "Notifications Mastodon"
description: "Envoyer des notifications Mastodon."
sidebar:
  label: "Mastodon"

source: https://joinmastodon.org

schemas:
  - mastodon: insecure
  - toot: insecure
  - mastodons
  - toots

has_attachments: true

sample_urls:
  - mastodons://{token}@{host}
  - mastodon://{token}@{host}/{targets}

limits:
  max_chars: 500
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous sur un service base sur Mastodon. [Voici quelques serveurs parmi lesquels vous pouvez choisir](https://joinmastodon.org/servers).

Dans les **Settings** de votre compte, ouvrez l'onglet **Development** et creez une **Application**. C'est elle qu'Apprise utilisera pour envoyer vos notifications.

Vous devez au minimum accorder les scopes suivants a votre application :

- `write:statuses` : pour qu'Apprise puisse publier un message ;
- `write:media` : pour qu'Apprise puisse envoyer une piece jointe ;
- `read:accounts` : si vous souhaitez pouvoir vous envoyer un message direct a vous-meme.

**Remarque :** si vous modifiez, ajoutez ou supprimez des scopes associes a votre application Mastodon, vous **DEVEZ** regenerer votre **Access Token**, sinon les changements de scopes ne seront pas pris en compte.

Apres avoir cree votre application, retournez dans sa configuration : elle vous fournira alors une `key`, un `secret` et un `access_token`. Seul l'**Access Token** est necessaire pour faire fonctionner Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `mastodon://{token}@{host}`
- `mastodons://{token}@{host}`
- `toot://{token}@{host}`
- `toots://{token}@{host}`
- `mastodon://{token}@{host}/{targets}`
- `mastodons://{token}@{host}/{targets}`
- `toot://{token}@{host}/{targets}`
- `toots://{token}@{host}/{targets}`

Utilisez simplement `mastodon://` ou `toot://` si vous accedez a un serveur non securise, et `mastodons://` ou `toots://` si vous accedez a un serveur securise, en HTTPS.

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token      | Oui         | Access Token associe a l'application que vous avez creee dans les parametres de compte Mastodon. Votre jeton doit au minimum disposer du scope `write:statuses`. Ajoutez egalement `write:media` si vous comptez envoyer des pieces jointes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| visibility | Non         | Niveau de visibilite Mastodon a utiliser. Les valeurs possibles sont :<br/>`direct` pour les messages directs prives<br/>`private` pour des publications visibles uniquement par les followers<br/>`unlisted` pour des publications publiques qui n'apparaissent pas dans la timeline publique<br/>`public` pour des publications publiques<br/>`default` pour utiliser la visibilite par defaut definie dans le compte.<br/><br/>Par defaut, si vous utilisez `toot://`, Apprise suppose que vous voulez faire une publication publique, sauf si vous precisez `visibility=`. Si vous utilisez `mastodon://`, la publication herite par defaut de la _default-visibility_ de votre compte, sauf surcharge explicite via `visibility=`. |
| batch      | Non         | Par defaut, les images sont groupees ensemble. Si vous souhaitez publier une toot par piece jointe, definissez cette valeur sur `False`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| sensitive  | Non         | Si cette valeur est definie sur `Yes`, toutes les pieces jointes fournies seront marquees comme sensibles. Par defaut, cette option vaut `No`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| spoiler    | Non         | Permet facultativement de fournir un _spoiler text_ associe au statut publie.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| language   | Non         | Permet facultativement de fournir un code langue ISO 639 pour votre publication, par exemple `en`, `fr`, etc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| key        | Non         | Empeche les soumissions en double d'un meme statut. Les cles d'idempotence sont conservees jusqu'a une heure et peuvent etre n'importe quelle chaine arbitraire. Vous pouvez utiliser un hash ou un UUID genere cote client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ping       | Non         | Permet facultativement d'ajouter une ou plusieurs mentions Mastodon ou hashtags a la fin du statut. Les mentions doivent commencer par `@`, par exemple `@caronc` ou `@alice@example.com`, et les hashtags doivent commencer par `#`, par exemple `#apprise`. Les valeurs nues comme `apprise` sont ignorees pour eviter toute ambiguite.                                                                                                                                                                                                                                                                                                                                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

### Mentions et Hashtags

Mastodon resout les mentions et les hashtags a partir du texte final du statut. Vous pouvez les inclure directement dans le corps du message, les fournir dans le chemin, ou utiliser `ping=` pour ajouter des mentions et hashtags fixes depuis l'URL Apprise.

Les entrees de chemin pour les utilisateurs et les hashtags sont preservees lorsque l'URL est reconstruite. Comme `#` a une signification particuliere dans les URL, les hashtags dans le chemin sont encodes sous la forme `%23tag`. Les entrees de chemin et celles passees par `ping=` sont ajoutees au texte final du statut lorsqu'elles n'y figurent pas deja, y compris en texte brut.

La valeur `ping=` accepte des entrees separees par des virgules, espaces, points-virgules, slashs ou pipes. Les mentions doivent commencer par `@` et les hashtags par `#` :

- `ping=@caronc` appends `@caronc`
- `ping=@alice@example.com` appends `@alice@example.com`
- `ping=#apprise,#notifications` appends `#apprise #notifications`
- `/@caronc/%23apprise` appends `@caronc #apprise`
- `/%23apprise/%23notifications` appends `#apprise #notifications`

Les valeurs nues comme `ping=apprise` sont ignorees, car elles ne permettent pas de savoir s'il s'agit d'une mention ou d'un hashtag. Les doublons issus du corps du message, du chemin et de `ping=` sont elimines dans le texte final. Les hashtags doivent contenir au moins un caractere non numerique.

### Traitement Intelligent

Avec Mastodon, l'acheminement des messages `direct` depend entierement des `@users` identifies dans le corps du message. Pour cette raison, il est possible d'envoyer un statut comme celui-ci :

```bash
apprise -b "Hey guys, this message was sent from Apprise" \
   "mastodon://accesskey/host/@caronc?visibility=direct"
```

Le corps du message deviendra alors :

```text
Hey guys, this message was sent from Apprise @caronc
```

Il est important de noter que si vous indiquez des entrees `/@users` dans l'URL Apprise, elles seront ajoutees au message afin que les utilisateurs soient bien notifies. Cela dit, si vous preparez une URL avec `visibility=direct` sans fournir d'utilisateur, Apprise recuperera automatiquement vos propres informations d'identification et vous enverra le message a vous-meme.

```bash
# Voici un exemple ou nous precisons un message `direct`
# car notre intention est de creer un DM. Cela amenera Apprise
# a recuperer notre propre compte pour nous notifier nous-meme.
# Vous DEVEZ avoir active le scope `read:accounts` sur votre
# application Mastodon, sinon cela ne fonctionnera pas.
#
# Notez aussi qu'il y a une petite surcharge sur cet appel,
# puisqu'une requete supplementaire est necessaire pour recuperer
# vos informations. Pour plus d'efficacite, il est preferable de
# preciser directement votre @user si c'est votre intention.
apprise -b "Hey guys, this message was sent from Apprise" \
   "mastodon://accesskey/host/?visibility=direct"
```

Apprise est egalement assez intelligent pour preanalyser le message en cours de publication. Si un `@user` deja present dans le corps est aussi present dans l'URL, il ne sera **pas** ajoute une seconde fois a la fin du message. Prenons par exemple ce statut :

```bash
apprise -b "Hey @caronc, Thanks for showing me the Apprise plugin!" \
   "mastodon://accesskey/host/@caronc?visibility=direct"
```

Dans ce cas, `@caronc` est a la fois une cible de notification et deja present dans le message. En consequence, aucun `@caronc` supplementaire ne sera ajoute a la fin, et le message sera envoye tel quel.

```text
Hey @caronc, Thanks for showing me the Apprise plugin!
```

Voyons encore un exemple pour illustrer d'autres cas :

Considerez ceci :

```bash
apprise -b "Hey @caronc, Thanks for showing me the Apprise plugin!" \
   "mastodon://accesskey/host/@caronc/@joe/@sam?visibility=direct"
```

Dans l'exemple suivant, 3 personnes sont definies comme cibles, mais l'une d'elles est deja mentionnee dans le message. Les 2 autres seront automatiquement ajoutees a la fin du statut :

```text
Hey @caronc, Thanks for showing me the Apprise plugin! @joe @sam
```

## Exemples

Envoyer une toot Mastodon :

```bash
# Supposons que notre {AccessKey} soit T1JJ3T3L2
# Supposons que notre {Host} soit noc.social
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mastodons://T1JJ3T3L2@noc.social"
```

Envoyer une toot Mastodon avec des entrees dans le chemin :

```bash
# Supposons que notre {AccessKey} soit T1JJ3T3L2
# Supposons que notre {Host} soit noc.social
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mastodons://T1JJ3T3L2@noc.social/@caronc/%23apprise"
```

Envoyer une toot Mastodon avec des `ping` fixes ajoutes :

```bash
# Supposons que notre {AccessKey} soit T1JJ3T3L2
# Supposons que notre {Host} soit noc.social
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mastodons://T1JJ3T3L2@noc.social?ping=#apprise,#notifications"
```

Envoyer un message direct Mastodon a `@testaccount` :

```bash
# Supposons que notre {AccessKey} soit T1JJ3T3L2
# Supposons que notre {Host} soit noc.social
# notre utilisateur est @testaccount
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mastodons://T1JJ3T3L2@noc.social/@testaccount?visibility=direct"
```

Envoyer un message direct Mastodon a nous-memes en utilisant la detection integree :

```bash
# Supposons que notre {AccessKey} soit T1JJ3T3L2
# Supposons que notre {Host} soit noc.social
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "mastodons://T1JJ3T3L2@noc.social/?visibility=direct"
```
