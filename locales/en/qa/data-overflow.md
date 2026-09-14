---
title: "Data Overflow"
description: "Split or shorten messages that exceed a service's limit"
sidebar:
  order: 10
---

## Introduction

Apprise normally sends your full message and title. Some services limit their
length. When known, these limits appear on the relevant
[service page](../../services/).

Use the **overflow** parameter when you want Apprise to handle these limits for you. Add it to your Apprise URL, for example:

- `schema://path/?overflow=split`
- `schema://path/?overflow=truncate`
- `schema://path/?overflow=upstream`
- `schema://path/?other=options&more=settings&overflow=split`

Choose one of these values:

| Variable     | Description                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **split**    | Preserves the full message by dividing it into as many notifications as needed. Each chunk is sized for the plugin's documented service limit and sent in order. |
| **truncate** | Sends one notification containing only the beginning that fits within the plugin's documented service limit. The remaining content is discarded.                 |
| **upstream** | Passes the full body to the service and lets it enforce its own limit. This is the default.                                                                      |

:::caution
Message limits vary between services, so this is a best-effort safeguard:

- Apprise tries to split between words.
- Formatting may change slightly when a message is split.
- A service may still reject a piece that is close to a strict limit.
- `split` can turn one large body into many notifications. Be especially careful with SMS or mobile services, where every message may count toward your plan or appear on your phone bill. Use `truncate` when losing the end is safer than sending many messages.

:::
