---
title: "Troubleshooting"
description: "Common issues, diagnostics, and fixes when Apprise notifications do not behave as expected."
sidebar:
  label: "Introduction"
  order: 1
---

The best thing you can do when troubleshooting problems with your notification is to work it out using the _apprise_ command line tool. You can add verbosity what is going on with the notification you're troubleshooting by simply specifying **-v**; the more v's you specify, the more verbose it gets:

```bash
# In the below example, I am trying to figure out why my mailto:// line
# isn't working:
apprise -vvv -t "test title" -b "test body" \
    "mailto://user:password@gmail.com"
```

The output can help you pinpoint what is wrong with your URL.

If the output appears cryptic, or you feel that you've exhausted all avenues, Don't be afraid to [open a ticket and ask here](https://github.com/caronc/apprise/issues). It greatly helps if you share the output received from your debug response. It might be just a simple tweak to your URL that is needed, otherwise we might have a good bug we need to solve.

Please feel free to join us on [Discord](https://discord.gg/EGg4rhmpC2); it's not a big community, but it's growing slowly. You may just find an answer here after asking.

Just be cautious as the debugging information can potentially expose personal information (such as your password and/or private access tokens) to the screen. Please remember to erase this or swap it with some random characters before posting such a thing publicly.

## Topics

The following topics have already been captured and documented here:

- [Error Messages](./error-lookup/)
- [Tag Matching](./tag-matching/)
- [URL Construction](./special-characters/)
- [Formatting Issues](./formatting-issues/)
- [Data Overflow](./data-overflow/)
- [PyInstaller Support](./pyinstaller/)
- [Resource Usage (RAM / Memory)](./resource-usage/)
