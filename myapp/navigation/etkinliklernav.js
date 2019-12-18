import React from "react";
import { Button, View, Text } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation"; // Version can be specified in package.json
import EtkinliklerScreen from "../etkinlikler/etkinlikler.js";
import RezervasyonScreen from "../rezervasyon/rezervasyon.js";

export default createStackNavigator(
  {
    Etkinlikler: {
      screen: EtkinliklerScreen
    },
    Rezervasyon: {
      screen: RezervasyonScreen
    }
  },
  {
    initialRouteName: "Etkinlikler"
  }
);
