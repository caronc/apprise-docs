---
title: Reminders
description: Schedule notifications from Apprise Mobile to be sent later, once or on a repeating schedule.
sidebar:
  label: Reminders
  order: 2
---

A reminder is a notification you write now and your Apprise API server sends later. It can be sent once, on a repeating schedule (every day, every second Tuesday, the first of each month), or on a public holiday every year.

Reminders live on your Apprise API server, not on your phone. Once one is saved, the server sends it on time even when your phone is switched off.

## What You Need

Reminders appear in Apprise Mobile only for a server that offers them:

- An Apprise API version with reminders, with reminders turned on (`APPRISE_REMINDER_ENABLED`, on by default) and stateful mode available.
- The reminder scheduler running on the server. When it is stopped, reminders can still be saved, and the app warns you that they won't be sent until it runs again.
- If authentication is enabled, an administrator login or a configuration login with **user** access.

Apprise Mobile checks this for each of your configurations. A configuration that cannot take reminders is simply left out. See [Reminders](/api/endpoints/#reminders) in the Apprise API documentation for the server side.

## The Reminders Screen

Tap **Reminders** in the bar at the bottom of the screen. You can switch between two views:

- **Agenda**: a calendar of the month, with a dot under each day something is due. Below it, every time a reminder will be sent, grouped by day. Use the arrows to move between months. Tap a day to list just that day (tap it again to see the whole month); **Add Reminder** then starts the new reminder on that day.
- **All**: one card per reminder, including paused and finished ones. Each card shows how it repeats, when it is next sent, and how its last send went.

The Agenda lists every server's reminders together. Paused reminders show faded in both views.

Reminders are kept on your phone once downloaded, so the screen opens straight away and still shows them when you're offline. They are downloaded again on the same schedule as the Dashboard's lists (**Refresh Service Lists** in Settings), and after you change one in the app. Pull down on either view to download them again now.

Swipe a reminder **right** to send it now, without changing when it is next due. A notice says it's sending straight away, then how it went; swiping again before it finishes doesn't send it twice. Swipe it **left** to pause it, or to resume a paused one.

## Adding a Reminder

Tap **Add Reminder**. The message screen opens with its **Reminder** section already switched on. You can also switch the Reminder section on yourself whenever you write a message.

While the Reminder section is on, the **Send** button becomes **Schedule**: nothing is sent now, and the message is saved as a reminder instead.

The Reminder section has the same fields as the Apprise API web page:

- **Name**: what the reminder is called in your lists. Left empty, the title or the first line of the message is used.
- **Send on**: a date you pick, or a public holiday. For a holiday, pick the country (it starts as your phone's own region setting; no location is used), an optional region, and the holiday itself.
- **Time zone**: the time zone the date and time are read in. It starts as the one you last picked, or else your phone's. If neither is in the list, the field starts empty and a zone must be picked before saving.
- **Date and time**: when it is sent. For a repeating reminder this is when it starts, and it can be left as **Now**.
- **Make recurring**: switch on to repeat it.
- **Ends**: an optional last day for a repeating reminder.
- **Every**: how often it repeats, for example every 2 weeks. Choose **Custom (crontab)** to type your own five-part crontab rule.
- **Drift**: moves every time a little later, or earlier with a minus sign. For example, `-1` week sends a holiday reminder a week before the day.
- **Days** and **Months**: keep a repeating reminder to certain weekdays or months.

The **Upcoming** list under the fields shows the next few times your server will send it, and updates as you change the fields.

### Scheduling Without a Connection

Scheduling works the same way as sending. Each scheduled message shows in **Tasks**, marked with an alarm, and reports whether each server saved its reminder. Open Tasks and use the switch at the top to move between **Tasks** and **Queued**.

When a server can't be reached (no network, or the server is down), the reminder waits and is saved as soon as the server answers again, just like a message waiting to be delivered. On the full version you can carry on working while it waits, and follow it under **Queued**. The Reminders screen says how many reminders are still waiting.

Opening a scheduled task offers **Schedule Again**, which reopens the message with the same schedule.

### Sending to Several Servers

A reminder belongs to one configuration on one server. When your message is addressed to more than one, Apprise Mobile saves one reminder for each of them, and the Reminder section lists them before you schedule.

URLs you picked one at a time are saved with the reminder on their own server only. They are never copied to another server. A server that does not keep URLs with reminders leaves its picked URLs out, and the Reminder section tells you which ones.

## Reminding Yourself of a Sent Message

Open a message you already sent from **Tasks** and tap the alarm button at the top. The message opens again, addressed the same way, with its Reminder section switched on. Pick when it should be sent and tap **Schedule**.

## Changing a Reminder

Tap a reminder to change it. In the Agenda view, tapping one time of a repeating reminder asks whether to change **This Time** only or the **Whole Series**.

A reminder opens on the same screen you write messages on, with its Reminder section switched on. The switch is locked while you change a saved reminder, and the bottom of the screen shows **Cancel** and **Save** instead of **Send**. Anything you were writing before is put aside and comes back once you save or cancel.

- **Targets**: tap the target count to see the reminder's targets. Only its own configuration's tags, URLs and Local URLs are listed, with the ones it uses already picked. A URL only the reminder holds (one added on the Apprise API web page, say) is marked **Only in this reminder**. Changing these only changes the reminder, never your configuration or Local URLs.
- **Untagged services**: with URLs of its own and no tags, **Also send to untagged services** in the Reminder section sends it to the configuration's untagged services as well. The same switch shows when you schedule a new reminder that way.
- **Attachments**: tap the paperclip. Files and web addresses already saved with the reminder are listed by name and marked **Saved with the reminder**; nothing is downloaded to show them. Remove any with the bin button, or add new ones, which are uploaded to your server when you tap **Save**.

The start date can be any date, even one in the past, so an older reminder can be opened and saved as it is. A one-off whose time has passed is not sent; a repeating one carries on from its next time. The end date can't be earlier than the start.

Each reminder also has a menu with these choices:

- **Edit**: change the message, its tags, or its schedule.
- **Pause** and **Resume**: stop it from being sent for now, without removing it.
- **Duplicate**: start a new reminder copied from this one.
- **Delete Entry**: remove a one-off reminder, or, in the Agenda view, just that one time of a repeating reminder.
- **Delete Series**: remove a repeating reminder and every time it would be sent. It only shows for a reminder that repeats.

A reminder whose server can't be reached right now can't be changed: its menu shows faded, and tapping it explains why.

## Free and Full Versions

Reminders are part of the free version. The free version manages your first 3 reminders, counted from the oldest, including any made on the Apprise API web page. Reminders past those 3 stay on your server and keep being sent; they appear greyed out in the app, and tapping one explains how to unlock them.

Reminders still waiting to be saved count toward the 3 as well. Once the free version has 3 reminders, the **Add Reminder** button and the message screen's Reminder switch are greyed out. Tapping either explains the limit: unlock the full version, or delete a reminder to make room.

The full version has no app limit. Limits set on the server still apply.

## Troubleshooting

**The Reminders screen says reminders aren't available.** Make sure your server supports reminders and has them turned on. If authentication is enabled, check that your login has access. Then pull down to refresh.

**A server shows a warning that its scheduler isn't running.** Reminders are saved but not sent. Start the scheduler on that server.

**The Upcoming list shows an error.** The server could not work out times for the schedule as entered, for example an end date before the start. Adjust the fields named in the message.
