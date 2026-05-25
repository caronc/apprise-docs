---
title: "Amazon Web Service (AWS) - Simple Email Service (SES) Notifications"
description: "Send Simple Email Service (SES) notifications."
sidebar:
  label: "Amazon Web Service (AWS) - Simple Email Service (SES)"

source: https://aws.amazon.com/ses/

schemas:
  - ses

has_attachments: true

sample_urls:
  - ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/
  - ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/{ToEmail1}/{ToEmail2}/
  - ses://{FromUser}:{SessionToken}@{FromDomain}/{AccessKeyID}/{SecretKey}/{Region}/
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

You also need a verified sender identity in SES. From the [AWS Management Console](https://console.aws.amazon.com) search for **Simple Email Service** under the _AWS services_ section, then go to **Verified identities** and verify the email address or domain you want to send from.

### Temporary Credentials (Session Token)

AWS Lambda execution roles, IAM roles assumed via STS (`aws sts assume-role`), and other sources of short-lived credentials provide a third component alongside the Access Key ID and Secret Access Key: the **Session Token** (`AWS_SESSION_TOKEN`). This token must be included when signing requests, otherwise AWS will reject them with an authorization error.

Apprise supports session tokens in two ways:

- **Query parameter** (recommended): append `?token={SessionToken}` to any SES URL -- the token is accepted exactly as AWS provides it, with no escaping required.
- **URL password field**: place the token in the password position of the URL: `ses://{user}:{SessionToken}@{host}/...` -- any `/` characters in the token must be percent-encoded as `%2F`.

:::tip
AWS session tokens are base64-encoded and frequently contain `/` characters. Using `?token=` avoids the need to escape them.
:::

## Syntax

Valid syntax is as follows:

- `ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/`
- `ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/{ToEmail1}/{ToEmail2}/{ToEmailN}/`
- `ses://{FromUser}:{SessionToken}@{FromDomain}/{AccessKeyID}/{SecretKey}/{Region}/`
- `ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/?token={SessionToken}`

If no target email is specified, Apprise sends to the `{FromEmail}` address itself.

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                                                       |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FromEmail    | \*Yes    | The sender email address AWS sends on behalf of. AWS validates this against your verified identities.                                                                             |
| AccessKeyID  | \*Yes    | The generated _Access Key ID_ from the AWS Management Console.                                                                                                                    |
| SecretKey    | \*Yes    | The generated _Secret Access Key_ from the AWS Management Console.                                                                                                                |
| Region       | \*Yes    | The region code, e.g. **us-east-1**, **us-west-2**, **cn-north-1**.                                                                                                               |
| ToEmail      | No       | One or more recipient email addresses separated by a slash. If omitted, the `FromEmail` address is notified.                                                                      |
| SessionToken | No       | An AWS session token for temporary/IAM credentials (`AWS_SESSION_TOKEN`). Prefer `?token=` -- tokens often contain `/` which must be escaped as `%2F` in the password-field form. |
| reply        | No       | Set a _Reply-To_ address different from the sender address.                                                                                                                       |
| to           | No       | Force or override the To address. Usually inferred automatically.                                                                                                                 |
| name         | No       | A display name associated with the sender address.                                                                                                                                |
| cc           | No       | Carbon Copy email address(es). Multiple values can be separated by commas.                                                                                                        |
| bcc          | No       | Blind Carbon Copy email address(es). Multiple values can be separated by commas.                                                                                                  |
| key          | No       | An alias for **AccessKeyID** (`?key=`). Useful in YAML configuration.                                                                                                             |
| access       | No       | A legacy alias for **AccessKeyID** (`?access=`).                                                                                                                                  |
| secret       | No       | An alias for **SecretKey** (`?secret=`).                                                                                                                                          |
| token        | No       | An alias for **SessionToken** (`?token=`). Useful in YAML configuration.                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a basic SES email:

```bash
# Assuming our {AccessKeyID} is AHIAJGNT76XIMXDBIJYA
# Assuming our {SecretKey} is bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Assuming our {Region} is us-east-2
# Assuming our sender is sender@example.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ses://sender@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/

# Send to a different recipient
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ses://sender@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/recipient@example.com
```

Send using temporary credentials from an IAM role or Lambda:

```bash
# Recommended: ?token= accepts the token exactly as AWS provides it,
# no escaping needed even when the token contains / characters
apprise -vv -b "Lambda alert fired" \
   "ses://sender@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/recipient@example.com?token=MySessionToken"

# Alternate: token in the URL password field -- any / in the token
# must be percent-encoded as %2F
apprise -vv -b "Lambda alert fired" \
   "ses://sender:MySessionToken@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/recipient@example.com"
```

Example YAML configuration using named parameters:

```yaml
urls:
  - ses://:
      - key: AHIAJGNT76XIMXDBIJYA
        secret: bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
        region: us-east-2
        from: sender@example.com
        to: recipient@example.com
        token: MySessionToken
```
