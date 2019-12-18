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

export default class Etkinlikler extends React.Component {
  static navigationOptions = {
    title: "Etkinlikler"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    };
  }
  getEtkinlikler() {
    return fetch("https://tonight.com.tr/api/getir_etkinlikler")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.etkinlikler
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
            uri:
              "https://tonight.com.tr/assets/upload/etkinlikler/" + item.resim
          }}
          style={{
            height: 200
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              width: 70
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "#fff",
                textAlign: "center"
              }}
            >
              {Moment(item.tam_tarih).format("D")}
            </Text>
            <Text style={{ color: "#fff", textAlign: "center" }}>
              {Moment(item.tam_tarih).format("MMM")}
            </Text>
            <Text style={{ color: "#fff", textAlign: "center" }}>
              {Moment(item.tam_tarih).format("dddd")}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            backgroundColor: "#e30088",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Text style={{ color: "#fff", padding: 10 }}>
            {item.baslik} @{item.klup}
          </Text>
        </View>
        <TouchableHighlight
          style={{ borderRadius: 40 }}
          onPress={() =>
            this.props.navigation.navigate("Rezervasyon", {
              token: item.kulup_token,
              tarih: item.tam_tarih,
              baslik: item.baslik
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
