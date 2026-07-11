---
title: "Data Overflow"
description: "Handling upstream services that can't sustain the data you're providing it"
sidebar:
  order: 10
---

## Introduction

Out of the box, Apprise passes the full message (and title) you provide right along to the notification source(s). Some sources can handle a large surplus of data while others might not. These limitations are documented (_to the best of my knowledge_) on each of the [individual services corresponding wiki pages](../../services/).

Use the **overflow** parameter when you want Apprise to handle these limits for you. Add it to your Apprise URL, for example:

- `schema://path/?overflow=split`
- `schema://path/?overflow=truncate`
- `schema://path/?overflow=upstream`
- `schema://path/?other=options&more=settings&overflow=split`

The possible **overflow=** options are defined as:

| Variable     | Description                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **split**    | Preserves the full message by dividing it into as many notifications as needed. Each chunk is sized for the plugin's documented service limit and sent in order. |
| **truncate** | Sends one notification containing only the beginning that fits within the plugin's documented service limit. The remaining content is discarded.                 |
| **upstream** | Passes the full body to the service and lets it enforce its own limit. This is the default.                                                                      |

:::caution
The **overflow=** option is a best-effort safeguard:

- Apprise prefers word boundaries when possible. It also tries to keep declared Markdown readable when a boundary cuts its formatting.
- Repair may add a few closing characters. A service with a strict limit can still reject the result.
- HTML tags and service-specific Markdown may not survive every split cleanly.
- `split` can turn one large body into many notifications. Be especially careful with SMS or mobile services, where every message may count toward your plan or appear on your phone bill. Use `truncate` when losing the end is safer than sending many messages.

:::
