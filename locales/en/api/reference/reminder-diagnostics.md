---
title: Reminder Diagnostics
description: How to read the diagnostics copied from a reminder, and check them with reminder_check.
sidebar:
  order: 4
---

When a reminder is not sent when you expected, its diagnostics show what the server knew about it at that moment. Paste them into a support ticket, or read them yourself with the tables below.

## Getting the Diagnostics

Select the bug icon (**Diagnostics**) on a reminder's card in the **Reminders** tab, or on a past send in its calendar. The dialog shows exactly what **Copy** will copy, and its **Redacted** switch picks how much:

- **Redacted** (on to start with) hides the reminder's name and tag, and keeps only the scheme of each URL and attachment address (such as `json://`), so how many there are, and of what kind, still shows.
- Turned off, the name, tag, URLs and attachments are shown in full, with the passwords and tokens in its URLs still hidden.

Either way, the reminder's title, body and the Config ID are left out. The text is copied inside a ` ```json ` block, so it reads well once pasted into a GitHub issue. Callers of the API get the same from `GET /reminder/{KEY}/{ID}/diagnostics`, adding `?privacy=yes` for the redacted version.

Diagnostics describe the whole reminder, not one of its times, so its card and its past send in the calendar give the same diagnostics.

## Times

Every time is an ISO 8601 date and time in UTC, such as `2026-11-17T14:00:00+00:00`. Only `server.time` is different: it is the moment the diagnostics were copied, read on the server's own clock with its offset, such as `2026-11-17T09:00:00-05:00`. Comparing it with `copied` shows how far the server's clock is from UTC, so each UTC time can be read as the server's log would show it. The reminder's own timezone is in `reminder.when.tz`.

## Top Level

| Field      | Meaning                                                                                                                                                                       |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`   | The layout's version.                                                                                                                                                         |
| `copied`   | When the diagnostics were copied. Every time is worked out again from this moment, not from when you read them.                                                               |
| `server`   | The server's clock and reminder settings. See [server](#server).                                                                                                              |
| `config`   | The configuration the reminder belongs to. See [config](#config).                                                                                                             |
| `versions` | The versions of everything that works out a reminder's times. See [versions](#versions).                                                                                      |
| `reminder` | The reminder: its schedule, where it sends, and how its last send went. See [reminder](#reminder).                                                                            |
| `upcoming` | The next 5 times it is due, as of `copied`, after skipped times, `until` and `count`. Fewer than 5 means it ends sooner. `null` when its time could not be worked out at all. |

## Server

| Field               | Meaning                                                                                                                        |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `time`              | The moment it was copied, on the server's own clock, with its offset. It matches the timestamps in the server's log.           |
| `tz`                | The server's timezone (`TZ`). `time` should read in this timezone; when it does not, `TZ` is not set up as expected.           |
| `scheduler_running` | Whether a scheduler was running. Without one, no reminder is sent.                                                             |
| `grace`             | `APPRISE_REMINDER_GRACE`: how many seconds late a reminder may still be sent. Later than this, it is skipped.                  |
| `idle_days`         | `APPRISE_REMINDER_IDLE_DAYS`: a configuration unused for this many days has its reminders paused. `0` turns this off.          |
| `workers`           | `APPRISE_REMINDER_WORKERS`: how many reminders are sent at once.                                                               |
| `urls_allowed`      | Whether reminders may send to their own URLs (`APPRISE_REMINDER_URLS_MAX` above `0`).                                          |
| `attach_allowed`    | Whether attachments are turned on (`APPRISE_ATTACH_SIZE` above `0`).                                                           |
| `auth_required`     | Whether logins are turned on (`APPRISE_AUTH_REQUIRED`). A configuration's access only affects its reminders while they are on. |

## Config

| Field       | Meaning                                                                                                                                                                                                          |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `saved`     | Whether a configuration is saved under the Config ID. `null` when that could not be told.                                                                                                                        |
| `access`    | The configuration's access: `user`, `locked`, `public` or `disabled`. `null` means it has no access record, so the administrator manages it. `unreadable` means it could not be read, so its reminders are held. |
| `last_used` | When the Config ID was last used.                                                                                                                                                                                |

## Versions

| Field         | Meaning                                                                                       |
| :------------ | :-------------------------------------------------------------------------------------------- |
| `apprise-api` | This server.                                                                                  |
| `apprise`     | The library that sends the notifications.                                                     |
| `dateblock`   | Works out the times a cron or repeating schedule matches.                                     |
| `holidays`    | The public holiday calendar.                                                                  |
| `python`      | The Python version the server runs on.                                                        |
| `tzdata`      | The timezone database, which holds each country's daylight saving rules. `null` when unknown. |

Two machines with different versions can work out different times, such as after a country changes its daylight saving rules or a holiday moves.

## Reminder

| Field                  | Meaning                                                                                                                                                                    |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | The reminder's ID. The server's log names reminders by it.                                                                                                                 |
| `name`                 | Its name, as listed in the **Reminders** tab.                                                                                                                              |
| `enabled`              | `false` while it is paused.                                                                                                                                                |
| `when`                 | Its schedule and timezone (`tz`): a one-off `at`, `at` with `every` to repeat, a `cron`, or a `holiday`, plus any `drift`. See [Reminders](/api/endpoints/#reminders).     |
| `start`, `until`       | The local date and time it starts from, and the one after which nothing more is sent.                                                                                      |
| `count`                | How many times it is sent before it stops.                                                                                                                                 |
| `runs`                 | How many times it has been due, counting ones skipped as late and failed sends.                                                                                            |
| `skip`                 | Times it is not sent at.                                                                                                                                                   |
| `next`                 | When it is next due, or `null` when nothing is left. A time before `copied` means it was due and had not been sent yet.                                                    |
| `last`                 | How its latest send went: when (`at`), whether every service took it (`ok`), and why not (`reason`, see below).                                                            |
| `series`, `occurrence` | Only on a one-off that stands in for one time of a repeating reminder: that reminder's ID, and the time it replaces.                                                       |
| `owner`                | Who added it: `admin`, or `user` for the configuration's own login.                                                                                                        |
| `created`, `updated`   | When it was added, and last changed.                                                                                                                                       |
| `tag`                  | Which of the configuration's services it sends to. Missing or `null` beside `urls` means it sends to its own URLs alone; `""` means the configuration's untagged services. |
| `urls`                 | The URLs of its own it sends to, with their passwords and tokens hidden.                                                                                                   |
| `attach`               | Its attachments: a stored file's `filename` and `size`, or a web address with its password hidden.                                                                         |

### Troubleshooting

| `last.reason`          | Meaning                                                                                          |
| :--------------------- | :----------------------------------------------------------------------------------------------- |
| `late`                 | It was overdue by more than `grace`, such as after the server was down, so it was skipped.       |
| `idle`                 | Its configuration went unused for `idle_days`, so its reminders were paused.                     |
| `urls`                 | It only sends to its own URLs, which the server no longer allows.                                |
| `config`               | It sends through a configuration, but none was found.                                            |
| `attach`               | Its attachments could not be used, such as a stored file gone missing or attachments turned off. |
| `error`                | Apprise could not send it at all.                                                                |
| none, with `ok: false` | It was sent, but one or more services did not take it. The server's log names them.              |

## Checking Diagnostics

`reminder_check` reads diagnostics, works their times out again with the same code the scheduler uses, and lists anything that would stop the reminder being sent. Save the copied text to a file, then run:

```bash
docker exec -i apprise python manage.py reminder_check < diagnostics.txt
```

Without the container, run `python manage.py reminder_check diagnostics.txt` from the `apprise_api` directory. Left without a file, it reads text pasted in until the end of input (`Ctrl+D`). The ` ```json ` fence may stay on.

