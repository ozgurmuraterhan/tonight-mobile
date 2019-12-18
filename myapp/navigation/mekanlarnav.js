import React from "react";
import { Button, View, Text } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation"; // Version can be specified in package.json
import EtkinliklerScreen from "../etkinlikler/etkinlikler.js";
import RezervasyonScreen from "../rezervasyon/rezervasyon.js";
import MekanlarScreen from "../mekanlar/mekanlar.js";

export default createStackNavigator(
  {
    Mekanlar: {
      screen: MekanlarScreen
    },
    Rezervasyon: {
      screen: RezervasyonScreen
    }
  },
  {
    initialRouteName: "Mekanlar"
  }
);
