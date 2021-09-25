---
layout: default
title: Basic concept of TCP/IP
parent: Networking
permalink: /notes/network/tcpip
---

## Basic Concepts of TCP/IP

In this section will be given an introduction to the basic concepts and working methods of the TCP / IP Protocol which is the basis for the formation of the Internet network. Through this introduction the reader is expected to acquire a strong foundation to understand higher concepts & technologies.

TCP / IP usually exists in Unix operating systems or its derivatives. Although the development is actually separate but the history of the two is very close, especially since 4.2BSD Unix began to incorporate the TCP / IP protocol into it. Today, the TCP / IP protocol is available in many operating systems and is an integral part of the OS / 2, OS / 400, and Windows 9x / NT / 2000 / XP operating systems, as well as various Unix variants.

### Basic TCP/IP Architecture

Data communication is the process of sending data from one computer to another. Through Network Interface Card (NIC) equipment or LAN card, data communication between computers is usually done. The NIC / LAN cards used vary greatly depending on the type of physical channel used.

There are some issues that need to be resolved in submitting data. First, the data must be able to be sent to the correct computer, according to its purpose. This would be complicated if the destination computer for this data transfer was not on a local network, but in a remote place. If the locations of computers that communicate with each other "remotely" (via a network) then there is a possibility that the data is damaged or lost. Therefore, there needs to be a mechanism to prevent this data corruption.

Another thing to keep in mind is that on a computer for data transfer purposes, there may be more than one application waiting for data to arrive. The data sent must reach the right application, on the right computer, without errors.

The natural way to tackle a complicated problem is to break it down into smaller parts. In solving the above data transfer problem, computer network experts do the same. For each data communication problem, special solutions are made in the form of rules to overcome the problem. To overcome all data communication problems, the whole of these rules must work together. This set of rules to govern the process of sending data is called a data communication protocol. This protocol is implemented in the form of computer programs (software) found on computers and other data communication equipment.

TCP / IP is a set of protocols designed to perform data communication functions on a Wide Area Network (WAN). TCP / IP consists of a group of protocols that are each responsible for a specific part of data communication. In more formal languages, the design of the TCP / IP protocol is modular. Thanks to this principle, the task of each protocol becomes clear and simple. One protocol does not need to know how another protocol works, as long as it is still able to send and receive data to each other.

Thanks to the use of this modular principle, TCP / IP has become a flexible data communication protocol. The TCP / IP protocol can be easily applied to all types of computer and network interfaces, as most of the content of this protocol is not specific to a single computer or network equipment. In order for TCP / IP to run on a particular network interface, it is only necessary to make changes to the protocol associated with the network interface.
