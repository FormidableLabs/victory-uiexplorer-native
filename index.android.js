import { AppRegistry } from "react-native";
import codePush from "react-native-code-push";
import VictoryNativeUIExplorer from "./src/victory-native-ui-explorer";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

const App = codePush(codePushOptions)(VictoryNativeUIExplorer);

AppRegistry.registerComponent("VictoryNativeUIExplorer", () => App);
