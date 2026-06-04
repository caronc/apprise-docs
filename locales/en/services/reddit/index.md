---
title: "Reddit Notifications"
description: "Send Reddit notifications."
sidebar:
  label: "Reddit"

source: https://reddit.com

schemas:
  - reddit

sample_urls:
  - reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit}
  - reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit_1}/{subreddit_2}/{subreddit_N}

limits:
  max_chars: 6000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Visit [https://old.reddit.com/prefs/apps](https://old.reddit.com/prefs/apps) and scroll to the bottom
1. Click on the button that reads '**are you a developer? create an app...**'
1. Set the mode to `script`,
1. Provide a `name`, `description`, and `redirect uri` (it can be anything).
1. Save your configuration:
   ![Reddit-Setup01](./images/109997361-20372180-7cde-11eb-868d-e5e46bb41873.png)
1. Once the bot is saved, you'll be given a ID (next to the the bot name) and a Secret.
   ![Reddit-Setup02](./images/109997391-262d0280-7cde-11eb-8681-067c0e00d4ab.png)

- The **App ID** will look something like this: `YWARPXajkk645m`
- The **App Secret** will look something like this: `YZGKc5YNjq3BsC-bf7oBKalBMeb1xA`
- The App will also have a location where you can identify the users/developers who can also use this key. By default it's already configured to be yours. You will need to use the user/pass of one of the accounts identified here as well to use the posting capabilities.

## Syntax

Valid syntax is as follows:

- `reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit}`
- `reddit://{user}:{pass}@{app_id}/{app_secret}/{subreddit_1}/{subreddit_2}/{subreddit_N}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| app_id     | Yes      | The App ID generated for your **script** application you created on the [Reddit Apps](https://old.reddit.com/prefs/apps) page.                                                                                                                                                                                                                                                                                                                   |
| app_secret | Yes      | The App Secret generated for your **script** application you created on the [Reddit Apps](https://old.reddit.com/prefs/apps) page.                                                                                                                                                                                                                                                                                                               |
| user       | Yes      | The Reddit UserID associated with one of the developers attached to your application you generated. By default this is just the same user account you used to create the Reddit app in the first place.                                                                                                                                                                                                                                          |
| pass       | Yes      | The Reddit password associated with the UserID defined above.                                                                                                                                                                                                                                                                                                                                                                                    |
| subreddit  | Yes      | The Subreddit you wish to post your message to. You must specify at least 1 of these.                                                                                                                                                                                                                                                                                                                                                            |
| kind       | No       | The message kind can be set to either `self`, `link`, or `auto`.<br/>Set this to `self` to imply you're posting a general/common post to the subreddit. Otherwise, set this to `link` if the message body you provide (as part of your Apprise payload) only contains a hyperlink/URI to a website. The `auto` setting (_also the default_) will parse the _message body_ and set the `self`/`link` kind accordingly based on what was detected. |
| ad         | No       | Specify whether or not what you are posting is an advertisement. By default this is set to **No**.                                                                                                                                                                                                                                                                                                                                               |
| nsfw       | No       | The _Not Safe For Work_ (NSFW) flag. By default this is set to **No**.                                                                                                                                                                                                                                                                                                                                                                           |
| replies    | No       | Send all replies of the thread to your (Reddit) inbox? By default this is set to **Yes**.                                                                                                                                                                                                                                                                                                                                                        |
| resubmit   | No       | Let Reddit know this is a re-post. Some subreddits block the re-posting of content; setting this flag to `yes` can enforce that the content be accepted even if this is the case. Some subreddits will even flag the message differently when you identify it as a re-post up front. This may or may not be what you want. By default this is set to **No** so that all messages are treated by the upstream server.                             |
| spoiler    | No       | Mark your post with the **spoiler** flag. By default this is set to **No**.                                                                                                                                                                                                                                                                                                                                                                      |
| flair_id   | No       | Provide the `flair_id` you want to associate with your post. By default this is not passed upstream unless identified.                                                                                                                                                                                                                                                                                                                           |
| flair_text | No       | Provide the `flair_text` you want to associate with your post. By default this is not passed upstream unless identified.                                                                                                                                                                                                                                                                                                                         |

:::note
Reddit always requires a `title` to go with its `body`. Reddit will deny your post (upstream) if you don't provide both.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Reddit Notification

```bash
# Assuming our {user} is sstark
# Assuming our {pass} is notAFanOfLannisters
# Assuming our {app_id} is YWARPXajkk645m
# Assuming our {app_secret} is YZGKc5YNjq3BsC-bf7oBKalBMeb1xA
# Assuming we want to post to the {subreddit} Apprise

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   reddit://sstark:notAFanOfLannisters@YWARPXajkk645m/YZGKc5YNjq3BsC-bf7oBKalBMeb1xA/Apprise
```
