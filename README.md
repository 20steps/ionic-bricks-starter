Ionic-Bricks-Starter app by 20steps
===================================

[Ionicframework](http://ionicframework.com) starter app skeleton using [Bricks by 20steps](http://20steps.de) as service layer in client and as backend for building professional mobile apps.

## About the Starter app

The starter app can be installed as a basis for crossplatform, rapid and hiqh quality mobile app development with two commands on the terminal (cp. section `Bootstrap` below), a few seconds of compute time and a high speed Internet connection.

The starter app provides a clean and structured SOA-oriented code skeleton, uses all relevant bricks for mobile apps and bundles some great [Apache Cordova plugins](http://cordova.apache.org/) and Javascript libraries.

Popular external web services are used for demonstration as stated below.

Custom controllers, views and services are included in the app as a starting point for custom development.

### Bricks by 20steps

* `Mobile` brick for device, user and connection management, push messaging and connecting to an [Apple Watch](https://github.com/20steps/cordova-plugin-watch/) companion app (using various [Apache Cordova plugins](http://plugins.cordova.io/))
* `Pages` brick for content management (e.g. using [Wordpress](https://wordpress.org/) or [Drupal](https://www.drupal.org/) kernel)
* `Found` brick for search (e.g. using [Apache Solr](http://lucene.apache.org/solr/) kernel)
* `Shop` brick for e-commerce (e.g. using [Magento](http://magento.com/), [Oxid](http://www.oxid-esales.com/) or [WooCommerce](http://www.woothemes.com/woocommerce/) kernel)
* `Places` brick for management and geocoding of points of interests (POIs, e.g. using [Google Maps](https://developers.google.com/maps/) kernel)
* `Control` brick for statistics including [Google Analytics](https://developers.google.com/analytics/) tracking (using various standard or proprietary sources for collecting basic data for KPIs)

The backend layer of Bricks uses Varnish Cache, Apache Webserver, Facebook HHVM, Symfony2 by SensioLabs, PHP and Hack and MariaDB as basic infrastructure hosted in a CentOS, OpenVZ and Proxmox based private cloud.

Visit our [downloads section](http://20steps.de/#!/en/downloads) for additional information including technical whitepapers about Bricks by 20steps, including answers to the question: `What is the kernel of a brick?`.

### Apache Cordova plugins

* Device: device and platform management
* Statusbar: management of the device status bar
* Console (for logging): log management
* Ionic Keyboard: configuration of the device keyboard
* Contacts: reading from and writing to the address book on the device
* Push notifications: receiving remote push notifications
* Geolocation: getting the location of the device using WiFi triangulation and GPS
* InAppBrowser: opening an In-App browser for links to web pages in the app to optimize usage of the app
* Vibration: making the device vibrate
* SQLite: storing relational data on the device

Additional [Apache Cordova plugins](http://plugins.cordova.io/) can be added at will.

### Javascript libraries

* [AngularJS](https://angularjs.org/): extensible application framework for mobile and web apps powered by Google.
* [Bricks for AngularJS](http://20steps.de): service layer for accessing Bricks backend services in hybrid mobile apps as well as single page web apps (SPAs)
* [ngCordova](http://ngcordova.com/): AngularJS wrappers for popular Apache Cordova plugins
* [jQuery](http://jquery.com/): still the best in town for DOM manipulation
* [Underscore](http://underscorejs.org/): structured object manipulation in JavaScript
* Angular Local Storage: key/value storage on the device
* Angular Translate: localization
* Angular UI Router: state-oriented routing in the app
* Angular Animate: CSS3 animations esp. during view changes
* Angular Encode URI: encoding URI (components)
* Angular UTF8 / Base64: base64 encoding data
* Angular Sanitize: escaping / sanitizing HTML for security
* Angular YouTube Player: embedding the YouTube player, the Angular way
* Moment.js and Livestamp.js: date formatting including live updates

Additional JavaScript libraries can be added and kept up to date using [Bower](http://bower.io/) easily.

### Additional tools and components

As part of the starter app some additional tools and components will be installed and configured.

* [Genymotion](https://www.genymotion.com/): a fast Android runtime alternative (goto website to create a free account)
* [Crosswalk](https://crosswalk-project.org/): a browser rejuvenation for old Android version

Please let us [know](mailto:hello@20steps.de) if we should include your great tool in this starter app.

### Web services

* [Google Analytics API v3](https://developers.google.com/analytics/): used for usage tracking
* [Google Maps API v3](https://developers.google.com/analytics/): used for geocoding and mapping
* [YouTube API v3](https://developers.google.com/youtube/v3/): used for synchronizing the 20steps YouTube playlist with the app

The starter app is prepared for injecting additional webservices at ease.

## Setup basic toolset

The following is needed only once before creating the first app.

### Mac OS X, Yosemite and XCode

If not yet done, update to the latest version of Mac OS X, Yosemite and install XCode from the Apple AppStore.

### What about Linux or Windows?

If you do not use Mac OS X for your development machine please skip to the `Bootstrap` section below. Pull-requests for enhancing this documentation to describe prerequisites for Linux are welcome.

### Homebrew and various packages

If the Mac OS X package manager [Homebrew](http://brew.sh/) is not installed yet, enter the following command first ...

```bash
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install some packages via Homebrew ...

```bash
$ brew update
$ brew upgrade
$ brew tap gapple/services
$ brew install node
$ sudo npm install -g cordova ionic ios-sim ios-deploy
$ brew install android-sdk
$ brew install caskroom/cask/brew-cask
$ brew cask install genymotion
```

## Create App and run in iOS simulator

### Prepare
* Decide on `APPNAME` with your project manager (lowercase, no spaces)
* Setup Git repository at git.20steps.de (optional)

### Boostrap

```bash
$ ionic start APPNAME https://github.com/20steps/ionic-bricks-starter
$ bash APPNAME/www/setup.sh
```
Get a coffee - the process takes about 5 minutes but does not need your interaction. You will see the iOS simulator running the Bricks Starter app including livereload when the process is finished.

### Update Metadata

Edit metadata (name, author, description, app_id etc.) in ...
* config.xml
* ionic.project
* package.json
* bower.json


### Configure Bricks
Update Bricks configuration (project code, API endpoint etc.) in ...
* www/js/config.js

### Basic ionic commands
```bash
$ ionic serve # start app in browser
$ ionic run ios --livereload # start app in iOS simulator
$ ionic plugin add ... # add some more plugins for native functionality
$ ionic resources # generate icons and splashscreen for iOS and Android
```

Note: [ionic cli](https://github.com/driftyco/ionic-cli) can do even more to streamline roundtrips while developing.

### Push to Git repository at 20steps

```bash
$ git add remote origin GITURL
$ git push origin master
```

Note: git init etc. was done in bootstrap phase.

## Build and run for Android (optional)

### Android SDK and system images

Start Android SDK manager (possibly update version number in command below) to complete installation of Android SDK.

```bash
$ /usr/local/Cellar/android-sdk/24.1.2/bin/android
```

Select and install packages as defined below ...
* `Tools` / `Android SDK Tools`, `Android SDK Platform-tools`, `Android SDK Build-Tools` (22 and 21)
* `Android 5.0.1 (API 21)` / `SDK Platform`, `ARM EABI v7a System Image`, `Intel x86` system images, `Google APIs` inc. system images
* `1024` for RAM, `512` for VM Heap
* `Extras` / `Android Support Library`, `Intel x86 Emulator Accelerator (HAXM installer)`

Hint: Get a sandwich or play with Aeon - downloading the packages above takes half an hour even with a very fast Internet connection.

### Intel HAXM

Install [Intel Hardware Accelerated Execution Manager](https://software.intel.com/en-us/android/articles/intel-hardware-accelerated-execution-manager) (HAXM) for optimized performance of the Android simulator.

```bash
$ brew cask install intel-haxm
```

Note: You will have to reboot after installation, as HAXM installs a device driver.

### Android Virtual Device

Create Android Virtual Device (AVD)
```bash
/usr/local/Cellar/android-sdk/24.1.2/bin/android avd
```

Select/enter

* `Nexus S on Android 5.0.1` as AVD Name
* `Nexus S (4.0", 480x800: hdpi)` as Device
* `Android 5.0.1 - API Level 21` as Target
* `Intel Atom (x86)` as CPU/ABI
* `No skin` as Skin
* `Use Host GPU` for Emulation Options
* `1024` and `512` for RAM and Heap respectively

... than save and exit.

### Build and run

Finally build including Crosswalk and run in Android emulator including support for livereload.

```bash
$ ionic run android --livereload # build app and start in Android simulator
```
Important notice: Check that you see the message `HAX is working (...)`, otherwise the AVD configuration is wrong, the HAX installation was not completed or you forgot to reboot the machine - `Ask Helmut` if in doubt.

Hint: Get an Espresso - the Android simulator takes ages to boot, livereload to the rescue.

## Debugging Android Version with Google Chrome Browser
If you want to debug your app on an android device, first make sure that you have installed the latest Google Chrome Canary version. Then simply follow the this guide https://developer.chrome.com/devtools/docs/remote-debugging

## Crosswalk and Whitelisting
After adding the crosswalk browser to your project, there may be some problems with whitelisting. It could be solved by adding the cordova-plugin-whitelist plugin. Just type
```bash
$ ionic plugin add https://github.com/apache/cordova-plugin-whitelist
```
and follow the description on the plugin page (https://github.com/apache/cordova-plugin-whitelist). You have to whitelist some URLs.
E.g.: If you want to whitelist all URLs simply add the following three lines to your config.xml.
```bash
<allow-navigation href="*" />
<allow-intent href="*" />
<access origin="*" />
```
## What about Windows Mobile, Blackberry OS and Firefox OS?

Yes, it runs! [Contact us](mailto:hhva@20steps.de) for more information.

## 20steps - Digital Full Service Boutique

Feel free to contact our agency at [hello@20steps.de](mailto:hello@20steps.de) to design and build your high quality mobile apps in record time based on Ionicframework and Bricks.

Or directly contact [Helmut Hoffer von Ankershoffen](mailto:hhva@20steps.de) for business opportunities and technical questions.