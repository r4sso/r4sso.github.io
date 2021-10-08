---
layout: default
title: IPv6
parent: Networking
permalink: /notes/net/ipv6.html
---

# IPv6

## What is IPv6?
<mark> Internet Protocol version 6 (IPv6) </mark> is the recent version of the Internet Protocol (IP), the communications protocol that provides an identification and location system for computers on networks and routes traffic across the Internet. IPv6 was developed by the Internet Engineering Task Force (IETF) to deal with the long-anticipated problem of IPv4 address exhaustion. 

IPv6 intended to replace IPv4, which is still used by the majority of traffic on the Internet until 2019. At the end of 2018, according to a Google survey,
> * More than 25% of networks connected to the Internet advertise IPv6 connections.
> * Google reports 49 countries have more than 5% of IPv6 traffic, and more new countries are joining.
> * Google reports 24 countries have more than 15% of IPv6 traffic.

This is far above the conditions in September 2013, where IPv6 traffic was only 2% of the world's Internet.

Device on the Internet are assigned a unique IP address for identification and location defitiniton allocated to communicate with other devices. With so many new devices connecting to the Internet, this need increases drastically compared to existing IPv4 addresses.<mark> IPv6 uses 128 bits </mark>, allowing 2^128, or 3.4 x 10^38 addresses, or more than 7.9 x 10^28 times IPv4, which uses only 32-bit addresses. IPv4 only allows 4.3 billion addresses. Since these two protocols are not designed to interoperate with each other, this makes the IPv6 transition process difficult.'

* * *
![terminology-en.svg](https://upload.wikimedia.org/wikipedia/commons/5/5e/IPv6_address_terminology-en.svg)
IPv6 is a new <mark>layer 3 protocol</mark>  <mark> designed to replace IPv4 </mark>. IPv4 was designed in the past ( [RFC 760](https://tools.ietf.org/html/rfc760) / Internet Protocol from January 1980) and since its introduction, there has been a lot of demand for more addresses and increased capabilities. Specifications [RFC 2460](https://tools.ietf.org/html/rfc2460) / Internet Protocol Version 6 Last. 

The main change in IPv6 is the redesign of the header, including increasing the number of addresses from 32 bits to 128 bits. Because layer 3 is <mark>responsible for end-to-end packet transport</mark> using address-based packet routing, this layer must include new IPv6 addresses (source and destination), such as IPv4.

reference: [wikipedia.com](https://en.wikipedia.org/wiki/IPv6)
[lms.onnocenter.or.id](https://lms.onnocenter.or.id/wiki/index.php/IPv6:_Apa_itu_IPv6%3F)
{: .fw-700}

