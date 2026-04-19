---
title: "Notifications Amazon Web Service (AWS) - Simple Email Service (SES)"
description: "Envoyer Simple Email Service (SES) notifications."
sidebar:
  label: "Amazon Web Service (AWS) - Simple Email Service (SES)"

source: https://aws.amazon.com/ses/

schemas:
  - ses

has_attachments: true

sample_urls:
  - ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/
  - ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/{ToEmail1}/{ToEmail2}/{ToEmailN}/
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

You'll need to create an account with Amazon Web Service (AWS) first to use this. If you don't have one, you'll need your credit card (even though the first 12 months are free). Alternatively, if you already have one (or are using it through your company), you're good to go to the next step.

The next thing you'll need to do is generate an _Access Key ID_ and _Secret Access Key_.:

1. From the [AWS Management Console](https://console.aws.amazon.com) search for **IAM** under the _AWS services_ section or simply click [here](https://console.aws.amazon.com/iam/home?#/security_credentials).
1. Expand the section reading **Access keys (access key ID and secret access key)**
1. Click on **Create New Access Key**
1. It will present the information to you on screen and let you download a file containing the same information. I suggest you do so since there is no way to retrieve this key again later on (unless you delete it and create a new one).

So at this point, it is presumed you're set up, and you got your _Access Key ID_ and _Secret Access Key_ on hand.

You now have all the tools you need to send SES (Email) messages.

If you want to take advantage of sending your notifications to _topics_: from the [AWS Management Console](https://console.aws.amazon.com) search for **Simple Notification Service** under the _AWS services_ section and configure as many topics as you want. You'll be able to reference them as well using this notification service.

## Syntaxe

La syntaxe valide est la suivante :

- `ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/`
- `ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/{ToEmail1}/{ToEmail2}/{ToEmailN}/`

## Detail des parametres

| Variable      | Required | Description                                                                                                                                                                               |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | Yes      | The originating source of the Email Address AWS is sending on behalf. AWS will validate this against your account (when paired with your aws_access_key and aws_secret_key)               |
| access        | Yes      | The generated _Access Key ID_ from the AWS Management Console                                                                                                                             |
| secret        | Yes      | The generated _Access Key Secret_ from the AWS Management Console                                                                                                                         |
| region        | Yes      | The region code might look like **us-east-1**, **us-west-2**, **cn-north-1**, etc                                                                                                         |
| target_emails | Yes      | On ore more emails separated by a slash to deliver your notification to. If no email is specified then the `from` email is notified.                                                      |
| reply         | No       | If you want the email address _ReplyTo_ address to be something other then your own email address, then you can specify it here.                                                          |
| to            | No       | This will enforce (or set the address the email is sent To). This is only required in special circumstances. The notification script is usually clever enough to figure this out for you. |
| name          | No       | With respect to {from*email}, this allows you to provide a name with your \_ReplyTo* address.                                                                                             |
| cc            | No       | Carbon Copy email address(es). More than one can be separated with a space and/or comma.                                                                                                  |
| bcc           | No       | Blind Carbon Copy email address(es). More than one can be separated with a space and/or comma.                                                                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une SES (Email):

```bash
# Assuming our {AccessKeyID} is AHIAJGNT76XIMXDBIJYA
# Assuming our {AccessKeySecret} is bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Assuming our {Region} is us-east-2
# Assuming our {Email} - test@test.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ses://test@test.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/
```
