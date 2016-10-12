# Victory Native UIExplorer

Victory Native UIExplorer is a React Native app for iOS and Android that showcases Victory Native components. Each example has controls that toggle and animate between sample datasets and other configuration and style properties to give you a taste of what's possible in the Victory Native world of mobile data visualization. The API for Victory Native is identical to Victory, so you can do all the same stuff that you love in the browser on iOS or Android. For more information, check out the Victory docs: http://formidable.com/open-source/victory.

![UIExplorerExamples](https://cloud.githubusercontent.com/assets/2624467/19206881/ee434b18-8ca0-11e6-987b-deb70939c9bf.png)

## Release

### Android

#### Setting up gradle variables (first time only)

Get release keystore and password from Formidable password safe, and follow instructions from [Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html#setting-up-gradle-variables):

1. Place the `victory-uiexplorer.keystore` file under the `android/app` directory in your project folder.
2. Edit the file `~/.gradle/gradle.properties` and add the following (replace `*****` with the correct keystore password, alias and key password),

```
VICTORY_UIEXPLORER_RELEASE_STORE_FILE=victory-uiexplorer.keystore
VICTORY_UIEXPLORER_RELEASE_KEY_ALIAS=victory-uiexplorer
VICTORY_UIEXPLORER_RELEASE_STORE_PASSWORD=*****
VICTORY_UIEXPLORER_RELEASE_KEY_PASSWORD=*****
```

#### Create release build

```
cd android && ./gradlew assembleRelease
```

#### Test release build locally

1. Ensure that your emulator is running or device is connected.
2. Remove development builds of the app from the device.
3. `react-native run-android --variant=release`