Times in its report read on the copying server's clock, so they line up with that server's log. The reminder's own local time follows in brackets when it reads differently.

```text
Reminder   55aa137ab3a949c2937feb772afc9a13 (Standup)
Copied     2026-11-16 10:30:05 (2026-11-16 15:30:05 Europe/London) (server timezone America/Toronto, its clock read 2026-11-16T10:30:05-05:00)
Schedule   {"cron": "0 0 9 * * Mon-Fri", "tz": "Europe/London"}
Sends to   the configuration's untagged services
Limits     count 3, runs 0; 0 skipped times
Next       2026-11-17 04:00:00 (2026-11-17 09:00:00 Europe/London) (as saved)
Upcoming   2026-11-17 04:00:00 (2026-11-17 09:00:00 Europe/London); ... (worked out here)
Versions   apprise-api 2.1.0, apprise 2.2.0, dateblock 2.2.0, holidays 0.108, python 3.14.8, tzdata 2026e
Findings
  - No scheduler was running, so no reminder was being sent.
```

| Finding                                             | What to do                                                                                                                                           |
| :-------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| No scheduler was running                            | Start the scheduler. The container runs one; elsewhere, run `python manage.py scheduler` beside the web server (see [Deployment](/api/deployment/)). |
| The server's clock ... does not match its timezone  | The process reads a different timezone than `TZ` names. Check how `TZ` is set for every process, including the scheduler.                            |
| It is paused                                        | Resume it from its card.                                                                                                                             |
| It was due ... before this was copied               | It goes out once the scheduler looks again. Past `grace`, it is skipped as late instead.                                                             |
| It has nothing left to send                         | Its `count` was reached, its `until` passed, or a one-off was sent. Edit it to give it more times.                                                   |
| Its configuration is disabled                       | Change the configuration's access. Its reminders carry on from there.                                                                                |
| It sends through a configuration, but none is saved | Save a configuration under the Config ID, or send the reminder to its own URLs.                                                                      |
| The server no longer allows URLs in reminders       | The administrator turned them off. Send through the configuration instead.                                                                           |
| Attachments are turned off on the server            | The administrator turned them off. Remove the attachments.                                                                                           |
| Its configuration went unused                       | Use the Config ID, then resume its reminders, or raise `APPRISE_REMINDER_IDLE_DAYS`.                                                                 |
| Times or versions differ                            | The two machines work out times differently. Compare the versions, and update the older one.                                                         |

## Server Log

The scheduler logs each reminder by its ID, on lines that start with `REMINDER -`, so `grep` with the ID follows one reminder from when it was saved to when it was sent. Set `LOG_LEVEL=DEBUG` to also see each time it plans to wake up, each reminder it sends and when it is next due, and any held back with why. At `DEBUG`, the log also holds the text of every notification sent, so share only the `REMINDER -` lines in a public ticket.
