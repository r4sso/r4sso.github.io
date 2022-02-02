---
layout: default
title: Inclusion
parent: TryHackMe
grand_parent: CTF (writeup)
last_modified_date: 1 FEB 2022
permalink: /ctf/tryhackme/inclusion.html
---
Local File Inclusion (LFI)
{: .label}

Room: [tryhackme.com/room/inclusion](https://tryhackme.com/room/inclusion)

## Reconnaissance
nmap scan show the target has ssh.
![nmap](/images/inclusion00.jpg)


## Gain access
Hint1: read passwd file
![passwd](/images/inclusion01.jpg)
It's show the username is faclonfeast & the password.

![ssh](/images/inclusion02.jpg)
<br> and its work! :D
We just got the user flag

## PrivEsc
![sudo -l](/images/inclusion03.jpg)
Lets do some research. I recommend to use [gtfobins.github.io](https://gtfobins.github.io/gtfobins/socat/)

![privesc](/images/inclusion04.jpg)

Here we go, we got root privileges & root flag. 
