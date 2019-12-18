/*
 * Sample React Native App -Murat Erhan
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  AsyncStorage
} from "react-native";

export default class Uyelik extends Component<Props> {
  static navigationOptions = {
    title: "Üye Ol"
  };
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  };

  state = { ad: "değer gelmedi", soyad: "değer gelmedi" };

  componentDidMount() {
    AsyncStorage.getItem("ad").then(value => this.setState({ ad: value }));
    AsyncStorage.getItem("soyad").then(value =>
      this.setState({ soyad: value })
    );
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          {this.state.ad} {this.state.soyad}
        </Text>
        <Button onPress={this.clearAsyncStorage} title="çıkış yap" />
      </View>
    );
  }
}
