import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import ModalSelector from "react-native-modal-selector";

export default class SampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastItem: ""
    };
  }

  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: "Fruits" },
      { key: index++, label: "Red Apples" },
      { key: index++, label: "Cherries" },
      { key: index++, label: "Cranberries" },
      { key: index++, label: "Vegetable" }
    ];

    return (
      <View style={{ flex: 1, justifyContent: "space-around", padding: 50 }}>
        <ModalSelector
          ref={l1 => {
            this.l1 = l1;
          }}
          data={data}
          initValue="getSelectedItem() example"
        />

        <ModalSelector
          ref={l2 => {
            this.l2 = l2;
          }}
          data={data}
          initValue="getSelectedItem() example"
        />

        <ModalSelector
          ref={l3 => {
            this.l3 = l3;
          }}
          data={data}
          initValue="getSelectedItem() example"
        />

        <View>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "red",
              alignSelf: "center",
              padding: 20
            }}
            onPress={() =>
              this.setState({
                lastItem: this.l3.getSelectedItem()
                  ? this.l3.getSelectedItem().label
                  : "Select first!"
              })
            }
          >
            <Text style={{ alignContent: "center" }}>
              What is the last selected item?
            </Text>
          </TouchableOpacity>
          <Text style={{ padding: 30, alignSelf: "center" }}>
            {this.state.lastItem}
          </Text>
        </View>
      </View>
    );
  }
}
