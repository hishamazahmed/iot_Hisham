Intel® XDK IoT Node.js\* Analog Pin Read App
============================================

See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

See also, the
[mraa library documentation](https://iotdk.intel.com/docs/master/mraa/index.html)
for details regarding supported boards and the mraa library API and the
[upm library documentation](https://iotdk.intel.com/docs/master/upm/) for
information regarding the upm sensor and actuator library APIs.

App Overview
------------

A simple Node.js application that reads an onboard analog input (an AIO input),
on select Intel IoT development boards, and displays the result of that read on
the console log.

The app initializes a single pin to analog input mode, so it can be read;
samples that analog input at a regular basis; and prints the result of each
read to the console. The specific pin that is read is configured in
`cfg-app-platform.js` and can be identified by looking for lines similar to the
following line of code, in the `cfg.init` method:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    io = opt.altPin ? io : 0 ;              // use alternate pin?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the example shown above, analog "pin 0" will be used for the analog input.
Note that on some boards the analog pin number does not correspond to the
header number, like it does for other I/O pin numbers.

**IMPORTANT:** the pin that is configured by the sample is a function of the
detected board. You **must** inspect the code to determine which pin is being
configured for use on your board!!

If you are using a NUC (aka "gateway") with an attached Arduino 101 board (aka
"firmata" configuration), the I/O pin is identified by adding 512 to the
respective I/O pin number, as it would be identified on the Arduino 101
device. See the comments in the `cfg-app-platform.js` module for details.

Once you have identified the AIO pin that is being read, you can use a jumper
wire to change the input value of that analog input by connecting one end of the
jumper wire to the initialized analog input and the other end of the jumper to
the various voltage pins or GND point on your board's header. Most boards have
a +3.3V and a +5V pin, some also have a +1.8V pin; all can be used for a quick
simple test of the analog input. A greater range of input voltages can be
sampled by using an I/O mezzanine or "shield" that fits your board and an
appropriate potentiometer.

Most boards have multiple pins that can be configured for use as a analog input.
The `cfg-app-platform.js` module has been designed so you can override the pin
that is used, by passing it an alternate pin during the init call (see the module
documentation). Or, you can simply modify the code to change the default value.

Important App Files
-------------------

* main.js
* package.json

Important Project Files
-----------------------

* README.md
* LICENSE.md
* \<project-name\>.xdk

Tested IoT Node.js Platforms
----------------------------

* [Intel® Galileo Board for Arduino](http://intel.com/galileo)
* [Intel® Edison Board for Arduino](http://intel.com/edison)
* [Intel® Joule™ 570x Developer Kit](http://intel.com/joule)
* [Intel® NUC DE3815] + [Arduino 101](http://intel.com/arduino)
* [Intel® NUC5i7RYH] + [Arduino 101](http://intel.com/arduino)

[Intel® NUC DE3815]: http://ark.intel.com/products/78577/Intel-NUC-Kit-DE3815TYKHE
[Intel® NUC5i7RYH]: https://ark.intel.com/products/87570/Intel-NUC-Kit-NUC5i7RYH

> See the [Intel® NUC support page](http://www.intel.com/nucsupport)
> and the [Intel Product Specifications](http://ark.intel.com/) search tool
> for detailed hardware specifications and support.

This sample can run on other IoT [Node.js](http://nodejs.org) development
platforms, but they must include the appropriate sensor hardware or have an
attached Arduino 101 board and utilize the `imraa` service. If you use an IoT
device that is not listed above you may have to make changes to the I/O
initialization and configuration code in the `cfg-app-platform.js` module
before it will work on those other platforms. See this
[device software prerequisites][1] page for help configuring the software on
your IoT device so it can be used with the Intel XDK.

[1]: https://software.intel.com/en-us/xdk/docs/target-device-software-prereqs
