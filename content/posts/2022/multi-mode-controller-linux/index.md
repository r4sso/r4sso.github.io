---
title: "Fix EasySMX SL-9111 Detected as Nintendo Controller on Linux"
date: 2022-02-08
lastmod: 2025-03-31T10:08:00Z
summary: "A quick guide to fix a generic multi-mode controller being incorrectly detected as the wrong controller in Linux by blacklisting a module."
tags: ["linux"]
---
## Introduction
I hava a generic Xbox game controller ([EasySMX SL-9111](https://www.easysmx.com/blogs/easysmx-controllers/easysmx-sl-9111-wired-gaming-controller-review-some-premium-features-at-a-budget-friendly-price)) that supports multiple modes: Xbox and Nintendo. The problem is that, even when it is not in Nintendo controller mode, it is still detected as a Nintendo Switch Pro Controller.
## Solution
The easiest way to make it be detected as an Xbox controller is to blacklist Nintendo controller module  _hid_nintendo_.

Unload the module:

```
# modprobe -r hid_nintendo
```

Blacklist the module:
```
/etc/modprobe.d/nonintendo.conf

blacklist hid_nintendo
```

Then unplug the controller and plug it back in. If it doesn't work, try rebooting the system.


Read More: [wiki.archlinux.org/title/Kernel_module#Blacklisting](https://wiki.archlinux.org/title/Kernel_module#Blacklisting)


