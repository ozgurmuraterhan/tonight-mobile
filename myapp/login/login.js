/*
 * Sample React Native App -Murat Erhan
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Button,
  NavigationActions,
  AsyncStorage,
  Alert
} from "react-native";

import styles from "../../assets/style/style.js";

type Props = {};
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: ""
    };
  }

  getGiris = () => {
    const { userEmail, userPassword } = this.state;
    fetch("https://tonight.com.tr/api/giris_yap/", {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mail: userEmail,
        sifre: userPassword,
        token: "30B13E5C7116716BC748891F28CEE004"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.giris_yapildi) {
          AsyncStorage.setItem("uye_id", responseJson.id);
          AsyncStorage.setItem("ad", responseJson.ad);
          AsyncStorage.setItem("soyad", responseJson.soyad);
          AsyncStorage.setItem("mail", responseJson.mail);
          AsyncStorage.setItem("adres", responseJson.adres);
          AsyncStorage.setItem("tckn", responseJson.tckn);
          AsyncStorage.setItem("tel", responseJson.tel);
          this.props.navigation.navigate("TabBarNav");
        } else {
          Alert.alert("Hata", "E-posta adresi yada şifre hatalı");
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  componentDidMount() {
    AsyncStorage.getItem("ad").then(value => {
      if (value != null) {
        this.props.navigation.navigate("TabBarNav");
      }
    });
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
          <Text style={styles.welcome}>Giriş Yap</Text>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail Adresinizi Giriniz"
            value={this.state.userEmail}
            onChangeText={userEmail => this.setState({ userEmail })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Şifrenizi Giriniz"
            secureTextEntry={true}
            onChangeText={userPassword => this.setState({ userPassword })}
          />
          <Button onPress={this.getGiris} title="Giriş Yap" color="#841584" />
          <Text style={styles.instructions} />
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={styles.instructions}>Hala Üye değil misiniz? </Text>
            <Button
              onPress={() => this.props.navigation.navigate("Singup")}
              style={{}}
              title="Üye Ol"
              color="#841584"
              style={{ padding: 0, margin: 0 }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
