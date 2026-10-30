---
title: "AMQP Notifications"
description: "Publish notifications to an AMQP message broker such as RabbitMQ."
sidebar:
  label: "AMQP"

source: https://www.amqp.org/

schemas:
  - amqp: insecure
  - amqps

has_selfhosted: true

body_formats:
  - text: default
  - markdown
  - html

keywords: "rabbitmq, activemq, artemis, qpid, azure service bus"

sample_urls:
  - amqp://{host}/{queue}
  - amqps://{user}:{password}@{host}/{queue}
  - amqps://{user}:{password}@{host}/?exchange={exchange}
  - amqps://{user}:{password}@{host}/?version=1.0&to={address}

limits:
  max_chars: 16777216
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

AMQP lets Apprise publish notifications through a message broker such as [RabbitMQ](https://www.rabbitmq.com/), Apache ActiveMQ Artemis, Apache Qpid, or Azure Service Bus. Consumers connected to the destination receive each message.

Two very different protocols share the AMQP name. Install the library for the one your broker speaks (or both):

| Version | Used by                                                             | Install                          |
| ------- | ------------------------------------------------------------------- | -------------------------------- |
| 0.9.1   | RabbitMQ (its default) and most brokers that call themselves "AMQP" | `pip install pika`               |
| 1.0     | ActiveMQ Artemis, Qpid, Azure Service Bus, RabbitMQ 4.0 and later   | `pip install python-qpid-proton` |

When you do not set `?version=`, Apprise uses **0.9.1** if `pika` is installed and **1.0** otherwise.

:::caution
Use `amqps://` for brokers outside a trusted network. The `amqp://` scheme does not encrypt credentials or messages.
:::

:::note
`python-qpid-proton` is built from source on Linux, so it needs a C compiler and the Python and OpenSSL development packages (for example `gcc`, `python3-devel` and `openssl-devel` on Fedora). On Fedora you can install `python3-qpid-proton` with your package manager instead. RHEL, Rocky Linux and similar systems get it from EPEL.
:::

### AMQP 0.9.1

Each target is a **routing key**. With the default exchange, use the name of an existing queue.

To publish to another exchange, add `?exchange=`. For example, `?exchange=amq.topic` with a target of `alerts.disk` reaches every queue bound to that topic. A fanout exchange broadcasts the message and needs no target.

Each message must reach at least one queue, otherwise the notification is reported as failed. Add `?mandatory=no` if you only want the broker to accept it.

### AMQP 1.0

Each target is an **address** (a queue or topic name). Exchanges do not exist in AMQP 1.0, so `?exchange=` and `?mandatory=` are ignored (with a warning) when `?version=1.0` is set.

RabbitMQ 4.0 and later expect addresses such as `/queues/alerts` or `/exchanges/amq.topic/alerts.disk`. Slashes split a normal URL path, so place these addresses in `?to=` and separate multiple addresses with commas: `?to=/queues/alerts,/queues/backup`.

To pick a RabbitMQ virtual host over AMQP 1.0, use `?vhost=vhost:name`.

## Syntax

Valid syntax is as follows:

- `amqp://{host}/{target}`
- `amqp://{host}:{port}/{target}`
- `amqp://{user}:{password}@{host}/{target}`
- `amqp://{user}:{password}@{host}:{port}/{target1}/{target2}/{targetN}`
- `amqp://{user}:{password}@{host}/?exchange={exchange}`
- `amqp://{user}:{password}@{host}/?version=1.0&to={address1},{address2}`

For a secure (TLS) connection, use `amqps://` instead:

- `amqps://{user}:{password}@{host}/{target}`
- `amqps://{user}:{password}@{host}:{port}/{target1}/{target2}/{targetN}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname   | Yes      | The broker you are sending your notification to.                                                                                                                                                                                                  |
| port       | No       | The port the broker is listening on. The default is **5672** for `amqp://` and **5671** for `amqps://`.                                                                                                                                           |
| user       | No       | The user to log in with. Without one, AMQP 0.9.1 uses the broker's `guest` account and AMQP 1.0 logs in anonymously.                                                                                                                              |
| password   | No       | The password for your user.                                                                                                                                                                                                                       |
| target     | No       | One or more routing keys (AMQP 0.9.1) or addresses (AMQP 1.0) to publish to. A target is optional only when AMQP 0.9.1 publishes to an `exchange`.                                                                                                |
| to         | No       | An alias of `target`. Use it for targets that contain a slash.                                                                                                                                                                                    |
| version    | No       | The AMQP version to use: `0.9.1` or `1.0`. Shorter forms such as `0.9` and `1` also work. `ver` is an alias. The default is `0.9.1` when `pika` is installed, otherwise `1.0`. Using `exchange` or `mandatory` without a version selects `0.9.1`. |
| exchange   | No       | AMQP 0.9.1 only. The exchange to publish to. The default is the broker's default exchange, which delivers straight to the queue named by each target.                                                                                             |
| vhost      | No       | The virtual host to use. The default is `/` for AMQP 0.9.1. For RabbitMQ over AMQP 1.0, use `vhost:name`.                                                                                                                                         |
| persistent | No       | Ask the broker to save messages to disk so they survive a restart. The default is `yes`.                                                                                                                                                          |
| mandatory  | No       | AMQP 0.9.1 only. Report a failure when a message does not reach any queue. The default is `yes`.                                                                                                                                                  |
| priority   | No       | The message priority, from `0` to `255`. Your queue must be set up for priorities for this to have an effect. Not set by default.                                                                                                                 |
| ttl        | No       | How long (in milliseconds) the message may wait in a queue before it expires. Not set by default, so it never expires.                                                                                                                            |
| +header    | No       | Adds a message header. For example `?+source=nas` attaches the header `source` with the value `nas`. Use as many as you like.                                                                                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Publish to the queue `alerts` on a local RabbitMQ:

```bash
apprise -vv -t "Disk Space" -b "The backup disk is 90% full" \
   "amqp://guest:guest@localhost/alerts"
```

Publish a high-priority message to two queues over TLS and expire it after one minute:

```bash
apprise -vv -b "The backup disk is 90% full" \
   "amqps://user:pass@rabbit.example.com/alerts/backup?priority=9&ttl=60000"
```

Publish to a topic exchange with a routing key and a custom header:

```bash
apprise -vv -b "The backup disk is 90% full" \
   "amqp://user:pass@localhost/alerts.disk?exchange=amq.topic&+source=nas"
```

Publish over AMQP 1.0 to a RabbitMQ queue:

```bash
apprise -vv -b "The backup disk is 90% full" \
   "amqp://user:pass@localhost/?version=1.0&to=/queues/alerts"
```

Publish over AMQP 1.0 to a queue on ActiveMQ Artemis or Qpid:

```bash
apprise -vv -b "The backup disk is 90% full" \
   "amqp://user:pass@localhost/alerts?version=1.0"
```

## Testing

RabbitMQ 4.0 and later support both AMQP 0.9.1 and AMQP 1.0, making it easy to try both versions locally with Docker:

```bash
# Start RabbitMQ; the web console is at http://localhost:15672 (guest/guest)
docker run --rm --name rabbitmq -p 5672:5672 -p 15672:15672 \
   rabbitmq:4-management

# Create a queue named "alerts" in the web console, then:
apprise -vvv -b "Hello over 0.9.1" "amqp://guest:guest@localhost/alerts"
apprise -vvv -b "Hello over 1.0" \
   "amqp://guest:guest@localhost/?version=1.0&to=/queues/alerts"
```
