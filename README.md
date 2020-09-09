# OMN - APP

- Run ionic serve within the app directory to see your app in the browser
- Run ionic capacitor add to add a native iOS or Android project using Capacitor
- Generate your app icon and splash screens using cordova-res --skip-config
--copy
- Explore the Ionic docs for components, tutorials, and more:
https://ion.link/docs


### How to compile and deploy on your Android device
- First of all, ensure that you have Java version 1.8, Android SDK and Gradle installed on your machine as well as the environmental variables set.

- Ensure you install `native-run` and `cordova` by running
    `npm i -g native-run cordova`

* Note: add `sudo` in you are on a Mac or Linus OS. Also add the `--unsafe-perm` flag if you get an `EACCESS error` while running the installation command.

- Then using a USB cable connect your external android device(Mobile phone) to your machine, then through the `Settings` on the mobile device navigate into the `About phone` and then tap continously on the `Build number` option for about 5 seconds and then check to see if the `Developer options` has appeared as one of the options on the page where the `About phone` is listed. Then click on the `Developer options` and toggle on the `On` and `USB debugging`buttons.

- Finally, we build our application by running;
    `ionic cordova run`
This will request you type in the platform (Android/ios) that you are building for. You type in Android on the console, since that is the platform we are building for. Wait for the app to fully build and automatically get transferred to your mobile device and then you can open the app on your device just the usual way you open applications downladed from thee playstore
