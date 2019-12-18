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
  ActivityIndicator,
  FlatList,
  TouchableHighlight
} from "react-native";
import styles from "../../assets/style/style.js";
import Moment from "moment";
import "moment/locale/tr";

export default class Mekanlar extends React.Component {
  static navigationOptions = {
    title: "Mekanlar"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    };
  }
  getEtkinlikler() {
    return fetch("http://tonight.com.tr/api/getir_kulupler")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <ImageBackground
          source={{
            uri: "https://tonight.com.tr/assets/upload/klupler/" + item.anaresim
          }}
          style={{
            height: 200
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{
                uri: "https://tonight.com.tr/assets/upload/klupler/" + item.logo
              }}
              resizeMode="contain"
              style={{
                height: 50,
                width: 170
              }}
            />
          </View>
        </ImageBackground>
        <View
          style={{
            backgroundColor: "#e30088",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Text style={{ color: "#fff", padding: 10, flex: 1 }}>
            {item.baslik}
          </Text>
          <TouchableHighlight
            style={{ flex: 1, padding: 10 }}
            onPress={() =>
              this.props.navigation.navigate("Rezervasyon", {
                token: item.kulup_token
              })
            }
          >
            <Text
              style={{
                backgroundColor: "#950064",
                padding: 10,
                color: "#fff",
                textAlign: "center"
              }}
            >
              Rezervasyon Yap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    this.getEtkinlikler();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      );
    }
  }
}
