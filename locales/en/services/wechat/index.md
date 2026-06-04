---
title: "WeChat (WeCom Application) Notifications"
description: "Send notifications directly to WeCom users, departments, and tags using the WeCom Application Message API."
sidebar:
  label: "WeChat (WeCom)"

source: https://work.weixin.qq.com/

schemas:
  - wechat

limits:
  max_chars: 2048

sample_urls:
  - wechat://{corpid}:{corpsecret}@{agentid}/@all
  - wechat://{corpid}:{corpsecret}@{agentid}/{userid}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

This plugin uses the **WeCom Application Message API** to deliver notifications directly to users, departments, or tags within a WeCom (WeChat Work / Enterprise WeChat) organisation. No third-party service is required.

You will need three credentials from your WeCom admin console:

1. Sign in to the WeCom admin console at [https://work.weixin.qq.com/](https://work.weixin.qq.com/).
2. Go to **"Applications & Mini Programs" -> "Applications"** and create a new self-built application, or select an existing one.
3. Copy the **AgentID** shown on the application details page.
4. Go to **"My Enterprise" -> "Enterprise Information"** and copy the **CorpID**.
5. Back on the application page, click **"View"** next to **Secret** and copy the **App Secret**.

:::note
The App Secret is only shown once after it is generated. Store it securely.
:::

## Syntax

Valid syntax is as follows:

- `wechat://{corpid}:{corpsecret}@{agentid}/@all`
- `wechat://{corpid}:{corpsecret}@{agentid}/@{userid}`
- `wechat://{corpid}:{corpsecret}@{agentid}/@{user1}/@{user2}`
- `wechat://{corpid}:{corpsecret}@{agentid}/%23{deptid}`
- `wechat://{corpid}:{corpsecret}@{agentid}/+{tagid}`
- `wechat://{corpid}:{corpsecret}@{agentid}/@{user}/%23{dept}/+{tag}`

**Recipient prefix rules:**

| Prefix                  | Recipient type                                 | Example    |
| ----------------------- | ---------------------------------------------- | ---------- |
| `@`                     | WeCom user ID (optional input, always emitted) | `@johndoe` |
| `@all`                  | All users in the organisation                  | `@all`     |
| `%23` (URL-encoded `#`) | Department ID (numeric)                        | `%23100`   |
| `+`                     | Tag ID (numeric)                               | `+7`       |

:::note
**`@all` is a reserved keyword** that broadcasts to every member of the organisation. The bare form `all` (without `@`) is also accepted and treated identically. Both forms send to everyone, not to a user named "all".

The `@` prefix on regular user IDs is **optional when typing a URL by hand** — `johndoe` and `@johndoe` are both accepted. Apprise always emits the `@` prefix in generated URLs to keep all target types visually distinct.
:::

You can combine multiple recipients of different types in a single URL. At least one recipient must be specified.

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| corpid     | \*Yes    | The Corporation ID found under "My Enterprise" -> "Enterprise Information" in the WeCom admin console.                                                     |
| corpsecret | \*Yes    | The App Secret generated for the self-built application.                                                                                                   |
| agentid    | \*Yes    | The numeric Agent ID shown on the application details page.                                                                                                |
| targets    | No       | One or more recipients in the URL path. Use no prefix for user IDs, `@all` for the whole org, `%23` prefix for department IDs, and `+` prefix for tag IDs. |
| to         | No       | Comma-separated recipient list supplied as a query parameter (`?to=`) instead of in the URL path.                                                          |
| format     | No       | Set to `markdown` to send the notification body as a WeCom Markdown message; default is plain text.                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send to all users in the organisation:

```bash
# Replace with your actual CorpID, App Secret, and AgentID
apprise -vv -t "Test Title" -b "Test Message" \
   "wechat://wwCORPID:APPSECRET@1000002/@all"
```

Send to a specific user:

```bash
apprise -vv -t "Test Title" -b "Test Message" \
   "wechat://wwCORPID:APPSECRET@1000002/@johndoe"
```

Send to multiple users:

```bash
apprise -vv -t "Test Title" -b "Test Message" \
   "wechat://wwCORPID:APPSECRET@1000002/@alice/@bob/@charlie"
```

Send to a department (department ID 42):

```bash
apprise -vv -t "Test Title" -b "Test Message" \
   "wechat://wwCORPID:APPSECRET@1000002/%2342"
```

Send a Markdown-formatted notification:

```bash
apprise -vv -t "Test Title" -b "## Alert\nSomething happened." \
   "wechat://wwCORPID:APPSECRET@1000002/@all?format=markdown"
```

## See Also

Apprise also provides two related WeCom/WeChat integrations:

- **[WeCom Bot](../wecombot/)** -- sends to a WeCom group chat via a webhook key; simpler to set up but delivers to a group rather than individual users or departments.
- **[PushPlus](../pushplus/)** -- routes notifications through the PushPlus platform, which supports WeChat, WeCom, email, and SMS delivery from a single personal token.
