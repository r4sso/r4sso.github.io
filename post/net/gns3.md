---
layout: default
title: GNS3
parent: Networking
permalink: /notes/net/gns3
---

# GNS3
Graphical Network Simulator-3 (shortened to GNS3) is a network software emulator first released in 2008. It allows the combination of virtual and real devices, used to simulate complex networks. It uses Dynamips emulation software to simulate Cisco IOS.

* * *
## Installation
### Debian Based:
{% highlight shell %}
sudo apt update
sudo apt install -y python3-pip python3-pyqt5 python3-pyqt5.qtsvg \
python3-pyqt5.qtwebsockets \
qemu qemu-kvm qemu-utils libvirt-clients libvirt-daemon-system virtinst \
wireshark xtightvncviewer apt-transport-https \
ca-certificates curl gnupg2 software-properties-common
{% endhighlight %}

Install GNS3 from Pypi:
{% highlight shell %}
pip3 install gns3-server
pip3 install gns
{% endhighlight %}

Install dynamips:
{% highlight shell %}
sudo apt install dynamips
{% endhighlight %}

Install ubridge:
{% highlight shell %}
git clone https://github.com/GNS3/ubridge.git
{% endhighlight %}

Dependencies
{% highlight shell %}
sudo apt install libpcap-dev
{% endhighlight %}

{% highlight shell %}
cd ubridge 
sudo make install 
{% endhighlight %}

