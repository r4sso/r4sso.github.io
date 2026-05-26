---
title: "Skip Internet Setup in Windows 10"
date: 2026-05-26
#lastmod: 2026-04-06T10:08:00Z
summary: "Bypass the mandatory internet connection requirement during Windows 10 setup."
categories: ["Guides", "Notes"]
tags: ["Windows"]
featured: false
---
## Introduction
I notice some versions of Windows 10 require an internet connection during the initial setup process. In certain installations, the **“I don’t have internet”** option may not appear, even if the Ethernet cable is unplugged or Wi-Fi is disconnected.

Here how you can bypass it.
## Steps
1. On the network setup screen, press `SHIFT + F10` to open Command Prompt.
2. In the Command Prompt window, run the following command:
```cmd
OOBE\BYPASSNRO
```

Windows will automatically reboot. After restarting, the setup process will continue, and the “I don’t have internet” option should now be available.

You can then proceed with creating a local account without connecting to the internet.
## References
- [Installing windows 10 without using microsoft account for login - forum.level1techs.com](https://forum.level1techs.com/t/installing-windows-10-without-using-microsoft-account-for-login/224710)
- [bypass "lets connect you to a network" - learn.microsoft.com](https://learn.microsoft.com/en-us/answers/questions/4276415/bypass-lets-connect-you-to-a-network)
