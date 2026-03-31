---
title: Deploy pihole + unbound on alpine
date: 2023-07-11
lastmod: 2023-07-17T04:16:00Z
summary: "Basic walkthrough deploying pihole with unbound on alpine linux using docker."
categories: ["Guides"]
tags: ["docker", "pihole", "alpine"]
---

## What is pihole?
Pi-hole is a Linux network-level advertisement and Internet tracker blocking application which acts as a DNS sinkhole and optionally a DHCP server, intended for use on a private network.It works by intercepting DNS requests made by devices on your network and blocking requests to domains you provide on the [adlist](https://firebog.ne) such as (.eg.,advertisements/tracking/phishing domains.) 

## What is unbound?
Unbound is a validating, recursive, caching DNS resolver. It is designed to resolve domain names by starting from the root DNS servers and recursively traversing the DNS hierarchy until it obtains the final IP address associated with a domain.

- - -
There are many ways to deploy Pi-hole and Unbound on Alpine Linux, but the easiest way is to use Docker with Docker Compose. In this article, I'll be using the official Pi-hole image. If you're interested in a bundled image that already includes Unbound, you can check out the repository at [github.com/chriscrowe/docker-pihole-unbound](https://github.com/chriscrowe/docker-pihole-unbound)

### Enable community repository
Use editor of your choice & uncomment community repository in `/etc/apk/repositories`
```bash
#/media/cdrom/apks
https://ap.edge.kernel.org/alpine/v3.17/main
https://ap.edge.kernel.org/alpine/v3.17/community
```



### Install docker + docker-compose
```bash
apk update
apk add docker docker-cli-compose
```


### Create `docker-compose.yaml`
The configuration below uses [macvlan](https://docs.docker.com/network/drivers/macvlan/) network driver. This allows you to assign different IP addresses and set your own without using the same IP as the host machine.

If you want to change the IP address, ensure that you set the `FTLCONF_LOCAL_IPV4` to match your IP of your Pi-hole you just set, and change `PIHOLE_DNS_` to your unbound IP (.e.g, 192.168.0.6#53).
**Make sure to use the `#` symbol to specify the ports.**

Please refer to the documentation for more details: [github.com/pi-hole/docker-pi-hole](https://github.com/pi-hole/docker-pi-hole)

```yaml
version: "3"

# More info at https://github.com/pi-hole/docker-pi-hole/ and https://docs.pi-hole.net/
services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    # For DHCP it is recommended to remove these ports and instead add: network_mode: "host"
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "67:67/udp" # Only required if you are using Pi-hole as your DHCP server
      - "80:80/tcp"
    environment:
      TZ: 'Asia/Singapore'
      WEBPASSWORD: '' # set a secure password here or it will be random
      FTLCONF_LOCAL_IPV4: 192.168.0.5
      PIHOLE_DNS_: '192.168.0.6#53'
      DNSSEC: true
      RATE_LIMIT: 1/3600
    # Volumes store your data between container upgrades
    volumes:
      - './etc-pihole:/etc/pihole'
      - './etc-dnsmasq.d:/etc/dnsmasq.d'
    #   https://github.com/pi-hole/docker-pi-hole#note-on-capabilities
    cap_add:
      - NET_ADMIN # Required if you are using Pi-hole as your DHCP server, else not needed
    networks:
      home:
        ipv4_address: 192.168.0.5
    restart: unless-stopped
   
  unbound:
    container_name: unbound
    image: mvance/unbound:latest
    ports:
      - "53:53/tcp"
      - "53:53/udp"
    networks:
      home:
        ipv4_address: 192.168.0.6
    restart: always
    

networks:
  home:
    driver: macvlan
    driver_opts:
      parent: eth0
    ipam:
      config:
        - subnet: 192.168.0.0/24
          gateway: 192.168.0.1
          ip_range: 192.168.0.5/30 # 192.168.0.5 and 192.168.0.6
```

The IP addresses set above are as follows:
- Pi-hole: 192.168.0.5
- Unbound: 192.168.0.6

Start the Docker container:
```bash
docker-compose up -d
```
http://[your_pihole_ip]/admin