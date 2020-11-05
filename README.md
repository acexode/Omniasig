# OMN - APP

- Run ionic serve within the app directory to see your app in the browser
- Run ionic capacitor add to add a native iOS or Android project using Capacitor
- Generate your app icon and splash screens using cordova-res --skip-config
--copy
- Explore the Ionic docs for components, tutorials, and more:
https://ion.link/docs


### Steps to compile and deploy on your Android device
- First of all, ensure that you have Java version 1.8, Android SDK and Gradle installed on your machine as well as the environmental variables set.

- Ensure you install `native-run` and `cordova` by running
    `npm i -g native-run cordova`

* Note: add `sudo` in you are on a Mac or Linus OS. Also add the `--unsafe-perm` flag if you get an `EACCESS error` while running the installation command.

- Then using a USB cable connect your external android device(Mobile phone) to your machine, then through the `Settings` on the mobile device navigate into the `About phone` and then tap continously on the `Build number` option for about 5 seconds and then check to see if the `Developer options` has appeared as one of the options on the page where the `About phone` is listed. Then click on the `Developer options` and toggle on the `On` and `USB debugging`buttons.

- Finally, we build our application by running;
    `ionic cordova run`
This will request you type in the platform (Android/ios) that you are building for. You type in Android on the console, since that is the platform we are building for. Wait for the app to fully build and automatically get transferred to your mobile device and then you can open the app on your device just the usual way you open applications downladed from thee playstore


### Steps to build Android APK for Google play store
- Run a Production Build
First, we need to bundle our web code and prepare the assets as a native package.
`ionic cordova build android --prod --release`

- Generate a Keystore
A keystore is a binary file used to hold the private keys for signing the app. Its used to keep your app safe from malicious updates
`keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias`
You will see a file `my-release-key.keystore` in the root of the Omniasig project

- Sign the APK
An unsigned APK will located in platforms/android/app/build/outputs/apk/release/ in your Omniasig project. Now use the keystore from step 2 to sign the APK.
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk my-alias`

 - Run zipalign
To run zipalign on the APK you will have to first get the path to the `build-tool` folder in your Android SDK folder.
`{build-tools-path}/zipalign -v 4 {preceeding-path-to-the-unsigned-apk}/android-release-unsigned.apk Omniasig.apk`

- Verify the Signature
The last step is to verify the signature on the APK with apksigner.
`{build-tools-path}/apksigner verify Omniasig.apk`


### Steps to deploy Ionic App On your IOS Emulator
- Once Xcode has been installed, run  xcode-select --install to select the command line tools
- Open Xcode and navigate to Xcode » Preferences » Accounts. Add an Apple ID if none are listed. Once logged in, a Personal Team will appear in the team list of the Apple ID.
- To create an IOS simulator Open Xcode and navigate to Window » Devices and Simulators. Create an iPhone 11 simulator if one does not already exist.
- Run npm install -g ios-sim and brew install ios-deploy to add the utilities required.
- To generate and configure the native project run ionic cordova prepare ios
- Then set the package id by opening the config.xml file and modifying the id attribute of the root element, <widget>
- Now open the project in Xcode by selecting File » Open, then locate the app and open the app's platforms/ios directory
- Still in Xcode, in Project navigator, select the project root to open the project editor. Under the Identity section, verify that the Package ID that was set matches the Bundle Identifier.
- In the same project editor, under the Signing section, ensure Automatically manage signing is enabled. Then, select a Development Team. Given a Development Team, Xcode will attempt to automatically prepare provisioning and signing.
- Then run ionic cordova prepare ios
- Finally to simulate in Xcode, select a target simulator or device and click the play button, else you can deploy to an external ios device by connecting with a USB cable and then run ionic cordova run ios --device.


Helpful link: https://ionicframework.com/docs/developing/ios#running-with-xcode

### Test builds
## IOS
`ionic cordova build ios --c=test`
## Android
`ionic cordova build android --c=test`