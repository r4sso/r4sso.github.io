---
title: "Install Cisco Packet Tracer on Alpine Linux"
date: 2026-04-04
lastmod: 2026-04-06T10:08:00Z
summary: "A guide to install Cisco Packet Tracer on Alpine Linux using distrobox."
categories: ["Guides"]
tags: ["linux"]
featured: true
---
## Introduction
Since Alpine Linux is uses musl instead of glibc, it is not possible to install Cisco Packet Tracer natively, nor when using a compatibility layer like [gcompat](https://git.adelielinux.org/adelie/gcompat). In this guide, you will it install using [distrobox][1].

## Installation
### Download Cisco Packet Tracer
Get Cisco Packet Tracer from [www.netacad.com/resources/lab-downloads](https://www.netacad.com/resources/lab-downloads?courseLang=en-US) (Login Required) and download the `.deb` file.

#### Prerequisites
Install the required packages:
```bash
doas apk add distrobox sudo 
```

#### Setup podman

Enable the cgroups[^1] service:
```bash
rc-update add cgroups
rc-service cgroups start
```

To run podman in rootless mode[^2], run the following commands. Replace `<USER>` with your username:
```bash
modprobe tun
echo tun >>/etc/modules
echo <USER>:100000:65536 >/etc/subuid
echo <USER>:100000:65536 >/etc/subgid
```

Restart your machine.

#### Setup distrobox

Create a debian container[^3]:
```bash
distrobox-create --name debian13 --image debian:13
distrobox enter debian13
```

#### Install Cisco Packet Tracer
In distrobox terminal:
```bash
sudo apt update
```

Install the required dependencies[^4]:
```bash
sudo apt install fuse libopengl0 libnss3 libpulse0 libqt5multimedia5 libqt5xml5 libqt5script5 libqt5scripttools5 libqt5sql5 
```

Go to the folder where you downloaded the `.deb` file earlier and install the package:
```bash
sudo apt install ./CiscoPacketTracer_900_Ubuntu_64bit.deb
```

After the installation is complete, export `packettracer` so you can launch it from Alpine:
```bash
distrobox-export --bin /usr/local/bin/packettracer --export-path ~/.local/bin/
```

Run `packettracer` and open `Advanced Settings`. Tick `Use internal web browser for Cisco Networking Academy login`. Log in. Now Packet Tracer is ready to use :)

[1]: https://distrobox.it/

[^1]: [https://wiki.alpinelinux.org/wiki/Podman#Configuration](https://wiki.alpinelinux.org/wiki/Podman#Configuratioin)
[^2]: [https://wiki.alpinelinux.org/wiki/Podman#Running_in_rootless_mode](https://wiki.alpinelinux.org/wiki/Podman#Running_in_rootless_mode)
[^3]: [https://wiki.alpinelinux.org/wiki/Distrobox#Running_graphical_programs](https://wiki.alpinelinux.org/wiki/Distrobox#Running_graphical_programs)
[^4]: [https://www.reddit.com/r/linux4noobs/comments/1aosn3p/how_to_install_cisco_packet_tracer_on_any_distro/](https://www.reddit.com/r/linux4noobs/comments/1aosn3p/how_to_install_cisco_packet_tracer_on_any_distro/)
