---
layout: default
title: "Arch Linux: Installation"
parent: Arch based
grand_parent: Linux
nav_order: 1
permalink: /notes/linux/arch/install.html
---
### **Update the system clock**
{% highlight shell %}
timedatectl set-ntp true
{% endhighlight %}

### **Partition the disks**
Display all partition:
{: .fs-3}
{% highlight shell %}
fdisk -l
{% endhighlight %}

 Modify partition tables:
{: .fs-3}
{% highlight shell %}
fdisk /dev/the_disk_to_be_partitioned
{% endhighlight %}

### **Format the partitions**
{% highlight shell %}
mkfs.ext4 /dev/root_partition
{% endhighlight %}

If swap available:
{: .fs-3}
{% highlight shell %}
mkswap /dev/swap_partition
{% endhighlight %}

### **Mount the file systems**
Mount the root volume to **/mnt**. For example, if the root volume is **/dev/root_partition**: 
{: .fs-3}
{% highlight shell %}
mount /dev/root_partition /mnt
{% endhighlight %}
If you created a swap volume, enable it with swapon:
{% highlight shell %}

{% endhighlight %}

## **Installation**
* * *
### **Select Mirror**

**CAN DO THIS LATER**

Select mirror here::
[mirrorlist](https://archlinux.org/mirrorlist/?ip_version=6)
To enable mirrors, edit **/etc/pacman.d/mirrorlist**
Example: 
{: .fs-3}
{% highlight shell %}
Server = http://mirror.cj2.nl/archlinux/$repo/os/$arch
{% endhighlight %}

{% highlight shell %}
pacman -Syyu
{% endhighlight %}

### **Install essential packages**
{% highlight shell %}
pacstrap /mnt base linux linux-firmware
{% endhighlight %}

## **Configure the system**
* * *
### **Fstab**
Generate an Fstab file:
{: .fs-3}
{% highlight shell %}
genfstab -U /mnt >> /mnt/etc/fstab
{% endhighlight %}

### **Chroot**
Change root into the new system:
{: .fs-3}
{% highlight shell %}
arch-chroot /mnt
{% endhighlight %}

### **Timezone**
Set Timezone:
{: .fs-3}
{% highlight shell %}
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
{% endhighlight %}
Generate /etc/adjtime
{: .fs-3} 
{% highlight shell %}
hwclock --systohc
{% endhighlight %}

### **Localization**
Edit **/etc/locale.gen** and uncomment **en_US.UTF-8 UTF-8**
Generate locales:
{: .fs-3}
{% highlight shell %}
locale-gen
{% endhighlight %}

### **Network configuration**
Create hostname file:
{: .fs-3}
{% highlight shell %}
/etc/hostname

myhostname
{% endhighlight %}

Add matching entries to hosts:
{: .fs-3}
{% highlight shell %}
/etc/hosts

127.0.0.1   localhost
::1         localhost
127.0.1.1   myhostname
{% endhighlight %}

### **Root password**
Set root password:
{: .fs-3}
{% highlight shell %}
passwd
{% endhighlight %}

### **Boot loader**
Install GRUB:
{: .fs-3}
{% highlight shell %}
pacman -S grub
{% endhighlight %}
{% highlight shell %}
grub-install --target=i386-pc /dev/sdX
{% endhighlight %}
Generate grub config:
{: .fs-3}
{% highlight shell %}
grub-mkconfig -o /boot/grub/grub.cfg
{% endhighlight %}


## Reboot
Exit chroot env:
**exit**
or
**Ctrl+d**

