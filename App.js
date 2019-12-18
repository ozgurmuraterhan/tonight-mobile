import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "./myapp/login/login.js";
import SingupScreen from "./myapp/singup/singup.js";
import TabBarNavScreen from "./myapp/navigation/tabbarnav.js";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Require"]);
const RootStack = createStackNavigator(
  {
    TabBarNav: {
      screen: TabBarNavScreen,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Giriş yap"
      }
    },
    Singup: {
      screen: SingupScreen,
      navigationOptions: {
        title: "Üye Ol"
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
