---
layout: default
title: Ice
parent: TryHackMe
grand_parent: CTF (writeup)
permalink: /ctf/tryhackme/ice.html
---
Windows
{: .label }

CVE-2004-1561
{: .label .label-red }
Room: [tryhackme.com/room/ice](https://tryhackme.com/room/ice)

## Reconnaissance
1. run nmap w/ -p-, -A might useful :D
![ice-scan](/images/ice00.jpg)
OS-Information:
![ice-os](/images/ice01.jpg)

___
## Gain Access
1. Find more information about the vulnerability.
<div class="code-example" markdown="1">
Now that we've identified some interesting services running on our target machine, let's do a little bit of research into one of the weirder services identified: Icecast. Icecast, or well at least this version running on our target, is heavily flawed and has a high level vulnerability with a score of 7.5.
[cvedetails.com](https://www.cvedetails.com/)
</div>

Hint: [execute arbitrary code in an unauthenticated fashion./ From 2004]
![ice-cve](/images/ice02.jpg)
Seem matched w/ the hint :D

1. Start metasploit
1. Search exploit for icecast & use it :D
1. Set options required & run.

___
## Escalate
1. Once you get into meterpreter shell
1. Gain information about the system target
1. run the following command **`run post/multi/recon/local_exploit_suggester`**
1. Once you get the exploit including "eventwr". Background this shell **(CTRL+Z)**
1. Use the exploit you get before & set options required.
1. Yolo!
![ice-privec](/images/ice03.jpg)
1. We can now verify that we have expanded permissions using the command `getprivs`.

___
## Looting
1. Migrate to "spool"
1. Let's check what user we are now with the command `getuid`.
1. Use Mimikatz, `load kiwi`
![ice-kiwi](/images/ice04.jpg)
1. Retrieve all credentials w/ kiwi
![ice_creds](/images/ice05.jpg)

---
## Post-Exploitation
1. Question 1-5 (help)
1. Enable rdp `run post/windows/manage/enable_rdp`
