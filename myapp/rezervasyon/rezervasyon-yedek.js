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
  Picker,
  TouchableOpacity
} from "react-native";

import styles from "../../assets/style/style.js";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import "moment/locale/tr";

export default class Rezervasyon extends Component<Props> {
  state = {
    isVisible: false,
    tarih: null,
    pickerSelection: "Loca yada Stand Seçin",
    dataLocalar: [],
    dataPromosyonlar: [],
    dataIcecekler: [],
    dataKlup: {},
    bustate: "budur",
    isLoading: false,
    token: null,
    baslik: "Rezervasyon",
    selectedLoca: null,
    selectedIcecek: null
  };

  _showPicker = () => this.setState({ isVisible: true });

  _hidePicker = () => this.setState({ isVisible: false });

  _handlePicker = date => {
    console.log("selected date: ", date);
    this.setState({
      isVisible: false,
      tarih: Moment(date).format("Y-MM-D")
    });
  };

  static navigationOptions = {
    title: "Rezervasyon"
  };

  getKlup(token, tarih) {
    return fetch(
      "https://tonight.com.tr/api/getir_kulup/" + token + "/" + tarih
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataLocalar: responseJson.localar,
          dataPromosyonlar: responseJson.promosyonlar,
          dataIcecekler: responseJson.icecekler,
          dataKlup: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    const { navigation } = this.props;
    this.setState({
      tarih: navigation.getParam("tarih", "tam"),
      token: navigation.getParam("token", "tanım"),
      baslik: navigation.getParam("baslik", null)
    });

    let token = navigation.getParam("token", "tanım");
    let tarih = navigation.getParam("tarih", "tam");
    this.getKlup(token, tarih);
  }

  render() {
    let localar = this.state.dataLocalar.map((val, key) => {
      return (
        <Picker.Item
          key={val.ucretsiz_icecek}
          label={val.baslik}
          value={val.id}
        />
      );
    });

    let icecekler = this.state.dataIcecekler.map((val, key) => {
      return (
        <Picker.Item
          key={key}
          label={val.baslik + " + " + val.secenek_fiyati + "TL"}
          value={val.id}
        />
      );
    });

    let promosyonlar = this.state.dataPromosyonlar.map((val, key) => {
      return (
        <Picker.Item
          key={key}
          label={val.baslik + " + " + val.secenek_fiyati + "TL"}
          value={val.id}
        />
      );
    });

    return (
      <View style={(styles.container, { flex: 1, backgroundColor: "#950064" })}>
        <TouchableOpacity onPress={this._showPicker} style={{ matginTop: 50 }}>
          <Text style={{ backgroundColor: "#ffc", color: "#000", padding: 20 }}>
            Tarih Seçin: {this.state.tarih}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this._handlePicker}
          onCancel={this._hidePicker}
        />
        <View>
          <Picker
            selectedValue={this.state.selectedLoca}
            style={styles.containerPicker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedLoca: itemValue })
            }
          >
            <Picker.Item key={0} label="Loca yada Stand Seçiniz" value="0" />
            {localar}
          </Picker>

          <Picker
            selectedValue={this.state.selectedIcecek}
            style={styles.containerPicker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedIcecek: itemValue })
            }
          >
            <Picker.Item key={0} label="İçecek Seçiniz" value="0" />
            {icecekler}
          </Picker>

          <Picker
            selectedValue={this.state.selectedPromosyonlar}
            style={styles.containerPicker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedPromosyonlar: itemValue })
            }
          >
            <Picker.Item key={0} label="Promosyon Seçiniz" value="0" />
            {promosyonlar}
          </Picker>
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            padding: 10,
            marginTop: 55,
            textAlign: "center"
          }}
        >
          bişeyler
        </Text>
      </View>
    );
  }
}
