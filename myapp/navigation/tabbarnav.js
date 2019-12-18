/*
 * Sample React Native App -Murat Erhan
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import EtkinliklerNavScreen from "../navigation/etkinliklernav.js";
import MekanlarNavScreen from "../navigation/mekanlarnav.js";
import MekanlarScreen from "../mekanlar/mekanlar.js";
import UyelikScreen from "../uyelik/uyelik.js";

const TabNavigator = createBottomTabNavigator({
  Etkinlikler: {
    screen: EtkinliklerNavScreen,
    navigationOptions: {
      tabBarLabel: "Etkinlikler",
      tabBarIcon: () => <Icon name="calendar" size={24} />
    }
  },
  Mekanlar: {
    screen: MekanlarNavScreen,
    navigationOptions: {
      tabBarLabel: "Mekanlar",
      tabBarIcon: () => <Icon name="coffee" size={24} />
    }
  },
  Uyelik: {
    screen: UyelikScreen,
    navigationOptions: {
      tabBarLabel: "Üyelik",
      tabBarIcon: () => <Icon name="user" size={24} />
    }
  }
});
export default createAppContainer(TabNavigator);
