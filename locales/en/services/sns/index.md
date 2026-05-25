---
title: "Amazon Web Service (AWS) - Simple Notification Service (SNS) Notifications"
description: "Send Simple Notification Service (SNS) notifications."
sidebar:
  label: "Amazon Web Service (AWS) - Simple Notification Service (SNS)"

source: https://aws.amazon.com/sns/

schemas:
  - sns

has_sms: true

sample_urls:
  - sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}
  - sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}
  - sns://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}

limits:
  - name: "SMS"
    max_chars: 160
  - name: "Topic"
    max_chars: 256000
---

<!-- SERVICE:DETAILS -->

## Account Setup

You'll need to create an account with Amazon Web Service (AWS) first to use this. If you don't have one, you'll need your credit card (even though the first 12 months are free). Alternatively, if you already have one (or are using it through your company), you're good to go to the next step.

The next thing you'll need to do is generate an _Access Key ID_ and _Secret Access Key_:

1. From the [AWS Management Console](https://console.aws.amazon.com) search for **IAM** under the _AWS services_ section or simply click [here](https://console.aws.amazon.com/iam/home?#/security_credentials).
1. Expand the section reading **Access keys (access key ID and secret access key)**
1. Click on **Create New Access Key**
1. It will present the information to you on screen and let you download a file containing the same information. I suggest you do so since there is no way to retrieve this key again later on (unless you delete it and create a new one).

So at this point, it is presumed you're set up, and you got your _Access Key ID_ and _Secret Access Key_ on hand.

You now have all the tools you need to send SMS messages.

If you want to take advantage of sending your notifications to _topics_: from the [AWS Management Console](https://console.aws.amazon.com) search for **Simple Notification Service** under the _AWS services_ section and configure as many topics as you want. You'll be able to reference them as well using this notification service.

### Temporary Credentials (Session Token)

AWS Lambda execution roles, IAM roles assumed via STS (`aws sts assume-role`), and other sources of short-lived credentials provide a third component alongside the Access Key ID and Secret Access Key: the **Session Token** (`AWS_SESSION_TOKEN`). This token must be included when signing requests, otherwise AWS will reject them with an authorization error.

Apprise supports session tokens in two ways:

- **Query parameter** (recommended): append `?token={SessionToken}` to any SNS URL -- the token is accepted exactly as AWS provides it, with no escaping required.
- **URL prefix**: place the token before the Access Key ID separated by `@`: `sns://{SessionToken}@{AccessKeyID}/...` -- any `/` characters in the token must be percent-encoded as `%2F`.

:::tip
AWS session tokens are base64-encoded and frequently contain `/` characters. Using `?token=` avoids the need to escape them.
:::

## Syntax

Valid syntax is as follows:

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/+{PhoneNo2}/+{PhoneNoN}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic1}/#{Topic2}/#{TopicN}`
- `sns://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}?token={SessionToken}`

You can mix and match phone numbers and topics:

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/#{Topic1}`

Enforcing a hashtag (`#`) for _topics_ and a plus sign (`+`) in front of phone numbers helps eliminate cases where ambiguity could be an issue, such as a _topic_ that is comprised of all numbers. These characters are purely optional.

### Operating Modes

SNS behaves differently depending on your target types:

| Mode            | When it applies                                             | Title handling                             | Body limit     |
| --------------- | ----------------------------------------------------------- | ------------------------------------------ | -------------- |
| `sms` (default) | Phone targets present, or mixed phones + topics             | Title is prepended to the body             | 160 characters |
| `topic`         | Topic-only targets (auto-detected), or `?mode=topic` forced | Title is sent as the SNS **Subject** field | 256 KB         |

The mode is **auto-detected** from your URL: if all targets are topics, `topic` mode is used; if any phone numbers are present, `sms` mode is used. You can override this with `?mode=sms` or `?mode=topic`.

:::note
In `topic` mode, the title becomes the SNS **Subject** field. Email subscribers to the topic will receive a proper subject line. SMS endpoints subscribed to the topic do not receive a subject field -- that is an AWS API constraint.
:::

## Parameter Breakdown

| Variable        | Required | Description                                                                                                                                                                   |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccessKeyID     | \*Yes    | The generated _Access Key ID_ from the AWS Management Console                                                                                                                 |
| AccessKeySecret | \*Yes    | The generated _Access Key Secret_ from the AWS Management Console                                                                                                             |
| Region          | \*Yes    | The region code, e.g. **us-east-1**, **us-west-2**, **cn-north-1**                                                                                                            |
| PhoneNo         | No       | The phone number including the country dialling prefix. You can optionally prefix the number with `+`. Brackets, spaces, and hyphens are accepted.                            |
| Topic           | No       | An SNS topic name. You can optionally prefix it with `#`.                                                                                                                     |
| SessionToken    | No       | An AWS session token for temporary/IAM credentials (`AWS_SESSION_TOKEN`). Prefer `?token=` -- tokens often contain `/` which must be escaped as `%2F` in the `@`-prefix form. |
| mode            | No       | Set to `sms` or `topic` to override auto-detection. Defaults to `sms` when phones are present; `topic` when only topics are listed.                                           |
| key             | No       | An alias for **AccessKeyID** (`?key=`). Useful in YAML configuration.                                                                                                         |
| access          | No       | A legacy alias for **AccessKeyID** (`?access=`).                                                                                                                              |
| secret          | No       | An alias for **AccessKeySecret** (`?secret=`).                                                                                                                                |
| token           | No       | An alias for **SessionToken** (`?token=`). Useful in YAML configuration.                                                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS message:

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

Send to an SNS topic (title becomes the Subject field for email subscribers):

```bash
# Topic mode is auto-detected when only topics are listed
apprise -vv -t "Alert Subject" -b "Alert Body" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/#MyAlertTopic

# Explicitly force topic mode
apprise -vv -t "Alert Subject" -b "Alert Body" \
   "sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/#MyAlertTopic?mode=topic"
```

Send using temporary credentials from an IAM role or Lambda:

```bash
# Recommended: ?token= accepts the token exactly as AWS provides it,
# no escaping needed even when the token contains / characters
apprise -vv -b "Lambda alert fired" \
   "sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223?token=MySessionToken"

# Alternate: token in the URL prefix position -- any / in the token
# must be percent-encoded as %2F
apprise -vv -b "Lambda alert fired" \
   "sns://MySessionToken@AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223"
```

Example YAML configuration using named parameters:

```yaml
urls:
  - sns://:
      - access_key_id: AHIAJGNT76XIMXDBIJYA
        secret_access_key: bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
        region: us-east-2
        to: "+18005551223,#MyAlertTopic"
        token: MySessionToken
        mode: topic
```
