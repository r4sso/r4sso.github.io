---
title: "My Janky Home Server"
date: 2023-08-01
lastmod: 2024-02-28T09:35:00Z
featured: true
summary: "My first home server, janky but serve me well, and list of software I use."
thumb: "images/20230801_083003.jpg"
aliases: /server
alt: "My Home Server"
categories: ["projects"]
tags: ["server","linux","alpine"]
---

Yes, this piece of junk is my home server :V

I don't know exactly what this board is called, it was taken from all-in-one PC from an old ticketing machine a few years ago. Even though it isn't that powerful, it has served me well for years.
## Hardware
- CPU: Intel Celeron J1800 (2) @ 2.58 GHz
- RAM: 4GB DDR3L 1333Mhz
- Storage: 32GB mSATA 


## Software
I tried a couple of different operating systems, but `Alpine Linux` is the most suitable for my use and this machine. It's small, simple, and secure.

All the applications I self-hosted are containerized using `docker`.

- [Portainer](https://github.com/portainer/portainer) -  Web UI for managing Docker Containers
- [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome) - Network-wide Ad & Tracker blocking DNS server
- [Unbound](https://github.com/NLnetLabs/unbound) - Validating, recursive, caching DNS resolver. 
- [Homepage](https://github.com/benphelps/homepage) - A highly customizable homepage (or startpage / application dashboard) with Docker and service API integrations. 
- [FreshRSS](https://github.com/FreshRSS/FreshRSS) - Self-hosted RSS and Atom feed aggregator.
- [Calibre-Web](https://github.com/janeczku/calibre-web) - Web app for browsing, reading and downloading eBooks stored in a Calibre database 
- [CyberChef](https://github.com/gchq/CyberChef) - The Cyber Swiss Army Knife - a web app for encryption, encoding, compression and data analysis 
- [Syncthing](https://syncthing.net/) - Open Source Continuous File Synchronization 
