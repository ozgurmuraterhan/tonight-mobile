/**
 * Sample React Native App -Murat Erhan
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Button
} from "react-native";
import styles from "../../assets/style/style.js";

export default class Singup extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  onGirisYap() {
    alert("şşd");
  }

  render() {
    return (
      <ImageBackground
        source={{ uri: "https://tonight.com.tr/assets/images/hero-3-img.jpg" }}
        style={styles.container}
      >
        <Image
          style={{ margin: 50, width: 150, height: 58 }}
          source={{
            uri: "https://tonight.com.tr/assets/img/logo.png"
          }}
        />
        <View
          style={{
            backgroundColor: "#F5FCFF",
            borderRadius: 15,
            width: 300,
            padding: 10
          }}
        >
          <Text style={styles.welcome}>Üye Ol</Text>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail Adresinizi Giriniz"
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail Adresinizi Giriniz"
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail Adresinizi Giriniz"
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail Adresinizi Giriniz"
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail Adresinizi Giriniz"
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
          />

          <Button onPress={this.onGirisYap} title="Giriş Yap" color="#841584" />
        </View>
      </ImageBackground>
    );
  }
}
