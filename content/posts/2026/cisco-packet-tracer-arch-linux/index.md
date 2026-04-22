---
title: "Install Cisco Packet Tracer on Arch Linux"
date: 2026-04-07
#lastmod: 2026-04-06T10:08:00Z
summary: "A guide to install Cisco Packet Tracer on Arch Linux"
categories: ["Guides"]
tags: ["linux", "cisco"]
---
## Introduction
[packettracer](https://aur.archlinux.org/packages/packettracer/) is available on [AUR](https://aur.archlinux.org/), but it cannot be installed using automated method through an [AUR helper](https://wiki.archlinux.org/title/AUR_helper) because the `.deb` file must be downloaded first before building the package.

## Installation
### Prerequisites
First, acquire the build files for [packettracer](https://aur.archlinux.org/packages/packettracer/) package.

```bash
git clone https://aur.archlinux.org/packettracer.git
```

### Download Cisco Packet Tracer
Get Cisco Packet Tracer from [www.netacad.com/resources/lab-downloads](https://www.netacad.com/resources/lab-downloads?courseLang=en-US) (Login Required). Download and place the `.deb` file inside the folder where [packettracer](https://aur.archlinux.org/packages/packettracer/) build files are located (the same folder where is `PKGBUILD` is located).

It should look like this:
```bash
[r4sso@arch ~/Downloads/packettracer]$ ls
CiscoPacketTracer_900_Ubuntu_64bit.deb  PKGBUILD
```

### Build and install
Build and install [packettracer](https://aur.archlinux.org/packages/packettracer/) package:

```bash
makepkg -sic
```

### Usage
Packet Tracer will require a first run to accept the EULA via the command line:
```bash
/usr/lib/packettracer/packettracer.AppImage
```

## References
- [Packet Tracer - ArchWiki](https://wiki.archlinux.org/title/Packet_Tracer)



