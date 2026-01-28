---
title: "Email Notifications"
description: "Send notifications using SMTP and built-in email providers."
sidebar:
  label: "Email"

schemas:
  - mailto: insecure
  - mailtos

has_attachments: true

sample_urls:
  - mailto://userid:pass@domain.com
  - mailtos://domain.com?user=userid&pass=password
  - mailtos://domain.com:465?user=userid&pass=password
  - mailtos://user@hotmail.com&pass=password
  - mailto://mySendingUsername:mySendingPassword@example.com?to=receivingAddress@example.com
  - mailto://userid:password@example.com?smtp=mail.example.com&from=noreply@example.com&name=no%20reply
---

<!-- SERVICE:DETAILS -->

## Using Built-In Email Services

If you are using one of the following Built-In E-Mail services, then setting up this notification service has never been easier. If the email provider you use isn't on the list, and you'd like to request it, just [open up a ticket](https://github.com/caronc/apprise/issues) and let me know. The alternative the the below list is to use a custom email server configuration; these are a little bit more complicated to set up, but still work great. Custom email configuration is discussed in the [next section](#using-custom-servers-syntax)

The following syntax works right out of the box:

- mailto://{user}:{app-password}@**yahoo.com**
- mailto://{user}:{password}@**gmail.com**
- mailto://{user}:{app-password}@**fastmail.com**
- mailto://{user}:{password}@**zoho.com**
- mailto://{user}:{password}@**yandex.com**
- mailto://{user}:{password}@**sendgrid.com**?from=noreply@{validated_domain}
- mailto://{user}:{password}@**qq.com**
- mailto://{user}:{password}@**163.com**

Secure connections are always implied whether you choose to use **mailto://** or **mailtos://**

**Note** Google Users using the 2 Step Verification Process will be required to generate an **app-password** from [here](https://security.google.com/settings/security/apppasswords) that you can use in the {password} field.

**Note** Yahoo Users will be required to generate an **app-password** from [here](https://help.yahoo.com/kb/SLN15241.html) that you can use in the {password} field.

**Note** Microsoft users must switch to using the [`azure://` Apprise plugin](/services/office365/) instead. More details can be found [here](./microsoft/).

**Note** Fastmail Users are required to generate a custom App password before you can connect it up to send email to (from a 3rd party tool like this one). You must assign the _SMTP_ option to the new App you generate. This Fastmail portion of this plugin currently supports [the following 116 domains](./fastmail/). Just make sure you identify the email address you're using when you build the mailto:// url and everything will work as intended.

**Note** SendGrid users just need to be sure to use a Validated Domain (through their service) as part of the required **from=** email address (on the URL) or it will not work. It's additionally worth pointing out that [sendgrid://](../sendgrid/) has its own separate integration as well if you do not need to use the SMTP service.

## Email Address Formatting

When defining your email address you want to send to, you can format them in 2 ways:

- Classic: `just.an.email@domain.com`
- Name/Email: `John<just.an.email@domain.com>`

Annotating your emails with names allow your delivered emails to have a nicer look/feel. You can also leverage these formats with the `from=` directive (defined below) allowing you to change who the email otherwise identifies who is sending it (providing your Mail Provider allows for it).

## Using Custom Servers Syntax

If you're using a specific SMTP Server or one that simply isn't in the _Built-In_ list defined in the previous section then things get a wee-bit more complicated.

First off, secure vs insecure emails are defined by **mailto://** (port 25) and **mailtos://** (port 587) where **mailtos://** will enable TLS prior to sending the user and password.

Here are some more example syntax you can use when doing the custom approach:

- `mailto://{user}:{password}@{domain}`
- `mailto://{user}:{password}@{domain}:{port}?smtp={smtp_server}`
- `mailto://{user}:{password}@{domain}:{port}?from={from_email}`
- `mailto://{user}:{password}@{domain}:{port}?from={from_name} <{from_email}>`

Using a local relay server that does not require authentication? No problem, use this:

- **mailto**://**{user}**:**{password}**@**{domain}**:**{port}**?from=**{from_email}**&to=**{to_email}**

Some mail servers will require your {user} to be your full email address. In these cases, you'll need to specify your username in the url as an attribute like so:

- **mailto**://**{password}**@**{domain}**:**{port}**?user=**{user}**

## Custom Syntax Examples

If your SMTP server is identified by a different hostname/domain than what is identified by the suffix of your email, then you'll need to specify it as an argument; for example:
If you want to adjust the email's ReplyTo address, then you can do the following:

- `mailtos://user:password@server.com?smtp=smtp.server.com&from=noreply@server.com`

You can also adjust the ReplyTo's Name too:

- `mailtos://user:password@server.com?smtp=smtp.server.com&from=Optional%20Name<noreply@server.com>`

To send an email notification via a smtp server that does not require authentication, simply leave out the user and pass parameters in the URL:

- `mailto://server.com?smtp=smtp.server.com&from=noreply@server.com&to=myemail@server.com`

Since URLs can't have spaces in them, you'll need to use '**%20**' as a place-holder for one (if needed). In the example above, the email would actually be received as _Optional Name_.

Got a local passwordless SMTP relay service you're hosting? No problem, the following URL will work:

- `mailto://localhost?from=john@example.ca`

### Multiple To Addresses

By default your `mailto://` URL effectively works out to be `mailto://user:pass@domain` and therefore attempts to send your email to `user@domain` unless you've otherwise specified a `to=`. But you can actually send an email to more then one address using the same URL. Here are some examples (written slightly differently but accomplish the same thing) that send an email to more then one address:

- `mailto://user:pass@domain/?to=target@example.com,target2@example.com`
- `mailto://user:pass@domain/target@example.com/target2@example.com`
- `mailto://user:pass@domain/Accounting<accounting@example.com>/Billing<billing@example.com>`

There is no limit to the number of addresses you either separate by comma (**,**) and/or add to your `mailto://` path separated by a slash (**/**).

The Carbon Copy (**cc=**) and Blind Carbon Copy (**bcc=**) however are applied to each email sent. Hence if you send an email to 3 target users, the entire _cc_ and _bcc_ lists will be part of all 3 emails.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                                                                                                     |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Yes      | The account login to your SMTP server; if this is an email you must specify this near the end of the URL as an argument. You can over-ride this by specifying `?user=` on the URL string.<br/>**Note:** Both the `user` and `pass` are not required if you're using an anonymous login.                                                                                                         |
| pass     | Yes      | The password required to send an email via your SMTP Server. You can over-ride this by specifying `?pass=` on the URL string.<br/>**Note:** Both the `user` and `pass` are not required if you're using an anonymous login.                                                                                                                                                                     |
| domain   | Yes      | If your email address was **<test@example.com>** then _example.com_ is your domain. You must provide this as part of the URL string!                                                                                                                                                                                                                                                            |
| port     | No       | The port your SMTP server is listening on. By default the port is **25** for **mailto://** and **587** for all **mailtos://** references.                                                                                                                                                                                                                                                       |
| smtp     | No       | If the SMTP server differs from your specified domain, then you'll want to specify it as an argument in your URL.                                                                                                                                                                                                                                                                               |
| from     | No       | Identify the address the email address associated with the email account being used. This is automatically otherwise detected from the Apprise URL an is not required. You can express this as a regular `user@email.com` or you can also set it as `A User<user@email.com>`.                                                                                                                   |
| to       | No       | This will enforce (or set the address the email is sent To). This is only required in special circumstances. The notification script is usually clever enough to figure this out for you.                                                                                                                                                                                                       |
| name     | No       | With respect to {from*email}, this allows you to provide a name with your \_Reply-To* address. <br/>**Note:** This field has become redundant and become synonymous to `from=`. It still behaves as it did in previous versions, but you can also follow the `A User<user@email.com>` syntax as well. To eliminate ambiguity; the values parsed from the `from=` will always trump the `name=`. |
| cc       | No       | Carbon Copy email address(es). More than one can be separated with a space and/or comma.                                                                                                                                                                                                                                                                                                        |
| bcc      | No       | Blind Carbon Copy email address(es). More than one can be separated with a space and/or comma.                                                                                                                                                                                                                                                                                                  |
| reply    | No       | Provide a Reply-To email (or set of). More than one can be separated with a space and/or comma.                                                                                                                                                                                                                                                                                                 |
| mode     | No       | This is only referenced if using **mailtos://** (a secure url). The Mode allows you to change the connection method. Some sites only support SSL (mode=**ssl**) while others only support STARTTLS (mode=**starttls**). The default value is **starttls**. If you define a `mode` with a `mailto://` declaration, it is upgraded to be a `mailtos://` when the URL is processed.                |

To eliminate any confusion, any url parameter (key=value) specified will over-ride what was detected in the url; hence:

- `mailto://usera:pass123@domain.com?user=foobar`: the user of `foobar` would over-ride the user `usera` specified. However since the password was not over-ridden, the password of `pass123` would be used still.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a email notification to our hotmail account:

```bash
# It's really easy if you're using a built in provider
# Built-In providers look after handling the little details such as
# the SMTP server, port, enforcing a secure connection, etc
apprise -vv -t "Test Message Title" -b "Test Message Body" \
    mailto:///example:mypassword@hotmail.com

# Send an email to a custom provider:
# Assuming the {domain} is example.com
# Assuming the {user} is george
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://george:pass123@example.com

# The above URL could also have been written like:
#  mailto://example.com?user=george&pass=pass123

# In some cases, the {user} is an email address.  In this case
# you can place this information in the URL parameters instead:
# Assuming the {domain} is example.com
# Assuming the {user} is george@example.com
# Assuming the {password} is pass123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailto://example.com?user=george@example.com&pass=pass123"

# Note that the ampersand (&) that is used in the URL to separate
# one argument from another is also interpreted by the CLI as
# run in the background.  So to make sure the URL sticks together
# and your terminal doesn't break your URL up, make sure to wrap
# it in quotes!

# Send an email to a smtp relay server your hosting on your box:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   mailto://localhost?from=john@example.ca
```

Users with custom SMTP Servers will require a slightly more complicated configuration:

```bash
# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use starttls (port 587)
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://_?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com"

# Notes (for above URL):
# - Since no `to=` was specified above, the `from` address is notified
# - mailtos:// defaults to starttls on 587; if you want to use port 465 (SSL)
#   you would just need to add `mode=ssl` to the parameter of your URL.

# Here is a more complicated example where you want to use `ssl` and a custom port

# Assuming the {smtp_server} is mail.example.com
# Assuming the {send_from} is joe@example.com
# Assuming the {login} is user1@example.com
# Assuming the {password} is pass123
# Assuming you want to use ssl on port 12522
# Assuming you want your email to go to bob@example.com and jane@yahoo.ca
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mailtos://example.com:12522?user=user1@example.com&pass=pass123&smtp=mail.example.com&from=joe@example.com&to=bob@example.com,jane@yahoo.ca&mode=ssl"

```
