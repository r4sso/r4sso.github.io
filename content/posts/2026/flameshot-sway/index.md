---
title: "Configure Flameshot with Sway"
date: 2026-04-21
#lastmod: 2026-04-06T10:08:00Z
summary: "A guide to install and configure Flameshot with Sway."
categories: ["Guides"]
tags: ["linux", "sway", "wayland"]
featured: false
---
## Introduction
[Flameshot](https://github.com/flameshot-org/flameshot) is a powerful and simple-to-use screenshot tool. You can use it on Windows, macOS and Linux. I have been using it in college for my assignments since it has tons of drawing tools. You can just copy and paste without manually editing the screenshot files.

## Installation
Install Flameshot and Grim:
```bash
doas apk add flameshot grim
```

## Configuration 
Configure Flameshot to use Grim since we are on Wayland.
```bash
~/.config/flameshot/flameshot.ini

[General]
disabledTrayIcon=true
useGrimAdapter=true
disabledGrimWarning=true
```

Set Sway to use Flameshot when the Print key is pressed. Add the following to your Sway config:
```bash
~/.config/sway/config

## Required for copy to clipboard to work.
exec /usr/bin/flameshot

## Screenshot
bindsym Print exec flameshot gui
```
