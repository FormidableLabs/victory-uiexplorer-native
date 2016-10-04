import React, { Component } from "react";
import { AppRegistry, StatusBar, StyleSheet, View } from "react-native";
import ExampleList from "./src/components/example-list";
import Navigator from "./src/components/navigator";

class VictoryNativeUIExplorer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar/>
        <Navigator
          initialRoute={{
            key: ExampleList.displayName,
            component: ExampleList,
            title: "Victory Native UIExplorer",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

AppRegistry.registerComponent("VictoryNativeUIExplorer", () => VictoryNativeUIExplorer);
