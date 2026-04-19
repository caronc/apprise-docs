---
title: "Notifications Amazon Web Service (AWS) - Simple Notification Service (SNS)"
description: "Envoyer Simple Notification Service (SNS) notifications."
sidebar:
  label: "Amazon Web Service (AWS) - Simple Notification Service (SNS)"

source: https://aws.amazon.com/sns/

schemas:
  - sns

has_sms: true

sample_urls:
  - sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}
  - sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}

limits:
  max_chars: 160
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

You now have all the tools you need to send SMS messages.

If you want to take advantage of sending your notifications to _topics_: from the [AWS Management Console](https://console.aws.amazon.com) search for **Simple Notification Service** under the _AWS services_ section and configure as many topics as you want. You'll be able to reference them as well using this notification service.

## Syntaxe

La syntaxe valide est la suivante :

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/+{PhoneNo2}/+{PhoneNoN}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic1}/#{Topic2}/#{TopicN}`

You can mix and match these entries as well:

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/#{Topic1}`

Enforcing a hashtag (#) for _topics_ and a plus sign (+) in-front of phone numbers helps eliminate cases where ambiguity could be an issue such as a _topic_ that is comprised of all numbers. These characters are purely optional.

## Detail des parametres

| Variable        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AccessKeyID     | Yes      | The generated _Access Key ID_ from the AWS Management Console                                                                                                                                                                                                                                                                                                                                                            |
| AccessKeySecret | Yes      | The generated _Access Key Secret_ from the AWS Management Console                                                                                                                                                                                                                                                                                                                                                        |
| Region          | Yes      | The region code might look like **us-east-1**, **us-west-2**, **cn-north-1**, etc                                                                                                                                                                                                                                                                                                                                        |
| PhoneNo         | No       | The phone number MUST include the country codes dialling prefix as well when placed. You can optionally prefix the entire number with a plus symbol (+) to enforce that the value be interpreted as a phone number (in the event it can't be auto-detected otherwise). This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion. |
| Topic           | No       | The topic you want to publish your message to.                                                                                                                                                                                                                                                                                                                                                                           |

:::note
This notification service does not use the title field; only the _body_ is passed along.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer an SMS message:

```bash
# Assuming our {AccessKeyID} is AHIAJGNT76XIMXDBIJYA
# Assuming our {AccessKeySecret} is bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Assuming our {Region} is us-east-2
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+1(800)555-1223

```
