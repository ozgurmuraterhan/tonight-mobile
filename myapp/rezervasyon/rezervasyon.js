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
  View,
  ImageBackground,
  Image,
  TextInput,
  NavigationActions,
  Picker,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
  ScrollView,
  AsyncStorage
} from "react-native";

import { Button, Icon, Text } from "native-base";

import styles from "../../assets/style/style.js";
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalSelector from "react-native-modal-selector";
import Moment from "moment";
import "moment/locale/tr";

export default class Rezervasyon extends Component<Props> {
  constructor(props) {
    super(props);
    this.videoRefs = [];
  }

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
    selectedIcecek: null,
    modalVisible: false,
    textInputValue: "",
    toplamFiyat: 0,
    toplamIcecekBaslik: "",
    secilenPromosyon: "",
    uye_id: 0,
    icecek_sayisi: 0,
    promosyonGoster: false,
    lastItem: "22",
    degisken: 0
  };

  iceceklerJson = [];
  locaJson = [];
  promosyonJson = [];
  rezervasyon_bilgileri = [];
  tumJson = [];
  sisd = 0;

  _showPicker = tarih => {
    this.setState({ isVisible: true });
  };

  _hidePicker = () => this.setState({ isVisible: false });

  _handlePicker = date => {
    console.log("selected date: ", date);
    this.setState({
      isVisible: false,
      tarih: Moment(date).format("Y-MM-DD"),
      toplamFiyat: 0
    });
    let secilmisTarih = Moment(date).format("Y-MM-DD");
    this.getKlup(this.state.token, secilmisTarih);
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
          anaresim: responseJson.anaresim,
          dataKlup: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      tarih: navigation.getParam("tarih", "Seçiniz"),
      token: navigation.getParam("token", "tanım"),
      baslik: navigation.getParam("baslik", null)
    });

    let token = navigation.getParam("token", "tanım");
    let tarih = navigation.getParam("tarih", "Seçiniz");
    this.getKlup(token, tarih);

    AsyncStorage.getItem("uye_id").then(value => {
      this.setState({
        uye_id: value
      });
    });
  }

  promosyonGetir(deg) {
    if (deg) {
      return (
        <ModalSelector
          onChange={selectedItem => {
            this.promosyonJson = {
              id: selectedItem.id,
              baslik: selectedItem.baslik,
              secenek_fiyati: selectedItem.secenek_fiyati
            };

            this.tumJson = {
              loca: this.state.secilenLoca,
              icecekler: this.iceceklerJson,
              promosyonlar: this.promosyonJson,
              klup_id: this.state.dataKlup.id,
              uye_id: this.state.uye_id,
              tarih: this.state.tarih,
              fiyat: this.state.toplamFiyat + selectedItem.secenek_fiyati
            };

            this.setState({
              toplamFiyat: this.state.toplamFiyat + selectedItem.secenek_fiyati
            });
          }}
          initValue="Promosyon Seçiniz"
          cancelText="Neyse ya.. Boşver"
          data={this.state.dataPromosyonlar}
          keyExtractor={item => item.id}
          labelExtractor={item =>
            item.baslik + " + " + item.secenek_fiyati + "TL"
          }
        />
      );
    }
  }

  icecekGetir(sayi) {
    elements = [];

    for (let i = 0; i < sayi; i++) {
      elements[i] = (
        <ModalSelector
          key={i}
          onChange={selectedItem => {
            this.iceceklerJson[i] = {
              id: selectedItem.id,
              baslik: selectedItem.baslik,
              klup_id: selectedItem.klup_id,
              secenek_fiyati: selectedItem.secenek_fiyati
            };
          }}
          initValue="İçecek Seçiniz "
          cancelText="Neyse ya.. Boşver"
          data={this.state.dataIcecekler}
          keyExtractor={item => item.id}
          labelExtractor={item =>
            item.baslik + " + " + item.secenek_fiyati + i + "TL"
          }
        />
      );
    }
    return elements;
  }
  render() {
    if (this.state.dataKlup.calisma_durumu) {
      return (
        <ScrollView
          style={(styles.container, { flex: 1, backgroundColor: "#eee" })}
        >
          <ImageBackground
            source={{
              uri:
                "https://tonight.com.tr/assets/upload/klupler/" +
                this.state.anaresim
            }}
            style={{
              height: 200
            }}
          />
          <View
            style={{
              backgroundColor: "#e30088",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={{ color: "#fff", padding: 10 }}>
              {this.state.baslik} @{this.state.dataKlup.baslik}
            </Text>
          </View>
          <View style={{ backgroundColor: "#eee" }}>
            <TouchableOpacity
              onPress={this._showPicker}
              style={{ matginTop: 50 }}
            >
              <Text
                style={{ backgroundColor: "#000", color: "#fff", padding: 20 }}
              >
                Tarih: {this.state.tarih}
              </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this._handlePicker}
              onCancel={this._hidePicker}
            />

            <ModalSelector
              onChange={selectedItem => {
                this.tumJson = [];
                this.locaJson = [];
                this.iceceklerJson = [];
                this.promosyonJson = [];
                this.state.toplamFiyat = 0;

                this.setState({
                  icecek_sayisi: 0,
                  promosyonGoster: false
                });

                this.locaJson.push({
                  id: selectedItem.id,
                  baslik: selectedItem.baslik,
                  secenek_fiyati: selectedItem.secenek_fiyati
                });

                this.setState({
                  icecek_sayisi: selectedItem.ucretsiz_icecek,
                  toplamFiyat:
                    this.state.toplamFiyat + selectedItem.secenek_fiyati,
                  secilenLoca: this.locaJson,
                  promosyonGoster: true
                });
              }}
              cancelText="Neyse ya.. Boşver"
              initValue="Loca yada Stand Seçiniz"
              data={this.state.dataLocalar}
              keyExtractor={item => item.id}
              labelExtractor={item =>
                item.baslik + " + " + item.secenek_fiyati + "TL"
              }
            />
            {this.icecekGetir(this.state.icecek_sayisi)}
            {this.promosyonGetir(this.state.promosyonGoster)}
            <Text
              style={{
                color: "#000",
                fontSize: 10,
                padding: 10,
                marginTop: 5,
                textAlign: "center"
              }}
            />
            <TextInput value={JSON.stringify(this.tumJson)} />
            <Text>{this.state.lastItem}</Text>
            <Button danger onPress={() => alert("şş")}>
              <Text>Toplam:{this.state.toplamFiyat} TL Ödemeye Geç</Text>
              <Icon name="arrow-forward" size={24} />
            </Button>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={(styles.container, { flex: 1, backgroundColor: "#950064" })}
        >
          <TouchableOpacity
            onPress={this._showPicker}
            style={{ matginTop: 50 }}
          >
            <Text
              style={{ backgroundColor: "#ffc", color: "#000", padding: 20 }}
            >
              Tarih Seçin: {this.state.tarih}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isVisible}
            onConfirm={this._handlePicker}
            onCancel={this._hidePicker}
          />

          <Text> Bu tarihe rezervasyon yapamıyoruz</Text>
        </View>
      );
    }
  }
}
