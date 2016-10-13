import React, { Component } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import ExampleList from "./components/example-list";
import Navigator from "./components/navigator";

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

export default VictoryNativeUIExplorer;
