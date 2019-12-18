import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  textInput: {
    marginTop: 10,
    height: 40,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 5
  },
  picketView: {
    marginTop: 20
  },
  containerPicker: {
    height: 200,
    borderWidth: 0
  }
});
